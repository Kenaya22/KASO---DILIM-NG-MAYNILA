/* =========================================================
   KASO: DILIM NG MAYNILA — GAME ENGINE
   ========================================================= */
(function () {
  'use strict';
  const { CHARS, CASES, PROLOGUE, FINALE, METAS, SHOP } = window.KASO;
  const ART = window.ART, SFX = window.SFX;
  const stage = document.getElementById('stage');
  let SCALE = 1;
  let cleanup = [];

  /* ---------------- SAVE ---------------- */
  const KEY = 'kaso-dilim-save-v1';
  const DEF = () => ({ pesos: 0, solved: {}, metas: [], owned: [], seenPrologue: false, sound: true, finale: false });
  let save = DEF();
  try { const raw = localStorage.getItem(KEY); if (raw) save = Object.assign(DEF(), JSON.parse(raw)); } catch (e) { /* no storage */ }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { /* ignore */ } }
  SFX.setEnabled(save.sound);

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

  function charSVG(id, expr, extra) { const c = CHARS[id]; return ART.portrait(c, expr, extra); }
  function clueThumb(c, clue) { const w = Math.max(60, clue.r * 2.8); return ART.sceneThumb(c.scene, clue.x, clue.y, w, !!clue.thumbBefore); }
  function evItems(c, run) {
    const items = [];
    c.clues.forEach((cl) => { if (run.found.has(cl.id)) items.push({ id: cl.id, name: cl.name, info: cl.info, meta: !!cl.meta, thumb: clueThumb(c, cl), kind: 'Ebidensya sa eksena' }); });
    Object.keys(c.records).forEach((rid) => { if (run.unlocked.has(rid)) { const r = c.records[rid]; items.push({ id: rid, name: r.name, info: r.info, thumb: ART.docIcon(r.icon), kind: 'Rekord', isNew: !run.seenRec.has(rid) }); } });
    return items;
  }
  function kapeHTML(n) { let s = ''; for (let i = 0; i < 5; i++) s += KAPE_SVG(i >= n); return `<div class="kape" title="Kape (enerhiya)">${s}</div>`; }
  function soundIcon() { return save.sound ? '🔊' : '🔇'; }

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

  /* =========================================================
     TITLE
     ========================================================= */
  function title() {
    const has = save.seenPrologue;
    const s = show(`<div class="screen title">
      <div class="shade"></div>
      <div class="rain" style="inset:0;opacity:.35"></div>
      <div class="tag">Isang misteryo ng Maynila.<br>Tatlong kaso. Isang anino.</div>
      <div class="menu">
        ${has ? '<button class="btn primary pulse" id="go">ITULOY ▶</button><button class="btn dark" id="new">BAGONG LARO</button>' : '<button class="btn primary pulse" id="go">SIMULAN ▶</button>'}
        <button class="btn dark" id="fs" title="Fullscreen">⛶</button>
      </div>
      <div class="ver">Kabanata 1 · Landscape 16:9</div>
    </div>`);
    tap($('#go', s), () => { SFX.rain(true); if (!save.seenPrologue) { komiks(PROLOGUE, () => { save.seenPrologue = true; persist(); startCase(CASES[0]); }); } else desk(); });
    const nw = $('#new', s);
    if (nw) tap(nw, () => confirmBox('Burahin ang lahat ng progreso at magsimula ulit?', () => { save = DEF(); persist(); SFX.rain(true); komiks(PROLOGUE, () => { save.seenPrologue = true; persist(); startCase(CASES[0]); }); }));
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
  function nextCase() { return CASES.find((c, i) => !save.solved[c.id] && (i === 0 || save.solved[CASES[i - 1].id])); }
  function desk() {
    SFX.rain(true);
    const nc = nextCase();
    const solvedN = Object.keys(save.solved).length;
    const allMeta = METAS.every((m) => save.metas.includes(m.id));
    let status;
    if (nc) status = `Bagong tawag! Sagutin ang <b>telepono</b> para sa Kaso #${nc.num}.`;
    else if (!save.finale && allMeta) status = 'Kumpleto na ang tatlong palatandaan. Pumunta sa <b>corkboard</b>.';
    else if (save.finale) status = 'Kabanata 1: Tapos na. Itutuloy ang paghahanap kay Ang Anino...';
    else status = 'Tahimik ang gabi.';
    const s = show(`<div class="screen desk">
      ${ART.desk(save)}
      <div class="rain" style="left:768px;top:42px;width:464px;height:356px;opacity:.8"></div>
      <div class="topbar" style="background:linear-gradient(rgba(20,12,6,.92),rgba(20,12,6,.75))">
        <div class="title-txt">OPISINA NI INSP. MATEO REYES <small>Manila Police District</small></div>
        <div class="chip" title="Pera"><span class="peso">₱</span><span>${save.pesos}</span></div>
        <div class="chip" title="Nalutas na kaso">📁 ${solvedN}/${CASES.length}</div>
        <button class="btn small gold" id="shop">TINDAHAN</button>
        <button class="btn small dark" id="how">PAANO?</button>
        <button class="iconbtn" id="snd" title="Tunog" style="width:44px;height:44px;font-size:20px">${soundIcon()}</button>
        <button class="iconbtn" id="fs" title="Fullscreen" style="width:44px;height:44px;font-size:20px">⛶</button>
        <button class="iconbtn" id="home" title="Title screen" style="width:44px;height:44px;font-size:20px">⏏</button>
      </div>
      <button class="hotspot" id="hs-cork" style="left:34px;top:64px;width:412px;height:316px" aria-label="Corkboard"><span class="lbl">ANG ANINO · CORKBOARD</span></button>
      <button class="hotspot top ${nc ? 'ringing' : ''}" id="hs-phone" style="left:186px;top:500px;width:170px;height:100px" aria-label="Telepono"><span class="lbl">${nc ? 'SAGUTIN ANG TAWAG' : 'TELEPONO'}</span></button>
      ${nc ? '<div class="ringsfx" style="left:352px;top:478px">KRIIING!</div>' : ''}
      <button class="hotspot" id="hs-type" style="left:500px;top:486px;width:320px;height:160px" aria-label="Mga Kaso"><span class="lbl">MGA KASO</span></button>
      <button class="hotspot" id="hs-fold" style="left:120px;top:580px;width:270px;height:124px" aria-label="Paano maglaro"><span class="lbl">GABAY SA IMBESTIGASYON</span></button>
      <button class="hotspot" id="hs-mug" style="left:1010px;top:500px;width:96px;height:130px" aria-label="Kape"><span class="lbl">KAPE</span></button>
      <div class="status">${status}</div>
    </div>`);
    tap($('#hs-phone', s), () => { if (nc) { SFX.ring(); later(() => startCase(nc), 400); } else { SFX.click(); toast('Walang bagong tawag. Tingnan ang mga lumang kaso sa makinilya.'); } });
    tap($('#hs-type', s), () => { SFX.type(); caseList(); });
    tap($('#hs-cork', s), () => { SFX.flip(); corkboard(); });
    tap($('#hs-fold', s), () => { SFX.flip(); howTo(); });
    tap($('#hs-mug', s), () => { SFX.good(); toast('"Barakong Batangas. Mapait — tulad ng katotohanan." — Mateo'); });
    tap($('#shop', s), () => { SFX.click(); shop(); });
    tap($('#how', s), () => { SFX.click(); howTo(); });
    tap($('#snd', s), () => { save.sound = !save.sound; persist(); SFX.setEnabled(save.sound); $('#snd', s).textContent = soundIcon(); });
    tap($('#fs', s), toggleFullscreen);
    tap($('#home', s), () => { SFX.rain(false); title(); });
    if (nc) { SFX.ring(); const iv = setInterval(() => SFX.ring(), 3500); cleanup.push(() => clearInterval(iv)); }
  }

  function toast(msg) {
    const t = el(`<div style="position:absolute;left:50%;top:80px;transform:translateX(-50%);z-index:70;background:var(--paper);color:var(--ink);border:3px solid var(--ink);padding:10px 18px;font-family:var(--f-type);font-size:17px;box-shadow:5px 5px 0 rgba(0,0,0,.5);max-width:760px;text-align:center;animation:pop .2s">${esc(msg)}</div>`);
    stage.appendChild(t); setTimeout(() => t.remove(), 2800);
  }

  function modal(titleTxt, body, cls) {
    const o = el(`<div class="modal-back"><div class="modal ${cls || ''}"><button class="x" aria-label="Isara">×</button><h2>${titleTxt}</h2><div class="body">${body}</div></div></div>`);
    stage.appendChild(o);
    tap($('.x', o), () => { SFX.click(); o.remove(); });
    o.addEventListener('click', (e) => { if (e.target === o) o.remove(); });
    return o;
  }

  function caseList() {
    const cards = CASES.map((c, i) => {
      const unlocked = i === 0 || save.solved[CASES[i - 1].id];
      const st = save.solved[c.id];
      const stars = st ? '★'.repeat(st) + '<span style="opacity:.25">' + '★'.repeat(3 - st) + '</span>' : '';
      return `<div class="casecard ${unlocked ? '' : 'locked'}">
        <div class="num">KASO #${c.num}</div>
        <div class="thumb">${unlocked ? `<svg viewBox="0 60 600 300" preserveAspectRatio="xMidYMid slice">${c.scene(false)}</svg>` : ''}</div>
        <div class="nm">${unlocked ? esc(c.title) : '???'}</div>
        <div class="pl">${unlocked ? esc(c.place) : 'Naka-lock — lutasin ang naunang kaso.'}</div>
        <div class="stars">${stars}</div>
        ${unlocked ? `<button class="btn small ${st ? 'dark' : 'primary'}" data-case="${c.id}">${st ? 'ULITIN' : 'LARUIN'}</button>` : ''}
      </div>`;
    }).join('');
    const o = modal('MGA KASO', `<div class="cases">${cards}</div>`);
    $$('[data-case]', o).forEach((b) => tap(b, () => { o.remove(); startCase(caseById(b.dataset.case)); }));
  }

  function shop() {
    const items = SHOP.map((it) => {
      const own = save.owned.includes(it.id);
      return `<div class="shopitem"><b>${esc(it.name)}</b><div>${esc(it.desc)}</div><div style="font-family:var(--f-display);font-size:22px;color:var(--blood)">₱${it.price}</div>
        <button class="btn small ${own ? 'dark' : 'gold'}" data-buy="${it.id}" ${own ? 'disabled' : ''}>${own ? 'NASA MESA NA' : 'BILHIN'}</button></div>`;
    }).join('');
    const o = modal(`TINDAHAN NI ALING SION <span style="font-size:22px;color:var(--blood)">· ₱${save.pesos}</span>`, `<p style="margin:0 0 12px">Palamutian ang mesa ni Mateo gamit ang perang kinita sa mga nalutas na kaso.</p><div class="shopgrid">${items}</div>`);
    $$('[data-buy]', o).forEach((b) => tap(b, () => {
      const it = SHOP.find((x) => x.id === b.dataset.buy);
      if (save.pesos < it.price) { SFX.bad(); toast(`Kulang ang pera. Kailangan ng ₱${it.price}.`); return; }
      save.pesos -= it.price; save.owned.push(it.id); persist(); SFX.win(); o.remove(); desk();
    }));
  }

  function howTo() {
    modal('GABAY SA IMBESTIGASYON', `<div class="howto"><ol>
      <li><b>KOMIKS</b> — Basahin ang kuwento. I-tap kahit saan para magpatuloy.</li>
      <li><b>BUOD NG KASO</b> — Kilalanin ang biktima at ang apat na suspek. I-tap ang bawat suspek sa lineup.</li>
      <li><b>HANAPIN ANG EBIDENSYA</b> — Ikumpara ang CCTV (kaliwa) at ang eksena ngayon (kanina). I-tap ang mga pinagbago. Bawat maling tap: −5 segundo. Ang <b>Suriin</b> (magnifying glass) ay nagtuturo ng isang ebidensya kapalit ng 1 tasa ng kape.</li>
      <li><b>TALAAN AT ORAS</b> — Suriin ang alibi ng bawat suspek sa timeline. May mga bagong rekord na lalabas.</li>
      <li><b>INTEROGASYON</b> — Piliin ang salarin, at i-drag (o i-tap) ang dalawang ebidensya: <i>Sandata/Paraan</i> at <i>Motibo/Patunay ng Kasinungalingan</i>. Pindutin ang <b>HULIHIN!</b> Bawat maling akusasyon: −1 kape.</li>
    </ol><p style="margin-top:12px">May nakatagong <b style="color:var(--blood)">palatandaan ni Ang Anino</b> sa bawat eksena. Ipunin ang tatlo para sa corkboard.</p></div>`, 'howto');
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
      chars += `<g transform="translate(${ch.x},${ch.y}) scale(${k},${ch.s})">${ART.figure(CHARS[ch.c], ch.e)}</g>`;
    });
    return `<div class="kpanel"><svg viewBox="0 0 520 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${panelBG(p.bg)}${chars}${p.svg || ''}</svg>${p.cap ? `<div class="kcap">${esc(p.cap)}</div>` : ''}</div>`;
  }
  function komiks(panels, done, opts) {
    opts = opts || {};
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
      if (t.includes('KRII')) SFX.ring(); else if (t.includes('KIDLAT')) SFX.thunder(); else if (t.includes('WEE')) SFX.siren(); else if (t.includes('BLAG')) SFX.slam(); else if (t.includes('KLIK')) SFX.click(); else SFX.flip();
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
      const x = 640 - (i * (796 + 40) + 398);
      track.style.transform = `translateX(${x}px)`;
      pEls.forEach((p, k) => p.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k <= i));
      const beats = panels[i].beats || [];
      if (beats.length) { later(() => { if (pi === i && bi === 0) { showBeat(beats[0]); bi = 1; } }, 650); }
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
    if (opts.onStart) opts.onStart(s);
  }

  /* =========================================================
     CASE FLOW
     ========================================================= */
  let run = null;
  function startCase(c) {
    run = { c, found: new Set(), kape: 5, hints: 0, timeouts: 0, wrong: 0, misses: 0, checked: new Set(), unlocked: new Set(), seenRec: new Set(), timeLeft: c.time, started: Date.now(), suspect: null, slot1: null, slot2: null };
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
    SFX.rain(false);
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
            <tr><td>Oras ng kamatayan</td><td class="red">${esc(v.windowText)} (tantiya)</td></tr>
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
    const n = c.clues.length;
    const extra = `<div class="hud-mid"><span class="objective">HANAPIN: ${n} EBIDENSYA</span><div class="flipclock" id="clock"></div></div>${kapeHTML(run.kape)}<button class="hintbtn" id="hint" title="Suriin (−1 kape)">${LENS_SVG}SURIIN −1☕</button><button class="iconbtn" id="pause" style="width:44px;height:44px;font-size:20px" title="Pause">❚❚</button>`;
    const s = show(`<div class="screen inv">
      ${topbar(c, 'Yugto 3 · Hanapin ang Ebidensya', extra)}
      <div class="spotpanel cctv" id="pA" style="left:12px"><svg viewBox="0 0 600 400" preserveAspectRatio="none">${c.scene(false)}<g class="marks"></g></svg><div class="plabel"><span class="rec"></span>${esc(c.beforeLabel)}</div></div>
      <div class="spotpanel soco" id="pB" style="left:648px"><svg viewBox="0 0 600 400" preserveAspectRatio="none">${c.scene(true)}<g class="marks"></g></svg><div class="plabel">📷 ${esc(c.afterLabel)}</div></div>
      <div class="talk"><div class="pp">${charSVG('jessa', 'determined')}</div><div class="saybox" id="say"><span class="who">PO2 JESSA DIMACULANGAN · SOCO</span><span id="saytx"></span></div></div>
      <div class="tray"><div class="th">EBIDENSYANG NAKALAP <span id="cnt">0 / ${n}</span></div><div class="slots" style="grid-template-columns:repeat(${n},1fr)">${c.clues.map((cl) => `<div class="cslot" data-c="${cl.id}">?</div>`).join('')}</div><div class="lastfound" id="last">Ikumpara ang dalawang larawan. Ano ang nagbago?</div></div>
    </div>`);
    bindBack(s);
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
    // restore already found (e.g. re-entry)
    run.found.forEach((id) => markFound(c.clues.find((x) => x.id === id), true));

    function markFound(cl, silent) {
      [$('#pA', s), $('#pB', s)].forEach((p) => {
        const g = $('.marks', p);
        g.insertAdjacentHTML('beforeend', `<circle class="ring-found" cx="${cl.x}" cy="${cl.y}" r="${cl.r + 4}"/>`);
        (cl.alt || []).forEach(([ax, ay]) => g.insertAdjacentHTML('beforeend', `<circle class="ring-found" cx="${ax}" cy="${ay}" r="${cl.r + 4}"/>`));
      });
      const slot = $(`.cslot[data-c="${cl.id}"]`, s);
      slot.classList.add('got'); if (cl.meta) slot.classList.add('meta');
      slot.innerHTML = clueThumb(c, cl);
      $('#cnt', s).textContent = `${run.found.size} / ${n}`;
      if (!silent) {
        $('#last', s).innerHTML = `<b>${esc(cl.name)}</b><br>${esc(cl.info)}`;
        say(cl.say);
      }
    }
    function hit(p, e) {
      if (paused || done) return;
      const svg = $('svg', p), r = svg.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 600, y = (e.clientY - r.top) / r.height * 400;
      let best = null, bd = 1e9;
      c.clues.forEach((cl) => {
        if (run.found.has(cl.id)) return;
        [[cl.x, cl.y]].concat(cl.alt || []).forEach(([cx, cy]) => {
          const d = Math.hypot(cx - x, cy - y);
          if (d < cl.r + 6 && d < bd) { bd = d; best = cl; }
        });
      });
      if (best) {
        run.found.add(best.id); SFX.good(); markFound(best);
        $$('.ring-hint', s).forEach((h) => h.remove());
        if (run.found.size === n) complete();
      } else {
        // ignore taps on already-found spots
        const onFound = c.clues.some((cl) => run.found.has(cl.id) && [[cl.x, cl.y]].concat(cl.alt || []).some(([cx, cy]) => Math.hypot(cx - x, cy - y) < cl.r + 6));
        if (onFound) return;
        run.misses++; run.timeLeft = Math.max(0, run.timeLeft - 5); drawClock(); SFX.bad();
        const g = $('.marks', p);
        const m = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        m.setAttribute('d', `M${x - 12},${y - 12} L${x + 12},${y + 12} M${x + 12},${y - 12} L${x - 12},${y + 12}`); m.setAttribute('class', 'miss');
        g.appendChild(m); setTimeout(() => m.remove(), 750);
        const pt = toStage(e);
        const pen = el(`<div class="penalty" style="left:${pt.x - 20}px;top:${pt.y - 40}px">−5s</div>`); s.appendChild(pen); setTimeout(() => pen.remove(), 950);
        p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake');
        if (run.timeLeft <= 0) timeout();
      }
    }
    [$('#pA', s), $('#pB', s)].forEach((p) => p.addEventListener('pointerdown', (e) => { SFX.init(); hit(p, e); }));
    tap($('#hint', s), () => {
      if (run.kape <= 0 || done) return;
      const left = c.clues.filter((cl) => !run.found.has(cl.id));
      if (!left.length) return;
      run.kape--; run.hints++; refreshKape(); SFX.flip();
      const cl = left[Math.floor(Math.random() * left.length)];
      $$('.ring-hint', s).forEach((h) => h.remove());
      const g = $('.marks', $('#pB', s));
      g.insertAdjacentHTML('beforeend', `<circle class="ring-hint" cx="${cl.x}" cy="${cl.y}" r="${cl.r + 10}"/>`);
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
      done = true; SFX.win();
      say('Kumpleto na ang ebidensya, Inspector! Tingnan natin ang talaan ng oras.');
      later(() => {
        const o = el(`<div class="overlay"><div class="card"><div class="stamp green">KUMPLETO!</div><p>Nakalap ang lahat ng ${n} ebidensya.<br>Natitirang oras: ${Math.floor(run.timeLeft / 60)}:${String(run.timeLeft % 60).padStart(2, '0')}</p><button class="btn primary" id="go">SURIIN ANG TALAAN ▶</button></div></div>`);
        s.appendChild(o); SFX.stamp();
        tap($('#go', o), () => files(c));
      }, 900);
    }
  }

  /* ---------------- PHASE 4: FILES ---------------- */
  function files(c) {
    const s = show(`<div class="screen files woodbg">
      ${topbar(c, 'Yugto 4 · Talaan at Oras ng Pangyayari', kapeHTML(run.kape))}
      <div class="folder" style="left:26px;top:84px;width:560px;height:560px"><span class="tabname">EBIDENSYA</span><div class="clip"></div>
        <div class="sheet"><h2>EBIDENSYA</h2><div class="sub">Listahan ng nakalap na ebidensya · i-tap ang (i)</div><div class="caseno">KASO BLG.<b>${c.num}</b></div>
          <div class="ev-list" id="evl"></div>
          <div class="ev-detail" id="evd">Pumili ng ebidensya para makita ang detalye.</div>
        </div></div>
      <div class="folder" style="left:612px;top:84px;width:642px;height:560px"><span class="tabname">TIMELINE</span><div class="clip"></div>
        <div class="sheet"><h2>TIMELINE</h2><div class="sub">Oras-oras na talaan · Suriin ang bawat alibi</div><div class="caseno">KASO BLG.<b>${c.num}</b></div>
          <div class="tl-win">⏱ Tantiyang oras ng kamatayan: ${esc(c.victim.windowText)}</div>
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
    function inWin(t) { return t >= c.win[0] && t <= c.win[1]; }
    function renderTL() {
      $('#tl', s).innerHTML = c.timeline.map((e, i) => {
        const sus = e.who !== 'victim' ? suspectOf(c, e.who) : null;
        const face = sus ? charSVG(sus.id, 'neutral') : charSVG(c.victim.look, 'neutral');
        let chk = '';
        if (e.alibi) {
          if (run.checked.has(e.who)) {
            const ck = sus.check;
            chk = `<div class="verdict ${ck.ok ? 'ok' : 'no'}">${esc(ck.text)}</div>`;
          } else chk = `<div class="chk"><button class="btn small gold" data-chk="${e.who}">SURIIN ANG ALIBI</button></div>`;
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
  }

  /* ---------------- PHASE 5: INTERROGATION ---------------- */
  function interrogate(c) {
    const s = show(`<div class="screen room">
      <div class="bricks"></div>
      <div class="glow"></div>
      ${topbar(c, 'Yugto 5 · Interogasyon at Akusasyon', `<button class="btn small dark" id="files">↩ TALAAN</button>${kapeHTML(run.kape)}`)}
      <div class="hotseat"><div class="chair"></div><div class="sus" id="sus"></div><div class="table"></div><div class="empty" id="empty">Pumili ng suspek sa kanan.</div></div>
      <div class="lamp"><div class="cord"></div><div class="shade"></div><div class="bulb"></div></div>
      <div class="speech" id="speech" hidden></div>
      <div class="accuse">
        <h3>AKUSASYON</h3><div class="sub">* I-drag o i-tap ang ebidensya papunta sa slot.</div>
        <div class="slot" data-slot="1" style="margin-top:8px"><span class="lab">1 · SANDATA / PARAAN</span><div class="ph">Ano ang ginamit, o ano ang nagpapatunay na naroon siya?</div></div>
        <div class="slot" data-slot="2" style="margin-top:6px"><span class="lab">2 · MOTIBO / PATUNAY NG KASINUNGALINGAN</span><div class="ph">Bakit niya ginawa, o ano ang sumisira sa alibi niya?</div></div>
        <button class="btn arrest" id="arrest" style="margin-top:auto">HULIHIN!</button>
      </div>
      <div class="suspects"><h3>SUSPEK</h3><div class="sub">* Piliin ang tunay na salarin.</div>
        <div class="sgrid">${c.suspects.map((p) => `<button class="scard" data-s="${p.id}">${charSVG(p.id, 'neutral')}<span class="nm">${esc(p.name)}</span></button>`).join('')}</div>
      </div>
      <div class="evtray"><div class="th">EBIDENSYA <span>Hilahin pataas papunta sa slot · o i-tap ang card, saka ang slot</span></div><div class="evscroll" id="evs"></div></div>
    </div>`);
    bindBack(s);
    tap($('#files', s), () => files(c));
    const items = evItems(c, run);
    let picked = null;

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
    }
    function place(k, id) {
      if (run['slot' + (3 - k)] === id) run['slot' + (3 - k)] = null;
      run['slot' + k] = id; picked = null; SFX.stamp(); renderCards(); renderSlots();
    }
    function speak(who, txt) { const sp = $('#speech', s); sp.hidden = false; sp.innerHTML = `<span class="who">${esc(who)}</span>${esc(txt)}`; sp.style.animation = 'none'; void sp.offsetWidth; sp.style.animation = 'pop .25s'; }
    function selectSuspect(id, expr) {
      run.suspect = id;
      $$('.scard', s).forEach((b) => b.classList.toggle('sel', b.dataset.s === id));
      $('#sus', s).innerHTML = charSVG(id, expr || 'neutral');
      $('#empty', s).hidden = true;
    }
    renderCards(); renderSlots();
    if (run.suspect) selectSuspect(run.suspect);

    $$('.scard', s).forEach((b) => tap(b, () => { SFX.tap(); const p = suspectOf(c, b.dataset.s); selectSuspect(p.id); speak(p.name, p.greet); }));
    $$('.slot', s).forEach((sl) => tap(sl, () => {
      const k = +sl.dataset.slot;
      if (picked) place(k, picked);
      else if (run['slot' + k]) { run['slot' + k] = null; SFX.click(); renderCards(); renderSlots(); }
    }));

    // drag + tap on evidence cards
    const evs = $('#evs', s);
    let drag = null;
    evs.addEventListener('pointerdown', (e) => {
      const ib = e.target.closest('.i');
      if (ib) return;
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
      run.wrong++; run.kape = Math.max(0, run.kape - 1); SFX.bad();
      const k = $('.kape', s); k.outerHTML = kapeHTML(run.kape);
      $('.hotseat', s).classList.remove('shake'); void $('.hotseat', s).offsetWidth; $('.hotseat', s).classList.add('shake');
      if (run.suspect !== sol.culprit) {
        selectSuspect(p.id, 'angry'); speak(p.name, p.deny || 'Hindi ako \'yan!');
      } else {
        selectSuspect(p.id, 'smug'); speak(p.name, p.weak);
        later(() => {
          const weakSlots = [];
          if (!ok1) weakSlots.push(1); if (!ok2) weakSlots.push(2);
          weakSlots.forEach((n) => $(`.slot[data-slot="${n}"]`, s).classList.add('bad'));
          toast(`Jessa: "Tama ang kutob mo, Inspector — pero mahina ang ebidensya sa slot ${weakSlots.join(' at ')}."`);
        }, 900);
      }
      if (run.kape <= 0) {
        later(() => {
          const o = el(`<div class="overlay"><div class="card"><h2>PAGOD NA SI MATEO...</h2><p>Ubos na ang kape. Magtimpla ng panibagong barako at suriin ulit ang ebidensya.</p><button class="btn primary" id="r">MAGTIMPLA (+3☕)</button></div></div>`);
          s.appendChild(o);
          tap($('#r', o), () => { run.kape = 3; o.remove(); const kk = $('.kape', s); kk.outerHTML = kapeHTML(run.kape); });
        }, 1600);
      }
    });
  }

  /* ---------------- ARREST + RESULT ---------------- */
  function arrest(c) {
    const cid = c.solution.culprit, cul = suspectOf(c, cid);
    const panels = [
      { bg: 'interrog', chars: [{ c: 'mateo', x: 150, y: 50, s: 7.4, e: 'shout' }, { c: cid, x: 390, y: 70, s: 7, e: 'shock', flip: true }], beats: [
        { sfx: 'BLAG!', x: 36, y: 60, rot: -12, size: 60, color: '#ffd34a' },
        { b: 'IKAW ANG MAY SALA! Arestado ka!', who: 'Mateo', x: 3, y: 4, w: 46, tail: 'l' }] },
      { bg: 'interrog', chars: [{ c: cid, x: 260, y: 56, s: 7.6, e: 'sad' }], beats: c.confess.map((t, i) => ({ b: t, who: cul.name, x: i ? 50 : 2, y: i ? 46 : 4, w: 48, tail: i ? 'l' : 'r' })) }
    ];
    komiks(panels, () => result(c));
  }

  function result(c) {
    let stars = 3;
    if (run.hints > 1) stars--;
    if (run.timeouts > 0) stars--;
    if (run.wrong > 0) stars--;
    stars = Math.max(1, stars);
    const first = !save.solved[c.id];
    const earn = first ? 50 + stars * 50 : 25 * stars;
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
    tap($('#go', s), () => desk());
    tap($('#again', s), () => startCase(c));
  }

  /* ---------------- CORKBOARD ---------------- */
  function corkboard() {
    SFX.rain(false);
    const got = (id) => save.metas.includes(id);
    const all = METAS.every((m) => got(m.id));
    const pos = [[110, 150, -5], [880, 130, 4], [520, 400, -2]];
    const center = [520, 110];
    let cards = '';
    METAS.forEach((m, i) => {
      const c = caseById(m.caseId), cl = c.clues.find((x) => x.id === m.id), [x, y, r] = pos[i];
      cards += got(m.id)
        ? `<div class="pin-card" style="left:${x}px;top:${y}px;width:260px;height:250px;transform:rotate(${r}deg)"><div class="ph">${ART.sceneThumb(c.scene, cl.x, cl.y, Math.max(60, cl.r * 2.8), false)}</div><div class="cp">${esc(m.name)}</div></div>`
        : `<div class="pin-card unk" style="left:${x}px;top:${y}px;width:260px;height:250px;transform:rotate(${r}deg)"><div class="ph">?</div><div class="cp">${m.from} — hindi pa nalulutas</div></div>`;
    });
    const tatay = `<div class="pin-card" style="left:${center[0]}px;top:${center[1]}px;width:240px;height:260px;transform:rotate(2deg)"><div class="ph" style="background:#cdbf9c">${charSVG('tatay', 'neutral')}</div><div class="cp">SPO4 Ernesto Reyes</div></div>`;
    const anino = `<div class="pin-card" style="left:930px;top:420px;width:220px;height:230px;transform:rotate(-4deg)"><div class="ph" style="background:#111">${charSVG('anino')}</div><div class="cp">ANG ANINO</div></div>`;
    const yarnPts = [[240, 275], [1010, 255], [650, 525], [640, 240], [1040, 535]];
    let yarn = '<svg style="position:absolute;inset:0;width:1280px;height:720px;pointer-events:none;z-index:1" viewBox="0 0 1280 720">';
    METAS.forEach((m, i) => { if (got(m.id)) yarn += `<path d="M${yarnPts[i][0]},${yarnPts[i][1]} Q${(yarnPts[i][0] + 640) / 2},${(yarnPts[i][1] + 240) / 2 + 40} 640,240" stroke="#c0262e" stroke-width="4" fill="none"/>`; });
    if (save.finale) yarn += `<path d="M640,240 Q900,300 1040,535" stroke="#c0262e" stroke-width="5" fill="none" stroke-dasharray="10 6"/>`;
    yarn += '</svg>';
    const s = show(`<div class="screen corkbg">
      <div class="topbar"><button class="back" id="tb-back"><span>↩</span>OPISINA</button><div class="title-txt">CORKBOARD · ANG ANINO<small>${save.metas.length}/3 palatandaan</small></div></div>
      <div class="corkframe"></div>
      ${yarn}
      <div style="position:absolute;inset:0;z-index:2">${tatay}${cards}${anino}
        ${save.finale ? '<div class="cork-note" style="left:60px;top:500px;width:330px;transform:rotate(-3deg)">PRESINTO 13?! Ang dating presinto ni Tatay. May kasabwat sa loob...<br><b>— ITUTULOY</b></div>' : ''}
        ${!all ? '<div class="cork-note" style="left:40px;top:470px;width:300px;transform:rotate(-3deg)">Lutasin ang mga kaso para makakuha ng palatandaan ni Ang Anino.</div>' : ''}
      </div>
      ${all && !save.finale ? `<div class="cork-q" style="z-index:5"><h3>Ano ang nag-uugnay sa tatlong palatandaan?</h3><div class="opts">
        <button class="btn small" data-a="0">Ang kulay itim</button><button class="btn small" data-a="1">Ang numerong 13</button><button class="btn small" data-a="2">Ang Quiapo</button><button class="btn small" data-a="3">Ang uwak</button></div></div>` : ''}
    </div>`);
    tap($('#tb-back', s), () => desk());
    $$('[data-a]', s).forEach((b) => tap(b, () => {
      if (b.dataset.a === '1') { SFX.win(); komiks(FINALE, () => { save.finale = true; save.pesos += 300; persist(); corkboard(); }); }
      else { SFX.bad(); b.disabled = true; toast('Hindi... tingnan mo ulit ang mga numero sa bawat palatandaan.'); }
    }));
  }

  /* ---------------- BOOT ---------------- */
  // expose a tiny debug hook for testing
  window.KASO_DEBUG = { get run() { return run; }, get save() { return save; }, startCase, desk, investigate, files, interrogate, corkboard, result, outline };
  title();
})();
