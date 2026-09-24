import { readFile } from "node:fs/promises"
import path from "node:path"
import registry from "@/registry.json"

// Statically scoped so the build only traces this folder, not the whole project.
const LOADERS_DIR = path.join(process.cwd(), "registry", "loaders")

export type LoaderItem = {
  name: string
  title: string
  description: string
  category: string
  source: string
}

export type LoaderSummary = Omit<LoaderItem, "source">

export function getLoaderSummaries(): LoaderSummary[] {
  return registry.items.map((item) => ({
    name: item.name,
    title: item.title,
    description: item.description,
    category: item.categories[0],
  }))
}

export async function getLoaderItems(): Promise<LoaderItem[]> {
  return Promise.all(
    registry.items.map(async (item) => ({
      name: item.name,
      title: item.title,
      description: item.description,
      category: item.categories[0],
      source: await readFile(
        path.join(LOADERS_DIR, path.basename(item.files[0].path)),
        "utf8"
      ),
    }))
  )
}

export async function getLoaderItem(
  name: string
): Promise<LoaderItem | undefined> {
  return (await getLoaderItems()).find((item) => item.name === name)
}
