@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo             Pushing to Main Branch Only            
echo ===================================================
echo.

:: Stage changes
echo [1] Staging all changes...
git add -A

:: Ask for commit message
set /p commit_msg="Enter commit message (press Enter for default 'Update website'): "
if "!commit_msg!"=="" (
    set commit_msg="Update website"
)

:: Commit
echo.
echo [2] Committing changes...
git commit -m "!commit_msg!"

:: Push
echo.
echo [3] Pushing to main branch...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. Please check your internet connection or git permissions.
    pause
    exit /b %errorlevel%
)

echo.
echo [SUCCESS] Successfully pushed to main branch!
echo.
pause
