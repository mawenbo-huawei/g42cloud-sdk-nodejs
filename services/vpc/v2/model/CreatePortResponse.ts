import { Port } from './Port';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class CreatePortResponse extends SdkResponse {
    public port?: Port;
    public constructor() { 
        super();
    }
    public withPort(port: Port): CreatePortResponse {
        this['port'] = port;
        return this;
    }
}