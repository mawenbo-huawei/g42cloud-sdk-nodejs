import { SnapshotDetails } from './SnapshotDetails';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class CreateSnapshotResponse extends SdkResponse {
    public snapshot?: SnapshotDetails;
    public constructor() { 
        super();
    }
    public withSnapshot(snapshot: SnapshotDetails): CreateSnapshotResponse {
        this['snapshot'] = snapshot;
        return this;
    }
}