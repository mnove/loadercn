import type { CSSProperties, ComponentProps } from "react"

export type ChartStreamingProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const lanes = 4
const perLane = 10
// Each dot drags two fainter copies behind it as a trail.
const trail = [
  { lag: 0, r: 1.9, fade: 1 },
  { lag: 0.035, r: 1.45, fade: 0.45 },
  { lag: 0.07, r: 1.05, fade: 0.2 },
]
// Lanes move at slightly different paces so the stream never falls into step.
const paces = [1, 0.85, 1.1, 0.9]

// Lanes spread from a narrow source, widen mid-stream, and gather again,
// waving together like a ribbon.
const position = (lane: number, u: number) => {
  const x = 8 + u * 84
  const spread = 7 + 8 * Math.sin(Math.PI * u)
  const y =
    50 +
    (lane - (lanes - 1) / 2) * spread +
    4 * Math.sin(2 * Math.PI * u * 1.2 + lane * 0.15)
  return { x, y }
}

// Dots grow and brighten mid-stream, then shrink and fade at either edge.
const appearance = (lane: number, u: number) => {
  const { x, y } = position(lane, u)
  const presence = Math.sin(Math.PI * u)
  return {
    transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${(0.5 + presence * 0.5).toFixed(3)})`,
    opacity: Number((presence ** 0.7).toFixed(3)),
  }
}

const laneRules = Array.from({ length: lanes }, (_, lane) => {
  const frames = Array.from({ length: 25 }, (_, step) => {
    const { transform, opacity } = appearance(lane, step / 24)
    return `${((step / 24) * 100).toFixed(2)}% { transform: ${transform}; opacity: ${opacity}; }`
  }).join(" ")
  return `.chart-streaming-loader-lane-${lane} { animation-name: chart-streaming-loader-lane-${lane}; animation-duration: calc(var(--loader-duration) * ${paces[lane]}); }
        @keyframes chart-streaming-loader-lane-${lane} { ${frames} }`
}).join("\n        ")

export function ChartStreaming({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartStreamingProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-streaming-loader", className]
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
        {Array.from({ length: lanes }, (_, lane) =>
          Array.from({ length: perLane }, (_, i) => {
            // Evenly spaced along the lane, nudged so the gaps feel organic.
            const jitter = (((lane * perLane + i) * 0.61803398875) % 1) * 0.04
            const u = (i / perLane + jitter + lane * 0.05) % 1
            return trail.map(({ lag, r, fade }) => {
              const at = (u - lag + 1) % 1
              return (
                <circle
                  key={`${lane}-${i}-${lag}`}
                  r={r}
                  fillOpacity={fade}
                  className={`chart-streaming-loader-dot chart-streaming-loader-lane-${lane}`}
                  style={{
                    ...appearance(lane, at),
                    animationDelay: `${(-at * duration * paces[lane]).toFixed(3)}s`,
                  }}
                />
              )
            })
          })
        )}
      </svg>
      <style>{`
        .chart-streaming-loader { display: inline-flex; flex-shrink: 0; }
        .chart-streaming-loader-dot { fill: currentColor; animation-timing-function: linear; animation-iteration-count: infinite; }
        ${laneRules}
        @media (prefers-reduced-motion: reduce) { .chart-streaming-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
