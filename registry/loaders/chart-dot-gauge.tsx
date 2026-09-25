import type { CSSProperties, ComponentProps } from "react"

export type ChartDotGaugeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const center = { x: 50, y: 64 }
const radius = 36
const ticks = 17

// The reading, from 0 (left) to 1 (right), wanders like a live value.
const reading = (t: number) =>
  0.52 + 0.3 * Math.sin(2 * Math.PI * t) + 0.1 * Math.sin(6 * Math.PI * t + 0.5)

// Ticks up to the reading are lit; the rest dim and shrink. Ticks within
// reach of the needle swell and glow, handing the highlight along the dial.
const appearance = (value: number) => {
  const v = value.toFixed(3)
  const offset = `(${v} - var(--chart-dot-gauge-at))`
  const near = `clamp(0, 1 - max(${offset}, -1 * ${offset}) * 14, 1)`
  return {
    tick: `opacity: clamp(.16, ${offset} * 12 + 1, 1); transform: scale(calc(clamp(.65, ${offset} * 10 + 1, 1) + ${near} * .5));`,
    halo: `opacity: ${near}; transform: scale(calc(.4 + ${near} * .6));`,
    needle: `transform: rotate(${(value * 180).toFixed(2)}deg);`,
  }
}

const frames = (part: "tick" | "halo" | "needle") =>
  Array.from(
    { length: 49 },
    (_, step) =>
      `${((step / 48) * 100).toFixed(3)}% { ${appearance(reading(step / 48))[part]} }`
  ).join("\n")

export function ChartDotGauge({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotGaugeProps) {
  const rest = appearance(reading(0))
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-dot-gauge-loader", className]
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
        {Array.from({ length: ticks }, (_, i) => {
          const at = i / (ticks - 1)
          const angle = Math.PI * (1 + at)
          const x = center.x + Math.cos(angle) * radius
          const y = center.y + Math.sin(angle) * radius
          const tickStyle = { "--chart-dot-gauge-at": at } as CSSProperties
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="6.5"
                className="chart-dot-gauge-loader-halo"
                style={tickStyle}
              />
              <circle
                cx={x}
                cy={y}
                r="2.6"
                className="chart-dot-gauge-loader-tick"
                style={tickStyle}
              />
            </g>
          )
        })}
        <path
          d={`M${center.x} ${center.y}H${center.x - radius + 12}`}
          className="chart-dot-gauge-loader-needle"
        />
        <circle cx={center.x} cy={center.y} r="4.5" fill="currentColor" />
      </svg>
      <style>{`
        .chart-dot-gauge-loader { display: inline-flex; flex-shrink: 0; }
        .chart-dot-gauge-loader-tick { fill: currentColor; transform-box: fill-box; transform-origin: center; ${rest.tick} animation: chart-dot-gauge-loader-ticks var(--loader-duration) linear infinite; }
        .chart-dot-gauge-loader-halo { fill: currentColor; fill-opacity: .3; transform-box: fill-box; transform-origin: center; ${rest.halo} animation: chart-dot-gauge-loader-halos var(--loader-duration) linear infinite; }
        .chart-dot-gauge-loader-needle { fill: none; stroke: currentColor; stroke-width: 3.5; stroke-linecap: round; transform-origin: ${center.x}px ${center.y}px; ${rest.needle} animation: chart-dot-gauge-loader-needle var(--loader-duration) linear infinite; }
        @keyframes chart-dot-gauge-loader-ticks { ${frames("tick")} }
        @keyframes chart-dot-gauge-loader-halos { ${frames("halo")} }
        @keyframes chart-dot-gauge-loader-needle { ${frames("needle")} }
        @media (prefers-reduced-motion: reduce) { .chart-dot-gauge-loader-tick, .chart-dot-gauge-loader-halo, .chart-dot-gauge-loader-needle { animation: none; } }
      `}</style>
    </span>
  )
}
