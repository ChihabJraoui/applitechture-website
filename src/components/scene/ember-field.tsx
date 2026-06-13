"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "./use-scene-store";

const BOUNDS = { x: 14, y: 9, z: 6 };

// Deterministic PRNG (mulberry32) — keeps the buffer-building memo pure and the
// field stable for a given particle count.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Heat ramp endpoints — deep ember → amber → white-hot.
const COOL = new THREE.Color("#9a3412");
const MID = new THREE.Color("#f59e0b");
const HOT = new THREE.Color("#fff7ed");
const scratch = new THREE.Color();

export function EmberField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const camGroup = useRef<THREE.Group>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const rand = mulberry32(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * BOUNDS.x * 2;
      positions[i * 3 + 1] = (rand() - 0.5) * BOUNDS.y * 2;
      positions[i * 3 + 2] = (rand() - 0.5) * BOUNDS.z * 2;
      speeds[i] = 0.15 + rand() * 0.5;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const { temperature, pointer } = useSceneStore.getState();
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position.array as Float32Array;
    const speedScale = 0.4 + temperature * 1.0;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * dt * speedScale;
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 0.5 + i) * dt * 0.06;
      if (pos[i * 3 + 1] > BOUNDS.y) pos[i * 3 + 1] = -BOUNDS.y;
    }
    geo.attributes.position.needsUpdate = true;

    // Color = temperature: red-ember → amber → white-hot, two-stage lerp.
    const t = temperature;
    if (t < 0.5) scratch.copy(COOL).lerp(MID, t * 2);
    else scratch.copy(MID).lerp(HOT, (t - 0.5) * 2);

    const mat = points.current!.material as THREE.PointsMaterial;
    mat.color.copy(scratch);
    mat.opacity = 0.2 + temperature * 0.6;
    mat.size = 0.03 + temperature * 0.05;

    if (camGroup.current) {
      camGroup.current.rotation.y +=
        (pointer.x * 0.06 - camGroup.current.rotation.y) * 0.05;
      camGroup.current.rotation.x +=
        (-pointer.y * 0.04 - camGroup.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={camGroup}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={COOL}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
