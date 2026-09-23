"use client"

import { useCallback, useState } from "react"
import Color from "color"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ColorPicker,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/color-picker"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/** `null` means the loaders inherit the foreground color. */
const PRESETS: { label: string; value: string | null }[] = [
  { label: "Foreground", value: null },
  { label: "Orange", value: "var(--primary)" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Emerald", value: "#10b981" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Rose", value: "#f43f5e" },
]

function Swatch({
  color,
  className,
}: {
  color: string | null
  className?: string
}) {
  return (
    <span
      className={cn("size-3 rounded-full bg-foreground", className)}
      style={color ? { background: color } : undefined}
    />
  )
}

/** A compact trigger that opens preset swatches and a custom color picker. */
export function PreviewColorPicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (value: string | null) => void
}) {
  const [custom, setCustom] = useState("#3b82f6")
  const handlePickerChange = useCallback(
    (rgba: Parameters<typeof Color.rgb>[0]) => {
      const hex = Color.rgb(rgba).hex()
      // The picker reports its initial color on mount; only react to real picks.
      if (hex === Color(custom).hex()) return
      setCustom(hex)
      onChange(hex)
    },
    [custom, onChange]
  )

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label="Preview color"
            className="gap-1.5 px-2"
          />
        }
      >
        <Swatch color={value} className="size-3.5 ring-1 ring-foreground/15" />
        <ChevronDown className="size-3 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 gap-3 p-3">
        <div
          className="flex justify-between"
          role="group"
          aria-label="Preset colors"
        >
          {PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant="ghost"
              size="icon-xs"
              title={preset.label}
              aria-label={`${preset.label} preview color`}
              aria-pressed={value === preset.value}
              onClick={() => onChange(preset.value)}
              className={cn(
                "size-7 rounded-full",
                value === preset.value && "ring-1 ring-foreground/30"
              )}
            >
              <Swatch color={preset.value} className="size-4" />
            </Button>
          ))}
        </div>
        <Separator />
        <ColorPicker defaultValue={custom} onChange={handlePickerChange}>
          <ColorPickerSelection className="h-32" />
          <div className="mt-3 space-y-2">
            <ColorPickerHue />
            <div className="flex items-center gap-2">
              <ColorPickerOutput />
              <ColorPickerFormat />
            </div>
          </div>
        </ColorPicker>
      </PopoverContent>
    </Popover>
  )
}
