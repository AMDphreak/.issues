# Issue: Semantically Unintuitive Command Actions

## Description
The literal syntax of nvm-windows' core commands fails to represent the behaviors they execute, which runs counter to common package manager expectations.

On the one hand, a sink that is in a house but not plugged up or accessible is not truly "installed", but on the other hand, if the sink is installed with other sinks with a manifold switch to turn on just one sink at a time, it is fully "installed." In software terms, a runtime or library dropped into an installation folder is accurately "installed" regardless of whether the system `PATH` proxy currently points to it.

When we look at other standard development tools, we see clear parallels:
- **`git`**: `git fetch` or `git pull` pulls data down, while `git switch` changes the current global structural state of your active tree.
- **`apt`**: `apt install` drops the binaries and libraries onto the disk (fully installing them), while `update-alternatives --set` handles selecting which symlink is globally active.
- **`docker`**: `docker pull` pulls down an image, but it doesn't activate anything until you transiently use it via `docker run` or run it continuously.

The current system creates immense confusion because `install`, `use`, and symlinks are being treated inconsistently. 

1. `nvm use` permanently mutates the global system symlink environment, affecting all side-by-side active terminals. The verb "use" natively implies an active, transient usage for the current session.
2. `nvm install` pulls down and extracts the payload into an isolated folder. Since NVM works by having many isolated folders (sinks) and one toggle (symlink switch), the payload is technically "installed" correctly when fetched. 

## Proposed Solution
Redistribute the actions logically to match expected verbal commands and other tooling conventions (like `git switch` or `update-alternatives --set`):
- `nvm install <version>`: Keeps its exact current behavior. It downloads, extracts, and "installs" the node runtime into `nvm-windows` version folders smoothly.
- `nvm switch <version>` or `nvm set <version>`: Sets the target version as the global operational Node.js configuration on Windows (managing the Symlinks).
- `nvm use <version>`: Restored to standard *POSIX `nvm`* expectations. It should explicitly set the `$PATH` in the local process tree temporarily, executing a transient shell so a developer can quickly try a script in a unique Node version without destroying the state of their other terminal tabs or the system global.
