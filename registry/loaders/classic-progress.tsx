import type { CSSProperties, ComponentProps } from "react"

export type ClassicProgressProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicProgress({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicProgressProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-progress-loader", className]
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
      <span aria-hidden="true" className="classic-progress-loader-body">
        <span className="classic-progress-loader-track">
          <span className="classic-progress-loader-segment" />
        </span>
      </span>
      <style>{`
        .classic-progress-loader { display: inline-flex; flex-shrink: 0; }
        .classic-progress-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-progress-loader-track { position: absolute; top: 44%; left: 0; width: 100%; height: 12%; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, currentColor 15%, transparent); }
        .classic-progress-loader-segment { position: absolute; inset: 0 auto 0 0; width: 40%; border-radius: inherit; background: currentColor; animation: classic-progress-loader-travel var(--loader-duration) cubic-bezier(.65, 0, .35, 1) infinite; }
        @keyframes classic-progress-loader-travel { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }

        @media (prefers-reduced-motion: reduce) { .classic-progress-loader-body, .classic-progress-loader-body * { animation: none !important; } .classic-progress-loader-segment { left: 30%; } }
      `}</style>
    </span>
  )
}
