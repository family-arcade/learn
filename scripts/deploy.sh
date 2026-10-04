#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
exec ~/code/hetzner-ops-familyarcade/scripts/deploy-static.sh learn.familyarcade.eu "$PWD/dist"
