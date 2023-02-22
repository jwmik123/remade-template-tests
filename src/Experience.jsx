import { useRef } from "react";
import * as THREE from "three";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import {
  shaderMaterial,
  OrbitControls,
  useGLTF,
  MeshRefractionMaterial,
  CubeCamera,
} from "@react-three/drei";
import { RGBELoader } from "three-stdlib";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

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
    bounces: 2,
    aberrationStrength: 0.02,
    ior: 2.5,
    fresnel: 0.1,
    color: "white",
    fastChroma: true,
  };
  useFrame(({ clock }, delta) => {
    const a = clock.getElapsedTime();
    ref.current.position.y = Math.cos(a) * 0.05;
    ref.current.rotation.y += delta * 0.1;
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
      <ambientLight intensity={0.5} />
      <Isodron position={[0, 0, 0]} />
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <noiseMaterialBackground ref={noiseMaterialBackground} />
      </mesh>
    </>
  );
}
