import type { CSSProperties, ComponentProps } from "react"

export type GridWaveProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridWave({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridWaveProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-wave-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-wave-loader-grid">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          return (
            <span
              key={i}
              style={{
                animationDelay: `${((row + col) * -0.14 * Math.max(0.1, speed)) / 1.6}s`,
              }}
            />
          )
        })}
      </span>
      <style>{`
        .grid-wave-loader { display: inline-flex; flex-shrink: 0; }
        .grid-wave-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(3, 1fr); gap: 14%; }
        .grid-wave-loader-grid > span { background: currentColor; border-radius: 12%; animation: grid-wave-loader-motion var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-wave-loader-motion { 0%, 100% { opacity: .18; transform: scale(.65); } 45% { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .grid-wave-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
