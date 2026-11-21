Opening a parent folder of many independent git repositories makes the workbench and installed extensions treat that folder as one project. They walk the whole tree. On 20 November 2026 that stalled video decode, audio, and the mouse. I am going to keep opening folders like that, and I am going to keep the extensions enabled. The scan has to be scoped to the repo I am editing.

Cursor 3.31.15 (VS Code 1.128.0, commit `3eb8c13390837371c7c2f2013dc57fdbc802c750`), Windows build 26300, 16 logical processors, 64 GB RAM.

### Where does the bug appear?

Cursor IDE. The workspace was one parent folder of unrelated clones, opened as a single folder. Not a multi-root workspace I assembled, and not one monorepo.

### What happened

From about 22:31 to 22:54 local time:

- Language Support for Java 1.58.0 imported every nested Gradle build it found (`GradleProjectImporter.importToWorkspace`). It synchronized unrelated projects (`android`, `llama.android`, `whisper.android`, `whisper.android.java`, and a project named `java`). Gradle `9.2.0` and `9.3.0` snapshot checksum downloads failed, then the syncs failed.
- That launched 11 `GradleDaemon` JVMs plus a Kotlin compiler, using the extension’s bundled JRE 25.0.4.1. After I quit Cursor their parent process was gone and they were still using about 7.4 GB.
- Tailwind CSS IntelliSense 0.16.0 wrote a 12 MB log creating a project for configs under other child repos (it saw both Tailwind 3.4.18 and 4.1.18).
- `workspaceContains` activation for Java and Astro timed out while searching the whole parent.
- At 22:46:36 the terminal host missed a 6-second heartbeat and extension hosts were unresponsive until about 22:46:42.
- On quit the built-in file watcher could not be killed and exited `3221225477` (`0xC0000005`).

Windows logged no GPU timeout and no low-memory event. The pagefile was barely used.

### How to reproduce

1. Put several independent git clones under one parent folder. Include at least one Gradle project and one Tailwind project. The parent is not itself a build.
2. Open that parent in Cursor with the Java and Tailwind extensions enabled. Leave their settings at the defaults.
3. Wait for activation. Watch the Java log, the Tailwind output channel, and the process list.

### Expected

Scope file watching, `workspaceContains`, Gradle import, and Tailwind project discovery to the repository of the file being edited. Do not start a daemon per nested build. Do not keep those JVMs after exit. Do not crash the file watcher on shutdown.

Disabling the extensions, or only opening one repo, is not an acceptable fix. A parent of many repos is the workspace.

### Does this stop you from using Cursor?

It makes the whole machine hitch while that folder is open. Quitting Cursor stops the editor stalls. The Gradle daemons it started keep running until they are killed. Cursor itself still launches.

### Related reports, same session

- https://github.com/redhat-developer/vscode-java/issues/4577
- https://github.com/tailwindlabs/tailwindcss-intellisense/issues/1633
- https://github.com/microsoft/vscode/issues/349589

`cursor/cursor` has GitHub issues disabled, so this forum topic is the Cursor report.
