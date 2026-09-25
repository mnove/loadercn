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

// Dots rise with the value and swell slightly at the crest.
const appearance = (value: string) =>
  `transform: translateY(calc(var(--chart-dot-series-amplitude) * ${value} * -1)) scale(calc(var(--chart-dot-series-scale) * (1 + ${value} * .2))); opacity: calc(var(--chart-dot-series-opacity) * (.8 + ${value} * .2));`

const flowFrames = Array.from(
  { length: 25 },
  (_, step) =>
    `${((step / 24) * 100).toFixed(2)}% { ${appearance(wave(step / 24).toFixed(3))} }`
).join("\n")

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
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        {/* Draw the back series first so the front one overlaps it. */}
        {series
          .slice()
          .reverse()
          .map(({ y, amplitude, scale, opacity, phase }) =>
            Array.from({ length: points }, (_, point) => {
              const progress = (phase + 1 - point * shift) % 1
              return (
                <circle
                  key={`${y}-${point}`}
                  cx={14 + point * (72 / (points - 1))}
                  cy={y}
                  r="2.2"
                  className="chart-dot-series-loader-dot"
                  style={
                    {
                      "--chart-dot-series-amplitude": `${amplitude}px`,
                      "--chart-dot-series-scale": scale,
                      "--chart-dot-series-opacity": opacity,
                      "--chart-dot-series-rest": wave(progress).toFixed(3),
                      animationDelay: `${-progress * duration}s`,
                    } as CSSProperties
                  }
                />
              )
            })
          )}
      </svg>
      <style>{`
        .chart-dot-series-loader { display: inline-flex; flex-shrink: 0; }
        .chart-dot-series-loader-dot { fill: currentColor; transform-box: fill-box; transform-origin: center; ${appearance("var(--chart-dot-series-rest)")} animation: chart-dot-series-loader-flow var(--loader-duration) linear infinite; }
        @keyframes chart-dot-series-loader-flow { ${flowFrames} }
        @media (prefers-reduced-motion: reduce) { .chart-dot-series-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
