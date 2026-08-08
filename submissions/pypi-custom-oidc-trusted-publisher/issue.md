# PyPI: Comment on #19347 (Generic OIDC support)

## Purpose

**Comment on existing issue**, not a new issue. The body below is written from a commenter’s point of view: it adds a use case and expresses support for the direction proposed in pypi/warehouse#19347.

## Target

- **pypi/warehouse#19347** – [Generic OIDC support](https://github.com/pypi/warehouse/issues/19347)  
- **Body for comment:** `gh-issue-body.md` (framed as “adding a use case that this issue would unblock”)

## Context (for local reference)

Trusted Publishing on PyPI currently only accepts OIDC tokens from a fixed set of built-in providers (GitHub Actions, GitLab CI, Google Cloud, ActiveState). Generic OIDC would allow configurable issuer URL + subject identifier so that third-party or custom CI (e.g. a “Publishing-as-a-Service” dashboard) could use Trusted Publishing instead of long-lived API tokens. Issue #19347 already requests that; this asset is the comment text adding the PaaS use case and a +1 for that direction.

## Related

- Conversation source: *Gemini – Publishing Packages Across Registries* (custom OIDC as blocker for universal publishing services).
- PyPI Trusted Publishers: <https://docs.pypi.org/trusted-publishers/>.
