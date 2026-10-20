After a recent Windows 11 26H2 upgrade, new shells stop loading the user `PATH` from the registry, so `winget` and other user-scoped tools vanish from cmd, PowerShell 5.1, and PowerShell 7 even though App Installer and `winget.exe` are still installed.

## Environment

- OS: Windows 11 26H2 (build 10.0.26300)
- App Installer / winget: Microsoft.DesktopAppInstaller **1.29.380** (package status OK)
- `winget.exe` at `%LOCALAPPDATA%\Microsoft\WindowsApps\winget.exe` runs when invoked by full path (`winget --version` → v1.29.380)
- User `PATH` in registry (HKCU `Environment\Path`): **~3,632 characters**, includes `%LOCALAPPDATA%\Microsoft\WindowsApps` and **13** `...\Microsoft\WinGet\Packages\...` entries (typical winget portable install pattern without Developer Mode / admin Links layout)

## Steps to reproduce

1. Accumulate a large user `PATH` (common with multiple winget portable/zip packages that each append a long `WinGet\Packages\...` segment).
2. Upgrade to Windows 11 26H2 (or open a new cmd / PowerShell 5.1 / pwsh session after upgrade).
3. Run `where winget` in **cmd** or `Get-Command winget` in **PowerShell 5.1** or **pwsh**.
4. Compare `[Environment]::GetEnvironmentVariable('Path','User')` (registry) vs `$env:Path` in the same process.

## Expected

- User `PATH` from HKCU is merged into every new interactive shell (cmd, PowerShell 5.1, pwsh).
- `winget` resolves via the App Execution Alias under `WindowsApps` when App Installer is installed.
- If a platform limit applies, Windows should **surface a clear error or warning** when user `PATH` cannot be applied — not silently drop the entire user block.

## Actual

- Registry user `PATH` length ~3632; **process** `PATH` length ~1326 (matches machine PATH only — user PATH not applied at all).
- `where winget` in cmd: not found.
- `Get-Command winget` in PowerShell 5.1 and pwsh: not found.
- Direct invocation still works: `& "$env:LOCALAPPDATA\Microsoft\WindowsApps\winget.exe" --version`.
- PowerShell profile import of `Microsoft.WinGet.CommandNotFound` fails at startup because `ValidateOS.psm1` requires `Get-Command winget` to succeed.

## Related

- winget-cli [#3601](https://github.com/microsoft/winget-cli/issues/3601) — PATH bloat from portable installs
- winget-cli [#5557](https://github.com/microsoft/winget-cli/issues/5557) — repeated WinGet package PATH entries vs 2047 limit
- winget troubleshooting: missing `%LOCALAPPDATA%\Microsoft\WindowsApps` in PATH ([docs](https://github.com/microsoft/winget-cli/blob/master/doc/troubleshooting/README.md))

## Ask

1. **OS**: Fix or document behavior when user `PATH` exceeds legacy limits — do not silently omit the entire user PATH from new processes.
2. **winget**: Default to Links/symlink layout where possible; warn when appending another `Packages\...` segment would exceed safe PATH size; offer cleanup for duplicate or stale entries.
3. **Visibility**: A high-signal diagnostic (e.g. `winget doctor` or Settings) when App Execution Aliases exist but PATH was not applied.

## Workaround (local)

- Shorten HKCU `PATH` (dedupe, remove per-package WinGet paths, keep `WinGet\Links` + `WindowsApps`) and sign out / reboot.
- `winget` only via full path until PATH is repaired.

---
Submitted: https://github.com/microsoft/winget-cli/issues/6606
