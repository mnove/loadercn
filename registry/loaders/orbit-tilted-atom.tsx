import type { CSSProperties, ComponentProps } from "react"

export type OrbitTiltedAtomProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitTiltedAtom({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitTiltedAtomProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-tilted-atom-loader", className]
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
      <span aria-hidden="true" className="orbit-tilted-atom-loader-body">
        <span className="orbit-tilted-atom-loader-plane">
          <span className="orbit-tilted-atom-loader-arc" />
        </span>
        <span className="orbit-tilted-atom-loader-plane orbit-tilted-atom-loader-cross">
          <span
            className="orbit-tilted-atom-loader-arc"
            style={{ animationDelay: `${-0.4 * Math.max(0.1, speed)}s` }}
          />
        </span>
      </span>
      <style>{`
        .orbit-tilted-atom-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-tilted-atom-loader-body { position: relative; width: 100%; height: 100%; transform: rotate(45deg); }
        .orbit-tilted-atom-loader-plane { position: absolute; inset: 7%; transform: scaleY(.36); }
        .orbit-tilted-atom-loader-cross { transform: rotate(90deg) scaleY(.36); opacity: .65; }
        .orbit-tilted-atom-loader-arc { position: absolute; inset: 0; border: calc(var(--loader-size) * .085) solid transparent; border-top-color: currentColor; border-right-color: currentColor; border-radius: 50%; animation: orbit-tilted-atom-loader-spin var(--loader-duration) linear infinite; }
        @keyframes orbit-tilted-atom-loader-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .orbit-tilted-atom-loader-arc { animation: none; } }
      `}</style>
    </span>
  )
}
