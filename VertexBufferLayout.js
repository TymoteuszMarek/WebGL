class VertexBufferLayout{
    #gl;
    #layout = [];
    #stride = 0;

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    constructor(gl){
        this.#gl = gl;
    }

    get Layout() { return this.#layout; }
    get Stride() { return this.#stride; }

    pushFloat(count){
        this.#layout.push({ bytes: Float32Array.BYTES_PER_ELEMENT, count, type: this.#gl.FLOAT, normalized: false });
        this.#stride += Float32Array.BYTES_PER_ELEMENT * count;
    }

    pushUInt(count){
        this.#layout.push({ bytes: Uint16Array.BYTES_PER_ELEMENT, count, type: this.#gl.UNSIGNED_INT, normalized: false });
        this.#stride += Uint16Array.BYTES_PER_ELEMENT * count;
    }
}

export { VertexBufferLayout }