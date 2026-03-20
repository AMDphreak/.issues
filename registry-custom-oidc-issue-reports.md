# Registry custom OIDC – issue reports index

**Source:** Conversation *Gemini – Publishing Packages Across Registries* (exported 2026-03-11).  
**Problem:** Package registries (npm, PyPI, Crates.io) only trust a fixed set of OIDC issuers (e.g. GitHub Actions, GitLab CI, CircleCI). They do **not** allow custom OIDC Identity Provider URLs. That blocks:

- “Publishing-as-a-Service” platforms (one dashboard to publish to many registries).
- Custom or self-hosted CI that issues OIDC tokens.
- Any third-party IdP not on the built-in list.

**Request:** Support **custom / configurable OIDC** as a first-class path (e.g. issuer URL + subject identifier) so users can register their own trusted publishers without falling back to long-lived API tokens.

---

## Issue reports (published via gh)

| Registry   | Local issue folder | GitHub |
|-----------|--------------------|--------|
| **npm**   | [issues/npm-custom-oidc-trusted-publisher/](issues/npm-custom-oidc-trusted-publisher/) | [npm/cli#9104](https://github.com/npm/cli/issues/9104) |
| **PyPI**  | [issues/pypi-custom-oidc-trusted-publisher/](issues/pypi-custom-oidc-trusted-publisher/) | Comment on [pypi/warehouse#19347](https://github.com/pypi/warehouse/issues/19347#issuecomment-4042884060) (Generic OIDC support) |
| **Crates.io** | [issues/cratesio-custom-oidc-trusted-publisher/](issues/cratesio-custom-oidc-trusted-publisher/) | [rust-lang/crates.io#13155](https://github.com/rust-lang/crates.io/issues/13155) |

Each folder contains:

- **issue.md** – Full problem statement, requested solution, and context.
- **gh-issue-body.md** – Short body suitable for a new GitHub issue or a comment (e.g. on PyPI #19347).

Use **issue.md** for your own notes and **gh-issue-body.md** when opening or commenting on issues.
