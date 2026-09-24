/** Match the defaults in the standalone files; shipped loaders never import site code. */
const defaultSpeeds: Record<string, number> = {
  "orbit-particle-globe": 4.8,
  "orbit-breathing-orb": 3.2,
  "orbit-latitude-globe": 4.8,
  "orbit-scanning-sphere": 3.2,
  "orbit-thought-orb": 4.8,
  "orbit-morphing-sphere": 3.2,
  "orbit-searching": 4.8,
  "chart-bars": 3.2,
  "chart-line": 3.2,
  "chart-sparkline": 3.2,
  "chart-donut": 3.2,
  "chart-dot-area": 3.2,
  "chart-dot-series": 3.2,
  "chart-dot-scatter": 3.2,
  "chart-dot-sparkline": 3.2,
  "chart-heartbeat": 3.2,
  "chart-dot-gauge": 3.2,
  "chart-dot-radar": 3.2,
  "chart-dot-bubbles": 3.2,
}

export function getLoaderDefaultSpeed(name: string): number {
  return defaultSpeeds[name] ?? 1.6
}
