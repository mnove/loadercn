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

const latitudes = [-0.8, -0.4, 0, 0.4, 0.8]
const bandDepth = (latitude: number) => Math.sqrt(1 - latitude * latitude)

// Each dot's box spans its orbit, so a percentage translate traces that orbit.
// The keyframes then hold no custom properties, which lets the browser run
// them on the compositor. Mirrored bands share depth, so they share keyframes.
const turnFrames = [0, 0.4, 0.8]
  .map((latitude, level) => {
    const depth = bandDepth(latitude)
    const frames = Array.from({ length: 25 }, (_, step) => {
      const angle = (step / 24) * Math.PI * 2
      const x = round(Math.cos(angle) * 100)
      const y = round(-Math.sin(angle) * 100)
      const shade = Math.sin(angle) * depth
      return `${round((step / 24) * 100)}% { transform: translate(${x}%, ${y}%) scale(${round(0.76 + shade * 0.24)}); opacity: ${round(0.48 + shade * 0.42)}; }`
    }).join("\n")
    return `@keyframes orbit-latitude-globe-loader-turn-${level} { ${frames} }
      .orbit-latitude-globe-loader-depth-${level} { animation-name: orbit-latitude-globe-loader-turn-${level}; }`
  })
  .join("\n")

const dots = latitudes.flatMap((latitude, band) => {
  const depth = bandDepth(latitude)
  return Array.from({ length: 11 }, (_, index) => {
    const signal = index === 10
    const phase = signal ? band * 0.17 : index / 10 + band * 0.035
    const angle = phase * Math.PI * 2
    const shade = depth * round(Math.sin(angle))
    return {
      className: [
        "orbit-latitude-globe-loader-dot",
        `orbit-latitude-globe-loader-depth-${Math.abs(band - 2)}`,
        signal && "orbit-latitude-globe-loader-signal",
      ]
        .filter(Boolean)
        .join(" "),
      phase,
      signal,
      style: {
        top: `${round(50 + latitude * 35)}%`,
        width: `${round(depth * 38)}%`,
        height: `${round(depth * 38 * 0.38)}%`,
        transform: `translate(${round(Math.cos(angle) * 100)}%, ${round(-Math.sin(angle) * 100)}%) scale(${round(0.76 + shade * 0.24)})`,
        opacity: round(0.48 + shade * 0.42),
      },
    }
  })
})

export function OrbitLatitudeGlobe({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitLatitudeGlobeProps) {
  const duration = Math.max(0.1, speed)
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
          "--loader-duration": `${duration}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-latitude-globe-loader-stage">
        {dots.map((dot, index) => (
          <span
            key={index}
            className={dot.className}
            style={{
              ...dot.style,
              animationDirection: dot.signal ? "reverse" : "normal",
              animationDelay: `${-dot.phase * duration}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .orbit-latitude-globe-loader { position: relative; display: inline-flex; flex-shrink: 0; container-type: size; }
        .orbit-latitude-globe-loader-stage { position: absolute; inset: 0; transform: rotate(-18deg); }
        .orbit-latitude-globe-loader-dot { position: absolute; left: 50%; transform-origin: 0 0; animation: orbit-latitude-globe-loader-turn-0 var(--loader-duration) linear infinite; }
        .orbit-latitude-globe-loader-dot::before { content: ""; position: absolute; top: -1.65cqw; left: -1.65cqw; width: 3.3cqw; height: 3.3cqw; border-radius: 50%; background: currentColor; }
        .orbit-latitude-globe-loader-signal::before { top: -2.9cqw; left: -2.9cqw; width: 5.8cqw; height: 5.8cqw; }
        ${turnFrames}
        @media (prefers-reduced-motion: reduce) { .orbit-latitude-globe-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
