import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmoVertex  from './shaders/atmoVertex.glsl'
import atmoFragment from './shaders/atmoFragment.glsl'



const size = {
  width: innerWidth,
  height: innerHeight
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, size.width /size.height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize( size.width, size.height );
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 5, 50, 50 );
const material = new THREE.ShaderMaterial( { 
  vertexShader,
  fragmentShader,
  uniforms:{
    globeTexture:{
      value: new THREE.TextureLoader().load('./image/earth.jpg')
    }
  }
} );
const sphere = new THREE.Mesh( geometry, material );



const atmoGeometry = new THREE.SphereGeometry(5,50,50)
const atmoMaterial = new THREE.ShaderMaterial({
  vertexShader: atmoVertex,
  fragmentShader: atmoFragment,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide
})

const atmosphere = new THREE.Mesh(atmoGeometry,atmoMaterial)

atmosphere.scale.set(1.1,1.1,1.1)

scene.add(atmosphere)

const group =  new THREE.Group()
group.add(sphere)
scene.add(group)
camera.position.z = 100;

sphere.rotation.x=0.05;
function animate() {
	requestAnimationFrame( animate );
  
	renderer.render( scene, camera );
  sphere.rotation.y+=0.01
}
animate();



const mouse = {
  x:0,
  y:0
}
addEventListener('mousemove',(event)=>{
  mouse.x = (event.clientX/innerWidth)*2-1
  mouse.y = -(event.clientY/innerHeight)*2+1
  gsap.to(group.rotation,{y:mouse.x*0.6, x:-mouse.y*0.5, duration: 1})
})

let isResized = false
function onCanvasClick(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Create a raycaster and an array to store the intersected objects
  const raycaster = new THREE.Raycaster();
  const intersects = [];

  // Update the raycaster's origin based on the camera's position
  raycaster.setFromCamera(mouse, camera);

  // Perform the intersection check and populate the 'intersects' array
  raycaster.intersectObject(sphere, true, intersects);

  // If there are intersections, handle the click on the mesh
  if (intersects.length > 0) {
      // Handle the click on your mesh here
      // 'intersects[0].object' will give you the mesh that was clicked
      const clickedMesh = intersects[0].object;

      // Example: Change the color of the clicked mesh
    console.log(clickedMesh, 'clickedMesh')
    console.log(mouse, 'mouse')

    if(isResized===false){
      gsap.to(camera.position,{z:15, duration:1})
    } else {
      gsap.to(camera.position,{z:100, duration:1})
    }
    isResized = !isResized
    
  }
}

// Assuming 'renderer' is your Three.js renderer
renderer.domElement.addEventListener('click', onCanvasClick);
