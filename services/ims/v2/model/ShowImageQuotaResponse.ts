import { Quota } from './Quota';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowImageQuotaResponse extends SdkResponse {
    public quotas?: Quota;
    public constructor() { 
        super();
    }
    public withQuotas(quotas: Quota): ShowImageQuotaResponse {
        this['quotas'] = quotas;
        return this;
    }
}