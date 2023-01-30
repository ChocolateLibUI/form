import "./stepper.scss"
import { defineElement } from "@chocolatelibui/core";
import { material_content_remove_rounded, material_content_add_rounded } from "@chocolatelibui/icons";
import { FormElementOptions, FormElement, NoValueText } from "../base";
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
    private _valueBox: HTMLSpanElement;
    private _unit: HTMLDivElement;
    private _unitListener: Listener<string> | undefined
    private _warning: HTMLButtonElement;

    private _legend: HTMLSpanElement;
    private _minLegend: HTMLSpanElement | undefined;
    private _minValue: Text | undefined;
    private _minUnit: Text | undefined;
    private _maxLegend: HTMLSpanElement | undefined;
    private _maxValue: Text | undefined;
    private _maxUnit: Text | undefined;

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
        this._valueBox = this._text.appendChild(document.createElement('span'));
        this._valueBox.setAttribute('tabindex', '-1');
        this._valueBox.contentEditable = 'true';
        this._valueBox.textContent = NoValueText;
        this._unit = this._text.appendChild(document.createElement('div'));
        this._iconRight = this._stepperFunc(this._body.appendChild(material_content_add_rounded()), true);
        this._legend = this._text.appendChild(document.createElement('span'));
        this._warning = this._text.appendChild(document.createElement('button'));

        let dragBlocker = false;

        this._valueBox.onfocus = async () => {
            dragBlocker = true;
        };
        this._valueBox.onblur = async () => {
            dragBlocker = false;
            setTimeout(() => {
                this._setValueValidate(parseFloat(this._valueBox.textContent?.replace(',', '.') || '') || 0);
            }, 0);
        };

        this._text.onpointerdown = (e) => {
            if (e.button === 0 && (e.target !== this._valueBox || !dragBlocker)) {
                e.stopPropagation();
                let scrolling = false;
                let x = e.screenX;
                this._text.setPointerCapture(e.pointerId);
                this._text.onpointermove = (ev) => {
                    ev.stopPropagation();
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
                            this._valueBox.contentEditable = 'false';
                            scrolling = true;
                        }
                    }
                }
                this._text.onpointerup = (ev) => {
                    ev.stopPropagation();
                    this._valueBox.contentEditable = 'true';
                    if (!scrolling && e.target !== this._valueBox) {
                        this._valueBox.focus();
                        let range = document.createRange();
                        range.setStartAfter(<Node>this._valueBox.firstChild)
                        let selection = this.ownerDocument?.defaultView?.getSelection();
                        if (selection) {
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    }
                    this._text.releasePointerCapture(e.pointerId);
                    this._text.onpointermove = null
                    this._text.onpointerup = null
                }
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
                        this._valueBox.textContent = '';
                        this._valueBox.focus();
                    }
            }
        };
        this._text.onkeydown = (e) => {
            switch (e.key) {
                case 'Enter':
                    this._valueBox.blur();
                    return;
            }
            e.stopPropagation()
        };
        this._text.onbeforeinput = (e) => {
            console.warn(e);
            switch (e.inputType) {
                case 'deleteContentForward':
                case 'deleteContentBackward':
                case 'deleteByDrag':


                    break;
                case 'insertParagraph':
                    e.preventDefault();
                    break;
                default:
                    break;
            }
            if (e.data) {
                if (!/[\d,.-]/g.test(e.data)) {
                    e.preventDefault()
                } else if (/[,.]/g.test(e.data) && this._decimals === 0) {
                    e.preventDefault()
                } else if (this._min >= 0 && /-/g.test(e.data)) {
                    e.preventDefault()
                }
            }

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

    /**Returns the minimum value*/
    get min() {
        return this._min;
    }
    /**Set the minimum value*/
    set min(min: number | undefined) {
        if (typeof min === 'number') {
            this._min = min;
            if (this._minValue) {
                this._minValue.nodeValue = String(min);
            } else {
                this._minLegend = document.createElement('span');
                this._minLegend.textContent = 'MIN:'
                this._legend.prepend(this._minLegend);
                this._minValue = this._minLegend.appendChild(document.createTextNode(String(min)));
                this._minUnit = this._minLegend.appendChild(document.createTextNode(this._unit.textContent || ''));
            }
        } else {
            this._min = -Infinity;
            if (this._minLegend) {
                this._legend.removeChild(this._minLegend);
                delete this._minLegend;
                delete this._minValue;
                delete this._minUnit;
            }
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
            if (this._maxValue) {
                this._maxValue.nodeValue = String(max);
            } else {
                this._maxLegend = this._legend.appendChild(document.createElement('span'));
                this._maxLegend.textContent = 'MAX:'
                this._maxValue = this._maxLegend.appendChild(document.createTextNode(String(max)));
                this._maxUnit = this._maxLegend.appendChild(document.createTextNode(this._unit.textContent || ''));
            }
        } else {
            this._max = Infinity;
            if (this._maxLegend) {
                this._legend.removeChild(this._maxLegend);
                delete this._maxLegend;
                delete this._maxValue;
                delete this._maxUnit;
            }
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
        this._valueBox.textContent = value.toFixed(this._decimals);
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._valueBox.textContent = NoValueText;
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
            this._setValueValidate((this._value || 0) + step);
        } else {
            this._setValueValidate((this._value || 0) - step);
        }
    }

    /**Validates given value then sets it*/
    private _setValueValidate(val: number) {
        if (val > this._max) {
            this._warning.setCustomValidity('Maximum value is ' + this._max)
            this._warning.reportValidity();
            this._valueSet(this._max);
        } else if (val < this._min) {
            this._warning.setCustomValidity('Minimum value is ' + this._min)
            this._warning.reportValidity();
            this._valueSet(this._min);
        } else {
            this._warning.setCustomValidity('');
            this._warning.reportValidity();
            this._valueSet(val);
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
            this._unitListener = this.attachValue(unit, (val) => { this._setUnit(val) });
        } else {
            this._setUnit(unit)
        }
    }

    private _setUnit(unit: string | undefined) {
        if (unit) {
            this._unit.textContent = unit;
            if (this._minUnit) {
                this._minUnit.nodeValue = unit;
            }
            if (this._maxUnit) {
                this._maxUnit.nodeValue = unit;
            }
        } else {
            this._unit.textContent = '';
        }
    }
}
defineElement(Stepper);
