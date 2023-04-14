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
import { IHttpRequest } from '../../http/IHttpRequest';

const nockBaseUrl = 'http://example.com';
describe('DefaultHttpClient', () => {
    let httpClient: DefaultHttpClient;

    beforeEach(() => {
        const endpoints = [nockBaseUrl]
        const clientOptions: ClientOptions = {};
        httpClient = new DefaultHttpClient(clientOptions, endpoints);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should handle a GET request', async () => {
        const expectedResponse = { result: 'success' };
        nock(nockBaseUrl).get('/test').reply(200, expectedResponse);

        const request: IHttpRequest = {
            url: '/test',
            method: 'GET',
        };
        const response = await httpClient.sendRequest(request);

        expect(response.data).toEqual(expectedResponse);
        expect(response.statusCode).toBe(200);
    });

    it('should handle a POST request with a JSON payload', async () => {
        const expectedResponse = { result: 'success' };
        const payload = { foo: 'bar' };
        nock(nockBaseUrl).post('/test', payload).reply(200, expectedResponse);

        const request: IHttpRequest = {
            url: '/test',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: payload,
        };
        const response = await httpClient.sendRequest(request);

        expect(response.data).toEqual(expectedResponse);
        expect(response.statusCode).toBe(200);
    });

    it('should handle a PUT request with a form data payload', async () => {
        const expectedResponse = { result: 'success' };
        const formData = { foo: 'bar' };
        nock(nockBaseUrl).put('/test', formData).reply(200, expectedResponse);

        const request: IHttpRequest = {
            url: '/test',
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        };
        const response = await httpClient.sendRequest(request);

        expect(response.data).toEqual(expectedResponse);
        expect(response.statusCode).toBe(200);
    });

    it('should handle a DELETE request with a path parameter', async () => {
        const expectedResponse = { result: 'success' };
        nock(nockBaseUrl).delete(`/test/123`).reply(200, expectedResponse);

        const request: IHttpRequest = {
            url: '/test/123',
            method: 'DELETE'
        };
        const response = await httpClient.sendRequest(request);

        expect(response.data).toEqual(expectedResponse);
        expect(response.statusCode).toBe(200);
    });

    it('should retry on network error', async () => {
        const scope = nock(nockBaseUrl)
            .get('/api/data')
            .replyWithError({ message: 'ECONNREFUSED' });


        const options: IHttpRequest = {
            method: 'GET',
            url: '/api/data',
            headers: {},
        };

        try {
            await httpClient.sendRequest(options);
        } catch (error: any) {
            expect(error.message).toEqual("ECONNREFUSED");
        }

        expect(scope.isDone()).toBe(true);
    });

    it('should throw an error when server returns error status code', async () => {
        const endpoints = ['https://httpstat.us']
        const clientOptions: ClientOptions = {};
        httpClient = new DefaultHttpClient(clientOptions, endpoints);
        const request: IHttpRequest = {
            method: 'GET',
            url: '/500'
        };  

        await expect(httpClient.sendRequest(request)).rejects.toThrowError('Request failed with status code 500');
       
    });

    it('should throw an error when server returns error status code', async () => {
        const endpoints = ['https://httpbin.org']
        const clientOptions: ClientOptions = {};
        httpClient = new DefaultHttpClient(clientOptions, endpoints);
        const request: IHttpRequest = {
            method: 'GET',
            url: '/status/500'
        };  

        await expect(httpClient.sendRequest(request)).rejects.toThrowError('Request failed with status code 500'); 
    });

    it('should throw an error when request timeout', async () => {
        const endpoints = ['https://httpbin.org'];
        const clientOptions: ClientOptions = {};
        httpClient = new DefaultHttpClient(clientOptions, endpoints);
        const request: IHttpRequest = {
          method: 'GET',
          url: '/delay/10', // The /delay endpoint in httpbin.org will delay 10 seconds
          axiosRequestConfig:{
            timeout: 1000 // Set timeout to 1 second
          }
        };
      
        await expect(httpClient.sendRequest(request)).rejects.toThrowError('timeout of 1000ms exceeded');
      });
 
});