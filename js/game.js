/* =========================================================
   KASO: DILIM NG MAYNILA — GAME ENGINE
   ========================================================= */
(function () {
  'use strict';
  const { CHARS, CASES, PROLOGUE, METAS, SHOP, CHAPTERS } = window.KASO;
  const ART = window.ART, SFX = window.SFX;
  const stage = document.getElementById('stage');
  let SCALE = 1;
  let cleanup = [];

  /* ---------------- SAVE ---------------- */
  const KEY = 'kaso-dilim-save-v1';
  const DEF = () => ({ pesos: 0, solved: {}, metas: [], owned: [], seenPrologue: false, sound: true, chapterDone: {}, tut: {}, medals: [], thermos: 0, musicVol: 0.5, sfxVol: 0.8 });
  let save = DEF();
  try { const raw = localStorage.getItem(KEY); if (raw) save = Object.assign(DEF(), JSON.parse(raw)); } catch (e) { /* no storage */ }
  if (save.finale) { save.chapterDone[1] = true; delete save.finale; }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { /* ignore */ } }
  SFX.setEnabled(save.sound); SFX.setMusicVol(save.musicVol); SFX.setSfxVol(save.sfxVol);

  /* ---------------- MEDALS ---------------- */
  const MEDALS = [
    { id: 'unang', name: 'Unang Kaso', desc: 'Lutasin ang unang kaso.' },
    { id: 'perpekto', name: 'Perpektong Imbestigasyon', desc: 'Makakuha ng 3★ sa isang kaso.' },
    { id: 'walanghint', name: 'Matang Lawin', desc: 'Kumpletuhin ang eksena nang walang Suriin.' },
    { id: 'walangmali', name: 'Siguradong Tap', desc: 'Kumpletuhin ang eksena nang walang maling tap.' },
    { id: 'mabilis', name: 'Kidlat', desc: 'Kumpletuhin ang eksena na may 60+ segundong natitira.' },
    { id: 'tutol', name: 'TUTOL!', desc: 'Basagin ang unang kasinungalingan sa interogasyon.' },
    { id: 'walanglusot', name: 'Walang Lusot', desc: 'Basagin ang lahat ng kasinungalingan ng salarin sa isang kaso.' },
    { id: 'kab1', name: 'Kabanata 1', desc: 'Tapusin ang Kabanata 1.' },
    { id: 'kab2', name: 'Kabanata 2', desc: 'Tapusin ang Kabanata 2.' },
    { id: 'kolektor', name: 'Kolektor', desc: 'Bilhin ang lahat ng gamit sa mesa.' },
    { id: 'alamat', name: 'Alamat ng Maynila', desc: 'Makakuha ng 3★ sa lahat ng kaso.' }
  ];
  function award(id) {
    if (save.medals.includes(id)) return;
    save.medals.push(id); persist();
    const m = MEDALS.find((x) => x.id === id);
    SFX.medal();
    const t = el(`<div class="medal-toast"><span class="mt-ico">${MEDAL_SVG}</span><span><small>BAGONG MEDALYA</small><b>${esc(m.name)}</b></span></div>`);
    stage.appendChild(t); setTimeout(() => t.remove(), 3600);
  }
  const MEDAL_SVG = '<svg viewBox="0 0 40 40"><path d="M12,2 L20,14 L28,2Z" fill="#b3262e"/><circle cx="20" cy="24" r="13" fill="#e1b866" stroke="#17110d" stroke-width="2.4"/><path d="M20,15 L22.6,21 L29,21.4 L24,25.4 L25.8,31.6 L20,28 L14.2,31.6 L16,25.4 L11,21.4 L17.4,21Z" fill="#fff6c8" stroke="#17110d" stroke-width="1.2"/></svg>';

  /* ---------------- HELPERS ---------------- */
  const $ = (s, r) => (r || stage).querySelector(s);
  const $$ = (s, r) => Array.from((r || stage).querySelectorAll(s));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function show(html) {
    cleanup.forEach((f) => { try { f(); } catch (e) { /* ignore */ } }); cleanup = [];
    stage.innerHTML = '';
    const s = el(html); stage.appendChild(s); return s;
  }
  const later = (fn, ms) => { const t = setTimeout(fn, ms); cleanup.push(() => clearTimeout(t)); return t; };
  const caseById = (id) => CASES.find((c) => c.id === id);
  const suspectOf = (c, id) => c.suspects.find((s) => s.id === id);
  function toStage(e) { const r = stage.getBoundingClientRect(); return { x: (e.clientX - r.left) / SCALE, y: (e.clientY - r.top) / SCALE }; }
  function tap(node, fn) { node.addEventListener('click', (e) => { SFX.init(); fn(e); }); }

  const KAPE_SVG = (empty) => `<svg viewBox="0 0 32 32" class="${empty ? 'empty' : ''}"><path d="M6,10 L24,10 L22,28 L8,28Z" fill="#f2ece0" stroke="#17110d" stroke-width="2"/><path d="M23,14 Q30,14 29,19 Q28,24 22,23" fill="none" stroke="#17110d" stroke-width="2.4"/><ellipse cx="15" cy="11" rx="8.6" ry="2" fill="#5a3214"/><path d="M11,7 Q9,4 11,1 M17,7 Q15,4 17,1" stroke="#9a8a7a" stroke-width="1.6" fill="none"/></svg>`;
  const LENS_SVG = `<svg viewBox="0 0 40 40"><circle cx="17" cy="17" r="11" fill="#bfe9ff" stroke="#17110d" stroke-width="3.5"/><path d="M25,25 L35,35" stroke="#17110d" stroke-width="6" stroke-linecap="round"/><path d="M12,13 Q14,10 18,10" stroke="#fff" stroke-width="2.4" fill="none"/></svg>`;

  function charSVG(id, expr, extra) { return ART.portrait(CHARS[id], expr, extra); }
  function clueThumb(c, clue) { const w = Math.max(60, clue.r * 2.8); return ART.sceneThumb(c.scene, clue.x, clue.y, w, !!clue.thumbBefore); }
  function evItems(c, run) {
    const items = [];
    c.clues.forEach((cl) => { if (run.found.has(cl.id)) items.push({ id: cl.id, name: cl.name, info: cl.info, meta: !!cl.meta, thumb: clueThumb(c, cl), kind: 'Ebidensya sa eksena' }); });
    Object.keys(c.records).forEach((rid) => { if (run.unlocked.has(rid)) { const r = c.records[rid]; items.push({ id: rid, name: r.name, info: r.info, thumb: ART.docIcon(r.icon), kind: 'Rekord', isNew: !run.seenRec.has(rid) }); } });
    return items;
  }
  function kapeHTML(n) { let s = ''; const max = Math.max(5, n); for (let i = 0; i < max; i++) s += KAPE_SVG(i >= n); return `<div class="kape" title="Kape (enerhiya)">${s}</div>`; }
  function soundIcon() { return save.sound ? '🔊' : '🔇'; }
  function chapterOf(c) { return c.chapter || 1; }
  function currentChapter() { let n = 1; CHAPTERS.forEach((ch) => { if (save.chapterDone[ch.n - 1] || ch.n === 1) n = ch.n; }); return n; }

  /* ---------------- FIT TO SCREEN ---------------- */
  let forceLandscape = false;
  function fit() {
    const w = window.innerWidth, h = window.innerHeight;
    SCALE = Math.min(w / 1280, h / 720);
    stage.style.transform = `translate(-50%,-50%) scale(${SCALE})`;
    document.body.classList.toggle('portrait', h > w * 1.05 && !forceLandscape);
  }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', () => setTimeout(fit, 200));
  document.getElementById('rotate-go').addEventListener('click', () => { forceLandscape = true; fit(); });
  fit();

  function toggleFullscreen() {
    const d = document.documentElement;
    try {
      if (!document.fullscreenElement) {
        const p = d.requestFullscreen ? d.requestFullscreen() : (d.webkitRequestFullscreen && d.webkitRequestFullscreen());
        if (p && p.then) p.then(() => { try { screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => {}); } catch (e) { /* ignore */ } }).catch(() => {});
      } else if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    } catch (e) { /* ignore */ }
  }

  /* ---------------- COACH (tutorial) ---------------- */
  function coach(key, steps, done) {
    if (save.tut[key]) { if (done) done(); return; }
    let i = 0;
    const o = el('<div class="coach"><div class="coach-hole"></div><div class="coach-box"><span class="who">PO2 JESSA · GABAY</span><p></p><button class="btn small primary">SIGE ▶</button><button class="coach-skip">Laktawan ang tutorial</button></div></div>');
    stage.appendChild(o);
    const hole = $('.coach-hole', o), box = $('.coach-box', o), p = $('p', box);
    function render() {
      const st = steps[i], target = st.sel ? $(st.sel) : null;
      p.textContent = st.text;
      $('.btn', box).textContent = i === steps.length - 1 ? 'SIMULAN ▶' : 'SIGE ▶';
      if (target) {
        const r = target.getBoundingClientRect(), sr = stage.getBoundingClientRect();
        const x = (r.left - sr.left) / SCALE - 8, y = (r.top - sr.top) / SCALE - 8, w = r.width / SCALE + 16, h = r.height / SCALE + 16;
        Object.assign(hole.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', display: 'block' });
        const below = y + h + 190 < 720;
        const bx = Math.min(1280 - 440, Math.max(20, x + w / 2 - 210));
        Object.assign(box.style, { left: bx + 'px', top: (below ? y + h + 14 : Math.max(10, y - 180)) + 'px' });
      } else {
        hole.style.display = 'none';
        Object.assign(box.style, { left: '420px', top: '260px' });
      }
    }
    function next() { SFX.tap(); i++; if (i >= steps.length) finish(); else render(); }
    function finish() { o.remove(); save.tut[key] = true; persist(); if (done) done(); }
    o.addEventListener('click', (e) => { SFX.init(); if (e.target.closest('.coach-skip')) { save.tut = { inv: true, files: true, room: true }; finish(); return; } next(); });
    render();
  }

  /* =========================================================
     TITLE
     ========================================================= */
  function title() {
    SFX.music('noir');
    const has = save.seenPrologue;
    const s = show(`<div class="screen title">
      <div class="shade"></div>
      <div class="rain" style="inset:0;opacity:.35"></div>
      <div class="tag">Isang misteryo ng Maynila.<br>Anim na kaso. Isang anino.</div>
      <div class="menu">
        ${has ? '<button class="btn primary pulse" id="go">ITULOY ▶</button><button class="btn dark" id="new">BAGONG LARO</button>' : '<button class="btn primary pulse" id="go">SIMULAN ▶</button>'}
        <button class="btn dark" id="fs" title="Fullscreen">⛶</button>
      </div>
      <div class="ver">Kabanata 1–2 · Landscape 16:9</div>
    </div>`);
    tap($('#go', s), () => { SFX.rain(true); SFX.music('noir'); if (!save.seenPrologue) { komiks(PROLOGUE, () => { save.seenPrologue = true; persist(); startCase(CASES[0]); }); } else desk(); });
    const nw = $('#new', s);
    if (nw) tap(nw, () => confirmBox('Burahin ang lahat ng progreso at magsimula ulit?', () => { const keep = { sound: save.sound, musicVol: save.musicVol, sfxVol: save.sfxVol }; save = Object.assign(DEF(), keep); persist(); SFX.rain(true); komiks(PROLOGUE, () => { save.seenPrologue = true; persist(); startCase(CASES[0]); }); }));
    tap($('#fs', s), toggleFullscreen);
  }

  function confirmBox(msg, yes) {
    const o = el(`<div class="overlay"><div class="card"><h2>Sigurado ka?</h2><p>${esc(msg)}</p><div class="row"><button class="btn primary" id="y">OO</button><button class="btn dark" id="n">HINDI</button></div></div></div>`);
    stage.appendChild(o);
    tap($('#y', o), () => { o.remove(); yes(); });
    tap($('#n', o), () => o.remove());
  }

  /* =========================================================
     DESK (HUB)
     ========================================================= */
  function isUnlocked(c) {
    const i = CASES.indexOf(c);
    if (i === 0) return true;
    const prev = CASES[i - 1];
    if (!save.solved[prev.id]) return false;
    if (chapterOf(c) !== chapterOf(prev) && !save.chapterDone[chapterOf(prev)]) return false;
    return true;
  }
  function nextCase() { return CASES.find((c) => !save.solved[c.id] && isUnlocked(c)); }
  function pendingChapter() { return CHAPTERS.find((ch) => !save.chapterDone[ch.n] && METAS.filter((m) => m.chapter === ch.n).every((m) => save.metas.includes(m.id))); }
  function desk() {
    SFX.rain(true); SFX.music('noir');
    const nc = nextCase(), pc = pendingChapter();
    const solvedN = Object.keys(save.solved).length;
    const lastDone = CHAPTERS.filter((ch) => save.chapterDone[ch.n]).pop();
    let status;
    if (nc) status = `Bagong tawag! Sagutin ang <b>telepono</b> para sa Kaso #${nc.num}.`;
    else if (pc) status = `Kumpleto ang mga palatandaan ng ${esc(pc.title.split(':')[0])}. Pumunta sa <b>corkboard</b>.`;
    else if (lastDone && lastDone.n === CHAPTERS.length) status = 'Tapos ang Kabanata 2. Nakatakas si Kapitan Dizon... Itutuloy sa Kabanata 3.';
    else status = 'Tahimik ang gabi.';
    const s = show(`<div class="screen desk">
      ${ART.desk(save)}
      <div class="rain" style="left:768px;top:42px;width:464px;height:356px;opacity:.8"></div>
      <div class="topbar" style="background:linear-gradient(rgba(20,12,6,.92),rgba(20,12,6,.75))">
        <div class="title-txt">OPISINA NI INSP. MATEO REYES <small>${esc(CHAPTERS[currentChapter() - 1].title)}</small></div>
        <div class="chip" title="Pera"><span class="peso">₱</span><span>${save.pesos}</span></div>
        <div class="chip" title="Nalutas na kaso">📁 ${solvedN}/${CASES.length}</div>
        <button class="btn small gold" id="shop">TINDAHAN</button>
        <button class="btn small dark" id="med">MEDALYA ${save.medals.length}/${MEDALS.length}</button>
        <button class="iconbtn" id="set" title="Settings" style="width:44px;height:44px;font-size:20px">⚙</button>
        <button class="iconbtn" id="fs" title="Fullscreen" style="width:44px;height:44px;font-size:20px">⛶</button>
        <button class="iconbtn" id="home" title="Title screen" style="width:44px;height:44px;font-size:20px">⏏</button>
      </div>
      <button class="hotspot ${pc ? 'ringing' : ''}" id="hs-cork" style="left:34px;top:64px;width:412px;height:316px" aria-label="Corkboard"><span class="lbl">ANG ANINO · CORKBOARD</span></button>
      <button class="hotspot top ${nc ? 'ringing' : ''}" id="hs-phone" style="left:186px;top:500px;width:170px;height:100px" aria-label="Telepono"><span class="lbl">${nc ? 'SAGUTIN ANG TAWAG' : 'TELEPONO'}</span></button>
      ${nc ? '<div class="ringsfx" style="left:352px;top:478px">KRIIING!</div>' : ''}
      <button class="hotspot" id="hs-type" style="left:500px;top:486px;width:320px;height:160px" aria-label="Mga Kaso"><span class="lbl">MGA KASO</span></button>
      <button class="hotspot" id="hs-fold" style="left:120px;top:580px;width:270px;height:124px" aria-label="Paano maglaro"><span class="lbl">GABAY SA IMBESTIGASYON</span></button>
      <button class="hotspot" id="hs-mug" style="left:1010px;top:500px;width:96px;height:130px" aria-label="Kape"><span class="lbl">KAPE${save.thermos ? ' +' + save.thermos * 2 : ''}</span></button>
      <div class="status">${status}</div>
    </div>`);
    tap($('#hs-phone', s), () => { if (nc) { SFX.ring(); later(() => startCase(nc), 400); } else { SFX.click(); toast('Walang bagong tawag. Tingnan ang mga lumang kaso sa makinilya.'); } });
    tap($('#hs-type', s), () => { SFX.type(); caseList(); });
    tap($('#hs-cork', s), () => { SFX.flip(); corkboard(); });
    tap($('#hs-fold', s), () => { SFX.flip(); howTo(); });
    tap($('#hs-mug', s), () => { SFX.good(); toast(save.thermos ? `May ${save.thermos} thermos ka: +${save.thermos * 2} kape sa susunod na kaso.` : '"Barakong Batangas. Mapait — tulad ng katotohanan." — Mateo'); });
    tap($('#shop', s), () => { SFX.click(); shop(); });
    tap($('#med', s), () => { SFX.click(); medals(); });
    tap($('#set', s), () => { SFX.click(); settings(); });
    tap($('#fs', s), toggleFullscreen);
    tap($('#home', s), () => { SFX.rain(false); title(); });
    if (nc) { SFX.ring(); const iv = setInterval(() => SFX.ring(), 3500); cleanup.push(() => clearInterval(iv)); }
  }

  function toast(msg) {
    const t = el(`<div class="toast">${esc(msg)}</div>`);
    stage.appendChild(t); setTimeout(() => t.remove(), 3000);
  }

  function modal(titleTxt, body, cls) {
    const o = el(`<div class="modal-back"><div class="modal ${cls || ''}"><button class="x" aria-label="Isara">×</button><h2>${titleTxt}</h2><div class="body">${body}</div></div></div>`);
    stage.appendChild(o);
    tap($('.x', o), () => { SFX.click(); o.remove(); });
    o.addEventListener('click', (e) => { if (e.target === o) o.remove(); });
    return o;
  }

  function caseList() {
    let html = '';
    CHAPTERS.forEach((ch) => {
      const cs = CASES.filter((c) => chapterOf(c) === ch.n);
      html += `<h3 class="ch-h">${esc(ch.title)}${save.chapterDone[ch.n] ? ' <span>✔ TAPOS</span>' : ''}</h3><div class="cases">`;
      html += cs.map((c) => {
        const unlocked = isUnlocked(c), st = save.solved[c.id];
        const stars = st ? '★'.repeat(st) + '<span style="opacity:.25">' + '★'.repeat(3 - st) + '</span>' : '';
        return `<div class="casecard ${unlocked ? '' : 'locked'}">
          <div class="num">KASO #${c.num}</div>
          <div class="thumb">${unlocked ? `<svg viewBox="0 60 600 300" preserveAspectRatio="xMidYMid slice">${c.scene(false)}</svg>` : ''}</div>
          <div class="nm">${unlocked ? esc(c.title) : '???'}</div>
          <div class="pl">${unlocked ? esc(c.place) : 'Naka-lock — lutasin ang naunang kaso' + (chapterOf(c) > 1 ? ' at ang corkboard ng nakaraang kabanata.' : '.')}</div>
          <div class="stars">${stars}</div>
          ${unlocked ? `<button class="btn small ${st ? 'dark' : 'primary'}" data-case="${c.id}">${st ? 'ULITIN' : 'LARUIN'}</button>` : ''}
        </div>`;
      }).join('') + '</div>';
    });
    const o = modal('MGA KASO', html);
    $$('[data-case]', o).forEach((b) => tap(b, () => { o.remove(); startCase(caseById(b.dataset.case)); }));
  }

  function shop() {
    const items = SHOP.map((it) => {
      const own = !it.consumable && save.owned.includes(it.id);
      const label = own ? 'NASA MESA NA' : (it.consumable ? `BILHIN${save.thermos ? ' (' + save.thermos + ')' : ''}` : 'BILHIN');
      return `<div class="shopitem"><b>${esc(it.name)}</b><div>${esc(it.desc)}</div><div style="font-family:var(--f-display);font-size:22px;color:var(--blood)">₱${it.price}</div>
        <button class="btn small ${own ? 'dark' : 'gold'}" data-buy="${it.id}" ${own ? 'disabled' : ''}>${label}</button></div>`;
    }).join('');
    const o = modal(`TINDAHAN NI ALING SION <span style="font-size:22px;color:var(--blood)">· ₱${save.pesos}</span>`, `<p style="margin:0 0 12px">Palamutian ang mesa ni Mateo, o mag-ipon ng kape para sa susunod na kaso.</p><div class="shopgrid">${items}</div>`);
    $$('[data-buy]', o).forEach((b) => tap(b, () => {
      const it = SHOP.find((x) => x.id === b.dataset.buy);
      if (save.pesos < it.price) { SFX.bad(); toast(`Kulang ang pera. Kailangan ng ₱${it.price}.`); return; }
      save.pesos -= it.price;
      if (it.consumable) save.thermos++; else save.owned.push(it.id);
      persist(); SFX.win();
      if (SHOP.filter((x) => !x.consumable).every((x) => save.owned.includes(x.id))) award('kolektor');
      o.remove(); desk(); if (it.consumable) shop();
    }));
  }

  function medals() {
    const list = MEDALS.map((m) => { const got = save.medals.includes(m.id); return `<div class="medal ${got ? 'got' : ''}"><span class="mi">${got ? MEDAL_SVG : '?'}</span><span><b>${esc(m.name)}</b><br>${esc(m.desc)}</span></div>`; }).join('');
    modal(`MGA MEDALYA <span style="font-size:22px;color:var(--blood)">· ${save.medals.length}/${MEDALS.length}</span>`, `<div class="medals">${list}</div>`);
  }

  function settings() {
    const o = modal('SETTINGS', `<div class="settings">
      <label for="set-snd">Tunog</label><button class="btn small ${save.sound ? 'gold' : 'dark'}" id="set-snd">${save.sound ? 'BUKAS 🔊' : 'SARADO 🔇'}</button>
      <label for="set-mus">Musika</label><input type="range" id="set-mus" min="0" max="1" step="0.05" value="${save.musicVol}">
      <label for="set-sfx">Sound effects</label><input type="range" id="set-sfx" min="0" max="1" step="0.05" value="${save.sfxVol}">
      <label>Tutorial</label><button class="btn small dark" id="set-tut">IPAKITA ULIT</button>
      <label>Progreso</label><button class="btn small primary" id="set-reset">BURAHIN LAHAT</button>
    </div>`);
    tap($('#set-snd', o), () => { save.sound = !save.sound; persist(); SFX.setEnabled(save.sound); o.remove(); settings(); });
    $('#set-mus', o).addEventListener('input', (e) => { save.musicVol = +e.target.value; SFX.setMusicVol(save.musicVol); persist(); });
    $('#set-sfx', o).addEventListener('input', (e) => { save.sfxVol = +e.target.value; SFX.setSfxVol(save.sfxVol); persist(); });
    $('#set-sfx', o).addEventListener('change', () => SFX.good());
    tap($('#set-tut', o), () => { save.tut = {}; persist(); toast('Lalabas ulit ang tutorial sa susunod na kaso.'); });
    tap($('#set-reset', o), () => confirmBox('Burahin ang lahat ng progreso, pera at medalya?', () => { save = DEF(); persist(); title(); }));
  }

  function howTo() {
    modal('GABAY SA IMBESTIGASYON', `<div class="howto"><ol>
      <li><b>KOMIKS</b> — Basahin ang kuwento. I-tap kahit saan para magpatuloy.</li>
      <li><b>BUOD NG KASO</b> — Kilalanin ang biktima at ang apat na suspek. I-tap ang bawat suspek sa lineup.</li>
      <li><b>HANAPIN ANG EBIDENSYA</b> — Ikumpara ang CCTV (kaliwa) at ang eksena ngayon (kanan). I-tap ang mga pinagbago. Gamitin ang <b>ZOOM</b>, pinch o scroll para lumapit at i-drag para gumalaw. Bawat maling tap: −5 segundo. Ang <b>SURIIN</b> ay nagtuturo ng isang ebidensya kapalit ng 1 kape.</li>
      <li><b>TALAAN AT ORAS</b> — Suriin ang alibi ng bawat suspek sa timeline. May mga bagong rekord na lalabas.</li>
      <li><b>INTEROGASYON</b> — Kausapin ang mga suspek. Pumili ng <i>pahayag</i>, pumili ng ebidensya, at pindutin ang <b>TUTOL!</b> kapag nagsisinungaling sila. Saka ilagay ang dalawang ebidensya sa <i>Sandata/Paraan</i> at <i>Motibo/Patunay</i>, at pindutin ang <b>HULIHIN!</b> Bawat maling TUTOL o akusasyon: −1 kape.</li>
    </ol><p style="margin-top:12px">May nakatagong <b style="color:var(--blood)">palatandaan ni Ang Anino</b> sa bawat eksena. Ipunin ang tatlo bawat kabanata para sa corkboard.</p></div>`, 'howto');
  }

  /* =========================================================
     KOMIKS ENGINE
     ========================================================= */
  function panelBG(bg) {
    if (typeof bg === 'string') return ART.BG[bg]();
    const c = caseById(bg.scene);
    return `<svg x="0" y="0" width="520" height="340" viewBox="${bg.vb}" preserveAspectRatio="xMidYMid slice">${c.scene(bg.after)}</svg>`;
  }
  function panelHTML(p) {
    let chars = '';
    (p.chars || []).forEach((ch) => {
      const k = ch.flip ? -ch.s : ch.s;
      chars += `<g transform="translate(${ch.x},${ch.y}) scale(${k},${ch.s})">${ART.figure(CHARS[ch.c], ch.e, ch.pose)}</g>`;
    });
    return `<div class="kpanel"><svg viewBox="0 0 520 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${panelBG(p.bg)}${chars}${p.svg || ''}</svg>${p.cap ? `<div class="kcap">${esc(p.cap)}</div>` : ''}</div>`;
  }
  function komiks(panels, done) {
    const s = show(`<div class="screen komiks">
      <div class="dots">${panels.map(() => '<i></i>').join('')}</div>
      <button class="btn small dark skip">LAKTAWAN ▸▸</button>
      <div class="track">${panels.map(panelHTML).join('')}</div>
      <div class="hint">I-tap para magpatuloy ▸</div>
    </div>`);
    const track = $('.track', s), pEls = $$('.kpanel', s), dots = $$('.dots i', s);
    let pi = -1, bi = 0, finished = false;
    function beatSound(b) {
      if (!b.sfx) { SFX.tap(); return; }
      const t = b.sfx.toUpperCase();
      if (t.includes('KRII')) SFX.ring(); else if (t.includes('KIDLAT')) SFX.thunder(); else if (t.includes('WEE')) SFX.siren(); else if (t.includes('BLAG') || t.includes('KRASH')) SFX.slam(); else if (t.includes('KLIK')) SFX.click(); else SFX.flip();
    }
    function showBeat(b) {
      const pe = pEls[pi];
      if (b.sfx) {
        const n = el(`<div class="sfx" style="left:${b.x}%;top:${b.y}%;font-size:${(b.size || 40) * 1.5}px;color:${b.color || '#fff'};--r:${b.rot || 0}deg;transform:rotate(${b.rot || 0}deg)">${esc(b.sfx)}</div>`);
        pe.appendChild(n);
        if (b.flash) { const f = el('<div class="flash"></div>'); s.appendChild(f); setTimeout(() => f.remove(), 700); }
      } else if (b.b) {
        const n = el(`<div class="bubble tail-${b.tail || 'l'} ${b.dark ? 'dark' : ''}" style="left:${b.x}%;top:${b.y}%;width:${b.w}%">${b.who ? `<span class="who">${esc(b.who)}</span>` : ''}${esc(b.b)}</div>`);
        pe.appendChild(n);
      }
      beatSound(b);
    }
    function goPanel(i) {
      pi = i; bi = 0;
      track.style.transform = `translateX(${640 - (i * (796 + 40) + 398)}px)`;
      pEls.forEach((p, k) => p.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k <= i));
      const beats = panels[i].beats || [];
      if (beats.length) later(() => { if (pi === i && bi === 0) { showBeat(beats[0]); bi = 1; } }, 650);
      else SFX.flip();
    }
    function advance() {
      if (finished) return;
      const beats = panels[pi].beats || [];
      if (bi === 0 && beats.length) { showBeat(beats[0]); bi = 1; return; }
      if (bi < beats.length) { showBeat(beats[bi]); bi++; return; }
      if (pi < panels.length - 1) goPanel(pi + 1); else end();
    }
    function end() { if (finished) return; finished = true; done(); }
    s.addEventListener('click', (e) => { SFX.init(); if (e.target.closest('.skip')) return; advance(); });
    tap($('.skip', s), () => end());
    const onKey = (e) => { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); advance(); } if (e.key === 'Escape') end(); };
    document.addEventListener('keydown', onKey); cleanup.push(() => document.removeEventListener('keydown', onKey));
    goPanel(0);
  }

  /* =========================================================
     CASE FLOW
     ========================================================= */
  let run = null;
  function startCase(c) {
    const bonus = save.thermos * 2;
    if (save.thermos) { save.thermos = 0; persist(); }
    run = { c, found: new Set(), kape: 5 + bonus, hints: 0, timeouts: 0, wrong: 0, misses: 0, badTutol: 0, broken: new Set(), checked: new Set(), unlocked: new Set(), seenRec: new Set(), timeLeft: c.time, started: Date.now(), suspect: null, slot1: null, slot2: null, sceneDone: false };
    komiks(c.intro, () => outline(c));
  }

  function topbar(c, phase, extra) {
    return `<div class="topbar">
      <button class="back" id="tb-back"><span>↩</span>OPISINA</button>
      <div class="title-txt">KASO #${c.num} · ${esc(c.title.toUpperCase())}<small>${esc(phase)}</small></div>
      ${extra || ''}
    </div>`;
  }
  function bindBack(s) { tap($('#tb-back', s), () => confirmBox('Bumalik sa opisina? Mawawala ang progreso sa kasong ito.', () => desk())); }

  /* ---------------- PHASE 2: OUTLINE ---------------- */
  function outline(c) {
    SFX.rain(false); SFX.music('noir');
    const v = c.victim;
    const s = show(`<div class="screen outline woodbg">
      ${topbar(c, 'Yugto 2 · Buod ng Kaso at mga Suspek')}
      <div class="folder" style="left:26px;top:84px;width:610px;height:620px"><span class="tabname">KASO #${c.num}</span>
        <div class="clip"></div>
        <div class="sheet">
          <h2>BUOD NG KASO</h2><div class="sub">Pangkalahatang-tanaw ng insidente</div>
          <div class="caseno">KASO BLG.<b>${c.num}</b></div>
          <div style="display:flex;gap:14px;align-items:flex-start">
            <div class="polaroid" style="width:330px;height:228px;transform:rotate(-2deg)"><svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">${c.scene(true)}</svg><div class="pc">${esc(c.place)}</div></div>
            <div class="polaroid" style="width:150px;height:186px;transform:rotate(3deg);background:#fff"><div style="width:100%;height:100%;background:#cdbf9c">${charSVG(v.look, 'closed')}</div><div class="pc">Biktima</div></div>
          </div>
          <table class="facts">
            <tr><td>Biktima</td><td><b>${esc(v.name)}</b> — ${esc(v.desc)}</td></tr>
            <tr><td>Sanhi</td><td>${esc(v.cause)}</td></tr>
            <tr><td>Lugar</td><td>${esc(v.found)}</td></tr>
            <tr><td>Oras ng krimen</td><td class="red">${esc(v.windowText)} (tantiya)</td></tr>
            <tr><td>Nakatagpo</td><td>${esc(v.foundBy)}</td></tr>
            <tr><td>Panahon</td><td>${esc(v.weather)}</td></tr>
          </table>
        </div>
      </div>
      <div class="lu"><span class="lt">MGA SUSPEK</span><div id="lu-svg" style="width:100%;height:100%"></div></div>
      <div class="info" id="lu-info"></div>
      <div class="banner"><em>MAY NAGSISINUNGALING!</em><small>Apat na suspek, iisang salarin.</small></div>
      <button class="btn primary" id="go" style="position:absolute;right:40px;top:640px">IMBESTIGAHAN ▶</button>
    </div>`);
    bindBack(s);
    const luWrap = $('#lu-svg', s), info = $('#lu-info', s);
    function pick(id) {
      const list = c.suspects.map((p) => ({ id: p.id, name: p.name, h: p.h, look: CHARS[p.id] }));
      luWrap.innerHTML = ART.lineup(list, id);
      const p = suspectOf(c, id);
      info.innerHTML = `<div class="pp">${charSVG(p.id, 'neutral')}</div><div><b>${esc(p.name)}</b> · <span style="color:var(--blood)">${esc(p.role)}</span><br>Alibi: ${esc(p.alibi)}<br><span style="color:var(--sepia)">Tala: ${esc(p.note)}</span></div>`;
      $$('.lu-fig', luWrap).forEach((g) => g.addEventListener('click', () => { SFX.tap(); pick(g.dataset.suspect); }));
    }
    pick(c.suspects[0].id);
    tap($('#go', s), () => { SFX.stamp(); investigate(c); });
  }

  /* ---------------- PHASE 3: INVESTIGATION ---------------- */
  function investigate(c) {
    SFX.music('tension');
    const n = c.clues.length;
    const extra = `<div class="hud-mid"><span class="objective">HANAPIN: ${n}</span><div class="flipclock" id="clock"></div></div>${kapeHTML(run.kape)}<button class="hintbtn" id="zoom" title="Zoom">⊕ ZOOM</button><button class="hintbtn" id="hint" title="Suriin (−1 kape)">${LENS_SVG}SURIIN −1☕</button><button class="iconbtn" id="pause" style="width:44px;height:44px;font-size:20px" title="Pause">❚❚</button>`;
    const s = show(`<div class="screen inv">
      ${topbar(c, 'Yugto 3 · Hanapin ang Ebidensya', extra)}
      <div class="spotpanel cctv" id="pA" style="left:12px"><svg viewBox="0 0 600 400" preserveAspectRatio="none">${c.scene(false)}<g class="marks"></g></svg><div class="plabel"><span class="rec"></span>${esc(c.beforeLabel)}</div><div class="zoomtag" hidden></div></div>
      <div class="spotpanel soco" id="pB" style="left:648px"><svg viewBox="0 0 600 400" preserveAspectRatio="none">${c.scene(true)}<g class="marks"></g></svg><div class="plabel">📷 ${esc(c.afterLabel)}</div><div class="zoomtag" hidden></div></div>
      <div class="talk"><div class="pp">${charSVG('jessa', 'determined')}</div><div class="saybox" id="say"><span class="who">PO2 JESSA DIMACULANGAN · SOCO</span><span id="saytx"></span></div></div>
      <div class="tray"><div class="th">EBIDENSYANG NAKALAP <span id="cnt">0 / ${n}</span></div><div class="slots" style="grid-template-columns:repeat(${n},1fr)">${c.clues.map((cl) => `<div class="cslot" data-c="${cl.id}">?</div>`).join('')}</div><div class="lastfound" id="last">Ikumpara ang dalawang larawan. Ano ang nagbago?</div></div>
    </div>`);
    bindBack(s);
    const pA = $('#pA', s), pB = $('#pB', s), panels = [pA, pB];
    const say = (t) => { $('#saytx', s).textContent = t; };
    say(`Inspector, ito ang kuha ng CCTV bago ang krimen, at ito ang eksena ngayon. ${n} ang pinagbago — hanapin natin lahat!`);
    const clockEl = $('#clock', s);
    function drawClock() {
      const t = Math.max(0, run.timeLeft), m = Math.floor(t / 60), sec = t % 60;
      const str = String(m).padStart(2, '0') + String(sec).padStart(2, '0');
      clockEl.innerHTML = `<b>${str[0]}</b><b>${str[1]}</b><i>:</i><b>${str[2]}</b><b>${str[3]}</b>`;
      clockEl.classList.toggle('low', t <= 15);
    }
    function refreshKape() { const k = $('.kape', s); k.outerHTML = kapeHTML(run.kape); $('#hint', s).disabled = run.kape <= 0; }
    drawClock(); refreshKape();
    let paused = false, done = false;
    const iv = setInterval(() => {
      if (paused || done) return;
      run.timeLeft--; drawClock();
      if (run.timeLeft <= 10 && run.timeLeft > 0) SFX.tick();
      if (run.timeLeft <= 0) timeout();
    }, 1000);
    cleanup.push(() => clearInterval(iv));

    /* --- zoom / pan --- */
    const view = { x: 0, y: 0, w: 600, h: 400 };
    function setView(x, y, w) {
      w = Math.max(160, Math.min(600, w)); const h = w * 2 / 3;
      view.w = w; view.h = h; view.x = Math.max(0, Math.min(600 - w, x)); view.y = Math.max(0, Math.min(400 - h, y));
      panels.forEach((p) => { $('svg', p).setAttribute('viewBox', `${view.x.toFixed(1)} ${view.y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`); const zt = $('.zoomtag', p); zt.hidden = w >= 599; zt.textContent = `×${(600 / w).toFixed(1)}`; });
      $('#zoom', s).textContent = w < 599 ? '⊖ ZOOM ×1' : '⊕ ZOOM ×2';
    }
    function zoomAt(fx, fy, factor) { // fx,fy in scene units
      const nw = Math.max(160, Math.min(600, view.w * factor)), k = nw / view.w;
      setView(fx - (fx - view.x) * k, fy - (fy - view.y) * k, nw);
    }
    function sceneXY(p, cx, cy) { const r = $('svg', p).getBoundingClientRect(); return { x: view.x + (cx - r.left) / r.width * view.w, y: view.y + (cy - r.top) / r.height * view.h, rw: r.width }; }
    tap($('#zoom', s), () => { SFX.tap(); if (view.w < 599) setView(0, 0, 600); else setView(view.x + view.w / 4, view.y + view.h / 4, 300); });

    function markFound(cl, silent) {
      panels.forEach((p) => {
        const g = $('.marks', p);
        g.insertAdjacentHTML('beforeend', `<circle class="ring-found" cx="${cl.x}" cy="${cl.y}" r="${cl.r + 4}"/>`);
        (cl.alt || []).forEach(([ax, ay]) => g.insertAdjacentHTML('beforeend', `<circle class="ring-found" cx="${ax}" cy="${ay}" r="${cl.r + 4}"/>`));
      });
      const slot = $(`.cslot[data-c="${cl.id}"]`, s);
      slot.classList.add('got'); if (cl.meta) slot.classList.add('meta');
      slot.innerHTML = clueThumb(c, cl);
      $('#cnt', s).textContent = `${run.found.size} / ${n}`;
      if (!silent) { $('#last', s).innerHTML = `<b>${esc(cl.name)}</b><br>${esc(cl.info)}`; say(cl.say); }
    }
    run.found.forEach((id) => markFound(c.clues.find((x) => x.id === id), true));

    function hit(p, e) {
      if (paused || done) return;
      const { x, y } = sceneXY(p, e.clientX, e.clientY);
      const tol = 6 * (view.w / 600);
      let best = null, bd = 1e9;
      c.clues.forEach((cl) => {
        if (run.found.has(cl.id)) return;
        [[cl.x, cl.y]].concat(cl.alt || []).forEach(([cx, cy]) => { const d = Math.hypot(cx - x, cy - y); if (d < cl.r + 6 + tol && d < bd) { bd = d; best = cl; } });
      });
      if (best) {
        run.found.add(best.id); SFX.good(); markFound(best);
        $$('.ring-hint', s).forEach((h) => h.remove());
        if (run.found.size === n) complete();
        return;
      }
      const onFound = c.clues.some((cl) => run.found.has(cl.id) && [[cl.x, cl.y]].concat(cl.alt || []).some(([cx, cy]) => Math.hypot(cx - x, cy - y) < cl.r + 6));
      if (onFound) return;
      run.misses++; run.timeLeft = Math.max(0, run.timeLeft - 5); drawClock(); SFX.bad();
      const g = $('.marks', p), k = view.w / 600 * 12;
      const m = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      m.setAttribute('d', `M${x - k},${y - k} L${x + k},${y + k} M${x + k},${y - k} L${x - k},${y + k}`); m.setAttribute('class', 'miss'); m.style.strokeWidth = 5 * view.w / 600;
      g.appendChild(m); setTimeout(() => m.remove(), 750);
      const pt = toStage(e);
      const pen = el(`<div class="penalty" style="left:${pt.x - 20}px;top:${pt.y - 40}px">−5s</div>`); s.appendChild(pen); setTimeout(() => pen.remove(), 950);
      p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake');
      if (run.timeLeft <= 0) timeout();
    }
    panels.forEach((p) => {
      const ptrs = new Map(); let pinch = null, gesture = false;
      p.addEventListener('pointerdown', (e) => {
        SFX.init(); try { p.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        ptrs.set(e.pointerId, { x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, vx: view.x, vy: view.y });
        if (ptrs.size === 1) gesture = false;
        if (ptrs.size === 2) {
          const [a, b] = [...ptrs.values()]; gesture = true;
          const mid = sceneXY(p, (a.x + b.x) / 2, (a.y + b.y) / 2);
          pinch = { d0: Math.hypot(a.x - b.x, a.y - b.y), w0: view.w, mid };
        }
      });
      p.addEventListener('pointermove', (e) => {
        const pt = ptrs.get(e.pointerId); if (!pt) return;
        pt.x = e.clientX; pt.y = e.clientY;
        if (ptrs.size === 2 && pinch) {
          const [a, b] = [...ptrs.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
          const nw = Math.max(160, Math.min(600, pinch.w0 * pinch.d0 / Math.max(1, d)));
          const k = nw / view.w; setView(pinch.mid.x - (pinch.mid.x - view.x) * k, pinch.mid.y - (pinch.mid.y - view.y) * k, nw);
          return;
        }
        if (Math.hypot(pt.x - pt.x0, pt.y - pt.y0) > 9) gesture = true;
        if (gesture && view.w < 599) {
          const rw = $('svg', p).getBoundingClientRect().width;
          setView(pt.vx - (pt.x - pt.x0) / rw * view.w, pt.vy - (pt.y - pt.y0) / rw * view.w, view.w);
        }
      });
      const up = (e, cancel) => {
        if (!ptrs.has(e.pointerId)) return;
        ptrs.delete(e.pointerId);
        if (ptrs.size < 2) pinch = null;
        if (!cancel && !gesture && ptrs.size === 0) hit(p, e);
        if (ptrs.size === 0) gesture = false;
        else { ptrs.forEach((q) => { q.x0 = q.x; q.y0 = q.y; q.vx = view.x; q.vy = view.y; }); }
      };
      p.addEventListener('pointerup', (e) => up(e, false));
      p.addEventListener('pointercancel', (e) => up(e, true));
      p.addEventListener('wheel', (e) => { e.preventDefault(); const f = sceneXY(p, e.clientX, e.clientY); zoomAt(f.x, f.y, e.deltaY > 0 ? 1.2 : 1 / 1.2); }, { passive: false });
      p.style.touchAction = 'none';
    });

    tap($('#hint', s), () => {
      if (run.kape <= 0 || done) return;
      const left = c.clues.filter((cl) => !run.found.has(cl.id));
      if (!left.length) return;
      run.kape--; run.hints++; refreshKape(); SFX.flip();
      const cl = left[Math.floor(Math.random() * left.length)];
      $$('.ring-hint', s).forEach((h) => h.remove());
      if (view.w < 599) setView(cl.x - view.w / 2, cl.y - view.h / 2, view.w);
      $('.marks', pB).insertAdjacentHTML('beforeend', `<circle class="ring-hint" cx="${cl.x}" cy="${cl.y}" r="${cl.r + 10}"/>`);
      say('Tingnan mo rito, Inspector... may kakaiba sa bahaging ito.');
      setTimeout(() => $$('.ring-hint', s).forEach((h) => h.remove()), 3500);
    });
    tap($('#pause', s), () => {
      paused = true;
      const o = el(`<div class="overlay"><div class="card"><h2>NAKA-PAUSE</h2><p>Huminga muna, Inspector.</p><div class="row"><button class="btn primary" id="r">ITULOY</button><button class="btn dark" id="q">BUMALIK SA OPISINA</button></div></div></div>`);
      s.appendChild(o);
      tap($('#r', o), () => { o.remove(); paused = false; });
      tap($('#q', o), () => desk());
    });
    function timeout() {
      if (done || paused) return;
      paused = true; run.timeouts++; SFX.lose();
      const free = run.kape <= 0;
      const o = el(`<div class="overlay"><div class="card"><div class="stamp">UBOS NA ANG ORAS!</div><p>${free ? 'Wala ka nang kape... pero hindi sumusuko ang isang detektib.' : 'Uminom ng kape para sa dagdag na 60 segundo.'}</p><div class="row"><button class="btn primary" id="r">${free ? 'SUBUKAN ULIT (+60s)' : 'MAGKAPE (+60s, −1☕)'}</button></div></div></div>`);
      s.appendChild(o);
      tap($('#r', o), () => { if (!free) { run.kape--; refreshKape(); } run.timeLeft = 60; drawClock(); o.remove(); paused = false; });
    }
    function complete() {
      done = true; run.sceneDone = true; SFX.win();
      if (run.hints === 0) award('walanghint');
      if (run.misses === 0) award('walangmali');
      if (run.timeLeft >= 60 && run.timeouts === 0) award('mabilis');
      say('Kumpleto na ang ebidensya, Inspector! Tingnan natin ang talaan ng oras.');
      later(() => {
        const o = el(`<div class="overlay"><div class="card"><div class="stamp green">KUMPLETO!</div><p>Nakalap ang lahat ng ${n} ebidensya.<br>Natitirang oras: ${Math.floor(run.timeLeft / 60)}:${String(run.timeLeft % 60).padStart(2, '0')}</p><button class="btn primary" id="go">SURIIN ANG TALAAN ▶</button></div></div>`);
        s.appendChild(o); SFX.stamp();
        tap($('#go', o), () => files(c));
      }, 900);
    }
    if (run.sceneDone) { done = true; }
    if (!save.tut.inv && !run.sceneDone) {
      paused = true;
      later(() => coach('inv', [
        { sel: '#pA', text: 'Ito ang kuha ng CCTV BAGO ang krimen.' },
        { sel: '#pB', text: 'Ito ang eksena NGAYON. I-tap ang anumang nagbago — sa alinmang larawan.' },
        { sel: '#zoom', text: 'Maliit ba? Pindutin ang ZOOM, o i-pinch / i-scroll ang larawan. I-drag para gumalaw.' },
        { sel: '#hint', text: 'Naiipit? Ang SURIIN ay nagtuturo ng isang ebidensya — kapalit ng 1 tasa ng kape.' },
        { sel: '#clock', text: 'Bawat maling tap ay −5 segundo. Bilis, Inspector!' }
      ], () => { paused = false; }), 300);
    }
  }

  /* ---------------- PHASE 4: FILES ---------------- */
  function files(c) {
    SFX.music('noir');
    const s = show(`<div class="screen files woodbg">
      ${topbar(c, 'Yugto 4 · Talaan at Oras ng Pangyayari', kapeHTML(run.kape))}
      <div class="folder" style="left:26px;top:84px;width:560px;height:560px"><span class="tabname">EBIDENSYA</span><div class="clip"></div>
        <div class="sheet"><h2>EBIDENSYA</h2><div class="sub">Listahan ng nakalap na ebidensya · i-tap ang (i)</div><div class="caseno">KASO BLG.<b>${c.num}</b></div>
          <div class="ev-list" id="evl"></div>
          <div class="ev-detail" id="evd">Pumili ng ebidensya para makita ang detalye.</div>
        </div></div>
      <div class="folder" style="left:612px;top:84px;width:642px;height:560px"><span class="tabname">TIMELINE</span><div class="clip"></div>
        <div class="sheet"><h2>TIMELINE</h2><div class="sub">Oras-oras na talaan · Suriin ang bawat alibi</div><div class="caseno">KASO BLG.<b>${c.num}</b></div>
          <div class="tl-win">⏱ Tantiyang oras ng krimen: ${esc(c.victim.windowText)}</div>
          <div class="tl" id="tl"></div>
        </div></div>
      <div class="progress-note" id="pn"></div>
      <button class="btn primary proceed" id="go" disabled>INTEROGASYON ▶</button>
    </div>`);
    bindBack(s);
    let selected = null;
    function renderEv() {
      const items = evItems(c, run);
      $('#evl', s).innerHTML = items.map((it) => `<div class="ev-row ${it.meta ? 'meta' : ''} ${selected === it.id ? 'sel' : ''}" data-id="${it.id}"><div class="ti">${it.thumb}</div><div class="nm">${esc(it.name)}<small>${it.meta ? '★ PALATANDAAN NI ANG ANINO' : esc(it.kind)}</small></div>${it.isNew ? '<span class="new">BAGO</span>' : ''}<span class="i">i</span></div>`).join('');
      $$('.ev-row', s).forEach((r) => tap(r, () => {
        selected = r.dataset.id; SFX.tap();
        const it = items.find((x) => x.id === selected);
        if (c.records[selected]) run.seenRec.add(selected);
        $('#evd', s).innerHTML = `<b>${esc(it.name)}</b>${esc(it.info)}`;
        renderEv();
      }));
    }
    const inWin = (t) => t >= c.win[0] && t <= c.win[1];
    function renderTL() {
      $('#tl', s).innerHTML = c.timeline.map((e) => {
        const sus = e.who !== 'victim' ? suspectOf(c, e.who) : null;
        const face = sus ? charSVG(sus.id, 'neutral') : charSVG(c.victim.look, 'neutral');
        let chk = '';
        if (e.alibi) {
          if (run.checked.has(e.who)) chk = `<div class="verdict ${sus.check.ok ? 'ok' : 'no'}">${esc(sus.check.text)}</div>`;
          else chk = `<div class="chk"><button class="btn small gold" data-chk="${e.who}">SURIIN ANG ALIBI</button></div>`;
        }
        return `<div class="tl-row ${inWin(e.t) ? 'inwin' : ''}"><div class="tm">${e.t}</div><div class="who ${sus ? '' : 'victim'}">${face}</div><div class="tx"><span class="nm">${sus ? esc(sus.name) + ' · ' + esc(sus.role) : esc(c.victim.name)}</span>${esc(e.text)}${chk}</div></div>`;
      }).join('');
      $$('[data-chk]', s).forEach((b) => tap(b, () => {
        const id = b.dataset.chk; run.checked.add(id);
        const sus = suspectOf(c, id);
        (sus.check.unlock || []).forEach((u) => run.unlocked.add(u));
        if (sus.check.ok) SFX.stamp(); else SFX.bad();
        const sc = $('#tl', s).scrollTop; renderTL(); $('#tl', s).scrollTop = sc; renderEv(); progress();
      }));
    }
    function progress() {
      const total = c.suspects.length, got = run.checked.size;
      $('#pn', s).textContent = got < total ? `Nasuri ang alibi: ${got}/${total}. Suriin ang lahat bago mag-interogasyon.` : 'Nasuri na ang lahat ng alibi. Oras na para harapin ang mga suspek.';
      $('#go', s).disabled = got < total;
    }
    renderEv(); renderTL(); progress();
    tap($('#go', s), () => { SFX.stamp(); interrogate(c); });
    later(() => coach('files', [
      { sel: '#tl', text: 'Pindutin ang SURIIN ANG ALIBI ng bawat suspek. Lalabas kung totoo o hindi ang sinasabi nila — at may mga bagong rekord.' },
      { sel: '#evl', text: 'Nandito ang lahat ng ebidensya at rekord. I-tap ang bawat isa para basahin ang detalye.' }
    ]), 300);
  }

  /* ---------------- PHASE 5: INTERROGATION ---------------- */
  function interrogate(c) {
    SFX.music('room');
    const s = show(`<div class="screen room">
      <div class="bricks"></div>
      <div class="glow"></div>
      ${topbar(c, 'Yugto 5 · Interogasyon at Akusasyon', `<button class="btn small dark" id="files">↩ TALAAN</button>${kapeHTML(run.kape)}`)}
      <div class="hotseat"><div class="chair"></div><div class="sus" id="sus"></div><div class="table"></div><div class="empty" id="empty">Pumili ng suspek sa kanan.</div></div>
      <div class="lamp"><div class="cord"></div><div class="shade"></div><div class="bulb"></div></div>
      <div class="speech" id="speech" hidden></div>
      <div class="pahayag" id="pahayag" hidden><div class="ph-h">MGA PAHAYAG <span>pumili ng pahayag + ebidensya, saka TUTOL!</span></div><div class="ph-row"><div class="ph-list" id="phl"></div><button class="btn tutol" id="tutol">TUTOL!</button></div></div>
      <div class="accuse">
        <h3>AKUSASYON</h3><div class="sub">* I-drag o i-tap ang ebidensya papunta sa slot.</div>
        <div class="slot" data-slot="1" style="margin-top:8px"><span class="lab">1 · SANDATA / PARAAN</span><div class="ph">Ano ang ginamit, o ano ang nagpapatunay na naroon siya?</div></div>
        <div class="slot" data-slot="2" style="margin-top:6px"><span class="lab">2 · MOTIBO / PATUNAY NG KASINUNGALINGAN</span><div class="ph">Bakit niya ginawa, o ano ang sumisira sa alibi niya?</div></div>
        <button class="btn arrest" id="arrest" style="margin-top:auto">HULIHIN!</button>
      </div>
      <div class="suspects"><h3>SUSPEK</h3><div class="sub">* Kausapin, saka piliin ang salarin.</div>
        <div class="sgrid">${c.suspects.map((p) => `<button class="scard" data-s="${p.id}">${charSVG(p.id, 'neutral')}<span class="nm">${esc(p.name)}</span></button>`).join('')}</div>
      </div>
      <div class="evtray"><div class="th">EBIDENSYA <span>Hilahin pataas papunta sa slot · o i-tap ang card, saka ang slot / TUTOL!</span></div><div class="evscroll" id="evs"></div></div>
    </div>`);
    bindBack(s);
    tap($('#files', s), () => files(c));
    let items = evItems(c, run);
    let picked = null, stmt = null;
    const refreshKape = () => { const k = $('.kape', s); k.outerHTML = kapeHTML(run.kape); };

    function renderCards() {
      $('#evs', s).innerHTML = items.map((it) => `<div class="ev-card ${it.meta ? 'meta' : ''} ${picked === it.id ? 'picked' : ''} ${(run.slot1 === it.id || run.slot2 === it.id) ? 'used' : ''}" data-id="${it.id}"><div class="ti">${it.thumb}</div><div class="nm">${esc(it.name)}</div><button class="i" data-i="${it.id}" aria-label="Detalye">i</button></div>`).join('');
    }
    function renderSlots() {
      [1, 2].forEach((k) => {
        const slot = $(`.slot[data-slot="${k}"]`, s), id = run['slot' + k];
        const lab = slot.querySelector('.lab').outerHTML;
        slot.classList.toggle('filled', !!id); slot.classList.remove('bad');
        if (id) { const it = items.find((x) => x.id === id); slot.innerHTML = `${lab}<div class="ti">${it.thumb}</div><div class="nm">${esc(it.name)}<br><small style="color:var(--sepia)">(i-tap para alisin)</small></div>`; }
        else slot.innerHTML = `${lab}<div class="ph">${k === 1 ? 'Ano ang ginamit, o ano ang nagpapatunay na naroon siya?' : 'Bakit niya ginawa, o ano ang sumisira sa alibi niya?'}</div>`;
        slot.classList.toggle('ready', !!picked && !id);
      });
      $('#tutol', s).classList.toggle('ready', !!picked && stmt !== null);
    }
    function place(k, id) {
      if (run['slot' + (3 - k)] === id) run['slot' + (3 - k)] = null;
      run['slot' + k] = id; picked = null; SFX.stamp(); renderCards(); renderSlots();
    }
    function speak(who, txt) { const sp = $('#speech', s); sp.hidden = false; sp.innerHTML = `<span class="who">${esc(who)}</span>${esc(txt)}`; sp.style.animation = 'none'; void sp.offsetWidth; sp.style.animation = 'pop .25s'; }
    function face(id, expr) { $('#sus', s).innerHTML = charSVG(id, expr || 'neutral'); }
    function renderStatements() {
      const p = suspectOf(c, run.suspect), box = $('#pahayag', s);
      if (!p) { box.hidden = true; return; }
      box.hidden = false;
      const st = p.statements || [];
      $('#phl', s).innerHTML = st.length ? st.map((x, i) => { const key = p.id + ':' + i, br = run.broken.has(key); return `<button class="stmt ${stmt === i ? 'sel' : ''} ${br ? 'broken' : ''}" data-st="${i}">“${esc(x.t)}”${br ? '<span class="basag">BASAG!</span>' : ''}</button>`; }).join('') : '<div class="stmt none">Walang pahayag.</div>';
      $$('.stmt[data-st]', s).forEach((b) => tap(b, () => { SFX.tap(); stmt = +b.dataset.st; renderStatements(); renderSlots(); speak(p.name, st[stmt].t); }));
    }
    function selectSuspect(id, expr) {
      if (run.suspect !== id) stmt = null;
      run.suspect = id;
      $$('.scard', s).forEach((b) => b.classList.toggle('sel', b.dataset.s === id));
      face(id, expr); $('#empty', s).hidden = true;
      renderStatements();
    }
    renderCards(); renderSlots();
    if (run.suspect) selectSuspect(run.suspect);

    $$('.scard', s).forEach((b) => tap(b, () => { SFX.tap(); const p = suspectOf(c, b.dataset.s); selectSuspect(p.id); speak(p.name, p.greet); }));
    $$('.slot', s).forEach((sl) => tap(sl, () => {
      const k = +sl.dataset.slot;
      if (picked) place(k, picked);
      else if (run['slot' + k]) { run['slot' + k] = null; SFX.click(); renderCards(); renderSlots(); }
    }));

    function outOfKape() {
      if (run.kape > 0) return;
      later(() => {
        const o = el(`<div class="overlay"><div class="card"><h2>PAGOD NA SI MATEO...</h2><p>Ubos na ang kape. Magtimpla ng panibagong barako at suriin ulit ang ebidensya.</p><button class="btn primary" id="r">MAGTIMPLA (+3☕)</button></div></div>`);
        s.appendChild(o);
        tap($('#r', o), () => { run.kape = 3; o.remove(); refreshKape(); });
      }, 1600);
    }

    /* TUTOL! */
    tap($('#tutol', s), () => {
      const p = suspectOf(c, run.suspect);
      if (!p) { SFX.bad(); toast('Pumili muna ng suspek.'); return; }
      if (stmt === null) { SFX.bad(); toast('Pumili muna ng pahayag na kokontrahin.'); return; }
      if (!picked) { SFX.bad(); toast('Pumili ng ebidensya sa ibaba, saka pindutin ang TUTOL!'); return; }
      const st = p.statements[stmt], key = p.id + ':' + stmt;
      const burst = el('<div class="tutol-burst">TUTOL!</div>'); s.appendChild(burst); setTimeout(() => burst.remove(), 1000);
      SFX.objection();
      if (run.broken.has(key)) { speak(p.name, st.lie.say); picked = null; renderCards(); renderSlots(); return; }
      if (st.lie && st.lie.ev.includes(picked)) {
        run.broken.add(key); face(p.id, 'shock'); speak(p.name, st.lie.say);
        $('.hotseat', s).classList.remove('shake'); void $('.hotseat', s).offsetWidth; $('.hotseat', s).classList.add('shake');
        award('tutol');
        if (p.id === c.solution.culprit && p.statements.every((x, i) => !x.lie || run.broken.has(p.id + ':' + i))) award('walanglusot');
        (st.lie.unlock || []).forEach((u) => run.unlocked.add(u));
        picked = null; items = evItems(c, run); renderCards(); renderStatements(); renderSlots();
        later(() => face(p.id, 'nervous'), 1400);
      } else {
        run.badTutol++; run.kape = Math.max(0, run.kape - 1); refreshKape(); SFX.bad();
        face(p.id, 'smug'); speak(p.name, st.lie ? 'Ano\'ng kinalaman niyan sa sinabi ko? Wala, Inspector.' : 'Totoo ang sinabi ko. Wala kang makikitang butas diyan.');
        picked = null; renderCards(); renderSlots();
        outOfKape();
      }
    });

    // drag + tap on evidence cards
    const evs = $('#evs', s);
    let drag = null;
    evs.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.i')) return;
      const card = e.target.closest('.ev-card'); if (!card) return;
      SFX.init();
      drag = { id: card.dataset.id, x0: e.clientX, y0: e.clientY, card, ghost: null, pid: e.pointerId };
      try { card.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    });
    evs.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.pid) return;
      const d = Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0);
      if (!drag.ghost && d > 10) {
        drag.ghost = drag.card.cloneNode(true); drag.ghost.classList.add('ghost'); drag.ghost.classList.remove('picked', 'used');
        s.appendChild(drag.ghost); picked = drag.id; renderSlots();
      }
      if (drag.ghost) {
        const p = toStage(e); drag.ghost.style.left = (p.x - 59) + 'px'; drag.ghost.style.top = (p.y - 70) + 'px';
        drag.ghost.style.display = 'none';
        const under = document.elementFromPoint(e.clientX, e.clientY);
        drag.ghost.style.display = '';
        $$('.slot', s).forEach((sl) => sl.classList.toggle('over', !!under && sl.contains(under)));
      }
    });
    function endDrag(e, cancelled) {
      if (!drag || e.pointerId !== drag.pid) return;
      const dd = drag; drag = null;
      $$('.slot', s).forEach((sl) => sl.classList.remove('over'));
      if (dd.ghost) {
        dd.ghost.remove();
        if (!cancelled) {
          const under = document.elementFromPoint(e.clientX, e.clientY);
          const sl = under && under.closest && under.closest('.slot');
          if (sl && s.contains(sl)) { place(+sl.dataset.slot, dd.id); return; }
          const tb = under && under.closest && under.closest('#tutol');
          if (tb) { picked = dd.id; renderCards(); renderSlots(); $('#tutol', s).click(); return; }
        }
        picked = null; renderCards(); renderSlots();
      } else if (!cancelled) {
        picked = picked === dd.id ? null : dd.id; SFX.tap(); renderCards(); renderSlots();
      }
    }
    evs.addEventListener('pointerup', (e) => endDrag(e, false));
    evs.addEventListener('pointercancel', (e) => endDrag(e, true));
    evs.addEventListener('click', (e) => {
      const ib = e.target.closest('.i'); if (!ib) return;
      e.stopPropagation(); SFX.tap();
      const it = items.find((x) => x.id === ib.dataset.i);
      $$('.tip', s).forEach((t) => t.remove());
      const p = toStage(e);
      const tip = el(`<div class="tip" style="left:${Math.min(940, Math.max(10, p.x - 160))}px;top:${p.y - 190}px"><b>${esc(it.name)}</b>${esc(it.info)}</div>`);
      s.appendChild(tip); setTimeout(() => tip.remove(), 4200);
      tip.addEventListener('click', () => tip.remove());
    });

    tap($('#arrest', s), () => {
      if (!run.suspect) { SFX.bad(); speak('PO2 Jessa', 'Inspector, sino ang aakusahan natin? Pumili muna ng suspek.'); return; }
      if (!run.slot1 || !run.slot2) { SFX.bad(); speak('PO2 Jessa', 'Kulang pa, Inspector! Kailangan ng dalawang ebidensya sa mga slot.'); [1, 2].forEach((k) => { if (!run['slot' + k]) $(`.slot[data-slot="${k}"]`, s).classList.add('bad'); }); return; }
      const sol = c.solution, p = suspectOf(c, run.suspect);
      const ok1 = sol.slot1.includes(run.slot1), ok2 = sol.slot2.includes(run.slot2);
      if (run.suspect === sol.culprit && ok1 && ok2) { SFX.slam(); arrest(c); return; }
      run.wrong++; run.kape = Math.max(0, run.kape - 1); SFX.bad(); refreshKape();
      $('.hotseat', s).classList.remove('shake'); void $('.hotseat', s).offsetWidth; $('.hotseat', s).classList.add('shake');
      if (run.suspect !== sol.culprit) { face(p.id, 'angry'); speak(p.name, p.deny || 'Hindi ako \'yan!'); }
      else {
        face(p.id, 'smug'); speak(p.name, p.weak);
        later(() => {
          const weak = []; if (!ok1) weak.push(1); if (!ok2) weak.push(2);
          weak.forEach((k) => $(`.slot[data-slot="${k}"]`, s).classList.add('bad'));
          toast(`Jessa: "Tama ang kutob mo, Inspector — pero mahina ang ebidensya sa slot ${weak.join(' at ')}."`);
        }, 900);
      }
      outOfKape();
    });

    later(() => coach('room', [
      { sel: '.suspects', text: 'Pumili ng suspek para kausapin siya.' },
      { sel: '.evtray', text: 'Ito ang lahat ng ebidensya mo. I-tap ang isang card para piliin ito.' },
      { sel: '.hotseat', text: 'Kapag may napili kang suspek, lalabas ang mga PAHAYAG niya. Pumili ng pahayag, pumili ng ebidensyang kumokontra, at pindutin ang TUTOL! (−1 kape kapag mali.)' },
      { sel: '.accuse', text: 'Kapag sigurado ka na: ilagay ang dalawang ebidensya rito, at pindutin ang HULIHIN!' }
    ]), 300);
  }

  /* ---------------- ARREST + RESULT ---------------- */
  function arrest(c) {
    const cid = c.solution.culprit, cul = suspectOf(c, cid);
    const panels = [
      { bg: 'interrog', chars: [{ c: 'mateo', x: 130, y: 50, s: 7.4, e: 'shout', pose: 'point' }, { c: cid, x: 400, y: 70, s: 7, e: 'shock', flip: true }], beats: [
        { sfx: 'BLAG!', x: 4, y: 64, rot: -12, size: 60, color: '#ffd34a' },
        { b: 'IKAW ANG MAY SALA! Arestado ka!', who: 'Mateo', x: 3, y: 4, w: 46, tail: 'l' }] },
      { bg: 'interrog', chars: [{ c: cid, x: 260, y: 56, s: 7.6, e: 'sad' }], beats: c.confess.map((t, i) => ({ b: t, who: cul.name, x: i ? 50 : 2, y: i ? 46 : 4, w: 48, tail: i ? 'l' : 'r' })) }
    ];
    komiks(panels, () => result(c));
  }

  function result(c) {
    SFX.music('win');
    let stars = 3;
    if (run.hints > 1) stars--;
    if (run.timeouts > 0) stars--;
    if (run.wrong > 0) stars--;
    stars = Math.max(1, stars);
    const first = !save.solved[c.id];
    const lieBonus = run.broken.size * 10;
    const earn = (first ? 50 + stars * 50 : 25 * stars) + lieBonus;
    save.solved[c.id] = Math.max(save.solved[c.id] || 0, stars);
    save.pesos += earn;
    const metaClue = c.clues.find((cl) => cl.id === c.metaId);
    const newMeta = !save.metas.includes(c.metaId);
    if (newMeta) save.metas.push(c.metaId);
    persist();
    const secs = Math.round((Date.now() - run.started) / 1000);
    const s = show(`<div class="screen result woodbg">
      <div class="card">
        <div class="l">
          <div class="stamp" style="align-self:flex-start;margin:6px 0 4px 10px">LUTAS NA!</div>
          <h2 style="margin:0;font-family:var(--f-display);font-weight:400;font-size:34px">KASO #${c.num} · ${esc(c.title)}</h2>
          <div class="stars">${'★'.repeat(stars)}<span class="off">${'★'.repeat(3 - stars)}</span></div>
          <div class="stats">
            <span>Salarin</span><b>${esc(suspectOf(c, c.solution.culprit).name)}</b>
            <span>Kabuuang oras</span><b>${Math.floor(secs / 60)}m ${secs % 60}s</b>
            <span>Maling tap</span><b>${run.misses}</b>
            <span>Ginamit na Suriin</span><b>${run.hints}</b>
            <span>Nabasag na kasinungalingan</span><b>${run.broken.size} (+₱${lieBonus})</b>
            <span>Maling akusasyon</span><b>${run.wrong}</b>
            <span>Gantimpala</span><b style="color:var(--blood)">+₱${earn}${first ? '' : ' (replay)'}</b>
          </div>
          <p style="font-family:var(--f-type);font-size:14px;color:var(--sepia);margin:0">3★: hindi hihigit sa 1 Suriin, walang ubos-oras, walang maling akusasyon.</p>
          <div style="display:flex;gap:12px;margin-top:auto"><button class="btn primary" id="go">BUMALIK SA OPISINA ▶</button><button class="btn dark" id="again">ULITIN</button></div>
        </div>
        <div class="r">
          <h3>PALATANDAAN NI ANG ANINO</h3>
          <div class="meta-ph">${clueThumb(c, metaClue)}</div>
          <p><b>${esc(metaClue.name)}</b></p>
          <p>${esc(newMeta ? c.metaText : 'Nasa corkboard na ito.')}</p>
        </div>
      </div>
    </div>`);
    SFX.win(); SFX.stamp();
    award('unang');
    if (stars === 3) award('perpekto');
    if (CASES.every((x) => save.solved[x.id] === 3)) award('alamat');
    tap($('#go', s), () => desk());
    tap($('#again', s), () => startCase(c));
  }

  /* ---------------- CORKBOARD ---------------- */
  function corkboard(chN) {
    SFX.rain(false); SFX.music('noir');
    const avail = CHAPTERS.filter((ch) => ch.n === 1 || save.chapterDone[ch.n - 1]);
    const ch = CHAPTERS.find((x) => x.n === (chN || avail[avail.length - 1].n));
    const got = (id) => save.metas.includes(id);
    const metas = METAS.filter((m) => m.chapter === ch.n);
    const all = metas.every((m) => got(m.id));
    const done = !!save.chapterDone[ch.n];
    const pos = [[110, 150, -5], [880, 130, 4], [520, 400, -2]];
    const center = [520, 110];
    let cards = '';
    metas.forEach((m, i) => {
      const c = caseById(m.caseId), cl = c.clues.find((x) => x.id === m.id), [x, y, r] = pos[i];
      cards += got(m.id)
        ? `<div class="pin-card" style="left:${x}px;top:${y}px;width:260px;height:250px;transform:rotate(${r}deg)"><div class="ph">${ART.sceneThumb(c.scene, cl.x, cl.y, Math.max(60, cl.r * 2.8), false)}</div><div class="cp">${esc(m.name)}</div></div>`
        : `<div class="pin-card unk" style="left:${x}px;top:${y}px;width:260px;height:250px;transform:rotate(${r}deg)"><div class="ph">?</div><div class="cp">${m.from} — hindi pa lutas</div></div>`;
    });
    const centerCard = `<div class="pin-card" style="left:${center[0]}px;top:${center[1]}px;width:240px;height:260px;transform:rotate(2deg)"><div class="ph" style="background:#cdbf9c">${charSVG('tatay', 'neutral')}</div><div class="cp">SPO4 Ernesto Reyes</div></div>`;
    const sideCard = ch.n === 2
      ? `<div class="pin-card" style="left:930px;top:420px;width:220px;height:230px;transform:rotate(-4deg)"><div class="ph" style="background:${done ? '#cdbf9c' : '#111'}">${done ? charSVG('dizon', 'smug') : charSVG('anino')}</div><div class="cp">${done ? 'KAPT. RODEL DIZON' : 'ANG KASABWAT?'}</div></div>`
      : `<div class="pin-card" style="left:930px;top:420px;width:220px;height:230px;transform:rotate(-4deg)"><div class="ph" style="background:#111">${charSVG('anino')}</div><div class="cp">ANG ANINO</div></div>`;
    const yarnPts = [[240, 275], [1010, 255], [650, 525]];
    let yarn = '<svg style="position:absolute;inset:0;width:1280px;height:720px;pointer-events:none;z-index:1" viewBox="0 0 1280 720">';
    metas.forEach((m, i) => { if (got(m.id)) yarn += `<path d="M${yarnPts[i][0]},${yarnPts[i][1]} Q${(yarnPts[i][0] + 640) / 2},${(yarnPts[i][1] + 240) / 2 + 40} 640,240" stroke="#c0262e" stroke-width="4" fill="none"/>`; });
    if (done) yarn += `<path d="M640,240 Q900,300 1040,535" stroke="#c0262e" stroke-width="5" fill="none" stroke-dasharray="10 6"/>`;
    yarn += '</svg>';
    const tabs = avail.length > 1 ? `<div class="cork-tabs">${avail.map((a) => `<button class="btn small ${a.n === ch.n ? 'gold' : 'dark'}" data-ch="${a.n}">KABANATA ${a.n}</button>`).join('')}</div>` : '';
    const s = show(`<div class="screen corkbg">
      <div class="topbar"><button class="back" id="tb-back"><span>↩</span>OPISINA</button><div class="title-txt">CORKBOARD · ${esc(ch.title.toUpperCase())}<small>${metas.filter((m) => got(m.id)).length}/3 palatandaan</small></div>${tabs}</div>
      <div class="corkframe"></div>
      ${yarn}
      <div style="position:absolute;inset:0;z-index:2">${centerCard}${cards}${sideCard}
        ${done ? `<div class="cork-note" style="left:60px;top:500px;width:330px;transform:rotate(-3deg)">${esc(ch.note)}<br><b>— ITUTULOY</b></div>` : ''}
        ${!all ? '<div class="cork-note" style="left:40px;top:470px;width:300px;transform:rotate(-3deg)">Lutasin ang mga kaso para makakuha ng palatandaan ni Ang Anino.</div>' : ''}
      </div>
      ${all && !done ? `<div class="cork-q" style="z-index:5"><h3>${esc(ch.question)}</h3><div class="opts">${ch.options.map((o, i) => `<button class="btn small" data-a="${i}">${esc(o)}</button>`).join('')}</div></div>` : ''}
    </div>`);
    tap($('#tb-back', s), () => desk());
    $$('[data-ch]', s).forEach((b) => tap(b, () => { SFX.flip(); corkboard(+b.dataset.ch); }));
    $$('[data-a]', s).forEach((b) => tap(b, () => {
      if (+b.dataset.a === ch.answer) {
        SFX.win();
        komiks(ch.finale, () => { save.chapterDone[ch.n] = true; save.pesos += ch.reward; persist(); award('kab' + ch.n); corkboard(ch.n); });
      } else { SFX.bad(); b.disabled = true; toast(ch.wrong); }
    }));
  }

  /* ---------------- BOOT ---------------- */
  window.KASO_DEBUG = { get run() { return run; }, get save() { return save; }, startCase, desk, investigate, files, interrogate, corkboard, result, outline, award };
  title();
})();
