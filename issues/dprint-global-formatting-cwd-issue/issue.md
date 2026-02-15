# Issue: Support formatting files outside of current working directory with global config

## Description

The `dprint` CLI currently defaults to discovering configuration files within the Current Working Directory (CWD). This makes it difficult to format files passed as absolute paths that reside outside the project or when using a global configuration for arbitrary file formatting.

## Steps to Reproduce

1. Install `dprint` and a global configuration file (e.g., `dprint init --global`).
2. Navigate to a directory that is not within a `dprint` project.
3. Attempt to format a file in a different directory using an absolute path: `dprint fmt /absolute/path/to/file.json`.

## Expected Behavior

`dprint` should be able to resolve the configuration from the file's location or fall back to the global configuration, allowing the file to be formatted regardless of the CWD.

## Actual Behavior

`dprint` fails to find a configuration file or correctly apply the global configuration because it searches relative to the CWD, not the file location.

## Proposed Strategy

1.  Update `get_start_search_directory` in `resolve_main_config_path.rs` to handle absolute paths in `Fmt` commands.
2.  Ensure global configuration base paths are set to the system root so file patterns match globally.
3.  Add an `output-config-path` command to help debug which configuration file `dprint` is resolving.

## Links

- Main GitHub Issue: <https://github.com/dprint/dprint/issues/1091>
