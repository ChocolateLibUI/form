import "./lamp.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormBaseOptions, BasicColors, FormBase } from "../base";

interface LampOptions extends FormBaseOptions<number | boolean> {
    /**Lamp text */
    text?: string
    /**Icon for lamp */
    icon?: SVGSVGElement
    /**Sets the lamp colors */
    colors?: BasicColors[]
}

/**Lamp for clicking*/
export class Lamp extends FormBase<number | boolean> {
    private _text: HTMLDivElement | undefined;
    private _icon: SVGSVGElement | undefined;
    private _colors: BasicColors[] = [];
    private _body: HTMLDivElement;

    /**Returns the name used to define the element*/
    static elementName() { return 'lamp' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
    }

    /**Sets options for the lamp*/
    options(options: LampOptions) {
        super.options(options)
        this.text = options.text;
        this.icon = options.icon;
        this.colors = options.colors;
        return this;
    }

    /**Returns current text of lamp*/
    get text() {
        return this._text?.innerHTML;
    }
    /**Changes the text of the lamp*/
    set text(text: string | undefined) {
        if (text) {
            if (!this._text) {
                this._text = this._body.appendChild(document.createElement('div'));
            }
            this._text.innerHTML = text;
        } else if (this._text) {
            this._body.removeChild(this._text);
            delete this._text;
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
            this.setAttribute('color', <string>color);
        } else {
            this.removeAttribute('color');
        }
    }
    /**Called when value cleared */
    protected _valueClear() {
        this.removeAttribute('color');
    }
}
defineElement(Lamp);
