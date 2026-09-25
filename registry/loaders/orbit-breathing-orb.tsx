import type { CSSProperties, ComponentProps } from "react"

export type OrbitBreathingOrbProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Browsers can disagree with Node in the last digit of trig results, which
// breaks hydration. Rounding them keeps server and client markup identical.
const round = (value: number) => Number(value.toFixed(6))

// Each dot scales about the orb's center, so the whole orb breathes. The
// shared keyframes hold no custom properties, which lets the browser run them
// on the compositor; each dot's own shade sits on its wrapper.
const dots = Array.from({ length: 56 }, (_, index) => {
  const latitude = 1 - (index + 0.5) / 28
  const radius = Math.sqrt(1 - latitude * latitude)
  const angle = index * 2.39996322973
  const depth = round(Math.sin(angle)) * radius
  const x = round(Math.cos(angle)) * radius * 35
  const y = latitude * 32.5 - depth * 13.3
  const r = 1.35 + (depth + 1) * 0.55
  return {
    latitude,
    wrapper: {
      left: `${round(50 + x - r)}%`,
      top: `${round(50 + y - r)}%`,
      width: `${round(r * 2)}%`,
      height: `${round(r * 2)}%`,
      opacity: round(0.2 + (depth + 1) * 0.35),
    },
    origin: `${round(((r - x) / (r * 2)) * 100)}% ${round(((r - y) / (r * 2)) * 100)}%`,
  }
})

export function OrbitBreathingOrb({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitBreathingOrbProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-breathing-orb-loader", className]
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
      <span aria-hidden="true" className="orbit-breathing-orb-loader-stage">
        {dots.map((dot, index) => (
          <span
            key={index}
            className="orbit-breathing-orb-loader-shade"
            style={dot.wrapper}
          >
            <span
              className="orbit-breathing-orb-loader-dot"
              style={{
                transformOrigin: dot.origin,
                animationDelay: `${-(dot.latitude + 1) * 0.18 * duration}s`,
              }}
            />
          </span>
        ))}
      </span>
      <style>{`
        .orbit-breathing-orb-loader { position: relative; display: inline-flex; flex-shrink: 0; }
        .orbit-breathing-orb-loader-stage { position: absolute; inset: 0; transform: rotate(-18deg); }
        .orbit-breathing-orb-loader-shade { position: absolute; }
        .orbit-breathing-orb-loader-dot { position: absolute; inset: 0; border-radius: 50%; background: currentColor; animation: orbit-breathing-orb-loader-breathe var(--loader-duration) ease-in-out infinite; }
        @keyframes orbit-breathing-orb-loader-breathe { 0%, 100% { transform: scale(.88); opacity: .7; } 50% { transform: scale(1.08); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .orbit-breathing-orb-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
