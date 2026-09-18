import type { CSSProperties, ComponentProps } from "react"

export type OrbitCometProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitComet({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitCometProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-comet-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-comet-loader-system">
        <span className="orbit-comet-loader-track" />
        <span className="orbit-comet-loader-rotor">
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              className="orbit-comet-loader-segment"
              style={{ transform: `rotate(${-i * 14}deg)` }}
            >
              <span
                style={{ width: `${18 - i * 2}%`, opacity: 1 - i * 0.13 }}
              />
            </span>
          ))}
        </span>
      </span>
      <style>{`
        .orbit-comet-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-comet-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-comet-loader-track { position: absolute; inset: 10%; border: 1px solid color-mix(in srgb, currentColor 12%, transparent); border-radius: 50%; }
        .orbit-comet-loader-rotor { position: absolute; inset: 10%; animation: orbit-comet-loader-spin var(--loader-duration) linear infinite; }
        .orbit-comet-loader-segment { position: absolute; inset: 0; }
        .orbit-comet-loader-segment > span { position: absolute; top: 0; left: 50%; aspect-ratio: 1; border-radius: 50%; background: currentColor; transform: translate(-50%, -50%); }
        @keyframes orbit-comet-loader-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .orbit-comet-loader-rotor { animation: none; } }
      `}</style>
    </span>
  )
}
