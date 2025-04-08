import { GameObject } from "./GameObject.js";

export default class Component{
    #gl;
    /** @type{GameObject} GameObject */
    GameObject;

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    constructor(gl){
        this.#gl = gl;
    }

    get GL() { return this.#gl; }

    start(){

    }
    update(){

    }
    fixedUpdate(){

    }
}