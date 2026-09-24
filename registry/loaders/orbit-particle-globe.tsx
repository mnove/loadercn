import type { CSSProperties, ComponentProps } from "react"

export type OrbitParticleGlobeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// A full turn is sampled once; the browser interpolates it without a frame loop.
const turnFrames = Array.from({ length: 25 }, (_, step) => {
  const angle = (step / 24) * Math.PI * 2
  const x = Math.cos(angle).toFixed(6)
  const depth = Math.sin(angle).toFixed(6)
  return `${(step / 24) * 100}% {
    transform: translate(calc(var(--orbit-particle-globe-radius) * ${x}), calc(var(--orbit-particle-globe-height) - var(--orbit-particle-globe-radius) * ${depth} * .38)) scale(calc(.76 + var(--orbit-particle-globe-depth) * ${depth} * .24));
    opacity: calc(.48 + var(--orbit-particle-globe-depth) * ${depth} * .42);
  }`
}).join("\n")

export function OrbitParticleGlobe({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitParticleGlobeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-particle-globe-loader", className]
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
          {Array.from({ length: 56 }, (_, index) => {
            const latitude = 1 - (index + 0.5) / 28
            const depth = Math.sqrt(1 - latitude * latitude)
            const phase = (index * 0.61803398875) % 1
            const angle = phase * Math.PI * 2
            return (
              <circle
                key={index}
                r="2.15"
                className="orbit-particle-globe-loader-dot"
                style={
                  {
                    "--orbit-particle-globe-radius": `${depth * 38}px`,
                    "--orbit-particle-globe-height": `${latitude * 35}px`,
                    "--orbit-particle-globe-depth": depth,
                    "--orbit-particle-globe-rest-x": `${Math.cos(angle) * depth * 38}px`,
                    "--orbit-particle-globe-rest-y": `${latitude * 35 - Math.sin(angle) * depth * 38 * 0.38}px`,
                    "--orbit-particle-globe-rest-scale":
                      0.76 + depth * Math.sin(angle) * 0.24,
                    "--orbit-particle-globe-rest-opacity":
                      0.48 + depth * Math.sin(angle) * 0.42,
                    animationDelay: `${-phase * Math.max(0.1, speed)}s`,
                  } as CSSProperties
                }
              />
            )
          })}
        </g>
      </svg>
      <style>{`
        .orbit-particle-globe-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-particle-globe-loader-dot { fill: currentColor; transform: translate(var(--orbit-particle-globe-rest-x), var(--orbit-particle-globe-rest-y)) scale(var(--orbit-particle-globe-rest-scale)); opacity: var(--orbit-particle-globe-rest-opacity); animation: orbit-particle-globe-loader-turn var(--loader-duration) linear infinite; }
        @keyframes orbit-particle-globe-loader-turn { ${turnFrames} }
        @media (prefers-reduced-motion: reduce) { .orbit-particle-globe-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
