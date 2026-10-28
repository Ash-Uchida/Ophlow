import { ImageResponse } from "next/og";

/** The picture shown when someone shares a link to the site (texts, Slack, LinkedIn). */
export const alt = "Ophlow — the clipboard is the bottleneck. One simple system for housekeeping, dining and maintenance.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#1a3221", color: "#f6f1e8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: 18, background: "#0f1f14" }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, border: "7px solid #f6f1e8" }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Ophlow</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>The clipboard is the bottleneck.</div>
          <div style={{ fontSize: 32, lineHeight: 1.35, color: "#b3cdb7", maxWidth: 940 }}>
            One simple system for housekeeping, dining and maintenance teams. Big buttons, timestamps, no training manual.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 26, fontWeight: 600 }}>
          <div style={{ display: "flex", padding: "12px 26px", borderRadius: 999, background: "#f6f1e8", color: "#1a3221" }}>Book a demo</div>
          <div style={{ display: "flex", padding: "12px 26px", borderRadius: 999, background: "#b85a36", color: "#ffffff" }}>Get started</div>
        </div>
      </div>
    ),
    size,
  );
}
