import { Suspense, useEffect, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";

import Lenis from "@studio-freight/lenis";

import Experience from "./Experience.jsx";
import About from "./components/About";
import Hero from "./components/Hero";
import Cases from "./components/Cases";

const Layout = () => {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  // useLayoutEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     direction: "vertical", // vertical, horizontal
  //     gestureDirection: "vertical", // vertical, horizontal, both
  //     smooth: true,
  //     mouseMultiplier: 1,
  //     smoothTouch: false,
  //     touchMultiplier: 2,
  //     infinite: false,
  //   });
  //   const raf = (time) => {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   };
  //   requestAnimationFrame(raf);
  // });

  return (
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
};

export default Layout;
