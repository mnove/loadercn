import { readFile, writeFile } from "node:fs/promises"
const registry = JSON.parse(await readFile("registry.json", "utf8"))
// Set the public homepage at build time when deploying.
registry.homepage = process.env.NEXT_PUBLIC_SITE_URL || registry.homepage
await writeFile(
  "public/r/registry.json",
  JSON.stringify(registry, null, 2) + "\n"
)
await writeFile(
  "public/registry.json",
  JSON.stringify(registry, null, 2) + "\n"
)
