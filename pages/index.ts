import "./index.scss"
import { grey } from "@chocolatelib/colors";
import { material_action_3d_rotation_rounded } from "@chocolatelibui/icons";
import { Button, Lamp, Slider, DropDown, ToggleSwitch, TextField, TitleField } from "../src"
import { BasicColors, variables } from "../src/base"

variables.makeVariable('testBackground', 'TEST', '', grey['100'], grey['800'], 'Color', undefined);

let button1 = document.body.appendChild(new Button());
let button2 = document.body.appendChild(new Button().options({ label: 'Accumsan sit amet nulla' }));
let button3 = document.body.appendChild(new Button().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' }));
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




let lamp = (new Lamp()).options({
    label: 'YOYO',
    icon: material_action_3d_rotation_rounded(),
    text: 'YOYOYO',
});
document.body.appendChild(lamp);

let slider = (new Slider()).options({
    label: 'YOYO',
});
document.body.appendChild(slider);

let dropdown = (new DropDown()).options({
    label: 'YOYO',
});
document.body.appendChild(dropdown);

let toggleSwitch14 = document.body.appendChild(new ToggleSwitch());
let toggleSwitch1 = document.body.appendChild(new ToggleSwitch().options({ label: 'Accumsan sit amet nulla' }));
let toggleSwitch2 = document.body.appendChild(new ToggleSwitch().options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' }));
let toggleSwitch3 = document.body.appendChild(new ToggleSwitch().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
}));
let toggleSwitch4 = document.body.appendChild(new ToggleSwitch().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
}));
let toggleSwitch5 = document.body.appendChild(new ToggleSwitch().options({
    label: 'Accumsan sit amet nulla',
    text: 'Accumsan sit amet nulla',
}));
let toggleSwitch6 = document.body.appendChild(new ToggleSwitch().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let toggleSwitch7 = document.body.appendChild(new ToggleSwitch().options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
    text: 'Accumsan sit amet nulla',
}));
let toggleSwitch8 = document.body.appendChild(new ToggleSwitch().options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let toggleSwitch9 = document.body.appendChild(new ToggleSwitch().options({ icon: material_action_3d_rotation_rounded(), }));
let toggleSwitch10 = document.body.appendChild(new ToggleSwitch().options({
    icon: material_action_3d_rotation_rounded(),

    text: 'Accumsan sit amet nulla',
}));
let toggleSwitch11 = document.body.appendChild(new ToggleSwitch().options({
    icon: material_action_3d_rotation_rounded(),

    text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
}));
let toggleSwitch12 = document.body.appendChild(new ToggleSwitch().options({ text: 'Accumsan sit amet nulla', }));
let toggleSwitch13 = document.body.appendChild(new ToggleSwitch().options({ text: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis', }));


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
