/* Scibook learning layer for the Learn tab.
   - Worked examples become "Try it" quizzes: you answer first, and the worked solution opens once you are right
     (or after two honest attempts).
   - Each chapter's concept checks are placed inline, after the section they test.
   - Each chapter opens with "The big idea" in plain words and a refresher of the prerequisite chapters.
   - Inline figures (small interactive plots) sit inside the text. */
(function () {
  'use strict';
  const PB = window.PB, h = PB.h, S = function () { return PB.S; };
  const R = PB.R;

  /* ---------- Answers for the worked examples (chapter:section:index) ---------- */
  const N = (answer, unit, hints, o) => Object.assign({ type: 'num', answer: answer, unit: unit || '', hints: hints || [] }, o || {});
  const M = (options, answer, hints, o) => Object.assign({ type: 'mcq', options: options, answer: answer, hints: hints || [] }, o || {});
  const chi = [[315, 312.75], [108, 104.25], [101, 104.25], [32, 34.75]].reduce((a, x) => a + Math.pow(x[0] - x[1], 2) / x[1], 0);
  PB.EXQ = {
    'toolkit:0:0': M(['$v \\propto \\lambda$', '$v \\propto \\sqrt\\lambda$', '$v \\propto 1/\\lambda$', '$v$ does not depend on $\\lambda$'], 1, [R`Write $v = Cg^a\lambda^b$ and match the powers of metres and seconds.`, R`Seconds: $-2a = -1$.`]),
    'toolkit:1:0': N(1.5e27, 'molecules', [R`A mole of gas at room conditions fills about 24 L.`, R`Find the moles first: $60/0.024$.`], { tol: 0.67, ask: 'Estimate the number of molecules (anything within a factor of 3 counts).' }),
    'toolkit:2:0': M(['$(1,-1,1)/\\sqrt3$', '$(1,1,1)/\\sqrt3$', '$(1,0,-1)/\\sqrt2$', '$(0,1,0)$'], 0, [R`The cross product $\vec A\times\vec B$ is perpendicular to both.`, R`Then divide by its length.`]),
    'toolkit:3:0': M(['$\\gamma \\approx 1 + v^2/2c^2$', '$\\gamma \\approx 1 - v^2/2c^2$', '$\\gamma \\approx 1 + v/c$', '$\\gamma \\approx v/c$'], 0, [R`Use $(1 + x)^n \approx 1 + nx$ with $n = -\tfrac12$.`], { ask: 'Which approximation for γ makes it work?' }),
    'kinematics:1:0': N((15 + Math.sqrt(225 + 2 * 9.8 * 20)) / 9.8, 's', [R`Put the origin at the launch point, up positive. The ground is at $s = -20$ m.`, R`Solve $-20 = 15t - 4.9t^2$ and keep the positive root.`]),
    'kinematics:3:0': N(Math.asin(0.6) * 180 / Math.PI, '°', [R`Her upstream velocity component must cancel the current.`, R`$1.0\sin\phi = 0.6$.`], { ask: 'Give the angle upstream of straight across, in degrees.' }),
    'newton:1:0': M(['Horizontally', 'At an angle with $\\tan\\phi = \\mu$ above the horizontal', 'At 45°', 'At an angle with $\\tan\\phi = 1/\\mu$'], 1, [R`Pulling upwards reduces the normal force, and so the friction.`, R`Minimise $F = \mu mg/(\cos\phi + \mu\sin\phi)$.`]),
    'newton:3:0': M(['Vertically', 'Tilted backwards, with $\\tan\\phi = a/g$', 'Tilted forwards, with $\\tan\\phi = a/g$', 'Tilted backwards, with $\\sin\\phi = a/g$'], 1, [R`In the car's frame there is a fictitious force $ma$ pointing backwards.`, R`The string lines up with the effective gravity.`]),
    'energy:0:0': M(['$kx$', '$\\tfrac12kx^2$', '$kx^2$', '$2kx^2$'], 1, [R`The force grows from 0 to $kx$ as you stretch.`, R`Work is the area under the force–extension graph.`]),
    'energy:3:0': N(2.5, '× R', [R`At the top the track can only push inwards, so $v^2 \ge gR$.`, R`Energy: $mgh = mg(2R) + \tfrac12mv^2$.`], { ask: 'Give the minimum height as a multiple of R.' }),
    'momentum:2:0': M(['0°', '45°', '90°', '180°'], 2, [R`Square the momentum equation and compare with the energy equation.`], { ask: 'What is the angle between the two final velocities?' }),
    'rotation:1:0': M(['$\\tfrac12MR^2$', '$\\tfrac14MR^2$', '$MR^2$', '$\\tfrac13MR^2$'], 1, [R`$I_z = I_x + I_y$ for a flat object, and $I_z = \tfrac12MR^2$.`, R`By symmetry $I_x = I_y$.`]),
    'rotation:2:0': M(['$\\tan\\theta \\ge 1/(2\\mu)$', '$\\tan\\theta \\ge \\mu$', '$\\tan\\theta \\ge 2\\mu$', '$\\sin\\theta \\ge \\mu$'], 0, [R`Take torques about the foot of the ladder.`, R`Friction must equal the wall's push, $\tfrac12Mg\cot\theta$, and is at most $\mu Mg$.`]),
    'fluids:1:0': M(['It rises', 'It falls', 'It stays the same', 'It depends on the temperature'], 2, [R`A floating object displaces its own mass of water.`]),
    'thermodynamics:1:0': M(['Because $\\gamma > 1$: the adiabat has slope $-\\gamma P/V$', 'Because heat flows in during an adiabatic change', 'Because no work is done', 'It is not: they are equally steep'], 0, [R`Compare $PV = $ const with $PV^\gamma = $ const.`]),
    'electrostatics:2:0': M(['Zero', '$kQ/r^2$', '$kQr/R^3$', '$kQ/R^2$'], 2, [R`A Gaussian sphere of radius $r < R$ encloses $Q(r/R)^3$.`], { ask: 'What is the field inside the sphere, at radius r < R?' }),
    'circuits:2:0': N((1 + Math.sqrt(5)) / 2, '× R', [R`Adding one more section in front leaves an infinite ladder unchanged.`, R`So $x = R + \dfrac{Rx}{R + x}$.`], { ask: 'Give the equivalent resistance as a multiple of R.' }),
    'analytical:1:0': M(['Only if $\\omega^2R > g$', 'Only if $\\omega^2R < g$', 'Always', 'Never'], 0, [R`Set $\ddot\theta = 0$ in $R\ddot\theta = \sin\theta(\omega^2R\cos\theta - g)$.`, R`You need $\cos\theta_0 = g/\omega^2R \le 1$.`], { ask: 'Besides θ = 0, when is there another equilibrium?' }),
    'analytical:3:0': M(['$\\sqrt{k/m}$', '$\\sqrt{\\dfrac km\\left(1 + \\dfrac{2m}M\\right)}$', '$\\sqrt{k/M}$', '0'], 1, [R`In the antisymmetric stretch the centre atom moves against both outer atoms.`, R`Momentum conservation fixes the centre's amplitude.`], { ask: 'Which is the frequency of the antisymmetric stretch?' }),
    'chem-moles:1:0': N(3 * 5 / 100.09 * 6.022e23, 'atoms', [R`$M(\text{CaCO}_3) = 100.09$ g/mol.`, R`Each formula unit has 3 O atoms.`]),
    'chem-solutions:2:0': N(2 * 0.0186 * 0.105 / 0.025, 'mol/L', [R`$\mathrm{H_2SO_4 + 2NaOH}$: two moles of base per mole of acid.`, R`$n(\text{acid}) = 0.01860 \times 0.1050$.`]),
    'chem-thermo:1:0': N(-100 * 4.18 * 6.8 / 0.05 / 1000, 'kJ/mol', [R`$q = mc\Delta T$ with 100 g of solution.`, R`Divide by the 0.0500 mol of water formed; the sign is negative because heat is released.`]),
    'chem-equilibrium:1:0': N(2 * Math.sqrt(50) / (2 + Math.sqrt(50)), 'mol/L', [R`Let $x$ react: $K = (2x)^2/(1 - x)^2$.`, R`Take square roots: $2x/(1 - x) = \sqrt{50}$.`]),
    'chem-electro:0:0': M(['1', '2', '5', '8'], 2, [R`Mn goes from +7 to +2; each Fe²⁺ loses one electron.`], { ask: 'How many Fe²⁺ ions react with each MnO₄⁻?' }),
    'chem-solid:1:0': N(4 * 63.55 / (6.022e23 * Math.pow(3.615e-8, 3)), 'g/cm³', [R`An fcc cell holds 4 atoms.`, R`$\rho = ZM/(N_Aa^3)$ with $a$ in cm.`]),
    'chem-solid:3:0': N(154.2 / (2 * Math.sin(19.1 * Math.PI / 180)) * Math.sqrt(3), 'pm', [R`The first fcc reflection is (111), with $d = a/\sqrt3$.`, R`Bragg: $\lambda = 2d\sin\theta$ with $\theta = 19.1^\circ$.`]),
    'chem-coord:2:0': N(-8.314 * 298 * Math.LN10 * (18.3 - 8.6) / 1000, 'kJ/mol', [R`$\Delta G = -RT\ln\beta = -RT\ln10\log\beta$.`, R`Use the difference in $\log\beta$: 18.3 − 8.6.`]),
    'chem-redox:1:0': N((0.56 + 2 * 2.27) / 3, 'V', [R`Add free energies ($nE$), not potentials.`, R`$(1\times0.56 + 2\times2.27)/3$.`]),
    'bio-molecules:3:0': N((2.34 + 9.6) / 2, '', [R`For an amino acid with no ionisable side chain, pI is the mean of the two pKa values.`]),
    'bio-cells:2:0': N(20000, '×', [R`Convert both lengths to the same unit: 40 mm = 40 000 μm.`]),
    'bio-membranes:2:0': N(-0.3 * 0.00831 * 298, 'MPa', [R`$\Psi_s = -iCRT$ with $R = 0.00831$ L MPa mol⁻¹ K⁻¹.`]),
    'bio-enzymes:1:0': N(75, 'μmol/min', [R`$v = V_{\max}[S]/(K_M + [S])$.`]),
    'bio-respiration:3:0': N(51 / 72.5, '', [R`Balance: $\mathrm{C_{51}H_{98}O_6} + 72.5\,\mathrm{O_2} \to 51\,\mathrm{CO_2} + 49\,\mathrm{H_2O}$.`, R`RQ = CO₂ out / O₂ in.`]),
    'bio-cellcycle:1:0': N(1, 'h', [R`The fraction of cells in a phase equals the fraction of time spent in it.`]),
    'bio-dna:0:0': N(28, '%', [R`A = T and G = C.`]),
    'bio-mendel:1:0': N(27 / 64, '', [R`Each gene independently gives a dominant phenotype with probability 3/4.`], { ask: 'What fraction show all three dominant traits?' }),
    'bio-mendel:3:0': N(chi, '', [R`Expected counts: $556\times\tfrac9{16}$, $556\times\tfrac3{16}$, …`, R`$\chi^2 = \sum (O - E)^2/E$.`], { tol: 0.05, ask: 'Calculate χ².' }),
    'bio-linkage:0:0': N(17, 'cM', [R`Recombinants are the two rare classes.`, R`$170/1000$ = 17%.`], { ask: 'How far apart are the genes?' }),
    'bio-linkage:3:0': M(['1/4', '1/2', '2/3', '3/4'], 2, [R`Both parents must be carriers, Ff.`, R`Among unaffected children, FF : Ff = 1 : 2.`]),
    'bio-popgen:0:0': N(2 * 0.98 * 0.02, '', [R`$q^2 = 1/2500$, so $q = 0.02$.`, R`Carriers are $2pq$.`], { tol: 0.03 }),
    'bio-nerves:1:0': N(0.25 / 0.0042, 'm/s', [R`Use the difference in delays: 9.2 − 5.0 ms.`]),
    'bio-immunity:3:0': N(80 / 0.9, '%', [R`The immune fraction needed is $1 - 1/R_0$.`, R`Divide by the vaccine efficacy.`]),
    'bio-plants:0:0': N(-0.3 * 0.00831 * 293, 'MPa', [R`No net movement means the tissue's water potential equals the solution's.`, R`$\Psi = -CRT$ with $T = 293$ K.`]),
    'bio-evolution:3:0': N(20, 'million years', [R`Both lineages change, so $d = 2\mu t$.`]),
    'bio-populations:3:0': N(0.7, '', [R`$D = 1 - \sum p_i^2$ with proportions 0.4, 0.3, 0.2, 0.1.`]),
    'bio-signalling:3:0': N(0.75, '', [R`Fraction bound $= [L]/(K_d + [L])$.`]),
    'bio-animaldiv:3:0': N(3.4 * Math.pow(70, 0.75), 'W', [R`Kleiber: $P = 3.4M^{0.75}$ W with $M$ in kg.`]),
    'bio-behaviour:3:0': N(0.4, '', [R`At the mixed ESS the hawk fraction is $V/C$.`]),
    'astro-sphere:2:0': N(90 - 51.5 - 16.7, '°', [R`Upper culmination: $h = 90^\circ - \varphi + \delta$.`], { ask: 'How high does Sirius get, in degrees?' }),
    'astro-time:1:0': N(90 - (1.3 + 23.44), '°', [R`At the December solstice the Sun's declination is −23.44°.`, R`$h = 90^\circ - |\varphi - \delta|$.`], { ask: 'Give the noon altitude of the Sun in Singapore.' }),
    'astro-moon:0:0': N(1 / (1 / 27.32 - 1 / 365.25), 'days', [R`$1/S = 1/P_{\text{sid}} - 1/P_{\text{year}}$.`]),
    'astro-telescopes:2:0': N(1.22 * 2.2e-6 / 8.2 * 206265, '″', [R`$\theta = 1.22\lambda/D$ in radians.`, R`1 rad = 206 265″.`]),
    'astro-kepler:2:0': N(4 * Math.PI * Math.PI * Math.pow(4.217e8, 3) / (6.674e-11 * Math.pow(1.769 * 86400, 2)), 'kg', [R`Kepler III: $M = 4\pi^2a^3/GP^2$.`, R`Convert to metres and seconds first.`]),
    'astro-planets:2:0': N(278 * Math.pow(0.75, 0.25) / Math.sqrt(1.52), 'K', [R`$T = 278\text{ K}\times(1 - A)^{1/4}/\sqrt{d}$.`]),
    'astro-exoplanets:1:0': N(Math.sqrt(0.0084) * 696000, 'km', [R`Depth $= (R_p/R_\star)^2$.`], { ask: 'Find the planet’s radius in km.' }),
    'astro-magnitudes:2:0': N(1000, 'pc', [R`$m - M = 5\log_{10}d - 5$.`]),
    'astro-spectra:0:0': N(Math.sqrt(1.2e5) * Math.pow(5772 / 3600, 2), 'R☉', [R`$L \propto R^2T^4$, so $R/R_\odot = \sqrt{L/L_\odot}\,(T_\odot/T)^2$.`]),
    'astro-binaries:1:0': N(Math.pow(7.5 / 0.379, 3) / Math.pow(50.1, 2), 'M☉', [R`The semi-major axis in AU is the angle divided by the parallax.`, R`$M = a^3/P^2$ in solar units.`]),
    'astro-milkyway:3:0': N(Math.pow(2.3e5, 2) * 8.2 * 3.086e19 / 6.674e-11 / 1.989e30, 'M☉', [R`$M = v^2r/G$ with SI units.`, R`1 kpc = 3.086×10¹⁹ m; 1 M☉ = 1.989×10³⁰ kg.`]),
    'astro-galaxies:1:0': N(Math.pow(10, (24 + 2.43 * (Math.log10(30) - 1) + 4.05 + 5) / 5) / 1e6, 'Mpc', [R`Period–luminosity: $M = -2.43(\log P - 1) - 4.05$.`, R`Then $d = 10^{(m - M + 5)/5}$ pc.`])
  };

  /* ---------- Quiz card ---------- */
  function quizState() { if (!S().exq) S().exq = {}; return S().exq; }
  const LBL = { example: 'Try it', check: 'Quick check' };
  PB.quizCard = function (spec, key, chId, kind) {
    kind = kind || 'example';
    const st = quizState();
    const card = h('div', { class: 'quiz-card ' + kind + (st[key] === 'ok' ? ' done' : '') });
    let tries = 0, sel = null;
    card.appendChild(h('div', { class: 'quiz-head' }, [h('span', { class: 'quiz-badge', text: kind === 'example' ? '✎' : '?' }), h('span', { class: 'quiz-lbl', text: spec.label || LBL[kind] }), st[key] === 'ok' ? h('span', { class: 'quiz-done', text: '✓ done' }) : null]));
    const qEl = h('div', { class: 'quiz-q', html: spec.q + (spec.ask ? '<p class="quiz-ask">' + spec.ask + '</p>' : '') });
    card.appendChild(qEl);
    const body = h('div', { class: 'quiz-body' });
    card.appendChild(body);
    const fb = h('div', { class: 'quiz-fb' }), hintBox = h('div'), solBox = h('div');
    let input = null, optEls = [];
    if (spec.type === 'mcq') {
      const box = h('div', { class: 'opts compact' });
      spec.options.forEach(function (o, i) {
        const b = h('button', { class: 'opt', type: 'button', onclick: function () { if (card.classList.contains('done')) return; sel = i; optEls.forEach(function (e, j) { e.classList.toggle('sel', j === i); }); submit(); } }, [h('span', { class: 'key-l', text: String.fromCharCode(65 + i) }), h('span', { html: o })]);
        optEls.push(b); box.appendChild(b);
      });
      body.appendChild(box);
    } else {
      input = h('input', { type: 'text', inputmode: 'decimal', autocomplete: 'off', 'aria-label': 'Your answer', placeholder: 'Your answer' });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
      body.appendChild(h('div', { class: 'num-row' }, [input, spec.unit ? h('span', { class: 'unit', html: spec.unit }) : null, h('button', { class: 'btn primary small', type: 'button', text: 'Check', onclick: submit })]));
    }
    const actions = h('div', { class: 'quiz-actions' });
    body.append(fb, hintBox, actions, solBox);
    function showSolution(ok) {
      card.classList.add('done');
      optEls.forEach(function (b, i) { b.disabled = true; b.classList.toggle('right', i === spec.answer); b.classList.toggle('wrong', i === sel && i !== spec.answer); });
      if (input) { input.disabled = true; if (!ok) input.placeholder = PB.fmt(spec.answer, 4); }
      actions.innerHTML = '';
      const ans = spec.type === 'mcq' ? String.fromCharCode(65 + spec.answer) : PB.fmt(spec.answer, 4) + (spec.unit ? ' ' + spec.unit : '');
      solBox.innerHTML = '';
      solBox.appendChild(h('div', { class: 'solution', html: '<b>' + (spec.solLabel || 'Worked solution') + '</b><p><strong>Answer: ' + ans + '</strong></p>' + (spec.solution || '') }));
      PB.typeset(solBox);
    }
    function drawActions() {
      actions.innerHTML = '';
      if (card.classList.contains('done')) return;
      const used = hintBox.childElementCount, total = (spec.hints || []).length;
      if (used < total) actions.appendChild(h('button', { class: 'btn small', type: 'button', text: used ? 'Next step' : 'Give me a step', onclick: function () { const hn = h('div', { class: 'hint', html: '<b>Step ' + (used + 1) + '</b>' + spec.hints[used] }); hintBox.appendChild(hn); PB.typeset(hn); drawActions(); } }));
      if (tries >= 2 || (tries >= 1 && used >= total)) actions.appendChild(h('button', { class: 'btn small ghost', type: 'button', text: 'Show the worked solution', onclick: function () { st[key] = st[key] || 'seen'; PB.save(); PB.emit({ type: 'quiz', chapter: chId, ok: false, kind: kind }); showSolution(false); } }));
    }
    function submit() {
      if (card.classList.contains('done')) return;
      let ok;
      if (spec.type === 'mcq') { if (sel == null) return; ok = sel === spec.answer; }
      else {
        const x = PB.parseNumber(input.value);
        if (x === null) { fb.innerHTML = ''; fb.appendChild(h('div', { class: 'feedback no', text: 'Type a number (e.g. 4.1, 3e8, 2*pi).' })); return; }
        const tol = spec.tol != null ? spec.tol : 0.03;
        ok = spec.answer === 0 ? Math.abs(x) < 1e-9 : Math.abs(x - spec.answer) <= tol * Math.abs(spec.answer);
      }
      tries++;
      fb.innerHTML = '';
      if (ok) {
        const first = st[key] !== 'ok' && st[key] !== 'seen';
        st[key] = 'ok'; PB.save();
        fb.appendChild(h('div', { class: 'feedback ok', text: tries === 1 ? 'Right first time.' + (first ? ' +3 XP' : '') : 'Got it.' + (first ? ' +3 XP' : '') }));
        if (first && PB.addXP) PB.addXP(3, kind === 'example' ? 'Worked example' : 'Quick check');
        PB.emit({ type: 'quiz', chapter: chId, ok: true, first: tries === 1, kind: kind });
        showSolution(true);
      } else {
        PB.emit({ type: 'quiz', chapter: chId, ok: false, kind: kind });
        fb.appendChild(h('div', { class: 'feedback no', text: tries === 1 ? 'Not yet. Try a step-by-step hint, then have another go.' : 'Still not it. Take the next step, or open the worked solution.' }));
        if (spec.type === 'mcq') optEls[sel].classList.add('wrong-try');
        if (!hintBox.childElementCount && spec.hints && spec.hints.length) { const hn = h('div', { class: 'hint', html: '<b>Step 1</b>' + spec.hints[0] }); hintBox.appendChild(hn); PB.typeset(hn); }
        drawActions();
      }
    }
    if (st[key] === 'ok') showSolution(true); else drawActions();
    return card;
  };

  /* ---------- Placing concept checks after the right section ---------- */
  const STOP = new Set('the a an and or of to in on at by for with from is are be as that this it its which what when how why than then into their there these those can will would each per not but also more most less only same such other any all one two three your you we our about between using use used given find show what\'s does do has have had was were been being if so may must'.split(' '));
  function words(html) { return String(html || '').replace(/\$[^$]*\$/g, ' ').replace(/<[^>]+>/g, ' ').toLowerCase().replace(/[^a-zÀ-ɏ ]+/g, ' ').split(/\s+/).filter(function (w) { return w.length > 3 && !STOP.has(w); }).map(function (w) { return w.replace(/(ies|es|s)$/, ''); }); }
  const placeCache = {};
  PB.checkPlacement = function (ch) {
    if (placeCache[ch.id]) return placeCache[ch.id];
    const secW = ch.sections.map(function (s) { return words(s.title + ' ' + s.title + ' ' + s.html); });
    const df = {};
    secW.forEach(function (ws) { new Set(ws).forEach(function (w) { df[w] = (df[w] || 0) + 1; }); });
    const n = ch.sections.length, out = ch.sections.map(function () { return []; });
    const tf = secW.map(function (ws) { const m = {}; ws.forEach(function (w) { m[w] = (m[w] || 0) + 1; }); return m; });
    ch.problems.forEach(function (p) {
      if (p.level !== 'concept') return;
      const pw = new Set(words(p.title + ' ' + p.q + ' ' + (p.options || []).join(' ') + ' ' + p.solution));
      let best = n - 1, bs = -1;
      secW.forEach(function (_, i) {
        let s = 0;
        pw.forEach(function (w) { if (tf[i][w]) s += Math.log(1 + tf[i][w]) * Math.log(1 + n / df[w]); });
        if (s > bs) { bs = s; best = i; }
      });
      out[best].push(p);
    });
    return (placeCache[ch.id] = out);
  };
  // The section that best explains a problem (used by adaptive practice for "revisit" links).
  PB.sectionFor = function (p) { const pl = PB.checkPlacement(PB.chapter(p.chapter)); for (let i = 0; i < pl.length; i++) if (pl[i].indexOf(p) >= 0) return i; return 0; };

  /* ---------- Figures ---------- */
  PB.addFigures = function (chId, list) { const ch = PB.chapter(chId); if (!ch) { console.warn('addFigures: no chapter ' + chId); return; } ch.figures = (ch.figures || []).concat(list); };

  /* ---------- Section enhancement (called by app.js for each section) ---------- */
  PB.enhanceSection = function (ch, i, secEl, starts) {
    // 1. Worked examples become quizzes.
    secEl.querySelectorAll('details.example').forEach(function (d, k) {
      const sum = d.querySelector('summary'), sol = d.querySelector('.sol');
      const lbl = sum.querySelector('.lbl'), tog = sum.querySelector('.tog');
      if (lbl) lbl.remove(); if (tog) tog.remove();
      const key = ch.id + ':' + i + ':' + k, spec = PB.EXQ[key];
      if (!spec) return;
      const card = PB.quizCard(Object.assign({ q: sum.innerHTML, solution: sol ? sol.innerHTML : '' }, spec), key, ch.id, 'example');
      d.replaceWith(card);
    });
    // 2. Authored quick checks: <div data-quiz="n"></div> placeholders, or appended at the end.
    const sec = ch.sections[i];
    (sec.quizzes || []).forEach(function (qz, k) {
      const card = PB.quizCard(qz, ch.id + ':' + i + ':q' + k, ch.id, 'check');
      const slot = secEl.querySelector('[data-quiz="' + k + '"]');
      if (slot) slot.replaceWith(card); else secEl.appendChild(card);
    });
    // 3. Figures for this section.
    (ch.figures || []).forEach(function (fg, k) {
      if (fg.s !== i || !PB.mountLab) return;
      const m = PB.mountLab(ch, { sim: 'explore', title: fg.title, desc: fg.caption, params: fg.params, figure: true, id: 'fig' + k });
      const slot = secEl.querySelector('[data-fig="' + k + '"]');
      if (slot) slot.replaceWith(m.el); else secEl.appendChild(m.el);
      starts.push(m.start);
    });
    // 4. Concept checks from the problem set, placed after the section they test.
    const checks = PB.checkPlacement(ch)[i] || [];
    if (checks.length && PB.problemCard) {
      const box = h('div', { class: 'inline-checks' }, [h('div', { class: 'inline-checks-head' }, [h('span', { class: 'quiz-badge', text: '✓' }), h('b', { text: 'Check your understanding' }), h('small', { text: checks.length + ' scored question' + (checks.length > 1 ? 's' : '') + ' from this chapter’s concept checks' })])]);
      checks.forEach(function (p) { box.appendChild(PB.problemCard(p, { compact: true })); });
      secEl.appendChild(box);
    }
  };

  /* ---------- Chapter intro: big idea and prerequisite refresher ---------- */
  PB.chapterIntro = function (ch, content) {
    const big = ch.big || (PB.BIG || {})[ch.id];
    if (big) content.appendChild(h('div', { class: 'big-idea subj-' + ch.subject }, [h('div', { class: 'big-idea-ico', text: '💡' }), h('div', {}, [h('div', { class: 'eyebrow', text: 'The big idea' }), h('div', { class: 'big-idea-text', html: big })])]));
    const pre = PB.prereqsOf ? PB.prereqsOf(ch) : [];
    if (pre.length) {
      const box = h('details', { class: 'refresher' }, [h('summary', {}, [h('b', { text: 'Before you start: a 1-minute refresher' }), h('small', { text: ' from ' + pre.map(function (c) { return c.title; }).join(', ') })])]);
      const grid = h('div', { class: 'refresher-grid' });
      pre.forEach(function (c) {
        const fs = (c.formulas || []).slice(0, 3);
        grid.appendChild(h('div', { class: 'refresher-card subj-' + c.subject }, [
          h('a', { href: '#ch-' + c.id, text: PB.subject(c.subject).name + ' · ' + c.title }),
          (c.big || (PB.BIG || {})[c.id]) ? h('p', { html: c.big || PB.BIG[c.id] }) : null,
          fs.length ? h('div', { class: 'formula-list mini' }, fs.map(function (f) { return h('div', { class: 'formula' }, [h('span', { html: f[0] }), h('div', { class: 'm', html: '$' + f[1] + '$' })]); })) : null,
          h('small', { text: PB.isPassed && PB.isPassed(c) ? '✓ passed' : 'not passed yet' })
        ]));
      });
      box.appendChild(grid);
      content.appendChild(box);
    }
  };
})();
