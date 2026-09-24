import type { CSSProperties, ComponentProps } from "react"

export type ChartBarsProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const bars = [
  [0.45, 0.75],
  [0.7, 0.5],
  [0.55, 0.85],
  [0.9, 0.6],
  [0.65, 0.95],
]

export function ChartBars({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartBarsProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-bars-loader", className].filter(Boolean).join(" ")}
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
        <path d="M12 84H88" className="chart-bars-loader-axis" />
        {bars.map(([first, second], i) => (
          <rect
            key={i}
            x={16 + i * 14}
            y="20"
            width="10"
            height="60"
            rx="2"
            className="chart-bars-loader-bar"
            style={
              {
                "--chart-bars-first": first,
                "--chart-bars-second": second,
                animationDelay: `${(i * 0.05 - 1) * duration}s`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
      <style>{`
        .chart-bars-loader { display: inline-flex; flex-shrink: 0; }
        .chart-bars-loader-axis { fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; opacity: .3; }
        .chart-bars-loader-bar { fill: currentColor; transform-box: fill-box; transform-origin: 50% 100%; transform: scaleY(var(--chart-bars-first)); animation: chart-bars-loader-grow var(--loader-duration) cubic-bezier(.45, 0, .2, 1) infinite; }
        @keyframes chart-bars-loader-grow { 0% { transform: scaleY(.04); } 22%, 42% { transform: scaleY(var(--chart-bars-first)); } 62%, 80% { transform: scaleY(var(--chart-bars-second)); } 96%, 100% { transform: scaleY(.04); } }
        @media (prefers-reduced-motion: reduce) { .chart-bars-loader-bar { animation: none; } }
      `}</style>
    </span>
  )
}
