## Summary

- Add Antigravity to the client setup table in README (it was not listed among supported clients).
- Add `docs/antigravity.md` with OAuth and Bearer-token configuration, verification steps, and troubleshooting for the common **406 Not Acceptable** handshake failure.

## Motivation

Antigravity uses Streamable HTTP with its own default `Accept` header. Vercel MCP is strict about content negotiation; users who override `Accept` or misplace auth (`authorization` vs `headers`) see opaque 406 errors with no doc guidance.

Addresses #1

## Test plan

- [ ] JSON examples validate in Antigravity `mcp_config.json`
- [ ] Link from README resolves to `docs/antigravity.md`
- [ ] Consider mirroring this section on <https://vercel.com/docs/agent-resources/vercel-mcp>
