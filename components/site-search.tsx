"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  ArrowUpRight,
  Check,
  Copy,
  LayoutGrid,
  Moon,
  Search,
  Sun,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { GitHubIcon } from "@/components/icons"
import { useOrigin } from "@/components/install-command"
import type { LoaderSummary } from "@/lib/loader-items"
import { CATEGORIES, loaderComponents } from "@/lib/loaders"
import { GITHUB_URL, registryAddCommand, urlInstallCommand } from "@/lib/site"

function useIsMac() {
  return useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true
  )
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  )
}

/** A header button and ⌘K palette to jump to any loader or run site actions. */
export function SiteSearch({ items }: { items: LoaderSummary[] }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const origin = useOrigin()
  const isMac = useIsMac()
  const { resolvedTheme, setTheme } = useTheme()
  const current = items.find((item) => pathname === `/docs/${item.name}`)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isTyping(e.target))
      ) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const run = (action: () => void) => {
    setOpen(false)
    action()
  }

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(id)
      setTimeout(() => {
        setOpen(false)
        setCopied(null)
      }, 700)
    } catch {
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Search loaders"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Search />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden w-56 justify-start gap-2 pr-1 pl-2 font-normal tracking-normal text-muted-foreground normal-case md:flex"
      >
        <Search />
        Search loaders...
        <KbdGroup className="ml-auto">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search loaders"
        description="Jump to a loader or run an action."
        className="sm:max-w-lg"
      >
        <Command>
          <CommandInput placeholder="Search loaders and actions..." />
          <CommandList className="max-h-96">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Getting started">
              <CommandItem
                value="Installation"
                keywords={["docs", "setup", "registry", "shadcn"]}
                onSelect={() => run(() => router.push("/docs"))}
              >
                <Terminal />
                Installation
              </CommandItem>
              <CommandItem
                value="Browse all loaders"
                keywords={["gallery", "collection", "home"]}
                onSelect={() => run(() => router.push("/#collection"))}
              >
                <LayoutGrid />
                Browse all loaders
              </CommandItem>
            </CommandGroup>
            {CATEGORIES.map((category) => (
              <CommandGroup key={category.id} heading={category.label}>
                {items
                  .filter((item) => item.category === category.id)
                  .map((item) => {
                    const Loader =
                      loaderComponents[
                        item.name as keyof typeof loaderComponents
                      ]
                    return (
                      <CommandItem
                        key={item.name}
                        value={item.title}
                        keywords={[item.name, item.description, category.label]}
                        onSelect={() =>
                          run(() => router.push(`/docs/${item.name}`))
                        }
                      >
                        <span
                          aria-hidden="true"
                          className="flex size-6 shrink-0 items-center justify-center"
                        >
                          <Loader
                            size={item.name === "classic-progress" ? 24 : 18}
                          />
                        </span>
                        {item.title}
                      </CommandItem>
                    )
                  })}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Actions">
              {current && (
                <CommandItem
                  value={`Copy install command for ${current.title}`}
                  keywords={["cli", "npx", "shadcn"]}
                  onSelect={() =>
                    copy("install", urlInstallCommand(current.name))
                  }
                >
                  {copied === "install" ? <Check /> : <Copy />}
                  Copy install command for {current.title}
                  {copied === "install" && (
                    <CommandShortcut>Copied</CommandShortcut>
                  )}
                </CommandItem>
              )}
              <CommandItem
                value="Copy registry setup command"
                keywords={["cli", "npx", "shadcn", "namespace"]}
                onSelect={() => copy("registry", registryAddCommand(origin))}
              >
                {copied === "registry" ? <Check /> : <Copy />}
                Copy registry setup command
                {copied === "registry" && (
                  <CommandShortcut>Copied</CommandShortcut>
                )}
              </CommandItem>
              <CommandItem
                value="Toggle theme"
                keywords={["dark", "light", "mode", "color"]}
                onSelect={() =>
                  run(() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  )
                }
              >
                <Sun className="hidden dark:block" />
                <Moon className="dark:hidden" />
                Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
              </CommandItem>
              <CommandItem
                value="View on GitHub"
                keywords={["source", "repository", "code"]}
                onSelect={() =>
                  run(() => window.open(GITHUB_URL, "_blank", "noreferrer"))
                }
              >
                <GitHubIcon />
                View on GitHub
                <ArrowUpRight className="ml-auto text-muted-foreground" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
