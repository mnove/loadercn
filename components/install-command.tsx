"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { Check, Copy, InfoIcon } from "lucide-react"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { urlInstallCommand } from "@/lib/site"

const subscribe = () => () => {}

/** The site origin on the client, empty during server render. */
export function useOrigin() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => ""
  )
}

export function InstallCommand({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const command = urlInstallCommand(name)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <Field className={className}>
      <FieldLabel htmlFor="install-command" className="sr-only">
        Install with one command
      </FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText className="font-mono text-xs">$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="install-command"
          readOnly
          value={command}
          onFocus={(e) => e.currentTarget.select()}
          className="font-mono text-xs md:text-xs"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            nativeButton={false}
            render={<Link href="/docs" />}
            aria-label="Setup guide"
            title="Works in any shadcn project. Add the @loadercn registry for the shorter form. See the setup guide."
          >
            <InfoIcon />
          </InputGroupButton>
          <InputGroupButton
            size="icon-xs"
            aria-label={copied ? "Copied" : "Copy install command"}
            onClick={async () => {
              await navigator.clipboard.writeText(command)
              setCopied(true)
            }}
          >
            {copied ? <Check /> : <Copy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
