---
title: "Logic Errors: Installation Blockers, Confusing Upgrade Messages, and Inefficient Backend Switches"
repository: Acly/krita-ai-diffusion
issue_number: 2388
url: https://github.com/Acly/krita-ai-diffusion/issues/2388
submitted: 2026-03-20
---

# Logic Errors in Server Management

## Summary

The Krita AI Diffusion plugin has several logic issues in its server installation and upgrade flow:

1. It blocks installation if the target directory is not empty, even if no previous installation is detected.
2. It displays confusing version messages (v1.48.0 -> v1.48.0) when only the backend context changes.
3. It performs a full re-install (backup and re-extraction) of the backend server when only a backend change (CPU <-> GPU) occurs, instead of just updating the virtual environment.

## Observed Behavior

- Users are prompted to "upgrade" when switching from CPU to GPU, with a status message showing identical versions.
- Installation fails with an "Invalid location" error if the `ComfyUI` folder already exists but the `.version` file is missing.
- Switching backends is slow and wastes disk space by creating multiple backup folders.

## Analysis

The issues stem from:

- A strict `can_install` check that doesn't account for partially setup folders.
- Monolithic installation methods that couple file extraction with dependency setup.
- UI state logic that equates a `backend_mismatch` status only with a version upgrade.

## Resolution

Fixed in the [AMDphreak fork](https://github.com/AMDphreak/krita-ai-diffusion) by:

- Relaxing the installation folder check.
- Refactoring the installation process into granular steps (extraction vs. dependency update).
- Updating the UI to distinguish between "Update" (backend change) and "Upgrade" (version change).
