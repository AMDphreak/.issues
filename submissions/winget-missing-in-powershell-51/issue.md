On Windows 11, `winget` is present and works in Command Prompt, but the same Windows Terminal session’s **Windows PowerShell 5.1** tab cannot resolve `winget` at all (`CommandNotFoundException`). That makes recovery awkward when PowerShell 7 is broken or uninstalled and you are stuck on 5.1 — the documented “any shell” story does not hold.

### winget version

```text
Windows Package Manager v1.29.290
```

(from `winget` help in cmd)

### Windows build number

```text
Microsoft Windows [Version 10.0.26200.9278]
```

### Steps to reproduce

1. Open Windows Terminal.
2. Open a **Windows PowerShell** (5.1) tab and run `winget`.
3. Open a **Command Prompt** tab in the same window and run `winget`.

### Expected behavior

`winget` should be discoverable from Windows PowerShell 5.1 the same way it is from cmd (PATH / App Execution Alias behavior should be consistent across Microsoft-shipped shells), matching the public docs that say winget works from cmd, Windows PowerShell, or PowerShell.

### Actual behavior

- PowerShell 5.1: `winget : The term 'winget' is not recognized as the name of a cmdlet, function, script file, or operable program.` (`CommandNotFoundException`)
- Command Prompt: `winget` prints help for Windows Package Manager v1.29.290

### Screenshots

![winget CommandNotFoundException in Windows PowerShell 5.1](images/winget-missing-in-powershell-51/winget-not-found-ps51.png)

![winget help succeeds in Command Prompt](images/winget-missing-in-powershell-51/winget-works-in-cmd.png)

### Additional context

- Hit while recovering from a bad PowerShell 7 / AppX + winget upgrade situation (separate report). Falling back to 5.1 and finding `winget` missing there blocked the obvious repair path until switching to cmd.
- Please advise whether this is App Installer PATH / WindowsApps alias interaction with Windows PowerShell specifically, and whether Terminal profile environment differs between profiles.
