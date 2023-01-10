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
    step?: number,
    /**Amount of decimals to show*/
    decimals?: number,
    /**Icon to use for left side*/
    iconLeft?: SVGSVGElement,
    /**Icon to use for right side*/
    iconRight?: SVGSVGElement,
    /**Unit to use for slider*/
    unit?: string | Value<string>
}

/**Slide Selector, displays all options in a slider*/
export class Stepper extends FormElement<number> {
    private _body: HTMLDivElement;
    private _iconLeft: SVGSVGElement;
    private _iconRight: SVGSVGElement;
    private _text: HTMLSpanElement;
    private _valueNode: Text;
    private _unit: HTMLSpanElement;
    private _unitListener: Listener<string> | undefined

    private _min: number = -Infinity;
    private _max: number = Infinity;
    private _step: number = Infinity;
    private _decimals: number = 0;

    /**Returns the name used to define the element*/
    static elementName() { return 'stepper' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._body.oncontextmenu = (e) => { e.preventDefault(); };
        this._body.setAttribute('tabindex', '0');
        this._iconLeft = this._body.appendChild(material_content_remove_rounded());
        this._iconLeft.onpointerdown = this._stepperFunc(false);
        this._text = this._body.appendChild(document.createElement('span'));
        this._text.contentEditable = 'true';
        this._text.setAttribute('tabindex', '-1');
        this._valueNode = this._text.appendChild(document.createTextNode(''));
        this._valueNode.nodeValue = '0'
        this._unit = this._text.appendChild(document.createElement('span'));
        this._unit.contentEditable = 'false';
        this._iconRight = this._body.appendChild(material_content_add_rounded());
        this._iconRight.onpointerdown = this._stepperFunc(true);


        this.onpointerdown = (e) => {
            //this._text.focus();
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
        this._text.oninput = (e) => {
            if (e) {

            }
            console.warn((<InputEvent>e).data);
        };
        this._text.onblur = (e) => {
            this._valueSet(Number(this._valueNode.nodeValue));
        };
    }

    /**Sets options for the slider*/
    options(options: StepperOptions) {
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.decimals = options.decimals;
        super.options(options)
        if (options.iconLeft) {
            this.iconLeft = options.iconLeft;
        }
        if (options.iconRight) {
            this.iconRight = options.iconRight;
        }
        if (options.unit) {
            this.unit = options.unit;
        }
        return this;
    }

    private _stepperFunc(dir: boolean): (e: PointerEvent) => void {
        return (e) => {
            this.setPointerCapture(e.pointerId);
            let interval = 0;
            let timeout = setTimeout(() => {
                this._stepValue(dir);
                interval = setInterval(() => {
                    this._stepValue(dir);
                }, 100)
            }, 500);
            this.onpointerup = (e) => {
                if (interval === 0) {
                    this._stepValue(dir);
                }
                clearInterval(interval);
                clearTimeout(timeout);
                this.onpointerup = null;
            }
        }
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
    set step(step: number | undefined) {
        this._step = Math.max(step ?? 0, Infinity);
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
        if (this._iconLeft) {
            this._iconLeft = this._body.replaceChild(icon, this._iconLeft);
            this._iconLeft = icon;
        } else {
            this._iconLeft = this._body.appendChild(icon);
        }
        icon.onpointerdown = this._stepperFunc(false);
    }

    /**Changes the icon on the right of the slider*/
    set iconRight(icon: SVGSVGElement) {
        if (this._iconRight) {
            this._iconRight = this._body.replaceChild(icon, this._iconRight);
            this._iconRight = icon;
        } else {
            this._iconRight = this._body.appendChild(icon);
        }
        icon.onpointerdown = this._stepperFunc(true);
    }

    /**Called when value is changed */
    protected _valueUpdate(value: number) {
        this._valueNode.nodeValue = value.toFixed(this._decimals);
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._valueNode.nodeValue = 'N/A';
    }

    /**This steps the slider value in the given direction*/
    private _stepValue(dir: boolean) {
        if (this._step === Infinity) {
            if (this._decimals === 0) {
                var step = Math.max(1, Math.floor(Math.abs(this._value || 0) / 150));
            } else {
                var step = Math.max(1 / this._decimals, Math.floor(Math.abs(this._value || 0) / 150));
            }
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
}
defineElement(Stepper);
