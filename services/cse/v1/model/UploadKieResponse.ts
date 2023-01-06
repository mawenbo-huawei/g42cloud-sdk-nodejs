import { DocFailedOfUpload } from './DocFailedOfUpload';
import { GetKieConfigs } from './GetKieConfigs';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class UploadKieResponse extends SdkResponse {
    public success?: Array<GetKieConfigs>;
    public failure?: Array<DocFailedOfUpload>;
    public constructor() { 
        super();
    }
    public withSuccess(success: Array<GetKieConfigs>): UploadKieResponse {
        this['success'] = success;
        return this;
    }
    public withFailure(failure: Array<DocFailedOfUpload>): UploadKieResponse {
        this['failure'] = failure;
        return this;
    }
}