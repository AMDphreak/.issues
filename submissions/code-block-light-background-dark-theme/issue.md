## Description

Code blocks in the AsciiDoc preview display with a light background color even when VS Code is using a dark theme. This affects **two different types of code blocks**:

### Type 1: Syntax-highlighted blocks (with language specified)

```asciidoc
[source,bash]
----
pnpm dev
----
```

These blocks are processed by highlight.js. The extension defaults to the `github` theme (light) regardless of VS Code's color theme, resulting in white backgrounds.

### Type 2: Non-highlighted blocks (literal blocks, blocks without language)

```asciidoc
----
plain text without language
----
```

or literal blocks:

```asciidoc
....
literal block content
....
```

These blocks are NOT processed by highlight.js and are styled by `asciidoctor-default.css`, which has hard-coded light backgrounds (`#f7f7f8`).

## Expected Behavior

All code blocks should have dark backgrounds that match the VS Code dark theme.

## Actual Behavior

- **Type 1 blocks**: White background from `github` highlight.js theme
- **Type 2 blocks**: Light gray background (`#f7f7f8`) from hard-coded CSS

## Root Cause

### For Type 1 (highlight.js processed blocks):
The `highlightjs-adapter.ts` defaults to the `github` theme (light) regardless of VS Code's color theme. It should detect the theme and select `github-dark` when in dark mode.

### For Type 2 (non-highlighted blocks):
The `media/asciidoctor-default.css` file has hard-coded light backgrounds:
- Line ~566-576: `:not(pre):not([class^=L]) > code { background: #f7f7f8; }`
- Line ~1154-1156: `.literalblock pre, .listingblock > .content > pre { background: #f7f7f8 }`
- Line ~1208-1210: `.prettyprint { background: #f7f7f8 }`
- Line ~578-583: `pre { color: rgba(0, 0, 0, .9); }` (dark text, unreadable on dark backgrounds)

These rules lack `.vscode-dark` variants to override styling in dark mode.

## Related

- Issue #531 requests enabling source highlighting by default with a compatible dark/light theme

## Steps to Reproduce

1. Set VS Code to use a dark theme (e.g., "Dark+")
2. Open an AsciiDoc file with both block types:
   ```asciidoc
   [source,javascript]
   ----
   // Type 1: syntax-highlighted
   console.log("Hello");
   ----

   ----
   Type 2: no language specified
   ----

   ....
   Type 2: literal block
   ....
   ```
3. Open the preview panel
4. Observe both block types have light/white backgrounds

## Environment

- VS Code Version: 1.96.x
- AsciiDoc Extension Version: 3.4.5
- OS: Windows 11
