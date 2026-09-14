Follow-up: winget now **hangs** on PowerShell upgrade (not just a stale success).

Repro right now from **cmd** in Windows Terminal:

```text
winget list powershell
# Microsoft.PowerShell  7.6.5.0  -> available 7.6.6.0

winget install powershell
# Found an existing package already installed. Trying to upgrade...
# Found PowerShell [Microsoft.PowerShell] Version 7.6.6.0
# Successfully verified installer hash
# Starting package install...
# [progress stuck at 1%]
```

Same machine still has the AppX package in a half-state:

```text
Get-AppxPackage Microsoft.PowerShell
# Version: 7.6.5.0
# Status:  DeploymentInProgress, Servicing
# InstallLocation: C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.5.0_x64__8wekyb3d8bbwe
```

So winget downloads/hashes 7.6.6, then freezes at “Starting package install…” while the existing MSIX is already `DeploymentInProgress, Servicing`. It never fails with a clear “install already running / package servicing” error — it just sits at 1%.

Screenshot: https://raw.githubusercontent.com/AMDphreak/.issues/main/images/powershell-winget-upgrade-stale/winget-freeze-starting-package-install-1pct.png

Environment: Windows `10.0.26200.9278`, winget **1.29.290**, Terminal **1.24.11911.0**. Terminal crash companion: https://github.com/microsoft/terminal/issues/20680
