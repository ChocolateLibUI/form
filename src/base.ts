import { Value } from "@chocolatelib/value";
import { Base } from "@chocolatelibui/core";
import { name } from "../package.json";

/** Base class for form elements for shared properties and methods*/
export abstract class FormBase<ValueType> extends Base {
    //Returns the name used to define the element 
    static elementName() { return '@abstract@' }
    //Returns the namespace override for the element
    static elementNameSpace() { return name.replace('@', '').replace('/', '-') }

    _value: Value<ValueType> | ValueType | undefined
    get value() {
        return this._value;
    }
    set value(value: Value<ValueType> | ValueType | undefined) {
        this._value = value
    }
}