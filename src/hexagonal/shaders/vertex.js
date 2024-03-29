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



  
    modelPosition.y += sin((uTime *.2) + length(modelPosition.xz)) * .5;



    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectionPosition;
    gl_PointSize = 850.;
    gl_PointSize *= (1.0/ -viewPosition.z);

    vUv = uv;
    pos = modelPosition.xyz;
}`