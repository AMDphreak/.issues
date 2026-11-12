## Summary

Hi! Sending a library to the Context7 index still means the website or a raw HTTP call. The published CLI can query docs and install local agent setup, and a command named `add` would sound like that local install (`ctx7 skills add` already does).

This PR tries to add one authenticated command, `ctx7 submit`, that posts a source URL to the existing Add Library API:

- GitHub, GitLab, Bitbucket, other Git remotes, a documentation website, an OpenAPI spec, or an `llms.txt` file
- `--website-base-url` so a website crawl can be limited to the HTML documentation root
- `--json` and stable exit codes for scripts and agents
- Login via `ctx7 login` or `CONTEXT7_API_KEY`. A source that is already indexed exits 0

This does not install anything on the machine. WinGet packaging and a `context7` binary alias are left out, so this is one product decision. Related discussion: #2949. The earlier combined pull request was #2950.

Happy to adjust anything that does not fit the project's taste.

## How to try it

1. `ctx7 login` or set `CONTEXT7_API_KEY`
2. `ctx7 submit https://github.com/owner/repo --json`
3. `ctx7 submit https://dlang.org/spec/spec.html --website-base-url https://dlang.org/spec/`
