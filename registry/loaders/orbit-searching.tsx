import type { CSSProperties, ComponentProps } from "react"

export type OrbitSearchingProps = ComponentProps<"span"> & {
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
    const frames = Array.from({ length: 33 }, (_, step) => {
      const angle = (step / 32) * Math.PI * 2
      const x = round(Math.cos(angle) * 100)
      const y = round(-Math.sin(angle) * 100)
      const shade = (Math.sin(angle) * level) / 4
      return `${round((step / 32) * 100)}% { transform: translate(${x}%, ${y}%) scale(${round(0.8 + shade * 0.2)}); opacity: ${round(0.5 + shade * 0.43)}; }`
    }).join("\n")
    return `@keyframes orbit-searching-loader-turn-${level} { ${frames} }
      .orbit-searching-loader-depth-${level} { animation-name: orbit-searching-loader-turn-${level}; }`
  })
  .join("\n")

const particles = Array.from({ length: 96 }, (_, index) => {
  const latitude = 1 - (index + 0.5) / 48
  const depth = Math.sqrt(1 - latitude * latitude)
  const phase = (index * 0.61803398875) % 1
  const angle = phase * Math.PI * 2
  const shade = depth * round(Math.sin(angle))
  return {
    level: Math.max(1, Math.round(depth * 4)),
    phase,
    style: {
      top: `${round(50 + latitude * 35.5)}%`,
      width: `${round(depth * 38)}%`,
      height: `${round(depth * 38 * 0.36)}%`,
      transform: `translate(${round(Math.cos(angle) * 100)}%, ${round(-Math.sin(angle) * 100)}%) scale(${round(0.8 + shade * 0.2)})`,
      opacity: round(0.5 + shade * 0.43),
    },
  }
})

export function OrbitSearching({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitSearchingProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-searching-loader", className]
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
      <span aria-hidden="true" className="orbit-searching-loader-stage">
        {particles.map((particle, index) => (
          <span
            key={index}
            className={`orbit-searching-loader-particle orbit-searching-loader-depth-${particle.level}`}
            style={{
              ...particle.style,
              animationDelay: `${-particle.phase * duration}s`,
            }}
          >
            {/* Two highlight passes per turn make the search sweep overtake
                the surface. The parent supplies front-to-back shading. */}
            <span
              className="orbit-searching-loader-dot"
              style={{
                animationDelay: `${-(1 - particle.phase / 2) * duration}s`,
              }}
            />
          </span>
        ))}
      </span>
      <style>{`
        .orbit-searching-loader { position: relative; display: inline-flex; flex-shrink: 0; container-type: size; }
        .orbit-searching-loader-stage { position: absolute; inset: 0; transform: rotate(-16deg); }
        .orbit-searching-loader-particle { position: absolute; left: 50%; transform-origin: 0 0; animation: orbit-searching-loader-turn-4 var(--loader-duration) linear infinite; }
        .orbit-searching-loader-dot { position: absolute; top: -1.65cqw; left: -1.65cqw; width: 3.3cqw; height: 3.3cqw; border-radius: 50%; background: currentColor; opacity: .65; animation: orbit-searching-loader-highlight var(--loader-duration) ease-in-out infinite; }
        ${turnFrames}
        @keyframes orbit-searching-loader-highlight { 0%, 50%, 100% { transform: scale(1.85); opacity: 1; } 7%, 43%, 57%, 93% { transform: scale(1); opacity: .55; } }
        @media (prefers-reduced-motion: reduce) { .orbit-searching-loader-particle, .orbit-searching-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
