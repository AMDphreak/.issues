Diagram light/dark theming is broken for the usual docs pattern of serving generator SVG as `<img>`: fixed paints cannot follow a site’s manual dark toggle, and OS `prefers-color-scheme` alone is incomplete. Because Kroki fronts Mermaid, PlantUML, and many other engines, an optional adaptive/themed SVG delivery mode (or post-process hook) would fix this for a large share of documentation pipelines without forking AsciiDoc/Antora tooling.

Full durable RFC:  
https://github.com/dev-centr/themed-svg/blob/main/proposals/2026-09-15-generator-kroki-themed-svg.md

Reference contract: https://github.com/dev-centr/themed-svg  
Polyfills today: https://github.com/dev-centr/mermaid-svg-css-vars · https://github.com/dev-centr/plantuml-svg-css-vars

## Problem (short)

- `<img>` SVG cannot inherit host CSS custom properties or class-based theme toggles.
- `prefers-color-scheme`-only adaptive SVG still fails when the site toggle ≠ OS preference.
- Per-docs-toolchain patches (Antora theme CSS, AsciiDoc extensions) do not reach other Kroki clients.

## Proposed contract (summary)

Semantic tokens + light/dark presets, with delivery modes:

- **`standalone-adaptive`** — self-contained SVG for `<img>`; light defaults + `@media (prefers-color-scheme: dark)`.
- **`host`** — CSS `var()` paints with fallbacks for sanitized inline insertion (manual toggles / design tokens).
- **`fixed` / `paired-fixed`** — unchanged concrete exports for compatibility.

Full token list and schema: see the RFC / themed-svg repo.

## Ask of Kroki

**Preferred:** optional themed delivery on convert (names illustrative):

- `theme=adaptive` → standalone-adaptive SVG  
- `theme=host` → host CSS-var SVG with documented custom properties  
- **default** → today’s fixed-color SVG (no breaking change)

**Acceptable alternative:** a documented **post-process hook / plugin** after the engine returns SVG (especially useful for PlantUML while native tokens catch up).

Mermaid-native emission is phase 1 of the same RFC; PlantUML-oriented Kroki post-process is explicitly phase 2.

### Non-asks

- Do not require AsciiDoc or Antora-specific APIs.
- Do not break default fixed SVG responses.
- Do not mandate client JavaScript for adaptive `<img>` delivery.
- Do not treat `asciidoctor-kroki` as the permanent home of this contract.

## Migration

Community adapters remain polyfills until Kroki and/or generators ship compatible modes. Existing docs CI that post-processes SVG can then thin out or disappear.

## Decision request

Is a **`theme=` (or equivalent) response mode** acceptable, or is a **post-process plugin** the better extension point for Kroki? We can help with naming, sanitization expectations for host mode, and an MVP that keeps defaults byte-compatible.

Companion Mermaid Ideas discussion: https://github.com/orgs/mermaid-js/discussions/8264
