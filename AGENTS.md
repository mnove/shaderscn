# TanStack Start

This site is a TanStack Start app, prerendered to static HTML at build time. TanStack ships agent docs with the package: read the relevant `SKILL.md` under `node_modules/@tanstack/react-start/skills/` (and `node_modules/@tanstack/start-client-core/skills/` for server routes, server functions and the execution model) before changing routing, loaders or the build.

Every page must stay prerenderable: no request-time server code. New dynamic routes need their paths listed in `pages` in `vite.config.ts`.
