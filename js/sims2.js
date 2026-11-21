/* Physbook labs, part 2: thermal, electromagnetism, optics and modern physics (chapters 11–21). */
(function () {
  'use strict';
  const PB = window.PB, U = PB.simUtil;

  /* =============== Ch11: Ideal gas in a box =============== */
  PB.sims.gas = function (api) {
    const cv = api.canvas(0.6);
    const N = api.slider({ id: 'N', label: 'Number of molecules N', min: 20, max: 220, step: 10, value: 120, format: (v) => String(v), onChange: init });
    const T = api.slider({ id: 'T', label: 'Thermostat temperature', min: 50, max: 1200, step: 10, value: 300, unit: 'K', onChange: (v) => rescale(v) });
    const V = api.slider({ id: 'V', label: 'Piston position (volume)', min: 0.35, max: 1, step: 0.005, value: 1, format: (v) => (v * 100).toFixed(0) + '%' });
    api.buttons([{ label: 'Re-thermalise at slider T', onClick: () => rescale(T.value) }]);
    const out = api.readout();
    const r = 0.008, kOf = (TK) => (TK / 300) * 0.02; // kT in sim units (mass 1)
    let P = [], W = 1, Wv = 0, imp = [], time = 0;
    cv.onResize = () => draw();
    function init() {
      P = []; W = V.value; const n = N.value, vT = Math.sqrt(kOf(T.value));
      for (let i = 0; i < n; i++) {
        const th = Math.random() * 2 * Math.PI, sp = vT * Math.sqrt(-2 * Math.log(1 - Math.random()));
        P.push({ x: r + Math.random() * (W * V.value - 2 * r), y: r + Math.random() * (1 - 2 * r), vx: sp * Math.cos(th), vy: sp * Math.sin(th) });
      }
      imp = []; time = 0;
    }
    function kT() { let s = 0; P.forEach((p) => { s += p.vx * p.vx + p.vy * p.vy; }); return (0.5 * s) / P.length; }
    function rescale(TK) { const f = Math.sqrt(kOf(TK) / Math.max(kT(), 1e-12)); P.forEach((p) => { p.vx *= f; p.vy *= f; }); }
    function step(dt) {
      const target = V.value, n = 6, h = dt / n;
      for (let s = 0; s < n; s++) {
        const Wn = W + Math.max(-0.3 * h, Math.min(0.3 * h, target - W)); Wv = (Wn - W) / h; W = Wn;
        let J = 0;
        P.forEach((p) => {
          p.x += p.vx * h; p.y += p.vy * h;
          if (p.x < r) { p.x = r; if (p.vx < 0) { J += -2 * p.vx; p.vx = -p.vx; } }
          if (p.x > W - r) { p.x = W - r; if (p.vx > Wv) { J += 2 * (p.vx - Wv); p.vx = 2 * Wv - p.vx; } }
          if (p.y < r) { p.y = r; if (p.vy < 0) { J += -2 * p.vy; p.vy = -p.vy; } }
          if (p.y > 1 - r) { p.y = 1 - r; if (p.vy > 0) { J += 2 * p.vy; p.vy = -p.vy; } }
        });
        // pairwise elastic collisions via a coarse grid
        const cell = 4 * r, grid = new Map();
        P.forEach((p, i) => { const k = Math.floor(p.x / cell) + ',' + Math.floor(p.y / cell); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(i); });
        P.forEach((p, i) => {
          const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell);
          for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
            const list = grid.get(cx + dx + ',' + (cy + dy)); if (!list) continue;
            list.forEach((j) => {
              if (j <= i) return; const q = P[j];
              const ex = q.x - p.x, ey = q.y - p.y, d2 = ex * ex + ey * ey;
              if (d2 < 4 * r * r && d2 > 1e-14) {
                const d = Math.sqrt(d2), nx = ex / d, ny = ey / d, rel = (p.vx - q.vx) * nx + (p.vy - q.vy) * ny;
                if (rel > 0) { p.vx -= rel * nx; p.vy -= rel * ny; q.vx += rel * nx; q.vy += rel * ny; }
              }
            });
          }
        });
        imp.push([time, J]); time += h;
      }
      while (imp.length && imp[0][0] < time - 3) imp.shift();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const side = Math.min(cv.h - 20, cv.w * 0.56), ox = 10, oy = 10;
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.strokeRect(ox, oy, side, side);
      const px = ox + W * side;
      ctx.fillStyle = U.alpha(C.ink3, 0.35); ctx.fillRect(px, oy, ox + side - px, side);
      ctx.fillStyle = C.ink2; ctx.fillRect(px - 2, oy, 5, side);
      const kt = kT(), vt = Math.sqrt(kt);
      P.forEach((p) => {
        const sp = Math.hypot(p.vx, p.vy) / (2 * vt + 1e-9);
        ctx.fillStyle = sp > 1 ? C.rust : sp > 0.5 ? C.points : C.accent;
        ctx.beginPath(); ctx.arc(ox + p.x * side, oy + p.y * side, Math.max(2.2, r * side), 0, Math.PI * 2); ctx.fill();
      });
      // speed histogram vs Maxwell (2D)
      const b = { x: ox + side + 46, y: 18, w: cv.w - (ox + side + 56), h: cv.h * 0.55 };
      if (b.w > 80) {
        const vmax = 4 * vt, bins = 16, hist = new Array(bins).fill(0);
        P.forEach((p) => { const k = Math.floor((Math.hypot(p.vx, p.vy) / vmax) * bins); if (k < bins) hist[k]++; });
        const dv = vmax / bins, peak = (1 / vt) * Math.exp(-0.5) * P.length * dv;
        const m = U.frame(ctx, C, b, [0, vmax], [0, Math.max(peak * 1.5, ...hist) * 1.05], { noLabels: true, xlabel: 'speed', ylabel: 'count' });
        hist.forEach((c, i) => { ctx.fillStyle = U.alpha(C.accent, 0.55); ctx.fillRect(m.X(i * dv) + 1, m.Y(c), m.X(dv) - m.X(0) - 2, m.Y(0) - m.Y(c)); });
        const pts = []; for (let i = 0; i <= 60; i++) { const v = (vmax * i) / 60; pts.push([m.X(v), m.Y(((v / kt) * Math.exp((-v * v) / (2 * kt))) * P.length * dv)]); }
        U.curve(ctx, pts, C.points, 2);
        U.text(ctx, 'Maxwell (2D)', b.x + b.w - 4, b.y + 14, C.points, U.ui(11), 'right');
      }
      const span = imp.length ? imp[imp.length - 1][0] - imp[0][0] : 0;
      const Jt = imp.reduce((a, q) => a + q[1], 0);
      const Pm = span > 0.5 ? Jt / span / (2 * (W + 1)) : NaN, Pth = (P.length * kt) / (W * 1);
      out([['measured T', ((kt / 0.02) * 300).toFixed(0) + ' K'], ['area A (2D volume)', (W * 100).toFixed(0) + '%'], ['P measured', isFinite(Pm) ? Pm.toFixed(2) : 'measuring…'], ['P = NkT/A', Pth.toFixed(2)], ['ratio', isFinite(Pm) ? (Pm / Pth).toFixed(3) : '—']]);
    }
    api.loop((dt) => { step(Math.min(dt, 0.03)); draw(); });
    init(); draw();
  };

  /* =============== Ch12: Heat engine cycles =============== */
  PB.sims.engine = function (api) {
    const cv = api.canvas(0.62);
    let cyc = 'carnot';
    api.select({ id: 'c', label: 'Cycle', value: cyc, options: [['carnot', 'Carnot (2 isotherms, 2 adiabats)'], ['otto', 'Otto (petrol engine)'], ['rect', 'Two isobars + two isochores']], onChange: (v) => { cyc = v; const pr = { carnot: [3, 600], otto: [8, 1800], rect: [3, 1500] }[v]; r.value = pr[0]; Th.value = pr[1]; draw(); } });
    const gS = api.select({ id: 'g', label: 'Working gas', value: '1.4', options: [['1.4', 'Diatomic, γ = 7/5'], ['1.6667', 'Monatomic, γ = 5/3']], onChange: () => draw() });
    const r = api.slider({ id: 'r', label: 'Volume ratio r', min: 1.5, max: 12, step: 0.1, value: 3, onChange: () => draw() });
    const Th = api.slider({ id: 'th', label: 'Hottest temperature', min: 400, max: 2500, step: 10, value: 600, unit: 'K', onChange: () => draw() });
    const out = api.readout();
    const R = 8.314, Tc = 300, V1 = 1e-3; let s = 0;
    cv.onResize = () => draw();
    function legs() {
      const g = +gS.value, Cv = R / (g - 1), Cp = Cv + R;
      const legsArr = []; let Qin = 0, Qout = 0, W = 0, ok = true, Tmax = Th.value;
      const iso = (Va, Vb, T) => { const pts = []; for (let i = 0; i <= 40; i++) { const V = Va + ((Vb - Va) * i) / 40; pts.push([V, (R * T) / V]); } return pts; };
      const adi = (Va, Pa, Vb) => { const pts = []; for (let i = 0; i <= 40; i++) { const V = Va + ((Vb - Va) * i) / 40; pts.push([V, Pa * Math.pow(Va / V, g)]); } return pts; };
      const line = (a, b) => [a, b];
      if (cyc === 'carnot') {
        const T1 = Th.value, T2 = Tc, k = Math.pow(T1 / T2, 1 / (g - 1));
        const Va = V1, Vb = V1 * r.value, Vc = Vb * k, Vd = Va * k;
        legsArr.push(iso(Va, Vb, T1), adi(Vb, (R * T1) / Vb, Vc), iso(Vc, Vd, T2), adi(Vd, (R * T2) / Vd, Va));
        Qin = R * T1 * Math.log(r.value); Qout = R * T2 * Math.log(r.value); W = Qin - Qout;
      } else if (cyc === 'otto') {
        const Vmax = V1 * r.value, T1 = Tc, T2 = T1 * Math.pow(r.value, g - 1), T3 = Th.value;
        if (T3 <= T2) ok = false;
        const T4 = T3 / Math.pow(r.value, g - 1);
        const P1 = (R * T1) / Vmax, P2 = (R * T2) / V1, P3 = (R * T3) / V1, P4 = (R * T4) / Vmax;
        legsArr.push(adi(Vmax, P1, V1), line([V1, P2], [V1, P3]), adi(V1, P3, Vmax), line([Vmax, P4], [Vmax, P1]));
        Qin = Cv * (T3 - T2); Qout = Cv * (T4 - T1); W = Qin - Qout;
      } else {
        const Va = V1, Vb = V1 * r.value, Pa = (R * Tc) / Va, Pb = (R * Th.value) / Vb;
        if (Pb <= Pa) ok = false;
        const Tb1 = (Pb * Va) / R, Ta2 = (Pa * Vb) / R; // corners
        legsArr.push(line([Va, Pa], [Va, Pb]), line([Va, Pb], [Vb, Pb]), line([Vb, Pb], [Vb, Pa]), line([Vb, Pa], [Va, Pa]));
        Qin = Cv * (Tb1 - Tc) + Cp * (Th.value - Tb1); Qout = Cv * (Th.value - Ta2) + Cp * (Ta2 - Tc); W = (Pb - Pa) * (Vb - Va);
      }
      return { legs: legsArr, Qin: Qin, Qout: Qout, W: W, ok: ok, Tmax: Tmax };
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, L = legs();
      ctx.clearRect(0, 0, cv.w, cv.h);
      const all = L.legs.flat();
      const Vmax = Math.max(...all.map((p) => p[0])) * 1.08, Pmax = Math.max(...all.map((p) => p[1])) * 1.1;
      const b = { x: 60, y: 16, w: cv.w - 76, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, Vmax * 1000], [0, Pmax / 1e5], { xlabel: 'V (litres)', ylabel: 'P (bar)' });
      if (!L.ok) { U.text(ctx, cyc === 'otto' ? 'Raise the peak temperature above the post-compression temperature 300 K × r^(γ−1).' : 'The hottest temperature must exceed r × 300 K. Lower r or raise T.', b.x + 12, b.y + 24, C.bad, U.ui(12)); out([['status', 'not a valid cycle']]); return; }
      const cols = [C.rust, C.ink3, C.accent, C.ink3];
      const poly = []; L.legs.forEach((lg) => lg.forEach((p) => poly.push([m.X(p[0] * 1000), m.Y(p[1] / 1e5)])));
      ctx.beginPath(); poly.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fillStyle = U.alpha(C.points, 0.18); ctx.fill();
      L.legs.forEach((lg, i) => U.curve(ctx, lg.map((p) => [m.X(p[0] * 1000), m.Y(p[1] / 1e5)]), cols[i], 2.5));
      // moving state point
      const seg = Math.floor(s) % 4, fr = s - Math.floor(s), lg = L.legs[seg];
      const idx = Math.min(lg.length - 1, fr * (lg.length - 1)), i0 = Math.floor(idx), i1 = Math.min(lg.length - 1, i0 + 1), q = idx - i0;
      const pt = [lg[i0][0] + (lg[i1][0] - lg[i0][0]) * q, lg[i0][1] + (lg[i1][1] - lg[i0][1]) * q];
      U.dot(ctx, m.X(pt[0] * 1000), m.Y(pt[1] / 1e5), 6, C.points, C.ink);
      U.text(ctx, 'shaded area = net work per cycle', b.x + b.w - 8, b.y + 16, C.points, U.ui(11.5), 'right');
      const eta = L.W / L.Qin, carnot = 1 - Tc / L.Tmax;
      out([['amount of gas', '1 mol'], ['heat in Q<sub>H</sub>', (L.Qin / 1000).toFixed(2) + ' kJ'], ['heat out Q<sub>C</sub>', (L.Qout / 1000).toFixed(2) + ' kJ'], ['net work W', (L.W / 1000).toFixed(2) + ' kJ'], ['efficiency W/Q<sub>H</sub>', (eta * 100).toFixed(1) + '%'], ['Carnot limit 1 − T<sub>C</sub>/T<sub>H</sub>', (carnot * 100).toFixed(1) + '%']]);
    }
    api.loop((dt) => { s += dt * 0.5; draw(); });
    draw();
  };

  /* =============== Ch13: Electric field and potential of point charges =============== */
  PB.sims.efield = function (api) {
    const cv = api.canvas(0.64);
    let charges = [], sign = 1, drag = null, probe = null, dirty = true, img = null;
    api.select({ id: 'q', label: 'Click on the field to add', value: '1', options: [['1', 'Positive charge +q'], ['-1', 'Negative charge −q'], ['2', 'Double charge +2q'], ['-2', 'Double charge −2q']], onChange: (v) => { sign = +v; } });
    const preset = api.select({ id: 'p', label: 'Preset', value: 'dipole', options: [['dipole', 'Dipole'], ['like', 'Two like charges'], ['quad', 'Quadrupole'], ['plates', 'Parallel plates (rows of charges)'], ['unequal', '+2q and −q']], onChange: (v) => load(v) });
    const lines = api.check({ id: 'l', label: 'Field lines', value: true, onChange: () => { dirty = true; } });
    const eqp = api.check({ id: 'e', label: 'Potential map with equipotential bands', value: true, onChange: () => { dirty = true; } });
    api.buttons([{ label: 'Clear all', onClick: () => { charges = []; dirty = true; } }, { label: 'Remove last', onClick: () => { charges.pop(); dirty = true; } }]);
    const out = api.readout();
    cv.onResize = () => { load(preset.value); };
    function load(v) {
      const w = cv.w, h = cv.h, cx = w / 2, cy = h / 2, d = Math.min(w, h) * 0.18;
      charges = { dipole: [[cx - d, cy, 1], [cx + d, cy, -1]], like: [[cx - d, cy, 1], [cx + d, cy, 1]], quad: [[cx - d, cy - d, 1], [cx + d, cy - d, -1], [cx + d, cy + d, 1], [cx - d, cy + d, -1]], unequal: [[cx - d, cy, 2], [cx + d, cy, -1]],
        plates: [] }[v].map((c) => ({ x: c[0], y: c[1], q: c[2] }));
      if (v === 'plates') for (let i = -4; i <= 4; i++) { charges.push({ x: cx + i * d * 0.32, y: cy - d, q: 1 }); charges.push({ x: cx + i * d * 0.32, y: cy + d, q: -1 }); }
      dirty = true;
    }
    function field(x, y) {
      let Ex = 0, Ey = 0, V = 0;
      for (const c of charges) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy + 25, r = Math.sqrt(r2); Ex += (c.q * dx) / (r2 * r); Ey += (c.q * dy) / (r2 * r); V += c.q / r; }
      return [Ex, Ey, V];
    }
    U.pointer(cv, {
      down: (p) => { const hit = charges.findIndex((c) => Math.hypot(c.x - p.x, c.y - p.y) < 14); if (hit >= 0) drag = hit; else { charges.push({ x: p.x, y: p.y, q: sign }); dirty = true; } },
      move: (p, down) => { probe = p; if (down && drag != null) { charges[drag].x = p.x; charges[drag].y = p.y; dirty = true; } },
      up: () => { drag = null; }, leave: () => { probe = null; }
    });
    function render() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      if (eqp.value && charges.length) {
        const cs = 3, nx = Math.ceil(cv.w / cs), ny = Math.ceil(cv.h / cs);
        const pos = C.dark ? [255, 138, 102] : [168, 64, 31], neg = C.dark ? [124, 156, 255] : [35, 80, 200];
        const off = document.createElement('canvas'); off.width = nx; off.height = ny;
        const octx = off.getContext('2d'), id = octx.createImageData(nx, ny);
        for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
          const V = field(i * cs + cs / 2, j * cs + cs / 2)[2] * 40, mag = Math.abs(V);
          // bands at geometrically spaced potentials, so equipotentials show near and far
          const k = Math.floor(Math.log(mag + 1e-9) * 2.5), band = ((k % 2) + 2) % 2 === 0 ? 1 : 0.55;
          const a = Math.min(0.55, 0.05 + 0.32 * Math.sqrt(mag)) * band;
          const col = V > 0 ? pos : neg, o = (j * nx + i) * 4;
          id.data[o] = col[0]; id.data[o + 1] = col[1]; id.data[o + 2] = col[2]; id.data[o + 3] = Math.round(a * 255);
        }
        octx.putImageData(id, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(off, 0, 0, nx * cs, ny * cs);
      }
      if (lines.value && charges.length) {
        const srcs = charges.filter((c) => c.q > 0).length ? charges.filter((c) => c.q > 0) : charges;
        const dirS = charges.some((c) => c.q > 0) ? 1 : -1;
        ctx.strokeStyle = U.alpha(C.ink, 0.55); ctx.lineWidth = 1.1;
        srcs.forEach((c) => {
          const n = (charges.length > 6 ? 5 : 12) * Math.abs(c.q);
          for (let k = 0; k < n; k++) {
            const a = (2 * Math.PI * (k + 0.5)) / n; let x = c.x + 9 * Math.cos(a), y = c.y + 9 * Math.sin(a);
            ctx.beginPath(); ctx.moveTo(x, y);
            for (let st = 0; st < 900; st++) {
              const E = field(x, y), m = Math.hypot(E[0], E[1]); if (m < 1e-12) break;
              x += (dirS * 3 * E[0]) / m; y += (dirS * 3 * E[1]) / m; ctx.lineTo(x, y);
              if (x < -20 || y < -20 || x > cv.w + 20 || y > cv.h + 20) break;
              if (charges.some((o) => o !== c && Math.hypot(o.x - x, o.y - y) < 7)) break;
            }
            ctx.stroke();
          }
        });
      }
      charges.forEach((c) => { U.dot(ctx, c.x, c.y, 8 + 2 * Math.abs(c.q), c.q > 0 ? C.rust : C.accent, C.surface); U.text(ctx, c.q > 0 ? '+' : '−', c.x, c.y + 4.5, '#fff', U.ui(13, 800), 'center'); });
      if (!charges.length) U.text(ctx, 'Click anywhere to place a charge.', cv.w / 2, cv.h / 2, C.ink2, U.ui(14), 'center');
      img = ctx.getImageData(0, 0, cv.el.width, cv.el.height);
      dirty = false;
    }
    api.loop(() => {
      if (dirty) render(); else if (img) cv.ctx.putImageData(img, 0, 0);
      if (probe && charges.length) {
        const C = api.colors(), E = field(probe.x, probe.y), m = Math.hypot(E[0], E[1]);
        U.arrow(cv.ctx, probe.x, probe.y, probe.x + (E[0] / m) * 26, probe.y + (E[1] / m) * 26, C.points, 2.5, 8);
        out([['|E| at pointer', (m * 1e4).toFixed(2) + ' (rel.)'], ['V at pointer', (E[2] * 100).toFixed(2) + ' (rel.)'], ['charges', String(charges.length)], ['net charge', charges.reduce((a, c) => a + c.q, 0) + 'q']]);
      } else out([['charges', String(charges.length)], ['net charge', charges.reduce((a, c) => a + c.q, 0) + 'q'], ['tip', 'drag charges; hover to probe']]);
    });
    PB.on((ev) => { if (ev.type === 'theme') dirty = true; });
    load('dipole');
  };

  /* =============== Ch14: RC circuit =============== */
  PB.sims.rc = function (api) {
    const cv = api.canvas(0.56);
    const R = api.slider({ id: 'R', label: 'Resistance R', min: 1, max: 100, step: 1, value: 20, unit: 'kΩ' });
    const Cs = api.slider({ id: 'C', label: 'Capacitance C', min: 1, max: 100, step: 1, value: 50, unit: 'μF' });
    const V0 = api.slider({ id: 'V', label: 'Battery emf ℰ', min: 1, max: 12, step: 0.5, value: 9, unit: 'V' });
    api.buttons([{ label: 'Charge', primary: true, onClick: () => { mode = 1; t = 0; hist = []; } }, { label: 'Discharge', onClick: () => { mode = -1; t = 0; hist = []; } }]);
    const out = api.readout();
    let Vc = 0, t = 0, mode = 1, hist = [];
    cv.onResize = () => draw();
    const tau = () => R.value * 1e3 * Cs.value * 1e-6;
    function step(dt) {
      const T = tau(), simdt = dt * T * 0.8, n = 10; // ~0.8 τ per second of animation
      for (let i = 0; i < n; i++) { const target = mode > 0 ? V0.value : 0; Vc += ((target - Vc) * (simdt / n)) / T; t += simdt / n; }
      const I = (mode > 0 ? V0.value - Vc : -Vc) / (R.value * 1e3);
      hist.push([t, Vc, I]); if (hist.length > 1200) hist.shift();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const T = tau(), span = Math.max(5 * T, t);
      const b1 = { x: 54, y: 14, w: cv.w - 70, h: cv.h * 0.4 }, b2 = { x: 54, y: cv.h * 0.4 + 44, w: cv.w - 70, h: cv.h * 0.6 - 76 };
      const m1 = U.frame(ctx, C, b1, [0, span], [0, 12.5], { ylabel: 'V_C (V)', ny: 3 });
      const Imax = V0.value / (R.value * 1e3) * 1e3;
      const m2 = U.frame(ctx, C, b2, [0, span], [-Imax * 1.1, Imax * 1.1], { xlabel: 't (s)', ylabel: 'I (mA)', ny: 3 });
      for (let k = 1; k <= 5; k++) { ctx.strokeStyle = U.alpha(C.points, k === 1 ? 0.7 : 0.25); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(m1.X(k * T), b1.y); ctx.lineTo(m1.X(k * T), b2.y + b2.h); ctx.stroke(); ctx.setLineDash([]); }
      U.text(ctx, 'τ', m1.X(T) + 3, b1.y + 12, C.points, U.ui(12, 700));
      U.curve(ctx, hist.map((q) => [m1.X(q[0]), m1.Y(q[1])]), C.accent, 2.5);
      U.curve(ctx, hist.map((q) => [m2.X(q[0]), m2.Y(q[2] * 1e3)]), C.rust, 2.5);
      const I = hist.length ? hist[hist.length - 1][2] : 0;
      out([['time constant τ = RC', U.fmt(T, 3) + ' s'], ['V<sub>C</sub> now', Vc.toFixed(3) + ' V'], ['current now', (I * 1e3).toFixed(3) + ' mA'], ['stored energy ½CV²', U.fmt(0.5 * Cs.value * 1e-6 * Vc * Vc * 1e3, 3) + ' mJ'], ['mode', mode > 0 ? 'charging' : 'discharging']]);
    }
    api.loop((dt) => { if (t < 6 * tau()) step(dt); draw(); });
    draw();
  };

  /* =============== Ch15: Charged particle in E and B fields =============== */
  PB.sims.bfield = function (api) {
    const cv = api.canvas(0.62);
    const B = api.slider({ id: 'B', label: 'Magnetic field B<sub>z</sub> (out of page)', min: -2, max: 2, step: 0.05, value: 1, onChange: reset });
    const E = api.slider({ id: 'E', label: 'Electric field E<sub>y</sub> (up the screen)', min: -1, max: 1, step: 0.02, value: 0, onChange: reset });
    const v0 = api.slider({ id: 'v', label: 'Initial speed', min: 0, max: 2, step: 0.05, value: 1, onChange: reset });
    const th = api.slider({ id: 'th', label: 'Initial direction', min: -180, max: 180, step: 5, value: 0, unit: '°', onChange: reset });
    const q = api.select({ id: 'q', label: 'Particle charge', value: '1', options: [['1', 'Positive (q/m = +1)'], ['-1', 'Negative (q/m = −1)']], onChange: reset });
    api.buttons([{ label: 'Restart', primary: true, onClick: reset }]);
    const out = api.readout();
    let p, v, trail;
    cv.onResize = () => reset();
    function reset() { p = [0, 0]; v = [v0.value * Math.cos(th.value * U.deg), v0.value * Math.sin(th.value * U.deg)]; trail = [p.slice()]; }
    function step(dt) {
      const qm = +q.value, n = 40, h = dt / n;
      for (let i = 0; i < n; i++) {
        // Boris pusher
        const vm = [v[0] + 0.5 * h * qm * 0, v[1] + 0.5 * h * qm * E.value];
        const tz = 0.5 * h * qm * B.value, s = (2 * tz) / (1 + tz * tz);
        const vp = [vm[0] + vm[1] * tz, vm[1] - vm[0] * tz];
        const vpl = [vm[0] + vp[1] * s, vm[1] - vp[0] * s];
        v = [vpl[0], vpl[1] + 0.5 * h * qm * E.value];
        p[0] += v[0] * h; p[1] += v[1] * h;
      }
      trail.push(p.slice()); if (trail.length > 2500) trail.shift();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const sc = Math.min(cv.w, cv.h) / 8, ox = cv.w / 2, oy = cv.h / 2;
      const S = (r) => [ox + r[0] * sc, oy - r[1] * sc];
      const sym = B.value >= 0 ? '•' : '×';
      if (Math.abs(B.value) > 0.01) for (let x = 20; x < cv.w; x += 40) for (let y = 20; y < cv.h; y += 40) U.text(ctx, sym, x, y + 4, U.alpha(C.ink3, 0.25 + 0.25 * Math.abs(B.value)), U.ui(14, 700), 'center');
      if (Math.abs(E.value) > 0.01) for (let x = 40; x < cv.w; x += 80) U.arrow(ctx, x, oy + (E.value > 0 ? 30 : -30), x, oy + (E.value > 0 ? -30 : 30), U.alpha(C.points, 0.35), 2, 8);
      U.curve(ctx, trail.map(S), C.accent, 2);
      const sp = S(p); U.dot(ctx, sp[0], sp[1], 6, +q.value > 0 ? C.rust : C.teal, C.ink);
      if (Math.abs(p[0]) * sc > cv.w / 2 + 40 || Math.abs(p[1]) * sc > cv.h / 2 + 40) reset();
      const qm = +q.value, Bv = B.value, wc = Math.abs(qm * Bv), vperp = v0.value;
      out([['cyclotron frequency |qB/m|', wc.toFixed(3) + ' rad/s'], ['radius mv/|qB| (E = 0)', wc > 0 ? (vperp / wc).toFixed(3) : '∞'], ['period 2πm/|qB|', wc > 0 ? ((2 * Math.PI) / wc).toFixed(2) + ' s' : '∞'], ['E×B drift speed E/B', Math.abs(Bv) > 0.01 ? Math.abs(E.value / Bv).toFixed(3) + (E.value / Bv > 0 ? ' (→ +x)' : E.value ? ' (→ −x)' : '') : '—'], ['speed now', Math.hypot(v[0], v[1]).toFixed(3)]]);
    }
    api.loop((dt) => { step(dt * 1.5); draw(); });
    reset();
  };

  /* =============== Ch16: Series RLC with phasors =============== */
  PB.sims.rlc = function (api) {
    const cv = api.canvas(0.56);
    const R = api.slider({ id: 'R', label: 'Resistance R', min: 2, max: 200, step: 1, value: 30, unit: 'Ω' });
    const L = api.slider({ id: 'L', label: 'Inductance L', min: 1, max: 200, step: 1, value: 50, unit: 'mH' });
    const C_ = api.slider({ id: 'C', label: 'Capacitance C', min: 1, max: 100, step: 1, value: 20, unit: 'μF' });
    const f = api.slider({ id: 'f', label: 'Source frequency f', min: 1, max: 3, step: 0.005, value: Math.log10(150), format: (v) => Math.pow(10, v).toFixed(0) + ' Hz' });
    const out = api.readout();
    const V0 = 10; let ph = 0;
    cv.onResize = () => draw();
    function calc(fr) {
      const w = 2 * Math.PI * fr, XL = w * L.value * 1e-3, XC = 1 / (w * C_.value * 1e-6), Z = Math.hypot(R.value, XL - XC);
      return { XL: XL, XC: XC, Z: Z, I: V0 / Z, phi: Math.atan2(XL - XC, R.value) };
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, fr = Math.pow(10, f.value), k = calc(fr);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const pw = Math.min(cv.h - 20, cv.w * 0.44), cx = 10 + pw / 2, cy = cv.h / 2;
      ctx.strokeStyle = C.line; ctx.beginPath(); ctx.arc(cx, cy, pw / 2 - 6, 0, Math.PI * 2); ctx.stroke();
      const VR = k.I * R.value, VL = k.I * k.XL, VC = k.I * k.XC, sc = (pw / 2 - 16) / Math.max(V0, VR, VL, VC);
      const a = ph; // current phasor angle
      const P = (mag, ang) => [cx + mag * sc * Math.cos(ang), cy - mag * sc * Math.sin(ang)];
      const pR = P(VR, a), pL = P(VL, a + Math.PI / 2), pC = P(VC, a - Math.PI / 2), pV = P(V0, a + k.phi);
      U.arrow(ctx, cx, cy, ...pR, C.ink, 2.5, 9); U.text(ctx, 'V_R', pR[0] + 4, pR[1] - 4, C.ink, U.ui(12, 700));
      U.arrow(ctx, cx, cy, ...pL, C.teal, 2.5, 9); U.text(ctx, 'V_L', pL[0] + 4, pL[1] - 4, C.teal, U.ui(12, 700));
      U.arrow(ctx, cx, cy, ...pC, C.rust, 2.5, 9); U.text(ctx, 'V_C', pC[0] + 4, pC[1] - 4, C.rust, U.ui(12, 700));
      U.arrow(ctx, cx, cy, ...pV, C.points, 3.5, 11); U.text(ctx, 'ℰ', pV[0] + 6, pV[1] - 6, C.points, U.ui(14, 800));
      U.text(ctx, 'phasors (current along V_R)', 12, 16, C.ink2, U.ui(11));
      const b = { x: pw + 64, y: 16, w: cv.w - pw - 78, h: cv.h - 48 };
      if (b.w > 90) {
        const f0 = 1 / (2 * Math.PI * Math.sqrt(L.value * 1e-3 * C_.value * 1e-6)), Imax = V0 / R.value;
        const m = U.frame(ctx, C, b, [1, 3], [0, Imax * 1.1 * 1000], { xticks: [1, 2, 3], xfmt: (v) => Math.pow(10, v).toFixed(0), xlabel: 'f (Hz, log scale)', ylabel: 'I peak (mA)', ny: 3 });
        const pts = []; for (let i = 0; i <= 300; i++) { const lf = 1 + (2 * i) / 300; pts.push([m.X(lf), m.Y(calc(Math.pow(10, lf)).I * 1000)]); }
        U.curve(ctx, pts, C.accent, 2);
        if (f0 >= 10 && f0 <= 1000) { ctx.strokeStyle = U.alpha(C.points, 0.6); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(m.X(Math.log10(f0)), b.y); ctx.lineTo(m.X(Math.log10(f0)), b.y + b.h); ctx.stroke(); ctx.setLineDash([]); }
        U.dot(ctx, m.X(f.value), m.Y(k.I * 1000), 5, C.points, C.ink);
      }
      const f0 = 1 / (2 * Math.PI * Math.sqrt(L.value * 1e-3 * C_.value * 1e-6));
      out([['X<sub>L</sub> = ωL', k.XL.toFixed(1) + ' Ω'], ['X<sub>C</sub> = 1/ωC', k.XC.toFixed(1) + ' Ω'], ['impedance Z', k.Z.toFixed(1) + ' Ω'], ['phase of ℰ ahead of I', (k.phi / U.deg).toFixed(1) + '°'], ['peak current', (k.I * 1000).toFixed(1) + ' mA'], ['resonance f₀', f0.toFixed(1) + ' Hz'], ['Q = (1/R)√(L/C)', (Math.sqrt((L.value * 1e-3) / (C_.value * 1e-6)) / R.value).toFixed(2)], ['average power', ((0.5 * k.I * k.I * R.value)).toFixed(3) + ' W']]);
    }
    api.loop((dt) => { ph += dt * 1.2; draw(); });
    draw();
  };

  /* =============== Ch17: Thin lens and mirror ray diagrams =============== */
  PB.sims.lens = function (api) {
    const cv = api.canvas(0.55);
    let kind = 'conv';
    api.select({ id: 'k', label: 'Optical element', value: kind, options: [['conv', 'Converging lens'], ['div', 'Diverging lens'], ['concave', 'Concave mirror'], ['convex', 'Convex mirror']], onChange: (v) => { kind = v; draw(); } });
    const fS = api.slider({ id: 'f', label: 'Focal length |f|', min: 5, max: 30, step: 0.5, value: 15, unit: 'cm', onChange: () => draw() });
    const doS = api.slider({ id: 'do', label: 'Object distance d<sub>o</sub>', min: 2, max: 70, step: 0.5, value: 40, unit: 'cm', onChange: () => draw() });
    const hS = api.slider({ id: 'h', label: 'Object height', min: 2, max: 12, step: 0.5, value: 6, unit: 'cm', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const mirror = kind === 'concave' || kind === 'convex';
      const f = (kind === 'conv' || kind === 'concave' ? 1 : -1) * fS.value, dO = doS.value, ho = hS.value;
      const dI = Math.abs(dO - f) < 1e-6 ? Infinity : (dO * f) / (dO - f), mag = -dI / dO, hi = mag * ho;
      const span = 160, sc = cv.w / span, ox = mirror ? cv.w * 0.66 : cv.w / 2, oy = cv.h / 2;
      const vs = Math.min(sc * 1.4, (cv.h / 2 - 16) / 14);
      const X = (x) => ox + x * sc, Y = (y) => oy - y * vs;
      ctx.strokeStyle = U.alpha(C.ink3, 0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(cv.w, oy); ctx.stroke();
      // element
      ctx.strokeStyle = C.accent; ctx.lineWidth = 3; ctx.beginPath();
      const eh = cv.h / 2 - 10;
      if (!mirror) {
        ctx.moveTo(ox, oy - eh); ctx.lineTo(ox, oy + eh); ctx.stroke();
        const sg = f > 0 ? 1 : -1;
        [-1, 1].forEach((d) => { const y = oy + d * eh; ctx.beginPath(); ctx.moveTo(ox - 8, y - d * 8 * sg); ctx.lineTo(ox, y); ctx.lineTo(ox + 8, y - d * 8 * sg); ctx.stroke(); });
      } else { const curv = f > 0 ? 1 : -1; ctx.moveTo(ox - curv * 14, oy - eh); ctx.quadraticCurveTo(ox + curv * 14, oy, ox - curv * 14, oy + eh); ctx.stroke(); }
      [f, -f, 2 * f, -2 * f].forEach((x, i) => { if (mirror && i % 2) return; U.dot(ctx, X(mirror ? -Math.abs(x) * Math.sign(f) : x), oy, 3, C.points); });
      U.text(ctx, 'F', X(mirror ? -f : f), oy + 16, C.points, U.ui(11, 700), 'center');
      if (!mirror) U.text(ctx, 'F', X(-f), oy + 16, C.points, U.ui(11, 700), 'center');
      // object (always on the left, at x = -dO)
      U.arrow(ctx, X(-dO), oy, X(-dO), Y(ho), C.teal, 3, 10);
      const tip = [-dO, ho];
      const rays = [];
      const line = (x1, y1, x2, y2, col, dash) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 1.6; if (dash) ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(X(x1), Y(y1)); ctx.lineTo(X(x2), Y(y2)); ctx.stroke(); ctx.restore(); };
      const far = span;
      const cols = [C.rust, C.ink, C.accent];
      if (!mirror) {
        // ray 1: parallel then through F' (or away from F on object side)
        line(tip[0], tip[1], 0, ho, cols[0]);
        const s1 = -ho / f; line(0, ho, far, ho + s1 * far, cols[0]); if (dI < 0 || f < 0) line(0, ho, -far, ho - s1 * far, cols[0], true);
        // ray 2: through centre
        const s2 = ho / tip[0]; line(tip[0], tip[1], far, s2 * far, cols[1]); if (dI < 0) line(0, 0, -far, -s2 * far, cols[1], true);
        // ray 3: toward F (object side), emerges parallel
        if (Math.abs(tip[0] + f) > 1e-6) { const s3 = (0 - ho) / (-f - tip[0]); const yAt0 = ho + s3 * (0 - tip[0]); line(tip[0], tip[1], 0, yAt0, cols[2]); line(0, yAt0, far, yAt0, cols[2]); if (dI < 0) line(0, yAt0, -far, yAt0, cols[2], true); }
      } else {
        // mirror at x = 0, reflecting surface faces left. Real images on the left.
        const fx = -f; // focal point position (left for concave)
        line(tip[0], tip[1], 0, ho, cols[0]);
        const s1 = -ho / fx; // reflected ray 1 passes through (or appears to come from) the focal point
        line(0, ho, -far, ho - s1 * far, cols[0]); if (dI < 0) line(0, ho, far, ho + s1 * far, cols[0], true);
        const s2 = ho / dO; // ray 2 hits the vertex and reflects symmetrically about the axis
        line(tip[0], tip[1], 0, 0, cols[1]); line(0, 0, -far, -s2 * far, cols[1]); if (dI < 0) line(0, 0, far, s2 * far, cols[1], true);
      }
      // image
      if (isFinite(dI)) {
        const xi = mirror ? -dI : dI;
        ctx.save(); if (dI < 0) ctx.setLineDash([5, 4]);
        U.arrow(ctx, X(xi), oy, X(xi), Y(hi), dI < 0 ? U.alpha(C.points, 0.8) : C.points, 3, 10);
        ctx.restore();
        U.text(ctx, dI < 0 ? 'virtual image' : 'real image', X(xi), Y(hi) + (hi > 0 ? -8 : 16), C.points, U.ui(11, 700), 'center');
      }
      out([['image distance d<sub>i</sub>', isFinite(dI) ? dI.toFixed(1) + ' cm' : '∞ (object at F)'], ['magnification m = −d<sub>i</sub>/d<sub>o</sub>', isFinite(dI) ? mag.toFixed(2) : '—'], ['image', !isFinite(dI) ? 'rays emerge parallel' : (dI > 0 ? 'real, ' : 'virtual, ') + (mag < 0 ? 'inverted, ' : 'upright, ') + (Math.abs(mag) > 1 ? 'enlarged' : 'reduced')], ['lens equation', '1/d<sub>o</sub> + 1/d<sub>i</sub> = 1/f']]);
    }
    draw();
  };

  /* =============== Ch17: Refraction, Snell's law, total internal reflection =============== */
  PB.sims.snell = function (api) {
    const cv = api.canvas(0.6);
    const n1 = api.slider({ id: 'n1', label: 'Upper medium n<sub>1</sub>', min: 1, max: 2.5, step: 0.01, value: 1.5, onChange: () => draw() });
    const n2 = api.slider({ id: 'n2', label: 'Lower medium n<sub>2</sub>', min: 1, max: 2.5, step: 0.01, value: 1.0, onChange: () => draw() });
    const th = api.slider({ id: 't', label: 'Angle of incidence θ<sub>1</sub>', min: 0, max: 89, step: 0.5, value: 35, unit: '°', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const cx = cv.w / 2, cy = cv.h / 2, L = Math.min(cv.w, cv.h) * 0.46;
      ctx.fillStyle = U.alpha(C.accent, 0.04 + 0.08 * (n1.value - 1)); ctx.fillRect(0, 0, cv.w, cy);
      ctx.fillStyle = U.alpha(C.accent, 0.04 + 0.08 * (n2.value - 1)); ctx.fillRect(0, cy, cv.w, cv.h - cy);
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(cv.w, cy); ctx.stroke();
      ctx.strokeStyle = U.alpha(C.ink3, 0.7); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cx, cy - L); ctx.lineTo(cx, cy + L); ctx.stroke(); ctx.setLineDash([]);
      const t1 = th.value * U.deg, s2 = (n1.value / n2.value) * Math.sin(t1), tir = s2 > 1;
      const t2 = tir ? NaN : Math.asin(s2), c1 = Math.cos(t1), c2 = tir ? 0 : Math.cos(t2);
      let Rf = 1;
      if (!tir) { const rs = (n1.value * c1 - n2.value * c2) / (n1.value * c1 + n2.value * c2), rp = (n2.value * c1 - n1.value * c2) / (n2.value * c1 + n1.value * c2); Rf = (rs * rs + rp * rp) / 2; }
      U.arrow(ctx, cx - L * Math.sin(t1), cy - L * Math.cos(t1), cx, cy, C.points, 3.2, 11);
      U.arrow(ctx, cx, cy, cx + L * Math.sin(t1), cy - L * Math.cos(t1), U.alpha(C.points, 0.15 + 0.85 * Rf), 1 + 3 * Rf, 10);
      if (!tir) U.arrow(ctx, cx, cy, cx + L * Math.sin(t2), cy + L * Math.cos(t2), U.alpha(C.points, 0.2 + 0.8 * (1 - Rf)), 1 + 3 * (1 - Rf), 10);
      U.text(ctx, 'n₁ = ' + n1.value.toFixed(2), 12, 20, C.ink2, U.ui(12, 700)); U.text(ctx, 'n₂ = ' + n2.value.toFixed(2), 12, cy + 22, C.ink2, U.ui(12, 700));
      if (tir) U.text(ctx, 'Total internal reflection', cx + 12, cy + 26, C.bad, U.ui(13, 700));
      const crit = n1.value > n2.value ? Math.asin(n2.value / n1.value) / U.deg : null;
      out([['refraction angle θ₂', tir ? 'none (TIR)' : (t2 / U.deg).toFixed(2) + '°'], ['critical angle', crit != null ? crit.toFixed(2) + '°' : 'none (n₁ ≤ n₂)'], ['reflected fraction', (Rf * 100).toFixed(1) + '%'], ['Brewster angle', (Math.atan(n2.value / n1.value) / U.deg).toFixed(2) + '°']]);
    }
    draw();
  };

  /* =============== Ch18: Multi-slit interference and diffraction =============== */
  U.wl2rgb = function (nm) {
    let r = 0, g = 0, b = 0;
    if (nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else r = 1;
    const f = nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (780 - nm)) / 80 : 1;
    return [r, g, b].map((c) => Math.round(255 * Math.pow(c * f, 0.8)));
  };
  PB.sims.slits = function (api) {
    const cv = api.canvas(0.56);
    const N = api.slider({ id: 'N', label: 'Number of slits N', min: 1, max: 12, step: 1, value: 2, format: (v) => String(v), onChange: () => draw() });
    const d = api.slider({ id: 'd', label: 'Slit separation d', min: 5, max: 100, step: 1, value: 30, unit: 'μm', onChange: () => draw() });
    const a = api.slider({ id: 'a', label: 'Slit width a', min: 1, max: 30, step: 0.5, value: 6, unit: 'μm', onChange: () => draw() });
    const lam = api.slider({ id: 'l', label: 'Wavelength λ', min: 380, max: 750, step: 1, value: 550, unit: 'nm', onChange: () => draw() });
    const Ls = api.slider({ id: 'L', label: 'Screen distance L', min: 0.5, max: 3, step: 0.1, value: 1, unit: 'm', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function I(th) {
      const k = (Math.PI / (lam.value * 1e-9)) * Math.sin(th), beta = k * a.value * 1e-6, alpha = k * d.value * 1e-6, n = N.value;
      const sinc = Math.abs(beta) < 1e-9 ? 1 : Math.sin(beta) / beta;
      const arr = Math.abs(Math.sin(alpha)) < 1e-9 ? n : Math.sin(n * alpha) / Math.sin(alpha);
      return sinc * sinc * (arr * arr) / (n * n);
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const ymax = Ls.value * Math.tan(Math.asin(Math.min(0.95, (2.5 * lam.value * 1e-9) / (a.value * 1e-6)))); // m
      const b = { x: 48, y: 16, w: cv.w - 62, h: cv.h * 0.62 };
      const m = U.frame(ctx, C, b, [-ymax * 1000, ymax * 1000], [0, 1.05], { xlabel: 'position on screen y (mm)', ylabel: 'I / I₀', ny: 2 });
      const rgb = U.wl2rgb(lam.value), col = 'rgb(' + rgb.join(',') + ')';
      const pts = [], env = [], strip = { y: b.y + b.h + 36, h: cv.h - (b.y + b.h + 44) };
      const n = Math.min(1200, Math.floor(b.w * 2));
      for (let i = 0; i <= n; i++) {
        const y = -ymax + (2 * ymax * i) / n, th = Math.atan(y / Ls.value), val = I(th);
        pts.push([m.X(y * 1000), m.Y(val)]);
        const k = (Math.PI / (lam.value * 1e-9)) * Math.sin(th), beta = k * a.value * 1e-6, s = Math.abs(beta) < 1e-9 ? 1 : Math.sin(beta) / beta;
        env.push([m.X(y * 1000), m.Y(s * s)]);
        if (strip.h > 6) { ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + Math.min(1, Math.pow(val, 0.6)).toFixed(3) + ')'; ctx.fillRect(b.x + (b.w * i) / n, strip.y, b.w / n + 1, strip.h); }
      }
      if (strip.h > 6) { ctx.strokeStyle = C.line; ctx.strokeRect(b.x, strip.y, b.w, strip.h); }
      if (N.value > 1) U.curve(ctx, env, U.alpha(C.ink3, 0.8), 1.2, [4, 4]);
      U.curve(ctx, pts, col, 2);
      const fringe = (lam.value * 1e-9 * Ls.value) / (d.value * 1e-6), smin = (lam.value * 1e-9 * Ls.value) / (a.value * 1e-6);
      out([['fringe spacing λL/d', N.value > 1 ? (fringe * 1000).toFixed(2) + ' mm' : '—'], ['first single-slit zero λL/a', (smin * 1000).toFixed(2) + ' mm'], ['bright fringes per central lobe', N.value > 1 ? String(2 * Math.ceil(d.value / a.value) - 1) : '—'], ['secondary maxima between fringes', N.value > 1 ? String(N.value - 2) : '—']]);
    }
    draw();
  };

  /* =============== Ch19: Minkowski spacetime diagram =============== */
  PB.sims.spacetime = function (api) {
    const cv = api.canvas(0.7, 300);
    const beta = api.slider({ id: 'b', label: 'Velocity of frame S′, β = v/c', min: -0.95, max: 0.95, step: 0.01, value: 0.5 });
    const grid = api.check({ id: 'g', label: "Draw S′ grid lines (constant x′ and t′)", value: true });
    const out = api.readout();
    const ev = [{ x: 1, t: 2, name: 'A' }, { x: 3, t: 1.5, name: 'B' }];
    let drag = null;
    cv.onResize = () => {};
    const view = () => { const sc = Math.min(cv.w, cv.h) / 11.5; return { sc: sc, ox: cv.w / 2, oy: cv.h / 2 + 0 }; };
    const toS = (V, p) => [V.ox + p.x * V.sc, V.oy - p.t * V.sc];
    U.pointer(cv, {
      down: (p) => { const V = view(); drag = ev.findIndex((e) => { const s = toS(V, e); return Math.hypot(s[0] - p.x, s[1] - p.y) < 16; }); if (drag < 0) drag = null; },
      move: (p, down) => { if (down && drag != null) { const V = view(); ev[drag].x = Math.max(-5, Math.min(5, (p.x - V.ox) / V.sc)); ev[drag].t = Math.max(-5, Math.min(5, (V.oy - p.y) / V.sc)); } },
      up: () => { drag = null; }
    });
    function draw() {
      const C = api.colors(), ctx = cv.ctx, V = view(), b = beta.value, g = 1 / Math.sqrt(1 - b * b);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const E = 6;
      const L = (x1, t1, x2, t2, col, w, dash) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w || 1; if (dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(V.ox + x1 * V.sc, V.oy - t1 * V.sc); ctx.lineTo(V.ox + x2 * V.sc, V.oy - t2 * V.sc); ctx.stroke(); ctx.restore(); };
      for (let k = -5; k <= 5; k++) { L(k, -E, k, E, U.alpha(C.ink3, 0.15)); L(-E, k, E, k, U.alpha(C.ink3, 0.15)); }
      L(-E, 0, E, 0, C.ink2, 1.5); L(0, -E, 0, E, C.ink2, 1.5);
      U.text(ctx, 'x', V.ox + 5.4 * V.sc, V.oy - 6, C.ink2, U.ui(12, 700)); U.text(ctx, 'ct', V.ox + 6, V.oy - 5.5 * V.sc + 10, C.ink2, U.ui(12, 700));
      L(-E, -E, E, E, U.alpha(C.points, 0.7), 1.5, [6, 4]); L(-E, E, E, -E, U.alpha(C.points, 0.7), 1.5, [6, 4]);
      // S' axes: ct' axis: x = b t ; x' axis: t = b x. Grid: lines of const x' (x - b t = x' / g) and const t' (t - b x = t'/g)
      if (grid.value) for (let k = -6; k <= 6; k++) {
        if (!k) continue;
        // const x' = k: points (x, t) = g(k + b t'), g(t' + b k) param t'
        L(g * (k + b * -9), g * (-9 + b * k), g * (k + b * 9), g * (9 + b * k), U.alpha(C.accent, 0.18));
        L(g * (-9 + b * k), g * (k + b * -9), g * (9 + b * k), g * (k + b * 9), U.alpha(C.accent, 0.18));
      }
      L(-E * b, -E, E * b, E, C.accent, 2); L(-E, -E * b, E, E * b, C.accent, 2);
      U.text(ctx, "ct′", V.ox + E * 0.9 * b * V.sc + 6, V.oy - E * 0.9 * V.sc, C.accent, U.ui(12, 700));
      U.text(ctx, "x′", V.ox + E * 0.9 * V.sc, V.oy - E * 0.9 * b * V.sc - 6, C.accent, U.ui(12, 700));
      const pr = ev.map((e) => ({ x: g * (e.x - b * e.t), t: g * (e.t - b * e.x) }));
      ev.forEach((e, i) => {
        // line of simultaneity in S' through event: t - b x = const
        const c0 = e.t - b * e.x; L(-E, c0 - b * E, E, c0 + b * E, U.alpha(C.rust, 0.5), 1, [3, 3]);
        const s = toS(V, e); U.dot(ctx, s[0], s[1], 7, i ? C.teal : C.rust, C.surface); U.text(ctx, e.name, s[0] + 10, s[1] - 8, i ? C.teal : C.rust, U.ui(13, 800));
      });
      const dx = ev[1].x - ev[0].x, dt = ev[1].t - ev[0].t, s2 = dt * dt - dx * dx;
      const order = (a, c) => (Math.abs(a - c) < 1e-6 ? 'simultaneous' : a < c ? 'A first' : 'B first');
      out([['γ', g.toFixed(4)], ['A in S (x, ct)', '(' + ev[0].x.toFixed(2) + ', ' + ev[0].t.toFixed(2) + ')'], ["A in S′ (x′, ct′)", '(' + pr[0].x.toFixed(2) + ', ' + pr[0].t.toFixed(2) + ')'], ['B in S (x, ct)', '(' + ev[1].x.toFixed(2) + ', ' + ev[1].t.toFixed(2) + ')'], ["B in S′ (x′, ct′)", '(' + pr[1].x.toFixed(2) + ', ' + pr[1].t.toFixed(2) + ')'],
        ['interval (cΔt)² − Δx²', s2.toFixed(3) + (Math.abs(s2) < 1e-3 ? ' lightlike' : s2 > 0 ? ' timelike' : ' spacelike')], ['order in S / S′', order(ev[0].t, ev[1].t) + ' / ' + order(pr[0].t, pr[1].t)]]);
    }
    api.loop(draw);
  };

  /* =============== Ch20: Photoelectric effect =============== */
  PB.sims.photo = function (api) {
    const cv = api.canvas(0.5, 250);
    const lam = api.slider({ id: 'l', label: 'Light wavelength λ', min: 150, max: 700, step: 1, value: 400, unit: 'nm' });
    const inten = api.slider({ id: 'i', label: 'Light intensity', min: 0, max: 100, step: 1, value: 60, unit: '%' });
    const metal = api.select({ id: 'm', label: 'Cathode metal (work function)', value: '2.28', options: [['2.1', 'Caesium, φ = 2.1 eV'], ['2.28', 'Sodium, φ = 2.28 eV'], ['4.3', 'Zinc, φ = 4.3 eV'], ['4.7', 'Copper, φ = 4.7 eV'], ['5.65', 'Platinum, φ = 5.65 eV']] });
    const Vs = api.slider({ id: 'V', label: 'Anode voltage V (negative = retarding)', min: -4, max: 3, step: 0.01, value: 0, unit: 'V' });
    const out = api.readout();
    let photons = [], electrons = [], acc = 0, hits = [];
    cv.onResize = () => {};
    function draw(dt) {
      const C = api.colors(), ctx = cv.ctx, E = 1240 / lam.value, phi = +metal.value, K = E - phi;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const cx = cv.w * 0.18, ax = cv.w * 0.62, top = 30, bot = cv.h - 30;
      ctx.fillStyle = C.ink2; ctx.fillRect(cx - 8, top, 8, bot - top); ctx.fillRect(ax, top, 8, bot - top);
      U.text(ctx, 'cathode', cx - 4, bot + 16, C.ink2, U.ui(11), 'center'); U.text(ctx, 'anode', ax + 4, bot + 16, C.ink2, U.ui(11), 'center');
      const rgb = lam.value < 380 ? [150, 90, 255] : U.wl2rgb(lam.value);
      acc += dt * inten.value * 0.6;
      while (acc > 1) {
        acc--;
        const x0 = cx + 40 + Math.random() * (ax - cx - 60), ty = top + Math.random() * (bot - top), L = Math.hypot(x0 - cx, ty + 10);
        photons.push({ x: x0, y: -10, ux: (cx - x0) / L, uy: (ty + 10) / L });
      }
      photons.forEach((p) => { p.x += p.ux * dt * 420; p.y += p.uy * dt * 420; });
      photons = photons.filter((p) => { if (p.x <= cx) { if (K > 0 && Math.random() < 0.5) { const ke = Math.random() * K; electrons.push({ x: cx, y: p.y, v: Math.sqrt(ke) * 120, age: 0 }); } return false; } return true; });
      ctx.strokeStyle = 'rgb(' + rgb.join(',') + ')'; ctx.lineWidth = 2;
      photons.forEach((p) => { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.ux * 12, p.y - p.uy * 12); ctx.stroke(); });
      // speed v = 120·sqrt(KE/eV) px/s, so a uniform field doing work eV over the gap gives this acceleration
      const gap = ax - cx, aE = (Vs.value * 120 * 120) / (2 * gap);
      electrons.forEach((e) => { e.v += aE * dt; e.x += e.v * dt; e.age += dt; });
      electrons = electrons.filter((e) => { if (e.x >= ax) { hits.push(performance.now()); return false; } return e.x >= cx - 2 && e.age < 4; });
      electrons.forEach((e) => U.dot(ctx, e.x, e.y, 3, C.teal));
      const now = performance.now(); hits = hits.filter((t) => now - t < 1000);
      const frac = K <= 0 ? 0 : Vs.value >= 0 ? 1 : Math.max(0, Math.min(1, (K + Vs.value) / K));
      const I = (inten.value / 100) * frac;
      // I–V characteristic
      const b = { x: ax + 46, y: 20, w: cv.w - ax - 60, h: cv.h - 60 };
      if (b.w > 80) {
        const m = U.frame(ctx, C, b, [-4, 3], [0, 1.1], { xlabel: 'V', ylabel: 'I', ny: 2, nx: 4 });
        const pts = []; for (let i = 0; i <= 140; i++) { const V = -4 + (7 * i) / 140, fr = K <= 0 ? 0 : V >= 0 ? 1 : Math.max(0, (K + V) / K); pts.push([m.X(V), m.Y((inten.value / 100) * fr)]); }
        U.curve(ctx, pts, C.accent, 2); U.dot(ctx, m.X(Vs.value), m.Y(I), 5, C.points, C.ink);
      }
      out([['photon energy hc/λ', E.toFixed(2) + ' eV'], ['K<sub>max</sub> = hf − φ', K > 0 ? K.toFixed(2) + ' eV' : 'no emission'], ['stopping potential', K > 0 ? K.toFixed(2) + ' V' : '—'], ['threshold wavelength', (1240 / phi).toFixed(0) + ' nm'], ['photocurrent (relative)', (I * 100).toFixed(0) + '%']]);
    }
    api.loop((dt) => draw(dt));
  };

  /* =============== Ch20: Particle in a box =============== */
  PB.sims.box = function (api) {
    const cv = api.canvas(0.56);
    const n1 = api.slider({ id: 'n1', label: 'State n₁', min: 1, max: 6, step: 1, value: 1, format: (v) => String(v) });
    const n2 = api.slider({ id: 'n2', label: 'State n₂ (for superposition)', min: 1, max: 6, step: 1, value: 2, format: (v) => String(v) });
    const sup = api.check({ id: 's', label: 'Equal superposition of n₁ and n₂', value: false });
    const Lw = api.slider({ id: 'L', label: 'Box width L (electron)', min: 0.2, max: 2, step: 0.05, value: 0.5, unit: 'nm' });
    const out = api.readout();
    let t = 0;
    cv.onResize = () => {};
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 40, y: 16, w: cv.w - 56, h: cv.h - 46 };
      const m = U.frame(ctx, C, b, [0, 1], [-2.2, 2.6], { noLabels: true, xlabel: 'x / L', ylabel: 'ψ (thin)  |ψ|² (filled)' });
      const a = n1.value, c = n2.value, s = sup.value && a !== c;
      const wA = a * a, wC = c * c; // E ∝ n²; time in units of ħ/E₁ scaled
      const re = [], im = [], pr = [];
      for (let i = 0; i <= 300; i++) {
        const x = i / 300, pA = Math.SQRT2 * Math.sin(a * Math.PI * x), pC = Math.SQRT2 * Math.sin(c * Math.PI * x);
        let R, I;
        if (s) { R = (pA * Math.cos(wA * t) + pC * Math.cos(wC * t)) / Math.SQRT2; I = (-pA * Math.sin(wA * t) - pC * Math.sin(wC * t)) / Math.SQRT2; }
        else { R = pA * Math.cos(wA * t); I = -pA * Math.sin(wA * t); }
        re.push([m.X(x), m.Y(R)]); im.push([m.X(x), m.Y(I)]); pr.push([m.X(x), m.Y(R * R + I * I)]);
      }
      ctx.beginPath(); ctx.moveTo(m.X(0), m.Y(0)); pr.forEach((p) => ctx.lineTo(p[0], p[1])); ctx.lineTo(m.X(1), m.Y(0)); ctx.closePath(); ctx.fillStyle = U.alpha(C.points, 0.3); ctx.fill();
      U.curve(ctx, pr, C.points, 2);
      U.curve(ctx, re, U.alpha(C.accent, 0.9), 1.4); U.curve(ctx, im, U.alpha(C.rust, 0.7), 1.2, [4, 3]);
      ctx.fillStyle = C.ink2; ctx.fillRect(b.x - 4, b.y, 4, b.h); ctx.fillRect(b.x + b.w, b.y, 4, b.h);
      const E1 = 0.376 / (Lw.value * Lw.value);
      let xm = 0; if (s) { let num = 0, den = 0; for (let i = 0; i <= 400; i++) { const x = i / 400, pA = Math.SQRT2 * Math.sin(a * Math.PI * x), pC = Math.SQRT2 * Math.sin(c * Math.PI * x); const p = (pA * pA + pC * pC + 2 * pA * pC * Math.cos((wC - wA) * t)) / 2; num += x * p; den += p; } xm = num / den; } else xm = 0.5;
      const dE = Math.abs(c * c - a * a) * E1;
      out([['E₁ = h²/8mL²', E1.toFixed(3) + ' eV'], ['E(n₁)', (a * a * E1).toFixed(3) + ' eV'], ['⟨x⟩/L', xm.toFixed(3)], ['photon for n₂ → n₁', dE > 0 ? (1240 / dE).toFixed(0) + ' nm' : '—'], ['nodes inside (state n₁)', String(a - 1)]]);
    }
    api.loop((dt) => { t += dt * 0.8; draw(); });
  };

  /* =============== Ch21: Radioactive decay =============== */
  PB.sims.decay = function (api) {
    const cv = api.canvas(0.56);
    const hA = api.slider({ id: 'a', label: 'Half-life of A', min: 0.5, max: 10, step: 0.1, value: 3, unit: 's', onChange: reset });
    const chain = api.check({ id: 'c', label: 'Chain A → B → C (B also decays)', value: false, onChange: reset });
    const hB = api.slider({ id: 'b', label: 'Half-life of B', min: 0.2, max: 10, step: 0.1, value: 1, unit: 's', onChange: reset });
    api.buttons([{ label: 'Restart', primary: true, onClick: reset }]);
    const out = api.readout();
    const N0 = 400; let st, t, hist;
    cv.onResize = () => {};
    function reset() { st = new Array(N0).fill(0); t = 0; hist = [[0, N0, 0]]; }
    function step(dt) {
      const lA = Math.LN2 / hA.value, lB = Math.LN2 / hB.value, pA = 1 - Math.exp(-lA * dt), pB = 1 - Math.exp(-lB * dt);
      for (let i = 0; i < N0; i++) { if (st[i] === 0 && Math.random() < pA) st[i] = 1; else if (chain.value && st[i] === 1 && Math.random() < pB) st[i] = 2; }
      t += dt; let a = 0, b = 0; st.forEach((s) => { if (s === 0) a++; else if (s === 1) b++; });
      hist.push([t, a, b]);
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const gs = Math.min(cv.h - 20, cv.w * 0.4), cell = gs / 20;
      st.forEach((s, i) => { const x = 10 + (i % 20) * cell, y = 10 + Math.floor(i / 20) * cell; ctx.fillStyle = s === 0 ? C.rust : s === 1 ? (chain.value ? C.teal : C.line) : C.line; ctx.beginPath(); ctx.arc(x + cell / 2, y + cell / 2, cell * 0.38, 0, Math.PI * 2); ctx.fill(); });
      const b = { x: gs + 56, y: 16, w: cv.w - gs - 70, h: cv.h - 48 };
      if (b.w > 80) {
        const tmax = Math.max(5 * hA.value, t);
        const m = U.frame(ctx, C, b, [0, tmax], [0, N0], { xlabel: 't (s)', ylabel: 'N', ny: 4 });
        const lA = Math.LN2 / hA.value, lB = Math.LN2 / hB.value, th = [], thB = [];
        for (let i = 0; i <= 100; i++) { const tt = (tmax * i) / 100; th.push([m.X(tt), m.Y(N0 * Math.exp(-lA * tt))]); if (chain.value) thB.push([m.X(tt), m.Y(Math.abs(lB - lA) < 1e-9 ? N0 * lA * tt * Math.exp(-lA * tt) : ((N0 * lA) / (lB - lA)) * (Math.exp(-lA * tt) - Math.exp(-lB * tt)))]); }
        U.curve(ctx, th, U.alpha(C.ink, 0.6), 1.5, [5, 4]); if (chain.value) U.curve(ctx, thB, U.alpha(C.ink, 0.4), 1.5, [2, 3]);
        U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[1])]), C.rust, 2.2);
        if (chain.value) U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[2])]), C.teal, 2.2);
        for (let k = 1; k <= 5; k++) { ctx.strokeStyle = U.alpha(C.points, 0.3); ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(m.X(k * hA.value), b.y); ctx.lineTo(m.X(k * hA.value), b.y + b.h); ctx.stroke(); ctx.setLineDash([]); }
      }
      const last = hist[hist.length - 1];
      out([['undecayed A', String(last[1])], ['expected N₀e<sup>−λt</sup>', (N0 * Math.exp((-Math.LN2 / hA.value) * t)).toFixed(1)], ['decay constant λ = ln2/T½', (Math.LN2 / hA.value).toFixed(3) + ' 1/s'], ['mean life τ = 1/λ', (hA.value / Math.LN2).toFixed(2) + ' s'], chain.value ? ['nuclei of B', String(last[2])] : ['elapsed', t.toFixed(1) + ' s']]);
    }
    api.loop((dt) => { if (t < 60) step(dt); draw(); });
    reset();
  };
})();
