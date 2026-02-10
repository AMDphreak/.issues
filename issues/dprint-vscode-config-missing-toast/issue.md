# Issue: Misleading Toast Notification when Config File is Missing

## Description

When the dprint extension fails to find a configuration file (`dprint.json` or `dprint.jsonc`), it does not register its formatting providers. This causes VS Code to display its own generic error message when a user attempts to format a document:

`Extension 'Dprint Code Formatter' is configured as formatter but it cannot format '<Language>'-files`

The user describes this as "dprint can't format `<blah>` file type," which they correctly identify as false. Dprint *can* format those files; it just lacks the configuration to do so.

## Steps to Reproduce

1. Set `dprint.dprint` as the default formatter for a language (e.g., JSON) in VS Code settings.
2. Open a workspace that does NOT have a `dprint.json` file.
3. Open a JSON file and trigger "Format Document".
4. Observe the misleading toast notification.

## Expected Behavior

The notification should be more intelligent and explain that no configuration file was found, potentially offering to run `dprint init`.

## Actual Behavior

VS Code shows a generic "cannot format" error because the extension silently failed to initialize its formatting providers.

## Proposed Strategy

1. Always register a "catch-all" or "diagnostic" formatting provider if no configuration is found, but only if the user has explicitly selected dprint as a formatter or if we are in a valid workspace.
2. Alternatively, show a specific warning toast during initialization IF it's likely the user intends to use dprint (e.g., they have dprint settings configured).
3. Intercept the formatting request and show a helpful dialog: "Dprint: No configuration file found. Would you like to create one?"

## Links

- Main GitHub Issue: <https://github.com/dprint/dprint-vscode/issues/134>
- PR: <https://github.com/dprint/dprint-vscode/pull/135>
