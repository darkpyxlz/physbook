/* Scibook biology labs. Models are standard textbook models (Hodgkin–Huxley, Hill, Michaelis–Menten,
   Wright–Fisher, Lotka–Volterra, SIR, Jukes–Cantor); parameters are typical values. */
(function () {
  'use strict';
  const PB = window.PB, U = PB.simUtil;
  const f3 = (x) => PB.fmt(x, 3);

  /* ---------- chi-square p-value (regularised upper incomplete gamma) ---------- */
  U.chi2p = function (x, df) {
    const a = df / 2, xx = x / 2;
    if (x <= 0) return 1;
    const lnG = (z) => { const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]; let y = z, t = z + 5.5; t -= (z + 0.5) * Math.log(t); let s = 1.000000000190015; for (let j = 0; j < 6; j++) s += c[j] / ++y; return -t + Math.log(2.5066282746310005 * s / z); };
    if (xx < a + 1) { let sum = 1 / a, del = sum, ap = a; for (let n = 0; n < 200; n++) { ap++; del *= xx / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-10) break; } return 1 - sum * Math.exp(-xx + a * Math.log(xx) - lnG(a)); }
    let b = xx + 1 - a, c = 1e300, d = 1 / b, hh = d;
    for (let i = 1; i < 200; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300; c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; hh *= del; if (Math.abs(del - 1) < 1e-10) break; }
    return Math.exp(-xx + a * Math.log(xx) - lnG(a)) * hh;
  };
  const randn = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
  const binom = (n, p) => { if (n < 60) { let k = 0; for (let i = 0; i < n; i++) if (Math.random() < p) k++; return k; } const m = n * p, s = Math.sqrt(n * p * (1 - p)); return Math.max(0, Math.min(n, Math.round(m + s * randn()))); };

  /* =============== Surface area to volume (Bio 2) =============== */
  PB.sims.savol = function (api) {
    const cv = api.canvas(0.5);
    const L = api.slider({ id: 'L', label: 'Cube side', min: 1, max: 20, step: 1, value: 10, unit: 'mm', onChange: () => { t = 0; } });
    const rate = api.slider({ id: 'r', label: 'Diffusion depth after 10 min', min: 0.5, max: 4, step: 0.1, value: 2, unit: 'mm' });
    api.buttons([{ label: 'Restart', primary: true, onClick: () => { t = 0; } }]);
    const out = api.readout();
    let t = 0;
    cv.onResize = () => {};
    function draw(dt) {
      const C = api.colors(), ctx = cv.ctx;
      t = Math.min(10, t + dt * 1.2);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const side = L.value, d = rate.value * Math.sqrt(t / 10);
      const inner = Math.max(0, side - 2 * d), frac = 1 - Math.pow(inner / side, 3);
      const s = Math.min(cv.h * 0.7, cv.w * 0.4) / 20 * side, x0 = cv.w * 0.25 - s / 2, y0 = cv.h / 2 - s / 2;
      ctx.fillStyle = U.alpha('#c2185b', 0.75); ctx.fillRect(x0, y0, s, s);
      const is = s * inner / side;
      ctx.fillStyle = U.alpha(C.points, 0.35); ctx.fillRect(x0 + (s - is) / 2, y0 + (s - is) / 2, is, is);
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.strokeRect(x0, y0, s, s);
      U.text(ctx, 'pink: reached by the acid', cv.w * 0.25, cv.h - 28, C.ink2, U.ui(11), 'center'); U.text(ctx, 'pale: not reached yet', cv.w * 0.25, cv.h - 13, C.ink2, U.ui(11), 'center');
      const b = { x: cv.w * 0.55, y: 18, w: cv.w * 0.42, h: cv.h - 52 };
      const m = U.frame(ctx, C, b, [0, 21], [0, 6.5], { xlabel: 'cube side (mm)', ylabel: 'SA : V (per mm)', ny: 3 });
      const pts = []; for (let i = 1; i <= 20; i++) pts.push([m.X(i), m.Y(6 / i)]);
      U.curve(ctx, pts, C.accent, 2); U.dot(ctx, m.X(side), m.Y(6 / side), 5, C.points, C.ink);
      out([['surface area', 6 * side * side + ' mm²'], ['volume', side * side * side + ' mm³'], ['SA : V', (6 / side).toFixed(2) + ' per mm'], ['time', t.toFixed(1) + ' min'], ['volume reached', (frac * 100).toFixed(1) + '%']]);
    }
    api.loop((dt) => draw(dt));
  };

  /* =============== Membrane potential: Nernst and GHK (Bio 3) =============== */
  PB.sims.ghk = function (api) {
    const cv = api.canvas(0.5);
    const Ko = api.slider({ id: 'ko', label: '[K⁺] outside', min: 1, max: 100, step: 0.5, value: 5, unit: 'mM', onChange: () => draw() });
    const Ki = api.slider({ id: 'ki', label: '[K⁺] inside', min: 50, max: 200, step: 1, value: 140, unit: 'mM', onChange: () => draw() });
    const Nao = api.slider({ id: 'nao', label: '[Na⁺] outside', min: 50, max: 200, step: 1, value: 145, unit: 'mM', onChange: () => draw() });
    const Nai = api.slider({ id: 'nai', label: '[Na⁺] inside', min: 2, max: 50, step: 0.5, value: 12, unit: 'mM', onChange: () => draw() });
    const pNa = api.slider({ id: 'pna', label: 'P_Na / P_K', min: 0, max: 20, step: 0.01, value: 0.04, onChange: () => draw() });
    api.buttons([{ label: 'Resting (P_Na/P_K = 0.04)', onClick: () => { pNa.value = 0.04; draw(); } }, { label: 'Peak of action potential (20)', onClick: () => { pNa.value = 20; draw(); } }]);
    const out = api.readout();
    const Cli = 7, Clo = 110, pCl = 0.45, k = 61.54; // mV at 37 °C
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const EK = k * Math.log10(Ko.value / Ki.value), ENa = k * Math.log10(Nao.value / Nai.value), ECl = -k * Math.log10(Clo / Cli);
      const Vm = k * Math.log10((Ko.value + pNa.value * Nao.value + pCl * Cli) / (Ki.value + pNa.value * Nai.value + pCl * Clo));
      const b = { x: 60, y: 16, w: cv.w - 80, h: cv.h - 40 };
      const m = U.frame(ctx, C, b, [0, 4], [-120, 80], { xticks: [], ylabel: 'mV', ny: 5 });
      [['E_K', EK, C.accent], ['E_Na', ENa, C.rust], ['E_Cl', ECl, C.teal], ['V_m (GHK)', Vm, C.points]].forEach((r, i) => {
        const x = b.x + (i + 0.5) * b.w / 4;
        ctx.strokeStyle = r[2]; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 30, m.Y(r[1])); ctx.lineTo(x + 30, m.Y(r[1])); ctx.stroke();
        U.text(ctx, r[0], x, b.y + b.h - 6, r[2], U.ui(12, 700), 'center');
        U.text(ctx, r[1].toFixed(0) + ' mV', x, m.Y(r[1]) - 8, C.ink, U.mono(11, 600), 'center');
      });
      out([['E_K (Nernst)', EK.toFixed(1) + ' mV'], ['E_Na (Nernst)', ENa.toFixed(1) + ' mV'], ['E_Cl (fixed: 7 in, 110 out)', ECl.toFixed(1) + ' mV'], ['membrane potential (GHK)', Vm.toFixed(1) + ' mV'], ['nearest to', Math.abs(Vm - EK) < Math.abs(Vm - ENa) ? 'E_K: K⁺ dominates' : 'E_Na: Na⁺ dominates']]);
    }
    draw();
  };

  /* =============== Enzyme kinetics and inhibition (Bio 4) =============== */
  PB.sims.enzyme = function (api) {
    const cv = api.canvas(0.5);
    const Vm = api.slider({ id: 'v', label: 'V_max', min: 10, max: 200, step: 1, value: 100, unit: 'μmol/min', onChange: () => draw() });
    const Km = api.slider({ id: 'k', label: 'K_M', min: 0.1, max: 10, step: 0.1, value: 2, unit: 'mM', onChange: () => draw() });
    const type = api.select({ id: 't', label: 'Inhibitor', value: 'comp', options: [['none', 'None'], ['comp', 'Competitive'], ['non', 'Non-competitive'], ['unc', 'Uncompetitive']], onChange: () => draw() });
    const I = api.slider({ id: 'i', label: '[I] / K_i', min: 0, max: 5, step: 0.1, value: 1, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const a = 1 + I.value, t = type.value;
      const Kapp = t === 'comp' ? Km.value * a : t === 'unc' ? Km.value / a : Km.value;
      const Vapp = t === 'non' || t === 'unc' ? Vm.value / a : Vm.value;
      const v = (S, K, V) => (V * S) / (K + S);
      const w2 = (cv.w - 50) / 2;
      const b1 = { x: 44, y: 22, w: w2 - 40, h: cv.h - 56 }, b2 = { x: 44 + w2 + 10, y: 22, w: w2 - 40, h: cv.h - 56 };
      const m1 = U.frame(ctx, C, b1, [0, 20], [0, Vm.value * 1.1], { xlabel: '[S] (mM)', ylabel: 'v', ny: 4 });
      const p0 = [], p1 = []; for (let i = 0; i <= 200; i++) { const S = (20 * i) / 200; p0.push([m1.X(S), m1.Y(v(S, Km.value, Vm.value))]); p1.push([m1.X(S), m1.Y(v(S, Kapp, Vapp))]); }
      U.curve(ctx, p0, U.alpha(C.ink3, 0.8), 1.5, [5, 4]); if (t !== 'none') U.curve(ctx, p1, C.rust, 2.4); else U.curve(ctx, p0, C.accent, 2.4);
      U.text(ctx, 'Michaelis–Menten', b1.x + 4, b1.y - 6, C.ink, U.ui(12, 700));
      const xm = 2.5, ym = Math.max(3 / Vm.value, (1 / Vapp) * (1 + Kapp * xm)) * 1.1;
      const m2 = U.frame(ctx, C, b2, [-1.2, xm], [0, ym], { xlabel: '1/[S]', ylabel: '1/v', ny: 3, yfmt: (q) => q.toFixed(3) });
      U.clip(ctx, b2);
      const lb = (K, V) => [[m2.X(-1.2), m2.Y((1 / V) * (1 - 1.2 * K))], [m2.X(xm), m2.Y((1 / V) * (1 + K * xm))]];
      U.curve(ctx, lb(Km.value, Vm.value), U.alpha(C.ink3, 0.8), 1.5, [5, 4]); if (t !== 'none') U.curve(ctx, lb(Kapp, Vapp), C.rust, 2.4); else U.curve(ctx, lb(Km.value, Vm.value), C.accent, 2.4);
      ctx.restore();
      U.text(ctx, 'Lineweaver–Burk', b2.x + 4, b2.y - 6, C.ink, U.ui(12, 700));
      out([['apparent K_M', Kapp.toFixed(2) + ' mM'], ['apparent V_max', Vapp.toFixed(1)], ['y-intercept 1/V_max', (1 / Vapp).toFixed(4)], ['x-intercept −1/K_M', (-1 / Kapp).toFixed(3)]]);
    }
    draw();
  };

  /* =============== ATP budget (Bio 5) =============== */
  PB.sims.atpbudget = function (api) {
    const cv = api.canvas(0.5);
    const sub = api.select({ id: 's', label: 'Fuel', value: 'glc', options: [['glc', 'Glucose, aerobic'], ['ana', 'Glucose, anaerobic (fermentation)'], ['palm', 'Palmitate (C16 fatty acid), aerobic']], onChange: () => draw() });
    const shuttle = api.select({ id: 'sh', label: 'Shuttle for cytosolic NADH', value: '2.5', options: [['2.5', 'Malate–aspartate (2.5 ATP per NADH)'], ['1.5', 'Glycerol phosphate (1.5 ATP per NADH)']], onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function stages() {
      const sh = +shuttle.value;
      if (sub.value === 'ana') return [['Glycolysis (substrate level)', 2, 0, 0], ['NADH reoxidised by fermentation', 0, 0, 0]];
      if (sub.value === 'glc') return [['Glycolysis', 2, 2 * sh, 0], ['Link reaction (2 NADH)', 0, 5, 0], ['Krebs cycle (2 GTP, 6 NADH, 2 FADH₂)', 2, 15, 3]];
      return [['Activation', -2, 0, 0], ['β-oxidation (7 NADH, 7 FADH₂)', 0, 17.5, 10.5], ['Krebs cycle × 8 acetyl-CoA', 8, 60, 12]];
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, st = stages();
      ctx.clearRect(0, 0, cv.w, cv.h);
      const tot = st.reduce((a, s) => a + s[1] + s[2] + s[3], 0);
      const b = { x: 54, y: 20, w: cv.w - 70, h: cv.h - 60 };
      const max = sub.value === 'palm' ? 120 : 40;
      const m = U.frame(ctx, C, b, [0, st.length], [Math.min(0, -2), max], { xticks: [], ylabel: 'ATP per molecule of fuel', ny: 4 });
      st.forEach((s, i) => {
        const x = b.x + (i + 0.2) * b.w / st.length, w = b.w / st.length * 0.6;
        let y0 = 0;
        [[s[1], C.points, 'substrate-level'], [s[2], C.accent, 'from NADH'], [s[3], C.teal, 'from FADH₂']].forEach((part) => { if (!part[0]) return; ctx.fillStyle = part[1]; const top = m.Y(y0 + part[0]), bot = m.Y(y0); ctx.fillRect(x, Math.min(top, bot), w, Math.abs(bot - top)); y0 += part[0]; });
        U.text(ctx, s[0], x + w / 2, b.y + b.h + 14, C.ink2, U.ui(10.5), 'center');
      });
      U.text(ctx, '■ substrate-level', b.x + b.w - 8, b.y + 14, C.points, U.ui(11), 'right'); U.text(ctx, '■ via NADH', b.x + b.w - 8, b.y + 30, C.accent, U.ui(11), 'right'); U.text(ctx, '■ via FADH₂', b.x + b.w - 8, b.y + 46, C.teal, U.ui(11), 'right');
      const dG = sub.value === 'palm' ? 9790 : 2870;
      out([['total ATP', tot.toFixed(1)], ['energy captured (30.5 kJ per ATP)', (tot * 30.5).toFixed(0) + ' kJ/mol'], ['efficiency', (100 * tot * 30.5 / dG).toFixed(0) + '% of ' + dG + ' kJ/mol'], ['P/O ratios used', 'NADH 2.5, FADH₂ 1.5']]);
    }
    draw();
  };

  /* =============== Limiting factors in photosynthesis (Bio 6) =============== */
  PB.sims.photosynth = function (api) {
    const cv = api.canvas(0.52);
    const light = api.slider({ id: 'l', label: 'Light intensity', min: 0, max: 2000, step: 10, value: 600, unit: 'μmol m⁻² s⁻¹', onChange: () => draw() });
    const co2 = api.slider({ id: 'c', label: 'CO₂ concentration', min: 100, max: 1500, step: 10, value: 420, unit: 'ppm', onChange: () => draw() });
    const T = api.slider({ id: 't', label: 'Temperature', min: 0, max: 45, step: 1, value: 25, unit: '°C', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const Rd = 1.5;
    const tempF = (t) => Math.max(0, Math.exp(-Math.pow((t - 30) / 16, 2)));
    const rate = (I, c, t) => { const lightLim = 25 * I / (I + 400), co2Lim = 40 * (c - 50) / (c + 400) * tempF(t) + 0.1; return Math.min(lightLim, co2Lim) - Rd; };
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 18, w: cv.w - 70, h: cv.h - 52 };
      const m = U.frame(ctx, C, b, [0, 2000], [-3, 30], { xlabel: 'light intensity', ylabel: 'net CO₂ uptake (μmol m⁻² s⁻¹)', ny: 4 });
      [[co2.value, T.value, C.accent, 'current'], [1000, T.value, U.alpha(C.teal, 0.7), 'CO₂ 1000 ppm'], [co2.value, 15, U.alpha(C.rust, 0.7), '15 °C']].forEach((s, k) => {
        const pts = []; for (let i = 0; i <= 200; i++) { const I = (2000 * i) / 200; pts.push([m.X(I), m.Y(rate(I, s[0], s[1]))]); }
        U.curve(ctx, pts, s[2], k ? 1.5 : 2.5, k ? [5, 4] : null);
        U.text(ctx, s[3], m.X(2000) - 4, m.Y(rate(2000, s[0], s[1])) - 6, s[2], U.ui(11, 700), 'right');
      });
      const r = rate(light.value, co2.value, T.value);
      U.dot(ctx, m.X(light.value), m.Y(r), 5, C.points, C.ink);
      const lightLim = 25 * light.value / (light.value + 400), co2Lim = 40 * (co2.value - 50) / (co2.value + 400) * tempF(T.value) + 0.1;
      const comp = (() => { for (let I = 0; I <= 2000; I += 1) if (rate(I, co2.value, T.value) >= 0) return I; return null; })();
      out([['net rate', r.toFixed(1) + ' μmol m⁻² s⁻¹'], ['limiting factor', lightLim < co2Lim ? 'light' : (tempF(T.value) < 0.8 ? 'CO₂ and temperature (enzymes)' : 'CO₂ (Calvin cycle)')], ['compensation point', comp == null ? 'never reached' : comp + ' μmol m⁻² s⁻¹'], ['respiration', Rd + ' μmol m⁻² s⁻¹']]);
    }
    draw();
  };

  /* =============== Mitotic index (Bio 7) =============== */
  PB.sims.mitosis = function (api) {
    const cv = api.canvas(0.55);
    const PH = [['G₁', 10, '#9aa6bf'], ['S', 8, '#7c9cff'], ['G₂', 4, '#4fc7c3'], ['Prophase', 1, '#f0a145'], ['Metaphase', 0.4, '#ff8a66'], ['Anaphase', 0.2, '#e0379b'], ['Telophase', 0.4, '#a36be0']];
    const len = api.slider({ id: 'g1', label: 'Length of G₁', min: 2, max: 40, step: 1, value: 10, unit: 'h', onChange: () => { PH[0][1] = len.value; snap(); } });
    api.buttons([{ label: 'New field of view', primary: true, onClick: snap }]);
    const out = api.readout();
    let cells = [];
    cv.onResize = () => snap();
    function snap() {
      const tot = PH.reduce((a, p) => a + p[1], 0);
      cells = [];
      const nx = Math.floor((cv.w * 0.6) / 26), ny = Math.floor((cv.h - 20) / 26);
      for (let i = 0; i < nx * ny; i++) { let u = Math.random() * tot, k = 0; while (u > PH[k][1]) { u -= PH[k][1]; k++; } cells.push({ x: 14 + (i % nx) * 26 + (Math.random() - 0.5) * 4, y: 14 + Math.floor(i / nx) * 26 + (Math.random() - 0.5) * 4, k: k }); }
      draw();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      cells.forEach((c) => {
        ctx.fillStyle = U.alpha(C.points, 0.12); ctx.beginPath(); ctx.arc(c.x + 10, c.y + 10, 11, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = PH[c.k][2];
        if (c.k <= 3) { ctx.beginPath(); ctx.arc(c.x + 10, c.y + 10, c.k === 3 ? 6 : 5, 0, Math.PI * 2); ctx.fill(); }
        else if (c.k === 4) ctx.fillRect(c.x + 8, c.y + 2, 4, 16);
        else if (c.k === 5) { ctx.fillRect(c.x + 3, c.y + 4, 3, 12); ctx.fillRect(c.x + 14, c.y + 4, 3, 12); }
        else { ctx.beginPath(); ctx.arc(c.x + 5, c.y + 10, 4, 0, Math.PI * 2); ctx.arc(c.x + 15, c.y + 10, 4, 0, Math.PI * 2); ctx.fill(); }
      });
      const counts = PH.map((_, k) => cells.filter((c) => c.k === k).length), n = cells.length, cyc = PH.reduce((a, p) => a + p[1], 0);
      const mit = counts.slice(3).reduce((a, b) => a + b, 0);
      const lx = cv.w * 0.66;
      PH.forEach((p, k) => { ctx.fillStyle = p[2]; ctx.fillRect(lx, 20 + k * 22, 12, 12); U.text(ctx, p[0] + ': ' + counts[k] + ' (' + (counts[k] / n * cyc).toFixed(1) + ' h)', lx + 18, 30 + k * 22, C.ink, U.ui(12)); });
      U.text(ctx, 'time ≈ fraction × ' + cyc.toFixed(0) + ' h', lx, 30 + 7 * 22 + 8, C.ink2, U.ui(11));
      out([['cells counted', String(n)], ['mitotic index', (100 * mit / n).toFixed(1) + '%'], ['true mitosis duration', PH.slice(3).reduce((a, p) => a + p[1], 0).toFixed(1) + ' h'], ['estimate from counts', (mit / n * cyc).toFixed(2) + ' h']]);
    }
    snap();
  };

  /* =============== PCR amplification (Bio 8) =============== */
  PB.sims.pcr = function (api) {
    const cv = api.canvas(0.52);
    const N0 = api.slider({ id: 'n', label: 'Starting copies', min: 0, max: 8, step: 0.1, value: 3, format: (v) => '10^' + v.toFixed(1), onChange: () => draw() });
    const eff = api.slider({ id: 'e', label: 'Efficiency per cycle', min: 50, max: 100, step: 1, value: 95, unit: '%', onChange: () => draw() });
    const log = api.check({ id: 'l', label: 'Logarithmic y-axis', value: true, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const Nmax = 1e12, thr = 1e10;
    function copies(c) { let n = Math.pow(10, N0.value); for (let i = 0; i < c; i++) n += n * (eff.value / 100) * (1 - n / Nmax); return n; }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 60, y: 18, w: cv.w - 76, h: cv.h - 50 };
      const lg = log.value;
      const m = U.frame(ctx, C, b, [0, 40], lg ? [0, 12.5] : [0, Nmax * 1.05], { xlabel: 'cycle', ylabel: lg ? 'log₁₀ copies' : 'copies', ny: 4 });
      const pts = []; let ct = null, prev = Math.pow(10, N0.value);
      for (let c = 0; c <= 40; c++) { const n = copies(c); pts.push([m.X(c), m.Y(lg ? Math.log10(n) : n)]); if (ct == null && n >= thr) ct = c - 1 + (Math.log10(thr) - Math.log10(prev)) / (Math.log10(n) - Math.log10(prev) || 1); prev = n; }
      U.curve(ctx, pts, C.accent, 2.5);
      ctx.strokeStyle = U.alpha(C.rust, 0.7); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(b.x, m.Y(lg ? 10 : thr)); ctx.lineTo(b.x + b.w, m.Y(lg ? 10 : thr)); ctx.stroke(); ctx.setLineDash([]);
      U.text(ctx, 'detection threshold', b.x + b.w - 4, m.Y(lg ? 10 : thr) - 5, C.rust, U.ui(11), 'right');
      if (ct != null) U.dot(ctx, m.X(ct), m.Y(lg ? 10 : thr), 5, C.points, C.ink);
      out([['threshold cycle Ct', ct == null ? 'not reached' : ct.toFixed(1)], ['copies after 30 cycles', f3(copies(30))], ['ideal doubling', 'Nₙ = N₀ · 2ⁿ'], ['tenfold more template', 'Ct earlier by ' + (Math.log(10) / Math.log(1 + eff.value / 100)).toFixed(2) + ' cycles']]);
    }
    draw();
  };

  /* =============== From gene to protein (Bio 9) =============== */
  const CODE = (() => {
    const b = 'UCAG', aa = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG', t = {};
    let i = 0; for (const x of b) for (const y of b) for (const z of b) t[x + y + z] = aa[i++];
    return t;
  })();
  PB.geneticCode = CODE;
  const AA3 = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': 'STOP', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly' };
  PB.aa3 = AA3;
  PB.sims.translate = function (api) {
    const cv = api.canvas(0.42, 240);
    let seq = '', orig = '', note = 'new gene';
    const mk = () => { const codons = Object.keys(CODE).filter((c) => CODE[c] !== '*'); let s = 'AUG'; for (let i = 0; i < 9; i++) s += codons[Math.floor(Math.random() * codons.length)]; s += 'UAA'; return s.replace(/U/g, 'T'); };
    api.buttons([
      { label: 'New gene', primary: true, onClick: () => { seq = orig = mk(); note = 'new gene'; draw(); } },
      { label: 'Point substitution', onClick: () => { const i = 3 + Math.floor(Math.random() * (seq.length - 6)); const bases = 'ACGT'.replace(seq[i], ''); seq = seq.slice(0, i) + bases[Math.floor(Math.random() * 3)] + seq.slice(i + 1); note = 'substitution at base ' + (i + 1); draw(); } },
      { label: 'Insert a base', onClick: () => { const i = 3 + Math.floor(Math.random() * (seq.length - 6)); seq = seq.slice(0, i) + 'ACGT'[Math.floor(Math.random() * 4)] + seq.slice(i); note = 'insertion at base ' + (i + 1); draw(); } },
      { label: 'Delete a base', onClick: () => { const i = 3 + Math.floor(Math.random() * (seq.length - 6)); seq = seq.slice(0, i) + seq.slice(i + 1); note = 'deletion at base ' + (i + 1); draw(); } },
      { label: 'Reset', onClick: () => { seq = orig; note = 'original'; draw(); } }
    ]);
    const out = api.readout();
    cv.onResize = () => draw();
    const tr = (s) => { const r = []; const m = s.replace(/T/g, 'U'); for (let i = 0; i + 2 < m.length; i += 3) { const a = CODE[m.slice(i, i + 3)]; r.push(a); if (a === '*') break; } return r; };
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const p0 = tr(orig), p1 = tr(seq), m = seq.replace(/T/g, 'U');
      const cw = Math.min(26, (cv.w - 120) / 15);
      U.text(ctx, 'DNA (coding)', 10, 34, C.ink2, U.ui(11, 700)); U.text(ctx, 'mRNA', 10, 74, C.ink2, U.ui(11, 700)); U.text(ctx, 'protein', 10, 114, C.ink2, U.ui(11, 700)); U.text(ctx, 'original', 10, 154, C.ink3, U.ui(11, 700));
      for (let k = 0; k * 3 < m.length && k < 15; k++) {
        const x = 100 + k * cw * 1.0;
        const cod = m.slice(k * 3, k * 3 + 3);
        ctx.fillStyle = U.alpha(k % 2 ? C.accent : C.teal, 0.12); ctx.fillRect(x, 20, cw - 2, 60);
        U.text(ctx, seq.slice(k * 3, k * 3 + 3), x + cw / 2 - 1, 38, C.ink, U.mono(10.5, 600), 'center');
        U.text(ctx, cod, x + cw / 2 - 1, 74, C.accent, U.mono(10.5, 600), 'center');
        if (p1[k]) U.text(ctx, AA3[p1[k]], x + cw / 2 - 1, 114, p1[k] !== p0[k] ? C.rust : C.ink, U.mono(10, 700), 'center');
        if (p0[k]) U.text(ctx, AA3[p0[k]], x + cw / 2 - 1, 154, C.ink3, U.mono(10, 500), 'center');
      }
      let kind = 'none';
      if (seq !== orig) {
        if (seq.length !== orig.length) kind = (Math.abs(seq.length - orig.length) % 3 ? 'frameshift' : 'in-frame indel');
        else if (p1.join('') === p0.join('')) kind = 'silent';
        else if (p1.indexOf('*') >= 0 && p1.indexOf('*') < p0.length - 1) kind = 'nonsense (premature stop)';
        else kind = 'missense';
      }
      out([['change', note], ['effect on protein', kind], ['protein length', p1.filter((a) => a !== '*').length + ' amino acids (was ' + p0.filter((a) => a !== '*').length + ')'], ['start / stop codons', 'AUG / UAA, UAG, UGA']]);
    }
    seq = orig = mk(); draw();
  };

  /* =============== Crosses and the χ² test (Bio 10) =============== */
  PB.sims.punnett = function (api) {
    const cv = api.canvas(0.52);
    const CROSS = { mono: ['Aa × Aa', [['dominant', 3], ['recessive', 1]]], test: ['Aa × aa (test cross)', [['dominant', 1], ['recessive', 1]]], di: ['AaBb × AaBb', [['A_B_', 9], ['A_bb', 3], ['aaB_', 3], ['aabb', 1]]], ditest: ['AaBb × aabb', [['AaBb', 1], ['Aabb', 1], ['aaBb', 1], ['aabb', 1]]] };
    const cr = api.select({ id: 'c', label: 'Cross', value: 'di', options: Object.keys(CROSS).map((k) => [k, CROSS[k][0]]), onChange: breed });
    const n = api.slider({ id: 'n', label: 'Offspring counted', min: 16, max: 1000, step: 4, value: 160, format: (v) => String(v), onChange: breed });
    api.buttons([{ label: 'Breed again', primary: true, onClick: breed }]);
    const out = api.readout();
    let obs = [];
    cv.onResize = () => draw();
    function breed() {
      const cls = CROSS[cr.value][1], tot = cls.reduce((a, c) => a + c[1], 0);
      obs = cls.map(() => 0);
      for (let i = 0; i < n.value; i++) { let u = Math.random() * tot, k = 0; while (u > cls[k][1]) { u -= cls[k][1]; k++; } obs[k]++; }
      draw();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, cls = CROSS[cr.value][1], tot = cls.reduce((a, c) => a + c[1], 0);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const exp = cls.map((c) => (n.value * c[1]) / tot);
      const b = { x: 54, y: 18, w: cv.w - 70, h: cv.h - 50 };
      const max = Math.max(...obs, ...exp) * 1.15;
      const m = U.frame(ctx, C, b, [0, cls.length], [0, max], { xticks: [], ylabel: 'offspring', ny: 4 });
      cls.forEach((c, i) => {
        const x = b.x + (i + 0.2) * b.w / cls.length, w = b.w / cls.length * 0.28;
        ctx.fillStyle = C.accent; ctx.fillRect(x, m.Y(obs[i]), w, m.Y(0) - m.Y(obs[i]));
        ctx.fillStyle = U.alpha(C.points, 0.5); ctx.fillRect(x + w + 4, m.Y(exp[i]), w, m.Y(0) - m.Y(exp[i]));
        U.text(ctx, c[0], x + w, b.y + b.h + 14, C.ink, U.ui(12, 700), 'center');
      });
      U.text(ctx, 'blue = observed, orange = expected (' + cls.map((c) => c[1]).join(' : ') + ')', b.x + 6, b.y + 12, C.ink2, U.ui(11));
      const chi = obs.reduce((a, o, i) => a + Math.pow(o - exp[i], 2) / exp[i], 0), df = cls.length - 1, p = U.chi2p(chi, df);
      out([['χ²', chi.toFixed(2)], ['degrees of freedom', String(df)], ['p-value', p.toFixed(3)], ['verdict (5% level)', p > 0.05 ? 'consistent with the expected ratio' : 'significant deviation']]);
    }
    breed();
  };

  /* =============== Linkage and recombination (Bio 11) =============== */
  PB.sims.linkage = function (api) {
    const cv = api.canvas(0.5);
    const d = api.slider({ id: 'd', label: 'Map distance between genes', min: 0, max: 150, step: 1, value: 20, unit: 'cM', onChange: () => cross() });
    const n = api.slider({ id: 'n', label: 'Test-cross offspring', min: 50, max: 2000, step: 50, value: 400, format: (v) => String(v), onChange: () => cross() });
    api.buttons([{ label: 'Cross again', primary: true, onClick: cross }]);
    const out = api.readout();
    let counts = [0, 0, 0, 0];
    cv.onResize = () => draw();
    const haldane = (x) => 0.5 * (1 - Math.exp(-2 * x / 100));
    function cross() { const r = haldane(d.value); counts = [0, 0, 0, 0]; for (let i = 0; i < n.value; i++) { const rec = Math.random() < r, half = Math.random() < 0.5; counts[(rec ? 2 : 0) + (half ? 1 : 0)]++; } draw(); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const half = cv.w * 0.5;
      const b = { x: 50, y: 18, w: half - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 4], [0, n.value * 0.55], { xticks: [], ylabel: 'offspring', ny: 4 });
      ['AB', 'ab', 'Ab', 'aB'].forEach((lab, i) => { const x = b.x + (i + 0.2) * b.w / 4; ctx.fillStyle = i < 2 ? C.accent : C.rust; ctx.fillRect(x, m.Y(counts[i]), b.w / 4 * 0.6, m.Y(0) - m.Y(counts[i])); U.text(ctx, lab, x + b.w / 8 * 0.6, b.y + b.h + 14, C.ink, U.ui(11, 700), 'center'); });
      U.text(ctx, 'blue: parental   red: recombinant', b.x + b.w - 4, b.y + 14, C.ink2, U.ui(10.5), 'right');
      const b2 = { x: half + 40, y: 18, w: half - 56, h: cv.h - 50 };
      const m2 = U.frame(ctx, C, b2, [0, 150], [0, 0.6], { xlabel: 'map distance (cM)', ylabel: 'recombination frequency', ny: 3 });
      const p1 = [], p2 = []; for (let x = 0; x <= 150; x += 2) { p1.push([m2.X(x), m2.Y(haldane(x))]); p2.push([m2.X(x), m2.Y(Math.min(0.6, x / 100))]); }
      U.curve(ctx, p2, U.alpha(C.ink3, 0.7), 1.5, [5, 4]); U.curve(ctx, p1, C.teal, 2.4);
      const rObs = (counts[2] + counts[3]) / n.value;
      U.dot(ctx, m2.X(d.value), m2.Y(rObs), 5, C.points, C.ink);
      out([['recombinant fraction (observed)', (rObs * 100).toFixed(1) + '%'], ['expected (Haldane)', (haldane(d.value) * 100).toFixed(1) + '%'], ['naive map distance from data', (rObs * 100).toFixed(1) + ' cM'], ['why the curve flattens', 'double crossovers are invisible; RF never exceeds 50%']]);
    }
    cross();
  };

  /* =============== Genetic drift and selection (Bio 12) =============== */
  PB.sims.drift = function (api) {
    const cv = api.canvas(0.55);
    const N = api.slider({ id: 'n', label: 'Population size N', min: 10, max: 2000, step: 10, value: 50, format: (v) => String(v), onChange: run });
    const p0 = api.slider({ id: 'p', label: 'Starting frequency of allele A', min: 0.01, max: 0.99, step: 0.01, value: 0.5, onChange: run });
    const s = api.slider({ id: 's', label: 'Selection coefficient favouring A', min: -0.1, max: 0.1, step: 0.005, value: 0, onChange: run });
    api.buttons([{ label: 'Run 12 populations', primary: true, onClick: run }]);
    const out = api.readout();
    let lines = [];
    const G = 200;
    cv.onResize = () => draw();
    function run() {
      lines = [];
      for (let k = 0; k < 12; k++) {
        let p = p0.value; const tr = [p];
        for (let g = 0; g < G; g++) { const w = p * (1 + s.value) / (p * (1 + s.value) + (1 - p)); p = binom(2 * N.value, w) / (2 * N.value); tr.push(p); }
        lines.push(tr);
      }
      draw();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 50, y: 18, w: cv.w - 66, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, G], [0, 1], { xlabel: 'generation', ylabel: 'frequency of A', ny: 4 });
      const cols = [C.accent, C.teal, C.rust, C.points];
      lines.forEach((tr, k) => U.curve(ctx, tr.map((p, g) => [m.X(g), m.Y(p)]), U.alpha(cols[k % 4], 0.8), 1.5));
      const fixed = lines.filter((tr) => tr[G] === 1).length, lost = lines.filter((tr) => tr[G] === 0).length;
      const Ne = N.value, sv = s.value;
      const u = Math.abs(sv) < 1e-6 ? p0.value : (1 - Math.exp(-4 * Ne * sv * p0.value)) / (1 - Math.exp(-4 * Ne * sv));
      out([['fixed (A = 100%)', fixed + ' of 12'], ['lost (A = 0%)', lost + ' of 12'], ['Kimura fixation probability', (u * 100).toFixed(1) + '%'], ['expected heterozygosity after 200 gen', (2 * p0.value * (1 - p0.value) * Math.pow(1 - 1 / (2 * Ne), G)).toFixed(3) + ' (no selection)']]);
    }
    run();
  };

  /* =============== Haemoglobin oxygen dissociation (Bio 13) =============== */
  PB.sims.oxygen = function (api) {
    const cv = api.canvas(0.52);
    const pH = api.slider({ id: 'ph', label: 'Blood pH', min: 7.0, max: 7.8, step: 0.01, value: 7.4, onChange: () => draw() });
    const T = api.slider({ id: 't', label: 'Temperature', min: 30, max: 43, step: 0.5, value: 37, unit: '°C', onChange: () => draw() });
    const ptis = api.slider({ id: 'pt', label: 'pO₂ in active muscle', min: 5, max: 60, step: 1, value: 25, unit: 'mmHg', onChange: () => draw() });
    const mb = api.check({ id: 'm', label: 'Show myoglobin', value: true, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const n = 2.7;
    const P50 = () => 26.8 * Math.pow(10, -0.48 * (pH.value - 7.4)) * Math.pow(1.024, T.value - 37);
    const sat = (p, P) => Math.pow(p, n) / (Math.pow(P, n) + Math.pow(p, n));
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 18, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 120], [0, 100], { xlabel: 'pO₂ (mmHg)', ylabel: 'saturation (%)', ny: 4 });
      const P = P50(), std = [], cur = [], myo = [];
      for (let i = 0; i <= 240; i++) { const p = i / 2; std.push([m.X(p), m.Y(100 * sat(p, 26.8))]); cur.push([m.X(p), m.Y(100 * sat(p, P))]); myo.push([m.X(p), m.Y(100 * p / (p + 2.8))]); }
      U.curve(ctx, std, U.alpha(C.ink3, 0.8), 1.5, [5, 4]); U.curve(ctx, cur, C.rust, 2.5);
      if (mb.value) { U.curve(ctx, myo, C.teal, 2); U.text(ctx, 'myoglobin', m.X(8) + 4, m.Y(78), C.teal, U.ui(11, 700)); }
      U.text(ctx, 'haemoglobin', m.X(40) + 6, m.Y(100 * sat(40, P)) + 14, C.rust, U.ui(11, 700));
      [100, ptis.value].forEach((p) => { ctx.strokeStyle = U.alpha(C.ink3, 0.5); ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(m.X(p), b.y); ctx.lineTo(m.X(p), b.y + b.h); ctx.stroke(); ctx.setLineDash([]); U.dot(ctx, m.X(p), m.Y(100 * sat(p, P)), 4, C.points); });
      U.text(ctx, 'lungs', m.X(100) - 3, b.y + b.h - 8, C.ink2, U.ui(11), 'right'); U.text(ctx, 'muscle', m.X(ptis.value) + 3, b.y + b.h - 8, C.ink2, U.ui(11));
      const unload = 100 * (sat(100, P) - sat(ptis.value, P));
      out([['P₅₀', P.toFixed(1) + ' mmHg (normal 26.8)'], ['saturation in lungs', (100 * sat(100, P)).toFixed(1) + '%'], ['saturation in muscle', (100 * sat(ptis.value, P)).toFixed(1) + '%'], ['fraction of O₂ unloaded', unload.toFixed(1) + '%'], ['shift', P > 27.5 ? 'right (Bohr effect: more unloading)' : P < 26 ? 'left (holds O₂ tighter)' : 'normal']]);
    }
    draw();
  };

  /* =============== Hodgkin–Huxley action potential (Bio 14) =============== */
  PB.sims.hh = function (api) {
    const cv = api.canvas(0.55);
    const amp = api.slider({ id: 'a', label: 'Stimulus current', min: 0, max: 40, step: 0.5, value: 10, unit: 'μA/cm²' });
    const dur = api.slider({ id: 'd', label: 'Stimulus duration', min: 0.1, max: 5, step: 0.1, value: 1, unit: 'ms' });
    const rep = api.check({ id: 'r', label: 'Constant current (repetitive firing)', value: false });
    const ttx = api.check({ id: 't', label: 'Block Na⁺ channels (tetrodotoxin)', value: false });
    api.buttons([{ label: 'Stimulate', primary: true, onClick: () => { stimEnd = t + dur.value; } }]);
    const out = api.readout();
    let V = -65, mG = 0.0529, hG = 0.596, nG = 0.3177, t = 0, stimEnd = -1, auto = true, hist = [], spikes = 0, peak = -65, above = false;
    cv.onResize = () => {};
    const am = (v) => 0.1 * (v + 40) / (1 - Math.exp(-(v + 40) / 10)), bm = (v) => 4 * Math.exp(-(v + 65) / 18);
    const ah = (v) => 0.07 * Math.exp(-(v + 65) / 20), bh = (v) => 1 / (1 + Math.exp(-(v + 35) / 10));
    const an = (v) => 0.01 * (v + 55) / (1 - Math.exp(-(v + 55) / 10)), bn = (v) => 0.125 * Math.exp(-(v + 65) / 80);
    function step(ms) {
      const dt = 0.01, N = Math.round(ms / dt);
      for (let i = 0; i < N; i++) {
        if (auto && t > 8) { stimEnd = t + dur.value; auto = false; }
        const I = rep.value || t < stimEnd ? amp.value : 0;
        const gNa = ttx.value ? 0 : 120 * mG * mG * mG * hG, gK = 36 * nG * nG * nG * nG;
        const Iion = gNa * (V - 50) + gK * (V + 77) + 0.3 * (V + 54.387);
        V += dt * (I - Iion);
        mG += dt * (am(V) * (1 - mG) - bm(V) * mG); hG += dt * (ah(V) * (1 - hG) - bh(V) * hG); nG += dt * (an(V) * (1 - nG) - bn(V) * nG);
        t += dt;
        if (V > 0 && !above) { above = true; spikes++; } if (V < -30) above = false;
        peak = Math.max(peak, V);
        if (i % 5 === 0) { hist.push([t, V, gNa, gK]); }
      }
      while (hist.length && hist[0][0] < t - 60) hist.shift();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b1 = { x: 54, y: 16, w: cv.w - 70, h: cv.h * 0.55 }, b2 = { x: 54, y: cv.h * 0.55 + 40, w: cv.w - 70, h: cv.h * 0.45 - 70 };
      const m1 = U.frame(ctx, C, b1, [t - 60, t], [-90, 60], { ylabel: 'membrane potential (mV)', ny: 5, xfmt: () => '' });
      U.curve(ctx, hist.map((q) => [m1.X(q[0]), m1.Y(q[1])]), C.accent, 2);
      const m2 = U.frame(ctx, C, b2, [t - 60, t], [0, 40], { xlabel: 'last 60 ms', ylabel: 'conductance (mS/cm²)', ny: 2, xfmt: () => '' });
      U.curve(ctx, hist.map((q) => [m2.X(q[0]), m2.Y(q[2])]), C.rust, 1.8);
      U.curve(ctx, hist.map((q) => [m2.X(q[0]), m2.Y(q[3])]), C.teal, 1.8);
      U.text(ctx, 'g_Na', b2.x + b2.w - 60, b2.y + 12, C.rust, U.ui(11, 700)); U.text(ctx, 'g_K', b2.x + b2.w - 24, b2.y + 12, C.teal, U.ui(11, 700));
      out([['membrane potential', V.toFixed(1) + ' mV'], ['spikes so far', String(spikes)], ['highest peak', peak.toFixed(1) + ' mV'], ['gates m, h, n', mG.toFixed(2) + ', ' + hG.toFixed(2) + ', ' + nG.toFixed(2)]]);
    }
    api.loop((dt) => { step(Math.min(dt, 0.05) * 25); draw(); });
  };

  /* =============== Blood glucose regulation (Bio 15) =============== */
  PB.sims.glucose = function (api) {
    const cv = api.canvas(0.55);
    const meal = api.slider({ id: 'm', label: 'Glucose in the meal', min: 0, max: 100, step: 5, value: 75, unit: 'g', onChange: () => draw() });
    const sens = api.slider({ id: 's', label: 'Insulin sensitivity of tissues', min: 0.1, max: 1.5, step: 0.05, value: 1, format: (v) => (v * 100).toFixed(0) + '%', onChange: () => draw() });
    const beta = api.slider({ id: 'b', label: 'Insulin secretion by β-cells', min: 0, max: 1.5, step: 0.05, value: 1, format: (v) => (v * 100).toFixed(0) + '%', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    // Simplified minimal model: glucose G (mmol/L), insulin I (mU/L), remote insulin action X
    function sim() {
      const Gb = 5, Ib = 8, dt = 0.5, res = [], ka = 0.012, p1 = 0.012, k = 3, p2 = 0.05, p3 = 0.00003;
      const bt = beta.value, sn = sens.value;
      let G = Gb, I = Ib * bt, X = (p3 / p2) * sn * (Ib * bt - Ib), gut = meal.value * 1000 / 180 / 14;
      for (let t = 0; t <= 360; t += dt) {
        const Ra = gut * ka;
        gut -= Ra * dt;
        const dG = Ra - Math.max(0.001, p1 + X) * (G - Gb);
        const dI = bt * k * Math.max(0, G - Gb) - 0.1 * (I - Ib * bt);
        const dX = -p2 * X + p3 * sn * (I - Ib);
        G += dG * dt; I = Math.max(0, I + dI * dt); X += dX * dt;
        if (t % 2 === 0) res.push([t, G, I]);
      }
      return res;
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, res = sim();
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b1 = { x: 54, y: 16, w: cv.w - 70, h: cv.h * 0.55 }, b2 = { x: 54, y: cv.h * 0.55 + 40, w: cv.w - 70, h: cv.h * 0.45 - 70 };
      const gmax = Math.max(14, ...res.map((r) => r[1])) * 1.05;
      const m1 = U.frame(ctx, C, b1, [0, 360], [0, gmax], { ylabel: 'blood glucose (mmol/L)', ny: 4, xfmt: () => '' });
      [[7.8, 'impaired tolerance at 2 h'], [11.1, 'diabetes at 2 h']].forEach((l) => { ctx.strokeStyle = U.alpha(C.rust, 0.6); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(b1.x, m1.Y(l[0])); ctx.lineTo(b1.x + b1.w, m1.Y(l[0])); ctx.stroke(); ctx.setLineDash([]); U.text(ctx, l[1], b1.x + b1.w - 4, m1.Y(l[0]) - 4, C.rust, U.ui(10.5), 'right'); });
      U.curve(ctx, res.map((r) => [m1.X(r[0]), m1.Y(r[1])]), C.accent, 2.5);
      const imax = Math.max(40, ...res.map((r) => r[2])) * 1.35;
      const m2 = U.frame(ctx, C, b2, [0, 360], [0, imax], { xlabel: 'minutes after the drink', ylabel: 'insulin (mU/L)', ny: 2 });
      U.curve(ctx, res.map((r) => [m2.X(r[0]), m2.Y(r[2])]), C.points, 2);
      const g2 = res.find((r) => r[0] >= 120)[1], peak = Math.max(...res.map((r) => r[1]));
      out([['peak glucose', peak.toFixed(1) + ' mmol/L'], ['glucose at 2 hours', g2.toFixed(1) + ' mmol/L'], ['interpretation', g2 >= 11.1 ? 'diabetic range' : g2 >= 7.8 ? 'impaired glucose tolerance' : 'normal'], ['note', 'simplified teaching model of an oral glucose tolerance test']]);
    }
    draw();
  };

  /* =============== SIR epidemic (Bio 16) =============== */
  PB.sims.sir = function (api) {
    const cv = api.canvas(0.52);
    const R0 = api.slider({ id: 'r', label: 'Basic reproduction number R₀', min: 0.5, max: 18, step: 0.1, value: 3, onChange: () => draw() });
    const D = api.slider({ id: 'd', label: 'Infectious period', min: 2, max: 21, step: 1, value: 7, unit: 'days', onChange: () => draw() });
    const v = api.slider({ id: 'v', label: 'Vaccinated before the outbreak', min: 0, max: 99, step: 1, value: 30, unit: '%', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const gamma = 1 / D.value, b = R0.value * gamma;
      let S = 1 - v.value / 100 - 1e-4, I = 1e-4, Rr = v.value / 100; const res = [];
      let peakI = 0, peakT = 0;
      for (let t = 0; t <= 365; t += 0.1) { const inf = b * S * I, rec = gamma * I; S -= inf * 0.1; I += (inf - rec) * 0.1; Rr += rec * 0.1; if (I > peakI) { peakI = I; peakT = t; } if (Math.abs(t - Math.round(t)) < 0.05) res.push([t, S, I, Rr]); }
      const bx = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, bx, [0, 365], [0, 100], { xlabel: 'days', ylabel: '% of population', ny: 4 });
      [[1, C.accent, 'susceptible'], [2, C.rust, 'infected'], [3, C.teal, 'recovered or vaccinated']].forEach((k, i) => { U.curve(ctx, res.map((r) => [m.X(r[0]), m.Y(100 * r[k[0]])]), k[1], 2.3); U.text(ctx, k[2], bx.x + bx.w - 8, bx.y + 14 + i * 14, k[1], U.ui(11, 700), 'right'); });
      const herd = Math.max(0, 1 - 1 / R0.value), Reff = R0.value * (1 - v.value / 100);
      const everInf = 100 * (res[res.length - 1][3] - v.value / 100);
      out([['effective R at the start', Reff.toFixed(2)], ['herd-immunity threshold 1 − 1/R₀', (herd * 100).toFixed(0) + '%'], ['peak infected', (peakI * 100).toFixed(1) + '% on day ' + Math.round(peakT)], ['ever infected', Math.max(0, everInf).toFixed(1) + '%']]);
    }
    draw();
  };

  /* =============== Molecular clock (Bio 17) =============== */
  PB.sims.molclock = function (api) {
    const cv = api.canvas(0.52);
    const mu = api.slider({ id: 'm', label: 'Substitution rate per site', min: 0.1, max: 5, step: 0.1, value: 1, format: (v) => v.toFixed(1) + ' ×10⁻⁹ per year' , onChange: () => draw() });
    const tt = api.slider({ id: 't', label: 'Time since the lineages split', min: 0, max: 1000, step: 5, value: 300, unit: 'Myr', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const r = mu.value * 1e-9 * 1e6; // per site per Myr
      const p = (t) => 0.75 * (1 - Math.exp(-(4 / 3) * 2 * r * t));
      const b = { x: 54, y: 18, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 1000], [0, 1], { xlabel: 'time since divergence (Myr)', ylabel: 'proportion of sites differing', ny: 4 });
      const obs = [], lin = []; for (let i = 0; i <= 200; i++) { const t = (1000 * i) / 200; obs.push([m.X(t), m.Y(p(t))]); lin.push([m.X(t), m.Y(Math.min(1, 2 * r * t))]); }
      U.curve(ctx, lin, U.alpha(C.ink3, 0.8), 1.5, [5, 4]); U.curve(ctx, obs, C.accent, 2.5);
      ctx.strokeStyle = U.alpha(C.rust, 0.6); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(b.x, m.Y(0.75)); ctx.lineTo(b.x + b.w, m.Y(0.75)); ctx.stroke(); ctx.setLineDash([]);
      U.text(ctx, 'saturation: random sequences differ at 75% of sites', b.x + b.w - 4, m.Y(0.75) - 5, C.rust, U.ui(11), 'right');
      const pv = p(tt.value), dJC = pv < 0.75 ? -0.75 * Math.log(1 - (4 / 3) * pv) : Infinity;
      U.dot(ctx, m.X(tt.value), m.Y(pv), 5, C.points, C.ink);
      out([['observed difference p', (pv * 100).toFixed(1) + '%'], ['substitutions per site (true)', (2 * r * tt.value).toFixed(3)], ['Jukes–Cantor corrected d', isFinite(dJC) ? dJC.toFixed(3) : '∞ (saturated)'], ['date estimated from p alone', (pv / (2 * r)).toFixed(0) + ' Myr']]);
    }
    draw();
  };

  /* =============== Water potential and plasmolysis (Bio 18) =============== */
  PB.sims.waterpot = function (api) {
    const cv = api.canvas(0.5);
    const Cout = api.slider({ id: 'o', label: 'Solute concentration outside', min: 0, max: 1.0, step: 0.01, value: 0.2, unit: 'mol/L', onChange: () => draw() });
    const Cin = api.slider({ id: 'i', label: 'Cell sap concentration (at full turgor size)', min: 0.1, max: 0.8, step: 0.01, value: 0.4, unit: 'mol/L', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const RT = 0.00831 * 298, E = 10; // MPa
    function equil() {
      // find relative volume v of the protoplast where Ψs(v) + Ψp(v) = Ψout
      const Po = -Cout.value * RT;
      const psi = (v) => -Cin.value * RT / v + (v > 1 ? E * (v - 1) : 0);
      let lo = 0.2, hi = 1.5;
      for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (psi(mid) < Po) lo = mid; else hi = mid; }
      const v = (lo + hi) / 2;
      return { v: v, Po: Po, Ps: -Cin.value * RT / v, Pp: v > 1 ? E * (v - 1) : 0 };
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, q = equil();
      ctx.clearRect(0, 0, cv.w, cv.h);
      const cx = cv.w * 0.3, cy = cv.h / 2, W = Math.min(cv.w * 0.4, cv.h * 1.1), H = W * 0.6;
      ctx.fillStyle = U.alpha(C.accent, 0.08 + Cout.value * 0.2); ctx.fillRect(10, 10, cv.w * 0.6 - 20, cv.h - 20);
      ctx.strokeStyle = C.good; ctx.lineWidth = 6; ctx.strokeRect(cx - W / 2, cy - H / 2, W, H);
      const k = Math.min(1.02, Math.pow(Math.min(q.v, 1.02), 1 / 2)), pw = (W - 12) * Math.min(1, k), ph = (H - 12) * Math.min(1, k);
      ctx.fillStyle = U.alpha(C.good, 0.35); ctx.beginPath();
      const r0 = Math.min(18, ph / 3);
      ctx.moveTo(cx - pw / 2 + r0, cy - ph / 2); ctx.arcTo(cx + pw / 2, cy - ph / 2, cx + pw / 2, cy + ph / 2, r0); ctx.arcTo(cx + pw / 2, cy + ph / 2, cx - pw / 2, cy + ph / 2, r0); ctx.arcTo(cx - pw / 2, cy + ph / 2, cx - pw / 2, cy - ph / 2, r0); ctx.arcTo(cx - pw / 2, cy - ph / 2, cx + pw / 2, cy - ph / 2, r0); ctx.fill();
      ctx.fillStyle = U.alpha('#7a3fc4', 0.35); ctx.beginPath(); ctx.ellipse(cx, cy, pw * 0.32, ph * 0.3, 0, 0, Math.PI * 2); ctx.fill();
      const state = q.v < 0.97 ? 'plasmolysed: the protoplast has pulled away from the wall' : q.v < 1.005 ? 'flaccid (incipient plasmolysis)' : 'turgid: the wall pushes back';
      U.text(ctx, state, cx, cv.h - 18, C.ink, U.ui(12, 700), 'center');
      out([['Ψ outside = −CRT', q.Po.toFixed(2) + ' MPa'], ['Ψs of the cell', q.Ps.toFixed(2) + ' MPa'], ['Ψp (turgor)', q.Pp.toFixed(2) + ' MPa'], ['Ψ cell = Ψs + Ψp', (q.Ps + q.Pp).toFixed(2) + ' MPa'], ['protoplast volume', (q.v * 100).toFixed(0) + '% of full turgor']]);
    }
    draw();
  };

  /* =============== Predator and prey (Bio 19) =============== */
  PB.sims.lotka = function (api) {
    const cv = api.canvas(0.55);
    const a = api.slider({ id: 'a', label: 'Prey birth rate', min: 0.2, max: 2, step: 0.05, value: 1, onChange: () => draw() });
    const bt = api.slider({ id: 'b', label: 'Predation rate', min: 0.005, max: 0.05, step: 0.001, value: 0.02, onChange: () => draw() });
    const c = api.slider({ id: 'c', label: 'Predator death rate', min: 0.2, max: 2, step: 0.05, value: 0.6, onChange: () => draw() });
    const K = api.slider({ id: 'k', label: 'Prey carrying capacity (0 = none)', min: 0, max: 2000, step: 50, value: 0, format: (v) => (v ? String(v) : 'unlimited'), onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const e = 0.4; let x = 80, y = 20; const res = [];
      for (let t = 0; t <= 60; t += 0.005) { const g = K.value ? 1 - x / K.value : 1; const dx = a.value * x * g - bt.value * x * y, dy = e * bt.value * x * y - c.value * y; x = Math.max(0, x + dx * 0.005); y = Math.max(0, y + dy * 0.005); if (Math.round(t / 0.005) % 20 === 0) res.push([t, x, y]); }
      const max = Math.max(...res.map((r) => Math.max(r[1], r[2]))) * 1.1 || 1;
      const w = cv.w * 0.6;
      const b1 = { x: 54, y: 16, w: w - 70, h: cv.h - 50 }, b2 = { x: w + 30, y: 16, w: cv.w - w - 46, h: cv.h - 50 };
      const m1 = U.frame(ctx, C, b1, [0, 60], [0, max], { xlabel: 'time', ylabel: 'population', ny: 4 });
      U.curve(ctx, res.map((r) => [m1.X(r[0]), m1.Y(r[1])]), C.accent, 2.2); U.curve(ctx, res.map((r) => [m1.X(r[0]), m1.Y(r[2])]), C.rust, 2.2);
      U.text(ctx, 'prey', b1.x + b1.w - 70, b1.y - 4, C.accent, U.ui(11, 700)); U.text(ctx, 'predators', b1.x + b1.w, b1.y - 4, C.rust, U.ui(11, 700), 'right');
      if (b2.w > 80) {
        const mx = Math.max(...res.map((r) => r[1])) * 1.1 || 1, my = Math.max(...res.map((r) => r[2])) * 1.1 || 1;
        const m2 = U.frame(ctx, C, b2, [0, mx], [0, my], { xlabel: 'prey', ylabel: 'predators', ny: 3, nx: 3 });
        U.curve(ctx, res.map((r) => [m2.X(r[1]), m2.Y(r[2])]), C.points, 1.6);
      }
      out([['prey equilibrium c/(eβ)', (c.value / (e * bt.value)).toFixed(0)], ['predator equilibrium α/β', K.value ? '(reduced by crowding)' : (a.value / bt.value).toFixed(0)], ['cycle period ≈ 2π/√(αc)', K.value ? '—' : (2 * Math.PI / Math.sqrt(a.value * c.value)).toFixed(1)], ['behaviour', K.value ? 'damped oscillations' : 'neutral cycles']]);
    }
    draw();
  };

  /* =============== Mark–recapture (Bio 20) =============== */
  PB.sims.recapture = function (api) {
    const cv = api.canvas(0.52);
    const M = api.slider({ id: 'm', label: 'Animals caught and marked', min: 10, max: 200, step: 5, value: 50, format: (v) => String(v) });
    const n = api.slider({ id: 'n', label: 'Second catch', min: 10, max: 200, step: 5, value: 60, format: (v) => String(v) });
    api.buttons([{ label: 'New pond', onClick: () => { newPond(); sample(); } }, { label: 'Sample', primary: true, onClick: sample }]);
    const out = api.readout();
    let N = 0, animals = [], m = 0, caught = [];
    cv.onResize = () => draw();
    function newPond() { N = 150 + Math.floor(Math.random() * 450); animals = []; for (let i = 0; i < N; i++) animals.push({ x: Math.random(), y: Math.random(), mk: false }); }
    function sample() {
      animals.forEach((a) => { a.mk = false; a.x = Math.random(); a.y = Math.random(); });
      const idx = animals.map((_, i) => i).sort(() => Math.random() - 0.5);
      idx.slice(0, Math.min(M.value, N)).forEach((i) => { animals[i].mk = true; });
      animals.forEach((a) => { a.x = Math.random(); a.y = Math.random(); });
      const idx2 = animals.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, Math.min(n.value, N));
      caught = idx2; m = idx2.filter((i) => animals[i].mk).length;
      draw();
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      ctx.fillStyle = U.alpha(C.accent, 0.08); ctx.fillRect(8, 8, cv.w - 16, cv.h - 16);
      const set = new Set(caught);
      animals.forEach((a, i) => { const x = 14 + a.x * (cv.w - 28), y = 14 + a.y * (cv.h - 28); U.dot(ctx, x, y, set.has(i) ? 4 : 2.6, a.mk ? C.rust : U.alpha(C.ink3, 0.7)); if (set.has(i)) { ctx.strokeStyle = C.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.stroke(); } });
      const est = m ? M.value * n.value / m : Infinity, chap = (M.value + 1) * (n.value + 1) / (m + 1) - 1;
      out([['marked in second catch', m + ' of ' + n.value], ['Lincoln–Petersen N = Mn/m', isFinite(est) ? est.toFixed(0) : '∞ (no recaptures)'], ['Chapman estimate', chap.toFixed(0)], ['true population (hidden)', 'reveal: ' + N]]);
    }
    newPond(); sample();
  };
})();
