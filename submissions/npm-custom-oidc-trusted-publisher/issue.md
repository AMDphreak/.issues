# npm: Support custom OIDC Identity Provider for Trusted Publishing

## Summary

Request that the npm registry support **configurable / custom OIDC Identity Providers** for Trusted Publishing, instead of only accepting a fixed set of issuers (GitHub Actions, GitLab CI, CircleCI). This would allow third-party publishing orchestration services, custom CI, and other OIDC-capable systems to publish on behalf of users without requiring long-lived API tokens.

## Problem

Today, Trusted Publishing on npm only accepts OIDC tokens from a **hard-coded list of issuers**. If a user or organization wants to publish via:

- A "Publishing-as-a-Service" platform (e.g. a central dashboard that connects GitHub + multiple registries and triggers publishes),
- A self-hosted or internal CI system that issues OIDC tokens,
- Another OIDC-capable IdP (e.g. corporate SSO, other CI providers),

the registry rejects the token because the issuer is not on the supported list. The only workaround is to fall back to **long-lived API tokens**, which undermines the security and UX benefits of OIDC (no secrets in CI, short-lived credentials, no manual rotation).

So: **we can’t use Trusted Publishing with any identity provider that isn’t one of the few built-in options.**

## Requested solution

Support **custom OIDC trusted publishers** by allowing users to register a trusted publisher with:

- **Issuer URL** (e.g. `https://my-service.example.com/oidc`)
- **Subject identifier** (or equivalent claim) that uniquely identifies the workflow/pipeline that is allowed to publish

Configuration would still be done by the package owner in npm (one-time, interactive), so security stays in the hands of the user. The registry would validate the OIDC token’s issuer and subject (or agreed claim set) against the configured values instead of only allowing a fixed set of known issuers.

Optional: a **allowlist of issuer hostnames/patterns** if the team wants to restrict custom IdPs to well-known or vetted domains while still allowing more than the current three providers.

## Why it matters

- **Security:** More teams can use short-lived OIDC tokens instead of long-lived npm tokens.
- **Automation:** Centralized or third-party publishing tools can support npm without handling or proxying secrets.
- **Parity:** Other registries (e.g. PyPI, Crates.io) are considering or have requests for generic/custom OIDC; aligning with that direction helps maintainers who publish to multiple registries.

## Target repo

- **npm/cli** (for user-facing docs and `npm trust` behavior), and/or the **registry backend** (where OIDC issuer allowlist is enforced). The registry is where issuer validation must change; the CLI would need to support adding/editing custom-issuer trusted publisher config if that’s exposed in the API.

## Related

- Conversation source: *Gemini – Publishing Packages Across Registries* (custom OIDC as blocker for universal publishing services).
- Existing npm trusted publishing: [Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers).
