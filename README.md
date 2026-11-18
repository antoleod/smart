# SmartAssignment 2.0.5 — public distribution

Injected, browser-based dispatch assistant for ServiceNow. This repository contains the
**built runtime only**: nothing here is source code, and nothing is required from you
except a browser tab on your ServiceNow instance.

- **Release:** `v2.0.5`
- **Bundle:** [smart-assignment.bundle.js](https://cdn.jsdelivr.net/gh/antoleod/smart@v2.0.5/smart-assignment.bundle.js)
- **Source:** [antoleod/SmartAssignment](https://github.com/antoleod/SmartAssignment) (private, 6ba80fa6856bbcfbec9c79863b192fa8a92e1678)
- **Built:** 2026-11-18T12:29:19.170Z
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

## Install

1. Open your ServiceNow instance and sign in.
2. Copy the contents of `bookmarklet.txt`.
3. Create a browser bookmark whose URL is that `javascript:` code, or paste it into the
   address bar once (some browsers strip `javascript:` when pasting — type it manually
   if needed).
4. Run it on the instance. The panel opens in the corner; configure the queue group,
   roster, delay and strategy there.

The bookmarklet refuses a duplicate start of the same version, replaces an instance left by
a different version, and keeps settings and tracked deadlines in the browser profile.

## Integrity

Verify the download before trusting it:

```bash
sha256sum smart-assignment.bundle.js
# c58d8ee53be8ff72a87eaddc7c059f5e622636c9f7e7b5aa18a7353ee9137f7d
```

The URL is pinned to the immutable release tag `v2.0.5`, so a later release cannot change
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
