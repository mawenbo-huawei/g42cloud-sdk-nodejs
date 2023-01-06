import { ImageInfo } from './ImageInfo';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListImagesResponse extends SdkResponse {
    public images?: Array<ImageInfo>;
    public constructor() { 
        super();
    }
    public withImages(images: Array<ImageInfo>): ListImagesResponse {
        this['images'] = images;
        return this;
    }
}