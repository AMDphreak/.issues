# Feature Request: Playbook inheritance via 'extends' keyword

## Summary

Currently, Antora playbooks must be self-contained. For complex projects with multiple environments (local vs CI), it is useful to be able to extend a base playbook and override specific settings. This feature adds an `extends` keyword to the playbook schema to support recursive inheritance.

## Details

- **GitLab Issue**: [#1200](https://gitlab.com/antora/antora/-/issues/1200) (originally #1201)
- **GitLab MR**: [!1106](https://gitlab.com/antora/antora/-/merge_requests/1106)
- **Repository**: [antora/antora](https://gitlab.com/antora/antora)
- **Status**: Discussion/Review

## Local Implementation

The feature has been implemented in the local clone at `Z:\code\amdphreak\antora`:

- **Branch**: `feature/playbook-extends`
- **Packages modified**: `@antora/playbook-builder`
- **Validation fix**: Changed `ui.bundle.url` default from `null` to `undefined` to satisfy `convict` String validation when no URL is provided in base playbooks.

## Usage Example

```yaml
# antora-playbook.yml
extends: ./antora-playbook.online.yml
content:
  sources:
    - url: ./docs
      branches: HEAD
```
