import "./lamp.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormElementOptions, BasicColors, FormElement } from "../base";
import { Listener, Value } from "@chocolatelib/value";

interface LampOptions extends FormElementOptions<number | boolean> {
    /**Lamp text */
    text?: string
    /**Icon for lamp */
    icon?: SVGSVGElement
    /**Sets the lamp colors */
    colors?: BasicColors[]
}

/**Lamp for clicking*/
export class Lamp extends FormElement<number | boolean> {
    private _text: HTMLSpanElement;
    private _textListener: Listener<string> | undefined
    private _icon: SVGSVGElement | undefined;
    private _colors: BasicColors[] = [];

    /**Returns the name used to define the element*/
    static elementName() { return 'lamp' }

    constructor() {
        super();
        this._text = this._body.appendChild(document.createElement('span'));
    }

    /**Sets options for the lamp*/
    options(options: LampOptions) {
        super.options(options)
        this.text = options.text;
        this.icon = options.icon;
        this.colors = options.colors;
        return this;
    }

    /**Gets the current text of the button*/
    get text() {
        return this._text.innerHTML;
    }
    /**Sets the current text of the button*/
    set text(value: Value<string> | string | undefined) {
        if (this._textListener) {
            this.dettachValue(this._textListener);
            delete this._textListener;
        }
        if (typeof value === 'object' && value instanceof Value) {
            this._textListener = this.attachValue(value, (val) => {
                if (val) {
                    this._text.innerHTML = val;
                } else {
                    this._text.innerHTML = '';
                }
            });
        } else if (value) {
            this._text.innerHTML = value;
        } else {
            this._text.innerHTML = '';
        }
    }

    /**Returns current icon of lamp*/
    get icon() {
        return this._icon;
    }
    /**Changes the icon of the lamp*/
    set icon(icon: SVGSVGElement | undefined) {
        if (icon) {
            if (this._icon) {
                this._body.replaceChild(icon, this._icon);
                this._icon = icon;
            } else {
                this._icon = this._body.insertBefore(icon, this._body.firstChild);
            }
        } else if (this._icon) {
            this._body.removeChild(this._icon);
            delete this._icon;
        }
    }

    /** Sets the background color of the lamp*/
    set colors(colors: BasicColors[] | undefined) {
        colors;
        if (colors instanceof Array) {
            this._colors = colors;
        } else {
            this._colors = [BasicColors.Black];
        }
    }

    /**Called when value is changed */
    protected _valueUpdate(value: number | boolean) {
        let color = this._colors[Number(value)];
        if (color) {
            this._body.setAttribute('color', <string>color);
        } else {
            this._body.removeAttribute('color');
        }
    }
    /**Called when value cleared */
    protected _valueClear() {
        this.removeAttribute('color');
    }
}
defineElement(Lamp);
