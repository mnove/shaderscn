"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function CopyButton({
  value,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn("shrink-0", className)}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
      }}
      {...props}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}

export { CopyButton }
