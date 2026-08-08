<a id="readme-top"></a>
<div align="center">
  <a href="https://github.com/AMDphreak/.issues/graphs/contributors"><img src="https://img.shields.io/github/contributors/AMDphreak/.issues.svg?style=for-the-badge" alt="Contributors"></a>
  <a href="https://github.com/AMDphreak/.issues/network/members"><img src="https://img.shields.io/github/forks/AMDphreak/.issues.svg?style=for-the-badge" alt="Forks"></a>
  <a href="https://github.com/AMDphreak/.issues/stargazers"><img src="https://img.shields.io/github/stars/AMDphreak/.issues.svg?style=for-the-badge" alt="Stargazers"></a>
  <a href="https://github.com/AMDphreak/.issues/issues"><img src="https://img.shields.io/github/issues/AMDphreak/.issues.svg?style=for-the-badge" alt="Issues"></a>
  <h3 align="center">.issues</h3>

  <p align="center">
    Umbrella for AI issue <strong>submissions</strong> (drafts/screenshots) and local forge metadata <strong>archives</strong> used by <a href="https://github.com/dev-centr/issues-browser">issues-browser</a>.<br />
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
  submissions/     # committed: draft/submitted issue markdown + screenshots
  images/          # committed: embeddable images for gh issue bodies
  archives/        # gitignored: issues-browser SQLite backups per forge repo
  monitor.sdl      # gitignored: daemon monitor list (local)
```

- **submissions/** — transcripts of issues filed via `gh`, plus screenshots (GitHub CLI cannot upload images).
- **archives/** — managed by [dev-centr/issues-browser](https://github.com/dev-centr/issues-browser) as an offline forge metadata backup (`archives/<host>/<owner>/<repo>/database.sqlite`).

## Usage

### Submissions layout

1. Create `submissions/{issue-short-name}/` (lowercase).
2. Inside that folder:
   - `issue.md` — shared base description
   - `screenshots/` — descriptive names
   - `{org}-{repo}-{issue-number}.md` per forge submission (YAML front-matter + body)
3. Run prettier on markdown under `submissions/` before committing.

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
---
```

### Extra instructions for AI

Create the issue body in this repository and pass the file into `gh` (avoid shell expansion of body text). Do not put the title in the issue body.

### Archives (issues-browser)

Do not commit `archives/` or `*.sqlite`. The backup app creates `contents/` under each archive for a possible future body offload; bodies currently live in SQLite.

## Contact

Ryan Johnson — [@amdphreak](https://twitter.com/amdphreak)

Project Link: [https://github.com/AMDphreak/.issues](https://github.com/AMDphreak/.issues)
