import * as THREE from 'three';

const size = {
  width: innerWidth,
  height: innerHeight
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, size.width /size.height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( size.width, size.height );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.SphereGeometry( 5, 50, 50 );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 15;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();