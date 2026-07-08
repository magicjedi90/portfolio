# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in `web/`.

## Project

Next.js 16 (App Router) frontend for the portfolio site, on React 19. Every page is a client component (`'use client'`) that fetches from the REST API through SWR — there is no server-side data fetching and no state beyond SWR's cache.

Local tooling needs Node 24 (see `.nvmrc`); it's installed via nvm, not the system package manager.

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # production build (also typechecks)
npm run lint         # eslint (flat config; `next lint` no longer exists in Next 16)
npm test             # jest test suite
npm run test:watch   # jest in watch mode
npx tsc --noEmit     # typecheck
npm run generate-api # regenerate src/api/client.ts from the running API (see root CLAUDE.md)
```

TypeScript must stay on 5.x — Next's typecheck integration does not accept the TypeScript 7 native compiler. ESLint must stay on 9.x until `eslint-config-next`'s plugin chain supports 10.

## Architecture

- `src/app/` — App Router pages (`/`, `/experience`, `/projects`). Each page composes the shared section components: `Hero`, then `HighlightCards`/`PageSection` for static content, then `ApiSection` for API-backed content.
- `src/components/` — presentational components; they receive data via props and never fetch.
  - `PageSection` — section wrapper (heading, centered content, `alternate` background variant). `HighlightCards` (static card grids) and `ApiSection` (loading/error/content states around API data) build on it.
  - `Jobs`, `Projects` — render API data; `Header`, `Hero` — chrome.
- `src/api/` — the data layer:
  - `client.ts` — **generated**, never hand-edit. Contains only types, no runtime code.
  - `types.ts` — re-exports `Project`, `Job`, `Skill` from the generated schema. Import API types from here, not from `client.ts`.
  - `fetcher.ts` — native `fetch` against `NEXT_PUBLIC_API_URL`, throws on non-2xx responses.
  - `hooks.ts` — SWR hooks. Add a new endpoint as a `useSomething()` hook wrapping the generic `useApi<T>(url)`; revalidate-on-focus and revalidate-on-reconnect are off by default.

The `@/*` import alias maps to `src/*` (both in `tsconfig.json` and `jest.config.js`).

## Styling conventions

- Tailwind 4 is installed but **not used as utility classes in JSX**. Styling lives in per-component and per-page CSS Modules whose class names follow BEM (`.highlights__card`), looked up through `qbem`: `styles[bem.elem('card')]`. Follow this pattern — don't mix Tailwind utility classes into component markup.
- **qbem caveat**: with modifiers, `bem.elem('card', ['active'])` returns `"block__card block__card--active"` as one space-joined string — that is not a valid CSS Module key. Compose modifier classes explicitly instead: `` `${styles[bem.elem('card')]} ${styles['block__card--active']}` `` (see `Header.tsx`, `PageSection.tsx`).
- Inside the CSS Modules, use Tailwind's theme **CSS variables** for tokens: `var(--color-gray-800)`, `var(--text-xl)`, `var(--font-weight-bold)`, `var(--container-4xl)`, `var(--radius-lg)`, `var(--leading-relaxed)`, and `calc(var(--spacing) * N)` for spacing. **Never use `theme()`** — Tailwind 4 compiles each CSS Module in isolation, so `theme()` passes through unresolved into the shipped CSS (the build still "succeeds"; check the emitted chunk if in doubt).
- There is no `tailwind.config.js` — Tailwind 4 is configured in `src/app/globals.css`: `@import 'tailwindcss' theme(static)` (the `theme(static)` is required so all theme variables are emitted for the CSS Modules to consume) plus an `@theme` block mapping the site's `--background`/`--foreground`/`--border` variables (dark mode via `prefers-color-scheme`).

## Testing

- Jest + React Testing Library + jsdom, configured through `next/jest` (`jest.config.mjs`). Tests live in `src/components/__tests__/ComponentName.test.tsx`. The config maps `qbem` to its CJS build directly because qbem 4.0.1 ships a broken `exports` entry.
- Pattern per file: build mock data matching the generated API types, then assert normal rendering, empty states, and each piece of conditional logic (see `src/components/__tests__/README.md`).
- CSS Modules are identity-mapped under Jest, so selectors like `.jobs` match the raw BEM class name — which also means class-name assertions can pass in Jest while being broken in the real build; be suspicious of any `styles[...]` lookup whose key isn't literally defined in the CSS Module.

## Build notes

- `next.config.mjs` sets `output: 'standalone'`; the Dockerfile copies `.next/standalone` and runs `node server.js`.
- `NEXT_PUBLIC_API_URL` is baked in at build time — details and the Docker build-arg wiring are in the root CLAUDE.md.
