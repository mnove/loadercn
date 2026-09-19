import type { CSSProperties, ComponentProps } from "react"

export type ClassicDottedProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicDotted({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicDottedProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-dotted-loader", className].filter(Boolean).join(" ")}
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
      <span aria-hidden="true" className="classic-dotted-loader-body">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="classic-dotted-loader-arm"
            style={{ transform: `rotate(${i * 45.0}deg)` }}
          >
            <span
              style={{
                animationDelay: `${(i / 8 - 1) * Math.max(0.1, speed)}s`,
              }}
            />
          </span>
        ))}
      </span>
      <style>{`
        .classic-dotted-loader { display: inline-flex; flex-shrink: 0; }
        .classic-dotted-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-dotted-loader-arm { position: absolute; inset: 8%; }
        .classic-dotted-loader-arm > span { position: absolute; top: 0; left: 50%; width: 18%; height: 18%; border-radius: 50%; transform: translateX(-50%); background: currentColor; animation: classic-dotted-loader-fade var(--loader-duration) linear infinite; }
        @keyframes classic-dotted-loader-fade { 0%, 100% { opacity: 1; } 75%, 90% { opacity: .15; } }

        @media (prefers-reduced-motion: reduce) { .classic-dotted-loader-body, .classic-dotted-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
