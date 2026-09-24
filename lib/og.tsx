// Theme tokens from globals.css, in hex because Satori doesn't parse oklch.
export const OG_COLORS = {
  paper: "#fbfaf8",
  ink: "#0c0a09",
  muted: "#79716b",
  border: "#e7e5e4",
  primary: "#d84a00",
}

export const OG_SIZE = { width: 1200, height: 630 }

/** The site mark: a 3×3 grid with two faded corners, as in components/mark. */
export function OgMark({ cell = 9, gap = 4 }: { cell?: number; gap?: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: cell * 3 + gap * 2,
        gap,
      }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          style={{
            width: cell,
            height: cell,
            background: OG_COLORS.primary,
            opacity: i === 2 || i === 6 ? 0.3 : 1,
          }}
        />
      ))}
    </div>
  )
}

export function OgBrand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <OgMark />
      <div style={{ display: "flex", fontSize: 34, letterSpacing: -1.5 }}>
        loadercn<span style={{ color: OG_COLORS.primary }}>.</span>
      </div>
    </div>
  )
}
