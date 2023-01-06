
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
