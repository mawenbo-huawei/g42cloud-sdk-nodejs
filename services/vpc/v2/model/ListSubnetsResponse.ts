import { Subnet } from './Subnet';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListSubnetsResponse extends SdkResponse {
    public subnets?: Array<Subnet>;
    public constructor() { 
        super();
    }
    public withSubnets(subnets: Array<Subnet>): ListSubnetsResponse {
        this['subnets'] = subnets;
        return this;
    }
}