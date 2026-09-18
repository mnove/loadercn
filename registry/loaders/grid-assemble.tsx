import type { CSSProperties, ComponentProps } from "react"

export type GridAssembleProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridAssemble({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridAssembleProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-assemble-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-assemble-loader-grid">
        {/* Fixed positions keep server and client rendering identical. */}
        {[
          [8, 20],
          [63, 8],
          [91, 32],
          [26, 42],
          [78, 59],
          [46, 27],
          [9, 81],
          [43, 92],
          [88, 87],
        ].map(([x, y], i) => (
          <span
            key={i}
            style={
              {
                "--scatter-x": `${x}%`,
                "--scatter-y": `${y}%`,
                "--grid-x": `${18 + (i % 3) * 32}%`,
                "--grid-y": `${18 + Math.floor(i / 3) * 32}%`,
              } as CSSProperties
            }
          />
        ))}
      </span>
      <style>{`
        .grid-assemble-loader { display: inline-flex; flex-shrink: 0; }
        .grid-assemble-loader-grid { position: relative; width: 100%; height: 100%; }
        .grid-assemble-loader-grid > span { position: absolute; width: 15%; height: 15%; background: currentColor; border-radius: 15%; left: var(--grid-x); top: var(--grid-y); transform: translate(-50%, -50%); animation: grid-assemble-loader-settle var(--loader-duration) cubic-bezier(.65, 0, .35, 1) infinite; }
        @keyframes grid-assemble-loader-settle { 0%, 12%, 100% { left: var(--scatter-x); top: var(--scatter-y); opacity: .4; border-radius: 50%; transform: translate(-50%, -50%) rotate(90deg); } 40%, 65% { left: var(--grid-x); top: var(--grid-y); opacity: 1; border-radius: 15%; transform: translate(-50%, -50%) rotate(0deg); } }
        @media (prefers-reduced-motion: reduce) { .grid-assemble-loader-grid > span { animation: none; } }
      `}</style>
    </span>
  )
}
