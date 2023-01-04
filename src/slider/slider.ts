import "./slider.scss"
import { defineElement } from "@chocolatelibui/core";
import { material_navigation_chevron_left_rounded, material_navigation_chevron_right_rounded } from "@chocolatelibui/icons";
import { FormBaseOptions, FormBase } from "../base";
import { Value } from "@chocolatelib/value";

interface SliderOptions extends FormBaseOptions<number> {
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
    /**Icon to use for left side*/
    iconLeft?: SVGSVGElement,
    /**Icon to use for right side*/
    iconRight?: SVGSVGElement,
    /**Unit to use for slider*/
    unit?: string | Value<string>
}


/**Slide Selector, displays all options in a slider*/
export class Slider extends FormBase<number> {
    private _body: HTMLDivElement;
    private _slide: HTMLDivElement;
    private _slider: HTMLDivElement;
    private _sliderVal: Text;
    private _sliderUnit: HTMLDivElement;
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
        this._slide = this._body.appendChild(document.createElement('div'));
        this._iconLeft = this._body.appendChild(material_navigation_chevron_left_rounded());
        this._iconRight = this._body.appendChild(material_navigation_chevron_right_rounded());
        this._slider = this._slide.appendChild(document.createElement('div'));
        this._sliderVal = this._slider.appendChild(document.createTextNode(''));
        this._sliderUnit = this._slider.appendChild(document.createElement('div'));

        //Handlers for moving the slider
        this._slide.onpointerdown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this._moving = true;
            this._moveTo(e.clientX);
            this._slider.setPointerCapture(e.pointerId);
            this._slider.onpointermove = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._moveTo(e.clientX);
            };
            this._slider.onpointerup = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._moving = false;
                this._slider.releasePointerCapture(e.pointerId);
                this._slider.onpointermove = null;
                this._slider.onpointerup = null;
                this._moveTo(e.clientX);
            };
            this._slider.focus();
        };

        this._slider.onkeydown = (e) => {
            e.stopPropagation();
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    this._stepValue(true);
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
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
        if (options.iconLeft) {
            this.iconLeft = options.iconLeft;
        }
        if (options.iconRight) {
            this.iconRight = options.iconRight;
        }
        this.unit = options.unit;
        return this;
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
        this._sliderVal.nodeValue = (value.toFixed(this._decimals));
    }

    /**Moves the slider to the given percent position*/
    private _movePerc(perc: number) {
        perc = Math.min(Math.max(perc, 0), 100);
        this._slider.style.left = perc + '%';
    }

    /**This steps the slider value in the given direction*/
    private _stepValue(dir: boolean) {
        let step = this._step || this._span / 100;
        if (dir) {
            this._valueSet((this._value || 0) + step);
        } else {
            this._valueSet((this._value || 0) - step);
        }
    }

    /**Sets the unit of the inputbox*/
    set unit(unit: string | Value<string> | undefined) {
        unit;
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
        if (this._iconLeft) {
            this._iconLeft = this._slide.replaceChild(icon, this._iconLeft);
            this._iconLeft = icon;
        } else {
            this._iconLeft = this._slide.appendChild(icon);
        }
        icon.onpointerdown = (e) => {
            e.stopPropagation();
            this._stepValue(false);
        };
    }

    /**Changes the icon on the right of the slider*/
    set iconRight(icon: SVGSVGElement) {
        if (this._iconRight) {
            this._iconRight = this._slide.replaceChild(icon, this._iconRight);
            this._iconRight = icon;
        } else {
            this._iconRight = this._slide.appendChild(icon);
        }
        icon.onpointerdown = (e) => {
            e.stopPropagation();
            this._stepValue(true);
        };
    }

    /**Called when value is changed */
    protected _valueUpdate(value: number) {
        if (!this._moving) {
            this._movePerc((-this._min + value) / this._span * 100);
            this._sliderVal.nodeValue = (value.toFixed(this._decimals));
        }
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._movePerc(50);
        this._sliderVal.nodeValue = 'N/A';
    }
}
defineElement(Slider);
