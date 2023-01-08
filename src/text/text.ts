import "./text.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormElement } from "../base";

/**Component for simple text */
export class TextField extends FormElement<string> {
    /**Returns the name used to define the element*/
    static elementName() { return 'text' }

    constructor() {
        super();
        this.appendChild(this._label);
    }
}
defineElement(TextField);

/**Element for form titles */
export class TitleField extends FormElement<string> {
    /**Returns the name used to define the element*/
    static elementName() { return 'title' }

    constructor() {
        super();
        this.appendChild(this._label);
    }
}
defineElement(TitleField);