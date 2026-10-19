import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"
import pluginRouter from "@tanstack/eslint-plugin-router"

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  ...pluginRouter.configs["flat/recommended"],
  // Registry shaders keep `@next/next/no-img-element` disable comments for
  // users on Next.js. A no-op rule lets ESLint resolve them here.
  {
    plugins: {
      "@next/next": { rules: { "no-img-element": { create: () => ({}) } } },
    },
  },
  {
    files: ["registry/shaders/**"],
    linterOptions: { reportUnusedDisableDirectives: "off" },
  },
  globalIgnores(["dist/**", "public/**", "app/routeTree.gen.ts"]),
])

export default eslintConfig
