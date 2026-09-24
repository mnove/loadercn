import type { CSSProperties, ComponentProps } from "react"

export type ClassicMorphProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicMorph({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicMorphProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-morph-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="classic-morph-loader-shape" />
      <style>{`
        .classic-morph-loader { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .classic-morph-loader-shape { width: 62%; height: 62%; background: currentColor; border-radius: 12%; animation: classic-morph-loader-motion var(--loader-duration) ease-in-out infinite; }
        @keyframes classic-morph-loader-motion { 0% { border-radius: 12%; transform: rotate(0deg) scale(1); } 45%, 55% { border-radius: 50%; transform: rotate(90deg) scale(.85); } 100% { border-radius: 12%; transform: rotate(180deg) scale(1); } }
        @media (prefers-reduced-motion: reduce) { .classic-morph-loader-shape { animation: none; } }
      `}</style>
    </span>
  )
}
