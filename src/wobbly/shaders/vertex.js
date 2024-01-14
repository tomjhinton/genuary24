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

    modelPosition.y += sin((uTime ) + (length(modelPosition.xz)) )*1.;
    modelPosition.y += sin(uTime ) + sin(modelPosition.x)  ;


    modelPosition.z += sin((uTime ) + (length(modelPosition.xz)) )*.2;
    modelPosition.z += sin(uTime ) + sin(modelPosition.y)  ;


    modelPosition.x += sin((uTime ) + (length(modelPosition.xy)) )*.2;
    modelPosition.x += sin(uTime ) + sin(modelPosition.y)  ;

   

    float warpsScale = sin(uTime) ;

    modelPosition.xyz += warpsScale * .1 * cos(3. * modelPosition.yzx + uTime);
    modelPosition.xyz += warpsScale * .05 * cos(11. * modelPosition.yzx + uTime);
    modelPosition.xyz += warpsScale * .025 * cos(17. * modelPosition.yzx + uTime);
  
    modelPosition.zxy += warpsScale * .1 * sin(3. * modelPosition.yzx + uTime);
    modelPosition.zxy += warpsScale * .05 * sin(11. * modelPosition.yzx + uTime);
    modelPosition.zxy += warpsScale * .025 * sin(17. * modelPosition.yzx + uTime);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`