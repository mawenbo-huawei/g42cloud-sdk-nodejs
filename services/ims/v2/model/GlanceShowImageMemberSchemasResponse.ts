
import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class GlanceShowImageMemberSchemasResponse extends SdkResponse {
    public name?: string;
    public properties?: object;
    public constructor() { 
        super();
    }
    public withName(name: string): GlanceShowImageMemberSchemasResponse {
        this['name'] = name;
        return this;
    }
    public withProperties(properties: object): GlanceShowImageMemberSchemasResponse {
        this['properties'] = properties;
        return this;
    }
}