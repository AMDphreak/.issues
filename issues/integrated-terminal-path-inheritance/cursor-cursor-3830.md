---
title: Integrated terminal doesn't inherit updated PATH environment variable after system changes
repository: cursor/cursor
issue_number: 3830
url: https://github.com/cursor/cursor/issues/3830
submitted: 2025-12-03
---

## Description

The integrated terminal in Cursor (and VS Code) fails to inherit updated PATH environment variables after system-level changes, even after fully closing and reopening the editor. Commands that work in native PowerShell terminals are not available in the integrated terminal.

## Steps to Reproduce

1. Install a new tool that adds itself to the system PATH (e.g., `glab` - GitLab CLI)
2. Verify the tool works in a native PowerShell terminal: `glab --version`
3. Open Cursor/VS Code
4. Open an integrated PowerShell terminal
5. Attempt to run the same command: `glab --version`

## Expected Behavior

The integrated terminal should inherit the updated PATH environment variable and recognize newly installed commands, just like native terminals do.

## Actual Behavior

The integrated terminal does not recognize the newly installed command. Checking the PATH in the integrated terminal shows that the new PATH entry is missing, even though:
- The native terminal shows the correct PATH including the new entry
- The editor has been fully closed and reopened
- All editor processes have been terminated

## Environment Details

- **OS**: Windows 11 (Build 26200)
- **Shell**: PowerShell 7.5.4
- **Editor**: Cursor
- **Example Tool**: glab installed to `C:\Program Files (x86)\glab`

## Evidence

<details>
<summary>Native Terminal Output</summary>

```powershell
PS C:\Users\rjamd> where.exe glab
C:\Program Files (x86)\glab\glab.exe

PS C:\Users\rjamd> $env:Path -split ';' | Select-String 'glab'
C:\Program Files (x86)\glab
```

The native terminal correctly includes `C:\Program Files (x86)\glab` in the PATH.

</details>

<details>
<summary>Integrated Terminal Output</summary>

```powershell
PS Z:\code\FoodTruckNerds> glab --version
glab: The term 'glab' is not recognized as a name of a cmdlet, function, script file, or operable program.

PS Z:\code\FoodTruckNerds> $env:Path -split ';' | Select-String 'glab'
(no output - glab path is missing)
```

The integrated terminal does NOT include `C:\Program Files (x86)\glab` in the PATH.

</details>

<details>
<summary>Full PATH Comparison</summary>

**Native Terminal PATH includes:**
```
C:\Program Files (x86)\glab
```

**Integrated Terminal PATH is missing this entry**, even though both terminals are running PowerShell 7.5.4 on the same system.

</details>

## Workaround

Manually adding the path to the PowerShell profile file works, but this should not be necessary:

```powershell
# Add to $PROFILE
$glabPath = "C:\Program Files (x86)\glab"
if (-not ($env:Path -split ';' -contains $glabPath)) {
    $env:Path += ";$glabPath"
}
```

The editor should properly inherit system environment variables without requiring manual profile configuration.

## Impact

This issue affects any newly installed tools that modify the system PATH, requiring users to manually configure their shell profiles or restart their entire system to use new commands in the integrated terminal.

