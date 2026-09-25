import type { CSSProperties, ComponentProps } from "react"

export type OrbitScanningSphereProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Browsers can disagree with Node in the last digit of trig results, which
// breaks hydration. Rounding them keeps server and client markup identical.
const round = (value: number) => Number(value.toFixed(6))

// The keyframes hold no custom properties, which lets the browser run them on
// the compositor. Each dot settles to one of five shared depth shades.
const shades = [0, 1, 2, 3, 4].map((level) => round(0.18 + (level / 4) * 0.34))
const revealFrames = shades
  .map(
    (shade, level) =>
      `@keyframes orbit-scanning-sphere-loader-reveal-${level} { 0%, 2%, 100% { opacity: 1; transform: scale(1.3); } 18%, 92% { opacity: ${shade}; transform: scale(1); } }
      .orbit-scanning-sphere-loader-depth-${level} { animation-name: orbit-scanning-sphere-loader-reveal-${level}; }`
  )
  .join("\n")

// The scan follows a sphere's cross-section; CSS interpolates one sampled pass.
// Its box is 11 units tall, so it travels 38 / 11 of its height either way.
const scanFrames = Array.from({ length: 25 }, (_, step) => {
  const progress = step / 24
  const latitude = progress * 2 - 1
  const width = Math.sqrt(Math.max(0, 1 - latitude * latitude))
  const opacity = round(Math.sin(progress * Math.PI)) * 0.5
  return `${progress * 100}% { transform: translateY(${round((latitude * 38 * 100) / 11)}%) scaleX(${width.toFixed(6)}); opacity: ${opacity.toFixed(6)}; }`
}).join("\n")

const dots = Array.from({ length: 56 }, (_, index) => {
  const latitude = 1 - (index + 0.5) / 28
  const radius = Math.sqrt(1 - latitude * latitude)
  const angle = index * 2.39996322973
  const depth = round(Math.sin(angle)) * radius
  const x = round(Math.cos(angle)) * radius * 38
  const y = latitude * 35 - depth * 14.44
  const r = 1.4 + (depth + 1) * 0.35
  return {
    level: Math.round(((depth + 1) / 2) * 4),
    phase: (y + 38) / 76,
    style: {
      left: `${round(50 + x - r)}%`,
      top: `${round(50 + y - r)}%`,
      width: `${round(r * 2)}%`,
      height: `${round(r * 2)}%`,
      opacity: round(0.18 + (depth + 1) * 0.17),
    },
  }
})

export function OrbitScanningSphere({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitScanningSphereProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-scanning-sphere-loader", className]
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
      <span aria-hidden="true" className="orbit-scanning-sphere-loader-stage">
        {dots.map((dot, index) => (
          <span
            key={index}
            className={`orbit-scanning-sphere-loader-dot orbit-scanning-sphere-loader-depth-${dot.level}`}
            style={{
              ...dot.style,
              animationDelay: `${-(1 - dot.phase) * duration}s`,
            }}
          />
        ))}
        <span className="orbit-scanning-sphere-loader-scan" />
      </span>
      <style>{`
        .orbit-scanning-sphere-loader { position: relative; display: inline-flex; flex-shrink: 0; container-type: size; }
        .orbit-scanning-sphere-loader-stage { position: absolute; inset: 0; }
        .orbit-scanning-sphere-loader-dot { position: absolute; border-radius: 50%; background: currentColor; animation: orbit-scanning-sphere-loader-reveal-2 var(--loader-duration) linear infinite; }
        .orbit-scanning-sphere-loader-scan { position: absolute; top: 44.5%; left: 11.5%; box-sizing: border-box; width: 77%; height: 11%; border: 1cqw solid currentColor; border-radius: 50%; opacity: 0; animation: orbit-scanning-sphere-loader-sweep var(--loader-duration) linear infinite; }
        ${revealFrames}
        @keyframes orbit-scanning-sphere-loader-sweep { ${scanFrames} }
        @media (prefers-reduced-motion: reduce) { .orbit-scanning-sphere-loader-dot, .orbit-scanning-sphere-loader-scan { animation: none; } }
      `}</style>
    </span>
  )
}
