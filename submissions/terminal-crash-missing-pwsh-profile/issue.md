After uninstalling PowerShell 7 (`pwsh`), Windows Terminal still offered a **PowerShell** profile in the new-tab menu. Opening that profile (or a new tab that targets it) crashed the Terminal app instead of showing an error or falling back to a working profile. The machine still had a WindowsApps execution-alias stub for `pwsh`, which makes the failure mode worse than a clean “file not found.”

### Windows Terminal version

(Please fill after reinstall / from Settings → About — captured while `pwsh` was removed.)

### Windows build number

```text
Microsoft Windows [Version 10.0.26200.9278]
```

### Steps to reproduce

1. Install PowerShell 7 so Terminal creates / shows a **PowerShell** (`pwsh`) profile.
2. Uninstall PowerShell 7 (for example via `Remove-AppxPackage` / Apps & Features / `winget uninstall Microsoft.PowerShell`), leaving Windows PowerShell 5.1 available.
3. Launch Windows Terminal from Start using **Windows PowerShell** (5.1) so Terminal opens successfully.
4. Observe that the new-tab dropdown still lists **PowerShell** (the `pwsh` profile).
5. Open a new tab / select that **PowerShell** profile.

### Expected behavior

- Terminal should not crash the whole app.
- Prefer: remove or hide dynamic profiles whose command line is missing after uninstall.
- At minimum: show a clear error dialog (“could not start profile … executable missing”) and keep existing tabs alive; fall back to another profile if needed.

### Actual behavior

- The **PowerShell** profile remains in the dropdown after uninstall.
- Attempting to open it crashes Windows Terminal (no durable error UI / no fallthrough to a working shell).
- Meanwhile `where pwsh` in Command Prompt still resolves an App Execution Alias stub under `%LOCALAPPDATA%\Microsoft\WindowsApps\pwsh.exe`, while `where.exe pwsh` in Windows PowerShell 5.1 reports no match — so the profile is orphaned / half-present rather than cleanly gone.

### Screenshots

![where.exe pwsh finds nothing in Windows PowerShell 5.1](images/terminal-crash-missing-pwsh-profile/where-pwsh-fails-ps51.png)

![where pwsh still resolves WindowsApps stub in cmd](images/terminal-crash-missing-pwsh-profile/where-pwsh-windowsapps-stub-cmd.png)

![New-tab menu still lists PowerShell after uninstall](images/terminal-crash-missing-pwsh-profile/stale-powershell-profile-dropdown.png)

### Additional context

- Related older work treated missing shells as blank-tab / error-dialog cases (e.g. historical #982 / #1348). This report is specifically: **whole-app crash** + **profile not cleaned up on uninstall** + **WindowsApps alias stub** after package removal.
- Repro path used Start Menu → Windows PowerShell 5.1 (opens Terminal with that profile), then new tab targeting the missing `pwsh` profile.
