import type { CSSProperties, ComponentProps } from "react"

export type ClassicSquaresProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicSquares({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicSquaresProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-squares-loader", className]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-size": `${size}px`,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="classic-squares-loader-body">
        <span className="classic-squares-loader-square" />
        <span className="classic-squares-loader-square classic-squares-loader-inner" />
      </span>
      <style>{`
        .classic-squares-loader { display: inline-flex; flex-shrink: 0; }
        .classic-squares-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-squares-loader-square { position: absolute; inset: 18%; border: calc(var(--loader-size) * .055) solid currentColor; animation: classic-squares-loader-spin var(--loader-duration) ease-in-out infinite; }
        .classic-squares-loader-inner { inset: 33%; opacity: .55; animation-direction: reverse; }
        @keyframes classic-squares-loader-spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) { .classic-squares-loader-body, .classic-squares-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
