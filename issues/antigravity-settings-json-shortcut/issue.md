## Description

The Antigravity Settings GUI lacks a direct shortcut or "Edit in settings.json" link for individual settings, especially when a setting is found to be defined in a specific configuration file. Users must manually open `settings.json` and search for the key to make precise manual edits.

## Steps to Reproduce

1. Open the Settings GUI.
2. Navigate to any setting.
3. Observe that there is no obvious link or button to jump directly to the line in `settings.json` where this setting is (or would be) defined.

## Expected Behavior

Each setting in the GUI should provide a "jump-to" link (e.g., "Edit in settings.json") that opens the JSON file at the correct line. This is a standard feature in many advanced IDEs and exists in some versions of VS Code but is missing or non-obvious in certain Antigravity views.

## Actual Behavior

The user must manually navigate to the `settings.json` file, which is a "stupid design decision" that hinders productivity.

## Impact

- Friction in configuring the IDE.
- Harder to manage complex JSON-only settings (like language blocks).

## Environment Details

- **Editor**: Antigravity (VS Code Fork)
