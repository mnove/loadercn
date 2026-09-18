import type { CSSProperties, ComponentProps } from "react"

export type GridRippleProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridRipple({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridRippleProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-ripple-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-ripple-loader-grid">
        {Array.from({ length: 16 }, (_, i) => {
          const row = Math.floor(i / 4)
          const col = i % 4
          return (
            <span
              key={i}
              style={{
                animationDelay: `${(Math.hypot(row - 1.5, col - 1.5) * -0.25 * Math.max(0.1, speed)) / 1.6}s`,
              }}
            />
          )
        })}
      </span>
      <style>{`
        .grid-ripple-loader { display: inline-flex; flex-shrink: 0; }
        .grid-ripple-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); gap: 14%; }
        .grid-ripple-loader-grid > span { background: currentColor; border-radius: 0; animation: grid-ripple-loader-motion var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-ripple-loader-motion { 0%, 100% { transform: scale(.4); opacity: .2; } 50% { transform: scale(1); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-ripple-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
