"use client";

import dynamic from "next/dynamic";
import { Component, useSyncExternalStore, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/motion-provider";

const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticBackdrop() {
  return <div className="ember-backdrop" aria-hidden />;
}

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Hydration-safe "is mounted" flag: false on the server and during the
// hydration render, true on the client afterwards. Avoids setState-in-effect.
const emptySubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

export function SceneRoot() {
  const reduced = useReducedMotion();
  // Render the static backdrop on the server and during hydration; swap in
  // the canvas only after mount so SSR markup always matches the client.
  const mounted = useMounted();

  const wantsScene = mounted && !reduced && webglAvailable();

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      {wantsScene ? (
        <SceneErrorBoundary fallback={<StaticBackdrop />}>
          <SceneCanvas />
        </SceneErrorBoundary>
      ) : (
        <StaticBackdrop />
      )}
    </div>
  );
}
