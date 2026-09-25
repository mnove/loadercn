import type { CSSProperties, ComponentProps } from "react"

export type ChartDotAreaProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const columns = 12
const rows = 9
const shift = 0.06

// Height of the curve, in rows. Two harmonics keep the crest organic.
const level = (t: number) =>
  4 + 2.2 * Math.sin(2 * Math.PI * t) + 1.1 * Math.sin(4 * Math.PI * t + 1.2)

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max)

// Dots under the curve stay lit, the surface row glows brightest, and dots
// above it shrink away.
const appearance = (height: number, row: number) => {
  const depth = Number(height.toFixed(3)) - row
  const opacity = clamp(
    0.07,
    Math.min((depth + 0.6) * 1.6, 1.05 - depth * 0.09),
    1
  )
  const scale = clamp(
    0.5,
    Math.min((depth + 1) * 0.9, 1.3 - depth * 0.05),
    1.15
  )
  return {
    opacity: opacity.toFixed(3),
    transform: `scale(${scale.toFixed(3)})`,
  }
}

// Each row gets its own keyframes, so they hold no custom properties and the
// browser can run them on the compositor.
const flowFrames = Array.from({ length: rows }, (_, row) => {
  const frames = Array.from({ length: 25 }, (_, step) => {
    const { opacity, transform } = appearance(level(step / 24), row)
    return `${((step / 24) * 100).toFixed(2)}% { opacity: ${opacity}; transform: ${transform}; }`
  }).join("\n")
  return `@keyframes chart-dot-area-loader-flow-${row} { ${frames} }
    .chart-dot-area-loader-row-${row} { animation-name: chart-dot-area-loader-flow-${row}; }`
}).join("\n")

export function ChartDotArea({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotAreaProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-dot-area-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${duration}s`,
          ...style,
        } as CSSProperties
      }
    >
      {Array.from({ length: columns }, (_, column) => {
        // Later columns trail earlier ones, so the wave rolls left to right.
        const progress = (1 - column * shift) % 1
        return Array.from({ length: rows }, (_, row) => (
          <span
            key={`${column}-${row}`}
            aria-hidden="true"
            className={`chart-dot-area-loader-dot chart-dot-area-loader-row-${row}`}
            style={{
              left: `${(16 + column * (68 / (columns - 1)) - 2.1).toFixed(3)}%`,
              top: `${82 - row * 7 - 2.1}%`,
              ...appearance(level(progress), row),
              animationDelay: `${-progress * duration}s`,
            }}
          />
        ))
      })}
      <style>{`
        .chart-dot-area-loader { position: relative; display: inline-flex; flex-shrink: 0; }
        .chart-dot-area-loader-dot { position: absolute; width: 4.2%; height: 4.2%; border-radius: 50%; background: currentColor; animation: chart-dot-area-loader-flow-0 var(--loader-duration) linear infinite; }
        ${flowFrames}
        @media (prefers-reduced-motion: reduce) { .chart-dot-area-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
