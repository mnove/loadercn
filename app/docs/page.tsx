import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { CommandSnippet } from "@/components/command-snippet"
import {
  installCommand,
  registryAddCommand,
  urlInstallCommand,
} from "@/lib/site"

export const metadata: Metadata = {
  title: "Get started — loadercn",
  description:
    "Add loadercn loaders to your project with the shadcn CLI, or copy the source directly.",
  alternates: { canonical: "/docs" },
}

const PROPS = [
  ["size", "number", "40", "Width and height in pixels."],
  [
    "speed",
    "number",
    "Varies",
    "Duration of one complete cycle, in seconds. Defaults to 1.6; spherical loaders use 3.2 or 4.8. The preview shows each loader’s default.",
  ],
  [
    "label",
    "string",
    '"Loading"',
    "Accessible label announced to screen readers.",
  ],
  [
    "className",
    "string",
    "—",
    "Merged onto the root element. Loaders inherit text color.",
  ],
  ["style", "CSSProperties", "—", "Merged onto the root element."],
]

function Step({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4 border-b py-10 md:grid-cols-[200px_1fr] md:gap-10">
      <div className="font-mono text-[10px] tracking-[.12em] text-muted-foreground uppercase">
        {index} — {title}
      </div>
      <div className="min-w-0 space-y-4">{children}</div>
    </section>
  )
}

export default async function DocsPage() {
  const headerList = await headers()
  const host = headerList.get("host") ?? "localhost:3000"
  const proto =
    headerList.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https")
  const origin = `${proto}://${host}`

  return (
    <main className="mx-auto max-w-4xl px-6 pb-14 md:px-10">
      <section className="border-b py-16 md:py-20">
        <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-medium tracking-[-.06em]">
          Get started
        </h1>
        <p className="mt-5 max-w-[460px] text-sm leading-7 text-muted-foreground">
          Install loaders with the shadcn CLI or copy the source into your
          project. Each loader is a single React component with inline CSS and
          no dependencies.
        </p>
      </section>

      <Step index="01" title="Set up shadcn">
        <p className="text-xs leading-6 text-muted-foreground">
          Already using shadcn? You can skip this step.
        </p>
        <CommandSnippet command="npx shadcn@latest init" />
      </Step>

      <Step index="02" title="Add the registry">
        <p className="text-xs leading-6 text-muted-foreground">
          Register the <code className="font-mono">@loadercn</code> namespace in
          your <code className="font-mono">components.json</code>. You only need
          to do this once per project.
        </p>
        <CommandSnippet command={registryAddCommand(origin)} />
        <CodeBlock
          code={`{\n  "registries": {\n    "@loadercn": "${origin}/r/{name}.json"\n  }\n}`}
          className="border bg-muted/50 p-4 text-[11px] leading-6"
        />
      </Step>

      <Step index="03" title="Add a loader">
        <p className="text-xs leading-6 text-muted-foreground">
          Every loader has its own install command. Pick one from the sidebar to
          copy it, or swap the name below.
        </p>
        <CommandSnippet command={installCommand("classic-ring")} />
        <p className="text-xs leading-6 text-muted-foreground">
          Skipping the namespace? Install directly from the URL instead.
        </p>
        <CommandSnippet command={urlInstallCommand("classic-ring")} />
      </Step>

      <Step index="04" title="Use it">
        <p className="text-xs leading-6 text-muted-foreground">
          The component lives in your codebase, so every detail is yours to
          change.
        </p>
        <CodeBlock
          code={`import { ClassicRing } from "@/components/ui/classic-ring"\n\nexport function Saving() {\n  return <ClassicRing size={32} speed={1.2} className="text-primary" />\n}`}
          className="border bg-muted/50 p-4 text-[11px] leading-6"
        />
      </Step>

      <Step index="05" title="Props">
        <p className="text-xs leading-6 text-muted-foreground">
          Every loader shares the same API and respects reduced-motion
          preferences.
        </p>
        <div className="overflow-x-auto border">
          <table className="w-full text-left text-xs">
            <thead className="border-b bg-muted/50 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-normal">Prop</th>
                <th className="px-4 py-3 font-normal">Type</th>
                <th className="px-4 py-3 font-normal">Default</th>
                <th className="px-4 py-3 font-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map(([prop, type, fallback, description]) => (
                <tr key={prop} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-mono">{prop}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {type}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {fallback}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Step>

      <Step index="06" title="Copy and paste">
        <p className="text-xs leading-6 text-muted-foreground">
          Prefer to skip the CLI? Every loader includes its complete React
          source in the Source tab. Styles are included, no shadcn setup
          required.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button nativeButton={false} render={<Link href="/#collection" />}>
            Browse loaders
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href="/r/registry.json" target="_blank" />}
            className="gap-2"
          >
            View registry JSON <ArrowUpRight />
          </Button>
        </div>
      </Step>
    </main>
  )
}
