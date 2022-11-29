

export class GetKieConfigs {
    public id?: string;
    public key?: string;
    public labels?: object;
    public value?: string;
    private 'value_type'?: string | undefined;
    public status?: string;
    private 'create_time'?: number | undefined;
    private 'update_time'?: number | undefined;
    private 'create_revision'?: number | undefined;
    private 'update_revision'?: number | undefined;
    public constructor() { 
    }
    public withId(id: string): GetKieConfigs {
        this['id'] = id;
        return this;
    }
    public withKey(key: string): GetKieConfigs {
        this['key'] = key;
        return this;
    }
    public withLabels(labels: object): GetKieConfigs {
        this['labels'] = labels;
        return this;
    }
    public withValue(value: string): GetKieConfigs {
        this['value'] = value;
        return this;
    }
    public withValueType(valueType: string): GetKieConfigs {
        this['value_type'] = valueType;
        return this;
    }
    public set valueType(valueType: string | undefined) {
        this['value_type'] = valueType;
    }
    public get valueType() {
        return this['value_type'];
    }
    public withStatus(status: string): GetKieConfigs {
        this['status'] = status;
        return this;
    }
    public withCreateTime(createTime: number): GetKieConfigs {
        this['create_time'] = createTime;
        return this;
    }
    public set createTime(createTime: number | undefined) {
        this['create_time'] = createTime;
    }
    public get createTime() {
        return this['create_time'];
    }
    public withUpdateTime(updateTime: number): GetKieConfigs {
        this['update_time'] = updateTime;
        return this;
    }
    public set updateTime(updateTime: number | undefined) {
        this['update_time'] = updateTime;
    }
    public get updateTime() {
        return this['update_time'];
    }
    public withCreateRevision(createRevision: number): GetKieConfigs {
        this['create_revision'] = createRevision;
        return this;
    }
    public set createRevision(createRevision: number | undefined) {
        this['create_revision'] = createRevision;
    }
    public get createRevision() {
        return this['create_revision'];
    }
    public withUpdateRevision(updateRevision: number): GetKieConfigs {
        this['update_revision'] = updateRevision;
        return this;
    }
    public set updateRevision(updateRevision: number | undefined) {
        this['update_revision'] = updateRevision;
    }
    public get updateRevision() {
        return this['update_revision'];
    }
}