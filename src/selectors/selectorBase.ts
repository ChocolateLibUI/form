import "./selectorBase.scss"
import { FormElementOptions, FormElement } from "../base";
import { Value } from "@chocolatelib/value";

export interface SelectorBaseOptions extends FormElementOptions<number> {
    /**Lower limit for slider value*/
    min?: number,
    /**Upper limit for slider value*/
    max?: number,
    /**Step size, use 0 for automatic step size*/
    step?: number | ((value: number) => number),
    /**Amount of decimals to show*/
    decimals?: number,
    /**Unit to use for slider*/
    unit?: string | Value<string>
}

/**Base for number elements elements*/
export class SelectorBase extends FormElement<number> {
    /**Returns the name used to define the element*/
    static elementName() { return '@abstract@' }

}
