---
title: Add Harness provider for local Mixr routing
repository: pingdotgg/t3code
pull_number: 10842
url: https://github.com/pingdotgg/t3code/pull/10842
submitted: 2026-09-08
status: submitted
media: none
---

## Summary

Hi! T3 Code already supports several agent backends, but it cannot currently connect to DevCentr’s lightweight local Harness runtime.

This PR adds Harness as a built-in provider:

- adds typed `harness` settings for the local server URL and optional binary path
- maps T3 Code sessions and turns onto Harness’s `/api/provider/*` HTTP surface
- reports Harness health and runtime events through the existing provider registry
- adds Harness to the provider picker with a small neutral provider mark

Harness currently returns its persisted Mixr route confirmation while live routed completion invocation is still being implemented in the runtime. The adapter deliberately preserves that current behavior rather than hiding it.

Happy to adjust naming or integration details to better fit the provider architecture.

## Screenshots

Not included. The visible change is limited to a Harness entry in the existing provider picker.

## How to try it

1. Build and run `harness serve <chat-root> --port=8765`.
2. Configure the Harness provider’s server URL as `http://127.0.0.1:8765`.
3. Select **Harness** in the provider picker and start a thread.

## Validation

- contracts, server, and web typechecks
- repository formatting checks
- 182 targeted provider, settings, and UI tests
