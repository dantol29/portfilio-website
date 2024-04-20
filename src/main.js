  import { Game } from "./gameClass";
  import { isOverObject } from './utils';
  import gsap from "gsap"
  import * as THREE from 'three';



  const game = new Game();
  game.render();
  game.load3D("./test2.gltf", 100, "Italy");

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


  function openPopup(name) {
    // Select the h2 element
    var heading = document.querySelector("#popup h2");

    document.getElementById("popup").style.visibility = "visible";
    heading.textContent = name;
    gsap.fromTo("#popup", {opacity: 0}, {duration: 0.3, opacity: 1, ease: "power2.out"});
  }


  // Function to close the popup
  function closePopup() {
    gsap.fromTo("#popup", {opacity: 1}, {duration: 0.3, opacity: 0, ease: "power2.out", onComplete: function() {
      document.getElementById("popup").style.visibility = "hidden";
    }});
  }

  function scaleObject(scaleIn, index)
  {
    const object = game.loadedObjects[index].mesh;
    const newColor = scaleIn ? new THREE.Color(0x99ff99) : new THREE.Color(0xffffff); // Red when scaling in, white when scaling out
    if (scaleIn) {
      isScaling = true;
      tl.fromTo(object.scale, 
        {z: 1, x: 1, y: 1}, 
        {z: 1.1, x: 1.1, y: 1.1,
          onStart: () => object.traverse(child => {
            if (child.isMesh) child.material.color.set(newColor);}),
          onComplete: () => { isScaling = false; openPopup(game.loadedObjects[index].tripName); }
        }
      );
    }
    else {
      isScaling = true;
      tl.fromTo(object.scale, 
        {z: 1.1, x: 1.1, y: 1.1}, 
        {z: 1, x: 1, y: 1,
          onStart: () => object.traverse(child => {
            if (child.isMesh) child.material.color.set(newColor);}),
          onComplete: () => { isScaling = false; closePopup(); }
        }
      );
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

