import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const [,, outdir, ...ids] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 4880, height: 3000 }, deviceScaleFactor: 1 });
p.on('pageerror', (e) => console.error('PAGE ERROR', e.message));
await p.goto('file://' + process.cwd() + '/index.html');
await p.waitForFunction(() => document.body.dataset.ready === '1');
await p.waitForTimeout(500);
for (const g of ids) {
  const el = await p.$(g === 'head' ? '.b-head' : `.group[data-g="${g}"]`);
  await el.screenshot({ path: `${outdir}/g-${g}.png` });
}
await b.close();
