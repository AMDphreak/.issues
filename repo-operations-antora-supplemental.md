# Repo operations: antora-supplemental org and AMDphreak

One-time checklist for moving/renaming repos and fixing the org layout. Do these in order where dependencies exist.

**Done (2026-03-12):** Renamed AMDphreak/antora-supplemental → antora-ai-help-extension, transferred to antora-supplemental; transferred AMDphreak/antora-github-action to antora-supplemental; renamed antora-supplemental/antora-demo-template → antora-demo. Local remotes updated; commits pushed.

---

## 1. Move amdphreak/antora-supplemental → antora-supplemental org (AI help extension) ✅

- **Current:** `AMDphreak/antora-supplemental` (AI Help extension).
- **Goal:** Owned by `antora-supplemental` org as the dedicated “AI help extension” repo.
- **Name:** To avoid org/repo name clash, either:
  - Transfer and keep name `antora-supplemental` (repo URL: `antora-supplemental/antora-supplemental`), or
  - Transfer and rename to e.g. `antora-ai-help-extension` (clearer for marketplace/docs).
- **Steps:**
  1. Transfer via API (requires admin on both AMDphreak and antora-supplemental):
     ```bash
     gh api -X POST -H "Accept: application/vnd.github+json" /repos/AMDphreak/antora-supplemental/transfer -f new_owner='antora-supplemental'
     ```
  2. If renaming: in GitHub **Settings** → **Repository name** → e.g. `antora-ai-help-extension` → **Rename**.
  3. Local: update remote and optional folder rename:
     ```powershell
     cd Z:\code\github.com\AMDphreak\antora-supplemental
     git remote set-url origin https://github.com/antora-supplemental/<new-repo-name>.git
     # Optional: rename parent folder to match org layout:
     # Move to Z:\code\github.com\antora-supplemental\<new-repo-name>
     ```

---

## 2. antora-supplemental-private vs .github-private

- **Intent:** A repo under the **antora-supplemental** org that mirrors `.github` (workflow templates, etc.) but is visible only to org members (private or member-only content).
- **Current mistake:** Repo named `antora-supplemental-private` under **AMDphreak**.
- **Options:**
  - **A.** Create a new repo under **antora-supplemental** named `.github-private` (or `github-private` if GitHub disallows leading dot). Put the same kind of content as `.github` but for members-only workflows/docs. Then delete or archive `AMDphreak/antora-supplemental-private` after migrating any useful content.
  - **B.** If the intent was “private copy of .github”: create **antora-supplemental/.github-private** as a private repo, clone from `.github`, and maintain in sync as needed.
- **Steps:** Create repo in org → **antora-supplemental** → **New repository** → name `.github-private` (or `github-private`) → Private → Create. Then migrate content from `AMDphreak/antora-supplemental-private` if needed, and delete the old repo when done.

---

## 3. Move amdphreak/antora-github-action → antora-supplemental org ✅

- **Current:** `AMDphreak/antora-github-action` (old action repo with many notes; was designed as a template).
- **Goal:** Same repo under **antora-supplemental** so it sits next to **antora-build-action** for comparison/merge later.
- **Steps:**
  1. Transfer via API:
     ```bash
     gh api -X POST -H "Accept: application/vnd.github+json" /repos/AMDphreak/antora-github-action/transfer -f new_owner='antora-supplemental'
     ```
  2. After transfer, repo will be **antora-supplemental/antora-github-action**.
  3. Local:
     ```powershell
     cd Z:\code\github.com\AMDphreak\antora-github-action
     git remote set-url origin https://github.com/antora-supplemental/antora-github-action.git
     # Optional: move clone to org path
     # Move folder to Z:\code\github.com\antora-supplemental\antora-github-action
     ```

**Current guidance (2026):** Use **antora-supplemental/antora-build-action** for new workflows and documentation (see [antora-workflow-templates](https://github.com/antora-supplemental/antora-workflow-templates) `action-workflow.yml`). **antora-supplemental/antora-github-action** is legacy; do not reference it in new templates or CI.

---

## 4. Rename antora-demo-template → antora-demo ✅

- **Repo:** **antora-supplemental/antora-demo-template**.
- **Steps:**
  1. GitHub: **antora-supplemental/antora-demo-template** → **Settings** → **Repository name** → `antora-demo` → **Rename**.
  2. Local:
     ```powershell
     cd Z:\code\github.com\antora-supplemental\antora-demo-template
     git remote set-url origin https://github.com/antora-supplemental/antora-demo.git
     # Rename folder to match (from parent directory):
     # Rename-Item antora-demo-template antora-demo
     ```
  3. After renaming, any clones or references to `antora-demo-template` should use `antora-demo` (README and this doc already updated).

---

## 5. Summary

| Action | From | To |
|--------|------|----|
| Transfer (optional rename) | AMDphreak/antora-supplemental | antora-supplemental/antora-supplemental or antora-ai-help-extension |
| Fix / create | AMDphreak/antora-supplemental-private | antora-supplemental/.github-private (new) |
| Transfer | AMDphreak/antora-github-action | antora-supplemental/antora-github-action |
| Canonical build action (use this in workflows) | — | antora-supplemental/antora-build-action |
| Rename | antora-supplemental/antora-demo-template | antora-supplemental/antora-demo |

After 4, the local path for the demo repo should be `Z:\code\github.com\antora-supplemental\antora-demo` and README/clone URLs use `antora-demo`.
