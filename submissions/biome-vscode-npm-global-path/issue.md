---
issue_url: https://github.com/biomejs/biome-vscode/issues/944
pr_url: https://github.com/biomejs/biome-vscode/pull/947
original_report_url: https://github.com/biomejs/biome-vscode/issues/926
type: bug
status: open
---

# Biome VS Code Extension Fails to Find Global pnpm/bun Install & Windows PATH Shim

## Description

The `biome-vscode` extension fails to locate a global Biome installation (e.g., installed via `pnpm` or `bun`) due to two issues:

1.  **Global Module Resolution Logic:** The `findBiomeInGlobalNodeModules` method in `src/locator.ts` performs an early `return` when it encounters a missing path for any package manager (e.g. if `npm` is not configured), instead of `continue`-ing to check the next one.
2.  **Windows PATH Shim:** When falling back to the system `PATH` search on Windows, the extension only looks for `biome.exe`. However, global packages installed via `npm` or `pnpm` typically expose a `biome.cmd` shim, not the executable directly.

## Bug Proof

![Bug Proof](./biome-vscode-bug.png)

## Resolution

A PR has been submitted to fix both issues:
1.  Replaced the `return` with a `continue` in the module resolution loop.
2.  Added a specific check for `biome.cmd` when searching the `PATH` on Windows.

- **PR:** https://github.com/biomejs/biome-vscode/pull/947
- **Issue:** https://github.com/biomejs/biome-vscode/issues/944
