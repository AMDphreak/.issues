# Crates.io: Support custom OIDC Identity Provider for Trusted Publishing

## Summary

Request that Crates.io support **configurable / custom OIDC Identity Providers** for Trusted Publishing, instead of only accepting a fixed set of issuers (e.g. GitHub Actions, GitLab). This would allow third-party publishing orchestration services, custom CI, and other OIDC-capable systems to publish on behalf of users without requiring long-lived API tokens.

## Problem

Today, Trusted Publishing on Crates.io only accepts OIDC tokens from a **fixed set of built-in providers** (e.g. GitHub Actions, GitLab). If a user or organization wants to publish via:

- A "Publishing-as-a-Service" platform (e.g. a central dashboard that connects GitHub + multiple registries and triggers publishes),
- A self-hosted or internal CI system that issues OIDC tokens,
- Another OIDC-capable IdP (e.g. other CI providers, corporate SSO),

the registry rejects the token because the issuer is not on the supported list. The only workaround is **long-lived API tokens**, which undermines the security and UX benefits of OIDC (no secrets in CI, short-lived credentials, no manual rotation).

So: **we can’t use Trusted Publishing with any identity provider that isn’t one of the built-in options.**

(Note: The Trusted Publishing RFC and docs mention that Crates.io intentionally limits support to large, established CI providers for security and operational reasons. This request is to add a **supported path** for custom OIDC—e.g. configurable issuer + subject—while still allowing the team to apply policy or allowlisting as needed.)

## Requested solution

Support **custom OIDC trusted publishers** by allowing users to register a trusted publisher with:

- **Issuer URL** (e.g. `https://my-service.example.com/oidc`)
- **Subject identifier** (or equivalent claim) that uniquely identifies the workflow/pipeline that is allowed to publish

Configuration would still be done by the crate owner in Crates.io (one-time, interactive). The registry would validate the OIDC token’s issuer and subject (or agreed claim set) against the configured values.

Optional: an **allowlist of issuer hostnames/patterns** if the team wants to restrict custom IdPs to well-known or vetted domains while still allowing more than the current set of providers.

## Why it matters

- **Security:** More teams can use short-lived OIDC tokens instead of long-lived Crates.io API tokens.
- **Automation:** Centralized or third-party publishing tools can support Crates.io without handling or proxying secrets.
- **Parity:** Other registries (e.g. PyPI, npm) have or are considering generic/custom OIDC; aligning with that direction helps maintainers who publish to multiple registries.

## Target repo

- **rust-lang/crates.io** (Trusted Publishing configuration and OIDC validation).

## Related

- Conversation source: *Gemini – Publishing Packages Across Registries* (custom OIDC as blocker for universal publishing services).
- Crates.io Trusted Publishing: <https://crates.io/docs/trusted-publishing>.
- rust-lang/rfcs#3691 (Trusted Publishing Support).
