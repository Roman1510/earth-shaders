import * as THREE from 'three'

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0xffffff,
  transparent: true,
  blending: THREE.AdditiveBlending
})

const starVertices = []

for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 1500
  const y = (Math.random() - 0.5) * 1500
  const z = (-Math.random()) * 1500
  starVertices.push(x, y, z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))


const stars = new THREE.Points(starGeometry, starMaterial)

export default stars