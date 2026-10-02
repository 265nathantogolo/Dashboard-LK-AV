/* ZADIG & VOLTAIRE — App demo
 * Catalogue, contents, drops, events and stores used by the prototype.
 * Every name (products, artists, events, customer) is fictional. */
(function () {
  const P = [
    { id: 'liam', name: 'Perfecto Liam', kind: 'jacket', cat: 'vestes', g: 'f', price: 695, badge: 'Nouveau', colors: ['#000', '#5a1a1f'], sizes: ['34', '36', '38', '40', '42'], out: ['42'],
      mat: 'Cuir d’agneau plongé', story: '« Une pièce qui se patine avec vous, concert après concert. »',
      text: 'Cuir d’agneau plongé, doublure imprimée, zips argent vieilli. Coupe légèrement oversize, dessinée à Paris par le studio pour être portée longtemps.', fit: 'Oversize — prenez votre taille', stock: 3, look: 'l01' },
    { id: 'studs', name: 'Perfecto clouté', kind: 'jacket', color: '#262626', cat: 'vestes', g: 'f', price: 890, badge: 'Édition limitée', red: true, sizes: ['34', '36', '38', '40'], out: ['34'],
      mat: 'Cuir de veau, clous argent', story: '« Chaque clou est posé à la main. »', text: 'Perfecto en cuir de veau rehaussé de clous argent vieilli posés à la main. 300 pièces numérotées.', fit: 'Ajusté — prenez une taille au-dessus', stock: 1, look: 'l03' },
    { id: 'vesper', name: 'Blazer Vesper cuir', kind: 'blazer', cat: 'vestes', g: 'f', price: 795, sizes: ['34', '36', '38', '40', '42'], mat: 'Cuir d’agneau', story: '« Le tailleur, version nuit blanche. »',
      text: 'Blazer en cuir d’agneau, revers satin, boutons argent. La pièce qui passe du bureau au concert.', fit: 'Droit — prenez votre taille', stock: 2, look: 'l04' },
    { id: 'stan', name: 'Veste Stan', kind: 'jacket', color: '#1c1c1c', cat: 'vestes', g: 'm', price: 650, sizes: ['S', 'M', 'L', 'XL'], mat: 'Cuir de chèvre', story: '« Une veste de musicien, sans la scène. »',
      text: 'Veste en cuir de chèvre au grain marqué, col officier, coupe droite.', fit: 'Droite — prenez votre taille', stock: 4, look: 'l02' },
    { id: 'tee', name: 'Tee Rock', kind: 'tee', cat: 'tshirts', g: 'f', price: 95, sizes: ['XS', 'S', 'M', 'L'], mat: 'Coton bio', story: '« Rock never dies. »', text: 'T-shirt en coton bio, sérigraphie à la main, coupe boyfriend.', fit: 'Ample', stock: 9, look: 'l01' },
    { id: 'tee-m', name: 'Tee Nuit', kind: 'tee', cat: 'tshirts', g: 'm', price: 85, sizes: ['S', 'M', 'L', 'XL'], mat: 'Coton flammé', story: '« Le t-shirt du lendemain. »', text: 'T-shirt en coton flammé délavé, imprimé serif.', fit: 'Droit', stock: 12, look: 'l02' },
    { id: 'jean', name: 'Jean slim noir', kind: 'jeans', cat: 'pantalons', g: 'f', price: 175, sizes: ['25', '26', '27', '28', '29'], mat: 'Denim stretch', story: '« Le noir qui ne délave pas. »', text: 'Jean slim taille haute, denim noir stretch teint dans la masse.', fit: 'Slim', stock: 8, look: 'l01' },
    { id: 'jean-m', name: 'Jean droit', kind: 'jeans', color: '#2a2a2a', cat: 'pantalons', g: 'm', price: 165, sizes: ['29', '30', '31', '32', '33'], mat: 'Denim brut', story: '« Il prend votre forme. »', text: 'Jean droit en denim brut japonais.', fit: 'Droit', stock: 6, look: 'l02' },
    { id: 'cashmere', name: 'Pull cachemire', kind: 'sweater', cat: 'maille', g: 'f', price: 345, badge: 'Best-seller', sizes: ['XS', 'S', 'M', 'L'], mat: '100 % cachemire', story: '« La chaleur du concert, gardée pour après. »', text: 'Pull en cachemire, motif chevrons intarsia, bords côtes.', fit: 'Légèrement ample', stock: 5, look: 'l04' },
    { id: 'cashmere-m', name: 'Pull cachemire col V', kind: 'sweater', color: '#8e8c87', cat: 'maille', g: 'm', price: 365, sizes: ['S', 'M', 'L', 'XL'], mat: '100 % cachemire', story: '« Le col V, sans compromis. »', text: 'Pull col V en cachemire, finitions bord-côte.', fit: 'Droit', stock: 3 },
    { id: 'robe', name: 'Robe nuit satin', kind: 'dress', cat: 'robes', g: 'f', price: 325, sizes: ['34', '36', '38', '40'], mat: 'Satin de soie', story: '« Pour les nuits qui finissent au matin. »', text: 'Robe nuisette en satin, fines bretelles, longueur midi.', fit: 'Fluide', stock: 4, look: 'l03' },
    { id: 'rocky', name: 'Sac Rocky Studs', kind: 'bag', cat: 'sacs', g: 'f', price: 690, badge: 'Best-seller', sizes: ['TU'], mat: 'Cuir grainé, clous', story: '« Le sac qui fait du bruit. »', text: 'Sac porté main ou épaule en cuir grainé, clous argent, chaîne amovible.', fit: '28 × 20 × 10 cm', stock: 3, look: 'l04' },
    { id: 'rocky-noir', name: 'Sac Rocky Studs — Édition noire', kind: 'bag', cat: 'sacs', g: 'f', price: 890, badge: 'Drop', red: true, sizes: ['TU'], mat: 'Cuir noir, clous noirs', story: '« 250 pièces, numérotées. »', text: 'Le Rocky Studs en version totale noire : cuir, clous et chaîne. Édition limitée à 250 pièces numérotées, exclusivité app.', fit: '28 × 20 × 10 cm', stock: 187, drop: 'rocky' },
    { id: 'cara', name: 'Boots Cara', kind: 'boots', cat: 'chaussures', g: 'f', price: 395, sizes: ['36', '37', '38', '39', '40'], mat: 'Cuir de veau', story: '« Faites pour marcher toute la nuit. »', text: 'Boots en cuir de veau, talon 4 cm, boucle argent.', fit: 'Taille normalement', stock: 4, look: 'l01' },
    { id: 'belt', name: 'Ceinture cloutée', kind: 'belt', cat: 'accessoires', g: 'f', price: 125, sizes: ['75', '80', '85', '90'], mat: 'Cuir, métal argent', story: '« Le détail qui signe. »', text: 'Ceinture en cuir, boucle et clous argent vieilli.', fit: 'Taille de hanche', stock: 7, look: 'l01' },
    { id: 'shades', name: 'Solaires Nuit', kind: 'sunglasses', cat: 'accessoires', g: 'f', price: 220, sizes: ['TU'], mat: 'Acétate', story: '« Même la nuit. »', text: 'Solaires en acétate noir, verres fumés.', fit: 'Taille unique', stock: 6, look: 'l04' },
    { id: 'ring', name: 'Bague Studs', kind: 'ring', cat: 'accessoires', g: 'f', price: 150, sizes: ['52', '54', '56'], mat: 'Argent 925', story: '« À porter en pile. »', text: 'Bague en argent 925 surmontée d’un clou pyramide.', fit: 'Taille normalement', stock: 5 },
  ];

  const CATS = [
    ['vestes', 'Vestes & Cuirs', 'jacket'], ['maille', 'Maille & Cachemire', 'sweater'], ['tshirts', 'T-shirts', 'tee'],
    ['pantalons', 'Pantalons & Jeans', 'jeans'], ['robes', 'Robes', 'dress'], ['sacs', 'Sacs', 'bag'],
    ['chaussures', 'Chaussures', 'boots'], ['accessoires', 'Accessoires', 'belt'],
  ];

  const LOOKS = [
    { id: 'l01', n: '01', name: 'The Parisian Rock Look', g: 'f', tags: ['concert', 'soir'], scene: ['studio', { hair: 'long', pose: 'hip' }], items: ['liam', 'tee', 'jean', 'cara', 'belt'],
      spots: [[150, 92], [137, 72], [128, 168], [120, 208], [150, 128]] },
    { id: 'l02', n: '02', name: 'Rive Gauche Night', g: 'm', tags: ['soir'], scene: ['studio', { dark: true, hair: 'short', pose: 'pocket' }], items: ['stan', 'tee-m', 'jean-m', 'cara'],
      spots: [[150, 96], [140, 74], [132, 170], [124, 210]] },
    { id: 'l03', n: '03', name: 'Silver Studs', g: 'f', tags: ['concert'], scene: ['studio', { hair: 'bob', pose: 'hip' }], items: ['studs', 'robe', 'cara', 'ring'],
      spots: [[152, 94], [138, 150], [122, 208], [168, 122]] },
    { id: 'l04', n: '04', name: 'Backstage Pass', g: 'f', tags: ['jour'], scene: ['portrait', { hair: 'hat', lx: .4 }], items: ['vesper', 'cashmere', 'jean', 'rocky', 'shades'],
      spots: [[160, 120], [150, 150], [140, 210], [190, 170], [150, 60]] },
  ];

  const STORIES = [
    { id: 'interview', rub: 'Musique', fmt: 'Interview', time: '6 min', scene: 'stage', title: '« Le rock, c’est une attitude, pas un costume. »', short: 'Le rock, c’est une attitude',
      sub: 'Rencontre avec Noa Lenz, guitariste', by: 'Par la rédaction · Photos Studio Z',
      body: ['Avant de monter sur scène, Noa Lenz ferme les yeux et enfile sa veste. « C’est mon armure. Le cuir garde la mémoire de chaque concert. » Rencontre dans les loges, une heure avant le show.',
        'Elle parle de Paris la nuit, des salles où elle a grandi, des vestes qu’on se prête entre musiciens. « Je n’achète pas de vêtements, j’adopte des pièces. »'],
      quote: '« Paris la nuit m’a appris à m’habiller pour moi. »', products: ['liam', 'cara'], playlist: 'nuit', look: 'l01' },
    { id: 'backstage', rub: 'Backstage', fmt: 'Vidéo', time: '0:45', scene: 'backstage', title: '48 h avec l’équipe du studio', short: 'Backstage du shooting AH26', video: true, products: ['liam'] },
    { id: 'atelier', rub: 'Art', fmt: 'Portrait', time: '4 min', scene: 'gallery', title: 'L’atelier d’Inès Mora', short: 'L’atelier d’Inès Mora', sub: 'La peintre qui signe notre collaboration',
      body: ['Dans son atelier du 11e, Inès Mora peint à la lumière du jour et dessine la nuit. Pour la collection, elle a transformé ses toiles en imprimés de doublure.', 'Une collaboration pensée comme une conversation entre deux ateliers.'],
      quote: '« Je peins ce que j’entends. »', products: ['vesper', 'robe'], collection: 'mora' },
    { id: 'paris', rub: 'Paris', fmt: 'Guide', time: '3 min', scene: 'street', title: '10 adresses pour finir la nuit', short: '10 adresses pour finir la nuit', sub: 'Le Paris after dark du studio',
      body: ['Un bar à vinyles rive droite, une boulangerie ouverte à 4 h, un toit caché : la carte de nos nuits parisiennes.', 'À glisser dans la poche intérieure de votre perfecto.'],
      quote: '« Paris ne dort pas, il change de lumière. »', products: ['rocky', 'shades'], collection: 'ah26' },
    { id: 'cuir', rub: 'Mode', fmt: 'Savoir-faire', time: '3 min', scene: 'leather', title: 'Le perfecto, histoire d’une icône', short: 'Le cuir, une matière qui se raconte', sub: 'Du blouson de moto à la pièce culte',
      body: ['Né sur les routes, adopté par la scène, le perfecto est devenu la pièce signature de la maison. Retour sur une icône.', 'Chaque perfecto est pensé pour vieillir avec vous — et se répare à vie en boutique.'],
      quote: '« Un bon cuir se patine, il ne s’use pas. »', products: ['liam', 'studs'], look: 'l01' },
  ];

  const PLAYLISTS = {
    nuit: { id: 'nuit', name: 'NUIT — la playlist de Noa Lenz', artist: 'Noa Lenz', dur: '48 min', collection: 'ah26',
      tracks: [['Velvet Static', 'The Lowlights', '3:42'], ['Rive Droite', 'Mona & les Ombres', '4:05'], ['Minuit Chrome', 'Saint-Ambre', '3:18'], ['Pavés', 'Les Nuits Fauves', '2:57'], ['Après le rappel', 'Noa Lenz', '4:21']] },
  };

  const COLLECTIONS = [
    { id: 'ah26', k: 'Automne-Hiver 26 · Nouvelle collection', name: 'Paris After Dark', scene: ['portrait', { lx: .3, flip: true, fx: 30 }], film: 'rooftops', meta: 'Film · Moodboard · 64 pièces · 18 looks',
      manifesto: 'Minuit, rive droite. Le cuir capte la lumière des réverbères, le cachemire garde la chaleur du concert.', keys: ['liam', 'cashmere', 'cara', 'rocky'], looks: ['l01', 'l04'] },
    { id: 'vinyl', k: 'Capsule', name: 'Rock Vinyl', scene: ['stage', {}], film: 'stage', meta: 'Drop le 03.10', manifesto: 'Une capsule née en studio d’enregistrement : graphismes de pochettes, cuir mat, argent brossé.', keys: ['tee', 'studs', 'ring'], looks: ['l03'] },
    { id: 'icons', k: 'Archives', name: 'Les Icônes 1997—2026', scene: ['leather', {}], film: 'leather', meta: '32 pièces', manifesto: 'Les pièces qui ont écrit l’histoire de la maison, rééditées.', keys: ['liam', 'rocky', 'cara'], looks: ['l01'] },
    { id: 'mora', k: 'Collaboration', name: 'Atelier Inès Mora', scene: ['gallery', {}], film: 'gallery', meta: 'Art · 12 pièces', manifesto: 'Des toiles devenues imprimés, une collaboration entre deux ateliers parisiens.', keys: ['vesper', 'robe'], looks: ['l04'] },
  ];

  const H = 3600e3, D = 24 * H;
  // Drop times are relative to the moment the demo is opened.
  const DROPS = [
    { id: 'rocky', name: 'Sac Rocky Studs — Édition noire', product: 'rocky-noir', phase: 'countdown', in: 2 * H + 14 * 60e3 + 36e3, qty: 250, left: 187, members: true },
    { id: 'vinyl', name: 'Capsule Rock Vinyl', phase: 'reveal', reveal: 2, in: 2 * D + 14 * H + 36 * 60e3, date: 'Sam. 03.10 · 18:00', qty: 250, waiting: 12480,
      hints: [['Silhouette', 'Un sac porté main.'], ['Matière', 'Des clous argent vieilli.'], ['Le 06.10', 'Révélation complète.']] },
    { id: 'collab', name: 'Collab artiste — ???', phase: 'tease', date: '17 OCT', dd: '17', mm: 'OCT' },
    { id: 'cash', name: 'Cachemire numéroté', phase: 'soon', date: '24 OCT', dd: '24', mm: 'OCT' },
    { id: 'reed', name: 'Réédition — perfecto 1997', phase: 'soon', date: '31 OCT', dd: '31', mm: 'OCT' },
  ];

  const EVENTS = [
    { id: 'nuit', type: 'Soirée', name: 'Nuit électrique', place: 'Concert privé · Paris', date: 'Samedi 10 octobre · 21:00', short: 'Sam. 10.10', dd: '10', mm: 'OCT', scene: 'party', invite: true, seats: 120, going: 86,
      lines: [['cal', 'Samedi 10 octobre · 21:00'], ['pin', 'Lieu secret — révélé 24 h avant'], ['music', 'Live : Noa Lenz + DJ set'], ['sparkle', 'Dress code : all black']] },
    { id: 'tokyo', type: 'Pop-up store', name: 'Pop-up Omotesando', place: 'Tokyo · Ouvert à tous', date: '15 — 30 octobre', short: '15.10', dd: '15', mm: 'OCT', scene: 'facade', seats: 0, going: 0,
      lines: [['cal', 'Du 15 au 30 octobre · 11:00 — 20:00'], ['pin', 'Omotesando, Tokyo'], ['bag', 'Pièces exclusives au pop-up']] },
    { id: 'mora', type: 'Collab', name: 'Vernissage — Atelier Inès Mora', place: 'Paris · Places limitées', date: 'Mercredi 21 octobre · 19:00', short: '21.10', dd: '21', mm: 'OCT', scene: 'gallery', seats: 60, going: 41,
      lines: [['cal', 'Mercredi 21 octobre · 19:00'], ['pin', 'Galerie, Paris 3e'], ['sparkle', 'Rencontre avec l’artiste']] },
    { id: 'private', type: 'Exclusif', name: 'Private shopping', place: 'Marais · Membres Icon', date: 'Lundi 26 octobre · 18:00', short: '26.10', dd: '26', mm: 'OCT', scene: 'backstage', invite: true, seats: 20, going: 12,
      lines: [['cal', 'Lundi 26 octobre · 18:00'], ['store', 'Boutique Marais, fermée au public'], ['gift', 'Coupe de champagne, retouches offertes']] },
    { id: 'master', type: 'Culture', name: 'Masterclass soin du cuir', place: 'Lyon · Atelier', date: 'Lundi 2 novembre · 18:30', short: '02.11', dd: '02', mm: 'NOV', scene: 'leather', seats: 15, going: 9,
      lines: [['cal', 'Lundi 2 novembre · 18:30'], ['pin', 'Boutique Lyon, atelier'], ['scissors', 'Entretien, patine, réparation']] },
  ];

  const STORES = [
    { id: 'marais', name: 'Boutique Marais', city: 'Paris 3e', dist: '350 m', open: 'ferme à 20 h', x: 150, y: 250, hours: 'Lun.–Sam. 10 h–20 h · Dim. 11 h–19 h', stockWish: 3, advisor: 'Léa' },
    { id: 'sgp', name: 'Boutique Saint-Germain', city: 'Paris 6e', dist: '1,8 km', open: 'ferme à 19 h 30', x: 66, y: 170, hours: 'Lun.–Sam. 10 h–19 h 30', stockWish: 2, advisor: 'Hugo' },
    { id: 'opera', name: 'Boutique Opéra', city: 'Paris 9e', dist: '2,4 km', open: 'ferme à 20 h', x: 262, y: 330, hours: 'Lun.–Sam. 10 h–20 h', stockWish: 1, advisor: 'Inès' },
    { id: 'bastille', name: 'Boutique Bastille', city: 'Paris 11e', dist: '1,1 km', open: 'ferme à 19 h', x: 110, y: 520, hours: 'Mar.–Sam. 11 h–19 h', stockWish: 2, advisor: 'Sam' },
  ];

  window.DATA = { P, CATS, LOOKS, STORIES, PLAYLISTS, COLLECTIONS, DROPS, EVENTS, STORES };
})();
