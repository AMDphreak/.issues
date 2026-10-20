Passkey-based `turso auth login` on Windows often leaves the CLI hanging with no localhost callback, and a successful login can still fail because the post-login autoupdate script returns GitHub Pages 404.

## Environment

- OS: Windows 10 (build 10.0.26300)
- Shell: PowerShell
- Account: amdphreak (GitHub)
- CLI install: Windows native (not WSL)

## Steps to reproduce

1. Run `turso auth login`.
2. Browser opens to `https://api.turso.tech?port=<local>&redirect=true&state=<state>&type=cli`.
3. Choose **Sign in with passkey** on the auth page.
4. Page goes **blank**; CLI stays on `Waiting for authentication...` with no callback activity.
5. Press Ctrl+C to stop the CLI, run `turso auth login` again.
6. Browser may show already logged in; CLI may error or eventually report success.
7. On success, CLI runs autoupdate via `irm https://get.tur.so/install.ps1 | iex`, which fails with GitHub Pages **404 File not found** HTML (see below).

## Expected

- Passkey login completes and redirects/callbacks to the local CLI listener so the command exits with success on the first attempt.
- Post-login autoupdate either succeeds or fails without obscuring a successful login.

## Actual

**Attempt 1:** Blank page after passkey; no CLI callback; had to Ctrl+C.

**Attempt 2:** Browser indicated logged in; CLI eventually showed `Success! Logged in as amdphreak`, then autoupdate failed:

```text
Updating to the latest version
irm : ... Page not found · GitHub Pages ... 404 File not found
At line:1 char:1
+ irm https://get.tur.so/install.ps1 | iex
Error updating: failed to execute update command: exit status 1
```

**Attempt 3:** `Already signed in as amdphreak` — state that should have been reached after attempt 1 if the callback had worked.

## Notes

- OAuth/local callback port examples from session: `53036`, `64024`.
- Workaround for noisy autoupdate: `turso config set autoupdate off`.
- Related: CLI autoupdate UX (#706); browser-specific login (#939).
