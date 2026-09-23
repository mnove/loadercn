"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  useEffect(() => {
    if (status === "idle") return
    const timeout = setTimeout(() => setStatus("idle"), 2200)
    return () => clearTimeout(timeout)
  }, [status])
  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setStatus("copied")
        } catch {
          setStatus("error")
        }
      }}
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
