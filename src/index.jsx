import "../index.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress, Environment } from "@react-three/drei";

import Experience from "./Experience.jsx";
import About from "./components/About";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

root.render(
  <>
    <div className="z-10 h-full w-full bg-transparent absolute flex items-center justify-center pointer-events-none">
      <h1 className="text-white font-trans text-7xl font-medium text-center">
        Completely reshape your <br /> business by Remaking
      </h1>
    </div>
    <Canvas
      dpr={[1, 2]}
      // className={"-z-10"}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 1.3],
      }}
    >
      <Suspense fallback={<Loader />}>
        <Experience />
      </Suspense>
    </Canvas>
    <About className="about-us" />
  </>
);
