---
title: IntelliSense indexes every Tailwind config under a parent folder of many repos
repository: tailwindlabs/tailwindcss-intellisense
issue_number: 1633
url: https://github.com/tailwindlabs/tailwindcss-intellisense/issues/1633
submitted: 2026-11-20
status: submitted
media: none
---

Opening a parent folder of unrelated repositories makes IntelliSense build a Tailwind project for every config it finds under that parent. I am going to keep opening folders like that, and I am going to keep this extension enabled. The scan has to be scoped to the repo I am actually editing.

**What version of VS Code are you using?**

Cursor 3.31.15, which reports VS Code 1.128.0 (commit `3eb8c13390837371c7c2f2013dc57fdbc802c750`).

**What version of Tailwind CSS IntelliSense are you using?**

0.16.0 (`bradlc.vscode-tailwindcss-0.16.0-universal`).

**What version of Tailwind CSS are you using?**

Mixed, because the folder is not one project. In the same session the extension logged both a v3.4.18 config and a v4.1.18 stylesheet, in different child repositories. It also warned that one stylesheet looked like a different Tailwind version and skipped it.

**What package manager are you using?**

No single one. Child repos use their own. The parent folder is not an npm/pnpm workspace.

**What operating system are you using?**

Windows, build 26300.

**Tailwind CSS Stylesheet (v4) or config file (v3)**

No single file. Each child repo that uses Tailwind has its own. Pasting one of them would miss the bug. The bug is that the extension discovers all of them.

**VS Code settings**

Defaults. I have not set `tailwindCSS.experimental.configFile` or a custom files exclude to hide the other repos. I do not want that to be required.

**Reproduction URL**

I do not have a public minimal repo. Structure that reproduces it:

1. A parent folder that is not itself a Tailwind project.
2. Two or more child folders, each its own git repo, each with its own Tailwind v3 config or v4 CSS.
3. Open the parent in VS Code or Cursor with IntelliSense 0.16.0 enabled.
4. Read the Tailwind CSS IntelliSense output.

**Describe your issue**

On 20 November 2026 I had that parent open as one workspace. The IntelliSense log grew to about 12 MB. It recorded `[Global] Creating projects` for configs in different child repos, then `[Global] Adding watch patterns` for those trees.

That ran at the same time as a Java extension Gradle import of other nested projects. Together they made the extension host unresponsive for several seconds and stuttered video decode, audio, and the mouse on a 16-thread, 64 GB machine. This report is only the Tailwind half: do not instantiate a project and a watch set for every config under a parent of many repos.

Expected: resolve Tailwind for the package that owns the file I am editing. A parent directory of independent clones is a normal workspace. Finding a second repo’s `tailwind.config` or v4 CSS on disk is not a request to index that repo.
