/* Scibook chemistry labs. Data are standard textbook values (rounded); see each lab's description. */
(function () {
  'use strict';
  const PB = window.PB, U = PB.simUtil;
  const R = 8.314, F = 96485;

  /* ---------- shared acid–base solver ---------- */
  // Fraction of an acid with stepwise Ka values in each protonation state at hydrogen-ion concentration h.
  U.alphas = function (Kas, h) {
    const terms = [1]; let p = 1;
    for (let i = 0; i < Kas.length; i++) { p *= Kas[i] / h; terms.push(p); }
    const s = terms.reduce((a, b) => a + b, 0);
    return terms.map((t) => t / s);
  };
  // Exact pH by charge balance. acids: [{C, Kas, charge0}] where charge0 is the charge of the fully protonated form
  // (0 for HA, +1 for NH4+). strong: net strong-base cation minus strong-acid anion concentration (mol/L).
  U.solvePH = function (acids, strong) {
    const Kw = 1e-14;
    const bal = (h) => {
      let s = h - Kw / h + strong;
      acids.forEach((a) => { const al = U.alphas(a.Kas, h); al.forEach((f, k) => { s += a.C * f * (a.charge0 - k); }); });
      return s;
    };
    let lo = -1, hi = 15; // pH bounds
    for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (bal(Math.pow(10, -mid)) > 0) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  };
  const sub = (n) => String(n).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d]);

  /* =============== Limiting reagent (Chem 1) =============== */
  PB.sims.stoich = function (api) {
    const cv = api.canvas(0.52);
    const RX = {
      water: { label: '2 H₂ + O₂ → 2 H₂O', r: [['H₂', 2, 2.016], ['O₂', 1, 32.00]], p: [['H₂O', 2, 18.02]] },
      ammonia: { label: 'N₂ + 3 H₂ → 2 NH₃', r: [['N₂', 1, 28.02], ['H₂', 3, 2.016]], p: [['NH₃', 2, 17.03]] },
      methane: { label: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O', r: [['CH₄', 1, 16.04], ['O₂', 2, 32.00]], p: [['CO₂', 1, 44.01], ['H₂O', 2, 18.02]] },
      propane: { label: 'C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O', r: [['C₃H₈', 1, 44.10], ['O₂', 5, 32.00]], p: [['CO₂', 3, 44.01], ['H₂O', 4, 18.02]] },
      alcl3: { label: '2 Al + 3 Cl₂ → 2 AlCl₃', r: [['Al', 2, 26.98], ['Cl₂', 3, 70.90]], p: [['AlCl₃', 2, 133.3]] }
    };
    let rx = 'ammonia';
    api.select({ id: 'rx', label: 'Reaction', value: rx, options: Object.keys(RX).map((k) => [k, RX[k].label]), onChange: (v) => { rx = v; draw(); } });
    const nA = api.slider({ id: 'a', label: 'Moles of first reactant', min: 0, max: 10, step: 0.1, value: 2, unit: 'mol', onChange: () => draw() });
    const nB = api.slider({ id: 'b', label: 'Moles of second reactant', min: 0, max: 10, step: 0.1, value: 4.5, unit: 'mol', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx, X = RX[rx];
      ctx.clearRect(0, 0, cv.w, cv.h);
      const n0 = [nA.value, nB.value];
      const xi = Math.min(n0[0] / X.r[0][1], n0[1] / X.r[1][1]);
      const lim = n0[0] / X.r[0][1] <= n0[1] / X.r[1][1] ? 0 : 1;
      const species = X.r.map((s, i) => ({ name: s[0], before: n0[i], after: n0[i] - s[1] * xi, M: s[2], col: i ? C.teal : C.accent }))
        .concat(X.p.map((s) => ({ name: s[0], before: 0, after: s[1] * xi, M: s[2], col: C.points })));
      const maxN = Math.max(1, ...species.map((s) => Math.max(s.before, s.after)));
      const b = { x: 50, y: 30, w: cv.w - 66, h: cv.h - 70 };
      const m = U.frame(ctx, C, b, [0, species.length], [0, maxN * 1.1], { noLabels: false, xticks: [], ylabel: 'moles', ny: 4 });
      const bw = b.w / species.length;
      species.forEach((s, i) => {
        const x0 = b.x + i * bw + bw * 0.15, w = bw * 0.32;
        ctx.fillStyle = U.alpha(s.col, 0.35); ctx.fillRect(x0, m.Y(s.before), w, m.Y(0) - m.Y(s.before));
        ctx.fillStyle = s.col; ctx.fillRect(x0 + w + 4, m.Y(s.after), w, m.Y(0) - m.Y(s.after));
        U.text(ctx, s.name, x0 + w, b.y + b.h + 16, C.ink, U.ui(13, 700), 'center');
      });
      U.text(ctx, 'pale = before   solid = after', b.x + b.w, 18, C.ink2, U.ui(11.5), 'right');
      U.text(ctx, X.label, b.x, 18, C.ink, U.ui(13, 700));
      out([['limiting reagent', X.r[lim][0]], ['extent of reaction ξ', xi.toFixed(3) + ' mol'], ['left over', X.r[1 - lim][0] + ': ' + species[1 - lim].after.toFixed(2) + ' mol']].concat(X.p.map((p) => ['mass of ' + p[0], (p[1] * xi * p[2]).toFixed(1) + ' g'])));
    }
    draw();
  };

  /* =============== Beer–Lambert spectrophotometer (Chem 2) =============== */
  PB.sims.beer = function (api) {
    const cv = api.canvas(0.5);
    const eps = api.slider({ id: 'e', label: 'Molar absorptivity ε', min: 100, max: 20000, step: 100, value: 6000, unit: 'L mol⁻¹ cm⁻¹', onChange: () => draw() });
    const l = api.slider({ id: 'l', label: 'Path length l', min: 0.2, max: 5, step: 0.1, value: 1, unit: 'cm', onChange: () => draw() });
    const c = api.slider({ id: 'c', label: 'Concentration c', min: 0, max: 400, step: 1, value: 80, unit: 'μmol/L', onChange: () => draw() });
    api.buttons([{ label: 'Measure an unknown', primary: true, onClick: () => { unknown = { A: 0.15 + Math.random() * 1.1 }; draw(); } }]);
    const out = api.readout();
    let unknown = null;
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const A = eps.value * l.value * c.value * 1e-6, T = Math.pow(10, -A);
      const lw = cv.w * 0.42, cy = cv.h * 0.45;
      ctx.fillStyle = U.alpha(C.points, 0.9); ctx.fillRect(14, cy - 12, 40, 24); U.text(ctx, 'lamp', 34, cy + 30, C.ink2, U.ui(11), 'center');
      const cx0 = 90, cw = Math.min(lw - 150, 40 + l.value * 22);
      ctx.fillStyle = U.alpha('#7a3fc4', Math.min(0.85, 0.08 + A * 0.4)); ctx.fillRect(cx0, cy - 34, cw, 68);
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.strokeRect(cx0, cy - 34, cw, 68);
      U.text(ctx, 'cuvette', cx0 + cw / 2, cy + 52, C.ink2, U.ui(11), 'center');
      ctx.fillStyle = U.alpha(C.points, 0.85); ctx.fillRect(54, cy - 5, cx0 - 54, 10);
      ctx.fillStyle = U.alpha(C.points, 0.85 * T + 0.03); ctx.fillRect(cx0 + cw, cy - 5, lw - cx0 - cw - 30, 10);
      ctx.fillStyle = C.ink2; ctx.fillRect(lw - 30, cy - 18, 14, 36); U.text(ctx, 'detector', lw - 23, cy + 30, C.ink2, U.ui(11), 'center');
      const b = { x: lw + 40, y: 18, w: cv.w - lw - 54, h: cv.h - 52 };
      const cmax = 400, Amax = Math.max(0.5, eps.value * l.value * cmax * 1e-6 * 1.05);
      const m = U.frame(ctx, C, b, [0, cmax], [0, Amax], { xlabel: 'c (μmol/L)', ylabel: 'absorbance', ny: 4 });
      U.curve(ctx, [[m.X(0), m.Y(0)], [m.X(cmax), m.Y(eps.value * l.value * cmax * 1e-6)]], C.accent, 2);
      U.dot(ctx, m.X(c.value), m.Y(A), 5, C.points, C.ink);
      let unk = '—';
      if (unknown) {
        const cu = unknown.A / (eps.value * l.value) * 1e6;
        ctx.strokeStyle = U.alpha(C.rust, 0.7); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(b.x, m.Y(unknown.A)); ctx.lineTo(m.X(cu), m.Y(unknown.A)); ctx.lineTo(m.X(cu), b.y + b.h); ctx.stroke(); ctx.setLineDash([]);
        unk = 'A = ' + unknown.A.toFixed(3) + ' → read c from the line';
      }
      out([['absorbance A = εlc', A.toFixed(3)], ['transmittance T = 10⁻ᴬ', (T * 100).toFixed(1) + '%'], ['unknown sample', unk]]);
    }
    draw();
  };

  /* =============== Electron configurations (Chem 3) =============== */
  const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe'.split(' ');
  PB.chemSymbols = SYM;
  const ORDER = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10], ['4p', 6], ['5s', 2], ['4d', 10], ['5p', 6]];
  const EXC = { 24: { '3d': 5, '4s': 1 }, 29: { '3d': 10, '4s': 1 }, 41: { '4d': 4, '5s': 1 }, 42: { '4d': 5, '5s': 1 }, 44: { '4d': 7, '5s': 1 }, 45: { '4d': 8, '5s': 1 }, 46: { '4d': 10, '5s': 0 }, 47: { '4d': 10, '5s': 1 } };
  U.config = function (Z) {
    const occ = {}; let left = Z;
    ORDER.forEach(([o, cap]) => { const n = Math.min(cap, left); occ[o] = n; left -= n; });
    if (EXC[Z]) Object.assign(occ, EXC[Z]);
    return ORDER.map(([o]) => [o, occ[o] || 0]).filter((x) => x[1] > 0);
  };
  PB.sims.aufbau = function (api) {
    const cv = api.canvas(0.5);
    const Z = api.slider({ id: 'z', label: 'Atomic number Z', min: 1, max: 54, step: 1, value: 26, format: (v) => v + ' (' + SYM[v - 1] + ')', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx, z = Z.value, cfg = U.config(z);
      ctx.clearRect(0, 0, cv.w, cv.h);
      const box = Math.min(26, (cv.w - 120) / 12), rowH = box + 12;
      const levels = ORDER.map((o) => o[0]);
      // energy-ordered rows from the bottom
      levels.forEach((o, i) => {
        const cap = ORDER[i][1], nOrb = cap / 2, n = (cfg.find((c) => c[0] === o) || [o, 0])[1];
        const y = cv.h - 24 - i * Math.min(rowH, (cv.h - 40) / levels.length);
        U.text(ctx, o, 30, y + box * 0.7, n ? C.ink : C.ink3, U.mono(12, 600), 'right');
        // Hund's rule: singly fill each orbital first
        const arr = new Array(nOrb).fill(0);
        for (let e = 0; e < n; e++) arr[e % nOrb]++;
        arr.forEach((cnt, k) => {
          const x = 40 + k * (box + 3);
          ctx.strokeStyle = n ? C.ink2 : C.line; ctx.lineWidth = 1.2; ctx.strokeRect(x, y, box, box);
          if (cnt >= 1) U.arrow(ctx, x + box * 0.33, y + box - 4, x + box * 0.33, y + 4, C.accent, 1.8, 5);
          if (cnt >= 2) U.arrow(ctx, x + box * 0.67, y + 4, x + box * 0.67, y + box - 4, C.rust, 1.8, 5);
        });
      });
      U.text(ctx, SYM[z - 1], cv.w - 30, 60, C.accent, U.ui(48, 800), 'right');
      U.text(ctx, 'Z = ' + z, cv.w - 30, 84, C.ink2, U.mono(12), 'right');
      const str = cfg.map(([o, n]) => o + '<sup>' + n + '</sup>').join(' ');
      let unpaired = 0; cfg.forEach(([o, n]) => { const cap = ORDER.find((x) => x[0] === o)[1], orb = cap / 2; unpaired += n <= orb ? n : cap - n; });
      const last = cfg[cfg.length - 1][0], block = last.slice(-1);
      const nobles = [[2, 'He'], [10, 'Ne'], [18, 'Ar'], [36, 'Kr']];
      let core = ''; for (const [nz, s] of nobles) if (z > nz) core = s;
      out([['configuration', str], ['noble-gas core', core ? '[' + core + ']' : 'none'], ['unpaired electrons', String(unpaired)], ['block', block + '-block'], ['note', EXC[z] ? 'exception: a half-filled or filled d subshell is extra stable' : '—']]);
    }
    draw();
  };

  /* =============== Periodic trends (Chem 4) =============== */
  const IE1 = [1312, 2372, 520, 900, 801, 1086, 1402, 1314, 1681, 2081, 496, 738, 578, 787, 1012, 1000, 1251, 1521, 419, 590, 633, 659, 651, 653, 717, 762, 760, 737, 745, 906, 579, 762, 947, 941, 1140, 1351];
  const EN = [2.20, null, 0.98, 1.57, 2.04, 2.55, 3.04, 3.44, 3.98, null, 0.93, 1.31, 1.61, 1.90, 2.19, 2.58, 3.16, null, 0.82, 1.00, 1.36, 1.54, 1.63, 1.66, 1.55, 1.83, 1.88, 1.91, 1.90, 1.65, 1.81, 2.01, 2.18, 2.55, 2.96, 3.00];
  const RAD = [31, 28, 128, 96, 84, 76, 71, 66, 57, 58, 166, 141, 121, 111, 107, 105, 102, 106, 203, 176, 170, 160, 153, 139, 139, 132, 126, 124, 132, 122, 122, 120, 119, 120, 120, 116];
  PB.chemData = { IE1: IE1, EN: EN, RAD: RAD };
  PB.sims.trends = function (api, params) {
    const cv = api.canvas(0.5);
    let prop = params.prop || 'ie';
    api.select({ id: 'p', label: 'Property', value: prop, options: [['ie', 'First ionisation energy (kJ/mol)'], ['en', 'Electronegativity (Pauling)'], ['r', 'Covalent radius (pm)']], onChange: (v) => { prop = v; draw(); } });
    const Z = api.slider({ id: 'z', label: 'Highlight element', min: 1, max: 36, step: 1, value: 11, format: (v) => v + ' (' + SYM[v - 1] + ')', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const blockOf = (z) => { const c = U.config(z); return c[c.length - 1][0].slice(-1); };
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const data = { ie: IE1, en: EN, r: RAD }[prop], max = Math.max(...data.filter((x) => x != null)) * 1.1;
      const b = { x: 50, y: 16, w: cv.w - 64, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0.5, 36.5], [0, max], { xticks: [2, 10, 18, 36], xlabel: 'Z (dashed: noble gases)', ny: 4 });
      const bcol = { s: C.accent, p: C.points, d: C.teal };
      [2, 10, 18, 36].forEach((z) => { ctx.strokeStyle = U.alpha(C.ink3, 0.5); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(m.X(z), b.y); ctx.lineTo(m.X(z), b.y + b.h); ctx.stroke(); ctx.setLineDash([]); });
      const bw = (m.X(2) - m.X(1)) * 0.7;
      data.forEach((v, i) => { if (v == null) return; const z = i + 1; ctx.fillStyle = U.alpha(bcol[blockOf(z)], z === Z.value ? 1 : 0.55); ctx.fillRect(m.X(z) - bw / 2, m.Y(v), bw, m.Y(0) - m.Y(v)); });
      U.text(ctx, 's-block', b.x + b.w - 130, b.y + 14, C.accent, U.ui(11, 700)); U.text(ctx, 'p-block', b.x + b.w - 80, b.y + 14, C.points, U.ui(11, 700)); U.text(ctx, 'd-block', b.x + b.w - 30, b.y + 14, C.teal, U.ui(11, 700));
      const z = Z.value;
      out([['element', SYM[z - 1] + ' (Z = ' + z + ')'], ['first ionisation energy', IE1[z - 1] + ' kJ/mol'], ['electronegativity', EN[z - 1] == null ? 'not defined' : EN[z - 1].toFixed(2)], ['covalent radius', RAD[z - 1] + ' pm']]);
    }
    draw();
  };

  /* =============== Lattice energy (Chem 5) =============== */
  PB.sims.lattice = function (api) {
    const cv = api.canvas(0.5);
    const CAT = { 'Li⁺': [1, 76], 'Na⁺': [1, 102], 'K⁺': [1, 138], 'Cs⁺': [1, 167], 'Mg²⁺': [2, 72], 'Ca²⁺': [2, 100], 'Ba²⁺': [2, 135], 'Al³⁺': [3, 54] };
    const AN = { 'F⁻': [1, 133], 'Cl⁻': [1, 181], 'Br⁻': [1, 196], 'I⁻': [1, 220], 'O²⁻': [2, 140], 'S²⁻': [2, 184] };
    const cat = api.select({ id: 'c', label: 'Cation', value: 'Na⁺', options: Object.keys(CAT).map((k) => [k, k + ' (r = ' + CAT[k][1] + ' pm)']), onChange: () => draw() });
    const an = api.select({ id: 'a', label: 'Anion', value: 'Cl⁻', options: Object.keys(AN).map((k) => [k, k + ' (r = ' + AN[k][1] + ' pm)']), onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    // Kapustinskii equation: U = K ν z+ z− / (r+ + r−) · (1 − d/(r+ + r−))
    const kap = (zc, rc, za, ra) => { const g = gcd(zc, za), nu = za / g + zc / g, r0 = (rc + ra) * 1e-12; return (1.2025e-4 * nu * zc * za / r0) * (1 - 3.45e-11 / r0) / 1000; };
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const [zc, rc] = CAT[cat.value], [za, ra] = AN[an.value];
      const g = gcd(zc, za), a = za / g, bnum = zc / g;
      const formula = cat.value.replace(/[⁺²³]+/g, '') + (a > 1 ? sub(a) : '') + an.value.replace(/[⁻²]+/g, '').replace(/^O$/, 'O').replace(/^S$/, 'S') + (bnum > 1 ? sub(bnum) : '');
      const U0 = kap(zc, rc, za, ra);
      const cmp = [['NaCl', kap(1, 102, 1, 181)], ['MgO', kap(2, 72, 2, 140)], [formula, U0]];
      const b = { x: 60, y: 20, w: cv.w - 80, h: cv.h - 56 };
      const max = Math.max(...cmp.map((c) => c[1]), 4000) * 1.1;
      const m = U.frame(ctx, C, b, [0, 3], [0, max], { xticks: [], ylabel: 'lattice energy (kJ/mol)', ny: 4 });
      cmp.forEach((c, i) => { const x = b.x + (i + 0.25) * b.w / 3; ctx.fillStyle = i === 2 ? C.points : U.alpha(C.accent, 0.55); ctx.fillRect(x, m.Y(c[1]), b.w / 6, m.Y(0) - m.Y(c[1])); U.text(ctx, c[0], x + b.w / 12, b.y + b.h + 16, C.ink, U.ui(13, 700), 'center'); U.text(ctx, Math.round(c[1]) + '', x + b.w / 12, m.Y(c[1]) - 6, C.ink2, U.mono(11), 'center'); });
      out([['formula', formula], ['ions per formula unit ν', String(a + bnum)], ['estimated lattice energy', Math.round(U0) + ' kJ/mol'], ['why', 'U ∝ z₊z₋ / (r₊ + r₋)']]);
    }
    draw();
  };

  /* =============== VSEPR shapes in 3D (Chem 6) =============== */
  PB.sims.vsepr = function (api) {
    const cv = api.canvas(0.56);
    const s3 = Math.sqrt(3) / 2;
    const GEO = {
      2: [[1, 0, 0], [-1, 0, 0]],
      3: [[1, 0, 0], [-0.5, s3, 0], [-0.5, -s3, 0]],
      4: [[0.943, 0, -0.333], [-0.471, 0.816, -0.333], [-0.471, -0.816, -0.333], [0, 0, 1]],
      5: [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-0.5, s3, 0], [-0.5, -s3, 0]],
      6: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
    };
    // which domain positions hold lone pairs (equatorial first for 5 domains, trans for 6)
    const MOL = {
      CO2: ['CO₂', 2, 0, 'linear', '180°', 'non-polar'], BF3: ['BF₃', 3, 0, 'trigonal planar', '120°', 'non-polar'], SO2: ['SO₂', 3, 1, 'bent', '≈119°', 'polar'],
      CH4: ['CH₄', 4, 0, 'tetrahedral', '109.5°', 'non-polar'], NH3: ['NH₃', 4, 1, 'trigonal pyramidal', '107°', 'polar'], H2O: ['H₂O', 4, 2, 'bent', '104.5°', 'polar'],
      PCl5: ['PCl₅', 5, 0, 'trigonal bipyramidal', '90°, 120°', 'non-polar'], SF4: ['SF₄', 5, 1, 'see-saw', '≈102°, 173°', 'polar'], ClF3: ['ClF₃', 5, 2, 'T-shaped', '≈87.5°', 'polar'], XeF2: ['XeF₂', 5, 3, 'linear', '180°', 'non-polar'],
      SF6: ['SF₆', 6, 0, 'octahedral', '90°', 'non-polar'], BrF5: ['BrF₅', 6, 1, 'square pyramidal', '≈85°', 'polar'], XeF4: ['XeF₄', 6, 2, 'square planar', '90°', 'non-polar']
    };
    const LP = { 4: [3, 2], 5: [2, 3, 4], 6: [0, 1] };
    let mol = 'NH3', ang = 0.6;
    api.select({ id: 'm', label: 'Molecule', value: mol, options: Object.keys(MOL).map((k) => [k, MOL[k][0] + ' (' + MOL[k][1] + ' electron domains, ' + MOL[k][2] + ' lone pair' + (MOL[k][2] === 1 ? '' : 's') + ')']), onChange: (v) => { mol = v; } });
    const spin = api.check({ id: 's', label: 'Rotate', value: true });
    const out = api.readout();
    cv.onResize = () => {};
    function draw() {
      const C = api.colors(), ctx = cv.ctx, M = MOL[mol];
      ctx.clearRect(0, 0, cv.w, cv.h);
      const pos = GEO[M[1]], lpIdx = M[2] ? (LP[M[1]] || [M[1] - 1]).slice(0, M[2]) : [];
      const cx = cv.w / 2, cy = cv.h / 2, sc = Math.min(cv.w, cv.h) * 0.32;
      const rot = (p) => { const ca = Math.cos(ang), sa = Math.sin(ang), x = p[0] * ca + p[1] * sa, y = -p[0] * sa + p[1] * ca, z = p[2]; const t = 0.45, y2 = y * Math.cos(t) - z * Math.sin(t), z2 = y * Math.sin(t) + z * Math.cos(t); return [x, z2, y2]; };
      const items = pos.map((p, i) => ({ p: rot(p), lp: lpIdx.indexOf(i) >= 0 })).sort((a, b) => a.p[2] - b.p[2]);
      const drawAtom = () => { U.dot(ctx, cx, cy, 18, C.ink2, C.surface); U.text(ctx, mol === 'H2O' ? 'O' : M[0].replace(/[₀-₉]/g, '').replace(/(F|Cl|O|H)$/, '').slice(0, 2), cx, cy + 5, '#fff', U.ui(13, 800), 'center'); };
      let centreDrawn = false;
      items.forEach((it) => {
        if (!centreDrawn && it.p[2] > 0) { drawAtom(); centreDrawn = true; }
        const x = cx + it.p[0] * sc, y = cy - it.p[1] * sc, depth = 0.75 + 0.25 * it.p[2];
        if (it.lp) {
          ctx.fillStyle = U.alpha(C.points, 0.35); ctx.beginPath(); ctx.ellipse(cx + it.p[0] * sc * 0.55, cy - it.p[1] * sc * 0.55, 20 * depth, 12 * depth, Math.atan2(-it.p[1], it.p[0]), 0, Math.PI * 2); ctx.fill();
          U.dot(ctx, cx + it.p[0] * sc * 0.55 - 4, cy - it.p[1] * sc * 0.55, 2.5, C.points); U.dot(ctx, cx + it.p[0] * sc * 0.55 + 4, cy - it.p[1] * sc * 0.55, 2.5, C.points);
        } else {
          ctx.strokeStyle = C.ink3; ctx.lineWidth = 5 * depth; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
          U.dot(ctx, x, y, 13 * depth, C.teal, C.surface);
        }
      });
      if (!centreDrawn) drawAtom();
      out([['electron domains', String(M[1])], ['lone pairs on centre', String(M[2])], ['shape', M[3]], ['bond angle', M[4]], ['overall', M[5]]]);
    }
    api.loop((dt) => { if (spin.value) ang += dt * 0.6; draw(); });
  };

  /* =============== Real gases (Chem 7) =============== */
  PB.sims.vdw = function (api) {
    const cv = api.canvas(0.56);
    const GAS = { He: [0.0346, 0.0238], N2: [1.370, 0.0387], CO2: [3.640, 0.04267], NH3: [4.225, 0.0371], H2O: [5.537, 0.0305] };
    const gas = api.select({ id: 'g', label: 'Gas (van der Waals a, b)', value: 'CO2', options: Object.keys(GAS).map((k) => [k, k + ' (a = ' + GAS[k][0] + ' L² bar mol⁻², b = ' + GAS[k][1] + ' L/mol)']), onChange: () => draw() });
    const T = api.slider({ id: 'T', label: 'Temperature', min: 100, max: 800, step: 1, value: 290, unit: 'K', onChange: () => draw() });
    const out = api.readout();
    const Rb = 0.08314;
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx, [a, b] = GAS[gas.value], t = T.value;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const Tc = (8 * a) / (27 * Rb * b), Pc = a / (27 * b * b), Vc = 3 * b;
      const Vmin = b * 1.15, Vmax = Math.max(1.2, Vc * 10);
      const Pmax = Math.max(Pc * 2.2, (Rb * t) / (Vc * 3) * 2);
      const bx = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, bx, [0, Vmax], [0, Pmax], { xlabel: 'molar volume (L/mol)', ylabel: 'P (bar)', ny: 4 });
      U.clip(ctx, bx);
      const ideal = [], real = [];
      for (let i = 0; i <= 400; i++) { const V = Vmin + ((Vmax - Vmin) * i) / 400; ideal.push([m.X(V), m.Y((Rb * t) / V)]); real.push([m.X(V), m.Y((Rb * t) / (V - b) - a / (V * V))]); }
      U.curve(ctx, ideal, U.alpha(C.ink3, 0.8), 1.5, [5, 4]);
      U.curve(ctx, real, C.points, 2.5);
      U.dot(ctx, m.X(Vc), m.Y(Pc), 4, C.rust);
      ctx.restore();
      U.text(ctx, 'dashed: ideal gas   solid: van der Waals   dot: critical point', bx.x + bx.w - 6, bx.y + 14, C.ink2, U.ui(11), 'right');
      const Z = ((Rb * t) / (Vc * 4 - b) - a / Math.pow(Vc * 4, 2)) * Vc * 4 / (Rb * t);
      out([['critical temperature 8a/27Rb', Tc.toFixed(0) + ' K'], ['critical pressure a/27b²', Pc.toFixed(1) + ' bar'], ['above or below Tc?', t > Tc ? 'above: no liquid can form' : 'below: the loop means liquid and gas coexist'], ['compressibility Z at V = 4V꜀', Z.toFixed(3)]]);
    }
    draw();
  };

  /* =============== Coffee-cup calorimeter (Chem 8) =============== */
  PB.sims.calorimeter = function (api) {
    const cv = api.canvas(0.52);
    const RXN = { neut: ['HCl(aq) + NaOH(aq) neutralisation', -57.1], naoh: ['NaOH(s) dissolving', -44.5], nh4no3: ['NH₄NO₃(s) dissolving (cold pack)', 25.7], cacl2: ['CaCl₂(s) dissolving', -81.3] };
    let rx = 'neut';
    api.select({ id: 'r', label: 'Process', value: rx, options: Object.keys(RXN).map((k) => [k, RXN[k][0] + ', ΔH = ' + RXN[k][1] + ' kJ/mol']), onChange: (v) => { rx = v; reset(); } });
    const n = api.slider({ id: 'n', label: 'Amount reacting', min: 0.01, max: 0.2, step: 0.005, value: 0.05, unit: 'mol', onChange: reset });
    const mw = api.slider({ id: 'm', label: 'Mass of water', min: 50, max: 500, step: 10, value: 100, unit: 'g', onChange: reset });
    const loss = api.slider({ id: 'k', label: 'Heat exchange with room', min: 0, max: 0.02, step: 0.001, value: 0.004, unit: '1/s', onChange: reset });
    api.buttons([{ label: 'Run again', primary: true, onClick: reset }]);
    const out = api.readout();
    let t, T, hist;
    const T0 = 21, tMix = 60;
    cv.onResize = () => {};
    function reset() { t = 0; T = T0; hist = []; }
    function step(dt) {
      const sub = 10, h = dt / sub, cp = 4.18;
      for (let i = 0; i < sub; i++) {
        let P = 0; // heat released into water, J/s, over ~20 s after mixing
        if (t > tMix && t < tMix + 20) P = (-RXN[rx][1] * 1000 * n.value) / 20;
        T += (P / (mw.value * cp) - loss.value * (T - T0)) * h; t += h;
      }
      hist.push([t, T]);
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 };
      const ideal = (-RXN[rx][1] * 1000 * n.value) / (mw.value * 4.18);
      const lo = Math.min(T0, T0 + ideal) - 2, hi = Math.max(T0, T0 + ideal) + 2;
      const m = U.frame(ctx, C, b, [0, 400], [lo, hi], { xlabel: 't (s)', ylabel: 'T (°C)', ny: 4 });
      U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[1])]), C.points, 2.5);
      ctx.strokeStyle = U.alpha(C.ink3, 0.7); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(m.X(tMix), b.y); ctx.lineTo(m.X(tMix), b.y + b.h); ctx.stroke(); ctx.setLineDash([]);
      U.text(ctx, 'mix', m.X(tMix) + 4, b.y + 14, C.ink2, U.ui(11));
      // extrapolate the cooling line back to the mixing time
      let extra = null;
      if (t > tMix + 120) {
        const pts = hist.filter((q) => q[0] > tMix + 60);
        const nP = pts.length, sx = pts.reduce((a, q) => a + q[0], 0), sy = pts.reduce((a, q) => a + q[1], 0), sxx = pts.reduce((a, q) => a + q[0] * q[0], 0), sxy = pts.reduce((a, q) => a + q[0] * q[1], 0);
        const sl = (nP * sxy - sx * sy) / (nP * sxx - sx * sx), ic = (sy - sl * sx) / nP;
        extra = ic + sl * tMix;
        U.curve(ctx, [[m.X(tMix), m.Y(extra)], [m.X(400), m.Y(ic + sl * 400)]], U.alpha(C.accent, 0.8), 1.5, [5, 4]);
        U.dot(ctx, m.X(tMix), m.Y(extra), 4, C.accent);
      }
      const peak = hist.reduce((a, q) => (Math.abs(q[1] - T0) > Math.abs(a - T0) ? q[1] : a), T0);
      const dT = extra != null ? extra - T0 : peak - T0;
      const dH = (-(mw.value * 4.18 * dT)) / n.value / 1000;
      out([['ΔT (extrapolated)', extra != null ? dT.toFixed(2) + ' K' : 'waiting for the cooling line…'], ['q = mcΔT', (mw.value * 4.18 * Math.abs(dT)).toFixed(0) + ' J'], ['measured ΔH', extra != null ? dH.toFixed(1) + ' kJ/mol' : '—'], ['true ΔH', RXN[rx][1] + ' kJ/mol']]);
    }
    api.loop((dt) => { if (t < 400) { step(dt * 8); } draw(); });
    reset();
  };

  /* =============== Gibbs energy (Chem 9) =============== */
  PB.sims.gibbs = function (api) {
    const cv = api.canvas(0.5);
    const dH = api.slider({ id: 'h', label: 'ΔH°', min: -200, max: 200, step: 1, value: 178, unit: 'kJ/mol', onChange: () => draw() });
    const dS = api.slider({ id: 's', label: 'ΔS°', min: -300, max: 300, step: 1, value: 161, unit: 'J/(mol K)', onChange: () => draw() });
    const T = api.slider({ id: 't', label: 'Temperature', min: 100, max: 2000, step: 10, value: 298, unit: 'K', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const G = (t) => dH.value - (t * dS.value) / 1000;
      const lo = Math.min(G(0), G(2000), -50), hi = Math.max(G(0), G(2000), 50);
      const b = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 2000], [lo, hi], { xlabel: 'T (K)', ylabel: 'ΔG° (kJ/mol)', ny: 4 });
      ctx.fillStyle = U.alpha(C.good, 0.08); ctx.fillRect(b.x, m.Y(0), b.w, b.y + b.h - m.Y(0));
      U.text(ctx, 'ΔG° < 0: products favoured', b.x + 8, b.y + b.h - 8, C.good, U.ui(11));
      U.curve(ctx, [[m.X(0), m.Y(G(0))], [m.X(2000), m.Y(G(2000))]], C.accent, 2.5);
      U.dot(ctx, m.X(T.value), m.Y(G(T.value)), 5, C.points, C.ink);
      const Tx = dS.value !== 0 ? (dH.value * 1000) / dS.value : NaN;
      const g = G(T.value), K = Math.exp((-g * 1000) / (R * T.value));
      out([['ΔG° at T', g.toFixed(1) + ' kJ/mol'], ['K = e^(−ΔG°/RT)', K > 1e6 || K < 1e-6 ? K.toExponential(2) : K.toPrecision(3)], ['ΔG° = 0 at', Tx > 0 ? Tx.toFixed(0) + ' K' : 'never (same sign at all T)'], ['default values', 'CaCO₃ → CaO + CO₂']]);
    }
    draw();
  };

  /* =============== Equilibrium and Le Chatelier (Chem 10) =============== */
  PB.sims.equilibrium = function (api) {
    const cv = api.canvas(0.55);
    const dH = api.slider({ id: 'h', label: 'ΔH of the forward reaction', min: -60, max: 60, step: 5, value: -40, unit: 'kJ/mol' });
    let A = 1, B = 1, Cc = 0, T = 300, t = 0, hist = [], events = [];
    const kf0 = 0.6, kr0 = 0.15;
    api.buttons([
      { label: 'Add A', onClick: () => { A += 0.5; events.push([t, 'add A']); } },
      { label: 'Remove C', onClick: () => { Cc *= 0.4; events.push([t, 'remove C']); } },
      { label: 'Heat +60 K', onClick: () => { T += 60; events.push([t, 'heat']); } },
      { label: 'Cool −60 K', onClick: () => { T = Math.max(180, T - 60); events.push([t, 'cool']); } },
      { label: 'Compress ×2', onClick: () => { A *= 2; B *= 2; Cc *= 2; events.push([t, 'compress']); } },
      { label: 'Reset', primary: true, onClick: () => { A = 1; B = 1; Cc = 0; T = 300; t = 0; hist = []; events = []; } }
    ]);
    const out = api.readout();
    cv.onResize = () => {};
    // A + B ⇌ C. Rate constants follow van 't Hoff: K(T) = K(300) exp(−ΔH/R (1/T − 1/300)).
    function ks() { const K = (kf0 / kr0) * Math.exp((-dH.value * 1000 / R) * (1 / T - 1 / 300)); const kf = kf0 * Math.exp(-4000 * (1 / T - 1 / 300)); return [kf, kf / K, K]; }
    function step(dt) { const n = 10, h = dt / n; for (let i = 0; i < n; i++) { const [kf, kr] = ks(); const r = kf * A * B - kr * Cc; A -= r * h; B -= r * h; Cc += r * h; t += h; } hist.push([t, A, B, Cc]); if (hist.length > 2000) hist.shift(); }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 }, t0 = Math.max(0, t - 60);
      const ymax = Math.max(2, ...hist.map((q) => Math.max(q[1], q[3]))) * 1.1;
      const m = U.frame(ctx, C, b, [t0, t0 + 60], [0, ymax], { xlabel: 'time', ylabel: 'concentration (mol/L)', ny: 4, xfmt: () => '' });
      U.clip(ctx, b);
      U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[1])]), C.accent, 2);
      U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[2])]), U.alpha(C.teal, 0.8), 1.6, [5, 3]);
      U.curve(ctx, hist.map((q) => [m.X(q[0]), m.Y(q[3])]), C.points, 2.5);
      events.forEach((e) => { if (e[0] < t0) return; ctx.strokeStyle = U.alpha(C.ink3, 0.6); ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(m.X(e[0]), b.y); ctx.lineTo(m.X(e[0]), b.y + b.h); ctx.stroke(); ctx.setLineDash([]); U.text(ctx, e[1], m.X(e[0]) + 3, b.y + 12, C.ink2, U.ui(10.5)); });
      ctx.restore();
      U.text(ctx, 'A (blue)  B (dashed)  C (orange)', b.x + b.w - 6, b.y + b.h - 8, C.ink2, U.ui(11), 'right');
      const [, , K] = ks(), Q = Cc / Math.max(1e-9, A * B);
      out([['reaction', 'A + B ⇌ C'], ['temperature', T + ' K'], ['K at this T', K.toPrecision(3)], ['Q = [C]/[A][B]', Q.toPrecision(3)], ['direction now', Math.abs(Q / K - 1) < 0.02 ? 'at equilibrium' : Q < K ? 'forward (Q < K)' : 'backward (Q > K)']]);
    }
    api.loop((dt) => { step(dt * 1.5); draw(); });
  };

  /* =============== Acid speciation (Chem 11) =============== */
  const ACIDS = { acetic: ['Ethanoic acid', [4.76], 0], carbonic: ['Carbonic acid', [6.35, 10.33], 0], phosphoric: ['Phosphoric acid', [2.15, 7.20, 12.35], 0], ammonium: ['Ammonium ion', [9.25], 1], glycine: ['Glycine (cation form)', [2.34, 9.60], 1], hf: ['Hydrofluoric acid', [3.17], 0] };
  PB.chemAcids = ACIDS;
  PB.sims.speciation = function (api, params) {
    const cv = api.canvas(0.55);
    let ac = (params && params.acid) || 'phosphoric';
    api.select({ id: 'a', label: 'Acid', value: ac, options: Object.keys(ACIDS).map((k) => [k, ACIDS[k][0] + ' (pKa ' + ACIDS[k][1].join(', ') + ')']), onChange: (v) => { ac = v; draw(); } });
    const pH = api.slider({ id: 'p', label: 'pH', min: 0, max: 14, step: 0.05, value: 7, onChange: () => draw() });
    const conc = api.slider({ id: 'c', label: 'Concentration (for its own pH)', min: -4, max: 0, step: 0.1, value: -1, format: (v) => Math.pow(10, v).toPrecision(2) + ' mol/L', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx, A = ACIDS[ac], Kas = A[1].map((p) => Math.pow(10, -p));
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 50, y: 16, w: cv.w - 64, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 14], [0, 1.02], { xlabel: 'pH', ylabel: 'fraction', ny: 4 });
      const cols = [C.accent, C.points, C.teal, C.rust];
      for (let k = 0; k <= Kas.length; k++) { const pts = []; for (let i = 0; i <= 280; i++) { const p = (14 * i) / 280; pts.push([m.X(p), m.Y(U.alphas(Kas, Math.pow(10, -p))[k])]); } U.curve(ctx, pts, cols[k], 2.2); }
      A[1].forEach((pk) => { ctx.strokeStyle = U.alpha(C.ink3, 0.5); ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(m.X(pk), b.y); ctx.lineTo(m.X(pk), b.y + b.h); ctx.stroke(); ctx.setLineDash([]); U.text(ctx, 'pKa ' + pk, m.X(pk) + 3, b.y + 12, C.ink2, U.ui(10.5)); });
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(m.X(pH.value), b.y); ctx.lineTo(m.X(pH.value), b.y + b.h); ctx.stroke();
      const al = U.alphas(Kas, Math.pow(10, -pH.value));
      const own = U.solvePH([{ C: Math.pow(10, conc.value), Kas: Kas, charge0: A[2] }], 0);
      out(al.map((f, k) => ['form with ' + (Kas.length - k) + ' acidic H', '<span style="color:' + cols[k] + '">' + (f * 100).toFixed(1) + '%</span>']).concat([['pH of the pure solution', own.toFixed(2)]]));
    }
    draw();
  };

  /* =============== Titration curves (Chem 12) =============== */
  PB.sims.titration = function (api) {
    const cv = api.canvas(0.55);
    const AN = { hcl: ['HCl (strong acid)', null], acetic: ['Ethanoic acid', 'acetic'], ammonia: ['Ammonia (titrated with HCl)', 'ammonium'], carbonic: ['Carbonic acid', 'carbonic'], phosphoric: ['Phosphoric acid', 'phosphoric'] };
    const IND = { pp: ['Phenolphthalein', 8.2, 10.0, '#eef0f4', '#e0379b'], mo: ['Methyl orange', 3.1, 4.4, '#e03c31', '#f2c418'], bb: ['Bromothymol blue', 6.0, 7.6, '#e8d43a', '#2f62c9'], mr: ['Methyl red', 4.4, 6.2, '#e03c31', '#f2d33a'] };
    let an = 'acetic', ind = 'pp';
    api.select({ id: 'a', label: 'Sample (25.0 mL)', value: an, options: Object.keys(AN).map((k) => [k, AN[k][0]]), onChange: (v) => { an = v; draw(); } });
    const ca = api.slider({ id: 'ca', label: 'Sample concentration', min: 0.01, max: 0.2, step: 0.005, value: 0.1, unit: 'mol/L', onChange: () => draw() });
    const ct = api.slider({ id: 'ct', label: 'Titrant concentration', min: 0.05, max: 0.2, step: 0.005, value: 0.1, unit: 'mol/L', onChange: () => draw() });
    const v = api.slider({ id: 'v', label: 'Titrant added', min: 0, max: 80, step: 0.1, value: 12.5, unit: 'mL', onChange: () => draw() });
    api.select({ id: 'i', label: 'Indicator', value: ind, options: Object.keys(IND).map((k) => [k, IND[k][0] + ' (pH ' + IND[k][1] + '–' + IND[k][2] + ')']), onChange: (x) => { ind = x; draw(); } });
    const out = api.readout();
    cv.onResize = () => draw();
    function pHat(vol) {
      const Va = 25e-3, Vt = vol * 1e-3, Vtot = Va + Vt, base = an === 'ammonia';
      const nA = ca.value * Va, nT = ct.value * Vt;
      if (an === 'hcl') return U.solvePH([], (nT - nA) / Vtot);
      const A = PB.chemAcids[AN[an][1]], Kas = A[1].map((p) => Math.pow(10, -p));
      if (base) return U.solvePH([{ C: nA / Vtot, Kas: Kas, charge0: 1 }], -nT / Vtot);
      return U.solvePH([{ C: nA / Vtot, Kas: Kas, charge0: 0 }], nT / Vtot);
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const fw = 90, b = { x: 50 + fw, y: 16, w: cv.w - 64 - fw, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 80], [0, 14], { xlabel: 'titrant (mL)', ylabel: 'pH', ny: 7 });
      const I = IND[ind];
      ctx.fillStyle = U.alpha(C.points, 0.12); ctx.fillRect(b.x, m.Y(I[2]), b.w, m.Y(I[1]) - m.Y(I[2]));
      const pts = []; for (let i = 0; i <= 400; i++) { const x = (80 * i) / 400; pts.push([m.X(x), m.Y(pHat(x))]); }
      U.curve(ctx, pts, C.accent, 2.4);
      const p = pHat(v.value); U.dot(ctx, m.X(v.value), m.Y(p), 5, C.points, C.ink);
      // flask colour from indicator: mix of acid and base colours
      const f = Math.max(0, Math.min(1, (p - I[1]) / (I[2] - I[1])));
      const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
      const c1 = hex(I[3]), c2 = hex(I[4]), mix = c1.map((x, i) => Math.round(x + (c2[i] - x) * f));
      ctx.fillStyle = 'rgb(' + mix.join(',') + ')'; ctx.beginPath(); ctx.moveTo(20, cv.h - 40); ctx.lineTo(80, cv.h - 40); ctx.lineTo(62, cv.h - 110); ctx.lineTo(38, cv.h - 110); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(14, cv.h - 34); ctx.lineTo(86, cv.h - 34); ctx.lineTo(60, cv.h - 140); ctx.lineTo(60, cv.h - 170); ctx.moveTo(40, cv.h - 170); ctx.lineTo(40, cv.h - 140); ctx.lineTo(14, cv.h - 34); ctx.stroke();
      const Veq = (ca.value * 25) / ct.value;
      out([['pH now', p.toFixed(2)], ['first equivalence point', Veq.toFixed(2) + ' mL'], ['half-equivalence pH', an === 'hcl' ? '—' : pHat(Veq / 2).toFixed(2) + (an === 'ammonia' ? ' (= pKa of NH₄⁺)' : ' (= pKa₁)')], ['indicator colour', f <= 0 ? 'acid form' : f >= 1 ? 'base form' : 'changing']]);
    }
    draw();
  };

  /* =============== Rate laws (Chem 13) =============== */
  PB.sims.kinetics = function (api) {
    const cv = api.canvas(0.55);
    const ord = api.select({ id: 'o', label: 'Order in A', value: '1', options: [['0', 'Zero order'], ['1', 'First order'], ['2', 'Second order']], onChange: () => draw() });
    const k298 = api.slider({ id: 'k', label: 'Rate constant at 298 K', min: 0.01, max: 0.5, step: 0.01, value: 0.1, onChange: () => draw() });
    const Ea = api.slider({ id: 'e', label: 'Activation energy Eₐ', min: 10, max: 150, step: 1, value: 50, unit: 'kJ/mol', onChange: () => draw() });
    const T = api.slider({ id: 't', label: 'Temperature', min: 270, max: 360, step: 1, value: 298, unit: 'K', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx, n = +ord.value, A0 = 1;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const k = k298.value * Math.exp((-Ea.value * 1000 / R) * (1 / T.value - 1 / 298));
      const At = (t) => (n === 0 ? Math.max(0, A0 - k * t) : n === 1 ? A0 * Math.exp(-k * t) : A0 / (1 + A0 * k * t));
      const tmax = 40;
      const panels = [['[A]', (a) => a, [0, 1.05]], ['ln[A]', (a) => (a > 0 ? Math.log(a) : NaN), [-6, 0.2]], ['1/[A]', (a) => (a > 0 ? 1 / a : NaN), [0, 30]]];
      const pw = (cv.w - 40) / 3;
      panels.forEach((pn, i) => {
        const b = { x: 34 + i * pw, y: 22, w: pw - 30, h: cv.h - 60 };
        const m = U.frame(ctx, C, b, [0, tmax], pn[2], { xlabel: 't', ny: 3, nx: 2 });
        U.text(ctx, pn[0] + ' vs t', b.x + 4, b.y - 6, C.ink, U.ui(12, 700));
        U.clip(ctx, b);
        const pts = []; for (let j = 0; j <= 200; j++) { const t = (tmax * j) / 200; pts.push([m.X(t), m.Y(pn[1](At(t)))]); }
        U.curve(ctx, pts, (n === 0 && i === 0) || (n === 1 && i === 1) || (n === 2 && i === 2) ? C.good : C.accent, 2.2);
        ctx.restore();
      });
      const half = n === 0 ? A0 / (2 * k) : n === 1 ? Math.LN2 / k : 1 / (k * A0);
      out([['k at this temperature', k.toPrecision(3)], ['half-life ([A]₀ = 1)', half.toPrecision(3)], ['straight plot (green)', ['[A] vs t', 'ln[A] vs t', '1/[A] vs t'][n]], ['k(T)/k(298 K)', (k / k298.value).toPrecision(3)]]);
    }
    draw();
  };

  /* =============== Galvanic cell and the Nernst equation (Chem 14) =============== */
  PB.sims.cell = function (api) {
    const cv = api.canvas(0.5);
    const HC = { Li: ['Li⁺/Li', -3.04, 1], Mg: ['Mg²⁺/Mg', -2.37, 2], Al: ['Al³⁺/Al', -1.66, 3], Zn: ['Zn²⁺/Zn', -0.76, 2], Fe: ['Fe²⁺/Fe', -0.44, 2], Ni: ['Ni²⁺/Ni', -0.25, 2], Pb: ['Pb²⁺/Pb', -0.13, 2], Cu: ['Cu²⁺/Cu', 0.34, 2], Ag: ['Ag⁺/Ag', 0.80, 1], Au: ['Au³⁺/Au', 1.50, 3] };
    const left = api.select({ id: 'l', label: 'Left half-cell', value: 'Zn', options: Object.keys(HC).map((k) => [k, HC[k][0] + ' (E° = ' + HC[k][1] + ' V)']), onChange: () => draw() });
    const right = api.select({ id: 'r', label: 'Right half-cell', value: 'Cu', options: Object.keys(HC).map((k) => [k, HC[k][0] + ' (E° = ' + HC[k][1] + ' V)']), onChange: () => draw() });
    const cl = api.slider({ id: 'cl', label: 'Left ion concentration', min: -4, max: 1, step: 0.1, value: 0, format: (v) => Math.pow(10, v).toPrecision(2) + ' M', onChange: () => draw() });
    const cr = api.slider({ id: 'cr', label: 'Right ion concentration', min: -4, max: 1, step: 0.1, value: 0, format: (v) => Math.pow(10, v).toPrecision(2) + ' M', onChange: () => draw() });
    const out = api.readout();
    let ph = 0;
    cv.onResize = () => {};
    const lcm = (a, b) => { const g = (x, y) => (y ? g(y, x % y) : x); return (a * b) / g(a, b); };
    function draw(dt) {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      ph += dt || 0;
      const L = HC[left.value], Rr = HC[right.value];
      const cathodeRight = Rr[1] >= L[1];
      const cat = cathodeRight ? Rr : L, ano = cathodeRight ? L : Rr;
      const cCat = Math.pow(10, cathodeRight ? cr.value : cl.value), cAno = Math.pow(10, cathodeRight ? cl.value : cr.value);
      const n = lcm(cat[2], ano[2]);
      const E0 = cat[1] - ano[1];
      // overall: (n/za) M_ano + (n/zc) M_cat^zc+ -> (n/za) M_ano^za+ + (n/zc) M_cat ; Q = [ano]^(n/za) / [cat]^(n/zc)
      const lnQ = (n / ano[2]) * Math.log(cAno) - (n / cat[2]) * Math.log(cCat);
      const E = E0 - ((R * 298.15) / (n * F)) * lnQ;
      const w = cv.w, hgt = cv.h, bw = w * 0.28;
      [[w * 0.08, left.value, L, cathodeRight], [w * 0.64, right.value, Rr, !cathodeRight]].forEach(([x, name, hc, isAnode]) => {
        ctx.fillStyle = U.alpha(C.accent, 0.12); ctx.fillRect(x, hgt * 0.45, bw, hgt * 0.42);
        ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.strokeRect(x, hgt * 0.35, bw, hgt * 0.52);
        ctx.fillStyle = C.ink3; ctx.fillRect(x + bw / 2 - 8, hgt * 0.2, 16, hgt * 0.5);
        U.text(ctx, name, x + bw / 2, hgt * 0.18, C.ink, U.ui(14, 800), 'center');
        U.text(ctx, isAnode ? 'anode (−), oxidation' : 'cathode (+), reduction', x + bw / 2, hgt * 0.95, isAnode ? C.rust : C.teal, U.ui(11.5, 700), 'center');
      });
      ctx.strokeStyle = C.ink3; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(w * 0.08 + bw * 0.8, hgt * 0.55); ctx.lineTo(w * 0.08 + bw * 0.8, hgt * 0.3); ctx.lineTo(w * 0.64 + bw * 0.2, hgt * 0.3); ctx.lineTo(w * 0.64 + bw * 0.2, hgt * 0.55); ctx.stroke();
      U.text(ctx, 'salt bridge', w / 2, hgt * 0.27, C.ink2, U.ui(11), 'center');
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w * 0.08 + bw / 2, hgt * 0.2); ctx.lineTo(w * 0.08 + bw / 2, hgt * 0.08); ctx.lineTo(w * 0.64 + bw / 2, hgt * 0.08); ctx.lineTo(w * 0.64 + bw / 2, hgt * 0.2); ctx.stroke();
      U.text(ctx, (E >= 0 ? '+' : '') + E.toFixed(3) + ' V', w / 2, hgt * 0.06, C.points, U.mono(14, 700), 'center');
      if (left.value !== right.value) {
        const dir = cathodeRight ? 1 : -1, x0 = w * 0.08 + bw / 2, x1 = w * 0.64 + bw / 2;
        for (let k = 0; k < 6; k++) { const f = ((ph * 0.4 + k / 6) % 1), x = dir > 0 ? x0 + (x1 - x0) * f : x1 - (x1 - x0) * f; U.dot(ctx, x, hgt * 0.08, 3, C.accent); }
        U.text(ctx, 'e⁻ flow ' + (dir > 0 ? '→' : '←'), w / 2, hgt * 0.14, C.accent, U.ui(11, 700), 'center');
      }
      const dG = -n * F * E0 / 1000, K = Math.exp((n * F * E0) / (R * 298.15));
      out([['E°cell = E°cathode − E°anode', E0.toFixed(2) + ' V'], ['E (Nernst, 298 K)', E.toFixed(3) + ' V'], ['electrons transferred n', String(n)], ['ΔG° = −nFE°', dG.toFixed(0) + ' kJ/mol'], ['K', E0 === 0 ? '1' : K.toExponential(2)]]);
    }
    api.loop((dt) => draw(dt));
  };

  /* =============== Ellingham diagram (Chem 15) =============== */
  PB.sims.ellingham = function (api) {
    const cv = api.canvas(0.56);
    // ΔG° = ΔH° − TΔS° per mol O2 (approximate, kJ and kJ/K)
    const LINES = { '2C + O₂ → 2CO': [-221, 0.179], 'C + O₂ → CO₂': [-394, 0.003], '2CO + O₂ → 2CO₂': [-566, -0.173], '4Cu + O₂ → 2Cu₂O': [-337, -0.145], '2Fe + O₂ → 2FeO': [-544, -0.140], '2Zn + O₂ → 2ZnO': [-701, -0.201], '4/3Al + O₂ → 2/3Al₂O₃': [-1117, -0.209], '2Mg + O₂ → 2MgO': [-1203, -0.216] };
    const metals = ['4Cu + O₂ → 2Cu₂O', '2Fe + O₂ → 2FeO', '2Zn + O₂ → 2ZnO', '4/3Al + O₂ → 2/3Al₂O₃', '2Mg + O₂ → 2MgO'];
    const met = api.select({ id: 'm', label: 'Metal oxide to reduce with carbon', value: '2Zn + O₂ → 2ZnO', options: metals.map((k) => [k, k]), onChange: () => draw() });
    const T = api.slider({ id: 't', label: 'Furnace temperature', min: 300, max: 2500, step: 10, value: 1200, unit: 'K', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 60, y: 16, w: cv.w - 76, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [300, 2500], [-1200, 0], { xlabel: 'T (K)', ylabel: 'ΔG° (kJ per mol O₂)', ny: 4 });
      Object.keys(LINES).forEach((k) => {
        const [h, s] = LINES[k], sel = k === met.value, carbon = k === '2C + O₂ → 2CO';
        U.curve(ctx, [[m.X(300), m.Y(h - 300 * s)], [m.X(2500), m.Y(h - 2500 * s)]], sel ? C.rust : carbon ? C.ink : U.alpha(C.ink3, 0.7), sel || carbon ? 2.5 : 1.2);
        U.text(ctx, k, m.X(2500) - 4, m.Y(h - 2500 * s) - 4, sel ? C.rust : carbon ? C.ink : C.ink3, U.ui(10.5, sel ? 700 : 500), 'right');
      });
      ctx.strokeStyle = C.points; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(m.X(T.value), b.y); ctx.lineTo(m.X(T.value), b.y + b.h); ctx.stroke();
      const [hm, sm] = LINES[met.value], [hc, sc] = LINES['2C + O₂ → 2CO'];
      const Tx = (hm - hc) / (sm - sc);
      const gM = hm - T.value * sm, gC = hc - T.value * sc;
      out([['ΔG° metal oxide formation', gM.toFixed(0) + ' kJ'], ['ΔG° 2C + O₂ → 2CO', gC.toFixed(0) + ' kJ'], ['carbon reduces the oxide?', gC < gM ? 'yes (CO line below)' : 'no'], ['carbon works above', Tx > 300 && Tx < 4000 ? Tx.toFixed(0) + ' K' : 'out of range']]);
    }
    draw();
  };

  /* =============== Crystal-field splitting (Chem 16) =============== */
  PB.sims.crystalfield = function (api) {
    const cv = api.canvas(0.52);
    const LIG = { 'I⁻': 0.72, 'Br⁻': 0.76, 'Cl⁻': 0.80, 'F⁻': 0.90, 'H₂O': 1.0, 'NH₃': 1.25, 'en': 1.28, 'CN⁻': 1.7 };
    const dn = api.slider({ id: 'd', label: 'd electrons', min: 1, max: 10, step: 1, value: 6, format: (v) => 'd' + v });
    const lig = api.select({ id: 'l', label: 'Ligand (spectrochemical series)', value: 'H₂O', options: Object.keys(LIG).map((k) => [k, k + ' (f = ' + LIG[k] + ')']) });
    const base = api.slider({ id: 'b', label: 'Δo with water ligands', min: 8000, max: 30000, step: 500, value: 16500, unit: 'cm⁻¹' });
    const P = api.slider({ id: 'p', label: 'Pairing energy P', min: 10000, max: 30000, step: 500, value: 19000, unit: 'cm⁻¹' });
    const out = api.readout();
    cv.onResize = () => {};
    function draw() {
      const C = api.colors(), ctx = cv.ctx, n = dn.value, D = base.value * LIG[lig.value];
      ctx.clearRect(0, 0, cv.w, cv.h);
      const low = D > P.value;
      const t2g = [0, 0, 0], eg = [0, 0];
      // fill: low spin fills t2g completely first; high spin puts one electron in each of the five orbitals first
      const order = low ? ['t', 't', 't', 't', 't', 't', 'e', 'e', 'e', 'e'] : ['t', 't', 't', 'e', 'e', 't', 't', 't', 'e', 'e'];
      let ti = 0, ei = 0;
      for (let k = 0; k < n; k++) { if (order[k] === 't') { t2g[ti % 3]++; ti++; } else { eg[ei % 2]++; ei++; } }
      const cx = cv.w * 0.3, yT = cv.h * 0.72, yE = yT - Math.min(cv.h * 0.55, D / 30000 * cv.h * 0.55);
      const drawSet = (arr, y, label) => { arr.forEach((c, i) => { const x = cx - (arr.length * 46) / 2 + i * 46; ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 36, y); ctx.stroke(); if (c >= 1) U.arrow(ctx, x + 12, y - 2, x + 12, y - 24, C.accent, 1.8, 5); if (c >= 2) U.arrow(ctx, x + 24, y - 24, x + 24, y - 2, C.rust, 1.8, 5); }); U.text(ctx, label, cx + 90, y + 4, C.ink2, U.ui(12, 700)); };
      drawSet(t2g, yT, 't₂g'); drawSet(eg, yE, 'eg');
      U.arrow(ctx, cx - 110, yT, cx - 110, yE, C.points, 1.5, 6); U.text(ctx, 'Δo', cx - 118, (yT + yE) / 2, C.points, U.ui(13, 700), 'right');
      const lam = 1e7 / D;
      const rgb = U.wl2rgb(Math.max(380, Math.min(750, lam)));
      ctx.fillStyle = 'rgb(' + rgb.join(',') + ')'; ctx.fillRect(cv.w * 0.68, cv.h * 0.2, 50, 40); U.text(ctx, 'absorbed', cv.w * 0.68 + 25, cv.h * 0.2 + 56, C.ink2, U.ui(11), 'center');
      const comp = rgb.map((v) => 255 - v * 0.8);
      ctx.fillStyle = 'rgb(' + comp.map(Math.round).join(',') + ')'; ctx.beginPath(); ctx.arc(cv.w * 0.68 + 120, cv.h * 0.2 + 20, 26, 0, Math.PI * 2); ctx.fill(); U.text(ctx, 'seen (roughly)', cv.w * 0.68 + 120, cv.h * 0.2 + 64, C.ink2, U.ui(11), 'center');
      const cfse = (-0.4 * t2g.reduce((a, b) => a + b, 0) + 0.6 * eg.reduce((a, b) => a + b, 0));
      const unp = t2g.concat(eg).filter((c) => c === 1).length;
      out([['Δo', Math.round(D) + ' cm⁻¹'], ['spin state', n >= 4 && n <= 7 ? (low ? 'low spin (Δo > P)' : 'high spin (Δo < P)') : 'only one possibility'], ['unpaired electrons', String(unp)], ['CFSE', cfse.toFixed(1) + ' Δo'], ['absorbed wavelength', Math.round(lam) + ' nm']]);
    }
    api.loop(draw);
  };

  /* =============== Boiling points of homologous series (Chem 17) =============== */
  PB.sims.homologous = function (api) {
    const cv = api.canvas(0.55);
    const S = { alkane: ['Alkanes', [-162, -89, -42, -0.5, 36, 69, 98, 126, 151, 174]], aldehyde: ['Aldehydes', [-19, 20, 49, 75, 103, 131, 153, 171, 191, 208]], alcohol: ['Alcohols (1-ol)', [65, 78, 97, 117, 138, 157, 176, 195, 213, 231]], acid: ['Carboxylic acids', [101, 118, 141, 164, 186, 205, 223, 239, 253, 269]] };
    const on = {};
    Object.keys(S).forEach((k) => { on[k] = api.check({ id: k, label: S[k][0], value: true, onChange: () => draw() }); });
    const nC = api.slider({ id: 'n', label: 'Carbon atoms', min: 1, max: 10, step: 1, value: 4, format: (v) => String(v), onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [1, 10], [-180, 300], { xlabel: 'carbon atoms', ylabel: 'boiling point (°C)', ny: 4, xticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
      const cols = { alkane: C.ink3, aldehyde: C.teal, alcohol: C.accent, acid: C.rust };
      Object.keys(S).forEach((k) => { if (!on[k].value) return; U.curve(ctx, S[k][1].map((y, i) => [m.X(i + 1), m.Y(y)]), cols[k], 2.2); S[k][1].forEach((y, i) => U.dot(ctx, m.X(i + 1), m.Y(y), 3, cols[k])); });
      ctx.strokeStyle = U.alpha(C.ink3, 0.5); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(m.X(nC.value), b.y); ctx.lineTo(m.X(nC.value), b.y + b.h); ctx.stroke(); ctx.setLineDash([]);
      out(Object.keys(S).map((k) => [S[k][0], '<span style="color:' + cols[k] + '">' + S[k][1][nC.value - 1] + ' °C</span>']));
    }
    draw();
  };

  /* =============== SN1 / SN2 / E1 / E2 predictor (Chem 18) =============== */
  PB.sims.substitution = function (api) {
    const cv = api.canvas(0.5);
    const sub = api.select({ id: 's', label: 'Substrate (alkyl bromide)', value: '2', options: [['0', 'Methyl: CH₃Br'], ['1', 'Primary: CH₃CH₂Br'], ['2', 'Secondary: (CH₃)₂CHBr'], ['3', 'Tertiary: (CH₃)₃CBr']], onChange: () => draw() });
    const nuc = api.select({ id: 'n', label: 'Reagent', value: 'oh', options: [['i', 'I⁻ (good nucleophile, weak base)'], ['oh', 'OH⁻ (strong nucleophile, strong base)'], ['tbuo', '(CH₃)₃CO⁻ (bulky strong base)'], ['h2o', 'H₂O (weak nucleophile, weak base)']], onChange: () => draw() });
    const solv = api.select({ id: 'v', label: 'Solvent', value: 'aprotic', options: [['aprotic', 'Polar aprotic (acetone, DMSO)'], ['protic', 'Polar protic (water, ethanol)']], onChange: () => draw() });
    const heat = api.check({ id: 'h', label: 'Heat strongly', value: false, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    // A rule-of-thumb scoring model used in teaching: not a quantitative prediction.
    function scores() {
      const d = +sub.value, n = nuc.value, prot = solv.value === 'protic', hot = heat.value;
      const strongNu = n === 'i' || n === 'oh', strongB = n === 'oh' || n === 'tbuo', bulky = n === 'tbuo';
      let sn2 = [10, 7, 3, 0][d] * (strongNu ? 1 : 0.15) * (prot ? 0.6 : 1) * (bulky ? 0.15 : 1);
      let sn1 = [0, 0, 3, 9][d] * (strongNu ? 0.5 : 1) * (prot ? 1.4 : 0.4) * (hot ? 0.7 : 1);
      let e2 = [0, 3, 6, 8][d] * (strongB ? 1 : 0.1) * (bulky ? 2 : 1) * (hot ? 1.6 : 1);
      let e1 = [0, 0, 2, 6][d] * (strongB ? 0.2 : 1) * (prot ? 1.2 : 0.4) * (hot ? 2 : 0.6);
      const t = sn2 + sn1 + e2 + e1 || 1;
      return [['SN2', sn2 / t], ['SN1', sn1 / t], ['E2', e2 / t], ['E1', e1 / t]];
    }
    function draw() {
      const C = api.colors(), ctx = cv.ctx, sc = scores();
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 20, w: cv.w - 70, h: cv.h - 56 };
      const m = U.frame(ctx, C, b, [0, 4], [0, 1], { xticks: [], ylabel: 'relative share (teaching model)', ny: 4, yfmt: (v) => Math.round(v * 100) + '%' });
      const cols = [C.accent, C.teal, C.points, C.rust];
      sc.forEach((s, i) => { const x = b.x + (i + 0.2) * b.w / 4; ctx.fillStyle = cols[i]; ctx.fillRect(x, m.Y(s[1]), b.w * 0.15, m.Y(0) - m.Y(s[1])); U.text(ctx, s[0], x + b.w * 0.075, b.y + b.h + 16, C.ink, U.ui(13, 700), 'center'); });
      const best = sc.slice().sort((a, b2) => b2[1] - a[1])[0];
      const why = { SN2: 'backside attack: needs an unhindered carbon and a good nucleophile', SN1: 'carbocation intermediate: needs a stable (tertiary) cation and a protic solvent', E2: 'concerted elimination: needs a strong base; bulky bases favour it', E1: 'carbocation then loss of H⁺: tertiary substrate, weak base, heat' };
      out([['main pathway', best[0]], ['why', why[best[0]]], ['product type', best[0][0] === 'S' ? 'substitution (alcohol, iodide…)' : 'elimination (alkene)']]);
    }
    draw();
  };

  /* =============== Overall yield of a synthesis (Chem 19) =============== */
  PB.sims.synthesis = function (api) {
    const cv = api.canvas(0.5);
    const steps = api.slider({ id: 'n', label: 'Number of steps', min: 2, max: 16, step: 1, value: 8, format: (v) => String(v), onChange: () => draw() });
    const y = api.slider({ id: 'y', label: 'Yield of each step', min: 50, max: 99, step: 1, value: 85, unit: '%', onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    function draw() {
      const C = api.colors(), ctx = cv.ctx, n = steps.value, f = y.value / 100;
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 54, y: 16, w: cv.w - 70, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [0, 16], [0, 100], { xlabel: 'steps completed', ylabel: 'material left (%)', ny: 4 });
      const lin = [], conv = [];
      for (let k = 0; k <= n; k++) lin.push([m.X(k), m.Y(100 * Math.pow(f, k))]);
      // convergent: two branches of n/2 steps run in parallel, then one coupling step
      const half = Math.ceil((n - 1) / 2);
      for (let k = 0; k <= half + 1; k++) conv.push([m.X(k), m.Y(100 * Math.pow(f, k))]);
      U.curve(ctx, lin, C.rust, 2.5); U.curve(ctx, conv, C.good, 2.5, [6, 4]);
      U.text(ctx, 'linear route', lin[lin.length - 1][0] - 4, lin[lin.length - 1][1] - 8, C.rust, U.ui(11.5, 700), 'right');
      U.text(ctx, 'convergent route', conv[conv.length - 1][0] + 6, conv[conv.length - 1][1], C.good, U.ui(11.5, 700));
      out([['linear: yield^n', (100 * Math.pow(f, n)).toFixed(1) + '%'], ['convergent (longest branch ' + (half + 1) + ' steps)', (100 * Math.pow(f, half + 1)).toFixed(1) + '%'], ['steps at 50% overall (linear)', (Math.log(0.5) / Math.log(f)).toFixed(1)]]);
    }
    draw();
  };

  /* =============== ¹H NMR spectra (Chem 20) =============== */
  PB.sims.nmr = function (api) {
    const cv = api.canvas(0.5);
    // peaks: [shift ppm, number of H, neighbouring H (n+1 rule), label]
    const MOLS = {
      ethanol: ['Ethanol CH₃CH₂OH', [[1.2, 3, 2, 'CH₃'], [3.7, 2, 3, 'CH₂'], [2.6, 1, 0, 'OH']]],
      ethylacetate: ['Ethyl ethanoate CH₃COOCH₂CH₃', [[2.0, 3, 0, 'CH₃CO'], [4.1, 2, 3, 'OCH₂'], [1.3, 3, 2, 'CH₃']]],
      propanone: ['Propanone (CH₃)₂CO', [[2.1, 6, 0, '2 × CH₃']]],
      chloropropane: ['2-Chloropropane (CH₃)₂CHCl', [[1.5, 6, 1, '2 × CH₃'], [4.2, 1, 6, 'CH']]],
      propanol: ['Propan-1-ol CH₃CH₂CH₂OH', [[0.9, 3, 2, 'CH₃'], [1.6, 2, 5, 'CH₂'], [3.6, 2, 2, 'CH₂O'], [2.3, 1, 0, 'OH']]],
      butanone: ['Butanone CH₃COCH₂CH₃', [[2.15, 3, 0, 'CH₃CO'], [2.45, 2, 3, 'CH₂'], [1.05, 3, 2, 'CH₃']]],
      toluene: ['Methylbenzene C₆H₅CH₃', [[2.35, 3, 0, 'CH₃'], [7.2, 5, 0, 'ArH (overlapping)']]]
    };
    const mol = api.select({ id: 'm', label: 'Molecule', value: 'ethanol', options: Object.keys(MOLS).map((k) => [k, MOLS[k][0]]), onChange: () => draw() });
    const integ = api.check({ id: 'i', label: 'Show integration', value: true, onChange: () => draw() });
    const out = api.readout();
    cv.onResize = () => draw();
    const pascal = (n) => { let r = [1]; for (let i = 0; i < n; i++) r = r.concat([0]).map((v, k) => v + (k ? r[k - 1] : 0)); return r; };
    const NAMES = ['singlet', 'doublet', 'triplet', 'quartet', 'quintet', 'sextet', 'septet'];
    function draw() {
      const C = api.colors(), ctx = cv.ctx, M = MOLS[mol.value];
      ctx.clearRect(0, 0, cv.w, cv.h);
      const b = { x: 20, y: 20, w: cv.w - 40, h: cv.h - 50 };
      const m = U.frame(ctx, C, b, [9, 0], [0, 1.15], { xlabel: 'δ (ppm)', noLabels: false, yfmt: () => '', ny: 1, xticks: [8, 7, 6, 5, 4, 3, 2, 1, 0] });
      const J = 7 / 400; // 7 Hz at 400 MHz in ppm
      const lw = 0.006, spec = new Float64Array(901);
      const maxH = Math.max(...M[1].map((p) => p[1]));
      M[1].forEach(([d, nH, nb]) => { const pat = pascal(nb), s = pat.reduce((a, c) => a + c, 0); pat.forEach((c, k) => { const pos = d + (k - nb / 2) * J; for (let i = 0; i <= 900; i++) { const x = 9 - i * 0.01; spec[i] += ((nH / maxH) * (c / s) * 4 * lw * lw) / ((x - pos) * (x - pos) + lw * lw); } }); });
      const top = Math.max(...spec);
      const pts = []; for (let i = 0; i <= 900; i++) pts.push([m.X(9 - i * 0.01), m.Y((spec[i] / top) * 0.9)]);
      U.curve(ctx, pts, C.accent, 1.6);
      if (integ.value) { let acc = 0; const tot = spec.reduce((a, c) => a + c, 0); const ip = []; for (let i = 0; i <= 900; i++) { acc += spec[i]; ip.push([m.X(9 - i * 0.01), m.Y(0.05 + (acc / tot) * 1.0)]); } U.curve(ctx, ip, U.alpha(C.points, 0.8), 1.5); }
      M[1].forEach(([d, nH, nb, lab]) => U.text(ctx, lab, m.X(d), b.y + 12, C.ink2, U.ui(11, 700), 'center'));
      out(M[1].map(([d, nH, nb, lab]) => [lab + ' at ' + d + ' ppm', nH + 'H, ' + (NAMES[nb] || 'multiplet') + ' (' + nb + ' neighbours)']));
    }
    draw();
  };
})();
