import "./progress.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormElementOptions, FormElement, NoValueText } from "../base";
import { Value } from "@chocolatelib/value";

interface ProgressOptions extends FormElementOptions<number> {
    /**Lower limit for slider value*/
    min?: number,
    /**Upper limit for slider value*/
    max?: number,
    /**Amount of decimals to show*/
    decimals?: number,
    /**Unit to use for slider*/
    unit?: string | Value<string>
}


/**Slide Selector, displays all options in a slider*/
export class Progress extends FormElement<number> {
    private _body: HTMLDivElement;
    private _bar: HTMLDivElement;
    private _val: HTMLSpanElement;
    private _unit: HTMLSpanElement;
    private _unitListener: ((value: string) => void) | undefined

    private _min: number = 0;
    private _max: number = 100;
    private _span: number = 100;
    private _decimals: number = 0;

    /**Returns the name used to define the element*/
    static elementName() { return 'progress' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._bar = this._body.appendChild(document.createElement('div'));
        this._val = this._body.appendChild(document.createElement('span'));
        this._unit = this._body.appendChild(document.createElement('span'));
    }

    /**Sets options for the slider*/
    options(options: ProgressOptions) {
        this.min = options.min;
        this.max = options.max;
        this.decimals = options.decimals;
        super.options(options)
        this.unit = options.unit;
        return this;
    }

    /**Moves the slider to the given percent position*/
    private _movePerc(perc: number) {
        perc = Math.min(Math.max(perc, 0), 100);
        this._bar.style.width = perc + '%';
    }

    /**Sets the unit of the inputbox*/
    set unit(unit: string | Value<string> | undefined) {
        if (this._unitListener) {
            this.dettachValue(this._unitListener);
            delete this._unitListener;
        }
        if (typeof unit === 'object' && unit instanceof Value) {
            this._unitListener = this.attachValue(unit, (val) => {
                if (val) {
                    this._unit.innerHTML = val;
                } else {
                    this._unit.innerHTML = '';
                }
            });
        } else if (unit) {
            this._unit.innerHTML = unit;
        } else {
            this._unit.innerHTML = '';
        }
    }

    /**Returns the current unit*/
    get unit() {
        return ''
    }

    /**Gets the minimum value on the slider*/
    get min() {
        return this._min;
    }
    /**Set the minimum value on the slider*/
    set min(min: number | undefined) {
        this._min = min ?? 0;
        this._span = this._max - this._min;
    }

    /**Gets the maximum value on the slider*/
    get max() {
        return this._max;
    }
    /**Set the maximum value on the slider*/
    set max(max: number | undefined) {
        this._max = max ?? 100;
        this._span = this._max - this._min;
    }

    /**Gets the amount of decimals the slider can have*/
    get decimals() {
        return this._decimals
    }
    /**Sets the amount of decimals the slider can have*/
    set decimals(dec: number | undefined) {
        this._decimals = Math.max(dec ?? 0, 0);
    }

    /**Called when value is changed */
    protected _valueUpdate(value: number) {
        this._movePerc((-this._min + value) / this._span * 100);
        this._val.innerHTML = (value.toFixed(this._decimals));
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._movePerc(50);
        this._val.innerHTML = NoValueText;
    }
}
defineElement(Progress);
