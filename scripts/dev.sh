#!/usr/bin/env bash
# Runs the full dev stack: local Postgres check, API via cargo, web via next dev.
# Ctrl-C stops everything.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Next.js 16 needs Node >= 20; the system node may be older, so prefer nvm's.
node_major="$(node --version 2>/dev/null | sed 's/^v\([0-9]*\).*/\1/' || true)"
if [ "${node_major:-0}" -lt 20 ]; then
    export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    # shellcheck disable=SC1091
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
fi
node_major="$(node --version 2>/dev/null | sed 's/^v\([0-9]*\).*/\1/' || true)"
[ "${node_major:-0}" -ge 20 ] || { echo "Node >= 20 required — install with: nvm install --lts"; exit 1; }
command -v cargo >/dev/null 2>&1 || { echo "cargo not found — install Rust (rustup)"; exit 1; }

# The API reads DATABASE_URL from api/.env; use the same one here.
if [ -f "$repo_root/api/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    . "$repo_root/api/.env"
    set +a
fi
DATABASE_URL="${DATABASE_URL:-postgres://portfolio:portfolio@localhost:5432/portfolio}"

pg_isready -q || { echo "Postgres is not running — try: sudo systemctl start postgresql"; exit 1; }
if ! psql "$DATABASE_URL" -qAtc 'SELECT 1 FROM jobs LIMIT 1' >/dev/null 2>&1; then
    echo "Database is empty or unreachable at $DATABASE_URL — run: make db-reset"
    exit 1
fi

echo "Starting API on :8081 and web on :3000 (Ctrl-C stops both)..."
trap 'kill 0' EXIT

(cd "$repo_root/api" && cargo run) &
(cd "$repo_root/web" && npm run dev) &

wait -n
