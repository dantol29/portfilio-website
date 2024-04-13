import * as THREE from 'three';
  
  // Create scene
  const scene = new THREE.Scene();
  // Set scene's background
  scene.background = new THREE.Color('skyblue');
  
  // Field of view
  const fov = 75;
  // Aspect ratio
  const aspectRatio = window.innerWidth / window.innerHeight;
  // Create camera
  const camera = new THREE.PerspectiveCamera( fov, aspectRatio, 0.1, 1000 );
  
  // Create cube
  const geometry = new THREE.BoxGeometry( 1, 1, 1,);
  const material = new THREE.MeshStandardMaterial({ color: "purple" });
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  
  // set camera a bit further to see the cube
  camera.position.set(0, 0, 3);
  
  const light = new THREE.DirectionalLight('yellow', 8);
  light.position.set(10, 10, 10);
  scene.add(light);
  
  // create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;
  
  document.body.appendChild( renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio(window.devicePixelRatio);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();
