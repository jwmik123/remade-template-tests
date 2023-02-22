import * as THREE from "three";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useMemo, useLayoutEffect } from "react";
import {
  Text,
  shaderMaterial,
  OrbitControls,
  SpotLight,
  useDepthBuffer,
  Text3D,
  useGLTF,
  Center,
  MeshRefractionMaterial,
  CubeCamera,
  Caustics,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { RGBELoader } from "three-stdlib";

import { EffectComposer, Noise } from "@react-three/postprocessing";

import vertexShader from "./shaders/vertex.glsl";
import vertexShader1 from "./shaders/vertex1.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShader1 from "./shaders/fragment1.glsl";
import { Color, MathUtils } from "three";

const NoiseMaterialBackground = shaderMaterial(
  { uTime: 0, resolution: new THREE.Vector4(), side: THREE.DoubleSide },
  vertexShader,
  fragmentShader
);
extend({ NoiseMaterialBackground });

const Isodron = (props) => {
  const ref = useRef();
  const { nodes } = useGLTF("IcoSphere.gltf");
  const texture = useLoader(RGBELoader, "./aerodynamics_workshop_1k.hdr");
  const config = {
    bounces: 3,
    aberrationStrength: 0.1,
    ior: 2.5,
    fresnel: 0.8,
    color: "white",
    fastChroma: true,
  };
  useFrame(({ clock }, delta) => {
    const a = clock.getElapsedTime();
    ref.current.position.y = Math.cos(a) * 0.05;
  });

  return (
    <CubeCamera resolution={128} frames={1} envMap={texture}>
      {(texture) => (
        <mesh
          ref={ref}
          geometry={nodes.Icosphere.geometry}
          {...props}
          scale={0.6}
        >
          <MeshRefractionMaterial
            envMap={texture}
            {...config}
            toneMapped={false}
          />
          <OrbitControls enableZoom={false} />
        </mesh>
      )}
    </CubeCamera>
  );
};

export default function Experience() {
  const noiseMaterialBackground = useRef();

  useFrame((_, delta) => {
    noiseMaterialBackground.current.uTime += delta * 0.1;
  });

  return (
    <>
      <EffectComposer>
        <Noise opacity={0.1} />
      </EffectComposer>
      <ambientLight intensity={0.3} />
      <Perf />
      <Isodron position={[0, 0, 0]} />
      <mesh position-x={0}>
        <sphereGeometry args={[2, 16, 16]} />
        <noiseMaterialBackground ref={noiseMaterialBackground} />
      </mesh>
    </>
  );
}
