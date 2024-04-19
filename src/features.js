  
// tl = gsap.timeline({defaults: {duration: 0.7}});
// tl.fromTo(gltf.scene.scale, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1});





// change color of the object on mousedown 
 // let rgb = [];
  // window.addEventListener("mousedown", () => (mouseDown = true));
  // window.addEventListener("mouseup", () => (mouseDown = false));
  
  // change color on mouse press
  // if (mouseDown){
  //   rgb = [
  //     Math.round((e.pageX / window.innerWidth) * 255),
  //     Math.round((e.pageY / window.innerHeight) * 255),
  //     150,
  //   ]
  //   let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
  //   gsap.to(cube.material.color, {
  //     r: newColor.r,
  //     g: newColor.g,
  //     b: newColor.b,
  //   })
  // }


  




// Does not work (boundaries for camera)

  //   game.controls.addEventListener('change', () => {
  //     // Get current camera position
  //     const { x, y, z } = game.camera.position;
  
  //     // Check if camera position exceeds boundaries
  //     if (!isAnim && (x < minX || x > maxX || y < minY || y > maxY)) {
  //         isAnim = true;
  //         // Reset camera position to within boundaries
  //         tl.to(game.camera.position, {
  //           y: THREE.MathUtils.clamp(y, minY, maxY),
  //           duration: 0.5, // Adjust duration for smoother or faster animation
  //           ease: "power2.out", // Use easing for smoother animation
  //           onComplete: () => {
  //               isAnim = false; // Reset animation flag
  //               game.controls.update(); // Update camera controls
  //           }
  //       });
  //     }
  // });