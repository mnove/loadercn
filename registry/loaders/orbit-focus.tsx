import type { CSSProperties, ComponentProps } from "react"

export type OrbitFocusProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitFocus({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitFocusProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-focus-loader", className].filter(Boolean).join(" ")}
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
      >
        {[
          { x: -10, y: -12, angle: -35 },
          { x: 12, y: -6, angle: 25 },
          { x: -8, y: 10, angle: -20 },
          { x: 8, y: 8, angle: 35 },
        ].map((ring, index) => (
          <circle
            key={index}
            cx="50"
            cy="50"
            r={10 + index * 9}
            className="orbit-focus-loader-ring"
            style={
              {
                "--orbit-focus-scatter": `translate(${ring.x}px, ${ring.y}px) rotate(${ring.angle}deg) scaleY(.45)`,
                "--orbit-focus-opacity": 0.95 - index * 0.17,
              } as CSSProperties
            }
          />
        ))}
        <circle cx="50" cy="50" r="3" className="orbit-focus-loader-center" />
      </svg>
      <style>{`
        .orbit-focus-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-focus-loader-ring { stroke-width: 2; transform-origin: 50px 50px; opacity: var(--orbit-focus-opacity); animation: orbit-focus-loader-align var(--loader-duration) ease-in-out infinite; }
        .orbit-focus-loader-center { fill: currentColor; stroke: none; }
        @keyframes orbit-focus-loader-align { 0%, 12%, 100% { transform: var(--orbit-focus-scatter); opacity: .35; } 45%, 60% { transform: translate(0, 0) rotate(0deg) scaleY(1); opacity: var(--orbit-focus-opacity); } }
        @media (prefers-reduced-motion: reduce) { .orbit-focus-loader-ring { animation: none; } }
      `}</style>
    </span>
  )
}
