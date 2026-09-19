import { highlight, type LanguageName } from "sugar-high"
import { cn } from "@/lib/utils"

export function CodeBlock({
  code,
  lang = "typescript",
  className,
}: {
  code: string
  lang?: LanguageName
  className?: string
}) {
  return (
    <pre className={cn("sh-code w-full min-w-0 overflow-x-auto", className)}>
      <code dangerouslySetInnerHTML={{ __html: highlight(code, { lang }) }} />
    </pre>
  )
}

export function CodeInline({
  code,
  lang = "shell",
  className,
}: {
  code: string
  lang?: LanguageName
  className?: string
}) {
  return (
    <code
      className={cn("sh-code", className)}
      dangerouslySetInnerHTML={{ __html: highlight(code, { lang }) }}
    />
  )
}
