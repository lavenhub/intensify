import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  /** Enable the slow idle turntable rotation. */
  idle: boolean;
  /** Point the camera orbits around — the machine's own centre. */
  target: [number, number, number];
  /** Initial camera position (three-quarter front-right showcase angle). */
  start: [number, number, number];
  onInteracting?: (v: boolean) => void;
};

const RESUME_DELAY = 2500; // ms of inactivity before the turntable resumes

export function MachineControls({ idle, target, start, onInteracting }: Props) {
  const ref = useRef<OrbitControlsImpl>(null);
  const lastInteract = useRef(0);
  const interacting = useRef(false);
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    camera.position.set(start[0], start[1], start[2]);
  }, [camera, start]);

  // Resume the turntable after a quiet period
  useFrame(() => {
    const c = ref.current;
    if (!c) return;
    if (!idle) {
      c.autoRotate = false;
      return;
    }
    if (!interacting.current && performance.now() - lastInteract.current > RESUME_DELAY) {
      c.autoRotate = true;
    }
  });

  return (
    <OrbitControls
      ref={ref}
      target={target}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.5}
      autoRotate={idle}
      autoRotateSpeed={1.1} /* ≈ 55s per full revolution */
      /* full 360° turntable — no azimuth limits */
      minPolarAngle={1.14}
      maxPolarAngle={1.4}
      onStart={() => {
        interacting.current = true;
        if (ref.current) ref.current.autoRotate = false;
        onInteracting?.(true);
      }}
      onEnd={() => {
        interacting.current = false;
        lastInteract.current = performance.now();
        onInteracting?.(false);
      }}
    />
  );
}
