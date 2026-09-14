---
title: winget freezes at Starting package install 1% while AppX DeploymentInProgress
repository: PowerShell/PowerShell
issue_number: 27031
url: https://github.com/PowerShell/PowerShell/issues/27031#issuecomment-5671173476
submitted: 2026-09-14
status: submitted
media: raw_github
note: freeze follow-up comment
---

Also mirrored to:
- https://github.com/microsoft/winget-pkgs/issues/362294#issuecomment-5671173673
- https://github.com/microsoft/winget-cli/issues/6381#issuecomment-5671173865
- https://github.com/microsoft/terminal/issues/20680#issuecomment-5671174079

Key local observation (not remediated): `Get-AppxPackage Microsoft.PowerShell` → `Status: DeploymentInProgress, Servicing` while winget hangs upgrading 7.6.5.0 → 7.6.6.0.
