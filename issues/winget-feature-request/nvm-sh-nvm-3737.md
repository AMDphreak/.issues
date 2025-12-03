---
title: Feature Request: Host nvm on Windows Package Manager (winget)
repository: nvm-sh/nvm
issue_number: 3737
url: https://github.com/nvm-sh/nvm/issues/3737
submitted: 2025-12-03
---

## Summary
Add nvm to the Windows Package Manager (winget) repository to enable easy installation on Windows via winget install nvm.

## Motivation
Currently, Windows users must manually download and install nvm-windows or use alternative methods. Adding nvm to winget would provide:
- Standardized installation across Windows systems
- Easy updates via winget upgrade nvm
- Better integration with Windows package management ecosystem

## Proposed Solution
Create and maintain a winget manifest for nvm, making it available in the official winget repository.

## Additional Context
- winget is the official Windows package manager included in Windows 10/11
- This would complement existing installation methods, not replace them
- For automated submission on release, consider using the [WinGet Releaser GitHub Action](https://github.com/marketplace/actions/winget-releaser)
