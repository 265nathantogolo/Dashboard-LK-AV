/* ZADIG & VOLTAIRE — App concept board
 * Generated "photography": editorial B&W scenes and product shots, drawn in SVG.
 * Every image is a self-contained <svg> that fills its container (slice). */
(function () {
  let uid = 0;
  const id = (p) => `${p}${++uid}`;

  // Shared filters (grain, blur, leather) are declared once in the document.
  const DEFS = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch" result="n"/>
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.55 0"/>
        <feComposite operator="in" in2="SourceGraphic"/>
      </filter>
      <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="soft2"><feGaussianBlur stdDeviation="2.2"/></filter>
      <filter id="haze"><feGaussianBlur stdDeviation="18"/></filter>
      <filter id="leather" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves="4" seed="7" result="t"/>
        <feDiffuseLighting in="t" surfaceScale="9" lighting-color="#fff" result="l">
          <feDistantLight azimuth="235" elevation="38"/>
        </feDiffuseLighting>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <filter id="knit" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="turbulence" baseFrequency="0.9 0.25" numOctaves="1" seed="3"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"/>
        <feComposite operator="in" in2="SourceGraphic"/>
      </filter>
    </defs>
  </svg>`;

  // ------------------------------------------------------------------ figures
  // A standing figure drawn in a 200 x 400 box (feet at y≈392).
  function figure(o = {}) {
    const {
      x = 0, y = 0, s = 1, fill = '#0b0b0b', rim = null, hair = 'long',
      guitar = false, flip = false, jacket = '#0b0b0b', skin = null, pose = 'stand',
      top = null, legs = null,
    } = o;
    const f = fill;
    const sk = skin || f;
    const lg = legs || f;
    const tr = `translate(${x},${y}) scale(${flip ? -s : s},${s})${flip ? ' translate(-200,0)' : ''}`;
    const hairPath = {
      long: 'M77,74 C70,34 130,28 124,72 C128,98 134,126 128,150 L116,126 L86,126 L72,150 C66,124 72,98 77,74Z',
      bob: 'M78,74 C72,36 128,32 122,74 C126,90 126,102 122,110 L110,104 L90,104 L78,110 C74,100 74,88 78,74Z',
      short: 'M81,66 C80,40 122,38 120,66 C121,72 118,74 117,70 C112,58 90,56 84,70 C83,74 80,72 81,66Z',
      hat: 'M78,76 C72,52 128,52 122,78 C126,100 130,122 126,142 L114,122 L88,122 L74,142 C70,120 74,98 78,76Z',
    }[hair];
    const hatShape = hair === 'hat'
      ? `<path d="M58,56 C72,50 128,50 142,56 C136,60 64,60 58,56Z" fill="${f}"/><path d="M78,55 C80,30 120,30 122,55Z" fill="${f}"/>` : '';
    const armL = pose === 'pocket'
      ? 'M62,126 C52,152 50,190 56,228 L68,230 L70,190 L72,150Z'
      : 'M62,126 C50,152 44,198 46,252 L59,254 L64,198 L70,152Z';
    const armR = pose === 'hip'
      ? 'M138,126 C154,142 164,172 156,204 L144,214 L138,204 L146,186 L134,158Z'
      : pose === 'pocket'
        ? 'M138,126 C148,152 150,190 144,228 L132,230 L130,190 L128,150Z'
        : 'M138,126 C150,152 156,198 154,252 L141,254 L136,198 L130,152Z';
    const g = guitar
      ? `<g transform="rotate(-28 100 220)">
           <rect x="96" y="96" width="8" height="118" fill="${f}"/>
           <rect x="93" y="88" width="14" height="14" rx="2" fill="${f}"/>
           <path d="M76,206 C66,214 66,236 76,242 C70,256 72,280 100,284 C128,280 130,256 124,242 C134,236 134,214 124,206 C116,202 108,210 100,210 C92,210 84,202 76,206Z" fill="${f}"/>
           ${rim ? `<path d="M124,206 C134,214 134,236 124,242 C130,256 128,280 100,284" fill="none" stroke="${rim}" stroke-width="1.6" opacity=".8"/>` : ''}
         </g>` : '';
    const rimLines = rim ? `
      <g fill="none" stroke="${rim}" stroke-linecap="round" opacity=".85">
        <path d="M122,72 C126,98 132,124 128,150" stroke-width="2.2"/>
        <path d="M138,126 C150,152 156,198 154,252" stroke-width="2"/>
        <path d="M126,238 L124,320 L122,380" stroke-width="1.5"/>
        <path d="M118,62 C120,52 116,46 110,44" stroke-width="1.4"/>
      </g>` : '';
    return `<g transform="${tr}">
      <ellipse cx="100" cy="395" rx="46" ry="5" fill="#000" opacity=".35" filter="url(#soft2)"/>
      <path d="${hairPath}" fill="${f}"/>
      ${hatShape}
      <ellipse cx="100" cy="72" rx="17" ry="22" fill="${sk}"/>
      <rect x="92" y="88" width="16" height="24" fill="${sk}"/>
      <path d="M74,236 L99,236 L96,320 L92,382 L80,382 L78,320 Z" fill="${lg}"/>
      <path d="M101,236 L126,236 L124,320 L122,382 L110,382 L104,320 Z" fill="${lg}"/>
      <path d="M78,372 L93,372 L95,392 L68,393 C68,386 72,382 78,380Z" fill="${f}"/>
      <path d="M109,372 L124,372 L132,380 C134,386 134,392 134,393 L108,392Z" fill="${f}"/>
      <path d="${armL}" fill="${jacket}"/>
      <path d="${armR}" fill="${jacket}"/>
      <path d="M62,122 C80,110 120,110 138,122 L142,168 L136,206 L142,246 L58,246 L64,206 L58,168 Z" fill="${jacket}"/>
      <path d="M58,238 L142,238 L142,246 L58,246Z" fill="#000" opacity=".35"/>
      ${top ? `<path d="M90,114 L110,114 L104,170 L100,176 L96,170Z" fill="${top}"/>` : ''}
      <path d="M86,114 L100,176 L80,150 Z M114,114 L100,176 L120,150 Z" fill="${jacket}" opacity=".9"/>
      ${g}
      ${rimLines}
    </g>`;
  }

  // Crowd: row of heads and shoulders.
  function crowd(y, w, fill = '#000', seed = 1) {
    let out = '';
    let x = -10;
    let i = seed;
    while (x < w + 20) {
      i = (i * 9301 + 49297) % 233280;
      const r = i / 233280;
      const h = 8 + r * 7;
      const yy = y + r * 10;
      out += `<circle cx="${x}" cy="${yy}" r="${h}" fill="${fill}"/><ellipse cx="${x}" cy="${yy + h * 2.6}" rx="${h * 2}" ry="${h * 1.8}" fill="${fill}"/>`;
      if (r > 0.82) out += `<rect x="${x + 4}" y="${yy - 40}" width="5" height="34" rx="2" fill="${fill}" transform="rotate(${r * 30 - 10} ${x} ${yy})"/>`;
      x += 16 + r * 10;
    }
    return out + `<rect x="0" y="${y + 30}" width="${w}" height="400" fill="${fill}"/>`;
  }

  const wrap = (inner, { vb = '0 0 300 400', pos = 'xMidYMid', grain = true, cls = '' } = {}) =>
    `<svg class="ph ${cls}" viewBox="${vb}" preserveAspectRatio="${pos} slice" xmlns="http://www.w3.org/2000/svg">${inner}${
      grain ? `<rect width="100%" height="100%" x="0" y="0" filter="url(#grain)" opacity=".33" style="mix-blend-mode:overlay"/>` : ''}</svg>`;

  // ------------------------------------------------------------------ scenes
  const scenes = {
    // Light studio, backlit dark figure.
    studio(o) {
      const g = id('g');
      const bg1 = o.dark ? '#4a4a48' : '#e3e2de';
      const bg2 = o.dark ? '#060606' : '#8d8c88';
      const figs = o.figs || [{ x: 50, y: 20, s: 0.95, hair: o.hair || 'long', pose: o.pose }];
      return wrap(`
        <defs><radialGradient id="${g}" cx="${o.lx || 0.55}" cy="0.35" r="0.85">
          <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></radialGradient></defs>
        <rect width="300" height="400" fill="url(#${g})"/>
        <rect x="0" y="330" width="300" height="70" fill="#000" opacity=".12"/>
        ${figs.map((f) => figure({ rim: o.dark ? '#d8d8d8' : null, ...f })).join('')}
        ${o.dark ? '' : '<rect width="300" height="400" fill="#000" opacity=".06"/>'}
      `, o);
    },
    // Lit figure: grey-to-black gradient body, dark room — the campaign portrait.
    portrait(o) {
      const g = id('g'), b = id('b');
      const hair = o.hair || 'long';
      return wrap(`
        <defs>
          <radialGradient id="${g}" cx="${o.lx || 0.7}" cy="0.25" r="0.9">
            <stop offset="0" stop-color="${o.bg || '#5b5b59'}"/><stop offset=".6" stop-color="#161616"/><stop offset="1" stop-color="#030303"/></radialGradient>
          <linearGradient id="${b}" x1="1" y1="0" x2="0" y2="0.3">
            <stop offset="0" stop-color="#8e8e8c"/><stop offset=".35" stop-color="#2b2b2b"/><stop offset="1" stop-color="#050505"/></linearGradient>
        </defs>
        <rect width="300" height="400" fill="url(#${g})"/>
        ${o.wall ? '<path d="M0,0 L120,0 L90,400 L0,400Z" fill="#000" opacity=".35"/>' : ''}
        ${figure({ x: o.fx ?? 20, y: o.fy ?? -30, s: o.s || 1.25, fill: `url(#${b})`, jacket: `url(#${b})`, skin: o.skin || `url(#${b})`, rim: '#e8e8e8', hair, pose: o.pose || 'hip', top: o.top || '#cfcfcf', flip: o.flip })}
        <rect width="300" height="400" fill="url(#${g})" opacity=".18"/>
      `, { pos: 'xMidYMin', ...o });
    },
    stage(o) {
      const g = id('g'), l = id('l');
      return wrap(`
        <defs>
          <linearGradient id="${l}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
          <radialGradient id="${g}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#9a9a98"/><stop offset=".5" stop-color="#2a2a2a"/><stop offset="1" stop-color="#000"/></radialGradient>
        </defs>
        <rect width="300" height="400" fill="#000"/>
        <rect width="300" height="400" fill="url(#${g})" opacity=".9"/>
        <g filter="url(#soft)" opacity=".75">
          <path d="M150,-10 L110,330 L200,330Z" fill="url(#${l})"/>
          <path d="M30,-10 L0,260 L90,300Z" fill="url(#${l})" opacity=".55"/>
          <path d="M270,-10 L220,300 L310,250Z" fill="url(#${l})" opacity=".55"/>
        </g>
        <circle cx="150" cy="4" r="10" fill="#fff" filter="url(#soft2)"/>
        <circle cx="30" cy="2" r="6" fill="#fff" filter="url(#soft2)"/>
        <circle cx="270" cy="2" r="6" fill="#fff" filter="url(#soft2)"/>
        ${figure({ x: 70 + (o.dx || 0), y: 40, s: 0.78, fill: '#050505', rim: '#fff', hair: o.hair || 'long', guitar: o.guitar !== false })}
        <rect x="140" y="170" width="4" height="170" fill="#050505"/><circle cx="142" cy="170" r="5" fill="#050505"/>
        ${crowd(318, 300, '#000', o.seed || 3)}
        <rect width="300" height="400" fill="#fff" opacity=".03" filter="url(#haze)"/>
      `, o);
    },
    street(o) {
      const g = id('g'), s = id('s');
      let win = '';
      for (let c = 0; c < 5; c++) for (let r = 0; r < 6; r++) {
        const lit = (c * 7 + r * 3) % 5 === 0;
        win += `<rect x="${12 + c * 22}" y="${70 + r * 34}" width="10" height="20" fill="${lit ? '#d8d6cf' : '#1c1c1c'}" opacity="${lit ? 0.8 : 1}"/>`;
        win += `<rect x="${190 + c * 22}" y="${90 + r * 32}" width="10" height="19" fill="${(c + r) % 4 === 1 ? '#c9c7c0' : '#1a1a1a'}"/>`;
      }
      return wrap(`
        <defs>
          <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d2d2d"/><stop offset="1" stop-color="#0b0b0b"/></linearGradient>
          <radialGradient id="${s}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="300" height="400" fill="url(#${g})"/>
        <path d="M0,40 L130,52 L130,300 L0,300Z" fill="#101010"/>
        <path d="M0,40 L130,52 L130,60 L0,50Z" fill="#2a2a2a"/>
        <path d="M180,60 L300,48 L300,300 L180,300Z" fill="#0e0e0e"/>
        ${win}
        <rect x="0" y="300" width="300" height="100" fill="#121212"/>
        <path d="M0,300 L300,300 L300,306 L0,306Z" fill="#2a2a2a"/>
        <rect x="160" y="150" width="3" height="160" fill="#050505"/>
        <circle cx="161" cy="148" r="36" fill="url(#${s})" opacity=".6"/>
        <circle cx="161" cy="148" r="5" fill="#fff"/>
        <ellipse cx="161" cy="360" rx="20" ry="50" fill="url(#${s})" opacity=".18"/>
        ${figure({ x: 110, y: 120, s: 0.62, fill: '#030303', rim: '#bdbdbd', hair: o.hair || 'long', pose: 'pocket' })}
      `, o);
    },
    backstage(o) {
      const g = id('g');
      let bulbs = '';
      for (let i = 0; i < 7; i++) bulbs += `<circle cx="${60 + i * 30}" cy="40" r="7" fill="#fff" filter="url(#soft2)"/><circle cx="${60 + i * 30}" cy="40" r="3.5" fill="#fff"/>`;
      for (let i = 0; i < 6; i++) bulbs += `<circle cx="44" cy="${70 + i * 36}" r="7" fill="#fff" filter="url(#soft2)"/><circle cx="256" cy="${70 + i * 36}" r="7" fill="#fff" filter="url(#soft2)"/>`;
      return wrap(`
        <defs><radialGradient id="${g}" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#8a8a88"/><stop offset="1" stop-color="#1b1b1b"/></radialGradient></defs>
        <rect width="300" height="400" fill="#141414"/>
        <rect x="52" y="52" width="196" height="240" fill="url(#${g})"/>
        ${bulbs}
        ${figure({ x: 60, y: 70, s: 0.72, fill: '#0a0a0a', rim: '#f0f0f0', hair: o.hair || 'bob', pose: 'hip' })}
        <rect x="0" y="300" width="300" height="100" fill="#0c0c0c"/>
        <path d="M0,300 L300,300" stroke="#3a3a3a"/>
        <g fill="#2a2a2a"><rect x="20" y="318" width="40" height="8" rx="2"/><circle cx="90" cy="322" r="6"/><rect x="200" y="314" width="18" height="12" rx="2"/></g>
      `, o);
    },
    red(o) {
      const g = id('g');
      const blur = o.blur || 0;
      let studs = '';
      for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) {
        studs += `<path d="M${60 + i * 22},${180 + j * 22 + (i % 2) * 11} l6,-7 l6,7 l-6,7z" fill="#e8e8e8" opacity=".85"/>`;
      }
      return wrap(`
        <defs><radialGradient id="${g}" cx=".45" cy=".45" r=".75"><stop offset="0" stop-color="#b3121f"/><stop offset=".55" stop-color="#4a0508"/><stop offset="1" stop-color="#0a0000"/></radialGradient></defs>
        <rect width="300" height="400" fill="url(#${g})"/>
        <g ${blur ? `style="filter:blur(${blur}px)"` : ''}>
          <rect width="300" height="400" filter="url(#leather)" opacity=".35" style="mix-blend-mode:multiply"/>
          <path d="M40,140 C80,120 220,120 262,140 L276,330 C200,350 100,350 26,330 Z" fill="#120203" opacity=".92"/>
          <path d="M100,140 C100,80 200,80 200,140" fill="none" stroke="#1a0304" stroke-width="10"/>
          ${studs}
          <path d="M40,140 C80,120 220,120 262,140" fill="none" stroke="#ff5a5f" stroke-width="1.5" opacity=".6"/>
        </g>
      `, o);
    },
    leather(o) {
      return wrap(`
        <rect width="300" height="400" fill="#1a1a1a"/>
        <rect width="300" height="400" filter="url(#leather)" opacity=".55" style="mix-blend-mode:screen"/>
        <rect width="300" height="400" fill="#000" opacity=".45"/>
        <path d="M-10,60 C80,140 160,200 320,330" stroke="#050505" stroke-width="26" fill="none"/>
        <path d="M-10,60 C80,140 160,200 320,330" stroke="#bdbdbd" stroke-width="3" stroke-dasharray="3 3" fill="none"/>
        <circle cx="160" cy="218" r="12" fill="#c8c8c8"/><circle cx="160" cy="218" r="6" fill="#555"/>
        <path d="M-10,30 C60,90 120,120 200,120 C260,120 300,90 320,60" stroke="#fff" stroke-opacity=".12" stroke-width="30" fill="none" filter="url(#soft)"/>
      `, o);
    },
    vinyl(o) {
      let rings = '';
      for (let r = 40; r < 128; r += 4) rings += `<circle cx="150" cy="200" r="${r}" fill="none" stroke="#2a2a2a" stroke-width="1"/>`;
      return wrap(`
        <rect width="300" height="400" fill="${o.bg || '#d8d7d3'}"/>
        <rect x="18" y="72" width="256" height="256" fill="#0e0e0e"/>
        <text x="30" y="128" fill="#f2f2f2" font-family="Oswald" font-weight="700" font-size="30" letter-spacing="1">NUIT</text>
        <text x="30" y="96" fill="#8a8a8a" font-family="Inter" font-size="8" letter-spacing="2">PLAYLIST · VOL.12</text>
        <circle cx="190" cy="200" r="128" fill="#080808"/>
        <g transform="translate(40,0)">${rings}</g>
        <circle cx="190" cy="200" r="36" fill="#e9e9e6"/>
        <circle cx="190" cy="200" r="4" fill="#111"/>
        <path d="M110,120 A110,110 0 0 1 250,110" stroke="#fff" stroke-opacity=".16" stroke-width="16" fill="none" filter="url(#soft2)"/>
      `, o);
    },
    facade(o) {
      let w = '';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
        w += `<rect x="${22 + c * 54}" y="${36 + r * 52}" width="26" height="36" fill="${(r + c) % 3 === 0 ? '#c8c6bf' : '#333'}"/>`;
        w += `<rect x="${18 + c * 54}" y="${74 + r * 52}" width="34" height="3" fill="#6a6a68"/>`;
      }
      return wrap(`
        <rect width="300" height="400" fill="#9b9a96"/>
        <rect width="300" height="400" fill="#000" opacity=".25"/>
        ${w}
        <rect x="0" y="246" width="300" height="10" fill="#6d6c68"/>
        <rect x="0" y="256" width="300" height="144" fill="#0c0c0c"/>
        <rect x="0" y="262" width="300" height="26" fill="#050505"/>
        <text x="150" y="280" text-anchor="middle" fill="#e9e9e6" font-family="Oswald" font-weight="600" font-size="13" letter-spacing="1.5">ZADIG&amp;VOLTAIRE</text>
        <rect x="20" y="298" width="110" height="102" fill="#e6e3da" opacity=".85"/>
        <rect x="170" y="298" width="110" height="102" fill="#e6e3da" opacity=".85"/>
        <rect x="136" y="298" width="28" height="102" fill="#1a1a1a"/>
        ${figure({ x: 34, y: 300, s: 0.22, fill: '#1a1a1a', hair: 'long' })}
        ${figure({ x: 214, y: 300, s: 0.22, fill: '#1a1a1a', hair: 'short' })}
      `, o);
    },
    rooftops(o) {
      const g = id('g');
      return wrap(`
        <defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e5e5c"/><stop offset=".6" stop-color="#b9b8b3"/><stop offset="1" stop-color="#d9d8d3"/></linearGradient></defs>
        <rect width="300" height="400" fill="url(#${g})"/>
        <circle cx="210" cy="210" r="30" fill="#f4f3ef" opacity=".6" filter="url(#soft)"/>
        <path d="M0,260 L40,230 L90,230 L110,250 L150,220 L210,220 L240,245 L300,235 L300,400 L0,400Z" fill="#1b1b1b"/>
        <g fill="#1b1b1b"><rect x="52" y="206" width="8" height="26"/><rect x="64" y="212" width="8" height="20"/><rect x="170" y="196" width="10" height="26"/><rect x="184" y="202" width="8" height="20"/><rect x="262" y="214" width="8" height="24"/></g>
        <path d="M0,300 L60,280 L130,286 L200,270 L300,284 L300,400 L0,400Z" fill="#0c0c0c"/>
        ${figure({ x: 96, y: 150, s: 0.5, fill: '#050505', hair: 'long', pose: 'hip' })}
      `, o);
    },
    smoke(o) {
      return wrap(`
        <rect width="300" height="400" fill="#0c0c0c"/>
        <g filter="url(#haze)" opacity=".7">
          <ellipse cx="120" cy="160" rx="90" ry="40" fill="#bbb"/>
          <ellipse cx="190" cy="250" rx="70" ry="30" fill="#888"/>
          <ellipse cx="90" cy="300" rx="60" ry="24" fill="#777"/>
        </g>
      `, o);
    },
    party(o) {
      return wrap(`
        <rect width="300" height="400" fill="#050505"/>
        <g filter="url(#haze)"><circle cx="220" cy="80" r="70" fill="#a8a8a8"/><circle cx="60" cy="140" r="40" fill="#6a6a6a"/></g>
        <g fill="#fff">${Array.from({ length: 28 }, (_, i) => `<circle cx="${(i * 67) % 300}" cy="${(i * 41) % 180}" r="${(i % 3) + 1}" opacity="${0.3 + (i % 4) * 0.15}"/>`).join('')}</g>
        ${figure({ x: 20, y: 110, s: 0.66, fill: '#030303', rim: '#cfcfcf', hair: 'long', pose: 'hip' })}
        ${figure({ x: 130, y: 128, s: 0.6, fill: '#030303', rim: '#9a9a9a', hair: 'short', flip: true })}
        ${crowd(330, 300, '#000', 11)}
      `, o);
    },
    gallery(o) {
      return wrap(`
        <rect width="300" height="400" fill="#e9e8e4"/>
        <rect x="0" y="300" width="300" height="100" fill="#cfcdc8"/>
        <rect x="40" y="70" width="120" height="150" fill="#111"/>
        <path d="M52,200 C80,120 110,180 150,90" stroke="#e9e8e4" stroke-width="6" fill="none"/>
        <circle cx="100" cy="120" r="22" fill="none" stroke="#e9e8e4" stroke-width="3"/>
        <rect x="190" y="100" width="70" height="90" fill="#8e8c86"/>
        <rect x="198" y="108" width="54" height="74" fill="#2a2a2a"/>
        ${figure({ x: 150, y: 140, s: 0.42, fill: '#0e0e0e', hair: 'bob', pose: 'pocket', flip: true })}
      `, o);
    },
  };

  // ------------------------------------------------------------------ products
  const P = {
    jacket: (c = '#141414') => `
      <path d="M100,54 L128,48 L170,54 L200,70 L214,160 L218,232 L200,236 L196,170 L192,250 L108,250 L104,170 L100,236 L82,232 L86,160 L100,70Z" fill="${c}"/>
      <path d="M128,48 L150,62 L172,54 L162,120 L150,100Z" fill="#2c2c2c"/>
      <path d="M128,48 L112,70 L138,124 L150,100Z" fill="#262626"/>
      <path d="M150,62 L136,248" stroke="#bdbdbd" stroke-width="2.2" stroke-dasharray="2 1.5"/>
      <path d="M112,150 L136,146 M164,146 L186,150" stroke="#9a9a9a" stroke-width="1.6"/>
      <rect x="104" y="226" width="92" height="12" fill="#0a0a0a"/><rect x="108" y="228" width="10" height="8" fill="none" stroke="#bdbdbd" stroke-width="1.4"/>
      <path d="M200,70 L214,160" stroke="#fff" stroke-opacity=".18" stroke-width="5"/>`,
    blazer: (c = '#161616') => `
      <path d="M104,52 L150,62 L196,52 L212,72 L220,236 L200,238 L198,160 L196,256 L104,256 L102,160 L100,238 L80,236 L88,72Z" fill="${c}"/>
      <path d="M126,54 L150,160 L174,54 L160,54 L150,120 L140,54Z" fill="#e7e5e0"/>
      <path d="M126,54 L118,96 L144,140Z M174,54 L182,96 L156,140Z" fill="#262626"/>
      <circle cx="150" cy="176" r="3" fill="#aaa"/><circle cx="150" cy="200" r="3" fill="#aaa"/>`,
    tee: (c = '#f4f3f0') => `
      <path d="M112,56 C130,66 170,66 188,56 L226,80 L210,112 L194,102 L196,248 L104,248 L106,102 L90,112 L74,80Z" fill="${c}" stroke="#d2d0cb"/>
      <path d="M128,60 C136,74 164,74 172,60" fill="none" stroke="#cfcdc8" stroke-width="2"/>
      <text x="150" y="140" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="18" fill="#111">ROCK</text>
      <text x="150" y="158" text-anchor="middle" font-family="Instrument Serif" font-style="italic" font-size="11" fill="#111">never dies</text>`,
    jeans: (c = '#1c1c1c') => `
      <path d="M112,40 L188,40 L196,250 L160,252 L150,110 L140,252 L104,250Z" fill="${c}"/>
      <path d="M112,52 L188,52" stroke="#3a3a3a" stroke-width="2"/>
      <path d="M150,52 L150,106" stroke="#3a3a3a" stroke-width="1.5"/>
      <circle cx="150" cy="47" r="2.4" fill="#bbb"/>`,
    sweater: (c = '#b7b5b0') => `
      <g><path d="M114,54 C130,64 170,64 186,54 L218,72 L230,236 L210,238 L198,120 L200,250 L100,250 L102,120 L90,238 L70,236 L82,72Z" fill="${c}"/>
      <path d="M114,54 C130,64 170,64 186,54 L218,72 L230,236 L210,238 L198,120 L200,250 L100,250 L102,120 L90,238 L70,236 L82,72Z" fill="#000" filter="url(#knit)" opacity=".6"/>
      <rect x="100" y="236" width="100" height="14" fill="#a29f99"/>
      <path d="M126,58 C136,72 164,72 174,58" fill="none" stroke="#9b9892" stroke-width="5"/>
      <path d="M130,120 l20,24 l20,-24 M130,150 l20,24 l20,-24" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/></g>`,
    bag: (c = '#121212') => `
      <path d="M110,110 C110,40 190,40 190,110" fill="none" stroke="#9a9a9a" stroke-width="3" stroke-dasharray="6 3"/>
      <path d="M82,110 L218,110 L230,228 L70,228Z" fill="${c}"/>
      <path d="M82,110 L218,110 L214,160 L86,160Z" fill="#1f1f1f"/>
      <rect x="140" y="150" width="20" height="16" rx="2" fill="#c9c9c9"/>
      ${Array.from({ length: 7 }, (_, i) => `<circle cx="${100 + i * 17}" cy="196" r="2.6" fill="#c9c9c9"/>`).join('')}
      <path d="M218,110 L230,228" stroke="#fff" stroke-opacity=".15" stroke-width="4"/>`,
    boots: (c = '#101010') => `
      <path d="M98,96 L144,96 L148,196 C174,200 204,206 218,216 C228,224 226,236 216,238 L102,238 L98,222Z" fill="${c}"/>
      <path d="M112,100 L130,100 L132,180 L114,180Z" fill="#262626"/>
      <rect x="98" y="232" width="44" height="14" fill="#050505"/><rect x="98" y="238" width="124" height="8" fill="#050505"/>
      <path d="M144,98 L148,196" stroke="#fff" stroke-opacity=".16" stroke-width="4"/>
      <path d="M160,200 C180,204 204,210 216,218" stroke="#fff" stroke-opacity=".14" stroke-width="3" fill="none"/>`,
    sneakers: (c = '#f1f0ec') => `
      <path d="M70,190 C90,150 120,140 150,150 C180,158 200,176 228,186 C236,190 236,212 228,214 L74,214 C66,212 64,200 70,190Z" fill="${c}" stroke="#bdbbb5"/>
      <rect x="70" y="208" width="162" height="12" rx="4" fill="#161616"/>
      <path d="M120,152 L150,190 M136,150 L162,186" stroke="#161616" stroke-width="3"/>
      <text x="186" y="202" font-family="Oswald" font-weight="700" font-size="11" fill="#161616">Z</text>`,
    belt: () => `
      <ellipse cx="150" cy="150" rx="84" ry="60" fill="none" stroke="#121212" stroke-width="18"/>
      <ellipse cx="150" cy="150" rx="60" ry="40" fill="none" stroke="#1d1d1d" stroke-width="16"/>
      <rect x="196" y="126" width="36" height="46" rx="4" fill="none" stroke="#cacaca" stroke-width="5"/>`,
    sunglasses: () => `
      <path d="M58,140 C58,122 128,118 132,140 C134,168 120,182 96,182 C70,182 58,164 58,140Z" fill="#0c0c0c"/>
      <path d="M168,140 C172,118 242,122 242,140 C242,164 230,182 204,182 C180,182 166,168 168,140Z" fill="#0c0c0c"/>
      <path d="M132,142 C144,132 156,132 168,142" stroke="#0c0c0c" stroke-width="6" fill="none"/>
      <path d="M72,136 C82,128 100,128 110,132" stroke="#fff" stroke-opacity=".3" stroke-width="3" fill="none"/>`,
    dress: (c = '#141414') => `
      <path d="M128,40 L132,40 L136,80 L164,80 L168,40 L172,40 L176,86 C190,140 206,200 220,250 L80,250 C94,200 110,140 124,86Z" fill="${c}"/>
      <path d="M124,86 C140,96 160,96 176,86" stroke="#3a3a3a" stroke-width="2" fill="none"/>
      <path d="M176,86 C190,140 206,200 220,250" stroke="#fff" stroke-opacity=".14" stroke-width="5" fill="none"/>`,
    scarf: () => `
      <path d="M110,40 C150,60 170,40 190,50 L200,250 L170,252 L160,120 L140,252 L108,250Z" fill="#cfccc6"/>
      <path d="M110,40 C150,60 170,40 190,50 L200,250 L170,252 L160,120 L140,252 L108,250Z" fill="#000" filter="url(#knit)" opacity=".4"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${110 + i * 4}" y="250" width="1.5" height="10" fill="#aaa"/><rect x="${172 + i * 3.5}" y="252" width="1.5" height="10" fill="#aaa"/>`).join('')}`,
    ring: () => `
      <circle cx="150" cy="150" r="46" fill="none" stroke="#b9b9b9" stroke-width="12"/>
      <path d="M126,106 l24,-26 l24,26 l-24,20z" fill="#d6d6d6" stroke="#8a8a8a"/>`,
  };

  function product(kind, o = {}) {
    const bg = o.bg || '#eeede9';
    const g = id('p');
    return `<svg class="ph prod" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid ${o.fit === 'meet' ? 'meet' : 'slice'}" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="${g}" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <rect width="300" height="300" fill="${bg}"/><rect width="300" height="300" fill="url(#${g})"/>
      <ellipse cx="150" cy="262" rx="92" ry="7" fill="#000" opacity=".12" filter="url(#soft2)"/>
      <g transform="translate(0,4)">${(P[kind] || P.jacket)(o.color)}</g>
    </svg>`;
  }

  window.ART = {
    DEFS,
    photo: (scene, o = {}) => (scenes[scene] || scenes.studio)(o),
    product,
  };
})();
