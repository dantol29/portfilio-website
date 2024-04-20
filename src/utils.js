import gsap from "gsap"

export function isOverObject(e, game)
{
	 // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
	 game.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
	 game.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
   
	 // Update the picking ray with the camera and mouse position
	 game.raycaster.setFromCamera(game.mouse, game.camera);
   
	 // Calculate objects intersecting the picking ray
	 let intersects;
	 let i = 0;
	 while (game.loadedObjects[i]){
	 	intersects = game.raycaster.intersectObjects([game.loadedObjects[i].mesh], true);
	 	if (intersects.length > 0){
			console.log("%d object", i);
			break ;
		}
		i++;
	 }
   
	 if (intersects.length > 0) {
	   console.log('Mouse is over an object');
	   return (i);
	 } else {
	   console.log('Mouse is not over an object');
	   return (-1);
	 }
}

// export function scaleObject(scaleIn, italy, isScaling, tl)
//   {
//     if (scaleIn){
//       isScaling = true;
//       tl.fromTo(italy.scale, {z: 1, x: 1, y: 1}, {z: 1.2, x: 1.2, y: 1.2, onComplete: () => {
//         isScaling = false;
//       }});
//     }
//     else{
//       isScaling = true;
//       tl.fromTo(italy.scale, {z: 1.2, x: 1.2, y: 1.2}, {z: 1, x: 1, y: 1, onComplete: () => {
//         isScaling = false;
//       }});
//     }
//   }
