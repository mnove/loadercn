import type { CSSProperties, ComponentProps } from "react"

export type GridPerimeterProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridPerimeter({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridPerimeterProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-perimeter-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-perimeter-loader-grid">
        {[0, 1, 2, 7, -1, 3, 6, 5, 4].map((step, index) => (
          <span
            key={index}
            style={
              step < 0
                ? { opacity: 0 }
                : {
                    animationName: "grid-perimeter-loader-chase",
                    animationDelay: `${(step / 8 - 1) * Math.max(0.1, speed)}s`,
                  }
            }
          />
        ))}
      </span>
      <style>{`
        .grid-perimeter-loader { display: inline-flex; flex-shrink: 0; }
        .grid-perimeter-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(3, 1fr); gap: 14%; }
        .grid-perimeter-loader-grid > span { border-radius: 12%; background: currentColor; animation-duration: var(--loader-duration); animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes grid-perimeter-loader-chase { 0%, 100% { opacity: 1; } 12.5% { opacity: .65; } 37.5%, 87.5% { opacity: .12; } }
        @media (prefers-reduced-motion: reduce) { .grid-perimeter-loader-grid > span { animation: none !important; opacity: .65; } }
      `}</style>
    </span>
  )
}
