---
title: "winget upgrade Microsoft.PowerShell reports success but on-disk pwsh stays old / AppX half-state"
repository: microsoft/winget-cli
issue_number: unfiled
url: none
submitted: 2026-09-14
status: pending
media: attach
---

Draft is ready in `issue.md` with screenshots under `images/powershell-winget-upgrade-stale/`. Held pending until PowerShell is reinstalled and winget logs / exact before-after versions can be attached. Consider cross-filing or moving to `PowerShell/PowerShell` / `microsoft/winget-pkgs` if maintainers redirect.

Retry when ready (from `.issues` repo root):

```powershell
gh issue create --repo microsoft/winget-cli `
  --title "winget upgrade Microsoft.PowerShell reports success but on-disk pwsh stays old / AppX half-state" `
  --body-file .\submissions\powershell-winget-upgrade-stale\issue.md `
  --attach ".\images\powershell-winget-upgrade-stale\where-pwsh-fails-ps51.png#where.exe pwsh finds nothing in Windows PowerShell 5.1 after removal" `
  --attach ".\images\powershell-winget-upgrade-stale\where-pwsh-windowsapps-stub-cmd.png#cmd still resolves WindowsApps pwsh stub"
```
