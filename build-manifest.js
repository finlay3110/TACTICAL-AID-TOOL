// Scans /pdfs, treating each subfolder as a category, and writes manifest.json.
// Runs automatically on every Netlify build (see netlify.toml) — so dropping a
// new PDF into a category folder and pushing to git is all that's needed for
// it to appear on the site. No manual editing of index.html required.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PDFS_DIR = path.join(ROOT, 'pdfs');
const OUT_FILE = path.join(ROOT, 'manifest.json');

function titleCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildManifest() {
  const manifest = {
    generated: new Date().toISOString(),
    categories: [],
  };

  if (!fs.existsSync(PDFS_DIR)) {
    console.warn(`No pdfs/ folder found at ${PDFS_DIR} — writing empty manifest.`);
    fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));
    return;
  }

  const categoryDirs = fs
    .readdirSync(PDFS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const dir of categoryDirs) {
    const categoryPath = path.join(PDFS_DIR, dir.name);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.toLowerCase().endsWith('.pdf'))
      .sort((a, b) => a.localeCompare(b));

    manifest.categories.push({
      id: dir.name,
      label: titleCase(dir.name),
      files: files.map((filename) => {
        const stat = fs.statSync(path.join(categoryPath, filename));
        return {
          name: titleCase(filename.replace(/\.pdf$/i, '')),
          filename,
          path: `pdfs/${dir.name}/${filename}`,
          size: stat.size,
          modified: stat.mtime.toISOString(),
        };
      }),
    });
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));

  const totalFiles = manifest.categories.reduce((n, c) => n + c.files.length, 0);
  console.log(
    `manifest.json built: ${manifest.categories.length} categories, ${totalFiles} PDFs.`
  );
}

buildManifest();
