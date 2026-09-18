import type { CSSProperties, ComponentProps } from "react"

export type GridScanSquaresProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridScanSquares({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridScanSquaresProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-scan-squares-loader", className]
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
      <span aria-hidden="true" className="grid-scan-squares-loader-grid">
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${(i / 16 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-scan-squares-loader { display: inline-flex; flex-shrink: 0; }
        .grid-scan-squares-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-scan-squares-loader-grid > span { background: currentColor; border-radius: 0; opacity: .16; animation: grid-scan-squares-loader-light var(--loader-duration) linear infinite; }
        @keyframes grid-scan-squares-loader-light { 0%, 100% { opacity: 1; } 12.5% { opacity: .85; } 37.5%, 93.75% { opacity: .16; } }
        @media (prefers-reduced-motion: reduce) { .grid-scan-squares-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
