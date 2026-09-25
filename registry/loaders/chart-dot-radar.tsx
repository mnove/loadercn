import type { CSSProperties, ComponentProps } from "react"

export type ChartDotRadarProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const center = { x: 50, y: 52 }
const radius = 38
const spokes = 6
const steps = [0.25, 0.5, 0.75, 1]

// Each spoke's value, between about .4 and 1 of the radius.
const value = (t: number) =>
  0.7 + 0.2 * Math.sin(2 * Math.PI * t) + 0.08 * Math.sin(4 * Math.PI * t + 0.7)

const appearance = (amount: string) =>
  `transform: translate(calc(var(--chart-dot-radar-x) * ${amount}), calc(var(--chart-dot-radar-y) * ${amount}));`

const reachFrames = Array.from(
  { length: 25 },
  (_, step) =>
    `${((step / 24) * 100).toFixed(2)}% { ${appearance(value(step / 24).toFixed(3))} }`
).join("\n")

// Phase of each spoke, irregular so the outline shifts rather than pulses.
const phases = Array.from({ length: spokes }, (_, spoke) => (spoke * 0.37) % 1)

const tip = (spoke: number, t: number) => {
  const angle = (spoke / spokes) * Math.PI * 2 - Math.PI / 2
  const reach = value((t + phases[spoke]) % 1) * radius
  return [
    center.x + Math.cos(angle) * reach,
    center.y + Math.sin(angle) * reach,
  ]
}

// Each outline edge is a unit line mapped onto the two spoke tips it joins.
const edgeTransform = (spoke: number, t: number) => {
  const [ax, ay] = tip(spoke, t)
  const [bx, by] = tip((spoke + 1) % spokes, t)
  const [dx, dy] = [bx - ax, by - ay].map((n) => n.toFixed(3))
  return `transform: matrix(${dx}, ${dy}, ${-Number(dy)}, ${dx}, ${ax.toFixed(3)}, ${ay.toFixed(3)});`
}

const edgeRules = Array.from({ length: spokes }, (_, spoke) => {
  const frames = Array.from(
    { length: 25 },
    (_, step) =>
      `${((step / 24) * 100).toFixed(2)}% { ${edgeTransform(spoke, step / 24)} }`
  ).join(" ")
  return `.chart-dot-radar-loader-edge-${spoke} { ${edgeTransform(spoke, 0)} animation-name: chart-dot-radar-loader-edge-${spoke}; }
        @keyframes chart-dot-radar-loader-edge-${spoke} { ${frames} }`
}).join("\n        ")

const web = (scale: number) =>
  Array.from({ length: spokes }, (_, i) => {
    const angle = (i / spokes) * Math.PI * 2 - Math.PI / 2
    return `${(center.x + Math.cos(angle) * radius * scale).toFixed(2)},${(center.y + Math.sin(angle) * radius * scale).toFixed(2)}`
  }).join(" ")

export function ChartDotRadar({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotRadarProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-dot-radar-loader", className]
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
        <polygon points={web(1)} className="chart-dot-radar-loader-web" />
        <polygon points={web(0.5)} className="chart-dot-radar-loader-web" />
        {Array.from({ length: spokes }, (_, spoke) => (
          <line
            key={`edge-${spoke}`}
            x2="1"
            className={`chart-dot-radar-loader-edge chart-dot-radar-loader-edge-${spoke}`}
          />
        ))}
        {Array.from({ length: spokes }, (_, spoke) => {
          const angle = (spoke / spokes) * Math.PI * 2 - Math.PI / 2
          const progress = phases[spoke]
          return steps.map((step) => (
            <circle
              key={`${spoke}-${step}`}
              cx={center.x}
              cy={center.y}
              r={step === 1 ? 3.4 : 1.8}
              className="chart-dot-radar-loader-dot"
              style={
                {
                  "--chart-dot-radar-x": `${(Math.cos(angle) * radius * step).toFixed(2)}px`,
                  "--chart-dot-radar-y": `${(Math.sin(angle) * radius * step).toFixed(2)}px`,
                  "--chart-dot-radar-rest": value(progress).toFixed(3),
                  opacity: step === 1 ? 1 : 0.2 + step * 0.4,
                  animationDelay: `${-progress * duration}s`,
                } as CSSProperties
              }
            />
          ))
        })}
        <circle cx={center.x} cy={center.y} r="2.4" fill="currentColor" />
      </svg>
      <style>{`
        .chart-dot-radar-loader { display: inline-flex; flex-shrink: 0; }
        .chart-dot-radar-loader-web { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linejoin: round; opacity: .15; }
        .chart-dot-radar-loader-edge { stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; vector-effect: non-scaling-stroke; opacity: .75; animation-duration: var(--loader-duration); animation-timing-function: linear; animation-iteration-count: infinite; }
        ${edgeRules}
        .chart-dot-radar-loader-dot { fill: currentColor; ${appearance("var(--chart-dot-radar-rest)")} animation: chart-dot-radar-loader-reach var(--loader-duration) linear infinite; }
        @keyframes chart-dot-radar-loader-reach { ${reachFrames} }
        @media (prefers-reduced-motion: reduce) { .chart-dot-radar-loader-dot, .chart-dot-radar-loader-edge { animation: none; } }
      `}</style>
    </span>
  )
}
