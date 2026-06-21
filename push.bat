@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo             JK Tours and Travels Push Tool         
echo ===================================================
echo.

:: 1. Show git status
echo [1] Checking repository status...
git status
echo.

:: 2. Ask to commit changes
set /p commit_choice="Do you want to stage and commit all current changes? (y/n): "
if /i "!commit_choice!"=="y" (
    set /p commit_msg="Enter commit message: "
    if "!commit_msg!"=="" (
        set commit_msg="Update website"
    )
    echo Staging changes...
    git add -A
    echo Committing changes...
    git commit -m "!commit_msg!"
    echo.
)

:: 3. Push to GitHub
echo [2] Pushing code to GitHub (main branch)...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Git push failed. Please check your internet connection or repository access.
    pause
    exit /b %errorlevel%
)
echo.
echo [SUCCESS] Code pushed successfully to GitHub!
echo.

:: 4. Ask to deploy to GitHub Pages
set /p deploy_choice="Do you want to deploy the built site to GitHub Pages? (y/n): "
if /i "!deploy_choice!"=="y" (
    echo.
    echo [3] Building and deploying site...
    call npm run deploy
    if %errorlevel% neq 0 (
        echo [ERROR] Deployment failed.
        pause
        exit /b %errorlevel%
    )
    echo [SUCCESS] Site deployed successfully to GitHub Pages!
)

echo.
echo Done! You can close this window.
pause
