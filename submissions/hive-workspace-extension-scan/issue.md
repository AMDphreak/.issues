Opening one parent folder that holds many independent git repositories makes Cursor’s VS Code workbench, the Java extension, and Tailwind CSS IntelliSense treat that folder as a single project. They walk the whole tree, start a Gradle sync per nested build, and index every Tailwind config they find. On a 16-thread Windows machine this stalled video decode, audio, and the mouse. The extensions were supposed to stay enabled. The folder was supposed to stay the workspace. Scanning every nested repo is the bug.

## What I opened

A parent directory of unrelated clones, not one multi-project build and not one monorepo. Cursor 3.31.15 (VS Code 1.128.0, commit `3eb8c13390837371c7c2f2013dc57fdbc802c750`) had that folder open as a workspace. Windows build 26300, 16 logical processors, 64 GB RAM. The code volume is a SATA SSD. The OS is on a separate NVMe disk.

## What ran

From about 22:31 to 22:54 local time on 20 November 2026:

- Language Support for Java 1.58.0 (bundled JRE 25.0.4.1) started importing Gradle projects across that tree. The log shows `GradleProjectImporter.importToWorkspace` synchronizing unrelated builds (`android`, `llama.android`, `whisper.android`, `whisper.android.java`, and another project named `java`). Checksum downloads for Gradle `9.2.0` and `9.3.0` snapshot wrappers failed, and several syncs then failed with “error connecting to the Gradle build.”
- That import spawned 11 `GradleDaemon` processes plus a Kotlin compiler, all using the extension’s `java.exe`. They started between 22:39 and 22:56. After Cursor exited, the parent process was gone and the JVMs stayed up, still holding about 7.4 GB of working set.
- Tailwind CSS IntelliSense 0.16.0 wrote a 12 MB log while creating projects for Tailwind configs it found under the same parent (it detected both v3.4.18 and v4.1.18 configs in different repos).
- `workspaceContains` activation for the Java and Astro extensions timed out while searching the tree (`**/pom.xml`, `**/build.gradle*`, `astro.config.*`).
- At 22:46:36 the terminal host missed its heartbeat for 6 seconds, and two extension hosts were unresponsive until about 22:46:42. That lines up with the Gradle syncs.
- On quit, the built-in `fileWatcher` utility process could not be killed and exited `3221225477` (`0xC0000005`, access violation). Four more 6-second terminal-host heartbeat misses landed in the minute before shutdown.

Windows logged no display-driver reset and no low-memory event. The pagefile peak was a few hundred megabytes, so this was not an out-of-memory kill. The machine hitched because of the import and the scan.

## Expected

Opening a parent of many repositories, with these extensions left on, should scope work to the repository of the file being edited. Do not Gradle-import every nested build at startup. Do not instantiate a Tailwind project per config under that parent. Do not run `workspaceContains` and the file watcher across every sibling repo. Daemons started for a sync that the user did not ask for should not keep multi-gigabyte JVMs alive after the editor exits.

Disabling the extensions, or refusing to open the parent folder, is not the fix I want.

## Filed to

- Java import: https://github.com/redhat-developer/vscode-java/issues/4577
- Tailwind scan: https://github.com/tailwindlabs/tailwindcss-intellisense/issues/1633
- Workbench activation and file watcher: https://github.com/microsoft/vscode/issues/349589
- Cursor forum: not submitted. `cursor/cursor` has GitHub issues disabled, and https://forum.cursor.com/new-topic?category_id=6 redirected to login. Draft: `cursor-forum-body.md`.
