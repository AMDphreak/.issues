---
type: ops
status: open
repository: github.com/dev-centr/devcentr.org
---

# devcentr.org — GitHub Pages + custom domain checklist

## Summary

DNS for **devcentr.org** (apex) is correct: four A records to GitHub Pages IPs. If the site still fails or “is improperly configured for GitHub Actions”, the cause is almost always **GitHub repo settings**, not DNS.

## Checklist (run in order)

1. **Build and deployment source**
   - Repo: https://github.com/dev-centr/devcentr.org
   - Go to **Settings → Pages**.
   - Under **Build and deployment**, **Source** must be **GitHub Actions** (not “Deploy from a branch”).
   - This repo uses `upload-pages-artifact` + `deploy-pages`; if Source is “Deploy from a branch”, that deployment is ignored.

2. **Custom domain in GitHub**
   - Same page: **Custom domain** must show `devcentr.org` (or `www.devcentr.org` if you use www) and be saved.
   - With GitHub Actions, GitHub does not use a CNAME file; the domain must be set in the UI.

3. **DNS (already verified)**
   - Apex `devcentr.org`: four A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (confirmed via `Resolve-DnsName devcentr.org -Type A`).
   - If using Cloudflare/proxy: use **DNS only** (grey cloud) for those records or Enforce HTTPS may not work.

4. **Enforce HTTPS**
   - After domain and DNS are correct, enable **Enforce HTTPS** under Pages when it appears (can take a few minutes to 24 h).

## References

- In-repo doc: `devcentr/docs` → `github-pages-custom-domain.adoc` (includes troubleshooting for GitHub Actions).
- GitHub: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
