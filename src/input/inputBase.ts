import "./inputBase.scss"
import { FormElement } from "../base";
import { Value } from "@chocolatelib/value";

/**Base for number elements elements*/
export abstract class InputBase<T> extends FormElement<T> {
    /**Called when value is changed */
    protected _valueUpdate(value: T) { }
    /**Called when value cleared */
    protected _valueClear() { }

    /**Called when Value is changed */
    protected _ValueUpdate(value: Value<T>) { }
    /**Called when the form element is set to not use a Value anymore*/
    protected _ValueClear() { }
}
