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

function PresetSwatches({
  value,
  onChange,
  className,
}: {
  value: string | null
  onChange: (value: string | null) => void
  className?: string
}) {
  return (
    <div
      className={cn("flex items-center", className)}
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
          <Swatch color={preset.value} className="size-3.5" />
        </Button>
      ))}
    </div>
  )
}

/**
 * Preset swatches where there's room, then a last swatch that opens a custom
 * color picker. On narrow screens the presets move into the popover.
 */
export function PreviewColorPicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (value: string | null) => void
}) {
  const [custom, setCustom] = useState("#3b82f6")
  const isCustom = !PRESETS.some((preset) => preset.value === value)
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
    <div className="flex items-center">
      <PresetSwatches
        value={value}
        onChange={onChange}
        className="hidden md:flex"
      />
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              title="Custom color"
              aria-label="Custom preview color"
              className={cn(
                "gap-1.5 px-2 md:size-7 md:rounded-full md:p-0",
                isCustom && "md:ring-1 md:ring-foreground/30"
              )}
            />
          }
        >
          {/* Mobile shows the current color; wider screens show a custom swatch. */}
          <Swatch
            color={value}
            className="size-3.5 ring-1 ring-foreground/15 md:hidden"
          />
          <ChevronDown className="size-3 text-muted-foreground md:hidden" />
          <span
            className="hidden size-3.5 rounded-full md:block"
            style={{
              background: isCustom
                ? value!
                : "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
            }}
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 gap-3 p-3">
          <PresetSwatches
            value={value}
            onChange={onChange}
            className="justify-between md:hidden"
          />
          <Separator className="md:hidden" />
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
    </div>
  )
}
