import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

/** A shell command in a boxed row with a copy button. */
export function CommandSnippet({
  command,
  className,
  children,
}: {
  command: string
  className?: string
  /** Extra actions, shown before the copy button. */
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border bg-muted/50 p-3",
        className
      )}
    >
      <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto mask-r-from-[calc(100%-2rem)] font-mono text-[11px] whitespace-nowrap">
        <span
          aria-hidden="true"
          className="mr-2 text-muted-foreground select-none"
        >
          $
        </span>
        {command}
      </code>
      {children}
      <CopyButton value={command} />
    </div>
  )
}
