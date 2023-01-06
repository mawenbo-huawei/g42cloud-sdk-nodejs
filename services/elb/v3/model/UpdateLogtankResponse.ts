import { Logtank } from './Logtank';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class UpdateLogtankResponse extends SdkResponse {
    private 'request_id'?: string | undefined;
    public logtank?: Logtank;
    public constructor() { 
        super();
    }
    public withRequestId(requestId: string): UpdateLogtankResponse {
        this['request_id'] = requestId;
        return this;
    }
    public set requestId(requestId: string | undefined) {
        this['request_id'] = requestId;
    }
    public get requestId() {
        return this['request_id'];
    }
    public withLogtank(logtank: Logtank): UpdateLogtankResponse {
        this['logtank'] = logtank;
        return this;
    }
}