import type { CSSProperties, ComponentProps } from "react"

export type ChartDonutProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const radius = 32
const circumference = 2 * Math.PI * radius

// Share of the ring for each segment, with a small gap after each.
const gap = 3
const segments = [
  { share: 44, opacity: 1 },
  { share: 28, opacity: 0.6 },
  { share: 19, opacity: 0.35 },
].map((segment, i, all) => ({
  ...segment,
  length: (segment.share / 100) * circumference,
  start: all.slice(0, i).reduce((sum, s) => sum + s.share + gap, 0),
}))

// Each segment sweeps in just as the previous one lands, holds, then unwinds
// from its tail in the same order, so the ring fills and empties clockwise.
const draw = [
  [0, 20],
  [17, 33],
  [30, 42],
]
const erase = [
  [56, 70],
  [67, 79],
  [76, 86],
]
const fillFrames = segments
  .map(({ length }, i) => {
    const [drawStart, drawEnd] = draw[i]
    const [eraseStart, eraseEnd] = erase[i]
    const empty = `stroke-dasharray: 0 ${circumference}`
    const full = `stroke-dasharray: ${length} ${circumference}; stroke-dashoffset: 0`
    return `@keyframes chart-donut-loader-fill-${i} { 0%, ${drawStart}% { ${empty}; stroke-dashoffset: 0; animation-timing-function: cubic-bezier(.4, 0, .6, 1); } ${drawEnd}%, ${eraseStart}% { ${full}; animation-timing-function: cubic-bezier(.4, 0, .6, 1); } ${eraseEnd}%, 100% { ${empty}; stroke-dashoffset: -${length}; } }`
  })
  .join("\n        ")

export function ChartDonut({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDonutProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-donut-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
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
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="chart-donut-loader-track"
        />
        <g className="chart-donut-loader-segments">
          {segments.map(({ length, opacity, start }, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              transform={`rotate(${-90 + start * 3.6} 50 50)`}
              className="chart-donut-loader-segment"
              style={{
                opacity,
                strokeDasharray: `${length} ${circumference}`,
                animationName: `chart-donut-loader-fill-${i}`,
              }}
            />
          ))}
        </g>
      </svg>
      <style>{`
        .chart-donut-loader { display: inline-flex; flex-shrink: 0; }
        .chart-donut-loader-track { fill: none; stroke: currentColor; stroke-width: 14; opacity: .12; }
        .chart-donut-loader-segments { transform-origin: 50px 50px; animation: chart-donut-loader-turn var(--loader-duration) linear infinite; }
        .chart-donut-loader-segment { fill: none; stroke: currentColor; stroke-width: 14; animation-duration: var(--loader-duration); animation-timing-function: linear; animation-iteration-count: infinite; }
        ${fillFrames}
        @keyframes chart-donut-loader-turn { from { transform: rotate(0deg); } to { transform: rotate(120deg); } }
        @media (prefers-reduced-motion: reduce) { .chart-donut-loader-segments, .chart-donut-loader-segment { animation: none !important; } }
      `}</style>
    </span>
  )
}
