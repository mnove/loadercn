import type { CSSProperties, ComponentProps } from "react"

export type OrbitThoughtOrbProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Browsers can disagree with Node in the last digit of trig results, which
// breaks hydration. Rounding them keeps server and client markup identical.
const round = (value: number) => Number(value.toFixed(6))

// Each particle's box spans its orbit, so a percentage translate traces that
// orbit. The keyframes then hold no custom properties, which lets the browser
// run them on the compositor. Depth shading uses four shared levels.
const turnFrames = [1, 2, 3, 4]
  .map((level) => {
    const frames = Array.from({ length: 25 }, (_, step) => {
      const angle = (step / 24) * Math.PI * 2
      const x = round(Math.cos(angle) * 100)
      const y = round(-Math.sin(angle) * 100)
      const shade = (Math.sin(angle) * level) / 4
      return `${round((step / 24) * 100)}% { transform: translate(${x}%, ${y}%) scale(${round(0.76 + shade * 0.24)}); opacity: ${round(0.26 + shade * 0.2)}; }`
    }).join("\n")
    return `@keyframes orbit-thought-orb-loader-turn-${level} { ${frames} }
      .orbit-thought-orb-loader-depth-${level} { animation-name: orbit-thought-orb-loader-turn-${level}; }`
  })
  .join("\n")

const dots = Array.from({ length: 42 }, (_, index) => {
  const latitude = 1 - (index + 0.5) / 21
  const depth = Math.sqrt(1 - latitude * latitude)
  const phase = (index * 0.61803398875) % 1
  const angle = phase * Math.PI * 2
  return {
    level: Math.max(1, Math.round(depth * 4)),
    phase,
    style: {
      top: `${round(50 + latitude * 35)}%`,
      width: `${round(depth * 38)}%`,
      height: `${round(depth * 14.44)}%`,
      transform: `translate(${round(Math.cos(angle) * 100)}%, ${round(-Math.sin(angle) * 100)}%)`,
      opacity: round(0.26 + depth * round(Math.sin(angle)) * 0.2),
    },
  }
})

export function OrbitThoughtOrb({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitThoughtOrbProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-thought-orb-loader", className]
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
      <span aria-hidden="true" className="orbit-thought-orb-loader-stage">
        {dots.map((dot, index) => (
          <span
            key={index}
            className={`orbit-thought-orb-loader-dot orbit-thought-orb-loader-depth-${dot.level}`}
            style={{
              ...dot.style,
              animationDelay: `${-dot.phase * duration}s`,
            }}
          />
        ))}
      </span>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className="orbit-thought-orb-loader-stage"
      >
        <g transform="translate(50 50)">
          {[
            "M-30 -10C-8 -35 14 26 30 6",
            "M-18 26C-30 -8 28 -20 18 -28",
            "M-28 14C12 30 -12 -30 28 -12",
          ].map((path, index) => (
            <g key={path}>
              <path d={path} className="orbit-thought-orb-loader-track" />
              <path
                d={path}
                pathLength="100"
                className="orbit-thought-orb-loader-signal"
                style={{
                  animationDelay: `${(-index / 3) * duration}s`,
                }}
              />
            </g>
          ))}
          <circle r="3.3" className="orbit-thought-orb-loader-core" />
        </g>
      </svg>
      <style>{`
        .orbit-thought-orb-loader { position: relative; display: inline-flex; flex-shrink: 0; container-type: size; }
        .orbit-thought-orb-loader-stage { position: absolute; inset: 0; }
        .orbit-thought-orb-loader-dot { position: absolute; left: 50%; transform-origin: 0 0; animation: orbit-thought-orb-loader-turn-4 var(--loader-duration) linear infinite; }
        .orbit-thought-orb-loader-dot::before { content: ""; position: absolute; top: -1.9cqw; left: -1.9cqw; width: 3.8cqw; height: 3.8cqw; border-radius: 50%; background: currentColor; }
        .orbit-thought-orb-loader-track { fill: none; stroke: currentColor; stroke-width: 1; opacity: .18; }
        .orbit-thought-orb-loader-signal { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: 9 100; animation: orbit-thought-orb-loader-route var(--loader-duration) linear infinite; }
        .orbit-thought-orb-loader-core { fill: currentColor; animation: orbit-thought-orb-loader-think var(--loader-duration) ease-in-out infinite; }
        ${turnFrames}
        @keyframes orbit-thought-orb-loader-route { 0% { stroke-dashoffset: 9; opacity: 0; } 10%, 85% { opacity: .9; } 100% { stroke-dashoffset: -100; opacity: 0; } }
        @keyframes orbit-thought-orb-loader-think { 0%, 100% { opacity: .45; transform: scale(.8); } 50% { opacity: .95; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .orbit-thought-orb-loader-dot, .orbit-thought-orb-loader-signal, .orbit-thought-orb-loader-core { animation: none; } .orbit-thought-orb-loader-signal { opacity: 0; } }
      `}</style>
    </span>
  )
}
