import { ImageResponse } from "next/og"
import { getLoaderSummaries } from "@/lib/loader-items"
import { CATEGORIES } from "@/lib/loaders"
import { OG_COLORS, OG_SIZE, OgBrand } from "@/lib/og"

const { paper: PAPER, ink: INK, muted: MUTED, border: BORDER } = OG_COLORS

export const alt = "loadercn loader preview"
export const size = OG_SIZE
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
  if (category === "network") {
    return (
      <svg width="220" height="220" viewBox="0 0 100 100">
        <path
          d="M50 16L24 48L16 82M24 48L40 82M50 16L76 48L60 82M76 48L84 82"
          fill="none"
          stroke={INK}
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        {[
          [50, 16],
          [24, 48],
          [76, 48],
          [16, 82],
          [40, 82],
          [60, 82],
          [84, 82],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill={INK}
            opacity={i < 3 ? 1 : 0.5}
          />
        ))}
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
        <OgBrand />
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
