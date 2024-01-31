export default /* glsl */ `
varying vec2 vUv;
uniform sampler2D pic;
uniform float uTime;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 tex = texture2D(pic, uv);
    // modelPosition.z = sin(uTime + tex.r);
    // modelPosition.x += tex.g;
    // modelPosition.y += tex.b;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`