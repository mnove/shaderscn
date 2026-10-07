"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  ArrowUpRightIcon,
  CheckIcon,
  ComponentIcon,
  CopyIcon,
  LayersIcon,
  LayoutGridIcon,
  MoonIcon,
  PanelsTopLeftIcon,
  SearchIcon,
  SunIcon,
  TerminalIcon,
  type LucideIcon,
} from "lucide-react"

import type { DocsGroup, GroupId } from "@/lib/registry"
import {
  PAPER_SHADERS_URL,
  registryAddCommand,
  urlInstallCommand,
} from "@/lib/site"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

// Icons rather than live previews: browsers cap WebGL contexts per page.
const GROUP_ICONS: Record<GroupId, LucideIcon> = {
  sections: PanelsTopLeftIcon,
  backgrounds: LayersIcon,
  components: ComponentIcon,
}

function useIsMac() {
  return React.useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true
  )
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  )
}

/** A header button and ⌘K palette to jump to any shader or run site actions. */
function SiteSearch({ groups }: { groups: DocsGroup[] }) {
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isMac = useIsMac()
  const { resolvedTheme, setTheme } = useTheme()
  const current = groups
    .flatMap((group) => group.items)
    .find((item) => pathname === `/shaders/${item.name}`)

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isTyping(e.target))
      ) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const run = (action: () => void) => {
    setOpen(false)
    action()
  }

  // Shows a confirmation briefly before closing, so the copy is visible.
  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return setOpen(false)
    }
    setCopied(id)
    setTimeout(() => {
      setOpen(false)
      setCopied(null)
    }, 700)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Search shaders"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <SearchIcon />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden w-56 justify-start gap-2 pr-1 pl-2 font-normal text-muted-foreground md:flex"
      >
        <SearchIcon />
        Search shaders...
        <KbdGroup className="ml-auto">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search shaders"
        description="Jump to a shader or run an action."
        className="sm:max-w-lg"
      >
        <Command>
          <CommandInput placeholder="Search shaders and actions..." />
          <CommandList className="max-h-96">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Getting started">
              <CommandItem
                value="Installation"
                keywords={["docs", "setup", "registry", "shadcn"]}
                onSelect={() => run(() => router.push("/docs"))}
              >
                <TerminalIcon />
                Installation
              </CommandItem>
              <CommandItem
                value="Browse all shaders"
                keywords={["gallery", "collection", "home"]}
                onSelect={() => run(() => router.push("/"))}
              >
                <LayoutGridIcon />
                Browse all shaders
              </CommandItem>
            </CommandGroup>
            {groups.map((group) => {
              const Icon = GROUP_ICONS[group.id]
              return (
                <CommandGroup key={group.id} heading={group.label}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.name}
                      value={item.title}
                      keywords={[item.name, item.description, group.label]}
                      onSelect={() =>
                        run(() => router.push(`/shaders/${item.name}`))
                      }
                    >
                      <Icon />
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            })}
            <CommandSeparator />
            <CommandGroup heading="Actions">
              {current && (
                <CommandItem
                  value={`Copy install command for ${current.title}`}
                  keywords={["cli", "npx", "shadcn"]}
                  onSelect={() =>
                    copy("install", urlInstallCommand(current.name))
                  }
                >
                  {copied === "install" ? <CheckIcon /> : <CopyIcon />}
                  Copy install command for {current.title}
                  {copied === "install" && (
                    <CommandShortcut>Copied</CommandShortcut>
                  )}
                </CommandItem>
              )}
              <CommandItem
                value="Copy registry setup command"
                keywords={["cli", "npx", "shadcn", "namespace"]}
                onSelect={() => copy("registry", registryAddCommand())}
              >
                {copied === "registry" ? <CheckIcon /> : <CopyIcon />}
                Copy registry setup command
                {copied === "registry" && (
                  <CommandShortcut>Copied</CommandShortcut>
                )}
              </CommandItem>
              <CommandItem
                value="Toggle theme"
                keywords={["dark", "light", "mode", "color"]}
                onSelect={() =>
                  run(() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  )
                }
              >
                <SunIcon className="hidden dark:block" />
                <MoonIcon className="dark:hidden" />
                Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
              </CommandItem>
              <CommandItem
                value="Paper Shaders"
                keywords={["docs", "playground", "parameters"]}
                onSelect={() =>
                  run(() =>
                    window.open(PAPER_SHADERS_URL, "_blank", "noreferrer")
                  )
                }
              >
                <ArrowUpRightIcon />
                Open Paper Shaders
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

export { SiteSearch }
