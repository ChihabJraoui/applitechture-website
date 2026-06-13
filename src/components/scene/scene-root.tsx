"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
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
  const [lost, setLost] = useState(false);

  const webglOk = mounted && webglAvailable();
  const wantsScene = mounted && !reduced && !lost && webglOk;

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
