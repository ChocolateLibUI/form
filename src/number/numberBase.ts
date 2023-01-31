import "./numberBase.scss"
import { FormElementOptions, FormElement } from "../base";
import { Value } from "@chocolatelib/value";

export interface NumberBaseOptions extends FormElementOptions<number> {
    /**Lower limit for slider value*/
    min?: number,
    /**Upper limit for slider value*/
    max?: number,
    /**Amount of decimals to show*/
    decimals?: number,
    /**Unit to use for slider*/
    unit?: string | Value<string>
}

/**Base for number elements elements*/
export class NumberBase extends FormElement<number> {
    protected _min: number = 0;
    protected _max: number = 100;
    protected _span: number = 100;
    protected _decimals: number = 0;
    protected _unit: HTMLSpanElement = document.createElement('span');
    protected _unitListener: ((value: string) => void) | undefined

    /**Returns the name used to define the element*/
    static elementName() { return '@abstract@' }

    /**Sets options for the element*/
    options(options: NumberBaseOptions) {
        this.min = options.min;
        this.max = options.max;
        this.decimals = options.decimals;
        super.options(options)
        this.unit = options.unit;
        return this;
    }

    /**Gets the minimum value on the element*/
    get min() {
        return this._min;
    }
    /**Set the minimum value on the element*/
    set min(min: number | undefined) {
        this._min = min ?? 0;
        this._span = this._max - this._min;
    }

    /**Gets the maximum value on the element*/
    get max() {
        return this._max;
    }
    /**Set the maximum value on the element*/
    set max(max: number | undefined) {
        this._max = max ?? 100;
        this._span = this._max - this._min;
    }

    /**Gets the amount of decimals the element can have*/
    get decimals() {
        return this._decimals
    }
    /**Sets the amount of decimals the element can have*/
    set decimals(dec: number | undefined) {
        this._decimals = Math.max(dec ?? 0, 0);
    }

    /**Returns the current unit value*/
    get unit(): string {
        return this._unit.textContent || ''
    }

    /**Sets the unit of the element*/
    set unit(unit: string | Value<string> | undefined) {
        if (this._unitListener) {
            this.dettachValue(this._unitListener);
            delete this._unitListener;
        }
        if (typeof unit === 'object' && unit instanceof Value) {
            this._unitListener = this.attachValue(unit, (val) => { this._setUnit(val); });
        } else {
            this._setUnit(unit);
        }
    }

    protected _setUnit(unit: string | undefined) {
        this._unit.textContent = unit || '';
    }
}
