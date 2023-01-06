import { RollbackInfo } from './RollbackInfo';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class RollbackSnapshotResponse extends SdkResponse {
    public rollback?: RollbackInfo;
    public constructor() { 
        super();
    }
    public withRollback(rollback: RollbackInfo): RollbackSnapshotResponse {
        this['rollback'] = rollback;
        return this;
    }
}