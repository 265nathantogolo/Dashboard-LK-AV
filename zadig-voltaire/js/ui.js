/* ZADIG & VOLTAIRE — App concept board
 * App UI kit (icons, components) and every phone screen of the ecosystem. */
(function () {
  const { photo, product } = window.ART;

  // ------------------------------------------------------------------ icons
  const I = {
    home: '<path d="M3.5 10.5 12 4l8.5 6.5V20h-5.5v-5.5h-6V20H3.5z"/>',
    shop: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    stories: '<rect x="4.5" y="3.5" width="15" height="17"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    drops: '<path d="M13 2.5 5.5 13.5h5.5l-1 8 8-11.5h-5.5z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 15-5 16 0"/>',
    search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5.5 5.5"/>',
    bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    heart: '<path d="M12 20C4.5 14.5 2.5 10.5 4.2 7.2 6 4 10 4.2 12 7.6 14 4.2 18 4 19.8 7.2c1.7 3.3-.3 7.3-7.8 12.8z"/>',
    heartF: '<path fill="currentColor" d="M12 20C4.5 14.5 2.5 10.5 4.2 7.2 6 4 10 4.2 12 7.6 14 4.2 18 4 19.8 7.2c1.7 3.3-.3 7.3-7.8 12.8z"/>',
    back: '<path d="m15 5-7 7 7 7"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    share: '<path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 12.5V21h14v-8.5"/>',
    bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.8 1.8H4.2z"/><path d="M10 21h4"/>',
    pin: '<path d="M12 21.5S5 14.5 5 9.2a7 7 0 0 1 14 0c0 5.3-7 12.3-7 12.3z"/><circle cx="12" cy="9.2" r="2.4"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    play: '<path fill="currentColor" stroke="none" d="M8 5.5v13l11-6.5z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    chev: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    cam: '<path d="M3.5 7.5h4l1.5-2.5h6l1.5 2.5h4V19h-17z"/><circle cx="12" cy="13" r="3.5"/>',
    box: '<path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4z"/><path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9"/>',
    truck: '<path d="M2.5 6.5h11v10h-11zM13.5 10h4.5l3 3.5v3h-7.5"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    bookmark: '<path d="M6.5 3.5h11v17L12 16.5l-5.5 4z"/>',
    sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/>',
    sparkle: '<path d="M12 3.5 13.8 10 20.5 12l-6.7 2L12 20.5 10.2 14 3.5 12l6.7-2z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    store: '<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16v11H4zM9.5 20.5v-6h5v6"/>',
    scissors: '<circle cx="6.5" cy="17" r="2.5"/><circle cx="17.5" cy="17" r="2.5"/><path d="M8.5 15.5 18 4M15.5 15.5 6 4"/>',
    gift: '<rect x="4" y="9" width="16" height="11.5"/><path d="M3 9h18M12 9v11.5M12 9c-2-4-6-4-5-1.5.6 1.3 3 1.5 5 1.5zm0 0c2-4 6-4 5-1.5-.6 1.3-3 1.5-5 1.5z"/>',
    ticket: '<path d="M3.5 7h17v3.2a2 2 0 0 0 0 3.6V17h-17v-3.2a2 2 0 0 0 0-3.6z"/><path d="M14 7v10" stroke-dasharray="1.5 1.5"/>',
    music: '<path d="M9 18V5.5l10-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    dots: '<circle cx="5.5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="18.5" cy="12" r="1" fill="currentColor"/>',
    route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H16"/>',
    shuffle: '<path d="M3.5 7h3.5c5 0 5 10 10 10h3.5M17.5 14l3 3-3 3M3.5 17H7c1.5 0 2.6-.9 3.5-2.2M13.5 9.2C14.4 7.9 15.5 7 17 7h3.5M17.5 4l3 3-3 3"/>',
    grid: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    wallet: '<rect x="3.5" y="6" width="17" height="13" rx="1.5"/><path d="M3.5 10h17M15.5 14.5h2"/>',
    flash: '<path d="M9 3.5h6l-1 5h3.5L10 20.5l1.5-8H8z"/>',
    photo: '<rect x="3.5" y="5" width="17" height="14"/><circle cx="9" cy="10" r="1.8"/><path d="m3.5 17 5.5-5 4 4 3-2.5 4.5 3.5"/>',
    loc: '<path d="M4 11.5 20 4l-7.5 16-1.8-6.7z"/>',
  };
  const ic = (n, cls = '', sw = 1.5) =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;

  // ------------------------------------------------------------------ chrome
  const sb = (cls = '') => `<div class="sb ${cls}"><span>9:41</span><span class="ic">
    <svg viewBox="0 0 18 10" fill="currentColor"><rect x="0" y="7" width="3" height="3" rx=".6"/><rect x="5" y="5" width="3" height="5" rx=".6"/><rect x="10" y="2.5" width="3" height="7.5" rx=".6"/><rect x="15" y="0" width="3" height="10" rx=".6"/></svg>
    <svg viewBox="0 0 14 10" fill="currentColor"><path d="M7 2.2c2 0 3.9.8 5.3 2.1l1.1-1.1A9.2 9.2 0 0 0 7 .6 9.2 9.2 0 0 0 .6 3.2l1.1 1.1A7.6 7.6 0 0 1 7 2.2zm0 3.2c1.1 0 2.2.4 3 1.2l1.1-1.1A5.9 5.9 0 0 0 7 3.8a5.9 5.9 0 0 0-4.1 1.7L4 6.6c.8-.8 1.9-1.2 3-1.2zM7 7.4 5.5 8.9 7 10.4l1.5-1.5z"/></svg>
    <svg viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor"/><path d="M24 4v4c.8-.3 1.3-1 1.3-2S24.8 4.3 24 4z" fill="currentColor" opacity=".5"/></svg>
  </span></div>`;

  const hdr = ({ l = '', c = '', r = '', cls = '' } = {}) =>
    `<div class="hdr ${cls}"><div class="l">${l}</div><div>${c}</div><div class="r">${r}</div></div>`;
  const LOGO = '<span class="logo">ZADIG&amp;VOLTAIRE</span>';
  const LOGO_SM = '<span class="logo sm">ZADIG&amp;VOLTAIRE</span>';
  const title = (t) => `<span class="htitle">${t}</span>`;

  const TABS = [['home', 'Home'], ['shop', 'Shop'], ['stories', 'Stories'], ['drops', 'Drops'], ['user', 'Mon Zadig']];
  const tabbar = (on, cls = '') => `<div class="tabbar ${cls}">${TABS.map(([k, l]) =>
    `<div class="t ${k === on ? 'on' : ''}">${ic(k, '', k === on ? 1.8 : 1.4)}<span>${l}</span></div>`).join('')}</div>`;
  const fab = (cls = '', full = false) => full ? `<div class="fab ${cls}"><span class="z">Z</span>CONCIERGE</div>` : `<div class="fab mini ${cls}"><span class="z">Z</span></div>`;
  const homebar = (cls = '') => `<div class="homebar ${cls}"></div>`;

  const img = (scene, o = {}, style = '') => `<div class="img" style="${style}">${photo(scene, o)}</div>`;
  const prod = (kind, style = '', o = {}) => `<div class="img" style="${style}">${product(kind, o)}</div>`;
  const pcard = ({ k, n, p, w = 92, h = 110, b = '', heart = true, o = {}, extra = '' }) => `
    <div class="pcard" style="width:${w}px">
      <div class="img" style="height:${h}px">${product(k, o)}${b ? `<span class="bdg">${b}</span>` : ''}${heart ? ic('heart', 'hrt', 1.4) : ''}</div>
      <div class="nm">${n}</div><div class="pr">${p}</div>${extra}
    </div>`;

  const screen = (inner, { dark = false } = {}) =>
    `<div class="phone"><div class="island"></div><div class="screen ${dark ? 'dark' : ''}">${inner}</div></div>`;

  const qr = () => {
    let s = '';
    for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      let on;
      if (finder) {
        const fx = x > 13 ? x - 14 : x, fy = y > 13 ? y - 14 : y;
        on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx > 1 && fx < 5 && fy > 1 && fy < 5);
      } else on = ((x * 7 + y * 13 + x * y) % 5) < 2;
      s += `<i class="${on ? '' : 'w'}"></i>`;
    }
    return `<div class="qr">${s}</div>`;
  };

  // ------------------------------------------------------------------ screens
  const S = {};

  // ===== 01 HOME =================================================
  S['home-hero'] = () => screen(`
    <div class="abs-top on-photo">${sb()}${hdr({ l: ic('menu'), c: LOGO, r: ic('search') + ic('bag') })}
      <div class="chips" style="padding:4px 16px 0;gap:14px">
        <span class="kicker" style="border-bottom:1.5px solid #fff;padding-bottom:3px">Pour vous</span><span class="kicker" style="opacity:.7">Femme</span><span class="kicker" style="opacity:.7">Homme</span><span class="kicker" style="opacity:.7">Nouveautés</span>
      </div>
    </div>
    <div class="body">
      <div style="position:relative;height:452px">
        ${img('portrait', { lx: 0.78 }, 'position:absolute;inset:0')}
        <div class="ovl" style="top:170px"></div>
        <div style="position:absolute;left:16px;right:16px;bottom:22px;color:#fff">
          <div class="kicker" style="opacity:.8">Campagne Automne-Hiver 26</div>
          <div class="disp" style="font-size:46px;margin:6px 0 6px">PARIS<br>AFTER DARK</div>
          <div class="serif i" style="font-size:14px;opacity:.9;margin-bottom:12px">Le rock comme une seconde peau.</div>
          <div style="display:flex;gap:8px"><div class="btn w sm" style="flex:1">Découvrir la collection</div><div class="btn o sm" style="color:#fff">${ic('play')} Film 1:32</div></div>
          <div class="dots" style="margin-top:12px;color:#fff"><i class="on"></i><i></i><i></i><i></i></div>
        </div>
      </div>
      <div class="sec" style="margin-top:12px"><h4>Stories</h4><a>Tout voir</a></div>
      <div class="hscroll" style="gap:11px">
        ${[['backstage', 'Backstage', 1], ['red', 'Drop', 2], ['vinyl', 'Playlist', 0], ['studio', 'Looks', 0], ['rooftops', 'Paris', 0]].map(([s, l, r]) => `
          <div style="text-align:center;flex:none">
            <div style="width:48px;height:48px;border-radius:50%;padding:2px;border:1.5px solid ${r === 2 ? 'var(--red)' : r ? '#fff' : '#555'}">
              <div class="img" style="width:100%;height:100%;border-radius:50%">${photo(s, { dark: true })}</div></div>
            <div style="font-size:7px;margin-top:5px;letter-spacing:.8px;text-transform:uppercase">${l}</div></div>`).join('')}
      </div>
    </div>
    ${fab('', true)}${tabbar('home')}${homebar()}`, { dark: true });

  S['home-feed'] = () => screen(`
    ${sb()}${hdr({ l: ic('menu'), c: LOGO, r: ic('bell') + ic('search') })}
    <div class="chips" style="padding:2px 16px 10px"><span class="chip on">Pour vous</span><span class="chip">Nouveautés</span><span class="chip">Drops</span><span class="chip">Journal</span><span class="chip">Looks</span></div>
    <div class="body">
      <div style="margin:0 16px;background:#000;color:#fff;display:flex;height:138px">
        ${img('red', { blur: 2.5 }, 'width:112px;flex:none')}
        <div style="padding:12px;display:flex;flex-direction:column;flex:1">
          <span class="tag r" style="align-self:flex-start">Drop à venir · 03.10</span>
          <div class="disp" style="font-size:19px;margin:8px 0 4px">CAPSULE<br>ROCK VINYL</div>
          <div class="cd" style="justify-content:flex-start;gap:6px;margin-bottom:auto">
            ${[['02', 'J'], ['14', 'H'], ['36', 'MIN']].map(([v, l]) => `<div><b style="font-size:16px">${v}</b><small>${l}</small></div>`).join('<span class="sep" style="font-size:14px">:</span>')}</div>
          <div class="btn w sm">${ic('bell')} M'alerter</div>
        </div>
      </div>
      <div class="sec"><h4>Produit du moment</h4><a>Shop</a></div>
      <div style="margin:0 16px;position:relative">
        ${prod('jacket', 'height:146px', { bg: '#e9e8e4' })}
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:6px"><div><div class="serif i" style="font-size:17px;line-height:1">Le perfecto Liam</div><div class="tiny muted" style="margin-top:2px">Cuir d'agneau plongé · 695 €</div></div><span class="tag k">Voir</span></div>
        ${ic('heart', '', 1.4).replace('<svg', '<svg style="position:absolute;top:10px;right:10px;width:15px"')}
      </div>
      <div class="sec"><h4>Zadig loves…</h4><a>La sélection</a></div>
      <div class="hscroll">
        ${pcard({ k: 'bag', n: 'Sac Rocky Studs', p: '690 €' })}${pcard({ k: 'boots', n: 'Boots Cara', p: '395 €' })}${pcard({ k: 'sweater', n: 'Pull cachemire', p: '345 €' })}
      </div>
    </div>
    ${fab()}${tabbar('home')}${homebar()}`);

  S['home-feed-2'] = () => screen(`
    ${sb()}${hdr({ l: ic('menu'), c: LOGO_SM, r: ic('bell') + ic('search') })}
    <div class="body">
      <div class="sec" style="margin-top:4px"><h4>Looks du moment</h4><a>Lookbook</a></div>
      <div class="hscroll">
        ${[['studio', {}, '03'], ['studio', { dark: true, hair: 'short' }, '07'], ['studio', { hair: 'bob', pose: 'hip' }, '11']].map(([s, o, n]) =>
          `<div style="flex:none;width:96px">${img(s, o, 'height:128px')}<div class="tiny" style="margin-top:4px;font-weight:600;letter-spacing:1px">LOOK ${n}</div><div class="tiny muted">Shop the look →</div></div>`).join('')}
      </div>
      <div class="sec"><h4>Le Journal</h4><a>N°12</a></div>
      <div style="margin:0 16px;display:flex;gap:10px">
        ${img('stage', {}, 'width:118px;height:118px;flex:none')}
        <div><span class="kicker g">Musique · Interview</span><div class="serif" style="font-size:16px;line-height:1.05;margin:5px 0">« Le rock, c'est une attitude, pas un costume. »</div><div class="tiny muted">Noa Lenz · 6 min de lecture</div><div class="tiny" style="margin-top:6px;font-weight:600">${ic('music').replace('<svg', '<svg style="width:9px;vertical-align:-1px"')} + sa playlist</div></div>
      </div>
      <div class="sec"><h4>Événements</h4><a>Agenda</a></div>
      <div style="margin:0 16px;display:flex;gap:10px;align-items:center;border:1px solid var(--paper-3);padding:7px">
        ${img('party', {}, 'width:54px;height:54px;flex:none')}
        <div style="flex:1"><span class="tag k">Sur invitation</span><div style="font-weight:600;font-size:9.5px;margin:4px 0 1px">Nuit électrique — concert privé</div><div class="tiny muted">Sam. 10.10 · Paris · 120 places</div></div>
        <span class="btn sm">RSVP</span>
      </div>
      <div style="margin:10px 16px 0;background:#000;color:#fff;padding:11px 12px;display:flex;gap:10px;align-items:center">
        ${ic('lock').replace('<svg', '<svg style="width:18px;flex:none"')}
        <div style="flex:1"><div class="kicker" style="opacity:.6">Exclusif app · Membres Rock</div><div style="font-size:9.5px;font-weight:600;margin-top:3px">Accès anticipé au sac Rocky Studs</div></div>${ic('chev').replace('<svg', '<svg style="width:12px"')}
      </div>
      <div class="sec"><h4>Pour vous</h4><a>Parce que vous aimez le cuir</a></div>
      <div class="hscroll">${pcard({ k: 'belt', n: 'Ceinture cloutée', p: '125 €' })}${pcard({ k: 'blazer', n: 'Blazer Vesper', p: '495 €' })}${pcard({ k: 'sunglasses', n: 'Solaires Nuit', p: '220 €' })}</div>
    </div>
    ${fab()}${tabbar('home')}${homebar()}`);

  S['search'] = () => screen(`
    ${sb()}
    <div style="display:flex;gap:8px;align-items:center;padding:4px 16px 10px">
      <div style="flex:1;height:34px;background:var(--paper-2);display:flex;align-items:center;gap:8px;padding:0 10px;font-size:10px">${ic('search').replace('<svg', '<svg style="width:13px"')}<span>cuir</span><span style="width:1px;height:13px;background:#000"></span><span style="margin-left:auto">${ic('cam').replace('<svg', '<svg style="width:14px"')}</span></div>
      <span class="tiny" style="text-decoration:underline">Annuler</span>
    </div>
    <div class="chips" style="padding:0 16px 10px"><span class="chip on">Tout</span><span class="chip">Produits 48</span><span class="chip">Looks 12</span><span class="chip">Stories 6</span><span class="chip">Événements 1</span></div>
    <div class="body">
      <div class="pad"><div class="kicker g" style="margin-bottom:6px">Suggestions</div>
        ${['perfecto <b>cuir</b> noir', 'sac <b>cuir</b> clouté', 'entretien du <b>cuir</b> — story'].map((t) => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--paper-3);font-size:9.5px"><span>${t}</span>${ic('chev').replace('<svg', '<svg style="width:10px;color:#999"')}</div>`).join('')}
      </div>
      <div class="sec"><h4>Produits</h4><a>48 résultats</a></div>
      <div class="hscroll">${pcard({ k: 'jacket', n: 'Perfecto Liam', p: '695 €', b: '<span class="tag k">Nouveau</span>' })}${pcard({ k: 'bag', n: 'Sac Rocky Studs', p: '690 €' })}${pcard({ k: 'boots', n: 'Boots Cara', p: '395 €' })}</div>
      <div class="sec"><h4>Looks &amp; Stories</h4><a>Tout voir</a></div>
      <div style="display:flex;gap:8px;padding:0 16px">
        ${img('studio', { dark: true }, 'width:92px;height:112px;flex:none')}
        <div style="flex:1">${img('leather', {}, 'height:60px')}<div class="kicker g" style="margin-top:6px">Savoir-faire</div><div class="serif" style="font-size:13px;line-height:1.05;margin-top:2px">Le cuir, une matière qui se raconte</div></div>
      </div>
      <div style="margin:14px 16px 0;border:1px solid #000;padding:9px 10px;display:flex;gap:9px;align-items:center">
        <span class="zavatar">Z</span><div style="font-size:8.6px;line-height:1.35">Pas sûr·e ? <b>Demandez au Concierge</b><br><span class="muted">« Un cuir pour un concert samedi ? »</span></div>
      </div>
    </div>
    ${tabbar('home')}${homebar()}`);

  // ===== 02 SHOP =================================================
  S['shop'] = () => screen(`
    ${sb()}${hdr({ l: ic('menu'), c: title('Shop'), r: ic('heart') + ic('bag') })}
    <div style="display:flex;gap:18px;padding:2px 16px 0;border-bottom:1px solid var(--paper-3)">
      <span class="disp" style="font-size:20px;border-bottom:2px solid #000;padding-bottom:6px">Femme</span><span class="disp" style="font-size:20px;color:#b5b4b0">Homme</span><span class="disp" style="font-size:20px;color:#b5b4b0">Enfant</span>
    </div>
    <div class="body">
      <div style="margin:10px 16px;height:30px;background:var(--paper-2);display:flex;align-items:center;gap:8px;padding:0 10px;font-size:8.6px;color:#777">${ic('search').replace('<svg', '<svg style="width:12px"')}Rechercher une pièce, une matière…</div>
      <div style="margin:0 16px;position:relative;height:122px">${img('street', {}, 'position:absolute;inset:0')}
        <div class="ovl" style="top:40px"></div><div style="position:absolute;left:12px;bottom:10px;color:#fff"><div class="kicker">64 nouvelles pièces</div><div class="disp" style="font-size:24px">Nouveautés</div></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 16px">
        <div><div style="position:relative;height:78px">${prod('jacket', 'position:absolute;inset:0')}</div><div class="disp" style="font-size:11px;margin-top:4px">Best-sellers</div></div>
        <div><div style="position:relative;height:78px;background:#000">${prod('bag', 'position:absolute;inset:0', { bg: '#2a2a29', color: '#050505' })}<span class="tag r" style="position:absolute;top:6px;left:6px">250 ex.</span></div><div class="disp" style="font-size:11px;margin-top:4px">Éditions limitées</div></div>
      </div>
      <div style="margin:0 16px 4px;background:#000;color:#fff;display:flex;align-items:center;gap:10px;padding:8px 10px">
        <span class="kicker" style="opacity:.6">Sélection</span><span class="serif i" style="font-size:13px;flex:1">Le vestiaire rock</span>${ic('chev').replace('<svg', '<svg style="width:11px"')}
      </div>
      ${[['Vestes & Cuirs', 'jacket'], ['Maille & Cachemire', 'sweater'], ['Sacs', 'bag'], ['Chaussures', 'boots'], ['Accessoires', 'belt'], ['Collections', 'blazer']].map(([n, k]) => `
        <div class="row-i" style="padding:5px 16px"><div class="l">${prod(k, 'width:30px;height:30px')}<span style="font-size:9.5px">${n}</span></div>${ic('chev', '', 1.4)}</div>`).join('')}
    </div>
    ${fab()}${tabbar('shop')}${homebar()}`);

  S['catalogue'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Vestes &amp; Cuirs'), r: ic('search') + ic('bag') })}
    <div style="text-align:center;font-size:7.5px;color:#888;margin:-6px 0 8px">48 pièces</div>
    <div style="display:flex;gap:6px;padding:0 16px 10px;border-bottom:1px solid var(--paper-3);align-items:center">
      <span class="chip on" style="display:flex;gap:4px;align-items:center">${ic('filter').replace('<svg', '<svg style="width:10px"')}Filtrer · 3</span>
      <span class="chip">38 ×</span><span class="chip">Noir ×</span><span class="chip">Cuir ×</span><span style="margin-left:auto">${ic('grid').replace('<svg', '<svg style="width:12px"')}</span>
    </div>
    <div class="body" style="padding-top:10px">
      <div class="grid2">
        ${pcard({ k: 'jacket', n: 'Perfecto Liam', p: '695 €', w: 'auto', h: 158, b: '<span class="tag k">Nouveau</span>', extra: '<div class="tiny muted">2 coloris</div>' })}
        ${pcard({ k: 'blazer', n: 'Blazer Vesper cuir', p: '795 €', w: 'auto', h: 158, extra: '<div class="tiny muted">En stock au Marais</div>' })}
      </div>
      <div style="margin:12px 16px;position:relative;height:84px">${img('leather', {}, 'position:absolute;inset:0')}
        <div style="position:absolute;inset:0;padding:10px 12px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(90deg,rgba(0,0,0,.75),rgba(0,0,0,.1))"><span class="kicker" style="opacity:.7">Story · 3 min</span><div class="serif i" style="font-size:15px">Le perfecto, histoire d'une icône →</div></div></div>
      <div class="grid2">
        ${pcard({ k: 'jacket', n: 'Perfecto clouté', p: '890 €', w: 'auto', h: 158, o: { color: '#222' }, b: '<span class="tag r">Édition limitée</span>' })}
        ${pcard({ k: 'dress', n: 'Robe nuit satin', p: '325 €', w: 'auto', h: 158 })}
      </div>
    </div>
    ${fab()}${tabbar('shop')}${homebar()}`);

  S['pdp'] = () => screen(`
    <div class="abs-top">${sb()}${hdr({ l: ic('back'), r: ic('share') + ic('bag') })}</div>
    <div class="body">
      <div style="position:relative;height:318px">${prod('jacket', 'position:absolute;inset:0', { bg: '#ebeae6' })}
        <div style="position:absolute;left:10px;top:96px;display:flex;flex-direction:column;gap:5px">
          ${[prod('jacket', 'width:30px;height:38px;outline:1px solid #000'), img('studio', { dark: true }, 'width:30px;height:38px'), img('leather', {}, 'width:30px;height:38px'), prod('jacket', 'width:30px;height:38px', { color: '#3a3a3a' })].join('')}
        </div>
        <div class="dots" style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%)"><i class="on"></i><i></i><i></i><i></i><i></i></div>
        <span style="position:absolute;right:12px;bottom:8px" class="tiny">${ic('eye').replace('<svg', '<svg style="width:11px;vertical-align:-2px"')} 3D · Porté</span>
      </div>
      <div class="pad" style="padding-top:12px">
        <div style="display:flex;justify-content:space-between"><span class="kicker g">Nouveauté · Cuir d'agneau</span><span class="kicker">695 €</span></div>
        <div class="disp" style="font-size:20px;margin:5px 0 8px">Perfecto Liam</div>
        <div style="display:flex;gap:6px;align-items:center;margin-bottom:10px"><span style="width:14px;height:14px;border-radius:50%;background:#000;box-shadow:0 0 0 2px #fff,0 0 0 3px #000"></span><span style="width:14px;height:14px;border-radius:50%;background:#5a1a1f;margin-left:4px"></span><span class="tiny muted" style="margin-left:6px">Noir</span></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;margin-bottom:5px"><span>Taille · <b>votre taille : 38</b> ${ic('check').replace('<svg', '<svg style="width:9px;vertical-align:-1px"')}</span><span style="text-decoration:underline">Guide des tailles</span></div>
        <div class="sizes"><span>34</span><span>36</span><span class="on">38</span><span>40</span><span class="x">42</span></div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:8px;background:var(--paper-2);padding:7px 9px">${ic('pin').replace('<svg', '<svg style="width:12px;flex:none"')}<span><b>En stock au Marais</b> · 3 pièces · retrait en 2h</span></div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:7px;letter-spacing:1px;text-transform:uppercase;color:#555">${[['truck', 'Livraison demain'], ['box', 'Retour 30 j'], ['scissors', 'Réparation à vie'], ['sparkle', 'Conseil taille']].map(([i, t]) => `<div style="text-align:center;flex:1">${ic(i).replace('<svg', '<svg style="width:14px;display:block;margin:0 auto 3px;color:#000"')}${t}</div>`).join('')}</div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:12px"><span class="disp" style="font-size:11px;letter-spacing:1px">Complétez le look</span><span class="tiny" style="text-decoration:underline">Look 03</span></div>
        <div style="display:flex;gap:6px;margin-top:6px">${['tee', 'jeans', 'boots', 'belt'].map((k) => prod(k, 'width:62px;height:44px')).join('')}</div>
      </div>
    </div>
    <div style="display:flex;gap:8px;padding:10px 16px 28px;border-top:1px solid var(--paper-3)">
      <div style="width:36px;height:36px;border:1px solid #000;display:grid;place-items:center">${ic('heart').replace('<svg', '<svg style="width:15px"')}</div>
      <div class="btn" style="flex:1">Ajouter au panier · 695 €</div>
    </div>${homebar()}`);

  S['pdp-story'] = () => screen(`
    ${sb()}
    <div style="display:flex;align-items:center;gap:10px;padding:0 16px 8px;border-bottom:1px solid var(--paper-3)">
      ${ic('back').replace('<svg', '<svg style="width:15px"')}${prod('jacket', 'width:26px;height:26px')}<div style="flex:1"><div style="font-weight:600;font-size:9px">Perfecto Liam</div><div class="tiny muted">695 € · 38</div></div><span class="btn sm">Ajouter</span>
    </div>
    <div class="body">
      <div class="pad" style="padding-top:14px">
        <span class="kicker r">L'histoire de la pièce</span>
        <div class="serif i" style="font-size:21px;line-height:1.05;margin:7px 0 10px">« Une pièce qui se patine avec vous, concert après concert. »</div>
      </div>
      <div style="margin:0 16px;position:relative;height:130px">${img('leather', {}, 'position:absolute;inset:0')}<span class="tag" style="position:absolute;left:8px;bottom:8px">Détail · zip argent vieilli</span></div>
      <p class="pad" style="font-size:8.6px;line-height:1.5;color:#333;margin-top:9px">Cuir d'agneau plongé, doublure imprimée, coupe légèrement oversize. Dessiné à Paris par le studio, pensé pour être porté longtemps.</p>
      <div style="margin-top:8px">
        ${[['Coupe', 'Oversize — prenez votre taille'], ['Composition & entretien', '100 % cuir d\'agneau'], ['Réparation à vie', 'Service cuir en boutique']].map(([a, b]) => `<div class="row-i" style="padding:7px 16px"><div><div style="font-weight:600;font-size:8.6px">${a}</div><div class="tiny muted">${b}</div></div>${ic('plus', '', 1.4)}</div>`).join('')}
      </div>
      <div class="sec"><h4>Porté dans le look 03</h4><a>Shop the look</a></div>
      <div style="display:flex;gap:6px;padding:0 16px">${img('studio', {}, 'width:66px;height:92px;flex:none')}
        ${pcard({ k: 'tee', n: 'Tee Rock', p: '95 €', w: 62, h: 70 })}${pcard({ k: 'jeans', n: 'Jean slim', p: '175 €', w: 62, h: 70 })}${pcard({ k: 'boots', n: 'Boots Cara', p: '395 €', w: 62, h: 70 })}</div>
    </div>
    <div style="padding:8px 16px 26px;border-top:1px solid var(--paper-3)"><div class="btn">Ajouter au panier · 695 €</div></div>${homebar()}`);

  // ===== 03 STORIES ==============================================
  S['journal'] = () => screen(`
    ${sb()}
    <div style="padding:0 16px;display:flex;justify-content:space-between;align-items:flex-end">
      <div class="disp" style="font-size:38px;letter-spacing:-.5px">Le Journal</div>
      <div style="text-align:right" class="tiny"><b>N°12</b><br><span class="muted">Octobre 2026</span></div>
    </div>
    <div class="chips" style="padding:10px 16px;border-bottom:1px solid var(--paper-3)"><span class="chip on">À la une</span><span class="chip">Mode</span><span class="chip">Musique</span><span class="chip">Art</span><span class="chip">Paris</span><span class="chip">Backstage</span></div>
    <div class="body">
      <div style="position:relative;height:232px">${img('stage', { pos: 'xMidYMin' }, 'position:absolute;inset:0')}
        <div class="ovl" style="top:80px"></div>
        <div style="position:absolute;left:16px;right:70px;bottom:14px;color:#fff"><span class="tag">Interview</span>
          <div class="disp" style="font-size:25px;margin:7px 0 4px">Le rock, c'est une attitude</div><div class="serif i" style="font-size:12px;opacity:.85">Rencontre avec Noa Lenz, guitariste</div></div>
        <div style="position:absolute;right:16px;bottom:16px;color:#fff;font-family:var(--display);font-size:34px;opacity:.9">01</div>
      </div>
      <div style="display:grid;grid-template-columns:1.1fr 1fr;gap:8px;padding:12px 16px 0">
        <div style="position:relative;height:178px">${img('backstage', {}, 'position:absolute;inset:0')}
          <div style="position:absolute;inset:auto 0 0 0;padding:8px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.8))"><span class="kicker">${ic('play').replace('<svg', '<svg style="width:8px;vertical-align:-1px"')} Vidéo · 0:45</span><div style="font-weight:600;font-size:9.5px;margin-top:3px">Backstage du shooting AH26</div></div></div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div>${img('gallery', {}, 'height:78px')}<div class="kicker g" style="margin-top:5px">Art · Portrait</div><div style="font-size:9px;font-weight:600">L'atelier d'Inès Mora</div></div>
          <div style="border-top:1px solid #000;padding-top:6px"><div class="kicker g">Paris</div><div class="serif" style="font-size:14px;line-height:1.02;margin-top:3px">10 adresses pour finir la nuit</div></div>
        </div>
      </div>
    </div>
    ${fab()}${tabbar('stories')}${homebar()}`);

  S['article'] = () => screen(`
    <div class="abs-top on-photo">${sb()}${hdr({ l: ic('back'), r: ic('bookmark') + ic('share') })}</div>
    <div class="body">
      <div style="position:relative;height:218px">${img('stage', { dx: 20, pos: 'xMidYMin' }, 'position:absolute;inset:0')}<div class="ovl-t"></div></div>
      <div class="progress" style="height:2px"><i style="width:34%;background:var(--red)"></i></div>
      <div class="pad" style="padding-top:12px">
        <span class="kicker g">Musique — Interview · 6 min</span>
        <div class="serif" style="font-size:21px;line-height:1.02;margin:6px 0 6px">« Le rock, c'est une attitude, pas un costume. »</div>
        <div class="tiny muted" style="margin-bottom:9px">Par la rédaction · Photos Studio Z</div>
        <p style="font-size:8.5px;line-height:1.55;color:#222"><span class="disp" style="float:left;font-size:32px;line-height:.9;margin:2px 6px 0 0">A</span>vant de monter sur scène, Noa Lenz ferme les yeux et enfile sa veste. « C'est mon armure. Le cuir garde la mémoire de chaque concert. » Rencontre dans les loges.</p>
        <div style="border-left:2px solid #000;padding-left:10px;margin:10px 0" class="serif i"><span style="font-size:14px;line-height:1.1">« Paris la nuit m'a appris à m'habiller pour moi. »</span></div>
      </div>
      <div style="background:var(--paper-2);margin:0 16px;padding:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span class="kicker">Ce qu'elle porte</span><span class="tiny" style="text-decoration:underline">Shop</span></div>
        <div style="display:flex;gap:8px">
          ${[['jacket', 'Perfecto Liam', '695 €'], ['boots', 'Boots Cara', '395 €']].map(([k, n, p]) => `<div style="display:flex;gap:6px;flex:1;background:#fff;padding:5px;align-items:center">${prod(k, 'width:34px;height:40px')}<div style="flex:1"><div style="font-size:7.8px">${n}</div><div style="font-size:7.8px;font-weight:600">${p}</div></div>${ic('plus').replace('<svg', '<svg style="width:11px"')}</div>`).join('')}
        </div>
      </div>
      <div style="margin:10px 16px 0;display:flex;align-items:center;gap:10px;background:#000;color:#fff;padding:7px 9px">
        ${img('vinyl', {}, 'width:34px;height:34px;flex:none')}<div style="flex:1"><div class="kicker" style="opacity:.6">Playlist</div><div style="font-size:9px;font-weight:600">NUIT — la playlist de Noa</div></div><span style="width:24px;height:24px;border-radius:50%;background:#fff;color:#000;display:grid;place-items:center">${ic('play').replace('<svg', '<svg style="width:10px"')}</span>
      </div>
    </div>${homebar()}`);

  S['video'] = () => screen(`
    <div style="position:absolute;inset:0">${img('backstage', {}, 'position:absolute;inset:0')}<div class="ovl" style="top:300px"></div><div class="ovl-t"></div></div>
    <div class="abs-top on-photo">${sb()}
      <div style="display:flex;gap:3px;padding:0 14px">${[1, 1, 0.45, 0].map((v) => `<div style="flex:1;height:2px;background:rgba(255,255,255,.35)"><div style="height:100%;width:${v * 100}%;background:#fff"></div></div>`).join('')}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px"><div style="display:flex;gap:8px;align-items:center"><span class="zavatar" style="background:#fff;color:#000">Z</span><div><div style="font-size:9px;font-weight:600">Backstage</div><div class="tiny" style="opacity:.7">Shooting AH26 · il y a 2 h</div></div></div>${ic('close').replace('<svg', '<svg style="width:16px"')}</div>
    </div>
    <div style="position:absolute;right:12px;bottom:186px;display:flex;flex-direction:column;gap:16px;color:#fff;align-items:center;z-index:5;font-size:7px">
      ${[['heartF', '2,4k'], ['share', 'Partager'], ['bookmark', 'Garder'], ['sound', '']].map(([i, l]) => `<div style="text-align:center">${ic(i).replace('<svg', '<svg style="width:20px;display:block;margin:0 auto 3px"')}${l}</div>`).join('')}
    </div>
    <div style="position:absolute;left:14px;right:60px;bottom:88px;color:#fff;z-index:5">
      <span class="kicker" style="opacity:.75">Vidéo verticale · 0:45</span>
      <div class="disp" style="font-size:22px;margin:6px 0 10px">48 h avec l'équipe du studio</div>
      <div style="display:flex;gap:8px;align-items:center;background:#fff;color:#000;padding:5px;border-radius:2px">
        ${prod('jacket', 'width:34px;height:34px')}<div style="flex:1"><div class="tiny muted">Vu dans la vidéo</div><div style="font-size:8.6px;font-weight:600">Perfecto Liam · 695 €</div></div><span class="btn sm" style="height:24px">Voir</span></div>
    </div>
    <div style="position:absolute;left:0;right:0;bottom:62px;text-align:center;color:#fff;font-size:7px;letter-spacing:1.4px;z-index:5;opacity:.8">▲ LE FILM COMPLET</div>
    <div style="position:absolute;left:0;right:0;bottom:0;z-index:6">${tabbar('stories', 'dk')}</div>${homebar('w')}`, { dark: true });

  S['playlist'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Playlist'), r: ic('share') })}
    <div class="body">
      ${img('vinyl', {}, 'height:196px;margin:0 16px')}
      <div class="pad" style="padding-top:10px">
        <span class="kicker g">Culture · Interview → Playlist</span>
        <div class="disp" style="font-size:20px;margin:4px 0 8px">NUIT — la playlist de Noa Lenz</div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
          <span style="width:34px;height:34px;border-radius:50%;background:#000;color:#fff;display:grid;place-items:center">${ic('play').replace('<svg', '<svg style="width:14px"')}</span>${ic('shuffle').replace('<svg', '<svg style="width:15px"')}${ic('heart').replace('<svg', '<svg style="width:15px"')}<span class="tiny muted" style="margin-left:auto">12 titres · 48 min</span></div>
        ${[['01', 'Velvet Static', 'The Lowlights', '3:42', 1], ['02', 'Rive Droite', 'Mona & les Ombres', '4:05'], ['03', 'Minuit Chrome', 'Saint-Ambre', '3:18']].map(([n, t, a, d, on]) => `
          <div style="display:flex;gap:10px;align-items:center;padding:6px 0;border-bottom:1px solid var(--paper-3)"><span class="tiny ${on ? '' : 'muted'}" style="width:12px">${on ? ic('music').replace('<svg', '<svg style="width:9px;color:var(--red)"') : n}</span><div style="flex:1"><div style="font-size:9px;font-weight:${on ? 700 : 500}">${t}</div><div class="tiny muted">${a}</div></div><span class="tiny muted">${d}</span></div>`).join('')}
      </div>
      <div style="margin:12px 16px 0;background:#000;color:#fff;position:relative;height:96px">
        ${img('street', {}, 'position:absolute;right:0;top:0;bottom:0;width:110px')}
        <div style="position:absolute;left:12px;top:12px;right:120px"><span class="kicker" style="opacity:.6">L'univers de la playlist</span><div class="disp" style="font-size:15px;margin:5px 0 8px">Collection<br>Paris After Dark</div><span class="tiny" style="text-decoration:underline">Entrer dans la collection →</span></div>
      </div>
    </div>
    ${fab()}${tabbar('stories')}${homebar()}`);

  // ===== 04 DROPS ================================================
  S['drops'] = () => screen(`
    ${sb()}${hdr({ l: ic('menu'), c: '<span class="logo sm">ZADIG DROPS</span>', r: ic('bell') })}
    <div style="display:flex;gap:18px;padding:2px 16px 8px;border-bottom:1px solid #222">
      <span class="disp" style="font-size:15px;border-bottom:2px solid #fff;padding-bottom:5px">À venir</span><span class="disp" style="font-size:15px;color:#555">En cours</span><span class="disp" style="font-size:15px;color:#555">Archives</span>
    </div>
    <div style="display:flex;align-items:center;gap:5px;padding:9px 16px;font-size:6.6px;letter-spacing:1.3px;font-weight:600;color:#777">
      ${['Tease', 'Reveal', 'Countdown', 'Drop', 'Post-drop'].map((t, i) => `<span style="${i === 1 ? 'color:#fff' : ''}">${t.toUpperCase()}</span>`).join('<span style="color:var(--red)">→</span>')}
    </div>
    <div class="body">
      <div style="margin:0 16px;position:relative;height:196px">${img('red', { blur: 1.5 }, 'position:absolute;inset:0')}<div class="ovl" style="top:70px"></div>
        <div style="position:absolute;top:10px;left:10px;display:flex;gap:5px"><span class="tag r">Dans 02 j 14 h</span><span class="tag o" style="color:#fff">Membres d'abord</span></div>
        <div style="position:absolute;left:12px;right:12px;bottom:12px"><div class="disp" style="font-size:24px">Capsule Rock Vinyl</div><div class="tiny" style="opacity:.8;margin:3px 0 9px">Sam. 03.10 · 18:00 · 250 pièces numérotées</div>
          <div style="display:flex;gap:8px;align-items:center"><div class="btn w sm" style="flex:1">${ic('bell')} M'alerter</div><span class="tiny" style="opacity:.8">12 480 inscrits</span></div></div>
      </div>
      ${[['10', 'OCT', 'Sac Rocky Studs — Édition noire', 'Reveal 2/3', 'bag', 1], ['17', 'OCT', 'Collab artiste — ???', 'Tease', 'smoke', 0], ['24', 'OCT', 'Cachemire numéroté', 'Coming soon', 'sweater', 0], ['31', 'OCT', 'Réédition — perfecto 1997', 'Coming soon', 'jacket', 0]].map(([d, m, n, st, k, on]) => `
        <div style="display:flex;gap:10px;align-items:center;padding:9px 16px;border-bottom:1px solid #1e1e1e">
          <div style="width:30px;text-align:center"><div class="disp" style="font-size:18px">${d}</div><div class="tiny" style="color:#777;letter-spacing:1px">${m}</div></div>
          ${k === 'smoke' ? img('smoke', {}, 'width:42px;height:42px;flex:none') : prod(k, `width:42px;height:42px;flex:none;filter:blur(${on ? 1 : 3}px)`, { bg: '#1c1c1b', color: '#000' })}
          <div style="flex:1"><div style="font-size:9px;font-weight:600">${n}</div><span class="kicker" style="color:${on ? 'var(--red)' : '#888'}">${st}</span></div>
          <span style="width:26px;height:26px;border:1px solid ${on ? '#fff' : '#444'};border-radius:50%;display:grid;place-items:center;${on ? 'background:#fff;color:#000' : ''}">${ic('bell').replace('<svg', '<svg style="width:12px"')}</span>
        </div>`).join('')}
      <div style="margin:10px 16px 0;border:1px solid var(--red);padding:8px 10px;display:flex;gap:9px;align-items:center;font-size:8.4px">${ic('lock').replace('<svg', '<svg style="width:14px;color:var(--red)"')}<span><b>Membres Rock</b> · accès 30 min avant tout le monde</span></div>
    </div>
    ${tabbar('drops')}${homebar()}`, { dark: true });

  S['tease'] = () => screen(`
    <div style="position:absolute;inset:0">${img('red', { blur: 5 }, 'position:absolute;inset:0')}</div>
    <div class="abs-top on-photo">${sb()}${hdr({ l: ic('back'), c: '<span class="logo sm">DROP #07</span>', r: ic('share') })}
      <div style="display:flex;gap:4px;padding:0 16px"><div style="flex:1;height:2px;background:#fff"></div><div style="flex:1;height:2px;background:#fff"></div><div style="flex:1;height:2px;background:rgba(255,255,255,.3)"></div></div>
      <div class="tiny" style="text-align:center;margin-top:6px;letter-spacing:1.6px;opacity:.8">REVEAL 2 / 3</div>
    </div>
    <div style="position:absolute;left:18px;right:18px;bottom:40px;color:#fff;z-index:5">
      <span class="kicker" style="opacity:.75">Teaser · Reveal progressif</span>
      <div class="disp" style="font-size:40px;margin:8px 0">Quelque chose arrive.</div>
      <div class="serif i" style="font-size:15px;margin-bottom:14px;opacity:.95">Indice n°2 : des clous argent vieilli.</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:14px">
        ${[['Indice 1', 'Silhouette', 1], ['Indice 2', 'Matière', 1], ['Indice 3', 'Le 06.10', 0]].map(([a, b, on]) => `<div style="border:1px solid ${on ? '#fff' : 'rgba(255,255,255,.35)'};padding:6px;${on ? '' : 'opacity:.6'}"><div class="tiny" style="letter-spacing:1px">${a.toUpperCase()}</div><div style="font-size:8.6px;font-weight:600;margin-top:2px">${on ? '✓ ' : ic('lock').replace('<svg', '<svg style="width:8px;vertical-align:-1px"') + ' '}${b}</div></div>`).join('')}
      </div>
      <div class="btn w">${ic('bell')} M'alerter du lancement</div>
      <div class="tiny" style="text-align:center;margin-top:8px;opacity:.8">12 480 personnes attendent · Partager le teaser</div>
    </div>${homebar('w')}`, { dark: true });

  S['countdown'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: '<span class="logo sm">ZADIG DROPS</span>', r: ic('share') })}
    <div class="body" style="text-align:center">
      <div class="kicker" style="color:#888;margin-top:12px">Launch in</div>
      <div class="cd" style="margin:6px 0 2px;gap:6px">
        ${[['02', 'Heures'], ['14', 'Min'], ['36', 'Sec']].map(([v, l]) => `<div><b style="font-size:54px">${v}</b><small>${l.toUpperCase()}</small></div>`).join('<span class="sep" style="font-size:44px;line-height:1">:</span>')}
      </div>
      <div style="position:relative;height:196px;margin:12px 16px 0">${prod('bag', 'position:absolute;inset:0', { bg: '#1b1b1a', color: '#060606' })}<span class="tag r" style="position:absolute;top:8px;left:8px">Révélé</span></div>
      <div class="disp" style="font-size:17px;margin-top:12px">Sac Rocky Studs — Édition noire</div>
      <div class="tiny" style="color:#999;margin-top:3px">250 pièces numérotées · 890 € · Exclusivité app</div>
      <div style="margin:12px 16px 0;border:1px solid #333;padding:9px 10px;text-align:left;display:flex;gap:10px;align-items:center">
        <span style="width:24px;height:24px;border-radius:50%;background:#fff;color:#000;display:grid;place-items:center">${ic('check').replace('<svg', '<svg style="width:12px"')}</span>
        <div style="flex:1"><div style="font-size:8.8px;font-weight:600">Accès anticipé confirmé</div><div class="tiny" style="color:#999">Membres Rock · ouverture dans 14 min</div></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 16px 0;font-size:8.4px;text-align:left"><span>Me prévenir 10 min avant</span><span class="toggle" style="background:#fff"></span></div>
      <div class="btn o" style="margin:12px 16px 0;color:#fff">${ic('cal')} Ajouter au calendrier</div>
    </div>
    ${tabbar('drops')}${homebar()}`, { dark: true });

  S['drop-live'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: `<span style="display:flex;gap:6px;align-items:center"><span style="width:6px;height:6px;border-radius:50%;background:var(--red);box-shadow:0 0 0 3px rgba(200,16,46,.2)"></span><span class="htitle">Live now</span></span>`, r: ic('share') })}
    <div class="body">
      ${prod('bag', 'height:176px;margin:0 16px', { bg: '#ebeae6' })}
      <div class="pad" style="padding-top:10px">
        <div style="display:flex;justify-content:space-between"><span class="kicker r">Drop #06 · Édition limitée</span><span class="kicker">890 €</span></div>
        <div class="disp" style="font-size:18px;margin:4px 0 8px">Sac Rocky Studs</div>
        <div style="display:flex;justify-content:space-between;font-size:7.6px;margin-bottom:4px"><span><b>187</b> / 250 restantes</span><span class="muted">Pièce n°063 réservée 9:59</span></div>
        <div class="progress"><i style="width:75%"></i></div>
        <div class="btn" style="margin-top:10px">Acheter maintenant · 890 €</div>
        <div class="tiny muted" style="text-align:center;margin-top:5px">Paiement express · 1 pièce par membre</div>
      </div>
      <div style="margin:14px 0 0;padding:12px 16px 0;border-top:6px solid var(--paper-2)">
        <div style="display:flex;justify-content:space-between;align-items:baseline"><span class="disp" style="font-size:12.5px">Après le drop</span><span class="kicker g">Post-drop content</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:8px">
          ${img('street', {}, 'height:66px')}${img('studio', { dark: true, hair: 'bob' }, 'height:66px')}${img('party', {}, 'height:66px')}
        </div>
        <div class="tiny muted" style="margin-top:5px">Portés par la communauté · #ZVDrop</div>
        <div style="display:flex;gap:9px;align-items:center;margin-top:9px;border-top:1px solid var(--paper-3);padding-top:8px"><div style="position:relative;width:40px;height:40px;flex:none">${img('leather', {}, 'position:absolute;inset:0')}<span style="position:absolute;inset:0;display:grid;place-items:center;color:#fff">${ic('play').replace('<svg', '<svg style="width:12px"')}</span></div><div><span class="kicker g">Vidéo · 1:12</span><div style="font-size:9px;font-weight:600;margin-top:2px">Le making-of du sac Rocky Studs</div></div></div>
      </div>
    </div>
    ${tabbar('drops')}${homebar()}`);

  // ===== 05 COLLECTIONS ==========================================
  S['collections'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Collections'), r: ic('search') })}
    <div class="body">
      <div style="position:relative;height:214px">${img('portrait', { lx: .3, flip: true, fx: 30 }, 'position:absolute;inset:0')}
        <div class="ovl" style="top:60px"></div>
        <div style="position:absolute;left:16px;right:16px;bottom:14px;color:#fff"><span class="kicker" style="opacity:.75">Automne-Hiver 26 · Nouvelle collection</span><div class="disp" style="font-size:30px;margin:5px 0">Paris After Dark</div><div class="tiny" style="opacity:.8">Film · Moodboard · 64 pièces · 18 looks</div></div>
      </div>
      ${[['stage', 'Capsule', 'Rock Vinyl', 'Drop le 03.10', {}], ['leather', 'Archives', 'Les Icônes 1997—2026', '32 pièces', {}], ['gallery', 'Collaboration', 'Atelier Inès Mora', 'Art · 12 pièces', {}]].map(([s, k, n, m, o]) => `
        <div style="display:flex;border-bottom:1px solid var(--paper-3);height:98px">
          ${img(s, o, 'width:128px;flex:none')}
          <div style="padding:12px 14px;display:flex;flex-direction:column;flex:1"><span class="kicker g">${k}</span><div class="disp" style="font-size:16px;margin:4px 0">${n}</div><span class="tiny muted">${m}</span><span class="tiny" style="margin-top:auto;text-decoration:underline">Entrer →</span></div>
        </div>`).join('')}
    </div>
    ${fab()}${tabbar('shop')}${homebar()}`);

  S['collection-film'] = () => screen(`
    <div style="position:absolute;inset:0 0 auto 0;height:430px">${img('rooftops', {}, 'position:absolute;inset:0')}<div class="ovl" style="top:180px"></div><div class="ovl-t"></div></div>
    <div class="abs-top on-photo">${sb()}${hdr({ l: ic('back'), c: '<span class="logo sm">AUTOMNE-HIVER 26</span>', r: ic('share') })}</div>
    <div style="position:absolute;top:150px;left:50%;transform:translateX(-50%);text-align:center;color:#fff;z-index:5">
      <span style="width:58px;height:58px;border-radius:50%;border:1.5px solid #fff;display:grid;place-items:center;margin:0 auto;backdrop-filter:blur(6px);background:rgba(255,255,255,.12)">${ic('play').replace('<svg', '<svg style="width:20px"')}</span>
      <div class="kicker" style="margin-top:8px">Le film · 1:32</div>
    </div>
    <div style="position:absolute;top:300px;left:16px;right:16px;color:#fff;z-index:5">
      <span class="kicker" style="opacity:.75">Collection · Chapitre 01</span>
      <div class="disp" style="font-size:36px;margin-top:5px">Paris After Dark</div>
    </div>
    <div style="position:absolute;top:430px;left:0;right:0;bottom:0;padding:12px 16px 0">
      <div class="chips" style="margin-bottom:12px"><span class="chip on">Film</span><span class="chip">Manifeste</span><span class="chip">Moodboard</span><span class="chip">Pièces clés</span><span class="chip">Looks</span></div>
      <div class="serif i" style="font-size:14px;line-height:1.25;color:#ddd">Minuit, rive droite. Le cuir capte la lumière des réverbères, le cachemire garde la chaleur du concert.</div>
      <div class="tiny" style="color:#888;margin:8px 0 12px">— Le studio de création</div>
      <div class="btn w">Explorer la collection</div>
    </div>${homebar()}`, { dark: true });

  S['moodboard'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('AH26 — Moodboard'), r: ic('bookmark') })}
    <div class="body">
      <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;grid-template-rows:84px 64px 70px;gap:4px;padding:0 16px">
        <div style="grid-row:span 2;position:relative">${img('stage', { pos: 'xMidYMin' }, 'position:absolute;inset:0')}</div>
        <div style="position:relative">${img('leather', {}, 'position:absolute;inset:0')}</div>
        <div style="background:#0b0b0b;color:#fff;display:grid;place-items:center" class="serif i"><span style="font-size:16px">Night</span></div>
        <div style="grid-column:span 2;position:relative">${img('smoke', {}, 'position:absolute;inset:0')}<span class="serif i" style="position:absolute;left:8px;bottom:5px;color:#fff;font-size:15px">Smoke &amp; silver</span></div>
        <div style="position:relative">${img('gallery', {}, 'position:absolute;inset:0')}</div>
        <div style="grid-column:span 2;position:relative">${img('rooftops', {}, 'position:absolute;inset:0')}</div>
      </div>
      <div style="display:flex;gap:12px;padding:10px 16px 0;align-items:center">
        ${[['#0b0b0b', 'Noir'], ['#9ea0a3', 'Argent'], ['#6a6865', 'Fumée'], ['#e8e2d6', 'Os'], ['#5a1a1f', 'Sang']].map(([c, n]) => `<div style="text-align:center"><span style="display:block;width:22px;height:22px;border-radius:50%;background:${c};border:1px solid #ddd;margin:0 auto 3px"></span><span class="tiny muted">${n}</span></div>`).join('')}
      </div>
      <div class="sec"><h4>Pièces clés</h4><a>64 pièces</a></div>
      <div class="hscroll">${[['jacket', 'Perfecto Liam', '695 €'], ['sweater', 'Pull cachemire', '345 €'], ['boots', 'Boots Cara', '395 €']].map(([k, n, p], i) => pcard({ k, n: `<b>0${i + 1}</b> ${n}`, p })).join('')}</div>
      <div style="margin:12px 16px 0;display:flex;gap:10px;align-items:center;border-top:1px solid #000;padding-top:9px">
        <div style="position:relative;width:52px;height:52px;flex:none">${img('backstage', {}, 'position:absolute;inset:0')}<span style="position:absolute;inset:0;display:grid;place-items:center;color:#fff">${ic('play').replace('<svg', '<svg style="width:14px"')}</span></div>
        <div><span class="kicker g">Backstage · Interview</span><div style="font-size:9px;font-weight:600;margin-top:3px">La directrice du studio raconte la collection</div></div>
      </div>
    </div>
    ${fab()}${tabbar('shop')}${homebar()}`);

  // ===== 06 LOOKS ================================================
  S['lookbook'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Lookbook'), r: ic('heart') })}
    <div class="chips" style="padding:0 16px 10px"><span class="chip on">Tous</span><span class="chip">Femme</span><span class="chip">Homme</span><span class="chip">Soirée</span><span class="chip">Concert</span></div>
    <div class="body">
      <div style="display:flex;gap:8px;padding:0 16px">
        ${[[
          ['studio', { hair: 'long', pos: 'xMidYMin' }, 'The Parisian Rock', 218, '01'],
          ['studio', { hair: 'bob', pose: 'hip', pos: 'xMidYMin' }, 'Silver Studs', 168, '03'],
        ], [
          ['studio', { dark: true, hair: 'short', pose: 'pocket', pos: 'xMidYMin' }, 'Rive Gauche Night', 168, '02'],
          ['portrait', { hair: 'hat', lx: .4 }, 'Backstage Pass', 218, '04'],
        ]].map((col) => `<div style="flex:1;display:flex;flex-direction:column;gap:10px">${col.map(([s, o, n, h, num]) => `
          <div>
            <div style="position:relative;height:${h}px">${img(s, o, 'position:absolute;inset:0')}<span style="position:absolute;top:7px;left:8px;font-family:var(--display);font-size:15px;color:${o.dark || s === 'portrait' ? '#fff' : '#000'}">${num}</span>
              <span style="position:absolute;right:6px;bottom:6px;background:#fff;padding:3px 5px" class="tiny">${ic('bag').replace('<svg', '<svg style="width:9px;vertical-align:-2px"')} 5</span></div>
            <div style="font-size:8.8px;font-weight:600;margin-top:5px">${n}</div><div class="tiny muted">5 pièces · dès 1 285 €</div>
          </div>`).join('')}</div>`).join('')}
      </div>
    </div>
    ${fab()}${tabbar('shop')}${homebar()}`);

  S['shop-look'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Shop the look'), r: ic('heart') })}
    <div class="body">
      <div style="position:relative;height:232px;margin:0 16px">${img('studio', { pos: 'xMidYMin', figs: [{ x: 92, y: 8, s: .58, hair: 'long', pose: 'hip' }] }, 'position:absolute;inset:0')}
        ${[[1, 150, 90], [2, 137, 70], [3, 128, 168], [4, 120, 208], [5, 150, 128]].map(([n, x, y]) => `<span class="hotspot" style="left:${x}px;top:${y}px">${n}</span>`).join('')}
        <span class="tag k" style="position:absolute;left:8px;top:8px">Look 01</span>
      </div>
      <div class="pad" style="padding-top:10px"><div class="disp" style="font-size:19px">The Parisian Rock Look</div><div class="tiny muted" style="margin:2px 0 6px">5 pièces · tailles pré-remplies depuis votre profil</div></div>
      ${[['jacket', 'Veste — Perfecto Liam', '38', '695 €'], ['tee', 'T-shirt — Tee Rock', 'S', '95 €'], ['jeans', 'Pantalon — Jean slim noir', '27', '175 €'], ['boots', 'Boots — Cara cuir', '38', '395 €'], ['belt', 'Accessoire — Ceinture cloutée', '85', '125 €']].map(([k, n, s, p], i) => `
        <div style="display:flex;gap:8px;align-items:center;padding:4px 16px;border-bottom:1px solid var(--paper-3)">
          <span style="width:12px;font-size:8px;font-weight:700">${i + 1}</span>${prod(k, 'width:30px;height:30px;flex:none')}<div style="flex:1;font-size:8.2px">${n}<div class="tiny muted">Taille ${s}</div></div><span style="font-size:8.2px;font-weight:600">${p}</span>
          <span style="width:13px;height:13px;background:#000;color:#fff;display:grid;place-items:center">${ic('check', '', 2.4).replace('<svg', '<svg style="width:9px"')}</span></div>`).join('')}
    </div>
    <div style="padding:9px 16px 26px;border-top:1px solid var(--paper-3)"><div class="btn">Ajouter le look complet · 1 485 €</div><div class="tiny" style="text-align:center;margin-top:6px;text-decoration:underline">Enregistrer le look dans ma wishlist</div></div>${homebar()}`);

  // ===== 07 EXPERIENCES ==========================================
  S['experiences'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Expériences'), r: ic('ticket') })}
    <div class="chips" style="padding:0 16px 10px"><span class="chip on">Pour vous</span><span class="chip">Paris</span><span class="chip">Monde</span><span class="chip">Sur invitation</span></div>
    <div class="body">
      <div style="position:relative;height:190px;margin:0 16px">${img('party', {}, 'position:absolute;inset:0')}<div class="ovl" style="top:60px"></div>
        <div style="position:absolute;left:12px;right:12px;bottom:12px;color:#fff"><div style="display:flex;gap:5px"><span class="tag">Soirée</span><span class="tag r">Sur invitation</span></div><div class="disp" style="font-size:24px;margin:7px 0 3px">Nuit électrique</div><div class="tiny" style="opacity:.85">Concert privé · Paris · Sam. 10.10</div></div></div>
      ${[['15', 'OCT', 'Pop-up store', 'Tokyo · Omotesando', 'facade', 'Ouvert à tous'], ['21', 'OCT', 'Vernissage — Atelier Inès Mora', 'Paris · Places limitées', 'gallery', 'Collab'], ['26', 'OCT', 'Private shopping', 'Marais · Membres Icon', 'backstage', 'Exclusif'], ['02', 'NOV', 'Masterclass soin du cuir', 'Lyon · Atelier', 'leather', 'Culture']].map(([d, m, n, l, s, t]) => `
        <div style="display:flex;gap:10px;align-items:center;padding:9px 16px;border-bottom:1px solid var(--paper-3)">
          <div style="width:28px;text-align:center"><div class="disp" style="font-size:17px">${d}</div><div class="tiny muted">${m}</div></div>
          ${img(s, {}, 'width:46px;height:46px;flex:none')}
          <div style="flex:1"><span class="kicker g">${t}</span><div style="font-size:9px;font-weight:600;margin:2px 0 1px">${n}</div><div class="tiny muted">${l}</div></div>${ic('chev', '', 1.4).replace('<svg', '<svg style="width:11px"')}
        </div>`).join('')}
    </div>
    ${fab()}${tabbar('home')}${homebar()}`);

  S['event'] = () => screen(`
    <div style="position:absolute;inset:0 0 auto 0;height:260px">${img('party', {}, 'position:absolute;inset:0')}<div class="ovl" style="top:120px;background:linear-gradient(transparent,#070707)"></div><div class="ovl-t"></div></div>
    <div class="abs-top on-photo">${sb()}${hdr({ l: ic('back'), r: ic('share') + ic('bookmark') })}</div>
    <div style="position:absolute;top:196px;left:16px;right:16px;bottom:0">
      <div style="display:flex;gap:5px"><span class="tag r">Sur invitation</span><span class="tag o" style="color:#fff">120 places</span></div>
      <div class="disp" style="font-size:30px;margin:8px 0 12px">Nuit électrique</div>
      ${[['cal', 'Samedi 10 octobre · 21:00'], ['pin', 'Lieu secret — révélé 24 h avant'], ['music', 'Live : Noa Lenz + DJ set'], ['sparkle', 'Dress code : all black']].map(([i, t]) => `<div style="display:flex;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid #1f1f1f;font-size:9px">${ic(i).replace('<svg', '<svg style="width:13px;color:#aaa"')}${t}</div>`).join('')}
      <div style="display:flex;align-items:center;gap:6px;margin:12px 0">
        ${['studio', 'portrait', 'street', 'party'].map((s, i) => `<div style="width:22px;height:22px;border-radius:50%;overflow:hidden;border:1.5px solid #070707;margin-left:${i ? -10 : 0}px;position:relative">${photo(s, { dark: true })}</div>`).join('')}
        <span class="tiny" style="color:#aaa">86 membres y vont</span></div>
      <div class="btn w">RSVP — Je participe</div>
      <div style="display:flex;gap:8px;margin-top:8px"><div class="btn o sm" style="flex:1;color:#fff">${ic('cal')} Calendrier</div><div class="btn o sm" style="flex:1;color:#fff">${ic('plus')} Inviter +1</div></div>
    </div>${homebar()}`, { dark: true });

  S['invitation'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Mes invitations'), r: ic('dots') })}
    <div class="body" style="background:var(--paper-2);padding:12px 18px 0">
      <div style="background:#000;color:#fff;padding:14px 14px 12px;position:relative">
        <div style="display:flex;justify-content:space-between;align-items:center">${LOGO_SM}<span class="kicker" style="opacity:.6">Invitation</span></div>
        <div class="disp" style="font-size:26px;margin:18px 0 4px">Nuit<br>électrique</div>
        <div class="serif i" style="font-size:12px;opacity:.8">Concert privé — Paris</div>
      </div>
      <div style="background:#fff;padding:12px 14px;position:relative;border-top:1.5px dashed #bbb">
        <span style="position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%;background:var(--paper-2)"></span><span style="position:absolute;right:-8px;top:-8px;width:16px;height:16px;border-radius:50%;background:var(--paper-2)"></span>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px 10px;font-size:8.6px">
          ${[['Invité·e', 'Camille D. + 1'], ['Date', 'Sam. 10.10'], ['Portes', '21:00'], ['Accès', 'Membre Rock']].map(([a, b]) => `<div><div class="tiny muted" style="letter-spacing:1px">${a.toUpperCase()}</div><b>${b}</b></div>`).join('')}
        </div>
        <div style="display:flex;justify-content:center;margin:14px 0 8px">${qr()}</div>
        <div class="tiny muted" style="text-align:center">Nominative · non transférable</div>
      </div>
      <div class="btn" style="margin-top:12px">${ic('wallet')} Ajouter au portefeuille</div>
      <div style="display:flex;gap:9px;align-items:center;margin-top:10px;font-size:8.2px;line-height:1.35">${ic('bell').replace('<svg', '<svg style="width:14px;flex:none"')}<span>Adresse révélée le 09.10 à 21:00 — vous recevrez une notification.</span></div>
    </div>${homebar()}`);

  // ===== 08 CONCIERGE ============================================
  const conciergeHead = `${sb()}
    <div style="display:flex;align-items:center;gap:10px;padding:2px 16px 10px;border-bottom:1px solid var(--paper-3)">
      ${ic('back').replace('<svg', '<svg style="width:15px"')}<span class="zavatar" style="width:28px;height:28px;font-size:13px">Z</span>
      <div style="flex:1"><div class="htitle" style="font-size:11px">Zadig Concierge</div><div class="tiny muted"><span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#2e9e5b;margin-right:4px"></span>Styliste &amp; service · 24/7</div></div>${ic('dots').replace('<svg', '<svg style="width:16px"')}
    </div>`;
  const conciergeInput = `<div style="display:flex;gap:8px;align-items:center;padding:8px 14px 28px;border-top:1px solid var(--paper-3)">
      <span style="width:26px;height:26px;border:1px solid #ddd;border-radius:50%;display:grid;place-items:center">${ic('cam').replace('<svg', '<svg style="width:13px"')}</span>
      <div style="flex:1;height:30px;border-radius:15px;background:var(--paper-2);display:flex;align-items:center;padding:0 12px;font-size:8.6px;color:#888">Écrire au concierge…</div>
      <span style="width:30px;height:30px;border-radius:50%;background:#000;color:#fff;display:grid;place-items:center">${ic('mic').replace('<svg', '<svg style="width:14px"')}</span></div>`;

  S['concierge'] = () => screen(`
    ${conciergeHead}
    <div class="body" style="padding:10px 14px 0">
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">${['Trouver une pièce', 'Composer un look', 'Ma commande', 'Ma taille', 'Une boutique', 'Que lire ?'].map((c, i) => `<span class="chip ${i === 1 ? 'on' : ''}" style="border-radius:12px">${c}</span>`).join('')}</div>
      <div class="bubble z">Bonsoir Camille. Que puis-je faire pour vous ce soir ?</div>
      <div class="bubble me">Je cherche une tenue pour un concert samedi soir.</div>
      <div class="bubble z">Voici trois pièces dans votre style, disponibles en <b>38</b> :</div>
      <div style="display:flex;gap:6px;margin-bottom:8px">${pcard({ k: 'jacket', n: 'Perfecto Liam', p: '695 €', w: 80, h: 84 })}${pcard({ k: 'dress', n: 'Robe satin', p: '325 €', w: 80, h: 84 })}${pcard({ k: 'boots', n: 'Boots Cara', p: '395 €', w: 80, h: 84 })}</div>
      <div class="bubble z" style="max-width:100%;display:flex;gap:9px;align-items:center;padding:6px">
        ${img('studio', { hair: 'long' }, 'width:46px;height:58px;flex:none')}
        <div style="flex:1"><div class="tiny muted">Ou un look complet, prêt à porter</div><div style="font-weight:600">The Parisian Rock Look</div><div class="tiny">5 pièces · 1 485 €</div></div><span class="btn sm" style="height:24px">Voir</span></div>
      <div class="bubble z" style="font-size:8.2px">Je peux aussi vérifier le stock près de chez vous.</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:flex-end;margin-top:4px">${['Voir le look', 'Plus sobre', 'Stock au Marais ?'].map((c) => `<span class="chip" style="border-radius:12px;border-color:#000">${c}</span>`).join('')}</div>
    </div>
    ${conciergeInput}${homebar()}`);

  S['concierge-2'] = () => screen(`
    ${conciergeHead}
    <div class="body" style="padding:10px 14px 0">
      <div class="bubble me">Où en est ma commande ?</div>
      <div class="bubble z" style="max-width:100%;background:#fff;border:1px solid var(--paper-3);padding:8px">
        <div style="display:flex;gap:8px;align-items:center">${prod('tee', 'width:32px;height:32px;flex:none')}<div style="flex:1"><div class="tiny muted">Commande ZV-48213</div><b>Expédiée · livraison demain avant 13 h</b></div></div>
        <div style="display:flex;gap:3px;margin-top:7px">${[1, 1, 1, 0, 0].map((v) => `<div style="flex:1;height:3px;background:${v ? '#000' : '#ddd'}"></div>`).join('')}</div>
        <div class="tiny" style="margin-top:5px;text-decoration:underline">Suivre le colis</div>
      </div>
      <div class="bubble me">Et le perfecto, je prends quelle taille ?</div>
      <div class="bubble z">Coupe oversize : gardez votre <b>38</b>. D'après vos achats, c'est la bonne taille.</div>
      <div class="bubble z" style="max-width:100%;padding:0;overflow:hidden;background:#fff;border:1px solid var(--paper-3)">
        <div style="display:flex">${img('facade', {}, 'width:66px;height:70px;flex:none')}
        <div style="padding:7px 9px;flex:1"><div class="tiny muted">${ic('pin').replace('<svg', '<svg style="width:9px;vertical-align:-1px"')} 350 m · ouvert jusqu'à 20 h</div><b>Z&amp;V Marais a le 38 en stock</b>
          <div style="display:flex;gap:5px;margin-top:6px"><span class="btn sm" style="height:22px">Réserver</span><span class="btn o sm" style="height:22px">RDV</span></div></div></div>
      </div>
      <div class="bubble z" style="max-width:100%;display:flex;gap:8px;align-items:center;padding:6px">${img('stage', {}, 'width:40px;height:40px;flex:none')}<div><div class="tiny muted">En attendant samedi</div><b>L'interview de Noa Lenz →</b></div></div>
      <div class="bubble me">Parfait, je prends le RDV.</div>
      <div class="bubble z">C'est noté : <b>Léa vous attend ven. 02 à 12:30</b>, le perfecto en 38 sera en cabine. ${ic('check').replace('<svg', '<svg style="width:9px;vertical-align:-1px"')} Ajouté au calendrier</div>
    </div>
    ${conciergeInput}${homebar()}`);

  // ===== 09 MON ZADIG ============================================
  S['profile'] = () => screen(`
    ${sb()}
    <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 16px 12px"><span class="disp" style="font-size:28px">Mon Zadig</span><span style="display:flex;gap:12px">${ic('bell').replace('<svg', '<svg style="width:17px"')}${ic('settings').replace('<svg', '<svg style="width:17px"')}</span></div>
    <div class="body">
      <div style="margin:0 16px;background:#000;color:#fff;padding:14px;position:relative;overflow:hidden">
        <div style="position:absolute;right:-20px;top:-20px;width:140px;height:140px;opacity:.25">${photo('leather')}</div>
        <div style="display:flex;gap:10px;align-items:center;position:relative">
          <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;position:relative;border:1.5px solid #fff">${photo('portrait', { s: 2.2, fx: -120, fy: -60 })}</div>
          <div><div style="font-weight:600;font-size:11px">Camille D.</div><div class="tiny" style="opacity:.7">Membre depuis 2023</div></div>
          <span class="tag" style="margin-left:auto">Club · Rock</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:7.6px;margin:14px 0 5px;position:relative"><span>1 240 pts</span><span style="opacity:.7">Prochain niveau : ICON · 2 000</span></div>
        <div class="progress" style="background:#333"><i style="width:62%;background:#fff"></i></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 16px">
        ${[['box', 'Commandes', '1 en cours'], ['heart', 'Wishlist', '14 pièces'], ['ticket', 'Invitations', '2 nouvelles'], ['lock', 'Accès exclusifs', '3 drops']].map(([i, n, s], k) => `
          <div style="border:1px solid var(--paper-3);padding:10px;position:relative">${ic(i).replace('<svg', '<svg style="width:16px"')}<div style="font-weight:600;font-size:9px;margin-top:8px">${n}</div><div class="tiny muted">${s}</div>${k === 2 ? '<span style="position:absolute;top:9px;right:9px;width:6px;height:6px;border-radius:50%;background:var(--red)"></span>' : ''}</div>`).join('')}
      </div>
      ${[['user', 'Profil & tailles enregistrées'], ['store', 'Boutiques favorites'], ['bell', 'Préférences & notifications'], ['clock', 'Historique d\'achats'], ['sparkle', 'Concierge & service client']].map(([i, t]) => `<div class="row-i" style="padding:8px 16px"><div class="l">${ic(i)}<span>${t}</span></div>${ic('chev')}</div>`).join('')}
      <div class="sec"><h4>Vos avantages Rock</h4><a>Tout voir</a></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:0 16px">${[['drops', 'Accès anticipé aux drops'], ['scissors', 'Retouches offertes'], ['ticket', 'Soirées privées']].map(([i, t]) => `<div style="background:var(--paper-2);padding:8px 7px;font-size:7.6px;line-height:1.3">${ic(i).replace('<svg', '<svg style="width:14px;display:block;margin-bottom:5px"')}${t}</div>`).join('')}</div>
    </div>
    ${tabbar('user')}${homebar()}`);

  S['wishlist'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Wishlist'), r: ic('share') })}
    <div style="display:flex;gap:16px;padding:0 16px;border-bottom:1px solid var(--paper-3)">${['Pièces 14', 'Looks 3', 'Stories 6'].map((t, i) => `<span style="font-size:8.6px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding-bottom:7px;${i ? 'color:#aaa' : 'border-bottom:1.5px solid #000'}">${t}</span>`).join('')}</div>
    <div class="body" style="padding-top:10px">
      <div style="margin:0 16px 10px;background:#000;color:#fff;padding:8px 10px;display:flex;gap:8px;align-items:center;font-size:8.4px">${ic('bell').replace('<svg', '<svg style="width:13px"')}<span><b>Votre wishlist a bougé</b> · 3 mises à jour</span></div>
      <div class="grid2">
        ${[['jacket', 'Perfecto Liam', '695 €', '<span style="color:var(--red)">● Plus que 2 en 38</span>'], ['bag', 'Sac Rocky Studs', '690 €', '● Dispo. au Marais'], ['sweater', 'Pull cachemire', '345 €', '● De retour en stock'], ['boots', 'Boots Cara', '395 €', '● Nouveau coloris']].map(([k, n, p, a]) =>
          pcard({ k, n, p, w: 'auto', h: 128, heart: false, extra: `<div class="tiny" style="margin-top:3px;font-weight:600">${a}</div><div style="display:flex;gap:4px;margin-top:5px"><span class="btn sm" style="flex:1;height:22px">Ajouter</span><span style="width:22px;height:22px;border:1px solid #000;display:grid;place-items:center">${ic('heartF').replace('<svg', '<svg style="width:10px"')}</span></div>` })).join('')}
      </div>
    </div>
    ${fab()}${tabbar('user')}${homebar()}`);

  S['order'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Commande ZV-48213'), r: ic('dots') })}
    <div class="body">
      <div class="pad" style="padding-top:6px">
        <span class="kicker r">● En cours de livraison</span>
        <div class="disp" style="font-size:26px;margin:6px 0 2px">En route</div>
        <div style="font-size:9px">Livraison estimée <b>demain, avant 13 h</b></div>
      </div>
      <div style="margin:12px 16px;height:70px;position:relative;overflow:hidden;background:#ecebe7">
        <svg viewBox="0 0 290 70" style="position:absolute;inset:0;width:100%;height:100%"><g stroke="#fff" stroke-width="5"><path d="M0,20 H290M0,52 H290M60,0 V70M150,0 V70M230,0 V70"/></g><path d="M20,52 H150 V20 H230" stroke="#000" stroke-width="2" fill="none" stroke-dasharray="4 3"/><circle cx="20" cy="52" r="4" fill="#000"/><circle cx="150" cy="30" r="5" fill="var(--red)"/><rect x="224" y="14" width="12" height="12" fill="#000"/></svg>
      </div>
      <div class="stepper pad" style="padding-left:36px">
        ${[['done', 'Commande confirmée', '28.09 · 19:42'], ['done', 'Préparée par notre atelier', '29.09 · Paris'], ['now', 'Expédiée', '30.09 · 08:12 · Transporteur express'], ['todo', 'En cours de livraison', 'Demain'], ['todo', 'Livrée', '']].map(([c, a, b]) => `<div class="st ${c}"><b>${a}</b><span>${b}</span></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;padding:2px 16px 8px">${prod('tee', 'width:44px;height:52px')}${prod('jeans', 'width:44px;height:52px')}<div style="font-size:8px;align-self:center">2 articles · 270 €<div class="tiny muted">Retour gratuit sous 30 jours</div></div></div>
      <div style="display:flex;gap:8px;padding:0 16px"><div class="btn o sm" style="flex:1">Modifier la livraison</div><div class="btn o sm" style="flex:1">Historique</div></div>
      <div style="margin:10px 16px 0;display:flex;gap:8px;align-items:center;background:var(--paper-2);padding:7px">${img('leather', {}, 'width:34px;height:34px;flex:none')}<div style="font-size:8.2px"><span class="tiny muted">En attendant</span><br><b>Bien entretenir votre cuir →</b></div></div>
    </div>
    ${tabbar('user')}${homebar()}`);

  S['prefs'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Préférences'), r: '' })}
    <div class="body">
      <div class="sec" style="margin-top:4px"><h4>Mes tailles</h4><a>Modifier</a></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:0 16px">${[['Vestes', '38'], ['Jeans', '27'], ['Chauss.', '38'], ['Maille', 'M']].map(([a, b]) => `<div style="border:1px solid var(--paper-3);padding:7px 6px"><div class="tiny muted">${a}</div><div class="disp" style="font-size:16px">${b}</div></div>`).join('')}</div>
      <div class="sec"><h4>Centres d'intérêt</h4><a>Personnalise l'accueil</a></div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;padding:0 16px">${[['Musique', 1], ['Art', 1], ['Cuir', 1], ['Paris', 0], ['Cachemire', 1], ['Vintage', 0], ['Homme', 0], ['Drops', 1]].map(([t, on]) => `<span class="chip ${on ? 'on' : ''}">${t}</span>`).join('')}</div>
      <div class="sec"><h4>Notifications</h4><a>Fréquence : 3 / sem.</a></div>
      ${[['Drops & lancements', 1], ['Nouvelles collections', 1], ['Journal & stories', 1], ['Événements & invitations', 1], ['Wishlist (stock, taille)', 1], ['Commandes & livraisons', 1], ['Offres privées', 0]].map(([t, on]) => `<div class="row-i" style="padding:7px 16px"><span>${t}</span><span class="toggle ${on ? '' : 'off'}"></span></div>`).join('')}
      <div class="row-i" style="padding:8px 16px"><div class="l">${ic('store')}<span>Boutique favorite · <b>Marais</b></span></div>${ic('chev')}</div>
    </div>
    ${tabbar('user')}${homebar()}`);

  // ===== 10 BOUTIQUES ============================================
  S['stores'] = () => screen(`
    <div class="map">
      <svg viewBox="0 0 320 692" style="width:100%;height:100%">
        <rect width="320" height="692" fill="#ecebe7"/>
        <path d="M-20,420 C60,380 120,450 200,410 C260,380 300,400 340,370 L340,410 C300,440 260,420 200,452 C120,492 60,420 -20,462Z" fill="#d3d2cd"/>
        <g stroke="#fff" stroke-width="9" fill="none"><path d="M-10,150 L330,210"/><path d="M40,-10 L120,700"/><path d="M-10,300 L330,280"/><path d="M230,-10 L200,700"/><path d="M-10,560 L330,600"/></g>
        <g stroke="#fff" stroke-width="4" fill="none"><path d="M-10,90 L330,120"/><path d="M160,-10 L150,400"/><path d="M-10,230 L330,250"/><path d="M290,0 L270,400"/><path d="M80,0 L60,400"/><path d="M-10,350 L330,330"/></g>
        <g fill="#e2e1dc">${Array.from({ length: 14 }, (_, i) => `<rect x="${(i * 53) % 300}" y="${(i * 97) % 380 + 20}" width="34" height="22"/>`).join('')}</g>
        <text x="30" y="440" font-family="Inter" font-size="8" fill="#9a9994" letter-spacing="2">LA SEINE</text>
      </svg>
      ${[[150, 250, 1], [66, 170, 0], [262, 330, 0], [110, 520, 0]].map(([x, y, on]) => `<div class="pin" style="left:${x}px;top:${y}px"><div style="width:${on ? 30 : 22}px;height:${on ? 30 : 22}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#000;display:grid;place-items:center;box-shadow:0 4px 10px rgba(0,0,0,.25)"><span style="transform:rotate(45deg);color:#fff;font-family:var(--display);font-weight:700;font-size:${on ? 12 : 9}px">Z</span></div></div>`).join('')}
      <div style="position:absolute;left:196px;top:300px;width:14px;height:14px;border-radius:50%;background:var(--red);border:3px solid #fff;box-shadow:0 0 0 8px rgba(200,16,46,.15)"></div>
    </div>
    <div class="abs-top">${sb()}
      <div style="margin:0 14px;height:36px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);display:flex;align-items:center;gap:8px;padding:0 12px;font-size:9px">${ic('back').replace('<svg', '<svg style="width:14px"')}<span style="color:#888;flex:1">Boutiques autour de moi</span>${ic('loc').replace('<svg', '<svg style="width:14px"')}</div>
      <div class="chips" style="padding:8px 14px"><span class="chip on" style="background:#000">Ouvert</span><span class="chip" style="background:#fff">Click &amp; collect</span><span class="chip" style="background:#fff">Rendez-vous</span><span class="chip" style="background:#fff">Stock wishlist</span></div>
    </div>
    <div style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:20px 20px 0 0;padding:8px 16px 28px;box-shadow:0 -6px 24px rgba(0,0,0,.15);z-index:20">
      <div style="width:34px;height:4px;border-radius:2px;background:#ddd;margin:0 auto 10px"></div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div class="disp" style="font-size:16px">Zadig&amp;Voltaire Marais</div><div style="font-size:8.2px;margin-top:3px"><span style="color:#2e9e5b;font-weight:600">Ouvert</span> · ferme à 20 h · 350 m</div></div>${ic('heartF').replace('<svg', '<svg style="width:16px"')}</div>
      <div style="display:flex;gap:12px;margin:10px 0;font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#555">${[['bag', 'Click & collect'], ['scissors', 'Retouches'], ['sparkle', 'Personal shopping'], ['gift', 'Emballage']].map(([i, t]) => `<div style="text-align:center;flex:1">${ic(i).replace('<svg', '<svg style="width:15px;display:block;margin:0 auto 3px;color:#000"')}${t}</div>`).join('')}</div>
      <div style="background:var(--paper-2);padding:7px 9px;font-size:8.2px;margin-bottom:10px"><b>3 pièces de votre wishlist</b> sont en stock ici</div>
      <div style="display:flex;gap:8px"><div class="btn o sm" style="flex:1">${ic('route')} Itinéraire</div><div class="btn sm" style="flex:1">Prendre RDV</div></div>
    </div>${homebar()}`);

  S['store'] = () => screen(`
    <div class="abs-top on-photo">${sb()}${hdr({ l: ic('back'), r: ic('share') })}</div>
    <div class="body">
      ${img('facade', {}, 'height:172px')}
      <div class="pad" style="padding-top:10px">
        <div style="display:flex;justify-content:space-between;align-items:center"><div class="disp" style="font-size:17px">Boutique Marais</div><span class="tag k">${ic('heartF').replace('<svg', '<svg style="width:7px;vertical-align:-1px"')} Favorite</span></div>
        <div class="tiny muted" style="margin:3px 0 8px">Lun.–Sam. 10 h–20 h · Dim. 11 h–19 h · Paris 3e</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">${['Click & collect 2 h', 'Stock local', 'Personal shopping', 'Retouches', 'Réparation cuir'].map((t) => `<span class="chip">${t}</span>`).join('')}</div>
      </div>
      <div class="sec"><h4>Rendez-vous conseiller</h4><a>45 min</a></div>
      <div style="display:flex;gap:6px;padding:0 16px">${[['Jeu', '01'], ['Ven', '02', 1], ['Sam', '03'], ['Lun', '05'], ['Mar', '06']].map(([d, n, on]) => `<div style="flex:1;text-align:center;padding:6px 0;border:1px solid ${on ? '#000' : 'var(--paper-3)'};${on ? 'background:#000;color:#fff' : ''}"><div class="tiny" style="opacity:.7">${d}</div><div class="disp" style="font-size:15px">${n}</div></div>`).join('')}</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:8px 16px">${[['11:00'], ['12:30', 1], ['15:00'], ['17:30', 2]].map(([t, s]) => `<span style="text-align:center;padding:6px 0;font-size:8.4px;border:1px solid ${s === 1 ? '#000' : 'var(--paper-3)'};${s === 1 ? 'font-weight:700' : ''}${s === 2 ? 'color:#bbb;text-decoration:line-through' : ''}">${t}</span>`).join('')}</div>
      <div style="display:flex;gap:9px;align-items:center;padding:4px 16px 0">
        <div style="width:32px;height:32px;border-radius:50%;overflow:hidden;position:relative">${photo('portrait', { s: 2.2, fx: -120, fy: -60, hair: 'bob' })}</div>
        <div style="font-size:8.4px"><b>Léa, conseillère</b><div class="tiny muted">FR · EN · IT · spécialiste cuir</div></div>
      </div>
      <div class="sec"><h4>À préparer en cabine</h4><a>Depuis la wishlist</a></div>
      <div style="display:flex;gap:6px;padding:0 16px">${['jacket', 'bag', 'boots', 'sweater'].map((k, i) => `<div style="position:relative">${prod(k, 'width:52px;height:52px')}<span style="position:absolute;top:3px;right:3px;width:11px;height:11px;background:${i < 3 ? '#000' : '#fff'};border:1px solid #000;color:#fff;display:grid;place-items:center">${i < 3 ? ic('check', '', 3).replace('<svg', '<svg style="width:8px"') : ''}</span></div>`).join('')}</div>
    </div>
    <div style="padding:9px 16px 26px;border-top:1px solid var(--paper-3)"><div class="btn">Confirmer · Ven. 02 · 12:30</div></div>${homebar()}`);

  // ===== 11 CRM ==================================================
  const notif = (t, when, body, extra = '') => `<div class="notif"><span class="ai">Z</span><div class="tx"><b>ZADIG&amp;VOLTAIRE <span>${when}</span></b><div style="font-weight:600;margin-top:1px">${t}</div><div style="color:#333">${body}</div>${extra}</div></div>`;
  S['lock'] = () => screen(`
    <div style="position:absolute;inset:0">${img('portrait', { lx: .8, bg: '#3a3a39' }, 'position:absolute;inset:0')}<div style="position:absolute;inset:0;background:rgba(0,0,0,.25)"></div></div>
    <div class="abs-top on-photo">${sb()}</div>
    <div style="position:absolute;top:52px;left:0;right:0;text-align:center;color:#fff;z-index:5">
      <div style="font-size:9.5px;font-weight:500;opacity:.9">Mercredi 30 septembre</div>
      <div style="font-family:var(--display);font-weight:500;font-size:70px;line-height:1">9:41</div>
    </div>
    <div style="position:absolute;left:10px;right:10px;top:148px;z-index:5">
      <div style="background:rgba(10,10,10,.82);backdrop-filter:blur(14px);color:#fff;border-radius:18px;padding:10px 12px;margin-bottom:9px;display:flex;align-items:center;gap:10px">
        <span class="ai" style="width:30px;height:30px;border-radius:8px;background:var(--red);display:grid;place-items:center;font-family:var(--display);font-weight:700">Z</span>
        <div style="flex:1"><div class="tiny" style="opacity:.7;letter-spacing:1px">LIVE ACTIVITY · DROP</div><div style="font-size:9px;font-weight:600">Sac Rocky Studs — accès membres</div><div class="progress" style="margin-top:5px;background:#333"><i style="width:78%;background:#fff"></i></div></div>
        <div style="font-family:var(--display);font-size:20px">02:14</div>
      </div>
      ${notif('Only 2 hours before the drop.', 'maintenant', 'Votre accès anticipé ouvre à 18:00. 250 pièces.')}
      ${notif('The new collection has arrived.', '9:02', 'Paris After Dark : le film, les looks, 64 pièces.', `<div class="img" style="height:62px;margin-top:6px;border-radius:8px">${photo('rooftops')}</div>`)}
      ${notif('Your wishlist just got an update.', 'hier', 'Perfecto Liam : plus que 2 pièces en 38.')}
      <div style="transform:scale(.96);opacity:.9">${notif('Your order has shipped.', 'hier', 'ZV-48213 arrive demain avant 13 h.')}</div>
      <div style="transform:scale(.92);opacity:.75;margin-top:-4px">${notif('Something new from Zadig.', 'lun.', 'Une playlist, une interview, une surprise.')}</div>
    </div>
    <div style="position:absolute;left:30px;right:30px;bottom:30px;display:flex;justify-content:space-between;z-index:5">${['flash', 'cam'].map((i) => `<span style="width:40px;height:40px;border-radius:50%;background:rgba(40,40,40,.6);backdrop-filter:blur(8px);color:#fff;display:grid;place-items:center">${ic(i).replace('<svg', '<svg style="width:17px"')}</span>`).join('')}</div>
    ${homebar('w')}`, { dark: true });

  S['inbox'] = () => screen(`
    ${sb()}${hdr({ l: ic('back'), c: title('Notifications'), r: ic('settings') })}
    <div class="chips" style="padding:0 16px 10px;border-bottom:1px solid var(--paper-3)"><span class="chip on">Tout</span><span class="chip">Drops</span><span class="chip">Journal</span><span class="chip">Wishlist</span><span class="chip">Commandes</span></div>
    <div class="body">
      ${[
        ['Journal', 'Something new from Zadig.', 'L\'interview de Noa Lenz est en ligne — avec sa playlist.', 'stage', '2 h', ''],
        ['Drop', 'Only 2 hours before the drop.', 'Sac Rocky Studs · accès membres à 18:00.', 'red', '3 h', 'r'],
        ['Invitation', 'Vous êtes invitée.', 'Nuit électrique · Sam. 10.10 · 1 place +1.', 'party', 'hier', 'rsvp'],
        ['Wishlist', 'Your wishlist just got an update.', 'Perfecto Liam : plus que 2 en 38.', 'p:jacket', 'hier', ''],
        ['Commande', 'Your order has shipped.', 'ZV-48213 · livraison demain.', 'p:tee', 'lun.', ''],
        ['Collection', 'The new collection has arrived.', 'Paris After Dark — le film est en ligne.', 'rooftops', 'lun.', ''],
        ['Expérience', 'Le pop-up de Tokyo ouvre jeudi.', 'Omotesando · 15–30.10 · pièces exclusives.', 'facade', 'dim.', ''],
      ].map(([cat, t, b, s, w, x], i) => `
        <div style="display:flex;gap:10px;padding:10px 16px;border-bottom:1px solid var(--paper-3);${i < 3 ? '' : 'opacity:.9'}">
          ${s.startsWith('p:') ? prod(s.slice(2), 'width:46px;height:46px;flex:none') : img(s, { blur: 1 }, 'width:46px;height:46px;flex:none')}
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between"><span class="kicker ${x === 'r' ? 'r' : 'g'}">${i < 3 ? '● ' : ''}${cat}</span><span class="tiny muted">${w}</span></div>
            <div style="font-size:9px;font-weight:600;margin:2px 0 1px">${t}</div><div class="tiny" style="color:#555;line-height:1.35">${b}</div>
            ${x === 'rsvp' ? '<div style="display:flex;gap:5px;margin-top:5px"><span class="btn sm" style="height:20px">RSVP</span><span class="btn o sm" style="height:20px">Plus tard</span></div>' : ''}
          </div>
        </div>`).join('')}
    </div>
    ${tabbar('home')}${homebar()}`);

  window.UI = { S, ic };
})();
