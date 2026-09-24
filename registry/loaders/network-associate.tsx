import type { CSSProperties, ComponentProps } from "react"

export type NetworkAssociateProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function NetworkAssociate({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: NetworkAssociateProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["network-associate-loader", className]
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
        {[
          "M24 22L50 48L78 28Z",
          "M78 28L76 78L50 48Z",
          "M76 78L20 74L24 22L50 48Z",
        ].map((path, index) => (
          <path
            key={path}
            d={path}
            pathLength="100"
            className="network-associate-loader-links"
            style={{
              animationDelay: `${(-index / 3) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
        {[
          [24, 22],
          [78, 28],
          [50, 48],
          [20, 74],
          [76, 78],
        ].map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={index === 2 ? 4.5 : 4}
            className="network-associate-loader-node"
            style={{
              animationDelay: `${(-index / 5) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </svg>
      <style>{`
        .network-associate-loader { display: inline-flex; flex-shrink: 0; }
        .network-associate-loader-links { stroke-width: 2; stroke-dasharray: 100; opacity: .15; animation: network-associate-loader-connect var(--loader-duration) ease-in-out infinite; }
        .network-associate-loader-node { fill: currentColor; stroke: none; opacity: .7; animation: network-associate-loader-notice var(--loader-duration) ease-in-out infinite; }
        @keyframes network-associate-loader-connect { 0%, 100% { stroke-dashoffset: 100; opacity: 0; } 18%, 35% { stroke-dashoffset: 0; opacity: .7; } 60%, 99% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes network-associate-loader-notice { 0%, 100% { opacity: .5; } 25%, 40% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .network-associate-loader-links, .network-associate-loader-node { animation: none; } }
      `}</style>
    </span>
  )
}
