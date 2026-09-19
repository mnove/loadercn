import type { CSSProperties, ComponentProps } from "react"

export type ClassicEqualizerProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicEqualizer({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicEqualizerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-equalizer-loader", className]
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
      <span aria-hidden="true" className="classic-equalizer-loader-body">
        {/* Sequential phases create a flowing wave across neighboring bars. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="classic-equalizer-loader-bar"
            style={{
              left: `${i * 21}%`,
              animationDelay: `${(i / 8 - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .classic-equalizer-loader { display: inline-flex; flex-shrink: 0; }
        .classic-equalizer-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-equalizer-loader-bar { position: absolute; top: 10%; width: 12%; height: 80%; border-radius: calc(var(--loader-size) * .06); background: currentColor; animation: classic-equalizer-loader-level var(--loader-duration) cubic-bezier(.37, 0, .63, 1) infinite; }
        @keyframes classic-equalizer-loader-level { 0%, 100% { transform: scaleY(.4); } 50% { transform: scaleY(1); } }

        @media (prefers-reduced-motion: reduce) { .classic-equalizer-loader-body, .classic-equalizer-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
