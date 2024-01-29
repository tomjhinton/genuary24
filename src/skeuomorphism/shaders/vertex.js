export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D pic;



void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
    
  }  

void main()
{

  vec4 tex = texture2D(pic, uv);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // coswarp(modelPosition.xyz, 3.);
    coswarp(modelPosition.xyz, 1.);
    modelPosition.z+= tex.r * sin(uTime + length(modelPosition.xy));


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`