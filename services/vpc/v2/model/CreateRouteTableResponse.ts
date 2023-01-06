import { RouteTableResp } from './RouteTableResp';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class CreateRouteTableResponse extends SdkResponse {
    public routetable?: RouteTableResp;
    public constructor() { 
        super();
    }
    public withRoutetable(routetable: RouteTableResp): CreateRouteTableResponse {
        this['routetable'] = routetable;
        return this;
    }
}