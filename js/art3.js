/* =========================================================
   KASO — ART: KABANATA 3 SCENES (Ferry, Imprenta, Gala) + dawn BG
   ========================================================= */
(function () {
  'use strict';
  const { K, rng, uid, rain, neon, skyline } = window.ART;

  /* ---------------- CASE 7: ESCOLTA FERRY STATION ---------------- */
  function sceneFerry(A, p) {
    p = p || uid('f');
    const r = rng(7707);
    let s = `<defs>
      <linearGradient id="${p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1424"/><stop offset="1" stop-color="#34404e"/></linearGradient>
      <linearGradient id="${p}riv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c3a44"/><stop offset="1" stop-color="#08161b"/></linearGradient>
      <radialGradient id="${p}lamp"><stop offset="0" stop-color="#ffe0a0" stop-opacity=".7"/><stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/></radialGradient>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}sky)"/>`;
    s += skyline(r, 200, '#1a1e2c', 0, 600);
    s += `<rect x="150" y="70" width="90" height="130" fill="#262a36" stroke="#111" stroke-width="1"/><path d="M150,70 L195,40 L240,70Z" fill="#262a36"/>`;
    for (let y = 84; y < 196; y += 16) for (let x = 160; x < 232; x += 14) s += `<rect x="${x}" y="${y}" width="6" height="9" fill="#f3c86a" opacity="${r() < .4 ? .7 : .1}"/>`;
    s += neon(300, 110, 104, 'ESCOLTA', '#ff4fa3', '#ff9ccf', 15);
    // river
    s += `<rect x="0" y="200" width="600" height="130" fill="url(#${p}riv)"/>`;
    for (let i = 0; i < 26; i++) { const x = r() * 600, y = 210 + r() * 110; s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(10 + r() * 30).toFixed(0)}" height="2" fill="#9fc6d8" opacity=".25"/>`; }
    // fog
    [[120, 210, 220], [430, 230, 260], [300, 190, 300]].forEach(([x, y, w]) => { s += `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="16" fill="#cfd8e0" opacity=".12"/>`; });
    // ferry (right)
    s += `<path d="M370,262 L600,262 L600,306 L392,306Z" fill="#eef0f2" stroke="${K}" stroke-width="2"/><rect x="370" y="276" width="230" height="7" fill="#2a63c4"/>`;
    s += `<rect x="410" y="226" width="190" height="38" fill="#e2e6ea" stroke="${K}" stroke-width="1.6"/>`;
    for (let x = 418; x < 600; x += 26) s += `<rect x="${x}" y="234" width="18" height="16" fill="#1c2a3a" stroke="${K}" stroke-width=".8"/>`;
    s += `<text x="500" y="298" font-family="Arial Black,Arial,sans-serif" font-size="11" fill="#2a63c4" text-anchor="middle">FERRY 13</text>`;
    // ticket booth (left)
    s += `<rect x="16" y="196" width="96" height="104" fill="#5a3e2a" stroke="${K}" stroke-width="1.6"/><path d="M10,196 L118,196 L110,180 L18,180Z" fill="#7a2a2a" stroke="${K}" stroke-width="1.4"/>`;
    s += `<rect x="28" y="214" width="72" height="40" fill="#ffe2a0" opacity=".85" stroke="${K}" stroke-width="1"/><text x="64" y="192" font-family="Arial Black,Arial,sans-serif" font-size="11" fill="#fff" text-anchor="middle">TIKET</text>`;
    // dock
    s += `<path d="M0,300 L430,300 L430,400 L0,400Z" fill="#6b4a2c"/>`;
    for (let x = 0; x < 430; x += 22) s += `<line x1="${x}" y1="300" x2="${x}" y2="400" stroke="#4a3220" stroke-width="2"/>`;
    s += `<rect x="0" y="296" width="430" height="8" fill="#7d5a38" stroke="${K}" stroke-width="1"/>`;
    [40, 140, 260, 400].forEach((x) => { s += `<rect x="${x}" y="300" width="12" height="30" fill="#3a2a1a"/>`; });
    // lamp
    s += `<circle cx="300" cy="186" r="60" fill="url(#${p}lamp)"/><rect x="297" y="190" width="6" height="110" fill="#222" stroke="${K}" stroke-width="1"/><circle cx="300" cy="186" r="9" fill="#ffefc0" stroke="${K}" stroke-width="1.4"/>`;
    // lifebuoy
    s += `<circle cx="300" cy="248" r="13" fill="none" stroke="#e04a2a" stroke-width="7"/><circle cx="300" cy="248" r="13" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="7 13"/>`;
    // cleat + rope / small boat (clue)
    s += `<rect x="200" y="306" width="22" height="6" rx="2" fill="#8a8f96" stroke="${K}" stroke-width="1"/>`;
    if (!A) {
      s += `<path d="M60,272 L190,272 L178,298 L72,298Z" fill="#2f8a6a" stroke="${K}" stroke-width="1.5"/><rect x="150" y="258" width="20" height="14" fill="#555" stroke="${K}" stroke-width="1"/><path d="M70,276 L184,276" stroke="#f2e7c4" stroke-width="2"/>`;
      s += `<path d="M184,286 Q200,300 211,308" stroke="#d8c08a" stroke-width="2.4" fill="none"/><path d="M204,308 Q211,302 218,308" stroke="#d8c08a" stroke-width="2.4" fill="none"/>`;
    } else {
      s += `<path d="M211,310 Q214,322 206,328 Q196,334 204,342 Q212,348 230,344" stroke="#d8c08a" stroke-width="2.4" fill="none"/>`;
      s += `<path d="M30,286 Q80,280 130,286 Q170,290 200,284" stroke="#9fc6d8" stroke-width="1.4" fill="none" opacity=".5"/>`;
    }
    // briefcase (clue)
    if (!A) s += `<g transform="translate(330,348)"><rect x="-22" y="-12" width="44" height="26" rx="3" fill="#6a3a1a" stroke="${K}" stroke-width="1.4"/><path d="M-8,-12 L-8,-17 L8,-17 L8,-12" stroke="${K}" stroke-width="2" fill="none"/><rect x="-18" y="-16" width="30" height="5" fill="#f2efe8" stroke="${K}" stroke-width=".6"/><rect x="-3" y="-3" width="6" height="5" fill="#c9a24a"/></g>`;
    else s += `<g transform="translate(330,348)"><rect x="-22" y="-2" width="44" height="16" rx="3" fill="#6a3a1a" stroke="${K}" stroke-width="1.4"/><path d="M-22,-2 L-18,-24 L26,-24 L22,-2Z" fill="#5a2e12" stroke="${K}" stroke-width="1.4"/><rect x="-18" y="0" width="36" height="10" fill="#2a1a0e"/></g>`;
    // pipe (clue)
    if (A) s += `<g transform="translate(462,370) rotate(-18)"><rect x="-34" y="-4" width="64" height="8" rx="4" fill="#8b9098" stroke="${K}" stroke-width="1"/><circle cx="28" cy="0" r="2.6" fill="#8d1c1c" opacity=".85"/></g>`;
    // earpiece (clue)
    if (A) s += `<g transform="translate(250,380) scale(1.5)"><path d="M-4,-2 Q-8,-6 -4,-8 Q0,-8 0,-4" fill="#1a1a1e" stroke="#555" stroke-width=".8"/><path d="M0,-4 Q3,0 1,3 Q-1,6 2,8 Q5,10 3,13" stroke="#c9ced4" stroke-width="1" fill="none"/></g>`;
    // business card (clue)
    if (A) s += `<g transform="translate(140,372) rotate(-10) scale(1.4)"><rect x="-12" y="-7" width="24" height="14" fill="#111" stroke="#c9a24a" stroke-width=".8"/><text x="0" y="-1" font-family="Arial Black,Arial,sans-serif" font-size="3.8" fill="#c9a24a" text-anchor="middle">MEDINA</text><text x="0" y="4" font-family="Arial,sans-serif" font-size="3" fill="#ddd" text-anchor="middle">SECURITY</text></g>`;
    // wax seal (meta)
    if (A) s += `<g transform="translate(545,378) rotate(8) scale(1.4)"><path d="M-14,-9 L14,-9 L12,9 L-13,8Z" fill="#efe4c8" stroke="#8a7a5a" stroke-width=".8"/><circle cx="0" cy="0" r="6" fill="#a01c22" stroke="#5a0a0e" stroke-width=".8"/><path d="M-3,1 Q-2,-3 1,-2 Q3,-4 4,-1 L2,0 Q0,2 -2,1Z" fill="#5a0a0e"/></g>`;
    // the dock extends over ferry gap: little boardwalk to ferry
    s += `<path d="M420,300 L440,280 L470,280 L470,300Z" fill="#7d5a38" stroke="${K}" stroke-width="1"/>`;
    s += rain(r, 30, 0, 600, 0, 400, '#cfd8e0', .15);
    return s;
  }

  /* ---------------- CASE 8: LUMANG IMPRENTA, ESCOLTA ---------------- */
  function sceneImprenta(A, p) {
    p = p || uid('m');
    const r = rng(8808);
    let s = `<defs>
      <linearGradient id="${p}wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5232"/><stop offset="1" stop-color="#3e2e1c"/></linearGradient>
      <radialGradient id="${p}bulb"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".5"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}wall)"/>`;
    for (let x = 0; x < 600; x += 30) s += `<line x1="${x}" y1="0" x2="${x}" y2="330" stroke="#5a4428" stroke-width="1"/>`;
    // arched window
    s += `<path d="M40,200 L40,90 Q105,20 170,90 L170,200Z" fill="#0d1430" stroke="#2a1d10" stroke-width="7"/><path d="M105,40 L105,200 M40,140 L170,140" stroke="#2a1d10" stroke-width="4"/>`;
    s += neon(60, 160, 60, 'HOTEL', '#3fd0ff', '#a8ecff', 10);
    s += rain(rng(3), 16, 46, 166, 60, 198, '#cfe0ff', .35);
    s += `<ellipse cx="300" cy="120" rx="260" ry="150" fill="url(#${p}bulb)"/><line x1="300" y1="0" x2="300" y2="44" stroke="#111" stroke-width="2"/><path d="M286,44 L314,44 L318,56 L282,56Z" fill="#2a3a2a"/><circle cx="300" cy="60" r="5" fill="#fff3c4"/>`;
    // negatives line (clue)
    s += `<path d="M300,76 Q430,88 560,76" stroke="#222" stroke-width="1.4" fill="none"/>`;
    [330, 390, 450, 510].forEach((x, i) => {
      if (A && (i === 2 || i === 1)) { s += `<rect x="${x - 2}" y="80" width="4" height="6" fill="#c9a24a"/>`; return; }
      s += `<rect x="${x - 2}" y="80" width="4" height="6" fill="#c9a24a"/><rect x="${x - 8}" y="86" width="16" height="46" fill="#2a2018" stroke="${K}" stroke-width=".8"/>`;
      for (let k = 0; k < 4; k++) s += `<rect x="${x - 5}" y="${90 + k * 10}" width="10" height="7" fill="#8a7a62" opacity=".7"/>`;
    });
    // press machine
    s += `<rect x="210" y="200" width="200" height="120" fill="#23302a" stroke="${K}" stroke-width="2"/><rect x="226" y="180" width="168" height="24" fill="#2e3c34" stroke="${K}" stroke-width="2"/>`;
    s += `<circle cx="250" cy="196" r="52" fill="none" stroke="#1a221e" stroke-width="10"/><circle cx="250" cy="196" r="52" fill="none" stroke="#3e4e46" stroke-width="4"/>`;
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; s += `<line x1="250" y1="196" x2="${(250 + Math.cos(a) * 50).toFixed(1)}" y2="${(196 + Math.sin(a) * 50).toFixed(1)}" stroke="#3e4e46" stroke-width="4"/>`; }
    s += `<rect x="300" y="226" width="96" height="16" rx="8" fill="#555" stroke="${K}" stroke-width="1.4"/><rect x="300" y="250" width="96" height="16" rx="8" fill="#555" stroke="${K}" stroke-width="1.4"/><rect x="290" y="276" width="110" height="10" fill="#f2efe8" stroke="${K}" stroke-width="1"/>`;
    // paper stacks
    [[424, 290], [440, 272], [470, 296]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="40" height="${330 - y}" fill="#f2efe8" stroke="${K}" stroke-width="1.2"/>`; for (let yy = y + 5; yy < 330; yy += 5) s += `<line x1="${x}" y1="${yy}" x2="${x + 40}" y2="${yy}" stroke="#ccc" stroke-width=".6"/>`; });
    // staircase (right)
    for (let i = 0; i < 9; i++) s += `<rect x="${520 + i * 0}" y="${330 - i * 26}" width="80" height="26" fill="#5a3a22" stroke="${K}" stroke-width="1"/>`;
    s += `<path d="M512,330 L512,96" stroke="#3a2412" stroke-width="5"/>`;
    for (let y = 110; y < 330; y += 24) {
      if (A && y > 210 && y < 290) continue;
      s += `<line x1="512" y1="${y}" x2="526" y2="${y}" stroke="#3a2412" stroke-width="3"/>`;
    }
    if (!A) s += `<path d="M526,96 L526,330" stroke="#7a4a2a" stroke-width="4"/>`;
    else s += `<path d="M526,96 L526,214 M526,290 L526,330" stroke="#7a4a2a" stroke-width="4"/><path d="M526,214 L540,236 M526,290 L544,276" stroke="#7a4a2a" stroke-width="4"/>`;
    // floor
    s += `<rect x="0" y="330" width="600" height="70" fill="#2e2418"/>`;
    for (let x = 0; x < 600; x += 50) s += `<line x1="${x}" y1="330" x2="${x - 14}" y2="400" stroke="#241c12" stroke-width="2"/>`;
    // desk + typewriter (clue on paper)
    s += `<rect x="30" y="300" width="160" height="10" fill="#5a3a22" stroke="${K}" stroke-width="1.2"/><rect x="40" y="310" width="8" height="40" fill="#3a2412"/><rect x="172" y="310" width="8" height="40" fill="#3a2412"/>`;
    s += `<path d="M70,300 L150,300 L142,272 L78,272Z" fill="#2a2a2e" stroke="${K}" stroke-width="1.2"/><rect x="72" y="266" width="76" height="8" rx="4" fill="#3c3c40" stroke="${K}" stroke-width="1"/>`;
    if (!A) s += `<rect x="86" y="228" width="48" height="40" fill="#f6f0e0" stroke="#8a7a5a" stroke-width=".8"/><path d="M90,236 L130,236 M90,242 L128,242 M90,248 L126,248 M90,254 L120,254" stroke="#444" stroke-width="1"/>`;
    else s += `<path d="M86,256 L134,256 L134,268 L86,268Z" fill="#f6f0e0" stroke="#8a7a5a" stroke-width=".8"/><path d="M86,256 L92,252 L98,257 L106,251 L114,257 L122,252 L134,256" fill="#f6f0e0" stroke="#8a7a5a" stroke-width=".8"/><text x="110" y="265" font-family="Courier New,monospace" font-size="4.4" fill="#b3262e" text-anchor="middle">ANG ANINO NG KONSE—</text>`;
    // ink footprints (clue)
    if (A) [[300, 368], [330, 378], [360, 366], [390, 376], [420, 364], [450, 374]].forEach(([x, y], i) => { s += `<ellipse cx="${x}" cy="${y}" rx="5" ry="9" fill="#1a2a5a" opacity="${.85 - i * .08}" transform="rotate(${i % 2 ? 70 : 80} ${x} ${y})"/>`; });
    // lens cap (clue)
    if (A) s += `<g transform="translate(212,382) scale(1.4)"><circle cx="0" cy="0" r="7" fill="#151518" stroke="#666" stroke-width="1"/><circle cx="0" cy="0" r="4" fill="none" stroke="#444" stroke-width=".8"/><text x="0" y="1.6" font-family="Arial,sans-serif" font-size="3.4" fill="#ccc" text-anchor="middle">GL</text></g>`;
    // newspaper clipping (meta)
    if (A) s += `<g transform="translate(90,378) rotate(-8) scale(1.4)"><rect x="-14" y="-10" width="28" height="20" fill="#e6dcc0" stroke="#8a7a5a" stroke-width=".8"/><rect x="-11" y="-7" width="12" height="9" fill="#6a6a6a"/><path d="M3,-6 L11,-6 M3,-3 L11,-3 M3,0 L10,0 M-11,5 L11,5" stroke="#555" stroke-width=".8"/></g>`;
    return s;
  }

  /* ---------------- CASE 9: GALA PARA SA MAYNILA ---------------- */
  function sceneGala(A, p) {
    p = p || uid('g');
    const r = rng(9909);
    let s = `<defs>
      <linearGradient id="${p}wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2416"/><stop offset="1" stop-color="#22140c"/></linearGradient>
      <radialGradient id="${p}ch"><stop offset="0" stop-color="#fff2c0" stop-opacity=".6"/><stop offset="1" stop-color="#fff2c0" stop-opacity="0"/></radialGradient>
      <pattern id="${p}pat" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="4" fill="none" stroke="#6a4a22" stroke-width="1"/></pattern>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}wall)"/><rect width="600" height="260" fill="url(#${p}pat)"/>`;
    // curtains
    s += `<path d="M0,0 L70,0 Q60,130 80,260 L0,260Z" fill="#7a1424" stroke="${K}" stroke-width="1.5"/><path d="M600,0 L540,0 Q560,130 530,260 L600,260Z" fill="#7a1424" stroke="${K}" stroke-width="1.5"/>`;
    for (let x = 12; x < 70; x += 16) s += `<path d="M${x},0 Q${x - 4},130 ${x + 6},260" stroke="#5a0e1a" stroke-width="2" fill="none"/>`;
    // chandelier
    s += `<ellipse cx="300" cy="70" rx="200" ry="100" fill="url(#${p}ch)"/><line x1="300" y1="0" x2="300" y2="30" stroke="#c9a24a" stroke-width="2"/><path d="M250,40 Q300,70 350,40 L340,60 Q300,84 260,60Z" fill="#e8c860" stroke="${K}" stroke-width="1"/>`;
    for (let i = 0; i < 9; i++) { const x = 254 + i * 11.5; s += `<line x1="${x}" y1="58" x2="${x}" y2="${74 + (i % 3) * 6}" stroke="#fff" stroke-width=".8" opacity=".8"/><circle cx="${x}" cy="${76 + (i % 3) * 6}" r="2" fill="#e8f4ff"/>`; }
    // stage + banner + podium
    s += `<rect x="400" y="160" width="140" height="100" fill="#2a1a10"/><rect x="390" y="250" width="160" height="14" fill="#5a3a22" stroke="${K}" stroke-width="1.4"/>`;
    s += `<rect x="350" y="110" width="200" height="30" fill="#b3262e" stroke="${K}" stroke-width="1.4"/><text x="450" y="130" font-family="Georgia,serif" font-weight="700" font-size="13" fill="#ffe7ae" text-anchor="middle">GALA PARA SA MAYNILA</text>`;
    s += `<path d="M448,192 L488,192 L484,250 L452,250Z" fill="#6a4426" stroke="${K}" stroke-width="1.4"/><rect x="444" y="186" width="48" height="8" fill="#7a5030" stroke="${K}" stroke-width="1"/><path d="M468,186 L468,172" stroke="#333" stroke-width="2"/><circle cx="468" cy="170" r="3" fill="#333"/>`;
    // background table
    s += `<ellipse cx="150" cy="272" rx="90" ry="18" fill="#efe9dc" stroke="${K}" stroke-width="1.2"/><path d="M60,272 L68,300 L232,300 L240,272" fill="#e6dfd0" stroke="${K}" stroke-width="1.2"/>`;
    // champagne tower (left)
    for (let row = 0; row < 4; row++) for (let i = 0; i <= row; i++) { const x = 110 - row * 9 + i * 18, y = 200 + row * 16; s += `<path d="M${x - 6},${y} L${x + 6},${y} L${x + 2},${y + 8} L${x - 2},${y + 8}Z" fill="#f3e6a0" opacity=".8" stroke="${K}" stroke-width=".5"/><line x1="${x}" y1="${y + 8}" x2="${x}" y2="${y + 14}" stroke="#bbb" stroke-width=".8"/>`; }
    // floor carpet
    s += `<rect x="0" y="300" width="600" height="100" fill="#4a1a22"/>`;
    for (let x = -20; x < 640; x += 40) s += `<path d="M${x},300 L${x - 20},400" stroke="#5a2430" stroke-width="2"/>`;
    // main table
    s += `<ellipse cx="300" cy="320" rx="210" ry="34" fill="#f6f2ea" stroke="${K}" stroke-width="1.6"/><path d="M90,320 L100,360 L500,360 L510,320" fill="#ece6d8" stroke="${K}" stroke-width="1.6"/>`;
    // centerpiece
    s += `<rect x="296" y="294" width="10" height="20" fill="#c9a24a" stroke="${K}" stroke-width=".8"/>`;
    [[292, 286, '#c42b5a'], [302, 280, '#f2efe8'], [312, 288, '#c42b5a'], [298, 292, '#e6c43a'], [308, 294, '#f2efe8']].forEach(([x, y, c]) => { s += `<circle cx="${x}" cy="${y}" r="6" fill="${c}" stroke="${K}" stroke-width=".6"/>`; });
    if (A) s += `<rect x="303" y="282" width="5" height="12" rx="1.6" fill="#cfe6f2" stroke="${K}" stroke-width=".8" transform="rotate(14 305 288)"/>`;
    // place settings / glasses
    [[200, 312], [250, 318]].forEach(([x, y]) => { s += `<path d="M${x - 5},${y - 14} L${x + 5},${y - 14} L${x + 3},${y - 4} L${x - 3},${y - 4}Z" fill="#8a1a2a" opacity=".8" stroke="${K}" stroke-width=".6"/><line x1="${x}" y1="${y - 4}" x2="${x}" y2="${y + 2}" stroke="#bbb" stroke-width="1"/>`; });
    // Jessa's glass (clue)
    if (!A) s += `<path d="M386,296 L398,296 L396,306 L388,306Z" fill="#8a1a2a" opacity=".8" stroke="${K}" stroke-width=".6"/><line x1="392" y1="306" x2="392" y2="314" stroke="#bbb" stroke-width="1"/>`;
    else s += `<g transform="rotate(80 392 312)"><path d="M386,296 L398,296 L396,306 L388,306Z" fill="#cfe6f2" opacity=".7" stroke="${K}" stroke-width=".6"/><line x1="392" y1="306" x2="392" y2="314" stroke="#bbb" stroke-width="1"/></g><ellipse cx="376" cy="318" rx="14" ry="3.6" fill="#8a1a2a" opacity=".7"/><circle cx="398" cy="306" r="1.6" fill="#fff"/>`;
    // glove (clue)
    if (A) s += `<g transform="translate(180,380) rotate(-20) scale(1.3)"><path d="M-14,-4 L6,-6 L10,-10 L12,-6 L14,-8 L15,-4 L16,-6 L16,0 L8,4 L-14,4Z" fill="#f6f6f6" stroke="#888" stroke-width=".8"/></g>`;
    // speech card (clue)
    if (A) s += `<g transform="translate(512,262) rotate(14) scale(1.4)"><rect x="-10" y="-7" width="20" height="14" fill="#fff" stroke="#8a7a5a" stroke-width=".8"/><path d="M-7,-3 L7,-3 M-7,0 L5,0" stroke="#666" stroke-width=".7"/><text x="3" y="5" font-family="Georgia,serif" font-style="italic" font-size="3.6" fill="#b3262e" text-anchor="middle">— A.M.</text></g>`;
    // phone (clue)
    if (A) s += `<g transform="translate(430,380) rotate(30) scale(1.3)"><rect x="-6" y="-11" width="12" height="22" rx="2" fill="#1a1a1e" stroke="#666" stroke-width=".8"/><rect x="-4.6" y="-8.6" width="9.2" height="16" fill="#3a7ac4"/><path d="M-3,-4 L3,-4 M-3,-1 L2,-1" stroke="#fff" stroke-width=".7"/></g>`;
    // crow ring (meta)
    if (A) s += `<g transform="translate(468,184) scale(1.5)"><circle cx="0" cy="0" r="4.2" fill="none" stroke="#e8c04a" stroke-width="2"/><ellipse cx="0" cy="-4.6" rx="3.4" ry="2.4" fill="#111" stroke="#e8c04a" stroke-width=".6"/><path d="M-3,-4 Q0,-6 3,-4" stroke="#c42b36" stroke-width=".8" fill="none"/></g>`;
    return s;
  }

  function bgDawn() {
    const r = rng(1212);
    let s = `<defs><linearGradient id="dawnsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a6a"/><stop offset=".55" stop-color="#e88a6a"/><stop offset="1" stop-color="#ffd38a"/></linearGradient></defs>`;
    s += `<rect width="520" height="340" fill="url(#dawnsky)"/><circle cx="380" cy="250" r="46" fill="#fff0b8" opacity=".9"/>`;
    s += skyline(r, 270, '#3a2a3a', 0, 520).replace(/#f3c86a/g, '#ffd38a');
    s += `<rect x="0" y="262" width="520" height="78" fill="#3a3040"/>`;
    [[60, 262], [130, 268], [430, 266], [480, 262]].forEach(([x, y]) => { s += `<path d="M${x - 8},${y} L${x - 8},${y - 30} Q${x},${y - 40} ${x + 8},${y - 30} L${x + 8},${y}Z" fill="#5a4a5a" stroke="#2a1a2a" stroke-width="1"/><path d="M${x},${y - 34} L${x},${y - 46} M${x - 5},${y - 42} L${x + 5},${y - 42}" stroke="#5a4a5a" stroke-width="2"/>`; });
    return s;
  }

  Object.assign(window.ART, { sceneFerry, sceneImprenta, sceneGala });
  window.ART.BG.dawn = bgDawn;
})();
