import * as React from "react"
import { ScriptOnce } from "@tanstack/react-router"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

// Same key next-themes used, so visitors keep the theme they picked.
const STORAGE_KEY = "theme"
const DARK_QUERY = "(prefers-color-scheme: dark)"

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark" || value === "system"

// Applies the stored theme before the page paints, so prerendered pages never
// flash the wrong theme. Also runs when localStorage is unavailable.
const themeScript = `(function(){var t='system';try{var s=localStorage.getItem('${STORAGE_KEY}');if(s==='light'||s==='dark'||s==='system')t=s}catch(e){}var d=t==='dark'||(t==='system'&&matchMedia('${DARK_QUERY}').matches);var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(d?'dark':'light');r.style.colorScheme=d?'dark':'light'})();`

// The stored preference is an external store: localStorage, plus an in-memory
// fallback for when storage is disabled.
let memoryTheme: Theme = "system"
const listeners = new Set<() => void>()

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isTheme(stored) ? stored : "system"
  } catch {
    return memoryTheme
  }
}

function writeTheme(theme: Theme) {
  memoryTheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Keep the in-memory preference.
  }
  listeners.forEach((listener) => listener())
}

/** Notifies on changes from this tab and, through `storage`, from others. */
function subscribeTheme(onChange: () => void) {
  listeners.add(onChange)
  window.addEventListener("storage", onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener("storage", onChange)
  }
}

function subscribeSystemTheme(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function applyTheme(resolved: ResolvedTheme) {
  // Switch without animating every color transition on the page.
  const style = document.createElement("style")
  style.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.appendChild(style)

  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.style.colorScheme = resolved

  // Force a style recalc before re-enabling transitions.
  void window.getComputedStyle(document.body).opacity
  setTimeout(() => style.remove(), 1)
}

const ThemeContext = React.createContext<
  | {
      theme: Theme
      /** The theme in effect, with "system" resolved. Undefined until hydrated. */
      resolvedTheme: ResolvedTheme | undefined
      setTheme: (theme: Theme) => void
    }
  | undefined
>(undefined)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Prerendered HTML can't know either value, so both hydrate from their
  // server snapshots and update right after.
  const theme = React.useSyncExternalStore(
    subscribeTheme,
    readTheme,
    () => "system" as const
  )
  const systemDark = React.useSyncExternalStore(
    subscribeSystemTheme,
    () => window.matchMedia(DARK_QUERY).matches,
    () => undefined
  )
  const resolvedTheme =
    systemDark === undefined
      ? undefined
      : theme === "system"
        ? systemDark
          ? "dark"
          : "light"
        : theme

  React.useEffect(() => {
    if (resolvedTheme) applyTheme(resolvedTheme)
  }, [resolvedTheme])

  return (
    <ThemeContext value={{ theme, resolvedTheme, setTheme: writeTheme }}>
      <ScriptOnce>{themeScript}</ScriptOnce>
      <ThemeHotkey />
      {children}
    </ThemeContext>
  )
}

function useTheme() {
  const value = React.useContext(ThemeContext)
  if (!value) throw new Error("useTheme must be used within a ThemeProvider")
  return value
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider, useTheme }
