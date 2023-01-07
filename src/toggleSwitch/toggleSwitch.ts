import "./toggleSwitch.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormElementOptions, FormElement } from "../base";

interface ToggleSwitchOptions extends FormElementOptions<boolean> {
    /**Lower limit for slider value*/
    text?: number,
    /**Icon to use for left side*/
    icon?: SVGSVGElement,
}

/**Toggle Switch, switches between on and off*/
export class ToggleSwitch extends FormElement<boolean> {
    private _switch: HTMLDivElement;
    private _icon: SVGSVGElement | undefined;
    private _preventClick: boolean = false;

    /**Returns the name used to define the element*/
    static elementName() { return 'toggleswitch' }


    constructor() {
        super();
        this.appendChild(this._label);
        this._switch = this.appendChild(document.createElement('div'));
        this._switch.setAttribute('tabindex', '0');
        this._switch.onkeydown = (e) => {
            e.stopPropagation();
            switch (e.key) {
                case 'Enter':
                case ' ': {
                    this.onkeyup = (e) => {
                        e.stopPropagation();
                        switch (e.key) {
                            case 'Enter':
                            case ' ': {
                                this._valueSet(!this._value);
                                break;
                            }
                        }
                        this.onkeyup = null;
                    }
                    break;
                }
            }
        };

        this._switch.onpointerdown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this._switch.focus();
            this._switch.setPointerCapture(e.pointerId);
            let hasMoved = false;
            this._switch.onpointermove = (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                if (hasMoved) {
                    let box = this._switch.getBoundingClientRect();
                    let midCord = box.x + box.width / 2;
                    if (ev.clientX > midCord) {
                        if (!this._value) {
                            this._valueSet(true);
                        }
                    } else {
                        if (this._value) {
                            this._valueSet(false);
                        }
                    }
                } else if (Math.abs(e.clientX - ev.clientX) > 10 || Math.abs(e.clientY - ev.clientY) > 10) {
                    hasMoved = true;
                }
            };

            this._switch.onpointerup = (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                if (!hasMoved) {
                    this._valueSet(!this._value);
                }
                this._switch.releasePointerCapture(ev.pointerId);
                this._switch.onpointerup = null;
                this._switch.onpointermove = null;
            }
        }

        this._switch.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
        }

        this.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this._preventClick) {
                this._preventClick = false;
                return;
            }
            this._valueSet(!this._value);
        }

    }

    /**Sets options for the toggleswitch*/
    options(options: ToggleSwitchOptions) {
        super.options(options)
        if (options.icon) {
            this.icon = options.icon;
        }
        return this;
    }

    /**Changes the icon of the switch*/
    set icon(icon: SVGSVGElement | undefined) {
        if (icon) {
            this._icon = this.insertBefore(icon, this.firstChild);
        } else if (this._icon) {
            this.removeChild(this._icon);
            delete this._icon;
        }
    }

    // /**Set text of switch
    //  * @param {string} text */
    // set text(text) {
    //     if (typeof text == 'string') {
    //         if (!this.__text) {
    //             this.__text = this.insertBefore(document.createElement('span'), this.__switch);
    //         }
    //         this.__text.innerHTML = text;
    //     } else if (this.__text) {
    //         this.removeChild(this.__text);
    //         delete this.__text;
    //     }
    // }

    /**Called when value is changed */
    protected _valueUpdate(value: boolean) {
        if (value) {
            this._switch.classList.add('on');
        } else {
            this._switch.classList.remove('on');
        }
    }
    /**Called when value cleared */
    protected _valueClear() { }
}
defineElement(ToggleSwitch);
