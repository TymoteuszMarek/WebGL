class Shader{
    #gl;
    #vsSource;
    #fsSource;
    #vertexAttributes = [];
    #vertexShader;
    #fragmentShader;
    #programID;

    /**
     * @param {WebGLRenderingContext} gl 
     * @param {string} vsSource 
     * @param {string} fsSource
     * @param {[string]} vertexAttributes
     */
    constructor(gl, vsSource, fsSource, vertexAttributes){
        this.#gl = gl;
        this.#vsSource = vsSource;
        this.#fsSource = fsSource;
        this.#vertexAttributes = vertexAttributes;

        const programData = this.#createProgram(vsSource, fsSource);
        this.#programID = programData.program;
        this.#vertexShader = programData.vertexShader;
        this.#fragmentShader = programData.fragmentShader;
    }

    get GL(){ return this.#gl; }
    get VsSource() { return this.#vsSource; }
    get FsSource() { return this.#fsSource; }
    get VertexAttributes() { return this.#vertexAttributes; }
    get VertexShader() { return this.#vertexShader; }
    get FragmentShader() { return this.#fragmentShader; }
    get ProgramID() { return this.#programID; }

    bind(){
        this.#gl.useProgram(this.#programID);
    }

    release(){
        this.#gl.deleteShader(this.#fragmentShader);
        this.#gl.deleteShader(this.#vertexShader);
        this.#gl.deleteProgram(this.#programID);
    }

    pushAttribute(name){
        this.#vertexAttributes.push({ name, location: this.#vertexAttributes.length });
        this.#gl.bindAttribLocation(this.#programID, this.#vertexAttributes.length, name);
    }

    /**
     * @param {string} name 
     */
    getAttributeLocation(name){
        return this.#gl.getAttribLocation(this.#programID, name);
    }

    /**
     * @param {string} name
     */
    getUniformLocation(name){
        return this.#gl.getUniformLocation(this.#programID, name);
    }

    #createProgram(vsSource, fsSource) {
        const program = this.#gl.createProgram();
        const vertexShader = this.#createShader(this.#gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.#createShader(this.#gl.FRAGMENT_SHADER, fsSource);

        this.#gl.attachShader(program, vertexShader);
        this.#gl.attachShader(program, fragmentShader);

        let i = 0;
        for(const attribute of this.#vertexAttributes){
            this.#gl.bindAttribLocation(program, i, attribute);
            i++;
        }

        this.#gl.linkProgram(program);

        if (!this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS)) {
            alert(`Unable to link shader program: ${this.#gl.getProgramInfoLog(program)}`)
            return null;
        }

        return { program, fragmentShader, vertexShader };
    }

    #createShader(type, source) {
        const shader = this.#gl.createShader(type);
        this.#gl.shaderSource(shader, source);
        this.#gl.compileShader(shader);

        if (!this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS)) {
            alert(`An error occured when compiling shader: ${this.#gl.getShaderInfoLog(shader)}`);
            this.#gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
}

export { Shader }