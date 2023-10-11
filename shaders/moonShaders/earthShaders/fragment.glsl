uniform sampler2D globeTexture;

varying vec2 vertexUV; //vec2(0,0.24)
varying vec3 vertexNormal;

void main() {
  float intensity = 1.01 - dot(vertexNormal, vec3(0.0,0.0,1.0));
  vec3 atmosphere = vec3(0.3,0.6,1.2) * pow(intensity,1.1);
  gl_FragColor = vec4(atmosphere+texture2D(globeTexture, vertexUV ).xyz,1.0);
} 