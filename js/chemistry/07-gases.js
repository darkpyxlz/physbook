(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-gases', subject: 'chemistry', num: 7, part: 'Physical Chemistry',
    title: 'Gases',
    subtitle: R`The simplest state of matter. Gas laws and the ideal gas equation, partial pressures, gas stoichiometry, effusion, and the real gases that condense into liquids.`,
    goals: ['Use the ideal gas equation in any units', 'Apply Dalton’s law of partial pressures', 'Do stoichiometry with gas volumes', 'Use Graham’s law', 'Explain deviations with the van der Waals equation'],
    sections: [
      {
        title: 'The gas laws',
        html: R`
<p>Boyle ($PV$ constant at fixed $T$), Charles ($V \propto T$ at fixed $P$) and Avogadro ($V \propto n$) combine into the <strong>ideal gas equation</strong>:</p>
<div class="key">$$PV = nRT,\qquad R = 8.314\ \mathrm{J\,mol^{-1}K^{-1}} = 0.08206\ \mathrm{L\,atm\,mol^{-1}K^{-1}} = 0.08314\ \mathrm{L\,bar\,mol^{-1}K^{-1}}.$$</div>
<p>Always use kelvin. Rearranged, it gives density and molar mass: $\rho = PM/(RT)$, so a gas's molar mass can be found by weighing a known volume.</p>`
      },
      {
        title: 'Mixtures and partial pressures',
        html: R`
<p>In a mixture, each gas behaves as if alone. Its <strong>partial pressure</strong> is the pressure it would exert by itself, and Dalton's law says they add:</p>
<div class="key">$$P_{\text{total}} = \sum P_i,\qquad P_i = x_iP_{\text{total}}.$$</div>
<p>When a gas is collected over water, it is saturated with water vapour, so the dry gas pressure is $P_{\text{gas}} = P_{\text{atm}} - P_{\mathrm{H_2O}}$.</p>
<p>For gas stoichiometry, at the same temperature and pressure volumes are in the same ratio as moles: 1 L of N₂ reacts with 3 L of H₂ to give 2 L of NH₃.</p>`
      },
      {
        title: 'Molecular speeds and effusion',
        html: R`
<p>Kinetic theory (see Physics, Chapter 11) gives molecular speeds $v_{\text{rms}} = \sqrt{3RT/M}$. Lighter molecules move faster. <strong>Effusion</strong> through a tiny hole, and roughly diffusion too, follow Graham's law:</p>
<div class="key">$$\frac{\text{rate}_1}{\text{rate}_2} = \sqrt{\frac{M_2}{M_1}}.$$</div>
<p>The Manhattan Project enriched uranium this way: $^{235}\mathrm{UF_6}$ effuses only 0.4% faster than $^{238}\mathrm{UF_6}$, so thousands of stages were needed.</p>`
      },
      {
        title: 'Real gases',
        html: R`
<p>Real molecules attract each other and occupy space. The <strong>van der Waals equation</strong> corrects for both:</p>
<div class="key">$$\left(P + \frac{an^2}{V^2}\right)(V - nb) = nRT.$$</div>
<p>$a$ measures attraction (large for polar, polarisable gases) and $b$ the excluded volume. The <strong>compressibility factor</strong> $Z = PV/(nRT)$ is 1 for an ideal gas; attractions make it less than 1 at moderate pressure, and repulsions make it greater at high pressure.</p>
<p>Below its <strong>critical temperature</strong> $T_c = 8a/(27Rb)$ a gas can be liquefied by pressure alone. Above it, no amount of pressure makes a separate liquid: the substance is a supercritical fluid, used for example in decaffeinating coffee with CO₂.</p>`
      }
    ],
    labs: [
      { sim: 'vdw', title: 'Real-gas isotherms', desc: 'Pressure against molar volume for an ideal gas (dashed) and a van der Waals gas (solid).',
        tasks: ['For CO₂, find the critical temperature. What happens to the curve below it?', 'Compare He and H₂O at 400 K. Which is more ideal and why?', 'At large volume, do all gases look ideal?'] }
    ],
    formulas: [
      ['Ideal gas', R`PV = nRT`],
      ['Gas density', R`\rho = PM/(RT)`],
      ['Dalton’s law', R`P_i = x_iP`],
      ['Graham’s law', R`r_1/r_2 = \sqrt{M_2/M_1}`],
      ['van der Waals', R`(P + an^2/V^2)(V - nb) = nRT`],
      ['Critical temperature', R`T_c = 8a/(27Rb)`],
      ['Compressibility factor', R`Z = PV/(nRT)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Boyle’s law', q: R`<p>At constant temperature, the pressure on a gas is doubled. Its volume:</p>`, options: ['Doubles', 'Halves', 'Is unchanged', 'Quarters'], answer: 1, hints: [R`$PV$ is constant.`], solution: R`<p>$V \propto 1/P$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Fastest effusion', q: R`<p>Which gas effuses fastest at the same temperature?</p>`, options: ['H₂', 'He', 'CH₄', 'O₂'], answer: 0, hints: [R`Rate $\propto 1/\sqrt M$.`], solution: R`<p>H₂ has the smallest molar mass.</p>` },
      { level: 'concept', type: 'mcq', title: 'When gases misbehave', q: R`<p>Real gases deviate most from ideal behaviour at:</p>`, options: ['Low pressure and high temperature', 'High pressure and low temperature', 'Low pressure and low temperature', 'High temperature only'], answer: 1, hints: [R`When are molecules close together and slow?`], solution: R`<p>Crowded, slow molecules feel their attractions and their own volume.</p>` },
      { level: 'core', type: 'num', title: 'Volume of a gas', q: R`<p>What volume do 2.00 mol of an ideal gas occupy at 300 K and 1.00 atm?</p>`, answer: 2 * 0.08206 * 300, tol: 0.01, unit: 'L', hints: [R`$V = nRT/P$ with $R = 0.08206$.`], solution: R`<p>$V = 2.00(0.08206)(300)/1.00 = 49.2\ \mathrm L$.</p>` },
      { level: 'core', type: 'num', title: 'Partial pressure', q: R`<p>A cylinder contains 1.5 mol N₂ and 0.5 mol O₂ at a total pressure of 2.4 atm. What is the partial pressure of O₂?</p>`, answer: 0.6, tol: 0.01, unit: 'atm', hints: [R`$x(\mathrm{O_2}) = 0.25$.`], solution: R`<p>$P = 0.25 \times 2.4 = 0.60\ \mathrm{atm}$.</p>` },
      { level: 'core', type: 'num', title: 'Identify by density', q: R`<p>A gas has density 1.96 g/L at 0 °C and 1.00 atm. What is its molar mass?</p>`, answer: 1.96 * 0.08206 * 273.15, tol: 0.01, unit: 'g/mol', hints: [R`$M = \rho RT/P$.`], solution: R`<p>$M = 1.96(0.08206)(273.15) = 43.9\ \mathrm{g/mol}$: carbon dioxide.</p>` },
      { level: 'core', type: 'num', title: 'Graham’s law', q: R`<p>How many times faster does helium ($M = 4.003$) effuse than methane ($M = 16.04$)?</p>`, answer: Math.sqrt(16.04 / 4.003), tol: 0.01, unit: '', hints: [R`$\sqrt{M_2/M_1}$.`], solution: R`<p>$\sqrt{16.04/4.003} = 2.00$.</p>` },
      { level: 'core', type: 'num', title: 'Oxygen from chlorate', q: R`<p>12.25 g of KClO₃ ($M = 122.55$) decomposes: $2\mathrm{KClO_3 \to 2KCl + 3O_2}$. What volume of O₂ forms at 0 °C and 1 atm (22.4 L/mol)?</p>`, answer: 12.25 / 122.55 * 1.5 * 22.414, tol: 0.01, unit: 'L', hints: [R`0.100 mol KClO₃ gives 0.150 mol O₂.`], solution: R`<p>$0.150 \times 22.4 = 3.36\ \mathrm L$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Squeezed CO₂', q: R`<p>Use the van der Waals equation to find the pressure (bar) of 1.00 mol CO₂ in 0.500 L at 300 K ($a = 3.640\ \mathrm{L^2\,bar\,mol^{-2}}$, $b = 0.04267\ \mathrm{L/mol}$, $R = 0.08314\ \mathrm{L\,bar\,mol^{-1}K^{-1}}$).</p>`, answer: 0.08314 * 300 / (0.5 - 0.04267) - 3.64 / 0.25, tol: 0.01, unit: 'bar', hints: [R`$P = nRT/(V - nb) - an^2/V^2$.`], solution: R`<p>$P = 24.94/0.4573 - 14.56 = 40.0\ \mathrm{bar}$, versus 49.9 bar for an ideal gas. Attractions dominate here.</p>` },
      { level: 'olympiad', type: 'num', title: 'Critical point of nitrogen', q: R`<p>For N₂, $a = 1.370\ \mathrm{L^2\,bar\,mol^{-2}}$ and $b = 0.0387\ \mathrm{L/mol}$. Predict its critical temperature.</p>`, answer: 8 * 1.37 / (27 * 0.08314 * 0.0387), tol: 0.01, unit: 'K', hints: [R`$T_c = 8a/(27Rb)$.`], solution: R`<p>$T_c = 126\ \mathrm K$, which matches experiment. Nitrogen cannot be liquefied by pressure at room temperature.</p>` },
      { level: 'olympiad', type: 'num', title: 'Hydrogen over water', q: R`<p>0.250 g of magnesium ($M = 24.31$) reacts with excess acid. The hydrogen is collected over water at 25 °C and a total pressure of 1.000 atm; water's vapour pressure is 23.8 mmHg. What volume of gas is collected, in mL?</p>`, answer: (0.25 / 24.305) * 0.08206 * 298.15 / ((760 - 23.8) / 760) * 1000, tol: 0.01, unit: 'mL', hints: [R`$\mathrm{Mg + 2H^+ \to Mg^{2+} + H_2}$. Dry H₂ pressure $= 760 - 23.8\ \mathrm{mmHg}$.`], solution: R`<p>$n(\mathrm{H_2}) = 0.01029$ mol, $P = 0.9687$ atm, $V = nRT/P = 260\ \mathrm{mL}$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-gases', [
    { title: 'Ideal gas volume', gen(r) { const n = r.step(0.1, 5, 0.1), T = r.int(250, 600), P = r.step(0.5, 5, 0.1); return { q: R`<p>Find the volume of $${n}$ mol of gas at $${T}\ \mathrm K$ and $${P}\ \mathrm{atm}$.</p>`, answer: n * 0.08206 * T / P, unit: 'L', solution: R`<p>$V = nRT/P = ${f(n * 0.08206 * T / P)}\ \mathrm L$.</p>` }; } },
    { title: 'Molar mass from density', gen(r) { const g = r.pick([['N₂', 28.01], ['O₂', 32.00], ['CO₂', 44.01], ['Ar', 39.95], ['SO₂', 64.07], ['CH₄', 16.04]]), T = r.int(273, 400); const rho = g[1] / (0.08206 * T); return { q: R`<p>A gas has density $${f(rho)}\ \mathrm{g/L}$ at $${T}\ \mathrm K$ and 1.00 atm. Find its molar mass.</p>`, answer: +f(rho) * 0.08206 * T, unit: 'g/mol', solution: R`<p>$M = \rho RT/P = ${f(+f(rho) * 0.08206 * T)}\ \mathrm{g/mol}$ (${g[0]}).</p>` }; } },
    { title: 'Partial pressure', gen(r) { const a = r.step(0.5, 5, 0.5), b = r.step(0.5, 5, 0.5), P = r.step(1, 10, 0.5); return { q: R`<p>A mixture of $${a}$ mol A and $${b}$ mol B has total pressure $${P}\ \mathrm{bar}$. Find the partial pressure of A.</p>`, answer: P * a / (a + b), unit: 'bar', solution: R`<p>$P_A = x_AP = ${f(P * a / (a + b))}\ \mathrm{bar}$.</p>` }; } }
  ]);
})();
