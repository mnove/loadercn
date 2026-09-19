import type { CSSProperties, ComponentProps } from "react"

export type ClassicDualRingProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicDualRing({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicDualRingProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-dual-ring-loader", className]
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
      <span aria-hidden="true" className="classic-dual-ring-loader-body">
        <span className="classic-dual-ring-loader-outer" />
        <span className="classic-dual-ring-loader-inner" />
      </span>
      <style>{`
        .classic-dual-ring-loader { display: inline-flex; flex-shrink: 0; }
        .classic-dual-ring-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-dual-ring-loader-outer, .classic-dual-ring-loader-inner { position: absolute; border: calc(var(--loader-size) * .06) solid currentColor; border-right-color: transparent; border-bottom-color: transparent; border-radius: 50%; animation: classic-dual-ring-loader-spin var(--loader-duration) linear infinite; }
        .classic-dual-ring-loader-outer { inset: 4%; }
        .classic-dual-ring-loader-inner { inset: 25%; animation-direction: reverse; opacity: .6; }
        @keyframes classic-dual-ring-loader-spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) { .classic-dual-ring-loader-body, .classic-dual-ring-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
