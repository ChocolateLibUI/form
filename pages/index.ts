import "./index.scss"
import { grey } from "@chocolatelib/colors";
import { material_action_3d_rotation_rounded } from "@chocolatelibui/icons";
import { Button, BasicColors } from "../src"
import { variables } from "../src/base"

variables.makeVariable('testBackground', 'TEST', '', grey['100'], grey['800'], 'Color', undefined);

let butt = (new Button()).options({
    icon: material_action_3d_rotation_rounded(),
    text: 'YOYOYO',
    clickAction: () => { console.warn('test'); },
    color: BasicColors.Blue,
    toggle: true,
});
document.body.appendChild(butt);