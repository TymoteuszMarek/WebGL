import { GameObject } from "./GameObject.js";
import { Transform } from "./Transform.js";
import { Vector3 } from "./Vector3.js";

class Camera{
    #gl;
    #transform;
    #gameObjects;
    #projectionMatrix;

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
    }

    get GL() { return this.#gl; }
    get Transform() { return this.#transform; }
    get GameObject() { return this.#gameObjects; }
    get ProjectionMatrix() { return this.#projectionMatrix; }

    draw(){
        for(const gameObject of this.#gameObjects){
            gameObject.bind();

            gameObject.Mesh.Material.setUniformMatrix4fv("u_ProjectionMatrix", this.#projectionMatrix);
            gameObject.Mesh.Material.setUniformMatrix4fv("u_ViewMatrix", this.#transform.WorldMatrix);
            gameObject.Mesh.Material.setUniformMatrix4fv("u_WorldMatrix", gameObject.Transform.WorldMatrix);

            this.#gl.drawElements(this.#gl.TRIANGLES, gameObject.Mesh.VertexArray.IndexBuffer.Count, this.#gl.UNSIGNED_SHORT, 0);
        }
    }

    printMatrix(mat){
        let matrix = "";
        for (let y = 0; y < 4; y++){
            let line = "";
            for(let x = 0; x < 4; x++){
                line += mat[y * 4 + x] + " ";
            }
            matrix += line + "\n";
        }
        console.log(matrix);
    }
}

export { Camera }