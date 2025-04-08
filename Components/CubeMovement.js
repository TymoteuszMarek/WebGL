import Component from "../Component.js";
import { Vector3 } from "../Vector3.js";
import { Input } from "../Input.js";

export default class CubeMovement extends Component{
    #transform;
    #speed = 0.1;
    #rotationSpeed = 0.01;

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    constructor(gl){
        super(gl);
    }

    start(){
        this.#transform = this.GameObject.Transform;
    }

    update(){
        this.#transform.rotate(Vector3.scalar(new Vector3(1, 0.5, 0.25), this.#rotationSpeed));

        if (Input.getKey("a")) {
            this.#transform.translate(Vector3.scalar(Vector3.Left, this.#speed));
        }
        if (Input.getKey("d")) {
            this.#transform.translate(Vector3.scalar(Vector3.Right, this.#speed));
        }
        if (Input.getKey("s")) {
            this.#transform.translate(Vector3.scalar(Vector3.Forward, this.#speed));
        }
        if (Input.getKey("w")) {
            this.#transform.translate(Vector3.scalar(Vector3.Backward, this.#speed));
        }
    }
}