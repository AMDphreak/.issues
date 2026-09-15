Diagram light/dark theming breaks for the common `<img src="….svg">` path: fixed-color SVG cannot follow a site’s manual dark toggle, and `prefers-color-scheme` alone is incomplete. We are proposing that Mermaid emit theme-ready web SVG (or an official adapter hook) so the fix is widely distributed at the generator layer, not re-solved in every docs toolchain.

Full durable RFC (problem, contract, asks, non-goals, migration):  
https://github.com/dev-centr/themed-svg/blob/main/proposals/2026-09-15-generator-kroki-themed-svg.md

Reference contract (MIT): https://github.com/dev-centr/themed-svg  
Current community polyfill: https://github.com/dev-centr/mermaid-svg-css-vars

## Problem (short)

1. External `<img>` SVG is an isolated document — host CSS variables / `html[data-theme=dark]` do not recolor it.
2. Many docs/product UIs use a **manual** light/dark toggle that can disagree with OS `prefers-color-scheme`.
3. Fixing this only in Antora/AsciiDoc/`asciidoctor-kroki` leaves every other Mermaid consumer with the same bug.

## Proposed contract (summary)

Semantic color **roles** (e.g. `color.surface.primary`, `color.text.primary`, `color.edge`) with **light + dark presets**, and two web delivery modes:

| Mode | Delivery | Tracks |
| --- | --- | --- |
| `standalone-adaptive` | Portable `<img>` | OS/`prefers-color-scheme` only |
| `host` | Sanitized inline / shadow DOM | Host CSS vars + manual site toggles |

`fixed` / `paired-fixed` remain for print, email, and one-shot assets. Details and schema links are in the RFC.

## Ask of Mermaid

**Preferred:** native dual-preset / CSS-var web SVG export — stable semantic classes (or data attributes) for canvas, surfaces, text, borders, edges; emit adaptive and/or host-shaped SVG (existing fixed theme path retained).

**Acceptable MVP:** an official **post-render SVG transform hook** (or structured theme metadata) so adapters can rewrite presentation without brittle hex scraping. Our polyfill can remain community until a first-party path exists.

### Non-asks

- Do not require Antora, AsciiDoc, or a specific docs theme.
- Do not force browser JS for portable `<img>` adaptive delivery.
- Do not remove today’s `themeVariables` fixed look for callers who want it.

## Non-goals (ecosystem)

- Forking `asciidoctor-kroki` as the long-term home of theming.
- Putting this into Antora core or the AsciiDoc language.

Adapters stay polyfills until upstream lands; sites can then drop post-process CI.

## Decision request

Is **native adaptive/host export** or an **official post-render hook** the better near-term Mermaid path? Happy to shrink scope to an opt-in MVP that preserves default fixed SVG.

Companion Kroki proposal (shared delivery switch for multi-engine SSR): https://github.com/yuzutech/kroki/issues/2146
