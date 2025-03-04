import "./index.scss";
import { defineElement } from "@chocolatelibui/core";
import { FormBaseRead } from "../src/base";

export class TestBool extends FormBaseRead<boolean> {
  /**Returns the name used to define the element*/
  static elementName() {
    return "test";
  }
  constructor() {
    super();
  }

  protected _valueUpdate(value: boolean): void {}

  protected _valueClear(): void {}
}
defineElement(TestBool);

document.body.appendChild(new TestBool().options({ label: "Test" }));

// import { grey } from "@chocolatelib/colors";
// import { material_action_3d_rotation_rounded, material_action_account_balance_rounded } from "@chocolatelibui/icons";
// import { Button, Lamp, Slider, DropDown, Switch, TextField, TitleField, Stepper, Progress, NumberInput, ToggleButton, ColorInput, URLInput, DateTimeInput, IpInput, PasswordInput, PhoneInput, TextInput, DateTimeType } from "../src"
// import { BasicColors, variables } from "../src/base"
// import { Value, ValueLimitedNumber } from "@chocolatelib/value";
// import { autoTouch, theme, touch } from "@chocolatelibui/theme";
// import { SelectorOption } from "../src/selectors/selectorBase";

// variables.makeVariable('testBackground', 'TEST', '', grey['100'], grey['800'], 'Color', undefined);

// document.body.appendChild(new Switch().options({ label: 'Touch', value: touch, }));
// document.body.appendChild(new DropDown().options({ label: 'Auto Touch', value: autoTouch, }));
// document.body.appendChild(new ToggleButton().options({ label: 'Theme', value: theme, }));
// document.body.appendChild(new DropDown().options({ value: theme, }));

// let valueValue = new Value(0);
// let aaaa = new ValueLimitedNumber(20, -14, 958, 0.1, [{ func(val) { return val > 40 && val < 80; }, reason(val) { return 'This fucking ' + val + ' is not fockin valid mate' }, correction(val) { return 40 }, }])

// let unitCount = 0;
// let unitValue = new Value('unit');
// setInterval(() => {
//     unitValue.set = 'unit' + unitCount;
//     unitCount++;
// }, 100);

// let colorInput = document.body.appendChild(new ColorInput().options({ label: 'Color Accumsan sit amet nulla' }));

// let dateInput = document.body.appendChild(new DateTimeInput().options({ label: 'Date Accumsan sit amet nulla', type: DateTimeType.DATE, value: new Date(Date.now()) }));
// let timeInput = document.body.appendChild(new DateTimeInput().options({ label: 'Time Accumsan sit amet nulla', type: DateTimeType.TIME, value: new Date(Date.now()) }));
// let dateTimeInput = document.body.appendChild(new DateTimeInput().options({ label: 'Date Time Accumsan sit amet nulla', type: DateTimeType.DATETIME, value: new Date(Date.now()) }));
// let dateValue = new Value<Date | number>(new Date());
// let dateInput2 = document.body.appendChild(new DateTimeInput().options({ label: 'Date Accumsan sit amet nulla', type: DateTimeType.DATE, value: dateValue }));
// let timeInput2 = document.body.appendChild(new DateTimeInput().options({ label: 'Time Accumsan sit amet nulla', type: DateTimeType.TIME, value: dateValue }));
// let dateTimeInput2 = document.body.appendChild(new DateTimeInput().options({ label: 'Date Time Accumsan sit amet nulla', type: DateTimeType.DATETIME, value: dateValue }));
// let dateInput3 = document.body.appendChild(new DateTimeInput().options({
//     label: 'Date Time Accumsan sit amet nulla',
//     type: DateTimeType.DATE,
//     value: '01/01/01'
// }));

// let ipInput = document.body.appendChild(new IpInput().options({ label: 'IP Accumsan sit amet nulla', }));
// let passwordInput = document.body.appendChild(new PasswordInput().options({ label: 'Password Accumsan sit amet nulla', }));
// let phoneInput = document.body.appendChild(new PhoneInput().options({ label: 'Phone Accumsan sit amet nulla', }));
// let textInput = document.body.appendChild(new TextInput().options({ label: 'Text Accumsan sit amet nulla', }));
// let urlInput = document.body.appendChild(new URLInput().options({ label: 'URL Accumsan sit amet nulla', }));

// let test: SelectorOption<number>[] = (new Array<SelectorOption<number>>(22)).fill({ text: '', value: 0 }, 0, 22);
// for (let i = 0; i < test.length; i++) {
//     test[i] = {
//         text: String(i),
//         value: i,
//         icon: material_action_account_balance_rounded(),
//     }
// }

