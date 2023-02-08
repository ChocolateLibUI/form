import { Listener, Value } from "@chocolatelib/value";
import { Base, BaseOptions } from "@chocolatelibui/core";
import { grey, orange, green, red, blue, yellow } from "@chocolatelib/colors"
import { initVariableRoot } from "@chocolatelibui/theme"
import { name } from "../package.json";

export let variables = initVariableRoot(name, 'Form Elements', '');
variables.makeVariable('color', 'Text Color', 'Standard text color', grey['800'], grey['200'], 'Color', undefined);
variables.makeVariable('selectedColor', 'Selected Text Color', 'Color of selected text', grey['900'], grey['50'], 'Color', undefined);
variables.makeVariable('unselectedColor', 'Unselected Text Color', 'Color of unselected text', grey['600'], grey['400'], 'Color', undefined);
variables.makeVariable('labelColor', 'Label Color', 'Color of label text', grey['700'], grey['300'], 'Color', undefined);
variables.makeVariable('backColor', 'Body Color', 'Standard body color', grey['50'], grey['900'], 'Color', undefined);
variables.makeVariable('hoverColor', 'Hover Color', 'Color of body at mouse hover', grey['400'], grey['700'], 'Color', undefined);
variables.makeVariable('borderColor', 'Border Color', 'Standard border color', grey['700'], grey['500'], 'Color', undefined);
variables.makeVariable('focusColor', 'Focus Color', 'Color added to selected element', orange['600'], orange['300'], 'Color', undefined);
let colors = variables.makeSubGroup('colors', 'Colors', 'Basic colors used by form elements')
colors.makeVariable('blackColor', 'Black', 'Basic Black', grey['800'], grey['900'], 'Color', undefined);
colors.makeVariable('blackColorText', 'Basic Black Text Color', 'Text color for basic black background', grey['200'], grey['200'], 'Color', undefined);
colors.makeVariable('greenColor', 'Green', 'Basic Green', green['300'], green['900'], 'Color', undefined);
colors.makeVariable('redColor', 'Red', 'Basic Red', red['300'], red['900'], 'Color', undefined);
colors.makeVariable('blueColor', 'Blue', 'Basic Blue', blue['300'], blue['900'], 'Color', undefined);
colors.makeVariable('yellowColor', 'Yellow', 'Basic Yellow', yellow['300'], yellow['900'], 'Color', undefined);

export const NoValueText = '-';

/**Defines all possible background colors for the button*/
export const enum BasicColors {
    Black = 'black',
    Green = 'green',
    Red = 'red',
    Blue = 'blue',
    Yellow = 'yellow',
};

export interface FormElementOptions<T> extends BaseOptions {
    /**Value for form element */
    value?: Value<T> | T
    /**Text for label above form element */
    label?: string
}

/** Base class for form elements for shared properties and methods*/
export abstract class FormElement<ValueType> extends Base {
    /**Returns the name used to define the element*/
    static elementName() { return '@abstract@' }
    /**Returns the namespace override for the element*/
    static elementNameSpace() { return 'chocolatelibui-form'; }
    /**Stores local copy of form element value*/
    protected _value: ValueType | undefined
    /**Stores reference to Value when used*/
    protected _Value: Value<ValueType> | undefined
    /**Listener for Value*/
    private _valueListener: Listener<ValueType> | undefined
    /**Label container*/
    protected _label: HTMLSpanElement = document.createElement('span');
    /**Listener for label change*/
    private _labelListener: Listener<string> | undefined
    /**Body of form element*/
    protected _body: HTMLDivElement = document.createElement('div');
    /**Flag for when user has changed the value of the form element*/
    readonly changed: boolean = false;

    constructor() {
        super();
        this.appendChild(this._label);
        this.appendChild(this._body);
        this._body.oncontextmenu = (e) => { e.preventDefault(); }
        this._body.ondragstart = (e) => { e.preventDefault(); }
    }

    /**Sets options for the element*/
    options(options: FormElementOptions<ValueType>) {
        super.options(options);
        if (typeof options.value !== 'undefined') {
            this.value = options.value;
        }
        if (options.label) {
            this.label = options.label;
        }
        return this;
    }

    /**Returns value of form element*/
    get value() {
        return this._value;
    }
    /**Changes value of form element*/
    set value(value: Value<ValueType> | ValueType | undefined) {
        //@ts-expect-error
        this.changed = false;
        if (this._valueListener) {
            this.dettachValue(this._valueListener);
            delete this._valueListener;
            delete this._Value;
        }
        if (typeof value === 'object' && value instanceof Value) {
            this._Value = value;
            this._ValueUpdate(value);
            this._valueListener = this.attachValue(value, (val) => {
                if (value) {
                    this._valueUpdate(val);
                    this._value = val;
                } else {
                    this._valueClear();
                    delete this._value;
                }
            });
        } else if (typeof value !== 'undefined') {
            this._valueUpdate(value);
            this._value = value;
        } else {
            this._valueClear();
            delete this._value;
        }
    }
    /**Called when Value is changed */
    protected abstract _ValueUpdate(value: Value<ValueType>): void
    /**Called when the form element is set to not use a Value anymore*/
    protected abstract _ValueClear(): void
    /**Called when value is changed */
    protected abstract _valueUpdate(value: ValueType): void
    /**Called when value cleared */
    protected abstract _valueClear(): void

    /**Called to change value*/
    protected _valueSet(value: ValueType) {
        //@ts-expect-error
        this.changed = true;
        if (this._Value) {
            this._Value.set = value;
        } else {
            this._valueUpdate(value);
            this._value = value
        }
    }

    /**Gets the current label of the element*/
    get label() {
        return this._label.innerHTML;
    }
    /**Sets the current label of the element*/
    set label(value: Value<string> | string | undefined) {
        if (this._labelListener) {
            this.dettachValue(this._labelListener);
            delete this._labelListener;
        }
        if (typeof value === 'object' && value instanceof Value) {
            this._labelListener = this.attachValue(value, (val) => {
                if (val) {
                    this._label.innerHTML = val;
                } else {
                    this._label.innerHTML = '';
                }
            });
        } else if (value) {
            this._label.innerHTML = value;
        } else {
            this._label.innerHTML = '';
        }
    }
}