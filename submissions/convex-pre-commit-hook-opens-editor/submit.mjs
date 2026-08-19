import fs from "node:fs";
import { execSync } from "node:child_process";

const dir = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const body = fs.readFileSync(`${dir}/issue.md`, "utf8");
const payload = {
  title:
    "Windows: beforeShellExecution hook opens pre-commit-checks.sh in editor on git commit",
  body,
};
const payloadPath = `${dir}/payload.json`;
fs.writeFileSync(payloadPath, JSON.stringify(payload));

const token = execSync("gh auth token", { encoding: "utf8" }).trim();
const res = await fetch(
  "https://api.github.com/repos/get-convex/convex-agent-plugins/issues",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(payload),
  },
);
const data = await res.json();
if (!res.ok) {
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}
console.log(data.html_url);
fs.writeFileSync(
  `${dir}/get-convex-convex-agent-plugins-${data.number}.md`,
  `---
title: ${payload.title}
repository: get-convex/convex-agent-plugins
issue_number: ${data.number}
url: ${data.html_url}
submitted: 2026-08-19
---

${body}
`,
);
