import "../index.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress, Environment } from "@react-three/drei";

import Experience from "./Experience.jsx";
import About from "./components/About";
import Hero from "./components/Hero";
import Cases from "./components/Cases";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

root.render(
  <>
    <Hero />
    <Canvas
      dpr={[1, 2]}
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
    <Cases />
  </>
);
