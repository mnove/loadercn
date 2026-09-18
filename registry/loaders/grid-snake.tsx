import type { CSSProperties, ComponentProps } from "react"

export type GridSnakeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridSnake({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridSnakeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-snake-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-snake-loader-grid">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          return (
            <span
              key={i}
              style={{
                animationDelay: `${((row % 2 === 0 ? row * 3 + col : row * 3 + 2 - col) * -0.13 * Math.max(0.1, speed)) / 1.6}s`,
              }}
            />
          )
        })}
      </span>
      <style>{`
        .grid-snake-loader { display: inline-flex; flex-shrink: 0; }
        .grid-snake-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(3, 1fr); gap: 14%; }
        .grid-snake-loader-grid > span { background: currentColor; border-radius: 12%; animation: grid-snake-loader-motion var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-snake-loader-motion { 0%, 70%, 100% { opacity: .15; } 15%, 30% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-snake-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
