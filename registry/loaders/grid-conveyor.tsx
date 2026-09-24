import type { CSSProperties, ComponentProps } from "react"

export type GridConveyorProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridConveyor({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridConveyorProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-conveyor-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-conveyor-loader-grid">
        {[0, 1, 2].map((row) => (
          <span key={row} className="grid-conveyor-loader-row">
            <span
              className="grid-conveyor-loader-track"
              style={{ animationDirection: row === 1 ? "reverse" : "normal" }}
            >
              {Array.from({ length: 6 }, (_, col) => (
                <span key={col} />
              ))}
            </span>
          </span>
        ))}
      </span>
      <style>{`
        .grid-conveyor-loader { display: inline-flex; flex-shrink: 0; }
        .grid-conveyor-loader-grid { display: grid; width: 100%; height: 100%; grid-template-rows: repeat(3, 1fr); gap: 14%; }
        .grid-conveyor-loader-row { position: relative; overflow: hidden; }
        .grid-conveyor-loader-track { display: flex; gap: 7%; width: 200%; height: 100%; animation: grid-conveyor-loader-slide var(--loader-duration) linear infinite; }
        .grid-conveyor-loader-track > span { flex: 0 0 12%; height: 100%; border-radius: 12%; background: currentColor; }
        .grid-conveyor-loader-track > span:nth-child(3n + 2) { opacity: .6; }
        .grid-conveyor-loader-track > span:nth-child(3n) { opacity: .3; }
        @keyframes grid-conveyor-loader-slide { to { transform: translateX(-57%); } }
        @media (prefers-reduced-motion: reduce) { .grid-conveyor-loader-track { animation: none; } }
      `}</style>
    </span>
  )
}
