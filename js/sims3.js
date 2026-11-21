/* Scibook labs, part 3: added labs for existing chapters and the olympiad-extension chapters. */
(function () {
  'use strict';
  const PB = window.PB, U = PB.simUtil;

  /* =============== Blackbody spectrum (Ch11, Ch23) =============== */
  PB.sims.blackbody = function (api) {
    const cv = api.canvas(0.56);
    const T = api.slider({ id: 'T', label: 'Temperature T', min: 1000, max: 12000, step: 100, value: 5800, unit: 'K', onChange: () => draw() });
    const cmp = api.check({ id: 'c', label: 'Compare with the Sun (5800 K)', value: true, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const h = 6.626e-34, c = 2.998e8, k = 1.381e-23;
    const B = (lam, t) => (2 * h * c * c) / Math.pow(lam, 5) / (Math.exp((h * c) / (lam * k * t)) - 1);
    function draw() {
      const C = api.colors(), ctx = cv.ctx, t = T.value;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const lmax = 3000, peak = Math.max(B(2.898e-3 / t, t), cmp.value ? B(2.898e-3 / 5800, 5800) : 0);
      const b = { x: 50, y: 16, w: cv.w - 64, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, lmax], [0, peak * 1.1], { xlabel: 'wavelength (nm)', ylabel: 'spectral radiance', noLabels: false, yfmt: () => '' });
      for (let nm = 380; nm < 750; nm += 4) { const rgb = U.wl2rgb(nm); ctx.fillStyle = 'rgba(' + rgb.join(',') + ',0.35)'; ctx.fillRect(m.X(nm), b.y, m.X(nm + 4) - m.X(nm) + 0.5, b.h); }
      const curve = (tt) => { const pts = []; for (let i = 1; i <= 300; i++) { const nm = (lmax * i) / 300; pts.push([m.X(nm), m.Y(B(nm * 1e-9, tt))]); } return pts; };
      if (cmp.value) U.curve(ctx, curve(5800), U.alpha(C.ink3, 0.9), 1.5, [5, 4]);
      U.curve(ctx, curve(t), C.points, 2.5);
      const lp = 2.898e6 / t;
      if (lp < lmax) { ctx.strokeStyle = U.alpha(C.points, 0.7); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(m.X(lp), b.y); ctx.lineTo(m.X(lp), b.y + b.h); ctx.stroke(); ctx.setLineDash([]); }
      // perceived colour swatch: integrate over visible band
      let rr = 0, gg = 0, bb = 0;
      for (let nm = 400; nm <= 700; nm += 10) { const w = B(nm * 1e-9, t), col = U.wl2rgb(nm); rr += w * col[0]; gg += w * col[1]; bb += w * col[2]; }
      const mx = Math.max(rr, gg, bb) || 1;
      ctx.fillStyle = 'rgb(' + [rr, gg, bb].map((v) => Math.round((255 * v) / mx)).join(',') + ')';
      ctx.beginPath(); ctx.arc(b.x + b.w - 30, b.y + 30, 18, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = C.line; ctx.stroke();
      U.text(ctx, 'colour', b.x + b.w - 30, b.y + 62, C.ink2, U.ui(11), 'center');
      const P = 5.670e-8 * Math.pow(t, 4);
      out([['peak λ (Wien)', lp.toFixed(0) + ' nm'], ['power per m² σT⁴', U.fmt(P, 3) + ' W/m²'], ['relative to the Sun', (P / (5.670e-8 * Math.pow(5800, 4))).toFixed(2) + '×'], ['peak photon energy', (1240 / lp).toFixed(2) + ' eV']]);
    }
    draw();
  };

  /* =============== Magnetic field of parallel wires (Ch15) =============== */
  PB.sims.wires = function (api) {
    const cv = api.canvas(0.62);
    let wires = [];
    const preset = api.select({ id: 'p', label: 'Arrangement', value: 'same', options: [['same', 'Two wires, currents in the same direction'], ['opp', 'Two wires, opposite currents'], ['one', 'One wire'], ['four', 'Four wires in a square'], ['line', 'A row of wires (current sheet)']], onChange: (v) => load(v) });
    const out = api.readout();
    let probe = null, img = null, dirty = true;
    cv.onResize = () => load(preset.value);
    function load(v) {
      const cx = cv.w / 2, cy = cv.h / 2, d = Math.min(cv.w, cv.h) * 0.18;
      wires = { one: [[cx, cy, 1]], same: [[cx - d, cy, 1], [cx + d, cy, 1]], opp: [[cx - d, cy, 1], [cx + d, cy, -1]], four: [[cx - d, cy - d, 1], [cx + d, cy - d, -1], [cx + d, cy + d, 1], [cx - d, cy + d, -1]], line: [] }[v].map((w) => ({ x: w[0], y: w[1], I: w[2] }));
      if (v === 'line') for (let i = -6; i <= 6; i++) wires.push({ x: cx + i * d * 0.3, y: cy, I: 1 });
      dirty = true;
    }
    function B(x, y) { let bx = 0, by = 0; for (const w of wires) { const dx = x - w.x, dy = w.y - y, r2 = dx * dx + dy * dy + 30; /* dy measured upward */ bx += (-w.I * dy) / r2; by += (w.I * dx) / r2; } return [bx, by]; }
    U.pointer(cv, { move: (p) => { probe = p; }, leave: () => { probe = null; } });
    function render() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const step = 26;
      for (let x = step / 2; x < cv.w; x += step) for (let y = step / 2; y < cv.h; y += step) {
        const b = B(x, y), m = Math.hypot(b[0], b[1]); if (m < 1e-9) continue;
        const L = Math.min(11, 2 + Math.log10(1 + m * 3000) * 4), a = Math.min(0.9, 0.25 + m * 30);
        // canvas y points down, so flip the y component for display
        U.arrow(ctx, x - (b[0] / m) * L, y + (b[1] / m) * L, x + (b[0] / m) * L, y - (b[1] / m) * L, U.alpha(C.accent, a), 1.4, 5);
      }
      wires.forEach((w) => { U.dot(ctx, w.x, w.y, 9, w.I > 0 ? C.rust : C.teal, C.surface); U.text(ctx, w.I > 0 ? '•' : '×', w.x, w.y + 5, '#fff', U.ui(15, 800), 'center'); });
      img = ctx.getImageData(0, 0, cv.el.width, cv.el.height); dirty = false;
    }
    api.loop(() => {
      if (dirty) render(); else if (img) cv.ctx.putImageData(img, 0, 0);
      if (probe) { const b = B(probe.x, probe.y); U.dot(cv.ctx, probe.x, probe.y, 4, api.colors().points); out([['|B| at pointer', (Math.hypot(b[0], b[1]) * 1000).toFixed(2) + ' (rel.)'], ['wires', String(wires.length)], ['symbols', '• out of page, × into page']]); }
      else out([['wires', String(wires.length)], ['symbols', '• current out of page, × into page'], ['tip', 'hover to probe |B|']]);
    });
    PB.on((ev) => { if (ev.type === 'theme') dirty = true; });
    load('same');
  };

  /* =============== Magnet falling through a coil (Ch16) =============== */
  PB.sims.fallmagnet = function (api) {
    const cv = api.canvas(0.56);
    const N = api.slider({ id: 'N', label: 'Turns on the coil', min: 50, max: 500, step: 10, value: 200 });
    const h0 = api.slider({ id: 'h', label: 'Drop height above the coil', min: 0.05, max: 1, step: 0.01, value: 0.3, unit: 'm' });
    const flip = api.check({ id: 'f', label: 'Flip the magnet (S pole first)', value: false });
    api.buttons([{ label: 'Drop', primary: true, onClick: reset }]);
    const out = api.readout();
    let z, v, t, hist, peak, area1 = 0, area2 = 0;
    cv.onResize = () => {};
    const a = 0.05, m0 = 1; // coil radius (m), magnet moment (arbitrary)
    // flux through a loop from a dipole at axial distance z: Phi ∝ m a² / (a² + z²)^(3/2)
    const flux = (zz) => (m0 * a * a) / Math.pow(a * a + zz * zz, 1.5) * 1e-6;
    function reset() { z = h0.value; v = 0; t = 0; hist = []; peak = 0; area1 = 0; area2 = 0; }
    function step(dt) {
      const n = 20, hs = dt / n;
      for (let i = 0; i < n; i++) {
        const p1 = flux(z); v += 9.8 * hs; z -= v * hs; t += hs;
        const emf = (-N.value * (flux(z) - p1)) / hs * (flip.value ? -1 : 1);
        if (emf > 0) area1 += emf * hs; else area2 -= emf * hs;
        if (i === n - 1) { hist.push([t, emf, N.value * flux(z)]); peak = Math.max(peak, Math.abs(emf)); }
      }
      if (hist.length > 1500) hist.shift();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const lw = Math.max(120, cv.w * 0.24), sc = (cv.h - 40) / 1.6, cy = 20 + 1.05 * sc;
      const coilY = cy;
      for (let i = -3; i <= 3; i++) { ctx.strokeStyle = C.rust; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(lw / 2, coilY + i * 4, 34, 8, 0, 0, Math.PI * 2); ctx.stroke(); }
      const my = cy - z * sc;
      ctx.fillStyle = flip.value ? C.accent : C.rust; ctx.fillRect(lw / 2 - 10, my - 26, 20, 26);
      ctx.fillStyle = flip.value ? C.rust : C.accent; ctx.fillRect(lw / 2 - 10, my, 20, 26);
      U.text(ctx, flip.value ? 'S' : 'N', lw / 2, my + 18, '#fff', U.ui(11, 800), 'center');
      const tmax = Math.max(1, t);
      const b1 = { x: lw + 40, y: 14, w: cv.w - lw - 52, h: cv.h * 0.38 }, b2 = { x: lw + 40, y: cv.h * 0.38 + 44, w: cv.w - lw - 52, h: cv.h * 0.62 - 74 };
      const fmax = N.value * flux(0) * 1.1, emax = Math.max(peak, 1e-6) * 1.1;
      const m1 = U.frame(ctx, C, b1, [0, tmax], [0, fmax], { ylabel: 'flux linkage NΦ', yfmt: () => '', ny: 2 });
      const m2 = U.frame(ctx, C, b2, [0, tmax], [-emax, emax], { xlabel: 't (s)', ylabel: 'emf', yfmt: () => '', ny: 2 });
      U.curve(ctx, hist.map((q) => [m1.X(q[0]), m1.Y(q[2])]), C.accent, 2);
      U.curve(ctx, hist.map((q) => [m2.X(q[0]), m2.Y(q[1])]), C.rust, 2);
      out([['speed now', v.toFixed(2) + ' m/s'], ['peak emf (rel.)', (peak * 1e3).toFixed(2)], ['area of + pulse', (area1 * 1e6).toFixed(2)], ['area of − pulse', (area2 * 1e6).toFixed(2)]]);
    }
    api.loop((dt) => { if (z > -0.6) step(dt * 0.35); draw(); });
    reset();
  };

  /* =============== Draining tank (Ch9) =============== */
  PB.sims.tank = function (api) {
    const cv = api.canvas(0.58);
    const H0 = api.slider({ id: 'h', label: 'Initial water depth', min: 0.2, max: 2, step: 0.05, value: 1.2, unit: 'm', onChange: reset });
    const ratio = api.slider({ id: 'r', label: 'Hole area / tank area', min: 0.002, max: 0.05, step: 0.001, value: 0.01, onChange: reset });
    const hole = api.slider({ id: 'y', label: 'Hole height above floor', min: 0, max: 0.5, step: 0.05, value: 0, unit: 'm', onChange: reset });
    api.buttons([{ label: 'Refill', primary: true, onClick: reset }]);
    const out = api.readout();
    let hgt, t, hist;
    cv.onResize = () => {};
    function reset() { hgt = H0.value; t = 0; hist = [[0, hgt]]; }
    function step(dt) {
      const n = 10, hs = dt / n;
      for (let i = 0; i < n; i++) { const head = Math.max(0, hgt - hole.value); hgt -= ratio.value * Math.sqrt(2 * 9.8 * head) * hs; t += hs; }
      if (hist.length < 2000) hist.push([t, hgt]);
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const tw = Math.min(cv.w * 0.45, 300), sc = (cv.h - 40) / 2.2, base = cv.h - 20, tx = 24, tankW = tw * 0.4;
      ctx.fillStyle = U.alpha(C.accent, 0.25); ctx.fillRect(tx, base - hgt * sc, tankW, hgt * sc);
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx, base - 2.1 * sc); ctx.lineTo(tx, base); ctx.lineTo(tx + tankW, base); ctx.lineTo(tx + tankW, base - 2.1 * sc); ctx.stroke();
      const head = Math.max(0, hgt - hole.value), v = Math.sqrt(2 * 9.8 * head), hy = base - hole.value * sc;
      if (head > 0.001) {
        const pts = []; for (let k = 0; k <= 40; k++) { const tt = k * 0.012; const x = v * tt, y = 0.5 * 9.8 * tt * tt; if (hole.value - y < 0) break; pts.push([tx + tankW + x * sc, hy + y * sc]); }
        U.curve(ctx, pts, U.alpha(C.accent, 0.8), Math.max(2, Math.sqrt(ratio.value) * 40));
      }
      const b = { x: tx + tw + 40, y: 14, w: cv.w - tx - tw - 52, h: cv.h - 46 };
      if (b.w > 80) {
        const T = Math.sqrt((2 * (H0.value - hole.value)) / 9.8) / ratio.value;
        const m = U.frame(ctx, C, b, [0, T * 1.05], [0, H0.value * 1.05], { xlabel: 't (s)', ylabel: 'depth (m)', ny: 3 });
        const th = []; for (let i = 0; i <= 60; i++) { const tt = (T * i) / 60, s = Math.sqrt(H0.value - hole.value) - (ratio.value * Math.sqrt(2 * 9.8) * tt) / 2; th.push([m.X(tt), m.Y(hole.value + Math.max(0, s) * Math.max(0, s))]); }
        U.curve(ctx, th, U.alpha(C.ink, 0.5), 1.5, [5, 4]);
        U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[1])]), C.accent, 2.5);
      }
      out([['jet speed √(2gh)', v.toFixed(2) + ' m/s'], ['depth now', hgt.toFixed(3) + ' m'], ['time', t.toFixed(1) + ' s'], ['predicted drain time', (Math.sqrt((2 * (H0.value - hole.value)) / 9.8) / ratio.value).toFixed(1) + ' s']]);
    }
    api.loop((dt) => { if (hgt - hole.value > 1e-4) step(dt * 4); draw(); });
    reset();
  };

  /* =============== Rocket staging (Ch5) =============== */
  PB.sims.rocket = function (api) {
    const cv = api.canvas(0.56);
    const u = api.slider({ id: 'u', label: 'Exhaust speed u', min: 1500, max: 4500, step: 100, value: 3500, unit: 'm/s', onChange: reset });
    const pay = api.slider({ id: 'p', label: 'Payload fraction of launch mass', min: 0.01, max: 0.15, step: 0.005, value: 0.04, format: (v) => (v * 100).toFixed(1) + '%', onChange: reset });
    const eps = api.slider({ id: 'e', label: 'Tank and engine mass (fraction of each stage)', min: 0.04, max: 0.2, step: 0.01, value: 0.1, format: (v) => (v * 100).toFixed(0) + '%', onChange: reset });
    const stages = api.select({ id: 's', label: 'Stages', value: '1', options: [['1', 'Single stage'], ['2', 'Two stages'], ['3', 'Three stages'], ['4', 'Four stages']], onChange: reset });
    api.buttons([{ label: 'Launch', primary: true, onClick: reset }]);
    const out = api.readout();
    let frac;
    cv.onResize = () => {};
    // Each stage (fuel + structure) is the same fraction of the mass it lifts, so the n stages together leave the payload.
    function design() {
      const n = +stages.value, ps = Math.pow(pay.value, 1 / n), burnt = (1 - eps.value) * (1 - ps);
      const dvs = u.value * Math.log(1 / (1 - burnt));
      return { n: n, ps: ps, burnt: burnt, dvs: dvs, total: n * dvs };
    }
    function reset() { frac = 0; }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, d = design();
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 16, w: cv.w - 200, h: cv.h - 50 };
      const ymax = Math.max(12, d.total / 1000 * 1.15);
      const m = U.frame(ctx, C, b, [0, 1], [0, ymax], { xlabel: 'burn progress', ylabel: 'speed (km/s)', ny: 4, nx: 4 });
      const vAt = (x) => { const k = Math.min(d.n - 1, Math.floor(x * d.n)), xx = x * d.n - k; return (k * d.dvs + u.value * Math.log(1 / (1 - d.burnt * xx))) / 1000; };
      const pts = []; for (let i = 0; i <= 200; i++) pts.push([m.X(i / 200), m.Y(vAt(i / 200))]);
      U.curve(ctx, pts, U.alpha(C.ink3, 0.5), 1.5, [5, 4]);
      U.curve(ctx, pts.slice(0, Math.floor(frac * 200) + 1), C.points, 2.5);
      ctx.strokeStyle = U.alpha(C.good, 0.8); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(b.x, m.Y(9.4)); ctx.lineTo(b.x + b.w, m.Y(9.4)); ctx.stroke(); ctx.setLineDash([]);
      U.text(ctx, 'needed for low Earth orbit ≈ 9.4 km/s', b.x + b.w - 6, m.Y(9.4) - 5, C.good, U.ui(11), 'right');
      const rx = cv.w - 90, top = 40, H = cv.h - 80, segH = H / d.n;
      for (let k = 0; k < d.n; k++) {
        const y = top + (d.n - 1 - k) * segH, burnt = Math.min(1, Math.max(0, frac * d.n - k));
        if (burnt >= 1 && k < d.n - 1) { ctx.strokeStyle = U.alpha(C.ink3, 0.4); ctx.setLineDash([3, 3]); ctx.strokeRect(rx - 18, y, 36, segH - 4); ctx.setLineDash([]); continue; }
        ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.strokeRect(rx - 18, y, 36, segH - 4);
        ctx.fillStyle = U.alpha(C.rust, 0.7); ctx.fillRect(rx - 17, y + (segH - 4) * burnt, 34, (segH - 4) * (1 - burnt));
      }
      ctx.fillStyle = C.accent; ctx.beginPath(); ctx.moveTo(rx - 18, top); ctx.lineTo(rx, top - 24); ctx.lineTo(rx + 18, top); ctx.fill();
      if (frac < 1) { ctx.fillStyle = C.points; ctx.beginPath(); ctx.moveTo(rx - 12, top + H); ctx.lineTo(rx, top + H + 16 + 6 * Math.random()); ctx.lineTo(rx + 12, top + H); ctx.fill(); }
      const single = u.value * Math.log(1 / (1 - (1 - eps.value) * (1 - pay.value)));
      out([['total Δv', (d.total / 1000).toFixed(2) + ' km/s'], ['same payload, single stage', (single / 1000).toFixed(2) + ' km/s'], ['Δv per stage', (d.dvs / 1000).toFixed(2) + ' km/s'], ['reaches orbit?', d.total > 9400 ? 'yes' : 'no']]);
    }
    api.loop((dt) => { if (frac < 1) frac = Math.min(1, frac + dt * 0.25); draw(); });
    reset();
  };

  /* =============== Light clock (Ch19) =============== */
  PB.sims.lightclock = function (api) {
    const cv = api.canvas(0.55);
    const beta = api.slider({ id: 'b', label: 'Speed of the moving clock β = v/c', min: 0, max: 0.95, step: 0.01, value: 0.6 });
    const out = api.readout();
    let tt = 0, ticksRest = 0, ticksMove = 0;
    cv.onResize = () => {};
    function draw(dt) {
      const C = api.colors(), ctx = cv.ctx, b = beta.value, g = 1 / Math.sqrt(1 - b * b);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const Lpx = cv.h * 0.32, c = Lpx * 1.6; // px per second of animation
      tt += dt;
      const Trest = (2 * Lpx) / c, Tmove = g * Trest;
      ticksRest = Math.floor(tt / Trest); ticksMove = Math.floor(tt / Tmove);
      const drawClock = (x0, ybase, phase, T, label, moving) => {
        const f = (phase % T) / T, y = f < 0.5 ? ybase - 2 * f * Lpx : ybase - 2 * (1 - f) * Lpx;
        const cx = moving ? x0 + ((b * c * tt) % (cv.w * 0.55)) : x0;
        ctx.strokeStyle = C.ink2; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx - 22, ybase); ctx.lineTo(cx + 22, ybase); ctx.moveTo(cx - 22, ybase - Lpx); ctx.lineTo(cx + 22, ybase - Lpx); ctx.stroke();
        if (moving) {
          const trail = []; for (let k = 0; k <= 60; k++) { const ph = phase - (k / 60) * T * 0.9; if (ph < 0) break; const ff = (ph % T) / T; trail.push([cx - b * c * (phase - ph), ff < 0.5 ? ybase - 2 * ff * Lpx : ybase - 2 * (1 - ff) * Lpx]); }
          U.curve(ctx, trail, U.alpha(C.points, 0.5), 1.5);
        }
        U.dot(ctx, cx, y, 5, C.points);
        U.text(ctx, label, cx - 22, ybase + 18, C.ink2, U.ui(12, 700));
      };
      const yb = cv.h - 30;
      drawClock(60, yb, tt, Trest, 'clock at rest', false);
      drawClock(180, yb, tt, Tmove, 'moving clock', true);
      out([['γ', g.toFixed(3)], ['ticks: clock at rest', String(ticksRest)], ['ticks: moving clock', String(ticksMove)], ['moving clock rate', (100 / g).toFixed(1) + '% of normal']]);
      if (tt > 60) tt = 0;
    }
    api.loop((dt) => draw(dt));
  };

  /* =============== Double pendulum (Ch22) =============== */
  PB.sims.doublependulum = function (api) {
    const cv = api.canvas(0.62);
    const a0 = api.slider({ id: 'a', label: 'Starting angle of both arms', min: 5, max: 175, step: 1, value: 120, unit: '°', onChange: reset });
    const eps = api.slider({ id: 'e', label: 'Difference between the two copies', min: -6, max: -1, step: 1, value: -4, format: (v) => '10^' + v + ' rad', onChange: reset });
    api.buttons([{ label: 'Restart', primary: true, onClick: reset }]);
    const out = api.readout();
    let s1, s2, trail1, trail2, t;
    cv.onResize = () => {};
    const g = 9.8, L = 1, m = 1;
    function deriv(s) {
      const [t1, t2, w1, w2] = s, d = t1 - t2;
      const den = 3 - Math.cos(2 * d);
      const a1 = (-g * (2 * m + m) * Math.sin(t1) / L - m * g * Math.sin(t1 - 2 * t2) / L - 2 * Math.sin(d) * m * (w2 * w2 * L + w1 * w1 * L * Math.cos(d)) / L) / (m * den);
      const a2 = (2 * Math.sin(d) * (w1 * w1 * L * 2 * m + g * 2 * m * Math.cos(t1) + w2 * w2 * L * m * Math.cos(d))) / (L * m * den);
      return [w1, w2, a1, a2];
    }
    function rk(s, h) {
      const k1 = deriv(s), k2 = deriv(s.map((v, i) => v + (h / 2) * k1[i])), k3 = deriv(s.map((v, i) => v + (h / 2) * k2[i])), k4 = deriv(s.map((v, i) => v + h * k3[i]));
      return s.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }
    function reset() { const a = a0.value * Math.PI / 180; s1 = [a, a, 0, 0]; s2 = [a + Math.pow(10, eps.value), a, 0, 0]; trail1 = []; trail2 = []; t = 0; }
    function pos(s, ox, oy, sc) { const x1 = ox + sc * Math.sin(s[0]), y1 = oy + sc * Math.cos(s[0]); return [x1, y1, x1 + sc * Math.sin(s[1]), y1 + sc * Math.cos(s[1])]; }
    function energy(s) { const [t1, t2, w1, w2] = s; return 0.5 * m * L * L * (2 * w1 * w1 + w2 * w2 + 2 * w1 * w2 * Math.cos(t1 - t2)) - m * g * L * (2 * Math.cos(t1) + Math.cos(t2)); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const sc = Math.min(cv.w, cv.h) * 0.22, ox = cv.w / 2, oy = cv.h / 2 - 10;
      U.curve(ctx, trail1, U.alpha(C.accent, 0.45), 1.2); U.curve(ctx, trail2, U.alpha(C.rust, 0.45), 1.2);
      [[s1, C.accent], [s2, C.rust]].forEach(([s, col]) => {
        const p = pos(s, ox, oy, sc);
        ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(p[0], p[1]); ctx.lineTo(p[2], p[3]); ctx.stroke();
        U.dot(ctx, p[0], p[1], 7, col); U.dot(ctx, p[2], p[3], 7, col);
      });
      U.dot(ctx, ox, oy, 4, C.ink);
      const sep = Math.hypot(...[0, 1].map((i) => Math.atan2(Math.sin(s1[i] - s2[i]), Math.cos(s1[i] - s2[i]))));
      out([['time', t.toFixed(1) + ' s'], ['separation of copies', sep < 1e-3 ? sep.toExponential(1) + ' rad' : sep.toFixed(3) + ' rad'], ['energy drift (copy 1)', (energy(s1) - energy([a0.value * Math.PI / 180, a0.value * Math.PI / 180, 0, 0])).toExponential(1) + ' J']]);
    }
    api.loop((dt) => {
      const n = 20, h = Math.min(dt, 0.03) / n;
      for (let i = 0; i < n; i++) { s1 = rk(s1, h); s2 = rk(s2, h); t += h; }
      const sc = Math.min(cv.w, cv.h) * 0.22, p1 = pos(s1, cv.w / 2, cv.h / 2 - 10, sc), p2 = pos(s2, cv.w / 2, cv.h / 2 - 10, sc);
      trail1.push([p1[2], p1[3]]); trail2.push([p2[2], p2[3]]); if (trail1.length > 400) { trail1.shift(); trail2.shift(); }
      draw();
    });
    reset();
  };

  /* =============== Effective potential (Ch22) =============== */
  PB.sims.effpot = function (api) {
    const cv = api.canvas(0.56);
    const L = api.slider({ id: 'L', label: 'Angular momentum L', min: 0.3, max: 2, step: 0.01, value: 1, onChange: () => draw() });
    const E = api.slider({ id: 'E', label: 'Energy E', min: -1, max: 0.6, step: 0.01, value: -0.3, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const Ueff = (r) => (L.value * L.value) / (2 * r * r) - 1 / r;
      const b = { x: 50, y: 16, w: cv.w - 64, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 8], [-1.2, 0.8], { xlabel: 'r', ylabel: 'U_eff', ny: 4 });
      U.clip(ctx, b);
      const pts = []; for (let i = 1; i <= 400; i++) { const r = (8 * i) / 400; pts.push([m.X(r), m.Y(Ueff(r))]); }
      U.curve(ctx, pts, C.accent, 2.5);
      const p2 = []; for (let i = 1; i <= 400; i++) { const r = (8 * i) / 400; p2.push([m.X(r), m.Y(-1 / r)]); }
      U.curve(ctx, p2, U.alpha(C.ink3, 0.7), 1.2, [4, 4]);
      ctx.strokeStyle = C.points; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(b.x, m.Y(E.value)); ctx.lineTo(b.x + b.w, m.Y(E.value)); ctx.stroke();
      // turning points: E = L²/2r² − 1/r → E r² + r − L²/2 = 0
      const e = E.value, l2 = L.value * L.value, roots = [];
      if (Math.abs(e) < 1e-9) roots.push(l2 / 2);
      else { const disc = 1 + 2 * e * l2; if (disc >= 0) [(-1 + Math.sqrt(disc)) / (2 * e), (-1 - Math.sqrt(disc)) / (2 * e)].forEach((r) => { if (r > 0) roots.push(r); }); }
      roots.forEach((r) => U.dot(ctx, m.X(r), m.Y(e), 5, C.points, C.ink));
      ctx.restore();
      const rmin = l2, Emin = -1 / (2 * l2);
      let kind = 'no motion (E below the minimum)';
      if (e >= Emin - 1e-9) kind = e < -1e-9 ? (Math.abs(e - Emin) < 0.005 ? 'circular orbit' : 'bound: ellipse between the turning points') : e > 1e-9 ? 'unbound: hyperbola' : 'parabola';
      roots.sort((a, b2) => a - b2);
      out([['orbit', kind], ['circular orbit radius L²', rmin.toFixed(3)], ['minimum energy', Emin.toFixed(3)], ['turning points', roots.length ? roots.map((r) => r.toFixed(3)).join(', ') : '—'], ['eccentricity', Math.sqrt(Math.max(0, 1 + 2 * e * l2)).toFixed(3)]]);
    }
    draw();
  };

  /* =============== Exoplanet transit (Ch23) =============== */
  PB.sims.transit = function (api) {
    const cv = api.canvas(0.56);
    const rp = api.slider({ id: 'r', label: 'Planet radius / star radius', min: 0.02, max: 0.3, step: 0.005, value: 0.1 });
    const bimp = api.slider({ id: 'b', label: 'Impact parameter b (in star radii)', min: 0, max: 1.2, step: 0.01, value: 0.3 });
    const ld = api.check({ id: 'l', label: 'Limb darkening', value: true });
    const out = api.readout();
    let ph = -1.4, hist = [];
    cv.onResize = () => {};
    // Fraction of starlight still seen: integrate surface brightness over the part of the planet's disc that lies on the star.
    function flux(x, y) {
      const p = rp.value, n = 30, cell = (2 * p / n) * (2 * p / n);
      const I = (r) => (ld.value ? 1 - 0.6 * (1 - Math.sqrt(Math.max(0, 1 - r * r))) : 1);
      const total = ld.value ? Math.PI * (1 - 0.6 / 3) : Math.PI;
      let blocked = 0;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const du = p * (-1 + (2 * (i + 0.5)) / n), dv = p * (-1 + (2 * (j + 0.5)) / n);
        if (du * du + dv * dv > p * p) continue;
        const r = Math.hypot(x + du, y + dv);
        if (r <= 1) blocked += I(r) * cell;
      }
      return 1 - blocked / total;
    }
    function draw(dt) {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      ph += dt * 0.35; if (ph > 1.4) { ph = -1.4; hist = []; }
      const R0 = Math.min(cv.h * 0.22, cv.w * 0.14), cx = R0 + 24, cy = R0 + 20;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R0);
      grad.addColorStop(0, '#fff3c4'); grad.addColorStop(1, ld.value ? '#e8862a' : '#ffd36b');
      ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.dark ? '#0b0f18' : '#1b2236'; ctx.beginPath(); ctx.arc(cx + ph * R0, cy + bimp.value * R0, rp.value * R0, 0, Math.PI * 2); ctx.fill();
      const fl = flux(ph, bimp.value); hist.push([ph, fl]);
      const depth = rp.value * rp.value;
      const b = { x: 2 * R0 + 70, y: 16, w: cv.w - 2 * R0 - 84, h: cv.h - 50 };
      if (b.w > 80) {
        const lo = Math.max(0, 1 - depth * 1.8 - 0.002);
        const m = U.frame(ctx, C, b, [-1.4, 1.4], [lo, 1.002], { xlabel: 'time (arbitrary)', ylabel: 'relative brightness', ny: 3, xfmt: () => '' , yfmt: (v) => v.toFixed(3) });
        U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[1])]), C.points, 2.5);
      }
      out([['depth ≈ (R<sub>p</sub>/R<sub>*</sub>)²', (depth * 100).toFixed(2) + '%'], ['brightness now', (fl * 100).toFixed(3) + '%'], ['Jupiter-Sun depth', '1.0%'], ['Earth-Sun depth', '0.008%']]);
    }
    api.loop((dt) => draw(dt));
  };

  /* =============== Measuring g with a pendulum: data and fits (Ch24) =============== */
  PB.sims.fitlab = function (api) {
    const cv = api.canvas(0.58);
    const N = api.slider({ id: 'n', label: 'Number of lengths measured', min: 3, max: 15, step: 1, value: 6, format: (v) => String(v), onChange: () => draw() });
    const sig = api.slider({ id: 's', label: 'Timing uncertainty (one period)', min: 0.005, max: 0.1, step: 0.005, value: 0.03, unit: 's', onChange: () => draw() });
    const sys = api.slider({ id: 'k', label: 'Systematic error: unmeasured length offset', min: -0.05, max: 0.05, step: 0.005, value: 0, unit: 'm', onChange: () => draw() });
    api.buttons([{ label: 'Take new data', primary: true, onClick: () => { seed = (Math.random() * 1e9) | 0; draw(); } }]);
    const out = api.readout();
    let seed = 12345;
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx, r = PB.rng(seed), gauss = () => Math.sqrt(-2 * Math.log(r() + 1e-12)) * Math.cos(2 * Math.PI * r());
      ctx.clearRect(0, 0, cv.w, cv.h);
      const n = N.value, pts = [];
      for (let i = 0; i < n; i++) {
        const L = 0.2 + (1.3 * i) / Math.max(1, n - 1), Ttrue = 2 * Math.PI * Math.sqrt((L + sys.value) / 9.81);
        const T = Ttrue + sig.value * gauss();
        pts.push([L, T * T, 2 * T * sig.value]);
      }
      // weighted least squares for y = a + b x
      let S = 0, Sx = 0, Sy = 0, Sxx = 0, Sxy = 0;
      pts.forEach(([x, y, e]) => { const w = 1 / (e * e); S += w; Sx += w * x; Sy += w * y; Sxx += w * x * x; Sxy += w * x * y; });
      const D = S * Sxx - Sx * Sx, bS = (S * Sxy - Sx * Sy) / D, aI = (Sxx * Sy - Sx * Sxy) / D, sb = Math.sqrt(S / D), sa = Math.sqrt(Sxx / D);
      const chi2 = pts.reduce((a, [x, y, e]) => a + Math.pow((y - aI - bS * x) / e, 2), 0);
      const gfit = (4 * Math.PI * Math.PI) / bS, sg = (gfit * sb) / bS;
      const b = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 1.6], [-0.2, 6.5], { xlabel: 'L (m)', ylabel: 'T² (s²)', ny: 4 });
      U.curve(ctx, [[m.X(0), m.Y(aI)], [m.X(1.6), m.Y(aI + bS * 1.6)]], C.points, 2);
      U.curve(ctx, [[m.X(0), m.Y(0)], [m.X(1.6), m.Y((4 * Math.PI * Math.PI * 1.6) / 9.81)]], U.alpha(C.ink3, 0.6), 1.2, [4, 4]);
      pts.forEach(([x, y, e]) => { ctx.strokeStyle = C.accent; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(m.X(x), m.Y(y - e)); ctx.lineTo(m.X(x), m.Y(y + e)); ctx.stroke(); U.dot(ctx, m.X(x), m.Y(y), 3.5, C.accent); });
      U.text(ctx, 'fit  T² = a + bL', b.x + b.w - 10, b.y + b.h - 30, C.points, U.ui(12, 700), 'right');
      U.text(ctx, 'ideal  T² = 4π²L/g (dashed)', b.x + b.w - 10, b.y + b.h - 14, C.ink3, U.ui(12), 'right');
      out([['slope b', bS.toFixed(3) + ' ± ' + sb.toFixed(3) + ' s²/m'], ['intercept a', aI.toFixed(3) + ' ± ' + sa.toFixed(3) + ' s²'], ['g = 4π²/b', gfit.toFixed(2) + ' ± ' + sg.toFixed(2) + ' m/s²'], ['true g', '9.81 m/s²'], ['χ² / dof', (chi2 / Math.max(1, n - 2)).toFixed(2)]]);
    }
    draw();
  };
})();
