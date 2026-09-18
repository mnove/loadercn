import type { CSSProperties, ComponentProps } from "react"

export type GridCheckerProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridChecker({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridCheckerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-checker-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-checker-loader-grid">
        {Array.from({ length: 16 }, (_, i) => {
          const row = Math.floor(i / 4)
          const col = i % 4
          return (
            <span
              key={i}
              style={{
                animationDelay: `${(((row + col) % 2) * -0.8 * Math.max(0.1, speed)) / 1.6}s`,
              }}
            />
          )
        })}
      </span>
      <style>{`
        .grid-checker-loader { display: inline-flex; flex-shrink: 0; }
        .grid-checker-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); gap: 14%; }
        .grid-checker-loader-grid > span { background: currentColor; border-radius: 12%; animation: grid-checker-loader-motion var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-checker-loader-motion { 0%, 100% { opacity: .18; transform: scale(.75); } 50% { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .grid-checker-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
