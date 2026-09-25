import type { CSSProperties, ComponentProps } from "react"

export type ChartDotSeriesProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const points = 15
const shift = 0.045

// Front to back: each series sits lower, moves less, and fades with depth.
const series = [
  { y: 42, amplitude: 14, scale: 1.1, opacity: 1, phase: 0 },
  { y: 55, amplitude: 11, scale: 0.9, opacity: 0.55, phase: 0.18 },
  { y: 67, amplitude: 8, scale: 0.8, opacity: 0.38, phase: 0.36 },
]

// A smooth value between -1 and 1 with a second harmonic for character.
const wave = (t: number) =>
  0.7 * Math.sin(2 * Math.PI * t) + 0.3 * Math.sin(4 * Math.PI * t + 0.8)

// Dots rise with the value and swell slightly at the crest. A dot is 4.4
// units tall, so the rise is expressed as a percentage of its own height.
const appearance = (
  value: number,
  { amplitude, scale, opacity }: (typeof series)[number]
) => {
  const v = Number(value.toFixed(3))
  return {
    transform: `translateY(${((-amplitude * v * 100) / 4.4).toFixed(3)}%) scale(${(scale * (1 + v * 0.2)).toFixed(4)})`,
    opacity: (opacity * (0.8 + v * 0.2)).toFixed(4),
  }
}

// Each series gets its own keyframes, so they hold no custom properties and
// the browser can run them on the compositor.
const flowFrames = series
  .map((line, index) => {
    const frames = Array.from({ length: 25 }, (_, step) => {
      const { transform, opacity } = appearance(wave(step / 24), line)
      return `${((step / 24) * 100).toFixed(2)}% { transform: ${transform}; opacity: ${opacity}; }`
    }).join("\n")
    return `@keyframes chart-dot-series-loader-flow-${index} { ${frames} }
      .chart-dot-series-loader-series-${index} { animation-name: chart-dot-series-loader-flow-${index}; }`
  })
  .join("\n")

export function ChartDotSeries({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotSeriesProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-dot-series-loader", className]
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
      {/* Draw the back series first so the front one overlaps it. */}
      {series
        .map((line, index) => ({ line, index }))
        .reverse()
        .map(({ line, index }) =>
          Array.from({ length: points }, (_, point) => {
            const progress = (line.phase + 1 - point * shift) % 1
            return (
              <span
                key={`${line.y}-${point}`}
                aria-hidden="true"
                className={`chart-dot-series-loader-dot chart-dot-series-loader-series-${index}`}
                style={{
                  left: `${(14 + point * (72 / (points - 1)) - 2.2).toFixed(3)}%`,
                  top: `${line.y - 2.2}%`,
                  ...appearance(wave(progress), line),
                  animationDelay: `${-progress * duration}s`,
                }}
              />
            )
          })
        )}
      <style>{`
        .chart-dot-series-loader { position: relative; display: inline-flex; flex-shrink: 0; }
        .chart-dot-series-loader-dot { position: absolute; width: 4.4%; height: 4.4%; border-radius: 50%; background: currentColor; animation: chart-dot-series-loader-flow-0 var(--loader-duration) linear infinite; }
        ${flowFrames}
        @media (prefers-reduced-motion: reduce) { .chart-dot-series-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
