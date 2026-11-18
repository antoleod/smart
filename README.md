# SmartAssignment 2.0.4 — public distribution

Injected, browser-based dispatch assistant for ServiceNow. This repository contains the
**built runtime only**: nothing here is source code, and nothing is required from you
except a browser tab on your ServiceNow instance.

- **Release:** `v2.0.4`
- **Bundle:** [smart-assignment.bundle.js](https://cdn.jsdelivr.net/gh/antoleod/smart@v2.0.4/smart-assignment.bundle.js)
- **Source:** [antoleod/SmartAssignment](https://github.com/antoleod/SmartAssignment) (private, bccf45c379af137eb7acd4d4797c283759ce97d2)
- **Built:** 2026-11-18T12:15:04.511Z
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

## Install SmartAssignment 2.0.4

1. Open [bookmarklet.txt](./bookmarklet.txt), click **Raw**, and copy the entire single line. [Direct raw bookmarklet](https://raw.githubusercontent.com/antoleod/smart/main/bookmarklet.txt)
2. In Firefox: right-click the SmartAssignment bookmark → **Edit Bookmark**, then replace its **Location** with that line. In Chrome/Edge: edit the bookmark **URL**.
3. Reload your signed-in ServiceNow tab, then click the bookmark. The code must contain `@v2.0.4/`.
4. In **Roster**, search for the exact ServiceNow username. The 2.0.4 parser recognizes exact username cells even when all 19 table cells lack `data-field`.

**Important:** This release fixes username extraction from classic list rows. Its Active-status check remains fail-closed: if ServiceNow does not expose a verifiable Active field, the lookup will report that limitation rather than silently add a potentially inactive user.

If lookup still fails, open F12 → Console and capture the SmartAssignment error text. The app does not require copying private source code or accessing GitHub from ServiceNow.

The versioned CDN URL is pinned to immutable `v2.0.4`; previous bookmarklets will not update automatically.

## Integrity

Verify the download before trusting it:

```bash
sha256sum smart-assignment.bundle.js
# e82f38fa080900ca0e6cd2cd35699ec6817dbfe60b2716e41e625aea7e5eebd2
```

The URL is pinned to the immutable release tag `v2.0.4`, so a later release cannot change
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
