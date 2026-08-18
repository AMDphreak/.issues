---
title: LLDB ObjectFile: score PE+ELF+Mach-O chords instead of first-match MZ
repository: llvm/llvm-project
issue_number: 216918
url: https://github.com/llvm/llvm-project/issues/216918
submitted: 2026-08-18
---

Score PE+ELF+Mach-O as a chord instead of first-match MZ

LLDB ObjectFile plugins iterate create callbacks and return the first plugin that constructs an ObjectFile. Actually Portable Executable (APE) files start with `MZ` (and often `MZqFpD='`), so ObjectFilePECOFF claims the file on Linux. The debugger then maps PE virtual addresses onto a ptrace target and fails.

This is not a missing plugin *kind*. PE, ELF, and Mach-O plugins already exist. The gap is **greedy first-match** vs a **survey + score** pass:

1. Every ObjectFile plugin inspects the first 8 KiB (APE's documented stub window) and returns a confidence plus the ranges it understood.
2. If two or more plugins score high (a chord), a meta-plugin (`ObjectFilePolyglot`) owns the file.
3. That plugin queries the process plugin (Linux / Windows / Darwin) for the live OS and projects that slice into the section/symbol tables.

Prototype: https://github.com/dev-centr/polyglot-debug (`plugin/ObjectFilePolyglot.cpp`, `patches/lldb-objectfile-chord.patch`).

Security: keep the survey bounded (8 KiB + existing magic probes). Do not follow unbounded overlay pointers during scoring.

Related write-up: https://devcentr.org/news/2026-08-18-when-the-binary-assumes-one-kernel
