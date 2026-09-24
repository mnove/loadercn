import type { CSSProperties, ComponentProps } from "react"

export type OrbitHelixProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitHelix({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitHelixProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-helix-loader", className].filter(Boolean).join(" ")}
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
        {Array.from({ length: 10 }, (_, row) => {
          const phase = row / 12
          const restX = Math.cos(phase * Math.PI * 2) * 25
          return (
            <g key={row} transform={`translate(50 ${14 + row * 8})`}>
              <line
                className="orbit-helix-loader-link"
                x1="-25"
                x2="25"
                y1="0"
                y2="0"
                style={
                  {
                    "--orbit-helix-rest-scale": Math.abs(restX / 25),
                    animationDelay: `${-phase * Math.max(0.1, speed)}s`,
                  } as CSSProperties
                }
              />
              {[0, 1].map((strand) => (
                <circle
                  key={strand}
                  className="orbit-helix-loader-dot"
                  r="3.3"
                  style={
                    {
                      "--orbit-helix-rest-x": `${strand === 0 ? restX : -restX}px`,
                      animationDelay: `${-(phase + strand / 2) * Math.max(0.1, speed)}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </g>
          )
        })}
      </svg>
      <style>{`
        .orbit-helix-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-helix-loader-dot { fill: currentColor; transform: translateX(var(--orbit-helix-rest-x)); animation: orbit-helix-loader-turn var(--loader-duration) ease-in-out infinite; }
        .orbit-helix-loader-link { stroke: currentColor; stroke-width: 1.2; opacity: .2; transform: scaleX(var(--orbit-helix-rest-scale)); animation: orbit-helix-loader-link-turn var(--loader-duration) ease-in-out infinite; }
        @keyframes orbit-helix-loader-turn { 0%, 100% { transform: translateX(25px) scale(.85); opacity: .6; } 25% { transform: translateX(0) scale(1.15); opacity: 1; } 50% { transform: translateX(-25px) scale(.85); opacity: .6; } 75% { transform: translateX(0) scale(.65); opacity: .3; } }
        @keyframes orbit-helix-loader-link-turn { 0%, 50%, 100% { transform: scaleX(1); } 25%, 75% { transform: scaleX(0); } }
        @media (prefers-reduced-motion: reduce) { .orbit-helix-loader-dot, .orbit-helix-loader-link { animation: none; } }
 `}</style>
    </span>
  )
}
