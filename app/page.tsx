import { LoaderGallery } from "@/components/loader-gallery"
import { getLoaderItems } from "@/lib/loader-items"

export default async function Page() {
  return <LoaderGallery items={await getLoaderItems()} />
}
