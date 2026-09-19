import type { CSSProperties, ComponentProps } from "react"

export type ClassicTypingProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicTyping({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicTypingProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-typing-loader", className].filter(Boolean).join(" ")}
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
      <span aria-hidden="true" className="classic-typing-loader-body">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="classic-typing-loader-dot"
            style={{
              left: `${i * 36}%`,
              animationDelay: `${(i / 6 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .classic-typing-loader { display: inline-flex; flex-shrink: 0; }
        .classic-typing-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-typing-loader-dot { position: absolute; top: 42%; width: 22%; height: 22%; border-radius: 50%; background: currentColor; animation: classic-typing-loader-pulse var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-typing-loader-pulse { 0%, 70%, 100% { transform: scale(.7); opacity: .3; } 35% { transform: scale(1); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .classic-typing-loader-body, .classic-typing-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
