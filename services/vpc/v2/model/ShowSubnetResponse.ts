import { Subnet } from './Subnet';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowSubnetResponse extends SdkResponse {
    public subnet?: Subnet;
    public constructor() { 
        super();
    }
    public withSubnet(subnet: Subnet): ShowSubnetResponse {
        this['subnet'] = subnet;
        return this;
    }
}