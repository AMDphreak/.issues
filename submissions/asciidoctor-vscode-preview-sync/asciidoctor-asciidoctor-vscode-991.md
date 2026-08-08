---
title: "Preview does not sync with editor scroll/cursor properly"
repository: asciidoctor/asciidoctor-vscode
issue_number: 991
url: https://github.com/asciidoctor/asciidoctor-vscode/issues/991
submitted: 2026-03-07
updated: 2026-03-07
---

## Description

The AsciiDoc preview does not sync properly with the source editor. When scrolling or moving the cursor in the editor, the preview does not reliably scroll to the corresponding position (and/or the reverse). This makes it hard to keep the preview in sync with the section of the document being edited.

## Expected Behavior

With "Scroll Preview With Editor" (and optionally "Scroll Editor With Preview") enabled, the preview viewport should track the editor cursor/scroll position so that the visible preview region corresponds to the visible source region (and vice versa when scrolling the preview).

## Actual Behavior

The preview and editor get out of sync: scrolling in the editor does not reliably update the preview scroll position, and the mapping between source lines and rendered blocks appears off (e.g. a line in the source does not align with the correct heading or block in the preview). This is especially noticeable with longer documents and when using blocks like `[tabs]` that render to multiple elements.

## Steps to Reproduce

1. Open an AsciiDoc file with multiple sections (e.g. README.adoc with "Quick Start", "Method 1", "Method 2", "Method 3", and a `[tabs]` block).
2. Open "Preview to the Side".
3. Ensure "Scroll Preview With Editor" (and "Scroll Editor With Preview" if desired) is enabled in settings.
4. Scroll the editor to a specific section (e.g. "Method 3") and/or place the cursor there.
5. Observe: the preview often does not scroll to the matching location, or the alignment is wrong (e.g. the green sync line in the screenshot points from source line 76 to the wrong place in the preview, and the `[tabs]` block in source does not align with its rendered output).

## Screenshots

- Screenshot: Editor and preview side by side with annotations showing misalignment between source (e.g. line 76, `[tabs]` on line 79) and the rendered preview (vertical blocks instead of tabs, and scroll/sync not matching).

## Related

- <https://github.com/asciidoctor/asciidoctor-vscode/issues/992>: `[tabs]` is rendered as a single block with sections stacked vertically instead of interactive tabs; that different rendering can also affect sync (source line vs. preview block mapping).

## Environment

- VS Code / Cursor: recent (e.g. 1.96.x)
- AsciiDoc extension: asciidoctor.asciidoctor-vscode (e.g. 3.4.x)
- OS: Windows 11
