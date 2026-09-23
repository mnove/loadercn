"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Mark } from "@/components/mark"

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          aria-label="loadercn home"
          className="flex items-center gap-2.5"
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
            Get started
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
