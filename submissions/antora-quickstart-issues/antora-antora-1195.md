---
title: Install and Run Quickstart documentation issues
repository: antora/antora
issue_number: 1195
url: https://gitlab.com/antora/antora/-/issues/1195
submitted: 2025-12-03
---

The `install-and-run-quickstart.adoc` file has several issues that need to be addressed. These issues could confuse users or lead to installation problems.

## Issues Identified

### 1. Missing Minimum Node.js Version Requirement ⚠️ **CRITICAL**

**Location**: Line 20 in `docs/modules/ROOT/pages/install-and-run-quickstart.adoc`

**Issue**: The quickstart states "Antora requires an active long term support (LTS) release of Node.js" but doesn't specify the **minimum required version**.

**Current text**:

```text
Antora requires an active long term support (LTS) release of Node.js.
```

**Problem**:

- All `package.json` files in the repository specify `"engines": { "node": ">=18.0.0" }`
- Users might try to use Node.js 16 LTS (which is no longer active) or other older LTS versions
- The quickstart doesn't clarify that Node.js 18.0.0 is the minimum

**Recommendation**: Add explicit minimum version requirement:

```text
Antora requires Node.js 18.0.0 or higher (an active long term support (LTS) release).
```

### 2. Installation Method Inconsistency ⚠️ **MODERATE**

**Location**: Lines 68-73 in `docs/modules/ROOT/pages/install-and-run-quickstart.adoc`

**Issue**: The quickstart shows installing the `antora` meta-package, while the detailed installation page (`install-antora.adoc`) shows installing `@antora/cli` and `@antora/site-generator` separately.

**Quickstart shows**:

```bash
npm i -D -E antora
```

**Detailed install page shows**:

```bash
npm i -D -E @antora/cli@{page-component-version}
npm i -D -E @antora/site-generator@{page-component-version}
```

**Problem**:

- Both methods work (the `antora` package is a meta-package that depends on both)
- However, the inconsistency could confuse users who read both documents
- The detailed page doesn't mention the simpler `antora` meta-package option

**Recommendation**:

- Either standardize on one approach, or
- Add a note in the quickstart explaining that `antora` is a meta-package, and
- Add a note in the detailed install page mentioning the `antora` meta-package as a simpler alternative

### 3. README.adoc Quickstart Section Uses Global Install ⚠️ **MINOR**

**Location**: Lines 97-99 in `README.adoc`

**Issue**: The README quickstart section shows global installation (`npm i -g antora`) as the primary method, while the detailed quickstart recommends local installation.

**Problem**:

- The detailed quickstart (line 105) states "We strongly recommend that you install Antora within the playbook project"
- But the README shows global install first
- This inconsistency could lead users to use the less recommended approach

**Recommendation**: Update README to show local installation first, or add a note recommending local installation.

### 4. Node.js Version Check Doesn't Validate Minimum Version ⚠️ **MODERATE**

**Location**: Lines 31, 41 in `docs/modules/ROOT/pages/install-and-run-quickstart.adoc`

**Issue**: The quickstart tells users to check if they have "an active Node.js LTS version" but doesn't provide guidance on checking if it meets the minimum requirement (18.0.0).

**Current text**:

```text
If you have an active Node.js LTS version on your machine, you're ready to install Antora.
```

**Problem**:

- A user might have Node.js 16 LTS installed (which is no longer active but might still be on their system)
- The check `node -v` will show a version, but the user won't know if it's sufficient
- The upgrade instructions don't mention the minimum version requirement

**Recommendation**:

- Add explicit version check guidance: "Ensure your Node.js version is 18.0.0 or higher"
- Update the upgrade section to mention the minimum version requirement

### 5. Missing Information About Package Structure ⚠️ **MINOR**

**Location**: Line 88 in `docs/modules/ROOT/pages/install-and-run-quickstart.adoc`

**Issue**: The quickstart mentions that versions are "pulled in transitively by the antora package" but doesn't explain what this means or what packages are actually installed.

**Current text**:

```text
These versions can also be found in package.json (pulled in transitively by the antora package), which you can use to upgrade Antora.
```

**Problem**:

- Users might not understand what "transitively" means
- The output shows `@antora/cli` and `@antora/site-generator` but the install command uses `antora`
- This disconnect could be confusing

**Recommendation**: Add a brief explanation that `antora` is a meta-package that installs both `@antora/cli` and `@antora/site-generator`.

## Additional Observations

### Positive Aspects

- The quickstart is generally well-structured and easy to follow
- It provides both remote and local source examples
- The use of `npx` for local installations is correctly demonstrated
- The `--fetch` option recommendation is helpful for beginners

### Potential Improvements

1. Add a "Prerequisites" section at the top listing:
   - Node.js 18.0.0 or higher
   - npm (bundled with Node.js)
   - Git (for cloning repositories)

2. Consider adding a troubleshooting section for common installation issues

3. The quickstart could benefit from mentioning that users can verify their Node.js version meets requirements before proceeding

## Files to Review/Update

1. `docs/modules/ROOT/pages/install-and-run-quickstart.adoc` - Main quickstart file
2. `docs/modules/install/pages/install-antora.adoc` - Detailed install page (for consistency)
3. `README.adoc` - Main repository README (quickstart section)

## Priority

1. **HIGH**: Fix minimum Node.js version requirement (#1, #4)
2. **MEDIUM**: Resolve installation method inconsistency (#2)
3. **LOW**: Update README quickstart section (#3, #5)
