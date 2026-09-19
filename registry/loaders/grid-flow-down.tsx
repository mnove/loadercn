import type { CSSProperties, ComponentProps } from "react"

export type GridFlowDownProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridFlowDown({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridFlowDownProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-flow-down-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-flow-down-loader-grid">
        {/* Cells share a phase along each line; brightness flows top to bottom. */}
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${(Math.floor(i / 4) / 4 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-flow-down-loader { display: inline-flex; flex-shrink: 0; }
        .grid-flow-down-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-flow-down-loader-grid > span { background: currentColor; border-radius: 0; opacity: .14; animation: grid-flow-down-loader-light var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-flow-down-loader-light { 0%, 100% { opacity: .14; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-flow-down-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
