---
title: Documentation: Outdated and missing Node.js version requirements
repository: antora/antora
issue_number: 1196
url: https://gitlab.com/antora/antora/-/issues/1196
submitted: 2025-12-03
---

Several documentation issues were identified that could confuse users, lead to installation problems, or provide outdated information. These issues primarily relate to missing or outdated Node.js version requirements and a typo in a code example.

## Issues Identified

### 1. Outdated Node.js Version Requirements in Contributing Guide ⚠️ **CRITICAL**

**Location**: [contributing.adoc](https://gitlab.com/antora/antora/-/blob/main/contributing.adoc#L548) lines 548-550, 559, 565

The contributing guide states Node.js 12.21.0 as minimum and recommends Node.js 16, but the actual minimum required version is Node.js 18.0.0 (as specified in `package.json`).

**Current text**:
```
The minimum required version of Node.js is *12.21.0*, as indicated in [.path]_package.json_.
However, we recommend using the active LTS release (currently Node.js 16).
```

**Problem**:
- The root `package.json` file specifies `"engines": { "node": ">=18.0.0" }`
- Developers following the contributing guide will install an incompatible version
- The guide references Node.js 12 and 16, which are both outdated
- Line 559 says "if the version of Node.js you have isn't Node.js 12 or greater" - should be 18
- Line 565 says "install Node.js 16 using: $ nvm install 16" - should be 18 or higher

**Recommendation**: Update all references to reflect Node.js 18.0.0 as the minimum version and update recommended versions accordingly.

### 2. README.adoc Missing Minimum Node.js Version Requirement ⚠️ **CRITICAL**

**Location**: [README.adoc](https://gitlab.com/antora/antora/-/blob/main/README.adoc#L48) lines 48-59

The README states "We recommend using the active long term support (LTS) release of Node.js" but doesn't specify the minimum required version (18.0.0).

**Current text**:
```
We recommend using the active long term support (LTS) release of Node.js.
While you can use other versions of Node.js, Antora is only tested against {url-node-releases}[LTS releases].

To check whether you have Node.js installed, and which version, open a terminal and type:

 $ node -v

If this command fails with an error, it means you don't yet have Node.js installed.
If the command doesn't report a Node.js LTS version (e.g., v{version-node}), you don't have a suitable version of Node.js installed.
```

**Problem**:
- Users might try to use Node.js 16 LTS (which is no longer active) or other older LTS versions
- The README doesn't clarify that Node.js 18.0.0 is the minimum
- The version check guidance doesn't help users verify they meet the minimum requirement

**Recommendation**: Add explicit minimum version requirement:
```
Antora requires Node.js 18.0.0 or higher (an active long term support (LTS) release).
```

### 3. Platform-Specific Requirements Pages Don't Specify Minimum Version ⚠️ **MODERATE**

**Location**:
- [docs/modules/install/pages/linux-requirements.adoc](https://gitlab.com/antora/antora/-/blob/main/docs/modules/install/pages/linux-requirements.adoc#L16) line 16
- [docs/modules/install/pages/windows-requirements.adoc](https://gitlab.com/antora/antora/-/blob/main/docs/modules/install/pages/windows-requirements.adoc#L19) line 19
- [docs/modules/install/pages/macos-requirements.adoc](https://gitlab.com/antora/antora/-/blob/main/docs/modules/install/pages/macos-requirements.adoc) (includes linux-requirements)

These pages state "You can use any active LTS or maintenance LTS version of Node.js with Antora" but don't specify the minimum required version (18.0.0).

**Current text**:
```
You can use any active LTS or maintenance LTS version of Node.js with Antora, but we recommend using the most recent active LTS version so that you benefit from the latest performance and security enhancements.
```

**Problem**:
- Users might interpret this as meaning any LTS version works, including Node.js 16
- The pages don't clarify that Node.js 18.0.0 is the minimum
- This could lead to installation attempts with incompatible versions

**Recommendation**: Update to specify the minimum version:
```
Antora requires Node.js 18.0.0 or higher. You can use any active LTS or maintenance LTS version of Node.js 18.0.0 or higher, but we recommend using the most recent active LTS version...
```

### 4. README.adoc Typo in Playbook Example ⚠️ **MINOR**

**Location**: [README.adoc](https://gitlab.com/antora/antora/-/blob/main/README.adoc#L127) line 127

The playbook example contains a typo with an extra `@` symbol in a URL.

**Current text**:
```yaml
- url: https://@gitlab.com/antora/demo/demo-component-a.git
```

**Problem**:
- The URL has an extra `@` symbol: `https://@gitlab.com` should be `https://gitlab.com`
- This will cause the playbook to fail when users try to use it
- Users copying this example will encounter an error

**Recommendation**: Fix the typo:
```yaml
- url: https://gitlab.com/antora/demo/demo-component-a.git
```

## Files to Review/Update

1. [contributing.adoc](https://gitlab.com/antora/antora/-/blob/main/contributing.adoc) - Update Node.js version requirements (CRITICAL)
2. [README.adoc](https://gitlab.com/antora/antora/-/blob/main/README.adoc) - Add minimum Node.js version, fix typo (CRITICAL/MINOR)
3. [docs/modules/install/pages/linux-requirements.adoc](https://gitlab.com/antora/antora/-/blob/main/docs/modules/install/pages/linux-requirements.adoc) - Add minimum version requirement (MODERATE)
4. [docs/modules/install/pages/windows-requirements.adoc](https://gitlab.com/antora/antora/-/blob/main/docs/modules/install/pages/windows-requirements.adoc) - Add minimum version requirement (MODERATE)
5. [docs/modules/install/pages/macos-requirements.adoc](https://gitlab.com/antora/antora/-/blob/main/docs/modules/install/pages/macos-requirements.adoc) - Inherits from linux-requirements, will be fixed automatically (MODERATE)

## Priority

1. **HIGH**: Fix Node.js version requirements in contributing guide and README (#1, #2)
2. **MEDIUM**: Add minimum version to platform-specific requirements pages (#3)
3. **LOW**: Fix README typo (#4)

