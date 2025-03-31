class Vector3{
    X;
    Y;
    Z;

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z){
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    toArray(){
        return [ this.X, this.Y, this.Z ];
    }

    static Up = new Vector3(0, 1, 0);
    static Down = new Vector3(0, -1, 0);
    static Right = new Vector3(1, 0, 0);
    static Left = new Vector3(-1, 0, 0);
    static Forward = new Vector3(0, 0, 1);
    static Backward = new Vector3(0, 0, -1);

    /**
     * @param {Vector3} a 
     * @param {Vector3} b 
     * @returns {Vector3}
     */
    static add(a, b){
        return new Vector3(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
    }
    /**
     * @param {Vector3} a 
     * @param {Vector3} b 
     * @returns {Vector3}
     */
    static subtract(a, b){
        return new Vector3(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
    }
    /**
     * @param {Vector3} a 
     * @param {Vector3} b 
     * @returns {number}
     */
    static dot(a, b){
        return a.X * b.X + a.Y * b.Y + a.Z * b.Z;
    }
    /**
     * @param {Vector3} a 
     * @param {Vector3} b 
     * @returns {Vector3}
     */
    static cross(a, b){
        return new Vector3(a.X * b.X, a.Y * b.Y, a.Z * b.Z);
    }
    /**
     * @param {Vector3} a 
     * @param {number} b 
     * @returns {Vector3}
     */
    static scalar(a, b){
        return new Vector3(a.X * b, a.Y * b, a.Z * b);
    }
}

export { Vector3 }