
varying vec3 vertexNormal;

void main() {
  float intensity = pow(0.55 - dot(vertexNormal, vec3(0,0,1.0)),2.0);
  gl_FragColor = vec4(1.6,0.9,3.0,2.0) * intensity;
} 