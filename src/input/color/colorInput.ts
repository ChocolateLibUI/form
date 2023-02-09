import "./colorInput.scss"
import { defineElement } from "@chocolatelibui/core";
import { InputBase } from "../inputBase";

/**Color selector*/
export class ColorInput extends InputBase<string> {
    private _valueBox: HTMLInputElement;

    /**Returns the name used to define the element*/
    static elementName() { return 'colorinput' }

    constructor() {
        super();
        this._valueBox = this._body.appendChild(document.createElement('input'));
        this._valueBox.type = 'color';
    }
}
defineElement(ColorInput);
