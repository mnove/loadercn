import type { CSSProperties, ComponentProps } from "react"

export type GridPuzzleProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridPuzzle({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridPuzzleProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-puzzle-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-puzzle-loader-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i % 3) * 36}%`,
              top: `${Math.floor(i / 3) * 36}%`,
              animationName: `grid-puzzle-loader-tile-${i}`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-puzzle-loader { display: inline-flex; flex-shrink: 0; }
        .grid-puzzle-loader-grid { position: relative; width: 100%; height: 100%; }
        .grid-puzzle-loader-grid > span { position: absolute; width: 28%; height: 28%; border-radius: 12%; background: currentColor; animation-duration: var(--loader-duration); animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes grid-puzzle-loader-tile-0 { 0.000000% { left: 0%; top: 0%; } 2.916667% { left: 0%; top: 0%; } 8.333333% { left: 0%; top: 0%; } 11.250000% { left: 0%; top: 0%; } 16.666667% { left: 0%; top: 0%; } 19.583333% { left: 0%; top: 0%; } 25.000000% { left: 0%; top: 0%; } 27.916667% { left: 0%; top: 0%; } 33.333333% { left: 0%; top: 0%; } 36.250000% { left: 0%; top: 0%; } 41.666667% { left: 0%; top: 0%; } 44.583333% { left: 0%; top: 0%; } 50.000000% { left: 0%; top: 0%; } 52.916667% { left: 0%; top: 0%; } 58.333333% { left: 0%; top: 0%; } 61.250000% { left: 0%; top: 0%; } 66.666667% { left: 0%; top: 0%; } 69.583333% { left: 0%; top: 0%; } 75.000000% { left: 0%; top: 0%; } 77.916667% { left: 0%; top: 0%; } 83.333333% { left: 0%; top: 0%; } 86.250000% { left: 0%; top: 0%; } 91.666667% { left: 0%; top: 0%; } 94.583333% { left: 0%; top: 0%; } 100.000000% { left: 0%; top: 0%; } }
        @keyframes grid-puzzle-loader-tile-1 { 0.000000% { left: 36%; top: 0%; } 2.916667% { left: 36%; top: 0%; } 8.333333% { left: 36%; top: 0%; } 11.250000% { left: 36%; top: 0%; } 16.666667% { left: 36%; top: 0%; } 19.583333% { left: 36%; top: 0%; } 25.000000% { left: 36%; top: 0%; } 27.916667% { left: 36%; top: 0%; } 33.333333% { left: 36%; top: 0%; } 36.250000% { left: 36%; top: 0%; } 41.666667% { left: 36%; top: 0%; } 44.583333% { left: 36%; top: 0%; } 50.000000% { left: 36%; top: 0%; } 52.916667% { left: 36%; top: 0%; } 58.333333% { left: 36%; top: 0%; } 61.250000% { left: 36%; top: 0%; } 66.666667% { left: 36%; top: 0%; } 69.583333% { left: 36%; top: 0%; } 75.000000% { left: 36%; top: 0%; } 77.916667% { left: 36%; top: 0%; } 83.333333% { left: 36%; top: 0%; } 86.250000% { left: 36%; top: 0%; } 91.666667% { left: 36%; top: 0%; } 94.583333% { left: 36%; top: 0%; } 100.000000% { left: 36%; top: 0%; } }
        @keyframes grid-puzzle-loader-tile-2 { 0.000000% { left: 72%; top: 0%; } 2.916667% { left: 72%; top: 0%; } 8.333333% { left: 72%; top: 0%; } 11.250000% { left: 72%; top: 0%; } 16.666667% { left: 72%; top: 0%; } 19.583333% { left: 72%; top: 0%; } 25.000000% { left: 72%; top: 0%; } 27.916667% { left: 72%; top: 0%; } 33.333333% { left: 72%; top: 0%; } 36.250000% { left: 72%; top: 0%; } 41.666667% { left: 72%; top: 0%; } 44.583333% { left: 72%; top: 0%; } 50.000000% { left: 72%; top: 0%; } 52.916667% { left: 72%; top: 0%; } 58.333333% { left: 72%; top: 0%; } 61.250000% { left: 72%; top: 0%; } 66.666667% { left: 72%; top: 0%; } 69.583333% { left: 72%; top: 0%; } 75.000000% { left: 72%; top: 0%; } 77.916667% { left: 72%; top: 0%; } 83.333333% { left: 72%; top: 0%; } 86.250000% { left: 72%; top: 0%; } 91.666667% { left: 72%; top: 0%; } 94.583333% { left: 72%; top: 0%; } 100.000000% { left: 72%; top: 0%; } }
        @keyframes grid-puzzle-loader-tile-3 { 0.000000% { left: 0%; top: 36%; } 2.916667% { left: 0%; top: 36%; } 8.333333% { left: 0%; top: 36%; } 11.250000% { left: 0%; top: 36%; } 16.666667% { left: 0%; top: 36%; } 19.583333% { left: 0%; top: 36%; } 25.000000% { left: 0%; top: 36%; } 27.916667% { left: 0%; top: 36%; } 33.333333% { left: 0%; top: 36%; } 36.250000% { left: 0%; top: 36%; } 41.666667% { left: 0%; top: 36%; } 44.583333% { left: 0%; top: 36%; } 50.000000% { left: 0%; top: 36%; } 52.916667% { left: 0%; top: 36%; } 58.333333% { left: 0%; top: 36%; } 61.250000% { left: 0%; top: 36%; } 66.666667% { left: 0%; top: 36%; } 69.583333% { left: 0%; top: 36%; } 75.000000% { left: 0%; top: 36%; } 77.916667% { left: 0%; top: 36%; } 83.333333% { left: 0%; top: 36%; } 86.250000% { left: 0%; top: 36%; } 91.666667% { left: 0%; top: 36%; } 94.583333% { left: 0%; top: 36%; } 100.000000% { left: 0%; top: 36%; } }
        @keyframes grid-puzzle-loader-tile-4 { 0.000000% { left: 36%; top: 36%; } 2.916667% { left: 36%; top: 36%; } 8.333333% { left: 36%; top: 36%; } 11.250000% { left: 36%; top: 36%; } 16.666667% { left: 36%; top: 72%; } 19.583333% { left: 36%; top: 72%; } 25.000000% { left: 36%; top: 72%; } 27.916667% { left: 36%; top: 72%; } 33.333333% { left: 36%; top: 72%; } 36.250000% { left: 36%; top: 72%; } 41.666667% { left: 72%; top: 72%; } 44.583333% { left: 72%; top: 72%; } 50.000000% { left: 72%; top: 72%; } 52.916667% { left: 72%; top: 72%; } 58.333333% { left: 72%; top: 72%; } 61.250000% { left: 72%; top: 72%; } 66.666667% { left: 72%; top: 36%; } 69.583333% { left: 72%; top: 36%; } 75.000000% { left: 72%; top: 36%; } 77.916667% { left: 72%; top: 36%; } 83.333333% { left: 72%; top: 36%; } 86.250000% { left: 72%; top: 36%; } 91.666667% { left: 36%; top: 36%; } 94.583333% { left: 36%; top: 36%; } 100.000000% { left: 36%; top: 36%; } }
        @keyframes grid-puzzle-loader-tile-5 { 0.000000% { left: 72%; top: 36%; } 2.916667% { left: 72%; top: 36%; } 8.333333% { left: 72%; top: 36%; } 11.250000% { left: 72%; top: 36%; } 16.666667% { left: 72%; top: 36%; } 19.583333% { left: 72%; top: 36%; } 25.000000% { left: 36%; top: 36%; } 27.916667% { left: 36%; top: 36%; } 33.333333% { left: 36%; top: 36%; } 36.250000% { left: 36%; top: 36%; } 41.666667% { left: 36%; top: 36%; } 44.583333% { left: 36%; top: 36%; } 50.000000% { left: 36%; top: 72%; } 52.916667% { left: 36%; top: 72%; } 58.333333% { left: 36%; top: 72%; } 61.250000% { left: 36%; top: 72%; } 66.666667% { left: 36%; top: 72%; } 69.583333% { left: 36%; top: 72%; } 75.000000% { left: 72%; top: 72%; } 77.916667% { left: 72%; top: 72%; } 83.333333% { left: 72%; top: 72%; } 86.250000% { left: 72%; top: 72%; } 91.666667% { left: 72%; top: 72%; } 94.583333% { left: 72%; top: 72%; } 100.000000% { left: 72%; top: 36%; } }
        @keyframes grid-puzzle-loader-tile-6 { 0.000000% { left: 0%; top: 72%; } 2.916667% { left: 0%; top: 72%; } 8.333333% { left: 0%; top: 72%; } 11.250000% { left: 0%; top: 72%; } 16.666667% { left: 0%; top: 72%; } 19.583333% { left: 0%; top: 72%; } 25.000000% { left: 0%; top: 72%; } 27.916667% { left: 0%; top: 72%; } 33.333333% { left: 0%; top: 72%; } 36.250000% { left: 0%; top: 72%; } 41.666667% { left: 0%; top: 72%; } 44.583333% { left: 0%; top: 72%; } 50.000000% { left: 0%; top: 72%; } 52.916667% { left: 0%; top: 72%; } 58.333333% { left: 0%; top: 72%; } 61.250000% { left: 0%; top: 72%; } 66.666667% { left: 0%; top: 72%; } 69.583333% { left: 0%; top: 72%; } 75.000000% { left: 0%; top: 72%; } 77.916667% { left: 0%; top: 72%; } 83.333333% { left: 0%; top: 72%; } 86.250000% { left: 0%; top: 72%; } 91.666667% { left: 0%; top: 72%; } 94.583333% { left: 0%; top: 72%; } 100.000000% { left: 0%; top: 72%; } }
        @keyframes grid-puzzle-loader-tile-7 { 0.000000% { left: 36%; top: 72%; } 2.916667% { left: 36%; top: 72%; } 8.333333% { left: 72%; top: 72%; } 11.250000% { left: 72%; top: 72%; } 16.666667% { left: 72%; top: 72%; } 19.583333% { left: 72%; top: 72%; } 25.000000% { left: 72%; top: 72%; } 27.916667% { left: 72%; top: 72%; } 33.333333% { left: 72%; top: 36%; } 36.250000% { left: 72%; top: 36%; } 41.666667% { left: 72%; top: 36%; } 44.583333% { left: 72%; top: 36%; } 50.000000% { left: 72%; top: 36%; } 52.916667% { left: 72%; top: 36%; } 58.333333% { left: 36%; top: 36%; } 61.250000% { left: 36%; top: 36%; } 66.666667% { left: 36%; top: 36%; } 69.583333% { left: 36%; top: 36%; } 75.000000% { left: 36%; top: 36%; } 77.916667% { left: 36%; top: 36%; } 83.333333% { left: 36%; top: 72%; } 86.250000% { left: 36%; top: 72%; } 91.666667% { left: 36%; top: 72%; } 94.583333% { left: 36%; top: 72%; } 100.000000% { left: 36%; top: 72%; } }
        @media (prefers-reduced-motion: reduce) { .grid-puzzle-loader-grid > span { animation: none !important; } }
      `}</style>
    </span>
  )
}
