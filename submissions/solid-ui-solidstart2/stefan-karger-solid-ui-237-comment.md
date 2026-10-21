Hi @joeygrable94, thanks for this huge port! I tried the branch (head `54af163`) in a brand-new SolidStart 2 app and wanted to share what I found.

**Setup:** `@solidjs/start` 2.0.6, Vite 8.3.4, Nitro 3 (`3.0.260903-beta`), `solid-js` 1.9.17, `@kobalte/core` 0.13.14, `@corvu/calendar` 0.1.2, Tailwind 4.3.3 + `@tailwindcss/vite`, `tw-animate-css`. I copied `button`, `input`, `select`, `dialog`, `popover` and `calendar` from `apps/docs/src/registry/ui`, plus `utils.css`, `style-vega.css` and the tokens from `globals.css`.

SolidStart 2.0.x still runs on Solid 1.9, so Kobalte 0.13 and corvu work as they are. Solid 2 isn't needed yet.

### What works ✅
- `vite build` (SSR + Nitro) and `tsc --noEmit` both pass.
- In Playwright, light and dark (`.dark` on `<html>`):
  - Button variants and Input render correctly.
  - Select opens and picks an option.
  - Dialog opens in its portal with the overlay and closes on Esc.
  - A Popover + Calendar date picker selects a date.
  - An inline Calendar renders.
- No hydration warnings and no console errors.

### Things that tripped me up
1. **The components need a style class on an ancestor.** The `cn-*` classes only apply under `.style-vega` (or `[data-cn-theme="Vega"]`), and portaled content (Dialog, Popover, Select) needs it too. Putting `class="style-vega"` on `<body>` fixed it. Without that, everything renders unstyled. A note in the docs or a default would help.
2. **The style CSS needs the sidebar and chart tokens.** If your theme leaves out `--sidebar*` / `--chart-*`, the build fails with `Cannot apply unknown utility class bg-sidebar`, coming from `style-vega.css`.
   - Repro: import `style-vega.css` with a theme that has only the core tokens.
   - Fix: include the sidebar and chart tokens in the theme snippet people copy (or in the CLI `init` template).
3. **The CLI isn't on v4 yet.** `apps/docs/public/registry` still serves the v1 (Tailwind v3) JSON, and `init` still writes `tailwind.config.cjs` plus `tailwindcss-animate`. So for now these components can only be installed by hand. Maybe a follow-up?
4. **Small token gap.** `globals.css` maps `--color-destructive-foreground`, but `:root` and `.dark` never define `--destructive-foreground`.
5. **The docs build ran out of memory for me.** `pnpm --filter docs build` (vinxi) crashed with a V8 out-of-memory error at the default Node heap on Windows. Raising `NODE_OPTIONS=--max-old-space-size` should get past it.

I've also put together a small follow-up on top of this branch: it moves the docs app to SolidStart 2 / Vite 8 / Nitro 3, switches CLI `init` to Tailwind v4, and adds an install guide. I'll open it once this PR settles, so it doesn't add review noise now. Happy to test anything else!
