import * as React from "react";
import * as ReactDOM from "react-dom";
import './style.css'

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  HashRouter,
  createHashRouter
} from "react-router-dom";

import Home from './Home.js'
import Particles from './particles/Particles.js'
import Palettes from "./palettes/Palettes.js";
import Droste from "./droste/Droste.js";
import Pixels from "./pixels/Pixels.js";
import Molnar from "./molnar/Molnar.js";
import Screensaver from "./screensaver/Screensaver.js";
import Loading from "./loading/Loading.js";
import Chaotic from "./chaotic/Chaotic.js";
import Ascii from "./ascii/Ascii.js";
import Hexagonal from "./hexagonal/Hexagonal.js";
import Albers from "./albers/Albers.js";
import Lava from "./lava/Lava.js";
import Wobbly from "./wobbly/Wobbly.js";
import Kb from "./kb/Kb.js";
import Physics from "./physics/Physics.js";
import Ten from "./ten/Ten.js";
import Islamic from "./islamic/Islamic.js";
import Bauhaus from "./bauhaus/Bauhaus.js";
import Flocking from "./flocking/Flocking.js";
import Type from "./type/Type.js";
import Library from "./library/Library.js";
import Plp from "./plp/Plp.js";
import Sixteen from "./sixteen/Sixteen.js";
import Impossible from "./impossible/Impossible.js";
import Saved from "./saved/Saved.js";
import Seed from "./seed/Seed.js";





















const router = createHashRouter(
    createRoutesFromElements(
        <>
      <Route   errorElement={<Home />} />
      <Route path="/" element={<Home />}/>
        <Route path="/particles" element={<Particles />} />
        <Route path="/palettes" element={<Palettes />} />
        <Route path="/droste" element={<Droste />} />
        <Route path="/pixels" element={<Pixels />} />
        <Route path="/molnar" element={<Molnar />} />
        <Route path="/screensaver" element={<Screensaver />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/chaotic" element={<Chaotic />} />
        <Route path="/ascii" element={<Ascii />} />
        <Route path="/hexagonal" element={<Hexagonal />} />
        <Route path="/albers" element={<Albers />} />
        <Route path="/lava" element={<Lava />} />
        <Route path="/wobbly" element={<Wobbly />} />
        <Route path="/kb" element={<Kb />} />
        <Route path="/physics" element={<Physics />} />
        <Route path="/ten" element={<Ten />} />
        <Route path="/islamic" element={<Islamic />} />
        <Route path="/bauhaus" element={<Bauhaus />} />
        <Route path="/flocking" element={<Flocking />} />
        <Route path="/type" element={<Type />} />
        <Route path="/library" element={<Library />} />
        <Route path="/plp" element={<Plp />} />
        <Route path="/sixteen" element={<Sixteen />} />
        <Route path="/impossible" element={<Impossible />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/seed" element={<Seed />} />











        



        </>
     
    )
  );

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
    <h1 className="titular" 
     onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
    }
     onPointerOut={()=>  document.body.style.cursor = 'auto'}>Genuary 2024</h1>

  <RouterProvider router={router} />
  </>
);