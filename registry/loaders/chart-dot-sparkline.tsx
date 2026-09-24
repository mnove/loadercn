"use client"

import { useId } from "react"
import type { CSSProperties, ComponentProps } from "react"

export type ChartDotSparklineProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

const left = 12
const width = 72
const baseline = 50
const amplitude = 20
const samples = 48

// A looping signal. Higher harmonics add the jitter of a live metric.
const signal = (t: number) =>
  0.55 * Math.sin(2 * Math.PI * t + 0.3) +
  0.25 * Math.sin(6 * Math.PI * t + 1.7) +
  0.15 * Math.sin(10 * Math.PI * t + 0.4) +
  0.05 * Math.sin(14 * Math.PI * t + 2)

// Two periods of the signal, so the line can scroll one period and loop.
const line = Array.from({ length: samples * 2 + 1 }, (_, i) => {
  const x = (i / samples) * width
  const y = baseline - signal(i / samples) * amplitude
  return `${x.toFixed(2)},${y.toFixed(2)}`
}).join(" ")

// The dot sits where the line leaves the plot, so it traces the newest value.
const dotFrames = Array.from({ length: samples + 1 }, (_, i) => {
  const y = -signal(i / samples) * amplitude
  return `${((i / samples) * 100).toFixed(3)}% { transform: translateY(${y.toFixed(2)}px); }`
}).join("\n")

export function ChartDotSparkline({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: ChartDotSparklineProps) {
  const id = `chart-dot-sparkline-${useId().replace(/:/g, "")}`
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["chart-dot-sparkline-loader", className]
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
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient
            id={`${id}-fade`}
            gradientUnits="userSpaceOnUse"
            x1={left}
            x2={left + width}
            y1="0"
            y2="0"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.75" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse">
            <rect
              x={left}
              y="0"
              width={width}
              height="100"
              fill={`url(#${id}-fade)`}
            />
          </mask>
        </defs>
        <g mask={`url(#${id}-mask)`}>
          {/* A nested svg clips the scrolling line to the plot window. */}
          <svg
            x={left}
            y="0"
            width={width}
            height="100"
            viewBox={`0 0 ${width} 100`}
          >
            <polyline
              points={line}
              className="chart-dot-sparkline-loader-line"
            />
          </svg>
        </g>
        <g className="chart-dot-sparkline-loader-lead">
          <circle
            cx={left + width}
            cy={baseline}
            r="6"
            className="chart-dot-sparkline-loader-halo"
          />
          <circle cx={left + width} cy={baseline} r="3.4" />
        </g>
      </svg>
      <style>{`
        .chart-dot-sparkline-loader { display: inline-flex; flex-shrink: 0; }
        .chart-dot-sparkline-loader-line { fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; animation: chart-dot-sparkline-loader-scroll var(--loader-duration) linear infinite; }
        .chart-dot-sparkline-loader-lead { fill: currentColor; transform: translateY(${(-signal(0) * amplitude).toFixed(2)}px); animation: chart-dot-sparkline-loader-lead var(--loader-duration) linear infinite; }
        .chart-dot-sparkline-loader-halo { fill: none; stroke: currentColor; stroke-width: 1.5; opacity: .3; transform-box: fill-box; transform-origin: center; animation: chart-dot-sparkline-loader-pulse calc(var(--loader-duration) / 3) ease-out infinite; }
        @keyframes chart-dot-sparkline-loader-scroll { from { transform: translateX(0); } to { transform: translateX(-${width}px); } }
        @keyframes chart-dot-sparkline-loader-lead { ${dotFrames} }
        @keyframes chart-dot-sparkline-loader-pulse { 0% { transform: scale(.5); opacity: .7; } 100% { transform: scale(1.6); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .chart-dot-sparkline-loader-line, .chart-dot-sparkline-loader-lead, .chart-dot-sparkline-loader-halo { animation: none; } }
      `}</style>
    </span>
  )
}
