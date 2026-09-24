import type { CSSProperties, ComponentProps } from "react"

export type NetworkSynthesizeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function NetworkSynthesize({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: NetworkSynthesizeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["network-synthesize-loader", className]
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
        {[22, 50, 78].map((y, index) => (
          <g key={y}>
            <path
              d={`M12 ${y}H42Q56 ${y} 68 50H88`}
              className="network-synthesize-loader-track"
            />
            <path
              d={`M12 ${y}H42Q56 ${y} 68 50H88`}
              pathLength="100"
              className="network-synthesize-loader-signal"
              style={{
                animationDelay: `${(-index / 3) * Math.max(0.1, speed)}s`,
              }}
            />
            <circle
              cx="12"
              cy={y}
              r="3.5"
              className="network-synthesize-loader-node"
            />
            <circle
              cx="42"
              cy={y}
              r="3.5"
              className="network-synthesize-loader-node"
            />
          </g>
        ))}
        <circle
          cx="88"
          cy="50"
          r="5"
          className="network-synthesize-loader-output"
        />
      </svg>
      <style>{`
        .network-synthesize-loader { display: inline-flex; flex-shrink: 0; }
        .network-synthesize-loader-track { stroke-width: 2; opacity: .2; }
        .network-synthesize-loader-signal { stroke-width: 3; stroke-dasharray: 12 100; animation: network-synthesize-loader-flow var(--loader-duration) linear infinite; }
        .network-synthesize-loader-node { fill: currentColor; stroke: none; opacity: .65; }
        .network-synthesize-loader-output { fill: currentColor; stroke: none; animation: network-synthesize-loader-receive var(--loader-duration) ease-in-out infinite; }
        @keyframes network-synthesize-loader-flow { 0% { stroke-dashoffset: 12; opacity: 0; } 10%, 85% { opacity: 1; } 100% { stroke-dashoffset: -100; opacity: 0; } }
        @keyframes network-synthesize-loader-receive { 0%, 33%, 66%, 100% { opacity: 1; } 16%, 49%, 82% { opacity: .45; } }
        @media (prefers-reduced-motion: reduce) { .network-synthesize-loader-signal, .network-synthesize-loader-output { animation: none; } .network-synthesize-loader-signal { opacity: 0; } }
      `}</style>
    </span>
  )
}
