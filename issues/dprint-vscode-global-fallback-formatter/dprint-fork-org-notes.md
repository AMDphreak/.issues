# dprint fork org – license check & org name brainstorm

## License summary (what you can do)

**MIT (majority of repos):** You can fork, modify, distribute, and use commercially. You must keep the MIT license and copyright notice. Creating a new org and publishing your own versions is allowed.

| License   | Repos |
|----------|--------|
| **MIT**  | dprint, jsonc-parser, dprint-plugin-typescript, dprint-plugin-json, dprint-plugin-markdown, dprint-vscode, dprint-sublime, dprint-plugin-roslyn, dprint-swc-ext, js-formatter, dprint-plugin-toml, dprint-plugin-dockerfile, dprint-intellij, dprint-plugin-sql, dprint-plugin-exec, automation, node-plugin-base, dprint-plugin-jupyter |
| **null** (no license in API) | plugins, homebrew-dprint, check |
| **Other / NOASSERTION** | dprint-node, dprint-plugin-rustfmt, dprint-plugin-prettier, dprint-plugin-yapf, dprint-plugin-biome, dprint-plugin-ruff, dprint-plugin-oxc, dprint-plugin-mago |

- **MIT repos:** Safe to clone into your org; keep LICENSE and copyright.
- **null / Other:** Check each repo for a LICENSE file before relying on it; clone and fix as needed.

**Bottom line:** You can create a new org, clone (or mirror) the dprint repos there, fix things, run a website, and distribute—as long as you preserve license and attribution for MIT (and comply with whatever you find in the others).

---

## Repos to clone (dprint org – 29 public repos)

You have **no existing dprint forks** in your account (none of your current forks are from dprint/*). So the list to clone is all 29:

```
automation, check, dprint, dprint-intellij, dprint-node, dprint-plugin-biome,
dprint-plugin-dockerfile, dprint-plugin-exec, dprint-plugin-json, dprint-plugin-jupyter,
dprint-plugin-mago, dprint-plugin-markdown, dprint-plugin-oxc, dprint-plugin-prettier,
dprint-plugin-roslyn, dprint-plugin-ruff, dprint-plugin-rustfmt, dprint-plugin-sql,
dprint-plugin-toml, dprint-plugin-typescript, dprint-plugin-yapf, dprint-sublime,
dprint-swc-ext, dprint-vscode, homebrew-dprint, js-formatter, jsonc-parser,
node-plugin-base, plugins
```

Exclude any you add later as personal forks if you want “org = everything except my own forks.”

---

## Org name brainstorm

Goal: New GitHub org to host clones/forks of dprint repos, with a website and room to grow. Names below are options, not recommendations.

### Clear “community / fork” vibe
- **dprint-community** – Obvious community fork; good for “we’re the maintained fork.”
- **dprint-contrib** – Contributor-focused.
- **dprint-unofficial** – Very clear it’s not the original org.
- **dprint-open** – Implies open, community-driven.

### “Next / better” vibe
- **dprint-ng** – “Next gen” (familiar pattern, e.g. Angular).
- **dprint-reloaded** – Playful “we’re back.”
- **dprint-revival** – Same idea, more serious.
- **dprint2** – Simple “v2” org.

### Brandable, not tied to “dprint”
- **fmt-dev** / **fmtdotdev** – Short; “format dev”; works for a site (e.g. fmtdotdev).
- **unifmt** / **unified-format** – Unified formatter story.
- **format-stack** – Stack of formatters.
- **codefmt** – Code formatting.
- **printfmt** – Print + format.
- **runfmt** – Run formatters.
- **openfmt** – Open formatting.
- **formatforge** – “Forge” for formatting tools.

### Short / .io style
- **dprint-io** – Could use dprint-io.github.io or a custom domain.
- **fmtio** – Fmt.io style.

### Other
- **dprint-hq** – “Headquarters” for the fork.
- **dprint-lab** – Lab for experiments and fixes.
- **dprint-works** – “It works” / “we make it work.”
- **dprint-ce** – Community edition.
- **dprint-org** – Neutral org name.
- **dprinters** – “People who dprint” (like “gophers”).

Pick one that: (1) you can get as a GitHub org, (2) you can use for a domain/site, (3) fits how you want to present the project (community fork vs. fresh brand).
