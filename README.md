# SmartAssignment 2.0 — public distribution

This repository hosts the **compiled browser distribution only** for [SmartAssignment](https://github.com/antoleod/SmartAssignment).

- [Production JavaScript bundle](./smart-assignment.bundle.js)
- [Bookmarklet source (copy its entire javascript: URL)](./bookmarklet.txt)
- [Optional userscript](./smart-assignment.user.js)
- [Build metadata](./build-meta.json)

## Loading
The bookmarklet and userscript load the public bundle from:

`https://cdn.jsdelivr.net/gh/antoleod/smart@main/smart-assignment.bundle.js`

Use in an authorized, authenticated ServiceNow session. **Live writes must remain disabled** until tested with an approved test ticket.

## Release verification
Verify `build-meta.json` and bundle SHA-256 against the intended private source commit. The `main` URL is **mutable**; when a release tag is created, prefer an immutable version-specific URL and regenerate loaders to pin that tag.

## Security
Do not publish private source code, credentials, corporate data, test fixtures or logs here. This repository contains distribution files only.

Version: 2.0.0. Source: `antoleod/SmartAssignment@b6914b8fa1595e059e1f56b98e7bb57e199b87e6`.
