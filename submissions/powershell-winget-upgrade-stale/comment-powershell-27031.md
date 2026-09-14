Adding a recent data point on WinGet + PowerShell packaging half-states (Windows 11 `10.0.26200.9278`, winget **1.29.290**).

What happened on this machine:

1. `winget upgrade` for `Microsoft.PowerShell` reported success, but a new Terminal session still did not behave like a clean upgraded `pwsh` on disk.
2. Recovery advice was to remove the outdated AppX package and reinstall via winget.
3. After that removal/partial state, `where pwsh` in **cmd** still resolved a **0-byte** App Execution Alias at `%LOCALAPPDATA%\Microsoft\WindowsApps\pwsh.exe`, while `where.exe pwsh` in **Windows PowerShell 5.1** reported nothing.
4. `Get-AppxPackage Microsoft.PowerShell` later showed `Microsoft.PowerShell_7.6.5.0_…` with status including `DeploymentInProgress, Servicing` (half-settled), with `pwsh.exe` under `C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.5.0_x64__8wekyb3d8bbwe\`.
5. Windows Terminal kept a dynamic `Windows.Terminal.PowershellCore` profile (`{574e775e-4f2a-5b96-ac1e-a2962a402336}` as `defaultProfile`). Opening that profile crashed Terminal instead of erroring/falling back — filed separately against Terminal.

Screenshots:

![where.exe pwsh finds nothing in Windows PowerShell 5.1](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/powershell-winget-upgrade-stale/where-pwsh-fails-ps51.png)

![cmd still resolves WindowsApps pwsh stub](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/powershell-winget-upgrade-stale/where-pwsh-windowsapps-stub-cmd.png)

This matches the broader “installer tech / MSI↔MSIX / winget thinks it upgraded but the shell experience is wrong until uninstall+reinstall” cluster rather than needing a brand-new winget-cli ticket. Happy to attach winget logs after a clean reinstall finishes if useful.

Related Terminal filing will be linked here once created.
