import "./ipInput.scss"
import { defineElement } from "@chocolatelibui/core";
import { InputBase } from "../inputBase";

/**Color selector*/
export class IpInput extends InputBase<string> {
    /**Returns the name used to define the element*/
    static elementName() { return 'ipinput' }

    constructor() {
        super();
        this._input.type = 'url';
    }
}
defineElement(IpInput);
