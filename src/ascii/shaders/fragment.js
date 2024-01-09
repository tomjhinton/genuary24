export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec2 uResolution;
varying vec3 pos;
uniform sampler2D uTexture;


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
  uv =  vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);


  float t = (uTime * .2) + length(uv2-.5);
  // uv = fract(uv * 10.);
  vec2 rote = rotatePointCoord(uv, -PI * t, vec2(.5));

  // uv.x += sin(uv.y);

  uvRipple(rote, .1);

  vec4 tex = texture2D(uTexture, rote);

  
  vec2 coOrd = gl_PointCoord;

  vec3 color = tex.rgb;
 
   

   float alpha = 1.;

   alpha = 1.- step(shape(coOrd, 4., 1. ), .5) ;


     
        // color = pos;

  

        float distanceToCenter = distance(gl_PointCoord, vec2(.2));
    // alpha = uv2.x + uv2.y;
if(color == vec3(0.)){
  alpha = 0.;
}
  if(color == vec3(1.)){

    color.r+= pos.x;

    color.g+= pos.y;

    color.b = uv.y;
  }   

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`