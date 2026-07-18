# UCN Tactical Aids Archive

A self-updating library site for tactical aid PDFs, grouped by category and
hosted on Netlify.

## How it works

- Each folder inside `/pdfs/` is a **category** and becomes a tab on the site.
- Every `.pdf` file inside a category folder is automatically listed —
  no need to touch `index.html`.
- On every Netlify deploy, `build-manifest.js` scans `/pdfs/` and regenerates
  `manifest.json`, which the page reads to build its tabs, search, and cards.

## Adding a new PDF

1. Drop the PDF into the right category folder, e.g. `pdfs/medical/burns-triage.pdf`
2. Commit and push to git.
3. Netlify rebuilds automatically → the new PDF appears on the site within
   a minute or two. Nothing else to edit.

File and category names are auto-titled for display, e.g.
`reactor-shutdown-sequence.pdf` → "Reactor Shutdown Sequence".
Use hyphens or underscores in filenames/folder names; they're converted to
spaces automatically.

## Adding a new category

Just create a new folder under `/pdfs/`, e.g. `pdfs/communications/`, and add
PDFs to it. It'll show up as a new tab automatically on next deploy.

## Deploying to Netlify

**Recommended: git-connected (auto-deploys on every push)**
1. Push this folder to a GitHub repo.
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo.
3. Build command: `node build-manifest.js` (already set in `netlify.toml`)
4. Publish directory: `.` (already set)
5. Deploy. From now on, any git push updates the live site.

**Quick alternative: drag-and-drop**
- Run `node build-manifest.js` locally first (so `manifest.json` is current),
  then zip the whole folder and drag it into the Netlify dashboard. You'll
  need to re-zip and re-upload each time you add a PDF this way.

## Replacing the placeholder PDFs

The five PDFs currently in `/pdfs/` are placeholders to demo the layout —
delete or replace them with the real tactical aids whenever you're ready.

## Local preview

Any static server works, e.g.:
```
cd tactical-aids
node build-manifest.js
python3 -m http.server 8000
```
Then open `http://localhost:8000`.
