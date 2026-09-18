import type { CSSProperties, ComponentProps } from "react"

export type GridScanProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridScan({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridScanProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-scan-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-scan-loader-grid">
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
        .grid-scan-loader { display: inline-flex; flex-shrink: 0; }
        .grid-scan-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-scan-loader-grid > span { background: currentColor; border-radius: 50%; opacity: .16; animation: grid-scan-loader-light var(--loader-duration) linear infinite; }
        @keyframes grid-scan-loader-light { 0%, 100% { opacity: 1; } 12.5% { opacity: .85; } 37.5%, 93.75% { opacity: .16; } }
        @media (prefers-reduced-motion: reduce) { .grid-scan-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
