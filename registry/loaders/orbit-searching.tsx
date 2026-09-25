import type { CSSProperties, ComponentProps } from "react"

export type OrbitSearchingProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Browsers can disagree with Node in the last digit of trig results, which
// breaks hydration. Rounding them keeps server and client markup identical.
const round = (value: number) => Number(value.toFixed(6))

// Sample the globe's turn once. Individual dots share the same path with
// different latitudes and phases; no browser animation loop is needed.
const turnFrames = Array.from({ length: 33 }, (_, step) => {
  const angle = (step / 32) * Math.PI * 2
  const x = Math.cos(angle).toFixed(6)
  const z = Math.sin(angle).toFixed(6)
  return `${(step / 32) * 100}% {
    transform: translate(calc(var(--orbit-searching-radius) * ${x}), calc(var(--orbit-searching-height) - var(--orbit-searching-radius) * ${z} * .36)) scale(calc(.8 + var(--orbit-searching-depth) * ${z} * .2));
    opacity: calc(.5 + var(--orbit-searching-depth) * ${z} * .43);
  }`
}).join("\n")

export function OrbitSearching({
  size = 40,
  speed = 4.8,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitSearchingProps) {
  const duration = Math.max(0.1, speed)
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-searching-loader", className]
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
        <g transform="translate(50 50) rotate(-16)">
          {Array.from({ length: 96 }, (_, index) => {
            const latitude = 1 - (index + 0.5) / 48
            const depth = Math.sqrt(1 - latitude * latitude)
            const phase = (index * 0.61803398875) % 1
            const angle = phase * Math.PI * 2
            return (
              <g
                key={index}
                className="orbit-searching-loader-particle"
                style={
                  {
                    "--orbit-searching-radius": `${depth * 38}px`,
                    "--orbit-searching-height": `${latitude * 35.5}px`,
                    "--orbit-searching-depth": depth,
                    "--orbit-searching-rest-x": `${round(Math.cos(angle)) * depth * 38}px`,
                    "--orbit-searching-rest-y": `${latitude * 35.5 - round(Math.sin(angle)) * depth * 38 * 0.36}px`,
                    "--orbit-searching-rest-alpha":
                      0.5 + depth * round(Math.sin(angle)) * 0.43,
                    "--orbit-searching-rest-scale":
                      0.8 + depth * round(Math.sin(angle)) * 0.2,
                    animationDelay: `${-phase * duration}s`,
                  } as CSSProperties
                }
              >
                {/* Two highlight passes per turn make the search sweep overtake
                    the surface. The parent supplies front-to-back shading. */}
                <circle
                  r="1.65"
                  className="orbit-searching-loader-dot"
                  style={{ animationDelay: `${-(1 - phase / 2) * duration}s` }}
                />
              </g>
            )
          })}
        </g>
      </svg>
      <style>{`
        .orbit-searching-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-searching-loader-particle { transform: translate(var(--orbit-searching-rest-x), var(--orbit-searching-rest-y)) scale(var(--orbit-searching-rest-scale)); opacity: var(--orbit-searching-rest-alpha); animation: orbit-searching-loader-turn var(--loader-duration) linear infinite; }
        .orbit-searching-loader-dot { fill: currentColor; opacity: .65; animation: orbit-searching-loader-highlight var(--loader-duration) ease-in-out infinite; }
        @keyframes orbit-searching-loader-turn { ${turnFrames} }
        @keyframes orbit-searching-loader-highlight { 0%, 50%, 100% { transform: scale(1.85); opacity: 1; } 7%, 43%, 57%, 93% { transform: scale(1); opacity: .55; } }
        @media (prefers-reduced-motion: reduce) { .orbit-searching-loader-particle, .orbit-searching-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
