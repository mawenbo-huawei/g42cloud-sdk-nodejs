import { EngineSimpleInfo } from './EngineSimpleInfo';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListEnginesResponse extends SdkResponse {
    public total?: number;
    public data?: Array<EngineSimpleInfo>;
    public constructor() { 
        super();
    }
    public withTotal(total: number): ListEnginesResponse {
        this['total'] = total;
        return this;
    }
    public withData(data: Array<EngineSimpleInfo>): ListEnginesResponse {
        this['data'] = data;
        return this;
    }
}