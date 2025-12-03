# Index of Feature Requests: Reverse Quote Semantics

This document indexes all feature requests submitted to major shells and tools requesting that quote semantics be reversed to align with human intuition and linguistic convention.

## The Issue

In everyday life and literature, **double quotes** are used to denote literal text—direct quotations, exact phrases, and verbatim content. Single quotes are the unusual exception. However, in shells like PowerShell, Bash, Zsh, and Fish, this relationship is inverted: single quotes are literal (no expansion) while double quotes are expandable (with variable interpolation). This is backwards from how humans naturally understand quotation marks.

## Submitted Feature Requests

| Tool/Shell | Repository | Issue Number | Status | Link |
|------------|-----------|--------------|--------|------|
| **PowerShell** | PowerShell/PowerShell | #26566 | Open | [View Issue](https://github.com/PowerShell/PowerShell/issues/26566) |
| **Bash** | tautropfli/bash | #2 | Open | [View Issue](https://github.com/tautropfli/bash/issues/2) |
| **Fish Shell** | fish-shell/fish-shell | #12133 | Open | [View Issue](https://github.com/fish-shell/fish-shell/issues/12133) |
| **Zsh** | zsh-users/zsh | N/A | Issues Disabled | Issues are disabled on the zsh-users/zsh repository. Alternative submission methods may be available through the zsh mailing list. |

## Cross-References

All submitted issues have been cross-referenced with links to related requests in other shells. This demonstrates the widespread nature of the issue and the need for coordinated change across the ecosystem.

## Summary

The feature requests argue that:

1. **Double quotes should mean literal text** (as they do in everyday life and literature)
2. **Single quotes should mean expandable text** (as the unusual case)
3. **The fix is simple** - swap the parser behavior and provide migration tooling
4. **Conventions should be revised** when they conflict with human intuition, regardless of temporary inconvenience

The longer we wait to fix this backwards convention, the more scripts, documentation, and muscle memory become entrenched in the wrong pattern, making eventual correction more painful.

## Related Documentation

- Original observations: `Gemini-PowerShell Single vs. Double Quotes.md`
- Feature request template: `feature-request-quote-syntax.md`

