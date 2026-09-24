import { useEffect, useState } from "react"

/** Copies text to the clipboard and reports the result for about two seconds. */
export function useCopy() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  useEffect(() => {
    if (status === "idle") return
    const timeout = setTimeout(() => setStatus("idle"), 2200)
    return () => clearTimeout(timeout)
  }, [status])

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setStatus("copied")
      return true
    } catch {
      setStatus("error")
      return false
    }
  }

  return { status, copy }
}
