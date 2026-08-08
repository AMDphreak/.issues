## Summary

Delays the **Successfully installed** / repair success line until after post-install work runs (ARP snapshot correlation, upgrade version verification, record install, installation notes).

## Details

- New context flags: `DeferInstallSuccessMessage`, `PendingDeferredInstallSuccess`, `SuppressDeferredInstallSuccess`.
- `InstallPackageInstaller` sets defer, runs the existing pipeline, then `ReportDeferredInstallSuccess`.
- `ReportInstallerResult`, `MsixInstall`, and Microsoft Store install/update/repair paths respect defer; MSIX registration-deferred suppresses generic success (warning already shown).
- `PendingDeferredInstallSuccess` avoids printing success when the installer never completed (for example install lock cancelled before a success path).

## Related

Complements accurate reporting after install (for example ARP / version checks); avoids claiming success before those steps finish.

## Testing

CI build; manual install scenarios recommended.

Made with [Cursor](https://cursor.com)

###### Microsoft Reviewers: [Open in CodeFlow](https://microsoft.github.io/open-pr/?codeflow=https://github.com/microsoft/winget-cli/pull/6098)
