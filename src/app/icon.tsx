import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        // Hex values mirror the brand tokens in globals.css — Satori can't resolve CSS variables.
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0705",
        color: "#faf3ee",
        fontSize: 22,
        fontWeight: 700,
        borderRadius: 6,
      }}
    >
      e<span style={{ color: "#ea580c" }}>.</span>
    </div>,
    size,
  );
}
