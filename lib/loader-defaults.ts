/** Match the defaults in the standalone files; shipped loaders never import site code. */
const defaultSpeeds: Record<string, number> = {
  "orbit-particle-globe": 4.8,
  "orbit-breathing-orb": 3.2,
  "orbit-latitude-globe": 4.8,
  "orbit-scanning-sphere": 3.2,
  "orbit-thought-orb": 4.8,
  "orbit-morphing-sphere": 3.2,
  "orbit-searching": 4.8,
}

export function getLoaderDefaultSpeed(name: string): number {
  return defaultSpeeds[name] ?? 1.6
}
