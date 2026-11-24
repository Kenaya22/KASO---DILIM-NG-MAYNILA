/* =========================================================
   KASO: DILIM NG MAYNILA — ART (lahat ng guhit ay SVG na nililikha sa code)
   ========================================================= */
(function () {
  'use strict';
  const K = '#17110d'; // outline ink
  let UID = 0;
  const uid = (p) => (p || 'u') + (++UID);

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------------- CHARACTERS ---------------- */
  // Local units: top of head at y=0, centre x=0. Head ~22 units tall.
  function torso(c) {
    const sw = 0.9, col = c.color || '#555', col2 = c.color2 || '#ddd', sk = c.skin;
    const base = 'M-5,24 Q-19,25.5 -21,34 L-22.5,88 L22.5,88 L21,34 Q19,25.5 5,24Z';
    let s = '';
    // pants + hands (only visible in full-body views)
    s += `<path d="M-17,84 L-16.5,170 L-2.5,170 L-1.2,98 L1.2,98 L2.5,170 L16.5,170 L17,84Z" fill="${c.pants || '#2d2a30'}" stroke="${K}" stroke-width="${sw}"/>`;
    switch (c.outfit) {
      case 'sando':
        s += `<path d="${base}" fill="${sk}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-11,26 Q-12,40 -14,44 L-15,88 L15,88 L14,44 Q12,40 11,26 Q6,36 0,36 Q-6,36 -11,26Z" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        if (c.towel) s += `<path d="M6,24 Q17,24 20,32 L22,48 L16,48 L14,34 Q10,29 4,29Z" fill="#e9e4d4" stroke="${K}" stroke-width="${sw}"/><path d="M16,36 L21,36 M17,41 L21.5,41" stroke="#c9423a" stroke-width="1"/>`;
        break;
      case 'guard':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<circle cx="-17" cy="36" r="3.2" fill="#e7c14a" stroke="${K}" stroke-width=".6"/><circle cx="-17" cy="36" r="1.6" fill="${col}"/>`;
        s += `<path d="M-10,40 l2,-3 l2,3 l-2,4z" fill="#e7c14a" stroke="${K}" stroke-width=".5"/>`;
        s += `<rect x="-13" y="46" width="8" height="7" fill="none" stroke="${K}" stroke-width=".6"/><rect x="5" y="46" width="8" height="7" fill="none" stroke="${K}" stroke-width=".6"/>`;
        s += `<path d="M0,30 L0,88" stroke="${K}" stroke-width=".6"/>`;
        for (let y = 36; y < 86; y += 10) s += `<circle cx="1.6" cy="${y}" r=".8" fill="#e7c14a"/>`;
        s += `<path d="M-15,36 L-16,88 M15,36 L16,88" stroke="${K}" stroke-width=".5" opacity=".6"/>`;
        if (c.torn) s += `<path d="M14,50 L16.5,48 L18,52 L20.5,49 L21.4,57 L18.5,55 L16,58.5 L14.5,54Z" fill="${sk}" stroke="${K}" stroke-width=".7"/>`;
        break;
      case 'apron':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-12,40 L12,40 L14,88 L-14,88Z" fill="#f1ece0" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-12,40 L-6,26 M12,40 L6,26" stroke="#f1ece0" stroke-width="2.2"/>`;
        for (let x = -12; x <= 12; x += 4) s += `<path d="M${x},42 L${x * 1.1},88" stroke="#c9473d" stroke-width=".5" opacity=".5"/>`;
        s += `<rect x="-6" y="58" width="12" height="8" fill="none" stroke="${K}" stroke-width=".6"/>`;
        break;
      case 'polo':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M0,28 L0,40" stroke="${K}" stroke-width=".7"/><circle cx="0" cy="33" r=".7" fill="${K}"/><circle cx="0" cy="38" r=".7" fill="${K}"/>`;
        s += `<path d="M-15,36 L-16,88 M15,36 L16,88" stroke="${K}" stroke-width=".5" opacity=".5"/>`;
        if (c.chain) s += `<path d="M-4,25 Q0,33 4,25" stroke="#e8c04a" stroke-width="1.1" fill="none"/>`;
        break;
      case 'barong':
        s += `<path d="${base}" fill="#ece2c6" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M0,26 L0,88" stroke="#b9a983" stroke-width=".6"/>`;
        for (let i = 0; i < 6; i++) s += `<path d="M-6,${34 + i * 6} q3,-3 6,0 q3,3 6,0" stroke="#bfae86" stroke-width=".5" fill="none"/>`;
        s += `<path d="M-15,36 L-16,88 M15,36 L16,88" stroke="${K}" stroke-width=".5" opacity=".5"/>`;
        break;
      case 'jacket':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-6,25 L-4,88 L4,88 L6,25Z" fill="${col2}" stroke="${K}" stroke-width=".7"/>`;
        s += `<path d="M-6,25 L-10,36 L-5,46 M6,25 L10,36 L5,46" stroke="${K}" stroke-width=".7" fill="none"/>`;
        s += `<path d="M-15,36 L-16,88 M15,36 L16,88" stroke="${K}" stroke-width=".5" opacity=".6"/>`;
        break;
      case 'suit':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-6,25 L0,48 L6,25Z" fill="#f4f1ea" stroke="${K}" stroke-width=".7"/>`;
        s += `<path d="M-1.5,27 L1.5,27 L2.2,44 L0,48 L-2.2,44Z" fill="${col2}" stroke="${K}" stroke-width=".5"/>`;
        s += `<path d="M-6,25 L-11,38 L-2,52 M6,25 L11,38 L2,52" stroke="${K}" stroke-width=".7" fill="none"/>`;
        s += `<path d="M-15,36 L-16,88 M15,36 L16,88" stroke="${K}" stroke-width=".5" opacity=".6"/>`;
        if (c.cuff) s += `<circle cx="-19.5" cy="82" r="1.3" fill="#e8c04a" stroke="${K}" stroke-width=".4"/>`;
        break;
      case 'vest':
        s += `<path d="${base}" fill="${col2}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-14,30 L-6,25 L-3,88 L-15,88Z M14,30 L6,25 L3,88 L15,88Z" fill="${col}" stroke="${K}" stroke-width=".7"/>`;
        s += `<path d="M-14,56 L-3.5,56 M3.5,56 L14.6,56 M-14.6,66 L-3.5,66 M3.5,66 L14.8,66" stroke="#f1f1d8" stroke-width="2"/>`;
        break;
      case 'blouse':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-15,36 L-16,88 M15,36 L16,88" stroke="${K}" stroke-width=".5" opacity=".5"/>`;
        for (let i = 0; i < 9; i++) s += `<circle cx="${-12 + (i % 3) * 12}" cy="${40 + Math.floor(i / 3) * 14}" r="1.4" fill="#ffffff" opacity=".35"/>`;
        break;
      case 'sequin':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        for (let i = 0; i < 40; i++) { const x = -19 + ((i * 7.3) % 38), y = 30 + ((i * 11.7) % 56); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".7" fill="#ffd6ec" opacity=".8"/>`; }
        break;
      case 'waiter':
        s += `<path d="${base}" fill="#f2efe8" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-14,30 L-6,25 L-1,62 L-14,88Z M14,30 L6,25 L1,62 L14,88Z" fill="#1d1c22" stroke="${K}" stroke-width=".7"/>`;
        s += `<path d="M-4,27 L0,29 L4,27 L4,31 L0,29 L-4,31Z" fill="#b3262e" stroke="${K}" stroke-width=".5"/>`;
        break;
      case 'soco':
        s += `<path d="${base}" fill="#e8e4da" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-15,30 L-6,25 L-4,88 L-16,88Z M15,30 L6,25 L4,88 L16,88Z" fill="#1d2a44" stroke="${K}" stroke-width=".7"/>`;
        s += `<text x="10.5" y="44" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="4.2" fill="#f2c94c" text-anchor="middle">SOCO</text>`;
        break;
      case 'coat':
        s += `<path d="M-5,24 Q-21,25.5 -23,34 L-25,88 L25,88 L23,34 Q21,25.5 5,24Z" fill="#0b0b10" stroke="#000" stroke-width="${sw}"/>`;
        s += `<path d="M-6,25 L-12,40 L-3,60 M6,25 L12,40 L3,60" stroke="#26262e" stroke-width="1" fill="none"/>`;
        break;
      case 'police':
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-10,40 l2,-3 l2,3 l-2,4z" fill="#e7c14a" stroke="${K}" stroke-width=".5"/>`;
        s += `<path d="M0,28 L0,88" stroke="${K}" stroke-width=".6"/>`;
        break;
      default: // tshirt
        s += `<path d="${base}" fill="${col}" stroke="${K}" stroke-width="${sw}"/>`;
        s += `<path d="M-15,36 L-16,88 M15,36 L16,88" stroke="${K}" stroke-width=".5" opacity=".5"/>`;
    }
    // hands
    s += `<ellipse cx="-20.5" cy="90" rx="3.2" ry="4" fill="${sk}" stroke="${K}" stroke-width="${sw}"/><ellipse cx="20.5" cy="90" rx="3.2" ry="4" fill="${sk}" stroke="${K}" stroke-width="${sw}"/>`;
    return s;
  }

  function collar(c) {
    const col = c.color || '#555';
    switch (c.outfit) {
      case 'polo': return `<path d="M-5,24 L-1,30 L0,26 L1,30 L5,24 L3,22.5 L0,25 L-3,22.5Z" fill="${col}" stroke="${K}" stroke-width=".7"/>`;
      case 'guard': return `<path d="M-5.5,23.5 L-1,30 L-3,22.5Z M5.5,23.5 L1,30 L3,22.5Z" fill="${col}" stroke="${K}" stroke-width=".7"/>`;
      case 'police': return `<path d="M-5.5,23.5 L-1,30 L-3,22.5Z M5.5,23.5 L1,30 L3,22.5Z" fill="${col}" stroke="${K}" stroke-width=".7"/>`;
      case 'barong': return `<path d="M-4.2,22.5 L-4.2,25.5 L4.2,25.5 L4.2,22.5" fill="#ece2c6" stroke="${K}" stroke-width=".7"/>`;
      case 'tshirt': return `<path d="M-5,24.5 Q0,28 5,24.5" fill="none" stroke="${K}" stroke-width=".8"/>`;
      case 'blouse': case 'sequin': return `<path d="M-5,24 L0,31 L5,24" fill="${c.skin}" stroke="${K}" stroke-width=".7"/>`;
      default: return '';
    }
  }

  function face(e, c) {
    const ey = 11.4;
    let s = '';
    const dot = (x) => `<ellipse cx="${x}" cy="${ey}" rx="0.95" ry="1.35" fill="${K}"/>`;
    const brow = (d, w) => `<path d="${d}" stroke="${c.browColor || K}" stroke-width="${w || 1}" stroke-linecap="round" fill="none"/>`;
    switch (e) {
      case 'angry':
        s += dot(-3.6) + dot(3.6);
        s += brow('M-6.2,7.6 L-1.6,9.6', 1.4) + brow('M6.2,7.6 L1.6,9.6', 1.4);
        s += `<path d="M-3.2,17 Q0,15.4 3.2,17 Q0,20.2 -3.2,17Z" fill="#fff" stroke="${K}" stroke-width=".7"/><path d="M-3,17.4 L3,17.4" stroke="${K}" stroke-width=".4"/>`;
        break;
      case 'shock':
        s += `<circle cx="-3.6" cy="${ey}" r="1.9" fill="#fff" stroke="${K}" stroke-width=".6"/><circle cx="3.6" cy="${ey}" r="1.9" fill="#fff" stroke="${K}" stroke-width=".6"/><circle cx="-3.6" cy="${ey}" r=".7" fill="${K}"/><circle cx="3.6" cy="${ey}" r=".7" fill="${K}"/>`;
        s += brow('M-6,7.2 Q-3.6,5.6 -1.6,7.2') + brow('M6,7.2 Q3.6,5.6 1.6,7.2');
        s += `<ellipse cx="0" cy="18.2" rx="1.6" ry="2.2" fill="#7a1e22" stroke="${K}" stroke-width=".6"/>`;
        s += `<path d="M8.6,4 q1.2,2 0,3 q-1.2,-1 0,-3z" fill="#9fd3ff" stroke="${K}" stroke-width=".3"/>`;
        break;
      case 'smug':
        s += `<path d="M-5,11.6 Q-3.6,10.4 -2.2,11.6" stroke="${K}" stroke-width="1" fill="none"/><path d="M2.2,11.6 Q3.6,10.4 5,11.6" stroke="${K}" stroke-width="1" fill="none"/>`;
        s += brow('M-6,8.6 L-1.8,8.8') + brow('M6,7.2 L1.8,8.6');
        s += `<path d="M-2.4,17.6 Q1,18.6 3.2,16.4" stroke="${K}" stroke-width=".8" fill="none"/>`;
        break;
      case 'sad':
        s += dot(-3.6) + dot(3.6);
        s += brow('M-6,9.2 L-2,7.6') + brow('M6,9.2 L2,7.6');
        s += `<path d="M-2.2,18.6 Q0,16.9 2.2,18.6" stroke="${K}" stroke-width=".8" fill="none"/>`;
        break;
      case 'nervous':
        s += dot(-3.6) + dot(3.6);
        s += brow('M-6,8.6 L-2,7.8') + brow('M6,8.6 L2,7.8');
        s += `<path d="M-2.6,17.6 q.9,-.8 1.7,0 q.9,.8 1.7,0 q.9,-.8 1.7,0" stroke="${K}" stroke-width=".7" fill="none"/>`;
        s += `<path d="M8.8,5 q1.3,2.2 0,3.2 q-1.3,-1 0,-3.2z" fill="#9fd3ff" stroke="${K}" stroke-width=".3"/>`;
        break;
      case 'determined':
        s += dot(-3.6) + dot(3.6);
        s += brow('M-6.4,8.2 L-1.8,9.2', 1.5) + brow('M6.4,8.2 L1.8,9.2', 1.5);
        s += `<path d="M-2,17.6 L2.2,17.4" stroke="${K}" stroke-width=".9"/>`;
        break;
      case 'shout':
        s += dot(-3.6) + dot(3.6);
        s += brow('M-6.4,7.6 L-1.6,9.6', 1.5) + brow('M6.4,7.6 L1.6,9.6', 1.5);
        s += `<path d="M-3.6,16.4 Q0,15.6 3.6,16.4 Q3,21.4 0,21.4 Q-3,21.4 -3.6,16.4Z" fill="#7a1e22" stroke="${K}" stroke-width=".7"/><path d="M-3.2,16.6 L3.2,16.6 L3,17.6 L-3,17.6Z" fill="#fff"/>`;
        break;
      case 'closed':
        s += `<path d="M-5,11.6 Q-3.6,12.8 -2.2,11.6" stroke="${K}" stroke-width="1" fill="none"/><path d="M2.2,11.6 Q3.6,12.8 5,11.6" stroke="${K}" stroke-width="1" fill="none"/>`;
        s += brow('M-6,8.4 L-2,8.2') + brow('M6,8.4 L2,8.2');
        s += `<path d="M-2,17.8 L2,17.8" stroke="${K}" stroke-width=".8"/>`;
        break;
      default:
        s += dot(-3.6) + dot(3.6);
        s += brow('M-6,8.4 Q-4,7.6 -2,8.3') + brow('M6,8.4 Q4,7.6 2,8.3');
        s += `<path d="M-2,17.8 Q0,18.4 2,17.8" stroke="${K}" stroke-width=".8" fill="none"/>`;
    }
    s += `<path d="M0.4,12.6 Q-1.1,15 0.7,15.4" stroke="${K}" stroke-width=".7" fill="none" stroke-linecap="round"/>`;
    if (c.lipstick && e !== 'shock' && e !== 'shout' && e !== 'angry') s += `<path d="M-1.8,17.6 Q0,19 1.8,17.6 Q0,17 -1.8,17.6Z" fill="#c0284a"/>`;
    return s;
  }

  function hairFront(c) {
    const hc = c.hairColor || '#1a1410', st = `fill="${hc}" stroke="${K}" stroke-width=".9"`;
    switch (c.hair) {
      case 'messy':
        return `<path d="M-10.2,12 Q-11.5,-2 0,-2.6 Q11.5,-2 10.2,12 L9,6.5 L7,8.8 L5.6,4.6 L2.4,7.6 L0.6,3.6 L-2.6,7.2 L-4.6,4 L-7,7.6 L-8.6,5.4Z" ${st}/><path d="M-6,-1.4 L-9,-5 L-3,-2.4 L-2,-6 L1.6,-2.6 L5,-5.4 L5.6,-1.8 L9.6,-3.6 L8,0.4" ${st}/>`;
      case 'short':
        return `<path d="M-9.7,10.5 Q-10.6,-1.6 0,-1.9 Q10.6,-1.6 9.7,10.5 Q9,5 6,4 Q0,6.2 -6,4 Q-9,5 -9.7,10.5Z" ${st}/>`;
      case 'slick':
        return `<path d="M-9.7,9.5 Q-10.6,-2.2 0,-2.2 Q10.6,-2.2 9.7,9.5 Q8,3 1,2.6 Q-7,2.8 -9.7,9.5Z" ${st}/><path d="M-4,0 Q1,-1 6,1" stroke="#fff" stroke-width=".7" opacity=".45" fill="none"/>`;
      case 'buzz':
        return `<path d="M-9.3,8 Q-9.6,-0.9 0,-1.1 Q9.6,-0.9 9.3,8 Q8,3.6 0,3.7 Q-8,3.6 -9.3,8Z" fill="${hc}" opacity=".9"/>`;
      case 'bun':
        return `<path d="M-9.7,11 Q-10.6,-1.6 0,-1.6 Q10.6,-1.6 9.7,11 Q7.4,3 1,3.4 Q-2,5 -4,4 Q-8,4 -9.7,11Z" ${st}/>`;
      case 'long':
        return `<path d="M-10.6,17 Q-11.2,-2.2 0,-2.2 Q11.2,-2.2 10.6,17 Q9.4,6 4,3 Q-2,6.4 -7.4,4.8 Q-9.8,8 -10.6,17Z" ${st}/>`;
      case 'pony':
        return `<path d="M-9.8,11 Q-10.6,-2 0,-2 Q10.6,-2 9.8,11 Q9,4 3,3.6 Q-3,5.4 -6,3.6 Q-9,5 -9.8,11Z" ${st}/>`;
      case 'curly': {
        let s = '';
        const pts = [[-9, 8], [-9.6, 3], [-7.4, -0.6], [-4, -2.4], [0, -3], [4, -2.4], [7.4, -0.6], [9.6, 3], [9, 8], [-5, 1.6], [0, 0.6], [5, 1.6]];
        pts.forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="3.1" ${st}/>`; });
        return s;
      }
      case 'bald':
        return `<path d="M-9.4,9 Q-10.2,5 -8.6,3.6 L-8.2,11.6Z M9.4,9 Q10.2,5 8.6,3.6 L8.2,11.6Z" fill="${hc}"/><path d="M-3,2 Q0,1 3,2" stroke="#fff" stroke-width=".8" opacity=".5" fill="none"/>`;
      default: return '';
    }
  }

  function hat(c) {
    switch (c.hat) {
      case 'guardcap':
        return `<path d="M-10.4,5.6 Q-10.6,-5 0,-5.4 Q10.6,-5 10.4,5.6Z" fill="${c.hatColor || '#1e2f4f'}" stroke="${K}" stroke-width=".9"/><path d="M-11,5.2 Q0,3.2 11,5.2 L12.2,7.8 Q0,6.2 -12.2,7.8Z" fill="#111" stroke="${K}" stroke-width=".7"/><circle cx="0" cy="0.4" r="2.2" fill="#e7c14a" stroke="${K}" stroke-width=".5"/>`;
      case 'police':
        return `<path d="M-10.4,5.6 Q-11.6,-4 0,-6 Q11.6,-4 10.4,5.6Z" fill="${c.hatColor || '#1c2740'}" stroke="${K}" stroke-width=".9"/><path d="M-11,5.2 Q0,3.2 11,5.2 L12.2,7.8 Q0,6.2 -12.2,7.8Z" fill="#111"/><path d="M-2,-2 L0,-4 L2,-2 L0,1Z" fill="#e7c14a"/>`;
      case 'cap':
        return `<path d="M-10,6 Q-10.4,-4.4 0,-4.6 Q10.4,-4.4 10,6Z" fill="${c.hatColor || '#a5342b'}" stroke="${K}" stroke-width=".9"/><path d="M-1,5 Q8,3.6 15,6.4 Q12,8.4 -1,7.4Z" fill="${c.hatColor || '#a5342b'}" stroke="${K}" stroke-width=".8"/>`;
      case 'fedora':
        return `<ellipse cx="0" cy="4.4" rx="16" ry="3" fill="#0b0b10" stroke="#000" stroke-width=".8"/><path d="M-9,4.4 Q-10,-7 0,-7.4 Q10,-7 9,4.4Z" fill="#0b0b10" stroke="#000" stroke-width=".8"/><path d="M-9,1.6 L9,1.6 L9,3.6 L-9,3.6Z" fill="#3a1418"/>`;
      case 'bandana':
        return `<path d="M-10,6 Q-10.6,-3.6 0,-4 Q10.6,-3.6 10,6 Q0,3 -10,6Z" fill="${c.hatColor || '#c2473a'}" stroke="${K}" stroke-width=".8"/>`;
      default: return '';
    }
  }

  function figure(c, expr) {
    expr = expr || 'neutral';
    const sw = 0.9, sk = c.skin, hc = c.hairColor || '#1a1410';
    if (c.silhouette) {
      return `<path d="M-5,24 Q-21,25.5 -23,34 L-25,170 L25,170 L23,34 Q21,25.5 5,24Z" fill="#050507"/><path d="M-9,8 Q-9,0 0,0 Q9,0 9,8 L9,13 Q8.5,21.5 0,22.5 Q-8.5,21.5 -9,13Z" fill="#050507"/>` + hat({ hat: 'fedora' }) +
        `<path d="M-5.4,11.6 L-2,12 M2,12 L5.4,11.6" stroke="#ff3b3b" stroke-width="1" stroke-linecap="round"/>`;
    }
    let s = '';
    if (c.hair === 'long') s += `<path d="M-10.8,7 Q-13.4,27 -11.4,40 L11.4,40 Q13.4,27 10.8,7Z" fill="${hc}" stroke="${K}" stroke-width="${sw}"/>`;
    if (c.hair === 'pony') s += `<path d="M5,1 Q17,3 16,16 Q15,28 9,32 Q12,18 6,8Z" fill="${hc}" stroke="${K}" stroke-width="${sw}"/>`;
    if (c.hair === 'bun') s += `<circle cx="0" cy="-3" r="5" fill="${hc}" stroke="${K}" stroke-width="${sw}"/>`;
    s += torso(c);
    s += `<path d="M-3.4,18 L-3.4,27 L3.4,27 L3.4,18Z" fill="${sk}" stroke="${K}" stroke-width="${sw}"/>`;
    s += collar(c);
    s += `<ellipse cx="-9" cy="12" rx="2.2" ry="3" fill="${sk}" stroke="${K}" stroke-width="${sw}"/><ellipse cx="9" cy="12" rx="2.2" ry="3" fill="${sk}" stroke="${K}" stroke-width="${sw}"/>`;
    if (c.earrings) s += `<circle cx="-9.4" cy="15.6" r="1" fill="#f0c94b" stroke="${K}" stroke-width=".3"/><circle cx="9.4" cy="15.6" r="1" fill="#f0c94b" stroke="${K}" stroke-width=".3"/>`;
    let head = 'M-9,8 Q-9,0 0,0 Q9,0 9,8 L9,13 Q8.5,21.5 0,22.5 Q-8.5,21.5 -9,13Z';
    if (c.jaw === 'square') head = 'M-9.4,8 Q-9.4,0 0,0 Q9.4,0 9.4,8 L9.4,16 Q8.4,22.4 0,22.8 Q-8.4,22.4 -9.4,16Z';
    if (c.heavy) head = 'M-10,8 Q-10,0 0,0 Q10,0 10,8 L10.6,15 Q9.4,23.4 0,23.4 Q-9.4,23.4 -10.6,15Z';
    s += `<path d="${head}" fill="${sk}" stroke="${K}" stroke-width="${sw}"/>`;
    if (c.stubble) s += `<path d="M-8.4,14.6 Q-7.4,21.8 0,22.3 Q7.4,21.8 8.4,14.6 Q6,19.6 0,19.8 Q-6,19.6 -8.4,14.6Z" fill="${K}" opacity=".2"/>`;
    if (c.wrinkles) s += `<path d="M-4,5.4 L4,5.4 M-3,6.8 L3,6.8" stroke="${K}" stroke-width=".35" opacity=".6"/>`;
    s += `<ellipse cx="-5.8" cy="15" rx="2" ry="1.1" fill="#e0706a" opacity=".3"/><ellipse cx="5.8" cy="15" rx="2" ry="1.1" fill="#e0706a" opacity=".3"/>`;
    s += face(expr, c);
    if (c.mole) s += `<circle cx="-5" cy="17.6" r=".45" fill="${K}"/>`;
    if (c.mustache) s += `<path d="M-4,16.5 Q0,14.4 4,16.5 Q2,17.3 0,16.7 Q-2,17.3 -4,16.5Z" fill="${c.mustacheColor || hc}"/>`;
    if (c.glasses) s += `<g fill="rgba(210,235,255,.25)" stroke="${K}" stroke-width=".7"><rect x="-6.8" y="9.3" width="5.2" height="4" rx="1.2"/><rect x="1.6" y="9.3" width="5.2" height="4" rx="1.2"/></g><path d="M-1.6,11 L1.6,11" stroke="${K}" stroke-width=".6"/>`;
    if (c.shades) s += `<path d="M-7.6,9.4 L-1.2,9.4 L-1.6,13 Q-4.6,14.2 -7.2,12.6Z M7.6,9.4 L1.2,9.4 L1.6,13 Q4.6,14.2 7.2,12.6Z" fill="#141418" stroke="${K}" stroke-width=".5"/><path d="M-1.2,10 L1.2,10" stroke="${K}" stroke-width=".6"/>`;
    s += hairFront(c);
    s += hat(c);
    return s;
  }

  function portrait(c, expr, extra) {
    return `<svg viewBox="-24 -6 48 50" xmlns="http://www.w3.org/2000/svg" ${extra || ''}><g>${figure(c, expr)}</g></svg>`;
  }

  // Full-body lineup chart, viewBox 600x440. Shows 100cm..195cm.
  function lineup(list, selId) {
    const top = 196, bot = 96, H = 440, pad = 14;
    const pxcm = (H - pad) / (top - bot);
    const y = (cm) => pad + (top - cm) * pxcm;
    let s = `<svg viewBox="0 0 600 ${H}" xmlns="http://www.w3.org/2000/svg" class="lineup-svg"><rect width="600" height="${H}" fill="#f2ecdf"/>`;
    for (let cm = 100; cm <= 195; cm += 5) {
      const major = cm % 10 === 0, yy = y(cm).toFixed(1);
      s += `<line x1="44" x2="556" y1="${yy}" y2="${yy}" stroke="#1d1a18" stroke-width="${major ? 2.2 : 0.8}" opacity="${major ? .9 : .5}"/>`;
      if (major) s += `<text x="22" y="${(+yy + 5).toFixed(1)}" font-family="Oswald,Arial Narrow,sans-serif" font-size="14" font-weight="700" fill="#1d1a18" text-anchor="middle">${cm}</text><text x="578" y="${(+yy + 5).toFixed(1)}" font-family="Oswald,Arial Narrow,sans-serif" font-size="14" font-weight="700" fill="#1d1a18" text-anchor="middle">${cm}</text>`;
    }
    const n = list.length, span = 520 / n;
    list.forEach((p, i) => {
      const cx = 40 + span * (i + 0.5);
      const k = pxcm * 0.98;
      const sel = p.id === selId;
      s += `<g class="lu-fig${sel ? ' sel' : ''}" data-suspect="${p.id}" style="cursor:pointer">`;
      s += `<rect x="${cx - span / 2 + 4}" y="0" width="${span - 8}" height="${H}" fill="${sel ? 'rgba(63,208,201,.18)' : 'transparent'}"/>`;
      s += `<g transform="translate(${cx.toFixed(1)},${y(p.h).toFixed(1)}) scale(${k.toFixed(3)})">${figure(p.look, sel ? 'nervous' : 'neutral')}</g>`;
      s += `<g transform="translate(${cx.toFixed(1)},${H - 46})"><rect x="-58" y="0" width="116" height="38" rx="3" fill="#17110d" opacity=".92"/><text x="0" y="16" font-family="Oswald,Arial Narrow,sans-serif" font-size="15" font-weight="700" fill="#f6ecd2" text-anchor="middle">${p.name}</text><text x="0" y="31" font-family="Kalam,Comic Sans MS,sans-serif" font-size="11" fill="#e1b866" text-anchor="middle">${p.h} cm</text></g>`;
      s += `</g>`;
    });
    s += `</svg>`;
    return s;
  }

  /* ---------------- SHARED SCENE BITS ---------------- */
  function rain(r, n, x0, x1, y0, y1, col, op) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = x0 + r() * (x1 - x0), yy = y0 + r() * (y1 - y0), l = 9 + r() * 14;
      s += `<line x1="${x.toFixed(1)}" y1="${yy.toFixed(1)}" x2="${(x - 3).toFixed(1)}" y2="${(yy + l).toFixed(1)}" stroke="${col || '#b9c6e6'}" stroke-width=".8" opacity="${op || .32}"/>`;
    }
    return s;
  }
  function skyline(r, yBase, col, x0, x1) {
    let s = '', x = x0 || 0; x1 = x1 || 600;
    while (x < x1) {
      const w = 28 + r() * 46, hh = 40 + r() * 95, y = yBase - hh;
      s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(hh + 12).toFixed(1)}" fill="${col}"/>`;
      for (let wy = y + 8; wy < yBase - 8; wy += 12) for (let wx = x + 5; wx < x + w - 7; wx += 10) {
        const lit = r() < 0.33;
        if (lit) s += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="4" height="5" fill="#f3c86a" opacity="${(0.45 + r() * 0.4).toFixed(2)}"/>`;
      }
      x += w + 2;
    }
    return s;
  }
  function neon(x, y, w, text, col, glow, fs) {
    return `<g><rect x="${x}" y="${y}" width="${w}" height="${(fs || 13) + 11}" rx="3" fill="#140c18" stroke="${col}" stroke-width="2"/><rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${(fs || 13) + 17}" rx="5" fill="none" stroke="${col}" stroke-width="1" opacity=".35"/><text x="${x + w / 2}" y="${y + (fs || 13) + 4}" font-family="Arial Black,Impact,sans-serif" font-size="${fs || 13}" fill="${glow}" text-anchor="middle" letter-spacing="1">${text}</text></g>`;
  }

  /* ---------------- CASE 1 SCENE: JONES BRIDGE ---------------- */
  function sceneTulay(A, p) {
    p = p || uid('t');
    const r = rng(1301);
    let s = `<defs>
      <linearGradient id="${p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1022"/><stop offset=".6" stop-color="#2b2240"/><stop offset="1" stop-color="#433251"/></linearGradient>
      <linearGradient id="${p}riv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123440"/><stop offset="1" stop-color="#06161b"/></linearGradient>
      <radialGradient id="${p}glow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
      <linearGradient id="${p}road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c2a35"/><stop offset="1" stop-color="#16151b"/></linearGradient>
      <linearGradient id="${p}cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3a0" stop-opacity=".38"/><stop offset="1" stop-color="#ffe3a0" stop-opacity="0"/></linearGradient>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}sky)"/>`;
    s += skyline(r, 168, '#151428');
    s += neon(62, 98, 100, 'SANGLAAN', '#ff4fa3', '#ff9ccf');
    s += neon(470, 84, 60, 'KTV', '#3fd0ff', '#a8ecff', 15);
    // bridge
    s += `<rect x="0" y="160" width="600" height="5" fill="#867c93"/>`;
    for (let bx = 2; bx < 600; bx += 9) s += `<rect x="${bx}" y="165" width="4" height="11" fill="#776d86"/>`;
    s += `<rect x="0" y="176" width="600" height="16" fill="#6b6377" stroke="${K}" stroke-width="1.5"/>`;
    s += `<rect x="0" y="192" width="600" height="46" fill="#4c4559"/>`;
    [[-40, 180], [180, 400], [400, 620]].forEach(([a, b]) => {
      s += `<path d="M${a + 24},238 L${a + 24},216 Q${(a + b) / 2},178 ${b - 24},216 L${b - 24},238Z" fill="#110e1b"/>`;
      s += `<path d="M${a + 24},216 Q${(a + b) / 2},178 ${b - 24},216" fill="none" stroke="#7d7390" stroke-width="2"/>`;
    });
    [70, 290, 510].forEach((lx) => {
      s += `<circle cx="${lx}" cy="132" r="30" fill="url(#${p}glow)"/>`;
      s += `<rect x="${lx - 1.6}" y="134" width="3.2" height="30" fill="#3a3340"/><path d="M${lx - 7},130 Q${lx},120 ${lx + 7},130 L${lx + 5},136 L${lx - 5},136Z" fill="#2b2530"/><circle cx="${lx}" cy="132" r="4.4" fill="#ffe7ae"/>`;
    });
    // river
    s += `<rect x="0" y="238" width="600" height="36" fill="url(#${p}riv)"/>`;
    [70, 290, 510].forEach((lx) => {
      for (let k = 0; k < 6; k++) s += `<rect x="${lx - 7 + (k % 2) * 4}" y="${241 + k * 5.4}" width="${13 - k}" height="1.8" fill="#ffd27a" opacity="${(0.55 - k * 0.08).toFixed(2)}"/>`;
    });
    s += `<rect x="0" y="272" width="600" height="14" fill="#5a5260"/>`;
    for (let qx = 0; qx < 600; qx += 30) s += `<line x1="${qx}" y1="272" x2="${qx}" y2="286" stroke="#3e3746" stroke-width="1"/>`;
    s += `<rect x="0" y="286" width="600" height="114" fill="url(#${p}road)"/>`;
    s += `<ellipse cx="80" cy="364" rx="62" ry="9" fill="#3d3c4e" opacity=".85"/><ellipse cx="72" cy="362" rx="30" ry="2.4" fill="#ffd27a" opacity=".2"/>`;
    s += `<ellipse cx="520" cy="386" rx="74" ry="8" fill="#3d3c4e" opacity=".85"/><ellipse cx="540" cy="384" rx="30" ry="2.2" fill="#ffe3a0" opacity=".25"/>`;
    s += `<ellipse cx="236" cy="300" rx="40" ry="4" fill="#3d3c4e" opacity=".6"/>`;
    // street lamp
    s += `<path d="M528,162 L470,350 L600,350 L566,162Z" fill="url(#${p}cone)"/>`;
    s += `<rect x="549" y="158" width="7" height="190" fill="#2c2a33" stroke="${K}" stroke-width="1"/><path d="M552,160 Q552,146 538,148" stroke="#2c2a33" stroke-width="5" fill="none"/><path d="M528,154 L548,154 L544,162 L532,162Z" fill="#2c2a33"/><ellipse cx="538" cy="162" rx="7" ry="2.4" fill="#fff0c0"/><rect x="543" y="342" width="19" height="8" fill="#2c2a33"/>`;
    // ---- car ----
    const body = '#7d1f2c', dark = '#4a121b';
    s += `<ellipse cx="302" cy="346" rx="206" ry="11" fill="#000" opacity=".45"/>`;
    s += `<path d="M108,330 L106,300 Q108,283 130,279 L196,272 L232,226 Q238,218 250,218 L372,218 Q386,218 394,228 L428,270 L476,278 Q494,283 496,300 L496,330 Q496,336 488,336 L116,336 Q108,336 108,330Z" fill="${body}" stroke="${K}" stroke-width="2"/>`;
    s += `<path d="M112,312 L492,312" stroke="${dark}" stroke-width="2"/><path d="M200,276 L428,272" stroke="#a33a48" stroke-width="1.4" opacity=".7"/>`;
    // windows
    s += `<g stroke="${K}" stroke-width="1.5"><path d="M240,228 L296,228 L296,268 L214,268Z" fill="#1d2633"/><path d="M304,228 L374,228 Q384,229 388,236 L414,268 L304,268Z" fill="#1d2633"/></g>`;
    s += `<path d="M232,268 Q236,246 250,244 L258,244 Q262,252 260,268Z" fill="#2f3a49"/><path d="M318,268 Q320,244 334,242 L340,242 Q344,252 342,268Z" fill="#2f3a49"/>`;
    s += `<path d="M304,256 L408,256" stroke="#0e131b" stroke-width="5"/>`;
    s += `<path d="M250,230 L230,264 M360,230 L338,264" stroke="#fff" stroke-width="2" opacity=".1"/>`;
    s += `<rect x="296" y="226" width="8" height="44" fill="${body}" stroke="${K}" stroke-width="1"/>`;
    s += `<path d="M300,270 L300,330 M210,272 Q206,300 210,330 M412,270 L420,330" stroke="${dark}" stroke-width="1.6" fill="none"/>`;
    s += `<rect x="258" y="282" width="18" height="5" rx="2" fill="#c9c3b8" stroke="${K}" stroke-width=".8"/><rect x="351" y="282" width="18" height="5" rx="2" fill="#c9c3b8" stroke="${K}" stroke-width=".8"/>`;
    s += `<ellipse cx="489" cy="292" rx="6" ry="5" fill="#ffe9b0" stroke="${K}" stroke-width="1"/><rect x="108" y="286" width="7" height="11" fill="#d02a2a" stroke="${K}" stroke-width="1"/>`;
    s += `<path d="M106,322 L120,322 M484,322 L496,322" stroke="#c9c3b8" stroke-width="4"/>`;
    [[172, 334], [428, 334]].forEach(([wx, wy]) => { s += `<circle cx="${wx}" cy="${wy}" r="28" fill="#141318" stroke="${K}" stroke-width="2"/><circle cx="${wx}" cy="${wy}" r="14" fill="#9a98a0"/><circle cx="${wx}" cy="${wy}" r="5" fill="#5a5862"/>`; });
    // wiper (both)
    s += `<path d="M430,272 L468,277" stroke="#111" stroke-width="2.2"/>`;
    // clock (clue)
    s += `<g transform="translate(337 250) scale(1.4) translate(-337 -250)"><rect x="321" y="243" width="32" height="14" rx="1.5" fill="#05080a" stroke="#3a3f47" stroke-width="1"/>`;
    if (!A) s += `<text x="337" y="254" font-family="Courier New,monospace" font-weight="700" font-size="10" fill="#5dff8a" text-anchor="middle">6:50</text>`;
    else s += `<text x="337" y="254" font-family="Courier New,monospace" font-weight="700" font-size="10" fill="#ff4d4d" text-anchor="middle">7:05</text><path d="M323,245 L334,252 L330,256 M342,244 L338,251 L351,255" stroke="#d8e3ee" stroke-width=".8" fill="none"/>`;
    s += `</g>`;
    // purse + key (clue)
    s += `<path d="M246,250 Q254,240 266,250" stroke="#5a3a1b" stroke-width="2" fill="none"/>`;
    s += `<path d="M242,264 L245,250 L269,250 L272,264Z" fill="#8a5a2b" stroke="${K}" stroke-width="1"/>`;
    if (!A) s += `<path d="M245,250 L269,250 L264,257 L250,257Z" fill="#6e4520" stroke="${K}" stroke-width=".7"/>`;
    else s += `<path d="M245,250 L269,250 L266,241 L248,241Z" fill="#6e4520" stroke="${K}" stroke-width=".7"/><rect x="249" y="250" width="16" height="3" fill="#1d120a"/>`;
    s += `<g transform="translate(277 258) scale(1.7) translate(-277 -258)"><circle cx="277" cy="255" r="3.6" fill="none" stroke="#d7b04a" stroke-width="1.4"/>`;
    if (!A) s += `<rect x="275.8" y="258" width="2.6" height="9" fill="#f0c95a" stroke="${K}" stroke-width=".4"/><circle cx="277" cy="258.6" r="2.2" fill="#f0c95a" stroke="${K}" stroke-width=".4"/><path d="M278.4,263 L280.4,263 M278.4,265.4 L280,265.4" stroke="#f0c95a" stroke-width="1.2"/>`;
    s += `</g>`;
    // mirror (clue)
    s += `<g transform="translate(400 262) scale(1.4) translate(-400 -262)">`;
    if (!A) s += `<path d="M390,262 L398,258" stroke="${K}" stroke-width="2.4"/><ellipse cx="404" cy="255" rx="8" ry="5.4" fill="${body}" stroke="${K}" stroke-width="1.2"/><ellipse cx="404" cy="255" rx="5" ry="3" fill="#9fb4c8"/>`;
    else s += `<path d="M390,262 L397,265" stroke="${K}" stroke-width="2.4"/><ellipse cx="401" cy="270" rx="5.4" ry="8" fill="${body}" stroke="${K}" stroke-width="1.2" transform="rotate(20 401 270)"/><ellipse cx="401" cy="270" rx="3" ry="5" fill="#9fb4c8" transform="rotate(20 401 270)"/><path d="M398,266 L403,271 L400,275 M403,265 L401,270" stroke="#fff" stroke-width=".7" fill="none"/>`;
    s += `</g>`;
    // ticket (meta clue)
    if (A) s += `<g transform="translate(455 270) scale(1.5) rotate(-12) translate(-455 -270)"><rect x="444" y="263" width="23" height="13" fill="#f2e7c4" stroke="#6b5a3a" stroke-width=".8"/><text x="455.5" y="272.6" font-family="Courier New,monospace" font-weight="700" font-size="6.4" fill="#b0302a" text-anchor="middle">A-13</text></g>`;
    // torn fabric (clue)
    if (A) s += `<g transform="translate(360 292) scale(1.6) translate(-360 -292)"><path d="M354,287 L367,286 L365,299 L362,294 L359,301 L357,294Z" fill="#24406e" stroke="${K}" stroke-width=".8"/><path d="M359,288 L361,296" stroke="#e7c14a" stroke-width=".6"/></g>`;
    // boot print (clue)
    if (A) s += `<g transform="translate(318,372) rotate(-12) scale(1.3)"><ellipse cx="0" cy="-8" rx="8.5" ry="11.5" fill="#6a4a2c" opacity=".95"/><rect x="-6.5" y="5" width="13" height="10" rx="4" fill="#6a4a2c" opacity=".95"/><path d="M-6,-14 L6,-14 M-7,-9 L7,-9 M-7,-4 L7,-4 M-6,1 L6,1 M-5,9 L5,9 M-5,12.4 L5,12.4" stroke="#3a2716" stroke-width="1.4"/></g>`;
    s += rain(r, 120, 0, 600, 0, 400);
    return s;
  }

  /* ---------------- CASE 2 SCENE: LAWTON TERMINAL ---------------- */
  function sceneLawton(A, p) {
    p = p || uid('l');
    const r = rng(2207);
    let s = `<defs>
      <linearGradient id="${p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1428"/><stop offset="1" stop-color="#3a2a40"/></linearGradient>
      <linearGradient id="${p}flr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4642"/><stop offset="1" stop-color="#2a2725"/></linearGradient>
      <radialGradient id="${p}tube"><stop offset="0" stop-color="#e9fff8" stop-opacity=".55"/><stop offset="1" stop-color="#e9fff8" stop-opacity="0"/></radialGradient>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}sky)"/>`;
    s += skyline(r, 230, '#17162a', 120, 600);
    // City Hall clock tower silhouette
    s += `<rect x="40" y="70" width="66" height="200" fill="#25233a" stroke="#0c0b14" stroke-width="1.5"/><path d="M34,70 L112,70 L102,52 L44,52Z" fill="#25233a"/><path d="M52,52 L73,10 L94,52Z" fill="#2c2a44" stroke="#0c0b14" stroke-width="1.5"/>`;
    s += `<circle cx="73" cy="96" r="15" fill="#f3e2b0" stroke="#0c0b14" stroke-width="2"/><path d="M73,96 L73,86 M73,96 L80,99" stroke="#17110d" stroke-width="1.8"/>`;
    for (let wy = 126; wy < 260; wy += 24) s += `<path d="M54,${wy + 14} L54,${wy + 4} Q58,${wy} 62,${wy + 4} L62,${wy + 14}Z M84,${wy + 14} L84,${wy + 4} Q88,${wy} 92,${wy + 4} L92,${wy + 14}Z" fill="#f3c86a" opacity=".55"/>`;
    s += `<rect x="0" y="140" width="40" height="130" fill="#1c1b2e"/>`;
    s += rain(r, 40, 0, 150, 0, 190);
    // terminal roof & posts
    s += `<path d="M140,22 L600,22 L600,44 L140,44Z" fill="#5c6670" stroke="${K}" stroke-width="1.5"/>`;
    for (let x = 146; x < 600; x += 12) s += `<line x1="${x}" y1="22" x2="${x}" y2="44" stroke="#3d454e" stroke-width="2"/>`;
    s += `<rect x="150" y="44" width="10" height="256" fill="#4a535c" stroke="${K}" stroke-width="1"/><rect x="584" y="44" width="10" height="256" fill="#4a535c" stroke="${K}" stroke-width="1"/>`;
    [260, 420].forEach((tx) => { s += `<ellipse cx="${tx}" cy="56" rx="90" ry="40" fill="url(#${p}tube)"/><rect x="${tx - 40}" y="48" width="80" height="6" rx="3" fill="#f3fffb" stroke="#9fb" stroke-width=".5"/>`; });
    s += `<g><rect x="430" y="70" width="120" height="30" fill="#1f6b3a" stroke="#e8f2e8" stroke-width="2"/><text x="490" y="91" font-family="Arial Black,Arial,sans-serif" font-size="15" fill="#fff" text-anchor="middle">LAWTON</text></g>`;
    s += `<g><rect x="172" y="70" width="104" height="26" rx="13" fill="#c9342b" stroke="#fff" stroke-width="2"/><text x="224" y="88" font-family="Arial Black,Arial,sans-serif" font-size="10.5" fill="#fff" text-anchor="middle">JEEPNEY STOP</text></g>`;
    // floor
    s += `<rect x="0" y="300" width="600" height="100" fill="url(#${p}flr)"/><path d="M0,316 L600,316" stroke="#e5c34a" stroke-width="3" stroke-dasharray="26 16" opacity=".7"/>`;
    s += `<ellipse cx="120" cy="384" rx="44" ry="6" fill="#151312" opacity=".55"/><ellipse cx="470" cy="372" rx="30" ry="4.4" fill="#151312" opacity=".5"/>`;
    // ---- jeepney ----
    s += `<ellipse cx="300" cy="346" rx="230" ry="10" fill="#000" opacity=".45"/>`;
    s += `<rect x="126" y="196" width="378" height="10" fill="#9aa2ab" stroke="${K}" stroke-width="1.4"/>`;
    for (let x = 140; x < 500; x += 24) s += `<rect x="${x}" y="188" width="3" height="8" fill="#9aa2ab"/>`;
    s += `<rect x="126" y="186" width="378" height="3" fill="#9aa2ab"/>`;
    // signboard
    s += `<rect x="136" y="170" width="98" height="22" fill="#fbf6e6" stroke="${K}" stroke-width="1.4"/>`;
    s += `<text x="185" y="186" font-family="Arial Black,Impact,sans-serif" font-size="${A ? 13 : 12}" fill="${A ? '#1d3f8f' : '#b3262e'}" text-anchor="middle">${A ? 'GARAHE' : 'DIVISORIA'}</text>`;
    // body
    s += `<path d="M120,206 L504,206 L504,322 L120,322Z" fill="#efe3c8" stroke="${K}" stroke-width="2"/>`;
    s += `<rect x="134" y="216" width="358" height="44" fill="#1a1a1f" stroke="${K}" stroke-width="1.2"/>`;
    for (let x = 164; x < 492; x += 32) s += `<rect x="${x}" y="216" width="4" height="44" fill="#c9ced4"/>`;
    s += `<path d="M134,238 L492,238" stroke="#c9ced4" stroke-width="2"/>`;
    s += `<path d="M120,266 L504,266" stroke="#c4302b" stroke-width="5"/><path d="M120,274 L504,274" stroke="#2d58a8" stroke-width="4"/><path d="M120,281 L504,281" stroke="#e6b422" stroke-width="3"/>`;
    s += `<text x="310" y="304" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="17" fill="#b3262e" text-anchor="middle" stroke="#fff" stroke-width=".4">Dalawang Puso</text>`;
    s += `<text x="148" y="304" font-family="Arial Black,Arial,sans-serif" font-size="15" fill="#1d3f8f">07</text>`;
    // front hood (facing left)
    s += `<path d="M120,236 L84,248 Q70,252 70,266 L70,320 L120,322Z" fill="#c8ced6" stroke="${K}" stroke-width="2"/>`;
    for (let gy = 268; gy < 312; gy += 6) s += `<line x1="74" y1="${gy}" x2="98" y2="${gy}" stroke="#7d858f" stroke-width="2"/>`;
    s += `<circle cx="80" cy="258" r="6" fill="#ffefb8" stroke="${K}" stroke-width="1.2"/>`;
    s += `<path d="M96,236 Q98,226 104,224 L106,218 L110,224 Q114,228 112,236Z" fill="#dfe4ea" stroke="${K}" stroke-width="1"/>`;
    s += `<path d="M86,233 Q88,224 94,223 L96,217 L99,223 Q103,227 101,234Z" fill="#dfe4ea" stroke="${K}" stroke-width="1"/>`;
    // rear opening
    s += `<rect x="492" y="214" width="12" height="96" fill="#26262c"/><rect x="486" y="310" width="24" height="6" fill="#9aa2ab"/>`;
    // wheels
    [[178, 322], [432, 322]].forEach(([wx, wy]) => { s += `<circle cx="${wx}" cy="${wy}" r="25" fill="#141318" stroke="${K}" stroke-width="2"/><circle cx="${wx}" cy="${wy}" r="12" fill="#b8bec6"/><circle cx="${wx}" cy="${wy}" r="4" fill="#55595f"/>`; });
    // toolbox (clue)
    s += `<rect x="282" y="322" width="46" height="18" fill="#6a7079" stroke="${K}" stroke-width="1.3"/>`;
    if (!A) s += `<rect x="281" y="320" width="48" height="5" fill="#7d838c" stroke="${K}" stroke-width="1"/><rect x="301" y="328" width="8" height="4" fill="#d0b24a"/>`;
    else s += `<rect x="285" y="325" width="40" height="12" fill="#121215"/><path d="M281,340 L329,340 L326,352 L284,352Z" fill="#7d838c" stroke="${K}" stroke-width="1"/>`;
    // handprint (clue)
    if (A) s += `<g transform="translate(465,284) rotate(10) scale(1.35)" fill="#111"><ellipse cx="0" cy="3" rx="6" ry="6.6"/><rect x="-5.4" y="-11" width="2.4" height="10" rx="1.2"/><rect x="-2.2" y="-13" width="2.4" height="12" rx="1.2"/><rect x="1" y="-12" width="2.4" height="11" rx="1.2"/><rect x="4" y="-9" width="2.2" height="9" rx="1.1"/><rect x="5.4" y="0" width="7" height="2.4" rx="1.2" transform="rotate(30 5.4 0)"/></g>`;
    // dispatcher table
    s += `<rect x="512" y="302" width="80" height="7" fill="#7a5530" stroke="${K}" stroke-width="1.2"/><rect x="518" y="309" width="5" height="46" fill="#5a3d22"/><rect x="582" y="309" width="5" height="46" fill="#5a3d22"/>`;
    s += `<path d="M518,300 L548,300 L546,294 L520,294Z" fill="#f1ead6" stroke="${K}" stroke-width=".8"/><path d="M533,294 L533,300" stroke="${K}" stroke-width=".6"/>`;
    s += `<rect x="540" y="340" width="26" height="5" fill="#2f6aa3" stroke="${K}" stroke-width="1"/><rect x="543" y="345" width="3" height="16" fill="#2f6aa3"/><rect x="560" y="345" width="3" height="16" fill="#2f6aa3"/>`;
    if (!A) s += `<rect x="552" y="283" width="30" height="19" rx="2" fill="#2d63b0" stroke="${K}" stroke-width="1.2"/><path d="M561,283 Q567,276 573,283" stroke="${K}" stroke-width="1.4" fill="none"/><rect x="564" y="289" width="6" height="5" fill="#e8c04a" stroke="${K}" stroke-width=".5"/>`;
    else s += `<rect x="552" y="300" width="30" height="2" fill="#a88456" opacity=".7"/>`;
    // balut basket (clue)
    if (!A) {
      s += `<path d="M30,330 L80,330 L74,362 L36,362Z" fill="#b98a4a" stroke="${K}" stroke-width="1.3"/><path d="M33,338 L77,338 M35,346 L76,346 M36,354 L75,354" stroke="#8a6232" stroke-width="1"/><path d="M30,330 Q55,318 80,330" fill="#f2ede0" stroke="${K}" stroke-width="1"/><rect x="50" y="306" width="10" height="14" fill="#f8d86a" stroke="${K}" stroke-width="1" opacity=".9"/><circle cx="55" cy="313" r="9" fill="#ffd27a" opacity=".3"/>`;
    } else {
      s += `<g transform="rotate(-78 56 360)"><path d="M30,330 L80,330 L74,362 L36,362Z" fill="#b98a4a" stroke="${K}" stroke-width="1.3"/><path d="M33,338 L77,338 M35,346 L76,346 M36,354 L75,354" stroke="#8a6232" stroke-width="1"/></g>`;
      [[78, 356], [90, 364], [84, 372], [100, 360], [72, 376]].forEach(([ex, ey]) => { s += `<ellipse cx="${ex}" cy="${ey}" rx="5" ry="6.4" fill="#f4ecd8" stroke="${K}" stroke-width=".8"/>`; });
      s += `<path d="M96,374 l4,-3 l2,4 l4,-2" stroke="#e9dfc2" stroke-width="1.4" fill="none"/>`;
    }
    // lug wrench (clue)
    if (A) s += `<g transform="translate(302,376) rotate(-14)"><rect x="-30" y="-2.2" width="52" height="4.4" rx="2" fill="#8b9098" stroke="${K}" stroke-width=".9"/><rect x="-30" y="-3.4" width="16" height="6.8" rx="2" fill="#2a63c4" stroke="${K}" stroke-width=".8"/><path d="M22,-2 L28,-9 L32,-6 L26,2Z" fill="#8b9098" stroke="${K}" stroke-width=".9"/><circle cx="21" cy="1" r="2.2" fill="#8d1c1c" opacity=".85"/></g>`;
    // anting-anting (meta clue)
    if (A) s += `<g transform="translate(206,380) scale(1.45) translate(-4 0)"><path d="M-13,-6 Q-4,-16 6,-9" stroke="#3b2a1a" stroke-width="1.4" fill="none"/><circle cx="6" cy="0" r="8" fill="#a5793b" stroke="${K}" stroke-width="1.2"/><circle cx="6" cy="0" r="5.6" fill="none" stroke="#6b4b22" stroke-width=".8"/><path d="M6,-4.4 L10,2.6 L2,2.6Z" fill="none" stroke="#3b2a12" stroke-width=".9"/><circle cx="6" cy="0.6" r="1" fill="#3b2a12"/></g>`;
    return s;
  }

  /* ---------------- CASE 3 SCENE: KTV VIP 13 ---------------- */
  function sceneKTV(A, p) {
    p = p || uid('k');
    const r = rng(3313);
    let s = `<defs>
      <linearGradient id="${p}wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1238"/><stop offset="1" stop-color="#1a0a24"/></linearGradient>
      <linearGradient id="${p}scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b3e8f"/><stop offset="1" stop-color="#6a1f7a"/></linearGradient>
      <radialGradient id="${p}spot"><stop offset="0" stop-color="#ff5fae" stop-opacity=".35"/><stop offset="1" stop-color="#ff5fae" stop-opacity="0"/></radialGradient>
      <pattern id="${p}pat" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M14,0 L28,14 L14,28 L0,14Z" fill="none" stroke="#4a2463" stroke-width="1"/></pattern>
    </defs>`;
    s += `<rect width="600" height="400" fill="url(#${p}wall)"/><rect width="600" height="300" fill="url(#${p}pat)"/>`;
    s += `<rect x="0" y="0" width="600" height="16" fill="#12061a"/><path d="M0,14 L600,14" stroke="#ff4fa3" stroke-width="3"/><path d="M0,14 L600,14" stroke="#ff9ccf" stroke-width="8" opacity=".25"/>`;
    s += `<ellipse cx="200" cy="200" rx="260" ry="160" fill="url(#${p}spot)"/>`;
    // disco ball
    s += `<line x1="450" y1="16" x2="450" y2="28" stroke="#888" stroke-width="1.4"/><circle cx="450" cy="44" r="16" fill="#b9bcc8" stroke="${K}" stroke-width="1.2"/>`;
    for (let i = -12; i <= 12; i += 6) s += `<line x1="${450 + i}" y1="${30}" x2="${450 + i}" y2="${58}" stroke="#7e8190" stroke-width=".8"/><line x1="434" y1="${44 + i}" x2="466" y2="${44 + i}" stroke="#7e8190" stroke-width=".8"/>`;
    for (let i = 0; i < 18; i++) s += `<circle cx="${(r() * 600).toFixed(1)}" cy="${(30 + r() * 250).toFixed(1)}" r="${(1 + r() * 1.6).toFixed(1)}" fill="#fff" opacity="${(0.25 + r() * 0.4).toFixed(2)}"/>`;
    // TV (clue)
    s += `<rect x="40" y="58" width="292" height="176" rx="6" fill="#0c0c10" stroke="${K}" stroke-width="2"/><rect x="52" y="68" width="268" height="152" fill="${A ? '#0f1a3a' : `url(#${p}scr)`}"/>`;
    if (!A) {
      s += `<text x="186" y="112" font-family="Arial Black,Arial,sans-serif" font-size="13" fill="#fff" text-anchor="middle">♪ DAHIL SA IYO ♪</text>`;
      s += `<text x="186" y="146" font-family="Georgia,serif" font-size="14" fill="#ffe36b" text-anchor="middle">Dahil sa iyo, nais kong mabuhay...</text>`;
      s += `<rect x="70" y="186" width="232" height="6" rx="3" fill="#ffffff" opacity=".25"/><rect x="70" y="186" width="96" height="6" rx="3" fill="#ffe36b"/>`;
      s += `<text x="70" y="210" font-family="Courier New,monospace" font-size="10" fill="#cfe" >#4512  22:55</text>`;
    } else {
      s += `<rect x="150" y="104" width="12" height="40" fill="#fff"/><rect x="170" y="104" width="12" height="40" fill="#fff"/>`;
      s += `<text x="216" y="132" font-family="Arial Black,Arial,sans-serif" font-size="14" fill="#fff">STOP</text>`;
      s += `<text x="186" y="186" font-family="Courier New,monospace" font-weight="700" font-size="20" fill="#ff5b5b" text-anchor="middle">23:07</text>`;
    }
    s += `<rect x="170" y="234" width="32" height="22" fill="#111"/>`;
    // door
    s += `<rect x="512" y="70" width="80" height="230" fill="#5a2a1c" stroke="${K}" stroke-width="2"/><rect x="522" y="82" width="60" height="90" fill="none" stroke="#3b1a10" stroke-width="2"/><rect x="522" y="184" width="60" height="100" fill="none" stroke="#3b1a10" stroke-width="2"/><circle cx="524" cy="190" r="4" fill="#e8c04a" stroke="${K}" stroke-width="1"/>`;
    s += `<rect x="530" y="100" width="44" height="22" rx="2" fill="#e8c04a" stroke="${K}" stroke-width="1"/><text x="552" y="116" font-family="Arial Black,Arial,sans-serif" font-size="11" fill="#3b1a10" text-anchor="middle">VIP 13</text>`;
    // couch
    s += `<path d="M330,218 Q330,206 344,206 L500,206 Q512,206 512,218 L512,300 L330,300Z" fill="#8a1730" stroke="${K}" stroke-width="2"/>`;
    for (let x = 352; x < 512; x += 40) s += `<path d="M${x},212 L${x},256" stroke="#5e0f20" stroke-width="2"/>`;
    s += `<rect x="322" y="256" width="196" height="44" rx="8" fill="#a11d3a" stroke="${K}" stroke-width="2"/>`;
    // floor
    s += `<rect x="0" y="300" width="600" height="100" fill="#1b0f26"/>`;
    for (let x = -40; x < 640; x += 40) s += `<path d="M${x},300 L${x - 30},400" stroke="#2a1838" stroke-width="2"/>`;
    // table
    s += `<path d="M96,336 L504,336 L474,302 L126,302Z" fill="#2b2b38" stroke="${K}" stroke-width="2"/><path d="M134,306 L466,306" stroke="#6a6a80" stroke-width="1" opacity=".6"/>`;
    s += `<rect x="96" y="336" width="408" height="8" fill="#1a1a22" stroke="${K}" stroke-width="1.4"/><rect x="112" y="344" width="8" height="34" fill="#1a1a22"/><rect x="480" y="344" width="8" height="34" fill="#1a1a22"/>`;
    // pitcher
    s += `<path d="M150,276 L176,276 L180,316 L146,316Z" fill="#e8f2a2" opacity=".75" stroke="${K}" stroke-width="1.2"/><path d="M176,282 Q188,286 180,304" stroke="${K}" stroke-width="2" fill="none"/><rect x="146" y="284" width="34" height="3" fill="#fff" opacity=".4"/>`;
    // glass (clue)
    s += `<path d="M241,282 L259,282 L257,316 L243,316Z" fill="#f3e98a" opacity=".8" stroke="${K}" stroke-width="1.2"/><rect x="242" y="282" width="16" height="4" fill="#fff" opacity=".45"/>`;
    if (A) s += `<path d="M241,282 L259,282 L258.6,288 L241.4,288Z" fill="#fff" opacity=".95"/><circle cx="264" cy="314" r="1.4" fill="#fff"/><circle cx="268" cy="316" r="1" fill="#fff"/><circle cx="237" cy="315" r="1.2" fill="#fff"/><circle cx="262" cy="317.6" r=".9" fill="#fff"/>`;
    // ice bucket
    s += `<path d="M318,288 L346,288 L342,318 L322,318Z" fill="#c0c4d0" stroke="${K}" stroke-width="1.2"/><circle cx="326" cy="286" r="3" fill="#e6f6ff"/><circle cx="334" cy="285" r="3" fill="#e6f6ff"/>`;
    // songbook
    s += `<path d="M356,322 L396,318 L400,330 L360,334Z" fill="#c43f6b" stroke="${K}" stroke-width="1"/>`;
    // ledger (clue)
    if (!A) s += `<path d="M396,298 L432,296 L436,316 L400,318Z" fill="#2f6a46" stroke="${K}" stroke-width="1.2"/><path d="M400,300 L402,317" stroke="#d6c58a" stroke-width="2"/><text x="420" y="310" font-family="Georgia,serif" font-size="6" fill="#e8d99a" text-anchor="middle">LEDGER</text>`;
    // mic (clue): on table before, on floor after
    if (!A) s += `<g transform="translate(452,316) rotate(-10)"><rect x="-16" y="-2.4" width="22" height="4.8" rx="2" fill="#2a2a30" stroke="${K}" stroke-width=".8"/><circle cx="9" cy="0" r="5.2" fill="#9ea2ae" stroke="${K}" stroke-width=".9"/></g><path d="M436,318 Q420,330 404,326" stroke="#111" stroke-width="1.4" fill="none"/>`;
    else s += `<g transform="translate(92,372) rotate(24)"><rect x="-16" y="-2.4" width="22" height="4.8" rx="2" fill="#2a2a30" stroke="${K}" stroke-width=".8"/><circle cx="9" cy="0" r="5.2" fill="#9ea2ae" stroke="${K}" stroke-width=".9"/></g><path d="M76,366 Q60,356 40,372 Q30,380 10,376" stroke="#111" stroke-width="1.4" fill="none"/>`;
    // matchbook (meta)
    if (A) s += `<g transform="translate(198,322) rotate(-8) scale(1.5)"><rect x="-11" y="-6.5" width="22" height="13" rx="1" fill="#0d0d10" stroke="#3a3a44" stroke-width=".8"/><path d="M-6,1 Q-4,-4 0,-2 Q3,-5 6,-1 L3,0 Q0,2 -3,0Z" fill="#c42b36"/><text x="0" y="5.6" font-family="Arial,sans-serif" font-size="3.6" fill="#ddd" text-anchor="middle">13</text></g>`;
    // cufflink (clue)
    if (A) s += `<g transform="translate(300,384) scale(1.7)"><ellipse cx="0" cy="0" rx="5" ry="3.6" fill="#e8c04a" stroke="${K}" stroke-width=".8"/><rect x="-1" y="3" width="2" height="3" fill="#b8902a"/><path d="M-3,-4 L-6,-8 M3,-4 L6,-8 M0,-4.6 L0,-9" stroke="#fff3c0" stroke-width=".9"/></g>`;
    return s;
  }

  /* ---------------- KOMIKS BACKGROUNDS (520x340) ---------------- */
  function bgOffice(p) {
    p = p || uid('o');
    const r = rng(77);
    let s = `<defs><radialGradient id="${p}lamp"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient></defs>`;
    s += `<rect width="520" height="340" fill="#231b17"/>`;
    for (let x = 0; x < 520; x += 26) s += `<rect x="${x}" y="0" width="13" height="340" fill="#2a211c"/>`;
    s += `<rect x="300" y="20" width="200" height="170" fill="#0c1124" stroke="#4a3a2a" stroke-width="8"/>`;
    s += `<g clip-path="none">${skyline(r, 190, '#181630', 300, 500)}</g>`;
    s += neon(318, 60, 64, 'KTV', '#ff4fa3', '#ff9ccf', 14) + neon(400, 110, 84, 'SANGLAAN', '#3fd0ff', '#a8ecff', 11);
    s += `<path d="M400,20 L400,190 M300,105 L500,105" stroke="#4a3a2a" stroke-width="5"/>`;
    s += rain(r, 40, 300, 500, 20, 190, '#cfe0ff', .35);
    s += `<rect x="0" y="250" width="520" height="90" fill="#5a3b22"/><rect x="0" y="250" width="520" height="8" fill="#6f4a2b"/>`;
    s += `<ellipse cx="120" cy="240" rx="140" ry="90" fill="url(#${p}lamp)"/>`;
    s += `<path d="M90,250 L104,190 L84,176" stroke="#2a2a2a" stroke-width="5" fill="none"/><path d="M62,168 L104,168 L96,184 L70,184Z" fill="#2f5a3a" stroke="${K}" stroke-width="1.5"/>`;
    return s;
  }
  function bgStreet(p) {
    p = p || uid('s');
    const r = rng(91);
    let s = `<defs><linearGradient id="${p}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1022"/><stop offset="1" stop-color="#3a2846"/></linearGradient></defs>`;
    s += `<rect width="520" height="340" fill="url(#${p}g)"/>`;
    s += skyline(r, 250, '#141327', 0, 520);
    s += neon(30, 120, 110, 'SANGLAAN', '#ff4fa3', '#ff9ccf') + neon(380, 90, 60, 'KTV', '#3fd0ff', '#a8ecff', 15) + neon(200, 150, 132, 'BARANGAY HALL', '#38d17a', '#b9ffd5', 11);
    s += `<rect x="0" y="250" width="520" height="90" fill="#1e1d26"/>`;
    for (let i = 0; i < 8; i++) s += `<rect x="${20 + i * 64}" y="292" width="34" height="3" fill="#e5c34a" opacity=".5"/>`;
    s += `<ellipse cx="140" cy="318" rx="90" ry="7" fill="#ff4fa3" opacity=".12"/><ellipse cx="400" cy="300" rx="70" ry="5" fill="#3fd0ff" opacity=".12"/>`;
    s += rain(r, 130, 0, 520, 0, 340, '#cfe0ff', .35);
    return s;
  }
  function bgInterrog(p) {
    let s = `<rect width="520" height="340" fill="#1a1512"/>`;
    for (let y = 0; y < 340; y += 22) for (let x = (y / 22) % 2 ? -22 : 0; x < 520; x += 44) s += `<rect x="${x + 1}" y="${y + 1}" width="42" height="20" fill="#2a221d"/>`;
    s += `<ellipse cx="260" cy="200" rx="230" ry="170" fill="#ffcf7a" opacity=".12"/>`;
    s += `<rect x="0" y="270" width="520" height="70" fill="#3a2a1d"/>`;
    return s;
  }
  function bgDark() {
    return `<rect width="520" height="340" fill="#060608"/><ellipse cx="260" cy="170" rx="200" ry="150" fill="#3a0d12" opacity=".35"/>`;
  }
  function bgCork(p) {
    const r = rng(55);
    let s = `<rect width="520" height="340" fill="#a8743f"/>`;
    for (let i = 0; i < 260; i++) s += `<circle cx="${(r() * 520).toFixed(0)}" cy="${(r() * 340).toFixed(0)}" r="${(0.6 + r() * 1.6).toFixed(1)}" fill="${r() < .5 ? '#8a5a2c' : '#c08a52'}" opacity=".7"/>`;
    s += `<rect x="0" y="0" width="520" height="340" fill="none" stroke="#5a3b22" stroke-width="16"/>`;
    return s;
  }
  const BG = { office: bgOffice, street: bgStreet, interrog: bgInterrog, dark: bgDark, cork: bgCork };

  /* ---------------- DESK HUB (1280x720) ---------------- */
  function desk(state) {
    const owned = (state && state.owned) || [];
    const r = rng(4242);
    let s = `<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" class="desk-svg">
    <defs>
      <linearGradient id="dkwood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4527"/><stop offset="1" stop-color="#3d2614"/></linearGradient>
      <linearGradient id="dkwin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0f22"/><stop offset="1" stop-color="#33264a"/></linearGradient>
      <radialGradient id="dklamp"><stop offset="0" stop-color="#ffd58a" stop-opacity=".5"/><stop offset="1" stop-color="#ffd58a" stop-opacity="0"/></radialGradient>
      <radialGradient id="dkvig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
    </defs>
    <rect width="1280" height="720" fill="#241c18"/>`;
    for (let x = 0; x < 1280; x += 40) s += `<rect x="${x}" y="0" width="20" height="470" fill="#2b221d"/>`;
    s += `<rect x="0" y="440" width="1280" height="30" fill="#1b1411"/>`;
    // window
    s += `<rect x="760" y="34" width="480" height="372" fill="url(#dkwin)"/>`;
    s += skyline(r, 400, '#151328', 760, 1240);
    s += neon(790, 120, 120, 'SANGLAAN', '#ff4fa3', '#ff9ccf', 16) + neon(1110, 90, 80, 'KTV', '#3fd0ff', '#a8ecff', 20) + neon(940, 210, 160, 'BARANGAY HALL', '#38d17a', '#b9ffd5', 14) + neon(1090, 300, 120, 'JEEPNEY STOP', '#ffb13b', '#ffe0a0', 12);
    s += `<g id="win-rain">${rain(r, 90, 760, 1240, 34, 406, '#cfe0ff', .35)}</g>`;
    s += `<rect x="760" y="34" width="480" height="372" fill="none" stroke="#3e2d1f" stroke-width="16"/><path d="M1000,34 L1000,406 M760,220 L1240,220" stroke="#3e2d1f" stroke-width="9"/>`;
    s += `<rect x="748" y="400" width="504" height="16" fill="#4a3524"/>`;
    // corkboard
    s += `<g id="cork"><rect x="40" y="40" width="400" height="330" fill="#a8743f" stroke="#5a3b22" stroke-width="14"/>`;
    for (let i = 0; i < 300; i++) s += `<circle cx="${(50 + r() * 380).toFixed(0)}" cy="${(50 + r() * 310).toFixed(0)}" r="${(0.6 + r() * 1.5).toFixed(1)}" fill="${r() < .5 ? '#8a5a2c' : '#c08a52'}" opacity=".7"/>`;
    s += `<rect x="70" y="66" width="86" height="104" fill="#f2ecdf" transform="rotate(-4 113 118)"/><rect x="78" y="74" width="70" height="66" fill="#3a3550" transform="rotate(-4 113 118)"/>`;
    s += `<rect x="190" y="60" width="104" height="70" fill="#f6ecd2" transform="rotate(3 242 95)"/><text x="242" y="84" font-family="Special Elite,Courier New,monospace" font-size="11" fill="#2a1d12" text-anchor="middle" transform="rotate(3 242 95)">ANG ANINO?</text><text x="242" y="104" font-family="Kalam,sans-serif" font-size="10" fill="#8a2a22" text-anchor="middle" transform="rotate(3 242 95)">walang mukha</text>`;
    s += `<rect x="320" y="80" width="90" height="110" fill="#e9dcc0" transform="rotate(5 365 135)"/><path d="M332,96 L396,100 M330,110 L392,114 M330,124 L398,128 M328,138 L380,142" stroke="#6b5a3a" stroke-width="1.5" transform="rotate(5 365 135)"/>`;
    s += `<rect x="96" y="210" width="130" height="90" fill="#e1d6bd" transform="rotate(-3 161 255)"/><path d="M110,226 Q150,240 200,228 M106,250 Q160,262 210,248 M120,276 L200,270" stroke="#3a7a8a" stroke-width="2" fill="none" transform="rotate(-3 161 255)"/>`;
    s += `<rect x="270" y="230" width="90" height="100" fill="#f2ecdf" transform="rotate(-6 315 280)"/><rect x="278" y="238" width="74" height="70" fill="#111" transform="rotate(-6 315 280)"/>`;
    s += `<path d="M113,90 L242,72 L365,100 L161,230 L315,250 L242,72" stroke="#c0262e" stroke-width="2" fill="none"/>`;
    [[113, 90], [242, 72], [365, 100], [161, 230], [315, 250]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="6" fill="#d33" stroke="#511" stroke-width="1.5"/>`; });
    s += `</g>`;
    // calendar & shelf
    s += `<rect x="500" y="80" width="200" height="12" fill="#4a3524"/><rect x="510" y="40" width="26" height="40" fill="#7a2a2a"/><rect x="538" y="46" width="22" height="34" fill="#2a4a6a"/><rect x="562" y="36" width="30" height="44" fill="#4a6a3a"/><rect x="594" y="50" width="20" height="30" fill="#8a6a2a"/>`;
    s += `<rect x="520" y="140" width="150" height="190" fill="#f2ecdf" stroke="#2a1d12" stroke-width="2"/><rect x="520" y="140" width="150" height="34" fill="#b3262e"/><text x="595" y="164" font-family="Anton,Impact,sans-serif" font-size="18" fill="#fff" text-anchor="middle">NOBYEMBRE</text>`;
    for (let i = 0; i < 28; i++) s += `<text x="${535 + (i % 7) * 20}" y="${194 + Math.floor(i / 7) * 32}" font-family="Oswald,sans-serif" font-size="11" fill="#2a1d12" text-anchor="middle">${i + 1}</text>`;
    s += `<path d="M590,240 L610,262 M610,240 L590,262" stroke="#b3262e" stroke-width="3"/>`;
    // radio (cosmetic)
    if (owned.includes('radyo')) s += `<g><rect x="560" y="374" width="120" height="66" rx="10" fill="#7a4a2a" stroke="${K}" stroke-width="2"/><rect x="572" y="384" width="56" height="46" rx="6" fill="#d8c69a"/>${Array.from({ length: 5 }, (_, i) => `<line x1="574" y1="${390 + i * 9}" x2="626" y2="${390 + i * 9}" stroke="#7a6a4a" stroke-width="2"/>`).join('')}<circle cx="652" cy="396" r="9" fill="#e8c04a" stroke="${K}" stroke-width="1.5"/><circle cx="652" cy="422" r="7" fill="#e8c04a" stroke="${K}" stroke-width="1.5"/><path d="M640,374 L620,340" stroke="#555" stroke-width="2"/></g>`;
    // plant (cosmetic)
    if (owned.includes('halaman')) s += `<g><path d="M780,400 L820,400 L814,440 L786,440Z" fill="#b5532f" stroke="${K}" stroke-width="2"/>${[[-14, -50], [-6, -66], [4, -70], [12, -56], [18, -40]].map(([dx, dy]) => `<path d="M800,402 Q${800 + dx * 1.3},${402 + dy / 2} ${800 + dx},${402 + dy} Q${800 + dx / 2},${402 + dy / 2} 800,402Z" fill="#3f8a4a" stroke="#1e4a24" stroke-width="1.5"/>`).join('')}</g>`;
    // desk
    s += `<rect x="0" y="470" width="1280" height="250" fill="url(#dkwood)"/><rect x="0" y="470" width="1280" height="10" fill="#7d5532"/>`;
    for (let i = 0; i < 10; i++) s += `<path d="M0,${500 + i * 22} Q640,${494 + i * 22 + (i % 2) * 8} 1280,${502 + i * 22}" stroke="#4e3119" stroke-width="1.4" fill="none" opacity=".6"/>`;
    s += `<ellipse cx="930" cy="560" rx="260" ry="140" fill="url(#dklamp)"/>`;
    // lamp
    s += `<g><ellipse cx="980" cy="560" rx="44" ry="10" fill="#1c2a1f"/><path d="M980,556 L960,470 L1010,420" stroke="#2a3a2c" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M972,404 L1050,404 L1040,438 L982,438Z" fill="#2f5a3a" stroke="${K}" stroke-width="2" transform="rotate(18 1011 421)"/></g>`;
    // folders
    s += `<g id="folders"><path d="M120,600 L380,590 L388,690 L126,700Z" fill="#c9a25d" stroke="#6b4a1f" stroke-width="2"/><path d="M130,590 L370,580 L378,680 L136,690Z" fill="#e2bf74" stroke="#6b4a1f" stroke-width="2"/><rect x="176" y="610" width="140" height="28" fill="#f6ecd2" transform="rotate(-2 246 624)"/><text x="246" y="630" font-family="Special Elite,Courier New,monospace" font-size="15" fill="#2a1d12" text-anchor="middle" transform="rotate(-2 246 624)">EBIDENSYA</text></g>`;
    // badge
    s += `<g transform="translate(450,660)"><path d="M0,-26 L8,-9 L26,-8 L13,5 L17,24 L0,15 L-17,24 L-13,5 L-26,-8 L-8,-9Z" fill="#e2b84a" stroke="#6b5219" stroke-width="2"/><circle cx="0" cy="0" r="9" fill="#c89a2e" stroke="#6b5219"/></g>`;
    // phone (rotary)
    s += `<g id="phone-art"><path d="M210,540 L330,540 L350,590 L190,590Z" fill="#1b1b1f" stroke="${K}" stroke-width="2"/><circle cx="270" cy="562" r="22" fill="#e9e4d4" stroke="${K}" stroke-width="2"/>`;
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 1.6 + 0.6; s += `<circle cx="${(270 + Math.cos(a) * 14).toFixed(1)}" cy="${(562 + Math.sin(a) * 14).toFixed(1)}" r="3" fill="#1b1b1f"/>`; }
    s += `<path d="M196,528 Q200,508 222,510 L318,510 Q340,508 344,528 L330,536 Q320,524 306,526 L234,526 Q220,524 210,536Z" fill="#26262c" stroke="${K}" stroke-width="2"/><path d="M345,580 Q400,600 420,640" stroke="#111" stroke-width="3" fill="none"/></g>`;
    // typewriter
    s += `<g id="type-art"><rect x="560" y="490" width="200" height="40" fill="#f6ecd2" stroke="#9a8a6a" stroke-width="1"/><text x="660" y="514" font-family="Special Elite,Courier New,monospace" font-size="13" fill="#2a1d12" text-anchor="middle">KASO: DILIM NG MAYNILA</text>`;
    s += `<path d="M530,530 L790,530 L820,640 L500,640Z" fill="#2b2b2e" stroke="${K}" stroke-width="2"/><rect x="520" y="520" width="280" height="18" rx="9" fill="#3c3c40" stroke="${K}" stroke-width="2"/>`;
    for (let row = 0; row < 4; row++) for (let k = 0; k < 10 - (row === 3 ? 2 : 0); k++) s += `<circle cx="${560 + row * 8 + k * 22}" cy="${560 + row * 18}" r="7" fill="#e9e4d4" stroke="${K}" stroke-width="1.5"/>`;
    s += `<rect x="600" y="626" width="120" height="10" rx="4" fill="#e9e4d4" stroke="${K}" stroke-width="1.5"/></g>`;
    // tatay photo frame
    s += `<g transform="translate(860,560) rotate(-6)"><rect x="-40" y="-52" width="80" height="100" fill="#3a2614" stroke="#1d130a" stroke-width="3"/><rect x="-32" y="-44" width="64" height="76" fill="#cfc2a4"/><svg x="-32" y="-44" width="64" height="76" viewBox="-20 -4 40 48">${figure(CHARS_FALLBACK.tatay, 'neutral')}</svg></g>`;
    // mug
    s += `<g><path d="M1020,560 L1070,560 L1066,624 L1024,624Z" fill="#e9e4d4" stroke="${K}" stroke-width="2"/><path d="M1068,574 Q1094,578 1090,596 Q1086,612 1066,610" stroke="${K}" stroke-width="5" fill="none"/><ellipse cx="1045" cy="562" rx="24" ry="5" fill="#3a2414"/><text x="1045" y="600" font-family="Anton,Impact,sans-serif" font-size="13" fill="#7a2a1a" text-anchor="middle">BARAKO</text>`;
    s += `<path class="steam" d="M1036,550 Q1030,536 1038,524 Q1046,512 1040,498" stroke="#fff" stroke-width="3" fill="none" opacity=".35"/><path class="steam s2" d="M1054,552 Q1048,538 1056,526 Q1064,514 1058,500" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/></g>`;
    // fan
    s += `<g><rect x="1166" y="470" width="10" height="120" fill="#bfc6cc" stroke="${K}" stroke-width="1.5"/><ellipse cx="1171" cy="594" rx="40" ry="9" fill="#9aa3ab" stroke="${K}" stroke-width="1.5"/><circle cx="1171" cy="430" r="62" fill="none" stroke="#c8ced4" stroke-width="3"/>`;
    for (let i = 0; i < 8; i++) s += `<line x1="1171" y1="430" x2="${(1171 + Math.cos(i * Math.PI / 4) * 62).toFixed(1)}" y2="${(430 + Math.sin(i * Math.PI / 4) * 62).toFixed(1)}" stroke="#c8ced4" stroke-width="1.2"/>`;
    s += `<g class="fan-blades" style="transform-origin:1171px 430px">${[0, 120, 240].map((a) => `<ellipse cx="1171" cy="398" rx="15" ry="30" fill="#5aa0c8" opacity=".85" transform="rotate(${a} 1171 430)"/>`).join('')}</g><circle cx="1171" cy="430" r="10" fill="#e9e4d4" stroke="${K}" stroke-width="1.5"/></g>`;
    // cat (cosmetic)
    if (owned.includes('pusa')) s += `<g transform="translate(1110,650)"><ellipse cx="0" cy="0" rx="58" ry="26" fill="#f0a050" stroke="${K}" stroke-width="2"/><path d="M-30,-10 Q-40,-36 -24,-30 L-16,-20 L-4,-28 Q4,-20 -4,-6Z" fill="#f0a050" stroke="${K}" stroke-width="2"/><path d="M-34,-10 Q-30,-6 -26,-10 M-16,-10 Q-12,-6 -8,-10" stroke="${K}" stroke-width="1.8" fill="none"/><path d="M50,6 Q80,10 70,-16" stroke="#f0a050" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-10,8 L20,8 M0,16 L26,16" stroke="#c87a30" stroke-width="3"/><text x="40" y="-30" font-family="Bangers,Impact,sans-serif" font-size="18" fill="#f6ecd2">zzz</text></g>`;
    s += `<rect width="1280" height="720" fill="url(#dkvig)"/></svg>`;
    return s;
  }

  /* ---------------- ICONS FOR RECORDS ---------------- */
  function docIcon(kind) {
    const b = (inner, bg) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="${bg || '#e9dcc0'}"/>${inner}</svg>`;
    switch (kind) {
      case 'cctv': return b(`<rect x="10" y="20" width="32" height="16" rx="3" fill="#3a3f47" stroke="${K}" stroke-width="2"/><circle cx="38" cy="28" r="5" fill="#9fd3ff" stroke="${K}" stroke-width="1.5"/><path d="M18,36 L22,48 L34,48" stroke="${K}" stroke-width="3" fill="none"/><circle cx="14" cy="16" r="3" fill="#e33"/>`, '#cfd6dd');
      case 'receipt': return b(`<path d="M16,8 L44,8 L44,52 L40,48 L36,52 L32,48 L28,52 L24,48 L20,52 L16,48Z" fill="#fff" stroke="${K}" stroke-width="1.5"/><path d="M21,16 L39,16 M21,22 L36,22 M21,28 L39,28 M21,34 L33,34" stroke="#555" stroke-width="2"/><text x="30" y="44" font-family="Courier New,monospace" font-weight="700" font-size="7" fill="#b3262e" text-anchor="middle">₱</text>`);
      case 'book': return b(`<rect x="12" y="10" width="36" height="42" fill="#7a2a2a" stroke="${K}" stroke-width="2"/><rect x="16" y="14" width="28" height="34" fill="#f2ecdf"/><path d="M20,22 L40,22 M20,28 L40,28 M20,34 L34,34" stroke="#555" stroke-width="2"/><text x="30" y="45" font-family="Courier New,monospace" font-weight="700" font-size="8" fill="#b3262e" text-anchor="middle">UTANG</text>`);
      case 'video': return b(`<rect x="10" y="12" width="40" height="36" rx="5" fill="#1d1d24" stroke="${K}" stroke-width="2"/><path d="M25,22 L37,30 L25,38Z" fill="#ff4f6a"/><circle cx="44" cy="17" r="2.6" fill="#e33"/>`, '#d6d0e6');
      case 'phone': return b(`<rect x="18" y="6" width="24" height="48" rx="4" fill="#1d1d24" stroke="${K}" stroke-width="2"/><rect x="21" y="12" width="18" height="34" fill="#2c6bd6"/><text x="30" y="32" font-family="Arial Black,Arial,sans-serif" font-size="7" fill="#fff" text-anchor="middle">GCash</text>`, '#d0e2f2');
      case 'log': return b(`<rect x="8" y="12" width="44" height="36" fill="#f2ecdf" stroke="${K}" stroke-width="2"/><path d="M30,12 L30,48" stroke="${K}" stroke-width="1.5"/><path d="M12,20 L26,20 M12,26 L26,26 M12,32 L26,32 M34,20 L48,20 M34,26 L44,26" stroke="#555" stroke-width="1.6"/><text x="40" y="40" font-family="Arial Black,Arial,sans-serif" font-size="8" fill="#b3262e" text-anchor="middle">#07?</text>`);
      case 'photo': return b(`<rect x="8" y="10" width="44" height="40" fill="#fff" stroke="${K}" stroke-width="1.5"/><rect x="12" y="14" width="36" height="26" fill="#3a3a5a"/><circle cx="20" cy="26" r="4" fill="#ffd27a"/><circle cx="30" cy="27" r="4" fill="#ffd27a"/><circle cx="40" cy="26" r="4" fill="#ffd27a"/>`, '#dde6ef');
      case 'bank': return b(`<path d="M10,22 L30,10 L50,22Z" fill="#3a5a8a" stroke="${K}" stroke-width="2"/><path d="M14,24 L14,44 M22,24 L22,44 M30,24 L30,44 M38,24 L38,44 M46,24 L46,44" stroke="${K}" stroke-width="3"/><rect x="10" y="44" width="40" height="6" fill="#3a5a8a" stroke="${K}" stroke-width="1.5"/><text x="30" y="58" font-family="Arial Black,Arial,sans-serif" font-size="7" fill="#b3262e" text-anchor="middle">-₱2.3M</text>`, '#e6e8f0');
      default: return b(`<rect x="14" y="8" width="32" height="44" fill="#fff" stroke="${K}" stroke-width="1.5"/>`);
    }
  }

  function sceneThumb(sceneFn, x, y, w, before) {
    return `<svg viewBox="${(x - w / 2).toFixed(1)} ${(y - w / 2).toFixed(1)} ${w} ${w}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${sceneFn(!before, uid('th'))}</svg>`;
  }

  // fallback chars needed by the desk before cases.js loads
  const CHARS_FALLBACK = {
    tatay: { skin: '#b07a52', hair: 'short', hairColor: '#4a4040', outfit: 'police', color: '#2a3550', hat: 'police', mustache: true, mustacheColor: '#3a3333', wrinkles: true, jaw: 'square' }
  };

  window.ART = { K, rng, uid, figure, portrait, lineup, sceneTulay, sceneLawton, sceneKTV, BG, desk, docIcon, sceneThumb, rain, neon };
})();
