import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmoVertex from './shaders/atmoVertex.glsl'
import atmoFragment from './shaders/atmoFragment.glsl'



const size = {
  width: innerWidth,
  height: innerHeight
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement);

const geometryEarth = new THREE.SphereGeometry(5, 50, 50);
const materialEarth = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load('./image/earth.jpg')
    }
  }
});
const earth = new THREE.Mesh(geometryEarth, materialEarth);

const atmoGeometry = new THREE.SphereGeometry(5, 50, 50)
const atmoMaterial = new THREE.ShaderMaterial({
  vertexShader: atmoVertex,
  fragmentShader: atmoFragment,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide
})
const atmosphereEarth = new THREE.Mesh(atmoGeometry, atmoMaterial)
atmosphereEarth.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphereEarth)

//moon
const geometryMoon = new THREE.SphereGeometry(0.3, 30, 30);
const materialMoon = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load('./image/moon.jpg')
    }
  }
});
const moon = new THREE.Mesh(geometryMoon, materialMoon);

moon.position.x = 10



atmosphereEarth.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphereEarth)


const group = new THREE.Group()
group.add(earth)
group.add(moon)
scene.add(group)
camera.position.z = 100;

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  const elapsedTime = clock.getElapsedTime()
  earth.rotation.y += 0.01

  const moonOrbitRadius = 8;
  const moonOrbitSpeed = 0.3;
  const moonPosition = new THREE.Vector3();

  //for satellite
  // moonPosition.x = Math.cos(moonOrbitSpeed * Date.now() * 0.1) * moonOrbitRadius/2;
  // moonPosition.z = Math.sin(moonOrbitSpeed * Date.now() * 0.1) * moonOrbitRadius;
  // moonPosition.y = Math.cos(moonOrbitSpeed * Date.now() * 0.1) * moonOrbitRadius/2;
  moonPosition.x = Math.cos(moonOrbitSpeed * elapsedTime) * moonOrbitRadius;
  moonPosition.z = Math.sin(moonOrbitSpeed * elapsedTime) * moonOrbitRadius;
  moon.position.copy(moonPosition);
  moon.rotation.y += 0.1;
  // moon.lookAt(earth.position);
}
animate();


const mouse = {
  x: 0,
  y: 0
}
addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
  gsap.to(group.rotation, { y: mouse.x * 0.6, x: -mouse.y * 0.5, duration: 1 })
})


window.addEventListener('resize', function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

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
  raycaster.intersectObject(earth, true, intersects);

  // If there are intersections
  if (intersects.length > 0) {

    const clickedMesh = intersects[0].object;

    // Example: Change the color of the clicked mesh
    console.log(clickedMesh, 'clickedMesh')
    console.log(mouse, 'mouse')

    if (isResized === false) {
      gsap.to(camera.position, { z: 15, duration: 1 })
    } else {
      gsap.to(camera.position, { z: 100, duration: 1 })
    }
    isResized = !isResized

  }
}

// Assuming 'renderer' is your Three.js renderer
renderer.domElement.addEventListener('click', onCanvasClick); 
