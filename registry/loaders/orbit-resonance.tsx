import type { CSSProperties, ComponentProps } from "react"

export type OrbitResonanceProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitResonance({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitResonanceProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-resonance-loader", className]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-resonance-loader-system">
        <span
          className="orbit-resonance-loader-track"
          style={{
            inset: "0%",
            transform: "none",
            border:
              "1px solid color-mix(in srgb, currentColor 20%, transparent)",
          }}
        >
          <span
            className="orbit-resonance-loader-rotor"
            style={{
              animationDelay: `${-0.0 * Math.max(0.1, speed)}s`,
              animationDirection: "normal",
            }}
          >
            <span />
          </span>
        </span>
        <span
          className="orbit-resonance-loader-track"
          style={{
            inset: "16%",
            transform: "none",
            border:
              "1px solid color-mix(in srgb, currentColor 20%, transparent)",
          }}
        >
          <span
            className="orbit-resonance-loader-rotor"
            style={{
              animationDelay: `${-0.2 * Math.max(0.1, speed)}s`,
              animationDirection: "reverse",
            }}
          >
            <span />
          </span>
        </span>
        <span
          className="orbit-resonance-loader-track"
          style={{
            inset: "32%",
            transform: "none",
            border:
              "1px solid color-mix(in srgb, currentColor 20%, transparent)",
          }}
        >
          <span
            className="orbit-resonance-loader-rotor"
            style={{
              animationDelay: `${-0.4 * Math.max(0.1, speed)}s`,
              animationDirection: "normal",
            }}
          >
            <span />
          </span>
        </span>
      </span>
      <style>{`
        .orbit-resonance-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-resonance-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-resonance-loader-track { position: absolute; border-radius: 50%; }
        .orbit-resonance-loader-rotor { position: absolute; inset: 0; animation: orbit-resonance-loader-motion var(--loader-duration) linear infinite; }
        .orbit-resonance-loader-rotor > span { position: absolute; top: 0; left: 50%; width: 16%; aspect-ratio: 1; border-radius: 50%; background: currentColor; transform: translate(-50%, -50%); }
        .orbit-resonance-loader-core { position: absolute; width: 17%; height: 17%; background: currentColor; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        @keyframes orbit-resonance-loader-motion { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .orbit-resonance-loader-rotor { animation: none; transform: rotate(35deg); } }
      `}</style>
    </span>
  )
}
