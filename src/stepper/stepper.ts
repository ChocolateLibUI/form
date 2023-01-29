import "./stepper.scss"
import { defineElement } from "@chocolatelibui/core";
import { material_content_remove_rounded, material_content_add_rounded } from "@chocolatelibui/icons";
import { FormElementOptions, FormElement } from "../base";
import { Listener, Value } from "@chocolatelib/value";

interface StepperOptions extends FormElementOptions<number> {
    /**Lower limit for slider value*/
    min?: number,
    /**Upper limit for slider value*/
    max?: number,
    /**Step size, use 0 for automatic step size*/
    step?: number | ((value: number) => number),
    /**Amount of decimals to show*/
    decimals?: number,
    /**Icon to use for decreasing value*/
    iconDec?: SVGSVGElement,
    /**Icon to use for increasing value*/
    iconInc?: SVGSVGElement,
    /**Unit to use for slider*/
    unit?: string | Value<string>
}

/**Slide Selector, displays all options in a slider*/
export class Stepper extends FormElement<number> {
    private _body: HTMLDivElement;
    private _iconLeft: SVGSVGElement;
    private _iconRight: SVGSVGElement;
    private _text: HTMLSpanElement;
    //private _valueBox: HTMLSpanElement;
    // private _unit: HTMLSpanElement;
    private _unitListener: Listener<string> | undefined

    private _min: number = -Infinity;
    private _max: number = Infinity;
    private _step: number = Infinity;
    private _stepFunc: ((value: number) => number) | undefined;
    private _decimals: number = 0;

