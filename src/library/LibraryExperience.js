import { OrbitControls , shaderMaterial, Center, Text, Float} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
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
    

const ref = useRef()
const ref2 = useRef()
const ref3 = useRef()



// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
const planeMaterial = useRef()

let points = []

for(let i=0; i<300; i++){

  points.push([Math.random()*5-2, Math.random()*5-2, Math.random()*5-2])


}

let points2 = []

for(let i=0; i<300; i++){

  points2.push([Math.random()*5-2, Math.random()*5-2, Math.random()*5-2])


}

let points3 = []

for(let i=0; i<300; i++){

  points3.push([Math.random()*5-2, Math.random()*5-2, Math.random()*5-2])


}


useFrame((state, delta) => {
//     planeMaterial.current.uTime += delta
   
ref.current.rotation.z += (delta * .2)
ref2.current.rotation.y += (delta * .12)
ref3.current.rotation.x += (delta * .17)


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
          {'Use a library that you havent used before'.toUpperCase()}
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
     onClick={()=>window.location = '#/plp' }
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
       onClick={()=>window.location ='#/type' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


<mesh ref={ref} raycast={raycast} onPointerOver={console.log(ref)}>
        <meshLineGeometry points={points} />
        <meshLineMaterial lineWidth={.01} transparent opacity={.8} color="hotpink" />
      </mesh>


      <mesh ref={ref2} raycast={raycast} onPointerOver={console.log(ref)}>
        <meshLineGeometry points={points2} />
        <meshLineMaterial lineWidth={.01} transparent opacity={.8} color="chartreuse" />
      </mesh>


      <mesh ref={ref3} raycast={raycast} onPointerOver={console.log(ref)}>
        <meshLineGeometry points={points2} />
        <meshLineMaterial lineWidth={.01} transparent opacity={.8} color="aqua"  />
      </mesh>

    
      
      </>
    )
}