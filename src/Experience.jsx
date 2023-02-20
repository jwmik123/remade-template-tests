import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Text, Float, OrbitControls, shaderMaterial } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { EffectComposer, Noise } from "@react-three/postprocessing";
import Shader from "./Shader";

import vertexShader from "./shaders/vertex.glsl";
import vertexShader1 from "./shaders/vertex1.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShader1 from "./shaders/fragment1.glsl";
import { BlendFunction } from "postprocessing";

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

  useFrame(({ gl, scene }, delta) => {
    noiseMaterialBackground.current.uTime += delta * 0.3;
    cubeCamera.current.update(gl, scene);
  });

  return (
    <>
      <EffectComposer>
        {/* <Shader /> */}
        <Noise blendFunction={BlendFunction.SOFT_LIGHT} />
      </EffectComposer>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1} />
      <ambientLight intensity={0.5} />
      <cubeCamera
        ref={cubeCamera}
        position={[0, 0, 0]}
        args={[0.1, 10, renderTarget]}
      >
        <mesh
        // position-x={0.4} position-y={0.2} position-z={0.4}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <shaderMaterial
            vertexShader={vertexShader1}
            fragmentShader={fragmentShader1}
            uniforms={{
              tCube: { value: renderTarget.texture },
              resolution: { value: new THREE.Vector4() },
              side: { value: THREE.DoubleSide },
            }}
          />
        </mesh>
      </cubeCamera>

      <mesh position-x={0}>
        <sphereGeometry args={[2, 32, 32]} />
        <noiseMaterialBackground ref={noiseMaterialBackground} />
      </mesh>
      {/* <Text position-z={1} fontSize={0.02} font={"./Unbounded-Bold.ttf"}>
        ReMaDe
      </Text> */}
      <Text
        position-z={-0.5}
        color={"gray"}
        fontSize={0.05}
        font={"./Unbounded-Bold.ttf"}
      >
        REMADE
      </Text>
    </>
  );
}
