import type { CSSProperties, ComponentProps } from "react"

export type ClassicRingProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicRing({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicRingProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-ring-loader", className].filter(Boolean).join(" ")}
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
      <span aria-hidden="true" className="classic-ring-loader-body">
        <span className="classic-ring-loader-ring" />
      </span>
      <style>{`
        .classic-ring-loader { display: inline-flex; flex-shrink: 0; }
        .classic-ring-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-ring-loader-ring { position: absolute; inset: 8%; border: calc(var(--loader-size) * .075) solid currentColor; border-right-color: transparent; border-radius: 50%; animation: classic-ring-loader-spin var(--loader-duration) linear infinite; }
        @keyframes classic-ring-loader-spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) { .classic-ring-loader-body, .classic-ring-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
