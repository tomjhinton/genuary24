import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'



let plane = new THREE.PlaneGeometry( 12, 12, 99, 99 );


console.log(plane)


export default function Experience(){
 

    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height}
            
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PointMaterial})

  
const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const pointMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta
  //  ref.current.rotation.x += (delta * .2)

    if (
     pointMaterial.current.uResolution.x === 0 &&
     pointMaterial.current.uResolution.y === 0
    ) {
     pointMaterial.current.uResolution.x = screen.width;
     pointMaterial.current.uResolution.y = screen.height;
     
    }
})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

< >
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="FerriteCoreDX-Regular.otf"
        scale={1 }
        maxWidth={2}
        position={ [ .0, -3.65, 1 ] }
        fontSize={1.}
        
        
        >
          {'Draw 10K of something'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
          />
        </Text>
        </Float>


         <Float>
          <Text
        
        font="Basement.otf"
        scale={ 1 }
       
       
        position={ [ 6, 0, 1 ] }
        
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
    }
     onPointerOut={()=>  document.body.style.cursor = 'auto'}
     onClick={()=>window.location = '#/islamic' }

    
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
       onClick={()=>window.location ='#/physics' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text> 
        </Float>


        <Points positions={plane.attributes.position.array} stride={3} ref={ref} rotation-x={Math.PI *  1.} >
        <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
    </Points>

     
      </>
    )
}