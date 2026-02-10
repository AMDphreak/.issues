## Description

The preview tab title shows `preview.unlocked.title` (and `preview.locked.title`) as literal strings instead of the localized text "Preview {filename}" when VS Code is set to English.

## Expected Behavior

Preview tab should display "Preview filename.adoc" (or "[Preview] filename.adoc" when locked).

## Actual Behavior

Preview tab displays the literal l10n message key "preview.unlocked.title" instead of the translated text.

## Root Cause

The `l10n/` folder contains translation bundles for German (`bundle.l10n.de.json`), French (`bundle.l10n.fr.json`), and Japanese (`bundle.l10n.ja.json`), but there is no English base bundle (`bundle.l10n.json`). 

When VS Code is set to English (or any unsupported language), the `vscode.l10n.t()` function cannot find a translation for message keys like `preview.unlocked.title` and falls back to displaying the key literally.

## Related

- Issue #964 discusses the recommended l10n approach of using English messages directly as keys rather than message IDs

## Steps to Reproduce

1. Install the AsciiDoc extension
2. Ensure VS Code is set to English
3. Open any `.adoc` file
4. Open the preview panel (Ctrl+Shift+V or "AsciiDoc: Open Preview")
5. Observe the tab title shows "preview.unlocked.title" instead of "Preview filename.adoc"

## Environment

- VS Code Version: 1.96.x
- AsciiDoc Extension Version: 3.4.5
- OS: Windows 11
