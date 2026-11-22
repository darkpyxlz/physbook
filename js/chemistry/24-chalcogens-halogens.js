(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  // Contact process: 2SO2 + O2 ⇌ 2SO3, ΔH = −198 kJ, ΔS = −188 J/K. Conversion of SO2 from a feed SO2:O2:N2 = a:b:(rest), total P.
  const contactX = (T, P, so2, o2) => { const Kp = Math.exp(-(-198000 + T * 188) / (8.314 * T)); let lo = 0, hi = 0.99999; for (let i = 0; i < 80; i++) { const x = (lo + hi) / 2, n = 1 - x * so2 / 2, ySO3 = x * so2 / n, ySO2 = (1 - x) * so2 / n, yO2 = (o2 - x * so2 / 2) / n; if (yO2 <= 0) { hi = x; continue; } const Q = (ySO3 * ySO3) / (ySO2 * ySO2 * yO2 * P); if (Q < Kp) lo = x; else hi = x; } return (lo + hi) / 2; };
  const HAL = { el: ['F', 'Cl', 'Br', 'I'], props: { E: ['E°(X₂/X⁻) (V)', [2.87, 1.36, 1.09, 0.54]], bond: ['X–X bond enthalpy (kJ/mol)', [158, 243, 193, 151]], chi: ['Electronegativity', [3.98, 3.16, 2.96, 2.66]], hx: ['H–X bond enthalpy (kJ/mol)', [568, 432, 366, 298]], pka: ['pKa of HX', [3.2, -7, -9, -10]], bp: ['Boiling point of X₂ (°C)', [-188, -34, 59, 184]] } };
  PB.addChapter({
    id: 'chem-chalcogens', subject: 'chemistry', num: 24, part: 'Inorganic Chemistry',
    title: 'Oxygen, Sulfur, the Halogens and the Noble Gases',
    subtitle: R`The right-hand side of the p-block. Oxides and their acid–base character, sulfur and the contact process, the halogens and their trends, disproportionation, interhalogens, and the compounds of xenon.`,
    goals: ['Classify oxides as basic, amphoteric or acidic across a period', 'Describe the allotropes of oxygen and sulfur, and the contact process', 'Explain trends in halogen oxidising power, bond enthalpy and HX acidity', 'Write equations for halogen disproportionation', 'Predict shapes of interhalogens and xenon fluorides'],
    sections: [
      {
        title: 'Oxygen and oxides',
        html: R`
<p>O₂ is paramagnetic (two unpaired electrons in π* orbitals: MO theory explains what Lewis structures cannot). Ozone, O₃, is a bent molecule that absorbs ultraviolet in the stratosphere and is a strong oxidant at ground level.</p>
<p>Across period 3, oxides change from <strong>basic</strong> and ionic to <strong>acidic</strong> and covalent:</p>
<div class="table-wrap"><table><thead><tr><th>Oxide</th><th>Na₂O</th><th>MgO</th><th>Al₂O₃</th><th>SiO₂</th><th>P₄O₁₀</th><th>SO₃</th><th>Cl₂O₇</th></tr></thead><tbody>
<tr><td>Bonding</td><td colspan="2">ionic lattice</td><td>ionic/covalent</td><td>giant covalent</td><td colspan="3">molecular</td></tr>
<tr><td>Character</td><td colspan="2">basic</td><td>amphoteric</td><td colspan="4">acidic</td></tr>
</tbody></table></div>
<p>Hydrogen peroxide, H₂O₂, can act as oxidant or reductant and disproportionates to water and oxygen, catalysed by MnO₂ or catalase.</p>`
      },
      {
        title: 'Sulfur and sulfuric acid',
        html: R`
<p>Sulfur forms S₈ rings (rhombic and monoclinic) and long chains in plastic sulfur. It shows oxidation states from −2 (H₂S, toxic and smelling of rotten eggs) to +6 (SO₃, H₂SO₄). SO₂ from burning fossil fuels causes acid rain.</p>
<p>The <strong>contact process</strong> makes sulfuric acid, the most produced industrial chemical:</p>
$$\mathrm{2SO_2 + O_2 \rightleftharpoons 2SO_3},\qquad \Delta H^\circ = -198\ \text{kJ/mol},$$
<p>over a V₂O₅ catalyst at about 450 °C and near 1–2 bar (the equilibrium already lies far to the right, so high pressure is not worth the cost). SO₃ is absorbed into concentrated acid to form oleum (H₂S₂O₇), then diluted, because SO₃ with water directly makes an uncontrollable acid mist. Concentrated H₂SO₄ is a strong acid, a dehydrating agent (it chars sugar) and, hot, an oxidising agent.</p>`
      },
      {
        title: 'The halogens',
        html: R`
<p>Halogens (F, Cl, Br, I) are one electron short of a noble-gas configuration and are strong oxidising agents; oxidising power falls down the group, as the electrode potentials show: F₂ 2.87 V, Cl₂ 1.36 V, Br₂ 1.09 V, I₂ 0.54 V. So a halogen displaces any halide below it: $\mathrm{Cl_2 + 2Br^- \to 2Cl^- + Br_2}$.</p>
<p>Fluorine is anomalous. The F–F bond is weak (158 kJ/mol, lone pairs repel at short range), which together with strong bonds to other elements makes F₂ the most reactive element. HF is a <strong>weak</strong> acid (pKa 3.2) although HCl, HBr and HI are strong: the H–F bond is very strong and F⁻ is strongly hydrated in a way that favours HF. Down the group, H–X bonds weaken and acidity increases.</p>
<p>Halide ions are identified with silver nitrate: AgCl white (dissolves in dilute ammonia), AgBr cream (concentrated ammonia), AgI yellow (insoluble). Concentrated sulfuric acid reduces HBr and HI but not HCl, showing the rising reducing power of the halides.</p>`
      },
      {
        title: 'Disproportionation and interhalogens',
        html: R`
<p>In <strong>disproportionation</strong> one element is both oxidised and reduced. Chlorine in cold dilute alkali gives bleach; in hot alkali, chlorate:</p>
$$\mathrm{Cl_2 + 2OH^- \to Cl^- + OCl^- + H_2O}\quad(\text{cold}),\qquad \mathrm{3Cl_2 + 6OH^- \to 5Cl^- + ClO_3^- + 3H_2O}\quad(\text{hot}).$$
<p>Halogens also combine with each other as <strong>interhalogens</strong>, XYₙ with n = 1, 3, 5, 7 and the larger, less electronegative atom in the centre: ClF, ClF₃ (T-shaped), BrF₅ (square pyramidal), IF₇ (pentagonal bipyramidal). VSEPR predicts all their shapes. Polyhalide ions such as I₃⁻ (linear) explain why iodine dissolves in KI solution.</p>`
      },
      {
        title: 'Noble gases',
        html: R`
<p>For decades the noble gases were thought inert. In 1962 Neil Bartlett made the first noble-gas compound by reasoning that the ionisation energy of xenon (1170 kJ/mol) is close to that of O₂ (1165 kJ/mol), which PtF₆ can oxidise. Xenon reacts with fluorine to give XeF₂ (linear), XeF₄ (square planar) and XeF₆ (distorted octahedral), and with oxygen in XeO₃ (explosive). Krypton forms KrF₂; lighter noble gases form no stable compounds. Helium is mined from natural gas, where it accumulates from alpha decay; argon (1% of air) is used as an inert shield gas.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'The contact process', desc: 'Equilibrium conversion of SO₂ to SO₃ against temperature from a feed of 10% SO₂ and 11% O₂ (rest N₂), using ΔH° = −198 kJ/mol and ΔS° = −188 J/mol K.',
        tasks: ['How high is the equilibrium conversion at 450 °C and 1 bar? Why is a higher pressure not used?', 'Above what temperature does conversion fall below 90%?', 'Why do plants cool the gas between catalyst beds?'],
        params: { controls: [S('T', 'Temperature', 500, 1200, 5, 723, 'K'), S('P', 'Pressure', 0.5, 10, 0.1, 1, 'bar'), S('o2', 'O₂ fraction in the feed', 0.06, 0.2, 0.005, 0.11)],
          plots: [{ x: [500, 1200], y: [0, 1], xlabel: 'T (K)', ylabel: 'SO₂ conversion', curves: (v) => [[1, 'accent'], [5, 'rust']].map((p) => ({ f: (T) => contactX(T, p[0], 0.1, v.o2), color: p[1], label: p[0] + ' bar' })), pts: (v) => [{ x: v.T, y: contactX(v.T, v.P, 0.1, v.o2) }], vlines: () => [{ x: 723, label: '450 °C' }] }],
          readout: (v) => [['Kp', PB.fmt(Math.exp(-(-198000 + v.T * 188) / (8.314 * v.T)), 3) + ' bar⁻¹'], ['equilibrium conversion', f(100 * contactX(v.T, v.P, 0.1, v.o2)) + '%']] } },
      { sim: 'explore', title: 'Halogen trends', desc: 'Properties of the halogens down group 17. Watch for fluorine’s anomalies.',
        tasks: ['Which property shows fluorine as an exception?', 'Explain why HF is a weak acid using the H–X bond enthalpies.', 'Which trend explains why Cl₂ displaces Br⁻ from solution?'],
        params: { controls: [{ type: 'select', id: 'p', label: 'Property', value: 'bond', options: Object.keys(HAL.props).map((k) => [k, HAL.props[k][0]]) }],
          plots: [{ x: [0.5, 4.5], xticks: [1, 2, 3, 4], xfmt: (x) => HAL.el[x - 1] || '', y: (v) => { const a = HAL.props[v.p][1], lo = Math.min(...a), hi = Math.max(...a), pad = (hi - lo) * 0.2; return [Math.min(0, lo - pad), hi + pad]; }, xlabel: 'element', ylabel: '', curves: (v) => [{ f: (x) => { const a = HAL.props[v.p][1], i = Math.min(2, Math.floor(x - 1)), t = x - 1 - i; return x < 1 || x > 4 ? NaN : a[i] + (a[i + 1] - a[i]) * t; }, width: 1.5, dash: [4, 4] }], pts: (v) => HAL.props[v.p][1].map((y, i) => ({ x: i + 1, y: y, r: 7, label: String(y) })) }],
          readout: (v) => HAL.el.map((e, i) => [e, String(HAL.props[v.p][1][i])]) } }
    ],
    formulas: [
      ['Contact process', R`\mathrm{2SO_2 + O_2 \rightleftharpoons 2SO_3},\ \Delta H^\circ = -198\ \text{kJ/mol}`],
      ['Cold alkali', R`\mathrm{Cl_2 + 2OH^- \to Cl^- + OCl^- + H_2O}`],
      ['Hot alkali', R`\mathrm{3Cl_2 + 6OH^- \to 5Cl^- + ClO_3^- + 3H_2O}`],
      ['Displacement', R`\mathrm{Cl_2 + 2Br^- \to 2Cl^- + Br_2}`],
      ['Peroxide decomposition', R`\mathrm{2H_2O_2 \to 2H_2O + O_2}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Acidic oxide', q: R`<p>Which oxide dissolves in water to give an acidic solution?</p>`, options: ['Na₂O', 'MgO', 'SO₂', 'CaO'], answer: 2, hints: [R`Non-metal oxide.`], solution: R`<p>SO₂ gives sulfurous acid.</p>` },
      { level: 'concept', type: 'mcq', title: 'Weak HF', q: R`<p>Why is HF a weak acid in water?</p>`, options: ['Fluorine is not electronegative', 'The H–F bond is very strong', 'HF is not polar', 'F⁻ is a very weak base'], answer: 1, hints: [R`568 kJ/mol.`], solution: R`<p>The strong H–F bond (and hydrogen bonding) keeps it largely undissociated.</p>` },
      { level: 'concept', type: 'mcq', title: 'XeF₄ shape', q: R`<p>What is the shape of XeF₄?</p>`, options: ['Tetrahedral', 'See-saw', 'Square planar', 'Square pyramidal'], answer: 2, hints: [R`Two lone pairs opposite.`], solution: R`<p>Square planar.</p>` },
      { level: 'core', type: 'num', title: 'Oxidation state', q: R`<p>What is the oxidation state of chlorine in ClO₃⁻?</p>`, answer: 5, tol: 0.001, unit: '', hints: [R`x − 6 = −1.`], solution: R`<p>+5.</p>` },
      { level: 'core', type: 'num', title: 'Displacement cell', q: R`<p>Find E°cell for Cl₂ + 2I⁻ → 2Cl⁻ + I₂.</p>`, answer: 1.36 - 0.54, tol: 0.005, unit: 'V', hints: [R`Cathode − anode.`], solution: R`<p>0.82 V.</p>` },
      { level: 'core', type: 'num', title: 'Sulfuric acid from sulfur', q: R`<p>How many tonnes of H₂SO₄ (98.08 g/mol) can be made from 1.00 t of sulfur (32.06 g/mol) at 98% overall yield?</p>`, answer: 98.08 / 32.06 * 0.98, tol: 0.005, unit: 't', hints: [R`1 S → 1 H₂SO₄.`], solution: R`<p>${f(98.08 / 32.06 * 0.98)} t.</p>` },
      { level: 'core', type: 'num', title: 'Bleach strength', q: R`<p>Household bleach contains 5.0% NaOCl by mass (74.44 g/mol). What is the concentration of OCl⁻ in mol/L (density 1.08 g/mL)?</p>`, answer: 1080 * 0.05 / 74.44, tol: 0.005, unit: 'mol/L', hints: [R`Mass per litre ÷ M.`], solution: R`<p>${f(1080 * 0.05 / 74.44)} mol/L.</p>` },
      { level: 'core', type: 'num', title: 'Ozone layer', q: R`<p>Ozone absorbs UV that breaks its 107 kJ/mol O–O₂ bond. What is the longest wavelength that can do this, in nm?</p>`, answer: 6.626e-34 * 2.998e8 * 6.022e23 / 107000 * 1e9, tol: 0.005, unit: 'nm', hints: [R`$\lambda = N_Ahc/E$.`], solution: R`<p>${f(6.626e-34 * 2.998e8 * 6.022e23 / 107000 * 1e9)} nm (in practice the strong absorption is in the UV, below 320 nm).</p>` },
      { level: 'core', type: 'num', title: 'Iodometric titration', q: R`<p>A bleach sample liberates I₂ from excess KI, which needs 24.0 mL of 0.100 mol/L thiosulfate ($\mathrm{I_2 + 2S_2O_3^{2-} \to 2I^- + S_4O_6^{2-}}$). How many mmol of OCl⁻ (1 OCl⁻ → 1 I₂) were present?</p>`, answer: 2.4 / 2, tol: 0.005, unit: 'mmol', hints: [R`2 thiosulfate per I₂.`], solution: R`<p>1.20 mmol.</p>` },
      { level: 'olympiad', type: 'num', title: 'Contact equilibrium', q: R`<p>Using ΔH° = −198 kJ/mol and ΔS° = −188 J/mol K for 2SO₂ + O₂ ⇌ 2SO₃, find the temperature (K) at which Kp = 1 bar⁻¹.</p>`, answer: 198000 / 188, tol: 0.005, unit: 'K', hints: [R`ΔG° = 0.`], solution: R`<p>${f(198000 / 188, 4)} K: above about 1050 K the equilibrium lies on the reactant side.</p>` },
      { level: 'olympiad', type: 'num', title: 'Bartlett’s argument', q: R`<p>The first ionisation energies of O₂ and Xe are 1165 and 1170 kJ/mol. By how many kJ/mol is Xe harder to ionise, as a percentage?</p>`, answer: 100 * 5 / 1165, tol: 0.01, unit: '%', hints: [R`(1170 − 1165)/1165.`], solution: R`<p>${f(100 * 5 / 1165)}%: close enough that PtF₆ oxidises both.</p>` },
      { level: 'olympiad', type: 'num', title: 'Chlorate yield', q: R`<p>Chlorine is passed into hot KOH. What is the maximum mass of KClO₃ (122.55 g/mol) from 71.0 g of Cl₂?</p>`, answer: 71 / 70.9 / 3 * 122.55, tol: 0.005, unit: 'g', hints: [R`3 Cl₂ → 1 ClO₃⁻.`], solution: R`<p>${f(71 / 70.9 / 3 * 122.55)} g: only one chlorine in six ends up as chlorate.</p>` }
    ]
  });
  PB.addDrills('chem-chalcogens', [
    { title: 'Halogen displacement', gen(r) { const E = [['F₂', 2.87], ['Cl₂', 1.36], ['Br₂', 1.09], ['I₂', 0.54]], i = r.int(0, 2), j = r.int(i + 1, 3); return { q: R`<p>Find E°cell for ${E[i][0]} + 2${E[j][0].replace('₂', '')}⁻ → 2${E[i][0].replace('₂', '')}⁻ + ${E[j][0]}, in V.</p>`, answer: E[i][1] - E[j][1], tol: 0.005, unit: 'V', solution: R`<p>${E[i][1]} − ${E[j][1]} = ${f(E[i][1] - E[j][1])} V.</p>` }; } },
    { title: 'Oxidation states', gen(r) { const s = r.pick([['ClO⁻', 'Cl', 1], ['ClO₂⁻', 'Cl', 3], ['ClO₃⁻', 'Cl', 5], ['ClO₄⁻', 'Cl', 7], ['SO₃²⁻', 'S', 4], ['SO₄²⁻', 'S', 6], ['S₂O₃²⁻', 'S', 2], ['H₂S', 'S', -2], ['IO₃⁻', 'I', 5], ['H₂O₂', 'O', -1], ['XeO₃', 'Xe', 6], ['S₄O₆²⁻', 'S', 2.5]]); return { q: R`<p>What is the (average) oxidation state of ${s[1]} in ${s[0]}?</p>`, answer: s[2], tol: 0.001, atol: 0.01, unit: '', solution: R`<p>${s[2] > 0 ? '+' : ''}${s[2]}.</p>` }; } },
    { title: 'Sulfuric acid mass', gen(r) { const t = r.step(0.5, 50, 0.5), y = r.int(85, 99); return { q: R`<p>How many tonnes of H₂SO₄ come from ${f(t)} t of sulfur at ${y}% yield?</p>`, answer: t * 98.08 / 32.06 * y / 100, tol: 0.005, unit: 't', solution: R`<p>${f(t * 98.08 / 32.06 * y / 100)} t.</p>` }; } }
  ]);
})();
