SoloMD already speaks OpenAI-compat and first-classes Ollama auto-detect — which is great for many users and awkward for everyone running a different local runner (LM Studio, llama.cpp server, vLLM, niche forks). The missing piece is not another hard-coded port list inside SoloMD; it is a **shared open registration protocol** so runners register once and any editor (including SoloMD) can discover them.

## Proposal

Dev-Centr is drafting **Open Provider Registry (OPR)** and a reference local implementation (**UniProvider**):

- Spec: https://github.com/dev-centr/uniprovider/blob/main/spec/opr.md
- Reference repo: https://github.com/dev-centr/uniprovider
- Encyclopedia write-up: https://docs.devcentr.org/general-knowledge/explanation/infrastructure/uniprovider.html (after hub rebuild)

**Ask of SoloMD:** consider consuming OPR (read `opr/providers/*.opr.json` and/or `GET /opr/v1/providers` from a localhost aggregator) instead of growing more brand-specific auto-detect paths. Your existing `openai-compat` provider slot is already the right *wire* seam — OPR only answers *what exists* on the machine.

## Why not invent another unilayer inside SoloMD

If every Tauri/Electron editor invents its own registration format, offline model runners become the unpaid standards body. OPR is deliberately **protocol-named**, not product-locked: other aggregators (LiteLLM, Olla, Hornet/Mixr, future apps) can speak it without depending on UniProvider.

## What is *not* asked of you

- Hosting a global public provider marketplace (OpenRouter-shaped). OpenAI-compat is not that either. A tentative online directory skeleton lives at https://github.com/dev-centr/opr-directory — **out of scope** for SoloMD and for UniProvider today.
- Rewriting SoloMD in D. Prefer localhost HTTP / reading manifests from disk; FFI/WASM only if you measure a real cost.

## Prior art (honest)

| Thing | Gap |
| --- | --- |
| OpenAI-compat `/v1` | Wire format only |
| OpenRouter | Curated marketplace, not open self-serve local registration |
| LiteLLM / Olla | Excellent operator proxies; profiles/config owned by the aggregator, not a neutral on-disk drop runners write for *any* consumer |
| UPP | Client call abstraction, not machine discovery |

So this is complementary to SoloMD’s stack, not a claim that discovery never existed.

## Screenshots (context — SoloMD UX we recommend to Markdown-on-disk users)

![Live edit](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/solomd-uniprovider/solomd-live-edit.png)

![Split view](https://raw.githubusercontent.com/AMDphreak/.issues/main/images/solomd-uniprovider/solomd-split-view.png)

Happy to adjust the OPR draft based on what would make a SoloMD consumer painless (manifest shape, first-run UX, MCP adjacency).
