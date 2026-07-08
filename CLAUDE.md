# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

Monorepo for the portfolio site (both halves migrated here with full history from `portfolio_api` and `portfolio_web`):

- `api/` — Rust/axum REST API (Postgres via sqlx). Has its own `CLAUDE.md` with commands, env vars, and architecture — read it before working there.
- `web/` — Next.js 16 frontend (React 19, SWR, CSS Modules + qbem, Tailwind 4 tokens, Jest). Has its own `CLAUDE.md` with commands, conventions, and architecture — read it before working there.
- `db/` — `schema.sql` + `seed.sql`, the source of truth for the database. The seed carries the actual portfolio content (jobs, projects, skills); schema changes must stay in sync with the API models and queries.
- `docker-compose.yml` — full stack: postgres (seeded from `db/` on first start), api on :8081, web on :3000. No required env vars; `POSTGRES_PASSWORD`/`DATABASE_URL` can override the defaults. For local `cargo run` against the apt Postgres, `api/.env` holds `DATABASE_URL` (role `portfolio`, db `portfolio`).

## The API contract (the reason this is a monorepo)

The frontend's TypeScript client is **generated** from the API's OpenAPI output:

1. Start the API (`cargo run` in `api/`, serves on :8081).
2. In `web/`: `npm run generate-api` — regenerates `web/src/api/client.ts` from `http://127.0.0.1:8081/api-docs/openapi.json`.

Any change to the API's handlers, models, or `api_docs.rs` can change that contract: regenerate the client and typecheck the frontend (`npx tsc --noEmit` in `web/`) in the same change. Never hand-edit `web/src/api/client.ts`.

The frontend reads `NEXT_PUBLIC_API_URL` (falls back to `http://localhost:8081`). It's baked into the client bundle at **build** time — for Docker builds it's passed as a build arg by docker-compose, not a runtime env var.

## Cross-cutting notes

- CORS: the API's `CORS_ALLOWED_ORIGINS` must include the web origin (compose defaults it to `http://localhost:3000`).
- Deployment target is a future VPS behind Caddy; there is currently no deploy pipeline. The old GCP/Cloud Run setup is gone — don't reference it.
- The original standalone repos still exist (`~/RustroverProjects/portfolio_api`, `~/WebstormProjects/portfolio_web`) but this monorepo is the source of truth going forward.
