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

import { expect } from "chai";
import { GlobalCredentials } from "../../auth/GlobalCredentials";
import { HcClient } from "../../HcClient";
import { DefaultHttpClient } from "../../http/DefaultHttpClient";
import * as sinon from "sinon";
import { AuthCache } from "../../internal/services/authcache";

require('mocha');
const nock = require('nock');

describe('global redential tests', () => {
    describe('domain id test', function () {
        before(function () {
            const self = this;
            self.scope = nock('https://iam.myhuaweicloud.com')
                .get("/v3/auth/domains")
                .reply(200, {
                    "domains": [
                        {
                            "id": "cbdadee2",
                            "name": "xxx1"
                        }
                    ]
                });
        });
        after(() => {
            nock.cleanAll();
        });
        it('should return the corrected domain id', function (done) {
            let cacheMock = sinon.mock(AuthCache.instance());
            cacheMock.expects("getCache")
                .returns(null);
 
            const client = new DefaultHttpClient();
            const hcClient = new HcClient(client);
            hcClient.withEndpoint("https://iam.myhuaweicloud.com");
            let credential = new GlobalCredentials();
            credential.withAk("a3");
            credential.withSk("bb");
            hcClient.withCredential(credential);

            const expected = "cbdadee2";
            credential.processAuthParams(hcClient).then(result => {
                credential = result as GlobalCredentials;
                expect(credential.domainId).to.equal(expected);

                cacheMock.verify();
                cacheMock.restore();
                done();
            }).catch(error => {
                console.log(error);
                cacheMock.verify();
                cacheMock.restore();
                done(error);
            });
        });
    });
});
