(function () {
  const R = PB.R;
  const pHweak = (Ka, C) => -Math.log10((-Ka + Math.sqrt(Ka * Ka + 4 * Ka * C)) / 2);
  PB.addChapter({
    id: 'chem-acids', subject: 'chemistry', num: 11, part: 'Physical Chemistry',
    title: 'Acids and Bases',
    subtitle: R`Proton transfer, the most common reaction in chemistry. Brønsted and Lewis definitions, pH, weak acids and bases, buffers and polyprotic acids.`,
    goals: ['Identify conjugate acid–base pairs', 'Calculate pH for strong and weak acids and bases', 'Use Ka, Kb, pKa and Kw', 'Design buffers with Henderson–Hasselbalch', 'Predict the pH of salt solutions'],
    sections: [
      {
        title: 'Definitions',
        html: R`
<p>A <strong>Brønsted–Lowry acid</strong> donates a proton; a base accepts one. Every acid has a <strong>conjugate base</strong> (the acid minus H⁺) and every base a <strong>conjugate acid</strong>. Water is amphiprotic: it is both.</p>
<p>A <strong>Lewis acid</strong> accepts an electron pair (BF₃, Al³⁺, Fe³⁺); a Lewis base donates one (NH₃, OH⁻). This broader definition covers metal complexes and much of organic chemistry.</p>
<p>Water self-ionises: $K_w = [\mathrm{H^+}][\mathrm{OH^-}] = 1.0\times10^{-14}$ at 25 °C, so neutral water has pH 7 and $\mathrm{pH + pOH} = 14$.</p>`
      },
      {
        title: 'pH of strong and weak acids',
        html: R`
<p>$\mathrm{pH} = -\log_{10}[\mathrm{H^+}]$. A strong acid (HCl, HNO₃, H₂SO₄'s first proton) ionises completely, so $[\mathrm{H^+}] = c$.</p>
<p>A weak acid HA only partly ionises, with acid dissociation constant</p>
<div class="key">$$K_a = \frac{[\mathrm{H^+}][\mathrm{A^-}]}{[\mathrm{HA}]},\qquad \mathrm{p}K_a = -\log K_a,\qquad K_aK_b = K_w.$$</div>
<p>For a solution of concentration $c$, if ionisation is small, $[\mathrm{H^+}] \approx \sqrt{K_ac}$. Otherwise solve the quadratic $x^2/(c - x) = K_a$. The stronger an acid, the weaker its conjugate base.</p>
<div class="warn-box"><p>For very dilute acids (around 10⁻⁷ M) you cannot ignore water's own H⁺. A 10⁻⁸ M HCl solution has pH 6.98, not 8.</p></div>`
      },
      {
        title: 'Buffers',
        html: R`
<p>A <strong>buffer</strong>, a weak acid with its conjugate base (or a weak base with its conjugate acid), resists changes in pH. Added acid is mopped up by A⁻; added base by HA. Its pH follows the <strong>Henderson–Hasselbalch equation</strong>:</p>
<div class="key">$$\mathrm{pH} = \mathrm pK_a + \log\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}.$$</div>
<p>A buffer works best within about one pH unit of its pKa, and its capacity grows with concentration. Blood is buffered at pH 7.4 by carbonic acid and hydrogencarbonate.</p>`
      },
      {
        title: 'Polyprotic acids and salts',
        html: R`
<p>Polyprotic acids lose protons one at a time, each with a smaller Ka: phosphoric acid has pKa values of 2.15, 7.20 and 12.35. Which species dominates at a given pH follows from the pKas: below pKa₁, the fully protonated acid; between pKa₁ and pKa₂, the first anion; and so on. The lab plots these fractions.</p>
<p>Salts can be acidic or basic: the conjugate base of a weak acid (CH₃COO⁻, CO₃²⁻) makes solutions basic; the conjugate acid of a weak base (NH₄⁺) and small, highly charged metal ions (Al³⁺, Fe³⁺) make them acidic. An amphiprotic ion such as HCO₃⁻ gives $\mathrm{pH} \approx \tfrac12(\mathrm pK_{a1} + \mathrm pK_{a2})$.</p>`
      }
    ],
    labs: [
      { sim: 'speciation', title: 'Acid speciation', desc: 'Fractions of each protonation state against pH, and the pH of the pure acid at the chosen concentration (solved exactly by charge balance).',
        tasks: ['For phosphoric acid, which species dominates at blood pH 7.4?', 'Show that two species are present in equal amounts exactly at each pKa.', 'Dilute ethanoic acid from 1 M to 10⁻⁴ M. Does its pH rise by 4 units? Why not?'] }
    ],
    formulas: [
      ['pH', R`\mathrm{pH} = -\log[\mathrm{H^+}]`],
      ['Water', R`K_w = [\mathrm{H^+}][\mathrm{OH^-}] = 10^{-14}`],
      ['Acid constant', R`K_a = [\mathrm{H^+}][\mathrm{A^-}]/[\mathrm{HA}]`],
      ['Conjugate pair', R`K_aK_b = K_w`],
      ['Weak acid', R`[\mathrm{H^+}] \approx \sqrt{K_ac}`],
      ['Henderson–Hasselbalch', R`\mathrm{pH} = \mathrm pK_a + \log([\mathrm{A^-}]/[\mathrm{HA}])`],
      ['Amphiprotic ion', R`\mathrm{pH} \approx \tfrac12(\mathrm pK_{a1} + \mathrm pK_{a2})`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Conjugate base', q: R`<p>What is the conjugate base of HSO₄⁻?</p>`, options: ['H₂SO₄', 'SO₄²⁻', 'SO₃²⁻', 'OH⁻'], answer: 1, hints: [R`Remove one H⁺.`], solution: R`<p>HSO₄⁻ − H⁺ = SO₄²⁻. (Its conjugate acid is H₂SO₄.)</p>` },
      { level: 'concept', type: 'mcq', title: 'Ammonium chloride', q: R`<p>A solution of NH₄Cl in water is:</p>`, options: ['Acidic', 'Neutral', 'Basic', 'Acidic only when hot'], answer: 0, hints: [R`NH₄⁺ is the conjugate acid of a weak base.`], solution: R`<p>NH₄⁺ ⇌ NH₃ + H⁺ (pKa 9.25), so the solution is slightly acidic. Cl⁻, from a strong acid, has no effect.</p>` },
      { level: 'concept', type: 'mcq', title: 'Making a buffer', q: R`<p>Which mixture makes a buffer?</p>`, options: ['HCl and NaCl', 'NaOH and NaCl', 'CH₃COOH and CH₃COONa', 'HNO₃ and KNO₃'], answer: 2, hints: [R`A weak acid with its conjugate base.`], solution: R`<p>Ethanoic acid and ethanoate. Strong acids have no useful conjugate base to resist added acid.</p>` },
      { level: 'core', type: 'num', title: 'Strong acid', q: R`<p>Find the pH of 0.020 M HCl.</p>`, answer: -Math.log10(0.02), tol: 0.005, unit: '', hints: [R`Fully ionised.`], solution: R`<p>$-\log0.020 = 1.70$.</p>` },
      { level: 'core', type: 'num', title: 'Vinegar', q: R`<p>Find the pH of 0.10 M ethanoic acid (pKa = 4.76).</p>`, answer: pHweak(Math.pow(10, -4.76), 0.1), tol: 0.01, unit: '', hints: [R`$[\mathrm{H^+}] \approx \sqrt{K_ac}$.`], solution: R`<p>$K_a = 1.74\times10^{-5}$, $[\mathrm{H^+}] = 1.31\times10^{-3}$, pH = 2.88. Only 1.3% of the acid is ionised.</p>` },
      { level: 'core', type: 'num', title: 'Strong base', q: R`<p>Find the pH of 0.050 M NaOH at 25 °C.</p>`, answer: 14 + Math.log10(0.05), tol: 0.005, unit: '', hints: [R`pOH first.`], solution: R`<p>pOH = 1.30, pH = 12.70.</p>` },
      { level: 'core', type: 'num', title: 'Buffer pH', q: R`<p>A buffer is 0.10 M ethanoic acid and 0.20 M sodium ethanoate (pKa = 4.76). Find its pH.</p>`, answer: 4.76 + Math.log10(2), tol: 0.005, unit: '', hints: [R`Henderson–Hasselbalch.`], solution: R`<p>$4.76 + \log2 = 5.06$.</p>` },
      { level: 'core', type: 'num', title: 'Ammonia solution', q: R`<p>Find the pH of 0.10 M ammonia (pKb = 4.75).</p>`, answer: 14 - pHweak(Math.pow(10, -4.75), 0.1), tol: 0.01, unit: '', hints: [R`Find [OH⁻] as for a weak acid, then pOH.`], solution: R`<p>$[\mathrm{OH^-}] = 1.33\times10^{-3}$, pOH = 2.88, pH = 11.12.</p>` },
      { level: 'olympiad', type: 'num', title: 'Testing a buffer', q: R`<p>1.00 L of buffer containing 0.10 mol HA and 0.10 mol A⁻ (pKa 4.76) receives 0.010 mol HCl. What is the new pH?</p>`, answer: 4.76 + Math.log10(0.09 / 0.11), tol: 0.005, unit: '', hints: [R`H⁺ converts A⁻ to HA.`], solution: R`<p>$4.76 + \log(0.09/0.11) = 4.67$. The same acid in pure water would give pH 2.</p>` },
      { level: 'olympiad', type: 'num', title: 'Baking soda', q: R`<p>Estimate the pH of a 0.10 M NaHCO₃ solution. (Carbonic acid: pKa₁ = 6.35, pKa₂ = 10.33.)</p>`, answer: (6.35 + 10.33) / 2, tol: 0.01, unit: '', hints: [R`HCO₃⁻ is amphiprotic.`], solution: R`<p>$\mathrm{pH} \approx (6.35 + 10.33)/2 = 8.34$, independent of concentration over a wide range.</p>` },
      { level: 'olympiad', type: 'num', title: 'Very dilute acid', q: R`<p>Find the pH of 1.0×10⁻⁸ M HCl, including water's own ionisation.</p>`, answer: -Math.log10(5e-9 + Math.sqrt(2.5e-17 + 1e-14)), tol: 0.002, unit: '', hints: [R`Charge balance: $[\mathrm{H^+}] = c + K_w/[\mathrm{H^+}]$.`], solution: R`<p>$h^2 - ch - K_w = 0$ gives $h = 1.05\times10^{-7}$, pH = 6.98: slightly acidic, as it must be.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-acids', [
    { title: 'Weak acid pH', gen(r) { const pKa = r.step(2.5, 6.5, 0.05), C = r.pick([0.001, 0.01, 0.05, 0.1, 0.5, 1]); const p = pHweak(Math.pow(10, -pKa), C); return { q: R`<p>Find the pH of ${C} M of a weak acid with pKa = ${pKa}.</p>`, answer: p, tol: 0.01, unit: '', solution: R`<p>Solving $x^2/(c - x) = K_a$: pH = ${f(p)}.</p>` }; } },
    { title: 'Buffer pH', gen(r) { const pKa = r.step(3, 10, 0.05), a = r.step(0.05, 1, 0.05), b = r.step(0.05, 1, 0.05); return { q: R`<p>A buffer has [HA] = ${a} M and [A⁻] = ${b} M, with pKa = ${pKa}. Find its pH.</p>`, answer: pKa + Math.log10(b / a), tol: 0.005, unit: '', solution: R`<p>pH $= ${pKa} + \log(${b}/${a}) = ${f(pKa + Math.log10(b / a))}$.</p>` }; } },
    { title: 'Strong acid or base', gen(r) { const C = r.step(0.001, 0.5, 0.001), base = r.pick([true, false]); return { q: R`<p>Find the pH of ${C} M ${base ? 'NaOH' : 'HNO₃'}.</p>`, answer: base ? 14 + Math.log10(C) : -Math.log10(C), tol: 0.005, unit: '', solution: R`<p>pH $= ${f(base ? 14 + Math.log10(C) : -Math.log10(C))}$.</p>` }; } }
  ]);
})();
