export const GITHUB_URL = "https://github.com/mnove/loadercn"

/** The shadcn registry namespace users install from, e.g. `@loadercn/grid-wave`. */
export const REGISTRY_NAMESPACE = "@loadercn"

export function registryAddCommand(origin: string) {
  return `npx shadcn@latest registry add ${REGISTRY_NAMESPACE}=${origin}/r/{name}.json`
}

export function installCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${name}`
}
