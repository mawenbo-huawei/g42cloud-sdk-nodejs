import { VersionItem } from './VersionItem';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListVersionsResponse extends SdkResponse {
    public versions?: Array<VersionItem>;
    public constructor() { 
        super();
    }
    public withVersions(versions: Array<VersionItem>): ListVersionsResponse {
        this['versions'] = versions;
        return this;
    }
}