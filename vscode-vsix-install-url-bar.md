# Feature Request: Unified Custom File Open Dialog

## Description
The native Windows file dialog has issues, such as executing `.vsix` files when pasting URLs into the address bar. Furthermore, the native dialog on Windows/Linux enforces a separation between selecting a file and selecting a folder, requiring separate commands (e.g., `Ctrl+O` for files vs `Ctrl+K Ctrl+O` for folders).

To address these pain points, VS Code should implement a fully-featured, non-minimal custom file open dialog (similar to the concept of `files.simpleDialog.enable`, but with a rich UI).

## Requirements
1. **Unified File/Folder Selection**: The dialog must allow opening both files and folders within the same interface, eliminating the need for separate commands.
2. **Workspace Detection**: When a user selects a `.code-workspace` file, the dialog should surface a latent button/option to "Open Workspace" directly, rather than opening the file in the text editor and requiring a second click to open it as a workspace.
3. **Rich UI**: The dialog should not be "minimal" (like the current Quick Pick simple dialog). It needs to be a proper file browser interface.

## Justification
The native OS dialogs are limited (especially on Windows) and lead to confusing behaviors (like the VSIX execution bug). A rich, custom dialog integrated into VS Code would provide a much more seamless and consistent cross-platform experience.
