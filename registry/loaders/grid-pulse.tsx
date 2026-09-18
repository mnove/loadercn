import type { CSSProperties, ComponentProps } from "react"

export type GridPulseProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridPulse({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridPulseProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-pulse-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-pulse-loader-grid">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          return (
            <span
              key={i}
              style={{
                animationDelay: `${((Math.abs(row - 1) + Math.abs(col - 1)) * -0.2 * Math.max(0.1, speed)) / 1.6}s`,
              }}
            />
          )
        })}
      </span>
      <style>{`
        .grid-pulse-loader { display: inline-flex; flex-shrink: 0; }
        .grid-pulse-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(3, 1fr); gap: 14%; }
        .grid-pulse-loader-grid > span { background: currentColor; border-radius: 50%; animation: grid-pulse-loader-motion var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-pulse-loader-motion { 0%, 100% { opacity: .2; transform: scale(.5); } 50% { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .grid-pulse-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
