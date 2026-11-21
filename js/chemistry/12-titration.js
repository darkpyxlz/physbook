(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-titration', subject: 'chemistry', num: 12, part: 'Physical Chemistry',
    title: 'Titrations and Solubility',
    subtitle: R`Reading a titration curve and choosing an indicator, then a second kind of equilibrium: sparingly soluble salts, the solubility product and the common-ion effect.`,
    goals: ['Sketch titration curves for strong and weak acids', 'Find pKa from the half-equivalence point', 'Choose a suitable indicator', 'Use Ksp to find solubility', 'Predict precipitation with Q and Ksp'],
    sections: [
      {
        title: 'Titration curves',
        html: R`
<p>Plotting pH against volume of titrant reveals the chemistry:</p>
<ul>
<li><strong>Strong acid + strong base</strong>: low flat start, a near-vertical jump around pH 7 at equivalence.</li>
<li><strong>Weak acid + strong base</strong>: higher start, a gentle buffer region, and an equivalence point above 7 (the solution then contains the conjugate base).</li>
<li><strong>Weak base + strong acid</strong>: the mirror image, with equivalence below 7.</li>
</ul>
<p>At the <strong>half-equivalence point</strong> of a weak acid, $[\mathrm{HA}] = [\mathrm{A^-}]$, so $\mathrm{pH} = \mathrm pK_a$: the simplest way to measure a pKa. Polyprotic acids show one step per proton, if the pKas are far enough apart.</p>`
      },
      {
        title: 'Indicators',
        html: R`
<p>An indicator is itself a weak acid whose two forms have different colours. It changes colour over about $\mathrm pK_{\text{In}} \pm 1$. Choose one whose range falls on the steep part of the curve:</p>
<div class="table-wrap"><table><thead><tr><th>Indicator</th><th>Range</th><th>Good for</th></tr></thead><tbody>
<tr><td>Methyl orange</td><td>3.1–4.4</td><td>Strong acid with weak base</td></tr>
<tr><td>Methyl red</td><td>4.4–6.2</td><td>Strong acid with weak base</td></tr>
<tr><td>Bromothymol blue</td><td>6.0–7.6</td><td>Strong acid with strong base</td></tr>
<tr><td>Phenolphthalein</td><td>8.2–10.0</td><td>Weak acid with strong base</td></tr>
</tbody></table></div>`
      },
      {
        title: 'Solubility equilibria',
        html: R`
<p>A sparingly soluble salt dissolves until its ions reach equilibrium with the solid. For $\mathrm{M}_a\mathrm{X}_b(s) \rightleftharpoons a\mathrm{M}^{m+} + b\mathrm{X}^{x-}$:</p>
<div class="key">$$K_{sp} = [\mathrm M]^a[\mathrm X]^b.$$</div>
<p>If the molar solubility is $s$, then $K_{sp} = (as)^a(bs)^b$: $s^2$ for AgCl, $4s^3$ for PbI₂ or CaF₂, $27s^4$ for Al(OH)₃. Compare solubilities through $s$, not through $K_{sp}$, when the formulas differ.</p>`
      },
      {
        title: 'Common ions and precipitation',
        html: R`
<p>Adding an ion already in the equilibrium (the <strong>common-ion effect</strong>) suppresses solubility: AgCl is a thousand times less soluble in 0.1 M NaCl than in pure water.</p>
<p>When two solutions are mixed, a precipitate forms if the ion product $Q$ (using the concentrations after mixing) exceeds $K_{sp}$. Because Ksp values differ, ions can be separated by <strong>selective precipitation</strong>: in the Mohr titration, silver chloride precipitates first and red silver chromate only appears once the chloride is essentially gone.</p>
<div class="insight"><p>Solubility often depends on pH. Salts of weak acids (carbonates, fluorides, hydroxides, sulfides) dissolve in acid because H⁺ removes the anion. That is how acid rain dissolves limestone and how qualitative analysis separates metal sulfides.</p></div>`
      }
    ],
    labs: [
      { sim: 'titration', title: 'Titration curve', desc: 'pH of a 25.0 mL sample as titrant is added, calculated exactly from charge balance. The flask shows the chosen indicator’s colour.',
        tasks: ['Titrate HCl and ethanoic acid at the same concentration. Compare the starting pH and the pH at equivalence.', 'Read the pKa of ethanoic acid from the half-equivalence point.', 'Which indicator would wrongly signal the end point for ethanoic acid?', 'How many steps does phosphoric acid show, and why not three?'] }
    ],
    formulas: [
      ['Half-equivalence', R`\mathrm{pH} = \mathrm pK_a`],
      ['Indicator range', R`\mathrm pK_{\text{In}} \pm 1`],
      ['Solubility product', R`K_{sp} = [\mathrm M]^a[\mathrm X]^b`],
      ['1:1 salt', R`s = \sqrt{K_{sp}}`],
      ['1:2 salt', R`s = (K_{sp}/4)^{1/3}`],
      ['Precipitation', R`Q \gt K_{sp}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Half-way', q: R`<p>Halfway to the equivalence point of a weak acid titrated with NaOH:</p>`, options: ['pH = 7', 'pH = pKa', 'pH = 14 − pKa', 'pH = pKa/2'], answer: 1, hints: [R`[HA] = [A⁻].`], solution: R`<p>Henderson–Hasselbalch with ratio 1 gives pH = pKa.</p>` },
      { level: 'concept', type: 'mcq', title: 'Choosing an indicator', q: R`<p>Which indicator suits titrating ethanoic acid with sodium hydroxide?</p>`, options: ['Methyl orange', 'Methyl red', 'Bromothymol blue', 'Phenolphthalein'], answer: 3, hints: [R`The equivalence point is around pH 8.7.`], solution: R`<p>Phenolphthalein (8.2–10.0) changes on the steep part above 7.</p>` },
      { level: 'concept', type: 'mcq', title: 'Common ion', q: R`<p>Sodium chloride is added to a saturated solution of silver chloride. The solubility of AgCl:</p>`, options: ['Increases', 'Decreases', 'Is unchanged', 'Becomes zero'], answer: 1, hints: [R`Le Chatelier on AgCl ⇌ Ag⁺ + Cl⁻.`], solution: R`<p>Extra Cl⁻ pushes the equilibrium to the solid; more AgCl precipitates.</p>` },
      { level: 'core', type: 'num', title: 'Silver chloride', q: R`<p>Ksp of AgCl is 1.8×10⁻¹⁰. Find its molar solubility in pure water.</p>`, answer: Math.sqrt(1.8e-10), tol: 0.01, unit: 'mol/L', hints: [R`$K_{sp} = s^2$.`], solution: R`<p>$s = 1.34\times10^{-5}\ \mathrm M$.</p>` },
      { level: 'core', type: 'num', title: 'Lead iodide', q: R`<p>The molar solubility of PbI₂ is 1.52×10⁻³ M. Find its Ksp.</p>`, answer: 4 * Math.pow(1.52e-3, 3), tol: 0.01, unit: '', hints: [R`$K_{sp} = s(2s)^2$.`], solution: R`<p>$4s^3 = 1.40\times10^{-8}$.</p>` },
      { level: 'core', type: 'num', title: 'pH at equivalence', q: R`<p>25.0 mL of 0.10 M ethanoic acid (pKa 4.76) is titrated with 0.10 M NaOH. What is the pH at the equivalence point?</p>`, answer: 14 + Math.log10(Math.sqrt(1e-14 / Math.pow(10, -4.76) * 0.05)), tol: 0.01, unit: '', hints: [R`At equivalence the solution is 0.050 M ethanoate; $K_b = K_w/K_a$.`], solution: R`<p>$K_b = 5.75\times10^{-10}$, $[\mathrm{OH^-}] = \sqrt{K_b \times 0.050} = 5.4\times10^{-6}$, pH = 8.73.</p>` },
      { level: 'core', type: 'num', title: 'Common-ion effect', q: R`<p>Find the solubility of AgCl (Ksp = 1.8×10⁻¹⁰) in 0.10 M NaCl.</p>`, answer: 1.8e-9, tol: 0.01, unit: 'mol/L', hints: [R`$s = K_{sp}/[\mathrm{Cl^-}]$.`], solution: R`<p>$s = 1.8\times10^{-10}/0.10 = 1.8\times10^{-9}\ \mathrm M$, 7500 times less than in pure water.</p>` },
      { level: 'core', type: 'num', title: 'Oxalic acid', q: R`<p>What volume of 0.100 M NaOH neutralises both protons of 25.0 mL of 0.080 M oxalic acid, H₂C₂O₄? Give it in mL.</p>`, answer: 2 * 0.08 * 25 / 0.1, tol: 0.01, unit: 'mL', hints: [R`Diprotic: 2 mol NaOH per mol acid.`], solution: R`<p>$2(0.080)(25.0)/0.100 = 40.0\ \mathrm{mL}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Will it precipitate?', q: R`<p>50.0 mL of 1.0×10⁻³ M Pb(NO₃)₂ is mixed with 50.0 mL of 2.0×10⁻³ M NaCl. Calculate Q for PbCl₂ after mixing (Ksp = 1.7×10⁻⁵).</p>`, answer: 5e-4 * Math.pow(1e-3, 2), tol: 0.01, unit: '', hints: [R`Mixing halves each concentration.`], solution: R`<p>$Q = (5.0\times10^{-4})(1.0\times10^{-3})^2 = 5.0\times10^{-10} \ll K_{sp}$: no precipitate.</p>` },
      { level: 'olympiad', type: 'num', title: 'Fluoride in water', q: R`<p>CaF₂ has Ksp = 3.9×10⁻¹¹. What is its solubility in pure water, in mg of CaF₂ per litre ($M = 78.07$)?</p>`, answer: Math.cbrt(3.9e-11 / 4) * 78.07 * 1000, tol: 0.01, unit: 'mg/L', hints: [R`$K_{sp} = 4s^3$.`], solution: R`<p>$s = 2.14\times10^{-4}\ \mathrm M = 16.7\ \mathrm{mg/L}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'The Mohr end point', q: R`<p>In a Mohr titration, chloride is titrated with Ag⁺ in the presence of 5.0×10⁻³ M chromate. Red Ag₂CrO₄ (Ksp = 1.1×10⁻¹²) starts to form at the end point. What chloride concentration remains at that moment? (Ksp of AgCl = 1.8×10⁻¹⁰.)</p>`, answer: 1.8e-10 / Math.sqrt(1.1e-12 / 5e-3), tol: 0.01, unit: 'mol/L', hints: [R`First find $[\mathrm{Ag^+}] = \sqrt{K_{sp}/[\mathrm{CrO_4^{2-}}]}$.`], solution: R`<p>$[\mathrm{Ag^+}] = 1.48\times10^{-5}$, so $[\mathrm{Cl^-}] = 1.2\times10^{-5}\ \mathrm M$: almost all the chloride has precipitated.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-titration', [
    { title: 'Solubility from Ksp', gen(r) { const t = r.pick([['AgBr', 1, 5.0e-13], ['BaSO₄', 1, 1.1e-10], ['CaF₂', 2, 3.9e-11], ['PbI₂', 2, 1.4e-8], ['Mg(OH)₂', 2, 5.6e-12], ['CaCO₃', 1, 3.4e-9]]); const s = t[1] === 1 ? Math.sqrt(t[2]) : Math.cbrt(t[2] / 4); return { q: R`<p>Find the molar solubility of ${t[0]} (Ksp = ${t[2]}).</p>`, answer: s, unit: 'mol/L', solution: R`<p>${t[1] === 1 ? '$s = \\sqrt{K_{sp}}$' : '$s = (K_{sp}/4)^{1/3}$'} $= ${f(s)}\ \mathrm M$.</p>` }; } },
    { title: 'Titration volume', gen(r) { const c = r.step(0.05, 0.2, 0.005), V = r.pick([10, 20, 25]), ct = r.step(0.05, 0.2, 0.005), n = r.pick([1, 2]); return { q: R`<p>What volume (mL) of ${ct} M NaOH fully neutralises ${V}.0 mL of ${c} M ${n === 2 ? 'H₂SO₄' : 'HCl'}?</p>`, answer: n * c * V / ct, unit: 'mL', solution: R`<p>$V = ${n}(${c})(${V})/${ct} = ${f(n * c * V / ct)}\ \mathrm{mL}$.</p>` }; } },
    { title: 'Half-equivalence pH', gen(r) { const a = r.pick([['ethanoic acid', 4.76], ['methanoic acid', 3.75], ['benzoic acid', 4.20], ['hypochlorous acid', 7.53], ['ammonium', 9.25]]); return { q: R`<p>What is the pH at the half-equivalence point when ${a[0]} (pKa ${a[1]}) is titrated?</p>`, answer: a[1], tol: 0.002, unit: '', solution: R`<p>pH = pKa = ${a[1]}.</p>` }; } }
  ]);
})();
