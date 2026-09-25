import type { CSSProperties, ComponentProps } from "react"

export type ChartDotScatterProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const count = 40
const start = [16, 76]
const end = [84, 28]
const spread = 24

// Unit vectors along the trend line and across it.
const length = Math.hypot(end[0] - start[0], end[1] - start[1])
const along = [(end[0] - start[0]) / length, (end[1] - start[1]) / length]
const across = [-along[1], along[0]]

// Deterministic scatter: most dots sit near the line, a few stray far out.
const dots = Array.from({ length: count }, (_, i) => {
  const u = (i + 0.5) / count
  const a = (i * 0.61803398875) % 1
  const b = (i * 0.75487766625 + 0.3) % 1
  const side = 2 * a - 1
  const offset = Math.sign(side) * Math.abs(side) ** 1.5 * spread
  const drift = (b - 0.5) * 8
  return {
    x: start[0] + (end[0] - start[0]) * u,
    y: start[1] + (end[1] - start[1]) * u,
    dx: across[0] * offset + along[0] * drift,
    dy: across[1] * offset + along[1] * drift,
    far: Math.abs(offset) / spread,
    phase: u * 0.2 + a * 0.05,
  }
})

// Spread eases between scattered (1) and clustered near the line (0.2).
const appearance = (amount: string) =>
  `transform: translate(calc(var(--chart-dot-scatter-dx) * ${amount}), calc(var(--chart-dot-scatter-dy) * ${amount})) scale(calc(1.15 - ${amount} * .45)); opacity: calc(1 - ${amount} * (.25 + var(--chart-dot-scatter-far) * .45));`

const driftFrames = Array.from({ length: 25 }, (_, step) => {
  const amount = 0.2 + 0.8 * (0.5 + 0.5 * Math.cos((step / 24) * Math.PI * 2))
  return `${((step / 24) * 100).toFixed(2)}% { ${appearance(amount.toFixed(3))} }`
}).join("\n")

export function ChartDotScatter({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotScatterProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-dot-scatter-loader", className]
        .filter(Boolean)
        .join(" ")}
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
        {dots.map(({ x, y, dx, dy, far, phase }, i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2.2"
            className="chart-dot-scatter-loader-dot"
            style={
              {
                "--chart-dot-scatter-dx": `${dx.toFixed(2)}px`,
                "--chart-dot-scatter-dy": `${dy.toFixed(2)}px`,
                "--chart-dot-scatter-far": far.toFixed(3),
                animationDelay: `${-phase * duration}s`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
      <style>{`
        .chart-dot-scatter-loader { display: inline-flex; flex-shrink: 0; }
        .chart-dot-scatter-loader-dot { fill: currentColor; transform-box: fill-box; transform-origin: center; ${appearance(".45")} animation: chart-dot-scatter-loader-drift var(--loader-duration) linear infinite; }
        @keyframes chart-dot-scatter-loader-drift { ${driftFrames} }
        @media (prefers-reduced-motion: reduce) { .chart-dot-scatter-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
