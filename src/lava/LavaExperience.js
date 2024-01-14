import { OrbitControls , shaderMaterial, Center, Text, Float, MarchingCube, MarchingCubes, MarchingPlane} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

let plane = new THREE.PlaneGeometry( 1,1,4, 4 );




let planeArr = Array.from(sliceIntoChunks(plane.attributes.position.array, 3))

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



useFrame((state, delta) => {
    planeMaterial.current.uTime += delta

    ref.current.position.y -= (Math.sin(delta )) *.125
    ref2.current.position.y += (Math.sin(delta ) *.125)

    ref3.current.position.y -= Math.sin(delta * 0.1) * .025

   

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
       maxWidth={1}
       position={ [ .0, -2.65, 2 ] }
       fontSize={1}
        
        
        >
          {'Lava Lamp'.toUpperCase()}
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
        
        onPointerOver={ ()=>{
          document.body.style.cursor = 'pointer'  
                 console.log(ref)
        } 

    }
     onPointerOut={()=>  document.body.style.cursor = 'auto'}
     onClick={()=>window.location = '#/wobbly' }
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
       onClick={()=>window.location ='#/albers' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


        <MarchingCubes resolution={100} maxPolyCount={200000} enableUvs={true} enableColors={false} scale={2}>

           
              <MarchingCube  ref={ref}   strength={1.5} subtract={12}  position={[0,0,0]}/>

              <MarchingCube  ref={ref2}   strength={1.} subtract={12}  position={[0,0,0]}/>
              <MarchingCube  ref={ref3}   strength={1.5} subtract={12}  position={[0,0,0]}/>



  <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} />

  

  {/* {/* <MarchingPlane planeType="x" strength={0.5} subtract={12} /> */}
  <MarchingPlane planeType="y" strength={0.5} subtract={12} />
  {/* <MarchingPlane planeType="z" strength={0.5} subtract={12} /> */} 




</MarchingCubes>

    
      
      </>
    )
}