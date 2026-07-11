import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Toronto Maple Leafs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered by Next at build time. Uses system fonts only: loading Anton here would
// mean shipping the font binary to the edge for one image, which is not worth it.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #00205B 0%, #05132B 60%)",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#63B3FF",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#63B3FF" }} />
          Est. 1917
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              lineHeight: 1,
              color: "#FFFFFF",
              letterSpacing: -2,
            }}
          >
            Toronto Maple Leafs
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#E8F1FF", opacity: 0.75 }}>
            Schedule, roster, standings and match centre
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#E8F1FF",
            opacity: 0.55,
          }}
        >
          <div style={{ display: "flex" }}>Scotiabank Arena · Toronto, ON</div>
          <div style={{ display: "flex" }}>Concept redesign</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
