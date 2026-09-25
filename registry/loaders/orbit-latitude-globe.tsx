import type { CSSProperties, ComponentProps } from "react"

export type OrbitLatitudeGlobeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Browsers can disagree with Node in the last digit of trig results, which
// breaks hydration. Rounding them keeps server and client markup identical.
const round = (value: number) => Number(value.toFixed(6))

// A full turn is sampled once; the browser interpolates it without a frame loop.
const turnFrames = Array.from({ length: 25 }, (_, step) => {
  const angle = (step / 24) * Math.PI * 2
  const x = Math.cos(angle).toFixed(6)
  const depth = Math.sin(angle).toFixed(6)
  return `${(step / 24) * 100}% {
    transform: translate(calc(var(--orbit-latitude-globe-radius) * ${x}), calc(var(--orbit-latitude-globe-height) - var(--orbit-latitude-globe-radius) * ${depth} * .38)) scale(calc(.76 + var(--orbit-latitude-globe-depth) * ${depth} * .24));
    opacity: calc(.48 + var(--orbit-latitude-globe-depth) * ${depth} * .42);
  }`
}).join("\n")

export function OrbitLatitudeGlobe({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitLatitudeGlobeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-latitude-globe-loader", className]
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
        <g transform="translate(50 50) rotate(-18)">
          {[-0.8, -0.4, 0, 0.4, 0.8].map((latitude, band) => {
            const depth = Math.sqrt(1 - latitude * latitude)
            return (
              <g key={band}>
                {Array.from({ length: 11 }, (_, index) => {
                  const signal = index === 10
                  const phase = signal ? band * 0.17 : index / 10 + band * 0.035
                  const angle = phase * Math.PI * 2
                  return (
                    <circle
                      key={index}
                      r={signal ? 2.9 : 1.65}
                      className="orbit-latitude-globe-loader-dot"
                      style={
                        {
                          "--orbit-latitude-globe-radius": `${depth * 38}px`,
                          "--orbit-latitude-globe-height": `${latitude * 35}px`,
                          "--orbit-latitude-globe-depth": depth,
                          "--orbit-latitude-globe-rest-x": `${round(Math.cos(angle)) * depth * 38}px`,
                          "--orbit-latitude-globe-rest-y": `${latitude * 35 - round(Math.sin(angle)) * depth * 38 * 0.38}px`,
                          "--orbit-latitude-globe-rest-scale":
                            0.76 + depth * round(Math.sin(angle)) * 0.24,
                          "--orbit-latitude-globe-rest-opacity":
                            0.48 + depth * round(Math.sin(angle)) * 0.42,
                          animationDirection: signal ? "reverse" : "normal",
                          animationDelay: `${-phase * Math.max(0.1, speed)}s`,
                        } as CSSProperties
                      }
                    />
                  )
                })}
              </g>
            )
          })}
        </g>
      </svg>
      <style>{`
        .orbit-latitude-globe-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-latitude-globe-loader-dot { fill: currentColor; transform: translate(var(--orbit-latitude-globe-rest-x), var(--orbit-latitude-globe-rest-y)) scale(var(--orbit-latitude-globe-rest-scale)); opacity: var(--orbit-latitude-globe-rest-opacity); animation: orbit-latitude-globe-loader-turn var(--loader-duration) linear infinite; }
        @keyframes orbit-latitude-globe-loader-turn { ${turnFrames} }
        @media (prefers-reduced-motion: reduce) { .orbit-latitude-globe-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
