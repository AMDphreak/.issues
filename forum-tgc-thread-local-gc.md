# Forum draft: Opt-in thread-local GC (`tgc`) for D

**Target:** https://forum.dlang.org (General or Language / Runtime as appropriate)

**Title:** Opt-in thread-local GC (`tgc`): per-thread heaps without global STW

---

Hi all,

We've been looking at the gap between D's thread-local / actor-style data model (`std.concurrency`, TLS by default) and the process-wide stop-the-world GC. Today, a collection in any thread pauses every registered thread—including carefully written `@nogc` realtime workers.

We've prototyped an **opt-in** collector registered as **`tgc`** (thread garbage collection; informal side-name "realtime GC"):

- Enable with `--DRT-gcopt=gc:tgc`
- Per-thread heap arenas; local collect without `thread_suspendAll`
- Default conservative GC unchanged
- **0.1.0 prototype only** — partitioned shared regions are the target cross-thread model (not copy-first); region collect not implemented yet

**Upstream PR:** https://github.com/dlang/dmd/pull/23514

**Design article (full background):** https://dlang-supplemental.github.io/docs/docs/blog/thread-local-gc-tgc.html

**Canonical design (0.1.0 scope):** https://dlang-supplemental.github.io/docs/docs/proposals/tgc-design-0.1.0.html

**Short announcement:** https://dlang-supplemental.github.io/docs/docs/news/tgc-upstream-pr.html

This is deliberately *not* a proposal to replace the default GC. Historical forum discussion around built-in thread-local heaps noted shared/`immutable` complexity; framing this as pluggable/opt-in keeps the blast radius small and matches the existing `--DRT-gcopt=gc:…` factory API.

Feedback on the design, 0.1.0 limits, and whether a formal DIP is wanted welcome on the PR or here.

Thanks,
Ryan / dlang-supplemental
