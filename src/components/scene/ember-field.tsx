"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "./use-scene-store";

const BOUNDS = { x: 14, y: 9, z: 6 };

// Deterministic PRNG (mulberry32) — keeps the buffer-building memo pure
// (react-hooks/purity forbids Math.random during render) and makes the
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

export function EmberField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const camGroup = useRef<THREE.Group>(null);

  const { positions, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const ember = new THREE.Color("#ea580c");
    const amber = new THREE.Color("#f59e0b");
    const rand = mulberry32(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * BOUNDS.x * 2;
      positions[i * 3 + 1] = (rand() - 0.5) * BOUNDS.y * 2;
      positions[i * 3 + 2] = (rand() - 0.5) * BOUNDS.z * 2;
      speeds[i] = 0.15 + rand() * 0.5;
      const c = ember.clone().lerp(amber, rand() * 0.6);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, speeds, colors };
  }, [count]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const { temperature, pointer } = useSceneStore.getState();
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position.array as Float32Array;
    const speedScale = 0.4 + temperature * 0.9;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * dt * speedScale;
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 0.5 + i) * dt * 0.06;
      if (pos[i * 3 + 1] > BOUNDS.y) pos[i * 3 + 1] = -BOUNDS.y;
    }
    geo.attributes.position.needsUpdate = true;

    const mat = points.current!.material as THREE.PointsMaterial;
    mat.opacity = 0.25 + temperature * 0.55;
    mat.size = 0.035 + temperature * 0.03;

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
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
