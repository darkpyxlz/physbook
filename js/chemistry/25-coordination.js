(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  PB.addChapter({
    id: 'chem-coord', subject: 'chemistry', num: 25, part: 'Inorganic Chemistry',
    title: 'Coordination Chemistry in Depth',
    subtitle: R`Complexes in detail. Naming, the many kinds of isomerism, stability constants and the chelate effect, the 18-electron rule and organometallics, Jahn–Teller distortion, and the trans effect.`,
    goals: ['Name coordination compounds and count d electrons', 'Identify geometric, optical, linkage and ionisation isomers', 'Use stepwise and overall stability constants', 'Explain the chelate effect thermodynamically', 'Apply the 18-electron rule', 'Explain Jahn–Teller distortion and the trans effect'],
    sections: [
      {
        title: 'Naming and counting',
        html: R`
<p>A complex has a central metal bonded to <strong>ligands</strong> that donate lone pairs. Names list ligands alphabetically (with di-, tri-, or bis-, tris- for complicated ligands), then the metal with its oxidation state in Roman numerals; anionic complexes take the suffix -ate (ferrate, cuprate). So [Co(NH₃)₄Cl₂]Cl is tetraamminedichloridocobalt(III) chloride, and K₃[Fe(CN)₆] is potassium hexacyanidoferrate(III).</p>
<p>The <strong>d-electron count</strong> is the group number minus the oxidation state: Co(III) is d⁶, Fe(III) d⁵, Cu(II) d⁹. Ligands may bind through one atom (monodentate: NH₃, Cl⁻), two (bidentate: ethane-1,2-diamine "en", oxalate) or six (hexadentate: EDTA⁴⁻).</p>`
      },
      {
        title: 'Isomerism',
        html: R`
<ul>
<li><strong>Geometric isomers</strong>: square planar [Pt(NH₃)₂Cl₂] exists as cis (the anticancer drug cisplatin) and trans. Octahedral MA₄B₂ has cis and trans forms; MA₃B₃ has fac and mer.</li>
<li><strong>Optical isomers</strong>: [Co(en)₃]³⁺ is chiral, existing as Δ and Λ propellers; cis-[Co(en)₂Cl₂]⁺ is chiral, trans is not.</li>
<li><strong>Linkage isomers</strong>: an ambidentate ligand binds through different atoms (NO₂⁻ through N, nitro; through O, nitrito; SCN⁻ through S or N).</li>
<li><strong>Ionisation isomers</strong>: [Co(NH₃)₅Br]SO₄ (gives BaSO₄ with Ba²⁺) and [Co(NH₃)₅SO₄]Br (gives AgBr with Ag⁺).</li>
<li><strong>Hydrate isomers</strong>: violet [Cr(H₂O)₆]Cl₃ and green [Cr(H₂O)₅Cl]Cl₂·H₂O, told apart by how much AgCl precipitates.</li>
</ul>
<p>Werner proved the octahedral geometry around 1900 by counting isomers: MA₄B₂ gives exactly two, ruling out hexagonal and prismatic shapes.</p>`
      },
      {
        title: 'Stability constants and the chelate effect',
        html: R`
<p>Ligands bind step by step, each with a stepwise constant $K_n$: $\mathrm{[ML_{n-1}] + L \rightleftharpoons [ML_n]}$. The overall constant is the product: $\beta_n = K_1K_2\cdots K_n$. Usually $K_1 > K_2 > \cdots$, for statistical reasons and because each ligand added makes the next site less available.</p>
<p>The <strong>chelate effect</strong>: complexes with polydentate ligands are much more stable than those with comparable monodentate ligands. For nickel, $\log\beta$ is 8.6 for [Ni(NH₃)₆]²⁺ but 18.3 for [Ni(en)₃]²⁺, although both have six Ni–N bonds. The cause is mostly entropy: $\mathrm{[Ni(NH_3)_6]^{2+} + 3en \to [Ni(en)_3]^{2+} + 6NH_3}$ releases more particles than it consumes. EDTA, with six donor atoms, binds almost any metal ion and is used to titrate Ca²⁺ and Mg²⁺ (water hardness) and to treat lead poisoning.</p>
<details class="example"><summary><span class="lbl">Worked example</span> How much more stable is [Ni(en)₃]²⁺ than [Ni(NH₃)₆]²⁺, as a free-energy difference at 298 K?<span class="tog">Solution</span></summary><div class="sol"><p>$\Delta(\Delta G) = -RT\ln10\times(18.3 - 8.6) = ${f(-8.314 * 298 * Math.LN10 * 9.7 / 1000)}$ kJ/mol.</p></div></details>`
      },
      {
        title: 'The 18-electron rule and organometallics',
        html: R`
<p>Many low-oxidation-state complexes, especially with carbon monoxide and other π-acceptor ligands, are stable when the metal has 18 valence electrons (filling its s, p and d orbitals), the analogue of the octet rule. Count the metal’s d electrons plus 2 for each 2-electron ligand: Cr(CO)₆ has 6 + 6×2 = 18; Fe(CO)₅ has 8 + 10 = 18; Ni(CO)₄ has 10 + 8 = 18. Mn(CO)₅ has 17, so it dimerises to Mn₂(CO)₁₀ with a Mn–Mn bond. Ferrocene, Fe(C₅H₅)₂, has 6 (Fe²⁺) + 2×6 = 18.</p>
<p>CO bonds through σ donation from carbon plus <strong>π back-donation</strong> from metal d orbitals into CO π* orbitals, which weakens the C≡O bond: its IR stretch drops from 2143 cm⁻¹ (free CO) to about 2000 cm⁻¹ in metal carbonyls. Organometallic catalysts (Wilkinson’s hydrogenation, Ziegler–Natta polymerisation, Grubbs metathesis) cycle between 16- and 18-electron states.</p>`
      },
      {
        title: 'Jahn–Teller distortion and the trans effect',
        html: R`
<p>The <strong>Jahn–Teller theorem</strong>: a non-linear molecule with a degenerate electronic ground state distorts to remove the degeneracy. Octahedral d⁹ Cu²⁺ (and high-spin d⁴) have an unevenly filled e_g set, so their complexes elongate along one axis: [Cu(H₂O)₆]²⁺ has two long and four short Cu–O bonds. This also explains why Cu(II) so readily forms square-planar complexes.</p>
<p>In square-planar Pt(II) chemistry, some ligands make the position <em>trans</em> to themselves more labile: the <strong>trans effect</strong> (CN⁻ ≈ CO > PR₃ > I⁻ > Br⁻ > Cl⁻ > NH₃ > H₂O). It lets chemists plan syntheses of specific isomers: cisplatin is made from [PtCl₄]²⁻ by adding NH₃, because Cl⁻ directs the second NH₃ trans to itself, that is, cis to the first NH₃.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Stepwise complex formation', desc: 'Fractions of Cu²⁺, [Cu(NH₃)]²⁺ … [Cu(NH₃)₄]²⁺ against free ammonia concentration, from stepwise log K values (default: copper–ammonia).',
        tasks: ['At what log[NH₃] does the tetraammine complex dominate?', 'Make all four log K equal. How do the curves change?', 'Find log[NH₃] where [Cu(NH₃)₂]²⁺ peaks. Compare with −(log K₂ + log K₃)/2.'],
        params: { controls: [S('k1', 'log K₁', 0, 8, 0.1, 4.0), S('k2', 'log K₂', 0, 8, 0.1, 3.3), S('k3', 'log K₃', 0, 8, 0.1, 2.7), S('k4', 'log K₄', 0, 8, 0.1, 2.0), S('L', 'log [NH₃]', -7, 0, 0.05, -3)],
          init: (v) => { v.fr = (lL) => { const L = Math.pow(10, lL), b = [1, Math.pow(10, v.k1), Math.pow(10, v.k1 + v.k2), Math.pow(10, v.k1 + v.k2 + v.k3), Math.pow(10, v.k1 + v.k2 + v.k3 + v.k4)]; const t = b.map((x, n) => x * Math.pow(L, n)), s = t.reduce((a, x) => a + x, 0); return t.map((x) => x / s); }; },
          plots: [{ x: [-7, 0], y: [0, 1.02], xlabel: 'log₁₀ [NH₃] (mol/L)', ylabel: 'fraction', curves: (v) => [0, 1, 2, 3, 4].map((n) => ({ f: (l) => v.fr(l)[n], color: ['ink3', 'teal', 'accent', 'points', 'rust'][n], label: n ? 'n = ' + n : 'Cu²⁺' })), vlines: (v) => [{ x: v.L }] }],
          readout: (v) => { const r = v.fr(v.L); return [['log β₄', f(v.k1 + v.k2 + v.k3 + v.k4)], ['average ligands bound', f(r.reduce((a, x, n) => a + n * x, 0))], ['main species', ['Cu²⁺', '[Cu(NH₃)]²⁺', '[Cu(NH₃)₂]²⁺', '[Cu(NH₃)₃]²⁺', '[Cu(NH₃)₄]²⁺'][r.indexOf(Math.max(...r))]]]; } } },
      { sim: 'explore', title: 'The chelate effect', desc: 'Free energy, enthalpy and entropy of forming [Ni(NH₃)₆]²⁺ and [Ni(en)₃]²⁺ (log β = 8.6 and 18.3; ΔH ≈ −100 and −117 kJ/mol). The entropy term makes the difference.',
        tasks: ['Which term, ΔH or −TΔS, differs more between the two complexes?', 'How does the advantage of the chelate change with temperature?', 'Estimate the equilibrium constant for replacing six NH₃ by three en.'],
        params: { controls: [S('T', 'Temperature', 273, 373, 1, 298, 'K')],
          init: (v) => { v.d = (lb, H) => { const G298 = -8.314 * 298 * Math.LN10 * lb / 1000, Sx = (H - G298) / 298; return { H: H, TS: v.T * Sx, G: H - v.T * Sx }; }; },
          draw: (ctx, C, v, b, U) => { const a = v.d(8.6, -100), e = v.d(18.3, -117); const items = [['ΔH NH₃', a.H, C.accent], ['−TΔS NH₃', -a.TS, C.teal], ['ΔG NH₃', a.G, C.ink3], ['ΔH en', e.H, C.accent], ['−TΔS en', -e.TS, C.teal], ['ΔG en', e.G, C.rust]]; const pb = { x: b.x + 50, y: b.y + 18, w: b.w - 66, h: b.h - 50 }; const m = U.frame(ctx, C, pb, [0, items.length], [-160, 70], { xticks: [], ylabel: 'kJ/mol', ny: 4 }); items.forEach((it, i) => { const x = pb.x + (i + 0.18) * pb.w / items.length, w = pb.w / items.length * 0.64; ctx.fillStyle = it[2]; ctx.fillRect(x, Math.min(m.Y(0), m.Y(it[1])), w, Math.abs(m.Y(it[1]) - m.Y(0))); U.text(ctx, it[0], x + w / 2, pb.y + pb.h + 14, C.ink, U.ui(10.5, 700), 'center'); U.text(ctx, PB.fmt(it[1], 3), x + w / 2, m.Y(it[1]) + (it[1] < 0 ? 14 : -5), C.ink2, U.mono(10), 'center'); }); },
          picFrac: 1,
          readout: (v) => { const a = v.d(8.6, -100), e = v.d(18.3, -117); return [['ΔG difference', f(e.G - a.G) + ' kJ/mol'], ['K for 6NH₃ → 3en exchange', PB.fmt(Math.exp(-(e.G - a.G) * 1000 / (8.314 * v.T)), 3)]]; } } }
    ],
    formulas: [
      ['d-electron count', R`d^n,\ n = \text{group} - \text{oxidation state}`],
      ['Overall stability constant', R`\beta_n = K_1K_2\cdots K_n`],
      ['Free energy of binding', R`\Delta G^\circ = -RT\ln\beta`],
      ['18-electron count', R`d^n + 2\times(\text{2e ligands})`],
      ['Spin-only moment', R`\mu = \sqrt{n(n+2)}\ \mu_B`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Chiral complex', q: R`<p>Which complex is chiral?</p>`, options: ['trans-[Co(en)₂Cl₂]⁺', 'cis-[Co(en)₂Cl₂]⁺', '[Co(NH₃)₆]³⁺', 'trans-[Pt(NH₃)₂Cl₂]'], answer: 1, hints: [R`Look for a mirror plane.`], solution: R`<p>cis-[Co(en)₂Cl₂]⁺ has no mirror plane.</p>` },
      { level: 'concept', type: 'mcq', title: 'Jahn–Teller', q: R`<p>Which ion shows the strongest Jahn–Teller distortion in an octahedral aqua complex?</p>`, options: ['Cr³⁺ (d³)', 'Mn²⁺ (d⁵ high spin)', 'Ni²⁺ (d⁸)', 'Cu²⁺ (d⁹)'], answer: 3, hints: [R`Unevenly filled e_g.`], solution: R`<p>Cu²⁺: (t₂g)⁶(e_g)³.</p>` },
      { level: 'concept', type: 'mcq', title: 'Ionisation isomers', q: R`<p>A solution of [Co(NH₃)₅Br]SO₄ gives a precipitate with…</p>`, options: ['AgNO₃ (AgBr)', 'BaCl₂ (BaSO₄)', 'Both', 'Neither'], answer: 1, hints: [R`Which ion is outside the bracket?`], solution: R`<p>Sulfate is the counter-ion, so BaSO₄ precipitates; Br⁻ is bound to cobalt.</p>` },
      { level: 'core', type: 'num', title: 'd-electron count', q: R`<p>How many d electrons does the metal have in [Fe(CN)₆]⁴⁻?</p>`, answer: 6, tol: 0.001, unit: '', hints: [R`Fe(II); group 8.`], solution: R`<p>d⁶ (low spin, diamagnetic).</p>` },
      { level: 'core', type: 'num', title: 'Electron count', q: R`<p>Count the valence electrons on iron in Fe(CO)₅.</p>`, answer: 18, tol: 0.001, unit: '', hints: [R`Fe(0) has 8; each CO gives 2.`], solution: R`<p>8 + 10 = 18.</p>` },
      { level: 'core', type: 'num', title: 'Overall constant', q: R`<p>For Cu²⁺/NH₃, log K = 4.0, 3.3, 2.7, 2.0. What is log β₄?</p>`, answer: 12, tol: 0.001, unit: '', hints: [R`Add the logs.`], solution: R`<p>12.0.</p>` },
      { level: 'core', type: 'num', title: 'Chelate ΔG', q: R`<p>log β = 8.6 for [Ni(NH₃)₆]²⁺ and 18.3 for [Ni(en)₃]²⁺. What is the difference in ΔG° at 298 K, in kJ/mol (negative)?</p>`, answer: -8.314 * 298 * Math.LN10 * 9.7 / 1000, tol: 0.005, unit: 'kJ/mol', hints: [R`$-RT\ln10\,\Delta\log\beta$.`], solution: R`<p>${f(-8.314 * 298 * Math.LN10 * 9.7 / 1000)} kJ/mol.</p>` },
      { level: 'core', type: 'num', title: 'Water hardness', q: R`<p>A 100 mL water sample needs 12.5 mL of 0.0100 mol/L EDTA. What is the total Ca²⁺ + Mg²⁺ concentration, in mmol/L?</p>`, answer: 0.125 / 0.1, tol: 0.005, unit: 'mmol/L', hints: [R`EDTA binds 1 : 1.`], solution: R`<p>0.125 mmol in 0.100 L: 1.25 mmol/L.</p>` },
      { level: 'core', type: 'num', title: 'Free metal ion', q: R`<p>For [Cu(NH₃)₄]²⁺, β₄ = 10¹². In 1.0 mol/L free NH₃ with 0.010 mol/L total copper, what is [Cu²⁺] (as −log₁₀)?</p>`, answer: 14, tol: 0.005, unit: '', hints: [R`$[\text{Cu}^{2+}] = [\text{complex}]/\beta_4[L]^4$.`], solution: R`<p>$0.010/10^{12} = 10^{-14}$ mol/L; pCu = 14.</p>` },
      { level: 'olympiad', type: 'num', title: 'Counting isomers', q: R`<p>How many stereoisomers (including enantiomers) does octahedral [Co(NH₃)₃Cl₃] have?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`fac and mer; neither is chiral.`], solution: R`<p>2.</p>` },
      { level: 'olympiad', type: 'num', title: 'Isomers of MA₂B₂C₂', q: R`<p>How many stereoisomers (counting enantiomers separately) does octahedral MA₂B₂C₂ have?</p>`, answer: 6, tol: 0.001, unit: '', hints: [R`5 geometric arrangements, one of which is chiral.`], solution: R`<p>Five geometric isomers; the all-cis one exists as two enantiomers: 6.</p>` },
      { level: 'olympiad', type: 'num', title: 'Back-bonding shift', q: R`<p>A C–O stretch falls from 2143 to 2000 cm⁻¹ on coordination. Treating it as a harmonic oscillator with fixed reduced mass, by what percentage has the force constant fallen?</p>`, answer: 100 * (1 - Math.pow(2000 / 2143, 2)), tol: 0.01, unit: '%', hints: [R`$k \propto \bar\nu^2$.`], solution: R`<p>${f(100 * (1 - Math.pow(2000 / 2143, 2)))}%.</p>` }
    ]
  });
  PB.addDrills('chem-coord', [
    { title: 'd-electron count', gen(r) { const m = r.pick([['Ti', 4], ['V', 5], ['Cr', 6], ['Mn', 7], ['Fe', 8], ['Co', 9], ['Ni', 10], ['Cu', 11], ['Zn', 12]]), ox = r.int(1, 4); const n = m[1] - ox; if (n < 0 || n > 10) return this.gen(PB.rng(r.int(1, 1e9))); return { q: R`<p>How many d electrons does ${m[0]} have in the +${ox} oxidation state?</p>`, answer: n, tol: 0, atol: 0.01, unit: '', solution: R`<p>Group ${m[1]} − ${ox} = d<sup>${n}</sup>.</p>` }; } },
    { title: 'Stability and ΔG', gen(r) { const lb = r.step(2, 25, 0.1); return { q: R`<p>A complex has log β = ${f(lb)}. Find ΔG° of formation at 298 K, in kJ/mol.</p>`, answer: -8.314 * 298 * Math.LN10 * lb / 1000, tol: 0.005, unit: 'kJ/mol', solution: R`<p>$-RT\ln10\times${f(lb)} = ${f(-8.314 * 298 * Math.LN10 * lb / 1000)}$ kJ/mol.</p>` }; } },
    { title: '18-electron rule', gen(r) { const c = r.pick([['Cr(CO)₆', 18], ['Fe(CO)₅', 18], ['Ni(CO)₄', 18], ['Mn(CO)₅', 17], ['V(CO)₆', 17], ['Co(CO)₄', 17], ['Fe(C₅H₅)₂ (Fe²⁺, two 6e⁻ C₅H₅⁻)', 18], ['Mo(CO)₆', 18], ['W(CO)₆', 18]]); return { q: R`<p>Count the valence electrons at the metal in ${c[0]}.</p>`, answer: c[1], tol: 0, atol: 0.01, unit: '', solution: R`<p>${c[1]}${c[1] === 17 ? ': one short, so it dimerises or is easily reduced' : ''}.</p>` }; } }
  ]);
})();
