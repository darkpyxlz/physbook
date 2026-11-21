(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-solutions', subject: 'chemistry', num: 2, part: 'Foundations',
    title: 'Solutions and Concentration',
    subtitle: R`Most chemistry happens in solution. Concentration units, dilution, titration calculations, the colligative properties that depend only on how many particles are dissolved, and measuring concentration with light.`,
    goals: ['Convert between concentration units', 'Plan dilutions and standard solutions', 'Calculate concentrations from titrations', 'Use colligative properties to find molar masses', 'Apply the Beer–Lambert law'],
    sections: [
      {
        title: 'Concentration',
        html: R`
<p>The most common unit is <strong>molarity</strong> (amount concentration), $c = n/V$ in mol/L, written M. Others you will meet:</p>
<div class="table-wrap"><table><thead><tr><th>Unit</th><th>Definition</th><th>Notes</th></tr></thead><tbody>
<tr><td>Molarity $c$</td><td>mol solute per litre of solution</td><td>Changes slightly with temperature</td></tr>
<tr><td>Molality $b$</td><td>mol solute per kg of solvent</td><td>Temperature-independent; used for colligative properties</td></tr>
<tr><td>Mass concentration</td><td>g solute per litre</td><td>$= cM$</td></tr>
<tr><td>Mole fraction $x$</td><td>$n_i/n_{\text{total}}$</td><td>Dimensionless; used in Raoult's law</td></tr>
<tr><td>ppm, ppb</td><td>mass of solute per $10^6$ or $10^9$ masses of solution</td><td>Trace analysis; 1 ppm ≈ 1 mg/L in water</td></tr>
</tbody></table></div>`
      },
      {
        title: 'Dilution and standard solutions',
        html: R`
<p>Diluting adds solvent but not solute, so the amount is unchanged:</p>
<div class="key">$$c_1V_1 = c_2V_2.$$</div>
<p>A <strong>standard solution</strong> has an accurately known concentration. You weigh the solute, dissolve it, transfer quantitatively to a volumetric flask and make up to the mark. Primary standards (such as anhydrous sodium carbonate or potassium hydrogen phthalate) are pure, stable and not hygroscopic.</p>
<div class="warn-box"><p>Always add concentrated acid to water, never water to acid: the heat released can boil the small amount of water and spray acid.</p></div>`
      },
      {
        title: 'Titration calculations',
        html: R`
<p>In a titration, a solution of known concentration (the titrant) is added from a burette until it has exactly reacted with the sample. The mole ratio from the balanced equation links the two:</p>
$$n_{\text{titrant}} = c_tV_t,\qquad n_{\text{sample}} = n_{\text{titrant}}\times\frac{\nu_{\text{sample}}}{\nu_{\text{titrant}}}.$$
<details class="example"><summary><span class="lbl">Worked example</span>25.00 mL of NaOH needs 18.60 mL of 0.1050 M H₂SO₄ for neutralisation. Find [NaOH].<span class="tog">Solution</span></summary><div class="sol"><p>$\mathrm{H_2SO_4 + 2NaOH \to Na_2SO_4 + 2H_2O}$. $n(\mathrm{H_2SO_4}) = 1.953\times10^{-3}$ mol, so $n(\mathrm{NaOH}) = 3.906\times10^{-3}$ mol and $c = 0.1562\ \mathrm M$.</p></div></details>
<p>In a <strong>back titration</strong>, an excess of reagent is added to the sample (useful for insoluble or slow-reacting samples such as chalk), and the leftover excess is titrated. Amount reacted = amount added − amount left.</p>`
      },
      {
        title: 'Colligative properties',
        html: R`
<p>Some properties depend only on the number of dissolved particles, not their identity:</p>
<ul>
<li><strong>Vapour pressure lowering</strong> (Raoult's law): $p = x_{\text{solvent}}\,p^\circ$.</li>
<li><strong>Boiling point elevation</strong>: $\Delta T_b = iK_bb$.</li>
<li><strong>Freezing point depression</strong>: $\Delta T_f = iK_fb$ (for water $K_f = 1.86\ \mathrm{K\,kg/mol}$).</li>
<li><strong>Osmotic pressure</strong>: $\Pi = icRT$.</li>
</ul>
<p>The van 't Hoff factor $i$ counts particles per formula unit: 1 for glucose, about 2 for NaCl, about 3 for CaCl₂. That is why road salt and calcium chloride melt ice.</p>
<div class="insight"><p>Osmotic pressure is enormous for small concentrations, which makes it the most sensitive way to measure the molar mass of a large molecule such as a protein: a few grams per litre produce a measurable pressure, whereas the freezing point would barely move.</p></div>`
      },
      {
        title: 'Measuring concentration with light',
        html: R`
<p>A coloured solution absorbs light. The fraction transmitted falls exponentially with path length and concentration, which is the <strong>Beer–Lambert law</strong>:</p>
<div class="key">$$A = \log_{10}\frac{I_0}{I} = \varepsilon lc,$$</div>
<p>where $A$ is the absorbance, $\varepsilon$ the molar absorptivity (L mol⁻¹ cm⁻¹), $l$ the path length (cm) and $c$ the concentration. A calibration line of $A$ against known concentrations lets you read off an unknown. The law holds best for dilute solutions and absorbances below about 1.5.</p>`
      }
    ],
    labs: [
      { sim: 'beer', title: 'Spectrophotometer', desc: 'Light passes through a coloured solution. The absorbance grows linearly with concentration and path length.',
        tasks: ['Double the concentration. What happens to A, and to the transmitted fraction?', 'Measure an unknown and read its concentration from the calibration line.', 'At what absorbance does only 1% of the light get through?'] }
    ],
    formulas: [
      ['Molarity', R`c = n/V`],
      ['Dilution', R`c_1V_1 = c_2V_2`],
      ['Molality', R`b = n_{\text{solute}}/m_{\text{solvent}}`],
      ['Raoult’s law', R`p = x_{\text{solvent}}p^\circ`],
      ['Freezing point depression', R`\Delta T_f = iK_fb`],
      ['Boiling point elevation', R`\Delta T_b = iK_bb`],
      ['Osmotic pressure', R`\Pi = icRT`],
      ['Beer–Lambert law', R`A = \varepsilon lc`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Tenfold dilution', q: R`<p>10 mL of a solution is diluted to 100 mL. The concentration:</p>`, options: ['Is unchanged', 'Falls to one tenth', 'Falls to one hundredth', 'Rises tenfold'], answer: 1, hints: [R`$c_1V_1 = c_2V_2$.`], solution: R`<p>The same amount is spread through ten times the volume.</p>` },
      { level: 'concept', type: 'mcq', title: 'Best antifreeze', q: R`<p>Equal molalities of these solutes are dissolved in water. Which lowers the freezing point most?</p>`, options: ['Glucose', 'Sodium chloride', 'Calcium chloride', 'Ethanol'], answer: 2, hints: [R`Count dissolved particles per formula unit.`], solution: R`<p>CaCl₂ gives three ions ($i \approx 3$), NaCl two, glucose and ethanol one.</p>` },
      { level: 'concept', type: 'mcq', title: 'Absorbance', q: R`<p>For a dilute solution obeying the Beer–Lambert law, the absorbance doubles when:</p>`, options: ['The concentration doubles', 'The light intensity doubles', 'The wavelength doubles', 'The temperature doubles'], answer: 0, hints: [R`$A = \varepsilon lc$.`], solution: R`<p>$A$ is proportional to $c$ (and $l$), independent of the light intensity.</p>` },
      { level: 'core', type: 'num', title: 'Making a standard', q: R`<p>What mass of NaCl ($M = 58.44$) is needed to make 250.0 mL of a 0.200 M solution?</p>`, answer: 0.05 * 58.44, tol: 0.01, unit: 'g', hints: [R`$n = cV$.`], solution: R`<p>$n = 0.200 \times 0.2500 = 0.0500\ \mathrm{mol}$, mass $= 2.92\ \mathrm g$.</p>` },
      { level: 'core', type: 'num', title: 'Diluting acid', q: R`<p>What volume of 12.0 M hydrochloric acid is needed to make 500 mL of 0.150 M acid? Give the answer in mL.</p>`, answer: 0.15 * 500 / 12, tol: 0.01, unit: 'mL', hints: [R`$V_1 = c_2V_2/c_1$.`], solution: R`<p>$V_1 = 0.150(500)/12.0 = 6.25\ \mathrm{mL}$.</p>` },
      { level: 'core', type: 'num', title: 'Titrating a base', q: R`<p>25.00 mL of NaOH is neutralised by 18.60 mL of 0.1050 M H₂SO₄. What is the concentration of the NaOH?</p>`, answer: 2 * 0.105 * 18.6 / 25, tol: 0.01, unit: 'mol/L', hints: [R`Each H₂SO₄ neutralises two NaOH.`], solution: R`<p>$c = 2(0.1050)(18.60)/25.00 = 0.156\ \mathrm M$.</p>` },
      { level: 'core', type: 'num', title: 'Salty ice', q: R`<p>At what temperature does a solution of 0.100 mol NaCl in 1.00 kg of water freeze? ($K_f = 1.86\ \mathrm{K\,kg/mol}$, $i = 2$)</p>`, answer: -0.372, tol: 0.01, unit: '°C', hints: [R`$\Delta T_f = iK_fb$.`], solution: R`<p>$\Delta T_f = 2(1.86)(0.100) = 0.372\ \mathrm K$, so it freezes at $-0.372^\circ\mathrm C$.</p>` },
      { level: 'core', type: 'num', title: 'Reading a colour', q: R`<p>A solution of a dye ($\varepsilon = 6200\ \mathrm{L\,mol^{-1}cm^{-1}}$) has an absorbance of 0.420 in a 1.00 cm cell. Find its concentration.</p>`, answer: 0.42 / 6200, tol: 0.01, unit: 'mol/L', hints: [R`$c = A/(\varepsilon l)$.`], solution: R`<p>$c = 0.420/6200 = 6.77\times10^{-5}\ \mathrm M$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Weighing a protein', q: R`<p>2.00 g of a protein dissolved in water to make 100.0 mL of solution has an osmotic pressure of 0.0060 atm at 298 K. Estimate its molar mass. ($R = 0.08206\ \mathrm{L\,atm\,mol^{-1}K^{-1}}$)</p>`, answer: 2 * 0.08206 * 298 / (0.006 * 0.1), tol: 0.02, unit: 'g/mol', hints: [R`$\Pi = (m/M)RT/V$.`], solution: R`<p>$M = mRT/(\Pi V) = 2.00(0.08206)(298)/(0.0060\times0.100) = 8.2\times10^4\ \mathrm{g/mol}$. The same solution would freeze only 0.0005 K low.</p>` },
      { level: 'olympiad', type: 'num', title: 'Back titration of chalk', q: R`<p>0.500 g of impure CaCO₃ is dissolved in 50.0 mL of 0.200 M HCl. The excess acid needs 15.0 mL of 0.100 M NaOH. What percentage of the sample is CaCO₃ ($M = 100.09$)?</p>`, answer: 100 * (0.01 - 0.0015) / 2 * 100.09 / 0.5, tol: 0.01, unit: '%', hints: [R`HCl used by the chalk = HCl added − NaOH needed. CaCO₃ uses 2 HCl.`], solution: R`<p>HCl added $= 0.0100$ mol; excess $= 0.0015$ mol; used $= 0.0085$ mol; CaCO₃ $= 0.00425$ mol $= 0.425\ \mathrm g$, i.e. 85.1%.</p>` },
      { level: 'olympiad', type: 'num', title: 'Raoult’s law', q: R`<p>10.0 g of glucose ($M = 180.16$) is dissolved in 90.0 g of water at 25 °C, where pure water has a vapour pressure of 23.76 mmHg. What is the vapour pressure of the solution?</p>`, answer: 23.76 * (90 / 18.015) / (90 / 18.015 + 10 / 180.16), tol: 0.002, unit: 'mmHg', hints: [R`$p = x_{\text{water}}p^\circ$.`], solution: R`<p>$n(\mathrm{H_2O}) = 4.996$, $n(\text{glucose}) = 0.0555$, $x = 0.9890$, so $p = 23.50\ \mathrm{mmHg}$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-solutions', [
    { title: 'Dilution', gen(r) { const c1 = r.step(1, 18, 0.5), c2 = r.step(0.05, 1, 0.05), V2 = r.pick([100, 250, 500, 1000]); return { q: R`<p>What volume (mL) of $${c1}\ \mathrm M$ stock makes $${V2}\ \mathrm{mL}$ of $${c2}\ \mathrm M$ solution?</p>`, answer: c2 * V2 / c1, unit: 'mL', solution: R`<p>$V_1 = c_2V_2/c_1 = ${f(c2 * V2 / c1)}\ \mathrm{mL}$.</p>` }; } },
    { title: 'Molarity from mass', gen(r) { const c = r.pick([['NaCl', 58.44], ['KMnO₄', 158.03], ['NaOH', 40.00], ['CuSO₄', 159.61], ['glucose', 180.16]]), m = r.step(0.5, 30, 0.5), V = r.pick([100, 250, 500, 1000]); return { q: R`<p>$${m}\ \mathrm g$ of ${c[0]} ($M = ${c[1]}$) is dissolved to make $${V}\ \mathrm{mL}$. Find the concentration.</p>`, answer: m / c[1] / (V / 1000), unit: 'mol/L', solution: R`<p>$c = (m/M)/V = ${f(m / c[1] / (V / 1000))}\ \mathrm M$.</p>` }; } },
    { title: 'Acid–base titration', gen(r) { const Vb = r.pick([10, 20, 25]), ca = r.step(0.05, 0.2, 0.005), Va = r.step(10, 40, 0.05), dip = r.pick([1, 2]); return { q: R`<p>$${Vb}.0\ \mathrm{mL}$ of NaOH needs $${Va}\ \mathrm{mL}$ of $${ca}\ \mathrm M$ ${dip === 2 ? 'H₂SO₄' : 'HCl'}. Find [NaOH].</p>`, answer: dip * ca * Va / Vb, unit: 'mol/L', solution: R`<p>$c = ${dip}\times${ca}\times${Va}/${Vb} = ${f(dip * ca * Va / Vb)}\ \mathrm M$.</p>` }; } }
  ]);
})();