    /**Returns the name used to define the element*/
    static elementName() { return 'stepper' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._body.oncontextmenu = (e) => { e.preventDefault(); };
        this._body.setAttribute('tabindex', '0');
        this._iconLeft = this._stepperFunc(this._body.appendChild(material_content_remove_rounded()), false);
        this._text = this._body.appendChild(document.createElement('span'));
        this._text.contentEditable = 'true';
        this._text.innerHTML = '0'
        this._text.setAttribute('tabindex', '-1');
        this._iconRight = this._stepperFunc(this._body.appendChild(material_content_add_rounded()), true);


        this._text.onpointerdown = (e) => {
            if (e.pointerType !== 'touch' && e.button === 0) {
                e.stopPropagation();
                let scrolling = false;
                let x = e.screenX;
                this._text.setPointerCapture(e.pointerId);
                this._text.onpointermove = (ev) => {
                    if (scrolling) {
                        let diff = ev.screenX - x;
                        if (Math.abs(diff) > 5) {
                            if (diff > 0) {
                                this._stepValue(true);
                            } else {
                                this._stepValue(false);
                            }
                            x = ev.screenX;
                        }
                    } else {
                        if (Math.abs(e.clientX - ev.clientX) > 5) {
                            this._text.contentEditable = 'false';
                            scrolling = true;
                        }
                    }
                }
                this._text.onpointerup = () => {
                    this._text.contentEditable = 'true';
                    this._text.releasePointerCapture(e.pointerId);
                    this._text.onpointermove = null
                    this._text.onpointerup = null
                }
            }
        }
        this._text.ontouchstart = (e) => {
            let id = e.changedTouches[0].identifier;
            e.stopPropagation();
            let scrolling = false;
            let x = e.touches[id].clientX;
            this._text.ontouchmove = (ev) => {
                if (scrolling) {
                    let diff = ev.touches[id].clientX - x;
                    if (Math.abs(diff) > 5) {
                        if (diff > 0) {
                            this._stepValue(true);
                        } else {
                            this._stepValue(false);
                        }
                        x = ev.touches[id].clientX;
                    }
                } else {
                    if (Math.abs(e.touches[id].clientX - ev.touches[id].clientX) > 5) {
                        this._text.contentEditable = 'false';
                        scrolling = true;
                    }
                }
            }
            this._text.ontouchend = () => {
                this._text.contentEditable = 'true';
                this._text.ontouchmove = null
                this._text.ontouchend = null
            }
        }

        this._body.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.stopPropagation();
                    e.preventDefault();
                    this._stepValue(true);
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.stopPropagation();
                    e.preventDefault();
                    this._stepValue(false);
                    break;
                default:
                    if (/[\d,.-]/g.test(e.key)) {
                        this._text.textContent = '';
                        this._text.focus();
                    }
            }
        };
        this._text.onkeydown = (e) => {
            e.stopPropagation();
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    this._text.blur();
                    break;

            }
        };
        this._text.onbeforeinput = (e) => {
            console.warn(e);
            console.warn(this._text.innerHTML);
            switch (e.inputType) {
                case 'deleteContentForward':
                case 'deleteContentBackward':
                case 'deleteByDrag':

                    break;

                default:
                    break;
            }


            if (e.data) {
                if (!/[\d,.-]/g.test(e.data)) {
                    e.preventDefault()
                } else if (/[,.]/g.test(e.data) && this._decimals === 0) {
                    e.preventDefault()
                }
            }

        };
        this._text.onblur = (e) => {
            this._valueSet(Number(this._text.textContent?.replace(',', '.')) || 0);
        };
    }

    /**Sets options for the slider*/
    options(options: StepperOptions) {
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.decimals = options.decimals;
        super.options(options)
        if (options.iconDec) {
            this.iconLeft = options.iconDec;
        }
        if (options.iconInc) {
            this.iconRight = options.iconInc;
        }
        if (options.unit) {
            this.unit = options.unit;
        }
        return this;
    }

    private _stepperFunc(icon: SVGSVGElement, dir: boolean) {
        icon.onclick = (e) => {
            e.stopPropagation();
            this._stepValue(dir);
        }
        icon.onpointerdown = (e) => {
            if (e.pointerType !== 'touch' && e.button === 0) {
                e.stopPropagation();
                this.setPointerCapture(e.pointerId);
                let interval = 0;
                let timeout = setTimeout(() => {
                    this._stepValue(dir);
                    interval = setInterval(() => {
                        this._stepValue(dir);
                    }, 200)
                }, 500);
                this.onpointerup = () => {
                    if (interval === 0) {
                        this._stepValue(dir);
                    }
                    clearInterval(interval);
                    clearTimeout(timeout);
                    this.onpointerup = null;
                }
            }
        }
        icon.ontouchstart = (e) => {
            e.stopPropagation();
            let interval = 0;
            let timeout = setTimeout(() => {
                this._stepValue(dir);
                interval = setInterval(() => {
                    this._stepValue(dir);
                }, 200)
            }, 500);
            icon.ontouchend = () => {
                clearInterval(interval);
                clearTimeout(timeout);
                icon.ontouchend = null;
            }
        }
        return icon
    }

    /**Returns the minimum value*/
    get min() {
        return this._min;
    }
    /**Set the minimum value*/
    set min(min: number | undefined) {
        if (typeof min === 'number') {
            this._min = min;
        } else {
            this._min = -Infinity;
        }
    }

    /**Returns the minimum value*/
    get max() {
        return this._max;
    }
    /**Set the minimum value*/
    set max(max: number | undefined) {
        if (typeof max === 'number') {
            this._max = max;
        } else {
            this._max = Infinity;
        }
    }

    /**Gets the amount of steps on the slider*/
    get step() {
        return this._step
    }
    /**Sets the amount of steps on the slider*/
    set step(step: number | undefined | ((value: number) => number)) {
        if (typeof step === 'function') {
            this._stepFunc = step;
        } else {
            this._stepFunc = undefined;
            this._step = Math.max(step ?? 0, Infinity);
        }
    }

    /**Gets the amount of decimals the slider can have*/
    get decimals() {
        return this._decimals
    }
    /**Sets the amount of decimals the slider can have*/
    set decimals(dec: number | undefined) {
        this._decimals = Math.max(dec ?? 0, 0);
    }

    /**Changes the icon on the left of the slider*/
    set iconLeft(icon: SVGSVGElement) {
        this._body.replaceChild(icon, this._iconLeft);
        this._iconLeft = this._stepperFunc(icon, false);
    }

    /**Changes the icon on the right of the slider*/
    set iconRight(icon: SVGSVGElement) {
        this._body.replaceChild(icon, this._iconRight);
        this._iconRight = this._stepperFunc(icon, true);
    }

    /**Called when value is changed */
    protected _valueUpdate(value: number) {
        this._text.textContent = value.toFixed(this._decimals);
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._text.textContent = 'N/A';
    }

    /**This steps the slider value in the given direction*/
    private _stepValue(dir: boolean) {
        if (this._step === Infinity) {
            if (this._decimals === 0) {
                var step = Math.max(1, Math.floor(Math.abs(this._value || 0) / 150));
            } else {
                var step = Math.max(1 / this._decimals, Math.floor(Math.abs(this._value || 0) / 150));
            }
        } else if (this._stepFunc) {
            var step = this._stepFunc(this._value || 0);
        } else {
            var step = this._step;
        }
        if (dir) {
            this._valueSet((this._value || 0) + step);
        } else {
            this._valueSet((this._value || 0) - step);
        }
    }

    /**Gets the current unit of the element*/
    get unit() {
        return this._label.innerHTML;
    }
    /**Sets the current unit of the element*/
    set unit(unit: Value<string> | string | undefined) {
        if (this._unitListener) {
            this.dettachValue(this._unitListener);
            delete this._unitListener;
        }
        if (typeof unit === 'object' && unit instanceof Value) {
            this._unitListener = this.attachValue(unit, (val) => {
                if (val) {
                    this._text.setAttribute('unit', val);
                } else {
                    this._text.removeAttribute('unit');
                }
            });
        } else if (unit) {
            this._text.setAttribute('unit', unit);
        } else {
            this._text.removeAttribute('unit');
        }
    }
}
defineElement(Stepper);
