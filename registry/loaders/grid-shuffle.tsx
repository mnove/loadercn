import type { CSSProperties, ComponentProps } from "react"

export type GridShuffleProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridShuffle({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridShuffleProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-shuffle-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-shuffle-loader-grid">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          return (
            <span
              key={i}
              style={{
                animationDelay: `${((row * 2 + col) * -0.18 * Math.max(0.1, speed)) / 1.6}s`,
              }}
            />
          )
        })}
      </span>
      <style>{`
        .grid-shuffle-loader { display: inline-flex; flex-shrink: 0; }
        .grid-shuffle-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(3, 1fr); gap: 14%; }
        .grid-shuffle-loader-grid > span { background: currentColor; border-radius: 12%; animation: grid-shuffle-loader-motion var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-shuffle-loader-motion { 0%, 100% { transform: scale(.6) rotate(0deg); opacity: .3; } 50% { transform: scale(1) rotate(90deg); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-shuffle-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
