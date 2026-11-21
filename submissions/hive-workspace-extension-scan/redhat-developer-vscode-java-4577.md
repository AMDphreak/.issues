---
title: Parent folder of unrelated repos triggers a Gradle import per nested project
repository: redhat-developer/vscode-java
issue_number: 4577
url: https://github.com/redhat-developer/vscode-java/issues/4577
submitted: 2026-11-20
status: submitted
media: none
---

Opening a parent folder of unrelated git repositories, with this extension left enabled, starts a Gradle import for every nested build. That import spawned 11 Gradle daemons and stalled the machine. I am going to keep opening that kind of folder, and I am going to keep the extension installed.

**Describe the bug**

The workspace root was a directory of independent clones, not one Gradle composite and not one monorepo. Language Support for Java 1.58.0 treated it as one workspace and imported nested Gradle projects on its own.

From the language-server log on 20 November 2026, about 22:46–22:53 local time, `GradleProjectImporter.importToWorkspace` / `importDir` synchronized unrelated projects (`android`, `llama.android`, `whisper.android`, `whisper.android.java`, and a project named `java`). Checksum downloads for the Gradle `9.2.0-20251028012738+0000` and `9.3.0-20251029004548+0000` snapshot wrappers failed. Syncs then failed with “Synchronize project … failed due to an error connecting to the Gradle build.” The stack goes through `DefaultGradleBuild.synchronize` and `TellGradleToRunSynchronizationTasks`.

That work launched 11 processes whose command lines include `GradleDaemon`, plus one Kotlin compiler, all using this extension’s JRE (`redhat.java-1.58.0-win32-x64\jre\25.0.4.1-win32-x86_64\bin\java.exe`). They started between 22:39 and 22:56. After the editor exited, their parent process was dead and the JVMs were still resident at about 7.4 GB working set.

At 22:46:36, while those syncs were running, the editor’s terminal host missed a 6-second heartbeat and extension hosts were unresponsive for about 5 seconds. Outside the editor, video decode, audio, and the mouse stuttered. The machine has 16 logical processors and 64 GB RAM. The pagefile was barely used, so this was not an out-of-memory kill.

`workspaceContains` activation for this extension also timed out searching the same tree for `**/pom.xml`, `**/build.gradle`, `**/settings.gradle`, and the Kotlin variants.

**To Reproduce**

1. Create a parent folder whose children are separate git clones, at least two of which are unrelated Gradle builds (an Android project and a plain Java project are enough). The parent itself is not a Gradle build.
2. Install Language Support for Java 1.58.0 and leave it enabled. Leave import settings at their defaults.
3. In Cursor 3.31.15 or VS Code 1.128.0, open that parent folder as the workspace. Do not open each clone as its own workspace.
4. Watch the Language Support for Java log and the process list for new `GradleDaemon` JVMs using the extension JRE.

I don’t have a trimmed public sample repo attached. The trigger is the folder layout above, not a particular project’s source.

**Expected behavior**

Import the Gradle build for the file I am editing, when I edit one. Do not walk the parent and synchronize every nested Gradle project at startup. Do not leave a daemon per discovered build running after the editor exits. A parent of many repositories has to be a supported workspace, with this extension enabled.

**Screenshots**

No screenshot. The evidence is the language-server log (`GradleProjectImporter.importToWorkspace`) and the orphaned `GradleDaemon` processes.

**Environment**

- Operating System: Windows, build 26300 (64-bit), 16 logical processors, 64 GB RAM
- JDK version: the extension’s bundled JRE 25.0.4.1 (the daemons used that `java.exe`)
- Visual Studio Code version: Cursor 3.31.15, VS Code 1.128.0, commit `3eb8c13390837371c7c2f2013dc57fdbc802c750`
- Java extension version: 1.58.0

**Additional Information**

Tailwind CSS IntelliSense did the same kind of whole-tree scan in the same session, and the built-in file watcher crashed with `0xC0000005` on shutdown. Those are filed with their own projects. This issue is the Gradle import.
