import "./button.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormElementOptions, BasicColors, FormElement } from "../base";
import { Listener, Value } from "@chocolatelib/value";

interface ButtonOptions extends FormElementOptions<boolean> {
    /**Buttons text */
    text?: string
    /**Icon for button */
    icon?: SVGSVGElement
    /**Function to call on button click */
    clickAction?: () => void
    /**Set true to make button toggle on click instead of normal */
    toggle?: boolean
    /**Changes the buttons color */
    color?: BasicColors
}

/**Button for clicking*/
export class Button extends FormElement<boolean> {
    private _body: HTMLDivElement;
    private _text: HTMLSpanElement;
    private _textListener: Listener<string> | undefined
    private _icon: SVGSVGElement | undefined;
    private _click: (() => void) | undefined;
    private _color: BasicColors | undefined;

    /**Returns the name used to define the element*/
    static elementName() { return 'button' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._body.setAttribute('tabindex', '0');
        this._text = this._body.appendChild(document.createElement('span'));
    }

    /**Sets options for the button*/
    options(options: ButtonOptions) {
        super.options(options)
        if (options.text) {
            this.text = options.text;
        }
        if (options.icon) {
            this.icon = options.icon;
        }
        if (options.clickAction) {
            this.clickAction = options.clickAction;
        }
        if (options.color) {
            this.color = options.color;
        }
        this.toggle = options.toggle;
        return this;
    }

    /**Gets the current text of the button*/
    get text() {
        return this._text.innerHTML;
    }
    /**Sets the current text of the button*/
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


    /**Returns the icon of the button */
    get icon() {
        return this._icon;
    }

    /**Changes the icon of the button*/
    set icon(icon: SVGSVGElement | undefined) {
        if (icon) {
            this._icon = this._body.insertBefore(icon, this._text);
        } else if (this._icon) {
            this._body.removeChild(this._icon);
            delete this._icon;
        }
    }


    /**Returns the button click action */
    get clickAction() {
        return this._click
    }
    /**Function to call on button click*/
    set clickAction(func: (() => void) | undefined) {
        this._click = func;
    }

    /**Returns current color of button*/
    get color() {
        return this._color;
    }
    /**Changes the color of the button*/
    set color(color: BasicColors | undefined) {
        if (color) {
            this._body.setAttribute('color', color);
        } else if (this._color) {
            this._body.removeAttribute('color');
            delete this._color;
        }
    }

    /**Called when value is changed */
    protected _valueUpdate(value: Boolean) {
        if (value) {
            this._body.classList.add('active');
        } else {
            this._body.classList.remove('active');
        }
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._body.classList.remove('active');
    }

    /**Changes whether the button is maintained or momentary*/
    set toggle(toggle: boolean | undefined) {
        if (toggle) {
            this._body.onpointerdown = null;
            this._body.onpointerup = null;
            this._body.onkeydown = (e) => {
                e.stopPropagation();
                switch (e.key) {
                    case 'Enter':
                    case ' ': {
                        this._body.onkeyup = (e) => {
                            e.stopPropagation();
                            switch (e.key) {
                                case 'Enter':
                                case ' ': {
                                    this._valueSet(!this._value);
                                    if (this._click) {
                                        this._click();
                                    }
                                    break;
                                }
                            }
                            this._body.onkeyup = null;
                        }
                        break;
                    }
                }
            };
            this._body.onclick = (e) => {
                e.stopPropagation();
                this._valueSet(!this._value);
                if (this._click) {
                    this._click();
                }
            }
        } else {
            this._body.onpointerdown = (e) => {
                e.stopPropagation();
                if (e.pointerType == 'touch') {
                    e.preventDefault();
                }
                this._body.setPointerCapture(e.pointerId);
                this._valueSet(true);
                this._body.onpointerup = (ev) => {
                    ev.stopPropagation();
                    this._body.releasePointerCapture(ev.pointerId);
                    this._valueSet(false);
                    if (this._click) {
                        this._click();
                    }
                    this._body.onpointerup = null;
                }
            }
            this._body.onkeydown = (e) => {
                e.stopPropagation();
                switch (e.key) {
                    case 'Enter':
                    case ' ': {
                        this._valueSet(true);
                        this._body.onkeyup = (e) => {
                            e.stopPropagation();
                            switch (e.key) {
                                case 'Enter':
                                case ' ': {
                                    this._valueSet(false);
                                    if (this._click) {
                                        this._click();
                                    }
                                    break;
                                }
                            }
                            this._body.onkeyup = null;
                        }
                        break;
                    }
                }
            };
            this._body.onclick = null;
        }
    }
}
defineElement(Button);
