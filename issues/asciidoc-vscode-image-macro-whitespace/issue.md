## Description

Two related issues in the AsciiDoc VS Code extension (asciidoctor-vscode) when using image macros:

1. **Syntax highlighting breaks with leading or trailing whitespace (block form `image::`)**  
   For **block** image macros (`image::path[]`), the editor normally highlights the macro name, colons, brackets, and attribute contents. As soon as there is **one or more leading or trailing spaces** on the line, that highlighting is lost (only brackets remain). This affects **block** form because the grammar matches it with a line-anchored pattern (`^...$`). The **inline** form (`image:`) uses a different pattern (no line anchors) and works in a paragraph—e.g. three `image:...[]` on one line with spaces between them: syntax highlighting and rendering both work.

2. **Preview renders only the first image in some scenarios**  
   When using **block** form (`image::`) on one line with multiple images or with trailing/leading space, the preview may render only the first image. Using **inline** form (`image:`) for multiple images in one paragraph is the correct AsciiDoc approach and works in the preview; the bug appears with block form or certain spacing.

## Expected Behavior

- Leading or trailing whitespace on a line containing an image macro (block or inline) should not remove syntax highlighting for the macro name, colons, or attribute list.
- Multiple inline images on one line (e.g. `image:a.png[] image:b.png[]`) should all render in the preview.
- Trailing (or leading) space on a line with a single image should not affect rendering.

## Actual Behavior

- With even one trailing or leading space on the image-macro line, the "image" tag, colons, and bracket contents lose their macro highlighting (only brackets remain highlighted).
- When inlining two or more images or adding trailing whitespace, the preview shows only the first image.

## Root Cause

### Syntax highlighting (TextMate grammar)

In `syntaxes/asciidoc.tmLanguage.json`, block macros (including `image::`) are matched by `#general-block-macro`:

```json
"match": "^(\\p{Word}+)(::)(\\S*?)(\\[)((?:\\\\\\]|[^\\]])*?)(\\])$"
```

The pattern is anchored with `^` and `$`, so the **entire line** must be exactly the macro with no leading or trailing whitespace. Any space before or after the macro causes the pattern not to match, so the line is not scoped as a block macro and only other rules (e.g. matching `[` and `]` elsewhere) apply.

Inline `image:` and `icon:` macros use `#image-macro`, which has no line anchors, so they work correctly in a paragraph (multiple per line, spaces between). The bugs above are thus specific to **block** form (`image::`) and/or block-style usage.

### Rendering (preview)

The preview (Asciidoctor.js or the extension’s webview) appears to render only the first inline image when multiple images are on one line or when there is trailing whitespace. This may be a bug in how the extension invokes the parser, how the parser handles multiple inline macros on a single line, or how the HTML is generated/inserted.

## Workaround

For multiple images side by side (e.g. badges), use **inline** form in one paragraph: `image:url1[alt1] image:url2[alt2] image:url3[alt3]`. No table needed; syntax highlighting and preview both work.

## AsciiDoc: why `image:` vs `image::`

- **`image:`** (one colon) = inline macro. Lives in the flow of text (paragraph, table cell, etc.). Multiple can appear on one line. Grammar pattern has no line anchors, so it is not sensitive to leading/trailing space on the line.
- **`image::`** (two colons) = block macro. Stands on its own line as a block. The extension grammar matches it with `^...(macro)...$`, so the entire line must be the macro; any leading/trailing space breaks the match and thus highlighting (and in some cases affects what the preview renders).

## Related

- AsciiDoc image macros: https://docs.asciidoctor.org/asciidoc/latest/macros/images/
- Extension repo: https://github.com/asciidoctor/asciidoctor-vscode (syntax grammar in `syntaxes/asciidoc.tmLanguage.json`)

## Steps to Reproduce

### Syntax highlighting

1. Open an `.adoc` file in VS Code with the AsciiDoc extension.
2. Add a block image on its own line with no trailing space: `image::https://example.com/img.png[Alt]`
3. Confirm "image", "::", the URL, and "[Alt]" are highlighted.
4. Add one space after `]` (or one space before `image`).
5. Observe that only the brackets remain highlighted; "image", "::", and contents lose macro highlighting.

### Preview (second image not rendering)

1. In the same file, add a line with two inline images: `See image:foo.png[] and image:bar.png[] here.`
2. Open the AsciiDoc preview.
3. Observe whether both images render; if only the first does, the render bug is present.

## Suggested fix (grammar)

- Relax the block-macro pattern to allow optional leading/trailing whitespace, e.g. change the match to something like `^(\s*)(\p{Word}+)(::)(\S*?)(\[)((?:\\\]|[^\]])*?)(\])(\s*)$` and keep the same capture indices for the macro name, colons, target, and brackets (so existing scope names still apply), or equivalent that does not require the line to be exactly the macro.
- Ensure inline image/icon macros are matched even when followed by space and another macro on the same line (no requirement that the macro be at EOL or followed by a specific character).

## Environment

- VS Code Version: (e.g. 1.96.x)
- AsciiDoc Extension: asciidoctor.asciidoctor-vscode (e.g. 3.4.5)
- OS: Windows 11
