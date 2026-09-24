import registry from "@/registry.json"

/** Production by default; `NEXT_PUBLIC_SITE_URL` overrides it for previews. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || registry.homepage

export const GITHUB_URL = "https://github.com/mnove/loadercn"

/** The shadcn registry namespace users install from, e.g. `@loadercn/grid-wave`. */
export const REGISTRY_NAMESPACE = "@loadercn"

export function registryAddCommand(origin: string) {
  return `npx shadcn@latest registry add ${REGISTRY_NAMESPACE}=${origin}/r/{name}.json`
}

/** Needs the `@loadercn` registry in the project's `components.json`. */
export function installCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${name}`
}

/** Works in any shadcn project, no registry setup required. */
export function urlInstallCommand(name: string) {
  return `npx shadcn@latest add ${SITE_URL}/r/${name}.json`
}
