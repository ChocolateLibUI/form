import "./toggleButton.scss"
import { SelectorBase, SelectorOption } from "../selectorBase";
import { defineElement } from "@chocolatelibui/core";

/**Toggle buttons, displays all options in a multi toggler*/
export class ToggleButton<T> extends SelectorBase<T> {
    /**Returns the name used to define the element*/
    static elementName() { return 'togglebutton' }

    constructor() {
        super()

    }

    protected _addSelection(sel: SelectorOption<T>) {
        let col = this._body.appendChild(document.createElement('div'));
        let top = col.appendChild(document.createElement('div'));
        let bot = col.appendChild(document.createElement('div'));
    }

    protected _clearSelections() {

    }
}
defineElement(ToggleButton);