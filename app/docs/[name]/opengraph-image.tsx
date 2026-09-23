import { ImageResponse } from "next/og"
import { getLoaderSummaries } from "@/lib/loader-items"
import { CATEGORIES } from "@/lib/loaders"

// Theme tokens from globals.css, in hex because Satori doesn't parse oklch.
const PAPER = "#fbfaf8"
const INK = "#0c0a09"
const MUTED = "#79716b"
const BORDER = "#e7e5e4"
const PRIMARY = "#d84a00"

export const alt = "loadercn loader preview"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return getLoaderSummaries().map((item) => ({ name: item.name }))
}

/**
 * Satori can't run the loaders' CSS animations, so each family gets a
 * static illustration drawn with SVG.
 */
function FamilyGlyph({ category }: { category: string }) {
  if (category === "grid") {
    return (
      <svg width="220" height="220" viewBox="0 0 3 3">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          return (
            <rect
              key={i}
              x={col + 0.12}
              y={row + 0.12}
              width="0.76"
              height="0.76"
              rx="0.1"
              fill={INK}
              opacity={0.2 + ((row + col) / 4) * 0.8}
            />
          )
        })}
      </svg>
    )
  }
  if (category === "orbital") {
    return (
      <svg width="240" height="240" viewBox="-54 -54 108 108">
        {[0, 60, 120].map((angle) => (
          <ellipse
            key={angle}
            rx="46"
            ry="18"
            fill="none"
            stroke={INK}
            strokeOpacity="0.25"
            strokeWidth="1.5"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="6" fill={INK} />
        <circle cx="46" r="4.5" fill={INK} transform="rotate(60)" />
        <circle cx="-46" r="4.5" fill={INK} transform="rotate(120)" />
        <circle cx="46" r="4.5" fill={INK} />
      </svg>
    )
  }
  return (
    <svg width="220" height="220" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={INK}
        strokeOpacity="0.18"
        strokeWidth="10"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={INK}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="90 252"
        transform="rotate(-90 50 50)"
      />
    </svg>
  )
}

export default async function Image({ params }: PageProps<"/docs/[name]">) {
  const { name } = await params
  const item = getLoaderSummaries().find((i) => i.name === name)
  const category = item?.category ?? "grid"
  const label = CATEGORIES.find((c) => c.id === category)?.label ?? category

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: PAPER,
        color: INK,
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 36, gap: 4 }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 9,
                  height: 9,
                  background: PRIMARY,
                  opacity: i === 2 || i === 6 ? 0.3 : 1,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 34, letterSpacing: -1.5 }}>
            loadercn<span style={{ color: PRIMARY }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              color: MUTED,
              textTransform: "uppercase",
            }}
          >
            {`${label} loader`}
          </div>
          <div
            style={{
              fontSize: (item?.title.length ?? 0) > 14 ? 68 : 88,
              letterSpacing: -3,
              lineHeight: 1.05,
              marginTop: 20,
            }}
          >
            {item?.title ?? "loadercn"}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: MUTED,
              marginTop: 24,
              maxWidth: 640,
            }}
          >
            {item?.description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: MUTED,
            borderTop: `1px solid ${BORDER}`,
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
          border: `1px solid ${BORDER}`,
          backgroundImage: `radial-gradient(${BORDER} 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      >
        <FamilyGlyph category={category} />
      </div>
    </div>,
    size
  )
}
