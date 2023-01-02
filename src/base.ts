import { Listener, Value } from "@chocolatelib/value";
import { Base, BaseOptions } from "@chocolatelibui/core";
import { grey, orange, green, red, blue, yellow } from "@chocolatelib/colors"
import { initVariableRoot } from "@chocolatelibui/theme"
import { name } from "../package.json";

export let variables = initVariableRoot(name, 'Form Elements', '');
variables.makeVariable('color', 'Text Color', 'Standard text color', grey['800'], grey['200'], 'Color', undefined);
variables.makeVariable('labelColor', 'Label Color', 'Color of form element text label', grey['700'], grey['300'], 'Color', undefined);
variables.makeVariable('backColor', 'Body Color', 'Standard body color', grey['50'], grey['900'], 'Color', undefined);
variables.makeVariable('hoverColor', 'Hover Color', 'Color of body at mouse hover', grey['400'], grey['700'], 'Color', undefined);
variables.makeVariable('borderColor', 'Border Color', 'Standard border color', grey['700'], grey['300'], 'Color', undefined);
variables.makeVariable('focusColor', 'Focus Color', 'Color added to selected element', orange['600'], orange['300'], 'Color', undefined);
let colors = variables.makeSubGroup('colors', 'Colors', 'Base colors used by form elements')
colors.makeVariable('blackColor', 'Black', 'Basic Black', grey['600'], grey['300'], 'Color', undefined);
colors.makeVariable('greenColor', 'Green', 'Basic Green', green['300'], green['900'], 'Color', undefined);
colors.makeVariable('redColor', 'Red', 'Basic Red', red['300'], red['900'], 'Color', undefined);
colors.makeVariable('blueColor', 'Blue', 'Basic Blue', blue['300'], blue['900'], 'Color', undefined);
colors.makeVariable('yellowColor', 'Yellow', 'Basic Yellow', yellow['300'], yellow['900'], 'Color', undefined);

// registerVariable('componentUnselectedBorderColor', grey['700'], grey['300']);
// registerVariable('componentUnselectedTextColor', grey['600'], grey['400']);
// registerVariable('componentUnselectedSymbolColor', grey['600'], grey['400']);
// registerVariable('componentUnselectedBackGroundColor', grey['300'], grey['800']);

/**Defines all possible background colors for the button*/
export const enum BasicColors {
    Black = 'black',
    Green = 'green',
    Red = 'red',
    Blue = 'blue',
    Yellow = 'yellow',
};

export interface FormBaseOptions<T> extends BaseOptions {
    /**Value for form element */
    value?: Value<T> | T
    /**Text for label above form element */
    label?: string
}

/** Base class for form elements for shared properties and methods*/
export abstract class FormBase<ValueType> extends Base {
    /**Returns the name used to define the element*/
    static elementName() { return '@abstract@' }
    /**Returns the namespace override for the element*/
    static elementNameSpace() { return 'chocolatelibui-form'; }
    /**Stores local copy of form element value*/
    protected _value: ValueType | undefined
    /**Stores reference to Value when used*/
    private _Value: Value<ValueType> | undefined
    /**Listener for Value*/
    private _valueListener: Listener<ValueType> | undefined
    /**Listener for Value*/
    private _labelListener: Listener<string> | undefined

    /**Sets options for the element*/
    options(options: FormBaseOptions<ValueType>) {
        super.options(options);
        this.value = options.value;
        this.label = options.label;
        return this;
    }

    /**Returns value of form element*/
    get value() {
        return this._value;
    }
    /**Changes value of form element*/
    set value(value: Value<ValueType> | ValueType | undefined) {
        if (this._valueListener) {
            this.dettachValue(this._valueListener);
            delete this._valueListener;
        }
        if (typeof value === 'object' && value instanceof Value) {
            this._valueListener = this.attachValue(value, (val) => {
                if (value) {
                    this._valueUpdate(val);
                    this._value = val;
                } else {
                    this._valueClear();
                    delete this._value;
                }
            });
        } else if (value) {
            this._valueUpdate(value);
            this._value = value;
        } else {
            this._valueClear();
            delete this._value;
        }
    }
    /**Called when value is changed */
    protected _valueUpdate(value: ValueType) {
        value;
    }
    /**Called when value cleared */
    protected _valueClear() { }

    /**Called to change value*/
    protected _valueSet(value: ValueType) {
        if (this._Value) {
            this._Value.set = value;
        } else {
            this._valueUpdate(value);
            this._value = value
        }
    }


    get label() {
        return '';
    }
    set label(value: Value<string> | string | undefined) {
        if (this._labelListener) {
            this.dettachValue(this._labelListener);
            delete this._labelListener;
        }
        if (typeof value === 'object' && value instanceof Value) {
            this._labelListener = this.attachValue(value, (val) => {
                if (val) {
                    this._labelChange(val);
                } else {
                    this._labelClear();
                }
            });
        } else if (value) {
            this._labelChange(value);
        } else {
            this._labelClear();
        }
    }
    protected _labelChange(label: string) {
        label;
    }
    protected _labelClear() { }
}