# loadercn

A shadcn-compatible registry of 53 React loaders: twenty-three grid animations, thirteen orbital animations, and seventeen classic animations. The homepage includes live previews, family filters, search, color controls, pause/play, light/dark themes, and a source/installation dialog for every component.

Patterns include perimeter chase, sliding puzzle, tile flip, figure eight, comet, and nested satellite. The latest batch adds spiral, breathing lattice, assemble/scatter, precession, orbital exchange, and slingshot.

The matrix scan family uses fixed 4×4 cells with animated brightness: Matrix scan (dots), Matrix scan squares, Column scan, Diagonal scan, Diagonal flow, and Matrix bounce. Diagonal flow uses a broad, eased brightness wave with synchronized diagonals. Grid ripple uses square cells. Directional flow variants run top to bottom, bottom to top, left to right, and right to left. Matrix bounce also has a horizontal variant.

The Classic family includes Ring spinner, Fading spokes, Dotted spinner, Dual ring, Chasing dots, Chasing dots trio, Bouncing dots, Typing indicator, Equalizer bars, Indeterminate bar, Expanding rings, Rotating squares, and Folding cube.

Adapted patterns include Dot stream, Liquid dot stream, Pulsing spokes, Circular tail, and Tilted atom. Liquid dot stream uses a unique SVG filter per instance; all patterns inherit text color and support reduced motion.

## Development

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Development and production builds regenerate the registry automatically.

## Install a loader

Loaders are published under the `@loadercn` namespace. In a project initialized with shadcn, register the namespace once, then add loaders by name:

```sh
npx shadcn@latest registry add @loadercn=https://your-registry.example/r/{name}.json
npx shadcn@latest add @loadercn/grid-wave
```

`registry add` writes this to the consuming project's `components.json`:

```json
{
  "registries": {
    "@loadercn": "https://your-registry.example/r/{name}.json"
  }
}
```

`npx shadcn@latest search @loadercn` lists every loader. You can also skip the namespace and install from a URL:

```sh
npx shadcn@latest add https://your-registry.example/r/grid-wave.json
```

Replace the example host with your deployed origin (`http://localhost:3000` in development). The site's install commands use the current origin.

```tsx
import { GridWave } from "@/components/ui/grid-wave"

<GridWave size={40} speed={1.6} className="text-orange-600" label="Loading results" />
```

`size` is in pixels; `speed` is the cycle duration in seconds (lower is faster). Loaders inherit text color, accept span props, include an accessible loading status, and respect `prefers-reduced-motion`. Each file includes scoped CSS and requires only React, so the Source tab also supports direct copying without shadcn or Tailwind setup.

## Registry structure

- `registry.json`: source catalog following the [shadcn registry specification](https://ui.shadcn.com/docs/registry/registry-json).
- `registry/loaders/*.tsx`: independently installable `registry:ui` components.
- `public/r/*.json`: generated items with full source content, built by `shadcn build`.
- `/r/registry.json` and `/registry.json`: discoverable public catalogs.

## Publish

Set `NEXT_PUBLIC_SITE_URL` to your real HTTPS origin, then deploy this Next.js app using `pnpm build` and `pnpm start`. The build writes the configured homepage into both public catalogs. No domain is assumed or provisioned by this starter.

To make `npx shadcn@latest add @loadercn/<name>` work without the `registry add` step, list the registry in the [shadcn registry directory](https://ui.shadcn.com/docs/registry/registry-index). The repository must be public. Add this entry to `apps/v4/registry/directory.json` in `shadcn-ui/ui`, run `pnpm validate:registries`, and open a pull request:

```json
{
  "name": "@loadercn",
  "homepage": "https://your-registry.example",
  "url": "https://your-registry.example/r/{name}.json",
  "description": "Animated React loaders for shadcn/ui: grid, orbital, and classic spinners with zero dependencies.",
  "logo": "<svg ...>"
}
```

## Add a component

1. Add a self-contained component under `registry/loaders` with uniquely scoped animation names and reduced-motion styles.
2. Register its title, description, category, and source path in `registry.json`.
3. Add its preview to `lib/loaders.ts`.
4. Run `pnpm registry:build` and `pnpm registry:validate`, then verify its generated JSON.

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm build
```
