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

A new entry is added to the menu every time the extension backend is re-initialized.

## Impact

The formatting menu becomes cluttered and confusing for the user.

## Environment Details

- **Extension**: dprint-vscode
- **OS**: Windows 11
- **Editor**: VS Code / Cursor

## Links

- **GitHub Issue**: https://github.com/the-dev-center/dprint-vscode/issues/1
