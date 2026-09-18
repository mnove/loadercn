import type { CSSProperties, ComponentProps } from "react"

export type GridFlipProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function GridFlip({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: GridFlipProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["grid-flip-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="grid-flip-loader-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${((Math.floor(i / 3) + (i % 3)) / -8) * Math.max(0.1, speed)}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        .grid-flip-loader { display: inline-flex; flex-shrink: 0; }
        .grid-flip-loader-grid { display: grid; width: 100%; height: 100%; grid-template-columns: repeat(3, 1fr); gap: 14%; perspective: 160px; }
        .grid-flip-loader-grid > span { border-radius: 12%; background: currentColor; animation: grid-flip-loader-turn var(--loader-duration) ease-in-out infinite; }
        @keyframes grid-flip-loader-turn { 0%, 15% { transform: rotateY(0deg); opacity: 1; } 45%, 55% { transform: rotateY(180deg); opacity: .35; } 85%, 100% { transform: rotateY(360deg); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .grid-flip-loader-grid > span { animation: none; } }
      `}</style>
    </span>
  )
}
