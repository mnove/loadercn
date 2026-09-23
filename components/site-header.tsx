"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Mark } from "@/components/mark"
import { cn } from "@/lib/utils"

export function SiteHeader({
  sidebarTrigger = false,
}: {
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
          "mx-auto flex h-14 items-center justify-between gap-3 px-6",
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
          className="flex items-center gap-5 md:gap-8"
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
  )
}
