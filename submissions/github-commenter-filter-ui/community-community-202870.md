---
title: Add Commenter (and Involves) to Issues/PRs filter dropdowns — search works, UI hides it
repository: community/community
issue_number: 202870
url: https://github.com/orgs/community/discussions/202870
submitted: 2026-07-24
---
### Select Topic Area

Product Feedback

### Body

## Problem

The Issues and Pull Requests filter bars expose **Author**, **Label**, **Assignee**, and **Mentions** as first-class dropdowns, but not **Commenter** (or **Involves**).

The search engine already supports this. From the filter box or global search you can type:

```text
commenter:@me
involves:@me
commenter:USERNAME
involves:USERNAME
```

Those qualifiers work. They are documented. They are just missing from the UI that almost everyone actually uses.

That gap matters more than a convenience nit. Commenting is how most people contribute to projects they do not own. Mentions are in the dropdown; the act of participating (commenting) is not. So the product teaches users that authorship and @-mentions are real involvement, while replies and review discussion are second-class unless you already know search syntax.

## Why this is essential

1. **Finding your own work.** After commenting in a busy repo (or across many repos), there is no obvious path back to those threads. Notifications only help if something new happened. Plain text search for a username does not reliably surface comments. People end up thinking the activity is gone.

2. **Showing involvement to others.** For job applications, open-source reputation, and maintainer trust, "what did this person actually do in this project?" often means comments and discussion, not only authored issues/PRs. A shareable URL like:

   - `https://github.com/OWNER/REPO/issues?q=commenter%3AUSERNAME`
   - `https://github.com/search?q=involves%3AUSERNAME+repo%3AOWNER%2FREPO&type=issues`

   is one of the few honest ways to hand someone a contribution trail. Most developers never learn that these links exist, because the UI never offers the filter.

3. **Parity with Mentions.** If `mentions:` deserves a dropdown, `commenter:` (and ideally `involves:`) does too. Mentions are something done *to* you. Commenting is something you did. The latter is the better proxy for real participation.

## Requested change

On repository `/issues` and `/pulls` (and ideally the global Issues/PRs dashboards):

1. Add a **Commenter** filter dropdown next to Author / Mentions, inserting `commenter:USERNAME` (including `@me` / "Commented by you").
2. Preferably also add **Involves** (`involves:USERNAME`), since that is the OR of author + assignee + mentions + commenter and is the right "overall involvement" view.
3. Make the constructed query URL stable and copyable so people can share contribution links without memorizing search syntax.
4. Surface the same affordance on profile / activity surfaces where users try (and fail) to find "my comments."

Optional but valuable: a saved/default view or shortcut for "Commented by me" the way Discussions already has clearer "Commented" style filters.

## Current workarounds (for readers)

These work today if you already know them:

- Repo issues: `commenter:@me` or `commenter:USERNAME` in the Issues filter box
- Broader involvement: `involves:@me` / `involves:USERNAME`
- Subscriptions: https://github.com/notifications/subscriptions?reason=comment
- Docs: https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-commenter

The bug is discoverability and product representation, not missing backend search.

## Related discussions (please consolidate attention here)

These keep getting filed in different categories with little traction. Same underlying gap:

- <https://github.com/orgs/community/discussions/79280> — Single button on viewing commented Issues
- <https://github.com/orgs/community/discussions/111226> — Please add ability to view the list of issues where I have commented
- <https://github.com/orgs/community/discussions/58062> — How to find all my comments
- <https://github.com/orgs/community/discussions/92716> — No way to find something I just commented on
- <https://github.com/orgs/community/discussions/15334> — Add commenter or involves qualifier to shortcuts (Mobile)
- <https://github.com/orgs/community/discussions/144561> — `commenter` filter not highlighted like `author`
- <https://github.com/orgs/community/discussions/63339> — Let me search my contributions (closed)
- <https://github.com/orgs/community/discussions/13785> — Why can't I see my issues and comments in my Overview

Unofficial tracker (still open after years): <https://github.com/isaacs/github/issues/1577>

Third-party extensions (e.g. Refined GitHub) added "commented by you" shortcuts years ago because the native UI still does not.

## Bottom line

GitHub already indexes comment authorship. The product just hides it behind power-user search while advertising a shorter, incomplete filter list. Please put **Commenter** (and **Involves**) in the Issues/PRs filter UI so contribution history is findable for the person who wrote it and shareable for anyone evaluating their involvement.
