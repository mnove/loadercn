import type { CSSProperties, ComponentProps } from "react"

export type GridFlowLeftProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridFlowLeft({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridFlowLeftProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-flow-left-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-flow-left-loader-grid">
        {/* Cells share a phase along each line; brightness flows right to left. */}
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${((3 - (i % 4)) / 4 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-flow-left-loader { display: inline-flex; flex-shrink: 0; }
        .grid-flow-left-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-flow-left-loader-grid > span { background: currentColor; border-radius: 0; opacity: .14; animation: grid-flow-left-loader-light var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-flow-left-loader-light { 0%, 100% { opacity: .14; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-flow-left-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
