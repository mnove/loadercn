"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { CopyButton } from "@/components/copy-button"
import { useOrigin } from "@/components/install-command"
import { loaderComponents } from "@/lib/loaders"
import type { LoaderItem } from "@/lib/loader-items"
import { cn } from "@/lib/utils"

export function toComponentName(name: string) {
  return name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")
}

/** Live preview with size and cycle controls, plus CLI and source tabs. */
export function LoaderDetail({
  item,
  color,
  previewClassName,
}: {
  item: LoaderItem
  /** Any CSS color. Defaults to the inherited text color. */
  color?: string
  previewClassName?: string
}) {
  const [size, setSize] = useState(48)
  const [speed, setSpeed] = useState(1.6)
  const origin = useOrigin()
  const Loader = loaderComponents[item.name as keyof typeof loaderComponents]
  const componentName = toComponentName(item.name)
  const command = `npx shadcn@latest add ${origin}/r/${item.name}.json`

  return (
    <>
      <div
        className={cn(
          "preview-surface flex h-36 items-center justify-center border",
          previewClassName
        )}
      >
        <Loader
          size={size}
          speed={speed}
          style={color ? { color } : undefined}
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
          <span className="w-9 font-mono text-muted-foreground">{size}px</span>
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
          <span className="font-mono text-muted-foreground">{speed}s</span>
        </label>
      </div>
      <Tabs defaultValue="install" className="min-w-0">
        <TabsList variant="line">
          <TabsTrigger value="install">CLI</TabsTrigger>
          <TabsTrigger value="source">Source</TabsTrigger>
        </TabsList>
        <TabsContent value="install" className="min-w-0 space-y-5 pt-4">
          <p className="text-xs leading-6 text-muted-foreground">
            Run this command in a project initialized with shadcn.
          </p>
          <div className="flex items-center gap-3 border bg-muted/50 p-3">
            <code className="min-w-0 flex-1 overflow-x-auto text-[11px] whitespace-nowrap">
              {command}
            </code>
            <CopyButton value={command} />
          </div>
          <p className="text-xs text-muted-foreground">
            Then add it to your interface:
          </p>
          <CodeBlock
            code={`import { ${componentName} } from "@/components/ui/${item.name}"\n\n<${componentName} size={${size}} speed={${speed}} />`}
            className="border bg-muted/50 p-4 text-[11px] leading-6"
          />
          <p className="text-[11px] leading-5 text-muted-foreground">
            Inherits text color. Accepts className, style, and a custom loading
            label. Respects reduced-motion preferences.
          </p>
        </TabsContent>
        <TabsContent
          value="source"
          keepMounted
          className="min-w-0 space-y-3 pt-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              {item.name}.tsx
            </span>
            <CopyButton value={item.source} label="Copy source" />
          </div>
          <CodeBlock
            code={item.source}
            className="max-h-72 overflow-auto border bg-muted/50 p-4 text-[11px] leading-5"
          />
          <p className="text-xs text-muted-foreground">
            Copy the complete file into your components directory. Styles are
            included.
          </p>
        </TabsContent>
      </Tabs>
    </>
  )
}
