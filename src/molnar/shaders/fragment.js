export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec2 uResolution;
varying vec3 pos;


float PI = 3.142;
  
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

float shape( in vec2 p, float sides ,float size)
{
  
   float d = 0.0;
  vec2 st = p *2.-1.;

  // Number of sides of your shape
  float N = sides ;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI ;
  float r = (2.* PI)/(N) ;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  

  return  1.0-smoothstep(size,size +.1,d);
}

vec2 rotateUV(vec2 uv, vec2 pivot, float rotation) {
  mat2 rotation_matrix=mat2(  vec2(sin(rotation),-cos(rotation)),
                              vec2(cos(rotation),sin(rotation))
                              );
  uv -= pivot;
  uv= uv*rotation_matrix;
  uv += pivot;
  return uv;
}

vec2 rotatePointCoord(vec2 pointCoord, float angle, vec2 center) {
  // Get the coordinates relative to the center point
  vec2 centeredCoords = pointCoord - center;

  // Perform rotation using a 2D rotation matrix
  float s = sin(angle);
  float c = cos(angle);
  mat2 rotationMatrix = mat2(c, -s, s, c);
  vec2 rotatedCoords = rotationMatrix * centeredCoords;

  // Add back the center to get final rotated coordinates
  vec2 finalCoords = rotatedCoords + center;

  return finalCoords;
}



void main() {
  vec2 uv = vUv;
  vec2 uv2 = uv;
  uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy + 0.5;
  
  
  vec2 coOrd = gl_PointCoord;

  float t = (uTime * .3) + pos.y;
  float t2 = (uTime * .3) + pos.x;
  float t3 = (uTime * .3) + pos.z;


  vec2 roteC = rotatePointCoord(coOrd, PI * (uTime * .3), vec2(.5));

  vec2 rote = rotatePointCoord(coOrd, -PI * (uTime * .3), vec2(.5));


  roteC = vec2(roteC.x + sin(roteC.y * 3.0) * 0.2,
  roteC.y + sin(roteC.x * 3.0) * 0.2);


  // vec2 rote = rotatecoOrd(coOrd, vec2(.5), PI * uTime * .05);

  // coOrd = vec2(coOrd.x + sin(coOrd.y *( 10.0 * sin(t))) * 0.2,
  //   coOrd.y + sin(coOrd.x *( 10.0 * sin(t))) * 0.2);

 
  // coOrd = frag(coOrd * 4.);
  
 
 vec3 color = vec3(1.);
 vec3 color2 = vec3(.25,.125, .98);
 vec3 color3 = vec3(.98,.125, .25);

 color = mix(color, 1.-color,1.-step(shape(rote, 4., .6 ), .5) );
 color = mix(color, 1.-color,1.-step(shape(rote, 4., .5 ), .5) );
 color = mix(color, 1.-color,1.-step(shape(roteC, 4., .4 ), .5) );
 color = mix(color, 1.-color,1.-step(shape(roteC, 4., .3 ), .5) );




 color = mix(color, 1.-color, step(shape(uv-.5, 4., .9), .9));

 color = mix(color, 1.-color, step(shape(uv-.5, 4., .8), .8));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .7), .7));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .6), .6));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .5), .5));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .4), .4));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .3), .3));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .2), .2));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .1), .1));

color = mix(color, 1.-color, step(shape(uv-.5, 4., .05), .05));



//  color = mix(color, 1.-color, sin(t));
// //  color = mix(color, color2, sin(t2));
//  color = mix(color, color3, sin(t3));


 
//   t = (uTime * .5) + length(uv-.5);
 
//   t2 = (uTime * .5) + uv.x;
 
//   t3 = (uTime * .5) + uv.y;

//  color = mix(color, 1.-color, cos(t));
//  color = mix(color, 1.-color, cos(t2));
//  color = mix(color, 1.-color, cos(t3));

//  uvRipple(color.rg, .5);

//  uvRipple(color.gb, .25);
 
//  coswarp(color, 3.);
  
 
      

   float alpha = 1.;

   alpha = 1.- step(shape(coOrd, 4., .8 ), .5);
alpha -=  1.- step(shape(coOrd, 4., .6 ), .5);

alpha += 1.-step(shape(rote, 4., .6 ), .5);

     
        // color = pos;

  

        float distanceToCenter = distance(gl_PointCoord, vec2(.2));
    // alpha = uv2.x + uv2.y;

      

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`