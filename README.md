<a id="readme-top"></a>
<div align="center">
  <a href="https://github.com/AMDphreak/.issues/graphs/contributors"><img src="https://img.shields.io/github/contributors/AMDphreak/.issues.svg?style=for-the-badge" alt="Contributors"></a>
  <a href="https://github.com/AMDphreak/.issues/network/members"><img src="https://img.shields.io/github/forks/AMDphreak/.issues.svg?style=for-the-badge" alt="Forks"></a>
  <a href="https://github.com/AMDphreak/.issues/stargazers"><img src="https://img.shields.io/github/stars/AMDphreak/.issues.svg?style=for-the-badge" alt="Stargazers"></a>
  <a href="https://github.com/AMDphreak/.issues/issues"><img src="https://img.shields.io/github/issues/AMDphreak/.issues.svg?style=for-the-badge" alt="Issues"></a>
  <h3 align="center">.issues</h3>

  <p align="center">
    Umbrella for AI issue <strong>submissions</strong> (bodies + media backup) and local forge metadata <strong>archives</strong> used by <a href="https://github.com/dev-centr/issues-browser">issues-browser</a>.<br />
    <br />
    <a href="https://github.com/AMDphreak/.issues/issues">Report Bug</a>
    &middot;
    <a href="https://github.com/AMDphreak/.issues/issues">Request Feature</a>
  </p>

</div>

## About The Project

This repository is the username-level `.issues` root:

```text
.issues/
  submissions/     # committed: draft/submitted issue markdown + working screenshots
  images/          # committed: durable media backup for every filing (not the preferred GitHub CDN)
  archives/        # gitignored: issues-browser SQLite backups per forge repo
  monitor.sdl      # gitignored: daemon monitor list (local)
```

- **submissions/** — transcripts of issues/PRs filed via `gh` (and related forges), with per-forge outcome files.
- **images/** — **consumer-owned backup** of screenshots/video used in filings. Prefer GitHub CLI `--attach` (gh ≥ 2.99) for what the forge displays; keep copies here anyway. The old `raw.githubusercontent.com/.../images/...` embed path is a **fallback** only (older `gh`, no write access for attach, or forges without CLI upload).
- **archives/** — managed by [dev-centr/issues-browser](https://github.com/dev-centr/issues-browser) as an offline forge metadata backup (`archives/<host>/<owner>/<repo>/database.sqlite`).

This repo is a near-term wedge for [provider search and mirror backups](https://docs.devcentr.org/general-knowledge/explanation/internet-architecture/provider-search-and-mirror-backups.html): keep your correspondence queryable even when the host owns the live CDN copy.

## Usage

### Submissions layout

1. Create `submissions/{issue-short-name}/` (lowercase).
2. Inside that folder:
   - `issue.md` — shared base description (no title line)
   - `screenshots/` — optional working copies
   - `{org}-{repo}-{issue-number}.md` per forge submission (YAML front-matter + body)
3. Copy media into `images/{issue-short-name}/` whenever screenshots/video are part of the filing.
4. Run the repo formatter (dprint/prettier) on markdown under `submissions/` before committing.
5. **Always push** after commit — recording a submission is filing, not a local draft. Skill `issues-repo-record` (agent-rules).

### Media with GitHub CLI (`gh` ≥ 2.99)

Prefer forge-native attach. Reference the same local path in Markdown that you pass to `--attach` (gh rewrites it), or omit embeds and let attach append:

```powershell
gh issue create --repo OWNER/REPO --title "…" `
  --body-file ".\submissions\{short-name}\issue.md" `
  --attach ".\images\{short-name}\error.png#The error dialog"
```

Then commit and push `submissions/` + `images/` together as the durable backup.

### Fallback embeds (`raw.githubusercontent.com`)

Only when `--attach` is unavailable: commit and push `images/` **before** putting raw GitHub URLs in the forge body.

Example path:

```text
Z:\code\github.com\AMDphreak\.issues\submissions\reverse-quote-semantics\
```

Repo-specific file front-matter:

```markdown
---
title: Feature Request: …
repository: PowerShell/PowerShell
issue_number: 26566
url: https://github.com/PowerShell/PowerShell/issues/26566
submitted: 2025-12-02
status: submitted
media: attach
---
```

### Extra instructions for AI

Create the issue body in this repository and pass the file into `gh` (avoid shell expansion of body text). Do not put the title in the issue body. Skill **`issues-repo-record`**: always commit and push; prefer `--attach`; always keep `images/` backup; use `status: submitted`, `pending`, or `blocked` on per-forge files (see that skill).

### Archives (issues-browser)

Do not commit `archives/` or `*.sqlite`. The backup app creates `contents/` under each archive for a possible future body offload; bodies currently live in SQLite.

## Contact

Ryan Johnson — [@amdphreak](https://twitter.com/amdphreak)

Project Link: [https://github.com/AMDphreak/.issues](https://github.com/AMDphreak/.issues)
