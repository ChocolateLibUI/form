import "./index.scss"
import { grey } from "@chocolatelib/colors";
import { material_action_3d_rotation_rounded } from "@chocolatelibui/icons";
import { Button, BasicColors, Lamp, Slider, DropDown, ToggleSwitch } from "../src"
import { variables } from "../src/base"
import { touch } from "@chocolatelibui/theme";

variables.makeVariable('testBackground', 'TEST', '', grey['100'], grey['800'], 'Color', undefined);

let butt = (new Button()).options({
    icon: material_action_3d_rotation_rounded(),
    text: 'YOYOYO',
    clickAction: () => { console.warn('test'); },
    color: BasicColors.Blue,
    toggle: true,
    value: touch
});
document.body.appendChild(butt);

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

let toggleSwitch1 = (new ToggleSwitch()).options({ label: 'Accumsan sit amet nulla' });
document.body.appendChild(toggleSwitch1);
let toggleSwitch2 = (new ToggleSwitch()).options({ label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis' });
document.body.appendChild(toggleSwitch2);
let toggleSwitch3 = (new ToggleSwitch()).options({
    label: 'Accumsan sit amet nulla',
    icon: material_action_3d_rotation_rounded(),
});
document.body.appendChild(toggleSwitch3);
let toggleSwitch4 = (new ToggleSwitch()).options({
    label: 'Aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis',
    icon: material_action_3d_rotation_rounded(),
});
document.body.appendChild(toggleSwitch4);
let toggleSwitch5 = (new ToggleSwitch()).options({ icon: material_action_3d_rotation_rounded() });
document.body.appendChild(toggleSwitch5);
let toggleSwitch6 = (new ToggleSwitch());
document.body.appendChild(toggleSwitch6);