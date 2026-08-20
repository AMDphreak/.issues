Adding a new script entry to `package.json` without a trailing comma on the previous line produces confusing Biome parse diagnostics in the editor (tokens like `nextjs` and `"kageManager"`), and those squiggles can linger after the file is fixed and manually saved. The real fix is one missing comma, but the IDE experience makes that hard to see.

## Environment

- Biome `@biomejs/biome` **2.3.13** (project devDependency)
- Editor: **Cursor** (VS Code fork), Autosave enabled; manual save also tried during repro
- OS: Windows 11
- File: root `package.json` in a pnpm workspace

## Repro

1. Start from a valid `package.json` whose `scripts` object ends with one entry (no trailing comma on that entry — valid JSON).
2. Add a new script on the next line **without** adding a comma after the previous entry:

```json
{
  "scripts": {
    "vercel:deploy:prod": "pnpm dlx vercel@latest deploy . --prod --yes"
    "dev": "pnpm --prefix site-nextjs dev"
  },
  "packageManager": "pnpm@11.17.0"
}
```

3. Observe Biome diagnostics in the editor Problems panel / squiggles.

## What we saw in the IDE (source: `biome`)

Instead of a single clear “missing comma before `\"dev\"`” message, Biome emitted a cluster of parse errors such as:

- `Property key must be double quoted`
- `Minus must be followed by a digit`
- `expected ',' but instead found 'nextjs'`
- `expected ':' but instead found 'dev'`
- `expected ',' but instead found '"kageManager"'`

Squiggles appeared on the `"dev"` script value and on `"packageManager"` even though the actual syntax error is the missing comma after the prior script line.

![Confusing parse-error tooltip in editor](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/biome-json-parse-diagnostics/01-confusing-parse-errors-tooltip.png)

## CLI vs IDE

Running the same broken content through CLI is clearer (though the hint is still wrong):

```text
pnpm exec biome check broken-package.json

× expected `,` but instead found `"dev"`
  i Remove "dev"
```

So CLI surfaces one primary location; the IDE showed additional recovery/cascade noise and highlighted unrelated tokens (`nextjs`, fragments of `packageManager`).

## Stale diagnostics after fix

After adding the missing comma (valid JSON again), editor squiggles **did not clear immediately**. Manual save during the repro also did not instantly refresh diagnostics — they cleared only after some delay and/or running `biome format --write` on the file.

![Stale squiggles while file content is already fixed](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/biome-json-parse-diagnostics/02-stale-squiggles-after-fix.png)

Autosave was on, so this does not look like “disk vs unsaved buffer” drift; it looks like LSP diagnostic publish lag / stale state after a fast edit/fix cycle.

## Expected

1. **Primary diagnostic** at the missing comma (before the next property key), e.g. “Expected `,` before `\"dev\"`”.
2. **Actionable hint** — for missing-comma cases, suggest *adding* a comma; do not suggest `Remove "dev"`.
3. **No cascade noise** — suppress downstream parse recovery errors once the member-list comma error is reported (avoid mis-parsing string contents like `--prefix site-nextjs`).
4. **Prompt LSP refresh on save** — after a valid save, clear/replace prior parse diagnostics quickly so fixed files do not keep red squiggles.

## Suggested implementation notes

- `crates/biome_parser/src/diagnostic.rs` — `ExpectedToken` always hints `Remove {token}`; special-case expected `,` to hint adding a comma before the next token.
- `crates/biome_json_parser/src/syntax.rs` — after first failed `expect(T![,])` in an object member list, consider virtual comma recovery or suppress further comma-expect diagnostics until `}` resync.
- `crates/biome_lsp/src/session.rs` — ensure save/fix paths publish cleared diagnostics immediately (related to biome-vscode#817 / PR #8260; may still lag with debounce — see #10768 / PR #10770).

## Related

- https://github.com/biomejs/biome/pull/8260 (didSave reload)
- https://github.com/biomejs/biome/issues/10768 (diagnostics out of sync / debounce)
- https://github.com/microsoft/vscode/issues/135682 (built-in JSON “Expected comma” — different source, similar UX pain)

Happy to retest on a Biome nightly or provide a minimal repo if helpful.
