import Component from "../Component.js"
import GlobalUniforms from "../GlobalUniforms";
import { Transform } from "../Transform.js";

export default class GlobalLight extends Component{
    /** @type{Transform} */
    #transform;

    constructor(gl){
        super(gl);
    }

    start(){
        this.#transform = this.GameObject.Transform;
    }

    update(){
        GlobalUniforms.GlobalLightPosition = this.#transform.Position;
        GlobalUniforms.GlobalLightForward = this.#transform.
    }
}