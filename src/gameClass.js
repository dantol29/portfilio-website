import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export class Game{
    constructor(){
      
      // scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x08121E);
      
      // camera
      const aspectRatio = window.innerWidth / window.innerHeight;
      this.camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 );
      this.camera.position.set(0, 0, 100);

      // light
      const light = new THREE.DirectionalLight('white', 8);
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
	load3D (name, x, tripName){
		return new Promise((resolve, reject) => {
			const loader = new GLTFLoader();
			loader.load(
				name,
				(gltf) => {
					this.scene.add(gltf.scene);
					gltf.scene.position.set(x, 0, 0);
          gltf.scene.traverse((child) => { // Use arrow function here
            if (child.isMesh) {
              const meshObject = {
                mesh: child,
                name: tripName
              };
              this.loadedObjects.push(meshObject); // 'this' now correctly refers to the gameClass instance
              if (child.name == "Map-2-Portugalstl" || child.name == "Map-6-Italystl")
                child.material.color.set(0xFFEC9E);
            }
          });
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