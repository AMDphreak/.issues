`winget upgrade` for Microsoft PowerShell reported a successful upgrade, but a new terminal still ran the old on-disk PowerShell. Copilot’s suggested recovery was to remove the outdated AppX package and reinstall via winget. After removal, `pwsh` was gone from a real install path while a WindowsApps execution-alias stub remained visible to cmd — a messy half-state that also left Windows Terminal with a stale PowerShell profile (separate Terminal crash report).

### Package / tool versions

- Package: `Microsoft.PowerShell` (via winget)
- winget (from cmd): Windows Package Manager **v1.29.290**
- OS: Microsoft Windows **[Version 10.0.26200.9278]**

### Steps to reproduce

1. Have an older PowerShell 7 install (AppX / MSIX path was involved in recovery advice).
2. Run `winget upgrade` / `winget upgrade --id Microsoft.PowerShell` (exact flags as used during the session).
3. Observe winget reporting that the upgrade completed successfully.
4. Open a new Terminal window / tab and check the actual `pwsh` version / install location on disk.
5. (Recovery path taken) Uninstall the outdated AppxPackage, then attempt reinstall via winget.

### Expected behavior

- If winget reports success, the on-disk `pwsh` that Terminal/`where` resolve should match the upgraded version.
- Uninstall should not leave a misleading WindowsApps `pwsh.exe` alias stub + Terminal profile pointing at a non-working shell.
- Upgrade across installer technologies (MSI vs MSIX/AppX) should fail clearly or migrate cleanly — not claim success while leaving the old binary in use.

### Actual behavior

- winget claimed the upgrade succeeded.
- New Terminal sessions still used the pre-upgrade PowerShell on disk.
- Removing the AppX package was required before a clean winget reinstall could be attempted.
- After removal: `where.exe pwsh` in Windows PowerShell 5.1 finds nothing; `where pwsh` in cmd still reports `%LOCALAPPDATA%\Microsoft\WindowsApps\pwsh.exe`.

### Screenshots

![where.exe pwsh finds nothing in Windows PowerShell 5.1 after removal](images/powershell-winget-upgrade-stale/where-pwsh-fails-ps51.png)

![cmd still resolves WindowsApps pwsh stub](images/powershell-winget-upgrade-stale/where-pwsh-windowsapps-stub-cmd.png)

### Additional context

- Filing against winget-cli first; happy to retarget / cross-link `PowerShell/PowerShell` or `microsoft/winget-pkgs` if this is packaging vs client.
- Companion issues prepared for: (1) `winget` missing from PATH in Windows PowerShell 5.1 while present in cmd; (2) Windows Terminal crashing on the leftover PowerShell profile after uninstall.
- Full winget logs / exact before/after version numbers to be attached after PowerShell is reinstalled and logs can be collected safely.
