(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  const CARB = [['MgCO₃', 117, 0.175, 'teal'], ['CaCO₃', 178, 0.161, 'accent'], ['SrCO₃', 235, 0.171, 'points'], ['BaCO₃', 267, 0.172, 'rust']];
  PB.addChapter({
    id: 'chem-sblock', subject: 'chemistry', num: 22, part: 'Inorganic Chemistry',
    title: 'Hydrogen and the s-Block',
    subtitle: R`Hydrogen, the alkali metals and the alkaline earth metals. Trends in reactivity and solubility, the thermal stability of carbonates and nitrates, polarising power, flame tests, diagonal relationships and the industrial chemistry of salt.`,
    goals: ['Describe hydrogen’s isotopes and its three kinds of hydride', 'Explain trends in reactivity down groups 1 and 2', 'Explain trends in the thermal stability of carbonates and nitrates using polarising power', 'Recall solubility trends of group 2 hydroxides and sulfates', 'Explain flame colours and the anomalies of Li and Be'],
    sections: [
      {
        title: 'Hydrogen',
        html: R`
<p>Hydrogen has three isotopes: protium ¹H (99.98%), deuterium ²H and radioactive tritium ³H (half-life 12.3 years). Heavier isotopes react more slowly when their bonds break (kinetic isotope effects) and heavy water D₂O moderates nuclear reactors.</p>
<p>Hydrogen fits no group neatly. Its compounds with other elements, the <strong>hydrides</strong>, come in three kinds:</p>
<ul>
<li><strong>Ionic (saline) hydrides</strong> with s-block metals, containing H⁻: NaH, CaH₂. They react with water to release H₂ ($\mathrm{NaH + H_2O \to NaOH + H_2}$) and are strong bases and reducing agents.</li>
<li><strong>Covalent (molecular) hydrides</strong> with p-block elements: CH₄, NH₃, H₂O, HF.</li>
<li><strong>Metallic (interstitial) hydrides</strong>, such as PdH$_x$, where H atoms sit in holes of a metal lattice; palladium absorbs about 900 times its volume of H₂.</li>
</ul>
<p>Industrially H₂ comes from steam reforming of methane ($\mathrm{CH_4 + H_2O \to CO + 3H_2}$) followed by the water–gas shift; "green" hydrogen from electrolysis is growing.</p>`
      },
      {
        title: 'Group 1 and group 2 trends',
        html: R`
<p>The s-block metals have one or two outer s electrons that they lose easily, forming M⁺ and M²⁺ ions. Down each group the atoms get larger, ionisation energies fall, and the metals become more reactive: lithium fizzes steadily in water, potassium ignites, caesium explodes.</p>
$$\mathrm{2M + 2H_2O \to 2MOH + H_2},\qquad \mathrm{M + 2H_2O \to M(OH)_2 + H_2}.$$
<p>Group 2 metals react more slowly (magnesium needs steam) because two electrons must be removed. Group 1 metals burn in oxygen to different products: Li gives the oxide Li₂O, Na mostly the peroxide Na₂O₂, and K, Rb and Cs the superoxides MO₂. Larger cations stabilise larger anions.</p>
<p>Solubility trends of group 2 compounds run in opposite directions: <strong>hydroxides</strong> become more soluble down the group (Mg(OH)₂ is "milk of magnesia", Ba(OH)₂ dissolves well), while <strong>sulfates</strong> become less soluble (MgSO₄ is very soluble, BaSO₄ so insoluble it is used for X-ray barium meals and to test for sulfate).</p>`
      },
      {
        title: 'Thermal stability and polarising power',
        html: R`
<p>Group 2 carbonates decompose on heating: $\mathrm{MCO_3 \to MO + CO_2}$. The temperature needed rises down the group: MgCO₃ decomposes at about 350 °C, BaCO₃ needs about 1360 °C. Nitrates behave the same way ($\mathrm{2M(NO_3)_2 \to 2MO + 4NO_2 + O_2}$).</p>
<p>The explanation is the <strong>polarising power</strong> of the cation, its charge density ($z/r$). A small, highly charged cation such as Mg²⁺ distorts the electron cloud of the large carbonate ion, weakening a C–O bond and making CO₂ easier to release. Larger cations polarise less. Thermodynamically, the decomposition has a similar entropy change (about +160 J/mol K, from releasing a gas) for every carbonate, while ΔH becomes more positive down the group, so the temperature $T = \Delta H/\Delta S$ at which it becomes favourable rises.</p>
<p>In group 1, only lithium's carbonate and nitrate decompose like group 2 compounds (Li⁺ is tiny); the others are stable or give nitrites ($\mathrm{2NaNO_3 \to 2NaNO_2 + O_2}$).</p>`
      },
      {
        title: 'Flame tests and anomalies',
        html: R`
<p>Heating s-block compounds in a flame excites electrons, which emit characteristic colours as they fall back: lithium crimson (671 nm), sodium yellow (589 nm), potassium lilac (766 nm, often seen through blue glass), calcium brick-red, strontium crimson, barium apple-green. The energy of each line is $E = hc/\lambda$.</p>
<p>The first element of each group is unusual. Lithium and beryllium have very small, highly polarising ions, so their compounds are more covalent. BeCl₂ is a covalent polymer, Be(OH)₂ is amphoteric, and Li resembles Mg more than Na: the <strong>diagonal relationship</strong> (Li–Mg, Be–Al, B–Si). Both Li and Mg form nitrides directly with N₂, and both have carbonates that decompose readily.</p>`
      },
      {
        title: 'Industrial chemistry of salt',
        html: R`
<p>Sodium chloride feeds a huge industry. The <strong>chlor-alkali process</strong> electrolyses brine in a membrane cell: chlorine forms at the anode, hydrogen at the cathode, and sodium hydroxide accumulates on the cathode side behind a membrane that lets only Na⁺ through:</p>
$$\mathrm{2NaCl + 2H_2O \to 2NaOH + Cl_2 + H_2}.$$
<p>The <strong>Solvay process</strong> makes sodium carbonate from brine, limestone and ammonia, recycling the ammonia. Lime (CaO) from heating limestone makes cement and neutralises acidic soils. Magnesium is extracted from seawater by precipitating Mg(OH)₂ and electrolysing molten MgCl₂.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Decomposing group 2 carbonates', desc: 'ΔG° = ΔH° − TΔS° for MCO₃ → MO + CO₂. Each carbonate decomposes (at 1 bar CO₂) once its line crosses zero.',
        tasks: ['Read the decomposition temperatures. How do they relate to cation size?', 'Why are the slopes nearly the same?', 'Lower the CO₂ pressure in a kiln. Does decomposition need a higher or lower temperature?'],
        params: { controls: [S('p', 'CO₂ partial pressure', 0.001, 1, 0.001, 1, 'bar')],
          plots: [{ x: [300, 1900], y: [-140, 260], xlabel: 'temperature (K)', ylabel: 'ΔG (kJ/mol)', curves: (v) => CARB.map((c) => ({ f: (T) => c[1] - T * c[2] + 8.314e-3 * T * Math.log(v.p), color: c[3], label: c[0] })), hlines: () => [{ y: 0, label: 'ΔG = 0' }] }],
          readout: (v) => CARB.map((c) => [c[0], f(c[1] / (c[2] - 8.314e-3 * Math.log(v.p))) + ' K (' + f(c[1] / (c[2] - 8.314e-3 * Math.log(v.p)) - 273.15) + ' °C)']) } },
      { sim: 'explore', title: 'Flame colours', desc: 'The main emission lines of s-block metals (and copper) in a flame, on the visible spectrum.',
        tasks: ['Which line has the most energetic photons?', 'Why does potassium’s lilac colour get hidden by a trace of sodium?', 'Why do Sr and Li look similar in a flame? How could a spectroscope tell them apart?'],
        params: { controls: [{ type: 'select', id: 'el', label: 'Metal', value: 'Na', options: [['Li', 'Lithium'], ['Na', 'Sodium'], ['K', 'Potassium'], ['Ca', 'Calcium'], ['Sr', 'Strontium'], ['Ba', 'Barium'], ['Cu', 'Copper']] }],
          init: (v) => { v.L = { Li: [670.8, 610.4], Na: [589.0, 589.6], K: [766.5, 769.9, 404.4], Ca: [622, 554, 422.7], Sr: [606, 650, 460.7], Ba: [553.5, 524, 513], Cu: [515.3, 521.8, 510.6] }; },
          draw: (ctx, C, v, b, U) => { const x0 = b.x + 30, x1 = b.x + b.w - 20, y0 = b.y + 40, h = 60; const X = (l) => x0 + (l - 380) / (780 - 380) * (x1 - x0); ctx.fillStyle = '#05060a'; ctx.fillRect(x0, y0, x1 - x0, h); v.L[v.el].forEach((l, i) => { const c = U.wl2rgb(l); ctx.fillStyle = 'rgb(' + c.join(',') + ')'; ctx.globalAlpha = i ? 0.6 : 1; ctx.fillRect(X(l) - 2, y0, 4, h); ctx.globalAlpha = 1; U.text(ctx, l + ' nm', X(l), y0 + h + 14, C.ink2, U.mono(10), 'center'); }); [400, 500, 600, 700].forEach((l) => U.text(ctx, l, X(l), y0 - 8, C.ink3, U.mono(10), 'center')); const c = U.wl2rgb(v.L[v.el][0]); U.dot(ctx, b.x + b.w / 2, y0 + h + 70, 26, 'rgb(' + c.join(',') + ')'); U.text(ctx, 'flame', b.x + b.w / 2, y0 + h + 112, C.ink3, U.ui(10.5), 'center'); },
          picFrac: 1,
          readout: (v) => [['strongest line', v.L[v.el][0] + ' nm'], ['photon energy', f(1240 / v.L[v.el][0]) + ' eV'], ['per mole of photons', f(119627 / v.L[v.el][0]) + ' kJ']] } }
    ],
    formulas: [
      ['Water reaction (group 1)', R`\mathrm{2M + 2H_2O \to 2MOH + H_2}`],
      ['Carbonate decomposition', R`\mathrm{MCO_3 \to MO + CO_2}`],
      ['Decomposition temperature', R`T \approx \Delta H^\circ/\Delta S^\circ`],
      ['Charge density', R`z/r`],
      ['Chlor-alkali', R`\mathrm{2NaCl + 2H_2O \to 2NaOH + Cl_2 + H_2}`],
      ['Photon energy', R`E = hc/\lambda`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Most reactive', q: R`<p>Which reacts most vigorously with cold water?</p>`, options: ['Li', 'Na', 'K', 'Mg'], answer: 2, hints: [R`Lowest ionisation energy.`], solution: R`<p>Potassium.</p>` },
      { level: 'concept', type: 'mcq', title: 'Barium meal', q: R`<p>Why is BaSO₄ safe to swallow although Ba²⁺ is toxic?</p>`, options: ['It is not absorbed because it is extremely insoluble', 'Barium is not toxic', 'Stomach acid neutralises it', 'It is converted to BaCO₃'], answer: 0, hints: [R`Solubility trend.`], solution: R`<p>Its tiny solubility keeps free Ba²⁺ negligible.</p>` },
      { level: 'concept', type: 'mcq', title: 'Superoxide', q: R`<p>Which metal forms a superoxide MO₂ when burned in excess oxygen?</p>`, options: ['Li', 'Na', 'K', 'Mg'], answer: 2, hints: [R`Large cations stabilise large anions.`], solution: R`<p>Potassium (KO₂, used in breathing apparatus).</p>` },
      { level: 'core', type: 'num', title: 'Hydrogen from a hydride', q: R`<p>What volume of H₂ at 25 °C and 1 bar is released when 1.00 g of CaH₂ (42.09 g/mol) reacts with water ($\mathrm{CaH_2 + 2H_2O \to Ca(OH)_2 + 2H_2}$)? Use 24.79 L/mol.</p>`, answer: 1 / 42.09 * 2 * 24.79, tol: 0.005, unit: 'L', hints: [R`2 mol H₂ per mol CaH₂.`], solution: R`<p>${f(1 / 42.09 * 2 * 24.79)} L.</p>` },
      { level: 'core', type: 'num', title: 'Decomposition temperature', q: R`<p>For CaCO₃ → CaO + CO₂, ΔH° = +178 kJ/mol and ΔS° = +161 J/mol K. Estimate the decomposition temperature at 1 bar CO₂, in °C.</p>`, answer: 178000 / 161 - 273.15, tol: 0.005, unit: '°C', hints: [R`ΔH/ΔS in kelvin.`], solution: R`<p>${f(178000 / 161 - 273.15)} °C.</p>` },
      { level: 'core', type: 'num', title: 'Flame photon', q: R`<p>Find the energy of one mole of photons from the sodium D line (589 nm), in kJ.</p>`, answer: 6.626e-34 * 2.998e8 / 589e-9 * 6.022e23 / 1000, tol: 0.005, unit: 'kJ', hints: [R`$N_Ahc/\lambda$.`], solution: R`<p>${f(6.626e-34 * 2.998e8 / 589e-9 * 6.022e23 / 1000)} kJ.</p>` },
      { level: 'core', type: 'num', title: 'Saturated limewater', q: R`<p>Ca(OH)₂ has $K_{sp} = 5.5\times10^{-6}$. What is the pH of its saturated solution?</p>`, answer: 14 + Math.log10(2 * Math.cbrt(5.5e-6 / 4)), tol: 0.005, unit: '', hints: [R`$4s^3 = K_{sp}$.`], solution: R`<p>$s = 0.0111$ mol/L; [OH⁻] = 0.0222; pH = ${f(14 + Math.log10(2 * Math.cbrt(5.5e-6 / 4)))}.</p>` },
      { level: 'core', type: 'num', title: 'Chlor-alkali output', q: R`<p>A membrane cell runs at 150 kA. How many tonnes of chlorine does it make per day?</p>`, answer: 150000 * 86400 / 96485 / 2 * 70.9 / 1e6, tol: 0.005, unit: 't', hints: [R`2 electrons per Cl₂.`], solution: R`<p>${f(150000 * 86400 / 96485 / 2 * 70.9 / 1e6)} t.</p>` },
      { level: 'core', type: 'num', title: 'Charge density', q: R`<p>Mg²⁺ has radius 72 pm and Ba²⁺ 135 pm. By what factor is magnesium’s charge density z/r larger?</p>`, answer: 135 / 72, tol: 0.005, unit: '×', hints: [R`Same charge.`], solution: R`<p>${f(135 / 72)}×.</p>` },
      { level: 'olympiad', type: 'num', title: 'Kiln pressure', q: R`<p>Lime kilns sweep CO₂ away. At what temperature does CaCO₃ decompose if the CO₂ partial pressure is held at 0.01 bar? (ΔH° = 178 kJ/mol, ΔS° = 161 J/mol K.)</p>`, answer: 178000 / (161 - 8.314 * Math.log(0.01)), tol: 0.005, unit: 'K', hints: [R`$\Delta G = \Delta H - T\Delta S + RT\ln p = 0$.`], solution: R`<p>$T = 178\,000/(161 + 38.3) = ${f(178000 / (161 - 8.314 * Math.log(0.01)))}$ K.</p>` },
      { level: 'olympiad', type: 'num', title: 'Percentage of Na in a mixture', q: R`<p>A 2.00 g mixture of NaCl and KCl gives 4.40 g of AgCl with excess AgNO₃. What mass of NaCl is in the mixture? (NaCl 58.44, KCl 74.55, AgCl 143.32 g/mol.)</p>`, answer: (4.40 / 143.32 - 2.00 / 74.55) / (1 / 58.44 - 1 / 74.55), tol: 0.01, unit: 'g', hints: [R`Two equations: x + y = 2.00; x/58.44 + y/74.55 = moles of AgCl.`], solution: R`<p>Moles AgCl = 0.03070. Solving gives NaCl = ${f((4.40 / 143.32 - 2.00 / 74.55) / (1 / 58.44 - 1 / 74.55))} g.</p>` },
      { level: 'olympiad', type: 'num', title: 'Superoxide breathing', q: R`<p>KO₂ absorbs CO₂ and releases O₂: $\mathrm{4KO_2 + 2CO_2 \to 2K_2CO_3 + 3O_2}$. What mass of KO₂ (71.10 g/mol) releases 100 L of O₂ at 24.79 L/mol?</p>`, answer: 100 / 24.79 * 4 / 3 * 71.1, tol: 0.005, unit: 'g', hints: [R`4 KO₂ per 3 O₂.`], solution: R`<p>${f(100 / 24.79 * 4 / 3 * 71.1)} g.</p>` }
    ]
  });
  PB.addDrills('chem-sblock', [
    { title: 'Decomposition temperature', gen(r) { const H = r.int(80, 300), Sx = r.int(120, 200); return { q: R`<p>A carbonate decomposes with ΔH° = ${H} kJ/mol and ΔS° = ${Sx} J/mol K. At what temperature (K) does ΔG° reach zero?</p>`, answer: H * 1000 / Sx, tol: 0.005, unit: 'K', solution: R`<p>$${H * 1000}/${Sx} = ${f(H * 1000 / Sx)}$ K.</p>` }; } },
    { title: 'Hydrogen from metals', gen(r) { const m = r.pick([['Li', 6.94, 1], ['Na', 22.99, 1], ['K', 39.10, 1], ['Ca', 40.08, 2], ['Mg', 24.31, 2]]), g = r.step(0.1, 5, 0.1); const V = g / m[1] * m[2] / 2 * 24.79; return { q: R`<p>${f(g)} g of ${m[0]} reacts completely with water. What volume of H₂ forms at 25 °C and 1 bar (24.79 L/mol)?</p>`, answer: V, tol: 0.01, unit: 'L', solution: R`<p>${m[2] === 1 ? '2 M → 1 H₂' : 'M → 1 H₂'}: ${f(V)} L.</p>` }; } },
    { title: 'Flame line energy', gen(r) { const l = r.pick([670.8, 589.0, 766.5, 622, 553.5, 515.3, 404.4]); return { q: R`<p>A flame emits at ${l} nm. What is the photon energy, in eV?</p>`, answer: 1239.84 / l, tol: 0.005, unit: 'eV', solution: R`<p>$1240/${l} = ${f(1239.84 / l)}$ eV.</p>` }; } }
  ]);
})();
