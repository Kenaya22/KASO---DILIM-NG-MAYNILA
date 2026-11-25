/* =========================================================
   KASO: DILIM NG MAYNILA — GAME ENGINE
   ========================================================= */
(function () {
  'use strict';
  const { CHARS, CASES, PROLOGUE, METAS, SHOP, CHAPTERS, BOSS, ENDING, CREDITS } = window.KASO;
  const ART = window.ART, SFX = window.SFX;
  const stage = document.getElementById('stage');
  const EN = window.KASO_LANG === 'en';
  const L = (tl, en) => (EN ? en : tl);
  function setLang(l) { try { localStorage.setItem('kaso-lang', l); } catch (e) { /* ignore */ } location.reload(); }
  let SCALE = 1;
  const LAYOUT = { on: false, sel: 0 };
  let cleanup = [];

  /* ---------------- SAVE ---------------- */
  const KEY = 'kaso-dilim-save-v1';
  const DEF = () => ({ pesos: 0, solved: {}, metas: [], owned: [], seenPrologue: false, sound: true, chapterDone: {}, tut: {}, medals: [], thermos: 0, musicVol: 0.5, sfxVol: 0.8, run: null, bossWon: false });
  let save = DEF();
  try { const raw = localStorage.getItem(KEY); if (raw) save = Object.assign(DEF(), JSON.parse(raw)); } catch (e) { /* no storage */ }
  if (save.finale) { save.chapterDone[1] = true; delete save.finale; }
  function persist() { save.savedAt = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { /* ignore */ } }

  /* ---------------- DEVELOPER MODE STATE ---------------- */
  const DEVKEY = 'kaso-dilim-dev-v1';
  let DEV = { on: false, infTime: false, infKape: false, answers: false, unlockAll: false };
  try { const d = localStorage.getItem(DEVKEY); if (d) DEV = Object.assign(DEV, JSON.parse(d)); } catch (e) { /* ignore */ }
  function persistDev() { try { localStorage.setItem(DEVKEY, JSON.stringify(DEV)); } catch (e) { /* ignore */ } }
  const passHash = (t) => [...t].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 2166136261);
  const DEV_HASH = 4021718528;
  SFX.setEnabled(save.sound); SFX.setMusicVol(save.musicVol); SFX.setSfxVol(save.sfxVol);

  /* ---------------- MEDALS ---------------- */
  const MEDALS = [
    { id: 'unang', name: L('Unang Kaso', 'First Case'), desc: L('Lutasin ang unang kaso.', 'Solve your first case.') },
    { id: 'perpekto', name: L('Perpektong Imbestigasyon', 'Perfect Investigation'), desc: L('Makakuha ng 3★ sa isang kaso.', 'Earn 3★ on a case.') },
    { id: 'walanghint', name: L('Matang Lawin', 'Hawk Eye'), desc: L('Kumpletuhin ang eksena nang walang Suriin.', 'Clear a scene without using Inspect.') },
    { id: 'walangmali', name: L('Siguradong Tap', 'Sure Shot'), desc: L('Kumpletuhin ang eksena nang walang maling tap.', 'Clear a scene without a wrong tap.') },
    { id: 'mabilis', name: L('Kidlat', 'Lightning'), desc: L('Kumpletuhin ang eksena na may 60+ segundong natitira.', 'Clear a scene with 60+ seconds left.') },
    { id: 'tutol', name: L('TUTOL!', 'OBJECTION!'), desc: L('Basagin ang unang kasinungalingan sa interogasyon.', 'Break your first lie in an interrogation.') },
    { id: 'walanglusot', name: L('Walang Lusot', 'No Way Out'), desc: L('Basagin ang lahat ng kasinungalingan ng salarin sa isang kaso.', "Break every one of the culprit's lies in a case.") },
    { id: 'kab1', name: L('Kabanata 1', 'Chapter 1'), desc: L('Tapusin ang Kabanata 1.', 'Finish Chapter 1.') },
    { id: 'kab2', name: L('Kabanata 2', 'Chapter 2'), desc: L('Tapusin ang Kabanata 2.', 'Finish Chapter 2.') },
    { id: 'kab3', name: L('Kabanata 3', 'Chapter 3'), desc: L('Tapusin ang Kabanata 3 at mahuli si Ang Anino.', 'Finish Chapter 3 and catch Ang Anino.') },
    { id: 'anino', name: L('Huli Ka, Anino!', 'Gotcha, Anino!'), desc: L('Manalo sa Huling Interogasyon nang walang maling TUTOL.', 'Win the Final Interrogation without a wrong OBJECTION.') },
    { id: 'kolektor', name: L('Kolektor', 'Collector'), desc: L('Bilhin ang lahat ng gamit sa mesa.', 'Buy every desk item.') },
    { id: 'alamat', name: L('Alamat ng Maynila', 'Legend of Manila'), desc: L('Makakuha ng 3★ sa lahat ng kaso.', 'Earn 3★ on every case.') }
  ];
  function award(id) {
    if (save.medals.includes(id)) return;
    save.medals.push(id); persist();
    const m = MEDALS.find((x) => x.id === id);
    SFX.medal();
    const t = el(`<div class="medal-toast"><span class="mt-ico">${MEDAL_SVG}</span><span><small>${L('BAGONG MEDALYA', 'NEW MEDAL')}</small><b>${esc(m.name)}</b></span></div>`);
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
    c.clues.forEach((cl) => { if (run.found.has(cl.id)) items.push({ id: cl.id, name: cl.name, info: cl.info, meta: !!cl.meta, thumb: clueThumb(c, cl), kind: L('Ebidensya sa eksena', 'Scene evidence') }); });
    Object.keys(c.records).forEach((rid) => { if (run.unlocked.has(rid)) { const r = c.records[rid]; items.push({ id: rid, name: r.name, info: r.info, thumb: ART.docIcon(r.icon), kind: L('Rekord', 'Record'), isNew: !run.seenRec.has(rid) }); } });
    return items;
  }
  function kapeHTML(n) { let s = ''; const max = Math.max(5, n); for (let i = 0; i < max; i++) s += KAPE_SVG(i >= n); return `<div class="kape" title="${L('Kape (enerhiya)', 'Coffee (energy)')}">${s}</div>`; }
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
    const o = el(`<div class="coach"><div class="coach-hole"></div><div class="coach-box"><span class="who">${L('PO2 JESSA · GABAY', 'PO2 JESSA · GUIDE')}</span><p></p><button class="btn small primary">${L('SIGE ▶', 'NEXT ▶')}</button><button class="coach-skip">${L('Laktawan ang tutorial', 'Skip the tutorial')}</button></div></div>`);
    stage.appendChild(o);
    const hole = $('.coach-hole', o), box = $('.coach-box', o), p = $('p', box);
    function render() {
      const st = steps[i], target = st.sel ? $(st.sel) : null;
      p.textContent = st.text;
      $('.btn', box).textContent = i === steps.length - 1 ? L('SIMULAN ▶', 'START ▶') : L('SIGE ▶', 'NEXT ▶');
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
      <div class="tag">${L('Isang misteryo ng Maynila.<br>Siyam na kaso. Isang anino.', 'A Manila mystery.<br>Nine cases. One shadow.')}</div>
      <div class="menu">
        ${has ? `<button class="btn primary pulse" id="go">${L('ITULOY ▶', 'CONTINUE ▶')}</button><button class="btn dark" id="new">${L('BAGONG LARO', 'NEW GAME')}</button>` : `<button class="btn primary pulse" id="go">${L('SIMULAN ▶', 'START ▶')}</button>`}
        <button class="btn dark" id="load">SAVE / LOAD</button>
        <button class="btn dark" id="fs" title="Fullscreen">⛶</button>
      </div>
      <div class="langsw"><button class="btn small ${EN ? 'dark' : 'gold'}" id="lang-tl">FILIPINO</button><button class="btn small ${EN ? 'gold' : 'dark'}" id="lang-en">ENGLISH</button></div>
      <div class="ver">${L('Kabanata 1–3', 'Chapters 1–3')} · Landscape 16:9</div>
    </div>`);
    tap($('#go', s), () => {
      SFX.rain(true); SFX.music('noir');
      if (!save.seenPrologue) { komiks(PROLOGUE, () => { save.seenPrologue = true; persist(); startCase(CASES[0]); }); return; }
      if (save.run && caseById(save.run.cid)) { resumePrompt(); return; }
      desk();
    });
    tap($('#load', s), () => { SFX.click(); saveMenu(); });
    tap($('#lang-tl', s), () => { if (EN) setLang('tl'); });
    tap($('#lang-en', s), () => { if (!EN) setLang('en'); });
    const nw = $('#new', s);
    if (nw) tap(nw, () => confirmBox(L('Burahin ang lahat ng progreso at magsimula ulit?', 'Erase all progress and start over?'), () => { const keep = { sound: save.sound, musicVol: save.musicVol, sfxVol: save.sfxVol }; save = Object.assign(DEF(), keep); persist(); SFX.rain(true); komiks(PROLOGUE, () => { save.seenPrologue = true; persist(); startCase(CASES[0]); }); }));
    tap($('#fs', s), toggleFullscreen);
  }

  function resumePrompt() {
    const r = save.run, c = caseById(r.cid);
    const ph = { outline: L('Yugto 2 · Buod ng Kaso', 'Phase 2 · Case Outline'), inv: L('Yugto 3 · Paghahanap ng Ebidensya', 'Phase 3 · Evidence Search'), files: L('Yugto 4 · Talaan', 'Phase 4 · Case Files'), room: L('Yugto 5 · Interogasyon', 'Phase 5 · Interrogation') }[r.phase] || L('Simula', 'Start');
    const o = el(`<div class="overlay"><div class="card"><h2>${L('MAY NAKA-SAVE NA KASO', 'YOU HAVE A SAVED CASE')}</h2><p>${L('Kaso', 'Case')} #${c.num} · ${esc(c.title)}<br><b>${esc(ph)}</b></p><div class="row"><button class="btn primary" id="y">${L('ITULOY ANG KASO ▶', 'CONTINUE CASE ▶')}</button><button class="btn dark" id="n">${L('PUMUNTA SA OPISINA', 'GO TO THE OFFICE')}</button></div></div></div>`);
    stage.appendChild(o);
    tap($('#y', o), () => { o.remove(); resumeRun(); });
    tap($('#n', o), () => { o.remove(); desk(); });
  }

  function confirmBox(msg, yes) {
    const o = el(`<div class="overlay"><div class="card"><h2>${L('Sigurado ka?', 'Are you sure?')}</h2><p>${esc(msg)}</p><div class="row"><button class="btn primary" id="y">${L('OO', 'YES')}</button><button class="btn dark" id="n">${L('HINDI', 'NO')}</button></div></div></div>`);
    stage.appendChild(o);
    tap($('#y', o), () => { o.remove(); yes(); });
    tap($('#n', o), () => o.remove());
  }

  /* =========================================================
     DESK (HUB)
     ========================================================= */
  function isUnlocked(c) {
    const i = CASES.indexOf(c);
    if (i === 0 || (DEV.on && DEV.unlockAll)) return true;
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
    if (nc) status = L(`Bagong tawag! Sagutin ang <b>telepono</b> para sa Kaso #${nc.num}.`, `New call! Answer the <b>phone</b> for Case #${nc.num}.`);
    else if (pc) status = L(`Kumpleto ang mga palatandaan ng ${esc(pc.title.split(':')[0])}. Pumunta sa <b>corkboard</b>.`, `All the clues of ${esc(pc.title.split(':')[0])} are in. Go to the <b>corkboard</b>.`);
    else if (lastDone && lastDone.n === CHAPTERS.length) status = L('Nahuli na si Ang Anino. Lutasin ulit ang mga kaso para sa 3★ at mga medalya.', 'Ang Anino has been caught. Replay cases for 3★ and medals.');
    else status = L('Tahimik ang gabi.', 'A quiet night.');
    const s = show(`<div class="screen desk">
      ${ART.desk(save)}
      <div class="rain" style="left:768px;top:42px;width:464px;height:356px;opacity:.8"></div>
      <div class="topbar" style="background:linear-gradient(rgba(20,12,6,.92),rgba(20,12,6,.75))">
        <div class="title-txt">${L('OPISINA NI INSP. MATEO REYES', "INSP. MATEO REYES'S OFFICE")} <small>${esc(CHAPTERS[currentChapter() - 1].title)}</small></div>
        <div class="chip" title="${L('Pera', 'Money')}"><span class="peso">₱</span><span>${save.pesos}</span></div>
        <div class="chip" title="${L('Nalutas na kaso', 'Solved cases')}">📁 ${solvedN}/${CASES.length}</div>
        ${save.run && caseById(save.run.cid) ? '<button class="btn small primary" id="resume">▶ ' + L('ITULOY', 'RESUME') + ' #' + caseById(save.run.cid).num + '</button>' : ''}
        <button class="btn small dark" id="saveb">SAVE</button>
        <button class="btn small gold" id="shop">${L('TINDAHAN', 'SHOP')}</button>
        <button class="btn small dark" id="med">${L('MEDALYA', 'MEDALS')} ${save.medals.length}/${MEDALS.length}</button>
        <button class="iconbtn" id="set" title="Settings" style="width:44px;height:44px;font-size:20px">⚙</button>
        <button class="iconbtn" id="fs" title="Fullscreen" style="width:44px;height:44px;font-size:20px">⛶</button>
        <button class="iconbtn" id="home" title="Title screen" style="width:44px;height:44px;font-size:20px">⏏</button>
      </div>
      <button class="hotspot ${pc ? 'ringing' : ''}" id="hs-cork" style="left:34px;top:64px;width:412px;height:316px" aria-label="Corkboard"><span class="lbl">${L('ANG ANINO · CORKBOARD', 'ANG ANINO · CORKBOARD')}</span></button>
      <button class="hotspot top ${nc ? 'ringing' : ''}" id="hs-phone" style="left:186px;top:500px;width:170px;height:100px" aria-label="${L('Telepono', 'Phone')}"><span class="lbl">${nc ? L('SAGUTIN ANG TAWAG', 'ANSWER THE CALL') : L('TELEPONO', 'PHONE')}</span></button>
      ${nc ? '<div class="ringsfx" style="left:352px;top:478px">KRIIING!</div>' : ''}
      <button class="hotspot" id="hs-type" style="left:500px;top:486px;width:320px;height:160px" aria-label="${L('Mga Kaso', 'Cases')}"><span class="lbl">${L('MGA KASO', 'CASE FILES')}</span></button>
      <button class="hotspot" id="hs-fold" style="left:120px;top:580px;width:270px;height:124px" aria-label="${L('Paano maglaro', 'How to play')}"><span class="lbl">${L('GABAY SA IMBESTIGASYON', 'INVESTIGATION GUIDE')}</span></button>
      <button class="hotspot" id="hs-mug" style="left:1010px;top:500px;width:96px;height:130px" aria-label="${L('Kape', 'Coffee')}"><span class="lbl">${L('KAPE', 'COFFEE')}${save.thermos ? ' +' + save.thermos * 2 : ''}</span></button>
      <div class="status">${status}</div>
    </div>`);
    tap($('#hs-phone', s), () => { if (nc) { SFX.ring(); later(() => startCase(nc), 400); } else { SFX.click(); toast(L('Walang bagong tawag. Tingnan ang mga lumang kaso sa makinilya.', 'No new calls. Check your old cases at the typewriter.')); } });
    tap($('#hs-type', s), () => { SFX.type(); caseList(); });
    tap($('#hs-cork', s), () => { SFX.flip(); corkboard(); });
    tap($('#hs-fold', s), () => { SFX.flip(); howTo(); });
    tap($('#hs-mug', s), () => { SFX.good(); toast(save.thermos ? L(`May ${save.thermos} thermos ka: +${save.thermos * 2} kape sa susunod na kaso.`, `You have ${save.thermos} thermos: +${save.thermos * 2} coffee next case.`) : L('"Barakong Batangas. Mapait — tulad ng katotohanan." — Mateo', '"Batangas barako. Bitter — like the truth." — Mateo')); });
    tap($('#shop', s), () => { SFX.click(); shop(); });
    tap($('#saveb', s), () => { SFX.click(); saveMenu(); });
    if ($('#resume', s)) tap($('#resume', s), () => { SFX.stamp(); resumeRun(); });
    tap($('#med', s), () => { SFX.click(); medals(); });
    tap($('#set', s), () => { SFX.click(); settings(); });
    tap($('#fs', s), toggleFullscreen);
    tap($('#home', s), () => { SFX.rain(false); title(); });
    if (nc) { SFX.ring(); const iv = setInterval(() => SFX.ring(), 3500); cleanup.push(() => clearInterval(iv)); }
  }

  function toast(msg) {
    $$('.toast').forEach((x) => x.remove());
    const t = el(`<div class="toast">${esc(msg)}</div>`);
    stage.appendChild(t); setTimeout(() => t.remove(), 3000);
  }

  function modal(titleTxt, body, cls) {
    const o = el(`<div class="modal-back"><div class="modal ${cls || ''}"><button class="x" aria-label="${L('Isara', 'Close')}">×</button><h2>${titleTxt}</h2><div class="body">${body}</div></div></div>`);
    stage.appendChild(o);
    tap($('.x', o), () => { SFX.click(); o.remove(); });
    o.addEventListener('click', (e) => { if (e.target === o) o.remove(); });
    return o;
  }

  function caseList() {
    let html = '';
    CHAPTERS.forEach((ch) => {
      const cs = CASES.filter((c) => chapterOf(c) === ch.n);
      html += `<h3 class="ch-h">${esc(ch.title)}${save.chapterDone[ch.n] ? ` <span>✔ ${L('TAPOS', 'DONE')}</span>` : ''}</h3><div class="cases">`;
      html += cs.map((c) => {
        const unlocked = isUnlocked(c), st = save.solved[c.id];
        const stars = st ? '★'.repeat(st) + '<span style="opacity:.25">' + '★'.repeat(3 - st) + '</span>' : '';
        return `<div class="casecard ${unlocked ? '' : 'locked'}">
          <div class="num">${L('KASO', 'CASE')} #${c.num}</div>
          <div class="thumb">${unlocked ? `<svg viewBox="0 60 600 300" preserveAspectRatio="xMidYMid slice">${c.scene(false)}</svg>` : ''}</div>
          <div class="nm">${unlocked ? esc(c.title) : '???'}</div>
          <div class="pl">${unlocked ? esc(c.place) : L('Naka-lock — lutasin ang naunang kaso', 'Locked — solve the previous case') + (chapterOf(c) > 1 ? L(' at ang corkboard ng nakaraang kabanata.', " and the last chapter's corkboard.") : '.')}</div>
          <div class="stars">${stars}</div>
          ${unlocked ? `<button class="btn small ${st ? 'dark' : 'primary'}" data-case="${c.id}">${st ? L('ULITIN', 'REPLAY') : L('LARUIN', 'PLAY')}</button>` : ''}
        </div>`;
      }).join('') + '</div>';
    });
    const o = modal(L('MGA KASO', 'CASE FILES'), html);
    $$('[data-case]', o).forEach((b) => tap(b, () => { o.remove(); startCase(caseById(b.dataset.case)); }));
  }

  function shop() {
    const items = SHOP.map((it) => {
      const own = !it.consumable && save.owned.includes(it.id);
      const label = own ? L('NASA MESA NA', 'ON YOUR DESK') : (it.consumable ? `${L('BILHIN', 'BUY')}${save.thermos ? ' (' + save.thermos + ')' : ''}` : L('BILHIN', 'BUY'));
      return `<div class="shopitem"><b>${esc(it.name)}</b><div>${esc(it.desc)}</div><div style="font-family:var(--f-display);font-size:22px;color:var(--blood)">₱${it.price}</div>
        <button class="btn small ${own ? 'dark' : 'gold'}" data-buy="${it.id}" ${own ? 'disabled' : ''}>${label}</button></div>`;
    }).join('');
    const o = modal(`${L('TINDAHAN NI ALING SION', "ALING SION'S SHOP")} <span style="font-size:22px;color:var(--blood)">· ₱${save.pesos}</span>`, `<p style="margin:0 0 12px">${L('Palamutian ang mesa ni Mateo, o mag-ipon ng kape para sa susunod na kaso.', "Decorate Mateo's desk, or stock up on coffee for the next case.")}</p><div class="shopgrid">${items}</div>`);
    $$('[data-buy]', o).forEach((b) => tap(b, () => {
      const it = SHOP.find((x) => x.id === b.dataset.buy);
      if (save.pesos < it.price) { SFX.bad(); toast(L(`Kulang ang pera. Kailangan ng ₱${it.price}.`, `Not enough money. You need ₱${it.price}.`)); return; }
      save.pesos -= it.price;
      if (it.consumable) save.thermos++; else save.owned.push(it.id);
      persist(); SFX.win();
      if (SHOP.filter((x) => !x.consumable).every((x) => save.owned.includes(x.id))) award('kolektor');
      o.remove(); desk(); if (it.consumable) shop();
    }));
  }

  function medals() {
    const list = MEDALS.map((m) => { const got = save.medals.includes(m.id); return `<div class="medal ${got ? 'got' : ''}"><span class="mi">${got ? MEDAL_SVG : '?'}</span><span><b>${esc(m.name)}</b><br>${esc(m.desc)}</span></div>`; }).join('');
    modal(`${L('MGA MEDALYA', 'MEDALS')} <span style="font-size:22px;color:var(--blood)">· ${save.medals.length}/${MEDALS.length}</span>`, `<div class="medals">${list}</div>`);
  }

  function settings() {
    const o = modal('SETTINGS', `<div class="settings">
      <label>${L('Wika', 'Language')}</label><div style="display:flex;gap:8px"><button class="btn small ${EN ? 'dark' : 'gold'}" id="set-tl">FILIPINO</button><button class="btn small ${EN ? 'gold' : 'dark'}" id="set-en">ENGLISH</button></div>
      <label for="set-snd">${L('Tunog', 'Sound')}</label><button class="btn small ${save.sound ? 'gold' : 'dark'}" id="set-snd">${save.sound ? L('BUKAS 🔊', 'ON 🔊') : L('SARADO 🔇', 'OFF 🔇')}</button>
      <label for="set-mus">${L('Musika', 'Music')}</label><input type="range" id="set-mus" min="0" max="1" step="0.05" value="${save.musicVol}">
      <label for="set-sfx">Sound effects</label><input type="range" id="set-sfx" min="0" max="1" step="0.05" value="${save.sfxVol}">
      <label>Tutorial</label><button class="btn small dark" id="set-tut">${L('IPAKITA ULIT', 'SHOW AGAIN')}</button>
      <label>Save / Load</label><button class="btn small gold" id="set-save">${L('BUKSAN', 'OPEN')}</button>
      <label>${L('Progreso', 'Progress')}</label><button class="btn small primary" id="set-reset">${L('BURAHIN LAHAT', 'ERASE ALL')}</button>
      <label>Developer</label><button class="btn small dark" id="set-dev">${DEV.on ? 'DEV PANEL 🛠' : 'DEVELOPER MODE 🔒'}</button>
    </div>`);
    tap($('#set-save', o), () => { o.remove(); saveMenu(); });
    tap($('#set-tl', o), () => { if (EN) setLang('tl'); });
    tap($('#set-en', o), () => { if (!EN) setLang('en'); });
    tap($('#set-dev', o), () => { o.remove(); if (DEV.on) devPanel(); else devLogin(); });
    tap($('#set-snd', o), () => { save.sound = !save.sound; persist(); SFX.setEnabled(save.sound); o.remove(); settings(); });
    $('#set-mus', o).addEventListener('input', (e) => { save.musicVol = +e.target.value; SFX.setMusicVol(save.musicVol); persist(); });
    $('#set-sfx', o).addEventListener('input', (e) => { save.sfxVol = +e.target.value; SFX.setSfxVol(save.sfxVol); persist(); });
    $('#set-sfx', o).addEventListener('change', () => SFX.good());
    tap($('#set-tut', o), () => { save.tut = {}; persist(); toast(L('Lalabas ulit ang tutorial sa susunod na kaso.', 'The tutorial will show again in the next case.')); });
    tap($('#set-reset', o), () => confirmBox(L('Burahin ang lahat ng progreso, pera at medalya?', 'Erase all progress, money and medals?'), () => { save = DEF(); persist(); title(); }));
  }

  function howTo() {
    if (EN) {
      modal('INVESTIGATION GUIDE', `<div class="howto"><ol>
      <li><b>COMIC</b> — Read the story. Tap anywhere to continue.</li>
      <li><b>CASE OUTLINE</b> — Meet the victim and the four suspects. Tap each suspect in the lineup.</li>
      <li><b>FIND THE EVIDENCE</b> — Compare the CCTV still (left) with the scene now (right). Tap what changed. Use <b>ZOOM</b>, pinch or scroll to get closer, and drag to move around. Each wrong tap: −5 seconds. <b>INSPECT</b> points out one clue for 1 coffee.</li>
      <li><b>CASE FILES</b> — Check every suspect's alibi on the timeline. New records will turn up.</li>
      <li><b>INTERROGATION</b> — Talk to the suspects. Pick a <i>statement</i>, pick a piece of evidence, and press <b>OBJECTION!</b> when they lie. Then put two pieces of evidence in <i>Weapon/Method</i> and <i>Motive/Proof</i>, and press <b>ARREST!</b> Each wrong objection or accusation: −1 coffee.</li>
    </ol><p style="margin-top:12px">Every scene hides a <b style="color:var(--blood)">clue left by Ang Anino</b>. Collect all three in each chapter for the corkboard.</p></div>`, 'howto');
      return;
    }
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
      <button class="btn small dark skip">${L('LAKTAWAN ▸▸', 'SKIP ▸▸')}</button>
      <div class="track">${panels.map(panelHTML).join('')}</div>
      <div class="hint">${L('I-tap para magpatuloy ▸', 'Tap to continue ▸')}</div>
    </div>`);
    const track = $('.track', s), pEls = $$('.kpanel', s), dots = $$('.dots i', s);
    let pi = -1, bi = 0, finished = false;
    function beatSound(b) {
      if (!b.sfx) { SFX.tap(); return; }
      const t = b.sfx.toUpperCase();
      if (t.includes('KRII') || t.includes('RIIING')) SFX.ring(); else if (t.includes('KIDLAT') || t.includes('BOOM')) SFX.thunder(); else if (t.includes('WEE')) SFX.siren(); else if (t.includes('BLAG') || t.includes('KRASH')) SFX.slam(); else if (t.includes('KLIK')) SFX.click(); else SFX.flip();
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
  function useKape() { if (DEV.on && DEV.infKape) return; run.kape = Math.max(0, run.kape - 1); }
  function newRun(c) {
    const bonus = save.thermos * 2;
    if (save.thermos) save.thermos = 0;
    run = { c, phase: 'intro', found: new Set(), kape: 5 + bonus, hints: 0, timeouts: 0, wrong: 0, misses: 0, badTutol: 0, broken: new Set(), checked: new Set(), unlocked: new Set(), seenRec: new Set(), timeLeft: c.time, started: Date.now(), suspect: null, slot1: null, slot2: null, sceneDone: false };
    persistRun();
  }
  function startCase(c) { newRun(c); komiks(c.intro, () => outline(c)); }
  const SETS = ['found', 'broken', 'checked', 'unlocked', 'seenRec'];
  function persistRun(phase) {
    if (!run) return;
    if (phase) run.phase = phase;
    const o = { cid: run.c.id, elapsed: Date.now() - run.started };
    Object.keys(run).forEach((k) => { if (k === 'c' || k === 'started') return; o[k] = SETS.includes(k) ? [...run[k]] : run[k]; });
    save.run = o; persist();
  }
  function resumeRun() {
    const r = save.run, c = r && caseById(r.cid);
    if (!c) { desk(); return; }
    run = { c, started: Date.now() - (r.elapsed || 0) };
    Object.keys(r).forEach((k) => { if (k === 'cid' || k === 'elapsed') return; run[k] = SETS.includes(k) ? new Set(r[k]) : r[k]; });
    SFX.rain(false);
    const go = { outline, inv: investigate, files, room: interrogate }[run.phase] || outline;
    go(c);
  }

  function topbar(c, phase, extra) {
    return `<div class="topbar">
      <button class="back" id="tb-back"><span>↩</span>${L('OPISINA', 'OFFICE')}</button>
      <div class="title-txt">${L('KASO', 'CASE')} #${c.num} · ${esc(c.title.toUpperCase())}<small>${esc(phase)}</small></div>
      ${extra || ''}
    </div>`;
  }
  function bindBack(s) { tap($('#tb-back', s), () => { persistRun(); desk(); toast(L('Naka-save ang kaso. Pindutin ang ▶ ITULOY para bumalik.', 'Case saved. Press ▶ RESUME to come back.')); }); }

  /* ---------------- PHASE 2: OUTLINE ---------------- */
  function outline(c) {
    SFX.rain(false); SFX.music('noir'); persistRun('outline');
    const v = c.victim;
    const s = show(`<div class="screen outline woodbg">
      ${topbar(c, L('Yugto 2 · Buod ng Kaso at mga Suspek', 'Phase 2 · Case Outline and Suspects'))}
      <div class="folder" style="left:26px;top:84px;width:610px;height:620px"><span class="tabname">${L('KASO', 'CASE')} #${c.num}</span>
        <div class="clip"></div>
        <div class="sheet">
          <h2>${L('BUOD NG KASO', 'CASE OUTLINE')}</h2><div class="sub">${L('Pangkalahatang-tanaw ng insidente', 'Overview of the incident')}</div>
          <div class="caseno">${L('KASO BLG.', 'CASE NO.')}<b>${c.num}</b></div>
          <div style="display:flex;gap:14px;align-items:flex-start">
            <div class="polaroid" style="width:330px;height:228px;transform:rotate(-2deg)"><svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">${c.scene(true)}</svg><div class="pc">${esc(c.place)}</div></div>
            <div class="polaroid" style="width:150px;height:186px;transform:rotate(3deg);background:#fff"><div style="width:100%;height:100%;background:#cdbf9c">${charSVG(v.look, 'closed')}</div><div class="pc">${L('Biktima', 'Victim')}</div></div>
          </div>
          <table class="facts">
            <tr><td>${L('Biktima', 'Victim')}</td><td><b>${esc(v.name)}</b> — ${esc(v.desc)}</td></tr>
            <tr><td>${L('Sanhi', 'Cause')}</td><td>${esc(v.cause)}</td></tr>
            <tr><td>${L('Lugar', 'Location')}</td><td>${esc(v.found)}</td></tr>
            <tr><td>${L('Oras ng krimen', 'Time of crime')}</td><td class="red">${esc(v.windowText)} ${L('(tantiya)', '(estimated)')}</td></tr>
            <tr><td>${L('Nakatagpo', 'Found by')}</td><td>${esc(v.foundBy)}</td></tr>
            <tr><td>${L('Panahon', 'Weather')}</td><td>${esc(v.weather)}</td></tr>
          </table>
        </div>
      </div>
      <div class="lu"><span class="lt">${L('MGA SUSPEK', 'SUSPECTS')}</span><div id="lu-svg" style="width:100%;height:100%"></div></div>
      <div class="info" id="lu-info"></div>
      <div class="banner"><em>${L('MAY NAGSISINUNGALING!', 'SOMEONE IS LYING!')}</em><small>${L('Apat na suspek, iisang salarin.', 'Four suspects, one culprit.')}</small></div>
      <button class="btn primary" id="go" style="position:absolute;right:40px;top:640px">${L('IMBESTIGAHAN ▶', 'INVESTIGATE ▶')}</button>
    </div>`);
    bindBack(s);
    const luWrap = $('#lu-svg', s), info = $('#lu-info', s);
    function pick(id) {
      const list = c.suspects.map((p) => ({ id: p.id, name: p.name, h: p.h, look: CHARS[p.id] }));
      luWrap.innerHTML = ART.lineup(list, id);
      const p = suspectOf(c, id);
      info.innerHTML = `<div class="pp">${charSVG(p.id, 'neutral')}</div><div><b>${esc(p.name)}</b> · <span style="color:var(--blood)">${esc(p.role)}</span><br>Alibi: ${esc(p.alibi)}<br><span style="color:var(--sepia)">${L('Tala', 'Note')}: ${esc(p.note)}</span></div>`;
      $$('.lu-fig', luWrap).forEach((g) => g.addEventListener('click', () => { SFX.tap(); pick(g.dataset.suspect); }));
    }
    pick(c.suspects[0].id);
    tap($('#go', s), () => { SFX.stamp(); investigate(c); });
  }

  /* ---------------- PHASE 3: INVESTIGATION ---------------- */
  function investigate(c) {
    SFX.music('tension'); persistRun('inv');
    const partner = c.partner || { c: 'jessa', name: 'PO2 JESSA DIMACULANGAN · SOCO' };
    const n = c.clues.length;
    const extra = `<div class="hud-mid"><span class="objective">${L('HANAPIN', 'FIND')}: ${n}</span><div class="flipclock" id="clock"></div></div>${kapeHTML(run.kape)}<button class="hintbtn" id="zoom" title="Zoom">⊕ ZOOM</button>${DEV.on ? '<button class="hintbtn" id="lay" title="Art layout tool">🎯 LAYOUT</button>' : ''}<button class="hintbtn" id="hint" title="${L('Suriin (−1 kape)', 'Inspect (−1 coffee)')}">${LENS_SVG}${L('SURIIN', 'INSPECT')} −1☕</button><button class="iconbtn" id="pause" style="width:44px;height:44px;font-size:20px" title="Pause">❚❚</button>`;
    const s = show(`<div class="screen inv">
      ${topbar(c, L('Yugto 3 · Hanapin ang Ebidensya', 'Phase 3 · Find the Evidence'), extra)}
      <div class="spotpanel cctv" id="pA" style="left:12px"><svg viewBox="0 0 600 400" preserveAspectRatio="none">${c.scene(false)}<g class="marks"></g></svg><div class="plabel"><span class="rec"></span>${esc(c.beforeLabel)}</div><div class="zoomtag" hidden></div></div>
      <div class="spotpanel soco" id="pB" style="left:648px"><svg viewBox="0 0 600 400" preserveAspectRatio="none">${c.scene(true)}<g class="marks"></g></svg><div class="plabel">📷 ${esc(c.afterLabel)}</div><div class="zoomtag" hidden></div></div>
      <div class="talk"><div class="pp">${charSVG(partner.c, 'determined')}</div><div class="saybox" id="say"><span class="who">${esc(partner.name)}</span><span id="saytx"></span></div></div>
      <div class="tray"><div class="th">${L('EBIDENSYANG NAKALAP', 'EVIDENCE COLLECTED')} <span id="cnt">0 / ${n}</span></div><div class="slots" style="grid-template-columns:repeat(${n},1fr)">${c.clues.map((cl) => `<div class="cslot" data-c="${cl.id}">?</div>`).join('')}</div><div class="lastfound" id="last">${L('Ikumpara ang dalawang larawan. Ano ang nagbago?', 'Compare the two pictures. What changed?')}</div></div>
    </div>`);
    bindBack(s);
    const pA = $('#pA', s), pB = $('#pB', s), panels = [pA, pB];
    const say = (t) => { $('#saytx', s).textContent = t; };
    say(L(`Inspector, ito ang kuha ng CCTV bago ang krimen, at ito ang eksena ngayon. ${n} ang pinagbago — hanapin natin lahat!`, `Inspector, here's the CCTV still from before the crime, and here's the scene now. ${n} things changed — let's find them all!`));
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
      if (paused || done || LAYOUT.on) return;
      if (!(DEV.on && DEV.infTime)) run.timeLeft--;
      drawClock();
      if (run.timeLeft % 5 === 0) persistRun();
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
    if (DEV.on && DEV.answers) c.clues.forEach((cl) => { if (!run.found.has(cl.id)) $('.marks', pB).insertAdjacentHTML('beforeend', `<circle class="dev-ans" cx="${cl.x}" cy="${cl.y}" r="${cl.r}"/>`); });

    function hit(p, e) {
      if (LAYOUT.on) { const q = sceneXY(p, e.clientX, e.clientY); layoutTap(p, q.x, q.y); return; }
      if (paused || done) return;
      const { x, y } = sceneXY(p, e.clientX, e.clientY);
      const tol = 6 * (view.w / 600);
      let best = null, bd = 1e9;
      c.clues.forEach((cl) => {
        if (run.found.has(cl.id)) return;
        [[cl.x, cl.y]].concat(cl.alt || []).forEach(([cx, cy]) => { const d = Math.hypot(cx - x, cy - y); if (d < cl.r + 6 + tol && d < bd) { bd = d; best = cl; } });
      });
      if (best) {
        run.found.add(best.id); SFX.good(); markFound(best); persistRun();
        $$('.ring-hint', s).forEach((h) => h.remove());
        $$('.dev-ans', s).forEach((h) => { if (+h.getAttribute('cx') === best.x && +h.getAttribute('cy') === best.y) h.remove(); });
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

    /* --- dev: art layout tool --- */
    function layoutTap(p, x, y) {
      const cl = c.clues[LAYOUT.sel]; if (!cl) return;
      x = Math.round(x); y = Math.round(y);
      if (p === pA && cl.alt) cl.alt[0] = [x, y]; else { cl.x = x; cl.y = y; }
      c._layoutEdited = true; ART.saveLayout(); SFX.tap(); investigate(c);
    }
    function layoutUI() {
      if (!LAYOUT.on) return;
      const cl = c.clues[LAYOUT.sel] || c.clues[0];
      c.clues.forEach((q, i) => {
        const on = i === LAYOUT.sel ? ' sel' : '';
        $('.marks', pB).insertAdjacentHTML('beforeend', `<circle class="lay-ring${on}" cx="${q.x}" cy="${q.y}" r="${q.r}"/><text class="lay-txt" x="${q.x}" y="${q.y - q.r - 3}">${esc(q.id)}</text>`);
        const [ax, ay] = q.alt && q.alt[0] ? q.alt[0] : [q.x, q.y];
        $('.marks', pA).insertAdjacentHTML('beforeend', `<circle class="lay-ring${on}" cx="${ax}" cy="${ay}" r="${q.r}"/><text class="lay-txt" x="${ax}" y="${ay - q.r - 3}">${esc(q.id)}</text>`);
      });
      const box = el(`<div class="laybox"><b>🎯 LAYOUT</b><select id="lay-sel" aria-label="Clue">${c.clues.map((q, i) => `<option value="${i}" ${i === LAYOUT.sel ? 'selected' : ''}>${esc(q.id)}</option>`).join('')}</select>
        <span>x ${Math.round(cl.x)} · y ${Math.round(cl.y)} · size ${Math.round(cl.r)}</span>
        <button class="btn small dark" id="lay-m">−</button><button class="btn small dark" id="lay-p">+</button>
        <button class="btn small gold" id="lay-x">EXPORT</button><button class="btn small dark" id="lay-r">RESET</button><button class="btn small primary" id="lay-off">CLOSE</button>
        <small>Tap the RIGHT picture to place the selected clue.${cl.alt ? ' Tap the LEFT picture to place its "before" position.' : ''} Saved automatically in this browser — EXPORT to keep it in assets/art/layout.json.</small></div>`);
      s.appendChild(box);
      $('#lay-sel', box).addEventListener('change', (e) => { LAYOUT.sel = +e.target.value; investigate(c); });
      tap($('#lay-m', box), () => { cl.r = Math.max(8, cl.r - 2); if (cl.w) cl.w = cl.r * 2.8; c._layoutEdited = true; ART.saveLayout(); investigate(c); });
      tap($('#lay-p', box), () => { cl.r += 2; if (cl.w) cl.w = cl.r * 2.8; c._layoutEdited = true; ART.saveLayout(); investigate(c); });
      tap($('#lay-off', box), () => { LAYOUT.on = false; investigate(c); });
      tap($('#lay-r', box), () => confirmBox('Reset all clue positions to the built-in layout?', () => { ART.resetLayout(); location.reload(); }));
      tap($('#lay-x', box), () => {
        const m = modal('ART LAYOUT · EXPORT', `<p style="margin:0 0 8px">Save this text as <b>assets/art/layout.json</b> in the project, then commit it.</p><textarea id="lay-json" rows="16" style="width:100%;font-family:Courier New,monospace;font-size:12px" readonly>${esc(JSON.stringify(ART.layoutJSON()))}</textarea><div style="margin-top:8px"><button class="btn small gold" id="lay-cp">COPY</button></div>`, 'wide');
        tap($('#lay-cp', m), () => { const t = $('#lay-json', m); t.select(); try { navigator.clipboard.writeText(t.value).then(() => toast('Copied.'), () => toast('Select and copy by hand.')); } catch (e2) { toast('Select and copy by hand.'); } });
      });
    }
    if ($('#lay', s)) tap($('#lay', s), () => { LAYOUT.on = !LAYOUT.on; investigate(c); });
    layoutUI();

    tap($('#hint', s), () => {
      if (run.kape <= 0 || done) return;
      const left = c.clues.filter((cl) => !run.found.has(cl.id));
      if (!left.length) return;
      useKape(); run.hints++; refreshKape(); SFX.flip();
      const cl = left[Math.floor(Math.random() * left.length)];
      $$('.ring-hint', s).forEach((h) => h.remove());
      if (view.w < 599) setView(cl.x - view.w / 2, cl.y - view.h / 2, view.w);
      $('.marks', pB).insertAdjacentHTML('beforeend', `<circle class="ring-hint" cx="${cl.x}" cy="${cl.y}" r="${cl.r + 10}"/>`);
      say(L('Tingnan mo rito, Inspector... may kakaiba sa bahaging ito.', "Look here, Inspector... something's off in this spot."));
      setTimeout(() => $$('.ring-hint', s).forEach((h) => h.remove()), 3500);
    });
    tap($('#pause', s), () => {
      paused = true;
      const o = el(`<div class="overlay"><div class="card"><h2>${L('NAKA-PAUSE', 'PAUSED')}</h2><p>${L('Huminga muna, Inspector.', 'Take a breath, Inspector.')}</p><div class="row"><button class="btn primary" id="r">${L('ITULOY', 'RESUME')}</button><button class="btn dark" id="q">${L('BUMALIK SA OPISINA', 'BACK TO THE OFFICE')}</button></div></div></div>`);
      s.appendChild(o);
      tap($('#r', o), () => { o.remove(); paused = false; });
      tap($('#q', o), () => desk());
    });
    function timeout() {
      if (done || paused) return;
      paused = true; run.timeouts++; SFX.lose();
      const free = run.kape <= 0;
      const o = el(`<div class="overlay"><div class="card"><div class="stamp">${L('UBOS NA ANG ORAS!', "TIME'S UP!")}</div><p>${free ? L('Wala ka nang kape... pero hindi sumusuko ang isang detektib.', 'No coffee left... but a detective never gives up.') : L('Uminom ng kape para sa dagdag na 60 segundo.', 'Drink a coffee for 60 more seconds.')}</p><div class="row"><button class="btn primary" id="r">${free ? L('SUBUKAN ULIT (+60s)', 'TRY AGAIN (+60s)') : L('MAGKAPE (+60s, −1☕)', 'DRINK COFFEE (+60s, −1☕)')}</button></div></div></div>`);
      s.appendChild(o);
      tap($('#r', o), () => { if (!free) { useKape(); refreshKape(); } run.timeLeft = 60; drawClock(); o.remove(); paused = false; persistRun(); });
    }
    function complete() {
      done = true; run.sceneDone = true; SFX.win(); persistRun();
      if (run.hints === 0) award('walanghint');
      if (run.misses === 0) award('walangmali');
      if (run.timeLeft >= 60 && run.timeouts === 0) award('mabilis');
      say(L('Kumpleto na ang ebidensya, Inspector! Tingnan natin ang talaan ng oras.', "That's all the evidence, Inspector! Let's check the timeline."));
      later(() => {
        const o = el(`<div class="overlay"><div class="card"><div class="stamp green">${L('KUMPLETO!', 'COMPLETE!')}</div><p>${L(`Nakalap ang lahat ng ${n} ebidensya.`, `All ${n} pieces of evidence collected.`)}<br>${L('Natitirang oras', 'Time left')}: ${Math.floor(run.timeLeft / 60)}:${String(run.timeLeft % 60).padStart(2, '0')}</p><button class="btn primary" id="go">${L('SURIIN ANG TALAAN ▶', 'REVIEW THE FILES ▶')}</button></div></div>`);
        s.appendChild(o); SFX.stamp();
        tap($('#go', o), () => files(c));
      }, 900);
    }
    if (run.sceneDone) { done = true; }
    if (!save.tut.inv && !run.sceneDone) {
      paused = true;
      later(() => coach('inv', [
        { sel: '#pA', text: L('Ito ang kuha ng CCTV BAGO ang krimen.', 'This is the CCTV still from BEFORE the crime.') },
        { sel: '#pB', text: L('Ito ang eksena NGAYON. I-tap ang anumang nagbago — sa alinmang larawan.', 'This is the scene NOW. Tap anything that changed — on either picture.') },
        { sel: '#zoom', text: L('Maliit ba? Pindutin ang ZOOM, o i-pinch / i-scroll ang larawan. I-drag para gumalaw.', 'Too small? Press ZOOM, or pinch / scroll the picture. Drag to move around.') },
        { sel: '#hint', text: L('Naiipit? Ang SURIIN ay nagtuturo ng isang ebidensya — kapalit ng 1 tasa ng kape.', 'Stuck? INSPECT points out one clue — for 1 cup of coffee.') },
        { sel: '#clock', text: L('Bawat maling tap ay −5 segundo. Bilis, Inspector!', 'Each wrong tap costs 5 seconds. Hurry, Inspector!') }
      ], () => { paused = false; }), 300);
    }
  }

  /* ---------------- PHASE 4: FILES ---------------- */
  function files(c) {
    SFX.music('noir'); persistRun('files');
    const s = show(`<div class="screen files woodbg">
      ${topbar(c, L('Yugto 4 · Talaan at Oras ng Pangyayari', 'Phase 4 · Case Files and Timeline'), kapeHTML(run.kape))}
      <div class="folder" style="left:26px;top:84px;width:560px;height:560px"><span class="tabname">${L('EBIDENSYA', 'EVIDENCE')}</span><div class="clip"></div>
        <div class="sheet"><h2>${L('EBIDENSYA', 'EVIDENCE')}</h2><div class="sub">${L('Listahan ng nakalap na ebidensya · i-tap ang (i)', 'List of collected evidence · tap (i)')}</div><div class="caseno">${L('KASO BLG.', 'CASE NO.')}<b>${c.num}</b></div>
          <div class="ev-list" id="evl"></div>
          <div class="ev-detail" id="evd">${L('Pumili ng ebidensya para makita ang detalye.', 'Pick a piece of evidence to see the details.')}</div>
        </div></div>
      <div class="folder" style="left:612px;top:84px;width:642px;height:560px"><span class="tabname">TIMELINE</span><div class="clip"></div>
        <div class="sheet"><h2>TIMELINE</h2><div class="sub">${L('Oras-oras na talaan · Suriin ang bawat alibi', 'Hour-by-hour log · Check every alibi')}</div><div class="caseno">${L('KASO BLG.', 'CASE NO.')}<b>${c.num}</b></div>
          <div class="tl-win">⏱ ${L('Tantiyang oras ng krimen', 'Estimated time of crime')}: ${esc(c.victim.windowText)}</div>
          <div class="tl" id="tl"></div>
        </div></div>
      <div class="progress-note" id="pn"></div>
      <button class="btn primary proceed" id="go" disabled>${L('INTEROGASYON ▶', 'INTERROGATION ▶')}</button>
    </div>`);
    bindBack(s);
    let selected = null;
    function renderEv() {
      const items = evItems(c, run);
      $('#evl', s).innerHTML = items.map((it) => `<div class="ev-row ${it.meta ? 'meta' : ''} ${selected === it.id ? 'sel' : ''}" data-id="${it.id}"><div class="ti">${it.thumb}</div><div class="nm">${esc(it.name)}<small>${it.meta ? L('★ PALATANDAAN NI ANG ANINO', "★ ANG ANINO'S CLUE") : esc(it.kind)}</small></div>${it.isNew ? `<span class="new">${L('BAGO', 'NEW')}</span>` : ''}<span class="i">i</span></div>`).join('');
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
          else chk = `<div class="chk"><button class="btn small gold" data-chk="${e.who}">${L('SURIIN ANG ALIBI', 'CHECK ALIBI')}</button></div>`;
        }
        return `<div class="tl-row ${inWin(e.t) ? 'inwin' : ''}"><div class="tm">${e.t}</div><div class="who ${sus ? '' : 'victim'}">${face}</div><div class="tx"><span class="nm">${sus ? esc(sus.name) + ' · ' + esc(sus.role) : esc(c.victim.name)}</span>${esc(e.text)}${chk}</div></div>`;
      }).join('');
      $$('[data-chk]', s).forEach((b) => tap(b, () => {
        const id = b.dataset.chk; run.checked.add(id);
        const sus = suspectOf(c, id);
        (sus.check.unlock || []).forEach((u) => run.unlocked.add(u));
        if (sus.check.ok) SFX.stamp(); else SFX.bad();
        persistRun();
        const sc = $('#tl', s).scrollTop; renderTL(); $('#tl', s).scrollTop = sc; renderEv(); progress();
      }));
    }
    function progress() {
      const total = c.suspects.length, got = run.checked.size;
      $('#pn', s).textContent = got < total ? L(`Nasuri ang alibi: ${got}/${total}. Suriin ang lahat bago mag-interogasyon.`, `Alibis checked: ${got}/${total}. Check them all before the interrogation.`) : L('Nasuri na ang lahat ng alibi. Oras na para harapin ang mga suspek.', 'Every alibi checked. Time to face the suspects.');
      $('#go', s).disabled = got < total;
    }
    renderEv(); renderTL(); progress();
    tap($('#go', s), () => { SFX.stamp(); interrogate(c); });
    later(() => coach('files', [
      { sel: '#tl', text: L('Pindutin ang SURIIN ANG ALIBI ng bawat suspek. Lalabas kung totoo o hindi ang sinasabi nila — at may mga bagong rekord.', "Press CHECK ALIBI for each suspect. You'll see whether their story holds up — and new records will turn up.") },
      { sel: '#evl', text: L('Nandito ang lahat ng ebidensya at rekord. I-tap ang bawat isa para basahin ang detalye.', 'All your evidence and records are here. Tap each one to read the details.') }
    ]), 300);
  }

  /* ---------------- PHASE 5: INTERROGATION ---------------- */
  const SLOT_PH = { 1: L('Ano ang ginamit, o ano ang nagpapatunay na naroon siya?', 'What was used, or what proves they were there?'), 2: L('Bakit niya ginawa, o ano ang sumisira sa alibi niya?', 'Why did they do it, or what breaks their alibi?') };
  function interrogate(c) {
    SFX.music('room'); persistRun('room');
    const s = show(`<div class="screen room">
      <div class="bricks"></div>
      <div class="glow"></div>
      ${topbar(c, L('Yugto 5 · Interogasyon at Akusasyon', 'Phase 5 · Interrogation and Accusation'), `<button class="btn small dark" id="files">↩ ${L('TALAAN', 'FILES')}</button>${kapeHTML(run.kape)}`)}
      <div class="hotseat"><div class="chair"></div><div class="sus" id="sus"></div><div class="table"></div><div class="empty" id="empty">${L('Pumili ng suspek sa kanan.', 'Pick a suspect on the right.')}</div></div>
      <div class="lamp"><div class="cord"></div><div class="shade"></div><div class="bulb"></div></div>
      <div class="speech" id="speech" hidden></div>
      <div class="pahayag" id="pahayag" hidden><div class="ph-h">${L('MGA PAHAYAG', 'STATEMENTS')} <span>${L('pumili ng pahayag + ebidensya, saka TUTOL!', 'pick a statement + evidence, then OBJECTION!')}</span></div><div class="ph-row"><div class="ph-list" id="phl"></div><button class="btn tutol" id="tutol">${L('TUTOL!', 'OBJECTION!')}</button></div></div>
      <div class="accuse">
        <h3>${L('AKUSASYON', 'ACCUSATION')}</h3><div class="sub">${L('* I-drag o i-tap ang ebidensya papunta sa slot.', '* Drag or tap evidence into a slot.')}</div>
        <div class="slot" data-slot="1" style="margin-top:8px"><span class="lab">${L('1 · SANDATA / PARAAN', '1 · WEAPON / METHOD')}</span><div class="ph">${SLOT_PH[1]}</div></div>
        <div class="slot" data-slot="2" style="margin-top:6px"><span class="lab">${L('2 · MOTIBO / PATUNAY NG KASINUNGALINGAN', '2 · MOTIVE / PROOF OF THE LIE')}</span><div class="ph">${SLOT_PH[2]}</div></div>
        <button class="btn arrest" id="arrest" style="margin-top:auto">${L('HULIHIN!', 'ARREST!')}</button>
      </div>
      <div class="suspects"><h3>${L('SUSPEK', 'SUSPECTS')}</h3><div class="sub">${L('* Kausapin, saka piliin ang salarin.', '* Talk to them, then pick the culprit.')}</div>
        <div class="sgrid">${c.suspects.map((p) => `<button class="scard" data-s="${p.id}">${charSVG(p.id, 'neutral')}<span class="nm">${esc(p.name)}</span></button>`).join('')}</div>
      </div>
      <div class="evtray"><div class="th">${L('EBIDENSYA', 'EVIDENCE')} <span>${L('Hilahin pataas papunta sa slot · o i-tap ang card, saka ang slot / TUTOL!', 'Drag up into a slot · or tap a card, then a slot / OBJECTION!')}</span></div><div class="evscroll" id="evs"></div></div>
    </div>`);
    bindBack(s);
    tap($('#files', s), () => files(c));
    let items = evItems(c, run);
    let picked = null, stmt = null;
    const refreshKape = () => { const k = $('.kape', s); k.outerHTML = kapeHTML(run.kape); };

    function renderCards() {
      const ansIds = DEV.on && DEV.answers ? [...c.solution.slot1, ...c.solution.slot2] : [];
      $('#evs', s).innerHTML = items.map((it) => `<div class="ev-card ${ansIds.includes(it.id) ? 'dev-ok' : ''} ${it.meta ? 'meta' : ''} ${picked === it.id ? 'picked' : ''} ${(run.slot1 === it.id || run.slot2 === it.id) ? 'used' : ''}" data-id="${it.id}"><div class="ti">${it.thumb}</div><div class="nm">${esc(it.name)}</div><button class="i" data-i="${it.id}" aria-label="${L('Detalye', 'Details')}">i</button></div>`).join('');
    }
    function renderSlots() {
      [1, 2].forEach((k) => {
        const slot = $(`.slot[data-slot="${k}"]`, s), id = run['slot' + k];
        const lab = slot.querySelector('.lab').outerHTML;
        slot.classList.toggle('filled', !!id); slot.classList.remove('bad');
        if (id) { const it = items.find((x) => x.id === id); slot.innerHTML = `${lab}<div class="ti">${it.thumb}</div><div class="nm">${esc(it.name)}<br><small style="color:var(--sepia)">${L('(i-tap para alisin)', '(tap to remove)')}</small></div>`; }
        else slot.innerHTML = `${lab}<div class="ph">${SLOT_PH[k]}</div>`;
        slot.classList.toggle('ready', !!picked && !id);
      });
      $('#tutol', s).classList.toggle('ready', !!picked && stmt !== null);
    }
    function place(k, id) {
      if (run['slot' + (3 - k)] === id) run['slot' + (3 - k)] = null;
      run['slot' + k] = id; picked = null; SFX.stamp(); renderCards(); renderSlots(); persistRun();
    }
    function speak(who, txt) { const sp = $('#speech', s); sp.hidden = false; sp.innerHTML = `<span class="who">${esc(who)}</span>${esc(txt)}`; sp.style.animation = 'none'; void sp.offsetWidth; sp.style.animation = 'pop .25s'; }
    function face(id, expr) { $('#sus', s).innerHTML = charSVG(id, expr || 'neutral'); }
    function renderStatements() {
      const p = suspectOf(c, run.suspect), box = $('#pahayag', s);
      if (!p) { box.hidden = true; return; }
      box.hidden = false;
      const st = p.statements || [];
      $('#phl', s).innerHTML = st.length ? st.map((x, i) => { const key = p.id + ':' + i, br = run.broken.has(key); return `<button class="stmt ${stmt === i ? 'sel' : ''} ${br ? 'broken' : ''}" data-st="${i}">“${esc(x.t)}”${br ? `<span class="basag">${L('BASAG!', 'BROKEN!')}</span>` : ''}</button>`; }).join('') : `<div class="stmt none">${L('Walang pahayag.', 'No statements.')}</div>`;
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
    if (DEV.on && DEV.answers) { const cb = $(`.scard[data-s="${c.solution.culprit}"]`, s); if (cb) cb.classList.add('dev-ok'); }

    $$('.scard', s).forEach((b) => tap(b, () => { SFX.tap(); const p = suspectOf(c, b.dataset.s); selectSuspect(p.id); speak(p.name, p.greet); }));
    $$('.slot', s).forEach((sl) => tap(sl, () => {
      const k = +sl.dataset.slot;
      if (picked) place(k, picked);
      else if (run['slot' + k]) { run['slot' + k] = null; SFX.click(); renderCards(); renderSlots(); }
    }));

    function outOfKape() {
      if (run.kape > 0) return;
      later(() => {
        const o = el(`<div class="overlay"><div class="card"><h2>${L('PAGOD NA SI MATEO...', 'MATEO IS EXHAUSTED...')}</h2><p>${L('Ubos na ang kape. Magtimpla ng panibagong barako at suriin ulit ang ebidensya.', 'Out of coffee. Brew a fresh barako and go over the evidence again.')}</p><button class="btn primary" id="r">${L('MAGTIMPLA (+3☕)', 'BREW (+3☕)')}</button></div></div>`);
        s.appendChild(o);
        tap($('#r', o), () => { run.kape = 3; o.remove(); refreshKape(); });
      }, 1600);
    }

    /* TUTOL! */
    tap($('#tutol', s), () => {
      const p = suspectOf(c, run.suspect);
      if (!p) { SFX.bad(); toast(L('Pumili muna ng suspek.', 'Pick a suspect first.')); return; }
      if (stmt === null) { SFX.bad(); toast(L('Pumili muna ng pahayag na kokontrahin.', 'Pick a statement to challenge first.')); return; }
      if (!picked) { SFX.bad(); toast(L('Pumili ng ebidensya sa ibaba, saka pindutin ang TUTOL!', 'Pick evidence below, then press OBJECTION!')); return; }
      const st = p.statements[stmt], key = p.id + ':' + stmt;
      const burst = el(`<div class="tutol-burst">${L('TUTOL!', 'OBJECTION!')}</div>`); s.appendChild(burst); setTimeout(() => burst.remove(), 1000);
      SFX.objection();
      if (run.broken.has(key)) { speak(p.name, st.lie.say); picked = null; renderCards(); renderSlots(); return; }
      if (st.lie && st.lie.ev.includes(picked)) {
        run.broken.add(key); face(p.id, 'shock'); speak(p.name, st.lie.say); persistRun();
        $('.hotseat', s).classList.remove('shake'); void $('.hotseat', s).offsetWidth; $('.hotseat', s).classList.add('shake');
        award('tutol');
        if (p.id === c.solution.culprit && p.statements.every((x, i) => !x.lie || run.broken.has(p.id + ':' + i))) award('walanglusot');
        (st.lie.unlock || []).forEach((u) => run.unlocked.add(u));
        picked = null; items = evItems(c, run); renderCards(); renderStatements(); renderSlots();
        later(() => face(p.id, 'nervous'), 1400);
      } else {
        run.badTutol++; useKape(); refreshKape(); SFX.bad();
        face(p.id, 'smug'); speak(p.name, st.lie ? L('Ano\'ng kinalaman niyan sa sinabi ko? Wala, Inspector.', 'What does that have to do with what I said? Nothing, Inspector.') : L('Totoo ang sinabi ko. Wala kang makikitang butas diyan.', "I told the truth. You won't find a hole in it."));
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
      if (!run.suspect) { SFX.bad(); speak('PO2 Jessa', L('Inspector, sino ang aakusahan natin? Pumili muna ng suspek.', 'Inspector, who are we accusing? Pick a suspect first.')); return; }
      if (!run.slot1 || !run.slot2) { SFX.bad(); speak('PO2 Jessa', L('Kulang pa, Inspector! Kailangan ng dalawang ebidensya sa mga slot.', "Not enough, Inspector! We need two pieces of evidence in the slots.")); [1, 2].forEach((k) => { if (!run['slot' + k]) $(`.slot[data-slot="${k}"]`, s).classList.add('bad'); }); return; }
      const sol = c.solution, p = suspectOf(c, run.suspect);
      const ok1 = sol.slot1.includes(run.slot1), ok2 = sol.slot2.includes(run.slot2);
      if (run.suspect === sol.culprit && ok1 && ok2) { SFX.slam(); arrest(c); return; }
      run.wrong++; useKape(); SFX.bad(); refreshKape(); persistRun();
      $('.hotseat', s).classList.remove('shake'); void $('.hotseat', s).offsetWidth; $('.hotseat', s).classList.add('shake');
      if (run.suspect !== sol.culprit) { face(p.id, 'angry'); speak(p.name, p.deny || L('Hindi ako \'yan!', "It wasn't me!")); }
      else {
        face(p.id, 'smug'); speak(p.name, p.weak);
        later(() => {
          const weak = []; if (!ok1) weak.push(1); if (!ok2) weak.push(2);
          weak.forEach((k) => $(`.slot[data-slot="${k}"]`, s).classList.add('bad'));
          toast(L(`Jessa: "Tama ang kutob mo, Inspector — pero mahina ang ebidensya sa slot ${weak.join(' at ')}."`, `Jessa: "Your hunch is right, Inspector — but the evidence in slot ${weak.join(' and ')} is weak."`));
        }, 900);
      }
      outOfKape();
    });

    later(() => coach('room', [
      { sel: '.suspects', text: L('Pumili ng suspek para kausapin siya.', 'Pick a suspect to talk to them.') },
      { sel: '.evtray', text: L('Ito ang lahat ng ebidensya mo. I-tap ang isang card para piliin ito.', 'This is all your evidence. Tap a card to pick it.') },
      { sel: '.hotseat', text: L('Kapag may napili kang suspek, lalabas ang mga PAHAYAG niya. Pumili ng pahayag, pumili ng ebidensyang kumokontra, at pindutin ang TUTOL! (−1 kape kapag mali.)', 'Once you pick a suspect, their STATEMENTS appear. Pick a statement, pick evidence that contradicts it, and press OBJECTION! (−1 coffee if wrong.)') },
      { sel: '.accuse', text: L('Kapag sigurado ka na: ilagay ang dalawang ebidensya rito, at pindutin ang HULIHIN!', "When you're sure: put two pieces of evidence here and press ARREST!") }
    ]), 300);
  }

  /* ---------------- ARREST + RESULT ---------------- */
  function arrest(c) {
    const cid = c.solution.culprit, cul = suspectOf(c, cid);
    const panels = [
      { bg: 'interrog', chars: [{ c: 'mateo', x: 130, y: 50, s: 7.4, e: 'shout', pose: 'point' }, { c: cid, x: 400, y: 70, s: 7, e: 'shock', flip: true }], beats: [
        { sfx: 'BLAG!', x: 4, y: 64, rot: -12, size: 60, color: '#ffd34a' },
        { b: L('IKAW ANG MAY SALA! Arestado ka!', "YOU'RE GUILTY! You're under arrest!"), who: 'Mateo', x: 3, y: 4, w: 46, tail: 'l' }] },
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
    save.run = null;
    persist();
    const secs = Math.round((Date.now() - run.started) / 1000);
    const s = show(`<div class="screen result woodbg">
      <div class="card">
        <div class="l">
          <div class="stamp" style="align-self:flex-start;margin:6px 0 4px 10px">${L('LUTAS NA!', 'SOLVED!')}</div>
          <h2 style="margin:0;font-family:var(--f-display);font-weight:400;font-size:34px">${L('KASO', 'CASE')} #${c.num} · ${esc(c.title)}</h2>
          <div class="stars">${'★'.repeat(stars)}<span class="off">${'★'.repeat(3 - stars)}</span></div>
          <div class="stats">
            <span>${L('Salarin', 'Culprit')}</span><b>${esc(suspectOf(c, c.solution.culprit).name)}</b>
            <span>${L('Kabuuang oras', 'Total time')}</span><b>${Math.floor(secs / 60)}m ${secs % 60}s</b>
            <span>${L('Maling tap', 'Wrong taps')}</span><b>${run.misses}</b>
            <span>${L('Ginamit na Suriin', 'Inspects used')}</span><b>${run.hints}</b>
            <span>${L('Nabasag na kasinungalingan', 'Lies broken')}</span><b>${run.broken.size} (+₱${lieBonus})</b>
            <span>${L('Maling akusasyon', 'Wrong accusations')}</span><b>${run.wrong}</b>
            <span>${L('Gantimpala', 'Reward')}</span><b style="color:var(--blood)">+₱${earn}${first ? '' : ' (replay)'}</b>
          </div>
          <p style="font-family:var(--f-type);font-size:14px;color:var(--sepia);margin:0">${L('3★: hindi hihigit sa 1 Suriin, walang ubos-oras, walang maling akusasyon.', "3★: at most 1 Inspect, no time-outs, no wrong accusations.")}</p>
          <div style="display:flex;gap:12px;margin-top:auto"><button class="btn primary" id="go">${L('BUMALIK SA OPISINA ▶', 'BACK TO THE OFFICE ▶')}</button><button class="btn dark" id="again">${L('ULITIN', 'REPLAY')}</button></div>
        </div>
        <div class="r">
          <h3>${L('PALATANDAAN NI ANG ANINO', "ANG ANINO'S CLUE")}</h3>
          <div class="meta-ph">${clueThumb(c, metaClue)}</div>
          <p><b>${esc(metaClue.name)}</b></p>
          <p>${esc(newMeta ? c.metaText : L('Nasa corkboard na ito.', "It's already on the corkboard."))}</p>
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
        : `<div class="pin-card unk" style="left:${x}px;top:${y}px;width:260px;height:250px;transform:rotate(${r}deg)"><div class="ph">?</div><div class="cp">${m.from} — ${L('hindi pa lutas', 'unsolved')}</div></div>`;
    });
    const centerCard = `<div class="pin-card" style="left:${center[0]}px;top:${center[1]}px;width:240px;height:260px;transform:rotate(2deg)"><div class="ph" style="background:#cdbf9c">${charSVG('tatay', 'neutral')}</div><div class="cp">SPO4 Ernesto Reyes</div></div>`;
    const sideCard = ch.n === 3
      ? `<div class="pin-card" style="left:930px;top:420px;width:220px;height:230px;transform:rotate(-4deg)"><div class="ph" style="background:${done ? '#cdbf9c' : '#111'}">${done ? charSVG('medina', 'sad') : charSVG('anino')}</div><div class="cp">${done ? 'KONS. ARTURO MEDINA' : 'ANG ANINO'}</div></div>`
      : ch.n === 2
      ? `<div class="pin-card" style="left:930px;top:420px;width:220px;height:230px;transform:rotate(-4deg)"><div class="ph" style="background:${done ? '#cdbf9c' : '#111'}">${done ? charSVG('dizon', 'smug') : charSVG('anino')}</div><div class="cp">${done ? 'KAPT. RODEL DIZON' : L('ANG KASABWAT?', 'THE ACCOMPLICE?')}</div></div>`
      : `<div class="pin-card" style="left:930px;top:420px;width:220px;height:230px;transform:rotate(-4deg)"><div class="ph" style="background:#111">${charSVG('anino')}</div><div class="cp">ANG ANINO</div></div>`;
    const yarnPts = [[240, 275], [1010, 255], [650, 525]];
    let yarn = '<svg style="position:absolute;inset:0;width:1280px;height:720px;pointer-events:none;z-index:1" viewBox="0 0 1280 720">';
    metas.forEach((m, i) => { if (got(m.id)) yarn += `<path d="M${yarnPts[i][0]},${yarnPts[i][1]} Q${(yarnPts[i][0] + 640) / 2},${(yarnPts[i][1] + 240) / 2 + 40} 640,240" stroke="#c0262e" stroke-width="4" fill="none"/>`; });
    if (done) yarn += `<path d="M640,240 Q900,300 1040,535" stroke="#c0262e" stroke-width="5" fill="none" stroke-dasharray="10 6"/>`;
    yarn += '</svg>';
    const tabs = avail.length > 1 ? `<div class="cork-tabs">${avail.map((a) => `<button class="btn small ${a.n === ch.n ? 'gold' : 'dark'}" data-ch="${a.n}">${L('KABANATA', 'CHAPTER')} ${a.n}</button>`).join('')}</div>` : '';
    const s = show(`<div class="screen corkbg">
      <div class="topbar"><button class="back" id="tb-back"><span>↩</span>${L('OPISINA', 'OFFICE')}</button><div class="title-txt">CORKBOARD · ${esc(ch.title.toUpperCase())}<small>${metas.filter((m) => got(m.id)).length}/3 ${L('palatandaan', 'clues')}</small></div>${tabs}</div>
      <div class="corkframe"></div>
      ${yarn}
      <div style="position:absolute;inset:0;z-index:2">${centerCard}${cards}${sideCard}
        ${done ? `<div class="cork-note" style="left:60px;top:500px;width:330px;transform:rotate(-3deg)">${esc(ch.note)}<br><b>— ${ch.boss ? L('WAKAS', 'THE END') : L('ITUTULOY', 'TO BE CONTINUED')}</b></div>` : ''}
        ${!all ? '<div class="cork-note" style="left:40px;top:470px;width:300px;transform:rotate(-3deg)">' + L('Lutasin ang mga kaso para makakuha ng palatandaan ni Ang Anino.', "Solve the cases to collect Ang Anino's clues.") + '</div>' : ''}
      </div>
      ${all && done && ch.boss ? '<button class="btn gold" id="credits" style="position:absolute;right:30px;bottom:24px;z-index:6">CREDITS ▶</button>' : ''}
    ${all && !done ? `<div class="cork-q" style="z-index:5"><h3>${esc(ch.question)}</h3><div class="opts">${ch.options.map((o, i) => `<button class="btn small" data-a="${i}">${esc(o)}</button>`).join('')}</div></div>` : ''}
    </div>`);
    tap($('#tb-back', s), () => desk());
    if ($('#credits', s)) tap($('#credits', s), () => credits());
    $$('[data-ch]', s).forEach((b) => tap(b, () => { SFX.flip(); corkboard(+b.dataset.ch); }));
    $$('[data-a]', s).forEach((b) => tap(b, () => {
      if (+b.dataset.a === ch.answer) {
        SFX.win();
        if (ch.boss) { komiks(ch.finale, () => bossFight(ch)); return; }
        komiks(ch.finale, () => { save.chapterDone[ch.n] = true; save.pesos += ch.reward; persist(); award('kab' + ch.n); corkboard(ch.n); });
      } else { SFX.bad(); b.disabled = true; toast(ch.wrong); }
    }));
  }

  /* =========================================================
     ANG HULING INTEROGASYON (boss)
     ========================================================= */
  function bossFight(ch) {
    SFX.music('room');
    const b = BOSS, broken = new Set();
    let kape = 5, wrongs = 0, sel = null, picked = null;
    const items = METAS.filter((m) => save.metas.includes(m.id) || DEV.on).map((m) => { const c = caseById(m.caseId), cl = c.clues.find((x) => x.id === m.id); return { id: m.id, name: cl.name, info: cl.info, thumb: clueThumb(c, cl), from: m.from }; });
    const s = show(`<div class="screen room boss">
      <div class="bricks"></div><div class="glow" style="background:radial-gradient(ellipse at 50% 25%, rgba(255,120,120,.32), rgba(255,120,120,0) 65%)"></div>
      <div class="topbar"><div class="title-txt">${L('ANG HULING INTEROGASYON', 'THE FINAL INTERROGATION')} <small>${L('Basagin ang lahat ng kasinungalingan ni Ang Anino', "Break every one of Ang Anino's lies")}</small></div><div id="bk">${kapeHTML(kape)}</div></div>
      <div class="hotseat"><div class="chair"></div><div class="sus" id="sus">${charSVG(b.char, 'smug')}</div><div class="table"></div></div>
      <div class="lamp"><div class="cord"></div><div class="shade"></div><div class="bulb"></div></div>
      <div class="speech" id="speech"><span class="who">${esc(b.name)}</span>${esc(b.greet)}</div>
      <div class="accuse boss-st"><h3>${L('MGA PAHAYAG', 'STATEMENTS')}</h3><div class="sub">${L('* Pumili ng pahayag, saka ng palatandaan sa ibaba.', '* Pick a statement, then a clue below.')}</div><div class="ph-list" id="bst"></div><button class="btn tutol" id="tutol" style="margin-top:auto;font-size:34px">${L('TUTOL!', 'OBJECTION!')}</button></div>
      <div class="suspects boss-prog"><h3>${L('PROGRESO', 'PROGRESS')}</h3><div class="sub">${L('* 4 na kasinungalingan', '* 4 lies')}</div><div class="meter" id="meter"></div><div class="mateo-pp">${charSVG('mateo', 'determined')}</div></div>
      <div class="evtray"><div class="th">${L('MGA PALATANDAAN NI ANG ANINO', "ANG ANINO'S CLUES")} <span>${L('Lahat ng naipon mo sa tatlong kabanata', 'Everything you collected across three chapters')}</span></div><div class="evscroll" id="evs"></div></div>
    </div>`);
    function speak(who, t) { const sp = $('#speech', s); sp.innerHTML = `<span class="who">${esc(who)}</span>${esc(t)}`; sp.style.animation = 'none'; void sp.offsetWidth; sp.style.animation = 'pop .25s'; }
    function render() {
      $('#bst', s).innerHTML = b.statements.map((x, i) => `<button class="stmt ${sel === i ? 'sel' : ''} ${broken.has(i) ? 'broken' : ''}" data-st="${i}">“${esc(x.t)}”${broken.has(i) ? `<span class="basag">${L('BASAG!', 'BROKEN!')}</span>` : ''}</button>`).join('');
      $('#meter', s).innerHTML = b.statements.map((x, i) => `<i class="${broken.has(i) ? 'on' : ''}"></i>`).join('') + `<b>${broken.size}/4</b>`;
      $('#evs', s).innerHTML = items.map((it) => `<div class="ev-card meta ${picked === it.id ? 'picked' : ''} ${DEV.on && DEV.answers && sel !== null && b.statements[sel].ev.includes(it.id) ? 'dev-ok' : ''}" data-id="${it.id}"><div class="ti">${it.thumb}</div><div class="nm">${esc(it.name)}</div></div>`).join('');
      $$('[data-st]', s).forEach((x) => tap(x, () => { SFX.tap(); sel = +x.dataset.st; render(); speak(b.name, b.statements[sel].t); }));
      $$('.ev-card', s).forEach((x) => tap(x, () => { SFX.tap(); picked = picked === x.dataset.id ? null : x.dataset.id; render(); }));
      $('#tutol', s).classList.toggle('ready', sel !== null && !!picked);
    }
    render();
    tap($('#tutol', s), () => {
      if (sel === null) { SFX.bad(); toast(L('Pumili muna ng pahayag.', 'Pick a statement first.')); return; }
      if (!picked) { SFX.bad(); toast(L('Pumili ng palatandaan sa ibaba.', 'Pick a clue below.')); return; }
      const st = b.statements[sel];
      const burst = el(`<div class="tutol-burst">${L('TUTOL!', 'OBJECTION!')}</div>`); s.appendChild(burst); setTimeout(() => burst.remove(), 1000);
      SFX.objection();
      if (st.ev.includes(picked) && !broken.has(sel)) {
        broken.add(sel); $('#sus', s).innerHTML = charSVG(b.char, 'shock'); speak(b.name, st.say);
        $('.hotseat', s).classList.remove('shake'); void $('.hotseat', s).offsetWidth; $('.hotseat', s).classList.add('shake');
        sel = null; picked = null; render();
        later(() => { $('#sus', s).innerHTML = charSVG(b.char, broken.size >= 3 ? 'nervous' : 'angry'); }, 1500);
        if (broken.size === b.statements.length) later(win, 2200);
      } else {
        wrongs++; if (!(DEV.on && DEV.infKape)) kape--; SFX.bad();
        $('#bk', s).innerHTML = kapeHTML(kape);
        $('#sus', s).innerHTML = charSVG(b.char, 'smug'); speak(b.name, b.wrong[wrongs % b.wrong.length]);
        picked = null; render();
        if (kape <= 0) later(() => {
          const o = el(`<div class="overlay"><div class="card"><h2>${L('NAKALUSOT SI ANG ANINO...', 'ANG ANINO SLIPPED AWAY...')}</h2><p>${L('Ubos na ang kape mo. Pag-aralan ulit ang mga palatandaan, at harapin siya muli.', "You're out of coffee. Study the clues again, and face him once more.")}</p><button class="btn primary" id="r">${L('SUBUKAN ULIT', 'TRY AGAIN')}</button></div></div>`);
          s.appendChild(o); tap($('#r', o), () => bossFight(ch));
        }, 1400);
      }
    });
    function win() {
      SFX.slam();
      save.chapterDone[ch.n] = true; save.pesos += ch.reward; save.bossWon = true; persist();
      award('kab' + ch.n); if (wrongs === 0) award('anino');
      komiks(ENDING, () => credits());
    }
  }

  function credits() {
    SFX.music('win'); SFX.rain(false);
    const stars = CASES.reduce((a, c) => a + (save.solved[c.id] || 0), 0);
    const s = show(`<div class="screen credits">
      <div class="rain" style="inset:0;opacity:.25"></div>
      <div class="roll">${CREDITS.map(([a, b]) => `<div class="cr"><b>${esc(a)}</b>${b ? `<span>${esc(b)}</span>` : ''}</div>`).join('')}
        <div class="cr"><b>${L('IYONG REKORD', 'YOUR RECORD')}</b><span>${L('Mga bituin', 'Stars')}: ${stars}/${CASES.length * 3} · ${L('Medalya', 'Medals')}: ${save.medals.length}/${MEDALS.length} · ${L('Pera', 'Money')}: ₱${save.pesos}</span></div>
      </div>
      <button class="btn primary" id="go" style="position:absolute;right:30px;bottom:24px">${L('BUMALIK SA OPISINA ▶', 'BACK TO THE OFFICE ▶')}</button>
    </div>`);
    tap($('#go', s), () => desk());
  }

  /* =========================================================
     SAVE / LOAD
     ========================================================= */
  const SLOTKEY = 'kaso-dilim-slots-v1';
  function getSlots() { try { const v = JSON.parse(localStorage.getItem(SLOTKEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function setSlots(v) { try { localStorage.setItem(SLOTKEY, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function summary(d) {
    const n = Object.keys(d.solved || {}).length, chs = Object.keys(d.chapterDone || {}).length;
    return `${n}/${CASES.length} ${L('kaso', 'cases')} · ${chs ? L('Tapos: Kab. ', 'Done: Ch. ') + Object.keys(d.chapterDone).join(', ') : L('Kabanata 1', 'Chapter 1')} · ₱${d.pesos || 0}${d.run ? L(' · may kasong naka-pause', ' · case in progress') : ''}`;
  }
  const fmtTime = (t) => { try { return new Date(t).toLocaleString(EN ? 'en-PH' : 'fil-PH', { dateStyle: 'medium', timeStyle: 'short' }); } catch (e) { return new Date(t).toLocaleString(); } };
  function encodeSave() { const j = JSON.stringify(save); let sum = 0; for (let i = 0; i < j.length; i++) sum = (sum + j.charCodeAt(i) * (i + 1)) % 9973; return 'KASO1-' + btoa(unescape(encodeURIComponent(j))) + '-' + sum; }
  function decodeSave(txt) {
    txt = String(txt || '').trim();
    let data;
    if (txt.startsWith('{')) data = JSON.parse(txt);
    else {
      const m = txt.replace(/\s+/g, '').match(/^KASO1-([A-Za-z0-9+/=]+)-(\d+)$/);
      if (!m) throw new Error('format');
      const j = decodeURIComponent(escape(atob(m[1])));
      let sum = 0; for (let i = 0; i < j.length; i++) sum = (sum + j.charCodeAt(i) * (i + 1)) % 9973;
      if (sum !== +m[2]) throw new Error('checksum');
      data = JSON.parse(j);
    }
    if (!data || typeof data !== 'object' || typeof data.solved !== 'object' || !Array.isArray(data.metas)) throw new Error('data');
    return data;
  }
  function applyLoaded(data, msg) {
    save = Object.assign(DEF(), data); persist();
    SFX.setEnabled(save.sound); SFX.setMusicVol(save.musicVol); SFX.setSfxVol(save.sfxVol);
    run = null; SFX.good(); desk(); toast(msg || L('Na-load ang save!', 'Save loaded!'));
  }
  function saveMenu() {
    if (run) persistRun();
    const slots = getSlots();
    const slotHTML = [0, 1, 2].map((i) => {
      const sl = slots[i];
      return `<div class="slotrow"><div class="sn">SLOT ${i + 1}</div><div class="si">${sl ? `<b>${esc(summary(sl.data))}</b><small>${esc(fmtTime(sl.time))}</small>` : `<i>${L('Walang laman', 'Empty')}</i>`}</div>
        <button class="btn small gold" data-sv="${i}">${L('I-SAVE DITO', 'SAVE HERE')}</button><button class="btn small primary" data-ld="${i}" ${sl ? '' : 'disabled'}>${L('I-LOAD', 'LOAD')}</button><button class="btn small dark" data-dl="${i}" ${sl ? '' : 'disabled'}>✕</button></div>`;
    }).join('');
    const o = modal('SAVE / LOAD', `<div class="savemenu">
      <p class="note">✔ <b>Auto-save:</b> ${L('awtomatikong naka-save ang progreso mo sa device na ito — pati ang kasong nasa gitna. Huling save', 'your progress saves automatically on this device — including a case in progress. Last save')}: ${save.savedAt ? esc(fmtTime(save.savedAt)) : '—'}.<br>${L('Ngayon', 'Now')}: ${esc(summary(save))}</p>
      <h3>${L('MGA SAVE SLOT', 'SAVE SLOTS')}</h3>${slotHTML}
      <h3>${L('ILIPAT SA IBANG DEVICE', 'MOVE TO ANOTHER DEVICE')}</h3>
      <p class="note">${L('Kopyahin ang <b>save code</b> at i-paste sa laro sa ibang phone o computer. O i-download/i-upload bilang file.', 'Copy the <b>save code</b> and paste it into the game on another phone or computer. Or download/upload it as a file.')}</p>
      <div class="coderow"><textarea id="code-out" readonly rows="3" aria-label="Save code"></textarea><div class="col"><button class="btn small gold" id="mk">${L('GUMAWA NG CODE', 'MAKE CODE')}</button><button class="btn small dark" id="cp">${L('KOPYAHIN', 'COPY')}</button><button class="btn small dark" id="dlf">${L('I-DOWNLOAD', 'DOWNLOAD')}</button></div></div>
      <div class="coderow"><textarea id="code-in" rows="3" placeholder="${L('I-paste dito ang save code (KASO1-...)', 'Paste the save code here (KASO1-...)')}" aria-label="${L('I-paste ang save code', 'Paste the save code')}"></textarea><div class="col"><button class="btn small primary" id="imp">${L('I-LOAD ANG CODE', 'LOAD CODE')}</button><label class="btn small dark upl">${L('I-UPLOAD FILE', 'UPLOAD FILE')}<input type="file" id="upf" accept=".txt,.json,.kaso" hidden></label></div></div>
    </div>`, 'wide');
    $$('[data-sv]', o).forEach((b) => tap(b, () => {
      const i = +b.dataset.sv, sl = getSlots();
      const doIt = () => { sl[i] = { time: Date.now(), data: JSON.parse(JSON.stringify(save)) }; if (setSlots(sl)) { SFX.stamp(); toast(L(`Na-save sa Slot ${i + 1}.`, `Saved to Slot ${i + 1}.`)); o.remove(); saveMenu(); } else toast(L('Hindi ma-save — puno o naka-block ang storage. Gamitin ang save code.', "Can't save — storage is full or blocked. Use the save code.")); };
      if (sl[i]) confirmBox(L(`Palitan ang laman ng Slot ${i + 1}?`, `Overwrite Slot ${i + 1}?`), doIt); else doIt();
    }));
    $$('[data-ld]', o).forEach((b) => tap(b, () => { const i = +b.dataset.ld, sl = getSlots()[i]; if (!sl) return; confirmBox(L(`I-load ang Slot ${i + 1}? Papalitan ang kasalukuyang progreso.`, `Load Slot ${i + 1}? This replaces your current progress.`), () => { o.remove(); applyLoaded(sl.data, L(`Na-load ang Slot ${i + 1}.`, `Loaded Slot ${i + 1}.`)); }); }));
    $$('[data-dl]', o).forEach((b) => tap(b, () => { const i = +b.dataset.dl; confirmBox(L(`Burahin ang Slot ${i + 1}?`, `Delete Slot ${i + 1}?`), () => { const sl = getSlots(); sl[i] = null; setSlots(sl); o.remove(); saveMenu(); }); }));
    const out = $('#code-out', o);
    tap($('#mk', o), () => { out.value = encodeSave(); out.select(); SFX.good(); });
    tap($('#cp', o), () => {
      if (!out.value) out.value = encodeSave();
      out.select();
      try { navigator.clipboard.writeText(out.value).then(() => toast(L('Nakopya ang save code!', 'Save code copied!')), () => toast(L('Piliin at kopyahin ang code nang mano-mano.', 'Select and copy the code by hand.'))); } catch (e) { toast(L('Piliin at kopyahin ang code nang mano-mano.', 'Select and copy the code by hand.')); }
    });
    tap($('#dlf', o), () => {
      try {
        const blob = new Blob([encodeSave()], { type: 'text/plain' }), a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'kaso-dilim-save.kaso'; document.body.appendChild(a); a.click(); a.remove();
        toast(L('Kung walang nag-download, gamitin ang KOPYAHIN.', 'If nothing downloaded, use COPY.'));
      } catch (e) { toast(L('Hindi ma-download dito. Gamitin ang KOPYAHIN.', "Can't download here. Use COPY.")); }
    });
    tap($('#imp', o), () => {
      try { const d = decodeSave($('#code-in', o).value); confirmBox(L('I-load ang save code? Papalitan ang kasalukuyang progreso.', 'Load this save code? It replaces your current progress.'), () => { o.remove(); applyLoaded(d, L('Na-load ang save code!', 'Save code loaded!')); }); }
      catch (e) { SFX.bad(); toast(L('Hindi wasto ang save code. Siguraduhing kumpleto ang kinopya (nagsisimula sa KASO1-).', 'That save code is not valid. Make sure you copied all of it (it starts with KASO1-).')); }
    });
    $('#upf', o).addEventListener('change', (e) => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      const rd = new FileReader();
      rd.onload = () => { try { const d = decodeSave(rd.result); o.remove(); applyLoaded(d, L('Na-load ang save file!', 'Save file loaded!')); } catch (err) { SFX.bad(); toast(L('Hindi wastong save file.', 'That save file is not valid.')); } };
      rd.readAsText(f);
    });
  }

  /* =========================================================
     DEVELOPER MODE
     ========================================================= */
  function devButton() {
    let b = document.getElementById('devbtn');
    if (!DEV.on) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('button'); b.id = 'devbtn'; b.textContent = '🛠 DEV'; b.title = 'Developer panel'; document.body.appendChild(b); b.addEventListener('click', () => { SFX.init(); devPanel(); }); }
  }
  function devLogin() {
    const o = el(`<div class="overlay"><form class="card" id="devf"><h2>DEVELOPER MODE 🔒</h2><p>${L('Ilagay ang password.', 'Enter the password.')}</p><input type="password" id="dev-pass" autocomplete="off" class="devpass" aria-label="Password"><p class="err" id="deverr" hidden>${L('Maling password.', 'Wrong password.')}</p><div class="row"><button class="btn primary" type="submit">${L('PASOK', 'ENTER')}</button><button class="btn dark" type="button" id="n">${L('KANSELA', 'CANCEL')}</button></div></form></div>`);
    stage.appendChild(o);
    const inp = $('#dev-pass', o); setTimeout(() => inp.focus(), 50);
    $('#devf', o).addEventListener('submit', (e) => {
      e.preventDefault(); SFX.init();
      if (passHash(inp.value.trim().toUpperCase()) === DEV_HASH) { DEV.on = true; persistDev(); devButton(); o.remove(); SFX.medal(); toast('Developer mode: BUKAS'); devPanel(); }
      else { SFX.bad(); $('#deverr', o).hidden = false; inp.value = ''; const f = $('#devf', o); f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); }
    });
    tap($('#n', o), () => o.remove());
  }
  function devGo(c, ph) {
    newRun(c);
    const all = () => { c.clues.forEach((cl) => run.found.add(cl.id)); run.sceneDone = true; };
    const chk = () => { c.suspects.forEach((sp) => { run.checked.add(sp.id); (sp.check.unlock || []).forEach((u) => run.unlocked.add(u)); }); };
    const ans = () => { run.suspect = c.solution.culprit; run.slot1 = c.solution.slot1[0]; run.slot2 = c.solution.slot2[0]; };
    if (ph === 'intro') return komiks(c.intro, () => outline(c));
    if (ph === 'outline') return outline(c);
    if (ph === 'inv') return investigate(c);
    all(); if (ph === 'files') return files(c);
    chk(); if (ph === 'room') return interrogate(c);
    ans(); if (ph === 'arrest') return arrest(c);
    return result(c);
  }
  function devPanel() {
    if (!DEV.on) { devLogin(); return; }
    const caseOpts = CASES.map((c) => `<option value="${c.id}" ${run && run.c === c ? 'selected' : ''}>#${c.num} · ${esc(c.title)} (Kab. ${chapterOf(c)})</option>`).join('');
    const ck = (id, k, label) => `<label class="devck"><input type="checkbox" id="${id}" data-k="${k}" ${DEV[k] ? 'checked' : ''}> ${label}</label>`;
    const o = modal('🛠 DEVELOPER MODE', `<div class="devp">
      <h3>PUMUNTA SA KASO</h3>
      <div class="devrow"><select id="dev-case" aria-label="Kaso">${caseOpts}</select></div>
      <div class="devrow">${[['intro', 'KOMIKS'], ['outline', 'BUOD'], ['inv', 'EKSENA'], ['files', 'TALAAN'], ['room', 'INTEROGASYON'], ['arrest', 'ARESTO'], ['result', 'RESULTA']].map(([k, l]) => `<button class="btn small gold" data-ph="${k}">${l}</button>`).join('')}</div>
      <h3>MGA CHEAT</h3>
      <div class="devrow">${ck('dev-time', 'infTime', 'Hindi umaandar ang oras')}${ck('dev-kape', 'infKape', 'Walang ubos na kape')}${ck('dev-ans', 'answers', 'Ipakita ang mga sagot')}${ck('dev-unl', 'unlockAll', 'Bukas lahat ng kaso')}</div>
      <h3>KASALUKUYANG KASO ${run ? '· #' + run.c.num + ' (' + esc(run.phase || '') + ')' : '· wala'}</h3>
      <div class="devrow"><button class="btn small dark" data-act="found" ${run ? '' : 'disabled'}>HANAPIN LAHAT NG EBIDENSYA</button><button class="btn small dark" data-act="check" ${run ? '' : 'disabled'}>SURIIN LAHAT NG ALIBI</button><button class="btn small dark" data-act="lies" ${run ? '' : 'disabled'}>BASAGIN LAHAT NG KASINUNGALINGAN</button><button class="btn small dark" data-act="answer" ${run ? '' : 'disabled'}>ILAGAY ANG TAMANG SAGOT</button></div>
      <h3>PROGRESO</h3>
      <div class="devrow"><button class="btn small dark" data-pg="money">+₱1000</button><button class="btn small dark" data-pg="thermos">+3 THERMOS</button><button class="btn small dark" data-pg="solveall">LUTASIN LAHAT (3★)</button><button class="btn small dark" data-pg="medals">LAHAT NG MEDALYA</button><button class="btn small dark" data-pg="ch1">TAPOS KAB. 1</button><button class="btn small dark" data-pg="ch2">TAPOS KAB. 2</button><button class="btn small dark" data-pg="ch3">TAPOS KAB. 3</button><button class="btn small dark" data-pg="chreset">RESET MGA KABANATA</button><button class="btn small dark" data-pg="tut">RESET TUTORIAL</button><button class="btn small primary" data-pg="wipe">BURAHIN LAHAT</button></div>
      <h3>MGA EKSENA</h3>
      <div class="devrow"><button class="btn small dark" data-sc="title">TITLE</button><button class="btn small dark" data-sc="desk">OPISINA</button><button class="btn small dark" data-sc="prologue">PROLOGUE</button><button class="btn small dark" data-sc="f1">FINALE 1</button><button class="btn small dark" data-sc="f2">FINALE 2</button><button class="btn small dark" data-sc="f3">FINALE 3</button><button class="btn small dark" data-sc="boss">HULING INTEROGASYON</button><button class="btn small dark" data-sc="ending">ENDING</button><button class="btn small dark" data-sc="credits">CREDITS</button><button class="btn small dark" data-sc="c1">CORK 1</button><button class="btn small dark" data-sc="c2">CORK 2</button><button class="btn small dark" data-sc="c3">CORK 3</button></div>
      <div class="devrow" style="margin-top:10px"><button class="btn small primary" id="dev-lock">I-LOCK ANG DEVELOPER MODE</button></div>
    </div>`, 'wide dev');
    const close = () => o.remove();
    $$('[data-ph]', o).forEach((b) => tap(b, () => { close(); devGo(caseById($('#dev-case', o).value), b.dataset.ph); }));
    $$('.devck input', o).forEach((cb) => cb.addEventListener('change', () => { DEV[cb.dataset.k] = cb.checked; persistDev(); toast(cb.parentElement.textContent.trim() + ': ' + (cb.checked ? 'BUKAS' : 'SARADO')); }));
    $$('[data-act]', o).forEach((b) => tap(b, () => {
      if (!run) return;
      const c = run.c, a = b.dataset.act;
      if (a === 'found') { c.clues.forEach((cl) => run.found.add(cl.id)); run.sceneDone = true; }
      if (a === 'check') c.suspects.forEach((sp) => { run.checked.add(sp.id); (sp.check.unlock || []).forEach((u) => run.unlocked.add(u)); });
      if (a === 'lies') c.suspects.forEach((sp) => (sp.statements || []).forEach((st, i) => { if (st.lie) { run.broken.add(sp.id + ':' + i); (st.lie.unlock || []).forEach((u) => run.unlocked.add(u)); } }));
      if (a === 'answer') { c.clues.forEach((cl) => run.found.add(cl.id)); c.suspects.forEach((sp) => { run.checked.add(sp.id); (sp.check.unlock || []).forEach((u) => run.unlocked.add(u)); }); run.suspect = c.solution.culprit; run.slot1 = c.solution.slot1[0]; run.slot2 = c.solution.slot2[0]; }
      persistRun(); close();
      const ph = run.phase === 'intro' ? 'outline' : run.phase;
      const target = a === 'answer' ? 'room' : (a === 'found' && ph === 'inv' ? 'files' : ph);
      ({ outline, inv: investigate, files, room: interrogate }[target] || outline)(c);
      toast('DEV: tapos.');
    }));
    $$('[data-pg]', o).forEach((b) => tap(b, () => {
      const k = b.dataset.pg;
      if (k === 'money') save.pesos += 1000;
      if (k === 'thermos') save.thermos += 3;
      if (k === 'solveall') { CASES.forEach((c) => { save.solved[c.id] = 3; if (!save.metas.includes(c.metaId)) save.metas.push(c.metaId); }); save.seenPrologue = true; }
      if (k === 'medals') save.medals = MEDALS.map((m) => m.id);
      if (/^ch\d$/.test(k)) { const n = +k[2]; for (let i = 1; i <= n; i++) save.chapterDone[i] = true; CASES.filter((c) => chapterOf(c) <= n).forEach((c) => { if (!save.solved[c.id]) save.solved[c.id] = 3; if (!save.metas.includes(c.metaId)) save.metas.push(c.metaId); }); save.seenPrologue = true; }
      if (k === 'chreset') save.chapterDone = {};
      if (k === 'tut') save.tut = {};
      if (k === 'wipe') { confirmBox('Burahin ang lahat ng progreso?', () => { save = DEF(); persist(); close(); title(); }); return; }
      persist(); SFX.good(); toast('DEV: na-update ang progreso.');
      close(); desk();
    }));
    $$('[data-sc]', o).forEach((b) => tap(b, () => {
      const k = b.dataset.sc; close();
      if (k === 'title') return title();
      if (k === 'desk') return desk();
      if (k === 'prologue') return komiks(PROLOGUE, () => desk());
      if (k[0] === 'f') return komiks(CHAPTERS[+k[1] - 1].finale, () => desk());
      if (k === 'boss') return bossFight(CHAPTERS[2]);
      if (k === 'ending') return komiks(ENDING, () => credits());
      if (k === 'credits') return credits();
      if (k[0] === 'c') return corkboard(+k[1]);
    }));
    tap($('#dev-lock', o), () => { DEV = { on: false, infTime: false, infKape: false, answers: false, unlockAll: false }; persistDev(); devButton(); close(); toast('Naka-lock ang developer mode.'); });
  }

  /* ---------------- OFFLINE (installable app) ---------------- */
  try {
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !/claude|anthropic/.test(location.hostname)) navigator.serviceWorker.register('sw.js').catch(() => {});
  } catch (e) { /* ignore */ }

  /* ---------------- BOOT ---------------- */
  window.KASO_DEBUG = { get run() { return run; }, get save() { return save; }, startCase, desk, investigate, files, interrogate, corkboard, result, outline, award, bossFight, credits, saveMenu, devPanel, devLogin, encodeSave, decodeSave, resumeRun };
  devButton();
  (window.ART_READY || Promise.resolve()).then(title, title);
})();
