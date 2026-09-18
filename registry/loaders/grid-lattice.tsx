import type { CSSProperties, ComponentProps } from "react"

export type GridLatticeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridLattice({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridLatticeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-lattice-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-lattice-loader-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            style={
              {
                "--x": (i % 3) - 1,
                "--y": Math.floor(i / 3) - 1,
              } as CSSProperties
            }
          />
        ))}
      </span>
      <style>{`
        .grid-lattice-loader { display: inline-flex; flex-shrink: 0; }
        .grid-lattice-loader-grid { position: relative; width: 100%; height: 100%; }
        .grid-lattice-loader-grid > span { position: absolute; width: 16%; height: 16%; border-radius: 50%; background: currentColor; left: calc(50% + var(--x) * 32%); top: calc(50% + var(--y) * 32%); transform: translate(-50%, -50%); animation: grid-lattice-loader-breathe var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-lattice-loader-breathe { 0%, 100% { left: calc(50% + var(--x) * 32%); top: calc(50% + var(--y) * 32%); } 50% { left: calc(50% + var(--x) * 19%); top: calc(50% + var(--y) * 19%); } }
        @media (prefers-reduced-motion: reduce) { .grid-lattice-loader-grid > span { animation: none; } }
      `}</style>
    </span>
  )
}
