/*
 * Copyright 2023 G42 Technologies Co.,Ltd.
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import nock from 'nock';
import { ClientOptions, DefaultHttpClient } from '../../http/DefaultHttpClient';

describe('DefaultHttpClient', () => {

    afterEach(() => {
        nock.cleanAll();
    });

    it('should not retry when primaryUrl succeeds', async () => {
        const endpoints = ['http://example.com', 'http://backup.example.com'];
        const primaryUrl = endpoints[0];
        const backupUrl = endpoints[1];
        let httpService: DefaultHttpClient;
        const clientOptions: ClientOptions = {};
        httpService = new DefaultHttpClient(clientOptions, endpoints);

        const scope = nock(primaryUrl)
            .get('/api/data')
            .reply(200, { result: 'success' });

        const scope2 = nock(backupUrl)
            .get('/api/data')
            .reply(200, { result: 'success' });

        const options = {
            method: 'GET',
            url: '/api/data',
            headers: {},
        };

        const response = await httpService.sendRequest(options);

        expect(response.statusCode).toEqual(200);
        expect(httpService['retryCount']).toEqual(0);
        expect(response.data).toEqual({ result: 'success' });

        expect(scope.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(false);

        // Ensure endpoint order has been flipped after successful retry
        expect(httpService['endpoints']).toEqual([primaryUrl, backupUrl]);

        scope.done(); 
    });

    it('should retry with backupUrl when primaryUrl fails', async () => {
        const endpoints = ['http://example.com', 'http://backup.example.com'];
        const primaryUrl = endpoints[0];
        const backupUrl = endpoints[1];
        let httpService: DefaultHttpClient;
        const clientOptions: ClientOptions = {};
        httpService = new DefaultHttpClient(clientOptions, endpoints);

        const scope = nock(primaryUrl)
            .get('/api/data')
            .replyWithError({ code: 'ECONNREFUSED' });

        const scope2 = nock(backupUrl)
            .get('/api/data')
            .reply(200, { result: 'success' });

        const options = {
            method: 'GET',
            url: '/api/data',
            headers: {},
        };
        httpService.httpRequest = options;
        const response = await httpService.sendRequest(options);

        expect(response.statusCode).toEqual(200);
        expect(httpService['retryCount']).toEqual(1);
        expect(response.data).toEqual({ result: 'success' });

        expect(scope.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);

        // Ensure endpoint order has been flipped after successful retry
        expect(httpService['endpoints']).toEqual([backupUrl, primaryUrl]);

        scope.done();
        scope2.done();
    });

    it('should fail if both primary and backup Urls fail', async () => {
        const endpoints = ['http://example.com', 'http://backup.example.com'];
        const primaryUrl = endpoints[0];
        const backupUrl = endpoints[1];
        let httpService: DefaultHttpClient;
        const clientOptions: ClientOptions = {};
        httpService = new DefaultHttpClient(clientOptions, endpoints);

        const scope = nock(primaryUrl)
            .get('/api/data')
            .replyWithError({ code: 'ECONNREFUSED' });

        nock.enableNetConnect()
        const scope2 = nock(backupUrl)
            .get('/api/data')
            .replyWithError({ code: 'ECONNREFUSED' });
        const options = {
            method: 'GET',
            url: '/api/data',
            headers: {},
        };

        await expect(httpService.sendRequest(options)).rejects.toThrow();

        expect(scope.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);

        // Ensure endpoint order has not been flipped after failed retry
        expect(httpService['endpoints']).toEqual([primaryUrl, backupUrl]);

        scope.done();
        scope2.done();
    });

    it('should fail if both primary and backup Urls fail', async () => {
        const endpoints = ['https://httpbin.org', 'https://httpbin.org'];
        const primaryUrl = endpoints[0];
        const backupUrl = endpoints[1];
        let httpService: DefaultHttpClient;
        const clientOptions: ClientOptions = {};
        httpService = new DefaultHttpClient(clientOptions, endpoints);

        const options = {
            method: 'GET',
            url: '/status/111',
            headers: {},
        };
        httpService.httpRequest = options;
 
        await expect(httpService.sendRequest(options)).rejects.toThrow();

        // Ensure endpoint order has not been flipped after failed retry
        expect(httpService['endpoints']).toEqual([primaryUrl, backupUrl]);
    });
});