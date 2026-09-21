import { readFile } from "node:fs/promises"
import path from "node:path"
import registry from "@/registry.json"
import { LoaderGallery } from "@/components/loader-gallery"

// Statically scoped so the build only traces this folder, not the whole project.
const LOADERS_DIR = path.join(process.cwd(), "registry", "loaders")

export default async function Page() {
  const items = await Promise.all(
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
  return <LoaderGallery items={items} />
}
