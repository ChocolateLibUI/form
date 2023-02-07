import "./dropDown.scss"
import { Base, defineElement } from "@chocolatelibui/core";
import { SelectionBase, SelectorBase, SelectorBaseOptions, SelectorOption } from "../selectorBase";


interface Selection<T> extends SelectionBase<T> {
    line: HTMLDivElement
}

export interface DropDownOptions<T> extends SelectorBaseOptions<T> {
    /**Default text displayed*/
    default?: string,
}

class DropDownBox extends Base {
    private _container: HTMLDivElement = this.appendChild(document.createElement('div'));
    private _box: HTMLDivElement = this._container.appendChild(document.createElement('div'));
    private _dropdown: DropDown<any> | undefined;
    constructor() {
        super();
        this._box.tabIndex = 0;
        this.onclick = () => {
            this.closeMenu();
        };
        // this.addEventListener('focusout', (e) => {
        //     if (e.relatedTarget === null) {
        //         this.closeMenu();
        //     }
        // });
        this.onwheel = (e) => {
            e.preventDefault();
        }
        this._box.onwheel = (e) => {
            if (this._box.scrollHeight !== this._box.clientHeight) {
                e.stopPropagation();
            }
        }
        this.onkeydown = (e) => {
            console.warn(e.key);

            switch (e.key) {
                case ' ':
                case 'Enter':
                    e.stopPropagation();
                    this.closeMenu();
                    break;
                case 'Tab':
                case 'ArrowUp':
                case 'ArrowDown':
                    if (this.ownerDocument.activeElement === this._box) {
                        if (e.shiftKey || e.code === 'ArrowUp') {
                            //@ts-expect-error
                            (<HTMLElement>this._dropdown._box.lastChild)?.focus()
                        } else {
                            //@ts-expect-error
                            (<HTMLElement>this._dropdown._box.firstChild)?.focus()
                        }
                    } else {
                        if (e.shiftKey || e.code === 'ArrowUp') {
                            (<HTMLElement>this.ownerDocument.activeElement?.previousElementSibling)?.focus();
                        } else {
                            (<HTMLElement>this.ownerDocument.activeElement?.nextElementSibling)?.focus();
                        }
                    }
                    e.preventDefault()
                    break;
            }
        };

    }
    /**Returns the name used to define the element*/
    static elementName() { return 'dropdownbox' }
    /**Returns the namespace override for the element*/
    static elementNameSpace() { return 'chocolatelibui-form'; }

    openMenu(box: HTMLDivElement, parent: DropDown<any>, ref: HTMLDivElement, selection?: Selection<any>) {
        this.classList.add('open');
        this._box.replaceChildren(box);
        let bounds = ref.getBoundingClientRect();
        if (bounds.y + (bounds.height / 2) < window.innerHeight / 2) {
            this._container.style.top = bounds.y + 'px';
            this._container.style.bottom = '0.5rem';
        } else {
            this._container.style.top = '0.5rem';
            this._container.style.bottom = window.innerHeight - (bounds.y + bounds.height) + 'px';
        }
        this._container.style.left = bounds.x + 'px';
        this._container.style.width = bounds.width + 'px';
        this._dropdown = parent;
        if (selection) {
            selection.line.focus();
        } else {
            this._box.focus();
        }
    }

    closeMenu() {
        this.classList.remove('open');
        if (this._dropdown) {
            this._dropdown.focus();
        }
    }
}
defineElement(DropDownBox);
let box = document.documentElement.appendChild(new DropDownBox);

/**Dropdown box for selecting between multiple choices in a small space*/
export class DropDown<T> extends SelectorBase<T, Selection<T>> {
    private _box: HTMLDivElement = document.createElement('div');
    private _icon: HTMLDivElement = document.createElement('div');
    private _text: HTMLDivElement = document.createElement('div');
    private _default: Text = document.createTextNode('Select something');

    /**Returns the name used to define the element*/
    static elementName() { return 'dropdown' }

    constructor() {
        super();
        this._body.tabIndex = 0;
        this._body.onclick = () => {
            box.openMenu(this._box, this, this._body, this._selection);
        }
        this._body.onkeydown = (e) => {
            switch (e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    box.openMenu(this._box, this, this._body, this._selection);
                    break;
                case 'ArrowDown':
                case 'ArrowUp':
                    e.preventDefault();
                    e.stopPropagation();
                    this._selectAdjacent(e.key === 'ArrowDown');
                    break;
            }
        };
        let line = this._body.appendChild(document.createElement('div'));
        line.appendChild(this._icon);
        line.appendChild(this._text);
        this._text.appendChild(this._default);
    }

    /**Sets options for the element*/
    options(options: DropDownOptions<T>) {
        super.options(options);
        if (options.default) {
            this.default = options.default;
        }
        return this;
    }

    /**Gets the default text displayed when nothing has been selected yet */
    get default() {
        return this._default.nodeValue || '';
    }

    /**Sets the default text displayed when nothing has been selected yet */
    set default(def: string) {
        this._default.nodeValue = def;
    }

    protected _addSelection(selection: SelectorOption<T>, index: number) {
        let line = document.createElement('div');
        let icon = line.appendChild(document.createElement('div'));
        if (selection.icon) {
            icon.appendChild(selection.icon);
        }
        let text = line.appendChild(document.createElement('div'));
        text.textContent = selection.text;
        line.onclick = () => {
            this._valueSet(selection.value);
        };
        line.tabIndex = 0;
        line.onkeydown = (e) => {
            switch (e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this._valueSet(selection.value);
                    break;
            }
        };
        this._box.appendChild(line);
        return { line, index, selection };
    }

    protected _clearSelections() {
        this._box.replaceChildren();
    }

    protected _setSelection(selection: Selection<T>) {
        selection.line.classList.add('selected');
        if (selection.selection.icon) {
            this._icon.replaceChildren(selection.selection.icon?.cloneNode(true));
        } else {
            this._icon.replaceChildren();
        }
        this._text.textContent = selection.selection.text;
    }

    protected _clearSelection(selection: Selection<T>) {
        selection.line.classList.remove('selected');
        this._icon.replaceChildren();
        this._text.textContent = selection.selection.text;
    }

    protected _focusSelection(selection: Selection<T>) {
        selection
    }

    focus() {
        this._body.focus();
    }
}
defineElement(DropDown);
