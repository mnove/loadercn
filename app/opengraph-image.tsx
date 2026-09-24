import { ImageResponse } from "next/og"
import { getLoaderSummaries } from "@/lib/loader-items"
import { OG_COLORS, OG_SIZE, OgBrand, OgMark } from "@/lib/og"

export const alt =
  "loadercn — Worth the wait. Animated React loaders for shadcn."
export const size = OG_SIZE
export const contentType = "image/png"

export default function Image() {
  const count = getLoaderSummaries().length

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: OG_COLORS.paper,
        color: OG_COLORS.ink,
        padding: 72,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <OgBrand />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, letterSpacing: -4 }}>
            Worth the wait
            <span style={{ color: OG_COLORS.primary, marginLeft: -4 }}>.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: OG_COLORS.muted,
              marginTop: 24,
              maxWidth: 620,
            }}
          >
            {`${count} animated grid, orbital, classic, and network loaders for React.`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: OG_COLORS.muted,
            borderTop: `1px solid ${OG_COLORS.border}`,
            paddingTop: 24,
            width: 640,
          }}
        >
          React + CSS · zero dependencies · shadcn CLI
        </div>
      </div>
      <div
        style={{
          width: 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${OG_COLORS.border}`,
          backgroundImage: `radial-gradient(${OG_COLORS.border} 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      >
        <OgMark cell={60} gap={30} />
      </div>
    </div>,
    size
  )
}
