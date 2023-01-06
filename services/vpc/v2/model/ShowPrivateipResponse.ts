import { Privateip } from './Privateip';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowPrivateipResponse extends SdkResponse {
    public privateip?: Privateip;
    public constructor() { 
        super();
    }
    public withPrivateip(privateip: Privateip): ShowPrivateipResponse {
        this['privateip'] = privateip;
        return this;
    }
}