  import { Game } from "./gameClass";
  import { isOverObject } from './utils';
  import gsap from "gsap"
  import * as THREE from 'three';
  import "./style.css"
  const game = new Game();
  game.render();
  game.load3D("./italy.glb", 100);
  game.load3D("./spain.glb", 0);

  const tl = gsap.timeline({defaults: {duration: 0.5}});

  // main loop  
  function animate() {
    requestAnimationFrame( animate );
    game.controls.update();
    game.camera.aspect = window.innerWidth / window.innerHeight;
    game.camera.updateProjectionMatrix();
    game.renderer.setSize( window.innerWidth, window.innerHeight );
    game.renderer.setPixelRatio(window.devicePixelRatio);
    game.renderer.render( game.scene, game.camera );
  }
  animate();

  let overObject = false;
  let isScaling = false;
  let currentObject = 0;
  let prevObject = 0;


  function openPopup() {
    document.getElementById("popup").style.display = "flex"; // Set display to flex before animation
    document.getElementById("popup").style.visibility = "visible";
    gsap.fromTo("#popup", {opacity: 0}, {duration: 0.3, opacity: 1, ease: "power2.out", onComplete: function() {
      document.getElementById("popup").style.visibility = "visible"; // Ensure visibility is set after animation
    }});
  }


  // Function to close the popup
  function closePopup() {
    gsap.fromTo("#popup", {opacity: 1}, {duration: 0.3, opacity: 0, ease: "power2.out", onComplete: function() {
      document.getElementById("popup").style.display = "none";
      document.getElementById("popup").style.visibility = "hidden";
    }});
  }

  function getScreenPosition(object, camera, renderer) {
    const vector = new THREE.Vector3();

    vector.setFromMatrixPosition(object.matrixWorld);

    // Project this vector to 2D using the camera
    vector.project(camera);

    // Convert the normalized device coordinate (NDC) space to screen space
    const widthHalf = 0.5 *  renderer.domElement.clientWidth
    const heightHalf = 0.5 *  renderer.domElement.clientHeight;

    return {
        x: (vector.x * widthHalf) + widthHalf,
        y: - (vector.y * heightHalf) + heightHalf
    };
}

function positionPopup(index) {
  console.log(game.loadedObjects);
  const object = game.loadedObjects[index];
  const pos = getScreenPosition(object, game.camera, game.renderer);

  const popup = document.getElementById("popup");
  popup.style.position = 'absolute';
  popup.style.left = `${pos.x}px`;
  popup.style.top = `${pos.y}px`; // 10 pixels above the object

  const countryNameSpan = document.getElementById("country-name");
  countryNameSpan.textContent = index; // Set the text dynamically based on the object's property
}

  function scaleObject(scaleIn, index)
  {
    if (scaleIn){
      isScaling = true;
      tl.fromTo(game.loadedObjects[index].scale, {z: 1, x: 1, y: 1}, {z: 1.1, x: 1.1, y: 1.1, onComplete: () => {
        isScaling = false; positionPopup(index); openPopup();
      }});
    }
    else{
      isScaling = true;
      tl.fromTo(game.loadedObjects[index].scale, {z: 1.1, x: 1.1, y: 1.1}, {z: 1, x: 1, y: 1, onComplete: () => {
        isScaling = false; positionPopup(index); closePopup();
      }});
    }
  }


  window.addEventListener("mousemove", (e) =>{
      if (!isScaling){
        prevObject = currentObject;
        currentObject = isOverObject(e, game);
        if (!overObject && currentObject != -1){
          overObject = true;
          scaleObject(true, currentObject);
        }
        else if (overObject && currentObject == -1){
          overObject = false;
          scaleObject(false, prevObject);
        }
      }
    })

