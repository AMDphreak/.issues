## Description

When a markdown code block (fenced with triple backticks) contains markdown syntax, the editor incorrectly highlights the markdown syntax inside the code block as if it's part of the source file's markdown syntax, rather than treating it as literal text within a code block.

## Expected Behavior

Markdown syntax inside a code block should be treated as literal text and not highlighted or parsed as markdown. The code block should be rendered as plain text, and any markdown syntax within it should be displayed verbatim without any special highlighting or interpretation.

## Actual Behavior

The editor's markdown parser incorrectly interprets markdown syntax inside code blocks, causing:
- Incorrect syntax highlighting
- Markdown elements inside code blocks being treated as actual markdown (e.g., headers, lists, links)
- Visual confusion where code block content appears to be part of the document structure

## Steps to Reproduce

1. Create a markdown file
2. Add a code block containing markdown syntax (e.g., headers, lists, links)
3. Observe that the markdown syntax inside the code block is highlighted/parsed as if it's part of the document

## Example

```markdown
## Some Section

Here's a code block with markdown inside:

```markdown
# This header is incorrectly highlighted
- This list item is incorrectly highlighted
[This link](url) is incorrectly highlighted
```

## Impact

This bug makes it difficult to:
- Write documentation that includes markdown examples
- Create tutorials showing markdown syntax
- Display markdown code snippets accurately
- Distinguish between actual markdown and markdown examples

## Environment

* Editor: Cursor / VS Code
* OS: Windows 11
* Markdown extension: [current version]

