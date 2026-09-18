import type { CSSProperties, ComponentProps } from "react"

export type GridScanBounceProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridScanBounce({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridScanBounceProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-scan-bounce-loader", className]
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
      <span aria-hidden="true" className="grid-scan-bounce-loader-grid">
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              animationName: `grid-scan-bounce-loader-row-${Math.floor(i / 4)}`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-scan-bounce-loader { display: inline-flex; flex-shrink: 0; }
        .grid-scan-bounce-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-scan-bounce-loader-grid > span { background: currentColor; border-radius: 50%; opacity: .16; animation-duration: var(--loader-duration); animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes grid-scan-bounce-loader-row-0 { 0.0000% { opacity: 1; } 12.0000% { opacity: 0.16; } 88.0000% { opacity: 0.16; } 100.0000% { opacity: 1; } }
        @keyframes grid-scan-bounce-loader-row-1 { 0.0000% { opacity: 0.16; } 4.6667% { opacity: 0.16; } 16.6667% { opacity: 1; } 28.6667% { opacity: 0.16; } 71.3333% { opacity: 0.16; } 83.3333% { opacity: 1; } 95.3333% { opacity: 0.16; } 100.0000% { opacity: 0.16; } }
        @keyframes grid-scan-bounce-loader-row-2 { 0.0000% { opacity: 0.16; } 21.3333% { opacity: 0.16; } 33.3333% { opacity: 1; } 45.3333% { opacity: 0.16; } 54.6667% { opacity: 0.16; } 66.6667% { opacity: 1; } 78.6667% { opacity: 0.16; } 100.0000% { opacity: 0.16; } }
        @keyframes grid-scan-bounce-loader-row-3 { 0.0000% { opacity: 0.16; } 38.0000% { opacity: 0.16; } 50.0000% { opacity: 1; } 62.0000% { opacity: 0.16; } 100.0000% { opacity: 0.16; } }
        @media (prefers-reduced-motion: reduce) { .grid-scan-bounce-loader-grid > span { animation: none !important; opacity: .65; } }
      `}</style>
    </span>
  )
}
