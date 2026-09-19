import type { CSSProperties, ComponentProps } from "react"

export type ClassicCircularTailProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicCircularTail({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicCircularTailProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-circular-tail-loader", className]
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
      <span aria-hidden="true" className="classic-circular-tail-loader-body">
        <span />
      </span>
      <style>{`
        .classic-circular-tail-loader { display: inline-flex; flex-shrink: 0; }
        .classic-circular-tail-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-circular-tail-loader-body > span { position: absolute; inset: 8%; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg, currentColor 300deg, transparent 302deg); mask-image: radial-gradient(farthest-side, transparent calc(100% - var(--loader-size) * .075), #000 calc(100% - var(--loader-size) * .075 + .5px)); animation: classic-circular-tail-loader-spin var(--loader-duration) linear infinite; }
        @keyframes classic-circular-tail-loader-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .classic-circular-tail-loader-body > span { animation: none; } }
      `}</style>
    </span>
  )
}
