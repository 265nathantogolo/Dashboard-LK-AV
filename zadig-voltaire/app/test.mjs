// Smoke test for the app demo: every view renders, key journeys work.
// usage: node app/test.mjs <outdir>
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const out = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await p.goto('file://' + process.cwd() + '/app/index.html');
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(600);
const shot = async (name) => { await (await p.$('.phone')).screenshot({ path: `${out}/${name}.png` }); };
const views = [
  ['home', null], ['search', null], ['shop', null], ['catalogue', 'vestes'], ['pdp', 'liam'], ['cart', null], ['journal', null], ['article', 'interview'],
  ['playlist', 'nuit'], ['drops', null], ['drop', 'vinyl'], ['drop', 'rocky'], ['drop', 'collab'], ['collections', null], ['collection', 'ah26'], ['lookbook', null], ['look', 'l01'],
  ['experiences', null], ['event', 'nuit'], ['invitation', 'nuit'], ['invitations', null], ['concierge', null], ['profile', null], ['wishlist', null], ['orders', null],
  ['order', 'ZV-48213'], ['prefs', null], ['stores', null], ['store', 'marais'], ['inbox', null],
];
for (const [v, id] of views) {
  await p.evaluate(([v, id]) => { window.ZV.tab('home'); window.ZV.go(v, id ? { id } : {}); }, [v, id]);
  await p.waitForTimeout(380);
  await shot(`v-${v}${id ? '-' + id : ''}`);
}
// Journey: pdp -> add -> cart -> pay -> confirm
await p.evaluate(() => { window.ZV.tab('shop'); window.ZV.go('pdp', { id: 'liam' }); });
await p.waitForTimeout(400);
await p.click('[data-act="size"][data-p="liam:40"]');
await p.click('[data-act="add"]');
await p.waitForTimeout(500);
await shot('j-added-sheet');
await p.click('.sheet [data-go="cart"]');
await p.waitForTimeout(400);
await shot('j-cart');
await p.click('#paybtn');
await p.waitForTimeout(1900);
await shot('j-confirm');
// Journey: concierge chat
await p.evaluate(() => { window.ZV.tab('home'); window.ZV.go('concierge'); });
await p.waitForTimeout(400);
await p.fill('#chatin', 'Où est ma commande ?');
await p.keyboard.press('Enter');
await p.waitForTimeout(1500);
await p.click('[data-act="chat"][data-p="Une boutique"]');
await p.waitForTimeout(1500);
await shot('j-chat');
// Journey: drop live + story player + push
await p.evaluate(() => { window.ZV.tab('drops'); window.ZV.go('drop', { id: 'rocky' }); });
await p.waitForTimeout(400);
await p.click('[data-act="launch"]');
await p.waitForTimeout(700);
await shot('j-drop-live');
await p.evaluate(() => window.ZV.tab('home'));
await p.waitForTimeout(300);
await p.click('[data-act="story"][data-p="backstage"]');
await p.waitForTimeout(5600);
await shot('j-story');
await p.keyboard.press('Escape');
await p.evaluate(() => window.ZV.pushNotif('collection'));
await p.waitForTimeout(800);
await shot('j-push');
await p.click('#push');
await p.waitForTimeout(400);
await p.click('[data-act="film"]');
await p.waitForTimeout(8800);
await shot('j-film');
await p.keyboard.press('Escape');
// RSVP
await p.evaluate(() => { window.ZV.tab('home'); window.ZV.go('event', { id: 'nuit' }); });
await p.waitForTimeout(400);
await p.click('[data-act="rsvp"]');
await p.waitForTimeout(500);
await shot('j-rsvp');
// Full page with panel
await p.keyboard.press('Escape');
await p.evaluate(() => window.ZV.tab('home'));
await p.waitForTimeout(500);
await p.screenshot({ path: `${out}/full-desktop.png` });
// Mobile
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
m.on('pageerror', (e) => errors.push('mobile: ' + e.message));
await m.goto('file://' + process.cwd() + '/app/index.html');
await m.waitForTimeout(800);
await m.screenshot({ path: `${out}/full-mobile.png` });
const st = await p.evaluate(() => { const s = window.ZV.state(); return { cart: s.cart.length, orders: s.orders.length, rsvp: s.rsvp.nuit, live: s.dropLive, notifs: s.notifs.length }; });
console.log(JSON.stringify(st));
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no errors');
await b.close();
