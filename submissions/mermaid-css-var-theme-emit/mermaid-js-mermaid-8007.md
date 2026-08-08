---
title: Emit theme colors as CSS vars with fallbacks; add webCompatibility SVG normalize for prerender
repository: mermaid-js/mermaid
issue_number: 8007
url: https://github.com/mermaid-js/mermaid/issues/8007
submitted: 2026-07-29
---

Mermaid derives theme colors with khroma (`lighten` / `adjust` / `darken` / `invert`) from **concrete** color values. That means `themeVariables: { primaryColor: 'var(--brand)' }` **cannot work** as a full render-time solution: khroma has nothing to lighten.

#6860 asks Mermaid to accept CSS variables as _inputs_ to `themeVariables`. That is a different (and weaker) ask. Even if input parsing softens, derivation still needs resolved colors. Build-time / prerender pipelines need the opposite: **render with concrete colors, emit `var(--mermaid-<slot>, <resolvedFallback>)` in the SVG.**

Related sanitizer work (#6256 / #6261) does not solve theme emission for prerendered assets.

## Demand

Ship first-class prerender / host-theme support:

1. **`cssVariableTheme` (name bikesheddable)** — after styles and SVG are generated with concrete themeVariables, rewrite theme color occurrences in embedded `<style>` **and** presentation attributes (`fill`, `stroke`, etc.) to:

   ```text
   var(--mermaid-primaryColor, #ECECFF)
   ```

   - Default prefix `--mermaid-`.
   - Public, documented handles for theme slots so design-system hosts can override `--mermaid-*` without re-rendering.
   - Boolean or `{ prefix?: string }` config shape is fine.

2. **`webCompatibility` (name bikesheddable)** — render/cleanup option that normalizes SVG for responsive web embedding:
   - Ensure `viewBox` when it can be derived from bbox / numeric width+height.
   - Set `width="100%"` / `height="auto"` (or remove fixed height) while keeping aspect ratio stable via `viewBox` + `preserveAspectRatio`.
   - Optionally strip hardcoded backgrounds that fight host light/dark themes.

3. Document that this is **emit-time CSS vars with fallbacks**, not CSS vars as themeVariable _inputs_. Explicitly distinguish from #6860.

## Why upstream, not only a stripper

An external post-processor works today (see `@openshellorg/mermaid-svg-css-vars`). Mermaid should still own the emit mode so `mermaid.render` / `mmdc` users get correct output without a second toolchain. Duplicate thin logic in-core is acceptable; do not block on an external dependency.

## References

- <https://github.com/mermaid-js/mermaid/issues/6860> — CSS vars as themeVariables _inputs_ (insufficient for derivation / prerender emit)
- <https://github.com/mermaid-js/mermaid/issues/6256> — sanitizer / related
- Intermediate library: <https://github.com/openshellorg/mermaid-svg-css-vars>
