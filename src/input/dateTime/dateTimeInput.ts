import "./dateTimeInput.scss"
import { defineElement } from "@chocolatelibui/core";
import { InputBase } from "../inputBase";
import { FormElementOptions } from "../../base";
import { material_action_calendar_month_rounded, material_action_schedule_rounded } from "@chocolatelibui/icons";

export interface DateTimeInputOptions<T> extends FormElementOptions<T> {
    /**Type of date time*/
    type?: DateTimeType,
    mode?: DateTimeMode
}

export const enum DateTimeType {
    DATE = 'date',
    TIME = 'time',
    DATETIME = 'datetime',
}

export const enum DateTimeMode {
    DATE = 'date',
    STRING = 'string',
    NUMBER = 'number',
}

/**Color selector*/
export class DateTimeInput<T extends Date | string | number> extends InputBase<T> {
    private _type: DateTimeType = DateTimeType.DATETIME;
    private _mode: DateTimeMode = DateTimeMode.DATE;

    /**Returns the name used to define the element*/
    static elementName() { return 'datetime' }

    constructor() {
        super();
        this._input.type = 'datetime-local';
        this._input.step = '1';
        this._body.appendChild(material_action_calendar_month_rounded()).onclick = () => { this._input.showPicker(); };
        this._body.appendChild(material_action_schedule_rounded()).onclick = () => { this._input.showPicker(); };
        this._input.onchange = () => {
            switch (this._mode) {
                case DateTimeMode.DATE:
                    this._valueSet(<any>new Date(this._input.value));
                    break;
                case DateTimeMode.STRING:
                    this._valueSet(<any>this._input.value);
                    break;
                case DateTimeMode.NUMBER:
                    this._valueSet(<any>(new Date(this._input.value)).getTime());
                    break;
            }
            console.warn(BigInt((new Date(this._input.value)).getTime()));
        }
    }

    /**Called when value is changed */
    protected _valueUpdate(value: T) {
        switch (typeof value) {
            case 'number':

                break;
            case 'string':

                break;
            case 'object':
                break;
        }
        switch (this._type) {
            case DateTimeType.DATE:
                this._input.valueAsDate = (<Date>value);
                break;
            case DateTimeType.TIME:
                this._input.valueAsDate = (<Date>value);
                break;
            case DateTimeType.DATETIME:
                //this._input.valueAsDate = (<Date>value);
                break;
        }
    }

    /**Called when value cleared */
    protected _valueClear() {
        this._input.value = ''
    }

    /**Sets options for the element*/
    options(options: DateTimeInputOptions<T>) {
        if (options.type) {
            this.type = options.type;
        }
        super.options(options);
        if (options.mode) {
            this.mode = options.mode;
        }
        return this;
    }

    /**Returns the date time type*/
    get type() {
        return this._type;
    }

    /**Sets the date time type*/
    set type(type: DateTimeType) {
        switch (type) {
            case DateTimeType.DATE:
                this._input.type = 'date';
                break;
            case DateTimeType.TIME:
                this._input.type = 'time';
                break;
            case DateTimeType.DATETIME:
                this._input.type = 'datetime-local';
                break;
        }

        this._type = type;
    }

    /**Returns the date time type*/
    get mode() {
        return this._mode;
    }
    /**Sets the date time type*/
    set mode(mode: DateTimeMode) {
        this._mode = mode;
    }

    /**Returns the date time type*/
    get step() {
        return Number(this._input.step);
    }
    /**Sets the date time type*/
    set step(step: number) {
        this._input.step = String(step);
    }

    /**Returns the date time type*/
    get min() {
        return Number(this._input.min);
    }
    /**Sets the date time type*/
    set min(min: number) {
        this._input.min = String(min);
    }

    /**Returns the date time type*/
    get max() {
        return Number(this._input.max);
    }
    /**Sets the date time type*/
    set max(max: number) {
        this._input.max = String(max);
    }

}
defineElement(DateTimeInput);
