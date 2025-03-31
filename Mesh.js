import { Material } from "./Material.js";
import { VertexArray } from "./vertexArray.js";
import { VertexBufferLayout } from "./VertexBufferLayout.js";
import { Buffer } from "./Buffer.js";

class Mesh{
    #gl;
    #vertexArray;
    #material;

    /**
     * @param {WebGL2RenderingContext} gl
     * @param {Buffer} vertexBuffer
     * @param {VertexBufferLayout} vertexBufferLayout
     * @param {Buffer} indexBuffer
     * @param {Material} material
    */
    constructor(gl, vertexBuffer, vertexBufferLayout, indexBuffer, material){
        this.#gl = gl;
        this.#vertexArray = new VertexArray(gl, vertexBuffer, vertexBufferLayout, indexBuffer);
        this.#material = material;
    }

    get GL() { return this.#gl; }
    get VertexArray() { return this.#vertexArray; }
    get Material() { return this.#material; }

    release(){
        this.#vertexArray.release();
        this.#material.release();
    }

    bind(){
        this.#vertexArray.bind();
        this.#material.bind();
    }

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * @param {Array} verticies 
     * @param {Array} indices 
     * @param {Material} material 
     * @returns {Mesh}
     */
    static createMesh(gl, verticies, indices, material){
        const vertexBuffer = new Buffer(gl, gl.ARRAY_BUFFER, verticies);
        const vertexBufferLayout = new VertexBufferLayout(gl);
        vertexBufferLayout.pushFloat(3); //positions
        vertexBufferLayout.pushFloat(3); //uvs

        const indexBuffer = new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices);

        return new Mesh(gl, vertexBuffer, vertexBufferLayout, indexBuffer, material);
    }
}

export { Mesh }