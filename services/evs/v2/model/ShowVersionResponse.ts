import { Versions } from './Versions';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowVersionResponse extends SdkResponse {
    public versions?: Array<Versions>;
    public constructor() { 
        super();
    }
    public withVersions(versions: Array<Versions>): ShowVersionResponse {
        this['versions'] = versions;
        return this;
    }
}