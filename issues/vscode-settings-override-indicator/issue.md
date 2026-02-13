# Request: Settings Editor: Indicator for Language-Specific Overrides

## Summary
The Settings GUI does not clearly indicate when a setting is overridden by a language-specific block.

## Details
Disclaimer: This issue was observed in Antigravity (a VS Code fork), but appears to be an upstream architectural limitation.

When a setting is overridden for a specific language in `settings.json` (e.g., `"[markdown]": { "editor.defaultFormatter": "..." }`), the Settings GUI does not clearly indicate this state when viewing the global/user scope. Users have to filter by `@lang:id` or check `settings.json` manually to understand why a setting might not be behaving as expected.

Steps to Reproduce:
1. Open `settings.json` and add a language-specific override:
   ```json
   "[markdown]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```
2. Open Settings GUI and navigate to `Editor: Default Formatter` (without filtering for markdown).
3. Observe that there is no indication that this setting is overridden for Markdown files.

Expected Behavior:
The Settings GUI should display an indicator (e.g., "Overridden for: Markdown") next to the setting, or provide a way to see all language-specific overrides for that setting.

## Example
![Example of missing indicator](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/why%20markdown-all-in-one%20as%20default%20markdown%20formatter%20in%20user%20settings.json.png)
