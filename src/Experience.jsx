import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import {
  Text,
  shaderMaterial,
  OrbitControls,
  SpotLight,
  useDepthBuffer,
  Text3D,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import vertexShader from "./shaders/vertex.glsl";
import vertexShader1 from "./shaders/vertex1.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShader1 from "./shaders/fragment1.glsl";

const NoiseMaterialBackground = shaderMaterial(
  { uTime: 0, resolution: new THREE.Vector4(), side: THREE.DoubleSide },
  vertexShader,
  fragmentShader
);
extend({ NoiseMaterialBackground });

export default function Experience() {
  const [renderTarget] = useState(
    new THREE.WebGLCubeRenderTarget(1024, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapLinearFilter,
      encoding: THREE.sRGBEncoding,
    })
  );
  const noiseMaterialBackground = useRef();
  const cubeCamera = useRef();

  const config = useMemo(
    () => ({
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    []
  );

  useFrame(({ gl, scene, mouse }, delta) => {
    noiseMaterialBackground.current.uTime += delta * 0.1;
    cubeCamera.current.update(gl, scene);

    const parallaxX = mouse.x;
    const parallaxY = mouse.y;
    cubeCamera.current.position.x =
      (parallaxX - cubeCamera.current.position.x / 2) * 0.01;
    cubeCamera.current.position.y =
      (-parallaxY - cubeCamera.current.position.y / 2) * 0.01;
  });

  return (
    <>
      {/* <EffectComposer>
        <Noise blendFunction={BlendFunction.SOFT_LIGHT} />
      </EffectComposer> */}
      {/* <Perf position="bottom-right" /> */}
      <ambientLight intensity={0.5} />

      <mesh>
        <Text3D
          font={"./Unbounded_Bold.json"}
          position={[-0.25, -0.2, -2]}
          scale={0.4}
        >
          R{/* <meshNormalMaterial /> */}
        </Text3D>
      </mesh>
      <cubeCamera
        ref={cubeCamera}
        position={[0, 0, 0]}
        args={[0.1, 10, renderTarget]}
      >
        <mesh position={[0, 0, -0.5]}>
          <icosahedronGeometry args={[0.4, 1]} />
          <shaderMaterial
            vertexShader={vertexShader1}
            fragmentShader={fragmentShader1}
            uniforms={{
              tCube: { value: renderTarget.texture },
              side: { value: THREE.DoubleSide },
            }}
          />
        </mesh>
      </cubeCamera>
      <mesh position-x={0}>
        <sphereGeometry args={[2, 16, 16]} />
        <noiseMaterialBackground ref={noiseMaterialBackground} />
      </mesh>

      <mesh>
        {/* <Text3D
          font={"./Unbounded-Bold.ttf"}
          position={[0, 0, -0.3]}
          fontSize={0.1}
          // color={"gray"}
          // {...config}
        >
          R
        </Text3D> */}
      </mesh>
    </>
  );
}
