import type { CSSProperties, ComponentProps } from "react"

export type GridFlowUpProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridFlowUp({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridFlowUpProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-flow-up-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-flow-up-loader-grid">
        {/* Cells share a phase along each line; brightness flows bottom to top. */}
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${((3 - Math.floor(i / 4)) / 4 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-flow-up-loader { display: inline-flex; flex-shrink: 0; }
        .grid-flow-up-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-flow-up-loader-grid > span { background: currentColor; border-radius: 0; opacity: .14; animation: grid-flow-up-loader-light var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-flow-up-loader-light { 0%, 100% { opacity: .14; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-flow-up-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
