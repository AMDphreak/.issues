---
issue_url: https://gitlab.com/antora/antora/-/issues/1199
type: enhancement
status: open
---

# Proposal: Align naming convention of `antora.yml` and `antora-playbook.yml` to reduce confusion

## Description

This is a proposal to address common developer naming confusion in local or single-repository Antora projects.

In the current Antora workflow:
1. **`antora.yml`** is the **Component Descriptor**.
2. **`antora-playbook.yml`** is the **Playbook** (Site Config).

Developers coming from other documentation tools (Hugo, Jekyll, MkDocs) expect the eponymous root configuration (`antora.yml`) to be the global entry point for the build. In a single-repo project, seeing both files co-located is often misleading, leading users to mistake the component descriptor for the site configuration.

## Proposal

To improve the "Day 1" experience and reduce ambiguity:

1.  **Naming Swap/Alias:** Allow the Playbook to be named `antora.yml`.
2.  **Component Descriptor Rename:** Consider a more descriptive default like `antora-component.yml`.
3.  **Ambiguity Handling:** Detect the file role via its schema (presence of `site:` vs `name:`/`version:`/`nav:`).

- **Issue:** https://gitlab.com/antora/antora/-/issues/1199
