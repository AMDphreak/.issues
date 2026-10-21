## Summary
Hi! SolidStart 2 (Vite 8 + Nitro 3) is out, but the v4 docs app still builds on SolidStart 1 / vinxi / Vite 6. The CLI `init` command also still scaffolds a Tailwind v3 config with `tailwindcss-animate`, so a new SolidStart 2 + Tailwind v4 app can't follow our own setup.

**This depends on #237** and is branched from its head (`GetCommunity:feature/all-components` @ `54af163`). Until #237 merges, the diff against `dev` also shows its commits. Only the last 3 commits are new here.

This PR tries to:

- **Docs app → SolidStart 2:** replace `app.config.ts` with a plain `vite.config.ts` (`solidStart()`, `nitro()`, `@tailwindcss/vite`). It also moves `@kobalte/solidbase` to 0.6 (its SolidStart 2 line) and `@solidjs/router` to 0.16, and drops `vinxi`. The Vercel preset and link-crawling prerender stay.
- **CLI `init` → Tailwind v4:**
  - It now writes a CSS-first `app.css`: `@import "tailwindcss"`, `tw-animate-css`, a `dark` custom variant, `@theme inline`, and the same tokens as the docs, including sidebar and chart, which `style-*.css` needs.
  - It no longer writes a `tailwind.config`. `tailwind.config` stays optional in `ui.config.json`, so existing files still parse.
  - It installs `tw-animate-css` instead of `tailwindcss-animate`.
  - Changeset included.
- **Docs:** a new `/docs/installation` page for SolidStart 2 / Vite 8 (CLI and manual paths, plus how to point the `dark` variant at an existing `data-theme` attribute), added to the sidebar under "Getting Started".

Surprises and tradeoffs:
- **One router version:** `@kobalte/solidbase` 0.6.13 still depends on `@solidjs/router` ^0.15. With SolidStart 2's 0.16, that loads two routers, and prerender fails with "`<A>` and 'use' router primitives can be only used inside a Route". Prerender rendered 0 pages, yet the build still exited 0. A pnpm `overrides` entry pins solidbase to the same 0.16 router.
- **Missing solidbase deps:** solidbase 0.6.13 imports `resolve` (and `esbuild`) without declaring them, which fails under pnpm's strict layout. `packageExtensions` in `pnpm-workspace.yaml` covers that. Both workarounds are probably worth reporting to solidbase.
- **Registry not regenerated:** `public/registry` still holds v1 JSON, so `solidui-cli add` still installs v1 components. I left that for a separate PR to keep this one reviewable.

Happy to adjust anything that doesn't fit the project's taste.

## Screenshots
Screenshots will follow in a comment (docs on SolidStart 2: `/docs/installation` in dark and `/docs/components/date-picker` in light).

## How to try it
1. `pnpm install`
2. `pnpm --filter docs build` (I used `NODE_OPTIONS=--max-old-space-size=12288` on Windows). The log should end with `Prerendered 65 routes` and output in `apps/docs/.vercel/output`.
3. `pnpm --filter solidui-cli build`, then run `init` in a fresh SolidStart 2 app with `@tailwindcss/vite`.

## Testing
- Docs: `vite build` passes on Vite 8.3.4 / SolidStart 2.0.6 / Nitro 3 and prerenders 65 routes. Served from static output, the installation, dialog and date-picker pages render in light and dark, the dialog demo opens, and there are no console errors.
- The CLI `init` CSS template was dropped into a fresh SolidStart 2 app with `button`, `input`, `select`, `dialog`, `popover` and `calendar` from #237. `vite build` passes, and Playwright passes in light and dark: dialog opens, select picks, date picker selects, no console errors.
- `pnpm --filter solidui-cli build` passes.
- `biome check` on the changed files passes (repo-wide `biome check` already reports existing errors).
- `tsc` for the CLI has 2 existing errors (`ts-morph` types, `transform-tw-prefix.ts`); this PR doesn't touch those files.