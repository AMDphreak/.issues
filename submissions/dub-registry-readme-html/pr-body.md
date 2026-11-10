## Summary
Hi! Package pages turn a readme into HTML with inline HTML turned off, so a GitHub-style header full of div and img tags shows up as raw text.

This PR tries to stop that dump:

- Recognize HTML tags, comments, and script or style blocks before the page renders the readme.
- Keep what this page already renders: line breaks (`<br>`) and autolinks.
- Leave the other tags out, keep the text inside ordinary tags, and keep image alt text.
- Show a short warning on the package page, and log the same warning, when anything was left out.
- Leave fenced code and inline code alone.

This does not render HTML the way GitHub does. A later change could load a parse profile per git host. This is the safe step while inline HTML stays disabled.

Happy to adjust anything that does not fit the project's taste.

## How to try it
1. Open a package whose readme starts with a centered HTML header.
2. The tags should be gone, the text under them should remain, and a note should say the HTML was left out.
3. A readme with no HTML should look the same as before.
