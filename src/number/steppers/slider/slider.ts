import "./slider.scss"
import { defineElement } from "@chocolatelibui/core";
import { material_navigation_chevron_left_rounded, material_navigation_chevron_right_rounded } from "@chocolatelibui/icons";
import { StepperBase, StepperBaseOptions } from "../stepperBase";
import { NoValueText } from "../../../base";

interface SliderOptions extends StepperBaseOptions {
    /**wether the events are live as the slider is moved or only when moving stops */
    live?: boolean,
}

/**Slide Selector, displays all options in a slider*/
export class Slider extends StepperBase {
    private _body: HTMLDivElement;
    private _slide: HTMLDivElement;
    private _slider: HTMLDivElement;
    private _valueBox: HTMLSpanElement;
    private _moving: boolean = false;
    private _live: boolean = false;

    /**Returns the name used to define the element*/
    static elementName() { return 'slider' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._body.oncontextmenu = e => { e.preventDefault(); };
        this._slide = this._body.appendChild(document.createElement('div'));
        this._iconDec = this._stepperFunc(this._body.appendChild(material_navigation_chevron_left_rounded()), false);
        this._iconInc = this._stepperFunc(this._body.appendChild(material_navigation_chevron_right_rounded()), true);
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
        super.options(options)
        this.live = options.live;
        if (options.iconDec) {
            this.iconLeft = options.iconDec;
        }
        if (options.iconInc) {
            this.iconRight = options.iconInc;
        }
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
        this._valueBox.textContent = (value.toFixed(this._decimals));
    }

    /**Moves the slider to the given percent position*/
    private _movePerc(perc: number) {
        perc = Math.min(Math.max(perc, 0), 100);
        this._slider.style.left = perc + '%';
    }

    /**Gets wether the slider is in live mode*/
    get live() {
        return this._live;
    }
    /**Set wether the slider is in live mode*/
    set live(live: boolean | undefined) {
        this._live = live || false;
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
