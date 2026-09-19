import type { CSSProperties, ComponentProps } from "react"

export type ClassicBouncingDotsProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicBouncingDots({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicBouncingDotsProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-bouncing-dots-loader", className]
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
      <span aria-hidden="true" className="classic-bouncing-dots-loader-body">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="classic-bouncing-dots-loader-dot"
            style={{
              left: `${i * 36}%`,
              animationDelay: `${(i / 6 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .classic-bouncing-dots-loader { display: inline-flex; flex-shrink: 0; }
        .classic-bouncing-dots-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-bouncing-dots-loader-dot { position: absolute; top: 42%; width: 22%; height: 22%; border-radius: 50%; background: currentColor; animation: classic-bouncing-dots-loader-pulse var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-bouncing-dots-loader-pulse { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-100%); } }
        @media (prefers-reduced-motion: reduce) { .classic-bouncing-dots-loader-body, .classic-bouncing-dots-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
