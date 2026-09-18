import type { CSSProperties, ComponentProps } from "react"

export type OrbitBinaryProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitBinary({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitBinaryProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-binary-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-binary-loader-system">
        <span
          className="orbit-binary-loader-track"
          style={{ inset: "0", transform: "none", border: "none" }}
        >
          <span
            className="orbit-binary-loader-rotor"
            style={{
              animationDelay: `${-0.0 * Math.max(0.1, speed)}s`,
              animationDirection: "normal",
            }}
          >
            <span />
          </span>
        </span>
        <span
          className="orbit-binary-loader-track"
          style={{ inset: "0", transform: "none", border: "none" }}
        >
          <span
            className="orbit-binary-loader-rotor"
            style={{
              animationDelay: `${-0.5 * Math.max(0.1, speed)}s`,
              animationDirection: "normal",
            }}
          >
            <span />
          </span>
        </span>
      </span>
      <style>{`
        .orbit-binary-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-binary-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-binary-loader-track { position: absolute; border-radius: 50%; }
        .orbit-binary-loader-rotor { position: absolute; inset: 0; animation: orbit-binary-loader-motion var(--loader-duration) linear infinite; }
        .orbit-binary-loader-rotor > span { position: absolute; top: 0; left: 50%; width: 22%; aspect-ratio: 1; border-radius: 50%; background: currentColor; transform: translate(-50%, -50%); }
        .orbit-binary-loader-core { position: absolute; width: 17%; height: 17%; background: currentColor; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        @keyframes orbit-binary-loader-motion { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .orbit-binary-loader-rotor { animation: none; transform: rotate(35deg); } }
      `}</style>
    </span>
  )
}
