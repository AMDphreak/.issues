# microsoft/winget-cli — AMDphreak PR descriptions

Local copies of pull request bodies for [microsoft/winget-cli](https://github.com/microsoft/winget-cli). Use these files with `gh pr edit <n> --body-file ...` so shell escaping does not corrupt Markdown (backticks, HRESULTs, paths).

| PR | Branch | Files |
|----|--------|-------|
| [#6096](https://github.com/microsoft/winget-cli/pull/6096) Report skipped upgrades (install technology mismatch) | `fix/upgrade-all-install-technology-summary` | [pr-6096-body.md](pr-6096-body.md) |
| [#6097](https://github.com/microsoft/winget-cli/pull/6097) Verify installed version after upgrade | `fix/verify-upgrade-installed-version` | [pr-6097-body.md](pr-6097-body.md) |
| [#6098](https://github.com/microsoft/winget-cli/pull/6098) Defer success until post-install checks | `fix/defer-install-success-after-checks` | [pr-6098-body.md](pr-6098-body.md) |

## Fixes applied (2026-03-21)

- Replaced mistaken backslash-wrapped identifiers with Markdown **inline code** (backticks).
- Restored [#6097](https://github.com/microsoft/winget-cli/pull/6097) body (it had been truncated at the HRESULT line, likely due to unescaped `(` `)` in `gh pr create`).
