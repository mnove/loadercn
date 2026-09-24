# Contributing

Thanks for helping out. New loaders, bug fixes, and docs improvements are all welcome.

## Setup

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. `pnpm dev` and `pnpm build` regenerate the registry automatically. To try installs locally, swap `http://localhost:3000` into the install URLs. To serve the registry from another origin, set `NEXT_PUBLIC_SITE_URL`. In a fresh checkout, run `pnpm next typegen` before `pnpm typecheck`.

## Adding a loader

1. Pick a category from `CATEGORIES` in `lib/loaders.ts`: `grid`, `orbital`, `classic`, `network`, or `chart`.
2. Create `registry/loaders/<prefix>-<name>.tsx`, using the category's file-name prefix (`grid-`, `orbit-`, `classic-`, `network-`, or `chart-`).
3. Add the item to `registry.json` with `name`, `type: "registry:ui"`, `title`, `description`, `categories`, and `files`.
4. Register the component in `lib/loaders.ts` and write its "when to use it" note in `lib/loader-notes.ts`.
5. Run `pnpm registry:build` and check the generated `public/r/<name>.json`.

If no category fits, see [AGENTS.md](AGENTS.md#adding-a-category) for adding one.

## Loader rules

Loaders are installed into other people's projects, so each one has to work anywhere:

- Depend on React only: no npm packages, no Tailwind, and no imports from this repo.
- Use the shared props: `ComponentProps<"span"> & { size?: number; speed?: number; label?: string }`, with defaults `size = 40`, `speed = 1.6`, and `label = "Loading"`. The spherical and chart loaders use slower `speed` defaults of 3.2 or 4.8 seconds; keep `lib/loader-defaults.ts` in sync with their standalone files.
- Render a root `<span role="status" aria-label={label}>` that spreads the remaining props and merges `className` and `style`. Mark decorative children `aria-hidden="true"`.
- Put styles in an inline `<style>` tag, and prefix every class and `@keyframes` name with the loader name.
- Draw with `currentColor`.
- Include a `@media (prefers-reduced-motion: reduce)` rule.
- Stay server-component safe. Add `"use client"` only when a hook requires it.

## Before opening a pull request

```sh
pnpm typecheck
pnpm lint
pnpm registry:validate
```

Commit the regenerated files in `public/` along with your changes. Never edit them by hand.
