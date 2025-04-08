class Input{
    static #keyBuffer = {};
    static #keyDownBuffer = {};

    static initialize(){
        window.addEventListener("keydown", (e) => {
            if (e.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            this.#keyBuffer[e.key] = true;
            this.#keyDownBuffer[e.key] = true;

            console.log(this.#keyBuffer);

            // Cancel the default action to avoid it being handled twice
            e.preventDefault();
        }, true);

        window.addEventListener("keyup", (e) => {
            if (e.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            this.#keyBuffer[e.key] = false;
            console.log(this.#keyBuffer);

            // Cancel the default action to avoid it being handled twice
            e.preventDefault();
        }, true);
    }

    static update(){
        this.#keyDownBuffer = {};
    }

    /**
     * @param {string} key 
     * @returns {boolean}
     */
    static getKey(key){
        return this.#keyBuffer[key] !== undefined && this.#keyBuffer[key] === true;
    }
    /**
     * @param {string} key 
     * @returns {boolean}
     */
    static getKeyDown(key) {
        return this.#keyDownBuffer[key] !== undefined && this.#keyDownBuffer === true;
    }
}

export { Input }