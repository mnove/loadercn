import type { CSSProperties, ComponentProps } from "react"

export type ClassicDotMorphProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicDotMorph({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicDotMorphProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-dot-morph-loader", className]
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
        {Array.from({ length: 24 }, (_, index) => {
          const angle = (index / 24) * Math.PI * 2 - Math.PI / 2
          const x = Math.cos(angle)
          const y = Math.sin(angle)
          const vertices = [
            [50, 12],
            [84, 76],
            [16, 76],
          ]
          const edge = Math.floor(index / 8)
          const amount = (index % 8) / 8
          const from = vertices[edge]
          const to = vertices[(edge + 1) % 3]
          const squareScale = Math.max(Math.abs(x), Math.abs(y))
          return (
            <circle
              key={index}
              r="2.7"
              className="classic-dot-morph-loader-dot"
              style={
                {
                  "--classic-dot-morph-circle": `${50 + x * 35}px, ${50 + y * 35}px`,
                  "--classic-dot-morph-triangle": `${from[0] + (to[0] - from[0]) * amount}px, ${from[1] + (to[1] - from[1]) * amount}px`,
                  "--classic-dot-morph-square": `${50 + (x / squareScale) * 30}px, ${50 + (y / squareScale) * 30}px`,
                } as CSSProperties
              }
            />
          )
        })}
      </svg>
      <style>{`
        .classic-dot-morph-loader { display: inline-flex; flex-shrink: 0; }
        .classic-dot-morph-loader-dot { fill: currentColor; transform: translate(var(--classic-dot-morph-circle)); animation: classic-dot-morph-loader-shape var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-dot-morph-loader-shape { 0%, 12%, 100% { transform: translate(var(--classic-dot-morph-circle)); } 33%, 45% { transform: translate(var(--classic-dot-morph-triangle)); } 66%, 78% { transform: translate(var(--classic-dot-morph-square)); } }
        @media (prefers-reduced-motion: reduce) { .classic-dot-morph-loader-dot { animation: none; } }
 `}</style>
    </span>
  )
}
