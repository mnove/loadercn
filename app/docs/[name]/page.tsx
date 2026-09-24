import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoaderDetail } from "@/components/loader-detail"
import { getLoaderItem, getLoaderSummaries } from "@/lib/loader-items"
import { SITE_URL } from "@/lib/site"
import { loaderNotes } from "@/lib/loader-notes"
import { CATEGORIES } from "@/lib/loaders"

// Only the loaders in the registry exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return getLoaderSummaries().map((item) => ({ name: item.name }))
}

function categoryLabel(category: string) {
  return CATEGORIES.find((c) => c.id === category)?.label ?? category
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[name]">): Promise<Metadata> {
  const { name } = await params
  const item = getLoaderSummaries().find((i) => i.name === name)
  if (!item) return {}
  const title = `${item.title} — React ${categoryLabel(item.category).toLowerCase()} loader`
  const description = `${item.description} A zero-dependency React loading spinner with built-in CSS. Copy the source or install it with the shadcn CLI.`
  return {
    title: `${title} | loadercn`,
    description,
    alternates: { canonical: `/docs/${item.name}` },
    openGraph: { title, description, url: `/docs/${item.name}` },
    twitter: { card: "summary_large_image", title, description },
  }
}

export default async function LoaderPage({
  params,
}: PageProps<"/docs/[name]">) {
  const { name } = await params
  const item = await getLoaderItem(name)
  if (!item) notFound()

  // Same order as the sidebar, so previous/next follow what readers see.
  const summaries = getLoaderSummaries()
  const siblings = CATEGORIES.flatMap((c) =>
    summaries.filter((i) => i.category === c.id)
  )
  const index = siblings.findIndex((i) => i.name === item.name)
  const previous = siblings[index - 1]
  const next = siblings[index + 1]
  const note = loaderNotes[item.name]

  const url = `${SITE_URL}/docs/${item.name}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        name: item.title,
        description: note ? `${item.description} ${note}` : item.description,
        url,
        image: `${url}/opengraph-image`,
        codeSampleType: "full",
        programmingLanguage: ["TypeScript", "React", "CSS"],
        runtimePlatform: "React",
        codeRepository: `${SITE_URL}/r/${item.name}.json`,
        isPartOf: { "@type": "CreativeWork", name: "loadercn", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "loadercn",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Docs",
            item: `${SITE_URL}/docs`,
          },
          { "@type": "ListItem", position: 3, name: item.title, item: url },
        ],
      },
    ],
  }

  return (
    <main className="mx-auto max-w-4xl px-6 pb-14 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="border-b py-12 md:py-16">
        <p className="font-mono text-[10px] tracking-[.12em] text-muted-foreground uppercase">
          {categoryLabel(item.category)} loader
        </p>
        <h1 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-medium tracking-[-.03em]">
          {item.title}
        </h1>
        <p className="mt-5 max-w-[520px] text-sm leading-7 text-muted-foreground">
          {item.description} A single React component with its CSS built in and
          no dependencies. Install it with the shadcn CLI or copy the source.
        </p>
      </section>

      <section className="flex flex-col gap-6 py-10">
        <h2 className="sr-only">Preview and installation</h2>
        <LoaderDetail item={item} previewClassName="h-64" />
      </section>

      {note && (
        <section className="border-t py-10">
          <h2 className="font-heading text-base font-medium">When to use it</h2>
          <p className="mt-2 max-w-[560px] text-sm leading-7 text-muted-foreground">
            {note}
          </p>
        </section>
      )}

      <section className="border-t py-10">
        <h2 className="font-heading text-base font-medium">Props</h2>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          {item.title} accepts <code>size</code>, <code>speed</code>,{" "}
          <code>label</code>, <code>className</code>, and <code>style</code>,
          like every loader in the collection. See the{" "}
          <Link href="/docs" className="underline underline-offset-4">
            installation guide
          </Link>{" "}
          for the full reference.
        </p>
      </section>

      <nav
        aria-label="Loader pagination"
        className="flex justify-between gap-3 border-t pt-8"
      >
        {previous ? (
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href={`/docs/${previous.name}`} />}
            className="gap-2"
          >
            <ArrowLeft /> {previous.title}
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href={`/docs/${next.name}`} />}
            className="gap-2"
          >
            {next.title} <ArrowRight />
          </Button>
        )}
      </nav>
    </main>
  )
}
