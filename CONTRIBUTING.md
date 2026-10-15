# Contributing to shaderscn

Thanks for your interest in contributing! Bug reports, fixes and new shaders are all welcome.

## Getting set up

You'll need Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:3000`. `dev` and `build` run `shadcn build` first, which generates the installable registry JSON in `public/r/`. That folder isn't committed.

## Adding a new shader

1. Create `registry/shaders/<name>/<name>.tsx`. Import `cn` from `@/lib/utils` and shadcn UI from `@/components/ui/*` so the CLI can rewrite the imports for each user's project.
2. Add an item to `registry.json`. Use `registry:block` for full sections and `registry:component` for everything else. List `@paper-design/shaders-react` under `dependencies` and any shadcn components under `registryDependencies`. The first entry in `categories` (`sections`, `backgrounds` or `components`) sets its group in the docs sidebar.
3. Add a preview and a usage snippet to `registry/previews.tsx`. The preview `layout` sets how it's shown on the site:
   - `section`: rendered at desktop width
   - `component`: centered on a canvas
   - `background`: stretched to fill the frame
4. Run `pnpm dev` and check the shader page, including the install command and the Manual tab.

Use kebab-case names that describe the shader and what it's for, like `god-rays-hero` or `dithering-frame-card`.

## Before opening a pull request

Make sure these pass:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Format your changes with `pnpm format` (Prettier with the Tailwind plugin).

## Pull requests

- Keep each PR focused on one change or a related set of shaders.
- Write a clear title in the imperative, like "Add smoke ring hero shader".
- For visual changes, include a screenshot or short recording.
- Check that the shader looks right in both light and dark mode.

## Reporting bugs

Open an issue with the shader name, what you expected, what happened, and your browser and OS. A minimal reproduction helps a lot.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
