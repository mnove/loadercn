# loadercn

A shadcn-compatible registry of 30 React loaders: eighteen grid animations and twelve orbital animations. The homepage includes live previews, family filters, search, color controls, pause/play, light/dark themes, and a source/installation dialog for every component.

Patterns include perimeter chase, sliding puzzle, tile flip, figure eight, comet, and nested satellite. The latest batch adds spiral, breathing lattice, assemble/scatter, precession, orbital exchange, and slingshot.

The matrix scan family uses fixed 4×4 cells with animated brightness: Matrix scan (dots), Matrix scan squares, Column scan, Diagonal scan, Diagonal flow, and Matrix bounce. Diagonal flow uses a broad, eased brightness wave with synchronized diagonals. Grid ripple uses square cells.

## Development

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Development and production builds regenerate the registry automatically.

## Install a loader

In a project initialized with shadcn, run:

```sh
npx shadcn@latest add http://localhost:3000/r/grid-wave.json
```

Replace the origin with your deployed registry URL for public use. Each preview's CLI command uses the current site's origin.

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

For optional namespace installation, add this to the consuming project's `components.json`, replacing the example host:

```json
{
  "registries": {
    "@loadercn": "https://your-registry.example/r/{name}.json"
  }
}
```

Then run `npx shadcn@latest add @loadercn/grid-wave`.

## Publish

Set `NEXT_PUBLIC_SITE_URL` to your real HTTPS origin, then deploy this Next.js app using `pnpm build` and `pnpm start`. The build writes the configured homepage into both public catalogs. No domain is assumed or provisioned by this starter.

## Add a component

1. Add a self-contained component under `registry/loaders` with uniquely scoped animation names and reduced-motion styles.
2. Register its title, description, category, and source path in `registry.json`.
3. Add its preview to `lib/loaders.ts`.
4. Run `pnpm registry:build` and verify its generated JSON.

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm build
```
