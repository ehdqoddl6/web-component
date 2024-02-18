export class ProxyObject<T extends object>{
    constructor(target: T, handler: HandlerI<T>) {
        return new Proxy(target, handler)
    }
}

interface HandlerI<T extends object> extends ProxyHandler<T> {
    state: ObjectState<T>;
}

export class ObjectState<T extends object>{
    isNew: boolean | undefined;
    changed: boolean | undefined;
    uid?: string;
    originals: T | undefined;
    deleted: boolean | undefined
    __state__: ObjectState<T> | undefined
}