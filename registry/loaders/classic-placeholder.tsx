import type { CSSProperties, ComponentProps } from "react"

export type ClassicPlaceholderProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicPlaceholder({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicPlaceholderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-placeholder-loader", className]
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
        {[15, 11, 13, 8].map((count, row) => (
          <g key={row}>
            {Array.from({ length: count }, (_, column) => {
              const x = 50 + (column - (count - 1) / 2) * 5
              // Phase the stationary dots by position to carry light across the lines.
              const phase = ((x - 15) / 70) * 0.55 + row * 0.045
              return (
                <circle
                  key={column}
                  cx={x}
                  cy={27 + row * 15}
                  r="1.8"
                  className="classic-placeholder-loader-dot"
                  style={{
                    animationDelay: `${-(1 - phase) * Math.max(0.1, speed)}s`,
                  }}
                />
              )
            })}
          </g>
        ))}
      </svg>
      <style>{`
        .classic-placeholder-loader { display: inline-flex; flex-shrink: 0; }
        .classic-placeholder-loader-dot { fill: currentColor; opacity: .5; transform-box: fill-box; transform-origin: center; animation: classic-placeholder-loader-shimmer var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-placeholder-loader-shimmer { 0%, 100% { opacity: .95; transform: scale(1.15); } 18%, 82% { opacity: .2; transform: scale(.8); } }
        @media (prefers-reduced-motion: reduce) { .classic-placeholder-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
