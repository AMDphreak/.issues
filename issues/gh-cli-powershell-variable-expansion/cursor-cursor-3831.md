---
title: AI generates gh CLI commands without properly guarding against PowerShell variable expansion
repository: cursor/cursor
issue_number: 3831
url: https://github.com/cursor/cursor/issues/3831
submitted: 2025-12-03
---

## Description

When the AI assistant generates `gh issue create` commands in PowerShell that include PowerShell variable syntax (e.g., `$env:Path`, `$PROFILE`) in the `--body` argument, it fails to properly escape these variables or use alternative methods. This results in PowerShell expanding the variables before passing them to `gh`, causing literal variable values to be inserted into issue bodies instead of the intended variable syntax.

**Root Cause**: The AI does not recognize that PowerShell expands variables in double-quoted strings, which is standard PowerShell behavior. The AI should either:
- Escape variables with backticks (`` `$env:Path ``)
- Use single quotes (which don't expand variables) <---- probably the best solution
- Use `--body-file` from the start

## Steps to Reproduce

1. Ask the AI to create a GitHub issue that includes PowerShell code examples or variable references
2. The AI generates a command like:
   ```powershell
   gh issue create --repo getcursor/cursor --title "Bug" --body "Check PATH: $env:Path"
   ```
3. PowerShell expands `$env:Path` before passing to `gh`
4. The resulting issue body contains the expanded PATH value instead of the literal `$env:Path` text

## Expected Behavior

The AI should recognize PowerShell syntax rules and generate commands that preserve literal variable syntax. The AI should either:
- Use `--body-file` when the body contains PowerShell variables or complex content
- Properly escape variables: `` `$env:Path ``
- Use single quotes for literal strings: `'Check PATH: $env:Path'`

## Actual Behavior

The AI generates commands with unescaped PowerShell variables in double-quoted strings, causing:
- `$env:Path` being replaced with the actual PATH value (a long semicolon-separated string)
- `$PROFILE` being replaced with the actual profile path
- Other PowerShell variables being expanded to their values
- Issue bodies containing expanded values instead of code examples

## Example

**AI-generated command:**
```powershell
gh issue create --repo getcursor/cursor --title "Bug" --body "Check PATH: $env:Path"
```

**What PowerShell actually passes to gh:**
```powershell
gh issue create --repo getcursor/cursor --title "Bug" --body "Check PATH: C:\Program Files\WindowsApps\Microsoft.PowerShell_7.5.4.0_x64__8wekyb3d8bbwe;c:\Users\rjamd\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilotCli;..."
```

**What the AI should have generated:**
```powershell
# Option 1: Use --body-file
gh issue create --repo getcursor/cursor --title "Bug" --body-file issue_body.md

# Option 2: Escape variables
gh issue create --repo getcursor/cursor --title "Bug" --body "Check PATH: `$env:Path"

# Option 3: Use single quotes
gh issue create --repo getcursor/cursor --title "Bug" --body 'Check PATH: $env:Path'
```

## Impact

This affects AI-generated commands in PowerShell that need to include:
- PowerShell variable references (`$env:Path`, `$PROFILE`, etc.)
- PowerShell code examples in issue bodies
- Any content with `$` that should be literal

Users must manually correct AI-generated commands or regenerate them multiple times until the AI eventually uses `--body-file`.

## Environment Details

- **OS**: Windows 11
- **Shell**: PowerShell 7.5.4
- **GitHub CLI**: `gh` (latest version)
- **Editor**: Cursor
- **AI Model**: Auto (Cursor's AI assistant)

## Related

This is an AI code generation issue where the model doesn't properly account for PowerShell's variable expansion behavior when generating shell commands. The AI should be aware of shell-specific syntax rules and generate appropriate commands based on the target shell.

