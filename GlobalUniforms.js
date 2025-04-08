import { Transform } from "./Transform.js"

export default class GlobalUniforms{
    /** @type{Vector3} */
    static GlobalLightPosition;
    /** @type{Vector3} */
    static GlobalLightForward;

    static toIterable(){
        return [
            ["GlobalLightPosition", this.GlobalLightPosition],
            ["GlobalLightForward", this.GlobalLightForward]
        ];
    }
}