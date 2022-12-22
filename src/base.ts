import { Value } from "@chocolatelib/value";
import { Base } from "@chocolatelibui/core";
import { grey, orange, green, red, blue, yellow } from "@chocolatelib/colors"
import { registerVariable } from "@chocolatelibui/theme"
import { name } from "../package.json";

registerVariable('componentLabelTextColor', grey['700'], grey['300']);
registerVariable('componentBorderColor', grey['700'], grey['300']);
registerVariable('componentTextColor', grey['800'], grey['200']);
registerVariable('componentSymbolColor', grey['800'], grey['200']);
registerVariable('componentBackGroundColor', grey['50'], grey['900']);
registerVariable('componentHoverBackGroundColor', grey['400'], grey['700']);
registerVariable('componentFocusOutlineColor', orange['600'], orange['300']);
registerVariable('componentUnselectedBorderColor', grey['700'], grey['300']);
registerVariable('componentUnselectedTextColor', grey['600'], grey['400']);
registerVariable('componentUnselectedSymbolColor', grey['600'], grey['400']);
registerVariable('componentUnselectedBackGroundColor', grey['300'], grey['800']);
registerVariable('componentGreenColor', green['300'], green['900']);
registerVariable('componentRedColor', red['300'], red['900']);
registerVariable('componentBlueColor', blue['300'], blue['900']);
registerVariable('componentYellowColor', yellow['300'], yellow['900']);

/** Base class for form elements for shared properties and methods*/
export abstract class FormBase<ValueType> extends Base {
    //Returns the name used to define the element 
    static elementName() { return '@abstract@' }
    //Returns the namespace override for the element
    static elementNameSpace() { return name.replace('@', '').replace('/', '-') }

    _value: Value<ValueType> | ValueType | undefined
    get value() {
        return this._value;
    }
    set value(value: Value<ValueType> | ValueType | undefined) {
        this._value = value
    }
}