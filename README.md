# SmartAssignment 2.0 — Bookmarklet & public distribution

**SmartAssignment** is a browser-injected assistant for monitoring and assigning ServiceNow tickets. This public repository contains only the compiled distribution; the development repository is private.

> **Quick install (Chrome / Microsoft Edge):** Copy the complete `javascript:` code below, create a new bookmark named **SmartAssignment**, paste the code in the bookmark's **URL** field, and save. Open your authenticated ServiceNow page and click the bookmark.

## 1. Copy the bookmarklet

**[Open bookmarklet.txt (raw text — easiest to select all and copy)](https://raw.githubusercontent.com/antoleod/smart/main/bookmarklet.txt)** · [View source on GitHub](./bookmarklet.txt)

Click **Copy** in the code block below (if your GitHub interface offers that button). Copy the entire line, including the initial **`javascript:`**. **This is the bookmarklet URL itself**, not a normal website address.

```text
javascript:(function(){var B="https://cdn.jsdelivr.net/gh/antoleod/smart@main/smart-assignment.bundle.js",V="2.0.0",K='__SMART_ASSIGNMENT_BOOT__',D='__SMART_ASSIGNMENT_2__',S='smart-assignment-bundle';var G=window[D];if(G&&G.instance&&(G.version||'')===V){G.instance.noteDuplicateStart();return;}if(G&&G.instance){console.info('[SmartAssignment] loading bundle '+V+' over running '+(G.version||'unknown'));}var prev=document.getElementById(S);if(prev&&prev.parentNode){prev.parentNode.removeChild(prev);}window[K]={autoStart:false,source:'bookmarklet',version:V,loadedAt:Date.now()};function boot(){try{if(window.SmartAssignment&&typeof window.SmartAssignment.start==='function'){window.SmartAssignment.start();}else{console.error('[SmartAssignment] bundle loaded without API');}}catch(e){console.error('[SmartAssignment] start failed',e);}}function inject(){var s=document.createElement('script');s.id=S;s.src=B+(B.indexOf('?')<0?'?':'&')+'v='+Date.now();s.async=true;s.onload=boot;s.onerror=function(){console.error('[SmartAssignment] could not load bundle from '+B);};document.head.appendChild(s);}inject();})();
```

The bookmarklet loads this compiled JavaScript bundle:

```text
https://cdn.jsdelivr.net/gh/antoleod/smart@main/smart-assignment.bundle.js
```

**Do not paste just the bundle URL into a bookmark.** The bookmark needs the full `javascript:(function(){...})();` code above.

## 2. Install in Google Chrome or Microsoft Edge (Windows)

1. Open **Chrome** or **Edge**.
2. Show the bookmarks/favorites bar with **Ctrl + Shift + B** (optional, but convenient).
3. Right-click the bookmarks/favorites bar and choose **Add page** / **Add bookmark** / **Add favorite** (wording varies).
4. Set **Name** to `SmartAssignment`.
5. In **URL** (or **Address**), delete the existing address and paste the **entire bookmarklet code** copied from section 1. It **must begin with `javascript:`**.
6. Save. If the browser strips the `javascript:` prefix, edit the bookmark and restore it in the URL field.
7. Open your organization's **ServiceNow** website and sign in normally.
8. Click the **SmartAssignment** bookmark on that ServiceNow page.
9. Wait for the SmartAssignment panel/launcher. Use **simulation / live writes disabled** for initial testing.

**Alternative if the bar is hidden:** Open **Bookmark Manager** (`Ctrl + Shift + O` in Chrome/Edge), create a new bookmark, and paste the same code into its **URL** field.

**Important:** The bookmarklet must be saved as a **bookmark URL**. Pasting it directly into a browser address bar or GitHub page may be blocked or altered by the browser. You must run it **from the ServiceNow tab**, not from GitHub.

## 3. How to use it safely

1. Make sure ServiceNow is open in an authorized and authenticated browser session.
2. Click the SmartAssignment bookmark to inject the dashboard.
3. Configure the assignment group/queue, roster, strategy and waiting period.
4. Keep automatic live writes **OFF** until a permitted test ticket has been validated.
5. Test queue detection and **simulation mode** before enabling real assignment.
6. If you authorize a test write, verify the saved record in ServiceNow: **Assigned to**, **State = On Hold**, **Substate = Process Time**.
7. For multiple users, configure the intended per-installation delays (e.g. **25 / 26 / 27 minutes**). These delays reduce collisions but are **not** a distributed lock.

If you close or reload the ServiceNow tab, click the bookmarklet again to start it (unless you separately installed the optional authorized userscript).

## 4. Troubleshooting

| Symptom | Check |
| --- | --- |
| Nothing appears | Run the saved bookmark on an actual ServiceNow tab, not on GitHub; check the browser console for a SmartAssignment load error. |
| The bookmark opens a web page or searches for the text | Edit the bookmark's **URL**, not the browser address bar. Check that it starts with `javascript:`. |
| Browser reports the bundle cannot load | Corporate content security policy (CSP), firewall or CDN access may block jsDelivr. Use an organization-approved distribution host if necessary. |
| Data/queue not detected | Verify the ServiceNow list view, selected assignment group, user permissions and app settings. The actual corporate instance remains to be validated. |
| Real ticket is not updated | Live writes are disabled by default. Do not enable them without controlled validation of save and persisted values. |
| Updated version does not load | This distribution currently targets **`@main`**; check the network request and loaded bundle version. |

## 5. Public distribution files

| File | Purpose |
| --- | --- |
| [`bookmarklet.txt`](./bookmarklet.txt) | Complete bookmark URL to copy into a browser favorite |
| [`smart-assignment.bundle.js`](./smart-assignment.bundle.js) | Compiled runtime loaded by the bookmarklet |
| [`smart-assignment.user.js`](./smart-assignment.user.js) | Optional authorized userscript for automatic loading |
| [`build-meta.json`](./build-meta.json) | Release metadata and private source commit traceability |

## 6. Release & security notes

- Version **2.0.0**; source commit **`b6914b8fa1595e059e1f56b98e7bb57e199b87e6`**.
- **`@main` is mutable.** A `v2.0.0` tag has **not** been published yet; when a verified immutable tag is available, the loader should be regenerated to pin it.
- The code runs with your already-authenticated ServiceNow browser privileges. Follow your organization's security and software-use policies.
- No credentials, private project source, corporate ticket data or test fixtures belong in this public repository.
- Mock-based automated tests do **not** prove integration against your corporate ServiceNow instance.
