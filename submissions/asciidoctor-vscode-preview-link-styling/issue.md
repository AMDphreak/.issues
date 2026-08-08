## Description

The AsciiDoc preview panel has several link and theme-related styling issues that make it look inconsistent with the rest of VS Code and cause poor readability in dark mode.

### 1. Links always underlined

All links in the preview are rendered with `text-decoration: underline` by default. They should only be underlined on hover (or focus), matching the behavior of the built-in Markdown preview and common editor link styling.

### 2. Highlighted/selected links become dim (low contrast in dark mode)

When a link is highlighted (e.g. cursor over it or selected), its text becomes dimmer. In dark theme this reduces contrast and looks bad. Links should maintain readable contrast when hovered or selected—consider using the same approach as the Markdown preview (e.g. `textLink.foreground` / `textLink.activeForeground` from the workbench color theme).

### 3. Preview does not pull style hints from active VS Code theme well

The preview generally does not integrate well with the active VS Code color theme (e.g. code blocks, backgrounds, and link colors feel disconnected). Aligning with the Markdown preview plugin’s use of workbench colors (e.g. `editor.background`, `textLink.foreground`, etc.) would improve consistency.

## Expected Behavior

- Links: no underline by default; underline on `:hover` (and `:focus` where appropriate).
- Links: when hovered or selected, keep sufficient contrast (e.g. use theme’s link active color, avoid dimming).
- Preview: respect VS Code theme colors where possible (links, background, selection) so the preview feels integrated with the editor.

## Actual Behavior

- Links are always underlined.
- Highlighting/hovering links makes them dim, hurting contrast in dark mode.
- Preview styling feels disconnected from the active VS Code theme.

## Steps to Reproduce

1. Use a dark VS Code theme (e.g. Dark+).
2. Open an AsciiDoc file with several links (e.g. README.adoc with "Quick Start" and links like "pre-built UI bundle", "antora-playbook.yml").
3. Open the AsciiDoc preview (e.g. "Open Preview to the Side").
4. Observe: all links are underlined by default.
5. Hover or click a link and observe: link text becomes dimmer, reducing contrast.

## Screenshots

- Screenshot 1: Default link formatting (all links underlined).
- Screenshot 2: Hovered link showing dimmed, low-contrast appearance in dark mode.

## Related

- Built-in Markdown preview: link styling and theme integration can be used as a reference.
- <https://github.com/asciidoctor/asciidoctor-vscode/issues/983> (code blocks in dark theme) is a related preview/theme issue.

## Environment

- VS Code / Cursor: recent (e.g. 1.96.x)
- AsciiDoc extension: asciidoctor.asciidoctor-vscode (e.g. 3.4.x)
- OS: Windows 11
