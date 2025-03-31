class Buffer{
    #gl;
    #type;
    #data;
    #bufferID;

    /**
     * @param {WebGL2RenderingContext} gl 
     * @param {Array} data 
     */
    constructor(gl, type, data){
        this.#gl = gl;
        this.#type = type;
        this.#data = data;
        this.#bufferID = this.#createBuffer(data)
    }

    get GL() { return this.#gl; }
    get BufferID() { return this.#bufferID; }
    get Data() { return this.#data; }
    get Count() { return this.#data.length; }

    bind(){
        this.#gl.bindBuffer(this.#type, this.#bufferID);
    }

    release(){
        this.#gl.deleteBuffer(this.#bufferID);
    }

    #createBuffer(data){
        const buffer = this.#gl.createBuffer();
        this.#gl.bindBuffer(this.#type, buffer);

        let array;
        switch(this.#type){
            case this.#gl.ARRAY_BUFFER:
                array = new Float32Array(data);
                break;
            
            case this.#gl.ELEMENT_ARRAY_BUFFER:
                array = new Uint16Array(data);
                break;
        }

        this.#gl.bufferData(this.#type, array, this.#gl.STATIC_DRAW);

        return buffer;
    }
}

export { Buffer }