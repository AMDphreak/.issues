---
title: Feature Request: Reverse Quote Semantics to Align with Human Intuition
repository: fish-shell/fish-shell
issue_number: 12133
url: https://github.com/fish-shell/fish-shell/issues/12133
submitted: 2025-12-02
---

# Feature Request: Correct the Backwards Quote Syntax Convention

## The Problem: Inverted Semantics

In everyday life and literature, **double quotes** are used to denote literal text—direct quotations, exact phrases, and verbatim content. Single quotes are the unusual exception, typically reserved for quotes within quotes or specialized typography. This is a fundamental linguistic convention that has existed for centuries.

However, the technology world has inverted this relationship. In shells like PowerShell, Bash, Zsh, and others, **single quotes** are used for literal strings (no expansion), while **double quotes** are used for expandable strings (with variable interpolation). This is backwards from how humans naturally understand quotation marks.

## Why This Matters

This inversion creates cognitive dissonance for users. When someone writes `"Hello $name"`, they intuitively expect literal text (as in "Hello $name" in a document), but the shell interprets it as expandable. Conversely, `'Hello $name'` looks unusual but is treated as literal. This mismatch between human intuition and technical behavior is a source of confusion and errors.

## The Solution is Simple

The fix is straightforward: **swap the semantics**. Make double quotes literal (as they are in real life) and single quotes expandable (as the unusual case). This requires:
1. Updating the parser to treat double quotes as literal strings
2. Updating the parser to treat single quotes as expandable strings
3. Providing migration tooling (a simple find-and-replace script that swaps all double quotes with single quotes and vice versa in existing scripts)

The technical implementation is trivial—it's purely a matter of changing which quote type triggers which parsing behavior.

## On Conventions and Consistency

While consistency with existing conventions has value, it should not be treated as an absolute truth. When a convention is fundamentally backwards from human intuition and creates compounding inconvenience over time, it should be corrected—no matter how established it is. The longer we wait to fix such issues, the more scripts, documentation, and muscle memory become entrenched in the wrong pattern, making the eventual correction even more painful.

Every day that passes without fixing this backwards convention means:
- More scripts written with counter-intuitive syntax
- More developers learning the wrong pattern
- More documentation perpetuating the error
- More cognitive overhead for every user

The inconvenience of migration is temporary. The inconvenience of living with a backwards convention is permanent and compounding.

## Requested Change

Please consider reversing the quote semantics:
- **Double quotes (`"..."`)** → Literal strings (no expansion)
- **Single quotes (`'...'`)** → Expandable strings (with variable interpolation)

This would align shell behavior with human intuition and linguistic convention, making the tools more accessible and less error-prone.

## Related Discussions

This issue affects multiple shells and tools. For consistency across the ecosystem, similar requests are being submitted to:
- [PowerShell](https://github.com/PowerShell/PowerShell/issues/26566)
- [Bash](#) - [Link to be added]
- [Zsh](#) - [Link to be added]
- [Fish Shell](#) - [Link to be added]

