"use client"

import { useId } from "react"
import type { CSSProperties, ComponentProps } from "react"

export type ClassicLiquidStreamProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicLiquidStream({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicLiquidStreamProps) {
  const filterId = `classic-liquid-stream-${useId().replace(/:/g, "")}`
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-liquid-stream-loader", className]
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
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        <defs>
          <filter
            id={filterId}
            x="-25%"
            y="-100%"
            width="150%"
            height="300%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="2.5"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="liquid"
            />
            <feBlend in="SourceGraphic" in2="liquid" />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx="0"
              cy="50"
              r="11"
              style={
                {
                  "--rest-x": `${14 + i * 18}px`,
                  animationDelay: `${(-i / 5) * Math.max(0.1, speed)}s`,
                } as CSSProperties
              }
            />
          ))}
        </g>
      </svg>
      <style>{`
        .classic-liquid-stream-loader { display: inline-flex; flex-shrink: 0; }
        .classic-liquid-stream-loader circle { fill: currentColor; transform-origin: 0px 50px; transform: translateX(var(--rest-x)); animation: classic-liquid-stream-loader-flow var(--loader-duration) linear infinite; }
        @keyframes classic-liquid-stream-loader-flow { 0% { transform: translateX(8px) scale(0); } 50% { transform: translateX(50px) scale(1); } 100% { transform: translateX(92px) scale(0); } }
        @media (prefers-reduced-motion: reduce) { .classic-liquid-stream-loader circle { animation: none; } .classic-liquid-stream-loader g { filter: none; } }
      `}</style>
    </span>
  )
}
