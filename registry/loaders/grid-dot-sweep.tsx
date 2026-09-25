import type { CSSProperties, ComponentProps } from "react"

export type GridDotSweepProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const columns = 8
const rows = 7
const gap = 10.3
// Diagonals counted from the bottom-right corner, where the sweep begins.
const diagonals = columns + rows - 2
// Share of the cycle the band takes to cross; the rest is a short pause.
const sweep = 0.7

export function GridDotSweep({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: GridDotSweepProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-dot-sweep-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${duration}s`,
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
        {Array.from({ length: rows }, (_, row) =>
          Array.from({ length: columns }, (_, column) => {
            const diagonal = columns - 1 - column + (rows - 1 - row)
            // Without motion, freeze the band midway across the grid.
            const glow = Math.exp(-(((diagonal - diagonals / 2) / 1.6) ** 2))
            return (
              <circle
                key={`${row}-${column}`}
                cx={50 + (column - (columns - 1) / 2) * gap}
                cy={50 + (row - (rows - 1) / 2) * gap}
                r="2.8"
                className="grid-dot-sweep-loader-dot"
                style={
                  {
                    "--grid-dot-sweep-glow": glow.toFixed(3),
                    animationDelay: `${((diagonal / diagonals) * sweep - 1) * duration}s`,
                  } as CSSProperties
                }
              />
            )
          })
        )}
      </svg>
      <style>{`
        .grid-dot-sweep-loader { display: inline-flex; flex-shrink: 0; }
        .grid-dot-sweep-loader-dot { fill: currentColor; transform-box: fill-box; transform-origin: center; opacity: calc(.12 + var(--grid-dot-sweep-glow) * .88); transform: scale(calc(.3 + var(--grid-dot-sweep-glow) * .7)); animation: grid-dot-sweep-loader-pass var(--loader-duration) cubic-bezier(.45, 0, .55, 1) infinite; }
        @keyframes grid-dot-sweep-loader-pass { 0%, 22%, 100% { opacity: .12; transform: scale(.3); } 10% { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .grid-dot-sweep-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
