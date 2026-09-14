Not filing a new issue for “winget missing in Windows PowerShell 5.1 but present in cmd.”

This is the long-standing App Execution Alias / PATH / App Installer class already covered by winget-cli troubleshooting and issues such as microsoft/winget-cli#3507 / #725 (and often the reverse cmd-vs-PS pattern). On this machine User PATH already contains `%LOCALAPPDATA%\Microsoft\WindowsApps`; the interesting companion failure is the PowerShell AppX half-state + Terminal dynamic profile crash, handled via comments on existing upgrade threads and a Terminal-specific report.
