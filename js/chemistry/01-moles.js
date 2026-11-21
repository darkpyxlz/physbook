(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-moles', subject: 'chemistry', num: 1, part: 'Foundations',
    title: 'Atoms, Moles and Stoichiometry',
    subtitle: R`Counting atoms by weighing them. Isotopes and relative atomic mass, the mole, formulae from experimental data, balanced equations, limiting reagents and yields.`,
    goals: ['Use relative atomic masses and isotopes', 'Convert between mass, moles and particles', 'Find empirical and molecular formulae', 'Identify the limiting reagent', 'Calculate theoretical and percentage yields'],
    sections: [
      {
        title: 'Atoms, isotopes and relative atomic mass',
        html: R`
<p>An atom has a tiny nucleus of protons and neutrons surrounded by electrons. The number of protons, the <strong>atomic number</strong> $Z$, defines the element; protons plus neutrons give the <strong>mass number</strong> $A$. Atoms of the same element with different numbers of neutrons are <strong>isotopes</strong>, written $^{A}_{Z}\mathrm X$, such as $^{35}\mathrm{Cl}$ and $^{37}\mathrm{Cl}$. Isotopes have the same chemistry because chemistry is about electrons.</p>
<p>Atomic masses are measured relative to carbon-12, which is defined as exactly 12 u. The <strong>relative atomic mass</strong> $A_r$ printed on the periodic table is the abundance-weighted average over the natural isotopes:</p>
<div class="key">$$A_r = \sum_i x_i\,m_i,$$</div>
<p>where $x_i$ is the fractional abundance and $m_i$ the isotopic mass. Chlorine is about 76% $^{35}\mathrm{Cl}$ and 24% $^{37}\mathrm{Cl}$, giving $A_r = 35.45$. A mass spectrometer measures these abundances directly.</p>`
      },
      {
        title: 'The mole',
        html: R`
<p>Chemists count atoms in moles. One mole is exactly $N_A = 6.022\,140\,76\times10^{23}$ entities. The mass of one mole of a substance in grams equals its relative formula mass, so</p>
<div class="key">$$n = \frac{m}{M},\qquad N = nN_A,$$</div>
<p>with $n$ in mol, $m$ in g and molar mass $M$ in g/mol. Water has $M = 18.02\ \mathrm{g/mol}$: 18 g of water contains $6.02\times10^{23}$ molecules, and three times as many atoms.</p>
<p>For gases at the same temperature and pressure, equal volumes contain equal numbers of molecules (Avogadro's law). At $0^\circ\mathrm C$ and 1 atm one mole occupies $22.4\ \mathrm L$; at $25^\circ\mathrm C$ and 1 bar about $24.8\ \mathrm L$.</p>
<details class="example"><summary><span class="lbl">Worked example</span>How many oxygen atoms are in 5.00 g of calcium carbonate, CaCO₃?<span class="tog">Solution</span></summary><div class="sol"><p>$M = 40.08 + 12.01 + 3(16.00) = 100.09\ \mathrm{g/mol}$, so $n = 0.0500\ \mathrm{mol}$. Each formula unit has 3 O atoms: $3 \times 0.0500 \times 6.022\times10^{23} = 9.03\times10^{22}$ atoms.</p></div></details>`
      },
      {
        title: 'Formulae from experimental data',
        html: R`
<p>The <strong>empirical formula</strong> gives the simplest whole-number ratio of atoms; the <strong>molecular formula</strong> gives the actual numbers. Glucose, C₆H₁₂O₆, has empirical formula CH₂O.</p>
<p>To find an empirical formula from percentage composition: assume 100 g, convert each mass to moles, divide by the smallest, and round to a whole-number ratio (multiplying through if you get halves or thirds). The molecular formula is then a whole multiple of the empirical one, fixed by the molar mass.</p>
<p>In <strong>combustion analysis</strong>, an organic compound is burned in excess oxygen. All its carbon ends up in CO₂ and all its hydrogen in H₂O; oxygen is found by difference.</p>
<div class="warn-box"><p>Do not round too early. A ratio of 1 : 1.33 means 3 : 4, not 1 : 1. Keep three or four significant figures until the last step.</p></div>`
      },
      {
        title: 'Equations, limiting reagents and yield',
        html: R`
<p>A balanced equation conserves atoms of every element (and charge, for ionic equations). Its coefficients are <strong>mole ratios</strong>: in $\mathrm{N_2 + 3H_2 \to 2NH_3}$, one mole of nitrogen reacts with three of hydrogen to make two of ammonia.</p>
<p>When reactants are not mixed in exactly that ratio, one runs out first: the <strong>limiting reagent</strong>. Divide each reactant's moles by its coefficient; the smallest result is the extent of reaction $\xi$, and that reactant limits:</p>
<div class="key">$$\xi = \min_i \frac{n_i}{\nu_i},\qquad n_{\text{product}} = \nu_{\text{product}}\,\xi.$$</div>
<p>The mass of product predicted this way is the <strong>theoretical yield</strong>. Real reactions give less (side reactions, incomplete reaction, losses on purification), so</p>
$$\text{percentage yield} = \frac{\text{actual mass}}{\text{theoretical mass}}\times100\%.$$
<p><strong>Atom economy</strong>, the fraction of reactant mass ending up in the desired product, measures how wasteful a route is even at 100% yield. It is central to green chemistry.</p>
<div class="insight"><p>Olympiad stoichiometry problems are usually puzzles in disguise: an unknown metal identified from a mass change, a mixture analysed by two measurements. Write one equation per measured quantity, one unknown per species, and solve the simultaneous equations.</p></div>`
      }
    ],
    labs: [
      { sim: 'stoich', title: 'Limiting-reagent mixer', desc: 'Choose a reaction and the moles of each reactant. Bars compare amounts before (pale) and after (solid) the reaction goes to completion.',
        tasks: ['For N₂ + 3H₂, find the mixture with nothing left over.', 'Make hydrogen the limiting reagent. Which reactant is left, and how much?', 'For propane combustion, how many moles of O₂ does 1 mol of propane need?'] }
    ],
    formulas: [
      ['Relative atomic mass', R`A_r = \sum x_im_i`],
      ['Amount from mass', R`n = m/M`],
      ['Number of particles', R`N = nN_A`],
      ['Molar gas volume (STP)', R`V_m = 22.4\ \mathrm{L/mol}`],
      ['Extent of reaction', R`\xi = \min(n_i/\nu_i)`],
      ['Percentage yield', R`\frac{m_{\text{actual}}}{m_{\text{theoretical}}}\times100\%`],
      ['Atom economy', R`\frac{M_{\text{desired product}}}{\sum M_{\text{reactants}}}\times100\%`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Atoms in water', q: R`<p>How many atoms are in one mole of water molecules?</p>`, options: [R`$N_A$`, R`$2N_A$`, R`$3N_A$`, R`$18N_A$`], answer: 2, hints: [R`Each H₂O molecule has three atoms.`], solution: R`<p>One mole of molecules is $N_A$ molecules, each with 2 H and 1 O: $3N_A$ atoms.</p>` },
      { level: 'concept', type: 'mcq', title: 'Most molecules', q: R`<p>Which sample contains the most molecules?</p>`, options: ['1 g of H₂', '1 g of O₂', '1 g of CO₂', '1 g of H₂O'], answer: 0, hints: [R`Same mass: the lightest molecule gives the most moles.`], solution: R`<p>$n = m/M$, and H₂ has by far the smallest molar mass (2.0 g/mol), so 1 g is 0.5 mol.</p>` },
      { level: 'concept', type: 'mcq', title: 'Isotopes', q: R`<p>Two isotopes of an element differ in:</p>`, options: ['Number of protons', 'Number of neutrons', 'Number of electrons in the neutral atom', 'Chemical properties'], answer: 1, hints: [R`Same element means same $Z$.`], solution: R`<p>Isotopes have the same number of protons (and electrons when neutral) but different numbers of neutrons, so their chemistry is almost identical.</p>` },
      { level: 'core', type: 'num', title: 'Chlorine', q: R`<p>Chlorine is 75.78% $^{35}\mathrm{Cl}$ (mass 34.969 u) and 24.22% $^{37}\mathrm{Cl}$ (mass 36.966 u). Find its relative atomic mass.</p>`, answer: 0.7578 * 34.969 + 0.2422 * 36.966, tol: 0.001, unit: '', hints: [R`Weighted average.`], solution: R`<p>$A_r = 0.7578(34.969) + 0.2422(36.966) = 35.45$.</p>` },
      { level: 'core', type: 'num', title: 'Moles of chalk', q: R`<p>How many moles are in $10.0\ \mathrm g$ of calcium carbonate ($M = 100.09\ \mathrm{g/mol}$)?</p>`, answer: 10 / 100.09, tol: 0.01, unit: 'mol', hints: [R`$n = m/M$.`], solution: R`<p>$n = 10.0/100.09 = 0.0999\ \mathrm{mol}$.</p>` },
      { level: 'core', type: 'num', title: 'From composition to formula', q: R`<p>A sugar is 40.0% C, 6.7% H and 53.3% O by mass, and its molar mass is about 180 g/mol. How many carbon atoms are in one molecule?</p>`, answer: 6, tol: 0.001, unit: '', hints: [R`In 100 g: 3.33 mol C, 6.65 mol H, 3.33 mol O.`, R`The empirical formula CH₂O has $M = 30$.`], solution: R`<p>The ratio is 1 : 2 : 1, so the empirical formula is CH₂O (30 g/mol). $180/30 = 6$, so the molecular formula is C₆H₁₂O₆ with 6 carbons.</p>` },
      { level: 'core', type: 'num', title: 'Making water', q: R`<p>$10.0\ \mathrm g$ of hydrogen and $64.0\ \mathrm g$ of oxygen react to form water. What mass of water forms? ($M$: H₂ 2.016, O₂ 32.00, H₂O 18.02)</p>`, answer: 4 * 18.015, tol: 0.01, unit: 'g', hints: [R`$2\mathrm{H_2} + \mathrm{O_2} \to 2\mathrm{H_2O}$. Compare $n(\mathrm{H_2})/2$ with $n(\mathrm{O_2})/1$.`], solution: R`<p>$n(\mathrm{H_2}) = 4.96\ \mathrm{mol}$ and $n(\mathrm{O_2}) = 2.00\ \mathrm{mol}$. Oxygen limits ($\xi = 2.00$), giving 4.00 mol water $= 72.1\ \mathrm g$. Hydrogen is left over.</p>` },
      { level: 'core', type: 'num', title: 'Aspirin yield', q: R`<p>$5.00\ \mathrm g$ of salicylic acid ($M = 138.12$) is converted into aspirin ($M = 180.16$) with a 1 : 1 mole ratio. $5.20\ \mathrm g$ of aspirin is collected. What is the percentage yield?</p>`, answer: 100 * 5.2 / (5 / 138.12 * 180.16), tol: 0.01, unit: '%', hints: [R`Theoretical mass $= (5.00/138.12)\times180.16$.`], solution: R`<p>Theoretical yield $= 6.52\ \mathrm g$, so the yield is $5.20/6.52 = 79.7\%$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Baking soda mixture', q: R`<p>A 1.00 g mixture of NaHCO₃ and Na₂CO₃ is heated until its mass is constant. Only the hydrogencarbonate decomposes: $2\mathrm{NaHCO_3} \to \mathrm{Na_2CO_3} + \mathrm{H_2O} + \mathrm{CO_2}$. The mass falls by 0.124 g. What percentage of the mixture was NaHCO₃? ($M$: NaHCO₃ 84.01, H₂O 18.02, CO₂ 44.01)</p>`, answer: 100 * 0.124 * 2 * 84.01 / 62.03, tol: 0.01, unit: '%', hints: [R`Every 2 mol NaHCO₃ lose one H₂O and one CO₂: 62.03 g.`], solution: R`<p>Moles of NaHCO₃ $= 2 \times 0.124/62.03 = 4.00\times10^{-3}$, mass $= 0.336\ \mathrm g$, so 33.6%.</p>` },
      { level: 'olympiad', type: 'num', title: 'Blue vitriol', q: R`<p>Heating 2.50 g of hydrated copper(II) sulfate, CuSO₄·xH₂O, leaves 1.60 g of anhydrous CuSO₄ ($M = 159.61$). Find $x$.</p>`, answer: (0.9 / 18.015) / (1.6 / 159.61), tol: 0.03, unit: '', hints: [R`Water lost $= 0.90\ \mathrm g$.`], solution: R`<p>$n(\mathrm{H_2O}) = 0.0500$, $n(\mathrm{CuSO_4}) = 0.0100$, so $x = 5.0$: CuSO₄·5H₂O.</p>` },
      { level: 'olympiad', type: 'num', title: 'Combustion analysis', q: R`<p>Burning 0.2500 g of a compound containing only C, H and O gives 0.3664 g CO₂ and 0.1500 g H₂O. Its molar mass is 60 g/mol. How many hydrogen atoms are in one molecule?</p>`, answer: 4, tol: 0.001, unit: '', hints: [R`Mass of C $= 0.3664 \times 12.011/44.01$; mass of H $= 0.1500 \times 2.016/18.02$; O by difference.`], solution: R`<p>C: 0.1000 g (8.33 mmol); H: 0.0168 g (16.7 mmol); O: 0.1332 g (8.33 mmol). Empirical formula CH₂O (30 g/mol), so the molecular formula is C₂H₄O₂ (ethanoic acid), with 4 hydrogens.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  const CMP = [['water H₂O', 18.02], ['sodium chloride NaCl', 58.44], ['glucose C₆H₁₂O₆', 180.16], ['carbon dioxide CO₂', 44.01], ['ammonia NH₃', 17.03], ['sulfuric acid H₂SO₄', 98.08], ['calcium carbonate CaCO₃', 100.09], ['ethanol C₂H₅OH', 46.07]];
  PB.addDrills('chem-moles', [
    { title: 'Mass to moles', gen(r) { const c = r.pick(CMP), m = r.step(1, 200, 0.5); return { q: R`<p>How many moles are in $${m}\ \mathrm g$ of ${c[0]} ($M = ${c[1]}\ \mathrm{g/mol}$)?</p>`, answer: m / c[1], unit: 'mol', solution: R`<p>$n = m/M = ${f(m / c[1])}\ \mathrm{mol}$.</p>` }; } },
    { title: 'Particles from mass', gen(r) { const c = r.pick(CMP), m = r.step(1, 50, 0.5); return { q: R`<p>How many molecules (formula units) are in $${m}\ \mathrm g$ of ${c[0]} ($M = ${c[1]}$)?</p>`, answer: m / c[1] * 6.022e23, unit: '', solution: R`<p>$N = (m/M)N_A = ${f(m / c[1] * 6.022e23)}$.</p>` }; } },
    { title: 'Product from limiting reagent', gen(r) { const a = r.step(1, 10, 0.5), b = r.step(1, 20, 0.5); const xi = Math.min(a / 1, b / 3); return { q: R`<p>$${a}$ mol N₂ reacts with $${b}$ mol H₂ ($\mathrm{N_2 + 3H_2 \to 2NH_3}$). How many moles of NH₃ form?</p>`, answer: 2 * xi, unit: 'mol', solution: R`<p>$\xi = \min(${a}/1, ${b}/3) = ${f(xi)}$, so $n(\mathrm{NH_3}) = 2\xi = ${f(2 * xi)}\ \mathrm{mol}$.</p>` }; } }
  ]);
})();
