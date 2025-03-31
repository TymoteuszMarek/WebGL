import { mat4, vec4 } from "./gl-matrix/dist/esm/index.js";
import { Vector3 } from "./Vector3.js";

class Transform{
    #worldMatrix = new Float32Array(16);
    #gl;

    constructor(gl){
        this.#gl = gl;
        mat4.identity(this.#worldMatrix);
    }

    get X() { return this.#worldMatrix[12]; }
    get Y() { return this.#worldMatrix[13]; }
    get Z() { return this.#worldMatrix[14]; }
    get Position() { return new Vector3(this.X, this.Y, this.Z)}
    get WorldMatrix() { return this.#worldMatrix; }

    /**
     * 
     * @param {Vector3} rotation 
     */
    rotate(rotation){
        mat4.rotate(this.#worldMatrix, this.#worldMatrix, rotation.X, [1, 0, 0]);
        mat4.rotate(this.#worldMatrix, this.#worldMatrix, rotation.Y, [0, 1, 0]);
        mat4.rotate(this.#worldMatrix, this.#worldMatrix, rotation.Z, [0, 0, 1]);
    }
    /**
     * 
     * @param {Vector3} translation 
     */
    translate(translation){
        mat4.translate(this.#worldMatrix, this.#worldMatrix, translation.toArray());
    }
    /**
     * 
     * @param {Vector3} scale
     */
    scale(scale){
        mat4.scale(this.#worldMatrix, this.#worldMatrix, scale.toArray());
    }
}

export { Transform }