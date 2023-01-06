/*
 * Copyright 2021 G42 Technologies Co.,Ltd.
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


require('mocha');
const { assert } = require('chai');
const nock = require('nock');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
import { DefaultHttpClient } from '../../http/DefaultHttpClient';
import FormData from 'form-data';
import { ListServerInterfacesResponse } from './model/MockResponse';

describe('default httpclient tests', () => {

  describe('constructor()', function () {
    it('should build a default client', function () {
      const client = new DefaultHttpClient(
        {}
      );
      assert.instanceOf(client, DefaultHttpClient);
    });
  });

  describe('get request test', function () {
    beforeEach(function () {
      const self = this;
      self.scope = nock('https://huaweicloud.com')
        .get('/gettest')
        .reply(200, { name: 'john' });
    });

    it('should properly process get request', function () {
      const client = new DefaultHttpClient({
        headers: {}
      });

      return client.sendRequest({
        endpoint: 'https://huaweicloud.com/gettest',
        method: 'get',
        data: {}
      }).then((parts: any) => {
        assert.equal(parts.data!.name, 'john');
      });
    });

    it('should properly process get request with content-type ', function () {
      const client = new DefaultHttpClient({
        headers: {
          'content-type': 'application/json'
        }
      });

      return client.sendRequest({
        endpoint: 'https://huaweicloud.com/gettest',
        method: 'get',
        data: {}
      }).then((parts: any) => {
        assert.equal(parts.data!.name, 'john');
      });
    });
  });

  describe('put request tests', function () {
    beforeEach(function () {
      const self = this;
      self.scope = nock('https://huaweicloud.com')
        .put('/puttest')
        .reply(200, { name: 'john' });
    });

    it('should properly process put request', function () {
      const client = new DefaultHttpClient({
        headers: {}
      });

      return client.sendRequest({
        endpoint: 'https://huaweicloud.com/puttest',
        method: 'PUT', //capitalized,not put.
        data: {
          foo: 'bar'
        }
      }).then((parts: any) => {
        assert.equal(parts.data!.name, 'john');
      });
    });
  });

  describe('post request tests', function () {
    beforeEach(function () {
      const self = this;
      self.scope = nock('https://huaweicloud.com')
        .post('/posttest')
        .reply(200, { name: 'john' });
    });

    it('should properly process post request', function () {
      const client = new DefaultHttpClient({
        headers: {}
      });

      return client.sendRequest({
        endpoint: 'https://huaweicloud.com/posttest',
        method: 'post',
        data: {
          foo: 'bar'
        }
      }).then((parts: any) => {
        assert.equal(parts.data!.name, 'john');
      });
    });

    it('should return 204', function () {
      this.scope = nock('https://huaweicloud.com')
        .post('/postnocontent')
        .reply(204);

      const client = new DefaultHttpClient({
        headers: {}
      });

      return client.sendRequest({
        endpoint: 'https://huaweicloud.com/postnocontent',
        method: 'post',
        data: {
          foo: 'bar'
        }
      }).then((parts: any) => {
        assert.equal(parts.statusCode, 204); 
        assert.equal(parts.data, ''); 
      });
    });

  });

  describe('generic response', function () {
    beforeEach(function () {
      const self = this;
      self.scope = nock('https://huaweicloud.com')
        .defaultReplyHeaders({
          'X-TOKEN': 'TOKEN'
        })
        .post('/posttest1')
        .reply(200, {
          "attachableQuantity": {
            "free_nic": 11
          },
          "interfaceAttachments": [
            {
              "port_state": "ACTIVE",
              "fixed_ips": [
                {
                  "subnet_id": "x.x.xxx",
                  "ip_address": "xx.xx.xx.xx"
                }
              ],
              "net_id": "610a4af2-1d90-4d2b-8057-dc238b26febf",
              "port_id": "04819c0a-6a07-44b6-945e-fb932071888e",
              "mac_addr": "x.x.x.x",
              "delete_on_termination": false,
              "driver_mode": null,
              "min_rate": null,
              "multiqueue_num": null
            }
          ]
        });
    });

    it('should return complex model when post request tests', function () {
      const client: DefaultHttpClient = new DefaultHttpClient({
        headers: {}
      });

      return client.sendRequest<ListServerInterfacesResponse>({
        endpoint: 'https://huaweicloud.com/posttest1',
        method: 'post',
        data: {
          foo: 'bar'
        }
      }).then((res) => { 
        assert.equal(res.data!.attachableQuantity.free_nic, 11);
      });
    });

    it('should return complex model when response headers has been set', function () {
      const client: DefaultHttpClient = new DefaultHttpClient({
        headers: {}
      });

      return client.sendRequest<ListServerInterfacesResponse>({
        endpoint: 'https://huaweicloud.com/posttest1',
        method: 'post',
        data: {
          foo: 'bar'
        },
        responseHeaders: ['X-TOKEN']
      }).then((res) => { 
        assert.equal(res.data!.attachableQuantity.free_nic, 11);

        // TODO: 将 responseHeaders 中的属性添加到 reponse 中,如 iam 获取 token;
        const result: any = res.data;
        assert.equal(result['X-TOKEN'], 'TOKEN');
      });
    });

  });

  describe('delete request tests', function () {
    beforeEach(function () {
      const self = this;
      self.scope = nock('https://huaweicloud.com')
        .delete('/deletetest')
        .reply(200, { name: 'john' });
    });

    it('should properly process post request', function () {
      const client = new DefaultHttpClient({
        headers: {}
      });

      return client.sendRequest({
        endpoint: 'https://huaweicloud.com/deletetest',
        method: 'DELETE',
        data: {
          foo: 'bar'
        }
      }).then((parts: any) => {
        assert.equal(parts.data!.name, 'john');
      });
    });
  });

  describe('when API arguments contain binary to upload', function () {
    beforeEach(function () {
      const self: any = this;
      self.scope = nock('https://huaweicloud.com')
        .post('/iotda/upload')
        // rather than matching on the body, that nock cannot do for content-type multipart/form-data, we use the
        // response to signal that the body was correctly serialized
        .reply(function (uri: any, requestBody: any, cb: any) {
          // busboy is a parser for for multipart/form-data bodies
          // ts-ignore 
          const busboy = new Busboy({ headers: this.req.headers });
          // capture state about all the parts that are in the body
          const parts: any = { files: [], errors: [] };

          assert(uri, '/iotda/upload');
          // attaching event handlers to track incoming parts
          busboy.on('file', (fieldname: any, file: any, filename: any) => {
            parts.files.push({ fieldname, filename });
            file.resume();
          });
          busboy.on('error', (error: any) => {
            parts.errors.push(error);
          });
          busboy.on('finish', () => {
            // when the parser is done, respond to the request with the state captured
            if (parts.errors.length > 0) {
              cb(parts.errors[0]);
            } else {
              // the response must contain `ok: true` for the client to accept it
              parts.ok = true;
              cb(null, [200, JSON.stringify(parts)]);
            }
          });

          // Write incoming string body to busboy parser
          busboy.end(requestBody ? Buffer.from(requestBody, 'hex') : undefined);
        });
    });

    it('should properly serialize when the binary argument is a ReadableStream', function () {
      const client = new DefaultHttpClient({
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      const imageStream = fs.createReadStream(path.resolve('tests', 'images', 'train.jpg'));
      var form = new FormData();
      form.append("file", imageStream);

      return client.sendRequest({
        endpoint: 'https://huaweicloud.com/iotda/upload',
        method: 'post',
        data: form
      }).then((parts: any) => {
        assert.lengthOf(parts.data!.files, 1);
        const file = parts.data!.files[0];
        // the filename is picked up from the the ReadableStream since it originates from fs
        assert.include(file, { fieldname: 'file', filename: 'train.jpg' });
      });
    });

  });

  describe('throw errors', function () {
    beforeEach(function () {
      this.scope = nock('https://huaweicloud.com')
        .post('/test')
        .reply(400, {
          error_code: 'IOTDA.014307',
          error_msg: 'Operation not allowed. The certificates verify verifyCode failed'
        });
    });

    it('400 error occurred', function (done) {
      const client = new DefaultHttpClient({
        headers: {}
      });

      client.sendRequest({
        endpoint: 'https://huaweicloud.com/test',
        method: 'POST',
        data: {
          foo: 'bar'
        }
      }).catch((error: any) => {
        assert.equal(error.status, 400);
        this.scope.done();
        done();
      });
    });
  });
});