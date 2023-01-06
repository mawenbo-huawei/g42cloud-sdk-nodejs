import { Privateip } from './Privateip';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class CreatePrivateipResponse extends SdkResponse {
    public privateips?: Array<Privateip>;
    public constructor() { 
        super();
    }
    public withPrivateips(privateips: Array<Privateip>): CreatePrivateipResponse {
        this['privateips'] = privateips;
        return this;
    }
}