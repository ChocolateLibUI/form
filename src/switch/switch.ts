import "./switch.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormElementOptions, FormElement } from "../base";
import { Listener, Value } from "@chocolatelib/value";

interface ToggleSwitchOptions extends FormElementOptions<boolean> {
    /**Icon to use for left side*/
    icon?: SVGSVGElement,
    /**Text besides toggleswitch */
    text?: Value<string> | string,
}

/**Toggle Switch, switches between on and off*/
export class Switch extends FormElement<boolean> {
    private _switch: HTMLDivElement;
    private _icon: SVGSVGElement | undefined;
    private _preventClick: boolean = false;
    private _text: HTMLSpanElement;
    private _textListener: Listener<string> | undefined

    /**Returns the name used to define the element*/
    static elementName() { return 'switch' }

    constructor() {
        super();
        this._switch = this._body.appendChild(document.createElement('div'));
        this._switch.setAttribute('tabindex', '0');
        this._text = this._body.appendChild(document.createElement('span'));

        this._switch.onkeydown = (e) => {
            switch (e.key) {
                case 'Enter':
                case ' ': {
                    e.stopPropagation();
                    e.preventDefault();
                    this.onkeyup = (e) => {
                        switch (e.key) {
                            case 'Enter':
                            case ' ': {
                                e.stopPropagation();
                                e.preventDefault();
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
            if (e.button === 0) {
                e.stopPropagation();
                this._switch.classList.add('active');
                this._switch.setPointerCapture(e.pointerId);
                let hasMoved = false;
                this._switch.onpointermove = (ev) => {
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
                    ev.stopPropagation();
                    this._switch.classList.remove('active');
                    if (!hasMoved) {
                        this._valueSet(!this._value);
                    }
                    this._switch.releasePointerCapture(ev.pointerId);
                    this._switch.onpointerup = null;
                    this._switch.onpointermove = null;
                }
            }
        }

        this._switch.onclick = (e) => {
            e.stopPropagation();
        }

        this._body.onclick = (e) => {
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
        if (options.text) {
            this.text = options.text;
        }
        return this;
    }

    /**Gets the current label of switch*/
    get text() {
        return this._text.innerHTML;
    }
    /**Sets the current label of switch*/
    set text(value: Value<string> | string | undefined) {
        if (this._textListener) {
            this.dettachValue(this._textListener);
            delete this._textListener;
        }
        if (typeof value === 'object' && value instanceof Value) {
            this._textListener = this.attachValue(value, (val) => {
                if (val) {
                    this._text.innerHTML = val;
                } else {
                    this._text.innerHTML = '';
                }
            });
        } else if (value) {
            this._text.innerHTML = value;
        } else {
            this._text.innerHTML = '';
        }
    }

    /**Returns the icon of the switch */
    get icon() {
        return this._icon;
    }

    /**Changes the icon of the switch*/
    set icon(icon: SVGSVGElement | undefined) {
        if (icon) {
            this._icon = this._body.insertBefore(icon, this._text);
        } else if (this._icon) {
            this._body.removeChild(this._icon);
            delete this._icon;
        }
    }

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
defineElement(Switch);
