import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { RigidBody, Physics } from '@react-three/rapier'

import * as Tone from 'tone'
import { useEffect } from 'react'


let synthA = new Tone.FMSynth().toDestination();
let notesLow = ['E2','F2','G2','A2','D2','E3','F3','G3','A3','D3']

let synthB = new Tone.FMSynth().toDestination();

let synthC = new Tone.FMSynth().toDestination();





function ball(){
  synthA.triggerAttackRelease(notesLow[Math.floor(Math.random() * notesLow.length)], '32n');

}

function ball2(){
  synthB.triggerAttackRelease(notesLow[Math.floor(Math.random() * notesLow.length)], '32n');

}

function ball3(){
  synthC.triggerAttackRelease(notesLow[Math.floor(Math.random() * notesLow.length)], '32n');

}
synthA.set({
  "harmonicity": 0.5,
  "modulationIndex": 1.2,
  "oscillator": {
            "type": "fmsawtooth",
            "modulationType": "sine",
            "modulationIndex": 20,
            "harmonicity": 3
  },
  "envelope": {
            "attack": 0.05,
            "decay": 0.3,
            "sustain": 0.1,
            "release": 1.2
  },
  "modulation": {
            "volume": 0,
            "type": "triangle"
  },
  "modulationEnvelope": {
            "attack": 0.35,
            "decay": 0.1,
            "sustain": 1,
            "release": 0.01
  }
})


synthB.set({
  "harmonicity": 0.5,
  "modulationIndex": 1.2,
  "oscillator": {
            "type": "fmsawtooth",
            "modulationType": "sine",
            "modulationIndex": 20,
            "harmonicity": 3
  },
  "envelope": {
            "attack": 0.5,
            "decay": 0.3,
            "sustain": 0.1,
            "release": 1.2
  },
  "modulation": {
            "volume": 0,
            "type": "triangle"
  },
  "modulationEnvelope": {
            "attack": 0.5,
            "decay": 0.2,
            "sustain": 1,
            "release": 0.01
  }
})





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


useEffect(()=>{
  Tone.Transport.start()

 synthA = new Tone.FMSynth().toDestination();

 synthB = new Tone.FMSynth().toDestination();

 synthC = new Tone.FMSynth().toDestination();


 synthA.set({
  "harmonicity": 0.5,
  "modulationIndex": 1.2,
  "oscillator": {
            "type": "fmsawtooth",
            "modulationType": "sine",
            "modulationIndex": 20,
            "harmonicity": 3
  },
  "envelope": {
            "attack": 0.05,
            "decay": 0.3,
            "sustain": 0.1,
            "release": 1.2
  },
  "modulation": {
            "volume": 0,
            "type": "triangle"
  },
  "modulationEnvelope": {
            "attack": 0.35,
            "decay": 0.1,
            "sustain": 1,
            "release": 0.01
  }
})


synthB.set({
  "harmonicity": 0.5,
  "modulationIndex": 1.2,
  "oscillator": {
            "type": "fmsawtooth",
            "modulationType": "sine",
            "modulationIndex": 20,
            "harmonicity": 3
  },
  "envelope": {
            "attack": 0.5,
            "decay": 0.3,
            "sustain": 0.1,
            "release": 1.2
  },
  "modulation": {
            "volume": 0,
            "type": "triangle"
  },
  "modulationEnvelope": {
            "attack": 0.5,
            "decay": 0.2,
            "sustain": 1,
            "release": 0.01
  }
})

},[])
  




const planeMaterial = useRef()
useFrame((state, delta) => {
   planeMaterial.current.uTime += delta
   ref.current.rotation.y += (delta * .02)

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
          {'Sound'.toUpperCase()}
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
     onClick={()=>{
      synthA.dispose()
        synthB.dispose()
        synthC.dispose()
        Tone.Transport.pause() 

   
      window.location = '#/particles'} }

    
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
       onClick={()=>{
        synthA.dispose()
        synthB.dispose()
        synthC.dispose()
        Tone.Transport.pause() 

        window.location ='#/shader' }}
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text> 
        </Float>

        <Physics>



<RigidBody type="fixed">
    <mesh receiveShadow position-y={ - 1.25 } ref={ref}>
        <boxGeometry args={ [ 7, 0.5, 7, 100, 100, 100 ] } />
        <planeMaterial ref={planeMaterial} depthWrite={false} transparent />

    </mesh>
</RigidBody>


<RigidBody colliders="ball" restitution={ 2 }  onCollisionExit={ball}  scale={.5}>
    <mesh castShadow position={ [ 0, 4, 0 ]}  scale={.5}>
        <sphereGeometry />
        <meshPhongMaterial transparent opacity={.5} color="pink" />
    </mesh>
</RigidBody>


<RigidBody colliders="ball" restitution={ 2 }  onCollisionExit={ball}  scale={.5}>
    <mesh castShadow position={ [ 0, 5,2 ]} scale={.5} >
        <sphereGeometry />
        <meshPhongMaterial transparent opacity={.5} color="pink" />
    </mesh>
</RigidBody>


<RigidBody colliders="ball" restitution={ 2 }  onCollisionExit={ball}  scale={.5}>
    <mesh castShadow position={ [ 2, 3, 0 ]}  scale={.5}>
        <sphereGeometry />
        <meshPhongMaterial transparent opacity={.5} color="pink" />
    </mesh>
</RigidBody>


<RigidBody colliders="ball" restitution={ 2 } onCollisionEnter={
collisionEnter} onCollisionExit={ball2}>
    <mesh castShadow position={ [ 2, 4, 2 ]} >
        <sphereGeometry />
        <meshPhongMaterial transparent opacity={.5} color="lime" />
    </mesh>
</RigidBody>



<RigidBody colliders="ball" restitution={ 2 }  onCollisionExit={ball2}  scale={.5}>
    <mesh castShadow position={ [ -2, 3, 0 ]}  scale={.5}>
        <sphereGeometry />
        <meshPhongMaterial transparent opacity={.5} color="lime" />
    </mesh>
</RigidBody>


<RigidBody colliders="ball" restitution={ 2 }  onCollisionExit={ball3}  scale={.5}>
    <mesh castShadow position={ [ -2, 4.4, -2 ]}  scale={.5} >
        <sphereGeometry />
        <meshPhongMaterial transparent opacity={.5} color="cyan" />
    </mesh>
</RigidBody>


<RigidBody  colliders="ball" restitution={ 2 }  onCollisionExit={ball3}  scale={.5}>
    <mesh castShadow position={ [ 0, 5.5,-2 ]} scale={.5} >
        <sphereGeometry />
        <meshPhongMaterial transparent opacity={.5} color="cyan" />
    </mesh>
</RigidBody>





</Physics>
      </>
    )
}