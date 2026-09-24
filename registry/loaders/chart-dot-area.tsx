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

// Dots under the curve stay lit, the surface row glows brightest, and dots
// above it shrink away.
const appearance = (height: string) => {
  const depth = `(${height} - var(--chart-dot-area-row))`
  return `opacity: clamp(.07, min((${depth} + .6) * 1.6, 1.05 - ${depth} * .09), 1); transform: scale(clamp(.5, min((${depth} + 1) * .9, 1.3 - ${depth} * .05), 1.15));`
}

const flowFrames = Array.from(
  { length: 25 },
  (_, step) =>
    `${((step / 24) * 100).toFixed(2)}% { ${appearance(level(step / 24).toFixed(3))} }`
).join("\n")

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
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        {Array.from({ length: columns }, (_, column) => {
          // Later columns trail earlier ones, so the wave rolls left to right.
          const progress = (1 - column * shift) % 1
          return Array.from({ length: rows }, (_, row) => (
            <circle
              key={`${column}-${row}`}
              cx={16 + column * (68 / (columns - 1))}
              cy={82 - row * 7}
              r="2.1"
              className="chart-dot-area-loader-dot"
              style={
                {
                  "--chart-dot-area-row": row,
                  "--chart-dot-area-rest": level(progress).toFixed(3),
                  animationDelay: `${-progress * duration}s`,
                } as CSSProperties
              }
            />
          ))
        })}
      </svg>
      <style>{`
        .chart-dot-area-loader { display: inline-flex; flex-shrink: 0; }
        .chart-dot-area-loader-dot { fill: currentColor; transform-box: fill-box; transform-origin: center; ${appearance("var(--chart-dot-area-rest)")} animation: chart-dot-area-loader-flow var(--loader-duration) linear infinite; }
        @keyframes chart-dot-area-loader-flow { ${flowFrames} }
        @media (prefers-reduced-motion: reduce) { .chart-dot-area-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
