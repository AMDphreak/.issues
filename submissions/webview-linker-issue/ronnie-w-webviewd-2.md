---
title: Improving the Windows developer experience (Webview library linkage)
repository: ronnie-w/webviewd
issue_number: 2
url: https://github.com/ronnie-w/webviewd/issues/2
submitted: 2026-03-22
---

### Problem Description

Building Dlang projects that depend on `webview` bindings frequently fails on Windows (specifically with LDC2/DUB) with the following errors:

- `LNK1181: cannot open input file 'webview.lib'`
- `LNK2019: unresolved external symbol ...`

This occurs because the D weight/wrapper Expects the user to have already manually compiled and path-configured the underlying C++ `webview` library, which is a significant barrier to entry for D developers on Windows.

### Proposed Solution

Adopt a more user-friendly distribution model similar to what is currently implemented in `ggwebview`. This can be achieved in two ways:

1. **Bundled Binaries**: Include precompiled `.lib` files for common Windows architectures (x64, ARM64) directly within the package (e.g., in a `libs` or `precompiled` directory).
2. **Auto-Download Script**: Use a `preGenerateCommands` or `preBuildCommands` hook in `dub.json` to automatically fetch the appropriate binary for the user's platform from GitHub Releases during the first build.

### Related Issues

- <https://github.com/trikko/guino/issues/3>
- <https://github.com/thechampagne/webview-d/issues/5>
