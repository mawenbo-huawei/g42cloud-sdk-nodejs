import { RouteTableListResp } from './RouteTableListResp';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListRouteTablesResponse extends SdkResponse {
    public routetables?: Array<RouteTableListResp>;
    public constructor() { 
        super();
    }
    public withRoutetables(routetables: Array<RouteTableListResp>): ListRouteTablesResponse {
        this['routetables'] = routetables;
        return this;
    }
}