
import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class DeleteAddonInstanceResponse extends SdkResponse {
    public body?: string;
    public constructor() { 
        super();
    }
    public withBody(body: string): DeleteAddonInstanceResponse {
        this['body'] = body;
        return this;
    }
}