import { Shader } from "./Shader.js";

class Material{
    #gl;
    #shader;

    /**
     * @param {WebGL2RenderingContext} gl 
     * @param {Shader} shader 
     */
    constructor(gl, shader){
        this.#gl = gl;
        this.#shader = shader;
    }

    get getGL() { return this.#gl; }
    get getShader() { return this.#shader; }

    release(){
        this.#shader.release();
    }

    bind(){
        this.#shader.bind();
    }

    setUniform1f(name, v){
        this.#shader.bind();
        this.#gl.uniform1f(
            this.#shader.getUniformLocation(name),
            v
        );
    }
    setUniform2f(name, v1, v2){
        this.#shader.bind();
        this.#gl.uniform2f(
            this.#shader.getUniformLocation(name),
            v1,
            v2
        );
    }
    setUniform3f(name, v1, v2, v3){
        this.#shader.bind();
        this.#gl.uniform3f(
            this.#shader.getUniformLocation(name),
            v1,
            v2,
            v3
        );
    }
    setUniform4f(name, v1, v2, v3, v4){
        this.#shader.bind();

        this.#gl.uniform4f(
            this.#shader.getUniformLocation(name),
            v1,
            v2,
            v3,
            v4
        );
    }

    setUniformMatrix4fv(name, mat){
        this.#shader.bind();
        this.#gl.uniformMatrix4fv(
            this.#shader.getUniformLocation(name),
            false,
            mat
        )
    }
}

export { Material }