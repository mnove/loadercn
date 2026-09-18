import type { CSSProperties, ComponentProps } from "react"

export type OrbitTrioProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitTrio({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitTrioProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-trio-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-trio-loader-system">
        <span
          className="orbit-trio-loader-track"
          style={{ inset: "0", transform: "none", border: "none" }}
        >
          <span
            className="orbit-trio-loader-rotor"
            style={{
              animationDelay: `${-0.0 * Math.max(0.1, speed)}s`,
              animationDirection: "normal",
            }}
          >
            <span />
          </span>
        </span>
        <span
          className="orbit-trio-loader-track"
          style={{ inset: "0", transform: "none", border: "none" }}
        >
          <span
            className="orbit-trio-loader-rotor"
            style={{
              animationDelay: `${-0.3333333333333333 * Math.max(0.1, speed)}s`,
              animationDirection: "normal",
            }}
          >
            <span />
          </span>
        </span>
        <span
          className="orbit-trio-loader-track"
          style={{ inset: "0", transform: "none", border: "none" }}
        >
          <span
            className="orbit-trio-loader-rotor"
            style={{
              animationDelay: `${-0.6666666666666666 * Math.max(0.1, speed)}s`,
              animationDirection: "normal",
            }}
          >
            <span />
          </span>
        </span>
      </span>
      <style>{`
        .orbit-trio-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-trio-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-trio-loader-track { position: absolute; border-radius: 50%; }
        .orbit-trio-loader-rotor { position: absolute; inset: 0; animation: orbit-trio-loader-motion var(--loader-duration) linear infinite; }
        .orbit-trio-loader-rotor > span { position: absolute; top: 0; left: 50%; width: 16%; aspect-ratio: 1; border-radius: 50%; background: currentColor; transform: translate(-50%, -50%); }
        .orbit-trio-loader-core { position: absolute; width: 17%; height: 17%; background: currentColor; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        @keyframes orbit-trio-loader-motion { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .orbit-trio-loader-rotor { animation: none; transform: rotate(35deg); } }
      `}</style>
    </span>
  )
}
