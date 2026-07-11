// Downloads every photo in lib/photos.ts into public/photos/.
//
//   npm run photos
//
// Afterwards set USE_LOCAL_PHOTOS = true in lib/photos.ts to serve them from
// /public instead of the Pexels CDN, and ship the public/ folder with your deploy.
//
// No dependencies: uses Node's built-in fetch (Node 18+).

import { mkdir, writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "photos");
const WIDTH = 1800; // enough for full-bleed use; Next resizes down per breakpoint

// Parse the manifest without needing a TS toolchain: pull out id + file pairs.
async function readManifest() {
  const src = await readFile(path.join(process.cwd(), "lib", "photos.ts"), "utf8");
  const entries = [...src.matchAll(/id:\s*"(\d+)",\s*\n\s*file:\s*"([^"]+)"/g)];
  if (entries.length === 0) throw new Error("No photos found in lib/photos.ts");
  return entries.map(([, id, file]) => ({ id, file }));
}

function url(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${WIDTH}`;
}

async function download({ id, file }) {
  const res = await fetch(url(id));
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT_DIR, file), buf);
  return buf.length;
}

async function main() {
  const manifest = await readManifest();
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Downloading ${manifest.length} photos to public/photos ...\n`);
  let failed = 0;

  for (const entry of manifest) {
    try {
      const bytes = await download(entry);
      console.log(`  ok   ${entry.file}  (${(bytes / 1024).toFixed(0)} kB)`);
    } catch (err) {
      failed++;
      console.error(`  FAIL ${entry.file}  ${err.message}`);
    }
  }

  console.log(
    failed === 0
      ? "\nDone. Now set USE_LOCAL_PHOTOS = true in lib/photos.ts."
      : `\nDone with ${failed} failure(s). Photos still load from the Pexels CDN in the meantime.`
  );
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
