import type { CSSProperties, ComponentProps } from "react"

export type OrbitParticleGlobeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Browsers can disagree with Node in the last digit of trig results, which
// breaks hydration. Rounding them keeps server and client markup identical.
const round = (value: number) => Number(value.toFixed(6))

// Each dot's box spans its orbit, so a percentage translate traces that orbit.
// The keyframes then hold no custom properties, which lets the browser run
// them on the compositor. Depth shading uses four shared levels.
const depthLevels = [1, 2, 3, 4]
const turnFrames = depthLevels
  .map((level) => {
    const frames = Array.from({ length: 25 }, (_, step) => {
      const angle = (step / 24) * Math.PI * 2
      const x = round(Math.cos(angle) * 100)
      const y = round(-Math.sin(angle) * 100)
      const shade = (Math.sin(angle) * level) / 4
      return `${round((step / 24) * 100)}% { transform: translate(${x}%, ${y}%) scale(${round(0.76 + shade * 0.24)}); opacity: ${round(0.48 + shade * 0.42)}; }`
    }).join("\n")
    return `@keyframes orbit-particle-globe-loader-turn-${level} { ${frames} }
      .orbit-particle-globe-loader-depth-${level} { animation-name: orbit-particle-globe-loader-turn-${level}; }`
  })
  .join("\n")

const dots = Array.from({ length: 56 }, (_, index) => {
  const latitude = 1 - (index + 0.5) / 28
  const depth = Math.sqrt(1 - latitude * latitude)
  const phase = (index * 0.61803398875) % 1
  const angle = phase * Math.PI * 2
  const shade = depth * round(Math.sin(angle))
  return {
    level: Math.max(1, Math.round(depth * 4)),
    phase,
    style: {
      top: `${round(50 + latitude * 35)}%`,
      width: `${round(depth * 38)}%`,
      height: `${round(depth * 38 * 0.38)}%`,
      transform: `translate(${round(Math.cos(angle) * 100)}%, ${round(-Math.sin(angle) * 100)}%) scale(${round(0.76 + shade * 0.24)})`,
      opacity: round(0.48 + shade * 0.42),
    },
  }
})

export function OrbitParticleGlobe({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitParticleGlobeProps) {
  const duration = Math.max(0.1, speed)
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
          "--loader-duration": `${duration}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-particle-globe-loader-stage">
        {dots.map((dot, index) => (
          <span
            key={index}
            className={`orbit-particle-globe-loader-dot orbit-particle-globe-loader-depth-${dot.level}`}
            style={{
              ...dot.style,
              animationDelay: `${-dot.phase * duration}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .orbit-particle-globe-loader { position: relative; display: inline-flex; flex-shrink: 0; container-type: size; }
        .orbit-particle-globe-loader-stage { position: absolute; inset: 0; transform: rotate(-18deg); }
        .orbit-particle-globe-loader-dot { position: absolute; left: 50%; transform-origin: 0 0; animation: orbit-particle-globe-loader-turn-4 var(--loader-duration) linear infinite; }
        .orbit-particle-globe-loader-dot::before { content: ""; position: absolute; top: -2.15cqw; left: -2.15cqw; width: 4.3cqw; height: 4.3cqw; border-radius: 50%; background: currentColor; }
        ${turnFrames}
        @media (prefers-reduced-motion: reduce) { .orbit-particle-globe-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
