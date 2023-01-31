import "./progress.scss"
import { defineElement } from "@chocolatelibui/core";
import { NumberBase, NumberBaseOptions } from "../numberBase";
import { NoValueText } from "../../base";


/**Slide Selector, displays all options in a slider*/
export class Progress extends NumberBase {
    private _body: HTMLDivElement;
    private _bar: HTMLDivElement;
    private _val: HTMLSpanElement;

    /**Returns the name used to define the element*/
    static elementName() { return 'progress' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._bar = this._body.appendChild(document.createElement('div'));
        this._val = this._body.appendChild(document.createElement('span'));
        this._body.appendChild(this._unit);
    }

    /**Sets options for the slider*/
    options(options: NumberBaseOptions) {
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
