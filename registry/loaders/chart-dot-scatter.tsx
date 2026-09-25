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

// Each dot's box spans its full scatter offset (mirrored for negative
// offsets), so a percentage translate eases it in and out. The keyframes then
// hold no custom properties, which lets the browser run them on the
// compositor. Stray dots fade using five shared levels.
const farLevels = [0, 1, 2, 3, 4]

// Spread eases between scattered (1) and clustered near the line (0.2).
const appearance = (amount: number, far: number) =>
  `transform: translate(${(amount * 100).toFixed(1)}%, ${(amount * 100).toFixed(1)}%) scale(${(1.15 - amount * 0.45).toFixed(4)}); opacity: ${(1 - amount * (0.25 + far * 0.45)).toFixed(4)};`

const driftFrames = farLevels
  .map((level) => {
    const frames = Array.from({ length: 25 }, (_, step) => {
      const amount =
        0.2 + 0.8 * (0.5 + 0.5 * Math.cos((step / 24) * Math.PI * 2))
      return `${((step / 24) * 100).toFixed(2)}% { ${appearance(Number(amount.toFixed(3)), level / 4)} }`
    }).join("\n")
    return `@keyframes chart-dot-scatter-loader-drift-${level} { ${frames} }
      .chart-dot-scatter-loader-far-${level} { animation-name: chart-dot-scatter-loader-drift-${level}; }`
  })
  .join("\n")

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
      {dots.map(({ x, y, dx, dy, far, phase }, i) => {
        const offsetX = Number(dx.toFixed(2))
        const offsetY = Number(dy.toFixed(2))
        return (
          <span
            key={i}
            aria-hidden="true"
            className="chart-dot-scatter-loader-box"
            style={{
              left: `${x.toFixed(3)}%`,
              top: `${y.toFixed(3)}%`,
              width: `${Math.abs(offsetX)}%`,
              height: `${Math.abs(offsetY)}%`,
              transform: `scale(${Math.sign(offsetX) || 1}, ${Math.sign(offsetY) || 1})`,
            }}
          >
            <span
              className={`chart-dot-scatter-loader-dot chart-dot-scatter-loader-far-${Math.round(far * 4)}`}
              style={{
                transform: "translate(45%, 45%) scale(.9475)",
                opacity: (1 - 0.45 * (0.25 + far * 0.45)).toFixed(4),
                animationDelay: `${-phase * duration}s`,
              }}
            />
          </span>
        )
      })}
      <style>{`
        .chart-dot-scatter-loader { position: relative; display: inline-flex; flex-shrink: 0; container-type: size; }
        .chart-dot-scatter-loader-box { position: absolute; transform-origin: 0 0; }
        .chart-dot-scatter-loader-dot { position: absolute; inset: 0; transform-origin: 0 0; animation: chart-dot-scatter-loader-drift-0 var(--loader-duration) linear infinite; }
        .chart-dot-scatter-loader-dot::before { content: ""; position: absolute; top: -2.2cqw; left: -2.2cqw; width: 4.4cqw; height: 4.4cqw; border-radius: 50%; background: currentColor; }
        ${driftFrames}
        @media (prefers-reduced-motion: reduce) { .chart-dot-scatter-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
