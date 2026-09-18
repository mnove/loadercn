import type { CSSProperties, ComponentProps } from "react"

export type OrbitPrecessionProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitPrecession({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitPrecessionProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-precession-loader", className]
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
      <span aria-hidden="true" className="orbit-precession-loader-system">
        <span className="orbit-precession-loader-axis">
          <span className="orbit-precession-loader-track" />
          <span className="orbit-precession-loader-dot" />
        </span>
        <span className="orbit-precession-loader-core" />
      </span>
      <style>{`
        .orbit-precession-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-precession-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-precession-loader-axis { position: absolute; inset: 0; animation: orbit-precession-loader-turn var(--loader-duration) linear infinite; }
        .orbit-precession-loader-track { position: absolute; inset: 27% 10%; border: 1px solid color-mix(in srgb, currentColor 22%, transparent); border-radius: 50%; }
        .orbit-precession-loader-dot, .orbit-precession-loader-core { position: absolute; width: 12%; height: 12%; background: currentColor; border-radius: 50%; transform: translate(-50%, -50%); }
        .orbit-precession-loader-dot { left: 90%; top: 50%; animation: orbit-precession-loader-ellipse calc(var(--loader-duration) / 3) linear infinite; }
        .orbit-precession-loader-core { left: 50%; top: 50%; width: 9%; height: 9%; opacity: .45; }
        @keyframes orbit-precession-loader-turn { to { transform: rotate(360deg); } }
        @keyframes orbit-precession-loader-ellipse { 0.0000% { left: 90.0000%; top: 50.0000%; } 3.1250% { left: 89.2314%; top: 54.4871%; } 6.2500% { left: 86.9552%; top: 58.8017%; } 9.3750% { left: 83.2588%; top: 62.7781%; } 12.5000% { left: 78.2843%; top: 66.2635%; } 15.6250% { left: 72.2228%; top: 69.1238%; } 18.7500% { left: 65.3073%; top: 71.2492%; } 21.8750% { left: 57.8036%; top: 72.5581%; } 25.0000% { left: 50.0000%; top: 73.0000%; } 28.1250% { left: 42.1964%; top: 72.5581%; } 31.2500% { left: 34.6927%; top: 71.2492%; } 34.3750% { left: 27.7772%; top: 69.1238%; } 37.5000% { left: 21.7157%; top: 66.2635%; } 40.6250% { left: 16.7412%; top: 62.7781%; } 43.7500% { left: 13.0448%; top: 58.8017%; } 46.8750% { left: 10.7686%; top: 54.4871%; } 50.0000% { left: 10.0000%; top: 50.0000%; } 53.1250% { left: 10.7686%; top: 45.5129%; } 56.2500% { left: 13.0448%; top: 41.1983%; } 59.3750% { left: 16.7412%; top: 37.2219%; } 62.5000% { left: 21.7157%; top: 33.7365%; } 65.6250% { left: 27.7772%; top: 30.8762%; } 68.7500% { left: 34.6927%; top: 28.7508%; } 71.8750% { left: 42.1964%; top: 27.4419%; } 75.0000% { left: 50.0000%; top: 27.0000%; } 78.1250% { left: 57.8036%; top: 27.4419%; } 81.2500% { left: 65.3073%; top: 28.7508%; } 84.3750% { left: 72.2228%; top: 30.8762%; } 87.5000% { left: 78.2843%; top: 33.7365%; } 90.6250% { left: 83.2588%; top: 37.2219%; } 93.7500% { left: 86.9552%; top: 41.1983%; } 96.8750% { left: 89.2314%; top: 45.5129%; } 100.0000% { left: 90.0000%; top: 50.0000%; } }
        @media (prefers-reduced-motion: reduce) { .orbit-precession-loader-axis, .orbit-precession-loader-dot { animation: none; } .orbit-precession-loader-axis { transform: rotate(-30deg); } }
      `}</style>
    </span>
  )
}
