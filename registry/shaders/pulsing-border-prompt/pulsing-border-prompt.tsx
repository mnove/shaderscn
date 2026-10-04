"use client"

import * as React from "react"
import {
  getShaderColorFromString,
  PulsingBorder,
  pulsingBorderMeta,
  type PaperShaderElement,
} from "@paper-design/shaders-react"
import {
  ArrowUpIcon,
  FileIcon,
  PaperclipIcon,
  SquareIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// How far (in px) the glow is allowed to bleed outside the input.
const GLOW = 40

/** Matches the `status` returned by the AI SDK's `useChat`. */
type PromptStatus = "ready" | "submitted" | "streaming" | "error"

type PromptMode = {
  value: string
  label: string
  /** Glow colors while this mode is selected. */
  colors: string[]
}

type PromptMessage = {
  text: string
  files: File[]
  mode?: string
}

type PulsingBorderPromptProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> & {
  /** Called with the trimmed text and attached files. The input clears itself afterwards. */
  onSubmit?: (message: PromptMessage) => void
  /** Called when the stop button is pressed while a response is on its way. */
  onStop?: () => void
  /** Drives the glow, and swaps the send button for a stop button while busy. */
  status?: PromptStatus
  placeholder?: string
  /** Glow colors when there are no modes. */
  colors?: string[]
  /** A mode picker shown in the toolbar. Each mode tints the glow. */
  modes?: PromptMode[]
  defaultMode?: string
  onModeChange?: (mode: string) => void
  /** Allow attaching files by picking, dropping or pasting them. */
  attachments?: boolean
  /** Which files can be attached, like the `accept` attribute of a file input. */
  accept?: string
  speed?: number
}

type Attachment = { id: number; file: File; preview?: string }

let nextAttachmentId = 0

function PulsingBorderPrompt({
  onSubmit,
  onStop,
  status = "ready",
  placeholder = "Ask anything…",
  colors = ["#0dc1fd", "#d915ef", "#ff3f2ecc"],
  modes,
  defaultMode,
  onModeChange,
  attachments = true,
  accept,
  speed = 1,
  className,
  children,
  ...props
}: PulsingBorderPromptProps) {
  const [value, setValue] = React.useState("")
  const [files, setFiles] = React.useState<Attachment[]>([])
  const [focused, setFocused] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [mode, setMode] = React.useState(defaultMode ?? modes?.[0]?.value)
  const fileInput = React.useRef<HTMLInputElement>(null)
  const glow = React.useRef<GlowState>({
    status,
    focused,
    dragging,
    colors,
    speed,
    energy: 0,
    flash: null,
  })

  const busy = status === "submitted" || status === "streaming"
  const text = value.trim()
  const activeColors =
    modes?.find((option) => option.value === mode)?.colors ?? colors

  // Hand the latest state to the glow, which animates outside of React.
  React.useEffect(() => {
    Object.assign(glow.current, {
      status,
      focused,
      dragging,
      colors: activeColors,
      speed,
    })
  })

  // Flash once when a response finishes, or fails.
  const previousStatus = React.useRef(status)
  React.useEffect(() => {
    const previous = previousStatus.current
    previousStatus.current = status
    if (status === "error") {
      glow.current.flash = { kind: "error", start: performance.now() }
    } else if (
      status === "ready" &&
      (previous === "submitted" || previous === "streaming")
    ) {
      glow.current.flash = { kind: "done", start: performance.now() }
    }
  }, [status])

  // Free image previews when the input goes away.
  const filesRef = React.useRef(files)
  React.useEffect(() => {
    filesRef.current = files
  }, [files])
  React.useEffect(() => () => filesRef.current.forEach(revokePreview), [])

  function addFiles(list: FileList | null) {
    const added = Array.from(list ?? [])
      .filter((file) => matchesAccept(file, accept))
      .map((file) => ({
        id: nextAttachmentId++,
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }))
    if (added.length) setFiles((current) => [...current, ...added])
  }

  function removeFile(attachment: Attachment) {
    revokePreview(attachment)
    setFiles((current) => current.filter((item) => item !== attachment))
  }

  return (
    <form
      data-slot="pulsing-border-prompt"
      aria-busy={busy}
      className={cn("relative isolate w-full max-w-xl", className)}
      onSubmit={(event) => {
        event.preventDefault()
        if ((!text && !files.length) || busy) return
        onSubmit?.({ text, files: files.map((item) => item.file), mode })
        files.forEach(revokePreview)
        setFiles([])
        setValue("")
      }}
      onDragEnter={(event) => {
        if (!attachments || !hasFiles(event)) return
        event.preventDefault()
        setDragging(true)
      }}
      onDragOver={(event) => {
        if (!attachments || !hasFiles(event)) return
        event.preventDefault()
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setDragging(false)
        }
      }}
      onDrop={(event) => {
        if (!attachments || !hasFiles(event)) return
        event.preventDefault()
        setDragging(false)
        addFiles(event.dataTransfer.files)
      }}
      {...props}
    >
      <Glow state={glow} />
      <div className="relative flex flex-col gap-2 border bg-card p-3 text-card-foreground">
        {files.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {files.map((attachment) => (
              <li
                key={attachment.id}
                className="flex h-10 max-w-52 items-center gap-2 border bg-background pr-1 text-xs"
              >
                {attachment.preview ? (
                  <span
                    aria-hidden
                    className="size-10 shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${attachment.preview})` }}
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center bg-muted"
                  >
                    <FileIcon className="size-4 text-muted-foreground" />
                  </span>
                )}
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-medium">
                    {attachment.file.name}
                  </span>
                  <span className="text-muted-foreground">
                    {formatSize(attachment.file.size)}
                  </span>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Remove ${attachment.file.name}`}
                  onClick={() => removeFile(attachment)}
                >
                  <XIcon />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <textarea
          aria-label={placeholder}
          value={value}
          placeholder={placeholder}
          rows={2}
          className="field-sizing-content max-h-48 min-h-12 w-full resize-none bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
          onChange={(event) => {
            setValue(event.target.value)
            // Every keystroke brightens the glow a little, then it fades.
            glow.current.energy = Math.min(1, glow.current.energy + 0.25)
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onPaste={(event) => {
            if (!attachments || !event.clipboardData.files.length) return
            event.preventDefault()
            addFiles(event.clipboardData.files)
          }}
          onKeyDown={(event) => {
            // Enter sends, Shift+Enter adds a new line. Skip while an IME is
            // composing so picking a suggestion doesn't send the prompt.
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault()
              event.currentTarget.form?.requestSubmit()
            }
          }}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            {attachments && (
              <>
                <input
                  ref={fileInput}
                  type="file"
                  accept={accept}
                  multiple
                  hidden
                  onChange={(event) => {
                    addFiles(event.target.files)
                    event.target.value = ""
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Attach files"
                  onClick={() => fileInput.current?.click()}
                >
                  <PaperclipIcon />
                </Button>
              </>
            )}
            {modes && modes.length > 0 && (
              <div role="group" aria-label="Mode" className="flex items-center">
                {modes.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={mode === option.value}
                    onClick={() => {
                      setMode(option.value)
                      onModeChange?.(option.value)
                    }}
                    className="flex h-7 items-center gap-1.5 px-2 text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring aria-pressed:bg-muted aria-pressed:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="size-2 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${option.colors.join(", ")})`,
                      }}
                    />
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            {children}
          </div>
          {busy ? (
            <Button
              type="button"
              size="icon"
              aria-label="Stop"
              disabled={!onStop}
              onClick={onStop}
            >
              <SquareIcon className="size-3 fill-current" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              aria-label="Send"
              disabled={!text && !files.length}
            >
              <ArrowUpIcon />
            </Button>
          )}
        </div>
        {dragging && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-card/90 text-sm font-medium">
            Drop files to attach
          </div>
        )}
      </div>
    </form>
  )
}

type GlowState = {
  status: PromptStatus
  focused: boolean
  dragging: boolean
  colors: string[]
  speed: number
  /** Rises with each keystroke and decays back to 0. */
  energy: number
  flash: { kind: "done" | "error"; start: number } | null
}

type Look = {
  opacity: number
  intensity: number
  bloom: number
  pulse: number
  spotSize: number
  speed: number
  spots: number
}

// What the glow looks like in each state. The glow eases between them.
const LOOKS = {
  // Barely there, so it doesn't compete with the page.
  idle: {
    opacity: 0.35,
    intensity: 0.2,
    bloom: 0.2,
    pulse: 0,
    spotSize: 0.5,
    speed: 0.5,
    spots: 3,
  },
  focused: {
    opacity: 0.7,
    intensity: 0.3,
    bloom: 0.3,
    pulse: 0.1,
    spotSize: 0.5,
    speed: 1,
    spots: 3,
  },
  // Gathers into a few bright spots racing around the border.
  submitted: {
    opacity: 1,
    intensity: 0.5,
    bloom: 0.5,
    pulse: 0.2,
    spotSize: 0.3,
    speed: 4,
    spots: 1,
  },
  // A steady pulse while the answer arrives.
  streaming: {
    opacity: 1,
    intensity: 0.4,
    bloom: 0.45,
    pulse: 0.6,
    spotSize: 0.45,
    speed: 2,
    spots: 3,
  },
  dragging: {
    opacity: 1,
    intensity: 0.6,
    bloom: 0.6,
    pulse: 0.3,
    spotSize: 0.6,
    speed: 3,
    spots: 3,
  },
} satisfies Record<string, Look>

const EASED_KEYS = [
  "opacity",
  "intensity",
  "bloom",
  "pulse",
  "spotSize",
  "speed",
] as const

const FLASH_MS = 900
const ERROR_COLOR = getShaderColorFromString("#ff3b30")

type ShaderMount = NonNullable<PaperShaderElement["paperShaderMount"]>

/**
 * The glow mounts once and never re-renders. A single animation loop reads
 * the prompt's state and eases the shader towards the matching look, without
 * going through React on every frame.
 */
const Glow = React.memo(function Glow({
  state,
}: {
  state: React.RefObject<GlowState>
}) {
  const ref = React.useRef<PaperShaderElement>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let size = { width: 0, height: 0 }
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0]
      size = { width: box.inlineSize, height: box.blockSize }
    })
    observer.observe(element)

    const current: Omit<Look, "spots"> = { ...LOOKS.idle }
    let currentColors: number[][] = []
    let palette = { key: "", colors: [] as number[][] }
    let mount: PaperShaderElement["paperShaderMount"]
    let setUniforms: ShaderMount["setUniforms"] = () => {}
    let setSpeed: ShaderMount["setSpeed"] = () => {}
    let sent: Record<string, number | number[][]> = {}
    let sentSpeed = -1
    let last = performance.now()

    let frame = requestAnimationFrame(function tick(now) {
      frame = requestAnimationFrame(tick)
      const dt = Math.min(now - last, 100)
      last = now

      const glow = state.current
      const look =
        LOOKS[
          glow.dragging
            ? "dragging"
            : glow.status === "submitted" || glow.status === "streaming"
              ? glow.status
              : glow.focused
                ? "focused"
                : "idle"
        ]
      const ease = 1 - Math.exp(-dt / 180)
      for (const key of EASED_KEYS) {
        current[key] += (look[key] - current[key]) * ease
      }
      glow.energy *= Math.exp(-dt / 300)

      let flash = 0
      if (glow.flash) {
        const t = (now - glow.flash.start) / FLASH_MS
        if (t >= 1) glow.flash = null
        else flash = (1 - t) ** 2
      }

      // Cross-fade between palettes, e.g. when the mode changes. Palettes are
      // padded to the same length so every color has one to fade into.
      const key = glow.colors.join()
      if (key !== palette.key) {
        palette = { key, colors: toPalette(glow.colors) }
      }
      if (!currentColors.length) currentColors = palette.colors
      currentColors = currentColors.map((color, i) =>
        color.map((v, j) => v + (palette.colors[i][j] - v) * ease)
      )
      const error = glow.flash?.kind === "error" ? flash : 0
      const colors = currentColors.map((color) =>
        color.map((v, j) => v + (ERROR_COLOR[j] - v) * error)
      )

      const shader = element.paperShaderMount
      if (!shader || !size.width || !size.height) return
      if (shader !== mount) {
        mount = shader
        setUniforms = shader.setUniforms
        setSpeed = shader.setSpeed
        // The React wrapper re-applies its own props once, some time after
        // mounting. Catch any write that isn't ours and send everything
        // again on the next frame.
        shader.setUniforms = (uniforms) => {
          setUniforms(uniforms)
          sent = {}
        }
        shader.setSpeed = (speed) => {
          setSpeed(speed)
          sentSpeed = -1
        }
        sent = {}
        sentSpeed = -1
      }

      const uniforms: Record<string, number | number[][]> = {
        u_colors: colors,
        u_colorsCount: colors.length,
        u_intensity: current.intensity + glow.energy * 0.15 + flash * 0.3,
        u_bloom: current.bloom + glow.energy * 0.25 + flash * 0.4,
        u_pulse: current.pulse,
        u_spots: look.spots,
        u_spotSize: current.spotSize,
        u_marginLeft: GLOW / size.width,
        u_marginRight: GLOW / size.width,
        u_marginTop: GLOW / size.height,
        u_marginBottom: GLOW / size.height,
      }
      const changed = Object.fromEntries(
        Object.entries(uniforms).filter(
          ([name, value]) => !isClose(sent[name], value)
        )
      )
      // setUniforms redraws straight away, so only call it when something
      // actually moved. A settled glow costs nothing extra.
      if (Object.keys(changed).length) {
        setUniforms(changed)
        Object.assign(sent, changed)
      }

      const speed = reducedMotion ? 0 : current.speed * glow.speed
      if (Math.abs(speed - sentSpeed) > 0.01) {
        setSpeed(speed)
        sentSpeed = speed
      }

      element.style.opacity = String(
        Math.min(1, current.opacity + glow.energy * 0.3 + flash * 0.5)
      )
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [state])

  return (
    <PulsingBorder
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -z-10"
      // Hidden until the loop has sized the border to the input.
      style={{ inset: -GLOW, opacity: 0 }}
      colorBack="#00000000"
      roundness={0}
      thickness={0.05}
      softness={0.75}
      smoke={0.3}
      smokeSize={0.5}
      scale={1}
    />
  )
})

function toPalette(colors: string[]) {
  const count = pulsingBorderMeta.maxColorCount
  return Array.from({ length: count }, (_, i) =>
    getShaderColorFromString(colors[i % colors.length])
  )
}

function isClose(
  a: number | number[][] | undefined,
  b: number | number[][]
): boolean {
  if (a === undefined) return false
  if (typeof a === "number" || typeof b === "number") {
    return typeof a === "number" && typeof b === "number"
      ? Math.abs(a - b) < 0.001
      : false
  }
  return a.every((row, i) => row.every((v, j) => Math.abs(v - b[i][j]) < 0.001))
}

function hasFiles(event: React.DragEvent) {
  return event.dataTransfer.types.includes("Files")
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true
  return accept.split(",").some((rule) => {
    const type = rule.trim().toLowerCase()
    if (type.startsWith(".")) return file.name.toLowerCase().endsWith(type)
    if (type.endsWith("/*")) return file.type.startsWith(type.slice(0, -1))
    return file.type === type
  })
}

function revokePreview(attachment: Attachment) {
  if (attachment.preview) URL.revokeObjectURL(attachment.preview)
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export {
  PulsingBorderPrompt,
  type PromptMessage,
  type PromptMode,
  type PromptStatus,
}
