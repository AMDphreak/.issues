## Description

AsciiDoc’s `[tabs]` syntax (from the `@asciidoctor/tabs` extension) is central to documentation (e.g. showing install commands for npm, pnpm, Yarn, Bun in separate tabs). In the AsciiDoc preview, `[tabs]` is not rendered as interactive tabs; instead, all tab panels are shown as one block with sections stacked vertically. This reduces readability and does not match the intended UX of tabbed content.

## Expected Behavior

Content under `[tabs]` should render in the preview as interactive tabs: a row of tab labels (e.g. "npm", "pnpm", "Yarn", "Bun") and one visible panel at a time, with clicking a label switching the visible panel. Behavior and styling should be suitable for tight integration with the rest of the preview (e.g. theme-aware).

## Actual Behavior

The preview renders the entire `[tabs]` block as a single block with all sections visible one after the other (vertically serialized). There are no tab controls, and the structure is not recognizable as tabbed content.

## Steps to Reproduce

1. Enable Antora/AsciiDoc support and ensure `@asciidoctor/tabs` is available (e.g. via playbook or extension config).
2. In an AsciiDoc file, add a `[tabs]` block with multiple tab items, e.g.:

```asciidoc
[tabs]
====
npm::
+
[source,bash]
----
npm install --save-dev antora-dark-theme
----

pnpm::
+
[source,bash]
----
pnpm add -D antora-dark-theme
----

Yarn::
+
[source,bash]
----
yarn add -D antora-dark-theme
----

Bun::
+
[source,bash]
----
bun add -D antora-dark-theme
----
====
```

3. Open the AsciiDoc preview.
4. Observe: all four sections appear in one vertical block with no tab UI.

## Screenshots

- Screenshot: Source showing `[tabs]` on line 79 and the corresponding preview rendering as a single block with npm, pnpm, Yarn, Bun sections stacked vertically instead of as tabs.

## Related

- This is a feature request for the preview only; Antora/site builds may already render tabs correctly when the tabs extension is used.
- Preview sync issue: incorrect rendering of `[tabs]` can also affect editor–preview line/block mapping.

## Environment

- VS Code / Cursor: recent (e.g. 1.96.x)
- AsciiDoc extension: asciidoctor.asciidoctor-vscode (e.g. 3.4.x)
- OS: Windows 11
