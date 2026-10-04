"use client"

import * as React from "react"

import {
  PulsingBorderPrompt,
  type PromptMode,
  type PromptStatus,
} from "@/registry/shaders/pulsing-border-prompt/pulsing-border-prompt"

const MODES: PromptMode[] = [
  { value: "fast", label: "Fast", colors: ["#22d3ee", "#3b82f6", "#a5f3fc"] },
  { value: "think", label: "Think", colors: ["#0dc1fd", "#d915ef", "#ff3f2e"] },
  {
    value: "research",
    label: "Research",
    colors: ["#f59e0b", "#ef4444", "#fde68a"],
  },
]

/**
 * Fakes a response so every state of the glow can be tried in the preview:
 * waiting, streaming, done, and failing when the prompt mentions "error".
 */
function PulsingBorderPromptDemo() {
  const [status, setStatus] = React.useState<PromptStatus>("ready")
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([])

  const clear = () => timeouts.current.splice(0).forEach(clearTimeout)
  React.useEffect(() => clear, [])

  return (
    <PulsingBorderPrompt
      status={status}
      modes={MODES}
      defaultMode="think"
      placeholder="Ask anything, or drop a file…"
      onSubmit={({ text }) => {
        clear()
        setStatus("submitted")
        const fails = /error/i.test(text)
        timeouts.current.push(
          setTimeout(() => setStatus(fails ? "error" : "streaming"), 1500),
          ...(fails ? [] : [setTimeout(() => setStatus("ready"), 4500)])
        )
      }}
      onStop={() => {
        clear()
        setStatus("ready")
      }}
    />
  )
}

export { PulsingBorderPromptDemo }
