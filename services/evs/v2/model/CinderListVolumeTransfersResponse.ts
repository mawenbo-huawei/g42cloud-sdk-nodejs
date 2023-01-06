import { VolumeTransferSummary } from './VolumeTransferSummary';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class CinderListVolumeTransfersResponse extends SdkResponse {
    public transfers?: Array<VolumeTransferSummary>;
    public constructor() { 
        super();
    }
    public withTransfers(transfers: Array<VolumeTransferSummary>): CinderListVolumeTransfersResponse {
        this['transfers'] = transfers;
        return this;
    }
}