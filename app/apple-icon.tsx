import { ImageResponse } from "next/og"
import { OG_COLORS, OgMark } from "@/lib/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// iOS masks the corners and ignores transparency, so the mark sits on paper.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: OG_COLORS.paper,
      }}
    >
      <OgMark cell={30} gap={15} />
    </div>,
    size
  )
}
