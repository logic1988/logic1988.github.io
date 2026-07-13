#!/bin/bash
set -Eeuo pipefail

PORT="${PORT:-5000}"

echo "Starting HTTP service on port ${PORT} for dev..."
pnpm exec next dev --port "${PORT}"
