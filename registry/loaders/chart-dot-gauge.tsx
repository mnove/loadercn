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

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max)

// Ticks up to the reading are lit; the rest dim and shrink. Ticks within
// reach of the needle swell and glow, handing the highlight along the dial.
const appearance = (value: number, at: number) => {
  const offset = Number(value.toFixed(3)) - at
  const near = clamp(0, 1 - Math.abs(offset) * 14, 1)
  return {
    tick: `opacity: ${clamp(0.16, offset * 12 + 1, 1).toFixed(3)}; transform: scale(${(clamp(0.65, offset * 10 + 1, 1) + near * 0.5).toFixed(3)});`,
    halo: `opacity: ${near.toFixed(3)}; transform: scale(${(0.4 + near * 0.6).toFixed(3)});`,
  }
}

const steps = Array.from({ length: 49 }, (_, step) => step / 48)

// Every tick gets its own keyframes, so they hold no custom properties and the
// browser can run them on the compositor. Frames where a tick holds steady
// are dropped to keep the stylesheet small.
const tickRules = Array.from({ length: ticks }, (_, i) =>
  (["tick", "halo"] as const)
    .map((part) => {
      const values = steps.map(
        (t) => appearance(reading(t), i / (ticks - 1))[part]
      )
      const frames = values
        .map((value, step) => ({ value, step }))
        .filter(
          ({ value, step }) =>
            step === 0 ||
            step === values.length - 1 ||
            value !== values[step - 1] ||
            value !== values[step + 1]
        )
        .map(
          ({ value, step }) => `${((step / 48) * 100).toFixed(2)}% { ${value} }`
        )
        .join(" ")
      return `.chart-dot-gauge-loader-${part}-${i} { ${values[0]} animation-name: chart-dot-gauge-loader-${part}-${i}; }
        @keyframes chart-dot-gauge-loader-${part}-${i} { ${frames} }`
    })
    .join("\n        ")
).join("\n        ")

const needleFrames = steps
  .map(
    (t) =>
      `${(t * 100).toFixed(3)}% { transform: rotate(${(reading(t) * 180).toFixed(2)}deg); }`
  )
  .join("\n")

export function ChartDotGauge({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotGaugeProps) {
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
      {Array.from({ length: ticks }, (_, i) => {
        const angle = Math.PI * (1 + i / (ticks - 1))
        const x = center.x + Math.cos(angle) * radius
        const y = center.y + Math.sin(angle) * radius
        return (["halo", "tick"] as const).map((part) => {
          const r = part === "halo" ? 6.5 : 2.6
          return (
            <span
              key={`${part}-${i}`}
              aria-hidden="true"
              className={`chart-dot-gauge-loader-${part} chart-dot-gauge-loader-${part}-${i}`}
              style={{
                left: `${(x - r).toFixed(3)}%`,
                top: `${(y - r).toFixed(3)}%`,
                width: `${r * 2}%`,
                height: `${r * 2}%`,
              }}
            />
          )
        })
      })}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        <path
          d={`M${center.x} ${center.y}H${center.x - radius + 12}`}
          className="chart-dot-gauge-loader-needle"
        />
        <circle cx={center.x} cy={center.y} r="4.5" fill="currentColor" />
      </svg>
      <style>{`
        .chart-dot-gauge-loader { position: relative; display: inline-flex; flex-shrink: 0; }
        .chart-dot-gauge-loader svg { position: absolute; inset: 0; }
        .chart-dot-gauge-loader-tick, .chart-dot-gauge-loader-halo { position: absolute; border-radius: 50%; animation-duration: var(--loader-duration); animation-timing-function: linear; animation-iteration-count: infinite; }
        .chart-dot-gauge-loader-tick { background: currentColor; }
        .chart-dot-gauge-loader-halo::before { content: ""; position: absolute; inset: 0; border-radius: 50%; background: currentColor; opacity: .3; }
        ${tickRules}
        .chart-dot-gauge-loader-needle { fill: none; stroke: currentColor; stroke-width: 3.5; stroke-linecap: round; transform-origin: ${center.x}px ${center.y}px; transform: rotate(${(reading(0) * 180).toFixed(2)}deg); animation: chart-dot-gauge-loader-needle var(--loader-duration) linear infinite; }
        @keyframes chart-dot-gauge-loader-needle { ${needleFrames} }
        @media (prefers-reduced-motion: reduce) { .chart-dot-gauge-loader-tick, .chart-dot-gauge-loader-halo, .chart-dot-gauge-loader-needle { animation: none; } }
      `}</style>
    </span>
  )
}
