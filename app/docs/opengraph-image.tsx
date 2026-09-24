import { ImageResponse } from "next/og"
import { installCommand } from "@/lib/site"
import { OG_COLORS, OG_SIZE, OgBrand } from "@/lib/og"

export const alt =
  "Get started with loadercn — install loaders with the shadcn CLI"
export const size = OG_SIZE
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: OG_COLORS.paper,
        color: OG_COLORS.ink,
        padding: 72,
      }}
    >
      <OgBrand />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 3,
            color: OG_COLORS.muted,
            textTransform: "uppercase",
          }}
        >
          Documentation
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            letterSpacing: -4,
            lineHeight: 1.05,
            marginTop: 20,
          }}
        >
          Get started
          <span style={{ color: OG_COLORS.primary, marginLeft: -4 }}>.</span>
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: OG_COLORS.muted,
            marginTop: 24,
            maxWidth: 820,
          }}
        >
          Each loader is a single React component with inline CSS and no
          dependencies.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 24,
          fontFamily: "monospace",
          border: `1px solid ${OG_COLORS.border}`,
          background: "#ffffff",
          padding: "20px 28px",
          alignSelf: "flex-start",
        }}
      >
        <span style={{ color: OG_COLORS.primary }}>$</span>
        {installCommand("classic-ring")}
      </div>
    </div>,
    size
  )
}
