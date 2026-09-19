import type { CSSProperties, ComponentProps } from "react"

export type ClassicFoldingCubeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicFoldingCube({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicFoldingCubeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-folding-cube-loader", className]
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
      <span aria-hidden="true" className="classic-folding-cube-loader-body">
        {[0, 1, 3, 2].map((phase, i) => (
          <span
            key={i}
            className="classic-folding-cube-loader-cell"
            style={
              {
                left: `${(i % 2) * 52}%`,
                top: `${Math.floor(i / 2) * 52}%`,
                "--turn": `${phase * 90}deg`,
              } as CSSProperties
            }
          >
            <span
              style={{
                animationDelay: `${(phase / 4 - 1) * Math.max(0.1, speed)}s`,
              }}
            />
          </span>
        ))}
      </span>
      <style>{`
        .classic-folding-cube-loader { display: inline-flex; flex-shrink: 0; }
        .classic-folding-cube-loader-body { position: relative; width: 100%; height: 100%; }
        .classic-folding-cube-loader-body { transform: rotate(45deg) scale(.7); }
        .classic-folding-cube-loader-cell { position: absolute; width: 48%; height: 48%; perspective: 120px; transform: rotate(var(--turn)); }
        .classic-folding-cube-loader-cell > span { display: block; width: 100%; height: 100%; background: currentColor; transform-origin: 100% 100%; animation: classic-folding-cube-loader-fold var(--loader-duration) linear infinite; backface-visibility: hidden; }
        @keyframes classic-folding-cube-loader-fold { 0%, 10% { transform: rotateX(-180deg); opacity: 0; } 25%, 75% { transform: rotateX(0deg); opacity: 1; } 90%, 100% { transform: rotateY(180deg); opacity: 0; } }

        @media (prefers-reduced-motion: reduce) { .classic-folding-cube-loader-body, .classic-folding-cube-loader-body * { animation: none !important; }  }
      `}</style>
    </span>
  )
}
