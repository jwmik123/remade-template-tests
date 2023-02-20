import CustomNoiseEffect from "./shaders/CustomShader";

export default function Shader() {
  const effect = new CustomNoiseEffect();
  return (
    <mesh>
      <primitive object={effect} />
    </mesh>
  );
}
