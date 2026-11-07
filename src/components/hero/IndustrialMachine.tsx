import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import logoBadge from "@/assets/intensify-logo-badge.png";

type Props = {
  perfMode: boolean;
  spray: boolean;
};

type V3 = [number, number, number];

/* ================================================================== */
/* Procedural textures                                                */
/* ================================================================== */
function makeScreenTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 192;
  const g = c.getContext("2d")!;
  g.fillStyle = "#06171c";
  g.fillRect(0, 0, 256, 192);
  g.fillStyle = "#0b2a33";
  g.fillRect(0, 0, 256, 32);
  g.fillStyle = "#ffd200";
  g.fillRect(12, 11, 48, 10);
  g.fillStyle = "#2fe3c0";
  g.font = "bold 12px sans-serif";
  g.fillText("CYCLE · ACTIVE", 74, 21);
  for (let i = 0; i < 3; i++) {
    const x = 42 + i * 86;
    g.strokeStyle = "#17444f";
    g.lineWidth = 7;
    g.beginPath();
    g.arc(x, 92, 25, Math.PI * 0.75, Math.PI * 2.25);
    g.stroke();
    g.strokeStyle = i === 2 ? "#ffd200" : "#2fe3c0";
    g.beginPath();
    g.arc(x, 92, 25, Math.PI * 0.75, Math.PI * (0.75 + 1.0 + i * 0.18));
    g.stroke();
    g.fillStyle = "#cfefff";
    g.font = "9px monospace";
    g.fillText(["62°C", "4.2bar", "98%"][i], x - 14, 128);
  }
  for (let i = 0; i < 7; i++) {
    g.fillStyle = i % 2 ? "#17444f" : "#2fe3c0";
    g.fillRect(16 + i * 33, 150, 22, 8 + (i % 3) * 12);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Fine brushed-metal roughness streaks — kills the flat "plastic" look. */
function makeBrushedRoughness(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#8c8c8c";
  g.fillRect(0, 0, 512, 128);
  for (let i = 0; i < 4200; i++) {
    const y = Math.random() * 128;
    const w = 40 + Math.random() * 240;
    const x = Math.random() * 512;
    const v = 104 + Math.floor(Math.random() * 64);
    g.strokeStyle = `rgba(${v},${v},${v},0.45)`;
    g.lineWidth = Math.random() < 0.5 ? 1 : 2;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + w, y);
    g.stroke();
  }
  // faint smudges for realism
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 128;
    const r = 8 + Math.random() * 26;
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, "rgba(150,150,150,0.14)");
    grd.addColorStop(1, "rgba(150,150,150,0)");
    g.fillStyle = grd;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 1.4);
  t.anisotropy = 4;
  return t;
}

