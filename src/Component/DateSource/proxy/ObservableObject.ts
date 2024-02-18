import { ObjectState, ObservableObject } from './ProxyObject'
import {v4 as uuidv4} from 'uuid';
import EventEmitter from 'EventEmitter';
import _ = require("lodash");

export default class ObservableObject<T extends object = object> {
    constructor(dataObject: T, changeHandler?: (uid: string) => void){
        const EVENT = new EventEmitter();
        EVENT.on('change', changeHandler);

        return new ObservableObject<T>(dataObject, {
            state: {
                isNew: false,
                changed: false,
                uid: uuidv4(),
                originals: _.cloneDeep(dataObject),
                deleted: false,
                __state__: {} as ObjectState<T>
            },
            get: function (target, prop, receiver) {
                if (!Reflect.has(target, prop)) {
                    return prop === '__state__' ? this.state : this.state[prop]
                }
                return Reflect.get(target, prop, receiver);
            },
            set: function (target, prop, value, receiver): boolean {
                const isUpdate = target[prop] !== value
                const tempObj = _.cloneDeep(target);
                tempObj[prop] = value;
                this.state.changed = !_.isEqual(tempObj, this.state.originals);
                Reflect.set(target, prop, value, receiver);
                if (isUpdate) {
                    EVENT.emit("change", this.state.uid)
                }
                return true
            }
        })
    }
}
