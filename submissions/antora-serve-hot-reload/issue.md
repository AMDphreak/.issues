---
issue_url: https://gitlab.com/antora/antora/-/issues/1202
type: enhancement
status: open
repository: gitlab.com/antora/antora
---

# Feature Request: `antora serve` — hot-reload development server

## Summary

Add a **`serve`** subcommand that generates the site, serves it over HTTP with live reload, and rebuilds automatically when playbook, content, or UI bundle files change. This improves the local documentation authoring experience without requiring external tools (e.g. `browser-sync` + separate watch scripts).

## Motivation

- Authors currently run `antora generate` repeatedly or rely on custom npm scripts with `chokidar`/`nodemon` + a separate static server and live-reload setup.
- A built-in `antora serve` keeps the workflow simple and consistent across projects.
- Single command: one process that watches, rebuilds, and serves with browser reload.

## Proposed behavior

- **Command**: `antora serve [options] <playbook>`
- **Default port**: `5252` (overridable with `-p, --port <port>`).
- **Flow**:
  1. Build playbook and run the site generator once (same as `generate`).
  2. Start an HTTP server that serves the site output directory (e.g. `build/site`).
  3. Inject a small script into HTML pages that polls a special endpoint (`/__antora_reload`) and reloads the page when the build version changes.
  4. Watch the playbook file, local content source paths, and local UI bundle path (no watch for remote URLs).
  5. On file change: debounce, re-run the generator, then increment the reload version so connected browsers refresh.

- **Options**: Same playbook options as `generate` (e.g. `--to-dir`, `--log-level`) plus `--port`.
- **Graceful shutdown**: SIGINT/SIGTERM close the server and watchers, then exit like `generate`.

## Implementation notes

- Use Node built-in `http` and `fs.watch` (no new dependencies).
- Watch paths derived from the built playbook: `playbook` file, `content.sources[].url` (resolved with `start_path` when local), `ui.bundle.url` (when local).
- Only bump reload version after a successful rebuild so failed builds do not trigger a reload.

- **GitLab MR**: [!1109](https://gitlab.com/antora/antora/-/merge_requests/1109)

## Local implementation

- **Repository**: [antora/antora](https://gitlab.com/antora/antora)
- **Branch**: `feature/serve-hot-reload`
- **Packages modified**: `@antora/cli`
- **New file**: `packages/cli/lib/serve.js` (createServer, getWatchPaths, watchPaths)
- **Modified**: `packages/cli/lib/cli.js` (new `serve` command)

## Usage example

```sh
antora serve antora-playbook.yml
# Serving at http://localhost:5252 (live reload enabled). Press Ctrl+C to stop.

antora serve -p 8000 antora-playbook-local.yml
```

## References

- Antora docs: run-antora, install-and-run-quickstart
- Similar workflows: Vite, MkDocs `serve`, Hugo `server`
