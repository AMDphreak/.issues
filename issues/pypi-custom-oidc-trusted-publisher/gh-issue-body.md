Adding a use case that this issue would unblock:

I'm looking at building a "Publishing-as-a-Service" style workflow: a single dashboard that connects to GitHub and multiple package registries (PyPI, npm, Crates.io, etc.) and can trigger publishes from one place. Right now PyPI only trusts a fixed set of OIDC issuers, so any such service can't use Trusted Publishing -- I'd have to fall back to long-lived API tokens, which defeats the security and UX benefits of OIDC.

Generic OIDC support (configurable issuer URL + subject identifier, as proposed here) would let users register their own trusted publisher once in PyPI and then use third-party or custom CI that issues OIDC tokens, without storing secrets. I'm in favor of that direction and would like to see it become a supported path.

The same need exists on npm and Crates.io, so alignment across registries would help maintainers who publish to all of them.
