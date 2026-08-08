---
title: Vercel MCP returns opaque 406 on Streamable HTTP when Accept negotiation does not match (Antigravity and custom headers)
repository: vercel/vercel-mcp-overview
issue_number: 1
url: https://github.com/vercel/vercel-mcp-overview/issues/1
pull_request: https://github.com/vercel/vercel-mcp-overview/pull/2
submitted: 2026-05-15
---

## Summary

`https://mcp.vercel.com` rejects many MCP HTTP clients with **406 Not Acceptable** during the Streamable HTTP handshake. The failure mode is opaque (generic 406, no guidance on required headers), and the public docs do not describe the exact `Accept` / `Content-Type` negotiation the server enforces.

This makes third-party clients (e.g. Google Antigravity) appear "bricked" even when configuration is otherwise correct.

## Environment

- **Server:** `https://mcp.vercel.com` (Vercel MCP, Streamable HTTP transport)
- **Client:** Google Antigravity (remote HTTP MCP)
- **Auth:** Bearer token via `headers.Authorization` (remote servers; Antigravity schema rejects top-level `authorization` for non-local MCP)

## What happens

1. Vercel MCP enforces strict content negotiation on Streamable HTTP requests. If `Accept` does not match what the server expects, it returns **406 Not Acceptable** instead of falling back to JSON-only responses.

2. Antigravity injects its own `Accept` header internally, e.g.:

   ```
   Accept: application/json, application/mcp+json
   ```

3. When users also set `Accept` in MCP config `headers`, Antigravity's client and the user override can collide. Vercel sees a non-conforming `Accept` value and the handshake dies with 406.

4. Antigravity's config schema only allows `authorization` for **local** MCP servers; remote servers must use `headers` for `Authorization`. That is reasonable, but combined with (2)–(3) it is easy to misconfigure without any doc pointing at the required header set.

5. Vercel's setup docs (<https://vercel.com/docs/agent-resources/vercel-mcp>) list one-click installs per client but do **not** document:
   - Required `Accept` values for Streamable HTTP `initialize` / JSON-RPC POST
   - Whether `application/mcp+json` is accepted
   - How custom `headers` interact with client-default headers
   - Example `curl` for debugging negotiation without a full IDE

## Expected

- Document required request headers for Streamable HTTP (at minimum `Accept` and `Content-Type`) on the Vercel MCP docs page.
- Return a **actionable** error body on 406 (e.g. which `Accept` values are required, link to docs).
- Where possible, accept common client `Accept` combinations that still satisfy the MCP Streamable HTTP spec (e.g. tolerate `application/mcp+json` when `application/json` is also present), or clearly state that only `application/json, text/event-stream` is supported.
- List Antigravity (or generic "custom HTTP MCP client with configurable headers") in troubleshooting if approval is required.

## Actual

- Connection fails with **406 Not Acceptable** during MCP handshake.
- Error message does not explain header requirements.
- Trial-and-error across `Accept` / `Content-Type` / auth placement is required.

## Working configuration (Antigravity)

The only combination found to satisfy both Antigravity and Vercel MCP:

```json
{
  "mcpServers": {
    "vercel-web": {
      "serverUrl": "https://mcp.vercel.com",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN",
        "Content-Type": "application/json"
      }
    }
  }
}
```

Notably: **do not** set `Accept` in `headers` (let Antigravity supply it, or ensure it matches Vercel's requirements exactly). Use `headers` for auth, not top-level `authorization`.

## Suggested improvements

1. **Docs:** Add a "Streamable HTTP / troubleshooting" section with:
   - Required headers table
   - `curl` example for `initialize` (with and without Bearer token)
   - Note for clients that inject default `Accept`

2. **Server:** On 406, respond with JSON explaining required `Accept` media types.

3. **Interoperability:** Review whether strict rejection of `Accept: application/json, application/mcp+json` is necessary vs. spec-compliant `application/json, text/event-stream`.

## Related

- MCP Streamable HTTP transport: <https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http>
- Similar 406 reports elsewhere (missing or wrong `Accept`): <https://github.com/vercel/next-devtools-mcp/issues/90>, <https://github.com/modelcontextprotocol/typescript-sdk/issues/1414>
