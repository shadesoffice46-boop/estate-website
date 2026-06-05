#!/usr/bin/env bash
# Manual immediate deploy: pull + rebuild + restart, regardless of commit diff.
# Use when you want to force a redeploy by hand:
#   bash $HOME/estate-website/deploy/deploy.sh
set -euo pipefail
cd "$HOME/estate-website"
git pull origin master
npm ci --no-audit --no-fund
npm run build
pm2 restart estate --update-env
echo "✅ Deploy complete -> $(git rev-parse --short HEAD)"
