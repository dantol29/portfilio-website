  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/Addons.js';
  import gsap from "gsap"
  // Create scene
  const scene = new THREE.Scene();
  // Set scene's background
  scene.background = new THREE.Color('skyblue');
  
  // Create camera
  const fov = 75;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera( fov, aspectRatio, 0.1, 1000 );
  // set camera a bit further to see the cube
  camera.position.set(0, 0, 10);
  
  // Create cube
  const geometry = new THREE.SphereGeometry( 3, 64, 64,);
  const material = new THREE.MeshStandardMaterial({ color: "purple", roughness: 0.2 });
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  
  
  // light
  const light = new THREE.DirectionalLight('yellow', 8);
  light.position.set(10, 10, 10);
  scene.add(light);
  
  // controls
  
  // create renderer
  const canvas = document.querySelector(".webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;
  renderer.render( scene, camera );

 
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;
  
// main loop  
function animate() {
	requestAnimationFrame( animate );
  controls.update();
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.render( scene, camera );
}
animate();

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(cube.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});

let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) =>{
  if (mouseDown){
    rgb = [
      Math.round((e.pageX / window.innerWidth) * 255),
      Math.round((e.pageY / window.innerHeight) * 255),
      150,
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(cube.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})