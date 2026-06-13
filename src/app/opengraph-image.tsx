import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        // Hex values mirror the brand tokens in globals.css — Satori can't resolve CSS variables.
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0b0705",
        color: "#faf3ee",
      }}
    >
      <div style={{ fontSize: 36, fontWeight: 600, display: "flex" }}>
        emberworks<span style={{ color: "#ea580c" }}>.</span>
      </div>
      <div style={{ fontSize: 72, marginTop: 32, fontWeight: 500 }}>
        {site.tagline}
      </div>
      <div
        style={{
          fontSize: 28,
          marginTop: 24,
          color: "#b3a79d",
          maxWidth: 800,
        }}
      >
        {site.description}
      </div>
    </div>,
    size,
  );
}
