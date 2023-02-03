import "./selectorBase.scss"
import { FormElementOptions, FormElement } from "../base";

export interface SelectorOption<T> {
    /**Value to set when option is selected */
    value: T,
    /**Icon to display for option*/
    icon: SVGSVGElement,
    /** */
    name: string,
}

export interface SelectorBaseOptions<T> extends FormElementOptions<T> {
    /**Options for selector*/
    selection?: SelectorOption<T>[],
    /**Defalt text displayed*/
    default?: string,
}

/**Base for number elements elements*/
export class SelectorBase<T> extends FormElement<T> {
    protected _default: string = '';

    /**Sets options for the element*/
    options(options: SelectorBaseOptions<T>) {
        this.selections = options.selection;
        this.default = options.default;
        return this;
    }

    get selections() {
        return
    }

    set selections(sel: SelectorOption<T>[] | undefined) {
        this._clearSelections();
        if (sel) {
            for (let i = 0; i < sel.length; i++) {
                this._addSelection(sel[i]);
            }
        }
    }

    get default() {
        return ''
    }

    set default(def: string | undefined) {

    }

    protected _addSelection(sel: SelectorOption<T>) {

    }

    protected _clearSelections() {

    }
}
