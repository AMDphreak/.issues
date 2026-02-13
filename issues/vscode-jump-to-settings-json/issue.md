# Request: Settings Editor: 'Edit in settings.json' Shortcut for Individual Settings

## Summary
There is no direct way to jump to the specific line of a setting in `settings.json` from the Settings GUI.

## Details
Disclaimer: This issue was observed in Antigravity (a VS Code fork), but appears to be an upstream architectural limitation.

When viewing a setting in the Settings GUI, it is not possible to quickly identify or jump to the location of that setting in `settings.json`. This makes it difficult to quickly verify or edit complex settings that are better managed in JSON.

Expected Behavior:
Add a "Jump to settings.json" or "Edit in settings.json" button contextually next to each setting in the Settings GUI, which opens `settings.json` and scrolls to the specific line where that setting is defined.

## Example
![Context needed](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/where%20is%20markdown%20default%20setting%20from%20user%20settings.json.png)
