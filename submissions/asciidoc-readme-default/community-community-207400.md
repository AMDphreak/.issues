---
title: AsciiDoc as README default: repo-creation chooser plus user/org/repo preferences
repository: community/community
issue_number: 207400
url: https://github.com/orgs/community/discussions/207400
submitted: 2026-09-10
status: submitted
media: raw_github
kind: discussion
category: Repositories
discussion_type: Product Feedback
labels:
  - Repositories
  - Product Feedback
  - source:ui
discussion_state: open
supersedes: 207398
source_path: github_ui_template
note: >-
  Filed via GitHub UI + Repositories DISCUSSION_TEMPLATE (source:ui).
  Supersedes #207398 which github-actions closed for non-UI create.
cross_post:
  antora_zulip:
    status: blocked
    blocked_reason: auth_required
    target: https://antora.zulipchat.com
    preferred_stream: users
    preferred_topic: >-
      Prefer an existing topic about GitHub AsciiDoc / README / tooling if
      found after login; otherwise new topic e.g. "GitHub feature request:
      AsciiDoc README at create + defaults"
    draft: |
      Hi — I filed a GitHub Community feature request for choosing AsciiDoc
      (`README.adoc`) when adding a README at repo creation, plus
      user/org/repo defaults for README format. Concept mockups are included.
      Upvotes and comments welcome:
      https://github.com/orgs/community/discussions/207400
    next_step: >-
      1) Sign in to https://antora.zulipchat.com (GitHub OAuth works).
      2) Search #users for an existing GitHub AsciiDoc/README topic; if none,
      New topic in #users with the draft above.
      3) Alternate: https://asciidoctor.zulipchat.com #users with the same note.
---

### Discussion Type

Product Feedback

### Body

GitHub already renders AsciiDoc well, but every path that creates a README still assumes Markdown. Please add a first-class way to choose AsciiDoc (`README.adoc`) at repo creation time, and to set that choice as a default for users, organizations, and repositories.

### Problem

When you check **Add a README** on the new-repository form (or use `auto_init` / `gh repo create --add-readme`), GitHub always seeds `README.md`. AsciiDoc-first teams then rename or replace that file on every new repo. The same Markdown bias shows up in related surfaces (wiki "Create new page" markup dropdown, empty-repo "Add a README" banner). Org/user settings already let you set defaults like the default branch name; README markup is a similar default that is currently missing.

Workarounds (template repos, deleting the generated Markdown README) work, but they are friction for orgs that standardize on AsciiDoc for docs and READMEs.

### Proposed solution

1. **Repo creation UI**
   When **Add a README** is enabled, add a **README format** control (radio or dropdown), for example:
   - Markdown -> `README.md` (current behavior; keep as the product-wide default)
   - AsciiDoc -> `README.adoc` (also accept `.asciidoc` if that extension is already treated as AsciiDoc elsewhere)

2. **Defaults with clear precedence** (most specific wins):
   - **User** preference (e.g. Settings -> Repositories): default README markup for personal repos and for the user's create-repo form
   - **Organization** preference (org repository defaults, next to default branch name): default for repos created under that org
   - **Repository** preference: default markup for later "Add a README", wiki new-page markup, and related in-repo create flows
   - Fallback: Markdown

3. **API / CLI parity**
   - REST/GraphQL create-repository: something like `auto_init` + `readme_format: "asciidoc" | "markdown"`
   - `gh repo create --add-readme --readme-format asciidoc` (or `adoc`)

### Mockups

Concept mockups for the proposed UI (not product screenshots):

![Repo creation: README format chooser](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/asciidoc-readme-default/repo-create-readme-format.png)

![Organization default README format](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/asciidoc-readme-default/org-default-readme-format.png)

![User default README format](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/asciidoc-readme-default/user-default-readme-format.png)

![Empty-repo banner: Add a README with format chooser](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/asciidoc-readme-default/empty-repo-add-readme.png)

### Additional suggestions (same feature family)

These would make the default feel complete rather than only fixing the one checkbox:

- **Empty-repo banner** ("Add a README") should use the same user/org/repo default and offer the same format chooser.
- **Wiki "New page"** markup dropdown should preselect from the same preference (see also [github/markup#1262](https://github.com/github/markup/issues/1262)).
- **Template repositories**: if the template already contains `README.adoc` / `README.asciidoc`, do not also force a Markdown README when "Add a README" / auto-init is involved.
- **Web "Add file"**: when creating `README*` from the UI, prefer the configured extension; optionally remember last-used markup for that repo.
- **Codespaces / template gallery** seeds that currently hard-code `README.md` should honor org/user default where applicable.
- **Docs**: document precedence (repo > org > user > product default) and that profile READMEs / issue and PR comments can remain Markdown/GFM-only if that is intentional -- call that out so AsciiDoc users know the scope.

Out of scope for this request (unless easy): changing issue/PR comment markup away from GFM, or requiring AsciiDoc for profile READMEs.

### Why it matters

GitHub already supports AsciiDoc rendering for repository files and wikis. The gap is defaults and creation UX, not rendering. Giving Markdown and AsciiDoc equal footing at create time -- and letting users/orgs lock in a default -- removes repeated busywork for documentation-heavy and AsciiDoc-native orgs, without changing anything for Markdown-default users.

### Related

- Org/user default markup (wiki + generated READMEs): [github/markup#1262](https://github.com/github/markup/issues/1262) (maintainers redirected product requests to Support / Community)
- AsciiDoc rendering improvements: [community discussion #206003](https://github.com/orgs/community/discussions/206003)

### Product areas

Repositories (create repo, README, wiki defaults); optional CLI/`gh` and REST create-repo fields.
