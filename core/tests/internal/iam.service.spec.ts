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
import { BasicCredentials } from "../../auth/BasicCredentials";
import { GlobalCredentials } from "../../auth/GlobalCredentials";
import { HcClient } from "../../HcClient";
import { DefaultHttpClient } from "../../http/DefaultHttpClient";
import { IamService } from "../../internal/services/iam.service";

require('mocha');
const nock = require('nock');


describe('iamservice tests', () => {
    describe('existed project', function () {
        before(function () {
            const self = this;
            self.scope = nock('https://iam.myhuaweicloud.com')
                .get("/v3/regions")
                .reply(200, {
                    regions: [
                        {
                            id: "cn-north-1",
                            type: "public"
                        },
                        {
                            id: "cn-north-123x1",
                            type: "private"
                        }
                    ]
                })
                .get("/v3/projects?name=cn-north-1")
                .reply(200, {
                    projects: [
                        {
                            "name": "af-south-1",
                            "id": "0d57763e1e8xxxxx",
                            "enabled": true
                        }
                    ]
                })
                .post("/v3/projects")
                .reply(200, {
                    "project": {
                        "id": "07707ab1xxx",
                        "parent_id": "aa2d97d7e6xxxa",
                        "domain_id": "d78cbac1xxxxcd",
                        "name": "cn-north-1_IAMProject"
                    }
                })
                .get("/v3/auth/domains")
                .reply(200, {
                    "domains": [
                        {
                            "id": "5ebb7ed46xxx",
                            "name": "phoenix_hf"
                        }
                    ]
                });
        });
        after(() => {
            nock.cleanAll();
        });
        it('get an existed project id', function (done) {
            const client = new DefaultHttpClient();
            const hcClient = new HcClient(client);
            hcClient.withEndpoint("https://iam.myhuaweicloud.com");
            let basicCredential = new BasicCredentials();
            basicCredential.withAk("a1");
            basicCredential.withSk("bb");
            basicCredential.withProjectId("cc");
            hcClient.withCredential(basicCredential);
            const iamService = new IamService(hcClient);

            const expected = "0d57763e1e8xxxxx";
            iamService.getProjecId("cn-north-1").then(result => {
                expect(result).to.equal(expected);
                done();
            }).catch(error => {
                console.log(error);
                done(error);
            });
        });
    });

    describe('create a new project', function () {
        before(function () {
            const self = this;
            self.scope = nock('https://iam.myhuaweicloud.com')
                .get("/v3/regions")
                .reply(200, {
                    regions: [
                        {
                            id: "cn-north-1",
                            type: "public"
                        },
                        {
                            id: "cn-north-123c",
                            type: "private"
                        }
                    ]
                })
                .get("/v3/projects?name=cn-north-1")
                .reply(200, {
                    projects: []
                })
                .post("/v3/projects")
                .reply(200, {
                    "project": {
                        "id": "07707ab1xxx",
                        "parent_id": "aa2d97d7e6xxx",
                        "domain_id": "d78cbac1xxxx",
                        "name": "cn-north-1_IAMProject"
                    }
                })
                .get("/v3/auth/domains")
                .reply(200, {
                    "domains": [
                        {
                            "id": "5ebb7ed46xxx3",
                            "name": "phoenix_hf"
                        }
                    ]
                });
        });
        it('should return the created project id', function (done) {
            const client = new DefaultHttpClient();
            const hcClient = new HcClient(client);
            hcClient.withEndpoint("https://iam.huaweicloud.com");
            let basicCredential = new BasicCredentials();
            basicCredential.withAk("a2");
            basicCredential.withSk("bb");
            hcClient.withCredential(basicCredential);
            const iamService = new IamService(hcClient);

            const expected = "07707ab1xxx";
            iamService.getProjecId("cn-north-1").then(result => {
                expect(result).to.equal(expected);
                done();
            }).catch(error => {
                console.log(error);
                done(error);
            });
        });
    });

    describe('domain id test', function () {
        before(function () {
            const self = this;
            self.scope = nock('https://iam.myhuaweicloud.com')
                .get("/v3/auth/domains")
                .reply(200, {
                    "domains": [
                        {
                            "id": "5ebb7edxxxx",
                            "name": "xxx1"
                        }
                    ]
                });
        });
        after(() => {
            nock.cleanAll();
        });
        it('should return the corrected domain id', function (done) {
            const client = new DefaultHttpClient();
            const hcClient = new HcClient(client);
            hcClient.withEndpoint("https://iam.myhuaweicloud.com");
            let credential = new GlobalCredentials();
            credential.withAk("a3");
            credential.withSk("bb");
            hcClient.withCredential(credential);
            const iamService = new IamService(hcClient);

            const expected = "5ebb7edxxxx";
            iamService.getDomainId().then(result => {
                expect(result).to.equal(expected);
                done();
            }).catch(error => {
                console.log(error);
                done(error);
            });
        });
    });
});
