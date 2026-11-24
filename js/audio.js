/* =========================================================
   KASO — SFX + MUSIKA (WebAudio, walang audio file)
   ========================================================= */
(function () {
  'use strict';
  let ctx = null, master = null, sfxBus = null, musBus = null, rainNode = null, rainGain = null;
  let enabled = true, sfxVol = 0.8, musVol = 0.5;
  let mood = null, wantMood = null, timer = null, nextTime = 0, step = 0, lastMel = 0;

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = enabled ? 0.7 : 0; master.connect(ctx.destination);
      sfxBus = ctx.createGain(); sfxBus.gain.value = sfxVol; sfxBus.connect(master);
      musBus = ctx.createGain(); musBus.gain.value = musVol; musBus.connect(master);
      if (wantMood) setMood(wantMood);
    } catch (e) { ctx = null; }
  }
  function noiseBuffer(sec) {
    const b = ctx.createBuffer(1, Math.max(1, ctx.sampleRate * sec), ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  function tone(freq, dur, type, vol, when, slide, bus) {
    if (!ctx) return;
    const t = ctx.currentTime + (when || 0);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || sfxBus); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur, vol, freq, q, when, bus, type) {
    if (!ctx) return;
    const t = ctx.currentTime + (when || 0);
    const s = ctx.createBufferSource(); s.buffer = noiseBuffer(dur + 0.1);
    const f = ctx.createBiquadFilter(); f.type = type || 'bandpass'; f.frequency.value = freq || 1000; f.Q.value = q || 1;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol || 0.3, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(bus || sfxBus); s.start(t); s.stop(t + dur + 0.1);
  }

  /* ---------------- MUSIC ---------------- */
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  function mnote(midi, t, dur, type, vol, cutoff, attack) {
    const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(hz(midi), t);
    f.type = 'lowpass'; f.frequency.value = cutoff || 1200;
    const a = attack || 0.02;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + a); g.gain.setValueAtTime(vol, t + Math.max(a, dur * 0.6)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f); f.connect(g); g.connect(musBus); o.start(t); o.stop(t + dur + 0.05);
  }
  function mnoise(t, dur, vol, freq) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuffer(dur + 0.05);
    const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = freq || 6000;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(musBus); s.start(t); s.stop(t + dur + 0.05);
  }
  const PROG = [
    { root: 45, chord: [57, 60, 64, 67] }, // Am7
    { root: 41, chord: [53, 57, 60, 64] }, // Fmaj7
    { root: 38, chord: [50, 53, 57, 60] }, // Dm7
    { root: 40, chord: [52, 56, 59, 62] }  // E7
  ];
  const PENTA = [69, 72, 74, 76, 79, 81, 84];
  const MOODS = {
    noir: { bpm: 66, play(st, t, e8) {
      const bar = Math.floor(st / 8) % 4, pos = st % 8, c = PROG[bar];
      if (pos === 0) c.chord.forEach((n) => mnote(n, t, e8 * 8, 'triangle', 0.022, 900, 0.3));
      if (pos % 2 === 0) { const walk = [0, 7, 12, 10][pos / 2]; mnote(c.root + walk, t, e8 * 1.8, 'sine', 0.11, 600, 0.01); }
      if (pos % 2 === 1) mnoise(t + e8 * 0.15, 0.05, 0.012, 7000);
      if (pos % 2 === 0 && Math.random() < 0.28 && t - lastMel > e8 * 3) { lastMel = t; const n = PENTA[Math.floor(Math.random() * PENTA.length)]; mnote(n - 12, t, e8 * 3, 'triangle', 0.045, 1800, 0.04); }
    } },
    tension: { bpm: 96, play(st, t, e8) {
      const pos = st % 8, bar = Math.floor(st / 8) % 2;
      mnote(bar ? 41 : 40, t, e8 * 0.9, 'sawtooth', 0.035, 260, 0.01);
      if (pos === 0) { mnote(81, t, e8 * 8, 'sine', 0.012, 3000, 0.5); mnote(82, t, e8 * 8, 'sine', 0.01, 3000, 0.5); }
      if (pos % 2 === 0) mnoise(t, 0.03, 0.02, 8000);
      if (pos === 4 && Math.random() < 0.4) mnote(64 + (Math.random() < .5 ? 0 : 1), t, e8 * 2, 'triangle', 0.03, 1500);
    } },
    room: { bpm: 58, play(st, t, e8) {
      const pos = st % 8;
      if (pos === 0) { mnote(33, t, e8 * 8.2, 'sawtooth', 0.03, 180, 0.6); mnote(40, t, e8 * 8.2, 'triangle', 0.02, 400, 0.6); }
      if (pos === 0 || pos === 4) { mnote(28, t, 0.18, 'sine', 0.22, 200); mnote(28, t + 0.2, 0.16, 'sine', 0.16, 200); }
      if (pos === 6 && Math.random() < 0.3) mnote(75, t, e8 * 3, 'sine', 0.02, 2500, 0.2);
    } },
    win: { bpm: 110, play(st, t, e8) {
      const bar = Math.floor(st / 8) % 2, pos = st % 8;
      const c = bar ? [60, 64, 67, 72] : [57, 60, 64, 69];
      if (pos === 0) c.forEach((n) => mnote(n, t, e8 * 8, 'triangle', 0.03, 1600, 0.05));
      if (pos % 2 === 0) mnote((bar ? 48 : 45) + [0, 7, 12, 7][pos / 2], t, e8 * 1.6, 'sine', 0.1, 700);
      if (pos % 2 === 1) mnoise(t, 0.04, 0.015, 7000);
    } }
  };
  function tick() {
    if (!ctx || !mood) return;
    const m = MOODS[mood], e8 = 60 / m.bpm / 2;
    if (nextTime < ctx.currentTime) nextTime = ctx.currentTime + 0.05;
    while (nextTime < ctx.currentTime + 0.35) { m.play(step, nextTime, e8); nextTime += e8; step++; }
  }
  function setMood(m) {
    wantMood = m;
    if (!ctx) return;
    if (m === mood) return;
    mood = m; step = 0; nextTime = ctx.currentTime + 0.1;
    if (!timer) timer = setInterval(tick, 90);
    if (!m) { clearInterval(timer); timer = null; }
  }

  const SFX = {
    init,
    click() { tone(900, 0.05, 'square', 0.05); },
    tap() { noise(0.04, 0.25, 2500, 2); },
    type() { noise(0.03, 0.35, 3200, 3); tone(140, 0.03, 'square', 0.04); },
    good() { tone(660, 0.12, 'triangle', 0.22); tone(990, 0.22, 'triangle', 0.2, 0.09); },
    bad() { tone(160, 0.25, 'sawtooth', 0.12, 0, 90); },
    flip() { noise(0.12, 0.25, 1800, 0.8); },
    stamp() { tone(90, 0.25, 'sine', 0.5, 0, 40); noise(0.18, 0.5, 400, 0.7); },
    slam() { tone(70, 0.4, 'sine', 0.6, 0, 30); noise(0.3, 0.7, 250, 0.5); },
    objection() { tone(520, 0.12, 'square', 0.12); tone(780, 0.3, 'square', 0.12, 0.1); noise(0.2, 0.4, 600, 0.6); },
    ring() { for (let i = 0; i < 6; i++) { tone(1250, 0.05, 'square', 0.06, i * 0.06); tone(1500, 0.05, 'square', 0.05, i * 0.06 + 0.03); } },
    thunder() { noise(1.8, 0.6, 120, 0.4); noise(0.5, 0.4, 800, 0.6); },
    tick() { tone(1800, 0.02, 'square', 0.03); },
    win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.3, 'triangle', 0.18, i * 0.12)); },
    lose() { [392, 330, 262].forEach((f, i) => tone(f, 0.35, 'sawtooth', 0.08, i * 0.18)); },
    siren() { tone(700, 0.4, 'sawtooth', 0.05, 0, 1000); tone(1000, 0.4, 'sawtooth', 0.05, 0.4, 700); },
    medal() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.25, 'sine', 0.12, i * 0.08)); },
    rain(on) {
      if (!ctx) return;
      if (on && !rainNode) {
        rainNode = ctx.createBufferSource(); rainNode.buffer = noiseBuffer(3); rainNode.loop = true;
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400;
        rainGain = ctx.createGain(); rainGain.gain.value = 0.0001;
        rainNode.connect(f); f.connect(rainGain); rainGain.connect(sfxBus); rainNode.start();
        rainGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);
      } else if (!on && rainNode) {
        const n = rainNode, g = rainGain; rainNode = null; rainGain = null;
        try { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6); n.stop(ctx.currentTime + 0.7); } catch (e) { /* ignore */ }
      }
    },
    music(m) { setMood(m); },
    setEnabled(v) { enabled = v; if (master) master.gain.value = v ? 0.7 : 0; },
    setSfxVol(v) { sfxVol = v; if (sfxBus) sfxBus.gain.value = v; },
    setMusicVol(v) { musVol = v; if (musBus) musBus.gain.value = v; },
    get enabled() { return enabled; }
  };
  window.SFX = SFX;
})();