/* ================================================================== */
/* Water spray jet                                                    */
/* ================================================================== */
function SprayJet({ position, animate }: { position: V3; animate: boolean }) {
  const count = 54;
  const pointsRef = useRef<THREE.Points>(null);
  const coneRef = useRef<THREE.Mesh>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.14;
      positions[i * 3 + 1] = -Math.random() * 0.85;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.14;
      speeds[i] = 0.6 + Math.random() * 0.9;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    if (!animate) return;
    const pts = pointsRef.current;
    if (pts) {
      const arr = pts.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] -= speeds[i] * delta;
        const spread = -arr[i * 3 + 1] * 0.2;
        if (arr[i * 3 + 1] < -0.85) {
          arr[i * 3 + 1] = 0;
          arr[i * 3] = (Math.random() - 0.5) * 0.07;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 0.07;
        } else {
          arr[i * 3] += (Math.sign(arr[i * 3] || 1) * spread - arr[i * 3]) * delta * 0.6;
        }
      }
      pts.geometry.attributes.position.needsUpdate = true;
    }
    if (coneRef.current) {
      const m = coneRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.09 + Math.sin(performance.now() * 0.006) * 0.025;
    }
  });

  return (
    <group position={position}>
      <mesh ref={coneRef} position={[0, -0.42, 0]}>
        <coneGeometry args={[0.22, 0.85, 16, 1, true]} />
        <meshBasicMaterial
          color="#dff3ff"
          transparent
          opacity={0.09}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {animate && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#eaf6ff"
            size={0.03}
            transparent
            opacity={0.8}
            depthWrite={false}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}

/* ================================================================== */
/* Main machine — professional, beveled, framed, heavily detailed     */
/* ================================================================== */
export function IndustrialMachine({ perfMode, spray }: Props) {
  const badge = useTexture(logoBadge);
  badge.colorSpace = THREE.SRGBColorSpace;
  badge.anisotropy = 4;

  const screenTex = useMemo(makeScreenTexture, []);
  const brushed = useMemo(makeBrushedRoughness, []);

  const tubeGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.55, 2.92, 0.6),
      new THREE.Vector3(-1.6, 3.2, 0.68),
      new THREE.Vector3(-0.3, 3.28, 0.7),
      new THREE.Vector3(0.6, 3.14, 0.64),
      new THREE.Vector3(0.78, 2.78, 0.48),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.038, 12, false);
  }, []);

  // flexible exterior conduit
  const conduitGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.55, 2.4, -1.22),
      new THREE.Vector3(1.75, 1.9, -1.32),
      new THREE.Vector3(1.72, 1.2, -1.34),
      new THREE.Vector3(1.9, 0.7, -1.28),
    ]);
    return new THREE.TubeGeometry(curve, 30, 0.035, 8, false);
  }, []);

  /* ---- materials ---- */
  const mats = useMemo(() => {
    const body = new THREE.MeshPhysicalMaterial({
      color: "#d4d8de",
      metalness: 0.92,
      roughness: 0.42,
      roughnessMap: perfMode ? null : brushed,
      anisotropy: perfMode ? 0 : 0.5,
      clearcoat: perfMode ? 0 : 0.12,
      clearcoatRoughness: 0.45,
      envMapIntensity: 1.2,
    });
    const frame = new THREE.MeshStandardMaterial({
      color: "#bcc1c8",
      metalness: 1,
      roughness: 0.26,
      envMapIntensity: 1.5,
    });
    const recess = new THREE.MeshStandardMaterial({
      color: "#a7adb5",
      metalness: 0.86,
      roughness: 0.56,
      roughnessMap: perfMode ? null : brushed,
      envMapIntensity: 1.0,
    });
    const anodized = new THREE.MeshStandardMaterial({
      color: "#33363b",
      metalness: 0.82,
      roughness: 0.48,
      envMapIntensity: 0.85,
    });
    const satin = new THREE.MeshStandardMaterial({
      color: "#6c7178",
      metalness: 0.72,
      roughness: 0.6,
      envMapIntensity: 0.9,
    });
    const yellow = new THREE.MeshPhysicalMaterial({
      color: "#ffd200",
      metalness: 0.35,
      roughness: 0.34,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      emissive: new THREE.Color("#3a2e00"),
      emissiveIntensity: 0.25,
    });
    const part = new THREE.MeshStandardMaterial({
      color: "#9ca2a9",
      metalness: 0.95,
      roughness: 0.4,
      envMapIntensity: 1.25,
    });
    const bezel = new THREE.MeshStandardMaterial({ color: "#0b0c0e", metalness: 0.5, roughness: 0.5 });
    const bolt = new THREE.MeshStandardMaterial({ color: "#595d63", metalness: 1, roughness: 0.32 });
    const rubber = new THREE.MeshStandardMaterial({ color: "#181a1d", metalness: 0.12, roughness: 0.85 });
    const chrome = new THREE.MeshStandardMaterial({ color: "#dadde2", metalness: 1, roughness: 0.12 });
    const glass = perfMode
      ? new THREE.MeshStandardMaterial({ color: "#bcdfee", metalness: 0, roughness: 0.08, transparent: true, opacity: 0.16 })
      : new THREE.MeshPhysicalMaterial({
          color: "#eef8fc",
          metalness: 0,
          roughness: 0.04,
          transmission: 1,
          thickness: 0.3,
          ior: 1.46,
          transparent: true,
          opacity: 1,
          envMapIntensity: 1.3,
        });
    const darkGlass = new THREE.MeshPhysicalMaterial({
      color: "#10171c",
      metalness: 0.3,
      roughness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.1,
    });
    const screen = new THREE.MeshStandardMaterial({
      map: screenTex,
      emissive: new THREE.Color("#8fe9ff"),
      emissiveMap: screenTex,
      emissiveIntensity: 0.85,
      roughness: 0.26,
      metalness: 0,
    });
    return { body, frame, recess, anodized, satin, yellow, part, bezel, bolt, rubber, chrome, glass, darkGlass, screen };
  }, [perfMode, screenTex, brushed]);

  const emis = useMemo(
    () => ({
      red: new THREE.MeshStandardMaterial({ color: "#ff2a1a", emissive: "#ff2a1a", emissiveIntensity: 1.3, roughness: 0.4 }),
      amber: new THREE.MeshStandardMaterial({ color: "#ffb300", emissive: "#ffb300", emissiveIntensity: 1.1, roughness: 0.4 }),
      green: new THREE.MeshStandardMaterial({ color: "#2fe06a", emissive: "#2fe06a", emissiveIntensity: 1.1, roughness: 0.4 }),
      blue: new THREE.MeshStandardMaterial({ color: "#36c6ff", emissive: "#36c6ff", emissiveIntensity: 1.0, roughness: 0.4 }),
      estop: new THREE.MeshStandardMaterial({ color: "#d81e0a", emissive: "#4a0b03", emissiveIntensity: 0.4, roughness: 0.5 }),
    }),
    []
  );

  useEffect(() => {
    return () => {
      Object.values(mats).forEach((m) => m.dispose());
      Object.values(emis).forEach((m) => m.dispose());
      screenTex.dispose();
      brushed.dispose();
      tubeGeo.dispose();
      conduitGeo.dispose();
    };
  }, [mats, emis, screenTex, brushed, tubeGeo, conduitGeo]);

  /* ---- beveled body helper (biggest realism win) ---- */
  const Body = ({
    pos,
    size,
    material = mats.body,
    rot,
    radius = 0.03,
    cast = true,
  }: {
    pos: V3;
    size: V3;
    material?: THREE.Material;
    rot?: V3;
    radius?: number;
    cast?: boolean;
  }) => {
    if (perfMode) {
      return (
        <mesh position={pos} rotation={rot} material={material} castShadow={cast} receiveShadow>
          <boxGeometry args={size} />
        </mesh>
      );
    }
    const r = Math.max(0.004, Math.min(radius, Math.min(size[0], size[1], size[2]) / 2 - 0.002));
    return (
      <RoundedBox
        position={pos}
        rotation={rot}
        args={size}
        radius={r}
        smoothness={2}
        steps={1}
        material={material}
        castShadow={cast}
        receiveShadow
      />
    );
  };

  const Bolt = ({ pos, rot, r = 0.026 }: { pos: V3; rot?: V3; r?: number }) =>
    perfMode ? null : (
      <mesh position={pos} rotation={rot ?? [Math.PI / 2, 0, 0]} material={mats.bolt}>
        <cylinderGeometry args={[r, r, 0.028, 6]} />
      </mesh>
    );

  /* recessed, framed front panel (the professional "cabinet" look) */
  const Panel = ({
    cx,
    cy,
    z,
    w,
    h,
    rail = 0.05,
  }: {
    cx: number;
    cy: number;
    z: number;
    w: number;
    h: number;
    rail?: number;
  }) => (
    <>
      {/* recessed insert */}
      <Body pos={[cx, cy, z - 0.03]} size={[w - rail * 1.6, h - rail * 1.6, 0.02]} material={mats.recess} radius={0.012} cast={false} />
      {/* raised frame rails */}
      <Body pos={[cx, cy + h / 2, z]} size={[w, rail, 0.05]} material={mats.frame} radius={0.014} cast={false} />
      <Body pos={[cx, cy - h / 2, z]} size={[w, rail, 0.05]} material={mats.frame} radius={0.014} cast={false} />
      <Body pos={[cx - w / 2, cy, z]} size={[rail, h, 0.05]} material={mats.frame} radius={0.014} cast={false} />
      <Body pos={[cx + w / 2, cy, z]} size={[rail, h, 0.05]} material={mats.frame} radius={0.014} cast={false} />
      {!perfMode &&
        ([
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ] as const).map(([sx, sy], i) => (
          <Bolt key={i} pos={[cx + sx * (w / 2 - rail * 0.9), cy + sy * (h / 2 - rail * 0.9), z + 0.02]} />
        ))}
    </>
  );

  // aluminium extrusion profile bar (beveled, polished) — structural frame
  const Extrusion = ({ pos, size, rot }: { pos: V3; size: V3; rot?: V3 }) => (
    <Body pos={pos} size={size} rot={rot} material={mats.frame} radius={0.018} />
  );

  // door hinge with knuckles
  const Hinge = ({ pos }: { pos: V3 }) =>
    perfMode ? null : (
      <group position={pos}>
        <mesh material={mats.satin}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
        </mesh>
        {[-0.07, 0.07].map((y) => (
          <mesh key={y} position={[0, y, 0]} material={mats.anodized}>
            <cylinderGeometry args={[0.042, 0.042, 0.05, 12]} />
          </mesh>
        ))}
        <mesh position={[-0.05, 0, 0]} material={mats.satin}>
          <boxGeometry args={[0.1, 0.18, 0.02]} />
        </mesh>
      </group>
    );

  // D-handle
  const Handle = ({ pos, h = 0.3 }: { pos: V3; h?: number }) =>
    perfMode ? null : (
      <group position={pos}>
        {[h / 2, -h / 2].map((y) => (
          <mesh key={y} position={[0.04, y, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.chrome}>
            <cylinderGeometry args={[0.014, 0.014, 0.09, 8]} />
          </mesh>
        ))}
        <mesh position={[0.08, 0, 0]} material={mats.chrome}>
          <cylinderGeometry args={[0.014, 0.014, h, 10]} />
        </mesh>
      </group>
    );

  // ventilation louvre bank
  const Vents = ({ pos, count = 6, w = 0.6, rot }: { pos: V3; count?: number; w?: number; rot?: V3 }) =>
    perfMode ? null : (
      <group position={pos} rotation={rot}>
        <Body pos={[0, 0, -0.01]} size={[w + 0.06, count * 0.07 + 0.06, 0.02]} material={mats.anodized} radius={0.01} cast={false} />
        {Array.from({ length: count }).map((_, i) => (
          <mesh key={i} position={[0, (count / 2 - i) * 0.07 - 0.035, 0.01]} rotation={[0.5, 0, 0]} material={mats.bezel}>
            <boxGeometry args={[w, 0.034, 0.02]} />
          </mesh>
        ))}
      </group>
    );

  // branded data nameplate
  const NamePlate = ({ pos }: { pos: V3 }) =>
    perfMode ? null : (
      <group position={pos}>
        <Body pos={[0, 0, 0]} size={[0.34, 0.14, 0.012]} material={mats.frame} radius={0.008} cast={false} />
        <mesh position={[0, 0, 0.009]}>
          <planeGeometry args={[0.3, 0.1]} />
          <meshBasicMaterial map={badge} transparent toneMapped={false} />
        </mesh>
        {([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).map(([sx, sy], i) => (
          <Bolt key={i} pos={[sx * 0.14, sy * 0.05, 0.012]} r={0.012} />
        ))}
      </group>
    );

  // leveling foot: base pad + threaded rod + hex nut + mount bracket
  const Foot = ({ x, z }: { x: number; z: number }) => (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.015, 0]} material={mats.rubber}>
        <cylinderGeometry args={[0.1, 0.11, 0.04, 20]} />
      </mesh>
      <mesh position={[0, 0.08, 0]} material={mats.chrome}>
        <cylinderGeometry args={[0.03, 0.03, 0.13, 10]} />
      </mesh>
      {!perfMode && (
        <mesh position={[0, 0.07, 0]} material={mats.bolt}>
          <cylinderGeometry args={[0.05, 0.05, 0.035, 6]} />
        </mesh>
      )}
      <Body pos={[0, 0.17, 0]} size={[0.17, 0.06, 0.17]} material={mats.satin} radius={0.015} />
    </group>
  );

  // engine-block part being cleaned, held in a stainless cradle
  const EnginePart = ({ x, material }: { x: number; material: THREE.Material }) => (
    <group position={[x, 1.3, 0]}>
      <Body pos={[0, 0, 0]} size={[0.5, 0.32, 0.6]} material={material} radius={0.03} />
      {[-0.16, 0, 0.16].map((z) => (
        <mesh key={z} position={[0, 0.19, z]} material={material}>
          <cylinderGeometry args={[0.093, 0.093, 0.08, 16]} />
        </mesh>
      ))}
      <Body pos={[0, -0.04, 0.32]} size={[0.44, 0.13, 0.03]} material={material} radius={0.01} />
      {!perfMode &&
        [-0.18, 0.18].map((z) => (
          <mesh key={z} position={[0.26, 0, z]} rotation={[0, 0, Math.PI / 2]} material={material}>
            <cylinderGeometry args={[0.028, 0.028, 0.08, 8]} />
          </mesh>
        ))}
      {/* cradle */}
      {!perfMode && (
        <>
          <mesh position={[0, -0.2, 0]} material={mats.satin}>
            <boxGeometry args={[0.56, 0.03, 0.06]} />
          </mesh>
          {[-0.24, 0.24].map((zz) => (
            <mesh key={zz} position={[0, -0.14, zz]} material={mats.satin}>
              <boxGeometry args={[0.04, 0.14, 0.04]} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );

  // bolt row along X at (y,z)
  const BoltRow = ({ xs, y, z }: { xs: number[]; y: number; z: number }) => (
    <>
      {xs.map((x, i) => (
        <Bolt key={i} pos={[x, y, z]} />
      ))}
    </>
  );

  const FZ = 1.2; // front face plane

  return (
    <group position={[-0.15, 0, 0]}>
      {/* =================== GLASS CLEANING CHAMBER (left) =================== */}
      {/* base cabinet shell */}
      <Body pos={[-1.45, 0.58, 0]} size={[2.9, 0.74, 2.5]} radius={0.04} />
      {/* recessed framed panels on all four skirt faces */}
      <Panel cx={-1.45} cy={0.58} z={FZ + 0.01} w={2.7} h={0.58} />
      <Panel cx={-1.45} cy={0.58} z={-FZ - 0.01} w={2.7} h={0.58} />
      <group rotation={[0, Math.PI / 2, 0]}>
        <Panel cx={0} cy={0.58} z={2.9 - 1.45 + 0.01} w={2.1} h={0.58} />
      </group>
      {/* yellow toe-kick */}
      <Body pos={[-1.45, 0.26, FZ + 0.015]} size={[2.5, 0.08, 0.02]} material={mats.yellow} radius={0.01} cast={false} />

      {/* top cap */}
      <Body pos={[-1.45, 2.74, 0]} size={[3.0, 0.2, 2.6]} radius={0.04} />

      {/* ---- aluminium extrusion frame skeleton ---- */}
      {([
        [-2.92, FZ],
        [0.02, FZ],
        [-2.92, -FZ],
        [0.02, -FZ],
      ] as const).map(([x, z], i) => (
        <group key={i}>
          <Extrusion pos={[x, 1.78, z]} size={[0.16, 1.78, 0.16]} />
          {z > 0 && <Body pos={[x, 1.78, z + 0.1]} size={[0.1, 1.62, 0.03]} material={mats.yellow} radius={0.01} cast={false} />}
          <Bolt pos={[x, 2.52, z + 0.09]} />
          <Bolt pos={[x, 1.05, z + 0.09]} />
        </group>
      ))}
      {/* top & bottom perimeter rails of the frame */}
      {([2.66, 0.92] as const).map((y, i) => (
        <group key={i}>
          <Extrusion pos={[-1.45, y, FZ]} size={[2.9, 0.12, 0.12]} />
          <Extrusion pos={[-1.45, y, -FZ]} size={[2.9, 0.12, 0.12]} />
          <Extrusion pos={[-2.92, y, 0]} size={[0.12, 0.12, 2.4]} />
          <Extrusion pos={[0.02, y, 0]} size={[0.12, 0.12, 2.4]} />
        </group>
      ))}

      {/* glass panels */}
      <mesh position={[-1.45, 1.78, FZ]} material={mats.glass}>
        <boxGeometry args={[2.84, 1.6, 0.03]} />
      </mesh>
      <mesh position={[-2.9, 1.78, 0]} material={mats.glass}>
        <boxGeometry args={[0.03, 1.6, 2.28]} />
      </mesh>
      <mesh position={[-1.45, 1.78, -FZ]} material={mats.glass}>
        <boxGeometry args={[2.84, 1.6, 0.03]} />
      </mesh>
      <mesh position={[-1.45, 2.58, 0]} material={mats.glass}>
        <boxGeometry args={[2.84, 0.03, 2.28]} />
      </mesh>

      {/* hinged door: centre mullion, handle, hinges, latch */}
      <Body pos={[-1.45, 1.78, FZ + 0.015]} size={[0.06, 1.58, 0.05]} material={mats.frame} radius={0.012} cast={false} />
      <Hinge pos={[-2.9, 2.25, FZ + 0.04]} />
      <Hinge pos={[-2.9, 1.3, FZ + 0.04]} />
      <Handle pos={[-0.18, 1.78, FZ + 0.05]} h={0.34} />
      {!perfMode && (
        <mesh position={[-0.1, 1.5, FZ + 0.04]} material={mats.anodized}>
          <boxGeometry args={[0.05, 0.1, 0.06]} />
        </mesh>
      )}

      {/* logo header */}
      <Body pos={[-1.45, 2.5, FZ + 0.03]} size={[2.9, 0.16, 0.04]} material={mats.anodized} radius={0.01} cast={false} />
      <mesh position={[-2.2, 2.5, FZ + 0.055]}>
        <planeGeometry args={[0.92, 0.12]} />
        <meshBasicMaterial map={badge} transparent toneMapped={false} />
      </mesh>

      {/* ---- interior: twin spray bars + nozzles + lit parts in cradles ---- */}
      {[0.3, -0.3].map((z) => (
        <mesh key={z} position={[-1.45, 2.32, z]} rotation={[0, 0, Math.PI / 2]} material={mats.chrome}>
          <cylinderGeometry args={[0.04, 0.04, 2.6, 12]} />
        </mesh>
      ))}
      {[-2.35, -1.82, -1.29, -0.76, -0.3].map((x) =>
        [0.3, -0.3].map((z) => (
          <group key={`${x}-${z}`}>
            <mesh position={[x, 2.2, z]} material={mats.chrome}>
              <cylinderGeometry args={[0.02, 0.016, 0.2, 8]} />
            </mesh>
            <mesh position={[x, 2.09, z]} material={mats.satin}>
              <cylinderGeometry args={[0.028, 0.018, 0.045, 8]} />
            </mesh>
          </group>
        ))
      )}
      <SprayJet position={[-1.82, 2.03, 0.3]} animate={spray} />
      <SprayJet position={[-1.29, 2.03, 0.3]} animate={spray} />
      <SprayJet position={[-0.76, 2.03, -0.3]} animate={spray} />

      {/* conveyor rails + rollers */}
      {[0.22, -0.22].map((z) => (
        <Body key={z} pos={[-1.5, 1.0, z]} size={[2.7, 0.05, 0.05]} material={mats.anodized} radius={0.01} cast={false} />
      ))}
      {[-2.45, -1.9, -1.35, -0.8, -0.3].map((x) => (
        <mesh key={x} position={[x, 0.96, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.chrome}>
          <cylinderGeometry args={[0.036, 0.036, 0.52, 10]} />
        </mesh>
      ))}
      <EnginePart x={-2.35} material={mats.part} />
      <EnginePart x={-1.45} material={mats.part} />
      <EnginePart x={-0.6} material={mats.part} />

      {/* =================== CONTROL TOWER (centre) =================== */}
      <Body pos={[0.9, 1.72, 0]} size={[1.25, 3.0, 2.5]} radius={0.045} />
      {/* framed panels on front/back/side */}
      <Panel cx={0.9} cy={2.3} z={FZ + 0.01} w={1.04} h={1.05} />
      <Panel cx={0.9} cy={1.9} z={-FZ - 0.01} w={1.04} h={1.5} />
      <group rotation={[0, Math.PI / 2, 0]}>
        <Panel cx={0} cy={1.9} z={-(0.9 + 0.625) - 0.01} w={1.9} h={1.9} />
      </group>
      {/* corner edge extrusions for the tower */}
      {([[0.29, FZ], [1.51, FZ], [0.29, -FZ], [1.51, -FZ]] as const).map(([x, z], i) => (
        <Extrusion key={i} pos={[x, 1.72, z]} size={[0.1, 2.96, 0.1]} />
      ))}
      <Body pos={[0.32, 1.86, FZ + 0.02]} size={[0.07, 2.74, 0.02]} material={mats.yellow} radius={0.008} cast={false} />
      <Body pos={[1.48, 1.86, FZ + 0.02]} size={[0.07, 2.74, 0.02]} material={mats.yellow} radius={0.008} cast={false} />

      {/* angled HMI console */}
      <group position={[0.9, 1.52, FZ + 0.02]} rotation={[-0.18, 0, 0]}>
        <Body pos={[0, 0, 0]} size={[0.66, 0.5, 0.1]} material={mats.anodized} radius={0.02} />
        <mesh position={[0, 0.02, 0.055]} material={mats.bezel}>
          <boxGeometry args={[0.6, 0.42, 0.02]} />
        </mesh>
        <mesh position={[0, 0.02, 0.068]} material={mats.screen}>
          <planeGeometry args={[0.52, 0.36]} />
        </mesh>
        {([[-0.16, emis.green], [-0.07, emis.amber], [0.02, emis.blue]] as const).map(([x, m], i) => (
          <mesh key={i} position={[x, -0.16, 0.06]} rotation={[Math.PI / 2, 0, 0]} material={m}>
            <cylinderGeometry args={[0.02, 0.02, 0.025, 12]} />
          </mesh>
        ))}
        {([[0.12, emis.red], [0.22, emis.green]] as const).map(([x, m], i) => (
          <group key={i}>
            <mesh position={[x, -0.16, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={mats.bezel}>
              <cylinderGeometry args={[0.032, 0.032, 0.03, 14]} />
            </mesh>
            <mesh position={[x, -0.16, 0.067]} rotation={[Math.PI / 2, 0, 0]} material={m}>
              <cylinderGeometry args={[0.024, 0.024, 0.02, 14]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* emergency stop on yellow housing */}
      <group position={[0.9, 1.12, FZ + 0.03]}>
        <Body pos={[0, 0, 0]} size={[0.22, 0.22, 0.04]} material={mats.yellow} radius={0.015} />
        <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={mats.bezel}>
          <cylinderGeometry args={[0.062, 0.062, 0.04, 20]} />
        </mesh>
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={emis.estop}>
          <cylinderGeometry args={[0.056, 0.05, 0.05, 20]} />
        </mesh>
      </group>
      <NamePlate pos={[0.9, 0.62, FZ + 0.03]} />

      {/* stack light */}
      <group position={[0.55, 3.18, 0.6]}>
        <mesh position={[0, -0.14, 0]} material={mats.anodized}>
          <cylinderGeometry args={[0.022, 0.022, 0.26, 10]} />
        </mesh>
        <mesh position={[0, 0.04, 0]} material={emis.red}>
          <cylinderGeometry args={[0.068, 0.068, 0.11, 18]} />
        </mesh>
        <mesh position={[0, 0.15, 0]} material={emis.amber}>
          <cylinderGeometry args={[0.068, 0.068, 0.11, 18]} />
        </mesh>
        <mesh position={[0, 0.26, 0]} material={emis.green}>
          <cylinderGeometry args={[0.068, 0.068, 0.11, 18]} />
        </mesh>
        <mesh position={[0, 0.34, 0]} material={mats.bezel}>
          <cylinderGeometry args={[0.068, 0.05, 0.03, 18]} />
        </mesh>
      </group>

      {/* top service pipe + exterior conduit + junction box */}
      <mesh geometry={tubeGeo} material={mats.chrome} castShadow />
      {!perfMode && (
        <>
          <mesh geometry={conduitGeo} material={mats.anodized} />
          <Body pos={[1.55, 2.5, -1.2]} size={[0.22, 0.3, 0.14]} material={mats.anodized} radius={0.02} />
          <Vents pos={[0.9, 1.0, -FZ - 0.04]} count={5} w={0.7} />
          <BoltRow xs={[0.5, 1.3]} y={2.52} z={-FZ - 0.02} />
        </>
      )}

      {/* =================== PROCESS EXTENSION (right) =================== */}
      <Body pos={[2.5, 1.2, 0]} size={[1.4, 1.95, 2.4]} radius={0.045} />
      <Body pos={[2.5, 0.42, FZ - 0.04]} size={[1.22, 0.08, 0.02]} material={mats.yellow} radius={0.01} cast={false} />
      {/* framed inspection windows (dark glass) */}
      {[-0.42, 0.42].map((dx) => (
        <group key={dx}>
          <Body pos={[2.5 + dx, 1.55, FZ - 0.03]} size={[0.46, 0.68, 0.05]} material={mats.frame} radius={0.012} cast={false} />
          <mesh position={[2.5 + dx, 1.55, FZ - 0.01]} material={mats.darkGlass}>
            <boxGeometry args={[0.36, 0.58, 0.02]} />
          </mesh>
          {!perfMode &&
            ([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).map(([sx, sy], i) => (
              <Bolt key={i} pos={[2.5 + dx + sx * 0.2, 1.55 + sy * 0.31, FZ]} />
            ))}
        </group>
      ))}
      {/* lower framed access panel */}
      <Panel cx={2.5} cy={0.78} z={FZ - 0.02} w={1.1} h={0.5} />
      {/* side service door with handle + hinges (on +X end) */}
      <Body pos={[3.21, 1.2, 0]} size={[0.03, 1.7, 2.1]} material={mats.recess} radius={0.012} />
      <group rotation={[0, Math.PI / 2, 0]}>
        <Panel cx={0} cy={1.2} z={3.22} w={1.9} h={1.4} />
      </group>
      <group position={[3.27, 1.2, 0.55]} rotation={[0, Math.PI / 2, 0]}>
        <Handle pos={[0, 0, 0]} h={0.34} />
      </group>
      {/* extension vents + exit rollers */}
      <Vents pos={[2.5, 1.55, -FZ + 0.03]} count={6} w={0.9} rot={[0, Math.PI, 0]} />
      {!perfMode &&
        [0, 0.17].map((d, i) => (
          <mesh key={i} position={[3.35 + d, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.chrome}>
            <cylinderGeometry args={[0.048, 0.048, 1.5, 12]} />
          </mesh>
        ))}

      {/* =================== BASE SUB-FRAME + FEET =================== */}
      <Body pos={[0.1, 0.2, 0]} size={[6.2, 0.12, 2.3]} material={mats.satin} radius={0.02} cast={false} />
      <Body pos={[0.1, 0.2, FZ - 0.02]} size={[6.0, 0.1, 0.03]} material={mats.anodized} radius={0.008} cast={false} />
      {([
        [-2.75, 1.05],
        [-0.2, 1.05],
        [-2.75, -1.05],
        [-0.2, -1.05],
        [1.45, 1.05],
        [1.45, -1.05],
        [2.95, 1.0],
        [2.95, -1.0],
      ] as const).map(([x, z], i) => (
        <Foot key={i} x={x} z={z} />
      ))}

      {/* interior lighting */}
      <pointLight position={[-1.45, 1.4, 0]} intensity={perfMode ? 3 : 5.5} distance={3.8} color="#ffcf4d" />
      <pointLight position={[-1.3, 2.0, 1.2]} intensity={perfMode ? 1.8 : 3} distance={4.6} color="#eaf1ff" />
    </group>
  );
}
