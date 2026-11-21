(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-gibbs', subject: 'chemistry', num: 9, part: 'Physical Chemistry',
    title: 'Entropy and Gibbs Energy',
    subtitle: R`What decides whether a reaction goes. Entropy, the Gibbs energy that combines it with enthalpy, the link between ΔG° and the equilibrium constant, and coupling reactions together.`,
    goals: ['Predict the sign of ΔS', 'Use ΔG = ΔH − TΔS', 'Find the temperature where a reaction becomes favourable', 'Relate ΔG° to K', 'Use ΔG = ΔG° + RT ln Q'],
    sections: [
      {
        title: 'Entropy',
        html: R`
<p><strong>Entropy</strong> measures how many ways energy and matter can be arranged (see Physics, Chapter 12). The second law says the entropy of the universe increases in any spontaneous process.</p>
<p>Rules of thumb for the sign of $\Delta S$ of a reaction: gases have far more entropy than liquids or solids, so a reaction that makes more moles of gas has $\Delta S \gt 0$. Dissolving, melting, boiling and splitting molecules usually increase entropy.</p>
<p>Standard molar entropies $S^\circ$ are absolute (the third law sets $S = 0$ for a perfect crystal at 0 K), so</p>
<div class="key">$$\Delta_rS^\circ = \sum\nu S^\circ(\text{products}) - \sum\nu S^\circ(\text{reactants}).$$</div>
<p>Heat released into the surroundings increases their entropy by $\Delta S_{\text{surr}} = -\Delta H/T$.</p>`
      },
      {
        title: 'Gibbs energy',
        html: R`
<p>Combining system and surroundings into one criterion gives the <strong>Gibbs energy</strong>. At constant temperature and pressure, a process is spontaneous when</p>
<div class="key">$$\Delta G = \Delta H - T\Delta S \lt 0.$$</div>
<div class="table-wrap"><table><thead><tr><th>ΔH</th><th>ΔS</th><th>Spontaneous?</th></tr></thead><tbody>
<tr><td>−</td><td>+</td><td>At every temperature</td></tr>
<tr><td>+</td><td>−</td><td>Never</td></tr>
<tr><td>−</td><td>−</td><td>Below $T = \Delta H/\Delta S$</td></tr>
<tr><td>+</td><td>+</td><td>Above $T = \Delta H/\Delta S$</td></tr>
</tbody></table></div>
<p>Limestone ($\mathrm{CaCO_3 \to CaO + CO_2}$, ΔH = +178 kJ, ΔS = +161 J/K) only decomposes above about 1100 K, which is why lime kilns are hot.</p>
<div class="warn-box"><p>Spontaneous does not mean fast. Diamond turning into graphite has ΔG < 0 but takes geological time. Thermodynamics tells you <em>whether</em>; kinetics (Chapter 13) tells you <em>how fast</em>.</p></div>`
      },
      {
        title: 'Gibbs energy and equilibrium',
        html: R`
<p>Away from standard conditions, the Gibbs energy change depends on the reaction quotient $Q$:</p>
<div class="key">$$\Delta G = \Delta G^\circ + RT\ln Q.$$</div>
<p>At equilibrium $\Delta G = 0$ and $Q = K$, so</p>
<div class="key">$$\Delta G^\circ = -RT\ln K.$$</div>
<p>Each 5.7 kJ/mol of $\Delta G^\circ$ at 298 K changes $K$ by a factor of ten. A reaction with $\Delta G^\circ = -30\ \mathrm{kJ/mol}$ has $K \approx 2\times10^5$; one with +30 kJ/mol has $K \approx 5\times10^{-6}$.</p>`
      },
      {
        title: 'Coupled reactions',
        html: R`
<p>An unfavourable reaction can be driven by coupling it to a favourable one, so that the overall ΔG is negative. Living cells do this constantly with ATP hydrolysis (ΔG°′ ≈ −30.5 kJ/mol; in the cell, nearer −50 kJ/mol because of the concentrations). Metallurgy does it too: reducing a metal oxide is unfavourable alone, but coupled to oxidising carbon it can go. An <strong>Ellingham diagram</strong> plots ΔG° against T for oxide formation so you can read off when carbon can reduce an ore.</p>
<div class="insight"><p>When ΔH and ΔS are roughly constant, a plot of ΔG° against T is a straight line with slope −ΔS. Phase changes cause kinks, because ΔS jumps. These straight lines make many olympiad metallurgy questions a matter of reading intersections.</p></div>`
      }
    ],
    labs: [
      { sim: 'gibbs', title: 'ΔG against temperature', desc: 'ΔG° = ΔH° − TΔS° as a straight line. The green region is where the reaction is favourable; the readout gives K.',
        tasks: ['With the limestone values, find the temperature where CaCO₃ starts to decompose.', 'Make ΔH and ΔS both negative. In which temperature range does the reaction go?', 'At 298 K, what ΔG° gives K = 1? K = 1000?'] }    ],
    formulas: [
      ['Reaction entropy', R`\Delta_rS^\circ = \sum\nu S^\circ_{\text{prod}} - \sum\nu S^\circ_{\text{react}}`],
      ['Surroundings', R`\Delta S_{\text{surr}} = -\Delta H/T`],
      ['Gibbs energy', R`\Delta G = \Delta H - T\Delta S`],
      ['Crossover temperature', R`T = \Delta H/\Delta S`],
      ['Non-standard ΔG', R`\Delta G = \Delta G^\circ + RT\ln Q`],
      ['Equilibrium constant', R`\Delta G^\circ = -RT\ln K`],
      ['Entropy of mixing', R`\Delta S_{\text{mix}} = -R\sum n_i\ln x_i`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'More disorder', q: R`<p>Which reaction has the most positive ΔS?</p>`, options: ['N₂(g) + 3H₂(g) → 2NH₃(g)', 'CaCO₃(s) → CaO(s) + CO₂(g)', 'H₂O(g) → H₂O(l)', 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)'], answer: 1, hints: [R`Look for moles of gas produced.`], solution: R`<p>A solid produces a gas: a large entropy increase. The others decrease the number of free particles.</p>` },
      { level: 'concept', type: 'mcq', title: 'Always spontaneous', q: R`<p>A reaction has ΔH < 0 and ΔS > 0. It is spontaneous:</p>`, options: ['At all temperatures', 'Only at low temperatures', 'Only at high temperatures', 'Never'], answer: 0, hints: [R`Both terms in ΔH − TΔS are negative.`], solution: R`<p>ΔG is negative at every temperature.</p>` },
      { level: 'concept', type: 'mcq', title: 'Large K', q: R`<p>If K > 1 at some temperature, then at that temperature:</p>`, options: ['ΔG° > 0', 'ΔG° < 0', 'ΔG° = 0', 'ΔH° < 0'], answer: 1, hints: [R`$\Delta G^\circ = -RT\ln K$.`], solution: R`<p>$\ln K \gt 0$ means $\Delta G^\circ \lt 0$. Nothing follows about ΔH° alone.</p>` },
      { level: 'core', type: 'num', title: 'Entropy of ammonia synthesis', q: R`<p>Find ΔS° for $\mathrm{N_2 + 3H_2 \to 2NH_3}$ from S° (J/mol K): N₂ 191.6, H₂ 130.7, NH₃ 192.5.</p>`, answer: 2 * 192.5 - 191.6 - 3 * 130.7, tol: 0.005, unit: 'J/K', hints: [R`Four moles of gas become two.`], solution: R`<p>$385.0 - 191.6 - 392.1 = -198.7\ \mathrm{J/K}$.</p>` },
      { level: 'core', type: 'num', title: 'ΔG° at room temperature', q: R`<p>For ammonia synthesis ΔH° = −92.2 kJ and ΔS° = −198.7 J/K. Find ΔG° at 298 K.</p>`, answer: -92.2 + 298 * 0.1987, tol: 0.005, unit: 'kJ', hints: [R`Convert ΔS to kJ/K.`], solution: R`<p>$-92.2 + 298(0.1987) = -33.0\ \mathrm{kJ}$.</p>` },
      { level: 'core', type: 'num', title: 'Lime kiln', q: R`<p>For $\mathrm{CaCO_3 \to CaO + CO_2}$, ΔH° = +178 kJ and ΔS° = +161 J/K. Above what temperature is decomposition favourable?</p>`, answer: 178000 / 161, tol: 0.01, unit: 'K', hints: [R`$T = \Delta H/\Delta S$.`], solution: R`<p>$T = 178\,000/161 = 1106\ \mathrm K$ (about 830 °C).</p>` },
      { level: 'core', type: 'num', title: 'From ΔG° to K', q: R`<p>A reaction has ΔG° = −33.0 kJ/mol at 298 K. Find K.</p>`, answer: Math.exp(33000 / (8.314 * 298)), tol: 0.03, unit: '', hints: [R`$K = e^{-\Delta G^\circ/RT}$.`], solution: R`<p>$K = e^{13.3} = 6\times10^5$.</p>` },
      { level: 'core', type: 'num', title: 'Boiling water', q: R`<p>Water's enthalpy of vaporisation is 40.7 kJ/mol at 373 K. What is ΔS of vaporisation?</p>`, answer: 40700 / 373, tol: 0.01, unit: 'J/(mol K)', hints: [R`At the boiling point ΔG = 0.`], solution: R`<p>$\Delta S = 40\,700/373 = 109\ \mathrm{J\,mol^{-1}K^{-1}}$, above Trouton's 88 because of hydrogen bonding in the liquid.</p>` },
      { level: 'olympiad', type: 'num', title: 'ATP in a real cell', q: R`<p>ATP hydrolysis has ΔG°′ = −30.5 kJ/mol. In a muscle cell at 310 K, [ATP] = 5.0 mM, [ADP] = 0.50 mM and [Pᵢ] = 5.0 mM. Find the actual ΔG.</p>`, answer: -30.5 + 8.314 * 310 * Math.log((0.5e-3 * 5e-3) / 5e-3) / 1000, tol: 0.01, unit: 'kJ/mol', hints: [R`$Q = [\mathrm{ADP}][\mathrm{P_i}]/[\mathrm{ATP}]$ in mol/L.`], solution: R`<p>$Q = 5\times10^{-4}$, so $\Delta G = -30.5 + (2.577)\ln(5\times10^{-4}) = -50.1\ \mathrm{kJ/mol}$. Keeping ATP far from equilibrium makes it a much stronger energy source.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ammonia at 500 K', q: R`<p>Assuming ΔH° = −92.2 kJ and ΔS° = −198.7 J/K do not change with temperature, find K for ammonia synthesis at 500 K.</p>`, answer: Math.exp(-(-92200 + 500 * 198.7) / (8.314 * 500)), tol: 0.03, unit: '', hints: [R`First find ΔG° at 500 K.`], solution: R`<p>$\Delta G^\circ = -92.2 + 500(0.1987) = +7.2\ \mathrm{kJ}$, so $K = e^{-7150/4157} = 0.18$. Higher temperature makes the reaction faster but less favourable: Haber's compromise is about 700 K with high pressure and a catalyst.</p>` },
      { level: 'olympiad', type: 'num', title: 'Entropy of mixing', q: R`<p>1.00 mol of N₂ and 1.00 mol of O₂, both at the same temperature and pressure, are allowed to mix as ideal gases. Find the entropy change.</p>`, answer: -8.314 * 2 * Math.log(0.5), tol: 0.01, unit: 'J/K', hints: [R`$\Delta S = -R\sum n_i\ln x_i$ with $x_i = 0.5$.`], solution: R`<p>$\Delta S = -8.314(2\ln0.5) = 11.5\ \mathrm{J/K}$, with no heat exchanged. Mixing is driven purely by entropy.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-gibbs', [
    { title: 'Gibbs energy', gen(r) { const dH = r.int(-300, 300), dS = r.int(-300, 300), T = r.int(250, 1500); const G = dH - T * dS / 1000; return { q: R`<p>ΔH° = ${dH} kJ/mol and ΔS° = ${dS} J/(mol K). Find ΔG° at ${T} K.</p>`, answer: G, unit: 'kJ/mol', tol: 0.01, solution: R`<p>$\Delta G^\circ = ${dH} - ${T}(${dS / 1000}) = ${f(G)}\ \mathrm{kJ/mol}$.</p>` }; } },
    { title: 'K from ΔG°', gen(r) { const G = r.int(-40, 40), T = r.pick([298, 310, 400, 500]); return { q: R`<p>Find K for a reaction with ΔG° = ${G} kJ/mol at ${T} K.</p>`, answer: Math.exp(-G * 1000 / (8.314 * T)), unit: '', tol: 0.02, solution: R`<p>$K = e^{-\Delta G^\circ/RT} = ${f(Math.exp(-G * 1000 / (8.314 * T)))}$.</p>` }; } },
    { title: 'Crossover temperature', gen(r) { const dH = r.int(20, 300), dS = r.int(30, 300), s = r.pick([1, -1]); return { q: R`<p>A reaction has ΔH = ${s * dH} kJ/mol and ΔS = ${s * dS} J/(mol K). At what temperature is ΔG° = 0?</p>`, answer: dH * 1000 / dS, unit: 'K', solution: R`<p>$T = \Delta H/\Delta S = ${f(dH * 1000 / dS)}\ \mathrm K$.</p>` }; } }
  ]);
})();
