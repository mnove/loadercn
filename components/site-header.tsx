"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GitHubIcon } from "@/components/icons"
import { Mark } from "@/components/mark"
import { SiteSearch } from "@/components/site-search"
import type { LoaderSummary } from "@/lib/loader-items"
import { GITHUB_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader({
  items,
  sidebarTrigger = false,
}: {
  /** The loaders listed in the search palette. */
  items: LoaderSummary[]
  /** Full-width, sticky layout with a mobile sidebar toggle, for docs pages. */
  sidebarTrigger?: boolean
}) {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <header
      className={cn(
        "border-b",
        sidebarTrigger && "sticky top-0 z-20 bg-background"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:px-6",
          sidebarTrigger ? "md:px-6" : "max-w-[1280px] md:px-10"
        )}
      >
        {sidebarTrigger && <SidebarTrigger className="-ml-2 md:hidden" />}
        <Link
          href="/"
          aria-label="loadercn home"
          className="mr-auto flex items-center gap-2.5"
        >
          <Mark small />
          <span className="text-lg font-semibold tracking-[-.06em]">
            loadercn<span className="text-primary">.</span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-2 sm:gap-5 md:gap-8"
        >
          <Link
            href="/#collection"
            className="hidden text-xs font-medium sm:block"
          >
            Components
          </Link>
          <Link href="/docs" className="text-xs font-medium">
            Docs
          </Link>
          <span className="hidden h-5 border-l sm:block" />
          <div className="flex items-center sm:gap-1 md:gap-2">
            <SiteSearch items={items} />
            <Button
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
              aria-label="loadercn on GitHub"
            >
              <GitHubIcon />
            </Button>
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
          </div>
        </nav>
      </div>
    </header>
  )
}
