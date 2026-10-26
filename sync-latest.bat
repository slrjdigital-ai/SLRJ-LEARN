@echo off
setlocal
echo ========================================================
echo   SLRJ-LEARN: Syncing with Latest GitHub Changes
echo ========================================================
echo.

:: Detect if we are in outer folder or nested folder
if not exist "package.json" (
    if exist "blog\blog\package.json" (
        cd blog\blog
    ) else if exist "blog\package.json" (
        cd blog
    )
)

echo [1/4] Checking Git branch and fetching updates from GitHub...
git checkout main
git fetch origin main
git reset --hard origin/main

echo.
echo [2/4] Purging Next.js build cache (.next)...
if exist ".next" rmdir /s /q ".next"

echo.
echo [3/4] Installing / updating dependencies...
call npm install

echo.
echo ========================================================
echo   SUCCESS! Your project is now 100%% up to date with main.
echo ========================================================
echo.
echo Starting local Next.js development server...
echo Press Ctrl + C to stop the server at any time.
echo.
call npm run dev
pause
