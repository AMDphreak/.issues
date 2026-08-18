## Summary

Hi! On Windows, Settings → Providers reports every local CLI as missing (`cursor-agent`, `opencode`, `grok`, `codex`, …) even when those binaries are on User PATH and a new PowerShell window can run them. Restarting T3 does not help.

This is Windows-only. Electron inherits a stale process PATH, and the PowerShell probe used `[Environment]::GetEnvironmentVariable('PATH')` (process env), not User/Machine registry. macOS/Linux login-shell probing is a different path.

This PR tries to make User PATH visible to every provider detector:

- Read HKCU/HKLM `Path` via `reg.exe` (does not depend on spawning PowerShell)
- Merge that persistent User+Machine PATH in both the server `fixPath` path and the desktop shell
- Also fix the PowerShell capture to merge Machine + User + Process, for probes that still use it

Fixes #7360

Happy to adjust anything that doesn’t fit the project’s taste.

## Test plan

- [x] `vp test run packages/shared/src/shell.test.ts apps/desktop/src/shell/DesktopShellEnvironment.test.ts`
- [ ] On Windows desktop: with `opencode` / `grok` / `codex` / `cursor-agent` on User PATH, launch T3 from a stale process PATH; those providers should become installed/ready without `binaryPath` overrides

Made with Cursor (Auto).
