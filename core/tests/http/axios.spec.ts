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

import { AxiosInstance } from "axios";
import { ComplextResponse, EcsResponse, ListServerInterfacesResponse } from './model/MockResponse';

require('mocha');
const moxios = require('moxios');
const axios = require('axios');
import { assert, expect } from 'chai' 
const chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-like'));

function asyncMethod() {
    return new Promise((resolve) => {
        return resolve("response");
    });
}

describe('Async Test', () => {
    it('should not pass use async', async function () {
        const res = await asyncMethod();
        assert.equal(res, "response");
    });
});


describe('some-thing', () => {
    let axiosInstance: AxiosInstance;
    beforeEach(() => {
        axiosInstance = axios.create();
        moxios.install(axiosInstance);
    })
    afterEach(() => {
        moxios.uninstall(axiosInstance)
    })

    it('should axios a thing', async function () {
        moxios.stubRequest('http://www.httpbin/get', {
            status: 200,
            responseText: '…'
        })
        const res = await axiosInstance.get('http://www.httpbin/get');
        assert.equal(res.status, 200);
    })

    it('should return model', async () => {
        moxios.stubRequest('http://www.httpbin/get', {
            status: 200,
            response: {
                id: "id",
                name: "name"
            }
        })
        const res = await axiosInstance.get('http://www.httpbin/get')

        assert.equal(res.status, 200);
        let ecsRes = res.data as EcsResponse;
        assert.equal(ecsRes.id, 'id');

    })

    it('should return single model', async () => {
        moxios.stubRequest('http://www.httpbin/get', {
            status: 200,
            response: {
                id: "id",
                name: "name"
            }
        })
        const res = await axiosInstance.get<EcsResponse>('http://www.httpbin/get')

        assert.equal(res.status, 200);

        assert.equal(res.data.id, "id");

        expect(res.data).to.have.property('id');

    })

    it('should return array with single model', async () => {
        moxios.stubRequest('http://www.httpbin/get', {
            status: 200,
            response: [{
                id: "id",
                name: "name"
            }, {
                id: 'id1',
                name: 'name1'
            }]
        })
        const res = await axiosInstance.get<EcsResponse[]>('http://www.httpbin/get')

        assert.equal(res.status, 200);

        assert.notEqual(res.data.length, 1);

        assert.equal(res.data.length, 2);

        expect(res.data).to.be.an("array");
    })

    it('should return complex object 1', async () => {
        moxios.stubRequest('http://www.httpbin/get', {
            status: 200,
            response: {
                count: 2,
                servers: [{
                    id: "id",
                    name: "name"
                }, {
                    id: 'id1',
                    name: 'name1'
                }]
            }
        })
        const res = await axiosInstance.get<ComplextResponse>('http://www.httpbin/get')

        assert.equal(res.status, 200);

        assert.equal(res.data.count, 2);
    })

    it('should return complex object 2', async () => {
        moxios.stubRequest('http://www.httpbin/get', {
            status: 200,
            response: {
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
                        ]
                    }
                ]
            }
        })
        const res = await axiosInstance.get<ListServerInterfacesResponse>('http://www.httpbin/get')

        assert.equal(res.status, 200); 

        assert.equal(res.data!.attachableQuantity.free_nic, 11); 
    })

    it('should return complex object with send request ', async () => {
        moxios.stubRequest('http://www.httpbin/get', {
            status: 200,
            response: {
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
            }
        })
        const res = await axiosInstance(
            {
                url: 'http://www.httpbin/get'
            }
        );
        assert.equal(res.status, 200); 

        assert.equal(res.data!.attachableQuantity.free_nic, 11);
    })
})