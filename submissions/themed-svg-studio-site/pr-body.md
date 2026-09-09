The Products catalog now gives Themed SVG Studio a concrete public home while the native editor is being built. The concept keeps the scope honest: semantic theme tokens and bindings change, but SVG geometry does not.

## What changed

- add Themed SVG Studio to the Products catalog with its approved product mark
- add an interactive `/themed-svg-studio` concept route
- demonstrate host, adaptive, and fixed previews, token editing, bindings, diagnostics, and export choices
- prerender the route and generate its GitHub Pages fallback
- record the addition in the site changelog

## Screenshots

![Themed SVG Studio concept demo](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/themed-svg-studio-site/concept-demo.png)

![Themed SVG Studio in the Products catalog](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/themed-svg-studio-site/products-catalog.png)

## Verification

- production Vinxi build
- route fallback generation
- desktop and mobile interaction checks
- accessibility snapshot for controls and landmarks
- visual review of the concept route and catalog mark
- `git diff --check`
