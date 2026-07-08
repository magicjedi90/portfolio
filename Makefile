# Portfolio monorepo tasks. `make dev` is the one you want day to day.

SHELL := /bin/bash
DATABASE_URL ?= postgres://portfolio:portfolio@localhost:5432/portfolio
# The web toolchain needs Node >= 20; the system node may be older, so prefer nvm's.
NODE_PATH_SETUP := if [ "$$(node --version 2>/dev/null | sed 's/^v\([0-9]*\).*/\1/')" -lt 20 ] 2>/dev/null || ! command -v node >/dev/null 2>&1; then export NVM_DIR=$$HOME/.nvm; [ -s $$NVM_DIR/nvm.sh ] && . $$NVM_DIR/nvm.sh; fi

.PHONY: dev db-reset test check up down

## Run the full dev stack: local Postgres + API (:8081) + web (:3000)
dev:
	@bash scripts/dev.sh

## Drop and recreate the database from db/schema.sql + db/seed.sql
db-reset:
	psql "$(DATABASE_URL)" -v ON_ERROR_STOP=1 \
		-c 'DROP SCHEMA public CASCADE' \
		-c 'CREATE SCHEMA public'
	psql "$(DATABASE_URL)" -v ON_ERROR_STOP=1 -f db/schema.sql -f db/seed.sql

## Run both test suites (API tests need the seeded database)
test:
	cd api && cargo test
	$(NODE_PATH_SETUP); cd web && npm test

## Typecheck and lint everything without running it
check:
	cd api && cargo check --all-targets && cargo clippy --all-targets && cargo fmt --check
	$(NODE_PATH_SETUP); cd web && npx tsc --noEmit && npm run lint

## Containerized stack via docker compose (needs root on this machine)
up:
	docker compose up --build

down:
	docker compose down
