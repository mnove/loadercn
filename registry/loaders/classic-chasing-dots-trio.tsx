import type { CSSProperties, ComponentProps } from "react"

export type ClassicChasingDotsTrioProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicChasingDotsTrio({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicChasingDotsTrioProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-chasing-dots-trio-loader", className]
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
      <span
        aria-hidden="true"
        className="classic-chasing-dots-trio-loader-body"
      >
        <span className="classic-chasing-dots-trio-loader-rotor">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="classic-chasing-dots-trio-loader-arm"
              style={{ transform: `rotate(${i * 120}deg)` }}
            >
              <span
                className="classic-chasing-dots-trio-loader-dot"
                style={{
                  animationDelay: `${(-i / 3) * Math.max(0.1, speed)}s`,
                }}
              />
            </span>
          ))}
        </span>
      </span>
      <style>{`
        .classic-chasing-dots-trio-loader { display: inline-flex; flex-shrink: 0; }
        .classic-chasing-dots-trio-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-chasing-dots-trio-loader-rotor { position: absolute; inset: 8%; animation: classic-chasing-dots-trio-loader-spin var(--loader-duration) linear infinite; }
        .classic-chasing-dots-trio-loader-arm { position: absolute; inset: 0; }
        .classic-chasing-dots-trio-loader-dot { position: absolute; top: 0; left: 35%; width: 30%; height: 30%; background: currentColor; border-radius: 50%; animation: classic-chasing-dots-trio-loader-grow var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-chasing-dots-trio-loader-grow { 0%, 100% { transform: scale(.35); opacity: .45; } 50% { transform: scale(1); opacity: 1; } }
        @keyframes classic-chasing-dots-trio-loader-spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) { .classic-chasing-dots-trio-loader-body, .classic-chasing-dots-trio-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
