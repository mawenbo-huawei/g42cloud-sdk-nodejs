

export class UploadKieRequestBody {
    private 'upload_file': any | undefined;
    public constructor(uploadFile?: any) { 
        this['upload_file'] = uploadFile;
    }
    public withUploadFile(uploadFile: any): UploadKieRequestBody {
        this['upload_file'] = uploadFile;
        return this;
    }
    public set uploadFile(uploadFile: any | undefined) {
        this['upload_file'] = uploadFile;
    }
    public get uploadFile() {
        return this['upload_file'];
    }
}