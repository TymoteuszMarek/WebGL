import Component from "./Component.js";
import { Mesh } from "./Mesh.js";
import { Transform } from "./Transform.js";

class GameObject{
    #gl;
    #transform;
    #mesh;
    Components;

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * @param {Mesh} mesh
     * @param {[Component]} components
     */
    constructor(gl, mesh, components = []){
        this.#gl = gl;
        this.#transform = new Transform(gl);
        this.#mesh = mesh;
        this.Components = components;
    }

    get GL() { return this.#gl; }
    get Transform() { return this.#transform; }
    get Mesh() { return this.#mesh; }

    /**
     * 
     * @param {Component} component 
     */
    attachComponent(component){
        this.Components.push(component);
        component.GameObject = this;
    }

    release(){
        this.#mesh.release();
    }

    bind(){
        this.#mesh.bind();
    }

    start(){
        for(const component of this.Components){
            component.start();
        }
    }

    update() {
        for (const component of this.Components) {
            component.update();
        }
    }

    fixedUpdate() {
        for (const component of this.Components) {
            component.fixedUpdate();
        }
    }
}

export { GameObject }