# Issue: Node Version Managers have not implemented a universal Node API

## Description

Currently, Node Version Managers (nvm, fnm, nvs, volta, etc) operate by arbitrarily hooking into developers' system shells (PowerShell, bash, zsh, cmd) or manipulating global OS environment/registry configurations (`$PATH`, Symlinks).

The result is extremely brittle behaviour and conflicting tools. When a developer changes repositories and works on a project requiring Node v18 down from Node v22 (indicated by `engines.node` in `package.json`), the developer's execution of `npm install` silently fails or produces incompatible build artifacts.

If Node itself implemented a universal settings file strategy (like `~/.node-config.json` or a global binary configuration array), package managers like NVM could simply *register* their execution pathways.

Then, when `node` executes, it would evaluate the current context (the local repo `package.json`), identify a version mismatch, look at its globally registered version managers, and dynamically execute `.versionManagers[0].installCommand --version=x.x.x` and `.versionManagers[0].useCommand --version=x.x.x` seamlessly.

This correctly forces `node` to govern its own version context requirements, while still completely abstracting the complexity of local file systems, proxy logic, or HTTP download locations entirely to the arbitrarily registered version managers.

## Proposed NVM-Windows Implementation

To establish this design paradigm and lead the ecosystem towards standardizing a configuration interface:

1. Create a function `nvm register` that detects if an `~/.node-config.json` file natively exists.
2. If so, `nvm` registers its newly refactored transient semantic syntax into the configuration without requiring `node` to know anything about the underlying executable paths or the name of the tools. Node simply relies on its universal access to the `$PATH` to handle execution:

```json
{
  "versionManagers": [
    {
      "installCommand": "nvm install {version}",
      "setCommand": "nvm set {version}",
      "useCommand": "nvm use {version}",
      "listAvailableCommand": "nvm list available"
    }
  ]
}
```

3. Submitting an RFC to the official Node.js repository proposing the inclusion of an initial bootstrap payload that reads this file and pipes commands down effectively, guaranteeing consistent behavior out-of-the-box regardless of whether the developer is on Windows, Mac, or Linux.
