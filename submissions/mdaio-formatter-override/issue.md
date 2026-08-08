## Description

The Markdown All in One (`yzhang.markdown-all-in-one`) extension overrides the user's `defaultFormatter` preference for Markdown files. Upon installation or update, it appears to inject a `[markdown]` block into the user's `settings.json` that sets `editor.defaultFormatter` to `yzhang.markdown-all-in-one`. This behavior is contentious as it overrides other preferred formatters (e.g., `dprint`) without explicit user consent.

## Steps to Reproduce

1. Set `"[markdown]": { "editor.defaultFormatter": "dprint.dprint" }` in user `settings.json`.
2. Install or update `yzhang.markdown-all-in-one`.
3. Check `settings.json`.
4. Observe that the `[markdown]` block has been modified or added to point to `yzhang.markdown-all-in-one`.

## Expected Behavior

Extensions should not modify user's `defaultFormatter` settings automatically. If they wish to suggest themselves as a formatter, they should do so via a non-intrusive recommendation or prompt.

## Actual Behavior

The extension asserts itself as the default formatter for the `[markdown]` language block in the user's global `settings.json`.

## Impact

- Overrides user-selected high-performance or preferred formatters.
- Can be difficult to notice if the user has many settings.
- Forces a specific formatting style that might not be desired.

## Environment Details

- **Extension**: yzhang.markdown-all-in-one
- **Editor**: Antigravity (VS Code Fork)
