---
title: "RFC: Never remove detection of outdated config keys (Config Key Sanitation)"
repository: npm/cli
issue_number: 10045
url: https://github.com/npm/cli/issues/10045
submitted: 2026-09-26
status: submitted
media: none
---
npm currently warns about unknown user config keys and says that support will stop in a future major version. That path ends with silent mystery debt: old projects keep the key, future npm stops mentioning it, and people copy unexplained lines into new files.

Please treat outdated config keys as a forever-detectable catalog problemâ€”not something to delete from recognition.

## Proposal: Config Key Sanitation

Keep a shipped, machine-readable **key index** for every config key npm has ever recognized. Keys move through statuses; they are never removed from the index:

| Status | Behavior |
| --- | --- |
| `active` | Accept and document |
| `deprecated` | Accept; always warn with successor + timeline |
| `expired` | Do not apply the value; **always** detect and alert: expired after version X; ignored; migration path |
| `unknown` | Present in a scanned file but absent from the catalog â€” warn (typo / foreign tool / catalog gap) |

**Non-negotiable:** `expired` â‰  forgotten. Stopping detection after a major version is the failure mode.

## Why this matters

1. Old `.npmrc` / project config keeps outdated keys for years (archives, corporate templates, copied gists).
2. If npm stops warning, the key becomes unexplained folklore.
3. Humans and AI agents then have to archaeology the meaning; careful users research, others copy blindly.
4. npm already pays the cost of scanning config; preserving catalog rows is cheap compared to ecosystem confusion.

## Concrete ask

1. **Never remove** a known key from npmâ€™s recognition/alert path. Change status instead.
2. Ship a versioned **config-keys index** (JSON is fine) with releases and docs.
3. Alerts must distinguish **deprecated** vs **expired** vs **unknown**, and for expired keys name the version boundary (e.g. `expired after npm@X.Y.Z; value ignored`).
4. Prefer one internal module for classify â†’ match â†’ alert so warnings stay consistent.

## Prior art / reference

OpenShellOrg drafted this as a CLI sanitation protocol and a small reference library:

- Protocol: https://github.com/openshellorg/docs (page: Config Key Sanitation / SOS mandatory protocols)
- Published docs (after site rebuild): https://docs.opensh.org/open-shell-org/standard-config-key-sanitation.html
- Reference library: https://github.com/openshellorg/config-key-sanitation
- Practitioner write-up: https://docs.devcentr.org/general-knowledge/explanation/architecture/config-key-sanitation/

Happy to refine the index schema with maintainers. The goal is explainability that outlives any single major version.

