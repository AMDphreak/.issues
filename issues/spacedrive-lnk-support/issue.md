# Feature Request: Support for opening .lnk files on Windows

## Problem
Currently, Spacedrive on Windows does not handle .lnk shortcut files correctly. Opening a .lnk file might not open the actual target, and Spacedrive doesn't show compatible applications for the shortcut's target.

## Proposed Solution
Implement .lnk resolution in the Windows file opening backend. When a .lnk file is encountered:
1. Resolve it to its actual target path using `IShellLink`.
2. Open the target path instead of the shortcut file.
3. For getting compatible apps, use the target's extension instead of .lnk.

## Implementation Details
Use `windows-rs` with `IShellLinkW` and `IPersistFile` to resolve the shortcut. This requires the `Win32_Storage_FileSystem` feature in the `windows` crate.
