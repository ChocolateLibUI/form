import "./slider.scss"
import { defineElement } from "@chocolatelibui/core";
import { material_navigation_chevron_left_rounded, material_navigation_chevron_right_rounded } from "@chocolatelibui/icons";
import { FormElementOptions, FormElement, NoValueText } from "../base";
import { Value } from "@chocolatelib/value";

interface SliderOptions extends FormElementOptions<number> {
    /**Lower limit for slider value*/
    min?: number,
    /**Upper limit for slider value*/
    max?: number,
    /**Amount of steps on the slider 0 is infinite*/
    step?: number,
    /**Amount of decimals to show*/
    decimals?: number,
    /**wether the events are live as the slider is moved or only when moving stops */
    live?: boolean,
    /**Icon to use for */
    iconDec?: SVGSVGElement,
    /**Icon to use for right side*/
    iconInc?: SVGSVGElement,
    /**Unit to use for slider*/
    unit?: string | Value<string>
}


/**Slide Selector, displays all options in a slider*/
export class Slider extends FormElement<number> {
    private _body: HTMLDivElement;
    private _slide: HTMLDivElement;
    private _slider: HTMLDivElement;
    private _valueBox: HTMLSpanElement;
    private _unitListener: ((value: string) => void) | undefined
    private _unit: HTMLDivElement;
    private _moving: boolean = false;
    private _iconLeft: SVGSVGElement;
    private _iconRight: SVGSVGElement;

    private _min: number = 0;
    private _max: number = 100;
    private _span: number = 100;
    private _step: number = 0;
    private _decimals: number = 0;
    private _live: boolean = false;

