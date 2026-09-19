import type { CSSProperties, ComponentProps } from "react"

export type ClassicRippleProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicRipple({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicRippleProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-ripple-loader", className].filter(Boolean).join(" ")}
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
      <span aria-hidden="true" className="classic-ripple-loader-body">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="classic-ripple-loader-ring"
            style={{ animationDelay: `${(-i / 3) * Math.max(0.1, speed)}s` }}
          />
        ))}
      </span>
      <style>{`
        .classic-ripple-loader { display: inline-flex; flex-shrink: 0; }
        .classic-ripple-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-ripple-loader-ring { position: absolute; inset: 5%; border: calc(var(--loader-size) * .045) solid currentColor; border-radius: 50%; animation: classic-ripple-loader-expand var(--loader-duration) ease-out infinite; }
        @keyframes classic-ripple-loader-expand { 0% { transform: scale(.15); opacity: 0; } 12% { opacity: .9; } 100% { transform: scale(1); opacity: 0; } }

        @media (prefers-reduced-motion: reduce) { .classic-ripple-loader-body, .classic-ripple-loader-body * { animation: none !important; } .classic-ripple-loader-ring:nth-child(2) { transform: scale(.65); opacity: .6; } .classic-ripple-loader-ring:nth-child(3) { transform: scale(.3); opacity: .35; } }
      `}</style>
    </span>
  )
}
