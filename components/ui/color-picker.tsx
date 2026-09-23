"use client"

/**
 * Color picker from Kibo UI: https://www.kibo-ui.com/components/color-picker
 *
 * Modified for this project:
 * - Hue and alpha sliders use Base UI's Slider instead of Radix.
 * - The controlled `value` sync converts through HSL (upstream wrote RGB
 *   channels into hue/saturation/lightness) and adjusts state during render
 *   instead of in an effect.
 * - The selection handle starts at the current color instead of the corner.
 * - The format select handles Base UI's nullable `onValueChange` and forwards
 *   `className` to its trigger.
 */

import Color from "color"
import { PipetteIcon } from "lucide-react"
import { Slider } from "@base-ui/react/slider"
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type ColorPickerContextValue = {
  hue: number
  saturation: number
  lightness: number
  alpha: number
  mode: string
  setHue: (hue: number) => void
  setSaturation: (saturation: number) => void
  setLightness: (lightness: number) => void
  setAlpha: (alpha: number) => void
  setMode: (mode: string) => void
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined
)

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext)

  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider")
  }

  return context
}

export type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Parameters<typeof Color>[0]
  defaultValue?: Parameters<typeof Color>[0]
  onChange?: (value: Parameters<typeof Color.rgb>[0]) => void
}

export const ColorPicker = ({
  value,
  defaultValue = "#000000",
  onChange,
  className,
  ...props
}: ColorPickerProps) => {
  const selectedColor = Color(value)
  const defaultColor = Color(defaultValue)

  const [hue, setHue] = useState(selectedColor.hue() || defaultColor.hue() || 0)
  const [saturation, setSaturation] = useState(
    selectedColor.saturationl() || defaultColor.saturationl() || 100
  )
  const [lightness, setLightness] = useState(
    selectedColor.lightness() || defaultColor.lightness() || 50
  )
  const [alpha, setAlpha] = useState(
    selectedColor.alpha() * 100 || defaultColor.alpha() * 100
  )
  const [mode, setMode] = useState("hex")

  // Sync when the controlled value changes (adjusting state during render,
  // keyed by hex so a new array with the same color doesn't loop).
  const valueKey = value ? Color(value).hexa() : undefined
  const [prevValueKey, setPrevValueKey] = useState(valueKey)
  if (valueKey !== prevValueKey) {
    setPrevValueKey(valueKey)
    if (value) {
      const color = Color(value)
      const [h, s, l] = color.hsl().array()

      setHue(h)
      setSaturation(s)
      setLightness(l)
      setAlpha(color.alpha() * 100)
    }
  }

  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100)
      const rgba = color.rgb().array()

      onChange([rgba[0], rgba[1], rgba[2], alpha / 100])
    }
  }, [hue, saturation, lightness, alpha, onChange])

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        setHue,
        setSaturation,
        setLightness,
        setAlpha,
        setMode,
      }}
    >
      <div
        className={cn("flex size-full flex-col gap-4", className)}
        {...props}
      />
    </ColorPickerContext.Provider>
  )
}

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>

export const ColorPickerSelection = memo(
  ({ className, ...props }: ColorPickerSelectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const { hue, saturation, lightness, setSaturation, setLightness } =
      useColorPicker()
    // Start the handle at the current color (inverse of the pointer mapping below).
    const [positionX, setPositionX] = useState(saturation / 100)
    const [positionY, setPositionY] = useState(() => {
      const x = saturation / 100
      const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x)
      return Math.max(0, Math.min(1, 1 - lightness / topLightness))
    })

    const backgroundGradient = useMemo(() => {
      return `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
            linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
            hsl(${hue}, 100%, 50%)`
    }, [hue])

    const handlePointerMove = useCallback(
      (event: PointerEvent) => {
        if (!(isDragging && containerRef.current)) {
          return
        }
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width)
        )
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height)
        )
        setPositionX(x)
        setPositionY(y)
        setSaturation(x * 100)
        const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x)
        const lightness = topLightness * (1 - y)

        setLightness(lightness)
      },
      [isDragging, setSaturation, setLightness]
    )

    useEffect(() => {
      const handlePointerUp = () => setIsDragging(false)

      if (isDragging) {
        window.addEventListener("pointermove", handlePointerMove)
        window.addEventListener("pointerup", handlePointerUp)
      }

      return () => {
        window.removeEventListener("pointermove", handlePointerMove)
        window.removeEventListener("pointerup", handlePointerUp)
      }
    }, [isDragging, handlePointerMove])

    return (
      <div
        className={cn("relative size-full cursor-crosshair rounded", className)}
        onPointerDown={(e) => {
          e.preventDefault()
          setIsDragging(true)
          handlePointerMove(e.nativeEvent)
        }}
        ref={containerRef}
        style={{
          background: backgroundGradient,
        }}
        {...props}
      >
        <div
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
          style={{
            left: `${positionX * 100}%`,
            top: `${positionY * 100}%`,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    )
  }
)

ColorPickerSelection.displayName = "ColorPickerSelection"

