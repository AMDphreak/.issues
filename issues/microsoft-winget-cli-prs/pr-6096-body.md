## Summary

Addresses silent skips during `winget upgrade --all` when a newer version exists but **no installer applies** because the **installed package uses a different install technology** than the available upgrade (see [#5416](https://github.com/microsoft/winget-cli/issues/5416)).

## Changes

- Add `APPINSTALLER_CLI_ERROR_UPDATE_INSTALL_TECHNOLOGY_MISMATCH` (`0x8A15008E`) for this scenario so it is distinct from generic `APPINSTALLER_CLI_ERROR_UPDATE_NOT_APPLICABLE`.
- In `UpdateAllApplicable`, count those packages and print a summary line (same pattern as unknown-version and explicit-upgrade skips).
- Map the new code in COM `Converters.h` like other no-upgrade cases.
- Document the HRESULT in `doc/.../returnCodes.md` and localized error strings.

## Notes

Related reports: [#4550](https://github.com/microsoft/winget-cli/issues/4550) (post-install verification vs. installer success), [#2027](https://github.com/microsoft/winget-cli/issues/2027). This PR targets the **silent --all** behavior for install-technology mismatch; verifying installed version after every installer exit is a larger follow-up.

## Testing

- Updated `UpdateFlow_UpdateExeInstallerTypeNotApplicable` for the new HRESULT.
- Please run the usual AppInstallerCLITests / CI build (not run in this environment).

Made with [Cursor](https://cursor.com)

###### Microsoft Reviewers: [Open in CodeFlow](https://microsoft.github.io/open-pr/?codeflow=https://github.com/microsoft/winget-cli/pull/6096)
