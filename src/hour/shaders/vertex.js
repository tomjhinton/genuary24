export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;


void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
    
  }  

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.z += (sin(uTime +(length(modelPosition.xy) * 3.)) ) * 2.; 


    modelPosition.x += (sin(uTime +(length(modelPosition.xz) * 1.)) ) ; 



    // coswarp(modelPosition.xyz, 3.);
    // coswarp(modelPosition.xyz, 3.);
    // coswarp(modelPosition.xyz, .5);

    // modelPosition.z += (sin(uTime +length(modelPosition.xy)) * (modelPosition.y *2.)) * .2; 

    // modelPosition.x += (sin(uTime +length(modelPosition.xz)) * (modelPosition.y *2.)) * .02; 

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`