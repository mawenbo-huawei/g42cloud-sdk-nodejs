import { Tags } from './Tags';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListImagesTagsResponse extends SdkResponse {
    public tags?: Array<Tags>;
    public constructor() { 
        super();
    }
    public withTags(tags: Array<Tags>): ListImagesTagsResponse {
        this['tags'] = tags;
        return this;
    }
}