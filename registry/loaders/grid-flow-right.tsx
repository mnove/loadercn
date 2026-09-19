import type { CSSProperties, ComponentProps } from "react"

export type GridFlowRightProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridFlowRight({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridFlowRightProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-flow-right-loader", className]
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
      <span aria-hidden="true" className="grid-flow-right-loader-grid">
        {/* Cells share a phase along each line; brightness flows left to right. */}
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${((i % 4) / 4 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-flow-right-loader { display: inline-flex; flex-shrink: 0; }
        .grid-flow-right-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-flow-right-loader-grid > span { background: currentColor; border-radius: 0; opacity: .14; animation: grid-flow-right-loader-light var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-flow-right-loader-light { 0%, 100% { opacity: .14; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-flow-right-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
