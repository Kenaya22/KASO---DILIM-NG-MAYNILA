/* =========================================================
   KASO — ART: KABANATA 2 SCENES (Quiapo, Divisoria, Intramuros)
   ========================================================= */
(function () {
  'use strict';
  const { K, rng, uid, rain, neon, skyline } = window.ART;

  /* ---------------- CASE 4: QUIAPO, PLAZA MIRANDA ---------------- */
  function sceneQuiapo(A, p) {
    p = p || uid('q');
    const r = rng(4404);
    let s = `<defs>
      <linearGradient id="${p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1126"/><stop offset="1" stop-color="#3b2a45"/></linearGradient>
      <radialGradient id="${p}door"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".9"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient>
      <radialGradient id="${p}cand"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}sky)"/>`;
    s += skyline(r, 210, '#16142a', 0, 600);
    // church
    s += `<circle cx="310" cy="78" r="46" fill="#7d7562" stroke="${K}" stroke-width="1.5"/><rect x="304" y="22" width="12" height="14" fill="#7d7562"/><path d="M310,4 L310,22 M303,10 L317,10" stroke="#d9c98a" stroke-width="3"/>`;
    s += `<rect x="226" y="96" width="168" height="150" fill="#8f8570" stroke="${K}" stroke-width="1.5"/><path d="M220,98 L310,62 L400,98Z" fill="#9a9079" stroke="${K}" stroke-width="1.5"/>`;
    s += `<rect x="196" y="56" width="40" height="190" fill="#857b66" stroke="${K}" stroke-width="1.5"/><rect x="384" y="56" width="40" height="190" fill="#857b66" stroke="${K}" stroke-width="1.5"/>`;
    s += `<path d="M196,56 L216,30 L236,56Z M384,56 L404,30 L424,56Z" fill="#6f6654" stroke="${K}" stroke-width="1.2"/>`;
    [[216, 90], [216, 150], [404, 90], [404, 150], [270, 130], [350, 130]].forEach(([x, y]) => { s += `<path d="M${x - 6},${y + 18} L${x - 6},${y + 5} Q${x},${y - 3} ${x + 6},${y + 5} L${x + 6},${y + 18}Z" fill="#f3c86a" opacity=".7"/>`; });
    s += `<ellipse cx="310" cy="230" rx="70" ry="50" fill="url(#${p}door)"/><path d="M286,246 L286,196 Q310,170 334,196 L334,246Z" fill="#ffd690" stroke="${K}" stroke-width="1.5"/>`;
    // plaza
    s += `<rect x="0" y="244" width="600" height="156" fill="#4a4248"/>`;
    for (let y = 256; y < 400; y += 18) s += `<line x1="0" y1="${y}" x2="600" y2="${y}" stroke="#3a3238" stroke-width="1.2"/>`;
    for (let x = -60; x < 660; x += 44) s += `<line x1="${x}" y1="244" x2="${x - 40}" y2="400" stroke="#3a3238" stroke-width="1"/>`;
    // candle stall (left)
    s += `<path d="M14,200 L206,200 L196,222 L24,222Z" fill="#c43f3a" stroke="${K}" stroke-width="1.4"/>`;
    for (let x = 24; x < 196; x += 24) s += `<path d="M${x},222 L${x + 12},222 L${x + 6},230Z" fill="#f2e7c4"/>`;
    s += `<rect x="20" y="222" width="4" height="100" fill="#3a2a1d"/><rect x="190" y="222" width="4" height="100" fill="#3a2a1d"/>`;
    s += `<rect x="22" y="290" width="174" height="40" fill="#6b4a2c" stroke="${K}" stroke-width="1.4"/>`;
    const cc = ['#c42b36', '#2f8a4a', '#e6c43a', '#6a3a9a', '#f2efe8', '#2a5ac4', '#e07a2a'];
    for (let i = 0; i < 14; i++) { const x = 32 + i * 11.5, h = 26 + (i % 3) * 5; s += `<rect x="${x}" y="${290 - h}" width="7" height="${h}" fill="${cc[i % cc.length]}" stroke="${K}" stroke-width=".6"/><ellipse cx="${x + 3.5}" cy="${290 - h - 4}" rx="2" ry="3.4" fill="#ffd24a"/>`; }
    s += `<ellipse cx="110" cy="262" rx="90" ry="34" fill="url(#${p}cand)"/>`;
    // Celso's amulet stall (right)
    s += `<path d="M330,196 L596,196 L590,214 L336,214Z" fill="#2f5a8a" stroke="${K}" stroke-width="1.4"/><path d="M336,214 L590,214" stroke="#e6c43a" stroke-width="3"/>`;
    s += `<rect x="338" y="214" width="5" height="110" fill="#3a2a1d"/><rect x="583" y="214" width="5" height="110" fill="#3a2a1d"/><rect x="343" y="222" width="240" height="3" fill="#6b5a3a"/>`;
    const am = ['#a5793b', '#8a8f96', '#a5793b', '#6b4b22', '#ffd24a', '#a5793b', '#8a8f96', '#6b4b22'];
    for (let i = 0; i < 8; i++) {
      const x = 362 + i * 28.5;
      if (A && i === 4) { s += `<path d="M${x},225 L${x},230" stroke="#555" stroke-width="1"/><path d="M${x - 2},230 Q${x},233 ${x + 2},230" stroke="#555" stroke-width="1" fill="none"/>`; continue; }
      s += `<path d="M${x},225 L${x},236" stroke="#3b2a1a" stroke-width="1"/><circle cx="${x}" cy="${i === 4 ? 243 : 241}" r="${i === 4 ? 8 : 6}" fill="${am[i]}" stroke="${K}" stroke-width="1"/>`;
      if (i === 4) s += `<path d="M${x},237 L${x + 4},245 L${x - 4},245Z" fill="none" stroke="#7a5a10" stroke-width="1"/><circle cx="${x - 3}" cy="${238}" r="1.4" fill="#fff"/>`;
      else s += `<circle cx="${x}" cy="241" r="2.4" fill="none" stroke="${K}" stroke-width=".6"/>`;
    }
    s += `<rect x="340" y="296" width="248" height="34" fill="#7a1f2c" stroke="${K}" stroke-width="1.4"/><path d="M340,306 L588,306" stroke="#e6c43a" stroke-width="2"/>`;
    // bottles of langis
    [[356, '#6a8a2a'], [372, '#a5562a'], [388, '#2a6a6a']].forEach(([x, col]) => { s += `<rect x="${x - 5}" y="276" width="10" height="20" rx="2" fill="${col}" opacity=".85" stroke="${K}" stroke-width=".8"/><rect x="${x - 2}" y="270" width="4" height="6" fill="#3a2a1d"/>`; });
    // kandelero (clue): on table before, on ground after
    const kand = (x, y, rot) => `<g transform="translate(${x},${y}) rotate(${rot})"><rect x="-2" y="-22" width="4" height="22" fill="#d6a53a" stroke="${K}" stroke-width=".8"/><ellipse cx="0" cy="0" rx="9" ry="3" fill="#c8952a" stroke="${K}" stroke-width=".8"/><ellipse cx="0" cy="-22" rx="5" ry="2" fill="#c8952a" stroke="${K}" stroke-width=".8"/><rect x="-1.6" y="-34" width="3.2" height="12" fill="#f2efe8"/></g>`;
    if (!A) s += kand(404, 296, 0); else s += kand(300, 372, -80) + `<circle cx="282" cy="374" r="2.2" fill="#8d1c1c" opacity=".8"/>`;
    // coin tin (clue)
    if (!A) s += `<rect x="506" y="280" width="28" height="16" rx="2" fill="#8a9aa8" stroke="${K}" stroke-width="1"/><ellipse cx="520" cy="280" rx="14" ry="3" fill="#a8b6c2" stroke="${K}" stroke-width="1"/>`;
    else { s += `<g transform="rotate(70 520 292)"><rect x="506" y="280" width="28" height="16" rx="2" fill="#8a9aa8" stroke="${K}" stroke-width="1"/></g>`; [[540, 300], [548, 304], [534, 306], [556, 299], [544, 310]].forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.6" fill="#e8c04a" stroke="${K}" stroke-width=".5"/>`; }); }
    // pigeons
    [[250, 330], [270, 338], [460, 360]].forEach(([x, y]) => { s += `<g transform="translate(${x},${y})"><ellipse cx="0" cy="0" rx="8" ry="5" fill="#8a8f9a" stroke="${K}" stroke-width=".8"/><circle cx="7" cy="-4" r="3" fill="#7a7f8a" stroke="${K}" stroke-width=".8"/><path d="M10,-4 L12,-3.4" stroke="#e8a03a" stroke-width="1.2"/></g>`; });
    // cracked lens (clue)
    if (A) s += `<g transform="translate(232,358) scale(1.4)"><ellipse cx="0" cy="0" rx="7" ry="5" fill="#cfe6f2" opacity=".85" stroke="#c9a24a" stroke-width="1.4"/><path d="M-5,-2 L1,1 L-2,4 M1,1 L5,-3" stroke="#fff" stroke-width=".7" fill="none"/></g>`;
    // receipt (clue)
    if (A) s += `<g transform="translate(150,380) rotate(-14) scale(1.3)"><rect x="-12" y="-8" width="24" height="16" fill="#fbf6e6" stroke="#8a7a5a" stroke-width=".8"/><path d="M-9,-4 L9,-4 M-9,-1 L6,-1" stroke="#888" stroke-width=".8"/><text x="0" y="6" font-family="Courier New,monospace" font-weight="700" font-size="5" fill="#b3262e" text-anchor="middle">20:40</text></g>`;
    // radio call-sign card (meta)
    if (A) s += `<g transform="translate(560,378) rotate(10) scale(1.4)"><rect x="-13" y="-8" width="26" height="16" rx="2" fill="#1d2a44" stroke="#c9d3e6" stroke-width="1"/><text x="0" y="-1" font-family="Arial Black,Arial,sans-serif" font-size="4.4" fill="#f2c94c" text-anchor="middle">BRAVO</text><text x="0" y="5.6" font-family="Arial Black,Arial,sans-serif" font-size="5.6" fill="#fff" text-anchor="middle">13</text></g>`;
    s += rain(r, 50, 0, 600, 0, 260, '#cfe0ff', .22);
    return s;
  }

  /* ---------------- CASE 5: DIVISORIA BODEGA ---------------- */
  function sceneBodega(A, p) {
    p = p || uid('b');
    const r = rng(5505);
    let s = `<defs>
      <radialGradient id="${p}bulb"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient>
      <linearGradient id="${p}wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a40"/><stop offset="1" stop-color="#26262b"/></linearGradient>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}wall)"/>`;
    for (let x = 0; x < 600; x += 16) s += `<line x1="${x}" y1="0" x2="${x}" y2="300" stroke="#2c2c31" stroke-width="3"/>`;
    s += `<rect x="0" y="0" width="600" height="22" fill="#1c1c20"/><path d="M0,22 L600,22 M150,0 L150,22 M300,0 L300,22 M450,0 L450,22" stroke="#4a4a52" stroke-width="4"/>`;
    s += `<line x1="300" y1="22" x2="300" y2="56" stroke="#111" stroke-width="2"/><circle cx="300" cy="62" r="7" fill="#fff3c4"/><ellipse cx="300" cy="150" rx="220" ry="140" fill="url(#${p}bulb)"/>`;
    // window (clue)
    s += `<rect x="420" y="80" width="104" height="74" fill="#0c1124" stroke="#1a1a1e" stroke-width="5"/>`;
    s += rain(rng(9), 14, 424, 520, 84, 150, '#cfe0ff', .4);
    if (!A) s += `<rect x="424" y="84" width="96" height="66" fill="#6a8aa8" opacity=".25"/><path d="M472,84 L472,150 M424,117 L520,117" stroke="#1a1a1e" stroke-width="4"/>`;
    else s += `<path d="M472,84 L500,72 L500,140 L472,150Z" fill="#6a8aa8" opacity=".35" stroke="#1a1a1e" stroke-width="3"/><path d="M424,84 L472,84 M424,150 L472,150" stroke="#1a1a1e" stroke-width="3"/>`;
    // shelves of fabric rolls
    s += `<rect x="18" y="70" width="250" height="232" fill="#4a3424" stroke="${K}" stroke-width="2"/>`;
    const fc = ['#c42b36', '#2f6ac4', '#e6c43a', '#2f8a4a', '#d96aa8', '#f2efe8', '#e07a2a', '#6a3a9a', '#3fb0b0'];
    for (let row = 0; row < 4; row++) {
      const y = 82 + row * 56;
      s += `<rect x="18" y="${y + 46}" width="250" height="6" fill="#6b4a2c"/>`;
      for (let i = 0; i < 9; i++) {
        const x = 26 + i * 27, col = fc[(i + row * 2) % fc.length];
        s += `<rect x="${x}" y="${y}" width="24" height="46" rx="3" fill="${col}" stroke="${K}" stroke-width="1"/><ellipse cx="${x + 12}" cy="${y + 4}" rx="10" ry="3" fill="#fff" opacity=".2"/>`;
      }
    }
    // burn (clue)
    if (A) {
      s += `<path d="M30,302 Q50,200 90,160 Q120,120 150,170 Q190,220 200,302Z" fill="#0b0908" opacity=".88"/>`;
      s += `<path d="M60,140 Q90,90 130,110 Q170,60 210,100" stroke="#111" stroke-width="18" fill="none" opacity=".45"/>`;
      s += `<path d="M90,302 Q96,280 104,292 Q110,270 120,290 Q128,276 134,302Z" fill="#ff7a1a"/><path d="M100,302 Q104,290 110,296 Q116,286 122,302Z" fill="#ffd24a"/>`;
    }
    // extinguisher (clue)
    s += `<rect x="322" y="170" width="18" height="6" fill="#555"/>`;
    if (!A) s += `<rect x="321" y="176" width="20" height="46" rx="8" fill="#d0262e" stroke="${K}" stroke-width="1.4"/><rect x="326" y="168" width="10" height="10" fill="#222"/><path d="M336,172 Q350,176 346,196" stroke="#222" stroke-width="3" fill="none"/><rect x="324" y="190" width="14" height="10" fill="#f2efe8"/>`;
    else s += `<rect x="321" y="176" width="20" height="46" rx="8" fill="none" stroke="#555" stroke-width="1" stroke-dasharray="3 3"/>`;
    // desk area
    s += `<rect x="370" y="262" width="200" height="12" fill="#6b4a2c" stroke="${K}" stroke-width="1.4"/><rect x="378" y="274" width="10" height="56" fill="#4a3424"/><rect x="552" y="274" width="10" height="56" fill="#4a3424"/><rect x="470" y="274" width="76" height="42" fill="#5a3e28" stroke="${K}" stroke-width="1.2"/>`;
    s += `<rect x="388" y="246" width="40" height="16" fill="#2a5a3a" stroke="${K}" stroke-width="1"/><path d="M450,262 L456,236 L470,236 L474,262Z" fill="#3a3a40" stroke="${K}" stroke-width="1"/><rect x="500" y="244" width="36" height="18" rx="3" fill="#222" stroke="${K}" stroke-width="1"/>`;
    // crates
    [[300, 300], [244, 318]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="50" height="34" fill="#a8824a" stroke="${K}" stroke-width="1.4"/><path d="M${x},${y} L${x + 50},${y + 34} M${x + 50},${y} L${x},${y + 34}" stroke="#7a5a2a" stroke-width="2"/>`; });
    s += `<rect x="0" y="330" width="600" height="70" fill="#2c2a28"/>`;
    for (let x = 0; x < 600; x += 60) s += `<line x1="${x}" y1="330" x2="${x - 20}" y2="400" stroke="#232120" stroke-width="2"/>`;
    // jerrycan (clue)
    if (A) s += `<g transform="translate(300,360) scale(1.2)"><path d="M-14,-14 L10,-14 L16,-8 L16,16 L-14,16Z" fill="#c42b2b" stroke="${K}" stroke-width="1.2"/><rect x="-10" y="-20" width="12" height="6" rx="2" fill="none" stroke="${K}" stroke-width="2"/><path d="M10,-14 L18,-22" stroke="#222" stroke-width="3"/><path d="M-10,-6 L12,8 M12,-6 L-10,8" stroke="#8a1a1a" stroke-width="1.2"/></g>`;
    // lighter (clue)
    if (A) s += `<g transform="translate(200,382) rotate(-18) scale(1.4)"><rect x="-6" y="-8" width="12" height="16" rx="2" fill="#c9ced4" stroke="${K}" stroke-width="1"/><path d="M-6,-3 L6,-3" stroke="${K}" stroke-width=".8"/><text x="0" y="5" font-family="Arial Black,Arial,sans-serif" font-size="4.4" fill="#555" text-anchor="middle">WC</text></g>`;
    // keys (clue)
    if (A) s += `<g transform="translate(525,372) scale(1.4)"><circle cx="-4" cy="0" r="4" fill="none" stroke="#c9ced4" stroke-width="1.4"/><rect x="0" y="-2" width="12" height="4" rx="1" fill="#1a1a1e" stroke="#c9ced4" stroke-width=".6"/><circle cx="-10" cy="4" r="3.6" fill="#e6c43a" stroke="${K}" stroke-width=".7"/><text x="-10" y="5.6" font-family="Arial Black,Arial,sans-serif" font-size="4.4" fill="#3a2a10" text-anchor="middle">C</text></g>`;
    // roster (meta)
    if (A) s += `<g transform="translate(430,352) rotate(8) scale(1.3)"><path d="M-14,-10 L14,-10 L12,-4 L14,2 L11,10 L-14,10Z" fill="#f2efe8" stroke="#8a7a5a" stroke-width=".8"/><path d="M-11,-6 L10,-6 M-11,-2 L8,-2 M-11,2 L10,2" stroke="#7a8aa8" stroke-width=".8"/><text x="-1" y="8" font-family="Courier New,monospace" font-weight="700" font-size="5" fill="#b3262e" text-anchor="middle">R.D.</text></g>`;
    return s;
  }

  /* ---------------- CASE 6: INTRAMUROS / FORT SANTIAGO ---------------- */
  function sceneIntramuros(A, p) {
    p = p || uid('i');
    const r = rng(6606);
    let s = `<defs>
      <linearGradient id="${p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0f22"/><stop offset="1" stop-color="#2a2a48"/></linearGradient>
      <radialGradient id="${p}lamp"><stop offset="0" stop-color="#ffd27a" stop-opacity=".7"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
      <radialGradient id="${p}moon"><stop offset="0" stop-color="#f6f0d0" stop-opacity=".5"/><stop offset="1" stop-color="#f6f0d0" stop-opacity="0"/></radialGradient>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}sky)"/>`;
    for (let i = 0; i < 40; i++) s += `<circle cx="${(r() * 600).toFixed(0)}" cy="${(r() * 110).toFixed(0)}" r="${(0.5 + r()).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.5).toFixed(2)}"/>`;
    s += `<circle cx="520" cy="50" r="60" fill="url(#${p}moon)"/><circle cx="520" cy="50" r="22" fill="#f3ecc8"/><circle cx="512" cy="44" r="4" fill="#ddd5ae"/><circle cx="528" cy="58" r="3" fill="#ddd5ae"/>`;
    // acacia
    s += `<rect x="540" y="150" width="14" height="160" fill="#2a1d14"/><ellipse cx="540" cy="140" rx="80" ry="40" fill="#14241a"/><ellipse cx="500" cy="124" rx="40" ry="24" fill="#1a2e20"/><ellipse cx="580" cy="130" rx="40" ry="26" fill="#1a2e20"/>`;
    // wall
    s += `<rect x="0" y="130" width="600" height="176" fill="#7a6650" stroke="${K}" stroke-width="1.5"/>`;
    for (let x = 0; x < 600; x += 40) s += `<rect x="${x}" y="112" width="24" height="20" fill="#7a6650" stroke="${K}" stroke-width="1.2"/>`;
    for (let y = 146; y < 306; y += 16) for (let x = (y / 16) % 2 ? 0 : -20; x < 600; x += 40) s += `<rect x="${x}" y="${y}" width="40" height="16" fill="none" stroke="#5e4d3c" stroke-width="1"/>`;
    for (let i = 0; i < 30; i++) s += `<circle cx="${(r() * 600).toFixed(0)}" cy="${(140 + r() * 160).toFixed(0)}" r="${(1 + r() * 2).toFixed(1)}" fill="#3a4a2a" opacity=".5"/>`;
    // gate
    s += `<path d="M52,306 L52,206 Q115,150 178,206 L178,306Z" fill="#141018" stroke="${K}" stroke-width="2"/>`;
    for (let x = 62; x < 178; x += 14) s += `<line x1="${x}" y1="${x < 80 || x > 150 ? 214 : 190}" x2="${x}" y2="306" stroke="#3a3a42" stroke-width="3"/>`;
    s += `<path d="M52,238 L178,238 M52,280 L178,280" stroke="#3a3a42" stroke-width="3"/>`;
    s += `<text x="115" y="140" font-family="Georgia,serif" font-weight="700" font-size="11" fill="#d8c9a0" text-anchor="middle">FUERZA DE SANTIAGO</text>`;
    // padlock (clue)
    s += `<g transform="translate(115,252) scale(1.4)">`;
    if (!A) s += `<path d="M-5,-4 L-5,-9 Q0,-15 5,-9 L5,-4" stroke="#b9bec6" stroke-width="2.4" fill="none"/><rect x="-7" y="-4" width="14" height="12" rx="2" fill="#c9a24a" stroke="${K}" stroke-width="1"/><circle cx="0" cy="2" r="1.6" fill="${K}"/>`;
    else s += `<path d="M-5,-4 L-5,-9 Q0,-15 5,-9 L5,-14" stroke="#b9bec6" stroke-width="2.4" fill="none"/><rect x="-7" y="-2" width="14" height="12" rx="2" fill="#c9a24a" stroke="${K}" stroke-width="1" transform="rotate(20)"/>`;
    s += `</g>`;
    // lamp (clue)
    if (!A) s += `<circle cx="230" cy="150" r="54" fill="url(#${p}lamp)"/>`;
    s += `<rect x="227" y="160" width="6" height="146" fill="#1d1d22" stroke="${K}" stroke-width="1"/><path d="M216,140 L244,140 L240,162 L220,162Z" fill="#1d1d22" stroke="${K}" stroke-width="1"/><path d="M222,144 L238,144 L236,158 L224,158Z" fill="${A ? '#3a3a40' : '#ffe7ae'}"/><path d="M216,140 L230,128 L244,140Z" fill="#1d1d22"/>`;
    // cannon
    s += `<g><path d="M280,290 L300,262 L380,262 L398,290Z" fill="#4a3424" stroke="${K}" stroke-width="1.5"/><circle cx="300" cy="294" r="14" fill="#3a2a1d" stroke="${K}" stroke-width="1.5"/><circle cx="380" cy="294" r="14" fill="#3a2a1d" stroke="${K}" stroke-width="1.5"/><path d="M292,250 L404,234 Q414,236 414,246 Q414,256 404,256 L292,266 Q284,258 292,250Z" fill="#2c3236" stroke="${K}" stroke-width="1.5"/><ellipse cx="410" cy="245" rx="4" ry="9" fill="#111"/></g>`;
    // ground
    s += `<rect x="0" y="306" width="600" height="94" fill="#5a5048"/>`;
    for (let y = 312; y < 400; y += 12) for (let x = (y / 12) % 2 ? 0 : 12; x < 600; x += 24) s += `<ellipse cx="${x}" cy="${y}" rx="10" ry="4.6" fill="#665a50" stroke="#463e38" stroke-width="1"/>`;
    // bench
    s += `<rect x="440" y="318" width="110" height="10" fill="#6b4a2c" stroke="${K}" stroke-width="1.2"/><rect x="440" y="300" width="110" height="8" fill="#6b4a2c" stroke="${K}" stroke-width="1.2"/><rect x="448" y="328" width="6" height="26" fill="#2a2a2e"/><rect x="536" y="328" width="6" height="26" fill="#2a2a2e"/>`;
    // flashlight (clue)
    if (A) s += `<g transform="translate(398,372) rotate(-10) scale(1.3)"><rect x="-14" y="-4" width="22" height="8" rx="2" fill="#2a2a30" stroke="${K}" stroke-width="1"/><path d="M8,-6 L14,-7 L14,7 L8,6Z" fill="#555" stroke="${K}" stroke-width="1"/><text x="-3" y="2.4" font-family="Arial Black,Arial,sans-serif" font-size="4" fill="#f2c94c" text-anchor="middle">FS</text></g>`;
    // batuta (clue)
    if (A) s += `<g transform="translate(488,352) rotate(12) scale(1.2)"><rect x="-22" y="-3" width="40" height="6" rx="3" fill="#141418" stroke="#444" stroke-width="1"/><rect x="6" y="-8" width="3" height="10" fill="#141418"/></g>`;
    // note (clue)
    if (A) s += `<g transform="translate(290,384) scale(1.3)"><path d="M-9,-6 L6,-8 L10,-1 L8,6 L-7,7 L-10,1Z" fill="#f2ecd8" stroke="#8a7a5a" stroke-width=".8"/><path d="M-6,-2 L5,-3 M-6,2 L4,1" stroke="#555" stroke-width=".7"/></g>`;
    // old photo (meta)
    if (A) s += `<g transform="translate(562,378) rotate(-12) scale(1.4)"><rect x="-11" y="-9" width="22" height="18" fill="#f6f0e0" stroke="#8a7a5a" stroke-width=".8"/><rect x="-9" y="-7" width="18" height="11" fill="#7a6a5a"/><circle cx="-4" cy="-3" r="2.2" fill="#d8b890"/><circle cx="4" cy="-3" r="2.2" fill="#d8b890"/><path d="M2,-5 L6,-1 M6,-5 L2,-1" stroke="#fff" stroke-width=".8"/></g>`;
    s += rain(r, 0, 0, 0, 0, 0);
    return s;
  }

  Object.assign(window.ART, { sceneQuiapo, sceneBodega, sceneIntramuros });
})();