// let dropdown1 = document.body.appendChild(new DropDown().options({
//     label: 'Accumsan sit amet nulla',
//     selections: test
// }));

// let test2: SelectorOption<number>[] = (new Array<SelectorOption<number>>(42)).fill({ text: '', value: 0 }, 0, 42);
// for (let i = 0; i < test2.length; i++) {
//     test2[i] = {
//         text: String(i),
//         value: i,
//         icon: material_action_account_balance_rounded(),
//     }
// }

// let dropdown2 = document.body.appendChild(new DropDown().options({
//     label: 'Accumsan sit amet nulla',
//     selections: test2
// }));
// let dropdown3 = document.body.appendChild(new DropDown().options({ label: 'Accumsan sit amet nulla', selections: [{ text: 'Test1', value: 0 }, { text: 'asfd', value: 1 }, { text: 'vvv', value: 2 }, { text: 'bbbb', value: 3 }, { text: 'Test2', value: 4 }, { text: 'Tast3', value: 5 }, { text: 'kkkk', value: 6 }, { text: 'kiik', value: 7 }, { text: 'Te', value: 8 },] }));

// let toggleButton1 = document.body.appendChild(new ToggleButton().options({
//     label: 'Accumsan sit amet nulla',
//     selections: [{
//         icon: material_action_account_balance_rounded(),
//         text: 'Test1',
//         value: 1
//     }
//         , {
//         text: 'Accumsan sit amet nulla',
//         value: 2
//     }
//         , {
//         icon: material_action_account_balance_rounded(),
//         text: 'Accumsan sit amet nulla',
//         value: 3
//     }
//         , {
//         icon: material_action_account_balance_rounded(),
//         text: 'Test2',
//         value: 4
//     }
//     ]

// }));
// let toggleButton2 = document.body.appendChild(new ToggleButton().options({
//     label: 'Accumsan sit amet nulla',
//     selections: [{
//         icon: material_action_account_balance_rounded(),
//         text: 'Test1',
//         value: 1
//     }
//         , {
//         text: 'Accumsan sit amet nulla',
//         value: 2
//     }
//         , {
//         icon: material_action_account_balance_rounded(),
//         text: 'Accumsan sit amet nulla',
//         value: 3
//     }
//         , {
//         icon: material_action_account_balance_rounded(),
//         text: 'Test2',
//         value: 4
//     }
//     ]

// }));

