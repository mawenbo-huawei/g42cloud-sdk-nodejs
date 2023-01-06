import { Privateip } from './Privateip';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ListPrivateipsResponse extends SdkResponse {
    public privateips?: Array<Privateip>;
    public constructor() { 
        super();
    }
    public withPrivateips(privateips: Array<Privateip>): ListPrivateipsResponse {
        this['privateips'] = privateips;
        return this;
    }
}