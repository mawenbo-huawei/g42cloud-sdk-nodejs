import { ServerRemoteConsole } from './ServerRemoteConsole';

import { SdkResponse } from "@g42cloud/g42cloud-sdk-core/SdkResponse";

export class ShowServerRemoteConsoleResponse extends SdkResponse {
    private 'remote_console'?: ServerRemoteConsole | undefined;
    public constructor() { 
        super();
    }
    public withRemoteConsole(remoteConsole: ServerRemoteConsole): ShowServerRemoteConsoleResponse {
        this['remote_console'] = remoteConsole;
        return this;
    }
    public set remoteConsole(remoteConsole: ServerRemoteConsole | undefined) {
        this['remote_console'] = remoteConsole;
    }
    public get remoteConsole() {
        return this['remote_console'];
    }
}