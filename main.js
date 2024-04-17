  import { Game } from "./gameClass";
  import { isOverObject } from './utils';
  import gsap from "gsap"

  const game = new Game();
  game.render();
  
  let italy;
  game.load3D("./italy.glb", 100)
    .then((loadedObject) => {
        italy = loadedObject; // Assign the loaded object to italy when the load is complete
    })
    .catch((error) => {
        console.error("Error loading 3D object:", error);
    });
  let spain;
  game.load3D("./spain.glb", 0)
    .then((loadedObject) => {
        spain = loadedObject; // Assign the loaded object to italy when the load is complete
    })
    .catch((error) => {
        console.error("Error loading 3D object:", error);
    });

  const tl = gsap.timeline({defaults: {duration: 0.7}});

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

  function scaleObject(scaleIn, index)
  {
    if (scaleIn){
      isScaling = true;
      tl.fromTo(game.loadedObjects[index].scale, {z: 1, x: 1, y: 1}, {z: 1.2, x: 1.2, y: 1.2, onComplete: () => {
        isScaling = false;
      }});
    }
    else{
      isScaling = true;
      tl.fromTo(game.loadedObjects[index].scale, {z: 1.2, x: 1.2, y: 1.2}, {z: 1, x: 1, y: 1, onComplete: () => {
        isScaling = false;
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
