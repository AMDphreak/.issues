# README

Issues Repository. Contains transcripts of issues submitted to GitHub via `gh` command and associated screenshots. Intended for use by AI when creating and editing issues. The screenshots are uploaded here for inclusion in the actual GitHub issue, as there is no way to upload an image to a GitHub issue using `gh`.

## Sorting

1. Create folder using the following format `issues/{issue-short-name}/` in all lowercase.
2. Inside that, create:
   - `issue.md` - The base issue content/description (shared template)
   - `screenshots/` directory - Screenshots should be named descriptively and serialized if used in a serial way in the file (in steps or cause/effect).
   - One file per repository submission named `{org}-{repo}-{issue-number}.md` (e.g., `cursor-cursor-3832.md`, `PowerShell-PowerShell-26566.md`)
3. Each repo-specific file contains:
   - YAML front-matter with metadata (title, repository, issue_number, url, submitted date)
   - The issue content (which may differ slightly per repo due to cross-linking)
4. Run prettier before committing: `prettier --write \**.md` in `issues/`

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

## Cross-Reference Links

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

## Extra Instructions for AI

Create the issue in this repository locally and pass it into the `gh` command as the body, instead of passing literal text into the command line, so as to avoid shell issues with variable expansion.
