
import { expect } from "chai";
import { BasicCredentials } from "../../auth/BasicCredentials";
import { HcClient } from "../../HcClient";
import { DefaultHttpClient } from "../../http/DefaultHttpClient";

require('mocha');
const nock = require('nock');

describe('basic redential tests', () => {
    describe('get project id test ', function () {
        before(function () {
            const self = this;
            self.scope = nock('https://iam.myhuaweicloud.com')
                .get("/v3/regions")
                .reply(200, {
                    regions: [
                        {
                            id: "cn-north-x",
                            type: "public"
                        },
                        {
                            id: "cn-north-1x",
                            type: "private"
                        }
                    ]
                })
                .get("/v3/projects?name=cn-north-1")
                .reply(200, {
                    projects: [
                        {
                            "domain_id": "xx",
                            "name": "cn-north-1",
                            "id": "0d57763e1e8xxxxx",
                            "enabled": true
                        }
                    ]
                })
                .post("/v3/projects")
                .reply(200, {
                    "project": {
                        "description": "IAMDescription",
                        "id": "07707ab1xxx",
                        "parent_id": "aa2d97d7e6xxxc",
                        "domain_id": "d78cbac1xxxxc",
                        "name": "cn-north-1_IAMProject"
                    }
                });
        });
        after(() => {
            nock.cleanAll();
        });
        it('should set project id correctly', function (done) {
            const client = new DefaultHttpClient();
            const hcClient = new HcClient(client);
            hcClient.withEndpoint("https://iam.myhuaweicloud.com");
            let basicCredential = new BasicCredentials();
            basicCredential.withAk("a2");
            basicCredential.withSk("bb");
            hcClient.withCredential(basicCredential);

            const expected = "0d57763e1e8xxxxx";
            basicCredential.processAuthParams(hcClient, "cn-north-1").then(result => {
                basicCredential = result as BasicCredentials;
                expect(basicCredential.projectId).to.equal(expected);
                done();
            })
                .catch(error => {
                    console.log(error);
                    done(error);
                });;
        });
    });
});
