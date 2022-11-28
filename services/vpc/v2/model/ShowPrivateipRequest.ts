

export class ShowPrivateipRequest {
    private 'privateip_id': string | undefined;
    public constructor(privateipId?: any) { 
        this['privateip_id'] = privateipId;
    }
    public withPrivateipId(privateipId: string): ShowPrivateipRequest {
        this['privateip_id'] = privateipId;
        return this;
    }
    public set privateipId(privateipId: string | undefined) {
        this['privateip_id'] = privateipId;
    }
    public get privateipId() {
        return this['privateip_id'];
    }
}