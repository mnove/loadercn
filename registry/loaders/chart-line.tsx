import type { CSSProperties, ComponentProps } from "react"

export type ChartLineProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const points = [
  [16, 70],
  [30, 56],
  [44, 62],
  [58, 38],
  [72, 46],
  [86, 24],
]

// The line draws during the first 60% of the cycle. Spacing the dot's
// keyframes by segment length keeps it on the leading end of the stroke.
const lengths = points
  .slice(1)
  .map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]))
const total = lengths.reduce((sum, length) => sum + length, 0)
const dotFrames = points
  .map(([x, y], i) => {
    const traveled = lengths.slice(0, i).reduce((sum, l) => sum + l, 0)
    const percent = ((traveled / total) * 60).toFixed(2)
    return `${percent}% { transform: translate(${x}px, ${y}px); opacity: 1; }`
  })
  .join(" ")

export function ChartLine({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartLineProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-line-loader", className].filter(Boolean).join(" ")}
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
        <path d="M12 14V84H88" className="chart-line-loader-axis" />
        <polyline
          points={points.map((point) => point.join(",")).join(" ")}
          pathLength="100"
          className="chart-line-loader-line"
        />
        <circle r="5" className="chart-line-loader-dot" />
      </svg>
      <style>{`
        .chart-line-loader { display: inline-flex; flex-shrink: 0; }
        .chart-line-loader-axis { fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; opacity: .3; }
        .chart-line-loader-line { fill: none; stroke: currentColor; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 100 100; animation: chart-line-loader-draw var(--loader-duration) linear infinite; }
        .chart-line-loader-dot { fill: currentColor; transform: translate(86px, 24px); animation: chart-line-loader-dot var(--loader-duration) linear infinite; }
        @keyframes chart-line-loader-draw { 0% { stroke-dashoffset: 100; opacity: 1; } 60%, 82% { stroke-dashoffset: 0; opacity: 1; } 96%, 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes chart-line-loader-dot { ${dotFrames} 82% { transform: translate(86px, 24px); opacity: 1; } 96%, 100% { transform: translate(86px, 24px); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .chart-line-loader-line, .chart-line-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
