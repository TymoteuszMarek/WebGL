import { Mesh } from "./Mesh.js";
import { Transform } from "./Transform.js";

class GameObject{
    #gl;
    #transform;
    #mesh;

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * @param {Mesh} mesh
     */
    constructor(gl, mesh){
        this.#gl = gl;
        this.#transform = new Transform(gl);
        this.#mesh = mesh;
    }

    get GL() { return this.#gl; }
    get Transform() { return this.#transform; }
    get Mesh() { return this.#mesh; }

    release(){
        this.#mesh.release();
    }

    bind(){
        this.#mesh.bind();
    }

    draw(){
        this.bind();

        this.#mesh.Material.setUniformMatrix4fv("u_WorldMatrix", this.#transform.WorldMatrix);

        this.#gl.drawElements(this.#gl.TRIANGLES, this.#mesh.VertexArray.IndexBuffer.Count, this.#gl.UNSIGNED_SHORT, 0);
    }
}

export { GameObject }