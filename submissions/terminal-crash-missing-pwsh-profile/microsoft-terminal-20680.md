---
title: Terminal crashes when opening leftover PowerShell profile after pwsh uninstall / AppX half-state
repository: microsoft/terminal
issue_number: 20680
url: https://github.com/microsoft/terminal/issues/20680
submitted: 2026-09-14
status: submitted
media: raw_github
---

After uninstalling PowerShell 7 (`pwsh`), Windows Terminal still offered a **PowerShell** profile in the new-tab menu. Opening that profile (or a new tab that targets it) crashed the Terminal app instead of showing an error or falling back to a working profile. The machine still had a WindowsApps execution-alias stub for `pwsh`, which makes the failure mode worse than a clean “file not found.”

### Windows Terminal version

Store / package install (exact About string not captured during outage). `settings.json` is under `Microsoft.WindowsTerminal_8wekyb3d8bbwe`.

### Windows build number

```text
Microsoft Windows [Version 10.0.26200.9278]
```

### Steps to reproduce

1. Install PowerShell 7 so Terminal creates / shows a **PowerShell** (`pwsh`) profile (`source`: `Windows.Terminal.PowershellCore`).
2. Uninstall PowerShell 7 (for example via `Remove-AppxPackage` / Apps & Features / `winget uninstall Microsoft.PowerShell`), leaving Windows PowerShell 5.1 available.
3. Launch Windows Terminal from Start using **Windows PowerShell** (5.1) so Terminal opens successfully.
4. Observe that the new-tab dropdown still lists **PowerShell** (the `pwsh` profile).
5. Open a new tab / select that **PowerShell** profile.

### Expected behavior

- Terminal should not crash the whole app.
- Prefer: remove or hide dynamic profiles whose command line is missing / not launchable after uninstall.
- At minimum: show a clear error dialog (“could not start profile … executable missing”) and keep existing tabs alive; fall back to another profile if needed.

### Actual behavior

- The **PowerShell** profile remains in the dropdown after uninstall.
- Attempting to open it crashes Windows Terminal (no durable error UI / no fallthrough to a working shell).
- `settings.json` still had:

```json
"defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
```

and a list entry:

```json
{
    "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
    "hidden": false,
    "name": "PowerShell",
    "source": "Windows.Terminal.PowershellCore"
}
```

- Meanwhile `where pwsh` in Command Prompt still resolves a **0-byte App Execution Alias** reparse point at `%LOCALAPPDATA%\Microsoft\WindowsApps\pwsh.exe`, while `where.exe pwsh` in Windows PowerShell 5.1 reports no match — so the profile is orphaned / half-present rather than cleanly gone.
- During the same incident, `Get-AppxPackage Microsoft.PowerShell` could still show the package with status including `DeploymentInProgress, Servicing` (half-settled AppX), which likely feeds the stub + dynamic profile staying visible.

### Screenshots

![where.exe pwsh finds nothing in Windows PowerShell 5.1](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/terminal-crash-missing-pwsh-profile/where-pwsh-fails-ps51.png)

![where pwsh still resolves WindowsApps stub in cmd](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/terminal-crash-missing-pwsh-profile/where-pwsh-windowsapps-stub-cmd.png)

![New-tab menu still lists PowerShell after uninstall](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/terminal-crash-missing-pwsh-profile/stale-powershell-profile-dropdown.png)

### Additional context

- Related older work treated missing shells as blank-tab / error-dialog cases (e.g. historical #982 / #1348). This report is specifically: **whole-app crash** + **dynamic PowershellCore profile not cleaned up on uninstall** + **WindowsApps alias stub** / half-serviced AppX.
- Repro path used Start Menu → Windows PowerShell 5.1 (opens Terminal with that profile), then new tab targeting the broken `pwsh` profile.
- Not asking Terminal to own winget packaging; the ask is resilient launch when the dynamic profile’s target is missing or only an alias stub.
- Packaging cross-links: https://github.com/PowerShell/PowerShell/issues/27031#issuecomment-5671116207 · https://github.com/microsoft/winget-pkgs/issues/362294#issuecomment-5671116447
