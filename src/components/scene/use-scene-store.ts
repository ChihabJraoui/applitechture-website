import { create } from "zustand";

type SceneState = {
  /** 0..1 — scene intensity driven by scroll position (hero hot, content calm, CTA flare) */
  temperature: number;
  /** -1..1 normalized pointer, written by SceneCanvas, read per-frame */
  pointer: { x: number; y: number };
  setTemperature: (t: number) => void;
  setPointer: (x: number, y: number) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  temperature: 1,
  pointer: { x: 0, y: 0 },
  setTemperature: (temperature) => set({ temperature }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
}));
