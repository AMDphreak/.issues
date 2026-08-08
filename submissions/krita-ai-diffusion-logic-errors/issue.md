# Logic Errors in Server Installation and Upgrade

The Krita AI Diffusion plugin contains several logic and UX issues in its server management code, particularly related to installation folder detection, version reporting during backend switches, and inefficient update procedures.

## Symptoms:

1. **Confusing Upgrade Prompts**: When switching between CPU and GPU (DirectML), the plugin often prompts for an "upgrade" from version X to version X (e.g., "Upgrade required: v1.48.0 -> v1.48.0"). This is confusing to users as the version has not actually changed.
2. **Blocked Installation on Existing Directories**: If a `ComfyUI` folder already exists but no `.version` file is found (e.g., from an incomplete or manual installation), the plugin blocks new installations with an error: "Invalid location: directory is not empty, but no previous installation was found".
3. **Inefficient Backend Switches**: Switching between CPU and GPU (e.g., CUDA to DirectML) triggers a full re-extraction of ComfyUI and a move of the existing folder to a backup `upgrade-X.Y.Z` directory, even if the ComfyUI version is the same. Ideally, it should only update the Python environment (PyTorch etc) to match the new backend.

## Investigative Findings:

### confusing Upgrade Prompts

In `ai_diffusion/ui/server.py`, the `update_ui` method unconditionally shows the "Upgrade required" text with the version transition if the server state is `update_required`, which can be triggered merely by a backend mismatch.

### Blocked Installation

The `can_install` property in `ai_diffusion/server.py` and the corresponding UI check in `ui/server.py` enforce that the directory must be empty or already have an "incomplete" version to allow the "Install" button to be enabled.

### Inefficient Backend Switches

The `upgrade` method in `server.py` is hardcoded to backup the current `ComfyUI` folder and re-extract it, regardless of whether the target version is already satisfied. Furthermore, `_install_comfy` is a monolithic method that couples ComfyUI extraction and dependency installation, making it impossible to refresh the virtual environment without re-extracting the core files.

## Resolution:

These issues were fixed in the [AMDphreak fork](https://github.com/AMDphreak/krita-ai-diffusion) by refactoring the installation process to allow dependency-only updates and relaxing the installation directory checks.
