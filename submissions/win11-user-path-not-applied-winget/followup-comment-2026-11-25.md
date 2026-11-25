Following up with a concrete breakdown of what actually pushed User `PATH` past the 4,094-character `shell32!BuildEnvironmentPath` cliff confirmed above. Even on this machine where `WinGet\Links` is present and working (14 active links), WinGet portable package entries alone consumed over 1,200 characters of User `PATH`—nearly a third of the entire Windows limit—plus stale entries left behind after upgrades.

## Concrete breakdown observed before manual cleanup

- **Combined Registry `PATH`:** 5,041 characters (Machine `1,302` + User `3,738`) — silently dropped the entire User `PATH` block, hiding `WindowsApps\winget.exe` and every user-scoped CLI.
- **11 active `WinGet\Packages\...` entries in User `PATH` (~1,231 chars total, 104–136 chars each):**
  - `CLPM.CLPM` (136 chars)
  - `LibreHardwareMonitor.LibreHardwareMonitor` (134 chars — GUI app)
  - `oleg-shilo.win-sudo` (112 chars)
  - `ruanklein.synapseq` (111 chars — also exposes only `synapseq-v4.43.1-windows-amd64.exe` with no `synapseq` command alias)
  - `GitHub.hub` (107 chars)
  - `dprint.dprint`, `SQLite.SQLite`, `pingbird.Puro`, `OpenTofu.Tofu` (106 chars each)
  - `PHP.PHP.8.4`, `PHP.PHP.8.3` (104 chars each)
- **2 orphaned old-version FFmpeg entries left in User `PATH` after upgrades** (related to #6160):
  - `Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-7.1.1-full_build\bin` (while `9.0.2` was installed)
  - `yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-N-125875-...` (while `N-127043` was installed)
- After pruning duplicates, dead entries, and 4 unused `WinGet\Packages\...` entries, combined `PATH` dropped to **3,836 characters** and native `%LOCALAPPDATA%\Microsoft\WindowsApps\winget.exe` resolved immediately again.

## Practical suggestions for `winget-cli`

1. **Avoid O(N) 110+ char `PATH` growth for portable packages:** With the confirmed 4,094-char `shell32!BuildEnvironmentPath` cliff, even ~15–20 portable packages with sibling DLLs (`ArchiveBinariesDependOnPath`) can silently break User `PATH` for the whole OS—including `winget` itself. If dynamically generated unsigned shims don't meet security requirements (as noted in #6181), a **single immutable Microsoft-signed static launcher stub** hardlinked into `WinGet\Links` alongside a small per-command target manifest launches the real binary directly via `CreateProcessW` (preserving sibling DLL resolution and Authenticode/WDAC compliance without touching `PATH`).
2. **Prune stale `WinGet\Packages\...` `PATH` entries on upgrade/uninstall** so versioned subdirectories don't accumulate permanently.
3. **Warn before crossing ~3,800–4,094 combined `PATH` characters** when appending a new directory to `HKCU\Environment\Path`.
