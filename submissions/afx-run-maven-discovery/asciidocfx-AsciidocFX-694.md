---
title: scripts/afx-run.ps1 fails with Maven not found when Maven is off PATH
repository: asciidocfx/AsciidocFX
issue_number: 694
url: https://github.com/asciidocfx/AsciidocFX/issues/694
submitted: 2026-08-17
---

On Windows, `scripts/afx-run.ps1` (and `scripts/afx-run.sh`) only look for a Maven Wrapper in the repo or `mvn` on `PATH`. This repository does not ship `mvnw` / `mvnw.cmd`, and Maven is often installed in a tools directory that is not on `PATH`. The script then throws `Maven not found` even when a working Maven is present.

A related footgun: `JAVA_HOME` / `PATH` may point at a packaged JDK 24 (for example Adoptium Temurin) while this project wants JDK 25. A PATH-only check either fails to find Maven or later runs the wrong Java.

## Steps to Reproduce

1. Clone the repo on Windows. Do not add Maven to `PATH`. Do not add a Maven Wrapper.
2. Install Maven somewhere off PATH, for example `C:\code\tools\apache-maven-3.9.6\bin\mvn.cmd`.
3. From a shell whose `PATH` does not contain `mvn`:

```powershell
Get-Command mvn -ErrorAction SilentlyContinue   # should be empty
.\scripts\afx-run.ps1
```

## Expected Behavior

The helper finds Maven for this project (wrapper, `mise` / sdkman pins, a local `tools/apache-maven-*` install, then `PATH`) and prints the path it selected, for example:

```text
Using: C:\code\tools\apache-maven-3.9.6\bin\mvn.cmd
JAVA_HOME: C:\code\tools\jdk-25
```

If `JAVA_HOME` is unset or is not JDK 25, prefer a project pin or `tools/jdk-25` when those exist.

## Actual Behavior

```text
Maven not found. Install Maven, put it on PATH, or add Maven Wrapper (mvnw).
```

(thrown at the PATH-only check in `scripts/afx-run.ps1`)

## Environment

- OS: Windows 11
- Shell: PowerShell
- Maven: installed under a workstation `tools` directory, not on `PATH`
- Java on `PATH`: Eclipse Adoptium JDK 24 (wrong for this project; JDK 25 is required)

## Notes

Hive / `CODE_ROOT` tools paths should stay an optional fallback. Contributors who already have `mvn` on `PATH`, `mise`, sdkman, or a wrapper should keep using those. Do not require a Maven Wrapper binary tree, and do not download Maven from the script.
