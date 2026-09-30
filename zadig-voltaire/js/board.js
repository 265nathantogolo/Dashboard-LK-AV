/* ZADIG & VOLTAIRE — App concept board
 * Board composition: header (concept, sitemap, navigation, journeys),
 * grouped screens, and the wires that show the paths between spaces. */
(function () {
  const { S, ic } = window.UI;

  // ------------------------------------------------------------------ data
  const ROWS = [
    [
      { n: '01', t: 'Home', role: 'Désir · Découverte', sub: 'Un magazine interactif plutôt qu’un catalogue.', shots: [
        ['01.1', 'home-hero', 'Accueil — hero de campagne', 'Campagne AH26, film, stories courtes. <em>La première impression est l’univers de marque.</em>'],
        ['01.2', 'home-feed', 'Accueil — feed éditorialisé', 'Drop à venir, produit du moment, sélection « Zadig loves… ». <em>Désir → produit.</em>'],
        ['01.3', 'home-feed-2', 'Accueil — suite du feed', 'Looks du moment, Journal, événements, exclusif app, recommandations « Pour vous ».'],
        ['01.4', 'search', 'Recherche universelle', 'Produits, looks, stories et événements dans un seul index. Recherche par photo, relais Concierge.'],
      ] },
      { n: '02', t: 'Shop', role: 'Conversion', sub: 'Un e-shop premium où le récit reste présent.', shots: [
        ['02.1', 'shop', 'Shop — univers', 'Femme / Homme, Nouveautés, Best-sellers, Éditions limitées, sélections éditoriales.'],
        ['02.2', 'catalogue', 'Catalogue & filtres', 'Filtres mémorisés (taille du profil), story insérée dans la grille. <em>Le contenu dans le commerce.</em>'],
        ['02.3', 'pdp', 'Fiche produit — galerie', 'Galerie, taille pré-sélectionnée, stock boutique et retrait en 2 h, wishlist.'],
        ['02.4', 'pdp-story', 'Fiche produit — storytelling', 'L’histoire de la pièce, savoir-faire, réparation, « porté dans le look ». <em>Panier moyen.</em>'],
      ] },
      { n: '03', t: 'Stories', role: 'Média · Brand love', sub: 'Le Journal : un média de mode, pas un blog.', shots: [
        ['03.1', 'journal', 'Le Journal — la une', 'Un numéro par mois, rubriques Mode, Musique, Art, Paris, Backstage, formats variés.'],
        ['03.2', 'article', 'Article — interview', 'Lecture immersive + module « Ce qu’elle porte » + playlist. <em>Article → produit.</em>'],
        ['03.3', 'video', 'Vidéo verticale', 'Backstage, shooting, campagne. Produit tagué dans la vidéo, film complet en swipe.'],
        ['03.4', 'playlist', 'Playlist & culture', 'Interview → playlist → collection. <em>La culture comme porte d’entrée vers le produit.</em>'],
      ] },
    ],
    [
      { n: '04', t: 'Drops', role: 'Rareté · Rétention', red: true, sub: 'Tease → reveal → countdown → drop → post-drop.', shots: [
        ['04.1', 'drops', 'Calendrier des drops', 'Lancements à venir, statut de chaque drop (tease, reveal, coming soon), alertes.'],
        ['04.2', 'tease', 'Teaser — reveal progressif', 'Trois indices dévoilés dans le temps, liste d’attente. <em>Crée l’attente et l’opt-in push.</em>'],
        ['04.3', 'countdown', 'Countdown & accès anticipé', 'Compte à rebours, pièce révélée, accès anticipé membres, rappel calendrier.'],
        ['04.4', 'drop-live', 'Drop live → achat → post-drop', 'Stock en direct, achat express, puis contenus #ZVDrop. <em>Achat → partage → nouveau contenu.</em>'],
      ] },
      { n: '05', t: 'Collections', role: 'Storytelling saisonnier', sub: 'Chaque collection est un univers.', shots: [
        ['05.1', 'collections', 'Index des collections', 'Saison, capsule, archives, collaboration : chaque entrée est une porte vers un univers.'],
        ['05.2', 'collection-film', 'Collection — film & manifeste', 'Hero campaign, film, manifeste du studio, chapitres de navigation.'],
        ['05.3', 'moodboard', 'Moodboard & pièces clés', 'Inspirations, matières, palette, pièces clés numérotées, interview backstage.'],
      ] },
      { n: '06', t: 'Looks', role: 'Panier moyen', sub: 'Des silhouettes complètes.', shots: [
        ['06.1', 'lookbook', 'Lookbook', 'Silhouettes filtrables (soirée, concert…), nombre de pièces et prix du look.'],
        ['06.2', 'shop-look', 'Shop the look', '« The Parisian Rock Look » : hotspots, 5 pièces, tailles du profil, <em>le look complet en un geste.</em>'],
      ] },
      { n: '07', t: 'Expériences', role: 'Communauté', sub: 'La marque se vit hors de l’écran.', shots: [
        ['07.1', 'experiences', 'Agenda des expériences', 'Soirées, pop-up stores, vernissages, private shopping, masterclasses.'],
        ['07.2', 'event', 'Événement — RSVP', 'Lieu révélé 24 h avant, RSVP, ajout au calendrier, invitation d’un·e ami·e.'],
        ['07.3', 'invitation', 'Invitation nominative', 'Pass QR, ajout au portefeuille, notification de révélation. <em>Fidéliser par l’expérience.</em>'],
      ] },
    ],
    [
      { n: '08', t: 'Concierge', role: 'Vente assistée', sub: 'Styliste et service client.', shots: [
        ['08.1', 'concierge', 'Concierge — style & reco', 'Trouver une pièce, composer un look selon la taille et les goûts. <em>Vente conversationnelle.</em>'],
        ['08.2', 'concierge-2', 'Concierge — service', 'Suivi de commande, conseil taille, stock en boutique, RDV, contenu recommandé.'],
      ] },
      { n: '09', t: 'Mon Zadig', role: 'Fidélisation · Data', sub: 'L’espace personnel qui alimente la personnalisation.', shots: [
        ['09.1', 'profile', 'Mon Zadig — le club', 'Statut Rock → Icon, commandes, wishlist, invitations, accès exclusifs.'],
        ['09.2', 'wishlist', 'Wishlist intelligente', 'Alertes stock, taille, boutique, coloris. <em>La wishlist devient un déclencheur CRM.</em>'],
        ['09.3', 'order', 'Suivi de commande', 'Timeline, transporteur, retours, historique, et un contenu utile pendant l’attente.'],
        ['09.4', 'prefs', 'Préférences & tailles', 'Tailles, centres d’intérêt, opt-in par type de notification : <em>la donnée qui personnalise tout.</em>'],
      ] },
      { n: '10', t: 'Boutiques', role: 'Drive-to-store', sub: 'Du digital au magasin.', shots: [
        ['10.1', 'stores', 'Store locator', 'Carte, filtres (ouvert, click & collect, RDV), stock de la wishlist en boutique.'],
        ['10.2', 'store', 'Boutique — RDV conseiller', 'Horaires, services, boutique favorite, rendez-vous avec un conseiller.'],
      ] },
      { n: '11', t: 'CRM · Notifications', role: 'Réactivation', red: true, sub: 'La notification comme canal éditorial.', panel: true, shots: [
        ['11.1', 'lock', 'Push & Live Activity', 'Countdown de drop sur l’écran verrouillé, push éditoriaux et transactionnels.'],
        ['11.2', 'inbox', 'Inbox notifications', 'Chaque notification est un contenu : image, catégorie, action directe (RSVP, voir, acheter).'],
      ] },
    ],
  ];

  // Content-to-commerce bridges between spaces: [from, to, label].
  const BRIDGES = [
    ['01.2', '02.3', 'Produit du moment'],
    ['03.2', '02.3', 'Ce qu’elle porte'],
    ['01.2', '04.1', 'Drop à venir'],
    ['01.3', '07.1', 'Événements'],
    ['02.4', '06.2', 'Porté dans le look'],
    ['03.4', '05.2', 'Playlist → collection'],
    ['04.2', '11.1', 'Opt-in → push'],
    ['06.2', '09.2', 'Look → wishlist'],
    ['04.4', '09.3', 'Achat → suivi'],
    ['08.2', '10.2', 'Stock → RDV boutique'],
    ['09.4', '11.2', 'Préférences → ciblage'],
  ];
  const LOOP = ['11.1', '01.1', 'Nouveaux contenus → retour Home · boucle de rétention'];

  // ------------------------------------------------------------------ header
  const sitemap = () => {
    const W = 2210, H = 640;
    const box = (x, y, w, h, label, sub, ref, o = {}) => `
      <g>
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.fill || '#161615'}" stroke="${o.stroke || '#55544f'}" stroke-width="1.5" ${o.dash ? 'stroke-dasharray="6 5"' : ''}/>
        <text x="${x + 18}" y="${y + (sub ? 36 : h / 2 + 10)}" font-family="Oswald" font-weight="600" font-size="${o.fs || 26}" letter-spacing="1.5" fill="${o.ink || '#fff'}">${label}</text>
        ${sub ? `<text x="${x + 18}" y="${y + 58}" font-family="Inter" font-size="13" fill="${o.sub || '#9a9994'}">${sub}</text>` : ''}
        ${ref ? `<text x="${x + w - 14}" y="${y + 26}" text-anchor="end" font-family="Oswald" font-size="15" fill="${o.refc || '#6d6c68'}">${ref}</text>` : ''}
      </g>`;
    const arrow = (d, o = {}) => `<path d="${d}" fill="none" stroke="${o.c || '#7a7975'}" stroke-width="${o.w || 1.6}" ${o.dash ? 'stroke-dasharray="7 6"' : ''} marker-end="url(#${o.m || 'mA'})"/>`;
    const engines = [
      ['SHOP', 'Produits · catalogue · fiche produit', '02'],
      ['STORIES', 'Contenus · Journal · vidéo · playlist', '03'],
      ['DROPS', 'Exclusivités · rareté · lancements', '04'],
      ['COLLECTIONS', 'Univers saisonniers · films', '05'],
      ['EXPÉRIENCES', 'Événements · invitations · RSVP', '07'],
    ];
    const ey = (i) => 40 + i * 100;
    const chain = [
      [760, 250, 'LOOKS', 'Discovery · silhouettes', '06'],
      [1070, 220, 'WISHLIST', 'Envies · alertes', '09.2'],
      [1350, 190, 'ACHAT', 'Panier · express', ''],
      [1600, 250, 'MON ZADIG', 'Club · commandes', '09'],
      [1910, 280, 'CRM / PERSO.', 'Push · inbox · reco', '11'],
    ];
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="mA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10z" fill="#7a7975"/></marker>
        <marker id="mR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10z" fill="#d23a3a"/></marker>
      </defs>
      <text x="360" y="22" font-family="Inter" font-size="12.5" letter-spacing="2.5" fill="#8b8a86">5 MOTEURS DE CONTENU QUI ALIMENTENT LE COMMERCE</text>
      <text x="760" y="196" font-family="Inter" font-size="12.5" letter-spacing="2.5" fill="#8b8a86">PARCOURS CONTENT-TO-COMMERCE</text>`;
    // HOME
    s += box(20, 232, 230, 90, 'HOME', 'Magazine interactif', '01', { fill: '#fff', ink: '#000', sub: '#555', refc: '#999', fs: 30 });
    // fan-out spine
    s += `<path d="M250,277 H300 M300,${ey(0) + 37} V${ey(4) + 37}" stroke="#7a7975" stroke-width="1.6" fill="none"/>`;
    engines.forEach(([l, sub, ref], i) => {
      s += arrow(`M300,${ey(i) + 37} H358`);
      s += box(360, ey(i), 290, 74, l, sub, ref, l === 'DROPS' ? { stroke: '#d23a3a' } : {});
    });
    // fan-in spine
    s += `<path d="M650,${ey(0) + 37} H700 M650,${ey(1) + 37} H700 M650,${ey(2) + 37} H700 M650,${ey(3) + 37} H700 M650,${ey(4) + 37} H700 M700,${ey(0) + 37} V${ey(4) + 37}" stroke="#7a7975" stroke-width="1.6" fill="none"/>`;
    s += arrow('M700,277 H758');
    chain.forEach(([x, w, l, sub, ref], i) => {
      const buy = l === 'ACHAT';
      s += box(x, 240, w, 74, l, sub, ref, buy ? { fill: '#fff', ink: '#000', sub: '#555' } : {});
      if (i < chain.length - 1) s += arrow(`M${x + w},277 H${chain[i + 1][0] - 2}`);
    });
    // Nodes under the chain: where each step lives in the app
    const notes = [
      [760, 'Shop the look · lookbook'],
      [1070, 'Alertes stock / taille / boutique'],
      [1350, 'Panier, drop express, boutique'],
      [1600, 'Préférences, tailles, invitations'],
      [1910, 'Segments · triggers · calendrier éditorial'],
    ];
    notes.forEach(([x, t]) => { s += `<text x="${x}" y="340" font-family="Inter" font-size="12.5" fill="#7d7c78">${t}</text>`; });
    // transversal layers
    s += `<rect x="760" y="392" width="700" height="56" fill="none" stroke="#8b8a86" stroke-width="1.3" stroke-dasharray="4 5"/>
      <text x="780" y="416" font-family="Oswald" font-weight="600" font-size="19" letter-spacing="1.5" fill="#fff">CONCIERGE ZADIG <tspan font-family="Inter" font-weight="400" font-size="12.5" fill="#8b8a86" letter-spacing="0">  08 · transversal, accessible depuis chaque écran</tspan></text>
      <text x="780" y="437" font-family="Inter" font-size="12.5" fill="#b3b2ad">Recherche · style · taille · commande · livraison · boutique · contenu</text>
      <rect x="1490" y="392" width="700" height="56" fill="none" stroke="#8b8a86" stroke-width="1.3" stroke-dasharray="4 5"/>
      <text x="1510" y="416" font-family="Oswald" font-weight="600" font-size="19" letter-spacing="1.5" fill="#fff">BOUTIQUES <tspan font-family="Inter" font-weight="400" font-size="12.5" fill="#8b8a86" letter-spacing="0">  10 · drive-to-store</tspan></text>
      <text x="1510" y="437" font-family="Inter" font-size="12.5" fill="#b3b2ad">Stock local · click &amp; collect · RDV conseiller · boutique favorite</text>
      <text x="760" y="486" font-family="Inter" font-size="12.5" fill="#7d7c78">Recherche universelle (01.4) et Concierge restent à un geste depuis la barre de navigation.</text>`;
    // retention loop
    s += `<path d="M2050,314 V590 H135 V326" fill="none" stroke="#d23a3a" stroke-width="2" stroke-dasharray="8 6" marker-end="url(#mR)"/>
      <rect x="880" y="574" width="560" height="32" fill="#111110"/>
      <text x="1160" y="596" text-anchor="middle" font-family="Inter" font-weight="600" font-size="13.5" letter-spacing="2.2" fill="#e05656">NOUVEAUX CONTENUS → RETOUR HOME · BOUCLE DE RÉTENTION</text>`;
    return s + '</svg>';
  };

  const header = () => `
    <header class="b-head">
      <div class="b-brand-col">
        <div class="b-brand">ZADIG&amp;VOLTAIRE<small>MOBILE ECOSYSTEM — APP CONCEPT</small></div>
        <p class="b-lead">L’application pensée comme <b>un média propriétaire</b> de la marque, pas seulement comme une boutique. Stories, Drops, Looks et Expériences ne sont pas des rubriques décoratives :
          <b>ce sont les moteurs qui alimentent le commerce</b>. Une interview mène à une playlist, puis à une collection, puis à des pièces. On passe d’une app de marque à un <b>média de mode transactionnel</b>.</p>
        <div class="b-pillars">${['E-commerce', 'Contenu éditorial', 'Storytelling', 'Lancements & drops', 'CRM', 'Personnalisation', 'Fidélisation', 'Service client', 'Communauté'].map((p, i) => `<span class="${i === 0 ? 'on' : ''}">${p}</span>`).join('')}</div>
        <div class="b-meta"><span><b>34</b>écrans</span><span><b>11</b>espaces</span><span><b>5</b>entrées de navigation</span><span><b>1</b>boucle CRM</span></div>
      </div>
      <div class="sitemap"><div class="b-h"><b>Arborescence</b><span>Du contenu au commerce, du commerce à la fidélité</span></div>${sitemap()}</div>
      <div class="b-side">
        <div class="b-h"><b>Navigation principale</b><span>5 entrées + recherche + concierge</span></div>
        <div class="navspec">${[['home', 'HOME', 1], ['shop', 'SHOP'], ['stories', 'STORIES'], ['drops', 'DROPS'], ['user', 'MON ZADIG']].map(([i, l, on]) => `<div class="it ${on ? 'on' : ''}">${ic(i, '', 1.6)}<span>${l}</span></div>`).join('')}</div>
        <div class="navspec-notes">
          <div><b>Recherche</b>Dans le header de chaque espace : produits, looks, stories, événements, recherche par photo.</div>
          <div><b>Concierge</b>Bouton flottant « Z » présent partout : style, taille, commande, boutique.</div>
          <div><b>Collections · Looks</b>Accessibles depuis Shop, Home et chaque story.</div>
          <div><b>Expériences · Boutiques</b>Depuis Home, Mon Zadig, les invitations et le Concierge.</div>
        </div>
        <div class="journeys">
          <div class="b-h"><b>Passerelles content-to-commerce</b><span>Parcours types</span></div>
          ${[
            ['A', ['Article 03.2', 'Inspiration', 'Look 06.2', 'Produits 02.3', 'Wishlist 09.2', 'Achat']],
            ['B', ['Teasing 04.2', 'Drop 04.3', 'Exclusivité', 'Achat', 'Partage #ZVDrop', 'Nouveau contenu']],
            ['C', ['Interview 03.2', 'Univers', 'Playlist 03.4', 'Collection 05.2', 'Produits', 'Achat']],
            ['D', ['Push 11.1', 'Événement 07.2', 'Invitation 07.3', 'Boutique 10.2', 'Achat']],
          ].map(([n, steps]) => `<div class="journey"><span class="jn">${n}</span>${steps.map((st) => `<span class="s ${st === 'Achat' ? 'buy' : ''}">${st}</span>`).join('<i>→</i>')}</div>`).join('')}
        </div>
        <div class="legend">
          <span><svg width="46" height="12"><path d="M2,6 H40" stroke="#6f6e6a" stroke-width="1.6"/><path d="M36,2 L42,6 L36,10" fill="none" stroke="#6f6e6a" stroke-width="1.6"/></svg>Parcours dans un espace</span>
          <span><svg width="46" height="12"><path d="M2,6 H40" stroke="#d23a3a" stroke-width="2" stroke-dasharray="6 4"/><path d="M36,2 L42,6 L36,10" fill="none" stroke="#d23a3a" stroke-width="2"/></svg>Passerelle entre espaces</span>
          <span><span class="lg-em">Rouge</span>Rôle marketing de l’écran</span>
        </div>
      </div>
    </header>`;

  // ------------------------------------------------------------------ CRM panel
  const crmPanel = () => `
    <div class="panel">
      <div class="p-k">Calendrier éditorial · une semaine de drop</div>
      <div class="p-t">La notification comme canal éditorial et commercial</div>
      <div class="p-days">
        ${[
          ['LUN', 'Journal', 'Something new from Zadig.', 'Push éditorial · segment Musique', '03.2'],
          ['MAR', 'Collection', 'The new collection has arrived.', 'Push riche + inbox · toute la base', '05.2'],
          ['MER', 'Teasing', 'Indice n°2 révélé.', 'Push + inbox · inscrits au drop', '04.2'],
          ['JEU', 'Invitation', 'Vous êtes invitée.', 'Inbox + portefeuille · membres Rock', '07.3'],
          ['VEN', 'Countdown', 'Only 2 hours before the drop.', 'Live Activity · inscrits au drop', '04.3', 1],
          ['SAM', 'Wishlist', 'Your wishlist just got an update.', 'Trigger stock / taille / boutique', '09.2'],
          ['DIM', 'Commande', 'Your order has shipped.', 'Transactionnel + contenu d’attente', '09.3'],
        ].map(([d, c, t, ch, ref, hot]) => `
          <div class="p-day ${hot ? 'hot' : ''}"><span class="d">${d}</span><span class="c">${c}</span><span class="m">“${t}”<small>${ch}</small></span><span class="ref">→ ${ref}</span></div>`).join('')}
      </div>
      <div class="p-cols">
        <div><div class="p-h">Signaux de personnalisation</div><div class="p-chips">${['Taille', 'Centres d’intérêt', 'Wishlist', 'Boutique favorite', 'Historique', 'Statut club', 'Contenus lus', 'Heure d’ouverture'].map((c) => `<span>${c}</span>`).join('')}</div></div>
        <div><div class="p-h">Règles éditoriales</div><ul><li>3 push / semaine maximum</li><li>1 contenu pour 1 message commercial</li><li>Jamais deux push commerciaux d’affilée</li><li>Transactionnel toujours enrichi d’un contenu</li></ul></div>
      </div>
      <div class="p-kpi">${[['Opt-in push', 'Taux d’inscription aux drops'], ['Fréquence', 'Visites / membre / semaine'], ['Content → commerce', 'Ventes issues d’un contenu'], ['Valeur client', 'Passage Rock → Icon']].map(([a, b]) => `<div><b>${a}</b>${b}</div>`).join('')}</div>
    </div>`;

  // ------------------------------------------------------------------ render
  const shot = ([id, key, t, d]) => `<div class="shot" data-id="${id}">${S[key]()}<div class="cap"><div class="id">${id}</div><h3>${t}</h3><p>${d}</p></div></div>`;
  const group = (g) => `
    <section class="group" data-g="${g.n}">
      <div class="g-title"><span class="n">${g.n}</span><h2>${g.t.toUpperCase()}</h2><span class="role ${g.red ? 'red' : ''}">${g.role}</span></div>
      <div class="g-sub"><span>${g.sub}</span></div>
      <div class="g-screens">${g.shots.map(shot).join('')}${g.panel ? crmPanel() : ''}</div>
    </section>`;

  const board = document.getElementById('board');
  board.innerHTML = window.ART.DEFS + header() + ROWS.map((r) => `<div class="row">${r.map(group).join('')}</div>`).join('') +
    `<footer class="b-foot"><span>Zadig&amp;Voltaire — App concept · Planche d’architecture UX/UI</span><span>Visuels et noms de produits, artistes et événements fictifs, à titre d’illustration</span></footer>`;

  // ------------------------------------------------------------------ wires
  function drawWires() {
    const bRect = board.getBoundingClientRect();
    const rel = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - bRect.left, y: r.top - bRect.top, w: r.width, h: r.height, r: r.right - bRect.left, b: r.bottom - bRect.top };
    };
    const shotEl = (id) => board.querySelector(`.shot[data-id="${id}"]`);
    const rows = [...board.querySelectorAll('.row')].map(rel);
    const rowOf = (id) => [...board.querySelectorAll('.row')].indexOf(shotEl(id).closest('.row'));
    const rowBottom = (i) => Math.max(...[...board.querySelectorAll('.row')[i].querySelectorAll('.shot')].map((s) => rel(s).b));

    let svg = `<svg id="wires" width="${bRect.width}" height="${bRect.height}" viewBox="0 0 ${bRect.width} ${bRect.height}">
      <defs>
        <marker id="wA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10z" fill="#6f6e6a"/></marker>
        <marker id="wR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10z" fill="#d23a3a"/></marker>
      </defs>`;

    // Sequential arrows inside each group.
    board.querySelectorAll('.g-screens').forEach((gs) => {
      const shots = [...gs.querySelectorAll('.shot')];
      shots.slice(0, -1).forEach((s, i) => {
        const a = rel(s.querySelector('.phone')), b = rel(shots[i + 1].querySelector('.phone'));
        const y = a.y + a.h / 2;
        svg += `<path d="M${a.r + 6},${y} H${b.x - 6}" stroke="#6f6e6a" stroke-width="1.6" marker-end="url(#wA)"/>`;
      });
    });

    // Bridges: routed through the gutter below the source row.
    const lanes = {};
    const outCount = {}, inCount = {}, outIdx = {}, inIdx = {};
    BRIDGES.forEach(([f, t]) => { outCount[f] = (outCount[f] || 0) + 1; inCount[t] = (inCount[t] || 0) + 1; });
    const spread = (n, i) => (i - (n - 1) / 2) * 46;
    BRIDGES.forEach(([f, t, label]) => {
      const fr = rowOf(f), tr = rowOf(t);
      lanes[fr] = (lanes[fr] || 0) + 1;
      const laneY = rowBottom(fr) + 26 + (lanes[fr] - 1) * 30;
      outIdx[f] = (outIdx[f] || 0) + 1; inIdx[t] = (inIdx[t] || 0) + 1;
      const fs = rel(shotEl(f)), ts = rel(shotEl(t));
      const fp = rel(shotEl(f).querySelector('.phone')), tp = rel(shotEl(t).querySelector('.phone'));
      const x1 = fs.x + fs.w / 2 + spread(outCount[f], outIdx[f] - 1);
      const x2 = ts.x + ts.w / 2 + spread(inCount[t], inIdx[t] - 1);
      const y1 = fs.b + 6;
      const y2 = tr === fr ? ts.b + 8 : tp.y - 6;
      svg += `<path d="M${x1},${y1} V${laneY} H${x2} V${y2}" fill="none" stroke="#d23a3a" stroke-width="2" stroke-dasharray="7 5" marker-end="url(#wR)"/>
        <circle cx="${x1}" cy="${y1}" r="3.5" fill="#d23a3a"/>`;
      const dir = x2 >= x1 ? 1 : -1;
      const lx = x1 + dir * 14;
      const tw = label.length * 7.4 + 22;
      const rx = dir > 0 ? lx : lx - tw;
      svg += `<rect x="${rx}" y="${laneY - 11}" width="${tw}" height="22" fill="#111110" stroke="#d23a3a" stroke-width="1.2"/>
        <text x="${rx + tw / 2}" y="${laneY + 4}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" letter-spacing="1.2" fill="#ec6b6b">${label.toUpperCase()}</text>`;
      void fp;
    });

    // Retention loop: CRM back to Home, along the right margin.
    const [lf, lt, ll] = LOOP;
    const fr = rowOf(lf);
    lanes[fr] = (lanes[fr] || 0) + 1;
    const ly = rowBottom(fr) + 26 + (lanes[fr] - 1) * 30;
    const fsl = rel(shotEl(lf)), tpl = rel(shotEl(lt).querySelector('.phone')), g0 = rel(board.querySelector('.row .group'));
    const xR = bRect.width - 52;
    const yTop = g0.y - 34;
    const xh = tpl.x + tpl.w / 2;
    svg += `<path d="M${fsl.x + fsl.w / 2},${fsl.b + 6} V${ly} H${xR} V${yTop} H${xh} V${tpl.y - 6}" fill="none" stroke="#d23a3a" stroke-width="2.4" stroke-dasharray="10 6" marker-end="url(#wR)"/>
      <circle cx="${fsl.x + fsl.w / 2}" cy="${fsl.b + 6}" r="4" fill="#d23a3a"/>`;
    const tw = ll.length * 7.6 + 30;
    const lx = bRect.width / 2 - tw / 2;
    svg += `<rect x="${lx}" y="${yTop - 13}" width="${tw}" height="26" fill="#111110" stroke="#d23a3a" stroke-width="1.4"/>
      <text x="${lx + tw / 2}" y="${yTop + 5}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="12" letter-spacing="1.6" fill="#ec6b6b">${ll.toUpperCase()}</text>`;
    // mirror label on the bottom run
    const bx = (fsl.x + fsl.w / 2 + xR) / 2 - tw / 2;
    svg += `<rect x="${bx}" y="${ly - 13}" width="${tw}" height="26" fill="#111110" stroke="#d23a3a" stroke-width="1.4"/>
      <text x="${bx + tw / 2}" y="${ly + 5}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="12" letter-spacing="1.6" fill="#ec6b6b">${ll.toUpperCase()}</text>`;

    svg += '</svg>';
    board.insertAdjacentHTML('beforeend', svg);
    void rows;
  }

  document.fonts.ready.then(() => requestAnimationFrame(() => { drawWires(); document.body.dataset.ready = '1'; }));
})();
