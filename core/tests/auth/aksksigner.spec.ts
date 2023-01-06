
import { expect } from "chai";
import { AKSKSigner } from "../../auth/AKSKSigner";

require('mocha');

describe('singer tests', () => {
    it('should encode uri correctly', function () {
        const result = AKSKSigner['CanonicalURI']("/v2/aab/fgs/functions/urn:fss:cn-north-7:bbc:function:fgsSdkTest:fgsSdkTestf3d82faf:latest/config")
        const expected = "/v2/aab/fgs/functions/urn%3Afss%3Acn-north-7%3Abbc%3Afunction%3AfgsSdkTest%3AfgsSdkTestf3d82faf%3Alatest/config/";

        expect(result).to.equal(expected);
    });
});
