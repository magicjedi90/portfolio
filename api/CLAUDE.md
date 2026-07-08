# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A read-only REST API (axum + sqlx/Postgres) serving portfolio data — projects, jobs, and skills — with Swagger UI at `/swagger-ui`. There is currently no deploy pipeline: the app runs locally, and the Dockerfile is kept for a future VPS deployment.

## Commands

```bash
cargo check --all-targets     # fast type-check of lib + tests
cargo clippy --all-targets    # lint; keep at zero warnings
cargo fmt                     # format before committing
cargo run                     # start the server (needs DATABASE_URL)
cargo test                    # run all tests (needs a live seeded DB, see below)
cargo test test_fetch_jobs_integration   # run a single test by name
cargo test -- --list          # list tests without running them
```

## Environment

Configuration is via environment variables, loaded from `.env` (dotenvy):

- `DATABASE_URL` — required; Postgres connection string
- `PORT` — HTTP port, defaults to 8081
- `DATABASE_MAX_CONNECTIONS` — pool size, defaults to 5
- `CORS_ALLOWED_ORIGINS` — comma-separated allowed origins; defaults to `https://sindbadmcintosh.com`

## Testing caveats

- All integration tests live under `tests/integration/` but Cargo only compiles top-level files in `tests/` as test crates — `tests/integration_tests.rs` (containing `mod integration;`) is the crate root that pulls them in. Don't add test files under `tests/integration/` without registering them in `tests/integration/mod.rs`.
- The tests hit a **live database** from `DATABASE_URL` and assume seeded data (job 10, project 10, and skills 1 and 10 exist with skill 10 attached to a project — `db/seed.sql` at the repo root satisfies all of this). Without a database they compile but fail at runtime; use `cargo test --no-run` to verify compilation only.
- To (re)create the local database: `psql -f ../db/schema.sql -f ../db/seed.sql` against a fresh `portfolio` database. The compose stack seeds itself from `db/` on first start.
- Shared test helpers (`get`, `get_json`, router/pool setup) are in `tests/integration/test_utils.rs` — use them instead of hand-building requests.

## Architecture

Request flow: `routes.rs` (router, CORS, Swagger mounting) → `handlers/` (HTTP layer) → `db/` (queries) → `models/` (shared structs).

- **handlers/**: one module per resource. Every handler is a one-liner delegating to `list_response`/`item_response` in `handlers/mod.rs`, which centralize the 200/404/500 mapping and error logging. New endpoints should reuse these helpers.
- **db/**: one module per resource. Each defines a base `SELECT` const and appends `WHERE`/`ORDER BY` suffixes via `format!`, wrapped in `AssertSqlSafe` (required by sqlx 0.9's injection guard — only acceptable because the fragments are compile-time constants; user input must always go through `.bind()`). Rows map to models via derived `sqlx::FromRow`; `projects_db` aggregates each project's skills into a `jsonb` array in SQL, decoded by `#[sqlx(json)]` on `Project.skills`.
- **models/**: plain structs deriving `Serialize`/`Deserialize`/`ToSchema`/`FromRow`. The models layer must not depend on `db/`.
- **api_docs.rs**: utoipa OpenAPI registry. Any new handler (`#[utoipa::path]`) and any new model/schema must be added here or it won't appear in Swagger.

## Manual API testing

`http/api_requests.http` holds ready-made requests for JetBrains/VS Code HTTP clients.
