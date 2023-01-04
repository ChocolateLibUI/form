import "./index.scss"
import { grey } from "@chocolatelib/colors";
import { material_action_3d_rotation_rounded } from "@chocolatelibui/icons";
import { Button, BasicColors, Lamp, Slider } from "../src"
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