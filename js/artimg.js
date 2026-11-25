/* =========================================================
   KASO — ILLUSTRATION SUPPORT
   Uses image files from assets/art/ when they exist, and falls back to the
   built-in SVG drawings for anything that is missing.

   assets/art/manifest.json  { "files": [...], "pixel": false }   (made by tools/art_manifest.py)
   assets/art/chars/<id>.png            full body, front view, on #00FF00
   assets/art/chars/<id>-shock.png      optional expression variants: -shock, -angry, -sad
   assets/art/chars/mateo-point.png     optional pointing pose
   assets/art/scenes/<caseId>.png       clean background (no clues), 3:2
   assets/art/clues/<caseId>-<clueId>-before.png / -after.png   clue sprites on #00FF00
   assets/art/bg/<name>.png             office, street, interrog, cork, dark, dawn (3:2); desk (16:9)
   assets/art/layout.json               clue positions/sizes made with the in-game LAYOUT tool
   ========================================================= */
(function () {
  'use strict';
  const ART = window.ART, K = window.KASO;
  const IMG = {};
  const ACTIVE = new Set(); // cases whose scene uses images (background + every clue sprite present)
  ART.IMG = IMG;
  ART.sceneWaiting = [];
  Object.keys(K.CHARS).forEach((k) => { K.CHARS[k]._id = k; });
  let PIXEL = false;

  const EXPR = { neutral: '', shock: 'shock', nervous: 'shock', angry: 'angry', shout: 'angry', smug: 'angry', determined: 'angry', sad: 'sad', closed: 'sad' };
  function charImg(id, expr, pose) {
    if (!id) return null;
    if (pose === 'point' && IMG[`chars/${id}-point.png`]) return IMG[`chars/${id}-point.png`];
    const v = EXPR[expr || 'neutral'];
    return (v && IMG[`chars/${id}-${v}.png`]) || IMG[`chars/${id}.png`] || null;
  }

  /* ---------- layout (clue positions) ---------- */
  const LKEY = 'kaso-art-layout';
  function applyLayout(lay) {
    if (!lay) return;
    K.CASES.forEach((c) => {
      const L = lay[c.id]; if (!L || !ACTIVE.has(c.id)) return;
      c.clues.forEach((cl) => {
        const v = L[cl.id]; if (!v) return;
        ['x', 'y', 'r', 'w'].forEach((k) => { if (typeof v[k] === 'number') cl[k] = v[k]; });
        if (Array.isArray(v.alt)) cl.alt = v.alt;
      });
    });
  }
  ART.layoutJSON = function () {
    const out = {};
    K.CASES.forEach((c) => { if (!ACTIVE.has(c.id) && !c._layoutEdited) return; out[c.id] = {}; c.clues.forEach((cl) => { const o = { x: Math.round(cl.x), y: Math.round(cl.y), r: Math.round(cl.r) }; if (cl.w) o.w = Math.round(cl.w); if (cl.alt) o.alt = cl.alt.map(([a, b]) => [Math.round(a), Math.round(b)]); out[c.id][cl.id] = o; }); });
    return out;
  };
  ART.saveLayout = function () { try { localStorage.setItem(LKEY, JSON.stringify(ART.layoutJSON())); } catch (e) { /* ignore */ } };
  ART.resetLayout = function () { try { localStorage.removeItem(LKEY); } catch (e) { /* ignore */ } };

  /* ---------- loading + green-screen removal ---------- */
  function chroma(im, maxSide) {
    try {
      let w = im.naturalWidth, h = im.naturalHeight;
      const k = Math.min(1, maxSide / Math.max(w, h)); w = Math.round(w * k); h = Math.round(h * k);
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      const x = cv.getContext('2d'); x.imageSmoothingEnabled = !PIXEL; x.drawImage(im, 0, 0, w, h);
      const d = x.getImageData(0, 0, w, h), p = d.data;
      for (let i = 0; i < p.length; i += 4) {
        const r = p[i], g = p[i + 1], b = p[i + 2];
        if (g > 140 && g > r * 1.5 && g > b * 1.5) p[i + 3] = 0;                         // key out green
        else if (g > r + 30 && g > b + 30) { p[i + 1] = Math.max(r, b); p[i + 3] = Math.min(p[i + 3], 200); } // de-spill edges
      }
      x.putImageData(d, 0, 0);
      return cv.toDataURL('image/png');
    } catch (e) { return im.src; } // canvas blocked (e.g. file://): use as-is
  }
  function load(f) {
    return new Promise((res) => {
      const im = new Image();
      im.onload = () => {
        if (f.startsWith('chars/')) IMG[f] = chroma(im, 900);
        else if (f.startsWith('clues/')) IMG[f] = chroma(im, 360);
        else IMG[f] = im.src;
        res();
      };
      im.onerror = () => res();
      im.src = 'assets/art/' + f;
    });
  }

  /* ---------- hook the renderers ---------- */
  function apply() {
    if (PIXEL) document.documentElement.classList.add('pixel-art');
    const origPortrait = ART.portrait;
    ART.portrait = function (c, expr, extra) {   // closer crop for illustrated characters
      if (!(c && charImg(c._id, expr))) return origPortrait(c, expr, extra);
      return `<svg viewBox="-19 -4 38 40" xmlns="http://www.w3.org/2000/svg" ${extra || ''}><g>${ART.figure(c, expr)}</g></svg>`;
    };
    const origFigure = ART.figure;
    ART.figure = function (c, expr, pose) {
      const u = c && charImg(c._id, expr, pose);
      if (!u) return origFigure(c, expr, pose);
      return `<image href="${u}" x="-58" y="-6" width="116" height="176" preserveAspectRatio="xMidYMax meet"/>`;
    };
    K.CASES.forEach((c) => {
      const bg = IMG[`scenes/${c.id}.png`];
      if (!bg) return;
      const ready = c.clues.every((cl) => IMG[`clues/${c.id}-${cl.id}-before.png`] || IMG[`clues/${c.id}-${cl.id}-after.png`]);
      if (!ready) { ART.sceneWaiting.push(c.id); return; } // keep the drawn scene until its clue sprites exist
      ACTIVE.add(c.id);
      c._svgScene = c.scene;
      c.scene = function (after) {
        let s = `<image href="${bg}" x="0" y="0" width="600" height="400" preserveAspectRatio="xMidYMid slice"/>`;
        c.clues.forEach((cl) => {
          const u = IMG[`clues/${c.id}-${cl.id}-${after ? 'after' : 'before'}.png`];
          if (!u) return;
          const w = cl.w || cl.r * 2.8;
          let x = cl.x, y = cl.y;
          if (!after && cl.alt && cl.alt[0]) [x, y] = cl.alt[0];
          s += `<image href="${u}" x="${(x - w / 2).toFixed(1)}" y="${(y - w / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${w.toFixed(1)}"/>`;
        });
        return s;
      };
    });
    Object.keys(ART.BG).forEach((name) => {
      const u = IMG[`bg/${name}.png`]; if (!u) return;
      ART.BG[name] = () => `<image href="${u}" x="0" y="0" width="520" height="340" preserveAspectRatio="xMidYMid slice"/>`;
    });
    if (IMG['bg/desk.png']) {
      ART.desk = () => `<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" class="desk-svg"><image href="${IMG['bg/desk.png']}" x="0" y="0" width="1280" height="720" preserveAspectRatio="xMidYMid slice"/></svg>`;
    }
  }

  window.ART_READY = (async () => {
    let list = [], lay = null, hasLayout = false;
    try {
      const r = await fetch('assets/art/manifest.json', { cache: 'no-cache' });
      if (r.ok) { const m = await r.json(); list = m.files || []; PIXEL = !!m.pixel; hasLayout = !!m.layout; }
    } catch (e) { /* no manifest: built-in art only */ }
    if (hasLayout) { try { const r = await fetch('assets/art/layout.json', { cache: 'no-cache' }); if (r.ok) lay = await r.json(); } catch (e) { /* none */ } }
    if (list.length) { await Promise.all(list.map(load)); apply(); }
    applyLayout(lay);
    try { applyLayout(JSON.parse(localStorage.getItem(LKEY) || 'null')); } catch (e) { /* ignore */ }
    ART.artCount = Object.keys(IMG).length;
  })();
})();
