import type { CSSProperties, ComponentProps } from "react"

export type OrbitRadarProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitRadar({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitRadarProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-radar-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-radar-loader-dial">
        <span className="orbit-radar-loader-ring" />
        <span className="orbit-radar-loader-sweep">
          <span />
        </span>
        {[
          { left: "70%", top: "30%", phase: 0.125 },
          { left: "50%", top: "79%", phase: 0.5 },
          { left: "22%", top: "50%", phase: 0.75 },
        ].map((blip, i) => (
          <span
            key={i}
            className="orbit-radar-loader-blip"
            style={{
              left: blip.left,
              top: blip.top,
              animationDelay: `${(blip.phase - 1) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .orbit-radar-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-radar-loader-dial { position: relative; width: 100%; height: 100%; box-sizing: border-box; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); border-radius: 50%; }
        .orbit-radar-loader-ring { position: absolute; inset: 24%; border: 1px solid currentColor; opacity: .15; border-radius: 50%; }
        .orbit-radar-loader-sweep { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from -70deg, transparent 0deg, color-mix(in srgb, currentColor 22%, transparent) 70deg, transparent 70deg); animation: orbit-radar-loader-turn var(--loader-duration) linear infinite; }
        .orbit-radar-loader-sweep > span { position: absolute; bottom: 50%; left: 50%; width: 1px; height: 50%; background: currentColor; opacity: .7; }
        .orbit-radar-loader-blip { position: absolute; width: 9%; height: 9%; border-radius: 50%; background: currentColor; transform: translate(-50%, -50%); animation: orbit-radar-loader-signal var(--loader-duration) linear infinite; }
        @keyframes orbit-radar-loader-turn { to { transform: rotate(360deg); } }
        @keyframes orbit-radar-loader-signal { 0%, 3% { opacity: 1; } 45%, 100% { opacity: .08; } }
        @media (prefers-reduced-motion: reduce) { .orbit-radar-loader-sweep, .orbit-radar-loader-blip { animation: none; } .orbit-radar-loader-blip { opacity: .65; } .orbit-radar-loader-sweep { transform: rotate(45deg); } }
      `}</style>
    </span>
  )
}
