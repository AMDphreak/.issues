When a canvas tab is already open and the chat then opens a local webpage, Cursor loads that page inside the canvas tab. The icon, title, and controls stay the canvas tab. Only the contents change to the localhost page.

Cursor 3.31.15 (product version 3.31.15), Windows 10/11 build 26300.

### Where does the bug appear?

Cursor IDE. A canvas tab is open, then the same chat opens a page in the in-editor browser.

### What happened

1. An agent chat created a canvas, and I opened that canvas tab.
2. The same chat then opened a local site (a dev server on localhost).
3. Expected: a new editor tab that is a Browser tab, with the browser icon, the page title, and the browser controls.
4. Actual: the canvas webview navigated to `localhost:xxxx`. The tab stayed a canvas tab. Same icon, same title, same canvas controls. The canvas UI was replaced by the site.

A canvas is already a localhost webview (`http://127.0.0.1:<port>/canvas/…`). Reusing an existing Browser tab for another localhost URL is fine. Reusing the canvas webview is not. The tab type never changes from canvas to browser, so the chrome does not update.

The canvas file on disk is unchanged. Closing the tab and opening the `.canvas.tsx` file again brings the canvas back. The site still needs its own Browser tab.

### How to reproduce

1. Have an agent create a canvas, and open that canvas tab.
2. In the same chat, have the agent open a local dev server in the Cursor browser (or follow a localhost link while Browser Tab / Show Localhost Links in Browser is on).
3. Watch the canvas tab.

### Expected

A new Browser tab opens for the site. The canvas tab keeps showing the canvas, with its icon, title, and controls.

### Does this stop you from using Cursor?

The canvas disappears until that tab is closed and reopened. The site has no browser controls, because it is sitting in the canvas tab.
