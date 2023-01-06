import { Versions } from './Versions';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListVersionsResponse extends SdkResponse {
    public versions?: Array<Versions>;
    public constructor() { 
        super();
    }
    public withVersions(versions: Array<Versions>): ListVersionsResponse {
        this['versions'] = versions;
        return this;
    }
}