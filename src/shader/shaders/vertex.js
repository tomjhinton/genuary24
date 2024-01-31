export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;
varying vec3 pos;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
    
  }  

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

   



    modelPosition.z -= sin((uTime*.5)+  cos(length(modelPosition.xy)));

    modelPosition.x -= cos( modelPosition.y + sin(uTime*1.)+  cos(length(modelPosition.xz))) * .2;
    // coswarp(modelPosition.xyz, 1.);
    // coswarp(modelPosition.xyz, 3.);


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
    pos = modelPosition.xyz;
}`