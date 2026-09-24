"use client"

import { useId } from "react"
import type { CSSProperties, ComponentProps } from "react"

export type ClassicLiquidProcessingProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function ClassicLiquidProcessing({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: ClassicLiquidProcessingProps) {
  const filterId = `classic-liquid-processing-${useId().replace(/:/g, "")}`
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["classic-liquid-processing-loader", className]
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
        <defs>
          <filter
            id={filterId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="1.4"
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
          {[28, 43, 58, 73].map((y, row) => (
            <g key={y} transform={`translate(10 ${y})`}>
              {Array.from({ length: 8 }, (_, drop) => (
                <circle
                  key={drop}
                  r="5.5"
                  className="classic-liquid-processing-loader-drop"
                  style={
                    {
                      "--classic-liquid-processing-rest-x": `${5 + drop * 10}px`,
                      animationDelay: `${-(drop / 8 + row * 0.075) * duration}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
      <style>{`
        .classic-liquid-processing-loader { display: inline-flex; flex-shrink: 0; }
        .classic-liquid-processing-loader-drop { fill: currentColor; transform: translateX(var(--classic-liquid-processing-rest-x)) scale(.45); animation: classic-liquid-processing-loader-flow var(--loader-duration) linear infinite; }
        @keyframes classic-liquid-processing-loader-flow { 0% { transform: translateX(0) scale(0); } 50% { transform: translateX(40px) scale(1); } 100% { transform: translateX(80px) scale(0); } }
        @media (prefers-reduced-motion: reduce) { .classic-liquid-processing-loader-drop { animation: none; } .classic-liquid-processing-loader g { filter: none; } }
      `}</style>
    </span>
  )
}
