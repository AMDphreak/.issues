---
title: Running `pnpm` without arguments exits with code 1
repository: pnpm/pnpm
issue_number: 10264
url: https://github.com/pnpm/pnpm/issues/10264
submitted: 2025-12-03
---

When running `pnpm` without any arguments, it displays help text successfully but exits with status code 1. This is semantically incorrect—showing help is a successful operation, not a failure.

## Steps to Reproduce

```bash
pnpm
```

The command displays help output but exits with code 1.

## Expected Behavior

Exit with code 0 after displaying help, since the operation completed successfully.

## Actual Behavior

Exits with code 1, causing tools and scripts to interpret it as a failure.

## Impact

IDEs, CI/CD pipelines, and automation tools that check exit codes will incorrectly report this as an error, even though the command executed successfully.

## Workaround

Using `pnpm --help` or `pnpm -h` exits with code 0, but the bare command should behave the same way.

## Environment

- pnpm version: 10.24.0
- Node.js version: v22.21.0
- Operating System: Windows 11 (10.0.26200)

