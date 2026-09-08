---
title: Make HCI diagrams adaptive and reproducible
repository: FoodTruckNerdz/ftn-site
pull_number: 1
url: https://github.com/FoodTruckNerdz/ftn-site/pull/1
submitted: 2026-09-08
status: submitted
media: none
---

## Summary

The site and documentation previously carried fixed, duplicated diagrams that could not follow the site's manual theme reliably.

This PR:

- keeps canonical Mermaid sources and v1 manifests for the four authored HCI relationship diagrams
- keeps the role-lens UI mock hand-authored while providing adaptive and sanitized host variants
- redraws the Git/Vercel topology as Mermaid with adaptive and host artifacts while preserving its Excalidraw source and fixed light/dark exports
- integrates the still-current tracked React component architecture source into the same manifest and dual-artifact pipeline
- progressively upgrades marked site images using the existing manual theme
- preserves portable AsciiDoc fallbacks and records the migration in the changelog

The old role-lens mockup contained invalid XML control characters, so its fixed draft remains available through Git history instead of shipping as a broken asset.

## Validation

- `pnpm --dir site-nextjs diagrams:check`
- focused generated SVG XML parsing
- accessibility metadata (`role`, `title`, and `desc`)
- no `foreignObject`, scripts, event handlers, or external resources in generated outputs
- UTF-8 decoding checks for the new source, manifest, adaptive, and host files

The full Next.js build still reaches the known unrelated owner-billing type error in preserved local WIP; this PR does not modify that work.
