import type { CSSProperties, ComponentProps } from "react"

export type OrbitFigureEightProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitFigureEight({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitFigureEightProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-figure-eight-loader", className]
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
      <span aria-hidden="true" className="orbit-figure-eight-loader-system">
        {[0, 0.25].map((phase, i) => (
          <span
            key={i}
            className="orbit-figure-eight-loader-x"
            style={
              {
                "--phase": `${-phase * Math.max(0.1, speed)}s`,
              } as CSSProperties
            }
          >
            <span className="orbit-figure-eight-loader-y">
              <span className="orbit-figure-eight-loader-dot" />
            </span>
          </span>
        ))}
      </span>
      <style>{`
        .orbit-figure-eight-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-figure-eight-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-figure-eight-loader-x, .orbit-figure-eight-loader-y { position: absolute; inset: 0; animation-delay: var(--phase); animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .orbit-figure-eight-loader-x { animation-name: orbit-figure-eight-loader-horizontal; animation-duration: var(--loader-duration); }
        .orbit-figure-eight-loader-y { animation-name: orbit-figure-eight-loader-vertical; animation-duration: calc(var(--loader-duration) / 2); }
        .orbit-figure-eight-loader-dot { position: absolute; left: 50%; top: 50%; width: 15%; height: 15%; border-radius: 50%; background: currentColor; transform: translate(-50%, -50%); }
        @keyframes orbit-figure-eight-loader-horizontal { 0%, 100% { transform: translateX(0); animation-timing-function: ease-out; } 25% { transform: translateX(40%); animation-timing-function: ease-in; } 50% { transform: translateX(0); animation-timing-function: ease-out; } 75% { transform: translateX(-40%); animation-timing-function: ease-in; } }
        @keyframes orbit-figure-eight-loader-vertical { 0%, 100% { transform: translateY(0); animation-timing-function: ease-out; } 25% { transform: translateY(-24%); animation-timing-function: ease-in; } 50% { transform: translateY(0); animation-timing-function: ease-out; } 75% { transform: translateY(24%); animation-timing-function: ease-in; } }
        @media (prefers-reduced-motion: reduce) { .orbit-figure-eight-loader-x, .orbit-figure-eight-loader-y { animation: none; } .orbit-figure-eight-loader-x:first-child { transform: translateX(-35%); } .orbit-figure-eight-loader-x:last-child { transform: translateX(35%); } }
      `}</style>
    </span>
  )
}
