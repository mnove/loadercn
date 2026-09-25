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

// One sampled turn is shared by the particles, each with its own phase.
const turnFrames = Array.from({ length: 25 }, (_, step) => {
  const angle = (step / 24) * Math.PI * 2
  const x = Math.cos(angle).toFixed(6)
  const depth = Math.sin(angle).toFixed(6)
  return `${(step / 24) * 100}% {
    transform: translate(calc(var(--orbit-thought-orb-radius) * ${x}), calc(var(--orbit-thought-orb-height) - var(--orbit-thought-orb-radius) * ${depth} * .38)) scale(calc(.76 + var(--orbit-thought-orb-depth) * ${depth} * .24));
    opacity: calc(.26 + var(--orbit-thought-orb-depth) * ${depth} * .2);
  }`
}).join("\n")

export function OrbitThoughtOrb({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitThoughtOrbProps) {
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
        <g transform="translate(50 50)">
          {Array.from({ length: 42 }, (_, index) => {
            const latitude = 1 - (index + 0.5) / 21
            const depth = Math.sqrt(1 - latitude * latitude)
            const phase = (index * 0.61803398875) % 1
            const angle = phase * Math.PI * 2
            return (
              <circle
                key={index}
                r="1.9"
                className="orbit-thought-orb-loader-dot"
                style={
                  {
                    "--orbit-thought-orb-radius": `${depth * 38}px`,
                    "--orbit-thought-orb-height": `${latitude * 35}px`,
                    "--orbit-thought-orb-depth": depth,
                    "--orbit-thought-orb-rest-x": `${round(Math.cos(angle)) * depth * 38}px`,
                    "--orbit-thought-orb-rest-y": `${latitude * 35 - round(Math.sin(angle)) * depth * 14.44}px`,
                    "--orbit-thought-orb-rest-opacity":
                      0.26 + depth * round(Math.sin(angle)) * 0.2,
                    animationDelay: `${-phase * Math.max(0.1, speed)}s`,
                  } as CSSProperties
                }
              />
            )
          })}
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
                  animationDelay: `${(-index / 3) * Math.max(0.1, speed)}s`,
                }}
              />
            </g>
          ))}
          <circle r="3.3" className="orbit-thought-orb-loader-core" />
        </g>
      </svg>
      <style>{`
        .orbit-thought-orb-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-thought-orb-loader-dot { fill: currentColor; transform: translate(var(--orbit-thought-orb-rest-x), var(--orbit-thought-orb-rest-y)); opacity: var(--orbit-thought-orb-rest-opacity); animation: orbit-thought-orb-loader-turn var(--loader-duration) linear infinite; }
        .orbit-thought-orb-loader-track { fill: none; stroke: currentColor; stroke-width: 1; opacity: .18; }
        .orbit-thought-orb-loader-signal { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: 9 100; animation: orbit-thought-orb-loader-route var(--loader-duration) linear infinite; }
        .orbit-thought-orb-loader-core { fill: currentColor; animation: orbit-thought-orb-loader-think var(--loader-duration) ease-in-out infinite; }
        @keyframes orbit-thought-orb-loader-turn { ${turnFrames} }
        @keyframes orbit-thought-orb-loader-route { 0% { stroke-dashoffset: 9; opacity: 0; } 10%, 85% { opacity: .9; } 100% { stroke-dashoffset: -100; opacity: 0; } }
        @keyframes orbit-thought-orb-loader-think { 0%, 100% { opacity: .45; transform: scale(.8); } 50% { opacity: .95; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .orbit-thought-orb-loader-dot, .orbit-thought-orb-loader-signal, .orbit-thought-orb-loader-core { animation: none; } .orbit-thought-orb-loader-signal { opacity: 0; } }
      `}</style>
    </span>
  )
}
