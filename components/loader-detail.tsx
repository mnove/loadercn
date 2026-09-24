"use client"

import { useId, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { CommandSnippet } from "@/components/command-snippet"
import { CopyButton } from "@/components/copy-button"
import { PreviewColorPicker } from "@/components/preview-color-picker"
import { loaderComponents } from "@/lib/loaders"
import { installCommand, urlInstallCommand } from "@/lib/site"
import type { LoaderItem } from "@/lib/loader-items"
import { cn } from "@/lib/utils"

export function toComponentName(name: string) {
  return name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")
}

function firstValue(value: number | readonly number[]) {
  return typeof value === "number" ? value : value[0]
}

/** Live preview with size, cycle, and color controls, plus CLI and source tabs. */
export function LoaderDetail({
  item,
  color: colorProp = null,
  onColorChange,
  previewClassName,
}: {
  item: LoaderItem
  /** Any CSS color. `null` inherits the text color. */
  color?: string | null
  /** Makes the color controlled, e.g. to share it with the gallery. */
  onColorChange?: (color: string | null) => void
  previewClassName?: string
}) {
  const id = useId()
  const [size, setSize] = useState(48)
  const [speed, setSpeed] = useState(1.6)
  const [localColor, setLocalColor] = useState(colorProp)
  const color = onColorChange ? colorProp : localColor
  const setColor = onColorChange ?? setLocalColor
  const Loader = loaderComponents[item.name as keyof typeof loaderComponents]
  const componentName = toComponentName(item.name)
  const command = installCommand(item.name)
  const urlCommand = urlInstallCommand(item.name)

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
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs">
        <div className="flex items-center gap-3">
          <span id={`${id}-size`}>Size</span>
          <Slider
            aria-labelledby={`${id}-size`}
            min={20}
            max={80}
            value={[size]}
            onValueChange={(value) => setSize(firstValue(value))}
            className="data-horizontal:w-24"
          />
          <span className="w-9 font-mono text-muted-foreground">{size}px</span>
        </div>
        <div className="flex items-center gap-3">
          <span id={`${id}-cycle`}>Cycle</span>
          <Slider
            aria-labelledby={`${id}-cycle`}
            min={0.6}
            max={3}
            step={0.2}
            value={[speed]}
            onValueChange={(value) => setSpeed(firstValue(value))}
            className="data-horizontal:w-24"
          />
          <span className="font-mono text-muted-foreground">{speed}s</span>
        </div>
        <div className="flex items-center gap-1.5">
          Color <PreviewColorPicker value={color} onChange={setColor} />
        </div>
      </div>
      <Tabs defaultValue="install" className="min-w-0">
        <TabsList variant="line">
          <TabsTrigger value="install">CLI</TabsTrigger>
          <TabsTrigger value="source">Source</TabsTrigger>
        </TabsList>
        <TabsContent value="install" className="min-w-0 space-y-5 pt-4">
          <p className="text-xs leading-6 text-muted-foreground">
            Run this command in any project set up with shadcn.
          </p>
          <CommandSnippet command={urlCommand} />
          <p className="text-xs text-muted-foreground">
            Added the @loadercn registry? Use the short form:
          </p>
          <CommandSnippet command={command} />
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
