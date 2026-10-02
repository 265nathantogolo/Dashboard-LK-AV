// Renders a page to PNG with the bundled Chromium.
// usage: node shot.mjs <file.html> <out.png> [width] [height] [scale] [fullPage 1|0] [selector]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const [,, file, out, w = '1300', h = '1000', scale = '1', full = '1', sel = ''] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +scale });
p.on('pageerror', (e) => console.error('PAGE ERROR', e.message));
await p.goto('file://' + process.cwd() + '/' + file);
await p.evaluate(() => document.fonts.ready);
await p.waitForFunction(() => !document.getElementById('board') || document.body.dataset.ready === '1');
await p.waitForTimeout(800);
const opts = out.endsWith('.jpg') ? { type: 'jpeg', quality: 88 } : {};
if (sel) await (await p.$(sel)).screenshot({ path: out, ...opts });
else await p.screenshot({ path: out, fullPage: full === '1', ...opts });
await b.close();
