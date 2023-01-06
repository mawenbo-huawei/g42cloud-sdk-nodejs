import { VolumeDetail } from './VolumeDetail';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowVolumeResponse extends SdkResponse {
    public volume?: VolumeDetail;
    public constructor() { 
        super();
    }
    public withVolume(volume: VolumeDetail): ShowVolumeResponse {
        this['volume'] = volume;
        return this;
    }
}