---
title: "[Bug]: Windows reports every provider CLI not found even when they are on User PATH"
repository: pingdotgg/t3code
issue_number: 7360
url: https://github.com/pingdotgg/t3code/issues/7360
submitted: 2026-08-17
---

### Before submitting

- [x] I searched existing issues and did not find a duplicate.
- [x] I included enough detail to reproduce or investigate the problem.

### Area

apps/desktop

### Steps to reproduce

1. On Windows, install any T3 provider CLI so it is on **User** PATH (winget, official `irm` installer, npm). Confirm a **new** PowerShell window can run it (`Get-Command opencode`, `grok`, `codex`, `cursor-agent`, …).
2. Launch T3 Code from the desktop shortcut / Start Menu (not from that shell).
3. Open Settings → Providers.

### Expected behavior

Each installed CLI is found (`opencode`, `grok`, `codex`, `cursor-agent`, `claude`, …) without setting an absolute `binaryPath`.

### Actual behavior

Every local provider stays red / **Not found**, even when the same binaries were on User PATH before T3 was installed. A refreshed PowerShell session finds them. Restarting T3 does not help.

This is Windows-only. Electron inherits a stale process PATH. The Windows environment probe uses `[Environment]::GetEnvironmentVariable('PATH')` (process env), not User/Machine registry. macOS/Linux login-shell probing is a different path and is not this bug.

On this machine the CLIs are present:

```text
cursor-agent → %LOCALAPPDATA%\cursor-agent\cursor-agent.cmd
opencode     → %LOCALAPPDATA%\Microsoft\WinGet\Links\opencode.exe
grok         → %LOCALAPPDATA%\Microsoft\WinGet\Links\grok.exe
codex        → %LOCALAPPDATA%\Microsoft\WinGet\Links\codex.exe
```

T3 looks for `cursor-agent`, `opencode`, `grok`, `codex`, and `claude`. User PATH includes `%LOCALAPPDATA%\Microsoft\WinGet\Links` and `%LOCALAPPDATA%\cursor-agent`.

### Impact

Major degradation or frequent failure

### Version or commit

Current Windows desktop (reproduced 2026-08-17)

### Environment

- OS: Windows 11 (Build 26200)
- Shell: PowerShell 7
- T3 Code desktop Settings → Providers
- Provider CLIs on User PATH via WinGet Links and the official Cursor CLI installer

### Workaround

Set each provider `binaryPath` to the absolute executable, or launch T3 from a shell whose process PATH already includes User PATH.

### Related

- #4846 (closed) — same stale User PATH probe; Claude was papered over by adding `~\.local\bin`
- #6352 — mid-session install + Refresh still misses a newly added User PATH entry
- #4569 — adds `%LOCALAPPDATA%\cursor-agent` in `packages/shared` only
