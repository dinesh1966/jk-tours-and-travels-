@echo off
echo ===================================================
echo             JK Tours and Travels Deploy Tool       
echo ===================================================
echo.
echo Building and deploying site to GitHub Pages...
echo.
call npm run deploy
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Deployment failed. Please check the logs above.
    pause
    exit /b %errorlevel%
)
echo.
echo [SUCCESS] Site deployed successfully to GitHub Pages!
echo URL: https://dinesh1966.github.io/jk-tours-and-travels-/
echo.
pause
