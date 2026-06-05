#!/usr/bin/env bash
# Polling auto-deploy for the ESTATE site.
#
# Checks origin/master once per run. If a new commit exists, it pulls,
# reinstalls deps, rebuilds, and restarts the PM2 process. If the build
# fails, the previously built version stays online untouched.
#
# Intended to run from cron every minute:
#   * * * * * /bin/bash $HOME/estate-website/deploy/auto-deploy.sh >> $HOME/estate-deploy.log 2>&1
set -uo pipefail

REPO_DIR="$HOME/estate-website"
APP_NAME="estate"
BRANCH="master"

cd "$REPO_DIR" || { echo "[$(date)] repo dir $REPO_DIR missing"; exit 1; }

# Fetch quietly; a network blip should not spam the log.
git fetch origin "$BRANCH" --quiet || exit 0

LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse "origin/$BRANCH")"

# Nothing new — exit silently so the log only records real deploys.
[ "$LOCAL" = "$REMOTE" ] && exit 0

echo "[$(date)] New commit $REMOTE detected — deploying..."
git pull origin "$BRANCH" --quiet

if npm ci --no-audit --no-fund && npm run build; then
  pm2 restart "$APP_NAME" --update-env
  echo "[$(date)] Deploy OK -> now serving $REMOTE"
else
  echo "[$(date)] BUILD FAILED — previous version kept online"
fi
