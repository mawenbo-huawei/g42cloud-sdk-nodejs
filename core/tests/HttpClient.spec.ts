
import { expect } from "chai";
require('mocha');
const nock = require('nock');
import { BasicCredentials } from "../auth/BasicCredentials";
import { GlobalCredentials } from "../auth/GlobalCredentials";
import { HcClient } from "../HcClient";
import { DefaultHttpClient } from "../http/DefaultHttpClient";
import { Region } from "../region/region";
import { SdkResponse } from "../SdkResponse";

const regions =
{
    regions: [
        {
            id: "cn-north-2",
            type: "public"
        },
        {
            id: "cn-north-1234",
            type: "private"
        }
    ]
}

describe('httpclient  tests', () => {
    describe('get project id test', function () {
        before(function () {
            const self = this;
            self.scope = nock('https://iam.myhuaweicloud.com')
                .get("/v3/regions")
                .reply(200, regions)
                .get("/v3/projects?name=cn-north-1")
                .reply(200, {
                    projects: [
                        {
                            "name": "cn-north-1",
                            "id": "0d57763e1e8xxxxx",
                            "enabled": true
                        }
                    ]
                })
                .post("/v3/projects")
                .reply(200, {
                    "project": {
                        "id": "07707ab1xxx",
                        "parent_id": "aa2d97d7e6xxxc",
                        "domain_id": "d78cbac1xxxx1",
                        "name": "cn-north-1_IAMProject"
                    }
                });
        });
        after(() => {
            nock.cleanAll();
        });
        it('should set project id correctly', function (done) {
            const axiosOptions = {};
            const client = new DefaultHttpClient(axiosOptions);
            const hcClient = new HcClient(client);
            let basicCredential = new BasicCredentials();
            basicCredential.withAk("aa");
            basicCredential.withSk("bb");
            hcClient.withCredential(basicCredential);
            const region = new Region("cn-north-1", "https://test.huaweicloud.com")
            hcClient.withRegion(region);

            const options = {
                method: "GET",
                url: "/v3/domains/{domain_id}/groups/{group_id}/roles",
                contentType: "application/json",
                queryParams: {},
                pathParams: {},
                headers: {},
                data: {}
            }
            /** http request instance example:
             * HttpRequestImpl {
                    endpoint: 'https://test.huaweicloud.com/v3/domains/{domain_id}/groups/{group_id}/roles',
                    headers: {
                        'X-Project-Id': '0d57763e1e8xxxxx',
                        'X-Sdk-Date': '20210825T081623Z',
                        host: 'test.huaweicloud.com',
                        Authorization: 'SDK-HMAC-SHA256 Access=aa, SignedHeaders=host;x-project-id;x-sdk-date, Signature=xx'
                    },
                    method: 'GET',
                    pathParams: { project_id: '0d57763e1e8xxxxx' },
                    data: {},
                    queryParams: {},
                    proxy: ''
                }
             */
            hcClient["buildRequest"](options).then(res => {
                expect(res.endpoint).to.equal("https://test.huaweicloud.com/v3/domains/{domain_id}/groups/{group_id}/roles");
                expect(res.headers['X-Project-Id']).equal("0d57763e1e8xxxxx");
                done();
            }).catch(error => {
                console.log(error);
                done(error);
            });;

        });
    });

    describe('get domain id test', function () {
        before(function () {
            const self = this;
            self.scope = nock('https://iam.myhuaweicloud.com')
                .get("/v3/regions")
                .reply(200, regions)
                .get("/v3/auth/domains")
                .reply(200, {
                    "domains": [
                        {
                            "id": "abkd782367",
                            "name": "phoenix_hf"
                        }
                    ]
                });
        });
        after(() => {
            nock.cleanAll();
        });
        it('should set domain id correctly', function (done) {
            const client = new DefaultHttpClient();
            const hcClient = new HcClient(client);
            let credential = new GlobalCredentials();
            credential.withAk("ax");
            credential.withSk("bb");
            hcClient.withCredential(credential);
            const region = new Region("cn-north-1", "https://test.huaweicloud.com")
            hcClient.withRegion(region);

            const options = {
                method: "GET",
                url: "/v3/domains/{domain_id}/groups/{group_id}/roles",
                contentType: "application/json",
                queryParams: {},
                pathParams: {},
                headers: {},
                data: {}
            }
            hcClient["buildRequest"](options).then(res => {
                expect(res.endpoint).to.equal("https://test.huaweicloud.com/v3/domains/abkd782367/groups/{group_id}/roles");
                expect(res.headers['X-Domain-Id']).equal("abkd782367");
                done();
            }).catch(error => {
                console.log(error);
                done(error);
            });;

        });
    });

    describe("should return sdkstreamresponse", function () {
        const defaultClient = new DefaultHttpClient();
        let hcClient = new HcClient(defaultClient);

        const res = hcClient['extractResponse']({
            data: new SdkResponse(),
            statusCode: 200,
            headers: { 'content-type': 'application/zip' }
        });

        expect(res).not.to.be.null;
        expect(res.httpStatusCode).to.equal(200);
        expect(res).to.have.property('body');
    });
});
