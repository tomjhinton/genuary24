import { Canvas } from '@react-three/fiber'
import { Float, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Home(){

   

    return(
        <>
        <Canvas
        camera={{position:[0,0,17]}}>
        <Float>
        
        <Html
  as='div'
 position={[0, -3, 0]}
>
  <a className='linkTo' href='https://genuary.art/'>  .More. .Info. .Here. </a>
 
</Html>
        </Float>


        <Float>
         <Text
        
        font="Basement.otf"
        scale={ 1 }
        maxWidth={6}
       
        position={ [ -6, -3, -0 ] }
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
      }
       onPointerOut={()=>  document.body.style.cursor = 'auto'}
       onClick={()=>window.location ='#/particles' }
        
        >
          {' GENUARY is an artificially generated month of time where we build code that makes beautiful things.'}
          <meshBasicMaterial color="red" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>



        </Canvas>
       
        </>
    )
}

