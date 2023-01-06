import { AzInfo } from './AzInfo';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class CinderListAvailabilityZonesResponse extends SdkResponse {
    public availabilityZoneInfo?: Array<AzInfo>;
    public constructor() { 
        super();
    }
    public withAvailabilityZoneInfo(availabilityZoneInfo: Array<AzInfo>): CinderListAvailabilityZonesResponse {
        this['availabilityZoneInfo'] = availabilityZoneInfo;
        return this;
    }
}