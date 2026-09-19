import type { CSSProperties, ComponentProps } from "react"

export type ClassicSpokesProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicSpokes({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicSpokesProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-spokes-loader", className].filter(Boolean).join(" ")}
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
      <span aria-hidden="true" className="classic-spokes-loader-body">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="classic-spokes-loader-arm"
            style={{ transform: `rotate(${i * 30.0}deg)` }}
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
        .classic-spokes-loader { display: inline-flex; flex-shrink: 0; }
        .classic-spokes-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-spokes-loader-arm { position: absolute; inset: 8%; }
        .classic-spokes-loader-arm > span { position: absolute; top: 0; left: 50%; width: 9%; height: 26%; border-radius: 999px; transform: translateX(-50%); background: currentColor; animation: classic-spokes-loader-fade var(--loader-duration) linear infinite; }
        @keyframes classic-spokes-loader-fade { 0%, 100% { opacity: 1; } 75%, 90% { opacity: .15; } }

        @media (prefers-reduced-motion: reduce) { .classic-spokes-loader-body, .classic-spokes-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
