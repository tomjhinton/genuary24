export default /* glsl */`uniform float uTime;

varying vec2 vUv;

float PI = 3.142;
  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 

vec2 rotateTilePattern(vec2 _st){

  float t = (uTime * .1) + length(_st-.5)   ;
  
    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
  
   if(index == 0.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5 +(t *.8));
    }
  
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5 +t);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5 -t);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI - (t * .8));
    }

    return _st;
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
  

  return  smoothstep(size,size +.1,d);


}

vec2 getRadialUv(vec2 uv)
{
	float angle = atan(uv.x, - uv.y);
	angle = abs(angle);
	
	vec2 radialUv = vec2(0.0);
	radialUv.x = angle / (PI * 2.0) + 0.5;
	radialUv.y = 1.0 - pow(1.0 - length(uv), 4.0);
	
	return radialUv;
}
 

void main() {
  vec2 uv = vUv;

  float t = (uTime * .2) + length(uv-.5);
  

  vec2 uv2 = uv;
  vec2 uv3 = uv;
  vec2 uv4 = uv;
  vec2 uv5 = uv;

 
  vec3 color = vec3(0.);
  vec3 color2 = vec3(1.);

  // coswarp(color2, 3.);
  // coswarp(color2, 3.);


  uvRipple(uv, .4);
  uvRipple(uv2, .3);
  uvRipple(uv3, .2);
  uvRipple(uv4, .1);
  uvRipple(uv5, .05);

  color = mix(color, color2, step(shape(uv, 8., .4), .5));

  color = mix(color, 1.-color, step(shape(uv2, 8., .4), .5));
  color = mix(color, 1.-color, step(shape(uv3, 8., .4), .5));
  color = mix(color, 1.-color, step(shape(uv4, 8., .4), .5));
  color = mix(color, 1.-color, step(shape(uv5, 8., .4), .5));


  


  gl_FragColor = vec4(color, 1.);
}`