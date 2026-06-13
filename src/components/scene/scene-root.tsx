"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
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

let webglProbe: boolean | null = null;
function webglAvailable(): boolean {
  if (webglProbe !== null) return webglProbe;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglProbe = !!gl;
    (gl as WebGLRenderingContext | null)
      ?.getExtension("WEBGL_lose_context")
      ?.loseContext();
  } catch {
    webglProbe = false;
  }
  return webglProbe;
}

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function SceneRoot() {
  const reduced = useReducedMotion();
  // Defer mounting the WebGL canvas until the browser is idle so first paint
  // and LCP (hero text) land before Three.js parse/exec. The static backdrop
  // renders on the server, during hydration, and throughout the deferral; the
  // canvas swaps in once `ready` flips true on idle.
  const [ready, setReady] = useState(false);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    if (typeof idleWindow.requestIdleCallback === "function") {
      const handle = idleWindow.requestIdleCallback(() => setReady(true), {
        timeout: 2500,
      });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }
    // Safari fallback: no requestIdleCallback support.
    const timer = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  const webglOk = ready && webglAvailable();
  const wantsScene = ready && !reduced && !lost && webglOk;

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      {wantsScene ? (
        <SceneErrorBoundary fallback={<StaticBackdrop />}>
          <SceneCanvas onContextLost={() => setLost(true)} />
        </SceneErrorBoundary>
      ) : (
        <StaticBackdrop />
      )}
    </div>
  );
}
