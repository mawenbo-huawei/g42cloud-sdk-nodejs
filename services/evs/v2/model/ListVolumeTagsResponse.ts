
import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListVolumeTagsResponse extends SdkResponse {
    public tags?: { [key: string]: Array<string>; };
    public constructor() { 
        super();
    }
    public withTags(tags: { [key: string]: Array<string>; }): ListVolumeTagsResponse {
        this['tags'] = tags;
        return this;
    }
}