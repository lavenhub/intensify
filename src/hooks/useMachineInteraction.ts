import { useMemo } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export type MachineProfile = {
  /** User asked for reduced motion — disable idle/spray animation. */
  reducedMotion: boolean;
  /** Low-power device — simplify materials, lower dpr, skip spray. */
  perfMode: boolean;
  /** Device-appropriate pixel ratio cap for the renderer. */
  dpr: [number, number];
  /** Enable the water-spray effect. */
  spray: boolean;
};

/**
 * Derives a rendering profile from the device so the 3D scene stays fast on
 * phones and low-power machines while looking premium on capable desktops.
 */
export function useMachineInteraction(): MachineProfile {
  const reducedMotion = usePrefersReducedMotion();

  return useMemo<MachineProfile>(() => {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    const cores = nav?.hardwareConcurrency ?? 8;
    // deviceMemory is non-standard but widely supported on Chromium.
    const mem = (nav as unknown as { deviceMemory?: number })?.deviceMemory ?? 8;
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches;
    const narrow = typeof window !== "undefined" && window.innerWidth < 768;

    const perfMode = cores <= 4 || mem <= 4 || (coarse && narrow);

    return {
      reducedMotion,
      perfMode,
      dpr: perfMode ? [1, 1.5] : [1, 2],
      spray: !perfMode && !reducedMotion,
    };
  }, [reducedMotion]);
}
