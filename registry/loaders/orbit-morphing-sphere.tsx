import type { CSSProperties, ComponentProps } from "react"

export type OrbitMorphingSphereProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

// Browsers can disagree with Node in the last digit of trig results, which
// breaks hydration. Rounding them keeps server and client markup identical.
const round = (value: number) => Number(value.toFixed(6))

// A sparse six-face lattice gives the cube readable edges without a dense mesh.
// Project both shapes once, then let CSS interpolate their positions and shading.
const surface = Array.from({ length: 64 }, (_, index) => {
  const x = Math.floor(index / 16)
  const y = Math.floor((index % 16) / 4)
  const z = index % 4
  return { cells: [x, y, z], point: [x, y, z].map((value) => value / 1.5 - 1) }
}).filter(({ cells }) => cells.some((value) => value === 0 || value === 3))

// Each dot's box spans the move from sphere to cube (mirrored for negative
// moves), so a percentage translate carries it across. The keyframes then hold
// no custom properties, which lets the browser run them on the compositor.
// Shading changes are rounded to shared steps so dots can share keyframes.
const morphs = new Map<string, number>()
const step = (value: number, size: number) =>
  (Math.round(value / size) * size).toFixed(2)

const particles = surface.map(({ point: cube }) => {
  const length = round(Math.hypot(...cube))
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
  const from = project(sphere)
  const to = project(rounded)
  const fromAlpha = 0.5 + from.depth * 0.35
  const toAlpha = 0.5 + to.depth * 0.35
  const alpha = Math.max(fromAlpha, toAlpha)
  const fromScale = 0.8 + from.depth * 0.2
  const key = [
    step(fromAlpha / alpha, 0.05),
    step(toAlpha / alpha, 0.05),
    step((0.8 + to.depth * 0.2) / fromScale, 0.03),
  ].join(" ")
  if (!morphs.has(key)) morphs.set(key, morphs.size)
  const dx = round(to.x - from.x)
  const dy = round(to.y - from.y)
  return {
    morph: morphs.get(key)!,
    fromAlpha: Number(step(fromAlpha / alpha, 0.05)),
    box: {
      left: `${round(50 + from.x)}%`,
      top: `${round(50 + from.y)}%`,
      width: `${Math.abs(dx)}%`,
      height: `${Math.abs(dy)}%`,
      transform: `scale(${Math.sign(dx) || 1}, ${Math.sign(dy) || 1})`,
      opacity: round(alpha),
    },
    dot: round(fromScale * 4),
  }
})

const morphFrames = Array.from(morphs)
  .map(([key, index]) => {
    const [fromAlpha, toAlpha, scale] = key.split(" ")
    return `@keyframes orbit-morphing-sphere-loader-shape-${index} { 0%, 15%, 100% { transform: translate(0, 0) scale(1); opacity: ${fromAlpha}; } 45%, 65% { transform: translate(100%, 100%) scale(${scale}); opacity: ${toAlpha}; } }
      .orbit-morphing-sphere-loader-shape-${index} { animation-name: orbit-morphing-sphere-loader-shape-${index}; }`
  })
  .join("\n")

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
      <span aria-hidden="true" className="orbit-morphing-sphere-loader-stage">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="orbit-morphing-sphere-loader-box"
            style={particle.box}
          >
            <span
              className={`orbit-morphing-sphere-loader-move orbit-morphing-sphere-loader-shape-${particle.morph}`}
              style={{ opacity: particle.fromAlpha }}
            >
              <span
                className="orbit-morphing-sphere-loader-dot"
                style={{
                  top: `${-particle.dot / 2}cqw`,
                  left: `${-particle.dot / 2}cqw`,
                  width: `${particle.dot}cqw`,
                  height: `${particle.dot}cqw`,
                }}
              />
            </span>
          </span>
        ))}
      </span>
      <style>{`
        .orbit-morphing-sphere-loader { position: relative; display: inline-flex; flex-shrink: 0; container-type: size; }
        .orbit-morphing-sphere-loader-stage { position: absolute; inset: 0; }
        .orbit-morphing-sphere-loader-box { position: absolute; transform-origin: 0 0; }
        .orbit-morphing-sphere-loader-move { position: absolute; inset: 0; transform-origin: 0 0; animation: orbit-morphing-sphere-loader-shape-0 var(--loader-duration) ease-in-out infinite; }
        .orbit-morphing-sphere-loader-dot { position: absolute; border-radius: 50%; background: currentColor; }
        ${morphFrames}
        @media (prefers-reduced-motion: reduce) { .orbit-morphing-sphere-loader-move { animation: none; } }
      `}</style>
    </span>
  )
}
