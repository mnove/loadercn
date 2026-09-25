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

export function OrbitBreathingOrb({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitBreathingOrbProps) {
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
            const radius = Math.sqrt(1 - latitude * latitude)
            const angle = index * 2.39996322973
            const depth = round(Math.sin(angle)) * radius
            const x = round(Math.cos(angle)) * radius * 35
            const y = latitude * 32.5 - depth * 13.3
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={1.35 + (depth + 1) * 0.55}
                className="orbit-breathing-orb-loader-dot"
                style={
                  {
                    "--orbit-breathing-orb-opacity": 0.2 + (depth + 1) * 0.35,
                    animationDelay: `${-(latitude + 1) * 0.18 * Math.max(0.1, speed)}s`,
                  } as CSSProperties
                }
              />
            )
          })}
        </g>
      </svg>
      <style>{`
        .orbit-breathing-orb-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-breathing-orb-loader-dot { fill: currentColor; opacity: var(--orbit-breathing-orb-opacity); transform-origin: 0 0; animation: orbit-breathing-orb-loader-breathe var(--loader-duration) ease-in-out infinite; }
        @keyframes orbit-breathing-orb-loader-breathe { 0%, 100% { transform: scale(.88); opacity: calc(var(--orbit-breathing-orb-opacity) * .7); } 50% { transform: scale(1.08); opacity: var(--orbit-breathing-orb-opacity); } }
        @media (prefers-reduced-motion: reduce) { .orbit-breathing-orb-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
