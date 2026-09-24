import type { CSSProperties, ComponentProps } from "react"

export type ClassicHourglassProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicHourglass({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicHourglassProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-hourglass-loader", className]
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
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 40 40"
        className="classic-hourglass-loader-glass"
      >
        <path
          d="M10 4H30M10 36H30M12 4C12 13 15 16 20 20C25 24 28 27 28 36M28 4C28 13 25 16 20 20C15 24 12 27 12 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="classic-hourglass-loader-top"
          d="M15 9H25L20 17Z"
          fill="currentColor"
        />
        <path
          className="classic-hourglass-loader-bottom"
          d="M15 31H25L20 23Z"
          fill="currentColor"
        />
        <path
          className="classic-hourglass-loader-stream"
          d="M20 18V29"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="1.5 2"
        />
      </svg>
      <style>{`
        .classic-hourglass-loader { display: inline-flex; flex-shrink: 0; }
        .classic-hourglass-loader-glass { width: 100%; height: 100%; animation: classic-hourglass-loader-flip var(--loader-duration) ease-in-out infinite; }
        .classic-hourglass-loader-top { clip-path: inset(0 0 0 0) fill-box; animation: classic-hourglass-loader-drain var(--loader-duration) linear infinite; }
        .classic-hourglass-loader-bottom { clip-path: inset(100% 0 0 0) fill-box; animation: classic-hourglass-loader-fill var(--loader-duration) linear infinite; }
        .classic-hourglass-loader-stream { animation: classic-hourglass-loader-fall var(--loader-duration) linear infinite; }
        @keyframes classic-hourglass-loader-flip { 0%, 78% { transform: rotate(0deg); } 100% { transform: rotate(180deg); } }
        @keyframes classic-hourglass-loader-drain { 0%, 8% { clip-path: inset(0 0 0 0) fill-box; } 72%, 100% { clip-path: inset(100% 0 0 0) fill-box; } }
        @keyframes classic-hourglass-loader-fill { 0%, 8% { clip-path: inset(100% 0 0 0) fill-box; } 72%, 100% { clip-path: inset(0 0 0 0) fill-box; } }
        @keyframes classic-hourglass-loader-fall { 0%, 5% { opacity: 0; stroke-dashoffset: 0; } 10%, 65% { opacity: .65; } 72%, 100% { opacity: 0; stroke-dashoffset: -21; } }
        @media (prefers-reduced-motion: reduce) { .classic-hourglass-loader-glass, .classic-hourglass-loader-glass * { animation: none; } .classic-hourglass-loader-top { clip-path: inset(35% 0 0 0) fill-box; } .classic-hourglass-loader-bottom { clip-path: inset(50% 0 0 0) fill-box; } .classic-hourglass-loader-stream { opacity: 0; } }
      `}</style>
    </span>
  )
}
