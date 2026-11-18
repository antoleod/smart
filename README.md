# SmartAssignment 2.0.2

**Public distribution — compiled files only.** The private source repository is not published here.

## Install in Firefox, Chrome or Edge

**Use the bookmarklet as the bookmark's URL, not as a web address or a Console command.**

1. Sign in to ServiceNow and leave that tab open.
2. Open [bookmarklet.txt](./bookmarklet.txt) and select **Raw** (or open the [raw file](https://raw.githubusercontent.com/antoleod/smart/main/bookmarklet.txt)).
3. Copy **the complete single line**, starting with `javascript:(function()` and ending with `})();`.
4. In **Firefox**: right-click the bookmarks toolbar → **Add Bookmark**. Give it the name `SmartAssignment` and paste the code into **URL/Location**.
5. In **Chrome / Edge**: open the bookmarks manager, create a bookmark, paste the code into its **URL** field. If editing an existing bookmark, replace its URL completely.
6. Return to the signed-in **ServiceNow** tab and click the bookmark **once**. Click it again to reopen the panel if it is minimized or hidden.

**Important:** Firefox/Chrome/Edge can strip `javascript:` when pasting into the browser **address bar**. Do not use the address bar; save the complete line in the **bookmark URL** field. The code is not a normal URL to visit.

### Quick links

- **Copy bookmarklet:** [bookmarklet.txt](./bookmarklet.txt) · [Raw one-line bookmarklet](https://raw.githubusercontent.com/antoleod/smart/main/bookmarklet.txt)
- **Runtime bundle:** [smart-assignment.bundle.js](./smart-assignment.bundle.js)
- **Optional userscript:** [smart-assignment.user.js](./smart-assignment.user.js)
- **Build metadata:** [build-meta.json](./build-meta.json)

## Current release

| Field | Value |
|---|---|
| Version | **2.0.2** |
| Immutable tag | `v2.0.2` |
| Bundle CDN | `https://cdn.jsdelivr.net/gh/antoleod/smart@v2.0.2/smart-assignment.bundle.js` |
| Private build commit | `462e313778eb40d149d56c58556e277e2eb876a9` |
| Built | 2026-11-18 |
| License | MIT |

The bookmarklet is pinned to `v2.0.2` for stability. A future release will require updating its saved bookmark URL. Updating the README or bookmarklet file does **not** change the immutable `v2.0.2` bundle.

## Troubleshooting

**Nothing happens:** make sure you ran the bookmark on the authenticated ServiceNow tab, not on GitHub. Confirm the saved URL starts with `javascript:` and is a **single line**; copy it again from the raw link if necessary.

**The panel is not visible:** click the bookmark again. Version 2.0.2 attempts to reopen an existing panel and recover a stale instance.

**A load error appears:** open **F12 → Console** and **Network**, check if `smart-assignment.bundle.js` was blocked by the browser or your organization's Content Security Policy (CSP). The loader displays a diagnostic after 15 seconds if loading times out. A successful CDN fetch does not guarantee ServiceNow permits script execution.

**Old version appears:** reload the ServiceNow tab and replace the bookmark URL with the current raw bookmarklet. Do not mix bookmarklet versions.

**Searching for a technician:** enter the username in **Roster**. The lookup uses the authenticated classic ServiceNow user list; it does not use the REST Table API, which may return HTTP 401 in your environment.

## Security and limitations

- Runs in the user's authenticated ServiceNow browser session; no separate backend or credentials.
- Default **live writes OFF**. Test in simulation mode before enabling real ticket assignments.
- The public repository contains only compiled distribution assets and documentation.
- Version 2.0.2 passed automated tests and build validation, but actual behavior on a corporate ServiceNow instance still requires user validation.
- Browser corporate policy, SSO rules or CSP may prevent externally hosted script injection.

## Build integrity

Bundle SHA-256 for the release artifact:

```text
74dba2006646984724fbaa66b962b222c4aa91b7ef5fe98ee17c4503c5e85ca0
```

Source repository (private): [antoleod/SmartAssignment](https://github.com/antoleod/SmartAssignment).
