export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

attribute vec3 position2;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .15));
    
  }  

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.);


    vec4 modelPosition2 = modelMatrix * vec4(position, 1.);

    modelPosition.z += sin((uTime ) + (length(modelPosition.xy)) )*1.;

    float t = (uTime * .1) + length(modelPosition.xy);


    coswarp(modelPosition2.xyz, 3.);
    coswarp(modelPosition2.xyz, 3.);
    // modelPosition.x += (cos(uTime  + modelPosition.y) +1.)/2. * 1. * 3.;

    // modelPosition.xyz = mix(modelPosition.xyz, modelPosition2.xyz, sin(uTime * .2));

    modelPosition = mix(modelPosition, modelPosition2, sin(t));

    modelPosition.y += ((sin(uTime  + modelPosition.x) +1.)/2. * 1.) * 1.;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectionPosition;
    gl_PointSize = 350. * 1. * 1.;
    gl_PointSize *= (1.0/ -viewPosition.z);

    vUv = uv;

}`