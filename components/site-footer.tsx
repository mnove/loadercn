import { ArrowUpRight } from "lucide-react"
import { Mark } from "@/components/mark"

export function SiteFooter() {
  return (
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
  )
}
