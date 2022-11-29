import { UploadKieRequestBody } from './UploadKieRequestBody';


export class UploadKieRequest {
    private 'X-Enterprise-Project-ID'?: string | undefined;
    private 'x-engine-id': string | undefined;
    public override: UploadKieRequestOverrideEnum;
    public label?: string;
    public body?: UploadKieRequestBody;
    public constructor(xEngineId?: any, override?: any) { 
        this['x-engine-id'] = xEngineId;
        this['override'] = override;
    }
    public withXEnterpriseProjectID(xEnterpriseProjectID: string): UploadKieRequest {
        this['X-Enterprise-Project-ID'] = xEnterpriseProjectID;
        return this;
    }
    public set xEnterpriseProjectID(xEnterpriseProjectID: string | undefined) {
        this['X-Enterprise-Project-ID'] = xEnterpriseProjectID;
    }
    public get xEnterpriseProjectID() {
        return this['X-Enterprise-Project-ID'];
    }
    public withXEngineId(xEngineId: string): UploadKieRequest {
        this['x-engine-id'] = xEngineId;
        return this;
    }
    public set xEngineId(xEngineId: string | undefined) {
        this['x-engine-id'] = xEngineId;
    }
    public get xEngineId() {
        return this['x-engine-id'];
    }
    public withOverride(override: UploadKieRequestOverrideEnum): UploadKieRequest {
        this['override'] = override;
        return this;
    }
    public withLabel(label: string): UploadKieRequest {
        this['label'] = label;
        return this;
    }
    public withBody(body: UploadKieRequestBody): UploadKieRequest {
        this['body'] = body;
        return this;
    }
}

/**
    * @export
    * @enum {string}
    */
export enum UploadKieRequestOverrideEnum {
    FORCE = 'force',
    ABORT = 'abort',
    SKIP = 'skip'
}
