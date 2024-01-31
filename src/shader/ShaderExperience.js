import { OrbitControls , shaderMaterial, Center, Text, Float} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'



export default function Experience(){

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
            
        },
        vertexShader,
        fragmentShader
    )
    extend({PlaneMaterial})
    

const ref = useRef()



// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
const planeMaterial = useRef()



useFrame((state, delta) => {
    planeMaterial.current.uTime += delta
   
    // ref.current.rotation.z += (delta*.2)
    // ref.current.rotation.x += (delta*.25)
    // ref.current.rotation.y += (delta*.3)


   

})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="FerriteCoreDX-Regular.otf"
        scale={ .5 }
       maxWidth={40}
       position={ [ .0, -3.65, 1 ] }
       fontSize={1}
        
        
        >
          {'Shaders'.toUpperCase()}
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
     onClick={()=>window.location = '#/sound' }
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
       onClick={()=>window.location ='#/sdf' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


<mesh
     position={[0, 0, 0]}
      ref={ref}
      scale={clicked ? 1. : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <sphereGeometry  args={[3, 300,300  ]}  />
      <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} transparent />
      
    </mesh>


    
      
      </>
    )
}