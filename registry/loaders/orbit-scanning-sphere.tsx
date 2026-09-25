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

// The scan follows a sphere's cross-section; CSS interpolates one sampled pass.
const scanFrames = Array.from({ length: 25 }, (_, step) => {
  const progress = step / 24
  const latitude = progress * 2 - 1
  const width = Math.sqrt(Math.max(0, 1 - latitude * latitude))
  const opacity = round(Math.sin(progress * Math.PI)) * 0.5
  return `${progress * 100}% { transform: translateY(${latitude * 38}px) scaleX(${width.toFixed(6)}); opacity: ${opacity.toFixed(6)}; }`
}).join("\n")

export function OrbitScanningSphere({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitScanningSphereProps) {
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
          {Array.from({ length: 56 }, (_, index) => {
            const latitude = 1 - (index + 0.5) / 28
            const radius = Math.sqrt(1 - latitude * latitude)
            const angle = index * 2.39996322973
            const depth = round(Math.sin(angle)) * radius
            const x = round(Math.cos(angle)) * radius * 38
            const y = latitude * 35 - depth * 14.44
            const phase = (y + 38) / 76
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={1.4 + (depth + 1) * 0.35}
                className="orbit-scanning-sphere-loader-dot"
                style={
                  {
                    "--orbit-scanning-sphere-opacity":
                      0.18 + (depth + 1) * 0.17,
                    animationDelay: `${-(1 - phase) * Math.max(0.1, speed)}s`,
                  } as CSSProperties
                }
              />
            )
          })}
          <ellipse
            rx="38"
            ry="5"
            className="orbit-scanning-sphere-loader-scan"
          />
        </g>
      </svg>
      <style>{`
        .orbit-scanning-sphere-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-scanning-sphere-loader-dot { fill: currentColor; transform-box: fill-box; transform-origin: center; opacity: var(--orbit-scanning-sphere-opacity); animation: orbit-scanning-sphere-loader-reveal var(--loader-duration) linear infinite; }
        .orbit-scanning-sphere-loader-scan { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0; animation: orbit-scanning-sphere-loader-sweep var(--loader-duration) linear infinite; }
        @keyframes orbit-scanning-sphere-loader-reveal { 0%, 2%, 100% { opacity: 1; transform: scale(1.3); } 18%, 92% { opacity: var(--orbit-scanning-sphere-opacity); transform: scale(1); } }
        @keyframes orbit-scanning-sphere-loader-sweep { ${scanFrames} }
        @media (prefers-reduced-motion: reduce) { .orbit-scanning-sphere-loader-dot, .orbit-scanning-sphere-loader-scan { animation: none; } }
      `}</style>
    </span>
  )
}
