import type { CSSProperties, ComponentProps } from "react"

export type NetworkDeduceProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function NetworkDeduce({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: NetworkDeduceProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["network-deduce-loader", className].filter(Boolean).join(" ")}
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
      >
        {[
          "M50 16L30 46",
          "M50 16L70 46",
          "M30 46L16 80",
          "M30 46L40 80",
          "M70 46L60 80",
          "M70 46L84 80",
        ].map((path, index) => (
          <g key={path}>
            <path d={path} className="network-deduce-loader-track" />
            <path
              d={path}
              pathLength="100"
              className={`network-deduce-loader-signal ${index < 2 ? "network-deduce-loader-first" : "network-deduce-loader-second"}`}
            />
          </g>
        ))}
        {[
          [50, 16],
          [30, 46],
          [70, 46],
          [16, 80],
          [40, 80],
          [60, 80],
          [84, 80],
        ].map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="4"
            className="network-deduce-loader-node"
            style={{
              animationDelay: `${-(index === 0 ? 0 : index < 3 ? 0.72 : 0.42) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </svg>
      <style>{`
        .network-deduce-loader { display: inline-flex; flex-shrink: 0; }
        .network-deduce-loader-track { stroke-width: 2; opacity: .2; }
        .network-deduce-loader-signal { stroke-width: 3; stroke-dasharray: 18 100; opacity: 0; animation-duration: var(--loader-duration); animation-timing-function: linear; animation-iteration-count: infinite; }
        .network-deduce-loader-first { animation-name: network-deduce-loader-first-pass; }
        .network-deduce-loader-second { animation-name: network-deduce-loader-second-pass; }
        .network-deduce-loader-node { fill: currentColor; stroke: none; opacity: .6; animation: network-deduce-loader-pulse var(--loader-duration) ease-in-out infinite; }
        @keyframes network-deduce-loader-first-pass { 0% { stroke-dashoffset: 18; opacity: 0; } 5%, 25% { opacity: 1; } 30%, 100% { stroke-dashoffset: -100; opacity: 0; } }
        @keyframes network-deduce-loader-second-pass { 0%, 30% { stroke-dashoffset: 18; opacity: 0; } 35%, 55% { opacity: 1; } 60%, 100% { stroke-dashoffset: -100; opacity: 0; } }
        @keyframes network-deduce-loader-pulse { 0%, 12% { opacity: 1; } 30%, 90% { opacity: .4; } 100% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .network-deduce-loader-signal, .network-deduce-loader-node { animation: none; } .network-deduce-loader-signal { opacity: 0; } }
      `}</style>
    </span>
  )
}
