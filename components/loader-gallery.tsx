"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Grid2X2,
  Orbit,
  LoaderCircle,
  Pause,
  Play,
  Search,
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
import { GitHubIcon } from "@/components/icons"
import { InstallCommand } from "@/components/install-command"
import { LoaderDetail } from "@/components/loader-detail"
import { PreviewColorPicker } from "@/components/preview-color-picker"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CATEGORIES, loaderComponents } from "@/lib/loaders"
import { GITHUB_URL } from "@/lib/site"
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
      icon: { grid: Grid2X2, orbital: Orbit, classic: LoaderCircle }[c.id],
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
      <SiteHeader />
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
                  render={<Link href="/docs" />}
                  className="gap-3"
                >
                  <Terminal /> Get started
                </Button>
              </div>
              <div className="mt-8 flex w-full max-w-xl flex-col gap-3 text-left sm:flex-row sm:items-center">
                <InstallCommand name="classic-ring" className="flex-1" />
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={
                    <a href={GITHUB_URL} target="_blank" rel="noreferrer" />
                  }
                  className="gap-2.5"
                >
                  <GitHubIcon /> GitHub
                </Button>
              </div>
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
        <DialogContent className="flex max-h-[90svh] flex-col gap-0 p-0 sm:max-w-2xl">
          {selected && (
            <>
              <DialogHeader className="border-b p-6 pr-16">
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6">
                <LoaderDetail
                  key={selected.name}
                  item={selected}
                  color={color}
                  onColorChange={setColor}
                />
              </div>
              <DialogFooter className="border-t px-6 py-4">
                <DialogClose render={<Button variant="ghost" />}>
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
