import type { CSSProperties, ComponentProps } from "react"

export type ClassicCircuitProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicCircuit({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicCircuitProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-circuit-loader", className]
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
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {["M12 22H40V48H88", "M12 78H60V58H88", "M12 50H24V36H72V22H88"].map(
          (path, index) => (
            <g key={path}>
              <path d={path} className="classic-circuit-loader-track" />
              <path
                d={path}
                pathLength="100"
                className="classic-circuit-loader-signal"
                style={{
                  animationDelay: `${(-index / 3) * Math.max(0.1, speed)}s`,
                }}
              />
            </g>
          )
        )}
        {[
          [12, 22],
          [88, 48],
          [12, 78],
          [88, 58],
          [12, 50],
          [88, 22],
        ].map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2.5"
            className="classic-circuit-loader-node"
          />
        ))}
      </svg>
      <style>{`
        .classic-circuit-loader { display: inline-flex; flex-shrink: 0; }
        .classic-circuit-loader-track { stroke-width: 2; opacity: .18; }
        .classic-circuit-loader-signal { stroke-width: 3.5; stroke-dasharray: 8 92; animation: classic-circuit-loader-travel var(--loader-duration) linear infinite; }
        .classic-circuit-loader-node { fill: currentColor; stroke: none; opacity: .5; }
        @keyframes classic-circuit-loader-travel { 0% { stroke-dashoffset: 8; opacity: 0; } 10%, 85% { opacity: 1; } 100% { stroke-dashoffset: -100; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .classic-circuit-loader-signal { animation: none; stroke-dashoffset: -40; opacity: .8; } }
 `}</style>
    </span>
  )
}
