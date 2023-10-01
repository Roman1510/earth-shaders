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

const geometry = new THREE.SphereGeometry( 3, 50, 50 );
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



const atmoGeometry = new THREE.SphereGeometry(3,50,50)
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
camera.position.z = 15;

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

