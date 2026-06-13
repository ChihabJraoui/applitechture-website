"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { EmberField } from "./ember-field";
import { useSceneStore } from "./use-scene-store";

// This component is loaded with `dynamic(..., { ssr: false })`, so it only
// ever renders in the browser — the server snapshots below exist purely to
// satisfy useSyncExternalStore's contract.

const COARSE_QUERY = "(pointer: coarse)";

function subscribeCoarse(callback: () => void) {
  const mq = window.matchMedia(COARSE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export default function SceneCanvas({
  onContextLost,
}: {
  onContextLost?: () => void;
}) {
  const coarse = useSyncExternalStore(
    subscribeCoarse,
    () => window.matchMedia(COARSE_QUERY).matches,
    () => false,
  );
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );

  const count = coarse ? 600 : 2400;
  const frameloop: "always" | "never" = hidden ? "never" : "always";

  useEffect(() => {
    if (coarse) return;
    const onMove = (e: PointerEvent) => {
      useSceneStore
        .getState()
        .setPointer(
          (e.clientX / window.innerWidth) * 2 - 1,
          (e.clientY / window.innerHeight) * 2 - 1,
        );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [coarse]);

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: false, powerPreference: "low-power" }}
      aria-hidden
      className="pointer-events-none"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => {
            e.preventDefault();
            onContextLost?.();
          },
          { once: true },
        );
      }}
    >
      {/* Fog must live on the scene itself — inside a <group> it would
          silently attach to group.fog, which the renderer ignores. */}
      <fog attach="fog" args={["#0c0a09", 6, 16]} />
      <EmberField count={count} />
    </Canvas>
  );
}
