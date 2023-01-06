import { Subnet } from './Subnet';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class CreateSubnetResponse extends SdkResponse {
    public subnet?: Subnet;
    public constructor() { 
        super();
    }
    public withSubnet(subnet: Subnet): CreateSubnetResponse {
        this['subnet'] = subnet;
        return this;
    }
}