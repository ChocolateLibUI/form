import "./stepper.scss"
import { defineElement } from "@chocolatelibui/core";
import { material_content_remove_rounded, material_content_add_rounded } from "@chocolatelibui/icons";
import { StepperBase, StepperBaseOptions } from "../stepperBase";
import { NoValueText } from "../../../base";

/**Slide Selector, displays all options in a slider*/
export class Stepper extends StepperBase {
    private _body: HTMLDivElement;
    private _text: HTMLSpanElement;
    private _valueBox: HTMLSpanElement;
    private _warning: HTMLButtonElement;

    private _legend: HTMLSpanElement;
    private _minLegend: HTMLSpanElement | undefined;
    private _minValue: Text | undefined;
    private _minUnit: Text | undefined;
    private _maxLegend: HTMLSpanElement | undefined;
    private _maxValue: Text | undefined;
    private _maxUnit: Text | undefined;

    /**Returns the name used to define the element*/
    static elementName() { return 'stepper' }

    constructor() {
        super();
        this.appendChild(this._label);
        this._body = this.appendChild(document.createElement('div'));
        this._body.oncontextmenu = (e) => { e.preventDefault(); };
        this._body.setAttribute('tabindex', '0');
        this._iconDec = this._stepperFunc(this._body.appendChild(material_content_remove_rounded()), false);
        this._text = this._body.appendChild(document.createElement('span'));
        this._valueBox = this._text.appendChild(document.createElement('span'));
        this._valueBox.setAttribute('tabindex', '-1');
        this._valueBox.contentEditable = 'true';
        this._valueBox.textContent = NoValueText;
        this._unit = this._text.appendChild(document.createElement('div'));
        this._iconInc = this._stepperFunc(this._body.appendChild(material_content_add_rounded()), true);
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

    /**Called when value is changed */
    protected _valueUpdate(value: number) {
        this._valueBox.textContent = value.toFixed(this._decimals);
    }
    /**Called when value cleared */
    protected _valueClear() {
        this._valueBox.textContent = NoValueText;
    }

    /**This steps the slider value in the given direction*/
    protected _stepValue(dir: boolean): boolean | void {
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
            return this._setValueValidate((this._value || 0) + step);
        } else {
            return this._setValueValidate((this._value || 0) - step);
        }
    }

    /**Validates given value then sets it*/
    private _setValueValidate(val: number): boolean | void {
        if (val > this._max) {
            this._warning.setCustomValidity('Maximum value is ' + this._max)
            this._warning.reportValidity();
            this._valueSet(this._max);
            return true;
        } else if (val < this._min) {
            this._warning.setCustomValidity('Minimum value is ' + this._min)
            this._warning.reportValidity();
            this._valueSet(this._min);
            return true;
        } else {
            this._warning.setCustomValidity('');
            this._warning.reportValidity();
            this._valueSet(val);
        }
    }

    protected _setUnit(unit: string | undefined) {
        super._setUnit(unit);
        if (this._minUnit) {
            this._minUnit.nodeValue = unit || '';
        }
        if (this._maxUnit) {
            this._maxUnit.nodeValue = unit || '';
        }
    }
}
defineElement(Stepper);
