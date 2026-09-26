import type { Metadata } from "next"
import { Mark } from "@/components/mark"
import { getLoaderSummaries } from "@/lib/loader-items"
import { loaderComponents } from "@/lib/loaders"

// A fixed 1280×640 frame for the README cover and social preview. Screenshot the
// frame itself (DevTools → Capture node screenshot); press D to switch theme.
export const metadata: Metadata = {
  title: "loadercn showcase",
  robots: { index: false },
}

/** Filled in reading order around the hero, mixing families so no two neighbors match. */
const SHOWCASE: (keyof typeof loaderComponents)[] = [
  // Top row
  "grid-wave",
  "orbit-atom",
  "chart-bars",
  "classic-ring",
  "network-synthesize",
  "grid-spiral",
  "orbit-particle-globe",
  "chart-donut",
  // Left and right of the hero
  "classic-equalizer",
  "grid-snake",
  "orbit-comet",
  "chart-dot-radar",
  "orbit-thought-orb",
  "chart-heartbeat",
  "grid-ripple",
  "classic-dual-ring",
  // Bottom row
  "chart-dot-scatter",
  "network-associate",
  "grid-flip",
  "orbit-eclipse",
  "classic-bouncing-dots",
  "chart-streaming",
  "orbit-helix",
  "grid-pulse",
]

export default function ShowcasePage() {
  const items = getLoaderSummaries()
  return (
    <main className="flex min-h-screen items-center justify-center overflow-auto p-10">
      <div
        id="showcase"
        className="grid h-[640px] w-[1280px] shrink-0 grid-cols-8 grid-rows-4 border-t border-l bg-background"
      >
        <section className="col-span-4 col-start-3 row-span-2 row-start-2 flex flex-col items-center justify-center border-r border-b bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent)] text-center">
          <div className="flex items-center gap-2.5">
            <Mark small />
            <span className="text-lg font-semibold tracking-[-.06em]">
              loadercn<span className="text-primary">.</span>
            </span>
          </div>
          <h1 className="mt-6 max-w-[480px] font-heading text-[56px] leading-[1.05] font-medium tracking-[-.03em] text-balance">
            Animated loaders for shadcn/ui
            <span className="text-primary">.</span>
          </h1>
          <p className="mt-5 text-sm text-muted-foreground *:font-medium *:text-foreground">
            <strong>{items.length} loaders</strong> ·{" "}
            <strong>zero dependencies</strong> · <strong>shadcn CLI</strong>
          </p>
        </section>
        {SHOWCASE.map((name) => {
          const item = items.find((item) => item.name === name)!
          const Loader = loaderComponents[name]
          return (
            <div
              key={name}
              className="preview-surface relative flex items-center justify-center border-r border-b bg-card"
            >
              <Loader size={item.category === "grid" ? 44 : 56} />
              <span className="absolute bottom-3 left-3.5 font-mono text-[9px] tracking-wide text-muted-foreground">
                {item.title}
              </span>
            </div>
          )
        })}
      </div>
    </main>
  )
}
