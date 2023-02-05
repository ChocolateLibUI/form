import "./toggleButton.scss"
import { SelectorBase, SelectorOption } from "../selectorBase";
import { defineElement } from "@chocolatelibui/core";
import { Value } from "@chocolatelib/value";

/**Toggle buttons, displays all options in a multi toggler*/
export class ToggleButton<T> extends SelectorBase<T> {

    /**Returns the name used to define the element*/
    static elementName() { return 'togglebutton' }

    protected _addSelection(sel: SelectorOption<T>) {
        let top = this._body.appendChild(document.createElement('div'));
        top.tabIndex = 0;
        let bot = this._body.appendChild(document.createElement('div'));
        if (sel.icon) {
            top.appendChild(sel.icon);
            bot.textContent = sel.name;
        } else {
            top.textContent = sel.name;
        }
        let click = () => {
            console.warn('yo');
            this._valueSet(sel.value);
        }
        top.onclick = click;
        bot.onclick = click;
    }

    protected _clearSelections() {
        this._body.replaceChildren();
    }

    protected _setSelection() { }

    /**Called when value is changed */
    protected _valueUpdate(value: T) {

    }
    /**Called when value cleared */
    protected _valueClear() {
    }

    /**Called when Value is changed */
    protected _ValueUpdate(value: Value<T>) {

    }
    /**Called when the form element is set to not use a Value anymore*/
    protected _ValueClear() {

    }
}
defineElement(ToggleButton);