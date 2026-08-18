Prefer ELF in a PE+ELF chord when the inferior is POSIX

`bfd_check_format_matches` can already record multiple matching targets. GDB still commonly opens Cosmopolitan APE binaries via `pei-x86-64` because `MZ` sits at offset 0 and the PE vector is tried early. On Linux that yields a PE section map against a SysV inferior.

When matches include both `pei-*`/`pe-*` and `elf64-*` (and optionally `mach-o-*`), select the target that matches the native GDB OS (or the already-running inferior), not the first MZ hit.

APE magics: `MZqFpD='` and `jartsr='` (see Cosmopolitan `ape/specification.md`). Survey only the first 8192 bytes plus each target's existing matcher.

Sketch: https://github.com/dev-centr/polyglot-debug/blob/main/patches/gdb-bfd-survey.patch