const toNumber = (value: number | readonly number[]) =>
  typeof value === "number" ? value : value[0]

export type ColorPickerHueProps = Slider.Root.Props

export const ColorPickerHue = ({
  className,
  ...props
}: ColorPickerHueProps) => {
  const { hue, setHue } = useColorPicker()

  return (
    <Slider.Root
      className={cn("w-full", className)}
      max={360}
      onValueChange={(value) => setHue(toNumber(value))}
      step={1}
      value={hue}
      {...props}
    >
      <Slider.Control className="relative flex h-4 w-full touch-none items-center">
        <Slider.Track className="relative h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
          <Slider.Thumb className="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none has-disabled:pointer-events-none has-disabled:opacity-50" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  )
}

export type ColorPickerAlphaProps = Slider.Root.Props

export const ColorPickerAlpha = ({
  className,
  ...props
}: ColorPickerAlphaProps) => {
  const { alpha, setAlpha } = useColorPicker()

  return (
    <Slider.Root
      className={cn("w-full", className)}
      max={100}
      onValueChange={(value) => setAlpha(toNumber(value))}
      step={1}
      value={alpha}
      {...props}
    >
      <Slider.Control className="relative flex h-4 w-full touch-none items-center">
        <Slider.Track className="relative h-3 w-full grow rounded-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')] bg-center bg-repeat-x dark:bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVR4nGP8+vWrCAMewM3N/QafPBM+SWLAqAGDwQBGQgoIpZOB98KoAVQwAADxzQcSVIRCfQAAAABJRU5ErkJggg==')]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-black/50 dark:to-white/50" />
          <Slider.Thumb className="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none has-disabled:pointer-events-none has-disabled:opacity-50" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  )
}

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>

export const ColorPickerEyeDropper = ({
  className,
  ...props
}: ColorPickerEyeDropperProps) => {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker()

  const handleEyeDropper = async () => {
    try {
      // @ts-expect-error - EyeDropper API is experimental
      const eyeDropper = new EyeDropper()
      const result = await eyeDropper.open()
      const color = Color(result.sRGBHex)
      const [h, s, l] = color.hsl().array()

      setHue(h)
      setSaturation(s)
      setLightness(l)
      setAlpha(100)
    } catch (error) {
      console.error("EyeDropper failed:", error)
    }
  }

  return (
    <Button
      className={cn("shrink-0 text-muted-foreground", className)}
      onClick={handleEyeDropper}
      size="icon"
      type="button"
      variant="outline"
      {...props}
    >
      <PipetteIcon size={16} />
    </Button>
  )
}

export type ColorPickerOutputProps = ComponentProps<typeof SelectTrigger>

const formats = ["hex", "rgb", "css", "hsl"]

export const ColorPickerOutput = ({
  className,
  ...props
}: ColorPickerOutputProps) => {
  const { mode, setMode } = useColorPicker()

  return (
    <Select onValueChange={(value) => value && setMode(value)} value={mode}>
      <SelectTrigger
        className={cn("h-8 w-20 shrink-0 text-xs", className)}
        {...props}
      >
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem className="text-xs" key={format} value={format}>
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type PercentageInputProps = ComponentProps<typeof Input>

const PercentageInput = ({ className, ...props }: PercentageInputProps) => {
  return (
    <div className="relative">
      <Input
        readOnly
        type="text"
        {...props}
        className={cn(
          "h-8 w-[3.25rem] rounded-l-none bg-secondary px-2 text-xs shadow-none",
          className
        )}
      />
      <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-muted-foreground">
        %
      </span>
    </div>
  )
}

export type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>

export const ColorPickerFormat = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const { hue, saturation, lightness, alpha, mode } = useColorPicker()
  const color = Color.hsl(hue, saturation, lightness, alpha / 100)

  if (mode === "hex") {
    const hex = color.hex()

    return (
      <div
        className={cn(
          "relative flex w-full items-center -space-x-px rounded-md shadow-sm",
          className
        )}
        {...props}
      >
        <Input
          className="h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={hex}
        />
        <PercentageInput value={alpha} />
      </div>
    )
  }

  if (mode === "rgb") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value))

    return (
      <div
        className={cn(
          "flex items-center -space-x-px rounded-md shadow-sm",
          className
        )}
        {...props}
      >
        {rgb.map((value, index) => (
          <Input
            className={cn(
              "h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none",
              index && "rounded-l-none",
              className
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    )
  }

  if (mode === "css") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value))

    return (
      <div className={cn("w-full rounded-md shadow-sm", className)} {...props}>
        <Input
          className="h-8 w-full bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={`rgba(${rgb.join(", ")}, ${alpha}%)`}
          {...props}
        />
      </div>
    )
  }

  if (mode === "hsl") {
    const hsl = color
      .hsl()
      .array()
      .map((value) => Math.round(value))

    return (
      <div
        className={cn(
          "flex items-center -space-x-px rounded-md shadow-sm",
          className
        )}
        {...props}
      >
        {hsl.map((value, index) => (
          <Input
            className={cn(
              "h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none",
              index && "rounded-l-none",
              className
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    )
  }

  return null
}
