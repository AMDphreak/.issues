## Description

The AI assistant sometimes stops its thread of execution after a shell command completes and returns output, even when the command output should trigger the AI to continue working. The AI appears to recognize the command output correctly but fails to automatically proceed with the next logical step, requiring manual user intervention (clicking "Cancel" on the shell output) to resume execution.

## Steps to Reproduce

1. Ask the AI to perform a multi-step task that involves running shell commands
2. The AI runs a command that completes successfully
3. The command output is displayed
4. The AI stops execution instead of continuing to the next step
5. User must manually cancel the command output (resulting in `q^C` in the terminal) to prompt the AI to continue

## Expected Behavior

After a shell command completes successfully, the AI should:
- Recognize the command output
- Automatically continue with the next logical step in the task
- Not require manual user intervention to proceed

## Actual Behavior

The AI stops execution after command completion, even when:
- The command executed successfully
- The output is clearly visible and relevant
- There are obvious next steps to take
- The user's original request has not been fully completed

The user must manually click "Cancel" on the shell output to get the AI to continue, which results in `q^C` appearing in the terminal history.

## Example from Actual Conversation

The following sequence occurred during a conversation where the AI was asked to verify files and then update a GitHub issue:

**Command 1:**
```powershell
PS C:\Users\rjamd> Get-ChildItem "z:\code\amdphreak\.github_issues" | Select-Object Name, Length, LastWriteTime

Name                                                Length LastWriteTime
----                                                ------ -------------
cursor-3830-integrated-terminal-path-inheritance.md   3151 12/2/2025 6:16:26 PM
cursor-3831-gh-cli-powershell-variable-expansion.md   2902 12/2/2025 6:16:22 PM

PS C:\Users\rjamd> q^C
```

The command completed successfully and showed the expected files. However, the AI stopped execution instead of proceeding to the next step (updating the GitHub issue).

**Command 2 (after manual intervention):**
```powershell
PS C:\Users\rjamd> gh issue edit 3831 --repo getcursor/cursor --title "AI generates gh CLI commands without properly handling PowerShell variable expansion" --body-file "z:\code\amdphreak\.github_issues\cursor-3831-gh-cli-powershell-variable-expansion.md"

https://github.com/cursor/cursor/issues/3831

PS C:\Users\rjamd> q^C
```

Again, the command completed successfully (the issue was updated), but the AI stopped execution instead of continuing with cleanup or verification steps.

## Impact

This bug significantly degrades the user experience because:
- Users must manually intervene to continue multi-step tasks
- The AI appears "stuck" even though commands are completing successfully
- It breaks the flow of automated task completion
- Users may think the AI has finished when it actually should continue
- The `q^C` artifacts in terminal history indicate failed automation

## Environment Details

- **OS**: Windows 11
- **Shell**: PowerShell 7.5.4
- **Editor**: Cursor
- **AI Model**: Auto (Cursor's AI assistant)

## Related

This appears to be an issue with the AI's execution flow control or prompt recognition after command completion. The AI correctly interprets command output but fails to recognize that execution should continue automatically.

