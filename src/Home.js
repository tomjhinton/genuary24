import { Canvas } from '@react-three/fiber'
import { Float, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Home(){

   

    return(
        <>
        <Canvas>
        <Float>
        
        <Html
  as='div'
 position={[0, -2, 0]}
>
  <a className='linkTo' href='https://genuary.art/'>  .More. .Info. .Here. </a>
 
</Html>
        </Float>


        <Float>
         <Text
        
        font="Basement.otf"
        scale={ 3 }
        maxWidth={2}
       
        position={ [ -0, 0, -0 ] }
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
      }
       onPointerOut={()=>  document.body.style.cursor = 'auto'}
       onClick={()=>window.location ='#/particles' }
        
        >
          {' GENUARY is an artificially generated month of time where we build code that makes beautiful things.'}
          <meshBasicMaterial color="pink" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>



        </Canvas>
       
        </>
    )
}

