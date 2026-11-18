// Render poster.html to entry.png at exactly 1024x1024 with headless Chromium.
//
// The poster loads Three.js as an ES module, which Chromium refuses over
// file:// — so this script serves the repo over a loopback HTTP server
// (fully offline) and screenshots the page once the 3D hero scene flags
// itself ready. The page is captured at 2x (2048x2048) and downscaled to
// 1024x1024 with PIL's Lanczos filter, which keeps the typeset text and
// the 3D hero crisp when the judges shrink the image further. Playwright
// is installed in ~/workspace/tools/pw on this machine, so it is loaded
// through a require anchored there (this repo carries no node_modules).
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { unlinkSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('/home/hatch/workspace/tools/pw/package.json');
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, 'entry.png');
const rawPath = join(here, '.entry@2x.png');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.json': 'application/json',
};

const server = createServer(async (req, res) => {
  try {
    const path = normalize(join(here, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (!path.startsWith(here)) { res.writeHead(403).end(); return; }
    const body = await readFile(path);
    res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/poster.html`;

const browser = await chromium.launch({ args: ['--no-proxy-server'] });
try {
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
    deviceScaleFactor: 2,
  });
  page.on('console', msg => console.log(`[page] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__sceneReady === true, null, { timeout: 30000 });
  const sceneError = await page.evaluate(() => window.__sceneError ?? null);
  if (sceneError) console.log(`scene error: ${sceneError}`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: rawPath, type: 'png' });
  console.log(`captured 2x render -> ${rawPath}`);
} finally {
  await browser.close();
  server.close();
}

/* Downscale 2048x2048 -> 1024x1024 (Lanczos) for crisp anti-aliased output. */
execFileSync('python3', ['-c', `
from PIL import Image
import sys
im = Image.open(sys.argv[1])
assert im.size == (2048, 2048), im.size
im = im.resize((1024, 1024), Image.LANCZOS)
im.save(sys.argv[2], optimize=True)
print('downscaled ->', sys.argv[2], im.size)
`, rawPath, outPath], { stdio: 'inherit' });
unlinkSync(rawPath);
console.log(`wrote ${outPath}`);
