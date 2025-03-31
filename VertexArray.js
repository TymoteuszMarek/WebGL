import { Buffer } from "./Buffer.js";
import { Shader } from "./Shader.js";
import { VertexBufferLayout } from "./VertexBufferLayout.js";

class VertexArray{
    #gl;
    #vertexBuffer;
    #vertexBufferLayout;
    #indexBuffer;
    #vertexArrayID;

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * @param {Buffer} vertexBuffer 
     * @param {VertexBufferLayout} vertexBufferLayout
     * @param {Buffer} indexBuffer
     */
    constructor(gl, vertexBuffer, vertexBufferLayout, indexBuffer){
        this.#gl = gl;
        this.#vertexBuffer = vertexBuffer;
        this.#vertexBufferLayout = vertexBufferLayout;
        this.#indexBuffer = indexBuffer;
        this.#vertexArrayID = this.#createVertexArray();
    }

    get GL() { return this.#gl; }
    get VertexBuffer() { return this.#vertexBuffer; }
    get IndexBuffer() { return this.#indexBuffer; }
    get VertexBufferLayout() { return this.#vertexBufferLayout; }
    get VertexArrayID() { return this.#vertexArrayID; }

    bind(){
        this.#gl.bindVertexArray(this.#vertexArrayID);
    }

    release(){
        this.#vertexBuffer.release();
        this.#indexBuffer.release();
        this.#gl.deleteVertexArray(this.#vertexArrayID);
    }

    #createVertexArray(){
        const vao = this.#gl.createVertexArray();
        this.#gl.bindVertexArray(vao);

        this.#vertexBuffer.bind();
        this.#indexBuffer.bind();

        let i = 0;
        let offset = 0;
        for(const ele of this.#vertexBufferLayout.Layout){
            this.#gl.enableVertexAttribArray(i);
            this.#gl.vertexAttribPointer(i, ele.count, ele.type, ele.normalized, this.#vertexBufferLayout.Stride, offset);
            
            i++;
            offset += ele.count * ele.bytes;
        }
        
        return vao;
    }
}

export { VertexArray }