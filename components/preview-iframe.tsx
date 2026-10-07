"use client"

import * as React from "react"

const HEIGHT_MESSAGE = "shaderscn:preview-height"

/**
 * Embeds an item's `/preview/[name]` route. Shader pages show previews in an
 * iframe so the demo's own headings and copy (a whole "404" page, in one case)
 * aren't indexed as part of the page around it.
 *
 * With `autoHeight` the iframe grows to fit its content, which reports its
 * height through `PreviewHeightReporter`.
 */
function PreviewIframe({
  name,
  title,
  autoHeight = false,
}: {
  name: string
  title: string
  autoHeight?: boolean
}) {
  const ref = React.useRef<HTMLIFrameElement>(null)
  // Also the floor for sections sized to the viewport (`min-h-svh`), which
  // inside the iframe only ever fill its current height.
  const [height, setHeight] = React.useState(640)

  React.useEffect(() => {
    if (!autoHeight) return

    function onMessage(event: MessageEvent) {
      if (
        event.origin !== window.location.origin ||
        event.source !== ref.current?.contentWindow ||
        event.data?.type !== HEIGHT_MESSAGE
      ) {
        return
      }
      setHeight(event.data.height)
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [autoHeight])

  return (
    <iframe
      ref={ref}
      src={`/preview/${name}`}
      title={title}
      className="block size-full"
      style={autoHeight ? { height } : undefined}
    />
  )
}

/** Reports its content's height to the `PreviewIframe` embedding the page. */
function PreviewHeightReporter({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element || window.parent === window) return

    const observer = new ResizeObserver(() => {
      window.parent.postMessage(
        { type: HEIGHT_MESSAGE, height: element.offsetHeight },
        window.location.origin
      )
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}

export { PreviewIframe, PreviewHeightReporter }
