# shaderscn

Copy-paste shader sections and components for shadcn/ui, built on [Paper Shaders](https://shaders.paper.design) (`@paper-design/shaders-react`).

## Development

```bash
pnpm dev
```

`dev` and `build` run `shadcn build` first, which turns `registry.json` into installable JSON in `public/r/`. That folder is generated and isn't committed.

## Installing a component

Every item can be installed with the shadcn CLI:

```bash
npx shadcn@latest add https://<your-domain>/r/god-rays-hero.json
```

Set `NEXT_PUBLIC_REGISTRY_URL` so the install commands on the site point at your deployment (it defaults to the `homepage` in `registry.json` in production and `http://localhost:3000` in development). The same URL is used for canonical links, the sitemap and `robots.txt`.

## Adding a new shader

1. Create `registry/shaders/<name>/<name>.tsx`. Import `cn` from `@/lib/utils` and shadcn UI from `@/components/ui/*` so the CLI can rewrite the imports for each user's project.
2. Add an item to `registry.json`. Use `registry:block` for full sections and `registry:component` for everything else. List `@paper-design/shaders-react` under `dependencies` and any shadcn components under `registryDependencies`.
3. Add a preview and a usage snippet to `registry/previews.tsx`. The preview `layout` sets how it's shown on the site:
   - `section`: rendered at desktop width
   - `component`: centered on a canvas
   - `background`: stretched to fill the frame
