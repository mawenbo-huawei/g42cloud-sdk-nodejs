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

import { ClientOptions, DefaultHttpClient } from '../../http/DefaultHttpClient';
import { IHttpRequest } from '../../http/IHttpRequest';
import FormData from 'form-data';
import fs from 'fs';
import nock from 'nock';
import path from 'path';

const nockBaseUrl = 'https://httpbin.org';

describe('multipart/form-data', () => {
    let httpClient: DefaultHttpClient;
    beforeEach(() => {
        const endpoints = [nockBaseUrl]
        const clientOptions: ClientOptions = {};
        httpClient = new DefaultHttpClient(clientOptions, endpoints);
    })
    afterEach(() => {
        nock.cleanAll();
    });

    it('should upload a file with multipart/form-data', async () => {
        /**
         * 
         * The "headers" need to explicitly define the "multipart/form-data" type.
         * The "form-data" type will be specially handled in DefaultHttpClient.ts to obtain its unique headers.
         * This is because it ultimately sends a request with the following format: 'content-type': 'multipart/form-data; boundary=xxxx'
         * 
        */
        const fileContent = 'Hello World!';
        const filePath = path.join(__dirname, 'test.txt');
        fs.writeFileSync(filePath, fileContent);

        // Create a FormData object and append the file
        const formData = new FormData();
        formData.append('myfile', fs.createReadStream(filePath));

        // Create the request
        const request: IHttpRequest = {
            url: '/post',
            method: 'POST',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const response = await httpClient.sendRequest<any>(request);
        const responseBody = response.data;

        //responseBody:{"args":{},"data":"","files":{"myfile":"Hello World!"},"form":{},"headers":{"Accept":"application/json","Content-Type":"multipart/form-data; boundary=--------------------------210235725180725504875196","Host":"httpbin.org","Transfer-Encoding":"chunked","User-Agent":"axios/0.21.4","X-Amzn-Trace-Id":"Root=1-63fc8b53-05d7938c3caa98be4aba5ca9"},"json":null,"origin":"34.94.218.73","url":"https://httpbin.org/post"}

        // 当 45 行的 content-type 不设置的时候，response 一样会成功，但是不会有正确的返回
        // 返回结果中 files 是一个空对象
        // 所以必须校验 files 的属性
        expect(responseBody.files).toBeDefined();
        expect(responseBody.files.myfile).toBeDefined();
        expect(responseBody.files.myfile).toEqual("Hello World!")

        fs.unlinkSync(filePath);
    });

    it('should upload a file using multipart/form-data and nock', async () => {
        const expectedResponse = {
            result: 'success',
            files: {
                myfile: 'Hello World!'
            }
        };
        const fileContent = 'Hello World!';
        const filePath = path.join(__dirname, 'test.txt');
        fs.writeFileSync(filePath, fileContent);
        const formData = new FormData();
        formData.append('myfile', fs.createReadStream(filePath));

        nock(nockBaseUrl)
            .post('/upload')
            .reply(200, expectedResponse);

        const request = {
            method: 'POST',
            url: `/upload`,
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: formData,
        };

        const response = await httpClient.sendRequest<any>(request);

        expect(response.data).toEqual(expectedResponse);
        expect(response.data!.files).toBeDefined();
        expect(response.data!.files.myfile).toBeDefined();

        fs.unlinkSync(filePath);
    });
});

describe('application/octet-stream', () => {
    let httpClient: DefaultHttpClient;

    beforeAll(() => {
        const endpoints = [nockBaseUrl]
        const clientOptions: ClientOptions = {};
        httpClient = new DefaultHttpClient(clientOptions, endpoints);
    });

    afterEach(() => {
        nock.cleanAll();
    });


    it('should send binary data using application/octet-stream with internet connectivity', async () => {
        const fileContents = Buffer.from('your binary file data');
        const request: IHttpRequest = {
            url: '/post',
            method: 'POST',
            headers: { 'content-type': 'application/octet-stream' },
            data: fileContents
        };

        // Send the request and validate the response
        const response = await httpClient.sendRequest(request);
        expect(response.data).toBeDefined(); 
        expect(response.headers['content-type']).toEqual('application/json')
    });

    it('should send binary data using application/octet-stream content type', async () => {
        const data = Buffer.from('Hello, world!', 'utf8');
        const expectedResponse = 'Hello, world!';
        // Mock the response
        const scope = nock(nockBaseUrl)
            .post('/test', data, {
                reqheaders: {
                    'Content-Type': 'application/octet-stream',
                },
            })
            .reply(200, data, {
                'Content-Type': 'application/octet-stream',
            });

        // Create the request
        const request: IHttpRequest = {
            url: '/test',
            method: 'POST',
            headers: { 'Content-Type': 'application/octet-stream' },
            data: data
        };

        // Send the request and validate the response
        const response = await httpClient.sendRequest(request);
        expect(response.data).toEqual(expectedResponse);

        // Verify that the mock was called
        scope.done();
    });

    /**
     * https://httpbin.org//bytes/10
     * httpbin.org provides an endpoint at /bytes/:n which allows you to download random data of the specified number of bytes.
     */
    it('should download file using octet-stream', async () => {
        const request: IHttpRequest = {
            method: 'GET',
            url: '/bytes/10',
        };
        const response = await httpClient.sendRequest(request);
        expect(response.headers['content-type']).toEqual('application/octet-stream');
    });


    it('should download file using octet-stream', async () => {
        const expectedResponse = 'file content';
        nock(nockBaseUrl)
            .get('/file')
            .reply(200, expectedResponse, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename="file.txt"',
            });

        const request: IHttpRequest = {
            method: 'GET',
            url: '/file',
        };
        const response = await httpClient.sendRequest(request);
        expect(response.headers['content-disposition']).toBe('attachment; filename="file.txt"');
        expect(response.data).toBe(expectedResponse);
    });

    it('should download a file', async () => {
        const filePath = path.join(__dirname, 'test.zip');
        const fileContent = 'test zip file content';
        fs.writeFileSync(filePath, fileContent);

        nock(nockBaseUrl)
            .get('/download')
            .replyWithFile(200, filePath, {
                'Content-Type': 'application/zip',
            });

        const request = {
            method: 'GET',
            url: `/download`,
        };

        const response = await httpClient.sendRequest(request);

        expect(response.headers['content-type']).toEqual('application/zip');
        expect(response.data).toEqual(fileContent);

        fs.unlinkSync(filePath);
    });

}); 