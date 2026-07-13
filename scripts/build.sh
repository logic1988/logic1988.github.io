#!/bin/bash
set -Eeuo pipefail

echo "Building the project..."
pnpm exec next build

echo "Build completed successfully!"
