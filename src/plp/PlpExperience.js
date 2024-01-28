import { OrbitControls , shaderMaterial, Center, Text, Float, Points, Point} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'

import vertexShader1 from './shaders/vertex1.js'
import fragmentShader1 from './shaders/fragment1.js'

import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })


export default function Experience(){

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
            
        },
        vertexShader,
        fragmentShader
        
    )
    extend({PlaneMaterial})


    const PointMaterial = shaderMaterial(

      {
          uTime: 0,
          uResolution: {x: screen.width, y: screen.height}
          
         
      },
      vertexShader1,
      fragmentShader1,
  
      
  )
  extend({PointMaterial})
    

const ref = useRef()
const ref2 = useRef()
const ref3 = useRef()



// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
const planeMaterial = useRef()
const pointMaterial = useRef()


let points = []

for(let i=0; i<30; i++){

  points.push([Math.random()*7-4, Math.random()*7-4, Math.random()*7-4])


}



useFrame((state, delta) => {
    planeMaterial.current.uTime += delta
    pointMaterial.current.uTime += delta
   
    ref.current.rotation.x += (delta *.2)


// points[0,1] += delta
   

})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="FerriteCoreDX-Regular.otf"
        scale={ .25 }
      //  maxWidth={1}
       position={ [ .0, -3.65, 1 ] }
       fontSize={1}
        
        
        >
          {'Point - line - plane.'.toUpperCase()}
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
     onClick={()=>window.location = '#/sixteen' }
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
       onClick={()=>window.location ='#/library' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


<mesh ref={ref} raycast={raycast} onPointerOver={console.log(ref)}>
        <meshLineGeometry points={points} />
        <meshLineMaterial lineWidth={.1} transparent opacity={1.} color="white" />
      </mesh>


      <mesh
     
     ref={ref2}
     scale={clicked ? 1. : 1}
    >
     <planeGeometry args={[7, 7, 100, 100]} />
     <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} transparent />
     
   </mesh>



   <Points   rotation-x={Math.PI *  1.} >
    <Point>
    </Point>
        <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
        
    </Points>


      
      </>
    )
}