export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;


void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * sin(3. * trip.yzx );
    trip.xyz += warpsScale * .05 * sin(11. * trip.yzx );
    trip.xyz += warpsScale * .025 * sin(17. * trip.yzx );
    
  }  

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

 
    vec4 modelPosition2 = modelMatrix * vec4(position, 1.);

    float t = (uTime * .2) + length(modelPosition.xy);

    coswarp(modelPosition2.xyz, 3.);
    coswarp(modelPosition2.xyz, 3.);
    coswarp(modelPosition2.xyz, 3.);
    coswarp(modelPosition2.xyz, 3.);
    modelPosition.y += (sin(modelPosition.x) +1.)/2. * .1 * (20. *sin(t));
    modelPosition.x += (cos(modelPosition.y) +1.)/2. * .1 * (3. * cos(t));

    modelPosition.xyz = mix(modelPosition.xyz, modelPosition2.xyz, sin(modelPosition2.x));

    modelPosition.z += cos(length(modelPosition.xy) +1.)/2. * .1 * (30. * cos(t));
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`