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

const vec2 s = vec2(1, 1.7320508);

float hex(in vec2 p){

  p = abs(p);

  return max(dot(p, s*.5), p.x); // Hexagon.

}
vec4 getHex(vec2 p){

  vec4 hC = floor(vec4(p, p - vec2(.5, 1))/s.xyxy) + .5;

  vec4 h = vec4(p - hC.xy*s, p - (hC.zw + .5)*s);

  return dot(h.xy, h.xy)<dot(h.zw, h.zw) ? vec4(h.xy, hC.xy) : vec4(h.zw, hC.zw + vec2(.5, 1));

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

float stroke(float x, float s, float w){
  float d = step(s,x + w * .5) -
  step(s, x-w *.5);


  return clamp(d, 0., 1.);
}


void main() {
  vec2 uv = vUv;
  vec2 uv2 = uv;
  uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy + 0.5;
  
  
  vec2 coOrd = gl_PointCoord;

  float t = (uTime * .3) + length(uv-.5);
  float t2 = (uTime * .3) + pos.x;
  float t3 = (uTime * .3) + pos.z;

  // coOrd = vec2(coOrd.x + sin(coOrd.y *( 10.0 * sin(t))) * 0.2,
  //   coOrd.y + sin(coOrd.x *( 10.0 * sin(t))) * 0.2);

 
  // coOrd = frag(coOrd * 4.);
  

  vec2 roteC = rotatePointCoord(coOrd, -PI * (uTime * .2), vec2(.5));


  vec4 hex_uv = getHex(roteC *10.);


  vec2 rote = rotatePointCoord(coOrd, PI * (uTime * .1), vec2(.5));
 
 vec3 color = vec3(1.);

 
      color = mix(color, 1.-color, stroke(hex(hex_uv.xy), .8, .3));
      color = mix(color, 1.-color, stroke(hex(hex_uv.xy), .6, .3));
      color = mix(color, 1.-color, stroke(hex(hex_uv.xy), .4, .3));

   float alpha = 1.;

   alpha = 1.- step(shape(rote, 6., .6 ), .5) ;

    alpha *= 1.-step(shape(uv-.25, 6., .6 ), .5) ;
     
        // color = pos;

  

        float distanceToCenter = distance(gl_PointCoord, vec2(.2));
    // alpha = uv2.x + uv2.y;

      

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`