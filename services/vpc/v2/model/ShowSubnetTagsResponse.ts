import { ResourceTag } from './ResourceTag';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowSubnetTagsResponse extends SdkResponse {
    public tags?: Array<ResourceTag>;
    public constructor() { 
        super();
    }
    public withTags(tags: Array<ResourceTag>): ShowSubnetTagsResponse {
        this['tags'] = tags;
        return this;
    }
}