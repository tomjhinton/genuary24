export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;
varying vec3 pos;

attribute vec3 position2;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .15));
    
  }  

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.);


    vec4 modelPosition2 = modelMatrix * vec4(position, 1.);

    coswarp(modelPosition2.xyz, 3.);
    // coswarp(modelPosition2.xyz, 3.);
    modelPosition2.y += (sin(uTime  + modelPosition2.x) +1.)/2. * 1. * 4.;
    modelPosition2.x += (sin(uTime  + modelPosition2.y) +1.)/2. * 1. * 4.;
    modelPosition2.z += (cos(uTime  + modelPosition2.y) +1.)/2. * 1. * 1.;

    modelPosition2.z += (cos(uTime  + length(modelPosition2.xy)) +1.)/2. * 1. * 3.;

    // modelPosition.xyz = mix(modelPosition.xyz, modelPosition2.xyz, sin(uTime * .2));
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectionPosition;
    gl_PointSize = 150. * 1. * 1.;
    gl_PointSize *= (1.0/ -viewPosition.z);

    vUv = uv;
    pos = modelPosition2.xyz;
}`