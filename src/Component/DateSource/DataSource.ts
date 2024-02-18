// import {ObjectState, ObservableObject} from "./proxy/ObserveableObject";
import ObservableObject from "./proxy/ObservableObject";
import {ObjectState} from "./proxy/ProxyObject";
import EventEmitter from "EventEmitter";
export type APITYPE = 'get' | 'post' | 'put' | 'delete';
import {AxiosRequestConfig} from "axios";
import Api from "../../api";
export default class DataSource<T extends object> {
    constructor(url: string, type: APITYPE = 'get', config?: AxiosRequestConfig) {
        this.url = url;
        this.config = config;
        this.type = type;
    }

    type: APITYPE = 'get';
    config: any;
    url: string | undefined;
    _data: Array<ObservableObject<T>> = [];
    #EVENT = new EventEmitter()

    get data() {
        return this._data.filter((item: ObservableObject<T>) => !(item as ObjectState<T>).deleted)
    }

    set data(dataList: Array<object>) {
        this._data = dataList.map(newData => {
            return new ObservableObject(newData, (uid: string) => {
                this.#EVENT.emit("update", this.data.find((item: ObservableObject<T>) => (item as ObjectState<T>).uid === uid))
            })
        })
    }

    delete(uid: string) {
        const target = this._data.find(item => (item as ObjectState<T>).uid === uid) as ObjectState<T>;
        if(!target) return;
        target.__state__!.deleted = true;
        this.#EVENT.emit("delete", this.data)
        return uid;
    }

    add(dataObject: T) {
        const data = new ObservableObject(dataObject, (uid: string) => {
            this.#EVENT.emit("update", this.data.find((item: ObservableObject<T>) => (item as ObjectState<T>).uid === uid))
        }) as ObjectState<T>;
        //ts-ignore
        data.__state__!.isNew = true
        this._data.push(data)
        this.#EVENT.emit("add", this.data)
        return data;
    }

    getDirtyData() {
        const _data = this._data as Array<ObjectState<T>>;
        return {
            updated: _data.filter((item) => item.changed && !item.isNew && !item.deleted),
            added: _data.filter((item) => item.isNew && !item.deleted),
            deleted: _data.filter((item) => item.deleted),
        }
    }

    async read() {
        const api = {get: Api.get, post: Api.post, put: Api.put, delete: Api.delete}
        const dataList = await api[this.type](this.url, this.config) as unknown as Array<T>
        this._data = dataList.map((dataObject: T) => {
            return new ObservableObject(dataObject, (uid: string) => {
                this.#EVENT.emit("update", this.data.find((item: ObservableObject<T>) => (item as ObjectState<T>).uid === uid))
            });
        })
        return this._data;
    }


    addEventListener(event: "change" | "add" | "delete", callback: (data: Array<ObservableObject<T>>) => void) {
        this.#EVENT.on(event, callback)
    }


}