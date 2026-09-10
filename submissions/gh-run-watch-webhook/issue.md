`gh run watch` today polls the Actions API on an interval. That burns quota, adds up to one interval of latency on every completion, and pushes every tool and agent to reinvent the same watcher. A webhook-backed (or other push) completion path for watchers would be kinder to the API and better for humans and scripts alike.

### Describe the feature or problem you'd like to solve

`gh run watch` is the right UX for “block until this workflow run finishes,” but under the hood it **polls** the Actions REST/GraphQL API on a fixed interval.

That has three concrete costs:

1. **API quota** — every active watcher keeps hitting the API even when nothing changed.
2. **Latency** — completion is only noticed on the next poll tick (up to the full interval).
3. **Reinvention** — scripts, IDE agents, and local wait buses each reimplement the same poll loop because there is no shared, push-oriented completion signal for “this run is done.”

Related work like [log streaming for `gh run watch`](https://github.com/cli/cli/issues/3484) improves feedback while a run is in progress. This request is about **completion signaling**: prefer an event/push path over periodic poll for “watch until terminal status.”

### Proposed solution

Prefer **webhooks / push completion** (or an equivalent server-push channel) for `gh run watch`, with poll remaining as a fallback.

Concrete shapes that would help (any one is useful; combinations welcome):

- **Webhook-backed watch** — when the environment can receive events, complete `gh run watch` on a `workflow_run` (or job status) delivery instead of interval poll.
- **One-shot watch API / CLI registration** — e.g. register interest in a run id and block until GitHub signals terminal status (device-flow / managed relay / cloud-side waiter), so clients do not each own a poller.
- **Documented hand-off** — if `gh` itself cannot own inbound delivery on every OS (especially Windows localhost), still expose a small contract so tools can subscribe once instead of polling forever.

**Windows / localhost note:** inbound forge webhooks do not reach a laptop without a relay (`gh webhook forward`, smee, cloudflared, etc.). That does **not** make push-oriented watch worthless — it remains high value for cloud runners, Codespaces, CI-adjacent hosts, and any `gh`-managed relay or device flow. Poll can stay the offline/local default.

**Who benefits**

- Humans watching long runs from the terminal (lower latency, fewer wasted requests).
- Scripts and automation that today wrap `gh run watch` or roll their own pollers.
- Agentic / harness tooling that needs an efficient “wait for this Actions run” primitive without nesting poll-on-poll.

Related local experiment (not a demand on `gh`): [dev-centr/wait-hub](https://github.com/dev-centr/wait-hub) — a machine-local wait/event bus with GitHub Actions as adapter #1. Ideal future: `gh` hands off waits or uses webhook-driven completion so local tools do not each invent watchers.

### Additional context

Searched existing `cli/cli` issues for `gh run watch` + webhook / poll / push completion. Closest neighbors:

- [#3484](https://github.com/cli/cli/issues/3484) — log streaming for `gh run watch` (progress feedback; platform-blocked; different ask).
- [#3559](https://github.com/cli/cli/issues/3559) — `gh workflow run --watch` (convenience; still poll underneath).
- [#12143](https://github.com/cli/cli/issues/12143) — configurable poll interval (mitigates quota/latency; does not remove poll).

Happy to refine the API surface if maintainers prefer a platform-first design (Actions push channel) with `gh` as the first consumer.
