#!/bin/bash
set -Eeuo pipefail

PORT="${PORT:-5000}"

echo "Serving static export on port ${PORT}..."
python3 -m http.server "${PORT}" --directory out
