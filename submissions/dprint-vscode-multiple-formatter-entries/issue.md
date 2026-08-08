## Description

The dprint VS Code extension often shows multiple entries for 'Dprint Code formatter' in the 'Format with...' dialog. This occurs when the extension re-initializes (e.g., after saving `dprint.json` or changing settings) because it registers a new formatting provider without disposing of the previous ones.

## Steps to Reproduce

1. Open a workspace with dprint configured.
2. Edit and save `dprint.json` multiple times.
3. Right-click in an editor and select "Format Document With...".
4. Observe multiple identical "Dprint Code formatter" entries.

![Multiple entries example](./screenshots/dprint%20multiple-entries.png)

## Expected Behavior

Only one "Dprint Code formatter" entry should be present in the formatting menu, even after multiple configuration reloads.

## Actual Behavior

1. Multiple identical "Dprint Code formatter" entries are added to the menu every time the extension backend is re-initialized.
2. The extension host often crashes or enters an infinite re-initialization loop with the error `Editor service failed reading from stdin: failed to fill whole buffer`. This is caused by a race condition where new initialization starts before the old one has fully cleaned up.

![Crash from multiple startup race](./screenshots/dprint%20crash%20from%20multiple%20startup%20race.png)

## Impact

The formatting menu becomes cluttered, and the extension becomes unstable or enters a CPU-intensive loop of failed restarts.

## Environment Details

- **Extension**: dprint-vscode
- **OS**: Windows 11
- **Editor**: VS Code / Cursor

## Links

- **Main GitHub Issue**: https://github.com/dprint/dprint-vscode/issues/132
- **PR**: https://github.com/dprint/dprint-vscode/pull/133
