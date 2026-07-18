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
