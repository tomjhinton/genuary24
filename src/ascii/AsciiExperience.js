import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'



let plane = new THREE.PlaneGeometry( 7, 7, 10, 10 );


var x = document.createElement("CANVAS");
    var ctx = x.getContext("2d");
    ctx.font = "25px Helvetica";

    ctx.fillStyle = "white";
ctx.textAlign = "center";
    ctx.fillText("ASCII", 55, 50);
    document.body.appendChild(x);

x.id = 'CANVASID'
    console.log(x.id)

   let  canvasElement  = document.getElementById("CANVASID");
   let tex = new THREE.CanvasTexture(canvasElement)



export default function Experience(){
 

    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height},
            uTexture: tex
           
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


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
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
          {'ASCII'.toUpperCase()}
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
     onClick={()=>window.location = '#/molnar' }
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
       onClick={()=>window.location ='#/chaotic' }
        
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