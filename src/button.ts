import "./button.scss"
import { defineElement } from "@chocolatelibui/core";
import { FormBase } from "./base";

/**Defines all possible background colors for the button*/
export enum ButtonColors {
    GREEN = 'green',
    RED = 'red',
    BLUE = 'blue',
    YELLOW = 'yellow'
};

/**Button for clicking*/
export class Button extends FormBase<boolean> {
    /**Returns the name used to define the element*/
    static elementName() { return 'button' }

    // constructor() {
    //     super();
    //     this.setAttribute('tabindex', 0);
    // }

    // /**Options toggeler
    //  * @param {ButtonOptions} options*/
    // options(options) {
    //     super.options(options)
    //     if (typeof options.symbol !== 'undefined') { this.symbol = options.symbol; }
    //     if (typeof options.click !== 'undefined') { this.click = options.click; }
    //     this.toggle = options.toggle;
    //     if (typeof options.color !== 'undefined') { this.color = options.color; }
    // }

    // /**Changes the text description of the button
    //  * @param {(e:MouseEvent)=>} text */
    // set click(func) {
    //     if (typeof func === 'function') {
    //         this.__click = func;
    //     } else {
    //         console.warn('None function passed');
    //     }
    // }

    // /**Changes the text description of the button
    //  * @param {string} text */
    // set text(text) {
    //     if (typeof text == 'string' && text) {
    //         if (!this.__text) {
    //             /**
    //              * @type {HTMLDivElement}
    //              * @private */
    //             this.__text = document.createElement('div')
    //             this.appendChild(this.__text);
    //         }
    //         this.__text.innerHTML = text;
    //     } else {
    //         if (this.__text) {
    //             this.removeChild(this.__text);
    //             delete this.__text;
    //         }
    //     }
    // }

    // /**Changes the symbol of the button
    //  * @param {SVGElement} sym */
    // set symbol(sym) {
    //     if (sym instanceof SVGElement) {
    //         if (this.__sym) {
    //             this.replaceChild(sym, this.__sym);
    //             this.__sym = sym;
    //         } else {
    //             this.__sym = this.insertBefore(sym, this.firstChild);
    //         }
    //     } else if (this.__sym) {
    //         this.removeChild(this.__sym);
    //         delete this.__sym;
    //     }
    // }

    // /**Changes whether the button is maintained or momentary
    //  * @param {boolean} tog */
    // set toggle(tog) {
    //     if (tog) {
    //         this.onpointerdown = null;
    //         this.onpointerup = null;
    //         this.onkeydown = (e) => {
    //             e.stopPropagation();
    //             switch (e.key) {
    //                 case 'Enter':
    //                 case ' ': {
    //                     this.onkeyup = (e) => {
    //                         e.stopPropagation();
    //                         switch (e.key) {
    //                             case 'Enter':
    //                             case ' ': {
    //                                 this.__setValue(!this.__valueBuffer);
    //                                 if (this.__click) {
    //                                     this.__click();
    //                                 }
    //                                 break;
    //                             }
    //                         }
    //                         this.onkeyup = null;
    //                     }
    //                     break;
    //                 }
    //             }
    //         };
    //         this.onclick = (e) => {
    //             e.stopPropagation();
    //             this.__setValue(!this.__valueBuffer);
    //             if (this.__click) {
    //                 this.__click();
    //             }
    //         }
    //     } else {
    //         /**Handler for pointer down
    //          * @param {PointerEvent} e
    //          * @private */
    //         this.onpointerdown = (e) => {
    //             e.stopPropagation();
    //             if (e.pointerType == 'touch') {
    //                 e.preventDefault();
    //             }
    //             this.setPointerCapture(e.pointerId);
    //             this.__setValue(true);
    //             this.onpointerup = (ev) => {
    //                 ev.stopPropagation();
    //                 this.releasePointerCapture(ev.pointerId);
    //                 this.__setValue(false);
    //                 if (this.__click) {
    //                     this.__click();
    //                 }
    //                 this.onpointerup = null;
    //             }
    //         }
    //         this.onkeydown = (e) => {
    //             e.stopPropagation();
    //             switch (e.key) {
    //                 case 'Enter':
    //                 case ' ': {
    //                     this.__setValue(true);
    //                     this.onkeyup = (e) => {
    //                         e.stopPropagation();
    //                         switch (e.key) {
    //                             case 'Enter':
    //                             case ' ': {
    //                                 this.__setValue(false);
    //                                 if (this.__click) {
    //                                     this.__click();
    //                                 }
    //                                 break;
    //                             }
    //                         }
    //                         this.onkeyup = null;
    //                     }
    //                     break;
    //                 }
    //             }
    //         };
    //         this.onclick = null;
    //     }
    // }

    // /** Sets the background color of the button
    //  * @param {number} color*/
    // set color(color) {
    //     if (typeof color === 'string') {
    //         if (ButtonColorsValues.includes(color)) {
    //             this.setAttribute('color', color);
    //             return;
    //         }
    //     }
    //     this.removeAttribute('color');
    // }

    // /**Internal access call 
    //  * @param {Access} a
    //  * @private*/
    // __onAccess(a) {
    //     if (a == 'R') {
    //         this.setAttribute('tabindex', -1);
    //     } else if (a == 'W') {
    //         this.setAttribute('tabindex', 0);
    //     }
    // }

    // /**Internal value setter
    //  * @param {boolean} val 
    //  * @private */
    // __newValue(val) {
    //     if (val) {
    //         this.classList.add('active');
    //     } else {
    //         this.classList.remove('active');
    //     }
    // }
}
defineElement(Button);
