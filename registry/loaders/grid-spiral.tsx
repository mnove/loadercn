import type { CSSProperties, ComponentProps } from "react"

export type GridSpiralProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridSpiral({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridSpiralProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-spiral-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-spiral-loader-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            style={{ animationName: `grid-spiral-loader-cell-${i}` }}
          />
        ))}
      </span>
      <style>{`
        .grid-spiral-loader { display: inline-flex; flex-shrink: 0; }
        .grid-spiral-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(3, 1fr); gap: 14%; }
        .grid-spiral-loader-grid > span { border-radius: 12%; background: currentColor; opacity: .15; animation-duration: var(--loader-duration); animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes grid-spiral-loader-cell-0 { 0% { opacity: 0.15; } 1% { opacity: 0.15; } 4% { opacity: 1; } 7% { opacity: 0.15; } 93% { opacity: 0.15; } 96% { opacity: 1; } 99% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-1 { 0% { opacity: 0.15; } 6% { opacity: 0.15; } 9% { opacity: 1; } 12% { opacity: 0.15; } 88% { opacity: 0.15; } 91% { opacity: 1; } 94% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-2 { 0% { opacity: 0.15; } 11% { opacity: 0.15; } 14% { opacity: 1; } 17% { opacity: 0.15; } 83% { opacity: 0.15; } 86% { opacity: 1; } 89% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-3 { 0% { opacity: 0.15; } 36% { opacity: 0.15; } 39% { opacity: 1; } 42% { opacity: 0.15; } 58% { opacity: 0.15; } 61% { opacity: 1; } 64% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-4 { 0% { opacity: 0.15; } 41% { opacity: 0.15; } 44% { opacity: 1; } 47% { opacity: 0.15; } 53% { opacity: 0.15; } 56% { opacity: 1; } 59% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-5 { 0% { opacity: 0.15; } 16% { opacity: 0.15; } 19% { opacity: 1; } 22% { opacity: 0.15; } 78% { opacity: 0.15; } 81% { opacity: 1; } 84% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-6 { 0% { opacity: 0.15; } 31% { opacity: 0.15; } 34% { opacity: 1; } 37% { opacity: 0.15; } 63% { opacity: 0.15; } 66% { opacity: 1; } 69% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-7 { 0% { opacity: 0.15; } 26% { opacity: 0.15; } 29% { opacity: 1; } 32% { opacity: 0.15; } 68% { opacity: 0.15; } 71% { opacity: 1; } 74% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @keyframes grid-spiral-loader-cell-8 { 0% { opacity: 0.15; } 21% { opacity: 0.15; } 24% { opacity: 1; } 27% { opacity: 0.15; } 73% { opacity: 0.15; } 76% { opacity: 1; } 79% { opacity: 0.15; } 100% { opacity: 0.15; } }
        @media (prefers-reduced-motion: reduce) { .grid-spiral-loader-grid > span { animation: none !important; opacity: .65; } }
      `}</style>
    </span>
  )
}
