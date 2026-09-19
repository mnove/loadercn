import type { CSSProperties, ComponentProps } from "react"

export type ClassicChasingDotsProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicChasingDots({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicChasingDotsProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-chasing-dots-loader", className]
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
      <span aria-hidden="true" className="classic-chasing-dots-loader-body">
        <span className="classic-chasing-dots-loader-rotor">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="classic-chasing-dots-loader-dot"
              style={{
                top: i === 0 ? "0" : "70%",
                animationDelay: `${i * -0.5 * Math.max(0.1, speed)}s`,
              }}
            />
          ))}
        </span>
      </span>
      <style>{`
        .classic-chasing-dots-loader { display: inline-flex; flex-shrink: 0; }
        .classic-chasing-dots-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-chasing-dots-loader-rotor { position: absolute; inset: 8%; animation: classic-chasing-dots-loader-spin var(--loader-duration) linear infinite; }
        .classic-chasing-dots-loader-dot { position: absolute; left: 35%; width: 30%; height: 30%; background: currentColor; border-radius: 50%; animation: classic-chasing-dots-loader-grow var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-chasing-dots-loader-grow { 0%, 100% { transform: scale(.35); opacity: .45; } 50% { transform: scale(1); opacity: 1; } }
        @keyframes classic-chasing-dots-loader-spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) { .classic-chasing-dots-loader-body, .classic-chasing-dots-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
