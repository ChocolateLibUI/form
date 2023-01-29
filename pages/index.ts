import "./index.scss"
import { grey } from "@chocolatelib/colors";
import { material_action_3d_rotation_rounded, material_action_account_balance_rounded } from "@chocolatelibui/icons";
import { Button, Lamp, Slider, DropDown, Switch, TextField, TitleField, Stepper } from "../src"
import { BasicColors, variables } from "../src/base"

variables.makeVariable('testBackground', 'TEST', '', grey['100'], grey['800'], 'Color', undefined);


let stepper1 = document.body.appendChild(new Stepper());
let stepper2 = document.body.appendChild(new Stepper().options({ label: 'Accumsan sit amet nulla', }));
let stepper3 = document.body.appendChild(new Stepper().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let stepper4 = document.body.appendChild(new Stepper().options({ iconDec: material_action_account_balance_rounded(), }));
let stepper5 = document.body.appendChild(new Stepper().options({ unit: 'Accumsan sit amet nulla', }));
let stepper6 = document.body.appendChild(new Stepper().options({ unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let stepper7 = document.body.appendChild(new Stepper().options({
    label: 'Accumsan sit amet nulla',
    iconDec: material_action_3d_rotation_rounded(),
}));
let stepper8 = document.body.appendChild(new Stepper().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
}));
let stepper9 = document.body.appendChild(new Stepper().options({
    unit: 'Accumsan sit amet nulla',
    iconDec: material_action_3d_rotation_rounded(),
}));
let stepper10 = document.body.appendChild(new Stepper().options({
    unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
}));
let stepper11 = document.body.appendChild(new Stepper().options({
    label: 'Accumsan sit amet nulla',
    iconDec: material_action_3d_rotation_rounded(),
    unit: 'Accumsan sit amet nulla',
}));
let stepper12 = document.body.appendChild(new Stepper().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
    unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let stepper13 = document.body.appendChild(new Stepper().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
    unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));


let button1 = document.body.appendChild(new Button());
let button2 = document.body.appendChild(new Button().options({ label: 'Accumsan sit amet nulla', }));
let button3 = document.body.appendChild(new Button().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let button4 = document.body.appendChild(new Button().options({ icon: material_action_3d_rotation_rounded(), }));
let button5 = document.body.appendChild(new Button().options({ text: 'Accumsan sit amet nulla', }));
let button6 = document.body.appendChild(new Button().options({ text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let button7 = document.body.appendChild(new Button().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
}));
let button8 = document.body.appendChild(new Button().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
}));
let button9 = document.body.appendChild(new Button().options({
    label: 'Accumsan sit amet nulla',
    text: 'Accumsan sit amet nulla',
}));
let button10 = document.body.appendChild(new Button().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let button11 = document.body.appendChild(new Button().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
    text: 'Accumsan sit amet nulla',
}));
let button12 = document.body.appendChild(new Button().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let button13 = document.body.appendChild(new Button().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let prog = 0;
setInterval(() => {
    button13.color = [BasicColors.Black, BasicColors.Blue, BasicColors.Green, BasicColors.Red, BasicColors.Yellow][prog];
    prog++
    if (prog === 4) { prog = 0; }
}, 1000)


let slider1 = document.body.appendChild(new Slider());
let slider2 = document.body.appendChild(new Slider().options({ label: 'Accumsan sit amet nulla', value: 10, unit: 'm/s' }));
let slider3 = document.body.appendChild(new Slider().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let slider4 = document.body.appendChild(new Slider().options({ iconDec: material_action_account_balance_rounded(), }));
let slider5 = document.body.appendChild(new Slider().options({ unit: 'Accumsan sit amet nulla', }));
let slider6 = document.body.appendChild(new Slider().options({ unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let slider7 = document.body.appendChild(new Slider().options({
    label: 'Accumsan sit amet nulla',
    iconDec: material_action_3d_rotation_rounded(),
    value: 20
}));
let slider8 = document.body.appendChild(new Slider().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
    min: -400,
    max: 0,
    value: 20
}));
let slider9 = document.body.appendChild(new Slider().options({
    unit: 'Accumsan sit amet nulla',
    iconDec: material_action_3d_rotation_rounded(),
}));
let slider10 = document.body.appendChild(new Slider().options({
    unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
}));
let slider11 = document.body.appendChild(new Slider().options({
    label: 'Accumsan sit amet nulla',
    iconDec: material_action_3d_rotation_rounded(),
    unit: 'Accumsan sit amet nulla',
}));
let slider12 = document.body.appendChild(new Slider().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
    unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let slider13 = document.body.appendChild(new Slider().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    iconDec: material_action_3d_rotation_rounded(),
    unit: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));


let lamp1 = document.body.appendChild(new Lamp());
let lamp2 = document.body.appendChild(new Lamp().options({ label: 'Accumsan sit amet nulla', }));
let lamp3 = document.body.appendChild(new Lamp().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let lamp4 = document.body.appendChild(new Lamp().options({ icon: material_action_account_balance_rounded(), }));
let lamp5 = document.body.appendChild(new Lamp().options({ text: 'Accumsan sit amet nulla', }));
let lamp6 = document.body.appendChild(new Lamp().options({ text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let lamp7 = document.body.appendChild(new Lamp().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
}));
let lamp8 = document.body.appendChild(new Lamp().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
}));
let lamp9 = document.body.appendChild(new Lamp().options({
    text: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
}));
let lamp10 = document.body.appendChild(new Lamp().options({
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
}));
let lamp11 = document.body.appendChild(new Lamp().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
    text: 'Accumsan sit amet nulla',
}));
let lamp12 = document.body.appendChild(new Lamp().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let lamp13 = document.body.appendChild(new Lamp().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    colors: [BasicColors.Black, BasicColors.Blue, BasicColors.Green, BasicColors.Red, BasicColors.Yellow]
}));
{
    let prog = 0;
    setInterval(() => {
        lamp13.value = prog;
        prog++
        if (prog === 4) { prog = 0; }
    }, 1000)
}

let switch1 = document.body.appendChild(new Switch());
let switch2 = document.body.appendChild(new Switch().options({ label: 'Accumsan sit amet nulla' }));
let switch3 = document.body.appendChild(new Switch().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' }));
let switch4 = document.body.appendChild(new Switch().options({ icon: material_action_3d_rotation_rounded(), }));
let switch5 = document.body.appendChild(new Switch().options({ text: 'Accumsan sit amet nulla', }));
let switch6 = document.body.appendChild(new Switch().options({ text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));
let switch7 = document.body.appendChild(new Switch().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
}));
let switch8 = document.body.appendChild(new Switch().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
}));
let switch9 = document.body.appendChild(new Switch().options({
    label: 'Accumsan sit amet nulla',
    text: 'Accumsan sit amet nulla',
}));
let switch10 = document.body.appendChild(new Switch().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let switch11 = document.body.appendChild(new Switch().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
    text: 'Accumsan sit amet nulla',
}));
let switch12 = document.body.appendChild(new Switch().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let switch13 = document.body.appendChild(new Switch().options({
    icon: material_action_3d_rotation_rounded(),
    text: 'Accumsan sit amet nulla',
}));
let switch14 = document.body.appendChild(new Switch().options({
    icon: material_action_3d_rotation_rounded(),
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));

let text1 = new TextField();
document.body.appendChild(text1);
let text2 = new TextField().options({ label: 'Accumsan sit amet nulla' });
document.body.appendChild(text2);
let text3 = new TextField().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' });
document.body.appendChild(text3);

let title1 = new TitleField();
document.body.appendChild(title1);
let title2 = new TitleField().options({ label: 'Accumsan sit amet nulla' });
document.body.appendChild(title2);
let title3 = new TitleField().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' });
document.body.appendChild(title3);




let dropdown = (new DropDown()).options({
    label: 'YOYO',
});
document.body.appendChild(dropdown);




