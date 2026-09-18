"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Grid2X2,
  Moon,
  Orbit,
  Pause,
  Play,
  Search,
  Sun,
  Terminal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loaderComponents } from "@/lib/loaders"

type Item = {
  name: string
  title: string
  description: string
  category: string
  source: string
}

function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  useEffect(() => {
    if (status === "idle") return
    const timeout = setTimeout(() => setStatus("idle"), 2200)
    return () => clearTimeout(timeout)
  }, [status])
  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setStatus("copied")
        } catch {
          setStatus("error")
        }
      }}
    >
      {status === "copied" ? <Check /> : <Copy />}
      <span aria-live="polite">
        {status === "copied"
          ? "Copied"
          : status === "error"
            ? "Copy failed. Try again"
            : label}
      </span>
    </Button>
  )
}

function Mark({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid grid-cols-3 gap-[3px] ${small ? "size-5" : "size-6"}`}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className={i === 2 || i === 6 ? "bg-primary/30" : "bg-primary"}
        />
      ))}
    </span>
  )
}

export function LoaderGallery({ items }: { items: Item[] }) {
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [paused, setPaused] = useState(false)
  const [color, setColor] = useState("default")
  const [selected, setSelected] = useState<Item | null>(null)
  const [guideOpen, setGuideOpen] = useState(false)
  const [size, setSize] = useState(48)
  const [speed, setSpeed] = useState(1.6)
  const [origin, setOrigin] = useState("")
  const { resolvedTheme, setTheme } = useTheme()
  const filtered = items.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
  )
  const SelectedLoader = selected
    ? loaderComponents[selected.name as keyof typeof loaderComponents]
    : null
  const componentName = selected?.name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")
  const command = (name: string) =>
    `npx shadcn@latest add ${origin}/r/${name}.json`
  const openItem = (item: Item) => {
    setOrigin(window.location.origin)
    setSize(48)
    setSpeed(1.6)
    setSelected(item)
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            aria-label="loadercn home"
            className="flex items-center gap-3"
          >
            <Mark />
            <span className="text-xl font-semibold tracking-[-.06em]">
              loadercn<span className="text-primary">.</span>
            </span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-5 md:gap-8"
          >
            <a
              href="#collection"
              className="hidden text-xs font-medium sm:block"
            >
              Components
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="px-0 text-xs font-normal tracking-normal normal-case"
              onClick={() => setGuideOpen(true)}
            >
              How to use <ArrowUpRight className="size-3" />
            </Button>
            <span className="h-5 border-l" />
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Toggle color theme"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <Sun className="hidden dark:block" />
              <Moon className="dark:hidden" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-6 md:px-10">
        <section className="relative flex flex-col justify-between gap-10 border-b py-16 md:flex-row md:items-end md:py-24">
          <div>
            <div className="mb-7 flex items-center gap-2.5 font-mono text-[10px] tracking-[.16em] text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-primary" />
              Small components. Continuous possibilities.
            </div>
            <h1 className="text-[clamp(3rem,6.5vw,5.5rem)] leading-[1.02] font-medium tracking-[-.065em]">
              Worth the wait<span className="text-primary">.</span>
            </h1>
            <p className="mt-6 max-w-[450px] text-sm leading-7 text-muted-foreground">
              A considered collection of loaders for your next interface.
              <br className="hidden sm:block" /> Copy the code. Make it yours.
              Keep things moving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                render={<a href="#collection" />}
                className="gap-3 bg-foreground text-background hover:bg-foreground/85"
              >
                Explore loaders <ArrowDown />
              </Button>
              <Button
                variant="outline"
                className="gap-3"
                onClick={() => setGuideOpen(true)}
              >
                <Terminal /> Get started
              </Button>
            </div>
          </div>
          <div className="flex gap-8 font-mono text-[10px] leading-6 tracking-wide text-muted-foreground md:pb-1">
            <div>
              <span className="block text-2xl tracking-[-.08em] text-foreground">
                {items.length}
              </span>
              LOADERS
            </div>
            <div>
              <span className="block text-2xl tracking-[-.08em] text-foreground">
                02
              </span>
              FAMILIES
            </div>
            <div>
              <span className="block text-2xl tracking-[-.08em] text-foreground">
                ∞
              </span>
              POSSIBILITIES
            </div>
          </div>
        </section>

        <section id="collection" className="scroll-mt-6 pt-9 pb-16">
          <div className="mb-7 flex items-center justify-between font-mono text-[10px] tracking-[.12em] text-muted-foreground uppercase">
            <span>01 — The collection</span>
            <span className="hidden sm:block">
              Built for React. Yours to customize.
            </span>
          </div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Filter by loader family"
            >
              {[
                {
                  id: "all",
                  label: "All loaders",
                  count: items.length,
                  icon: null,
                },
                {
                  id: "grid",
                  label: "Grid",
                  count: items.filter((item) => item.category === "grid")
                    .length,
                  icon: Grid2X2,
                },
                {
                  id: "orbital",
                  label: "Orbital",
                  count: items.filter((item) => item.category === "orbital")
                    .length,
                  icon: Orbit,
                },
              ].map((filter) => (
                <Button
                  key={filter.id}
                  variant={category === filter.id ? "secondary" : "ghost"}
                  size="sm"
                  aria-pressed={category === filter.id}
                  onClick={() => setCategory(filter.id)}
                  className="gap-2 px-3 text-xs font-medium tracking-normal normal-case"
                >
                  {filter.icon && <filter.icon />}
                  {filter.label}
                  <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                    {filter.count}
                  </span>
                </Button>
              ))}
            </div>
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="absolute top-2.5 left-3 size-3.5 text-muted-foreground" />
                <Input
                  aria-label="Search loaders"
                  placeholder="Find your next loader..."
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
              <span className="h-5 border-l" />
              <div
                className="flex gap-1"
                role="group"
                aria-label="Preview color"
              >
                {["default", "orange", "blue"].map((c) => (
                  <Button
                    key={c}
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`${c} preview color`}
                    aria-pressed={color === c}
                    onClick={() => setColor(c)}
                    className={`size-6 rounded-full ${color === c ? "ring-1 ring-foreground/30" : ""}`}
                  >
                    <span
                      className={`size-3 rounded-full ${c === "default" ? "bg-foreground" : c === "orange" ? "bg-primary" : "bg-blue-500"}`}
                    />
                  </Button>
                ))}
              </div>
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
            className={`loader-gallery grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${paused ? "animations-paused" : ""}`}
            data-color={color}
          >
            {filtered.map((item) => {
              const Loader =
                loaderComponents[item.name as keyof typeof loaderComponents]
              return (
                <article
                  key={item.name}
                  className="group border bg-card transition-colors hover:border-foreground/30"
                >
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    aria-label={`View ${item.title} code and installation`}
                    className="preview-surface relative flex h-52 w-full cursor-pointer items-center justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:h-60"
                  >
                    <span className="absolute top-4 left-4 font-mono text-[9px] text-muted-foreground/70">
                      {String(items.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="preview-loader">
                      <Loader size={item.category === "grid" ? 38 : 48} />
                    </span>
                    <span className="absolute right-4 bottom-4 flex items-center gap-1.5 text-[10px] text-muted-foreground opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                      View component <ArrowUpRight className="size-3" />
                    </span>
                  </button>
                  <div className="flex items-center justify-between border-t px-4 py-3.5">
                    <div>
                      <h2 className="text-xs font-medium">{item.title}</h2>
                      <p className="mt-1 font-mono text-[9px] tracking-wide text-muted-foreground">
                        {item.category === "grid" ? "GRID" : "ORBITAL"} / CSS
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Get ${item.title} code`}
                      onClick={() => openItem(item)}
                    >
                      <Code2 />
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
          {!filtered.length && (
            <div className="border border-dashed py-20 text-center">
              <Search className="mx-auto mb-4 size-6 text-muted-foreground" />
              <h2 className="text-sm font-medium">No loaders found</h2>
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
          <div className="mt-6 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span aria-live="polite">
              Showing {filtered.length} of {items.length} loaders
            </span>
            <span>Less waiting. More character.</span>
          </div>
        </section>

        <section className="mb-14 flex flex-col justify-between gap-6 border-y py-9 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center border">
              <Terminal className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-medium">One command. All yours.</h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                No animation library. No extra dependencies. Just React and CSS.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setGuideOpen(true)}
            className="justify-start px-0 sm:px-4"
          >
            Install with shadcn <ArrowRight />
          </Button>
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-5 px-6 pb-8 text-[10px] text-muted-foreground md:px-10">
        <div className="flex items-center gap-2.5">
          <Mark small />
          <span className="text-xs font-medium text-foreground">loadercn.</span>
          <span className="ml-2">A little motion goes a long way.</span>
        </div>
        <a
          href="https://ui.shadcn.com/docs/registry"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-foreground"
        >
          shadcn registry compatible <ArrowUpRight className="size-3" />
        </a>
      </footer>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-2xl">
          {selected && SelectedLoader && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="preview-surface flex h-36 items-center justify-center border">
                <SelectedLoader
                  size={size}
                  speed={speed}
                  className={
                    color === "orange"
                      ? "text-primary"
                      : color === "blue"
                        ? "text-blue-500"
                        : ""
                  }
                />
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs">
                <label className="flex items-center gap-3">
                  Size{" "}
                  <input
                    aria-label="Loader size"
                    type="range"
                    min="20"
                    max="80"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-24 accent-primary"
                  />
                  <span className="w-9 font-mono text-muted-foreground">
                    {size}px
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  Cycle{" "}
                  <input
                    aria-label="Animation cycle duration"
                    type="range"
                    min="0.6"
                    max="3"
                    step="0.2"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-24 accent-primary"
                  />
                  <span className="font-mono text-muted-foreground">
                    {speed}s
                  </span>
                </label>
              </div>
              <Tabs defaultValue="install">
                <TabsList variant="line">
                  <TabsTrigger value="install">CLI</TabsTrigger>
                  <TabsTrigger value="source">Source</TabsTrigger>
                </TabsList>
                <TabsContent value="install" className="space-y-5 pt-4">
                  <p className="text-xs leading-6 text-muted-foreground">
                    Run this command in a project initialized with shadcn.
                  </p>
                  <div className="flex items-center gap-3 border bg-muted/50 p-3">
                    <code className="min-w-0 flex-1 overflow-x-auto text-[11px] whitespace-nowrap">
                      {command(selected.name)}
                    </code>
                    <CopyButton value={command(selected.name)} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Then add it to your interface:
                  </p>
                  <pre className="overflow-x-auto border bg-muted/50 p-4 text-[11px] leading-6">
                    <code>{`import { ${componentName} } from "@/components/ui/${selected.name}"\n\n<${componentName} size={${size}} speed={${speed}} />`}</code>
                  </pre>
                  <p className="text-[11px] leading-5 text-muted-foreground">
                    Inherits text color. Accepts className, style, and a custom
                    loading label. Respects reduced-motion preferences.
                  </p>
                </TabsContent>
                <TabsContent value="source" className="space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      {selected.name}.tsx
                    </span>
                    <CopyButton value={selected.source} label="Copy source" />
                  </div>
                  <pre className="max-h-72 overflow-auto border bg-muted/50 p-4 text-[11px] leading-5">
                    <code>{selected.source}</code>
                  </pre>
                  <p className="text-xs text-muted-foreground">
                    Copy the complete file into your components directory.
                    Styles are included.
                  </p>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={guideOpen} onOpenChange={setGuideOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>A little motion. In minutes.</DialogTitle>
            <DialogDescription>
              Pick a loader, bring it into your project, and make it your own.
            </DialogDescription>
          </DialogHeader>
          <ol className="space-y-6 text-sm">
            <li>
              <span className="mb-2 block font-medium">01 / Set up shadcn</span>
              <p className="mb-3 text-xs leading-6 text-muted-foreground">
                Already using shadcn? You can skip this step.
              </p>
              <div className="flex items-center justify-between gap-2 border bg-muted/50 p-3">
                <code className="text-xs">npx shadcn@latest init</code>
                <CopyButton value="npx shadcn@latest init" />
              </div>
            </li>
            <li>
              <span className="mb-2 block font-medium">
                02 / Find your rhythm
              </span>
              <p className="text-xs leading-6 text-muted-foreground">
                Open any loader in the collection. Copy its install command from
                the CLI tab and run it in your project.
              </p>
            </li>
            <li>
              <span className="mb-2 block font-medium">03 / Make it yours</span>
              <p className="text-xs leading-6 text-muted-foreground">
                Adjust size, speed, and color. The component lives in your
                codebase, so every detail is yours to change.
              </p>
            </li>
          </ol>
          <div className="border-t pt-5 text-xs leading-6 text-muted-foreground">
            Prefer to copy and paste? Every loader includes its complete React
            source in the Source tab. No shadcn setup required.
          </div>
          <a
            href="/r/registry.json"
            target="_blank"
            className="flex items-center gap-2 text-xs underline underline-offset-4"
          >
            View registry JSON <ArrowUpRight className="size-3" />
          </a>
        </DialogContent>
      </Dialog>
    </div>
  )
}
