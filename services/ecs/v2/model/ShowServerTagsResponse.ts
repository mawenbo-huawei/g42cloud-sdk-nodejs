import { ServerTag } from './ServerTag';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowServerTagsResponse extends SdkResponse {
    public tags?: Array<ServerTag>;
    public constructor() { 
        super();
    }
    public withTags(tags: Array<ServerTag>): ShowServerTagsResponse {
        this['tags'] = tags;
        return this;
    }
}