export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec2 uResolution;



  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (1. * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (1. * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (1. * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 




void main() {
  vec2 uv = vUv;
  vec2 uv2 = uv;
  uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy + 0.5;
  
 
 vec3 color = vec3(0.);
  
 
float t = (uTime * .2) +length(uv-.5);
      

   float alpha = 1.;


     
        color = vec3(uv.x, uv.y, 1.);

        vec3 color2 = color;
        coswarp(color, 3.);
        coswarp(color, 3.);
        coswarp(color, 3.);

      //  color = vec3(step(color.r, .5), step(color.g, .5), step(color.b, .5)) ;
 

        float distanceToCenter = distance(gl_PointCoord, vec2(.2));
    alpha = step(distanceToCenter, .2);
      

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`