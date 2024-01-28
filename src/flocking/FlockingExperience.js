import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState, useMemo} from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'



let plane = new THREE.BoxGeometry( 7, 7, 7, 25, 25, 25 );





export default function Experience(){
 

    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height},
            uMouse: {x:0, y:0}

            
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PointMaterial})

    console.log(PointMaterial)

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const pointMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta

  //  ref.current.rotation.z += (delta * .2)

    if (
     pointMaterial.current.uResolution.x === 0 &&
     pointMaterial.current.uResolution.y === 0
    ) {
     pointMaterial.current.uResolution.x = screen.width;
     pointMaterial.current.uResolution.y = screen.height;
     
    }
})

let particlesCount =50000

const particles = useMemo(() => {
  const positions = [];
  const velocities = [];

  for (let i = 0; i < particlesCount; i++) {
    positions.push(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    velocities.push(Math.random() , Math.random() , Math.random() );
  }

  return { positions, velocities };
}, [particlesCount]);

useFrame(() => {
  const positions = ref.current.geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i++) {
    const i3 = i * 3;
    positions[i3] += particles.velocities[i3] * 0.01;
    positions[i3 + 1] += particles.velocities[i3 + 1] * 0.01;
    positions[i3 + 2] += particles.velocities[i3 + 2] * 0.01;

    // Add your flocking logic here

    // Example: Bounce back when hitting the boundaries
    if (positions[i3] > 3 || positions[i3] < -3){
      particles.velocities[i3] *= -1;
      // particles.velocities[i3 + 1] *= -1;
      // particles.velocities[i3 + 2] *= -1;
    } 
    if (positions[i3 + 1] > 3 || positions[i3 + 1] < -3) {
      // particles.velocities[i3] *= -1;
      particles.velocities[i3 + 1] *= -1;
      // particles.velocities[i3 + 2] *= -1;
    }
    
    if (positions[i3 + 2] > 3 || positions[i3 + 2] < -3){
      // particles.velocities[i3] *= -1;
      // particles.velocities[i3 + 1] *= -1;
      particles.velocities[i3 + 2] *= -1;
    } 
  }

  ref.current.geometry.attributes.position.needsUpdate = true;
});


// Subscribe this component to the render-loop, rotate the mesh every frame
useFrame((state, delta) => (ref.current.rotation.x += delta *.05))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

         <Text
        
        font="FerriteCoreDX-Regular.otf"
        scale={1 }
        maxWidth={1}
        position={ [ .0, -2.250, 1 ] }
        fontSize={1.25}
        
        
        >
          {'Flocking'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
          />
        </Text>


        <Float>
         <Text
        
        font="Basement.otf"
        scale={ 1 }
       
       
        position={ [ 4, 0, -0 ] }
        
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
    }
     onPointerOut={()=>  document.body.style.cursor = 'auto'}
     onClick={()=>window.location = '#/type' }
        >
          {'>'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


        <Float>
         <Text
        
        font="Basement.otf"
        scale={ 1 }
       
        position={ [ -4, 0, -0 ] }
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
      }
       onPointerOut={()=>  document.body.style.cursor = 'auto'}
       onClick={()=>window.location ='#/bauhaus' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


        <Points positions={plane.attributes.position.array} stride={3} ref={ref} rotation-x={Math.PI *  1.}onPointerMove={(e)=>  pointMaterial.current.uMouse = e.pointer} >
        <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
    </Points>

     
      </>
    )
}