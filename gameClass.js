import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export class Game{
    constructor(){
      
      // scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('skyblue');
      
      // camera
      const aspectRatio = window.innerWidth / window.innerHeight;
      this.camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 );
      this.camera.position.set(0, 0, 170);

      // light
      const light = new THREE.DirectionalLight('yellow', 8);
      light.position.set(10, 10, 10);
      this.scene.add(light);

      // raycaster to detect position
      this.raycaster = new THREE.Raycaster();

      // mouse position
      this.mouse = new THREE.Vector2();
      
	  // get canvas from HTML
      const canvas = document.querySelector(".webgl");

	  this.loadedObjects = [];

      // Controls
      this.controls = new OrbitControls(this.camera, canvas);
      this.controls.enableDamping = true;
      this.controls.enablePan = true;
      this.controls.enableZoom = true;
      this.controls.enableRotate = true;
      
      // renderer
      this.renderer = new THREE.WebGLRenderer({ canvas });
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.physicallyCorrectLights = true;
      
    }
	render (){
		this.renderer.render( this.scene, this.camera );
	}
	load3D (name, x){
		return new Promise((resolve, reject) => {
			const loader = new GLTFLoader();
			loader.load(
				name,
				(gltf) => {
					this.loadedObjects.push(gltf.scene);
					this.scene.add(gltf.scene);
					gltf.scene.position.set(x, 0, 0);
					resolve(gltf.scene); // Resolve with the loaded object
				},
				undefined,
				(error) => {
					console.error(error);
					reject(error); // Reject if there's an error loading the object
				}
			);
		});
	}
  }