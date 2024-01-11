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

  float t = (uTime * .25)  ;
  
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

float rect(vec2 st, vec2 s) {
  st = st*2.-1.;
  return max( abs(st.x/s.x),
              abs(st.y/s.y) );
}


//	Classic Perlin 2D Noise
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}


vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
  

void main() {
  vec2 uv = vUv;

  vec2 uv2 =uv;
  // uv2 = rotateTilePattern(uv2);
  vec2 uv3 = rotateTilePattern(uv2);




  

  // uv2 = uv * .125;

  // uv2 +=.5;
  vec3 color2 = vec3(uv.x, uv.y, 1.);

coswarp(color2, 3.);
coswarp(color2, 3.);
coswarp(color2, 3.);


vec3 white = vec3(1.);
vec3 black = vec3(0.);
vec3 grey = vec3(.5);
vec3 orange = vec3(1., .5 ,.0);
vec3 yellow = vec3(1., 1., 0.);


// uv = rotateTilePattern(uv);


// uvRipple(uv,.1);



  vec3 color = mix(white, black,step(rect(vec2(uv.x, uv.y+.1), vec2(2.5, .8)),.4));

   color = mix(color, black,step(rect(vec2(uv.x, uv.y-.3), vec2(2.5, .4)),.4));

  color = mix(color, yellow,step(rect(vec2(uv.x+.5, uv.y), vec2(.25, 3.)),.4));

  uv = rotateTilePattern(uv);
  color = mix(color, grey,step(rect(vec2(uv.x, uv.y-.4), vec2(2.5, .1)),.4));
  color = mix(color, grey,step(rect(vec2(uv.x, uv.y-.3), vec2(2.5, .1)),.4));
  color = mix(color, grey,step(rect(vec2(uv.x, uv.y-.2), vec2(2.5, .1)),.4));

  uv = rotateTilePattern(uv);



  color = mix(color, black,step(rect(vec2(uv.x+.3, uv.y), vec2(.25, 3.)),.4));

  color = mix(color, grey,step(rect(vec2(uv.x+.1, uv.y), vec2(.25, 3.)),.4));

  color = mix(color, orange,step(rect(vec2(uv.x-.1, uv.y), vec2(.25, 3.)),.4));

  color = mix(color, orange,step(rect(vec2(uv.x-.3, uv.y), vec2(.25, 3.)),.4));

  color = mix(color, yellow,step(rect(vec2(uv.x-.5, uv.y), vec2(.25, 3.)),.4));


  uvRipple(uv2, .1);

color+= cnoise(uv2 * 5000. * cnoise(uv * 10.));




  gl_FragColor = vec4(color, 1.);
}`