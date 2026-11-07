import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  AdaptiveDpr,
  BakeShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { IndustrialMachine } from "./IndustrialMachine";
import { MachineHotspots } from "./MachineHotspots";
import { MachineControls } from "./MachineControls";
import type { MachineProfile } from "@/hooks/useMachineInteraction";

type Props = {
  profile: MachineProfile;
};

/* The machine is modelled centred on the world Y axis (its own pivot).
   The camera orbits this centre as an elegant turntable, so the machine
   stays perfectly centred and never drifts or rescales. */
export const MACHINE_CENTER: [number, number, number] = [0, 1.5, 0];
// Slightly closer framing (≈8% zoom-in) — still clears the machine at every
// turntable angle thanks to the framing margin.
export const CAMERA_START: [number, number, number] = [6.35, 5.36, 10.12];

function LightRig() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#111317"]} />
      {/* soft top key */}
      <Lightformer intensity={2.0} position={[0, 6, 2]} scale={[14, 7, 1]} color="#ffffff" />
      {/* cool rim from back */}
      <Lightformer intensity={1.7} position={[-6, 4, -6]} scale={[9, 9, 1]} color="#c3d4ff" />
      {/* warm brand reflection low-front (kept low so horizontal tops don't blow out) */}
      <Lightformer intensity={1.05} position={[3, 0.2, 6]} scale={[9, 2, 1]} color="#ffcf4d" />
      {/* side fills — keep all rotation angles lit */}
      <Lightformer intensity={1.5} position={[8, 3, 3]} scale={[5, 9, 1]} color="#ffffff" />
      <Lightformer intensity={1.5} position={[-8, 3, 3]} scale={[5, 9, 1]} color="#ffffff" />
      <Lightformer intensity={1.2} position={[0, 3, -8]} scale={[7, 7, 1]} color="#dfe8ff" />
    </Environment>
  );
}

function SceneContents({ profile }: Props) {
  return (
    <>
      <LightRig />

      {/* Cinematic studio rig — lights every angle of the turntable */}
      <ambientLight intensity={0.4} />
      {/* LIGHT 1 — soft key, front-left */}
      <directionalLight
        position={[-6, 9, 8]}
        intensity={2.3}
        color="#ffffff"
        castShadow={!profile.perfMode}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-7, 7, 7, -7, 0.1, 34]} />
      </directionalLight>
      {/* LIGHT 2 — cool rim from behind, separates machine from the dark bg */}
      <directionalLight position={[-7, 6, -9]} intensity={2.3} color="#c6d6ff" />
      {/* LIGHT 3 — soft fill from camera side, reveals mechanical detail */}
      <directionalLight position={[8, 4, 6]} intensity={1.3} color="#eef3ff" />
      {/* LIGHT 4 — restrained warm yellow brand accent, low-front */}
      <spotLight position={[3, 2.5, 8]} angle={0.7} penumbra={1} intensity={1.2} color="#ffcf4d" distance={26} />

      <Suspense fallback={null}>
        <IndustrialMachine perfMode={profile.perfMode} spray={profile.spray} />
      </Suspense>

      <MachineHotspots occlude={!profile.perfMode} />

      {/* Soft grounding shadow only — no visible floor plane or platform.
          The machine floats on the page's own dark background. */}
      <ContactShadows
        position={[0, 0.0, 0]}
        scale={9}
        far={7}
        blur={3.4}
        opacity={0.62}
        resolution={profile.perfMode ? 512 : 1024}
        color="#000000"
      />

      <MachineControls
        idle={!profile.reducedMotion}
        target={MACHINE_CENTER}
        start={CAMERA_START}
      />

      {profile.perfMode && <BakeShadows />}
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function MachineScene({ profile }: Props) {
  return (
    <Canvas
      shadows={!profile.perfMode}
      dpr={profile.dpr}
      gl={{
        antialias: !profile.perfMode,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: CAMERA_START, fov: 34, near: 0.1, far: 100 }}
      style={{ touchAction: "pan-y" }}
    >
      <fog attach="fog" args={["#0a0a0a", 26, 55]} />
      <SceneContents profile={profile} />
    </Canvas>
  );
}
