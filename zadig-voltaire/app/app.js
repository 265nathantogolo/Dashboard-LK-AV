/* ZADIG & VOLTAIRE — App demo
 * A clickable prototype of the app concept: router, persisted state, views,
 * live drop countdown, concierge chat and simulated CRM pushes. */
(function () {
  const { photo, product } = window.ART;
  const { ic } = window.UI;
  const D = window.DATA;

  // ================================================================ helpers
  const byId = (arr, id) => arr.find((x) => x.id === id);
  const prodOf = (id) => byId(D.P, id);
  const eur = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icn = (n, st = '', sw) => ic(n, '', sw).replace('<svg', `<svg style="${st}"`);
  const pad = (n) => String(n).padStart(2, '0');
  const img = (scene, o = {}, style = '', cls = '') => `<div class="img ${cls}" style="${style}">${photo(scene, o)}</div>`;
  const pimg = (p, style = '', o = {}) => `<div class="img" style="${style}">${product(p.kind, { color: p.color, ...o })}</div>`;

  // ================================================================ state
  const KEY = 'zv-demo-v1';
  const fresh = () => ({
    t0: Date.now(),
    cart: [],
    wish: ['liam', 'rocky', 'cashmere', 'cara'],
    wishLooks: ['l01'],
    saved: ['cuir'],
    alerts: { rocky: true, vinyl: false },
    rsvp: { nuit: false },
    sizes: { vestes: '38', robes: '38', pantalons: '27', chaussures: '38', maille: 'M', tshirts: 'S', accessoires: '85' },
    interests: ['Musique', 'Art', 'Cuir', 'Cachemire', 'Drops'],
    notifPrefs: { drops: true, collections: true, journal: true, events: true, wishlist: true, orders: true, offers: false },
    favStore: 'marais',
    rdv: null,
    dropLive: false,
    stock: 187,
    bought: {},
    club: 1240,
    orders: [{ id: 'ZV-48213', items: [['tee', 'S', 1], ['jean', '27', 1]], total: 270, status: 2, date: '28.09' }],
    notifs: [
      { cat: 'Journal', t: 'Something new from Zadig.', b: 'L’interview de Noa Lenz est en ligne — avec sa playlist.', s: 'stage', to: 'article:interview', w: '2 h', u: 1 },
      { cat: 'Invitation', t: 'Vous êtes invitée.', b: 'Nuit électrique · Sam. 10.10 · 1 place +1.', s: 'party', to: 'event:nuit', w: 'hier', u: 1 },
      { cat: 'Wishlist', t: 'Your wishlist just got an update.', b: 'Perfecto Liam : plus que 2 en 38.', p: 'liam', to: 'pdp:liam', w: 'hier' },
      { cat: 'Commande', t: 'Your order has shipped.', b: 'ZV-48213 · livraison demain avant 13 h.', p: 'tee', to: 'order:ZV-48213', w: 'lun.' },
      { cat: 'Collection', t: 'The new collection has arrived.', b: 'Paris After Dark — le film est en ligne.', s: 'rooftops', to: 'collection:ah26', w: 'lun.' },
    ],
    pushed: {},
  });
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } };
  save();

  // Session-only UI state.
  const U = { gal: {}, size: {}, color: {}, open: {}, shopG: 'f', filt: 'all', rub: 'Tout', dropTab: 0, lookF: 'Tous', expF: 'Pour vous', lookSel: {}, play: null, store: 'marais', rdvDay: 1, rdvTime: '12:30', prep: {}, inboxF: 'Tout', chat: null, deliv: 0, q: '' };

  const cartCount = () => S.cart.reduce((a, c) => a + c.q, 0);
  const cartTotal = () => S.cart.reduce((a, c) => a + prodOf(c.id).price * c.q, 0);
  const unread = () => S.notifs.filter((n) => n.u).length;
  const inWish = (id) => S.wish.includes(id);
  const userSize = (p) => {
    const s = S.sizes[p.cat];
    if (s && p.sizes.includes(s) && !(p.out || []).includes(s)) return s;
    return p.sizes.find((x) => !(p.out || []).includes(x));
  };
  const dropOf = (id) => byId(D.DROPS, id);
  const dropAt = (d) => S.t0 + (d.in || 0);
  const dropIsLive = (d) => d.id === 'rocky' && (S.dropLive || Date.now() >= dropAt(d));
  const tier = () => (S.club >= 2000 ? 'Icon' : 'Rock');

  // ================================================================ chrome
  const sb = (cls = '') => `<div class="sb ${cls}"><span>9:41</span><span class="ic">
    <svg viewBox="0 0 18 10" fill="currentColor"><rect x="0" y="7" width="3" height="3" rx=".6"/><rect x="5" y="5" width="3" height="5" rx=".6"/><rect x="10" y="2.5" width="3" height="7.5" rx=".6"/><rect x="15" y="0" width="3" height="10" rx=".6"/></svg>
    <svg viewBox="0 0 14 10" fill="currentColor"><path d="M7 2.2c2 0 3.9.8 5.3 2.1l1.1-1.1A9.2 9.2 0 0 0 7 .6 9.2 9.2 0 0 0 .6 3.2l1.1 1.1A7.6 7.6 0 0 1 7 2.2zm0 3.2c1.1 0 2.2.4 3 1.2l1.1-1.1A5.9 5.9 0 0 0 7 3.8a5.9 5.9 0 0 0-4.1 1.7L4 6.6c.8-.8 1.9-1.2 3-1.2zM7 7.4 5.5 8.9 7 10.4l1.5-1.5z"/></svg>
    <svg viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor"/></svg>
  </span></div>`;
  const LOGO = '<span class="logo">ZADIG&amp;VOLTAIRE</span>';
  const LOGO_SM = '<span class="logo sm">ZADIG&amp;VOLTAIRE</span>';
  const title = (t) => `<span class="htitle">${t}</span>`;
  const backBtn = () => `<span data-back>${ic('back')}</span>`;
  const bagBtn = () => `<span data-go="cart">${ic('bag')}${cartCount() ? `<i class="badge-n">${cartCount()}</i>` : ''}</span>`;
  const bellBtn = () => `<span data-go="inbox">${ic('bell')}${unread() ? `<i class="badge-n">${unread()}</i>` : ''}</span>`;
  const searchBtn = () => `<span data-go="search">${ic('search')}</span>`;
  const hdr = (l = '', c = '', r = '', cls = '') => `<div class="hdr ${cls}"><div class="l">${l}</div><div>${c}</div><div class="r">${r}</div></div>`;
  const TABS = [['home', 'Home'], ['shop', 'Shop'], ['stories', 'Stories'], ['drops', 'Drops'], ['user', 'Mon Zadig']];
  const tabbar = (on, cls = '') => `<div class="tabbar ${cls}">${TABS.map(([k, l]) =>
    `<div class="t ${k === on ? 'on' : ''}" data-tab="${k}">${ic(k, '', k === on ? 1.8 : 1.4)}<span>${l}</span></div>`).join('')}</div>`;
  const fab = (full = false) => full
    ? '<div class="fab" data-go="concierge"><span class="z">Z</span>CONCIERGE</div>'
    : '<div class="fab mini" data-go="concierge"><span class="z">Z</span></div>';
  const homebar = (cls = '') => `<div class="homebar ${cls}"></div>`;
  const sec = (h, a = '', go = '') => `<div class="sec"><h4>${h}</h4>${a ? `<a ${go}>${a}</a>` : ''}</div>`;

  const heart = (id, cls = 'hrt') => `<span data-act="wish" data-p="${id}" class="${cls}" style="position:absolute;top:5px;right:5px;z-index:2;width:18px;height:18px;display:grid;place-items:center">${ic(inWish(id) ? 'heartF' : 'heart', '', 1.4).replace('<svg', '<svg style="width:13px;height:13px"')}</span>`;
  const pcard = (p, { w = 92, h = 110, extra = '', noHeart = false } = {}) => `
    <div class="pcard" style="width:${w === 'auto' ? 'auto' : w + 'px'}" data-go="pdp" data-p="${p.id}">
      <div class="img" style="height:${h}px">${product(p.kind, { color: p.color })}${p.badge ? `<span class="bdg"><span class="tag ${p.red ? 'r' : 'k'}">${p.badge}</span></span>` : ''}${noHeart ? '' : heart(p.id)}</div>
      <div class="nm">${p.name}</div><div class="pr">${eur(p.price)}</div>${extra}
    </div>`;

  // ================================================================ router
  let stack = [{ v: 'home', p: {} }];
  const TAB_OF = { home: 'home', shop: 'shop', journal: 'stories', drops: 'drops', profile: 'user' };
  const ROOT_OF = { home: 'home', shop: 'shop', stories: 'journal', drops: 'drops', user: 'profile' };
  const curTab = () => TAB_OF[stack[0].v] || 'home';
  const top = () => stack[stack.length - 1];
  function go(v, p = {}) { closeOverlays(); stack.push({ v, p: typeof p === 'string' ? { id: p } : p }); render('push'); }
  function back() { closeOverlays(); if (stack.length > 1) { stack.pop(); render('pop'); } }
  function tab(t) { closeOverlays(); stack = [{ v: ROOT_OF[t], p: {} }]; render('tab'); }
  function goTo(to) { // "view:id"
    const [v, id] = to.split(':');
    if (v === 'film') return film(id);
    if (v === 'story') return storyPlayer(id);
    go(v, id ? { id } : {});
  }
  function replaceTop(v, p = {}) { stack.pop(); stack.push({ v, p }); render('push'); }

  // ================================================================ views
  const V = {};

  // ---------------------------------------------------------------- HOME
  V.home = () => {
    const rocky = dropOf('rocky'), live = dropIsLive(rocky);
    const recos = D.P.filter((p) => !inWish(p.id) && p.g === 'f' && !p.drop).slice(2, 7);
    return { html: `
    <div class="hdr-float" id="hf">${sb()}${hdr(`<span data-go="search">${ic('menu')}</span>`, LOGO, bellBtn() + searchBtn() + bagBtn())}</div>
    <div class="body" data-scroll="home">
      <div style="background:#070707;color:#fff">
        <div style="position:relative;height:462px">
          ${img('portrait', { lx: 0.78 }, 'position:absolute;inset:0')}
          <div class="ovl" style="top:170px"></div>
          <div class="chips" style="position:absolute;top:88px;left:16px;right:16px;gap:14px;z-index:3">
            <span class="kicker" style="border-bottom:1.5px solid #fff;padding-bottom:3px">Pour vous</span>
            <span class="kicker" style="opacity:.7" data-act="shopG" data-p="f">Femme</span><span class="kicker" style="opacity:.7" data-act="shopG" data-p="m">Homme</span><span class="kicker" style="opacity:.7" data-go="catalogue" data-p="new">Nouveautés</span>
          </div>
          <div style="position:absolute;left:16px;right:16px;bottom:22px">
            <div class="kicker" style="opacity:.8">Campagne Automne-Hiver 26</div>
            <div class="disp" style="font-size:46px;margin:6px 0">PARIS<br>AFTER DARK</div>
            <div class="serif i" style="font-size:14px;opacity:.9;margin-bottom:12px">Le rock comme une seconde peau.</div>
            <div style="display:flex;gap:8px"><div class="btn w sm" style="flex:1" data-go="collection" data-p="ah26">Découvrir la collection</div><div class="btn o sm" style="color:#fff" data-act="film" data-p="ah26">${ic('play')} Film 1:32</div></div>
          </div>
        </div>
        <div class="sec" style="margin:14px 16px 9px"><h4>Stories</h4><a data-go="journal">Tout voir</a></div>
        <div class="hscroll" style="gap:11px;padding-bottom:16px">
          ${[['backstage', 'Backstage', 'backstage', 1], ['red', 'Drop', 'drop', 2], ['vinyl', 'Playlist', 'playlist', 0], ['studio', 'Looks', 'looks', 0], ['rooftops', 'Paris', 'paris', 0]].map(([s, l, set, r]) => `
            <div style="text-align:center;flex:none" data-act="story" data-p="${set}">
              <div style="width:50px;height:50px;border-radius:50%;padding:2px;border:1.5px solid ${r === 2 ? 'var(--red)' : r ? '#fff' : '#555'}">
                <div class="img" style="width:100%;height:100%;border-radius:50%">${photo(s, { dark: true })}</div></div>
              <div style="font-size:7px;margin-top:5px;letter-spacing:.8px;text-transform:uppercase">${l}</div></div>`).join('')}
        </div>
      </div>

      ${sec(live ? 'Drop en cours' : 'Drop à venir', 'Tous les drops', 'data-tab="drops"')}
      <div style="margin:0 16px;background:#000;color:#fff;display:flex;height:142px" data-go="drop" data-p="rocky">
        ${pimg(prodOf('rocky-noir'), 'width:118px;flex:none', { bg: '#1c1c1b', color: '#050505' })}
        <div style="padding:12px;display:flex;flex-direction:column;flex:1">
          <span class="tag r" style="align-self:flex-start">${live ? '● Live now' : 'Accès membres'}</span>
          <div class="disp" style="font-size:17px;margin:8px 0 5px">Sac Rocky Studs<br>Édition noire</div>
          ${live ? `<div class="tiny" style="opacity:.8;margin-bottom:auto">${S.stock} / 250 restantes</div>` : `<div data-cd="${dropAt(rocky)}" data-fmt="mini" style="margin-bottom:auto">${cdHTML(dropAt(rocky) - Date.now(), 'mini')}</div>`}
          <div class="btn w sm">${live ? 'Accéder au drop' : (S.alerts.rocky ? `${icn('check', 'width:10px')} Accès anticipé confirmé` : `${ic('bell')} M’alerter`)}</div>
        </div>
      </div>

      ${sec('Produit du moment', 'Shop', 'data-tab="shop"')}
      <div style="margin:0 16px;position:relative" data-go="pdp" data-p="liam">
        ${pimg(prodOf('liam'), 'height:160px', { bg: '#e9e8e4' })}${heart('liam')}
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:6px"><div><div class="serif i" style="font-size:17px;line-height:1">Le perfecto Liam</div><div class="tiny muted" style="margin-top:2px">Cuir d’agneau plongé · 695 €</div></div><span class="tag k">Voir</span></div>
      </div>

      ${sec('Zadig loves…', 'La sélection', 'data-go="catalogue" data-p="rock"')}
      <div class="hscroll">${['rocky', 'cara', 'cashmere', 'shades', 'ring'].map((id) => pcard(prodOf(id))).join('')}</div>

      ${sec('Looks du moment', 'Lookbook', 'data-go="lookbook"')}
      <div class="hscroll">${D.LOOKS.map((l) => `<div style="flex:none;width:100px" data-go="look" data-p="${l.id}">${img(l.scene[0], { ...l.scene[1], pos: 'xMidYMin' }, 'height:132px')}<div class="tiny" style="margin-top:4px;font-weight:600;letter-spacing:1px">LOOK ${l.n}</div><div class="tiny muted">Shop the look →</div></div>`).join('')}</div>

      ${sec('Le Journal', 'N°12', 'data-go="journal"')}
      <div style="margin:0 16px;display:flex;gap:10px" data-go="article" data-p="interview">
        ${img('stage', { pos: 'xMidYMin' }, 'width:118px;height:118px;flex:none')}
        <div><span class="kicker g">Musique · Interview</span><div class="serif" style="font-size:16px;line-height:1.05;margin:5px 0">« Le rock, c’est une attitude, pas un costume. »</div><div class="tiny muted">Noa Lenz · 6 min de lecture</div><div class="tiny" style="margin-top:6px;font-weight:600">${icn('music', 'width:9px;vertical-align:-1px')} + sa playlist</div></div>
      </div>

      ${sec('Événements', 'Agenda', 'data-go="experiences"')}
      <div style="margin:0 16px;display:flex;gap:10px;align-items:center;border:1px solid var(--paper-3);padding:7px" data-go="event" data-p="nuit">
        ${img('party', {}, 'width:54px;height:54px;flex:none')}
        <div style="flex:1"><span class="tag k">Sur invitation</span><div style="font-weight:600;font-size:9.5px;margin:4px 0 1px">Nuit électrique — concert privé</div><div class="tiny muted">Sam. 10.10 · Paris · 120 places</div></div>
        <span class="btn sm">${S.rsvp.nuit ? '✓ Inscrite' : 'RSVP'}</span>
      </div>

      <div style="margin:12px 16px 0;background:#000;color:#fff;padding:11px 12px;display:flex;gap:10px;align-items:center" data-go="drop" data-p="vinyl">
        ${icn('lock', 'width:18px;flex:none')}
        <div style="flex:1"><div class="kicker" style="opacity:.6">Exclusif app · Membres ${tier()}</div><div style="font-size:9.5px;font-weight:600;margin-top:3px">Capsule Rock Vinyl : indice n°2 révélé</div></div>${icn('chev', 'width:12px')}
      </div>

      ${sec('Pour vous', 'Parce que vous aimez le cuir', 'data-go="prefs"')}
      <div class="hscroll" style="padding-bottom:24px">${recos.map((p) => pcard(p)).join('')}</div>
    </div>
    ${fab(true)}${tabbar('home')}${homebar()}` };
  };

  // ---------------------------------------------------------------- SEARCH
  const TRENDS = ['perfecto', 'cuir', 'cachemire', 'sac clouté', 'boots', 'concert'];
  function searchResults(q) {
    const t = q.trim().toLowerCase();
    if (!t) return `<div class="pad"><div class="kicker g" style="margin:4px 0 8px">Tendances</div><div style="display:flex;flex-wrap:wrap;gap:5px">${TRENDS.map((x) => `<span class="chip" data-act="q" data-p="${x}">${x}</span>`).join('')}</div>
      <div class="kicker g" style="margin:18px 0 8px">Récemment consultés</div></div>
      <div class="hscroll">${['liam', 'rocky', 'cara'].map((id) => pcard(prodOf(id))).join('')}</div>
      <div style="margin:16px 16px 0;border:1px solid #000;padding:9px 10px;display:flex;gap:9px;align-items:center" data-go="concierge" data-p="Je cherche une tenue pour un concert samedi soir."><span class="zavatar">Z</span><div style="font-size:8.6px;line-height:1.35">Pas sûr·e ? <b>Demandez au Concierge</b><br><span class="muted">« Une tenue pour un concert samedi ? »</span></div></div>`;
    const m = (s) => s.toLowerCase().includes(t);
    const syn = t.includes('concert') || t.includes('soir');
    const prods = D.P.filter((p) => m(p.name) || m(p.mat) || m(p.cat) || (syn && ['liam', 'studs', 'robe', 'cara'].includes(p.id)));
    const looks = D.LOOKS.filter((l) => m(l.name) || l.tags.some(m) || l.items.some((i) => prods.find((p) => p.id === i)));
    const stories = D.STORIES.filter((s) => m(s.title) || m(s.rub) || (s.body || []).some(m));
    const events = D.EVENTS.filter((e) => m(e.name) || m(e.type) || m(e.place));
    if (!prods.length && !looks.length && !stories.length && !events.length) return `<div class="empty"><div class="disp">Aucun résultat</div>Essayez « cuir », « cachemire » ou demandez au Concierge.<div class="btn sm" style="margin:14px auto 0;width:160px" data-go="concierge" data-p="${esc(q)}">Demander au Concierge</div></div>`;
    return `<div class="chips" style="padding:0 16px 4px"><span class="chip on">Tout</span><span class="chip">Produits ${prods.length}</span><span class="chip">Looks ${looks.length}</span><span class="chip">Stories ${stories.length}</span><span class="chip">Événements ${events.length}</span></div>
      ${prods.length ? sec('Produits', `${prods.length} résultat${prods.length > 1 ? 's' : ''}`) + `<div class="hscroll">${prods.map((p) => pcard(p)).join('')}</div>` : ''}
      ${looks.length ? sec('Looks') + `<div class="hscroll">${looks.map((l) => `<div style="flex:none;width:92px" data-go="look" data-p="${l.id}">${img(l.scene[0], { ...l.scene[1], pos: 'xMidYMin' }, 'height:112px')}<div class="tiny" style="margin-top:4px;font-weight:600">${l.name}</div></div>`).join('')}</div>` : ''}
      ${stories.length ? sec('Stories') + stories.map((s) => `<div style="display:flex;gap:9px;padding:0 16px 8px" data-go="article" data-p="${s.id}">${img(s.scene, { pos: 'xMidYMin' }, 'width:54px;height:54px;flex:none')}<div><span class="kicker g">${s.rub} · ${s.fmt}</span><div class="serif" style="font-size:13px;line-height:1.05;margin-top:3px">${s.short}</div></div></div>`).join('') : ''}
      ${events.length ? sec('Événements') + events.map((e) => `<div class="row-i" data-go="event" data-p="${e.id}"><div class="l">${ic('cal')}<span>${e.name} · ${e.short}</span></div>${ic('chev')}</div>`).join('') : ''}
      <div style="height:20px"></div>`;
  }
  V.search = () => ({ html: `
    ${sb()}
    <div style="display:flex;gap:8px;align-items:center;padding:4px 16px 10px">
      <div style="flex:1;height:34px;background:var(--paper-2);display:flex;align-items:center;gap:8px;padding:0 10px">${icn('search', 'width:13px;flex:none')}
        <input class="search-in" id="q" placeholder="Pièce, look, story, événement…" value="${esc(U.q)}" autocomplete="off">
        <span data-act="toast" data-p="Recherche par photo : pointez une pièce avec l’appareil photo">${icn('cam', 'width:14px')}</span></div>
      <span class="tiny" style="text-decoration:underline;cursor:pointer" data-back>Annuler</span>
    </div>
    <div class="body" id="results">${searchResults(U.q)}</div>
    ${tabbar(curTab())}${homebar()}`, after: () => { const q = document.getElementById('q'); q.focus(); q.setSelectionRange(q.value.length, q.value.length); } });

  // ---------------------------------------------------------------- SHOP
  V.shop = () => ({ html: `
    ${sb()}${hdr(`<span data-go="search">${ic('menu')}</span>`, title('Shop'), `<span data-go="wishlist">${ic('heart')}</span>` + bagBtn())}
    <div style="display:flex;gap:18px;padding:2px 16px 0;border-bottom:1px solid var(--paper-3)">
      ${[['f', 'Femme'], ['m', 'Homme']].map(([g, l]) => `<span class="disp" data-act="shopG" data-p="${g}" style="font-size:20px;cursor:pointer;padding-bottom:6px;${U.shopG === g ? 'border-bottom:2px solid #000' : 'color:#b5b4b0'}">${l}</span>`).join('')}
    </div>
    <div class="body">
      <div style="margin:10px 16px;height:30px;background:var(--paper-2);display:flex;align-items:center;gap:8px;padding:0 10px;font-size:8.6px;color:#777" data-go="search">${icn('search', 'width:12px')}Rechercher une pièce, une matière…</div>
      <div style="margin:0 16px;position:relative;height:124px" data-go="catalogue" data-p="new">${img('street', {}, 'position:absolute;inset:0')}
        <div class="ovl" style="top:40px"></div><div style="position:absolute;left:12px;bottom:10px;color:#fff"><div class="kicker">${U.shopG === 'f' ? '64' : '38'} nouvelles pièces</div><div class="disp" style="font-size:24px">Nouveautés</div></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 16px">
        <div data-go="catalogue" data-p="best"><div style="position:relative;height:80px">${pimg(prodOf(U.shopG === 'f' ? 'cashmere' : 'stan'), 'position:absolute;inset:0')}</div><div class="disp" style="font-size:11px;margin-top:4px">Best-sellers</div></div>
        <div data-go="catalogue" data-p="limited"><div style="position:relative;height:80px;background:#000">${pimg(prodOf('rocky-noir'), 'position:absolute;inset:0', { bg: '#2a2a29', color: '#050505' })}<span class="tag r" style="position:absolute;top:6px;left:6px">250 ex.</span></div><div class="disp" style="font-size:11px;margin-top:4px">Éditions limitées</div></div>
      </div>
      <div style="margin:0 16px 4px;background:#000;color:#fff;display:flex;align-items:center;gap:10px;padding:8px 10px" data-go="catalogue" data-p="rock">
        <span class="kicker" style="opacity:.6">Sélection</span><span class="serif i" style="font-size:13px;flex:1">Le vestiaire rock</span>${icn('chev', 'width:11px')}
      </div>
      ${D.CATS.filter(([c]) => D.P.some((p) => p.cat === c && p.g === U.shopG)).map(([c, n, k]) => `
        <div class="row-i" style="padding:5px 16px" data-go="catalogue" data-p="${c}"><div class="l"><div class="img" style="width:30px;height:30px">${product(k)}</div><span style="font-size:9.5px">${n}</span></div>${ic('chev', '', 1.4)}</div>`).join('')}
      <div class="row-i" style="padding:9px 16px" data-go="collections"><div class="l">${ic('grid')}<span style="font-size:9.5px">Collections</span></div>${ic('chev', '', 1.4)}</div>
      <div class="row-i" style="padding:9px 16px" data-go="lookbook"><div class="l">${ic('user')}<span style="font-size:9.5px">Lookbook — Shop the look</span></div>${ic('chev', '', 1.4)}</div>
      <div style="height:20px"></div>
    </div>
    ${fab()}${tabbar('shop')}${homebar()}` });

  const CAT_TITLE = { new: 'Nouveautés', best: 'Best-sellers', limited: 'Éditions limitées', rock: 'Le vestiaire rock' };
  function catalogueItems(c) {
    let list = D.P.filter((p) => !p.drop || c === 'limited');
    if (c === 'new') list = list.filter((p) => p.g === U.shopG && (p.badge === 'Nouveau' || ['cashmere', 'robe', 'rocky', 'cara', 'stan', 'tee-m', 'jean-m', 'vesper'].includes(p.id)));
    else if (c === 'best') list = list.filter((p) => p.g === U.shopG && (p.badge === 'Best-seller' || ['liam', 'cara', 'stan', 'jean-m'].includes(p.id)));
    else if (c === 'limited') list = D.P.filter((p) => p.red);
    else if (c === 'rock') list = list.filter((p) => ['liam', 'studs', 'tee', 'jean', 'cara', 'belt', 'rocky', 'ring'].includes(p.id));
    else list = list.filter((p) => p.cat === c && p.g === U.shopG);
    if (U.filt === 'size') list = list.filter((p) => { const s = S.sizes[p.cat]; return !s || (p.sizes.includes(s) && !(p.out || []).includes(s)); });
    if (U.filt === 'store') list = list.filter((p) => p.stock > 2);
    if (U.filt === 'price') list = [...list].sort((a, b) => a.price - b.price);
    return list;
  }
  V.catalogue = ({ id }) => {
    const name = CAT_TITLE[id] || (D.CATS.find(([c]) => c === id) || [0, id])[1];
    const list = catalogueItems(id);
    const cards = list.map((p) => pcard(p, { w: 'auto', h: 156, extra: `<div class="tiny muted">${p.stock <= 2 ? `Plus que ${p.stock} en stock` : 'En stock au Marais'}</div>` }));
    if (list.length > 2) cards.splice(2, 0, `<div style="grid-column:span 2;position:relative;height:84px" data-go="article" data-p="cuir">${img('leather', {}, 'position:absolute;inset:0')}
        <div style="position:absolute;inset:0;padding:10px 12px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(90deg,rgba(0,0,0,.75),rgba(0,0,0,.1))"><span class="kicker" style="opacity:.7">Story · 3 min</span><div class="serif i" style="font-size:15px">Le perfecto, histoire d’une icône →</div></div></div>`);
    return { html: `
    ${sb()}${hdr(backBtn(), title(name), searchBtn() + bagBtn())}
    <div style="text-align:center;font-size:7.5px;color:#888;margin:-6px 0 8px">${list.length} pièce${list.length > 1 ? 's' : ''}</div>
    <div class="chips" style="padding:0 16px 10px;border-bottom:1px solid var(--paper-3)">
      ${[['all', 'Tout'], ['size', 'Ma taille'], ['store', 'En boutique'], ['price', 'Prix ↑']].map(([k, l]) => `<span class="chip ${U.filt === k ? 'on' : ''}" data-act="filt" data-p="${k}">${l}</span>`).join('')}
    </div>
    <div class="body" style="padding-top:10px">
      ${list.length ? `<div class="grid2">${cards.join('')}</div>` : '<div class="empty"><div class="disp">Rien pour ce filtre</div>Essayez un autre filtre.</div>'}
      <div style="height:20px"></div>
    </div>
    ${fab()}${tabbar(curTab())}${homebar()}` };
  };

  // ---------------------------------------------------------------- PRODUCT
  V.pdp = ({ id }) => {
    const p = prodOf(id);
    const g = U.gal[id] || 0;
    const size = U.size[id] || userSize(p);
    const look = p.look && byId(D.LOOKS, p.look);
    const drop = p.drop && dropOf(p.drop);
    const dropLocked = drop && !dropIsLive(drop);
    const views = [
      () => product(p.kind, { color: p.color, bg: '#ebeae6' }),
      () => photo('studio', { dark: true, pos: 'xMidYMin' }),
      () => photo('leather'),
      () => product(p.kind, { color: U.color[id] === 1 ? '#5a1a1f' : '#3a3a3a', bg: '#ebeae6' }),
    ];
    const col = U.color[id] || 0;
    const main = g === 0 && col === 1 ? product(p.kind, { color: '#5a1a1f', bg: '#ebeae6' }) : views[g]();
    const open = (k) => U.open[id + k];
    return { html: `
    <div class="abs-top">${sb()}${hdr(backBtn(), '', `<span data-act="share">${ic('share')}</span>` + bagBtn())}</div>
    <div class="body">
      <div style="position:relative;height:318px"><div class="img" style="position:absolute;inset:0">${main}</div>
        <div style="position:absolute;left:10px;top:96px;display:flex;flex-direction:column;gap:5px;z-index:2">
          ${views.map((f, i) => `<div class="img" data-act="gal" data-p="${id}:${i}" style="width:30px;height:38px;${g === i ? 'outline:1.5px solid #000' : 'opacity:.8'}">${f()}</div>`).join('')}
        </div>
        <div class="dots" style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%)">${views.map((_, i) => `<i class="${g === i ? 'on' : ''}"></i>`).join('')}</div>
        ${p.badge ? `<span class="tag ${p.red ? 'r' : 'k'}" style="position:absolute;right:12px;top:92px">${p.badge}</span>` : ''}
      </div>
      <div class="pad" style="padding-top:12px">
        <div style="display:flex;justify-content:space-between"><span class="kicker g">${p.mat}</span><span class="kicker">${eur(p.price)}</span></div>
        <div class="disp" style="font-size:20px;margin:5px 0 8px">${p.name}</div>
        ${p.colors ? `<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">${p.colors.map((c, i) => `<span data-act="color" data-p="${id}:${i}" style="cursor:pointer;width:14px;height:14px;border-radius:50%;background:${c};${col === i ? 'box-shadow:0 0 0 2px #fff,0 0 0 3px #000' : ''}"></span>`).join('')}<span class="tiny muted" style="margin-left:4px">${col ? 'Bordeaux' : 'Noir'}</span></div>` : ''}
        ${p.sizes.length > 1 ? `<div style="display:flex;justify-content:space-between;font-size:8px;margin-bottom:5px"><span>Taille · <b>${size === S.sizes[p.cat] ? `votre taille : ${size}` : size}</b></span><span style="text-decoration:underline;cursor:pointer" data-act="sizeGuide" data-p="${id}">Guide des tailles</span></div>
        <div class="sizes">${p.sizes.map((s) => `<span class="${(p.out || []).includes(s) ? 'x' : s === size ? 'on' : ''}" ${(p.out || []).includes(s) ? '' : `data-act="size" data-p="${id}:${s}"`} style="cursor:pointer">${s}</span>`).join('')}</div>` : ''}
        <div style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:8px;background:var(--paper-2);padding:7px 9px" data-go="store" data-p="marais">${icn('pin', 'width:12px;flex:none')}<span style="flex:1">${drop ? '<b>Exclusivité app</b> · non disponible en boutique' : `<b>En stock au Marais</b> · ${Math.min(p.stock, 3)} pièce${p.stock > 1 ? 's' : ''} · retrait en 2 h`}</span>${drop ? '' : icn('chev', 'width:10px')}</div>
        <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:7px;letter-spacing:1px;text-transform:uppercase;color:#555">${[['truck', 'Livraison demain'], ['box', 'Retour 30 j'], ['scissors', 'Réparation à vie'], ['sparkle', 'Conseil taille']].map(([i, t]) => `<div style="text-align:center;flex:1">${icn(i, 'width:14px;display:block;margin:0 auto 3px;color:#000')}${t}</div>`).join('')}</div>
      </div>
      <div style="border-top:6px solid var(--paper-2);margin-top:16px;padding-top:14px">
        <div class="pad"><span class="kicker r">L’histoire de la pièce</span>
          <div class="serif i" style="font-size:20px;line-height:1.05;margin:7px 0 10px">${p.story}</div></div>
        <div style="margin:0 16px;position:relative;height:120px">${img('leather', {}, 'position:absolute;inset:0')}<span class="tag" style="position:absolute;left:8px;bottom:8px">Détail · ${p.mat.toLowerCase()}</span></div>
        <p class="pad" style="font-size:8.6px;line-height:1.55;color:#333;margin-top:9px">${p.text}</p>
        <div style="margin-top:8px">${[['fit', 'Coupe', p.fit, 'Coupe pensée au studio parisien. En cas de doute, le Concierge vous conseille selon vos achats.'], ['comp', 'Composition & entretien', p.mat, 'Nettoyage spécialiste. Évitez l’exposition prolongée au soleil. Nourrir une fois par an.'], ['rep', 'Réparation à vie', 'Service cuir en boutique', 'Nos ateliers réparent coutures, zips et doublures, sur rendez-vous en boutique.']].map(([k, a, b, more]) => `
          <div class="row-i" style="padding:7px 16px;display:block" data-act="acc" data-p="${id}${k}"><div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-weight:600;font-size:8.6px">${a}</div><div class="tiny muted">${b}</div></div>${ic(open(k) ? 'close' : 'plus', '', 1.4)}</div>${open(k) ? `<div class="tiny" style="margin-top:6px;line-height:1.5;color:#444">${more}</div>` : ''}</div>`).join('')}</div>
        ${look ? `${sec(`Porté dans le look ${look.n}`, 'Shop the look', `data-go="look" data-p="${look.id}"`)}
        <div style="display:flex;gap:6px;padding:0 16px 8px;overflow-x:auto">${img(look.scene[0], { ...look.scene[1], pos: 'xMidYMin' }, 'width:66px;height:92px;flex:none')}${look.items.filter((x) => x !== id).slice(0, 3).map((x) => pcard(prodOf(x), { w: 62, h: 70 })).join('')}</div>` : ''}
        <div style="height:14px"></div>
      </div>
    </div>
    <div style="display:flex;gap:8px;padding:10px 16px 28px;border-top:1px solid var(--paper-3);background:#fff">
      <div data-act="wish" data-p="${id}" style="cursor:pointer;width:36px;height:36px;border:1px solid #000;display:grid;place-items:center">${icn(inWish(id) ? 'heartF' : 'heart', 'width:15px')}</div>
      ${dropLocked ? `<div class="btn" style="flex:1" data-go="drop" data-p="${drop.id}">${ic('drops')} Accès au drop</div>`
        : S.bought[id] ? '<div class="btn dis" style="flex:1">Pièce achetée · 1 par membre</div>'
          : `<div class="btn" style="flex:1" data-act="add" data-p="${id}">Ajouter au panier · ${eur(p.price)}</div>`}
    </div>${homebar()}` };
  };

  // ---------------------------------------------------------------- CART / CHECKOUT
  V.cart = () => {
    const tot = cartTotal();
    const store = byId(D.STORES, S.favStore);
    return { html: `
    ${sb()}${hdr(backBtn(), title(`Panier${cartCount() ? ' · ' + cartCount() : ''}`), '')}
    <div class="body">
      ${S.cart.length ? S.cart.map((c, i) => { const p = prodOf(c.id); return `
        <div style="display:flex;gap:10px;padding:10px 16px;border-bottom:1px solid var(--paper-3)">
          <div data-go="pdp" data-p="${p.id}">${pimg(p, 'width:64px;height:76px')}</div>
          <div style="flex:1;display:flex;flex-direction:column">
            <div style="display:flex;justify-content:space-between"><b style="font-size:9.2px">${p.name}</b><span data-act="rm" data-p="${i}" style="cursor:pointer">${icn('close', 'width:12px')}</span></div>
            <div class="tiny muted" style="margin:2px 0">Taille ${c.s}${p.drop ? ' · Drop · 1 par membre' : ''}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto">
              ${p.drop ? '<span></span>' : `<div class="qty"><span data-act="qty" data-p="${i}:-1">−</span><b>${c.q}</b><span data-act="qty" data-p="${i}:1">+</span></div>`}
              <b style="font-size:9.2px">${eur(p.price * c.q)}</b></div>
          </div></div>`; }).join('') + `
        <div class="pad" style="padding-top:14px">
          <div class="kicker g" style="margin-bottom:8px">Livraison</div>
          ${[['truck', 'Livraison express', 'Demain avant 13 h · offerte'], ['store', `Retrait en boutique · ${store.name}`, 'Prêt en 2 h · essayage sur place']].map(([i, a, b], k) => `
            <div class="opt ${U.deliv === k ? 'on' : ''}" data-act="deliv" data-p="${k}"><span class="rd"></span>${icn(i, 'width:14px')}<div><b>${a}</b><div class="tiny muted">${b}</div></div></div>`).join('')}
          <div style="display:flex;justify-content:space-between;font-size:8.8px;margin-top:12px"><span>Sous-total</span><span>${eur(tot)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:8.8px;margin-top:4px"><span>Livraison</span><span>Offerte</span></div>
          <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-top:8px;padding-top:8px;border-top:1px solid #000"><span>Total</span><span>${eur(tot)}</span></div>
          <div class="tiny muted" style="margin-top:6px">+ ${Math.round(tot / 2)} points club · Retours gratuits sous 30 jours</div>
        </div>
        ${sec('Complétez avec')}<div class="hscroll" style="padding-bottom:20px">${['belt', 'ring', 'shades', 'tee'].filter((x) => !S.cart.some((c) => c.id === x)).map((x) => pcard(prodOf(x), { w: 84, h: 90 })).join('')}</div>`
      : `<div class="empty"><div class="disp">Votre panier est vide</div>Laissez-vous inspirer par le Journal ou les looks du moment.<div style="display:flex;gap:6px;justify-content:center;margin-top:14px"><span class="btn sm" data-go="lookbook">Les looks</span><span class="btn o sm" data-go="wishlist">Ma wishlist</span></div></div>`}
    </div>
    ${S.cart.length ? `<div style="padding:10px 16px 28px;border-top:1px solid var(--paper-3)"><div class="btn" id="paybtn" data-act="pay">${ic('lock')} Paiement express · ${eur(tot)}</div></div>` : ''}${homebar()}` };
  };

  V.confirm = ({ id }) => {
    const o = byId(S.orders, id);
    return { html: `
    ${sb()}${hdr('', LOGO_SM, `<span data-act="home">${ic('close')}</span>`)}
    <div class="body" style="text-align:center;padding:24px 22px 0">
      <div style="width:54px;height:54px;border-radius:50%;background:#000;color:#fff;display:grid;place-items:center;margin:10px auto 16px">${icn('check', 'width:24px', 2)}</div>
      <div class="kicker g">Commande ${o.id}</div>
      <div class="disp" style="font-size:30px;margin:8px 0">Merci Camille</div>
      <div class="serif i" style="font-size:14px;color:#444;margin-bottom:16px">Votre pièce quitte bientôt notre atelier parisien.</div>
      <div style="display:flex;gap:6px;justify-content:center;margin-bottom:12px">${o.items.map(([pid]) => pimg(prodOf(pid), 'width:58px;height:66px')).join('')}</div>
      <div style="font-size:9px">${o.deliv === 1 ? 'Retrait en boutique · prêt dans 2 h' : 'Livraison express · demain avant 13 h'}</div>
      <div class="tiny muted" style="margin-top:4px">+ ${Math.round(o.total / 2)} points · statut ${tier()}</div>
      <div class="btn" style="margin-top:20px" data-go="order" data-p="${o.id}">Suivre ma commande</div>
      <div style="margin-top:14px;display:flex;gap:9px;align-items:center;background:var(--paper-2);padding:8px;text-align:left" data-go="article" data-p="cuir">${img('leather', {}, 'width:40px;height:40px;flex:none')}<div style="font-size:8.4px"><span class="tiny muted">En attendant</span><br><b>Bien entretenir votre cuir →</b></div></div>
    </div>${homebar()}` };
  };

  // ---------------------------------------------------------------- STORIES
  const RUBS = ['Tout', 'Mode', 'Musique', 'Art', 'Paris', 'Backstage'];
  V.journal = () => {
    const list = D.STORIES.filter((s) => U.rub === 'Tout' || s.rub === U.rub);
    const [cover, ...rest] = list;
    const open = (s) => (s.video ? 'data-act="story" data-p="backstage"' : `data-go="article" data-p="${s.id}"`);
    return { html: `
    ${sb()}
    <div style="padding:0 16px;display:flex;justify-content:space-between;align-items:flex-end">
      <div class="disp" style="font-size:38px;letter-spacing:-.5px">Le Journal</div>
      <div style="text-align:right" class="tiny"><b>N°12</b><br><span class="muted">Octobre 2026</span></div>
    </div>
    <div class="chips" style="padding:10px 16px;border-bottom:1px solid var(--paper-3)">${RUBS.map((r) => `<span class="chip ${U.rub === r ? 'on' : ''}" data-act="rub" data-p="${r}">${r === 'Tout' ? 'À la une' : r}</span>`).join('')}</div>
    <div class="body">
      ${cover ? `<div style="position:relative;height:232px" ${open(cover)}>${img(cover.scene, { pos: 'xMidYMin' }, 'position:absolute;inset:0')}
        <div class="ovl" style="top:80px"></div>
        <div style="position:absolute;left:16px;right:70px;bottom:14px;color:#fff"><span class="tag">${cover.fmt}</span>
          <div class="disp" style="font-size:24px;margin:7px 0 4px">${cover.short}</div>${cover.sub ? `<div class="serif i" style="font-size:12px;opacity:.85">${cover.sub}</div>` : ''}</div>
        <div style="position:absolute;right:16px;bottom:16px;color:#fff;font-family:var(--display);font-size:34px;opacity:.9">01</div>
      </div>` : ''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 8px;padding:12px 16px 0">
        ${rest.map((s, i) => `<div ${open(s)} style="${i === 0 ? 'grid-row:span 2' : ''}"><div style="position:relative;height:${i === 0 ? 190 : 78}px">${img(s.scene, { pos: 'xMidYMin' }, 'position:absolute;inset:0')}${s.video ? `<span style="position:absolute;inset:0;display:grid;place-items:center;color:#fff">${icn('play', 'width:22px')}</span>` : ''}</div>
          <div class="kicker g" style="margin-top:5px">${s.rub} · ${s.fmt}${s.time ? ' · ' + s.time : ''}</div><div class="${i % 2 ? 'serif' : ''}" style="font-size:${i % 2 ? 13 : 9.2}px;${i % 2 ? 'line-height:1.05' : 'font-weight:600'};margin-top:3px">${s.short}</div></div>`).join('')}
      </div>
      ${U.rub === 'Tout' || U.rub === 'Musique' ? `${sec('La playlist du mois', 'Écouter', 'data-go="playlist" data-p="nuit"')}
      <div style="margin:0 16px 20px;display:flex;align-items:center;gap:10px;background:#000;color:#fff;padding:8px 10px" data-go="playlist" data-p="nuit">${img('vinyl', {}, 'width:44px;height:44px;flex:none')}<div style="flex:1"><div class="kicker" style="opacity:.6">Culture · Vol.12</div><div style="font-size:9.2px;font-weight:600;margin-top:2px">NUIT — la playlist de Noa Lenz</div></div><span style="width:26px;height:26px;border-radius:50%;background:#fff;color:#000;display:grid;place-items:center">${icn('play', 'width:10px')}</span></div>` : '<div style="height:20px"></div>'}
    </div>
    ${fab()}${tabbar('stories')}${homebar()}` };
  };

  V.article = ({ id }) => {
    const s = byId(D.STORIES, id);
    if (s.video) return V.journal();
    const coll = s.collection && byId(D.COLLECTIONS, s.collection);
    const look = s.look && byId(D.LOOKS, s.look);
    return { html: `
    <div class="abs-top on-photo">${sb()}${hdr(backBtn(), '', `<span data-act="save" data-p="${id}">${ic(S.saved.includes(id) ? 'bookmark' : 'bookmark', '', S.saved.includes(id) ? 2.6 : 1.5)}</span><span data-act="share">${ic('share')}</span>`)}</div>
    <div style="position:absolute;top:0;left:0;right:0;height:2px;z-index:60"><div id="readbar" style="height:100%;width:0;background:var(--red)"></div></div>
    <div class="body" data-scroll="read">
      <div style="position:relative;height:230px">${img(s.scene, { dx: 20, pos: 'xMidYMin' }, 'position:absolute;inset:0')}<div class="ovl-t"></div></div>
      <div class="pad" style="padding-top:12px">
        <span class="kicker g">${s.rub} — ${s.fmt} · ${s.time}</span>
        <div class="serif" style="font-size:22px;line-height:1.02;margin:6px 0">${s.title}</div>
        <div class="tiny muted" style="margin-bottom:10px">${s.by || 'Par la rédaction'}</div>
        ${s.body.map((t, i) => `<p style="font-size:8.8px;line-height:1.6;color:#222;margin-bottom:9px">${i === 0 ? `<span class="disp" style="float:left;font-size:32px;line-height:.9;margin:2px 6px 0 0">${t[0]}</span>${t.slice(1)}` : t}</p>`).join('')}
        <div style="border-left:2px solid #000;padding-left:10px;margin:12px 0" class="serif i"><span style="font-size:15px;line-height:1.1">${s.quote}</span></div>
      </div>
      <div style="background:var(--paper-2);margin:0 16px;padding:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span class="kicker">${s.rub === 'Musique' ? 'Ce qu’elle porte' : 'Les pièces de la story'}</span><span class="tiny" style="text-decoration:underline" data-tab="shop">Shop</span></div>
        <div style="display:flex;gap:8px">${s.products.map((pid) => { const p = prodOf(pid); return `<div style="display:flex;gap:6px;flex:1;background:#fff;padding:5px;align-items:center" data-go="pdp" data-p="${p.id}">${pimg(p, 'width:34px;height:40px;flex:none')}<div style="flex:1"><div style="font-size:7.8px">${p.name}</div><div style="font-size:7.8px;font-weight:600">${eur(p.price)}</div></div><span data-act="quickadd" data-p="${p.id}" style="padding:4px">${icn('plus', 'width:12px')}</span></div>`; }).join('')}</div>
      </div>
      ${s.playlist ? `<div style="margin:10px 16px 0;display:flex;align-items:center;gap:10px;background:#000;color:#fff;padding:7px 9px" data-go="playlist" data-p="${s.playlist}">${img('vinyl', {}, 'width:34px;height:34px;flex:none')}<div style="flex:1"><div class="kicker" style="opacity:.6">Playlist</div><div style="font-size:9px;font-weight:600">NUIT — la playlist de Noa</div></div><span style="width:24px;height:24px;border-radius:50%;background:#fff;color:#000;display:grid;place-items:center">${icn('play', 'width:10px')}</span></div>` : ''}
      ${look ? `<div style="margin:10px 16px 0;display:flex;gap:10px;align-items:center;border:1px solid #000;padding:7px" data-go="look" data-p="${look.id}">${img(look.scene[0], { ...look.scene[1], pos: 'xMidYMin' }, 'width:40px;height:50px;flex:none')}<div style="flex:1"><div class="kicker g">Inspiration → look</div><div style="font-size:9px;font-weight:600;margin-top:2px">${look.name}</div></div>${icn('chev', 'width:11px')}</div>` : ''}
      ${coll ? `<div style="margin:10px 16px 0;display:flex;gap:10px;align-items:center;border:1px solid #000;padding:7px" data-go="collection" data-p="${coll.id}">${img(coll.scene[0], coll.scene[1], 'width:40px;height:50px;flex:none')}<div style="flex:1"><div class="kicker g">Collection</div><div style="font-size:9px;font-weight:600;margin-top:2px">${coll.name}</div></div>${icn('chev', 'width:11px')}</div>` : ''}
      ${sec('À lire ensuite')}
      <div class="hscroll" style="padding-bottom:24px">${D.STORIES.filter((x) => x.id !== id && !x.video).map((x) => `<div style="flex:none;width:118px" data-go="article" data-p="${x.id}">${img(x.scene, { pos: 'xMidYMin' }, 'height:78px')}<div class="kicker g" style="margin-top:5px">${x.rub}</div><div class="serif" style="font-size:12px;line-height:1.05;margin-top:2px">${x.short}</div></div>`).join('')}</div>
    </div>${homebar()}` };
  };

  V.playlist = ({ id }) => {
    const pl = D.PLAYLISTS[id];
    const coll = byId(D.COLLECTIONS, pl.collection);
    const playing = U.play;
    return { html: `
    ${sb()}${hdr(backBtn(), title('Playlist'), `<span data-act="share">${ic('share')}</span>`)}
    <div class="body">
      <div style="margin:0 16px;height:196px;position:relative;overflow:hidden">${img('vinyl', {}, 'position:absolute;inset:0')}${playing !== null ? '<div style="position:absolute;right:14px;top:12px" class="tag r">● En lecture</div>' : ''}</div>
      <div class="pad" style="padding-top:10px">
        <span class="kicker g">Culture · Interview → Playlist</span>
        <div class="disp" style="font-size:20px;margin:4px 0 8px">${pl.name}</div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
          <span data-act="play" data-p="${playing === null ? 0 : -1}" style="cursor:pointer;width:36px;height:36px;border-radius:50%;background:#000;color:#fff;display:grid;place-items:center">${playing === null ? icn('play', 'width:14px') : '<svg viewBox="0 0 24 24" style="width:13px" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>'}</span>
          <span data-act="toast" data-p="Lecture aléatoire activée">${icn('shuffle', 'width:15px')}</span>
          <span class="tiny muted" style="margin-left:auto">${pl.tracks.length} titres · ${pl.dur}</span></div>
        ${playing !== null ? `<div class="progress" style="margin:8px 0 4px"><i style="width:0;animation:bar 40s linear forwards"></i></div>` : ''}
        ${pl.tracks.map(([t, a, d], i) => `
          <div data-act="play" data-p="${i}" style="cursor:pointer;display:flex;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid var(--paper-3)"><span class="tiny ${playing === i ? '' : 'muted'}" style="width:14px">${playing === i ? '<span class="eq"><i></i><i></i><i></i></span>' : pad(i + 1)}</span><div style="flex:1"><div style="font-size:9px;font-weight:${playing === i ? 700 : 500}">${t}</div><div class="tiny muted">${a}</div></div><span class="tiny muted">${d}</span></div>`).join('')}
      </div>
      <div style="margin:14px 16px 0;background:#000;color:#fff;position:relative;height:100px" data-go="collection" data-p="${coll.id}">
        ${img('street', {}, 'position:absolute;right:0;top:0;bottom:0;width:110px')}
        <div style="position:absolute;left:12px;top:12px;right:120px"><span class="kicker" style="opacity:.6">L’univers de la playlist</span><div class="disp" style="font-size:15px;margin:5px 0 8px">Collection<br>${coll.name}</div><span class="tiny" style="text-decoration:underline">Entrer dans la collection →</span></div>
      </div>
      ${sec('Les pièces de la playlist')}
      <div class="hscroll" style="padding-bottom:24px">${coll.keys.map((x) => pcard(prodOf(x))).join('')}</div>
    </div>
    ${playing !== null ? `<div style="display:flex;align-items:center;gap:9px;padding:7px 14px;background:#000;color:#fff">${img('vinyl', {}, 'width:26px;height:26px;flex:none')}<div style="flex:1;font-size:8px"><b>${pl.tracks[playing][0]}</b><div style="opacity:.6">${pl.tracks[playing][1]}</div></div><span class="eq"><i></i><i></i><i></i></span></div>` : ''}
    ${tabbar('stories')}${homebar()}` };
  };

  // ---------------------------------------------------------------- DROPS
  V.drops = () => {
    const rocky = dropOf('rocky'), vinyl = dropOf('vinyl'), live = dropIsLive(rocky);
    const rows = D.DROPS.filter((d) => ['tease', 'soon'].includes(d.phase));
    const tabs = ['À venir', 'En cours', 'Archives'];
    let content = '';
    if (U.dropTab === 2) {
      content = [['Perfecto Studio 01', 'Sold out en 11 min', 'jacket'], ['Sac Rocky Studs — Argent', 'Sold out en 26 min', 'bag'], ['Boots Cara — Python', 'Sold out en 2 h', 'boots']].map(([n, t, k]) => `
        <div style="display:flex;gap:10px;align-items:center;padding:10px 16px;border-bottom:1px solid #1e1e1e"><div class="img" style="width:46px;height:46px;opacity:.6">${product(k, { bg: '#1c1c1b', color: '#000' })}</div><div style="flex:1"><div style="font-size:9px;font-weight:600">${n}</div><span class="kicker" style="color:#777">${t}</span></div><span class="tag o" style="color:#777">Sold out</span></div>`).join('')
        + '<div class="tiny" style="color:#777;padding:14px 16px">Les contenus post-drop restent en ligne : making-of, photos de la communauté #ZVDrop.</div>';
    } else {
      const rockyCard = `<div style="margin:0 16px 12px;position:relative;height:190px;background:#111" data-go="drop" data-p="rocky">${pimg(prodOf('rocky-noir'), 'position:absolute;inset:0', { bg: '#1b1b1a', color: '#060606' })}<div class="ovl" style="top:60px"></div>
          <div style="position:absolute;top:10px;left:10px;display:flex;gap:5px">${live ? '<span class="tag r pulse">● Live now</span>' : '<span class="tag r">Countdown</span>'}<span class="tag o" style="color:#fff">Exclusivité app</span></div>
          <div style="position:absolute;left:12px;right:12px;bottom:12px"><div class="disp" style="font-size:20px">Sac Rocky Studs — Édition noire</div>
          ${live ? `<div class="tiny" style="opacity:.8;margin:4px 0 8px">${S.stock} / 250 pièces restantes</div><div class="btn r sm">Accéder au drop</div>` : `<div data-cd="${dropAt(rocky)}" data-fmt="line" class="tiny" style="margin:4px 0 8px;opacity:.9">${cdHTML(dropAt(rocky) - Date.now(), 'line')}</div><div class="btn w sm" data-act="alert" data-p="rocky">${S.alerts.rocky ? `${icn('check', 'width:10px')} Accès anticipé confirmé` : `${ic('bell')} M’alerter`}</div>`}</div></div>`;
      const vinylCard = `<div style="margin:0 16px;position:relative;height:190px" data-go="drop" data-p="vinyl">${img('red', { blur: 4 - vinyl.reveal }, 'position:absolute;inset:0')}<div class="ovl" style="top:70px"></div>
          <div style="position:absolute;top:10px;left:10px;display:flex;gap:5px"><span class="tag r">Reveal ${vinyl.reveal}/3</span><span class="tag o" style="color:#fff">Membres d’abord</span></div>
          <div style="position:absolute;left:12px;right:12px;bottom:12px"><div class="disp" style="font-size:22px">Capsule Rock Vinyl</div><div class="tiny" style="opacity:.8;margin:3px 0 8px">${vinyl.date} · ${vinyl.qty} pièces numérotées</div>
            <div style="display:flex;gap:8px;align-items:center"><div class="btn w sm" style="flex:1" data-act="alert" data-p="vinyl">${S.alerts.vinyl ? `${icn('check', 'width:10px')} Alerte activée` : `${ic('bell')} M’alerter`}</div><span class="tiny" style="opacity:.8">${(vinyl.waiting + (S.alerts.vinyl ? 1 : 0)).toLocaleString('fr-FR')} inscrits</span></div></div></div>`;
      content = U.dropTab === 1 ? (live ? rockyCard : '<div class="empty" style="color:#888"><div class="disp" style="color:#fff">Aucun drop en cours</div>Le prochain ouvre dans quelques heures.</div>' + rockyCard)
        : (live ? '' : rockyCard) + vinylCard + rows.map((d) => `
          <div style="display:flex;gap:10px;align-items:center;padding:9px 16px;border-bottom:1px solid #1e1e1e" data-go="drop" data-p="${d.id}">
            <div style="width:30px;text-align:center"><div class="disp" style="font-size:18px">${d.dd}</div><div class="tiny" style="color:#777;letter-spacing:1px">${d.mm}</div></div>
            ${img('smoke', {}, 'width:42px;height:42px;flex:none')}
            <div style="flex:1"><div style="font-size:9px;font-weight:600">${d.name}</div><span class="kicker" style="color:#888">${d.phase === 'tease' ? 'Tease' : 'Coming soon'}</span></div>
            <span data-act="alert" data-p="${d.id}" style="cursor:pointer;width:26px;height:26px;border:1px solid ${S.alerts[d.id] ? '#fff' : '#444'};border-radius:50%;display:grid;place-items:center;${S.alerts[d.id] ? 'background:#fff;color:#000' : ''}">${icn('bell', 'width:12px')}</span>
          </div>`).join('')
          + `<div style="margin:12px 16px 20px;border:1px solid var(--red);padding:8px 10px;display:flex;gap:9px;align-items:center;font-size:8.4px">${icn('lock', 'width:14px;color:var(--red)')}<span><b>Membres ${tier()}</b> · accès 30 min avant tout le monde</span></div>`;
    }
    return { dark: true, html: `
    ${sb()}${hdr(`<span data-go="inbox">${ic('menu')}</span>`, '<span class="logo sm">ZADIG DROPS</span>', bellBtn())}
    <div style="display:flex;gap:18px;padding:2px 16px 8px;border-bottom:1px solid #222">${tabs.map((t, i) => `<span class="disp" data-act="dropTab" data-p="${i}" style="cursor:pointer;font-size:15px;padding-bottom:5px;${U.dropTab === i ? 'border-bottom:2px solid #fff' : 'color:#555'}">${t}</span>`).join('')}</div>
    <div style="display:flex;align-items:center;gap:5px;padding:9px 16px;font-size:6.6px;letter-spacing:1.3px;font-weight:600;color:#777">
      ${['Tease', 'Reveal', 'Countdown', 'Drop', 'Post-drop'].map((t, i) => `<span style="${(live ? i === 3 : i === 2) ? 'color:#fff' : ''}">${t.toUpperCase()}</span>`).join('<span style="color:var(--red)">→</span>')}
    </div>
    <div class="body">${content}</div>
    ${tabbar('drops')}${homebar()}` };
  };

  V.drop = ({ id }) => {
    const d = dropOf(id);
    if (id === 'rocky') return dropIsLive(d) ? dropLive(d) : dropCountdown(d);
    if (id === 'vinyl') return dropTease(d);
    return { dark: true, html: `
      <div style="position:absolute;inset:0">${img('smoke', {}, 'position:absolute;inset:0')}</div>
      <div class="abs-top on-photo">${sb()}${hdr(backBtn(), '<span class="logo sm">ZADIG DROPS</span>', `<span data-act="share">${ic('share')}</span>`)}</div>
      <div style="position:absolute;left:18px;right:18px;bottom:44px;color:#fff;z-index:5">
        <span class="kicker" style="opacity:.75">${d.phase === 'tease' ? 'Tease' : 'Coming soon'} · ${d.date}</span>
        <div class="disp" style="font-size:36px;margin:8px 0">${d.name.replace('???', '<span style="color:var(--red)">???</span>')}</div>
        <div class="serif i" style="font-size:15px;margin-bottom:16px;opacity:.9">${d.phase === 'tease' ? 'Un nom, une date. Le reste sera révélé ici, en premier.' : 'Inscrivez-vous : les membres sont prévenus 30 minutes avant.'}</div>
        <div class="btn w" data-act="alert" data-p="${id}">${S.alerts[id] ? `${icn('check', 'width:12px')} Alerte activée` : `${ic('bell')} M’alerter du lancement`}</div>
      </div>${homebar('w')}` };
  };

  function dropTease(d) {
    return { dark: true, html: `
    <div style="position:absolute;inset:0">${img('red', { blur: 6 - d.reveal * 2 }, 'position:absolute;inset:0')}</div>
    <div class="abs-top on-photo">${sb()}${hdr(backBtn(), '<span class="logo sm">DROP #07</span>', `<span data-act="share">${ic('share')}</span>`)}
      <div style="display:flex;gap:4px;padding:0 16px">${[1, 2, 3].map((i) => `<div style="flex:1;height:2px;background:${i <= d.reveal ? '#fff' : 'rgba(255,255,255,.3)'}"></div>`).join('')}</div>
      <div class="tiny" style="text-align:center;margin-top:6px;letter-spacing:1.6px;opacity:.8">REVEAL ${d.reveal} / 3</div>
    </div>
    <div style="position:absolute;left:18px;right:18px;bottom:40px;color:#fff;z-index:5">
      <span class="kicker" style="opacity:.75">Capsule Rock Vinyl · ${d.date}</span>
      <div class="disp" style="font-size:40px;margin:8px 0">Quelque chose arrive.</div>
      <div class="serif i" style="font-size:15px;margin-bottom:10px;opacity:.95">Indice n°${d.reveal} : ${d.hints[d.reveal - 1][1].toLowerCase()}</div>
      <div data-cd="${dropAt(d)}" data-fmt="line" class="tiny" style="margin-bottom:12px;opacity:.85">${cdHTML(dropAt(d) - Date.now(), 'line')}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:14px">
        ${d.hints.map(([b], i) => { const on = i < d.reveal; return `<div style="border:1px solid ${on ? '#fff' : 'rgba(255,255,255,.35)'};padding:6px;${on ? '' : 'opacity:.6'}"><div class="tiny" style="letter-spacing:1px">INDICE ${i + 1}</div><div style="font-size:8.6px;font-weight:600;margin-top:2px">${on ? '✓ ' : icn('lock', 'width:8px;vertical-align:-1px') + ' '}${b}</div></div>`; }).join('')}
      </div>
      <div class="btn w" data-act="alert" data-p="vinyl">${S.alerts.vinyl ? `${icn('check', 'width:12px')} Vous serez alerté·e` : `${ic('bell')} M’alerter du lancement`}</div>
      <div class="tiny" style="text-align:center;margin-top:8px;opacity:.8">${(d.waiting + (S.alerts.vinyl ? 1 : 0)).toLocaleString('fr-FR')} personnes attendent · <span data-act="share" style="text-decoration:underline;cursor:pointer">Partager le teaser</span></div>
    </div>${homebar('w')}` };
  }

  function dropCountdown(d) {
    const p = prodOf(d.product);
    return { dark: true, html: `
    ${sb()}${hdr(backBtn(), '<span class="logo sm">ZADIG DROPS</span>', `<span data-act="share">${ic('share')}</span>`)}
    <div class="body" style="text-align:center">
      <div class="kicker" style="color:#888;margin-top:12px">Launch in</div>
      <div data-cd="${dropAt(d)}" data-fmt="big">${cdHTML(dropAt(d) - Date.now(), 'big')}</div>
      <div style="position:relative;height:190px;margin:12px 16px 0">${pimg(p, 'position:absolute;inset:0', { bg: '#1b1b1a', color: '#060606' })}<span class="tag r" style="position:absolute;top:8px;left:8px">Révélé</span></div>
      <div class="disp" style="font-size:17px;margin-top:12px">${p.name}</div>
      <div class="tiny" style="color:#999;margin-top:3px">${d.qty} pièces numérotées · ${eur(p.price)} · Exclusivité app</div>
      <div style="margin:12px 16px 0;border:1px solid #333;padding:9px 10px;text-align:left;display:flex;gap:10px;align-items:center" data-act="alert" data-p="rocky">
        <span style="width:24px;height:24px;border-radius:50%;${S.alerts.rocky ? 'background:#fff;color:#000' : 'border:1px solid #555'};display:grid;place-items:center">${icn(S.alerts.rocky ? 'check' : 'bell', 'width:12px')}</span>
        <div style="flex:1"><div style="font-size:8.8px;font-weight:600">${S.alerts.rocky ? 'Accès anticipé confirmé' : 'Activer mon accès anticipé'}</div><div class="tiny" style="color:#999">Membres ${tier()} · ouverture 30 min avant le public</div></div>
      </div>
      <div class="btn o" style="margin:12px 16px 0;color:#fff" data-act="toast" data-p="Ajouté au calendrier · rappel 10 min avant">${ic('cal')} Ajouter au calendrier</div>
      <div class="tiny" style="margin:14px 0 20px;color:#777;text-decoration:underline;cursor:pointer" data-act="launch">Démo : ouvrir le drop maintenant</div>
    </div>
    ${tabbar('drops')}${homebar()}` };
  }

  function dropLive(d) {
    const p = prodOf(d.product);
    const got = S.bought[p.id], inCart = S.cart.some((c) => c.id === p.id);
    return { html: `
    ${sb()}${hdr(backBtn(), `<span style="display:flex;gap:6px;align-items:center"><span class="pulse" style="width:6px;height:6px;border-radius:50%;background:var(--red)"></span><span class="htitle">Live now</span></span>`, `<span data-act="share">${ic('share')}</span>`)}
    <div class="body">
      ${pimg(p, 'height:176px;margin:0 16px', { bg: '#ebeae6' })}
      <div class="pad" style="padding-top:10px">
        <div style="display:flex;justify-content:space-between"><span class="kicker r">Drop #06 · Édition limitée</span><span class="kicker">${eur(p.price)}</span></div>
        <div class="disp" style="font-size:18px;margin:4px 0 8px">${p.name}</div>
        <div style="display:flex;justify-content:space-between;font-size:7.6px;margin-bottom:4px"><span><b id="stockn">${S.stock}</b> / ${d.qty} restantes</span><span class="muted">1 pièce par membre</span></div>
        <div class="progress"><i id="stockbar" style="width:${(S.stock / d.qty) * 100}%;transition:width .6s"></i></div>
        ${got ? `<div class="btn dis" style="margin-top:10px">✓ Pièce n°${pad(250 - S.stock)} — elle est à vous</div>`
          : `<div class="btn" style="margin-top:10px" data-act="buydrop" data-p="${p.id}">${inCart ? 'Finaliser l’achat' : `Acheter maintenant · ${eur(p.price)}`}</div>`}
        <div class="tiny muted" style="text-align:center;margin-top:5px">Paiement express · pièce réservée 10 min dans le panier</div>
      </div>
      <div style="margin:14px 0 0;padding:12px 16px 20px;border-top:6px solid var(--paper-2)">
        <div style="display:flex;justify-content:space-between;align-items:baseline"><span class="disp" style="font-size:12.5px">Après le drop</span><span class="kicker g">Post-drop content</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:8px">${img('street', {}, 'height:66px')}${img('studio', { dark: true, hair: 'bob' }, 'height:66px')}${img('party', {}, 'height:66px')}</div>
        <div class="tiny muted" style="margin-top:5px">Portés par la communauté · #ZVDrop</div>
        <div style="display:flex;gap:9px;align-items:center;margin-top:9px;border-top:1px solid var(--paper-3);padding-top:8px" data-act="story" data-p="backstage"><div style="position:relative;width:40px;height:40px;flex:none">${img('leather', {}, 'position:absolute;inset:0')}<span style="position:absolute;inset:0;display:grid;place-items:center;color:#fff">${icn('play', 'width:12px')}</span></div><div><span class="kicker g">Vidéo · 1:12</span><div style="font-size:9px;font-weight:600;margin-top:2px">Le making-of du sac Rocky Studs</div></div></div>
      </div>
    </div>
    ${tabbar('drops')}${homebar()}` };
  }

  // ---------------------------------------------------------------- COLLECTIONS
  V.collections = () => ({ html: `
    ${sb()}${hdr(backBtn(), title('Collections'), searchBtn())}
    <div class="body">
      ${D.COLLECTIONS.map((c, i) => i === 0 ? `
        <div style="position:relative;height:220px" data-go="collection" data-p="${c.id}">${img(c.scene[0], c.scene[1], 'position:absolute;inset:0')}
          <div class="ovl" style="top:60px"></div>
          <div style="position:absolute;left:16px;right:16px;bottom:14px;color:#fff"><span class="kicker" style="opacity:.75">${c.k}</span><div class="disp" style="font-size:30px;margin:5px 0">${c.name}</div><div class="tiny" style="opacity:.8">${c.meta}</div></div>
        </div>` : `
        <div style="display:flex;border-bottom:1px solid var(--paper-3);height:100px" data-go="collection" data-p="${c.id}">
          ${img(c.scene[0], { ...c.scene[1], pos: 'xMidYMin' }, 'width:128px;flex:none')}
          <div style="padding:12px 14px;display:flex;flex-direction:column;flex:1"><span class="kicker g">${c.k}</span><div class="disp" style="font-size:16px;margin:4px 0">${c.name}</div><span class="tiny muted">${c.meta}</span><span class="tiny" style="margin-top:auto;text-decoration:underline">Entrer →</span></div>
        </div>`).join('')}
      <div style="height:20px"></div>
    </div>
    ${fab()}${tabbar(curTab())}${homebar()}` });

  V.collection = ({ id }) => {
    const c = byId(D.COLLECTIONS, id);
    return { dark: true, html: `
    <div class="abs-top on-photo">${sb()}${hdr(backBtn(), `<span class="logo sm">${c.k.split('·')[0].toUpperCase()}</span>`, `<span data-act="share">${ic('share')}</span>`)}</div>
    <div class="body">
      <div style="position:relative;height:430px">${img(c.film, {}, 'position:absolute;inset:0')}<div class="ovl" style="top:180px"></div><div class="ovl-t"></div>
        <div style="position:absolute;top:150px;left:50%;transform:translateX(-50%);text-align:center;color:#fff;z-index:5" data-act="film" data-p="${id}">
          <span style="width:58px;height:58px;border-radius:50%;border:1.5px solid #fff;display:grid;place-items:center;margin:0 auto;backdrop-filter:blur(6px);background:rgba(255,255,255,.12)">${icn('play', 'width:20px')}</span>
          <div class="kicker" style="margin-top:8px">Le film · 1:32</div></div>
        <div style="position:absolute;bottom:22px;left:16px;right:16px;color:#fff"><span class="kicker" style="opacity:.75">${c.k}</span><div class="disp" style="font-size:34px;margin-top:5px">${c.name}</div></div>
      </div>
      <div class="chips" style="padding:12px 16px">${[['Manifeste', 'm'], ['Moodboard', 'mb'], ['Pièces clés', 'pk'], ['Looks', 'lk'], ['Backstage', 'bs']].map(([l, a], i) => `<span class="chip ${i ? '' : 'on'}" data-act="jump" data-p="${a}">${l}</span>`).join('')}</div>
      <div class="pad" id="a-m"><div class="serif i" style="font-size:15px;line-height:1.25;color:#ddd">${c.manifesto}</div><div class="tiny" style="color:#888;margin:8px 0 4px">— Le studio de création</div></div>
      <div id="a-mb" style="background:#fff;color:#000;padding:14px 0 16px;margin-top:14px">
        <div class="sec" style="margin-top:0"><h4>Moodboard</h4><a>Inspirations</a></div>
        <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;grid-template-rows:84px 64px 70px;gap:4px;padding:0 16px">
          <div style="grid-row:span 2;position:relative">${img('stage', { pos: 'xMidYMin' }, 'position:absolute;inset:0')}</div>
          <div style="position:relative">${img('leather', {}, 'position:absolute;inset:0')}</div>
          <div style="background:#0b0b0b;color:#fff;display:grid;place-items:center" class="serif i"><span style="font-size:16px">Night</span></div>
          <div style="grid-column:span 2;position:relative">${img('smoke', {}, 'position:absolute;inset:0')}<span class="serif i" style="position:absolute;left:8px;bottom:5px;color:#fff;font-size:15px">Smoke &amp; silver</span></div>
          <div style="position:relative">${img('gallery', {}, 'position:absolute;inset:0')}</div>
          <div style="grid-column:span 2;position:relative">${img('rooftops', {}, 'position:absolute;inset:0')}</div>
        </div>
        <div style="display:flex;gap:12px;padding:10px 16px 0;align-items:center">${[['#0b0b0b', 'Noir'], ['#9ea0a3', 'Argent'], ['#6a6865', 'Fumée'], ['#e8e2d6', 'Os'], ['#5a1a1f', 'Sang']].map(([cl, n]) => `<div style="text-align:center"><span style="display:block;width:22px;height:22px;border-radius:50%;background:${cl};border:1px solid #ddd;margin:0 auto 3px"></span><span class="tiny muted">${n}</span></div>`).join('')}</div>
        <div id="a-pk">${sec('Pièces clés', `${c.meta.match(/\d+ pièces/) ? c.meta.match(/\d+ pièces/)[0] : 'Voir tout'}`, 'data-tab="shop"')}</div>
        <div class="hscroll">${c.keys.map((x, i) => pcard({ ...prodOf(x), name: `<b>0${i + 1}</b> ${prodOf(x).name}` })).join('')}</div>
        <div id="a-lk">${sec('Les looks', 'Lookbook', 'data-go="lookbook"')}</div>
        <div class="hscroll">${c.looks.map((lid) => { const l = byId(D.LOOKS, lid); return `<div style="flex:none;width:120px" data-go="look" data-p="${l.id}">${img(l.scene[0], { ...l.scene[1], pos: 'xMidYMin' }, 'height:150px')}<div class="tiny" style="margin-top:4px;font-weight:600">LOOK ${l.n} · ${l.name}</div></div>`; }).join('')}</div>
        <div id="a-bs" style="margin:14px 16px 0;display:flex;gap:10px;align-items:center;border-top:1px solid #000;padding-top:10px" data-act="story" data-p="backstage">
          <div style="position:relative;width:52px;height:52px;flex:none">${img('backstage', {}, 'position:absolute;inset:0')}<span style="position:absolute;inset:0;display:grid;place-items:center;color:#fff">${icn('play', 'width:14px')}</span></div>
          <div><span class="kicker g">Backstage · Interview</span><div style="font-size:9px;font-weight:600;margin-top:3px">La directrice du studio raconte la collection</div></div>
        </div>
      </div>
    </div>
    ${fab()}${homebar()}` };
  };

  // ---------------------------------------------------------------- LOOKS
  V.lookbook = () => {
    const f = U.lookF;
    const list = D.LOOKS.filter((l) => f === 'Tous' || (f === 'Femme' && l.g === 'f') || (f === 'Homme' && l.g === 'm') || l.tags.includes(f.toLowerCase()));
    const cols = [list.filter((_, i) => i % 2 === 0), list.filter((_, i) => i % 2 === 1)];
    const card = (l, h) => { const tot = l.items.reduce((a, x) => a + prodOf(x).price, 0); return `
      <div data-go="look" data-p="${l.id}"><div style="position:relative;height:${h}px">${img(l.scene[0], { ...l.scene[1], pos: 'xMidYMin' }, 'position:absolute;inset:0')}<span style="position:absolute;top:7px;left:8px;font-family:var(--display);font-size:15px;color:${l.scene[1].dark || l.scene[0] === 'portrait' ? '#fff' : '#000'}">${l.n}</span>
        <span style="position:absolute;right:6px;bottom:6px;background:#fff;padding:3px 5px" class="tiny">${icn('bag', 'width:9px;vertical-align:-2px')} ${l.items.length}</span></div>
        <div style="font-size:8.8px;font-weight:600;margin-top:5px">${l.name}</div><div class="tiny muted">${l.items.length} pièces · ${eur(tot)}</div></div>`; };
    return { html: `
    ${sb()}${hdr(backBtn(), title('Lookbook'), `<span data-go="wishlist">${ic('heart')}</span>`)}
    <div class="chips" style="padding:0 16px 10px">${['Tous', 'Femme', 'Homme', 'Soir', 'Concert', 'Jour'].map((c) => `<span class="chip ${f === c ? 'on' : ''}" data-act="lookF" data-p="${c}">${c === 'Soir' ? 'Soirée' : c}</span>`).join('')}</div>
    <div class="body">
      ${list.length ? `<div style="display:flex;gap:8px;padding:0 16px 20px">${cols.map((col, ci) => `<div style="flex:1;display:flex;flex-direction:column;gap:12px">${col.map((l, i) => card(l, (i + ci) % 2 ? 168 : 218)).join('')}</div>`).join('')}</div>` : '<div class="empty"><div class="disp">Pas encore de look</div>D’autres silhouettes arrivent avec la capsule.</div>'}
    </div>
    ${fab()}${tabbar(curTab())}${homebar()}` };
  };

  V.look = ({ id }) => {
    const l = byId(D.LOOKS, id);
    const sel = U.lookSel[id] || (U.lookSel[id] = new Set(l.items));
    const tot = l.items.filter((x) => sel.has(x)).reduce((a, x) => a + prodOf(x).price, 0);
    const saved = S.wishLooks.includes(id);
    const fig = l.scene[0] === 'studio' ? { pos: 'xMidYMin', figs: [{ x: 92, y: 8, s: .58, ...l.scene[1] }], dark: l.scene[1].dark } : { ...l.scene[1] };
    const spots = l.scene[0] === 'studio' ? l.spots : [];
    return { html: `
    ${sb()}${hdr(backBtn(), title('Shop the look'), `<span data-act="wishLook" data-p="${id}">${ic(saved ? 'heartF' : 'heart')}</span>`)}
    <div class="body">
      <div style="position:relative;height:232px;margin:0 16px">${img(l.scene[0], fig, 'position:absolute;inset:0')}
        ${spots.map(([x, y], i) => `<span class="hotspot" data-go="pdp" data-p="${l.items[i]}" style="left:${x}px;top:${y}px;cursor:pointer">${i + 1}</span>`).join('')}
        <span class="tag k" style="position:absolute;left:8px;top:8px">Look ${l.n}</span>
      </div>
      <div class="pad" style="padding-top:10px"><div class="disp" style="font-size:19px">${l.name}</div><div class="tiny muted" style="margin:2px 0 6px">${l.items.length} pièces · tailles pré-remplies depuis votre profil</div></div>
      ${l.items.map((x, i) => { const p = prodOf(x); const on = sel.has(x); return `
        <div style="display:flex;gap:8px;align-items:center;padding:5px 16px;border-bottom:1px solid var(--paper-3)">
          <span style="width:12px;font-size:8px;font-weight:700">${i + 1}</span><div data-go="pdp" data-p="${x}">${pimg(p, 'width:32px;height:32px;flex:none')}</div>
          <div style="flex:1;font-size:8.2px" data-go="pdp" data-p="${x}">${p.name}<div class="tiny muted">Taille ${userSize(p)}</div></div><span style="font-size:8.2px;font-weight:600">${eur(p.price)}</span>
          <span data-act="lookItem" data-p="${id}:${x}" style="cursor:pointer;width:15px;height:15px;border:1.5px solid #000;${on ? 'background:#000;color:#fff' : ''};display:grid;place-items:center">${on ? icn('check', 'width:10px', 2.4) : ''}</span></div>`; }).join('')}
      <div style="height:14px"></div>
    </div>
    <div style="padding:9px 16px 26px;border-top:1px solid var(--paper-3)"><div class="btn ${sel.size ? '' : 'dis'}" data-act="addLook" data-p="${id}">${sel.size === l.items.length ? 'Ajouter le look complet' : `Ajouter ${sel.size} pièce${sel.size > 1 ? 's' : ''}`} · ${eur(tot)}</div>
      <div class="tiny" style="text-align:center;margin-top:6px;text-decoration:underline;cursor:pointer" data-act="wishLook" data-p="${id}">${saved ? '✓ Look enregistré dans ma wishlist' : 'Enregistrer le look dans ma wishlist'}</div></div>${homebar()}` };
  };

  // ---------------------------------------------------------------- EXPERIENCES
  V.experiences = () => {
    const f = U.expF;
    const list = D.EVENTS.filter((e) => f === 'Pour vous' || (f === 'Paris' && e.place.includes('Paris')) || (f === 'Monde' && !e.place.includes('Paris')) || (f === 'Sur invitation' && e.invite));
    const [feat, ...rest] = list;
    return { html: `
    ${sb()}${hdr(backBtn(), title('Expériences'), `<span data-go="invitations">${ic('ticket')}</span>`)}
    <div class="chips" style="padding:0 16px 10px">${['Pour vous', 'Paris', 'Monde', 'Sur invitation'].map((c) => `<span class="chip ${f === c ? 'on' : ''}" data-act="expF" data-p="${c}">${c}</span>`).join('')}</div>
    <div class="body">
      ${feat ? `<div style="position:relative;height:190px;margin:0 16px" data-go="event" data-p="${feat.id}">${img(feat.scene, {}, 'position:absolute;inset:0')}<div class="ovl" style="top:60px"></div>
        <div style="position:absolute;left:12px;right:12px;bottom:12px;color:#fff"><div style="display:flex;gap:5px"><span class="tag">${feat.type}</span>${feat.invite ? '<span class="tag r">Sur invitation</span>' : ''}${S.rsvp[feat.id] ? '<span class="tag k">✓ Inscrite</span>' : ''}</div><div class="disp" style="font-size:24px;margin:7px 0 3px">${feat.name}</div><div class="tiny" style="opacity:.85">${feat.place} · ${feat.short}</div></div></div>` : ''}
      ${rest.map((e) => `
        <div style="display:flex;gap:10px;align-items:center;padding:9px 16px;border-bottom:1px solid var(--paper-3)" data-go="event" data-p="${e.id}">
          <div style="width:28px;text-align:center"><div class="disp" style="font-size:17px">${e.dd}</div><div class="tiny muted">${e.mm}</div></div>
          ${img(e.scene, {}, 'width:46px;height:46px;flex:none')}
          <div style="flex:1"><span class="kicker g">${e.type}${S.rsvp[e.id] ? ' · ✓ inscrite' : ''}</span><div style="font-size:9px;font-weight:600;margin:2px 0 1px">${e.name}</div><div class="tiny muted">${e.place}</div></div>${icn('chev', 'width:11px', 1.4)}
        </div>`).join('')}
      <div style="height:20px"></div>
    </div>
    ${fab()}${tabbar(curTab())}${homebar()}` };
  };

  V.event = ({ id }) => {
    const e = byId(D.EVENTS, id);
    const on = S.rsvp[id];
    return { dark: true, html: `
    <div class="abs-top on-photo">${sb()}${hdr(backBtn(), '', `<span data-act="share">${ic('share')}</span>`)}</div>
    <div class="body">
      <div style="position:relative;height:260px">${img(e.scene, {}, 'position:absolute;inset:0')}<div class="ovl" style="top:120px;background:linear-gradient(transparent,#070707)"></div><div class="ovl-t"></div></div>
      <div style="padding:0 16px;margin-top:-64px;position:relative">
      <div style="display:flex;gap:5px">${e.invite ? '<span class="tag r">Sur invitation</span>' : `<span class="tag">${e.type}</span>`}${e.seats ? `<span class="tag o" style="color:#fff">${e.seats} places</span>` : ''}</div>
      <div class="disp" style="font-size:28px;margin:8px 0 12px">${e.name}</div>
      ${e.lines.map(([i, t]) => `<div style="display:flex;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid #1f1f1f;font-size:9px">${icn(i, 'width:13px;color:#aaa')}${t}</div>`).join('')}
      ${e.going ? `<div style="display:flex;align-items:center;gap:6px;margin:12px 0">
        ${['studio', 'portrait', 'street', 'party'].map((s, i) => `<div style="width:22px;height:22px;border-radius:50%;overflow:hidden;border:1.5px solid #070707;margin-left:${i ? -10 : 0}px;position:relative">${photo(s, { dark: true })}</div>`).join('')}
        <span class="tiny" style="color:#aaa">${e.going + (on ? 1 : 0)} membres y vont</span></div>` : '<div style="height:12px"></div>'}
      ${on ? `<div class="btn w" data-go="invitation" data-p="${id}">${ic('ticket')} Voir mon invitation</div><div class="tiny" style="text-align:center;color:#aaa;margin-top:6px;cursor:pointer;text-decoration:underline" data-act="rsvp" data-p="${id}">Annuler ma participation</div>`
        : `<div class="btn w" data-act="rsvp" data-p="${id}">${e.invite ? 'RSVP — Je participe' : 'Réserver ma place'}</div>`}
      <div style="display:flex;gap:8px;margin-top:8px"><div class="btn o sm" style="flex:1;color:#fff" data-act="toast" data-p="Ajouté au calendrier">${ic('cal')} Calendrier</div><div class="btn o sm" style="flex:1;color:#fff" data-act="toast" data-p="Invitation +1 envoyée par message">${ic('plus')} Inviter +1</div></div>
      <div style="height:24px"></div>
    </div></div>${homebar()}` };
  };

  const qr = (seed = 1) => {
    let s = '';
    for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      let on;
      if (finder) { const fx = x > 13 ? x - 14 : x, fy = y > 13 ? y - 14 : y; on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx > 1 && fx < 5 && fy > 1 && fy < 5); } else on = ((x * 7 + y * 13 + x * y + seed) % 5) < 2;
      s += `<i class="${on ? '' : 'w'}"></i>`;
    }
    return `<div class="qr">${s}</div>`;
  };
  V.invitation = ({ id }) => {
    const e = byId(D.EVENTS, id);
    return { html: `
    ${sb()}${hdr(backBtn(), title('Mon invitation'), '')}
    <div class="body" style="background:var(--paper-2);padding:12px 18px 0">
      <div style="background:#000;color:#fff;padding:14px 14px 12px">
        <div style="display:flex;justify-content:space-between;align-items:center">${LOGO_SM}<span class="kicker" style="opacity:.6">Invitation</span></div>
        <div class="disp" style="font-size:26px;margin:18px 0 4px">${e.name}</div>
        <div class="serif i" style="font-size:12px;opacity:.8">${e.place}</div>
      </div>
      <div style="background:#fff;padding:12px 14px;position:relative;border-top:1.5px dashed #bbb">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px 10px;font-size:8.6px">${[['Invité·e', 'Camille D. + 1'], ['Date', e.short], ['Portes', e.date.split('·')[1] || '—'], ['Accès', `Membre ${tier()}`]].map(([a, b]) => `<div><div class="tiny muted" style="letter-spacing:1px">${a.toUpperCase()}</div><b>${b}</b></div>`).join('')}</div>
        <div style="display:flex;justify-content:center;margin:14px 0 8px">${qr(id.length)}</div>
        <div class="tiny muted" style="text-align:center">Nominative · non transférable</div>
      </div>
      <div class="btn" style="margin-top:12px" data-act="toast" data-p="Invitation ajoutée au portefeuille">${ic('wallet')} Ajouter au portefeuille</div>
      <div style="display:flex;gap:9px;align-items:center;margin:10px 0 20px;font-size:8.2px;line-height:1.35">${icn('bell', 'width:14px;flex:none')}<span>${id === 'nuit' ? 'Adresse révélée le 09.10 à 21:00 — vous recevrez une notification.' : 'Un rappel vous sera envoyé la veille.'}</span></div>
    </div>${homebar()}` };
  };

  V.invitations = () => {
    const list = D.EVENTS.filter((e) => S.rsvp[e.id] || e.invite);
    return { html: `
    ${sb()}${hdr(backBtn(), title('Mes invitations'), '')}
    <div class="body">${list.map((e) => `
      <div style="display:flex;gap:10px;align-items:center;padding:10px 16px;border-bottom:1px solid var(--paper-3)" data-go="${S.rsvp[e.id] ? 'invitation' : 'event'}" data-p="${e.id}">
        ${img(e.scene, {}, 'width:50px;height:50px;flex:none')}
        <div style="flex:1"><span class="kicker ${S.rsvp[e.id] ? '' : 'r'}">${S.rsvp[e.id] ? '✓ Confirmée' : '● Réponse attendue'}</span><div style="font-size:9.2px;font-weight:600;margin-top:2px">${e.name}</div><div class="tiny muted">${e.place} · ${e.short}</div></div>${icn('chev', 'width:11px')}</div>`).join('')}
      <div class="tiny muted" style="padding:14px 16px">Les invitations sont réservées aux membres du club selon leur statut et leurs centres d’intérêt.</div>
    </div>${tabbar(curTab())}${homebar()}` };
  };

  // ---------------------------------------------------------------- CONCIERGE
  const QUICK = ['Trouver une pièce', 'Composer un look', 'Ma commande', 'Ma taille', 'Une boutique', 'Que lire ?'];
  function chatInit() {
    if (!U.chat) U.chat = [{ z: 'Bonsoir Camille. Je suis votre concierge : style, tailles, commandes, boutiques. Que puis-je faire pour vous ?' }, { chips: QUICK }];
  }
  function chatReply(text) {
    const t = text.toLowerCase();
    const o = S.orders[0];
    if (/panier|ajoute/.test(t)) { addToCart('liam', '38', true); return [{ z: 'C’est fait : le perfecto Liam en <b>38</b> est dans votre panier.' }, { chips: ['Voir le panier', 'Composer un look'] }]; }
    if (/voir le panier/.test(t)) { setTimeout(() => go('cart'), 400); return [{ z: 'J’ouvre votre panier.' }]; }
    if (/command|colis|livr|suivi/.test(t)) return [{ z: `Votre dernière commande <b>${o.id}</b> :` }, { card: 'order', id: o.id }, { chips: ['Modifier la livraison', 'Une boutique'] }];
    if (/modifier/.test(t)) return [{ z: 'Je peux la faire livrer en boutique Marais ou décaler au lendemain. Un conseiller vous rappelle si besoin.' }];
    if (/taille|size|mesure/.test(t)) return [{ z: 'Pour le perfecto Liam, coupe oversize : gardez votre <b>38</b>. D’après vos achats, c’est la bonne taille. Pour le jean slim : <b>27</b>.' }, { chips: ['Ajouter au panier en 38', 'Réserver en boutique'] }];
    if (/boutique|magasin|stock|rdv|rendez|réserver/.test(t)) return [{ z: 'La boutique Marais a votre taille en stock, à 350 m :' }, { card: 'store', id: 'marais' }];
    if (/look|tenue|concert|soir|porter|composer|pièce|piece|trouver/.test(t)) return [{ z: 'Voici trois pièces dans votre style, disponibles dans vos tailles :' }, { card: 'products', ids: ['liam', 'robe', 'cara'] }, { z: 'Ou un look complet, prêt à porter :' }, { card: 'look', id: 'l01' }, { chips: ['Plus sobre', 'Ma taille', 'Stock au Marais ?'] }];
    if (/sobre|discret/.test(t)) return [{ z: 'Plus sobre, le Blazer Vesper avec le pull cachemire :' }, { card: 'products', ids: ['vesper', 'cashmere', 'jean'] }];
    if (/lire|story|interview|musique|playlist|contenu/.test(t)) return [{ z: 'À lire et écouter ce soir :' }, { card: 'story', id: 'interview' }, { card: 'playlist', id: 'nuit' }];
    if (/drop|rocky|exclusi|sac/.test(t)) return [{ z: S.alerts.rocky ? 'Votre accès anticipé au drop Rocky Studs est confirmé.' : 'Je peux activer votre accès anticipé au drop Rocky Studs.' }, { card: 'drop', id: 'rocky' }];
    if (/cadeau|offrir/.test(t)) return [{ z: 'Trois idées cadeaux qui ne se trompent pas :' }, { card: 'products', ids: ['ring', 'belt', 'shades'] }];
    if (/merci/.test(t)) return [{ z: 'Avec plaisir. Je reste là, 24 h/24.' }];
    if (/bonjour|salut|hello|bonsoir/.test(t)) return [{ z: 'Bonsoir Camille. Que puis-je faire pour vous ?' }, { chips: QUICK }];
    return [{ z: 'Je peux trouver une pièce, composer un look, suivre une commande, conseiller une taille ou trouver une boutique.' }, { chips: QUICK }];
  }
  const chatMsg = (m) => {
    if (m.me) return `<div class="bubble me">${esc(m.me)}</div>`;
    if (m.z) return `<div class="bubble z">${m.z}</div>`;
    if (m.typing) return '<div class="bubble z typing"><i></i><i></i><i></i></div>';
    if (m.chips) return `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px">${m.chips.map((c) => `<span class="chip" style="border-radius:12px" data-act="chat" data-p="${esc(c)}">${c}</span>`).join('')}</div>`;
    const card = (inner, go) => `<div class="bubble z" style="max-width:100%;background:#fff;border:1px solid var(--paper-3);padding:6px;display:flex;gap:9px;align-items:center" ${go}>${inner}</div>`;
    if (m.card === 'products') return `<div style="display:flex;gap:6px;margin-bottom:8px">${m.ids.map((x) => pcard(prodOf(x), { w: 80, h: 84 })).join('')}</div>`;
    if (m.card === 'look') { const l = byId(D.LOOKS, m.id); return card(`${img(l.scene[0], { ...l.scene[1], pos: 'xMidYMin' }, 'width:46px;height:58px;flex:none')}<div style="flex:1"><div class="tiny muted">Look ${l.n}</div><b>${l.name}</b><div class="tiny">${l.items.length} pièces · ${eur(l.items.reduce((a, x) => a + prodOf(x).price, 0))}</div></div><span class="btn sm" style="height:24px">Voir</span>`, `data-go="look" data-p="${l.id}"`); }
    if (m.card === 'order') { const o = byId(S.orders, m.id); return `<div class="bubble z" style="max-width:100%;background:#fff;border:1px solid var(--paper-3);padding:8px" data-go="order" data-p="${o.id}">
        <div style="display:flex;gap:8px;align-items:center">${pimg(prodOf(o.items[0][0]), 'width:32px;height:32px;flex:none')}<div style="flex:1"><div class="tiny muted">Commande ${o.id}</div><b>${STATUS[o.status][0]} · ${o.status >= 2 ? 'livraison demain avant 13 h' : 'expédition sous 24 h'}</b></div></div>
        <div style="display:flex;gap:3px;margin-top:7px">${[0, 1, 2, 3, 4].map((v) => `<div style="flex:1;height:3px;background:${v <= o.status ? '#000' : '#ddd'}"></div>`).join('')}</div>
        <div class="tiny" style="margin-top:5px;text-decoration:underline">Suivre le colis</div></div>`; }
    if (m.card === 'store') { const st = byId(D.STORES, m.id); return `<div class="bubble z" style="max-width:100%;padding:0;overflow:hidden;background:#fff;border:1px solid var(--paper-3)"><div style="display:flex">${img('facade', {}, 'width:66px;height:74px;flex:none')}
        <div style="padding:7px 9px;flex:1"><div class="tiny muted">${icn('pin', 'width:9px;vertical-align:-1px')} ${st.dist} · ${st.open}</div><b>${st.name} a votre taille</b>
        <div style="display:flex;gap:5px;margin-top:6px"><span class="btn sm" style="height:22px" data-act="toast" data-p="Pièce réservée 48 h au Marais">Réserver</span><span class="btn o sm" style="height:22px" data-go="store" data-p="${st.id}">RDV</span></div></div></div></div>`; }
    if (m.card === 'story') { const s = byId(D.STORIES, m.id); return card(`${img(s.scene, { pos: 'xMidYMin' }, 'width:40px;height:40px;flex:none')}<div><div class="tiny muted">${s.rub} · ${s.fmt}</div><b>${s.short} →</b></div>`, `data-go="article" data-p="${s.id}"`); }
    if (m.card === 'playlist') return card(`${img('vinyl', {}, 'width:40px;height:40px;flex:none')}<div><div class="tiny muted">Playlist</div><b>NUIT — Noa Lenz →</b></div>`, 'data-go="playlist" data-p="nuit"');
    if (m.card === 'drop') return card(`${pimg(prodOf('rocky-noir'), 'width:40px;height:40px;flex:none', { bg: '#1b1b1a', color: '#060606' })}<div style="flex:1"><div class="tiny muted">Drop · exclusivité app</div><b>Sac Rocky Studs — Édition noire</b></div>`, 'data-go="drop" data-p="rocky"');
    return '';
  };
  V.concierge = ({ id }) => {
    chatInit();
    if (id) { setTimeout(() => sendChat(id), 350); top().p = {}; }
    return { html: `${sb()}
    <div style="display:flex;align-items:center;gap:10px;padding:2px 16px 10px;border-bottom:1px solid var(--paper-3)">
      <span data-back>${icn('back', 'width:15px')}</span><span class="zavatar" style="width:28px;height:28px;font-size:13px">Z</span>
      <div style="flex:1"><div class="htitle" style="font-size:11px">Zadig Concierge</div><div class="tiny muted"><span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#2e9e5b;margin-right:4px"></span>Styliste &amp; service · 24/7</div></div>
      <span data-act="chatReset">${icn('dots', 'width:16px')}</span>
    </div>
    <div class="body" id="chat" style="padding:10px 14px 6px">${U.chat.map(chatMsg).join('')}</div>
    <div style="display:flex;gap:8px;align-items:center;padding:8px 14px 28px;border-top:1px solid var(--paper-3)">
      <span data-act="toast" data-p="Envoyez une photo : le concierge trouve la pièce" style="width:26px;height:26px;border:1px solid #ddd;border-radius:50%;display:grid;place-items:center">${icn('cam', 'width:13px')}</span>
      <input class="chat-in" id="chatin" placeholder="Écrire au concierge…" autocomplete="off">
      <span data-act="send" style="width:30px;height:30px;border-radius:50%;background:#000;color:#fff;display:grid;place-items:center">${icn('chev', 'width:13px', 2)}</span></div>${homebar()}`,
    after: () => { const c = document.getElementById('chat'); c.scrollTop = c.scrollHeight; } };
  };
  function sendChat(text) {
    if (!text.trim()) return;
    chatInit();
    U.chat = U.chat.filter((m) => !m.chips);
    U.chat.push({ me: text }, { typing: true });
    refreshChat();
    setTimeout(() => {
      U.chat = U.chat.filter((m) => !m.typing);
      U.chat.push(...chatReply(text));
      refreshChat();
    }, 700 + Math.random() * 500);
  }
  function refreshChat() {
    const c = document.getElementById('chat');
    if (!c) return;
    c.innerHTML = U.chat.map(chatMsg).join('');
    c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' });
  }

  // ---------------------------------------------------------------- MON ZADIG
  V.profile = () => {
    const pct = Math.min(100, (S.club / 2000) * 100);
    const inv = D.EVENTS.filter((e) => e.invite && !S.rsvp[e.id]).length;
    const running = S.orders.filter((o) => o.status < 4).length;
    return { html: `
    ${sb()}
    <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 16px 12px"><span class="disp" style="font-size:28px">Mon Zadig</span><span style="display:flex;gap:12px">${bellBtn()}<span data-go="prefs">${icn('settings', 'width:17px')}</span></span></div>
    <div class="body">
      <div style="margin:0 16px;background:#000;color:#fff;padding:14px;position:relative;overflow:hidden">
        <div style="position:absolute;right:-20px;top:-20px;width:140px;height:140px;opacity:.25">${photo('leather')}</div>
        <div style="display:flex;gap:10px;align-items:center;position:relative">
          <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;position:relative;border:1.5px solid #fff">${photo('portrait', { s: 2.2, fx: -120, fy: -60 })}</div>
          <div><div style="font-weight:600;font-size:11px">Camille D.</div><div class="tiny" style="opacity:.7">Membre depuis 2023</div></div>
          <span class="tag" style="margin-left:auto">Club · ${tier()}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:7.6px;margin:14px 0 5px;position:relative"><span>${S.club.toLocaleString('fr-FR')} pts</span><span style="opacity:.7">${S.club >= 2000 ? 'Statut Icon atteint' : 'Prochain niveau : ICON · 2 000'}</span></div>
        <div class="progress" style="background:#333"><i style="width:${pct}%;background:#fff"></i></div>
      </div>
      ${S.rdv ? `<div style="margin:10px 16px 0;border:1px solid #000;padding:8px 10px;display:flex;gap:9px;align-items:center;font-size:8.4px" data-go="store" data-p="${S.rdv.store}">${icn('cal', 'width:14px')}<span style="flex:1"><b>RDV conseiller</b> · ${byId(D.STORES, S.rdv.store).name} · ${S.rdv.day} · ${S.rdv.time}</span>${icn('chev', 'width:10px')}</div>` : ''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 16px">
        ${[['box', 'Commandes', `${running} en cours`, 'orders'], ['heart', 'Wishlist', `${S.wish.length} pièces`, 'wishlist'], ['ticket', 'Invitations', inv ? `${inv} en attente` : 'À jour', 'invitations'], ['lock', 'Accès exclusifs', '2 drops', 'drops']].map(([i, n, s, to], k) => `
          <div style="border:1px solid var(--paper-3);padding:10px;position:relative" ${to === 'drops' ? 'data-tab="drops"' : `data-go="${to}"`}>${icn(i, 'width:16px')}<div style="font-weight:600;font-size:9px;margin-top:8px">${n}</div><div class="tiny muted">${s}</div>${k === 2 && inv ? '<span style="position:absolute;top:9px;right:9px;width:6px;height:6px;border-radius:50%;background:var(--red)"></span>' : ''}</div>`).join('')}
      </div>
      ${[['user', 'Profil & tailles enregistrées', 'prefs'], ['store', 'Boutiques & rendez-vous', 'stores'], ['bell', 'Notifications', 'inbox'], ['clock', 'Historique d’achats', 'orders'], ['sparkle', 'Concierge & service client', 'concierge'], ['cal', 'Expériences & événements', 'experiences']].map(([i, t, to]) => `<div class="row-i" style="padding:8px 16px" data-go="${to}"><div class="l">${ic(i)}<span>${t}</span></div>${ic('chev')}</div>`).join('')}
      ${sec(`Vos avantages ${tier()}`)}
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:0 16px">${[['drops', 'Accès anticipé aux drops'], ['scissors', 'Retouches offertes'], ['ticket', 'Soirées privées']].map(([i, t]) => `<div style="background:var(--paper-2);padding:8px 7px;font-size:7.6px;line-height:1.3">${icn(i, 'width:14px;display:block;margin-bottom:5px')}${t}</div>`).join('')}</div>
      <div class="tiny" style="text-align:center;color:#999;margin:18px 0 20px;text-decoration:underline;cursor:pointer" data-act="reset">Réinitialiser la démo</div>
    </div>
    ${tabbar('user')}${homebar()}` };
  };

  const ALERTS = { liam: ['Plus que 2 en 38', 1], rocky: ['Dispo. au Marais'], cashmere: ['De retour en stock'], cara: ['Nouveau coloris'], studs: ['Plus que 1 pièce', 1] };
  V.wishlist = () => {
    const t = U.wishT || 0;
    let content;
    if (t === 0) content = S.wish.length ? `<div class="grid2">${S.wish.map((x) => { const p = prodOf(x); const a = ALERTS[x] || ['En stock']; return pcard(p, { w: 'auto', h: 128, extra: `<div class="tiny" style="margin-top:3px;font-weight:600;${a[1] ? 'color:var(--red)' : ''}">● ${a[0]}</div><div style="display:flex;gap:4px;margin-top:5px"><span class="btn sm" style="flex:1;height:22px" data-act="quickadd" data-p="${x}">Ajouter</span></div>` }); }).join('')}</div>`
      : '<div class="empty"><div class="disp">Wishlist vide</div>Touchez le cœur d’une pièce pour la retrouver ici — et être alerté·e du stock.</div>';
    if (t === 1) content = S.wishLooks.length ? `<div class="grid2">${S.wishLooks.map((lid) => { const l = byId(D.LOOKS, lid); return `<div data-go="look" data-p="${lid}">${img(l.scene[0], { ...l.scene[1], pos: 'xMidYMin' }, 'height:160px')}<div style="font-size:8.8px;font-weight:600;margin-top:5px">${l.name}</div><div class="tiny muted">${l.items.length} pièces</div></div>`; }).join('')}</div>` : '<div class="empty"><div class="disp">Aucun look</div>Enregistrez un look depuis le Lookbook.</div>';
    if (t === 2) content = S.saved.map((sid) => { const s = byId(D.STORIES, sid); return `<div style="display:flex;gap:9px;padding:0 16px 10px" data-go="article" data-p="${sid}">${img(s.scene, { pos: 'xMidYMin' }, 'width:60px;height:60px;flex:none')}<div><span class="kicker g">${s.rub}</span><div class="serif" style="font-size:14px;line-height:1.05;margin-top:3px">${s.short}</div></div></div>`; }).join('') || '<div class="empty"><div class="disp">Aucune story</div>Enregistrez un article avec le signet.</div>';
    return { html: `
    ${sb()}${hdr(backBtn(), title('Wishlist'), `<span data-act="share">${ic('share')}</span>`)}
    <div style="display:flex;gap:16px;padding:0 16px;border-bottom:1px solid var(--paper-3)">${[`Pièces ${S.wish.length}`, `Looks ${S.wishLooks.length}`, `Stories ${S.saved.length}`].map((x, i) => `<span data-act="wishT" data-p="${i}" style="cursor:pointer;font-size:8.6px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding-bottom:7px;${i === t ? 'border-bottom:1.5px solid #000' : 'color:#aaa'}">${x}</span>`).join('')}</div>
    <div class="body" style="padding-top:10px">
      ${t === 0 && S.wish.length ? '<div style="margin:0 16px 10px;background:#000;color:#fff;padding:8px 10px;display:flex;gap:8px;align-items:center;font-size:8.4px">' + icn('bell', 'width:13px') + '<span><b>Votre wishlist a bougé</b> · alertes stock, taille et boutique actives</span></div>' : ''}
      ${content}<div style="height:20px"></div>
    </div>
    ${fab()}${tabbar(curTab())}${homebar()}` };
  };

  const STATUS = [['Confirmée', 'Nous préparons votre commande'], ['Préparée', 'Par notre atelier, Paris'], ['Expédiée', 'Transporteur express'], ['En cours de livraison', 'Demain avant 13 h'], ['Livrée', '']];
  V.orders = () => ({ html: `
    ${sb()}${hdr(backBtn(), title('Mes commandes'), '')}
    <div class="body">${S.orders.map((o) => `
      <div style="display:flex;gap:10px;align-items:center;padding:10px 16px;border-bottom:1px solid var(--paper-3)" data-go="order" data-p="${o.id}">
        ${pimg(prodOf(o.items[0][0]), 'width:50px;height:56px;flex:none')}
        <div style="flex:1"><span class="kicker ${o.status < 4 ? 'r' : 'g'}">● ${STATUS[o.status][0]}</span><div style="font-size:9.2px;font-weight:600;margin-top:2px">${o.id}</div><div class="tiny muted">${o.date} · ${o.items.length} article${o.items.length > 1 ? 's' : ''} · ${eur(o.total)}</div></div>${icn('chev', 'width:11px')}</div>`).join('')}
      <div class="row-i" style="padding:10px 16px;color:#888"><span>ZV-40177 · 12.06 · Livrée</span><span class="tiny">Racheter</span></div>
      <div class="row-i" style="padding:10px 16px;color:#888"><span>ZV-38802 · 03.03 · Livrée</span><span class="tiny">Racheter</span></div>
    </div>${tabbar(curTab())}${homebar()}` });

  V.order = ({ id }) => {
    const o = byId(S.orders, id) || S.orders[0];
    const head = ['Confirmée', 'En préparation', 'En route', 'En livraison', 'Livrée'][o.status];
    return { html: `
    ${sb()}${hdr(backBtn(), title(`Commande ${o.id}`), '')}
    <div class="body">
      <div class="pad" style="padding-top:6px">
        <span class="kicker r">● ${STATUS[o.status][0]}</span>
        <div class="disp" style="font-size:26px;margin:6px 0 2px">${head}</div>
        <div style="font-size:9px">${o.deliv === 1 ? 'Retrait en boutique Marais · <b>prêt dans 2 h</b>' : 'Livraison estimée <b>demain, avant 13 h</b>'}</div>
      </div>
      <div style="margin:12px 16px;height:70px;position:relative;overflow:hidden;background:#ecebe7">
        <svg viewBox="0 0 290 70" style="position:absolute;inset:0;width:100%;height:100%"><g stroke="#fff" stroke-width="5"><path d="M0,20 H290M0,52 H290M60,0 V70M150,0 V70M230,0 V70"/></g><path d="M20,52 H150 V20 H230" stroke="#000" stroke-width="2" fill="none" stroke-dasharray="4 3"/><circle cx="20" cy="52" r="4" fill="#000"/><circle cx="${[20, 60, 150, 190, 230][o.status]}" cy="${o.status < 2 ? 52 : o.status < 4 ? 30 : 20}" r="5" fill="var(--red)"/><rect x="224" y="14" width="12" height="12" fill="#000"/></svg>
      </div>
      <div class="stepper pad" style="padding-left:36px">${STATUS.map(([a, b], i) => `<div class="st ${i < o.status ? 'done' : i === o.status ? 'now' : 'todo'}"><b>${a}</b><span>${i <= o.status ? (i === 0 ? o.date : b) : b}</span></div>`).join('')}</div>
      ${o.items.map(([pid, s, q]) => { const p = prodOf(pid); return `<div style="display:flex;gap:9px;align-items:center;padding:4px 16px" data-go="pdp" data-p="${pid}">${pimg(p, 'width:40px;height:46px;flex:none')}<div style="flex:1;font-size:8.4px">${p.name}<div class="tiny muted">Taille ${s} · ×${q}</div></div><b style="font-size:8.4px">${eur(p.price * q)}</b></div>`; }).join('')}
      <div style="display:flex;justify-content:space-between;padding:6px 16px 10px;font-size:9px"><span class="muted">Total · retour gratuit sous 30 jours</span><b>${eur(o.total)}</b></div>
      <div style="display:flex;gap:8px;padding:0 16px"><div class="btn o sm" style="flex:1" data-go="concierge" data-p="Modifier la livraison de ma commande">Modifier la livraison</div><div class="btn o sm" style="flex:1" data-go="concierge" data-p="Ma commande">Aide</div></div>
      <div style="margin:10px 16px 20px;display:flex;gap:8px;align-items:center;background:var(--paper-2);padding:7px" data-go="article" data-p="cuir">${img('leather', {}, 'width:34px;height:34px;flex:none')}<div style="font-size:8.2px"><span class="tiny muted">En attendant</span><br><b>Bien entretenir votre cuir →</b></div></div>
    </div>${homebar()}` };
  };

  const SIZE_OPTS = { vestes: ['34', '36', '38', '40', '42'], pantalons: ['25', '26', '27', '28', '29'], chaussures: ['36', '37', '38', '39', '40'], maille: ['XS', 'S', 'M', 'L'] };
  const NOTIF_LBL = [['drops', 'Drops & lancements'], ['collections', 'Nouvelles collections'], ['journal', 'Journal & stories'], ['events', 'Événements & invitations'], ['wishlist', 'Wishlist (stock, taille)'], ['orders', 'Commandes & livraisons'], ['offers', 'Offres privées']];
  V.prefs = () => ({ html: `
    ${sb()}${hdr(backBtn(), title('Préférences'), '')}
    <div class="body">
      ${sec('Mes tailles', 'Touchez pour changer')}
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:0 16px">${[['vestes', 'Vestes'], ['pantalons', 'Jeans'], ['chaussures', 'Chauss.'], ['maille', 'Maille']].map(([k, a]) => `<div style="border:1px solid var(--paper-3);padding:7px 6px;cursor:pointer" data-act="cycleSize" data-p="${k}"><div class="tiny muted">${a}</div><div class="disp" style="font-size:16px">${S.sizes[k]}</div></div>`).join('')}</div>
      ${sec('Centres d’intérêt', 'Personnalise l’accueil')}
      <div style="display:flex;flex-wrap:wrap;gap:5px;padding:0 16px">${['Musique', 'Art', 'Cuir', 'Paris', 'Cachemire', 'Vintage', 'Homme', 'Drops'].map((x) => `<span class="chip ${S.interests.includes(x) ? 'on' : ''}" data-act="interest" data-p="${x}">${x}</span>`).join('')}</div>
      ${sec('Notifications', 'Max. 3 / semaine')}
      ${NOTIF_LBL.map(([k, t]) => `<div class="row-i" style="padding:7px 16px;cursor:pointer" data-act="np" data-p="${k}"><span>${t}</span><span class="toggle ${S.notifPrefs[k] ? '' : 'off'}"></span></div>`).join('')}
      <div class="row-i" style="padding:9px 16px" data-go="stores"><div class="l">${ic('store')}<span>Boutique favorite · <b>${byId(D.STORES, S.favStore).name.replace('Boutique ', '')}</b></span></div>${ic('chev')}</div>
      <div style="height:20px"></div>
    </div>
    ${tabbar(curTab())}${homebar()}` });

  // ---------------------------------------------------------------- BOUTIQUES
  V.stores = () => {
    const st = byId(D.STORES, U.store);
    return { html: `
    <div class="map">
      <svg viewBox="0 0 320 692" style="width:100%;height:100%">
        <rect width="320" height="692" fill="#ecebe7"/>
        <path d="M-20,420 C60,380 120,450 200,410 C260,380 300,400 340,370 L340,410 C300,440 260,420 200,452 C120,492 60,420 -20,462Z" fill="#d3d2cd"/>
        <g stroke="#fff" stroke-width="9" fill="none"><path d="M-10,150 L330,210"/><path d="M40,-10 L120,700"/><path d="M-10,300 L330,280"/><path d="M230,-10 L200,700"/><path d="M-10,560 L330,600"/></g>
        <g stroke="#fff" stroke-width="4" fill="none"><path d="M-10,90 L330,120"/><path d="M160,-10 L150,400"/><path d="M-10,230 L330,250"/><path d="M290,0 L270,400"/><path d="M80,0 L60,400"/><path d="M-10,350 L330,330"/></g>
        <g fill="#e2e1dc">${Array.from({ length: 14 }, (_, i) => `<rect x="${(i * 53) % 300}" y="${(i * 97) % 380 + 20}" width="34" height="22"/>`).join('')}</g>
        <text x="30" y="440" font-family="Inter" font-size="8" fill="#9a9994" letter-spacing="2">LA SEINE</text>
      </svg>
      ${D.STORES.map((s) => { const on = s.id === U.store; return `<div class="pin" data-act="pickStore" data-p="${s.id}" style="left:${s.x}px;top:${s.y}px;cursor:pointer;z-index:${on ? 3 : 2}"><div style="width:${on ? 30 : 22}px;height:${on ? 30 : 22}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${on ? '#000' : '#555'};display:grid;place-items:center;box-shadow:0 4px 10px rgba(0,0,0,.25);transition:all .2s"><span style="transform:rotate(45deg);color:#fff;font-family:var(--display);font-weight:700;font-size:${on ? 12 : 9}px">Z</span></div></div>`; }).join('')}
      <div style="position:absolute;left:196px;top:300px;width:14px;height:14px;border-radius:50%;background:var(--red);border:3px solid #fff" class="pulse"></div>
    </div>
    <div class="abs-top">${sb()}
      <div style="margin:0 14px;height:36px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);display:flex;align-items:center;gap:8px;padding:0 12px;font-size:9px"><span data-back>${icn('back', 'width:14px')}</span><span style="color:#888;flex:1">Boutiques autour de moi</span>${icn('loc', 'width:14px')}</div>
      <div class="chips" style="padding:8px 14px">${['Ouvert', 'Click & collect', 'Rendez-vous', 'Stock wishlist'].map((c, i) => `<span class="chip ${i === 0 ? 'on' : ''}" style="${i ? 'background:#fff' : 'background:#000'}">${c}</span>`).join('')}</div>
    </div>
    <div style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:20px 20px 0 0;padding:8px 16px 28px;box-shadow:0 -6px 24px rgba(0,0,0,.15);z-index:20">
      <div style="width:34px;height:4px;border-radius:2px;background:#ddd;margin:0 auto 10px"></div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start" data-go="store" data-p="${st.id}"><div><div class="disp" style="font-size:16px">${st.name}</div><div style="font-size:8.2px;margin-top:3px"><span style="color:#2e9e5b;font-weight:600">Ouvert</span> · ${st.open} · ${st.dist}</div></div><span data-act="fav" data-p="${st.id}">${icn(S.favStore === st.id ? 'heartF' : 'heart', 'width:16px')}</span></div>
      <div style="display:flex;gap:12px;margin:10px 0;font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#555">${[['bag', 'Click & collect'], ['scissors', 'Retouches'], ['sparkle', 'Personal shopping'], ['gift', 'Emballage']].map(([i, t]) => `<div style="text-align:center;flex:1">${icn(i, 'width:15px;display:block;margin:0 auto 3px;color:#000')}${t}</div>`).join('')}</div>
      <div style="background:var(--paper-2);padding:7px 9px;font-size:8.2px;margin-bottom:10px"><b>${st.stockWish} pièces de votre wishlist</b> sont en stock ici</div>
      <div style="display:flex;gap:8px"><div class="btn o sm" style="flex:1" data-act="toast" data-p="Itinéraire ouvert dans Plans · 5 min à pied">${ic('route')} Itinéraire</div><div class="btn sm" style="flex:1" data-go="store" data-p="${st.id}">Prendre RDV</div></div>
    </div>${homebar()}` };
  };

  const DAYS = [['Jeu', '01'], ['Ven', '02'], ['Sam', '03'], ['Lun', '05'], ['Mar', '06']];
  const SLOTS = ['11:00', '12:30', '15:00', '17:30'];
  V.store = ({ id }) => {
    const st = byId(D.STORES, id);
    const prep = U.prep[id] || (U.prep[id] = new Set(S.wish.slice(0, 3)));
    const booked = S.rdv && S.rdv.store === id;
    return { html: `
    <div class="abs-top on-photo">${sb()}${hdr(backBtn(), '', `<span data-act="share">${ic('share')}</span>`)}</div>
    <div class="body">
      ${img('facade', {}, 'height:172px')}
      <div class="pad" style="padding-top:10px">
        <div style="display:flex;justify-content:space-between;align-items:center"><div class="disp" style="font-size:17px">${st.name}</div><span class="tag ${S.favStore === id ? 'k' : 'o'}" data-act="fav" data-p="${id}" style="cursor:pointer">${S.favStore === id ? '♥ Favorite' : '♡ Favorite'}</span></div>
        <div class="tiny muted" style="margin:3px 0 8px">${st.hours} · ${st.city}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">${['Click & collect 2 h', 'Stock local', 'Personal shopping', 'Retouches', 'Réparation cuir'].map((t) => `<span class="chip">${t}</span>`).join('')}</div>
      </div>
      ${sec('Rendez-vous conseiller', '45 min')}
      <div style="display:flex;gap:6px;padding:0 16px">${DAYS.map(([d, n], i) => { const on = U.rdvDay === i; return `<div data-act="rdvDay" data-p="${i}" style="cursor:pointer;flex:1;text-align:center;padding:6px 0;border:1px solid ${on ? '#000' : 'var(--paper-3)'};${on ? 'background:#000;color:#fff' : ''}"><div class="tiny" style="opacity:.7">${d}</div><div class="disp" style="font-size:15px">${n}</div></div>`; }).join('')}</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:8px 16px">${SLOTS.map((t, i) => { const full = (i + U.rdvDay) % 4 === 3; const on = U.rdvTime === t && !full; return `<span ${full ? '' : `data-act="rdvTime" data-p="${t}"`} style="cursor:pointer;text-align:center;padding:6px 0;font-size:8.4px;border:1px solid ${on ? '#000' : 'var(--paper-3)'};${on ? 'font-weight:700' : ''}${full ? 'color:#bbb;text-decoration:line-through' : ''}">${t}</span>`; }).join('')}</div>
      <div style="display:flex;gap:9px;align-items:center;padding:4px 16px 0">
        <div style="width:32px;height:32px;border-radius:50%;overflow:hidden;position:relative">${photo('portrait', { s: 2.2, fx: -120, fy: -60, hair: 'bob' })}</div>
        <div style="font-size:8.4px"><b>${st.advisor}, conseiller·e</b><div class="tiny muted">FR · EN · IT · spécialiste cuir</div></div>
      </div>
      ${sec('À préparer en cabine', 'Depuis la wishlist')}
      <div style="display:flex;gap:6px;padding:0 16px 20px;flex-wrap:wrap">${S.wish.map((x) => { const on = prep.has(x); return `<div style="position:relative;cursor:pointer" data-act="prep" data-p="${id}:${x}">${pimg(prodOf(x), 'width:52px;height:52px')}<span style="position:absolute;top:3px;right:3px;width:12px;height:12px;background:${on ? '#000' : '#fff'};border:1px solid #000;color:#fff;display:grid;place-items:center">${on ? icn('check', 'width:8px', 3) : ''}</span></div>`; }).join('')}</div>
    </div>
    <div style="padding:9px 16px 26px;border-top:1px solid var(--paper-3)"><div class="btn" data-act="bookRdv" data-p="${id}">${booked && S.rdv.day === DAYS[U.rdvDay].join(' ') && S.rdv.time === U.rdvTime ? '✓ Rendez-vous confirmé' : `Confirmer · ${DAYS[U.rdvDay].join('. ')} · ${U.rdvTime}`}</div></div>${homebar()}` };
  };

  // ---------------------------------------------------------------- INBOX
  V.inbox = () => {
    const f = U.inboxF;
    const list = S.notifs.filter((n) => f === 'Tout' || n.cat === f);
    return { html: `
    ${sb()}${hdr(backBtn(), title('Notifications'), `<span data-go="prefs">${ic('settings')}</span>`)}
    <div class="chips" style="padding:0 16px 10px;border-bottom:1px solid var(--paper-3)">${['Tout', 'Drop', 'Journal', 'Invitation', 'Wishlist', 'Commande', 'Collection'].map((c) => `<span class="chip ${f === c ? 'on' : ''}" data-act="inboxF" data-p="${c}">${c}</span>`).join('')}</div>
    <div class="body">
      ${list.map((n) => { const i = S.notifs.indexOf(n); return `
        <div style="display:flex;gap:10px;padding:10px 16px;border-bottom:1px solid var(--paper-3);${n.u ? 'background:#faf9f7' : ''}" data-act="openNotif" data-p="${i}">
          ${n.p ? pimg(prodOf(n.p), 'width:46px;height:46px;flex:none') : img(n.s, { blur: 1 }, 'width:46px;height:46px;flex:none')}
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between"><span class="kicker ${n.cat === 'Drop' ? 'r' : 'g'}">${n.u ? '● ' : ''}${n.cat}</span><span class="tiny muted">${n.w}</span></div>
            <div style="font-size:9px;font-weight:600;margin:2px 0 1px">${n.t}</div><div class="tiny" style="color:#555;line-height:1.35">${n.b}</div>
          </div></div>`; }).join('') || '<div class="empty"><div class="disp">Rien ici</div>Aucune notification dans cette catégorie.</div>'}
      <div style="height:20px"></div>
    </div>
    ${tabbar(curTab())}${homebar()}` };
  };

  // ================================================================ countdown
  function parts(ms) {
    ms = Math.max(0, ms);
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    return { d, h, m, s, H: Math.floor(ms / 36e5) };
  }
  function cdHTML(ms, fmt) {
    const p = parts(ms);
    if (fmt === 'big') return `<div class="cd" style="margin:6px 0 2px;gap:6px">${[[pad(p.H), 'HEURES'], [pad(p.m), 'MIN'], [pad(p.s), 'SEC']].map(([v, l]) => `<div><b style="font-size:54px">${v}</b><small>${l}</small></div>`).join('<span class="sep" style="font-size:44px;line-height:1">:</span>')}</div>`;
    if (fmt === 'mini') {
      const segs = p.d ? [[pad(p.d), 'J'], [pad(p.h), 'H'], [pad(p.m), 'MIN']] : [[pad(p.H), 'H'], [pad(p.m), 'MIN'], [pad(p.s), 'SEC']];
      return `<div class="cd" style="justify-content:flex-start;gap:6px">${segs.map(([v, l]) => `<div><b style="font-size:16px">${v}</b><small>${l}</small></div>`).join('<span class="sep" style="font-size:14px">:</span>')}</div>`;
    }
    return p.d ? `Ouverture dans ${p.d} j ${pad(p.h)} h ${pad(p.m)} min` : `Ouverture dans ${pad(p.H)}:${pad(p.m)}:${pad(p.s)}`;
  }
  setInterval(() => {
    const now = Date.now();
    document.querySelectorAll('[data-cd]').forEach((el) => { el.innerHTML = cdHTML(+el.dataset.cd - now, el.dataset.fmt); });
    const rocky = dropOf('rocky');
    if (!S.dropLive && now >= dropAt(rocky)) { S.dropLive = true; save(); onDropLive(); }
    if (dropIsLive(rocky) && S.stock > 24 && Math.random() < 0.3) {
      S.stock -= 1 + Math.floor(Math.random() * 2); save();
      const n = document.getElementById('stockn'), b = document.getElementById('stockbar');
      if (n) n.textContent = S.stock;
      if (b) b.style.width = (S.stock / 250) * 100 + '%';
    }
  }, 1000);

  function onDropLive() {
    pushNotif('live');
    const t = top();
    if (['drop', 'drops', 'home'].includes(t.v)) render('tab');
  }

  // ================================================================ CRM pushes
  const PUSHES = {
    drop: { cat: 'Drop', t: 'Only 2 hours before the drop.', b: 'Sac Rocky Studs · votre accès anticipé ouvre bientôt.', s: 'red', to: 'drop:rocky' },
    live: { cat: 'Drop', t: 'The drop is live.', b: 'Sac Rocky Studs — Édition noire : 250 pièces, maintenant.', p: 'rocky-noir', to: 'drop:rocky' },
    collection: { cat: 'Collection', t: 'The new collection has arrived.', b: 'Paris After Dark : le film, les looks, 64 pièces.', s: 'rooftops', to: 'collection:ah26' },
    wishlist: { cat: 'Wishlist', t: 'Your wishlist just got an update.', b: 'Perfecto Liam : plus que 2 pièces en 38.', p: 'liam', to: 'pdp:liam' },
    order: { cat: 'Commande', t: 'Your order has shipped.', b: 'ZV-48213 arrive demain avant 13 h.', p: 'tee', to: 'order:ZV-48213' },
    zadig: { cat: 'Journal', t: 'Something new from Zadig.', b: 'Une playlist, une interview, une surprise.', s: 'vinyl', to: 'playlist:nuit' },
    invite: { cat: 'Invitation', t: 'Vous êtes invitée.', b: 'Private shopping · Marais · Lun. 26.10.', s: 'backstage', to: 'event:private' },
  };
  let pushTimer;
  function pushNotif(key, over = {}) {
    const n = { ...PUSHES[key], ...over, w: 'maintenant', u: 1 };
    S.notifs.unshift(n); save();
    const el = document.getElementById('push');
    el.innerHTML = `<div class="notif"><span class="ai">Z</span><div class="tx"><b>ZADIG&amp;VOLTAIRE <span>maintenant</span></b><div style="font-weight:600;margin-top:1px">${n.t}</div><div style="color:#333">${n.b}</div></div></div>`;
    el.dataset.to = n.to;
    el.classList.add('show');
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => el.classList.remove('show'), 5500);
    if (!['concierge', 'search'].includes(top().v)) refreshBadges();
  }
  function refreshBadges() {
    // Re-render the current view silently so bell/bag counters stay right.
    const b = document.querySelector('#viewport .body');
    const y = b ? b.scrollTop : 0;
    render('none');
    const nb = document.querySelector('#viewport .body');
    if (nb) nb.scrollTop = y;
  }

  // ================================================================ overlays
  function toast(msg, icon = 'check') {
    const t = document.getElementById('toast');
    t.innerHTML = `${ic(icon)}<span>${msg}</span>`;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function sheet(html) {
    const l = document.getElementById('layer');
    l.innerHTML = `<div class="sheet-bg" data-act="closeSheet"></div><div class="sheet"><div class="grab"></div>${html}</div>`;
    requestAnimationFrame(() => l.querySelectorAll('.sheet-bg,.sheet').forEach((e) => e.classList.add('show')));
  }
  function closeOverlays() {
    const l = document.getElementById('layer');
    if (l) l.innerHTML = '';
    clearTimeout(playerT);
  }

  const STORYSETS = {
    backstage: [{ s: 'backstage', k: 'Backstage · AH26', t: '48 h avec l’équipe du studio' }, { s: 'studio', o: { dark: true }, k: 'Shooting', t: 'Le perfecto Liam en lumière dure', prod: 'liam' }, { s: 'rooftops', k: 'Paris', t: 'Dernière prise sur les toits' }, { s: 'street', k: 'Le film', t: 'Le film complet est en ligne', cta: ['Voir le film', 'film:ah26'] }],
    drop: [{ s: 'red', o: { blur: 6 }, k: 'Drop #07', t: 'Quelque chose arrive.' }, { s: 'red', o: { blur: 2 }, k: 'Indice n°2', t: 'Des clous argent vieilli.', cta: ['Voir le teaser', 'drop:vinyl'] }],
    playlist: [{ s: 'vinyl', k: 'Playlist · Vol.12', t: 'NUIT, par Noa Lenz', cta: ['Écouter', 'playlist:nuit'] }, { s: 'stage', o: { pos: 'xMidYMin' }, k: 'Interview', t: '« Le rock, c’est une attitude »', cta: ['Lire', 'article:interview'] }],
    looks: [{ s: 'studio', o: { hair: 'long', pose: 'hip' }, k: 'Look 01', t: 'The Parisian Rock Look', cta: ['Shop the look', 'look:l01'] }, { s: 'studio', o: { dark: true, hair: 'short' }, k: 'Look 02', t: 'Rive Gauche Night', cta: ['Shop the look', 'look:l02'] }],
    paris: [{ s: 'rooftops', k: 'Paris', t: '10 adresses pour finir la nuit', cta: ['Lire', 'article:paris'] }, { s: 'street', k: 'Paris', t: 'Rive droite, 2 h du matin', cta: ['Lire', 'article:paris'] }],
  };
  let playerT;
  function storyPlayer(set, i = 0) {
    const slides = STORYSETS[set];
    const sl = slides[i];
    const l = document.getElementById('layer');
    l.innerHTML = `<div class="player">
      <div class="img kb">${photo(sl.s, sl.o || {})}</div><div class="ovl" style="top:300px;bottom:0;position:absolute"></div><div class="ovl-t" style="position:absolute"></div>
      <div style="position:absolute;top:0;left:0;right:0;z-index:5">${sb('on-photo')}
        <div class="bars">${slides.map((_, k) => `<div class="${k < i ? 'done' : k === i ? 'run' : ''}"><i></i></div>`).join('')}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px"><div style="display:flex;gap:8px;align-items:center"><span class="zavatar" style="background:#fff;color:#000">Z</span><div><div style="font-size:9px;font-weight:600">${sl.k}</div><div class="tiny" style="opacity:.7">Stories · Zadig&amp;Voltaire</div></div></div><span data-act="closeSheet" style="cursor:pointer">${icn('close', 'width:18px')}</span></div>
      </div>
      <div class="tapzone" style="left:0" data-act="storyNav" data-p="${set}:${i - 1}"></div><div class="tapzone" style="right:0" data-act="storyNav" data-p="${set}:${i + 1}"></div>
      <div style="position:absolute;left:14px;right:14px;bottom:50px;z-index:5">
        <span class="kicker" style="opacity:.75">${sl.k}</span>
        <div class="disp" style="font-size:26px;margin:6px 0 12px">${sl.t}</div>
        ${sl.prod ? `<div style="display:flex;gap:8px;align-items:center;background:#fff;color:#000;padding:5px" data-go="pdp" data-p="${sl.prod}">${pimg(prodOf(sl.prod), 'width:34px;height:34px')}<div style="flex:1"><div class="tiny muted">Vu dans la story</div><div style="font-size:8.6px;font-weight:600">${prodOf(sl.prod).name} · ${eur(prodOf(sl.prod).price)}</div></div><span class="btn sm" style="height:24px">Voir</span></div>` : ''}
        ${sl.cta ? `<div class="btn w" data-act="storyCta" data-p="${sl.cta[1]}">${sl.cta[0]}</div>` : ''}
      </div></div>`;
    clearTimeout(playerT);
    playerT = setTimeout(() => (i + 1 < slides.length ? storyPlayer(set, i + 1) : closeOverlays()), 5000);
  }
  function film(id) {
    const c = byId(D.COLLECTIONS, id);
    const l = document.getElementById('layer');
    const lines = ['Minuit, rive droite.', 'Le cuir capte la lumière des réverbères.', 'Le cachemire garde la chaleur du concert.', c.name.toUpperCase()];
    let k = 0;
    const frame = () => {
      l.innerHTML = `<div class="player">
        <div class="img kb">${photo(['rooftops', 'street', 'stage', c.film][k % 4], k === 2 ? { pos: 'xMidYMin' } : {})}</div><div class="ovl" style="position:absolute;top:0;bottom:0;background:rgba(0,0,0,.35)"></div>
        <div style="position:absolute;top:0;left:0;right:0;z-index:5">${sb('on-photo')}<div style="display:flex;justify-content:space-between;padding:6px 14px"><span class="kicker">Le film · ${c.name}</span><span data-act="closeSheet" style="cursor:pointer">${icn('close', 'width:18px')}</span></div></div>
        <div style="position:absolute;left:0;right:0;top:44%;text-align:center;z-index:5;padding:0 24px" class="${k === 3 ? 'disp' : 'serif i'}"><span style="font-size:${k === 3 ? 34 : 19}px;animation:fadeIn 1s">${lines[k]}</span></div>
        <div class="film-prog"><div class="progress" style="background:rgba(255,255,255,.3)"><i style="background:#fff;width:${k * 25}%;animation:none;transition:width 2.6s linear" id="fp"></i></div>
          <div style="display:flex;justify-content:space-between;margin-top:6px" class="tiny"><span>0:${pad(k * 23)}</span><span>1:32</span></div>
          ${k === 3 ? `<div class="btn w" style="margin-top:12px" data-act="storyCta" data-p="collection:${id}">Explorer la collection</div>` : ''}</div></div>`;
      requestAnimationFrame(() => { const fp = document.getElementById('fp'); if (fp) fp.style.width = (k + 1) * 25 + '%'; });
      if (k < 3) { k++; playerT = setTimeout(frame, 2700); }
    };
    clearTimeout(playerT);
    frame();
  }

  // ================================================================ actions
  function addToCart(id, size, silent) {
    const p = prodOf(id);
    const s = size || U.size[id] || userSize(p);
    const ex = S.cart.find((c) => c.id === id && c.s === s);
    if (ex && !p.drop) ex.q++; else if (!ex) S.cart.push({ id, s, q: 1 });
    save();
    if (!silent) toast(`${p.name} · ${s} ajouté au panier`, 'bag');
  }
  function placeOrder() {
    const items = S.cart.map((c) => [c.id, c.s, c.q]);
    const total = cartTotal();
    const id = 'ZV-' + (48214 + S.orders.length + Math.floor(Math.random() * 90));
    S.cart.forEach((c) => { if (prodOf(c.id).drop) S.bought[c.id] = true; });
    S.orders.unshift({ id, items, total, status: 0, date: '30.09', deliv: U.deliv });
    S.cart = [];
    S.club += Math.round(total / 2);
    save();
    // The order moves forward on its own, and the CRM follows it.
    setTimeout(() => { const o = byId(S.orders, id); if (o) { o.status = 1; save(); } }, 5000);
    setTimeout(() => { const o = byId(S.orders, id); if (o) { o.status = 2; save(); pushNotif('order', { b: `${id} arrive demain avant 13 h.`, to: `order:${id}`, p: items[0][0] }); if (top().v === 'order') refreshBadges(); } }, 11000);
    return id;
  }

  const A = {
    wish(id) { const i = S.wish.indexOf(id); if (i >= 0) { S.wish.splice(i, 1); toast('Retiré de la wishlist', 'heart'); } else { S.wish.push(id); toast('Ajouté à la wishlist · alertes activées', 'heartF'); } save(); refreshBadges(); },
    add(id) {
      const p = prodOf(id);
      if (p.drop) { addToCart(id, 'TU', true); go('cart'); return; }
      addToCart(id, null, true);
      const look = p.look && byId(D.LOOKS, p.look);
      sheet(`<div style="display:flex;gap:10px;align-items:center">${pimg(p, 'width:52px;height:60px;flex:none')}<div style="flex:1"><div class="kicker r">✓ Ajouté au panier</div><div style="font-size:9.6px;font-weight:600;margin-top:3px">${p.name}</div><div class="tiny muted">Taille ${U.size[id] || userSize(p)} · ${eur(p.price)}</div></div></div>
        ${look ? `<div class="kicker g" style="margin:14px 0 8px">Complétez le look ${look.n}</div><div style="display:flex;gap:6px">${look.items.filter((x) => x !== id).slice(0, 3).map((x) => pcard(prodOf(x), { w: 84, h: 84 })).join('')}</div>` : ''}
        <div style="display:flex;gap:8px;margin-top:14px"><div class="btn o" style="flex:1" data-act="closeSheet">Continuer</div><div class="btn" style="flex:1" data-go="cart">Voir le panier · ${cartCount()}</div></div>`);
      refreshBadges();
    },
    quickadd(id) { addToCart(id); refreshBadges(); },
    gal(v) { const [id, i] = v.split(':'); U.gal[id] = +i; refreshBadges(); },
    color(v) { const [id, i] = v.split(':'); U.color[id] = +i; U.gal[id] = 0; refreshBadges(); },
    size(v) { const [id, s] = v.split(':'); U.size[id] = s; refreshBadges(); },
    acc(k) { U.open[k] = !U.open[k]; refreshBadges(); },
    sizeGuide(id) {
      const p = prodOf(id);
      sheet(`<div class="disp" style="font-size:16px;margin-bottom:6px">Guide des tailles</div><div style="font-size:8.8px;line-height:1.5;color:#333">${p.fit}. D’après vos achats précédents, nous vous recommandons le <b>${userSize(p)}</b>.</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#e5e4e0;margin:12px 0;font-size:8.4px;text-align:center">${[['FR', 'Poitrine', 'Épaules'], ['36', '84 cm', '38 cm'], ['38', '88 cm', '39 cm'], ['40', '92 cm', '40 cm']].map((r, i) => r.map((c) => `<div style="background:${i ? '#fff' : '#000'};color:${i ? '#000' : '#fff'};padding:6px">${c}</div>`).join('')).join('')}</div>
        <div class="btn" data-go="concierge" data-p="Quelle taille pour ${p.name} ?">Demander au Concierge</div>`);
    },
    rm(i) { S.cart.splice(+i, 1); save(); refreshBadges(); },
    qty(v) { const [i, d] = v.split(':').map(Number); S.cart[i].q = Math.max(1, S.cart[i].q + d); save(); refreshBadges(); },
    deliv(k) { U.deliv = +k; refreshBadges(); },
    pay() {
      const b = document.getElementById('paybtn');
      b.innerHTML = '<span class="spin"></span> Paiement sécurisé…';
      b.style.pointerEvents = 'none';
      setTimeout(() => { const id = placeOrder(); stack.pop(); go('confirm', { id }); }, 1400);
    },
    home() { tab('home'); },
    shopG(g) { U.shopG = g; if (curTab() !== 'shop' || top().v !== 'shop') tab('shop'); else refreshBadges(); },
    filt(k) { U.filt = U.filt === k ? 'all' : k; refreshBadges(); },
    rub(r) { U.rub = r; refreshBadges(); },
    save(id) { const i = S.saved.indexOf(id); if (i >= 0) { S.saved.splice(i, 1); toast('Story retirée'); } else { S.saved.push(id); toast('Story enregistrée', 'bookmark'); } save(); refreshBadges(); },
    share() { toast('Lien copié · prêt à partager', 'share'); },
    toast(m) { toast(m); },
    play(i) { i = +i; U.play = i < 0 ? null : (U.play === i ? null : i); refreshBadges(); },
    dropTab(i) { U.dropTab = +i; refreshBadges(); },
    alert(id) {
      S.alerts[id] = !S.alerts[id]; save();
      toast(S.alerts[id] ? (id === 'rocky' ? 'Accès anticipé confirmé · rappel 10 min avant' : 'Alerte activée · vous serez prévenu·e en premier') : 'Alerte désactivée', 'bell');
      refreshBadges();
    },
    launch() { S.dropLive = true; save(); onDropLive(); },
    buydrop(id) { if (!S.cart.some((c) => c.id === id)) addToCart(id, 'TU', true); go('cart'); },
    lookF(f) { U.lookF = f; refreshBadges(); },
    lookItem(v) { const [id, x] = v.split(':'); const s = U.lookSel[id]; if (s.has(x)) s.delete(x); else s.add(x); refreshBadges(); },
    addLook(id) {
      const l = byId(D.LOOKS, id); const sel = U.lookSel[id];
      l.items.filter((x) => sel.has(x)).forEach((x) => addToCart(x, null, true));
      toast(`${sel.size} pièce${sel.size > 1 ? 's' : ''} du look ajoutée${sel.size > 1 ? 's' : ''} au panier`, 'bag');
      refreshBadges();
    },
    wishLook(id) { const i = S.wishLooks.indexOf(id); if (i >= 0) S.wishLooks.splice(i, 1); else { S.wishLooks.push(id); toast('Look enregistré dans la wishlist', 'heartF'); } save(); refreshBadges(); },
    expF(f) { U.expF = f; refreshBadges(); },
    rsvp(id) {
      S.rsvp[id] = !S.rsvp[id]; save();
      if (S.rsvp[id]) {
        const e = byId(D.EVENTS, id);
        sheet(`<div style="text-align:center"><div style="width:44px;height:44px;border-radius:50%;background:#000;color:#fff;display:grid;place-items:center;margin:4px auto 12px">${icn('check', 'width:20px', 2)}</div><div class="kicker g">RSVP confirmé</div><div class="disp" style="font-size:22px;margin:6px 0">${e.name}</div><div style="font-size:8.8px;color:#444;margin-bottom:14px">${e.date}<br>Votre invitation nominative est prête.</div>
          <div class="btn" data-go="invitation" data-p="${id}">${ic('ticket')} Voir mon invitation</div><div class="btn o" style="margin-top:8px" data-act="closeSheet">Fermer</div></div>`);
      } else toast('Participation annulée');
      refreshBadges();
    },
    chat(t) { sendChat(t); },
    send() { const i = document.getElementById('chatin'); sendChat(i.value); i.value = ''; },
    chatReset() { U.chat = null; refreshBadges(); },
    cycleSize(k) { const o = SIZE_OPTS[k]; S.sizes[k] = o[(o.indexOf(S.sizes[k]) + 1) % o.length]; if (k === 'vestes') S.sizes.robes = S.sizes[k]; save(); refreshBadges(); },
    interest(x) { const i = S.interests.indexOf(x); if (i >= 0) S.interests.splice(i, 1); else S.interests.push(x); save(); refreshBadges(); },
    np(k) { S.notifPrefs[k] = !S.notifPrefs[k]; save(); refreshBadges(); },
    pickStore(id) { U.store = id; refreshBadges(); },
    fav(id) { S.favStore = id; save(); toast('Boutique favorite enregistrée', 'heartF'); refreshBadges(); },
    rdvDay(i) { U.rdvDay = +i; refreshBadges(); },
    rdvTime(t) { U.rdvTime = t; refreshBadges(); },
    prep(v) { const [id, x] = v.split(':'); const s = U.prep[id]; if (s.has(x)) s.delete(x); else s.add(x); refreshBadges(); },
    bookRdv(id) {
      const st = byId(D.STORES, id);
      S.rdv = { store: id, day: DAYS[U.rdvDay].join(' '), time: U.rdvTime }; save();
      sheet(`<div style="text-align:center"><div style="width:44px;height:44px;border-radius:50%;background:#000;color:#fff;display:grid;place-items:center;margin:4px auto 12px">${icn('check', 'width:20px', 2)}</div><div class="kicker g">Rendez-vous confirmé</div><div class="disp" style="font-size:20px;margin:6px 0">${st.name}</div><div style="font-size:8.8px;color:#444;margin-bottom:14px">${DAYS[U.rdvDay].join('. ')} · ${U.rdvTime} avec ${st.advisor}<br>${U.prep[id].size} pièce${U.prep[id].size > 1 ? 's' : ''} vous attendront en cabine.</div>
        <div class="btn" data-act="toast" data-p="Ajouté au calendrier">${ic('cal')} Ajouter au calendrier</div><div class="btn o" style="margin-top:8px" data-act="closeSheet">Fermer</div></div>`);
      refreshBadges();
    },
    inboxF(f) { U.inboxF = f; refreshBadges(); },
    openNotif(i) { const n = S.notifs[+i]; n.u = 0; save(); goTo(n.to); },
    story(set) { storyPlayer(set); },
    storyNav(v) { const [set, i] = v.split(':'); const n = +i; if (n < 0) return storyPlayer(set, 0); if (n >= STORYSETS[set].length) return closeOverlays(); storyPlayer(set, n); },
    storyCta(to) { closeOverlays(); goTo(to); },
    film(id) { film(id); },
    closeSheet() { closeOverlays(); },
    jump(a) { const el = document.getElementById('a-' + a); const b = el && el.closest('.body'); if (b) b.scrollTo({ top: el.offsetTop - 10, behavior: 'smooth' }); },
    q(x) { U.q = x; const i = document.getElementById('q'); i.value = x; document.getElementById('results').innerHTML = searchResults(x); },
    wishT(i) { U.wishT = +i; refreshBadges(); },
    reset() { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } S = fresh(); save(); U.chat = null; tab('home'); toast('Démo réinitialisée'); },
  };

  // ================================================================ render
  const screenEl = () => document.getElementById('screen');
  function render(mode) {
    const t = top();
    const v = (V[t.v] || V.home)(t.p || {});
    const scr = screenEl();
    scr.classList.toggle('dark', !!v.dark);
    const vp = document.getElementById('viewport');
    vp.innerHTML = `<div class="view ${mode === 'none' ? '' : 'enter-' + mode}">${v.html}</div>`;
    const body = vp.querySelector('.body');
    if (body && body.dataset.scroll === 'home') {
      const hf = document.getElementById('hf');
      const fb = vp.querySelector('.fab');
      body.addEventListener('scroll', () => { hf.classList.toggle('solid', body.scrollTop > 380); fb.classList.toggle('collapsed', body.scrollTop > 120); }, { passive: true });
    }
    if (body && body.dataset.scroll === 'read') {
      const bar = document.getElementById('readbar');
      body.addEventListener('scroll', () => { bar.style.width = Math.min(100, (body.scrollTop / Math.max(1, body.scrollHeight - body.clientHeight)) * 100) + '%'; }, { passive: true });
    }
    if (v.after) v.after();
    updatePanel();
  }

  document.addEventListener('click', (e) => {
    const scr = screenEl();
    if (!scr.contains(e.target)) return;
    const push = e.target.closest('#push');
    if (push) { push.classList.remove('show'); const n = S.notifs.find((x) => x.to === push.dataset.to && x.u); if (n) n.u = 0; save(); goTo(push.dataset.to); return; }
    const act = e.target.closest('[data-act]');
    if (act) { e.stopPropagation(); const f = A[act.dataset.act]; if (f) f(act.dataset.p); return; }
    const bk = e.target.closest('[data-back]');
    if (bk) return back();
    const tb = e.target.closest('[data-tab]');
    if (tb) return tab(tb.dataset.tab);
    const g = e.target.closest('[data-go]');
    if (g) { if (document.querySelector('.player') && !g.closest('.sheet')) closeOverlays(); go(g.dataset.go, g.dataset.p ? { id: g.dataset.p } : {}); }
  });
  document.addEventListener('input', (e) => {
    if (e.target.id === 'q') { U.q = e.target.value; document.getElementById('results').innerHTML = searchResults(U.q); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.target.id === 'chatin' && e.key === 'Enter') A.send();
    if (e.key === 'Escape') closeOverlays();
  });

  // ================================================================ device fit
  function fit() {
    const dev = document.querySelector('.device');
    const phone = dev.querySelector('.phone');
    const scr = screenEl();
    const W = window.innerWidth, H = window.innerHeight;
    if (W <= 760) {
      const s = W / 320;
      phone.style.width = '320px'; phone.style.height = H / s + 'px';
      scr.style.height = H / s + 'px';
      dev.style.transform = `scale(${s})`;
      dev.style.transformOrigin = 'top left';
      dev.style.position = 'absolute'; dev.style.left = '0'; dev.style.top = '0';
    } else {
      phone.style.width = ''; phone.style.height = ''; scr.style.height = '';
      const stage = document.querySelector('.stage');
      const s = Math.min((stage.clientHeight - 48) / 710, (stage.clientWidth - 48) / 338, 1.45);
      dev.style.transform = `scale(${s})`;
      dev.style.transformOrigin = 'center center';
      dev.style.position = ''; dev.style.left = ''; dev.style.top = '';
    }
  }
  window.addEventListener('resize', fit);

  // ================================================================ presentation panel
  const JOURNEYS = [
    ['A', 'Article → look → achat', 'Interview, look, produit, wishlist, panier', () => { tab('stories'); go('article', { id: 'interview' }); }],
    ['B', 'Teasing → drop → achat', 'Reveal progressif, countdown, drop live', () => { tab('drops'); go('drop', { id: 'vinyl' }); }],
    ['C', 'Interview → playlist → collection', 'La culture comme porte d’entrée', () => { tab('stories'); go('playlist', { id: 'nuit' }); }],
    ['D', 'Push → événement → boutique', 'Invitation, RSVP, rendez-vous conseiller', () => { tab('home'); pushNotif('invite'); }],
    ['E', 'Concierge conversationnel', 'Style, taille, commande, boutique', () => { tab('home'); go('concierge', { id: 'Je cherche une tenue pour un concert samedi soir.' }); }],
  ];
  const SPACES = [['Home', () => tab('home')], ['Recherche', () => go('search')], ['Shop', () => tab('shop')], ['Fiche produit', () => { tab('shop'); go('pdp', { id: 'liam' }); }], ['Stories', () => tab('stories')], ['Drops', () => tab('drops')],
    ['Collections', () => { tab('shop'); go('collections'); }], ['Looks', () => { tab('shop'); go('lookbook'); }], ['Expériences', () => { tab('home'); go('experiences'); }], ['Concierge', () => go('concierge')],
    ['Mon Zadig', () => tab('user')], ['Wishlist', () => { tab('user'); go('wishlist'); }], ['Boutiques', () => { tab('user'); go('stores'); }], ['Notifications', () => { tab('home'); go('inbox'); }], ['Panier', () => go('cart')]];
  const NAMES = { home: 'Home', search: 'Recherche universelle', shop: 'Shop', catalogue: 'Catalogue', pdp: 'Fiche produit', cart: 'Panier', confirm: 'Confirmation', journal: 'Le Journal', article: 'Article', playlist: 'Playlist', drops: 'Drops', drop: 'Drop', collections: 'Collections', collection: 'Collection', lookbook: 'Lookbook', look: 'Shop the look', experiences: 'Expériences', event: 'Événement', invitation: 'Invitation', invitations: 'Invitations', concierge: 'Concierge', profile: 'Mon Zadig', wishlist: 'Wishlist', orders: 'Commandes', order: 'Suivi de commande', prefs: 'Préférences', stores: 'Store locator', store: 'Boutique', inbox: 'Notifications' };
  function panel() {
    const p = document.getElementById('panel');
    if (!p) return;
    p.innerHTML = `
      <div class="brand">ZADIG&amp;VOLTAIRE<small>App concept — démo interactive</small></div>
      <p class="lead">Prototype cliquable de l’application : naviguez dans le téléphone, ou lancez un parcours content-to-commerce ci-dessous. Panier, wishlist, RSVP et préférences sont mémorisés.</p>
      <h4>Parcours de démo</h4>
      ${JOURNEYS.map(([n, t, s], i) => `<button class="dp-journey" data-j="${i}"><b><i>${n}</i>${t}</b><span>${s}</span></button>`).join('')}
      <h4>Déclencher (CRM)</h4>
      <div class="dp-acts">
        <button data-push="drop">Push drop</button><button data-push="collection">Push collection</button>
        <button data-push="wishlist">Push wishlist</button><button data-push="zadig">Push Journal</button>
        <button class="r" data-launch>Ouvrir le drop</button><button class="o" data-reset>Réinitialiser</button>
      </div>
      <h4>Espaces</h4>
      <div class="dp-map">${SPACES.map(([n], i) => `<button data-s="${i}">${n}</button>`).join('')}</div>
      <h4>Écran actuel</h4>
      <div class="dp-now" id="now"></div>
      <div class="dp-foot">Visuels illustrés, produits, artistes et événements fictifs. Voir aussi la <a href="../index.html" style="color:#ccc">planche d’architecture</a>.</div>`;
    p.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.j) JOURNEYS[+b.dataset.j][3]();
      if (b.dataset.push) pushNotif(b.dataset.push);
      if (b.dataset.s) SPACES[+b.dataset.s][1]();
      if ('launch' in b.dataset) { A.launch(); tab('drops'); go('drop', { id: 'rocky' }); }
      if ('reset' in b.dataset) A.reset();
    });
  }
  function updatePanel() {
    const n = document.getElementById('now');
    if (!n) return;
    n.innerHTML = `<b>${NAMES[top().v] || top().v}</b><br>${stack.map((s) => NAMES[s.v] || s.v).join(' → ')}<br>Panier ${cartCount()} · Wishlist ${S.wish.length} · ${unread()} notification${unread() > 1 ? 's' : ''} non lue${unread() > 1 ? 's' : ''}`;
  }

  // ================================================================ boot
  document.body.insertAdjacentHTML('afterbegin', window.ART.DEFS);
  panel();
  fit();
  render('tab');
  // First CRM moment of the session: the drop reminder.
  if (!S.pushed.first) setTimeout(() => { S.pushed.first = 1; save(); pushNotif('drop'); }, 7000);
  window.ZV = { go, tab, back, pushNotif, state: () => S };
})();
