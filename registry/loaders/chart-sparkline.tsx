import type { CSSProperties, ComponentProps } from "react"

export type ChartSparklineProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// One period of values. The path repeats it twice so it can scroll one
// period to the left and loop without a seam.
const values = [58, 44, 50, 30, 46, 38, 62, 48]
const step = 9
const period = values.length * step
const line = Array.from(
  { length: values.length * 2 + 1 },
  (_, i) => `${i * step},${values[i % values.length]}`
).join(" ")

// The dot sits on the right edge and follows the value scrolling past it.
const dotFrames = values
  .concat(values[0])
  .map(
    (value, i) =>
      `${((i / values.length) * 100).toFixed(2)}% { transform: translateY(${value}px); }`
  )
  .join(" ")

export function ChartSparkline({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartSparklineProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-sparkline-loader", className]
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
        <path d="M12 76H88" className="chart-sparkline-loader-axis" />
        {/* A nested svg clips the scrolling line to the plot window. */}
        <svg
          x="14"
          y="0"
          width={period}
          height="100"
          viewBox={`0 0 ${period} 100`}
        >
          <polyline points={line} className="chart-sparkline-loader-line" />
        </svg>
        <circle cx={14 + period} r="5" className="chart-sparkline-loader-dot" />
      </svg>
      <style>{`
        .chart-sparkline-loader { display: inline-flex; flex-shrink: 0; }
        .chart-sparkline-loader-axis { fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 1 7; opacity: .35; }
        .chart-sparkline-loader-line { fill: none; stroke: currentColor; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; animation: chart-sparkline-loader-scroll var(--loader-duration) linear infinite; }
        .chart-sparkline-loader-dot { fill: currentColor; transform: translateY(${values[0]}px); animation: chart-sparkline-loader-dot var(--loader-duration) linear infinite; }
        @keyframes chart-sparkline-loader-scroll { from { transform: translateX(0); } to { transform: translateX(-${period}px); } }
        @keyframes chart-sparkline-loader-dot { ${dotFrames} }
        @media (prefers-reduced-motion: reduce) { .chart-sparkline-loader-line, .chart-sparkline-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
