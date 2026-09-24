import type { CSSProperties, ComponentProps } from "react"

export type ClassicProcessingProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicProcessing({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicProcessingProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-processing-loader", className]
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
        {[28, 43, 58, 73].map((y, row) => (
          <g key={y} transform={`translate(10 ${y})`}>
            {Array.from({ length: 5 }, (_, packet) => (
              <circle
                key={packet}
                r="2.4"
                className="classic-processing-loader-packet"
                style={
                  {
                    "--classic-processing-rest-x": `${8 + packet * 16}px`,
                    animationDelay: `${-(packet / 5 + row * 0.075) * Math.max(0.1, speed)}s`,
                  } as CSSProperties
                }
              />
            ))}
          </g>
        ))}
      </svg>
      <style>{`
        .classic-processing-loader { display: inline-flex; flex-shrink: 0; }
        .classic-processing-loader-packet { fill: currentColor; opacity: .6; transform: translateX(var(--classic-processing-rest-x)); animation: classic-processing-loader-flow var(--loader-duration) linear infinite; }
        @keyframes classic-processing-loader-flow { 0% { transform: translateX(0) scale(.4); opacity: 0; } 25% { transform: translateX(20px) scale(.8); opacity: .5; } 50% { transform: translateX(40px) scale(1.2); opacity: 1; } 75% { transform: translateX(60px) scale(.8); opacity: .5; } 100% { transform: translateX(80px) scale(.4); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .classic-processing-loader-packet { animation: none; } }
      `}</style>
    </span>
  )
}
