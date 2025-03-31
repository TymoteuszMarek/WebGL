import { GameObject } from "./GameObject.js";
import { Transform } from "./Transform.js";
import { Vector3 } from "./Vector3.js";

class Camera{
    #gl;
    #transform;
    #gameObjects;
    #projectionMatrix;
    #viewMatrix;

    /**
     * 
     * @param {WebGL2RenderingContext} gl
     * @param {Float32Array} projectionMatrix
     * @param {[GameObject]} gameObjects 
     */
    constructor(gl, projectionMatrix, gameObjects){
        this.#gl = gl;
        this.#transform = new Transform(gl);
        this.#gameObjects = gameObjects;
        this.#projectionMatrix = projectionMatrix;
        this.#viewMatrix = new Float32Array(16);
        mat4.lookAt(this.#viewMatrix, this.#transform.Position, [0, 0, 0], Vector3.Up.toArray());
    }

    draw(){
        for(const gameObject of this.#gameObjects){
            gameObject.bind();

            gameObject.Mesh.Material.setUniformMatrix4fv("u_ProjectionMatrix", this.#projectionMatrix);
            gameObject.Mesh.Material.setUniformMatrix4fv("u_ViewMatrix", this.#viewMatrix);
            gameObject.Mesh.Material.setUniformMatrix4fv("u_WorldMatrix", gameObject.Transform.WorldMatrix);

            this.#gl.drawElements(this.#gl.TRIANGLES, gameObject.Mesh.VertexArray.IndexBuffer.Count, this.#gl.UNSIGNED_SHORT, 0);
        }
    }
}

export { Camera }