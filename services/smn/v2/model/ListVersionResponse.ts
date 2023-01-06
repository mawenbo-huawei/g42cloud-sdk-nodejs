
import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListVersionResponse extends SdkResponse {
    public version?: object;
    public constructor() { 
        super();
    }
    public withVersion(version: object): ListVersionResponse {
        this['version'] = version;
        return this;
    }
}