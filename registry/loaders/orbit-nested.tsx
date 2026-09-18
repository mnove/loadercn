import type { CSSProperties, ComponentProps } from "react"

export type OrbitNestedProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitNested({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitNestedProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-nested-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-nested-loader-system">
        <span className="orbit-nested-loader-star" />
        <span className="orbit-nested-loader-orbit">
          <span className="orbit-nested-loader-rotor">
            <span className="orbit-nested-loader-moon-system">
              <span className="orbit-nested-loader-planet" />
              <span className="orbit-nested-loader-moon-orbit">
                <span className="orbit-nested-loader-moon" />
              </span>
            </span>
          </span>
        </span>
      </span>
      <style>{`
        .orbit-nested-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-nested-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-nested-loader-star, .orbit-nested-loader-planet { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; background: currentColor; }
        .orbit-nested-loader-star { width: 14%; height: 14%; }
        .orbit-nested-loader-orbit { position: absolute; inset: 22%; border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 50%; }
        .orbit-nested-loader-rotor { position: absolute; inset: 0; animation: orbit-nested-loader-spin var(--loader-duration) linear infinite; }
        .orbit-nested-loader-moon-system { position: absolute; top: 0; left: 50%; width: 56%; height: 56%; transform: translate(-50%, -50%); }
        .orbit-nested-loader-planet { width: 30%; height: 30%; }
        .orbit-nested-loader-moon-orbit { position: absolute; inset: 0; border: 1px solid color-mix(in srgb, currentColor 15%, transparent); border-radius: 50%; animation: orbit-nested-loader-spin calc(var(--loader-duration) / 3) linear infinite reverse; }
        .orbit-nested-loader-moon { position: absolute; top: 0; left: 50%; width: 19%; height: 19%; background: currentColor; border-radius: 50%; transform: translate(-50%, -50%); }
        @keyframes orbit-nested-loader-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .orbit-nested-loader-rotor, .orbit-nested-loader-moon-orbit { animation: none; } .orbit-nested-loader-moon-orbit { transform: rotate(60deg); } }
      `}</style>
    </span>
  )
}
