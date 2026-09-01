Cross-post from GitHub — full proposal + follow-up discussion

**GitHub issue (closed; internal tracker PM-42657):**  
https://github.com/bitwarden/clients/issues/22773

**Follow-up comments (2026-09-01):**

- https://github.com/bitwarden/clients/issues/22773#issuecomment-5497058784 — #22448 is not the same ask; CLI should mirror Desktop unlock state
- https://github.com/bitwarden/clients/issues/22773#issuecomment-5497114830 — shared engine/daemon architecture suggestion
- https://github.com/bitwarden/clients/issues/22773#issuecomment-5497180480 — process feedback (GitHub vs forum)

---

I filed a detailed feature request on GitHub before learning issues are closed for ideas. Bitwarden bot tracked it as **PM-42657** before redirecting to the forum.

**The ask:** Desktop and CLI should share vault unlock state on the same machine. If I unlock the Desktop app, the CLI should not force a second unlock (and vice versa). That is what a CLI is for when it wraps the same vault — not a separate siloed session per interface.

The GitHub issue proposes opt-in flags (`--use-desktop-session`, `bw unlock --from-desktop`, `BW_USE_DESKTOP_SESSION`) and documents security constraints, IPC paths, and why open PR #22448 (Desktop biometric unlock for CLI) is related but **not equivalent** — biometrics-on-unlock is not reusing an already-unlocked Desktop session.

Please **vote** on this existing thread if it matches your workflow. The GitHub links above have the full spec and my additional comments.

— Ryan Johnson (@AMDphreak)
