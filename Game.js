import { Shader } from "./Shader.js";
import { Buffer } from "./Buffer.js";
import { Material } from "./Material.js";
import { VertexBufferLayout } from "./VertexBufferLayout.js";
import { Mesh } from "./Mesh.js"

import { glMatrix, mat4 } from "./gl-matrix/dist/esm/index.js"
import { onResize, resizeCanvasToDisplaySize } from "./ResizeCanvas.js";
import { GameObject } from "./GameObject.js";
import { Camera } from "./Camera.js";
import { Vector3 } from "./Vector3.js";
import { Input } from "./Input.js";
import CubeMovement from "./Components/CubeMovement.js";

main();

function main(){
    
    const canvas = document.getElementById("canvas");
    canvas.style.height = "100vh";
    canvas.style.width = "100vw";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas, { box: 'content-box' });

    /**@type {WebGL2RenderingContext} */
    const gl = canvas.getContext("webgl2");

    if (gl === null){
        alert("Can't initialize webGl context!");
        return;
    }

    const vsSource = `#version 300 es

        in vec3 a_VertexPosition;
        in vec3 a_VertexUV;

        uniform mat4 u_ProjectionMatrix;
        uniform mat4 u_ViewMatrix;
        uniform mat4 u_WorldMatrix;

        out vec3 uv;

        void main()
        {
            uv = a_VertexUV;

            gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_WorldMatrix* vec4(a_VertexPosition, 1);
        }
    `
    const fsSource = `#version 300 es

        precision highp float;

        in vec3 uv;
        out vec4 outColor;

        void main()
        {
            outColor = vec4(uv, 1.0);
        }
    `;

    var boxVertices = 
	[ // X, Y, Z           R, G, B
		// Top
		-1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
		-1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
		1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
		1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

		// Left
		-1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
		-1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
		-1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
		-1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

		// Right
		1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
		1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
		1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
		1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

		// Front
		1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
		1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

		// Back
		1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
		1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

		// Bottom
		-1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
		-1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
		1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
		1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
	];

	var boxIndices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];
    
    const shader = new Shader(gl, vsSource, fsSource, ["a_VertexPosition", "a_VertexUV"]);
    const material = new Material(gl, shader);

    const mesh = Mesh.createMesh(gl, boxVertices, boxIndices, material);

    const gameObject = new GameObject(gl, mesh);
    gameObject.attachComponent(new CubeMovement(gl));
    
    const gameObjects = [ gameObject ];

    const projectionMatrix = new Float32Array(16);
    mat4.perspective(projectionMatrix, glMatrix.toRadian(45), gl.canvas.width / gl.canvas.height, 0.1, 1000.0);
    
    const camera = new Camera(gl, projectionMatrix, gameObjects);
    const cameraTransform = camera.Transform;
    cameraTransform.translate(new Vector3(0, 0, -20));

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.depthFunc(gl.LEQUAL);

    Input.initialize();

    for(const go of gameObjects){
        go.start();
    }

    const mainloop = function() {
        resizeCanvasToDisplaySize(gl, canvas);

        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        Input.update();

        for (const go of gameObjects) {
            go.update();
        }

        camera.draw();

        requestAnimationFrame(mainloop);
    }
    requestAnimationFrame(mainloop);

    // mesh.release();
}

function printMatrix(mat){
    let matrix = "";
    for (let y = 0; y < 4; y++){
        let line = "";
        for(let x = 0; x < 4; x++){
            line += mat[y * 4 + x] + " ";
        }
        matrix += line + "\n";
    }
    console.log(matrix);
}