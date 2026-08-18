---
title: Graft native-compiler output into a pinned APE header template
repository: jart/cosmopolitan
issue_number: 1512
url: https://github.com/jart/cosmopolitan/issues/1512
submitted: 2026-08-18
---

Graft native-compiler output into a pinned APE header template

cosmocc today wraps GCC/Clang (`tlscc`, `-mno-red-zone`, TLS instruction rewrites) and emits APE. It does not take an image produced by host MSVC or Apple clang — with that vendor's optimizations and bugfixes — and transplant PT_LOAD / PE sections into a stable APE header blob.

The header schema (`ape/specification.md`: magics, printf octal ELF, dd Mach-O windows) changes slowly. If cosmocc pinned a template per APE revision and copied native `.text`/`.data` into the payload slots (or into the ZIP overlay), LLVM/MSVC improvements would show up in APE outputs without reimplementing codegen.

Dev-Centr is shipping the reliable subset first: ZIP of native slices + an assimilate/tailor tool. Surgical transplant belongs in cosmocc if you want APE to stay the *running* image rather than a pack format.

Related: https://github.com/jart/cosmopolitan/issues/377 (static binaries / format confusion)
https://github.com/dev-centr/binary-tailor