// let numberinput1 = document.body.appendChild(new NumberInput());
// let numberinput2 = document.body.appendChild(new NumberInput().options({ label: 'Accumsan sit amet nulla', value: 44 }));
// let numberinput3 = document.body.appendChild(new NumberInput().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let numberinput4 = document.body.appendChild(new NumberInput().options({ value: aaaa }));
// let numberinput5 = document.body.appendChild(new NumberInput().options({ unit: 'Accumsan sit amet nulla', value: 4 }));
// let numberinput6 = document.body.appendChild(new NumberInput().options({ unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let numberinput7 = document.body.appendChild(new NumberInput().options({
//     min: 0,
//     max: 50,
//     unit: 'm/s',
//     label: 'Accumsan sit amet nulla',
//     value: 44
// }));
// let numberinput8 = document.body.appendChild(new NumberInput().options({
//     max: 9900,
//     min: -1,
//     decimals: 1,
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let numberinput9 = document.body.appendChild(new NumberInput().options({
//     value: valueValue,
//     unit: unitValue,
// }));
// let numberinput10 = document.body.appendChild(new NumberInput().options({
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     max: 999,
// }));
// let numberinput11 = document.body.appendChild(new NumberInput().options({
//     value: valueValue,
//     label: 'Accumsan sit amet nulla',
//     unit: 'Accumsan sit amet nulla',
// }));
// let numberinput12 = document.body.appendChild(new NumberInput().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let numberinput13 = document.body.appendChild(new NumberInput().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     min: -10000000000000,
//     max: 10000000000000,
// }));

// let stepper1 = document.body.appendChild(new Stepper());
// let stepper2 = document.body.appendChild(new Stepper().options({ label: 'Accumsan sit amet nulla', value: 44 }));
// let stepper3 = document.body.appendChild(new Stepper().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let stepper4 = document.body.appendChild(new Stepper().options({ iconDec: material_action_account_balance_rounded(), value: aaaa }));
// let stepper5 = document.body.appendChild(new Stepper().options({ unit: 'Accumsan sit amet nulla', value: 4 }));
// let stepper6 = document.body.appendChild(new Stepper().options({ unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let stepper7 = document.body.appendChild(new Stepper().options({
//     min: 0,
//     max: 50,
//     unit: 'm/s',
//     label: 'Accumsan sit amet nulla',
//     iconDec: material_action_3d_rotation_rounded(),
//     value: 44
// }));
// let stepper8 = document.body.appendChild(new Stepper().options({
//     max: 9900,
//     min: -1,
//     decimals: 1,
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     iconDec: material_action_3d_rotation_rounded(),
// }));
// let stepper9 = document.body.appendChild(new Stepper().options({
//     value: valueValue,
//     unit: unitValue,
//     iconDec: material_action_3d_rotation_rounded(),
// }));
// let stepper10 = document.body.appendChild(new Stepper().options({
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     max: 999,
//     iconDec: material_action_3d_rotation_rounded(),
// }));
// let stepper11 = document.body.appendChild(new Stepper().options({
//     value: valueValue,
//     label: 'Accumsan sit amet nulla',
//     iconDec: material_action_3d_rotation_rounded(),
//     unit: 'Accumsan sit amet nulla',
// }));
// let stepper12 = document.body.appendChild(new Stepper().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     iconDec: material_action_3d_rotation_rounded(),
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let stepper13 = document.body.appendChild(new Stepper().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     iconDec: material_action_3d_rotation_rounded(),
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     min: -10000000000000,
//     max: 10000000000000,
// }));

// let slider1 = document.body.appendChild(new Slider());
// let slider2 = document.body.appendChild(new Slider().options({ label: 'Accumsan sit amet nulla', value: 10, unit: 'm/s' }));
// let slider3 = document.body.appendChild(new Slider().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let slider4 = document.body.appendChild(new Slider().options({ iconDec: material_action_account_balance_rounded(), value: aaaa }));
// let slider5 = document.body.appendChild(new Slider().options({ unit: 'Accumsan sit amet nulla', }));
// let slider6 = document.body.appendChild(new Slider().options({ unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let slider7 = document.body.appendChild(new Slider().options({
//     label: 'Accumsan sit amet nulla',
//     iconDec: material_action_3d_rotation_rounded(),
//     value: 20
// }));
// let slider8 = document.body.appendChild(new Slider().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     iconDec: material_action_3d_rotation_rounded(),
//     min: -400,
//     max: 0,
//     value: 20
// }));
// let slider9 = document.body.appendChild(new Slider().options({
//     unit: 'Accumsan sit amet nulla',
//     iconDec: material_action_3d_rotation_rounded(),
// }));
// let slider10 = document.body.appendChild(new Slider().options({
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     iconDec: material_action_3d_rotation_rounded(),
// }));
// let slider11 = document.body.appendChild(new Slider().options({
//     label: 'Accumsan sit amet nulla',
//     iconDec: material_action_3d_rotation_rounded(),
//     unit: 'Accumsan sit amet nulla',
//     min: -10000000000000,
//     max: 10000000000000,
// }));
// let slider12 = document.body.appendChild(new Slider().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     iconDec: material_action_3d_rotation_rounded(),
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let slider13 = document.body.appendChild(new Slider().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     iconDec: material_action_3d_rotation_rounded(),
//     unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));

// let progress1 = document.body.appendChild(new Progress());
// let progress2 = document.body.appendChild(new Progress().options({ label: 'Accumsan sit amet nulla', value: 3 }));
// let progress3 = document.body.appendChild(new Progress().options({ min: -3030, max: 22503, value: 0, label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let progress5 = document.body.appendChild(new Progress().options({ unit: 'Accumsan sit amet nulla', value: aaaa }));
// let progress6 = document.body.appendChild(new Progress().options({ min: 0, max: 100, unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));

// let change = 1;
// let val = 0;
// setInterval(() => {
//     progress6.value = val;
//     progress1.value = val * 10000;
//     progress3.value = val * 222 - 5000;
//     val += change;
//     if (val === 110) {
//         change = -1;
//     }
//     if (val === -10) {
//         change = 1;
//     }
// }, 100);

// let button1 = document.body.appendChild(new Button());
// let button2 = document.body.appendChild(new Button().options({ label: 'Accumsan sit amet nulla', }));
// let button3 = document.body.appendChild(new Button().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let button4 = document.body.appendChild(new Button().options({ icon: material_action_3d_rotation_rounded(), }));
// let button5 = document.body.appendChild(new Button().options({ text: 'Accumsan sit amet nulla', }));
// let button6 = document.body.appendChild(new Button().options({ text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let button7 = document.body.appendChild(new Button().options({
//     label: 'Accumsan sit amet nulla',
//     icon: material_action_3d_rotation_rounded(),
// }));
// let button8 = document.body.appendChild(new Button().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
// }));
// let button9 = document.body.appendChild(new Button().options({
//     label: 'Accumsan sit amet nulla',
//     text: 'Accumsan sit amet nulla',
// }));
// let button10 = document.body.appendChild(new Button().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let button11 = document.body.appendChild(new Button().options({
//     label: 'Accumsan sit amet nulla',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Accumsan sit amet nulla',
// }));
// let button12 = document.body.appendChild(new Button().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let button13 = document.body.appendChild(new Button().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let prog = 0;
// setInterval(() => {
//     button13.color = [BasicColors.Black, BasicColors.Blue, BasicColors.Green, BasicColors.Red, BasicColors.Yellow][prog];
//     prog++
//     if (prog === 4) { prog = 0; }
// }, 1000)

// let lamp1 = document.body.appendChild(new Lamp());
// let lamp2 = document.body.appendChild(new Lamp().options({ label: 'Accumsan sit amet nulla', }));
// let lamp3 = document.body.appendChild(new Lamp().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let lamp4 = document.body.appendChild(new Lamp().options({ icon: material_action_account_balance_rounded(), }));
// let lamp5 = document.body.appendChild(new Lamp().options({ text: 'Accumsan sit amet nulla', }));
// let lamp6 = document.body.appendChild(new Lamp().options({ text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let lamp7 = document.body.appendChild(new Lamp().options({
//     label: 'Accumsan sit amet nulla',
//     icon: material_action_3d_rotation_rounded(),
//     value: new Value(1)
// }));
// let lamp8 = document.body.appendChild(new Lamp().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
// }));
// let lamp9 = document.body.appendChild(new Lamp().options({
//     text: 'Accumsan sit amet nulla',
//     icon: material_action_3d_rotation_rounded(),
// }));
// let lamp10 = document.body.appendChild(new Lamp().options({
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
// }));
// let lamp11 = document.body.appendChild(new Lamp().options({
//     label: 'Accumsan sit amet nulla',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Accumsan sit amet nulla',
// }));
// let lamp12 = document.body.appendChild(new Lamp().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let lamp13 = document.body.appendChild(new Lamp().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     colors: [BasicColors.Black, BasicColors.Blue, BasicColors.Green, BasicColors.Red, BasicColors.Yellow]
// }));
// {
//     let prog = 0;
//     setInterval(() => {
//         lamp13.value = prog;
//         prog++
//         if (prog === 4) { prog = 0; }
//     }, 1000)
// }

// let switch1 = document.body.appendChild(new Switch());
// let switch2 = document.body.appendChild(new Switch().options({ label: 'Accumsan sit amet nulla' }));
// let switch3 = document.body.appendChild(new Switch().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' }));
// let switch4 = document.body.appendChild(new Switch().options({ icon: material_action_3d_rotation_rounded(), }));
// let switch5 = document.body.appendChild(new Switch().options({ text: 'Accumsan sit amet nulla', }));
// let switch6 = document.body.appendChild(new Switch().options({ text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
// let switch7 = document.body.appendChild(new Switch().options({
//     label: 'Accumsan sit amet nulla',
//     icon: material_action_3d_rotation_rounded(),
// }));
// let switch8 = document.body.appendChild(new Switch().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
// }));
// let switch9 = document.body.appendChild(new Switch().options({
//     label: 'Accumsan sit amet nulla',
//     text: 'Accumsan sit amet nulla',
// }));
// let switch10 = document.body.appendChild(new Switch().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let switch11 = document.body.appendChild(new Switch().options({
//     label: 'Accumsan sit amet nulla',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Accumsan sit amet nulla',
// }));
// let switch12 = document.body.appendChild(new Switch().options({
//     label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));
// let switch13 = document.body.appendChild(new Switch().options({
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Accumsan sit amet nulla',
// }));
// let switch14 = document.body.appendChild(new Switch().options({
//     icon: material_action_3d_rotation_rounded(),
//     text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
// }));

// let text1 = new TextField();
// document.body.appendChild(text1);
// let text2 = new TextField().options({ label: 'Accumsan sit amet nulla' });
// document.body.appendChild(text2);
// let text3 = new TextField().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' });
// document.body.appendChild(text3);

// let title1 = new TitleField();
// document.body.appendChild(title1);
// let title2 = new TitleField().options({ label: 'Accumsan sit amet nulla' });
// document.body.appendChild(title2);
// let title3 = new TitleField().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' });
// document.body.appendChild(title3);
