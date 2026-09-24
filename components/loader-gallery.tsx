"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Info,
  Pause,
  Play,
  Search,
  Star,
  Terminal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CommandSnippet } from "@/components/command-snippet"
import { LoaderDetail } from "@/components/loader-detail"
import { PreviewColorPicker } from "@/components/preview-color-picker"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { GITHUB_URL, urlInstallCommand } from "@/lib/site"
import { CATEGORIES, CATEGORY_ICONS, loaderComponents } from "@/lib/loaders"
import type { LoaderItem } from "@/lib/loader-items"

export function LoaderGallery({ items }: { items: LoaderItem[] }) {
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [paused, setPaused] = useState(false)
  const [color, setColor] = useState<string | null>(null)
  const [selected, setSelected] = useState<LoaderItem | null>(null)
  const filters = [
    { id: "all", label: "All loaders", count: items.length, icon: null },
    ...CATEGORIES.map((c) => ({
      id: c.id as string,
      label: c.label as string,
      count: items.filter((item) => item.category === c.id).length,
      icon: CATEGORY_ICONS[c.id],
    })),
  ]
  const filtered = items.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
  )
  return (
    <div className="min-h-screen">
      <SiteHeader items={items} />
      <main>
        {/* Full-bleed so the glow isn't clipped by the content width. */}
        <div className="bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent)]">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <section className="flex flex-col items-center border-b py-16 text-center md:py-24">
              <h1 className="font-heading text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] font-medium tracking-[-.03em]">
                Worth the wait<span className="text-primary">.</span>
              </h1>
              <p className="mt-5 max-w-[440px] text-sm leading-7 text-muted-foreground *:font-medium *:text-foreground">
                <strong>{items.length} loaders</strong> with their CSS built in
                and <strong>zero dependencies</strong>. Copy the code, or
                install with the <strong>shadcn CLI</strong>.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button
                  nativeButton={false}
                  render={<a href="#collection" />}
                  className="gap-3 bg-foreground text-background hover:bg-foreground/85"
                >
                  Explore loaders <ArrowDown />
                </Button>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={
                    <a href={GITHUB_URL} target="_blank" rel="noreferrer" />
                  }
                  className="gap-3"
                >
                  <Star className="fill-yellow-400 text-yellow-400" /> Star on
                  GitHub
                </Button>
              </div>
              <CommandSnippet
                command={urlInstallCommand("classic-ring")}
                className="mt-8 w-full max-w-xl text-left"
              >
                <Button
                  variant="ghost"
                  size="icon-sm"
                  nativeButton={false}
                  render={<Link href="/docs" />}
                  aria-label="Setup guide"
                  title="Works in any shadcn project. Add the @loadercn registry for the shorter form. See the setup guide."
                >
                  <Info />
                </Button>
              </CommandSnippet>
            </section>
          </div>
        </div>

        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <section id="collection" className="pt-5 pb-16">
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background py-3 sm:gap-4">
              <div className="relative min-w-0 flex-1 xl:w-56 xl:flex-none">
                <Search className="absolute top-2.5 left-3 size-3.5 text-muted-foreground" />
                <Input
                  aria-label="Search loaders"
                  placeholder={`Search ${items.length} loaders...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-9 pl-8 text-xs md:text-xs"
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="absolute top-1 right-1"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X />
                  </Button>
                )}
              </div>
              {/* Buttons where there's room, a select everywhere else. */}
              <div
                className="hidden min-w-0 flex-1 items-center gap-1 xl:flex"
                role="group"
                aria-label="Filter by loader family"
              >
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={category === filter.id ? "secondary" : "ghost"}
                    size="sm"
                    aria-pressed={category === filter.id}
                    onClick={() => setCategory(filter.id)}
                    className="shrink-0 gap-2 px-3 text-xs font-medium tracking-normal normal-case"
                  >
                    {filter.icon && <filter.icon />}
                    {filter.label}
                    <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                      {filter.count}
                    </span>
                  </Button>
                ))}
              </div>
              <Select
                items={filters.map((filter) => ({
                  value: filter.id,
                  label: filter.label,
                }))}
                value={category}
                onValueChange={(value) => value && setCategory(value)}
              >
                <SelectTrigger
                  size="sm"
                  aria-label="Filter by loader family"
                  className="shrink-0 gap-2 text-xs xl:hidden"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filters.map((filter) => (
                    <SelectItem
                      key={filter.id}
                      value={filter.id}
                      className="text-xs"
                    >
                      {filter.icon && <filter.icon />}
                      {filter.label}
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {filter.count}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                <span
                  aria-live="polite"
                  className="hidden font-mono text-[10px] whitespace-nowrap text-muted-foreground sm:inline"
                >
                  {(query || category !== "all") &&
                    `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`}
                </span>
                <span className="hidden h-5 border-l sm:block" />
                <PreviewColorPicker value={color} onChange={setColor} />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={paused ? "Play animations" : "Pause animations"}
                  aria-pressed={paused}
                  onClick={() => setPaused(!paused)}
                >
                  {paused ? <Play /> : <Pause />}
                </Button>
              </div>
            </div>

            <div
              className={`loader-gallery grid border-l sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${paused ? "animations-paused" : ""}`}
              style={
                color
                  ? ({ "--preview-color": color } as React.CSSProperties)
                  : undefined
              }
            >
              {filtered.map((item) => {
                const Loader =
                  loaderComponents[item.name as keyof typeof loaderComponents]
                return (
                  <article
                    key={item.name}
                    className="group border-r border-b bg-card transition-colors hover:bg-muted/40"
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      aria-label={`View ${item.title} code and installation`}
                      className="preview-surface relative flex h-52 w-full cursor-pointer items-center justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:h-60"
                    >
                      <span className="absolute top-4 left-4 font-mono text-[9px] text-muted-foreground/70">
                        {String(items.indexOf(item) + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="preview-loader">
                        <Loader
                          size={
                            item.name === "classic-progress"
                              ? 72
                              : item.category === "grid"
                                ? 38
                                : 48
                          }
                        />
                      </span>
                      <span className="absolute right-4 bottom-4 flex items-center gap-1.5 text-[10px] text-muted-foreground opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                        View component <ArrowUpRight className="size-3" />
                      </span>
                    </button>
                    <div className="flex items-center justify-between border-t px-4 py-3.5">
                      <div>
                        <h2 className="text-xs font-medium">
                          <Link
                            href={`/docs/${item.name}`}
                            className="hover:underline hover:underline-offset-4"
                          >
                            {item.title}
                          </Link>
                        </h2>
                        <p className="mt-1 font-mono text-[9px] tracking-wide text-muted-foreground">
                          {item.category.toUpperCase()} / CSS
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Get ${item.title} code`}
                        onClick={() => setSelected(item)}
                      >
                        <Code2 />
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
            {!filtered.length && (
              <div className="mt-6 border border-dashed py-20 text-center">
                <Search className="mx-auto mb-4 size-6 text-muted-foreground" />
                <h2 className="font-heading text-base font-medium">
                  No loaders found
                </h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  Try a different name or explore another family.
                </p>
                <Button
                  className="mt-5"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery("")
                    setCategory("all")
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </section>

          <section className="mb-14 flex flex-col justify-between gap-6 border-y py-9 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center border">
                <Terminal className="size-4" />
              </span>
              <div>
                <h2 className="font-heading text-base font-medium">
                  One command. All yours.
                </h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  No animation library. No extra dependencies. Just React and
                  CSS.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href="/docs" />}
              className="justify-start px-0 sm:px-4"
            >
              Install with shadcn <ArrowRight />
            </Button>
          </section>
        </div>
      </main>
      <SiteFooter />
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        {/* Full screen with a back button on mobile, a centered dialog from sm up. */}
        <DialogContent
          showCloseButton={false}
          className="top-0 left-0 flex h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 p-0 ring-0 sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[90svh] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:ring-1 data-open:zoom-in-100 sm:data-open:zoom-in-95 data-closed:zoom-out-100 sm:data-closed:zoom-out-95"
        >
          {selected && (
            <>
              <div className="flex items-start gap-2 border-b p-4 sm:p-6 sm:pr-16">
                <DialogClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="-ml-2 sm:hidden"
                    />
                  }
                >
                  <ArrowLeft />
                  <span className="sr-only">Back to loaders</span>
                </DialogClose>
                <DialogHeader className="min-w-0 pt-2 sm:pt-0">
                  <DialogTitle>{selected.title}</DialogTitle>
                  <DialogDescription>{selected.description}</DialogDescription>
                </DialogHeader>
                <DialogClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="absolute top-5 right-5 hidden bg-secondary sm:inline-flex"
                    />
                  }
                >
                  <X />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-6">
                <LoaderDetail
                  key={selected.name}
                  item={selected}
                  color={color}
                  onColorChange={setColor}
                />
              </div>
              <DialogFooter className="border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-4">
                <DialogClose
                  render={
                    <Button variant="ghost" className="hidden sm:inline-flex" />
                  }
                >
                  Close
                </DialogClose>
                <Button
                  nativeButton={false}
                  render={<Link href={`/docs/${selected.name}`} />}
                  className="gap-2"
                >
                  Open component page <ArrowRight />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
