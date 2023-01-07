import "./button.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormElementOptions, BasicColors, FormElement } from "../base";

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
    private _text: HTMLDivElement | undefined;
    private _icon: SVGSVGElement | undefined;
    private _click: (() => void) | undefined;
    private _color: BasicColors | undefined;

    /**Returns the name used to define the element*/
    static elementName() { return 'button' }

    constructor() {
        super();
        this.setAttribute('tabindex', '0');
    }

    /**Sets options for the button*/
    options(options: ButtonOptions) {
        super.options(options)
        this.text = options.text;
        this.icon = options.icon;
        this.clickAction = options.clickAction;
        this.color = options.color;
        this.toggle = options.toggle;
        return this;
    }

    /**Returns current text of button*/
    get text() {
        return this._text?.innerHTML;
    }
    /**Changes the text of the button*/
    set text(text: string | undefined) {
        if (text) {
            if (!this._text) {
                this._text = this.appendChild(document.createElement('div'));
            }
            this._text.innerHTML = text;
        } else if (this._text) {
            this.removeChild(this._text);
            delete this._text;
        }
    }

    /**Returns current icon of button*/
    get icon() {
        return this._icon;
    }
    /**Changes the icon of the button*/
    set icon(icon: SVGSVGElement | undefined) {
        if (icon) {
            if (this._icon) {
                this.replaceChild(icon, this._icon);
                this._icon = icon;
            } else {
                this._icon = this.insertBefore(icon, this.firstChild);
            }
        } else if (this._icon) {
            this.removeChild(this._icon);
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
            this.setAttribute('color', color);
        } else if (this._color) {
            this.removeAttribute('color');
            delete this._color;
        }
    }

    /**Called when value is changed */
    protected _valueUpdate(value: Boolean) {
        if (value) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
    }
    /**Called when value cleared */
    protected _valueClear() {
        this.classList.remove('active');
    }

    /**Changes whether the button is maintained or momentary*/
    set toggle(toggle: boolean | undefined) {
        if (toggle) {
            this.onpointerdown = null;
            this.onpointerup = null;
            this.onkeydown = (e) => {
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
                                    if (this._click) {
                                        this._click();
                                    }
                                    break;
                                }
                            }
                            this.onkeyup = null;
                        }
                        break;
                    }
                }
            };
            this.onclick = (e) => {
                e.stopPropagation();
                this._valueSet(!this._value);
                if (this._click) {
                    this._click();
                }
            }
        } else {
            this.onpointerdown = (e) => {
                e.stopPropagation();
                if (e.pointerType == 'touch') {
                    e.preventDefault();
                }
                this.setPointerCapture(e.pointerId);
                this._valueSet(true);
                this.onpointerup = (ev) => {
                    ev.stopPropagation();
                    this.releasePointerCapture(ev.pointerId);
                    this._valueSet(false);
                    if (this._click) {
                        this._click();
                    }
                    this.onpointerup = null;
                }
            }
            this.onkeydown = (e) => {
                e.stopPropagation();
                switch (e.key) {
                    case 'Enter':
                    case ' ': {
                        this._valueSet(true);
                        this.onkeyup = (e) => {
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
                            this.onkeyup = null;
                        }
                        break;
                    }
                }
            };
            this.onclick = null;
        }
    }
}
defineElement(Button);
