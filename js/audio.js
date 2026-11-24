/* =========================================================
   KASO — SFX (WebAudio, walang audio file)
   ========================================================= */
(function () {
  'use strict';
  let ctx = null, master = null, rainNode = null, rainGain = null;
  let enabled = true;

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = enabled ? 0.6 : 0; master.connect(ctx.destination);
    } catch (e) { ctx = null; }
  }
  function noiseBuffer(sec) {
    const b = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  function tone(freq, dur, type, vol, when, slide) {
    if (!ctx) return;
    const t = ctx.currentTime + (when || 0);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur, vol, freq, q, when) {
    if (!ctx) return;
    const t = ctx.currentTime + (when || 0);
    const s = ctx.createBufferSource(); s.buffer = noiseBuffer(dur + 0.1);
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq || 1000; f.Q.value = q || 1;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol || 0.3, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.1);
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
    ring() { for (let i = 0; i < 6; i++) { tone(1250, 0.05, 'square', 0.06, i * 0.06); tone(1500, 0.05, 'square', 0.05, i * 0.06 + 0.03); } },
    thunder() { noise(1.8, 0.6, 120, 0.4); noise(0.5, 0.4, 800, 0.6); },
    tick() { tone(1800, 0.02, 'square', 0.03); },
    win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.3, 'triangle', 0.18, i * 0.12)); },
    lose() { [392, 330, 262].forEach((f, i) => tone(f, 0.35, 'sawtooth', 0.08, i * 0.18)); },
    siren() { tone(700, 0.4, 'sawtooth', 0.05, 0, 1000); tone(1000, 0.4, 'sawtooth', 0.05, 0.4, 700); },
    rain(on) {
      if (!ctx) return;
      if (on && !rainNode) {
        rainNode = ctx.createBufferSource(); rainNode.buffer = noiseBuffer(3); rainNode.loop = true;
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400;
        rainGain = ctx.createGain(); rainGain.gain.value = 0.0001;
        rainNode.connect(f); f.connect(rainGain); rainGain.connect(master); rainNode.start();
        rainGain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 1.2);
      } else if (!on && rainNode) {
        const n = rainNode, g = rainGain; rainNode = null; rainGain = null;
        try { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6); n.stop(ctx.currentTime + 0.7); } catch (e) { /* ignore */ }
      }
    },
    setEnabled(v) { enabled = v; if (master) master.gain.value = v ? 0.6 : 0; },
    get enabled() { return enabled; }
  };
  window.SFX = SFX;
})();