    /**Returns the name used to define the element*/
    static elementName() { return 'slider' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._body.oncontextmenu = e => { e.preventDefault(); };
        this._slide = this._body.appendChild(document.createElement('div'));
        this._iconLeft = this._stepperFunc(this._body.appendChild(material_navigation_chevron_left_rounded()), false);
        this._iconRight = this._stepperFunc(this._body.appendChild(material_navigation_chevron_right_rounded()), true);
        this._slider = this._slide.appendChild(document.createElement('div'));
        this._slider.setAttribute('tabindex', '0');
        this._valueBox = this._slider.appendChild(document.createElement('span'));
        this._valueBox.textContent = NoValueText;
        this._unit = this._slider.appendChild(document.createElement('div'));

        this._body.onpointerdown = (e) => {
            if (e.button === 0) {
                e.stopPropagation();
                this._moving = true;
                let offset = 0;
                let box = this._slider.getBoundingClientRect();
                if (e.clientX >= box.x) {
                    if (e.clientX <= box.x + box.width) {
                        offset = box.x - e.clientX;
                    } else {
                        offset = -box.width;
                    }
                }
                this._moveTo(e.clientX + offset);
                this._slider.setPointerCapture(e.pointerId);
                this._slider.onpointermove = (ev) => {
                    ev.stopPropagation();
                    this._moveTo(ev.clientX + offset);
                };
                this._slider.onpointerup = (ev) => {
                    ev.stopPropagation();
                    this._moving = false;
                    this._slider.releasePointerCapture(e.pointerId);
                    this._slider.onpointermove = null;
                    this._slider.onpointerup = null;
                    this._moveTo(ev.clientX + offset);
                };
                this._slider.focus();
            }
        };


        this._slider.onkeydown = (e) => {
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
            }
        };
    }

    /**Sets options for the slider*/
    options(options: SliderOptions) {
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.decimals = options.decimals;
        super.options(options)
        this.live = options.live;
        if (options.iconDec) {
            this.iconLeft = options.iconDec;
        }
        if (options.iconInc) {
            this.iconRight = options.iconInc;
        }
        this.unit = options.unit;
        return this;
    }

    private _stepperFunc(icon: SVGSVGElement, dir: boolean) {
        icon.onpointerdown = (e) => {
            if (e.button === 0) {
                e.stopPropagation();
                this.setPointerCapture(e.pointerId);
                let interval = 0;
                let timeout = setTimeout(() => {
                    this._stepValue(dir);
                    interval = setInterval(() => {
                        this._stepValue(dir);
                    }, 100)
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
        return icon
    }

    /**Moves the value to a position by the mouse x coordinates*/
    private _moveTo(x: number) {
        let box = this._slide.getBoundingClientRect();
        var perc = Math.min(100, Math.max(0, (x - box.x) / (box.width) * 100));
        this._userSetValue((perc / 100 * this._span) + this._min);
    }

    /**This is called when the user sets the value*/
    private _userSetValue(value: number) {
        if (this._step != 0) {
            let modBuff = value % this._step;
            if (modBuff >= this._step / 2) {
                value = value + this._step - modBuff;
            } else {
                value = value - modBuff;
            }
        }

        value = Math.min(Math.max(value, this._min), this._max);
        if (this._live || !this._moving) {
            this._valueSet(Number(value.toFixed(this._decimals)));
        }

        this._movePerc((-this._min + value) / this._span * 100);
        this._valueBox.textContent = (value.toFixed(this._decimals));
    }

    /**Moves the slider to the given percent position*/
    private _movePerc(perc: number) {
        perc = Math.min(Math.max(perc, 0), 100);
        this._slider.style.left = perc + '%';
    }

    /**This steps the slider value in the given direction*/
    private _stepValue(dir: boolean) {
        let step = this._step || Number((this._span / 333).toFixed(this._decimals)) || 1;
        if (dir) {
            this._valueSet(Math.min((this._value || 0) + step, this._max));
        } else {
            this._valueSet(Math.max((this._value || 0) - step, this._min));
        }
    }

    /**Sets the unit of the inputbox*/
    set unit(unit: string | Value<string> | undefined) {
        if (this._unitListener) {
            this.dettachValue(this._unitListener);
            delete this._unitListener;
        }
        if (typeof unit === 'object' && unit instanceof Value) {
            this._unitListener = this.attachValue(unit, (val) => {
                if (val) {
                    this._unit.innerHTML = val;
                } else {
                    this._unit.innerHTML = '';
                }
            });
        } else if (unit) {
            this._unit.innerHTML = unit;
        } else {
            this._unit.innerHTML = '';
        }
    }

    /**Returns the current unit*/
    get unit() {
        return ''
    }

    /**Gets the minimum value on the slider*/
    get min() {
        return this._min;
    }
    /**Set the minimum value on the slider*/
    set min(min: number | undefined) {
        this._min = min ?? 0;
        this._span = this._max - this._min;
    }

    /**Gets the maximum value on the slider*/
    get max() {
        return this._max;
    }
    /**Set the maximum value on the slider*/
    set max(max: number | undefined) {
        this._max = max ?? 100;
        this._span = this._max - this._min;
    }

    /**Gets the amount of steps on the slider*/
    get step() {
        return this._step
    }
    /**Sets the amount of steps on the slider*/
    set step(step: number | undefined) {
        this._step = Math.max(step ?? 0, 0);
    }

    /**Gets the amount of decimals the slider can have*/
    get decimals() {
        return this._decimals
    }
    /**Sets the amount of decimals the slider can have*/
    set decimals(dec: number | undefined) {
        this._decimals = Math.max(dec ?? 0, 0);
    }

    /**Gets wether the slider is in live mode*/
    get live() {
        return this._live;
    }
    /**Set wether the slider is in live mode*/
    set live(live: boolean | undefined) {
        this._live = live || false;
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
        if (!this._moving) {
            this._movePerc((-this._min + value) / this._span * 100);
            this._valueBox.textContent = (value.toFixed(this._decimals));
        }
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._movePerc(50);
        this._valueBox.textContent = NoValueText;
    }
}
defineElement(Slider);
