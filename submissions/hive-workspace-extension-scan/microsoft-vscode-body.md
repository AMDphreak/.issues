<!-- ⚠️⚠️ Do Not Delete This! bug_report_template ⚠️⚠️ -->
<!-- Please read our Rules of Conduct: https://opensource.microsoft.com/codeofconduct/ -->
<!-- 🕮 Read our guide about submitting issues: https://github.com/microsoft/vscode/wiki/Submitting-Bugs-and-Suggestions -->
<!-- 🔎 Search existing issues to avoid creating duplicates. -->
<!-- 🧪 Test using the latest Insiders build to see if your issue has already been fixed: https://code.visualstudio.com/insiders/ -->
<!-- 💡 Instead of creating your report here, use 'Report Issue' from the 'Help' menu in VS Code to pre-fill useful information. -->
<!-- 🔧 Launch with `code --disable-extensions` to check. -->

Does this issue occur when all extensions are disabled?: Yes/No — not retested that way

The extension-host freezes in this session came from Language Support for Java and Tailwind CSS IntelliSense scanning a parent folder of many repos. Those are filed on their own projects. What I am reporting here is the built-in workbench: `workspaceContains` activation walked that whole tree and timed out, and the built-in `fileWatcher` utility process crashed on shutdown. I have not reproduced the crash with `--disable-extensions`, and I have not retested on Insiders. The crashing process type in the log is `fileWatcher`, not an extension host.

<!-- 🪓 If you answered No above, use 'Help: Start Extension Bisect' from Command Palette to try to identify the cause. -->
<!-- 📣 Issues caused by an extension need to be reported directly to the extension publisher. The 'Help > Report Issue' dialog can assist with this. -->

- VS Code Version: 1.128.0, observed in Cursor 3.31.15 (commit `3eb8c13390837371c7c2f2013dc57fdbc802c750`), which is the VS Code 1.128.0 fork I run
- OS Version: Windows build 26300, 64-bit, 16 logical processors, 64 GB RAM

Steps to Reproduce:

1. Make a parent folder whose children are many independent git repositories (a checkout hive). The parent is not one workspace file and not one multi-root list the user wrote by hand. Several children are real projects (Gradle, Tailwind, Astro).
2. Open that parent folder as the workspace and leave the usual language extensions enabled.
3. Leave it open while those extensions activate.
4. Quit the window.

What happened on 20 November 2026, local time:

- `workspaceContains` activation timed out for Java (`**/pom.xml`, `**/build.gradle`, `**/settings.gradle`, and the Kotlin variants) and for Astro (`astro.config.*`). The search was the whole parent.
- At 22:46:36 the pty host logged `No ptyHost heartbeat after 6 seconds`. Two extension hosts were unresponsive from 22:46:37 until 22:46:42.
- On quit, around 22:53:57: `UtilityProcess ... type: fileWatcher ... unable to kill the process`, then `UtilityProcessWorker terminated unexpectedly with code 3221225477` (`0xC0000005`). Four more pty heartbeat misses were logged in the minute before that.
- The machine stuttered outside the editor (video decode, audio, mouse). RAM was not exhausted. The pagefile peak was a few hundred megabytes. Windows logged no display-driver timeout.

Expected: a parent of many git repositories is a workspace I will keep opening, with extensions installed. `workspaceContains` and the file watcher should be scoped to the repository of the active editor, or otherwise refuse to walk every sibling repo. The file watcher should shut down without an access violation. “Disable extensions” and “open only one repo” are not the behavior I am asking for.

The Java Gradle import and the Tailwind project scan from this same session are reported to those extensions. This issue is the shared activation search and the file watcher.
