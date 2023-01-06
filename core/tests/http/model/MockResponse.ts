export interface EcsResponse {
    id: String;
    name: String;
}

export interface ComplextResponse {
    count: number;
    servers: EcsResponse[];
}

export interface AttachableQuantity {
    free_nic: number
}

export interface FixedIps {
    subnet_id: string;
    ip_address: string;
}
export interface InterfaceAttachments {
    portState: String;
    fixed_ips: FixedIps[];
}


export interface ListServerInterfacesResponse {
    attachableQuantity: AttachableQuantity;
    interfaceAttachments: InterfaceAttachments;
}
