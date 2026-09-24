"use client"

import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCopy } from "@/hooks/use-copy"

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const { status, copy } = useCopy()
  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={() => copy(value)}
    >
      {status === "copied" ? <Check /> : <Copy />}
      <span aria-live="polite">
        {status === "copied"
          ? "Copied"
          : status === "error"
            ? "Copy failed. Try again"
            : label}
      </span>
    </Button>
  )
}
