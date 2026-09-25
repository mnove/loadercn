import type { CSSProperties, ComponentProps } from "react"

export type OrbitMorphingSphereProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// A sparse six-face lattice gives the cube readable edges without a dense mesh.
// Project both shapes once, then let CSS interpolate their positions and shading.
const surface = Array.from({ length: 64 }, (_, index) => {
  const x = Math.floor(index / 16)
  const y = Math.floor((index % 16) / 4)
  const z = index % 4
  return { cells: [x, y, z], point: [x, y, z].map((value) => value / 1.5 - 1) }
}).filter(({ cells }) => cells.some((value) => value === 0 || value === 3))

const particles = surface.map(({ point: cube }) => {
  const length = Math.hypot(...cube)
  const sphere = cube.map((value) => (value / length) * 1.18)
  // A rounded cube retains planar faces and gently pulled-in corners.
  const rounded = cube.map((value, i) => value * 0.9 + sphere[i] * 0.1)
  const project = ([x, y, z]: number[]) => {
    const side = x * 0.866 - z * 0.5
    const depth = x * 0.5 + z * 0.866
    return {
      x: side * 27,
      y: (y * 0.94 - depth * 0.342) * 27,
      depth: (y * 0.342 + depth * 0.94) / 1.6,
    }
  }
  return { sphere: project(sphere), cube: project(rounded) }
})

export function OrbitMorphingSphere({
  size = 40,
  speed = 3.2,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitMorphingSphereProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-morphing-sphere-loader", className]
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
        <g transform="translate(50 50)">
          {particles.map(({ sphere, cube }, index) => (
            <circle
              key={index}
              r="2"
              className="orbit-morphing-sphere-loader-dot"
              style={
                {
                  "--orbit-morphing-sphere-sphere": `${sphere.x}px, ${sphere.y}px`,
                  "--orbit-morphing-sphere-cube": `${cube.x}px, ${cube.y}px`,
                  "--orbit-morphing-sphere-sphere-alpha":
                    0.5 + sphere.depth * 0.35,
                  "--orbit-morphing-sphere-cube-alpha": 0.5 + cube.depth * 0.35,
                  "--orbit-morphing-sphere-sphere-scale":
                    0.8 + sphere.depth * 0.2,
                  "--orbit-morphing-sphere-cube-scale": 0.8 + cube.depth * 0.2,
                } as CSSProperties
              }
            />
          ))}
        </g>
      </svg>
      <style>{`
        .orbit-morphing-sphere-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-morphing-sphere-loader-dot { fill: currentColor; transform: translate(var(--orbit-morphing-sphere-sphere)) scale(var(--orbit-morphing-sphere-sphere-scale)); opacity: var(--orbit-morphing-sphere-sphere-alpha); animation: orbit-morphing-sphere-loader-shape var(--loader-duration) ease-in-out infinite; }
        @keyframes orbit-morphing-sphere-loader-shape { 0%, 15%, 100% { transform: translate(var(--orbit-morphing-sphere-sphere)) scale(var(--orbit-morphing-sphere-sphere-scale)); opacity: var(--orbit-morphing-sphere-sphere-alpha); } 45%, 65% { transform: translate(var(--orbit-morphing-sphere-cube)) scale(var(--orbit-morphing-sphere-cube-scale)); opacity: var(--orbit-morphing-sphere-cube-alpha); } }
        @media (prefers-reduced-motion: reduce) { .orbit-morphing-sphere-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
