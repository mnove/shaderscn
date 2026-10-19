import handler, { createServerEntry } from "@tanstack/react-start/server-entry"

/** Sent by the prerenderer when it renders the not-found page. */
export const NOT_FOUND_PAGE_HEADER = "x-prerender-not-found"

// The site is static, so this only runs at build time. The prerenderer only
// saves successful responses, so the root's not-found page is returned as 200
// when asked for, to be written as 404.html. Rendering it from an unmatched
// URL, rather than a dedicated route, means it hydrates cleanly at any URL.
export default createServerEntry({
  async fetch(request) {
    const response = await handler.fetch(request)
    if (response.status === 404 && request.headers.has(NOT_FOUND_PAGE_HEADER)) {
      return new Response(response.body, {
        status: 200,
        headers: response.headers,
      })
    }
    return response
  },
})
