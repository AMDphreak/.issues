## Description

The Antigravity Settings GUI (Settings editor) fails to discover and display settings that are manually defined in `settings.json` if they are not explicitly registered in the current schema or if they correspond to language-specific blocks that the GUI does not correctly parse or show as "overridden".

## Steps to Reproduce

1. Manually add a language-specific block to `settings.json`, e.g., `"[markdown]": { "editor.defaultFormatter": "some.formatter" }`.
2. Open the Settings GUI.
3. Search for "Markdown Formatter" or look for that specific override.
4. The GUI may not show that this specific setting is currently being driven by a manual entry in `settings.json`.

## Expected Behavior

The Settings GUI should reflect any and all settings defined in the `settings.json` file, even if they are language-specific overrides or "contentious" defaults. It should clearly indicate where the value is coming from.

## Actual Behavior

The GUI sometimes fails to populate or accurately represent settings that are asserting a default value from within the JSON file, making it hard for users to debug configuration overrides.

## Impact

- Users struggle to identify why a certain setting is active.
- Reduced visibility into "stealth" configuration changes made by extensions.
- Breakdown in trust between the GUI and the actual configuration file.

## Environment Details

- **Editor**: Antigravity (VS Code Fork)
