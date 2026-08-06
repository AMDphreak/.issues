<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<div align="center">
  <h1>.issues</h1>
  <p>Screenshots uploaded by AI for inclusion in GitHub issues.</p>
  <p>
    <a href="https://github.com/AMDphreak/.issues/issues">Report Bug</a>
    ·
    <a href="https://github.com/AMDphreak/.issues/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Issues repository. Contains transcripts of issues submitted to GitHub via `gh` command and associated screenshots. Intended for use by AI when creating and editing issues. The screenshots are uploaded here for inclusion in the actual GitHub issue, as there is no way to upload an image to a GitHub issue using `gh`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

### Sorting

1. Create folder using the following format `issues/{issue-short-name}/` in all lowercase.
2. Inside that, create:
   - `issue.md` - The base issue content/description (shared template)
   - `screenshots/` directory - Screenshots should be named descriptively and serialized if used in a serial way in the file (in steps or cause/effect).
   - One file per repository submission named `{org}-{repo}-{issue-number}.md` (e.g., `cursor-cursor-3832.md`, `PowerShell-PowerShell-26566.md`)
3. Each repo-specific file contains:
   - YAML front-matter with metadata (title, repository, issue_number, url, submitted date)
   - The issue content (which may differ slightly per repo due to cross-linking)
4. Run prettier before committing: `prettier --write \**.md` in `issues/`. Use prettier global binary if not in project's package.json (`pnpm install -g prettier` then `prettier --write \**.md`). Check how your prettier was installed with `which prettier` in bash or powershell, and `where.exe prettier` in powershell.

To avoid breaking image links, update the issues when an image path changes. Use `gh` to update the issues and the org, repo, and issue names, if they change. Use AI to do this more seamlessly.

Example:

```text
Z:\code\amdphreak\.issues\issues\reverse-quote-semantics\
```

contains:

- `issue.md` - The base issue content
- `screenshots/` - Screenshot files
- `PowerShell-PowerShell-26566.md` - PowerShell-specific submission with front-matter
- `fish-shell-fish-shell-12133.md` - Fish Shell-specific submission with front-matter
- `tautropfli-bash-2.md` - Bash-specific submission with front-matter

Repo-specific file format:

```markdown
---
title: Feature Request: Reverse Quote Semantics to Align with Human Intuition
repository: PowerShell/PowerShell
issue_number: 26566
url: https://github.com/PowerShell/PowerShell/issues/26566
submitted: 2025-12-02
---

# Issue content here...
```

The front-matter contains all metadata that was previously in separate `metadata.md` files. Each repo-specific file may have slightly different content due to cross-linking to related issues in other repositories.

### Cross-Reference Links

When referencing related issues in other repositories, use GitHub's automatic link format instead of markdown links:

**Preferred:**
```markdown
- <https://github.com/org/repo/issues/123>
```

**Avoid:**
```markdown
- [Project Name](https://github.com/org/repo/issues/123)
```

GitHub automatically converts the `<https://...>` format to display the project name, making it cleaner and easier to maintain. This format is especially useful for cross-referencing related issues across multiple repositories.

### Extra Instructions for AI

Create the issue in this repository locally and pass it into the `gh` command as the body, instead of passing literal text into the command line, so as to avoid shell issues with variable expansion.

Do not put the title in the issue body. It is redundant and poor practice.

When issuing a shell command, use single quotes for the title field so you can insert back-ticks around code substrings.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Ryan Johnson — [@amdphreak](https://twitter.com/amdphreak)

Project Link: [https://github.com/AMDphreak/.issues](https://github.com/AMDphreak/.issues)

Site: [https://ryanjohnson.dev](https://ryanjohnson.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/AMDphreak/.issues.svg?style=for-the-badge
[contributors-url]: https://github.com/AMDphreak/.issues/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AMDphreak/.issues.svg?style=for-the-badge
[forks-url]: https://github.com/AMDphreak/.issues/network/members
[stars-shield]: https://img.shields.io/github/stars/AMDphreak/.issues.svg?style=for-the-badge
[stars-url]: https://github.com/AMDphreak/.issues/stargazers
[issues-shield]: https://img.shields.io/github/issues/AMDphreak/.issues.svg?style=for-the-badge
[issues-url]: https://github.com/AMDphreak/.issues/issues
