#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  SLRJ-LEARN: Syncing with Latest GitHub Changes"
echo "========================================================"
echo ""

# Detect nested folder structure
if [ ! -f "package.json" ]; then
    if [ -f "blog/blog/package.json" ]; then
        cd blog/blog
    elif [ -f "blog/package.json" ]; then
        cd blog
    fi
fi

echo "[1/4] Fetching latest changes from GitHub main branch..."
git checkout main
git fetch origin main
git reset --hard origin/main

echo ""
echo "[2/4] Purging Next.js build cache (.next)..."
rm -rf .next

echo ""
echo "[3/4] Installing / updating dependencies..."
npm install

echo ""
echo "========================================================"
echo "  SUCCESS! Your project is now 100% up to date with main."
echo "========================================================"
echo ""
echo "Starting local Next.js development server..."
npm run dev
