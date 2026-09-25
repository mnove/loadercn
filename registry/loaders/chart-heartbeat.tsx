import type { CSSProperties, ComponentProps } from "react"

export type ChartHeartbeatProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// One beat, as offsets from its start on the baseline.
const beat = [
  [0, 0],
  [6, 0],
  [8, -4],
  [10, 0],
  [14, 0],
  [15.5, 4],
  [18, -26],
  [20.5, 10],
  [22, 0],
  [27, 0],
  [30, -6],
  [33, 0],
  [38, 0],
]
const points = [12, 50].flatMap((start, i) =>
  beat.slice(i ? 1 : 0).map(([x, y]) => [start + x, 56 + y])
)

// The trail's length and the total distance its head travels, in path units.
const trail = 35
const travel = 100 + trail
const layers = 5

// The head reaches the end of the trace before the trail drains away. Spacing
// the dot's keyframes by segment length keeps it on the head of the stroke.
const lengths = points
  .slice(1)
  .map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]))
const total = lengths.reduce((sum, length) => sum + length, 0)
const arrive = (100 / travel) * 100
const dotFrames = points
  .map(([x, y], i) => {
    const traveled = lengths.slice(0, i).reduce((sum, l) => sum + l, 0)
    const percent = ((traveled / total) * arrive).toFixed(2)
    const opacity = i === 0 ? 0 : 1
    return `${percent}% { transform: translate(${x}px, ${y}px); opacity: ${opacity}; }`
  })
  .join(" ")
const [endX, endY] = points[points.length - 1]

export function ChartHeartbeat({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartHeartbeatProps) {
  const line = points.map((point) => point.join(",")).join(" ")
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-heartbeat-loader", className]
        .filter(Boolean)
        .join(" ")}
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
        <polyline points={line} className="chart-heartbeat-loader-ghost" />
        {/* Stacked trails of decreasing length fade the line behind the dot. */}
        {Array.from({ length: layers }, (_, layer) => (
          <polyline
            key={layer}
            points={line}
            pathLength="100"
            className="chart-heartbeat-loader-trail"
            style={
              {
                "--chart-heartbeat-length": (
                  (trail * (layers - layer)) /
                  layers
                ).toFixed(2),
              } as CSSProperties
            }
          />
        ))}
        <circle r="3.6" className="chart-heartbeat-loader-dot" />
      </svg>
      <style>{`
        .chart-heartbeat-loader { display: inline-flex; flex-shrink: 0; }
        .chart-heartbeat-loader-ghost, .chart-heartbeat-loader-trail { fill: none; stroke: currentColor; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
        .chart-heartbeat-loader-ghost { opacity: .14; }
        .chart-heartbeat-loader-trail { opacity: .4; stroke-dasharray: calc(var(--chart-heartbeat-length) * 1px) 300px; stroke-dashoffset: calc((var(--chart-heartbeat-length) - 100) * 1px); animation: chart-heartbeat-loader-trace var(--loader-duration) linear infinite; }
        .chart-heartbeat-loader-dot { fill: currentColor; transform: translate(${endX}px, ${endY}px); animation: chart-heartbeat-loader-dot var(--loader-duration) linear infinite; }
        @keyframes chart-heartbeat-loader-trace { from { stroke-dashoffset: calc(var(--chart-heartbeat-length) * 1px); } to { stroke-dashoffset: calc((var(--chart-heartbeat-length) - ${travel}) * 1px); } }
        @keyframes chart-heartbeat-loader-dot { ${dotFrames} ${(arrive + 8).toFixed(2)}%, 100% { transform: translate(${endX}px, ${endY}px); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .chart-heartbeat-loader-trail, .chart-heartbeat-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
