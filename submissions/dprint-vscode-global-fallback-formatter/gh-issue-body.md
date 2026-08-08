## Problem

The extension currently restricts formatting to files within active workspace folders. This prevents using dprint as a general-purpose formatter for files opened individually or outside the current project scope.

## Steps to Reproduce

1. Set `dprint.dprint` as the default formatter for a language (e.g., JSON or CSS) in VS Code settings.
2. Open **no workspace** (or a workspace that doesn't contain the file).
3. Open a file that is not in any active workspace folder (e.g. a file from a path that has `dprint.jsonc`).
4. Attempt to format the document.

## Expected Behavior

dprint should attempt to format the file, using a global configuration or a config found in the file's ancestor directories.

## Actual Behavior

The extension does not run when the file is not in an open workspace folder. When no folder is opened at all, the IDE shows: **"Extension 'dprint.dprint' is configured as formatter but not available."**

## Evidence

- **Sidebar:** shows "NO FOLDER OPENED" (no workspace loaded).
- **Dialog:** "Extension 'dprint.dprint' is configured as formatter but not available. Select a different default formatter to continue."
- **File:** e.g. a CSS file from a path that has `dprint.jsonc`; formatting is still unavailable because the folder is not loaded in the editor.

*(Screenshot: see comment below.)*

## Proposed Solution

Add a global fallback to WorkspaceService that attempts to format files using a root-level context. This would allow the dprint CLI to handle the file using its global configuration or ancestor matching.

- Add a global "fallback" folder service in `WorkspaceService.ts` for files not matched to any open workspace.
- The fallback service acts as if running from the file system root so dprint can resolve config (global or local to the file).

Related to dprint issue: https://github.com/dprint/dprint/issues/1091

**PR:** Not yet submitted. A commit exists in a fork; will open a PR and link it here.
