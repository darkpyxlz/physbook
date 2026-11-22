(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  // Frost data at pH 0: [oxidation state, nE° (V), species]
  const FROST = {
    Mn: [[0, 0, 'Mn'], [2, -2.36, 'Mn²⁺'], [3, -0.82, 'Mn³⁺'], [4, 0.10, 'MnO₂'], [6, 4.64, 'MnO₄²⁻'], [7, 5.20, 'MnO₄⁻']],
    Cl: [[-1, -1.36, 'Cl⁻'], [0, 0, 'Cl₂'], [1, 1.63, 'HOCl'], [3, 4.91, 'HClO₂'], [5, 7.33, 'ClO₃⁻'], [7, 9.71, 'ClO₄⁻']],
    N: [[-3, -0.82, 'NH₄⁺'], [-1, 1.87, 'NH₃OH⁺'], [0, 0, 'N₂'], [1, 1.77, 'N₂O'], [2, 3.36, 'NO'], [3, 4.36, 'HNO₂'], [5, 6.21, 'NO₃⁻']]
  };
  PB.addChapter({
    id: 'chem-redox', subject: 'chemistry', num: 26, part: 'Inorganic Chemistry',
    title: 'Redox Diagrams and Inorganic Analysis',
    subtitle: R`Reading the oxidation-state landscape. Balancing redox equations, Latimer and Frost diagrams, disproportionation and comproportionation, Pourbaix diagrams, redox titrations, and qualitative analysis of cations and anions.`,
    goals: ['Balance redox equations in acid and in base', 'Combine potentials from a Latimer diagram', 'Read a Frost diagram to predict disproportionation', 'Interpret a Pourbaix (E–pH) diagram', 'Perform permanganate and iodometric titration calculations', 'Plan a scheme to identify common cations and anions'],
    sections: [
      {
        title: 'Balancing redox equations',
        html: R`
<p>Split the reaction into half-equations. Balance the element, then O with H₂O, then H with H⁺, then charge with electrons. Multiply so the electrons cancel, and add. In basic solution, finally add OH⁻ to both sides to remove H⁺.</p>
$$\mathrm{MnO_4^- + 8H^+ + 5e^- \to Mn^{2+} + 4H_2O}$$
$$\mathrm{Fe^{2+} \to Fe^{3+} + e^-}\quad(\times5)$$
$$\mathrm{MnO_4^- + 5Fe^{2+} + 8H^+ \to Mn^{2+} + 5Fe^{3+} + 4H_2O}.$$`
      },
      {
        title: 'Latimer and Frost diagrams',
        html: R`
<p>A <strong>Latimer diagram</strong> lists the species of an element in order of oxidation state with the standard potential of each step written between them. For manganese in acid: MnO₄⁻ →(0.56) MnO₄²⁻ →(2.27) MnO₂ →(0.95) Mn³⁺ →(1.54) Mn²⁺ →(−1.18) Mn.</p>
<p>Potentials are not additive, but free energies are. To combine steps, weight each potential by its number of electrons:</p>
$$E^\circ_{\text{overall}} = \frac{n_1E_1^\circ + n_2E_2^\circ + \cdots}{n_1 + n_2 + \cdots}.$$
<p>A <strong>Frost diagram</strong> plots $nE^\circ$ (proportional to −ΔG/F of forming each species from the element) against oxidation state. It shows at a glance:</p>
<ul>
<li>The lowest point is the most stable species (Mn²⁺ for manganese in acid).</li>
<li>The slope between two points is the potential of that couple: steep upward lines to the right mean a strong oxidant.</li>
<li>A species above the line joining its neighbours is unstable to <strong>disproportionation</strong> (MnO₄²⁻ and Mn³⁺ in acid). Two species on either side of a lower point will <strong>comproportionate</strong> to it.</li>
</ul>
<details class="example"><summary><span class="lbl">Worked example</span> Find E° for MnO₄⁻ → MnO₂ in acid.<span class="tog">Solution</span></summary><div class="sol"><p>$(1\times0.56 + 2\times2.27)/3 = ${f((0.56 + 4.54) / 3)}$ V.</p></div></details>`
      },
      {
        title: 'Pourbaix diagrams',
        html: R`
<p>Many half-reactions involve H⁺, so potentials shift with pH: for each H⁺ per electron, $E$ falls by 0.0592 V per pH unit at 25 °C. A <strong>Pourbaix diagram</strong> maps which species is stable at each potential and pH. Horizontal lines are pure electron transfers (Fe³⁺/Fe²⁺), vertical lines pure acid–base or precipitation changes (Fe³⁺ → Fe(OH)₃), and sloping lines involve both.</p>
<p>Two dashed lines bound the stability of water: above $E = 1.23 - 0.0592\,\text{pH}$ water is oxidised to O₂, below $E = -0.0592\,\text{pH}$ it is reduced to H₂. The diagram for iron explains corrosion (Fe → Fe²⁺ in acidic, oxygenated water) and passivation (a protective Fe₂O₃/Fe(OH)₃ layer at higher pH).</p>`
      },
      {
        title: 'Redox titrations',
        html: R`
<p><strong>Permanganate</strong> titrations need no indicator: the purple MnO₄⁻ is decolourised until the end point, where the first pink persists. They are run in sulfuric acid (HCl would be oxidised to Cl₂). Iron(II), oxalate and hydrogen peroxide are classic analytes ($\mathrm{2MnO_4^- + 5H_2O_2 + 6H^+ \to 2Mn^{2+} + 5O_2 + 8H_2O}$).</p>
<p><strong>Iodometry</strong>: an oxidant (Cu²⁺, IO₃⁻, ClO⁻, dissolved O₂ in the Winkler method) liberates I₂ from excess I⁻; the I₂ is titrated with thiosulfate using starch, which turns blue-black with iodine, as indicator.</p>
$$\mathrm{I_2 + 2S_2O_3^{2-} \to 2I^- + S_4O_6^{2-}},\qquad \mathrm{2Cu^{2+} + 4I^- \to 2CuI + I_2}.$$`
      },
      {
        title: 'Qualitative analysis',
        html: R`
<p>Ions can be identified by characteristic reactions:</p>
<div class="table-wrap"><table><thead><tr><th>Test</th><th>Observation</th><th>Ion</th></tr></thead><tbody>
<tr><td>NaOH(aq), few drops then excess</td><td>blue precipitate</td><td>Cu²⁺</td></tr>
<tr><td></td><td>green, turning brown in air</td><td>Fe²⁺</td></tr>
<tr><td></td><td>red-brown</td><td>Fe³⁺</td></tr>
<tr><td></td><td>white, dissolves in excess</td><td>Al³⁺, Zn²⁺, Pb²⁺</td></tr>
<tr><td>Warm with NaOH</td><td>gas turns damp red litmus blue</td><td>NH₄⁺</td></tr>
<tr><td>Dilute acid</td><td>effervescence, gas turns limewater milky</td><td>CO₃²⁻</td></tr>
<tr><td>Acidified BaCl₂</td><td>white precipitate</td><td>SO₄²⁻</td></tr>
<tr><td>KSCN(aq)</td><td>blood-red colour</td><td>Fe³⁺</td></tr>
</tbody></table></div>
<p>Classic separation schemes precipitate cations in groups: chlorides (Ag⁺, Pb²⁺, Hg₂²⁺), sulfides in acid (Cu²⁺, Bi³⁺…), hydroxides (Fe³⁺, Al³⁺, Cr³⁺), sulfides in base (Zn²⁺, Ni²⁺, Mn²⁺), carbonates (Ca²⁺, Sr²⁺, Ba²⁺), relying on very different solubility products.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Frost diagrams', desc: 'nE° against oxidation state at pH 0. The slope between two points is the couple’s potential; points above the line joining their neighbours disproportionate.',
        tasks: ['Which manganese species are unstable to disproportionation in acid?', 'Which chlorine species is the strongest oxidising agent?', 'For nitrogen, where is the minimum? Why is N₂ so unreactive?'],
        params: { controls: [{ type: 'select', id: 'el', label: 'Element', value: 'Mn', options: [['Mn', 'Manganese'], ['Cl', 'Chlorine'], ['N', 'Nitrogen']] }],
          plots: [{ x: (v) => [Math.min(...FROST[v.el].map((p) => p[0])) - 0.5, Math.max(...FROST[v.el].map((p) => p[0])) + 0.8], y: 'auto', zero: false, xlabel: 'oxidation state', ylabel: 'nE° (V)', curves: (v) => { const d = FROST[v.el]; return [{ f: (x) => { for (let i = 0; i < d.length - 1; i++) if (x >= d[i][0] && x <= d[i + 1][0]) return d[i][1] + (d[i + 1][1] - d[i][1]) * (x - d[i][0]) / (d[i + 1][0] - d[i][0]); return NaN; }, width: 1.6 }]; }, pts: (v) => { const d = FROST[v.el]; return d.map((p, i) => { const unstable = i > 0 && i < d.length - 1 && p[1] > d[i - 1][1] + (d[i + 1][1] - d[i - 1][1]) * (p[0] - d[i - 1][0]) / (d[i + 1][0] - d[i - 1][0]); return { x: p[0], y: p[1], label: p[2], color: unstable ? 'rust' : 'accent', r: 6 }; }); } }],
          readout: (v) => { const d = FROST[v.el], low = d.reduce((a, p) => (p[1] < a[1] ? p : a)); const uns = d.filter((p, i) => i > 0 && i < d.length - 1 && p[1] > d[i - 1][1] + (d[i + 1][1] - d[i - 1][1]) * (p[0] - d[i - 1][0]) / (d[i + 1][0] - d[i - 1][0])).map((p) => p[2]); return [['most stable', low[2]], ['disproportionate (red)', uns.length ? uns.join(', ') : 'none'], ['strongest oxidant', d[d.length - 1][2] + ' (top right)']]; } } },
      { sim: 'explore', title: 'Pourbaix diagram of iron', desc: 'Stability regions of iron species in water ([Fe] = 10⁻⁶ mol/L) against pH and potential. Dashed lines bound the stability of water. Place the probe to see which species is stable.',
        tasks: ['In acidic, oxygen-saturated water (top left), which iron species is stable? What does this mean for corrosion?', 'Where does iron metal sit relative to the water-reduction line?', 'Move to pH 10 and E = 0. Why is iron passivated there?'],
        params: { controls: [S('pH', 'Probe pH', 0, 14, 0.1, 6), S('E', 'Probe potential', -1, 1.5, 0.01, 0.3, 'V')],
          init: (v) => { v.phA = 3.15; v.phB = 8.85; v.lines = { fe32: 0.77, fe2: -0.618 }; v.region = (pH, E) => { const fe3fe2 = pH < v.phA ? 0.77 : pH < v.phB ? 0.77 - 0.1776 * (pH - v.phA) : 0.77 - 0.1776 * (v.phB - v.phA) - 0.0592 * (pH - v.phB); const fe2fe = pH < v.phB ? -0.618 : -0.618 - 0.0592 * (pH - v.phB); if (E < fe2fe) return 'Fe (metal)'; if (E > fe3fe2) return pH < v.phA ? 'Fe³⁺' : 'Fe(OH)₃ / Fe₂O₃'; return pH < v.phB ? 'Fe²⁺' : 'Fe(OH)₂'; }; },
          plots: [{ x: [0, 14], y: [-1, 1.5], xlabel: 'pH', ylabel: 'E (V vs SHE)', curves: (v) => [{ f: (pH) => (pH < v.phA ? 0.77 : pH < v.phB ? 0.77 - 0.1776 * (pH - v.phA) : 0.77 - 0.1776 * (v.phB - v.phA) - 0.0592 * (pH - v.phB)), color: 'rust', label: 'Fe(III) / Fe(II)' }, { f: (pH) => (pH < v.phB ? -0.618 : -0.618 - 0.0592 * (pH - v.phB)), color: 'accent', label: 'Fe(II) / Fe' }, { f: (pH) => 1.23 - 0.0592 * pH, color: 'teal', dash: [5, 4], label: 'O₂ / H₂O' }, { f: (pH) => -0.0592 * pH, color: 'teal', dash: [5, 4], label: 'H₂O / H₂' }], vlines: (v) => [{ x: v.phA, label: 'Fe(OH)₃ forms', color: 'ink3' }], pts: (v) => [{ x: v.pH, y: v.E, label: v.region(v.pH, v.E) }] }],
          readout: (v) => [['stable species at probe', v.region(v.pH, v.E)], ['water at probe', v.E > 1.23 - 0.0592 * v.pH ? 'oxidised to O₂' : v.E < -0.0592 * v.pH ? 'reduced to H₂' : 'stable']] } }
    ],
    formulas: [
      ['Combining potentials', R`E^\circ = \dfrac{\sum n_iE_i^\circ}{\sum n_i}`],
      ['Free energy', R`\Delta G^\circ = -nFE^\circ`],
      ['pH dependence', R`E = E^\circ - 0.0592\,\tfrac{m}{n}\,\text{pH}`],
      ['Water stability', R`-0.0592\,\text{pH} \lt E \lt 1.23 - 0.0592\,\text{pH}`],
      ['Permanganate', R`\mathrm{MnO_4^- + 8H^+ + 5e^- \to Mn^{2+} + 4H_2O}`],
      ['Thiosulfate', R`\mathrm{I_2 + 2S_2O_3^{2-} \to 2I^- + S_4O_6^{2-}}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Frost diagram', q: R`<p>On a Frost diagram, a species lying above the line joining its two neighbours will…</p>`, options: ['Be the most stable', 'Disproportionate', 'Comproportionate', 'Not react'], answer: 1, hints: [R`Convex point.`], solution: R`<p>Disproportionate into its neighbours.</p>` },
      { level: 'concept', type: 'mcq', title: 'Acid for permanganate', q: R`<p>Why is permanganate titration run in H₂SO₄ rather than HCl?</p>`, options: ['HCl is too weak', 'MnO₄⁻ would oxidise Cl⁻ to Cl₂', 'Sulfate is a catalyst', 'HCl reduces Fe³⁺'], answer: 1, hints: [R`E°(Cl₂/Cl⁻) = 1.36 V.`], solution: R`<p>Permanganate (1.51 V) would oxidise chloride, using extra titrant.</p>` },
      { level: 'concept', type: 'mcq', title: 'Blood-red', q: R`<p>Adding KSCN to a solution gives a blood-red colour. Which ion is present?</p>`, options: ['Fe²⁺', 'Fe³⁺', 'Cu²⁺', 'Al³⁺'], answer: 1, hints: [R`[Fe(SCN)(H₂O)₅]²⁺.`], solution: R`<p>Fe³⁺.</p>` },
      { level: 'core', type: 'num', title: 'Electrons in a half-equation', q: R`<p>How many electrons appear in the balanced half-equation for Cr₂O₇²⁻ → 2Cr³⁺ in acid?</p>`, answer: 6, tol: 0.001, unit: '', hints: [R`+6 to +3 for two Cr.`], solution: R`<p>6.</p>` },
      { level: 'core', type: 'num', title: 'Latimer combination', q: R`<p>Find E° for MnO₂ → Mn²⁺ given MnO₂/Mn³⁺ 0.95 V and Mn³⁺/Mn²⁺ 1.54 V.</p>`, answer: (0.95 + 1.54) / 2, tol: 0.005, unit: 'V', hints: [R`Weight by n = 1 each.`], solution: R`<p>${f((0.95 + 1.54) / 2)} V.</p>` },
      { level: 'core', type: 'num', title: 'Iron by permanganate', q: R`<p>25.0 mL of an Fe²⁺ solution needs 22.4 mL of 0.0200 mol/L KMnO₄. What is [Fe²⁺]?</p>`, answer: 5 * 0.02 * 22.4 / 25, tol: 0.005, unit: 'mol/L', hints: [R`5 Fe²⁺ per MnO₄⁻.`], solution: R`<p>${f(5 * 0.02 * 22.4 / 25)} mol/L.</p>` },
      { level: 'core', type: 'num', title: 'Hydrogen peroxide', q: R`<p>10.0 mL of diluted H₂O₂ needs 18.0 mL of 0.0200 mol/L KMnO₄. What is [H₂O₂]?</p>`, answer: 2.5 * 0.02 * 18 / 10, tol: 0.005, unit: 'mol/L', hints: [R`5 H₂O₂ per 2 MnO₄⁻.`], solution: R`<p>${f(2.5 * 0.02 * 18 / 10)} mol/L.</p>` },
      { level: 'core', type: 'num', title: 'Copper by iodometry', q: R`<p>A brass sample’s Cu²⁺ liberates I₂ that needs 21.5 mL of 0.100 mol/L thiosulfate. What mass of copper is present, in g?</p>`, answer: 0.00215 * 63.55, tol: 0.005, unit: 'g', hints: [R`2 Cu²⁺ → I₂ → 2 S₂O₃²⁻: 1 : 1.`], solution: R`<p>${f(0.00215 * 63.55)} g.</p>` },
      { level: 'core', type: 'num', title: 'pH shift', q: R`<p>For O₂ + 4H⁺ + 4e⁻ → 2H₂O (E° = 1.23 V), what is E at pH 7 (other species standard)?</p>`, answer: 1.23 - 0.0592 * 7, tol: 0.005, unit: 'V', hints: [R`0.0592 V per pH unit.`], solution: R`<p>${f(1.23 - 0.0592 * 7)} V.</p>` },
      { level: 'olympiad', type: 'num', title: 'Disproportionation constant', q: R`<p>For 2Cu⁺ → Cu + Cu²⁺, with E°(Cu⁺/Cu) = 0.52 V and E°(Cu²⁺/Cu⁺) = 0.16 V, find log₁₀ K at 25 °C.</p>`, answer: (0.52 - 0.16) / 0.05916, tol: 0.01, unit: '', hints: [R`$\log K = nE^\circ/0.0592$ with n = 1.`], solution: R`<p>E° = 0.36 V; log K = ${f((0.52 - 0.16) / 0.05916)}: Cu⁺ disproportionates in water.</p>` },
      { level: 'olympiad', type: 'num', title: 'Winkler method', q: R`<p>Dissolved O₂ in 200 mL of water liberates I₂ that needs 8.4 mL of 0.0100 mol/L thiosulfate (1 O₂ → 2 I₂ → 4 S₂O₃²⁻). What is the O₂ concentration, in mg/L?</p>`, answer: 8.4e-5 / 4 * 32000 / 0.2, tol: 0.005, unit: 'mg/L', hints: [R`Moles thiosulfate / 4.`], solution: R`<p>$2.1\times10^{-5}$ mol O₂ in 0.2 L: ${f(8.4e-5 / 4 * 32000 / 0.2)} mg/L.</p>` },
      { level: 'olympiad', type: 'num', title: 'Iron(III) hydroxide boundary', q: R`<p>With $K_{sp}$(Fe(OH)₃) = 2.8 × 10⁻³⁹ and [Fe³⁺] = 10⁻⁶ mol/L, at what pH does Fe(OH)₃ start to precipitate?</p>`, answer: 14 + Math.log10(Math.cbrt(2.8e-39 / 1e-6)), tol: 0.005, unit: '', hints: [R`$[OH^-]^3 = K_{sp}/[Fe^{3+}]$.`], solution: R`<p>pH = ${f(14 + Math.log10(Math.cbrt(2.8e-39 / 1e-6)))}: the vertical line on the Pourbaix diagram.</p>` }
    ]
  });
  PB.addDrills('chem-redox', [
    { title: 'Permanganate titration', gen(r) { const c = r.step(0.005, 0.05, 0.001), V = r.step(10, 40, 0.1), Va = r.pick([10, 20, 25]); const k = r.pick([['Fe²⁺', 5], ['H₂O₂', 2.5], ['C₂O₄²⁻', 2.5]]); return { q: R`<p>${Va} mL of ${k[0]} solution needs ${f(V)} mL of ${f(c)} mol/L KMnO₄. What is the ${k[0]} concentration, in mol/L?</p>`, answer: k[1] * c * V / Va, tol: 0.005, unit: 'mol/L', solution: R`<p>${k[1]} mol ${k[0]} per mol MnO₄⁻: ${f(k[1] * c * V / Va)} mol/L.</p>` }; } },
    { title: 'Latimer weighting', gen(r) { const n1 = r.int(1, 3), n2 = r.int(1, 3), E1 = r.step(-1, 2, 0.01), E2 = r.step(-1, 2, 0.01); return { q: R`<p>Step 1 has E° = ${f(E1)} V (${n1} e⁻), step 2 has E° = ${f(E2)} V (${n2} e⁻). What is E° for the combined couple?</p>`, answer: (n1 * E1 + n2 * E2) / (n1 + n2), tol: 0.005, atol: 0.003, unit: 'V', solution: R`<p>$(${n1}\times${f(E1)} + ${n2}\times${f(E2)})/${n1 + n2} = ${f((n1 * E1 + n2 * E2) / (n1 + n2))}$ V.</p>` }; } },
    { title: 'Iodometric copper', gen(r) { const V = r.step(5, 40, 0.1), c = r.pick([0.05, 0.1, 0.2]); return { q: R`<p>Cu²⁺ from a sample liberates I₂ needing ${f(V)} mL of ${c} mol/L thiosulfate. What mass of copper, in mg?</p>`, answer: V * c * 63.55, tol: 0.005, unit: 'mg', solution: R`<p>1 Cu per S₂O₃²⁻: ${f(V * c * 63.55)} mg.</p>` }; } }
  ]);
})();
