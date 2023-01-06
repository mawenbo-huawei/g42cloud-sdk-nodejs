import { Vpc } from './Vpc';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListVpcsResponse extends SdkResponse {
    public vpcs?: Array<Vpc>;
    public constructor() { 
        super();
    }
    public withVpcs(vpcs: Array<Vpc>): ListVpcsResponse {
        this['vpcs'] = vpcs;
        return this;
    }
}