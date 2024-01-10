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