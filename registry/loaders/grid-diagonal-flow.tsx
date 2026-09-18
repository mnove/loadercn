import type { CSSProperties, ComponentProps } from "react"

export type GridDiagonalFlowProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridDiagonalFlow({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridDiagonalFlowProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-diagonal-flow-loader", className]
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
      <span aria-hidden="true" className="grid-diagonal-flow-loader-grid">
        {/* Equal row + column values share a phase, lighting a whole diagonal. */}
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${((Math.floor(i / 4) + (i % 4)) / 8 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-diagonal-flow-loader { display: inline-flex; flex-shrink: 0; }
        .grid-diagonal-flow-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-diagonal-flow-loader-grid > span { background: currentColor; border-radius: 0; opacity: .14; animation: grid-diagonal-flow-loader-light var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-diagonal-flow-loader-light { 0%, 100% { opacity: .14; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-diagonal-flow-loader-grid > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
