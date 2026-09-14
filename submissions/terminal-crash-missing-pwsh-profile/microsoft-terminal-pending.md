---
title: "Terminal crashes when opening leftover PowerShell profile after pwsh uninstall"
repository: microsoft/terminal
issue_number: unfiled
url: none
submitted: 2026-09-14
status: pending
media: attach
---

Draft is ready in `issue.md` with screenshots under `images/terminal-crash-missing-pwsh-profile/`. Not filed yet because PowerShell 7 was mid-repair and CLI tooling was unreliable; file after `pwsh` is reinstalled (and optionally fill Terminal version in the body).

Retry when ready (from `.issues` repo root, after `gh` works):

```powershell
gh issue create --repo microsoft/terminal `
  --title "Terminal crashes when opening leftover PowerShell profile after pwsh uninstall" `
  --body-file .\submissions\terminal-crash-missing-pwsh-profile\issue.md `
  --attach ".\images\terminal-crash-missing-pwsh-profile\where-pwsh-fails-ps51.png#where.exe pwsh finds nothing in Windows PowerShell 5.1" `
  --attach ".\images\terminal-crash-missing-pwsh-profile\where-pwsh-windowsapps-stub-cmd.png#where pwsh still resolves WindowsApps stub in cmd" `
  --attach ".\images\terminal-crash-missing-pwsh-profile\stale-powershell-profile-dropdown.png#New-tab menu still lists PowerShell after uninstall"
```
