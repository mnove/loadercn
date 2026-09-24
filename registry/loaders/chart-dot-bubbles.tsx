"use client"

import { useId } from "react"
import type { CSSProperties, ComponentProps } from "react"

export type ChartDotBubblesProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Each bubble loops around its own position while its size breathes.
const bubbles = [
  { x: 30, y: 62, r: 9, dx: 8, dy: 6, phase: 0 },
  { x: 46, y: 40, r: 6, dx: 6, dy: 8, phase: 0.2 },
  { x: 62, y: 58, r: 11, dx: 7, dy: 5, phase: 0.45 },
  { x: 74, y: 34, r: 5, dx: 5, dy: 7, phase: 0.65 },
  { x: 32, y: 32, r: 4, dx: 6, dy: 5, phase: 0.8 },
  { x: 70, y: 72, r: 6, dx: 8, dy: 4, phase: 0.35 },
]

const appearance = (t: number) => {
  const x = Math.cos(2 * Math.PI * t).toFixed(3)
  const y = Math.sin(4 * Math.PI * t).toFixed(3)
  const grow = (1 + 0.25 * Math.sin(2 * Math.PI * t + 1)).toFixed(3)
  return `transform: translate(calc(var(--chart-dot-bubbles-dx) * ${x}), calc(var(--chart-dot-bubbles-dy) * ${y})) scale(${grow});`
}

const driftFrames = Array.from(
  { length: 25 },
  (_, step) => `${((step / 24) * 100).toFixed(2)}% { ${appearance(step / 24)} }`
).join("\n")

export function ChartDotBubbles({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotBubblesProps) {
  const duration = Math.max(0.1, speed)
  const id = `chart-dot-bubbles-${useId().replace(/:/g, "")}`
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-dot-bubbles-loader", className]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${duration}s`,
          ...style,
        } as CSSProperties
      }
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        {/* Both axes fade from the origin toward their far ends. */}
        <defs>
          <linearGradient
            id={`${id}-y`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="88"
            x2="0"
            y2="12"
          >
            <stop offset="0" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient
            id={`${id}-x`}
            gradientUnits="userSpaceOnUse"
            x1="12"
            y1="0"
            x2="88"
            y2="0"
          >
            <stop offset="0" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M12 88V12"
          stroke={`url(#${id}-y)`}
          className="chart-dot-bubbles-loader-axis"
        />
        <path
          d="M12 88H88"
          stroke={`url(#${id}-x)`}
          className="chart-dot-bubbles-loader-axis"
        />
        {bubbles.map(({ x, y, r, dx, dy, phase }, i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            className="chart-dot-bubbles-loader-bubble"
            style={
              {
                "--chart-dot-bubbles-dx": `${dx}px`,
                "--chart-dot-bubbles-dy": `${dy}px`,
                animationDelay: `${-phase * duration}s`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
      <style>{`
        .chart-dot-bubbles-loader { display: inline-flex; flex-shrink: 0; }
        .chart-dot-bubbles-loader-axis { fill: none; stroke-width: 3; stroke-linecap: round; opacity: .4; }
        .chart-dot-bubbles-loader-bubble { fill: currentColor; fill-opacity: .35; stroke: currentColor; stroke-width: 1.5; transform-box: fill-box; transform-origin: center; animation: chart-dot-bubbles-loader-drift var(--loader-duration) linear infinite; }
        @keyframes chart-dot-bubbles-loader-drift { ${driftFrames} }
        @media (prefers-reduced-motion: reduce) { .chart-dot-bubbles-loader-bubble { animation: none; } }
      `}</style>
    </span>
  )
}
