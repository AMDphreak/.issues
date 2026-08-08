## Summary

Follow-up to misleading **success** output when an **upgrade** exits **0** but Windows still reports an **older** installed version (see [#4550](https://github.com/microsoft/winget-cli/issues/4550) and related reports).

## Behavior

After a successful installer return code, **if** the operation is an **upgrade** (`InstallerExecutionUseUpdate`):

- **ARP path:** After ARP correlation finds the installed package, compare `Utility::Version` of the correlated **installed** version to the **manifest** package version. If the installed version sorts **less than** the expected (manifest) version, fail with `APPINSTALLER_CLI_ERROR_UPGRADE_INSTALLED_VERSION_MISMATCH` (`0x8A15008F`).
- **MSIX path:** When the manifest provides a package family name and the package is registered, compare using `Deployment::GetInstalledVersionStringForFamilyName` where applicable.
- **Skip** verification when reboot is required to finish, when versions are unknown, or when correlation does not yield a reliable installed version string.

## Notes

Portable/zip flows that do not correlate to ARP/MSIX are unchanged.

## Testing

CI / AppInstallerCLITests as usual.

Made with [Cursor](https://cursor.com)

###### Microsoft Reviewers: [Open in CodeFlow](https://microsoft.github.io/open-pr/?codeflow=https://github.com/microsoft/winget-cli/pull/6097)
