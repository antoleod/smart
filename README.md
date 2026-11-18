# SmartAssignment 2.0.3 — public distribution

Injected, browser-based dispatch assistant for ServiceNow. This repository contains the
**built runtime only**: nothing here is source code, and nothing is required from you
except a browser tab on your ServiceNow instance.

- **Release:** `v2.0.3`
- **Bundle:** [smart-assignment.bundle.js](https://cdn.jsdelivr.net/gh/antoleod/smart@v2.0.3/smart-assignment.bundle.js)
- **Source:** [antoleod/SmartAssignment](https://github.com/antoleod/SmartAssignment) (private, 21a99325e0937a0451e03dc137d35c52cd46ecbc)
- **Built:** 2026-11-18T11:36:01.353Z
- **License:** MIT

## What it does

SmartAssignment monitors an assignment-group queue, waits a per-installation staggered delay
(25 / 26 / 27 minutes …), selects a technician, and performs **one** assignment write:
`Assigned to` + `State = On Hold` + `Substate = Process Time`. It never assumes the local
form change succeeded: the record is reloaded and the persisted values are compared before
an assignment is reported as done.

It runs entirely inside your authenticated browser tab. There is no backend, no REST call,
no stored credential and no external service.

## Files

| File | Purpose |
|---|---|
| `smart-assignment.bundle.js` | Single-file IIFE build; exposes `window.SmartAssignment` |
| `bookmarklet.txt` | Ready-to-paste `javascript:` bookmarklet pinned to this release |
| `smart-assignment.user.js` | Optional userscript for the same release (not required) |
| `build-meta.json` | Version, release tag, source commit, bundle URL, size, build time |

## Install the corrected bookmarklet in Firefox, Chrome or Edge

**Important: replace your old 2.0.2 bookmark.** Version 2.0.2 has a verified
JavaScript global-name collision and cannot be fixed by merely refreshing ServiceNow.

1. Open [bookmarklet.txt](./bookmarklet.txt), click **Raw**, and copy the entire **single line**,
   starting with `javascript:`. [Open the raw bookmarklet directly](https://raw.githubusercontent.com/antoleod/smart/main/bookmarklet.txt).
2. In **Firefox**, right-click your existing SmartAssignment bookmark → **Edit Bookmark**.
   Paste the copied line into **Location** (not Name).
   In **Chrome/Edge**, use **Edit bookmark → URL** instead.
3. On your signed-in ServiceNow page, reload the tab once to clear the old runtime.
4. Click the updated bookmark. The new one must contain `@v2.0.3/` and `V="2.0.3"`.
5. If a diagnostic appears, inspect **F12 → Console / Network** and check whether the corporate browser
   policy blocked the CDN script.

Do **not** paste the bookmarklet into GitHub, the ServiceNow search box or the browser address bar:
browsers may remove the `javascript:` prefix when pasting in the address bar.

The release build is pinned to `v2.0.3`; the fixed distribution exposes
`window.SmartAssignment.APP_VERSION === "2.0.3"` instead of overwriting that API.

## Integrity

Verify the download before trusting it:

```bash
sha256sum smart-assignment.bundle.js
# 0d2bbb77e45e706d01b0abd16b8201ae9bb519a63f183e61ef9107b6218a2dee
```

The URL is pinned to the immutable release tag `v2.0.3`, so a later release cannot change
what your bookmarklet loads.

## Safety

- Live writes stay **off** until an operator enables them after a supervised test.
- Choice values (`On Hold`, `Process Time`) are resolved from the instance, never hardcoded.
- A ticket already assigned, moved to another group, closed or otherwise ineligible is
  skipped, not overwritten.
- Multi-browser races are resolved by re-reading before every write; the loser sees an
  "already assigned" result. There is no cross-browser lock.

## Not included here

Source code, tests, build tooling, configuration, credentials and corporate data are **not**
published to this repository. Do not open issues with instance names or ticket data.
