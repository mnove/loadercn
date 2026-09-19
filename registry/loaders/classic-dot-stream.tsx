import type { CSSProperties, ComponentProps } from "react"

export type ClassicDotStreamProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicDotStream({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicDotStreamProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-dot-stream-loader", className]
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
      <span aria-hidden="true" className="classic-dot-stream-loader-track">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={
              {
                "--rest-x": `${14 + i * 18}%`,
                animationDelay: `${(-i / 5) * Math.max(0.1, speed)}s`,
              } as CSSProperties
            }
          />
        ))}
      </span>
      <style>{`
        .classic-dot-stream-loader { display: inline-flex; flex-shrink: 0; }
        .classic-dot-stream-loader-track { position: relative; width: 100%; height: 100%; }
        .classic-dot-stream-loader-track > span { position: absolute; top: 50%; left: var(--rest-x); width: 16%; height: 16%; border-radius: 50%; background: currentColor; transform: translate(-50%, -50%); animation: classic-dot-stream-loader-flow var(--loader-duration) linear infinite; }
        @keyframes classic-dot-stream-loader-flow { 0% { left: 8%; transform: translate(-50%, -50%) scale(0); opacity: 0; } 50% { left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { left: 92%; transform: translate(-50%, -50%) scale(0); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .classic-dot-stream-loader-track > span { animation: none; opacity: .7; } }
      `}</style>
    </span>
  )
}
