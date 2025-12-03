---
title: Git Warning Message Incorrectly Styled as Error
repository: cursor/cursor
issue_number: 3833
url: https://github.com/getcursor/cursor/issues/3833
submitted: 2025-12-03
---

## Description

When Git/SSH outputs the informational message "warning: permanently added 'gitlab.com' to the list of known hosts", Cursor displays it with error-level styling (red error icon with X), making it appear as a critical error when it's actually just an informational message.

## Expected Behavior

Informational Git/SSH warnings should be styled as warnings (yellow/orange) or informational messages (blue), not as errors (red).

## Actual Behavior

The message is displayed with a red circular error icon containing a white X, which is the same styling used for actual errors. This is misleading because:

- The message is informational, not an error
- It's a normal part of SSH's first-time connection process
- Users may be alarmed by the error styling

## Steps to Reproduce

1. Connect to a Git repository (e.g., GitLab) via SSH for the first time
2. Observe the warning popup that appears
3. Notice the red error icon styling despite the message being a warning

## Screenshot

![Git Warning Styling Issue](https://raw.githubusercontent.com/AMDphreak/.issues/main/issues/git-warning-styling/screenshots/cursor-git-warning-styling.png)

## Additional Context

This issue likely stems from Cursor parsing Git output and mapping the "warning" keyword to error-level styling. The message originates from Git/SSH, not Cursor, but Cursor's UI is applying incorrect styling.

Related issue in VS Code: https://github.com/microsoft/vscode/issues/280838

## Environment

- Cursor version: [current version]
- OS: Windows 11
- Git version: [current version]
