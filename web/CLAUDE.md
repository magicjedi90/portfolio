# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in `web/`.

## Project

Next.js 15 (App Router) frontend for the portfolio site. Every page is a client component (`'use client'`) that fetches from the REST API through SWR — there is no server-side data fetching and no state beyond SWR's cache.

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # production build
npm run lint         # eslint
npm test             # jest test suite
npm run test:watch   # jest in watch mode
npx tsc --noEmit     # typecheck
npm run generate-api # regenerate src/api/client.ts from the running API (see root CLAUDE.md)
```

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

- Tailwind is installed but **not used as utility classes in JSX**. Styling lives in per-component and per-page CSS Modules whose class names follow BEM (`.highlights__card`), looked up through `qbem`: `styles[bem.elem('card')]`. Follow this pattern — don't mix Tailwind utility classes into component markup.
- **qbem caveat**: with modifiers, `bem.elem('card', ['active'])` returns `"block__card block__card--active"` as one space-joined string — that is not a valid CSS Module key. Compose modifier classes explicitly instead: `` `${styles[bem.elem('card')]} ${styles['block__card--active']}` `` (see `Header.tsx`, `PageSection.tsx`).
- Inside the CSS Modules, use Tailwind's `theme()` function for spacing/color/typography tokens. The `--background`/`--foreground`/`--border` CSS variables in `src/app/globals.css` (dark mode via `prefers-color-scheme`) are mapped to Tailwind colors in `tailwind.config.js`.

## Testing

- Jest + React Testing Library + jsdom, configured through `next/jest` (`jest.config.js`). Tests live in `src/components/__tests__/ComponentName.test.tsx`.
- Pattern per file: build mock data matching the generated API types, then assert normal rendering, empty states, and each piece of conditional logic (see `src/components/__tests__/README.md`).
- CSS Modules are identity-mapped under Jest, so selectors like `.jobs` match the raw BEM class name — which also means class-name assertions can pass in Jest while being broken in the real build; be suspicious of any `styles[...]` lookup whose key isn't literally defined in the CSS Module.

## Build notes

- `next.config.mjs` sets `output: 'standalone'`; the Dockerfile copies `.next/standalone` and runs `node server.js`.
- `NEXT_PUBLIC_API_URL` is baked in at build time — details and the Docker build-arg wiring are in the root CLAUDE.md.
