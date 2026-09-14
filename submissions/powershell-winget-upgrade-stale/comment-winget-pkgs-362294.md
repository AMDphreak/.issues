Same packaging / upgrade half-state cluster from a client machine (not opening a duplicate).

Summary: winget reported a successful `Microsoft.PowerShell` upgrade, but the on-disk / alias / Terminal experience stayed wrong until AppX removal + reinstall was attempted. Afterward:

- cmd `where pwsh` → `%LOCALAPPDATA%\Microsoft\WindowsApps\pwsh.exe` (0-byte reparse / App Execution Alias)
- PS 5.1 `where.exe pwsh` → not found
- AppX package could show `DeploymentInProgress, Servicing` for `Microsoft.PowerShell` 7.6.5.0
- Windows Terminal retained `source: Windows.Terminal.PowershellCore` and crashed when opening that profile

Cross-links: commenting likewise on PowerShell/PowerShell#27031; Terminal crash being filed on microsoft/terminal (link to follow). Treating this as package/lifecycle rather than a new winget-cli feature request.
