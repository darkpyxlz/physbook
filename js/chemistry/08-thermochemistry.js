(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-thermo', subject: 'chemistry', num: 8, part: 'Physical Chemistry',
    title: 'Thermochemistry',
    subtitle: R`The energy changes of reactions. Enthalpy, calorimetry, Hess's law and enthalpies of formation, and estimating reaction energies from bond enthalpies.`,
    goals: ['Interpret the sign of ΔH', 'Calculate ΔH from calorimetry', 'Apply Hess’s law and formation enthalpies', 'Estimate ΔH from bond enthalpies', 'Correct ΔH for temperature (Kirchhoff)'],
    sections: [
      {
        title: 'Enthalpy',
        html: R`
<p>Most reactions run at constant pressure, where the heat exchanged equals the change in <strong>enthalpy</strong>, $q_p = \Delta H$. An <strong>exothermic</strong> reaction releases heat ($\Delta H \lt 0$, the surroundings warm); an <strong>endothermic</strong> one absorbs it ($\Delta H \gt 0$).</p>
<p>Enthalpies are tabulated for <strong>standard conditions</strong> (marked °): 1 bar, a stated temperature (usually 298 K), pure substances in their standard states, and 1 mol/L for solutions. ΔH scales with the amounts in the equation and flips sign when the equation is reversed.</p>`
      },
      {
        title: 'Calorimetry',
        html: R`
<p>In a coffee-cup calorimeter, the reaction heats or cools a known mass of water: $q = mc\Delta T$. For the reaction, $\Delta H = -q/n$. Because heat leaks during the experiment, the temperature–time graph is extrapolated back to the moment of mixing to find the true $\Delta T$.</p>
<p>A bomb calorimeter (constant volume) measures $\Delta U$ for combustions; $\Delta H = \Delta U + \Delta n_{\text{gas}}RT$.</p>
<details class="example"><summary><span class="lbl">Worked example</span>50.0 mL of 1.00 M HCl and 50.0 mL of 1.00 M NaOH, both at 21.0 °C, are mixed. The temperature rises to 27.8 °C. Find ΔH of neutralisation.<span class="tog">Solution</span></summary><div class="sol"><p>$q = 100\ \mathrm g \times 4.18 \times 6.8 = 2.84\ \mathrm{kJ}$ for 0.0500 mol water formed, so $\Delta H = -56.8\ \mathrm{kJ/mol}$.</p></div></details>`
      },
      {
        title: "Hess's law and enthalpies of formation",
        html: R`
<p>Enthalpy is a state function, so the enthalpy change of a reaction is the same whatever route is taken (<strong>Hess's law</strong>). Equations can be added and subtracted like algebra, along with their ΔH values.</p>
<p>The <strong>standard enthalpy of formation</strong> $\Delta_fH^\circ$ is the enthalpy change to make one mole of a compound from its elements in their standard states (zero for elements themselves). Then</p>
<div class="key">$$\Delta_rH^\circ = \sum\nu\,\Delta_fH^\circ(\text{products}) - \sum\nu\,\Delta_fH^\circ(\text{reactants}).$$</div>`
      },
      {
        title: 'Bond enthalpies',
        html: R`
<p>Breaking a bond always costs energy; forming one releases it. Using average <strong>bond enthalpies</strong> for gas-phase reactions:</p>
<div class="key">$$\Delta_rH \approx \sum(\text{bonds broken}) - \sum(\text{bonds formed}).$$</div>
<p>The answer is approximate because the strength of a bond depends on its surroundings (a C–H bond in methane differs from one in benzene). Comparing such an estimate with the real value reveals extra stabilisation, such as the resonance energy of benzene.</p>
<div class="insight"><p>Kirchhoff's law moves a reaction enthalpy to another temperature: $\Delta H(T_2) = \Delta H(T_1) + \Delta C_p(T_2 - T_1)$, where $\Delta C_p$ is the difference in heat capacities of products and reactants. Olympiad problems use it to connect data at 298 K with industrial conditions.</p></div>`
      }
    ],
    labs: [
      { sim: 'calorimeter', title: 'Coffee-cup calorimeter', desc: 'A reaction releases or absorbs heat in water that slowly exchanges heat with the room. Extrapolating the cooling line back to the moment of mixing recovers the true temperature change.',
        tasks: ['Run the neutralisation with no heat loss. Does the measured ΔH equal the true value?', 'Turn the heat exchange up. How far off would you be if you just used the peak temperature?', 'Try the cold pack. Why does the temperature fall?'] }
    ],
    formulas: [
      ['Heat absorbed by water', R`q = mc\Delta T`],
      ['Reaction enthalpy from calorimetry', R`\Delta H = -q/n`],
      ['From formation enthalpies', R`\Delta_rH^\circ = \sum\nu\Delta_fH^\circ_{\text{prod}} - \sum\nu\Delta_fH^\circ_{\text{react}}`],
      ['From bond enthalpies', R`\Delta_rH \approx \sum D_{\text{broken}} - \sum D_{\text{formed}}`],
      ['ΔH and ΔU', R`\Delta H = \Delta U + \Delta n_{\text{gas}}RT`],
      ['Kirchhoff’s law', R`\Delta H(T_2) = \Delta H(T_1) + \Delta C_p(T_2 - T_1)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Exothermic', q: R`<p>In an exothermic reaction:</p>`, options: ['ΔH > 0 and the surroundings cool', 'ΔH < 0 and the surroundings warm', 'ΔH < 0 and the surroundings cool', 'ΔH = 0'], answer: 1, hints: [R`Heat flows out of the system.`], solution: R`<p>The system loses enthalpy, which appears as heat in the surroundings.</p>` },
      { level: 'concept', type: 'mcq', title: 'Zero by definition', q: R`<p>Which has a standard enthalpy of formation of zero at 298 K?</p>`, options: ['H₂O(l)', 'O₃(g)', 'O₂(g)', 'CO₂(g)'], answer: 2, hints: [R`Elements in their standard states.`], solution: R`<p>O₂ is oxygen's standard state. Ozone is not, so its ΔfH° is +143 kJ/mol.</p>` },
      { level: 'concept', type: 'mcq', title: 'Breaking bonds', q: R`<p>Breaking a chemical bond is:</p>`, options: ['Always exothermic', 'Always endothermic', 'Exothermic for weak bonds', 'Neither'], answer: 1, hints: [R`Atoms in a bond are lower in energy than when separated.`], solution: R`<p>It always takes energy to pull bonded atoms apart; energy is released only when bonds form.</p>` },
      { level: 'core', type: 'num', title: 'Neutralisation', q: R`<p>50.0 mL of 1.00 M HCl and 50.0 mL of 1.00 M NaOH are mixed in a calorimeter and the temperature rises by 6.8 K. Taking the solution as 100 g with $c = 4.18\ \mathrm{J\,g^{-1}K^{-1}}$, find ΔH of neutralisation.</p>`, answer: -(100 * 4.18 * 6.8) / 0.05 / 1000, tol: 0.01, unit: 'kJ/mol', hints: [R`$q = mc\Delta T$; 0.0500 mol of water forms.`], solution: R`<p>$q = 2842\ \mathrm J$, $\Delta H = -2.842/0.0500 = -56.8\ \mathrm{kJ/mol}$.</p>` },
      { level: 'core', type: 'num', title: 'Burning methane', q: R`<p>Find ΔcH° of methane, $\mathrm{CH_4 + 2O_2 \to CO_2 + 2H_2O(l)}$, from ΔfH° (kJ/mol): CH₄ −74.8, CO₂ −393.5, H₂O(l) −285.8.</p>`, answer: -393.5 - 2 * 285.8 + 74.8, tol: 0.005, unit: 'kJ/mol', hints: [R`Products minus reactants.`], solution: R`<p>$-393.5 + 2(-285.8) - (-74.8) = -890.3\ \mathrm{kJ/mol}$.</p>` },
      { level: 'core', type: 'num', title: 'Hydrogen chloride', q: R`<p>Use bond enthalpies (kJ/mol: H–H 436, Cl–Cl 243, H–Cl 432) to estimate ΔH for $\mathrm{H_2 + Cl_2 \to 2HCl}$.</p>`, answer: 436 + 243 - 2 * 432, tol: 0.01, unit: 'kJ/mol', hints: [R`Broken minus formed.`], solution: R`<p>$679 - 864 = -185\ \mathrm{kJ/mol}$ (measured: −184.6).</p>` },
      { level: 'core', type: 'num', title: 'Energy in a gram of gas', q: R`<p>Methane releases 890.3 kJ/mol on combustion. How much energy is released by burning 1.00 g of it ($M = 16.04$)?</p>`, answer: 890.3 / 16.04, tol: 0.01, unit: 'kJ', hints: [R`Divide by the molar mass.`], solution: R`<p>$890.3/16.04 = 55.5\ \mathrm{kJ}$.</p>` },
      { level: 'core', type: 'num', title: 'Carbon monoxide', q: R`<p>Given C + O₂ → CO₂, ΔH = −393.5 kJ and CO + ½O₂ → CO₂, ΔH = −283.0 kJ, find ΔfH of CO.</p>`, answer: -393.5 + 283.0, tol: 0.005, unit: 'kJ/mol', hints: [R`Subtract the second equation from the first.`], solution: R`<p>$\mathrm{C + \tfrac12O_2 \to CO}$: $-393.5 - (-283.0) = -110.5\ \mathrm{kJ/mol}$. It cannot be measured directly because some CO₂ always forms.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ammonia when hot', q: R`<p>For $\mathrm{N_2 + 3H_2 \to 2NH_3}$, $\Delta H_{298} = -92.2\ \mathrm{kJ}$. Molar heat capacities (J/mol K): N₂ 29.1, H₂ 28.8, NH₃ 35.1. Estimate ΔH at 373 K.</p>`, answer: -92.2 + (2 * 35.1 - 29.1 - 3 * 28.8) * 75 / 1000, tol: 0.005, unit: 'kJ', hints: [R`$\Delta C_p = 2(35.1) - 29.1 - 3(28.8)$.`], solution: R`<p>$\Delta C_p = -45.3\ \mathrm{J/K}$, so $\Delta H_{373} = -92.2 - 45.3(75)/1000 = -95.6\ \mathrm{kJ}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Dissolving salt', q: R`<p>Find the enthalpy of solution of NaCl from: lattice dissociation enthalpy +787 kJ/mol; hydration enthalpies Na⁺ −406 and Cl⁻ −378 kJ/mol.</p>`, answer: 787 - 406 - 378, tol: 0.01, unit: 'kJ/mol', hints: [R`Break the lattice, then hydrate the gaseous ions.`], solution: R`<p>$787 - 406 - 378 = +3\ \mathrm{kJ/mol}$: barely endothermic. Salt dissolves anyway because entropy rises (next chapter).</p>` },
      { level: 'olympiad', type: 'num', title: 'Resonance energy of benzene', q: R`<p>Hydrogenating cyclohexene to cyclohexane releases 120 kJ/mol. Hydrogenating benzene to cyclohexane releases 208 kJ/mol. Estimate benzene's resonance (delocalisation) energy.</p>`, answer: 3 * 120 - 208, tol: 0.01, unit: 'kJ/mol', hints: [R`A hypothetical "cyclohexatriene" with three isolated double bonds would release 3 × 120.`], solution: R`<p>$360 - 208 = 152\ \mathrm{kJ/mol}$ more stable than three isolated C=C bonds. This is the energetic signature of aromaticity.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-thermo', [
    { title: 'Calorimetry', gen(r) { const m = r.int(50, 250), dT = r.step(1, 15, 0.1), n = r.step(0.01, 0.1, 0.005); const dH = -(m * 4.18 * dT) / n / 1000; return { q: R`<p>A reaction of $${n}$ mol warms $${m}\ \mathrm g$ of water by $${dT}\ \mathrm K$. Find ΔH (kJ/mol).</p>`, answer: dH, unit: 'kJ/mol', solution: R`<p>$q = mc\Delta T = ${f(m * 4.18 * dT)}\ \mathrm J$; $\Delta H = -q/n = ${f(dH)}\ \mathrm{kJ/mol}$.</p>` }; } },
    { title: 'Combustion from formation data', gen(r) { const c = r.pick([['ethane C₂H₆', -84.7, 2, 3], ['propane C₃H₈', -103.8, 3, 4], ['ethanol C₂H₅OH(l)', -277.7, 2, 3], ['methanol CH₃OH(l)', -238.7, 1, 2], ['butane C₄H₁₀', -125.6, 4, 5]]); const H = c[2] * -393.5 + c[3] * -285.8 - c[1]; return { q: R`<p>Find ΔcH° (kJ/mol) of ${c[0]} (ΔfH° = ${c[1]}) given ΔfH°: CO₂ −393.5, H₂O(l) −285.8.</p>`, answer: H, tol: 0.005, unit: 'kJ/mol', solution: R`<p>${c[2]} CO₂ + ${c[3]} H₂O: $${f(H)}\ \mathrm{kJ/mol}$.</p>` }; } },
    { title: 'Bond enthalpy estimate', gen(r) { const c = r.pick([['H₂ + F₂ → 2HF', 436 + 158 - 2 * 568], ['H₂ + Br₂ → 2HBr (gas)', 436 + 193 - 2 * 366], ['C₂H₄ + H₂ → C₂H₆', 614 + 436 - 348 - 2 * 413], ['2H₂ + O₂ → 2H₂O (gas)', 2 * 436 + 498 - 4 * 463], ['N₂ + 3H₂ → 2NH₃', 945 + 3 * 436 - 6 * 391]]); return { q: R`<p>Estimate ΔH (kJ/mol) for ${c[0]} using bond enthalpies H–H 436, F–F 158, Br–Br 193, H–F 568, H–Br 366, C=C 614, C–C 348, C–H 413, O=O 498, O–H 463, N≡N 945, N–H 391.</p>`, answer: c[1], tol: 0.01, unit: 'kJ/mol', solution: R`<p>Broken − formed $= ${c[1]}\ \mathrm{kJ/mol}$.</p>` }; } }
  ]);
})();
