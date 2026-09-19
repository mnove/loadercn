import type { CSSProperties, ComponentProps } from "react"

export type ClassicPulsingSpokesProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicPulsingSpokes({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicPulsingSpokesProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-pulsing-spokes-loader", className]
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
      <span aria-hidden="true" className="classic-pulsing-spokes-loader-body">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="classic-pulsing-spokes-loader-arm"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <span
              style={{
                animationDelay: `${(i / 12 - 1) * Math.max(0.1, speed)}s`,
              }}
            />
          </span>
        ))}
      </span>
      <style>{`
        .classic-pulsing-spokes-loader { display: inline-flex; flex-shrink: 0; }
        .classic-pulsing-spokes-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-pulsing-spokes-loader-arm { position: absolute; inset: 8%; }
        .classic-pulsing-spokes-loader-arm > span { position: absolute; top: 0; left: 45%; width: 10%; height: 24%; border-radius: 999px; background: currentColor; transform-origin: center bottom; animation: classic-pulsing-spokes-loader-pulse var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-pulsing-spokes-loader-pulse { 0%, 80%, 100% { transform: scaleY(.65); opacity: .08; } 20% { transform: scaleY(1); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .classic-pulsing-spokes-loader-arm > span { animation: none; opacity: .65; } }
      `}</style>
    </span>
  )
}
