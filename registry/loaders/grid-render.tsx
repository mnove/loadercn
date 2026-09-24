import type { CSSProperties, ComponentProps } from "react"

export type GridRenderProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridRender({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridRenderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-render-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-render-loader-grid">
        {Array.from({ length: 16 }, (_, index) => (
          <span
            key={index}
            className="grid-render-loader-cell"
            style={{ animationName: `grid-render-loader-cell-${index}` }}
          />
        ))}
      </span>
      <style>{`
        .grid-render-loader { display: inline-flex; flex-shrink: 0; }
        .grid-render-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 8%; }
        .grid-render-loader-cell { background: currentColor; border-radius: 12%; opacity: .55; animation-duration: var(--loader-duration); animation-timing-function: linear; animation-iteration-count: infinite; }
        ${Array.from({ length: 16 }, (_, index) => `@keyframes grid-render-loader-cell-${index} { 0%, ${5 + index * 3.5}% { opacity: .12; } ${8 + index * 3.5}% { opacity: 1; } ${17 + index * 3.5}%, 78% { opacity: .65; } 94%, 100% { opacity: .12; } }`).join("\n")}
        @media (prefers-reduced-motion: reduce) { .grid-render-loader-cell { animation: none; } }
 `}</style>
    </span>
  )
}
