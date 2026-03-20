## Problem

I'm looking at building a Publishing-as-a-Service style workflow: a single dashboard that connects to GitHub and multiple package registries (PyPI, npm, Crates.io, etc.) and can trigger publishes from one place. Right now PyPI only trusts a fixed set of OIDC issuers, so any such service can't use Trusted Publishing—I'd have to fall back to long-lived API tokens, which defeats the security and UX benefits of OIDC.

Trusted Publishing on Crates.io only accepts OIDC tokens from a fixed set of built-in providers (e.g. GitHub Actions, GitLab). Third-party publishing orchestration services, custom CI, or other OIDC-capable IdPs cannot be used—their tokens are rejected. The only workaround is long-lived API tokens, which undermines the security and UX benefits of OIDC.

Generic OIDC support (configurable issuer URL + subject identifier, as proposed here) would let users register their own trusted publisher once in PyPI and then use third-party or custom CI that issues OIDC tokens, without storing secrets. I'm in favor of that direction and would like to see it become a supported path.

## Requested solution

Support **custom OIDC trusted publishers**: allow users to register a trusted publisher with an **Issuer URL** and **Subject identifier** (or equivalent claim). Configuration remains one-time and interactive in Crates.io; the registry validates the token's issuer and subject against the configured values. Optionally, an allowlist of issuer hostnames could be used to restrict which custom IdPs are accepted.

## Why it matters

- More teams can use short-lived OIDC tokens instead of long-lived Crates.io API tokens.
- Centralized or third-party publishing tools can support Crates.io without handling or proxying secrets.
- Parity with other registries (PyPI, npm) that have or are considering generic/custom OIDC.

**Target:** rust-lang/crates.io (Trusted Publishing and OIDC validation).  
**Related:** [Crates.io Trusted Publishing](https://crates.io/docs/trusted-publishing), rust-lang/rfcs#3691.
