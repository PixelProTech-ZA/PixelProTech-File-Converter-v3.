# PixelProTech Document Engine — PWA Package

Everything in this zip is flat — no folders — because GitHub's web upload UI
has a history of dropping files or breaking paths when you upload a nested
folder. Keep it flat when you deploy.

## What's in here
- `index.html` — the app itself
- `manifest.json` — PWA identity (name, icons, colors, install behavior)
- `service-worker.js` — makes it work offline after the first visit
- `icon-192.png`, `icon-512.png` — app icons for home screen / install prompt
- `README.md` — this file

## Deploy to GitHub Pages (web upload, no git needed)

1. Go to your repo on GitHub (or create a new one — public, no README/.gitignore/license needed since this zip has its own).
2. Click **Add file → Upload files**.
3. Drag in all 5 files from this zip **at once, directly into the root** — do NOT upload a folder, and do NOT create subfolders in the upload dialog. All 5 files must sit next to each other at the repo root.
4. Commit directly to `main`.
5. Go to **Settings → Pages**.
6. Under **Source**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
7. GitHub gives you a URL like `https://<your-username>.github.io/<repo-name>/` — wait 1-2 minutes after the first deploy, then open it.

## Test it properly before you call it done

- **Desktop (Chrome/Edge):** open the URL, look for the install icon (⊕) in the address bar. Click it, confirm the app opens in its own window, not a browser tab.
- **Mobile (Android Chrome):** open the URL, tap the menu (⋮) → "Add to Home screen" or wait for the automatic install prompt. Confirm the icon shows correctly on the home screen.
- **Mobile (iPhone Safari):** open the URL, tap Share → "Add to Home Screen". iOS ignores some manifest fields, so this is the one to check by hand.
- **Offline test:** after the first successful load, turn on airplane mode and reload. The app shell should still open. Note: the CDN libraries (pdf-lib, mammoth, xlsx, jszip, pdf.js, pdf-encrypt-lite) only work offline once they've been fetched at least once — so do a full round of conversions/merge/lock while online first, *then* test offline, or those specific features will fail without a connection on a device that's never loaded them before.

## If you change the app later

Every time you edit `index.html`, bump the cache name in `service-worker.js`
(change `pixelprotech-doc-engine-v1` to `-v2`, etc.) — otherwise returning
visitors' browsers may keep serving the old cached version instead of your
update. This is the single most common "why isn't my fix showing up" issue
with PWAs.

## Icons

The icons in this package are generated placeholders (dark background, green
accent, on-brand color-wise) — functional and installable, but not hand
designed. Swap `icon-192.png` and `icon-512.png` for your own artwork
whenever you have it; keep the exact filenames and square dimensions (192×192,
512×512) so `manifest.json` doesn't need editing.
