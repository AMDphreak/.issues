# pnpm tests: brittleness from ANSI/chalk and path-sensitive assertions (class of issue)

## Summary

Several pnpm tests fail or are fragile because they assert on **exact string output** that includes (1) **chalk/ANSI escape codes** or (2) **absolute filesystem paths**. When the environment differs (no TTY, chalk disabled, Windows vs Unix, or virtual store returning relative paths), the same behavior produces different strings and tests fail.

This is a **class of issue**: the same pattern appears in list, outdated, and formatError tests.

## Root causes

1. **ANSI/chalk**  
   Tests use `expect(output).toBe(expected)` or `expect(output).toContain(chalk.xyz('text'))` where `output` is terminal-style. Chalk can insert escape codes inside or around text; when chalk is disabled (e.g. `FORCE_COLOR=0`), expected and actual can diverge. **Fix:** Strip control characters (e.g. `stripVTControlCharacters` from `util`) on the received (and if needed expected) string before comparing, or assert on plain substrings (e.g. `toContain('(deprecated)')` after stripping).

2. **Path sensitivity**  
   Tests build `expected` with `path.join(fixture, 'node_modules/.pnpm/...')` (absolute). The implementation may return **relative** paths (e.g. `.pnpm/pkg@1.0.0/node_modules/pkg`) when there is no `node_modules` manifest or in some store layouts. **Fix:** Normalize both strings (e.g. replace the absolute `lockfileDir/node_modules/.pnpm` prefix with `.pnpm`) before comparing, so tests pass whether the implementation returns absolute or relative paths.

## Affected areas (and status)

| Location | Issue | Status |
|----------|--------|--------|
| `reviewing/list/test/index.ts` | Tree output: exact `toBe()` with chalk; parseable/JSON: exact absolute paths; long format: exact metadata or paths | **Fixed** in PR #10892 (strip ANSI, normalizeDepPaths, relax long-format) |
| `reviewing/plugin-commands-outdated/test/renderLatest.test.ts` | `toContain(chalk.redBright('(deprecated)'))` — can fail when chalk is disabled | **Fixed** (strip output, assert on `'(deprecated)'`) |
| `pnpm/test/formatError.test.ts` | `toBe(\`${ERROR} ${chalk.red("...")}\`)` — can diverge when chalk is disabled | **Fixed** (strip both sides, then toBe) |
| `reviewing/plugin-commands-listing/test/*.ts` | Use stripAnsi; expected strings use exact paths — could fail if list returned relative paths | Not changed; same path normalization could be added if needed |

## Recommendations

- For **any test** that compares CLI/terminal output: strip ANSI before equality or substring assertions.
- For **list/parseable/JSON** output that includes dependency paths: normalize paths (e.g. to relative `.pnpm/...`) before comparing, so tests are env-agnostic.

## Related

- **Bug (main):** pnpm list --only-projects regression — [#10651](https://github.com/pnpm/pnpm/issues/10651), fixed in PR [#10892](https://github.com/pnpm/pnpm/pull/10892).
- **Test brittleness:** Addressed in same PR (list package) and in a separate PR for outdated + formatError tests.
