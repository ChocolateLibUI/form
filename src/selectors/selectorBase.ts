import "./selectorBase.scss"
import { FormElementOptions, FormElement } from "../base";
import { Value } from "@chocolatelib/value";

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
    options?: SelectorOption<T>[],
    /**Defalt text displayed*/
    default?: string,
}

/**Base for number elements elements*/
export class SelectorBase<T> extends FormElement<T> {
    /**Returns the name used to define the element*/
    static elementName() { return '@abstract@' }

}
