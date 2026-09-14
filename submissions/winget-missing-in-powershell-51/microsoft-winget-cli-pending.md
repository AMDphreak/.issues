---
title: "winget not found in Windows PowerShell 5.1 but works in cmd"
repository: microsoft/winget-cli
issue_number: unfiled
url: none
submitted: 2026-09-14
status: pending
media: attach
---

Draft is ready in `issue.md` with screenshots under `images/winget-missing-in-powershell-51/`. Held pending while PowerShell 7 was being repaired and shell tooling was unreliable.

Retry when ready (from `.issues` repo root):

```powershell
gh issue create --repo microsoft/winget-cli `
  --title "winget not found in Windows PowerShell 5.1 but works in cmd" `
  --body-file .\submissions\winget-missing-in-powershell-51\issue.md `
  --attach ".\images\winget-missing-in-powershell-51\winget-not-found-ps51.png#winget CommandNotFoundException in Windows PowerShell 5.1" `
  --attach ".\images\winget-missing-in-powershell-51\winget-works-in-cmd.png#winget help succeeds in Command Prompt"
```
