import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './DrosteExperience.js'

export default function Droste(){


return(
   
    <Canvas
       
    >
        
        <Experience />
        {/* <directionalLight
           
           castShadow
           position={ [ 0, 1, 1 ] }
           intensity={ .45 }
           shadow-mapSize={ [ 1024, 1024 ] }
           shadow-camera-near={ 1 }
           shadow-camera-far={ 10 }
           shadow-camera-top={ 10 }
           shadow-camera-right={ 10 }
           shadow-camera-bottom={ - 10 }
           shadow-camera-left={ - 10 }
       />
       <ambientLight/> */}
    </Canvas>
   
)
    }