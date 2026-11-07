@echo off
chcp 65001 >nul
set "FILE=%~dp0nafe-digital-magazine.html"
set "URL=file:///%FILE:\=/%"
for %%C in ("%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "%LocalAppData%\Google\Chrome\Application\chrome.exe") do (
  if exist %%C (
    start "" %%C --kiosk --autoplay-policy=no-user-gesture-required "%URL%"
    exit /b
  )
)
echo Google Chrome was not found. Open nafe-digital-magazine.html manually.
pause
