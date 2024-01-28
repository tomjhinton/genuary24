import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { RigidBody, Physics } from '@react-three/rapier'







export default function Experience(){
 

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height},
            uBounce: 1,
            uBounce2: 2,
            uBounce3: 3,
            uBounce4: 4,
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PlaneMaterial})

  
const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const planeMaterial = useRef()
useFrame((state, delta) => {
   planeMaterial.current.uTime += delta
  //  ref.current.rotation.x += (delta * .2)

    if (
     planeMaterial.current.uResolution.x === 0 &&
     planeMaterial.current.uResolution.y === 0
    ) {
     planeMaterial.current.uResolution.x = screen.width;
     planeMaterial.current.uResolution.y = screen.height;
     
    }
})

const collisionEnter = () =>
{
  planeMaterial.current.uBounce = Math.floor(Math.random() * 4.)+1
  planeMaterial.current.uBounce2= Math.floor(Math.random() * 4.)+1
  planeMaterial.current.uBounce3 = Math.floor(Math.random() * 4.)+1
  planeMaterial.current.uBounce4 = Math.floor(Math.random() * 4.)+1
  
}

// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

< >
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="FerriteCoreDX-Regular.otf"
        scale={1 }
        maxWidth={1}
        position={ [ .0, -3.65, 0 ] }
        fontSize={1.}
        
        
        >
          {'Physics'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
          />
        </Text>
        </Float>


        <Float>
          <Text
        
        font="Basement.otf"
        scale={ 1 }
       
       
        position={ [ 4, 0, -0 ] }
        
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
    }
     onPointerOut={()=>  document.body.style.cursor = 'auto'}
     onClick={()=>window.location = '#/ten' }

    
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
       onClick={()=>window.location ='#/kb' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text> 
        </Float>

        <Physics>



<RigidBody type="fixed">
    <mesh receiveShadow position-y={ - 1.25 }>
        <boxGeometry args={ [ 7, 0.5, 7 ] } />
        <planeMaterial ref={planeMaterial} depthWrite={false} transparent />

    </mesh>
</RigidBody>


<RigidBody colliders="ball" restitution={ 2 } onCollisionEnter={ collisionEnter }>
    <mesh castShadow position={ [ 0, 4, 0 ]} >
        <sphereGeometry />
        <meshStandardMaterial color="white" />
    </mesh>
</RigidBody>
</Physics>
      </>
    )
}