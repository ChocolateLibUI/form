import "./stepperBase.scss"
import { NumberBase, NumberBaseOptions } from "../numberBase";

export interface StepperBaseOptions extends NumberBaseOptions {
    /**Step size, use 0 for automatic step size*/
    step?: number | ((value: number) => number),
    /**Icon to use for decreasing value*/
    iconDec?: SVGSVGElement,
    /**Icon to use for increasing value*/
    iconInc?: SVGSVGElement,
}

/**Base for stepper elements*/
export class StepperBase extends NumberBase {
    protected _step: number = Infinity;
    protected _stepFunc: ((value: number) => number) | undefined;
    protected _iconDec: SVGSVGElement | undefined;
    protected _iconInc: SVGSVGElement | undefined;

    /**Returns the name used to define the element*/
    static elementName() { return '@abstract@' }

    /**Sets options for the slider*/
    options(options: StepperBaseOptions) {
        this.step = options.step;
        super.options(options)
        if (options.iconDec) {
            this.iconLeft = options.iconDec;
        }
        if (options.iconInc) {
            this.iconRight = options.iconInc;
        }
        return this;
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

    /**Changes the icon on the left of the slider*/
    set iconLeft(icon: SVGSVGElement) {
        this._iconDec?.replaceWith(icon);
        this._stepperFunc(icon, false);
    }

    /**Changes the icon on the right of the slider*/
    set iconRight(icon: SVGSVGElement) {
        this._iconInc?.replaceWith(icon);
        this._stepperFunc(icon, true);
    }

    protected _stepperFunc(icon: SVGSVGElement, dir: boolean) {
        icon.onpointerdown = (e) => {
            if (e.button === 0) {
                e.stopPropagation();
                this.setPointerCapture(e.pointerId);
                let interval = 0;
                let timeout = setTimeout(() => {
                    if (this._stepValue(dir)) {
                        this.onpointerup = null;
                    } else {
                        interval = setInterval(() => {
                            if (this._stepValue(dir)) {
                                clearInterval(interval);
                                this.onpointerup = null;
                            }
                        }, 100);
                    }
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

    /**This steps the slider value in the given direction*/
    protected _stepValue(dir: boolean): boolean | void {
        let step = this._step || Number((this._span / 333).toFixed(this._decimals)) || 1;
        if (dir) {
            this._valueSet(Math.min((this._value || 0) + step, this._max));
        } else {
            this._valueSet(Math.max((this._value || 0) - step, this._min));
        }
    }
}
