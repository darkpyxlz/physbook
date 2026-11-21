(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-maingroup', subject: 'chemistry', num: 15, part: 'Inorganic Chemistry',
    title: 'Main-Group Chemistry',
    subtitle: R`The s- and p-block elements: reactive metals, the trends of period 3 oxides and chlorides, the halogens and noble gases, and how metals are extracted from their ores.`,
    goals: ['Explain s-block reactivity and solubility trends', 'Classify period 3 oxides as basic, amphoteric or acidic', 'Predict halogen displacement reactions', 'Use Ellingham diagrams for extraction', 'Recognise the inert-pair effect'],
    sections: [
      {
        title: 'The s-block',
        html: R`
<p>Group 1 and 2 metals have one or two loosely held valence electrons. Reactivity increases down each group as the ionisation energy falls: lithium fizzes in water, potassium ignites the hydrogen it releases, and caesium explodes. Each gives a characteristic flame colour as excited electrons fall back (Li red, Na yellow, K lilac, Ca orange-red, Sr crimson, Ba green).</p>
<p>Group 2 trends you should know:</p>
<ul>
<li>Hydroxides become <strong>more</strong> soluble down the group (Mg(OH)₂ is barely soluble; Ba(OH)₂ is quite soluble).</li>
<li>Sulfates become <strong>less</strong> soluble (BaSO₄ is so insoluble it is swallowed safely for X-ray imaging).</li>
<li>Carbonates and nitrates need <strong>higher</strong> temperatures to decompose down the group. Small, highly charged cations such as Mg²⁺ polarise the carbonate ion and weaken it.</li>
</ul>`
      },
      {
        title: 'Period 3: oxides and chlorides',
        html: R`
<p>Across period 3, bonding changes from ionic to covalent, and the oxides change from basic to acidic:</p>
<div class="table-wrap"><table><thead><tr><th>Oxide</th><th>Bonding</th><th>With water</th><th>Character</th></tr></thead><tbody>
<tr><td>Na₂O, MgO</td><td>ionic lattice</td><td>NaOH (pH 14), Mg(OH)₂ (pH 9)</td><td>basic</td></tr>
<tr><td>Al₂O₃</td><td>ionic with covalent character</td><td>insoluble</td><td>amphoteric</td></tr>
<tr><td>SiO₂</td><td>giant covalent</td><td>insoluble</td><td>weakly acidic</td></tr>
<tr><td>P₄O₁₀, SO₂, SO₃</td><td>molecular</td><td>H₃PO₄, H₂SO₃, H₂SO₄</td><td>acidic</td></tr>
</tbody></table></div>
<p>Chlorides follow suit: NaCl dissolves to a neutral solution, while AlCl₃, SiCl₄ and PCl₅ hydrolyse violently to give HCl fumes.</p>`
      },
      {
        title: 'Halogens and noble gases',
        html: R`
<p>Halogens are strong oxidising agents whose strength falls down the group (F₂ > Cl₂ > Br₂ > I₂). A halogen displaces any halide below it: chlorine water turns bromide solutions orange. Halide ions become better reducing agents down the group, which is why concentrated sulfuric acid oxidises HBr and HI but not HCl.</p>
<p>The noble gases were once thought inert, but xenon forms fluorides (XeF₂, XeF₄, XeF₆) and oxides, because its outer electrons are far enough from the nucleus to be pulled by fluorine. VSEPR predicts their shapes perfectly.</p>
<p>Heavier p-block elements prefer an oxidation state two below the group maximum (Tl⁺, Pb²⁺, Bi³⁺): the <strong>inert-pair effect</strong>, as the ns² pair becomes harder to involve in bonding.</p>`
      },
      {
        title: 'Extracting metals',
        html: R`
<p>Unreactive metals (gold) occur native. Moderately reactive ones (iron, zinc) are reduced from their oxides with carbon or carbon monoxide in a furnace. Very reactive ones (sodium, aluminium) need electrolysis of a molten compound; aluminium is made by electrolysing alumina dissolved in molten cryolite, which uses enormous amounts of electricity.</p>
<p>An <strong>Ellingham diagram</strong> plots ΔG° of oxide formation (per mole of O₂) against temperature. Carbon can reduce a metal oxide wherever the line for 2C + O₂ → 2CO lies below the metal's line. Because forming CO doubles the moles of gas, its line slopes downward and eventually crosses most metals' lines, though for aluminium only at impractical temperatures.</p>
<div class="insight"><p>Olympiad inorganic problems often reduce to identifying an unknown element from a mass or gas volume. Write the general reaction (M + 2H₂O → M(OH)₂ + H₂ for Group 2), find moles from the measured gas, and the molar mass identifies the element.</p></div>`
      }
    ],
    labs: [
      { sim: 'ellingham', title: 'Ellingham diagram', desc: 'Gibbs energy of forming metal oxides (per mol O₂). Carbon can reduce an oxide where its CO line lies below the metal’s line.',
        tasks: ['Find the temperature above which carbon can reduce zinc oxide.', 'Why can carbon never reduce aluminium oxide in a practical furnace?', 'Why does the 2C + O₂ → 2CO line slope downward when the others slope upward?'] },
      { sim: 'trends', title: 'Periodic trends', params: { prop: 'en' }, desc: 'Electronegativity, ionisation energy and radius for elements 1–36. Watch period 3 move from metals to non-metals.',
        tasks: ['How does electronegativity change across period 3? Relate it to the oxides’ acid–base character.', 'Compare the ionisation energies of Na, Mg and Al.'] }
    ],
    formulas: [
      ['Group 1 + water', R`2\mathrm M + 2\mathrm{H_2O} \to 2\mathrm{MOH} + \mathrm{H_2}`],
      ['Group 2 + water', R`\mathrm M + 2\mathrm{H_2O} \to \mathrm{M(OH)_2} + \mathrm{H_2}`],
      ['Carbonate decomposition', R`\mathrm{MCO_3} \to \mathrm{MO} + \mathrm{CO_2}`],
      ['Halogen displacement', R`\mathrm{Cl_2} + 2\mathrm{Br^-} \to 2\mathrm{Cl^-} + \mathrm{Br_2}`],
      ['Ellingham line', R`\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ`],
      ['Hall–Héroult', R`\mathrm{Al^{3+}} + 3e^- \to \mathrm{Al}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Easiest carbonate', q: R`<p>Which Group 2 carbonate decomposes at the lowest temperature?</p>`, options: ['MgCO₃', 'CaCO₃', 'SrCO₃', 'BaCO₃'], answer: 0, hints: [R`Which cation polarises the carbonate ion most?`], solution: R`<p>Mg²⁺ is smallest, has the highest charge density and distorts the carbonate most.</p>` },
      { level: 'concept', type: 'mcq', title: 'Acidic oxide', q: R`<p>Which oxide is the most acidic?</p>`, options: ['Na₂O', 'MgO', 'Al₂O₃', 'SO₃'], answer: 3, hints: [R`Non-metal oxides are acidic.`], solution: R`<p>SO₃ reacts with water to give sulfuric acid.</p>` },
      { level: 'concept', type: 'mcq', title: 'Displacement', q: R`<p>Which halogen will displace bromine from a solution of potassium bromide?</p>`, options: ['Iodine', 'Chlorine', 'Neither', 'Both'], answer: 1, hints: [R`Oxidising power falls down the group.`], solution: R`<p>Chlorine is a stronger oxidant than bromine; iodine is weaker.</p>` },
      { level: 'core', type: 'num', title: 'Aluminium from alumina', q: R`<p>What mass of aluminium, in kg, can be made from 1.00 tonne of Al₂O₃ (M = 101.96; Al = 26.98)?</p>`, answer: 1000 * 2 * 26.98 / 101.96, tol: 0.005, unit: 'kg', hints: [R`2 Al per Al₂O₃.`], solution: R`<p>$1000 \times 53.96/101.96 = 529\ \mathrm{kg}$.</p>` },
      { level: 'core', type: 'num', title: 'Charge for aluminium', q: R`<p>How much charge (in coulombs) is needed to produce 1.00 kg of aluminium by electrolysis?</p>`, answer: 1000 / 26.98 * 3 * 96485, tol: 0.01, unit: 'C', hints: [R`Al³⁺ needs 3 electrons.`], solution: R`<p>$37.06\ \mathrm{mol} \times 3 \times 96\,485 = 1.07\times10^7\ \mathrm C$. At about 4.5 V that is 13 kWh per kilogram.</p>` },
      { level: 'core', type: 'num', title: 'Sodium in water', q: R`<p>2.30 g of sodium reacts with water. What volume of hydrogen forms at room conditions (24.0 L/mol)?</p>`, answer: 2.3 / 22.99 / 2 * 24, tol: 0.01, unit: 'L', hints: [R`2 Na give 1 H₂.`], solution: R`<p>0.100 mol Na → 0.050 mol H₂ → 1.20 L.</p>` },
      { level: 'core', type: 'num', title: 'Xenon tetrafluoride', q: R`<p>What is the oxidation state of xenon in XeF₄?</p>`, answer: 4, tol: 0.001, unit: '', hints: [R`F is always −1.`], solution: R`<p>+4.</p>` },
      { level: 'core', type: 'num', title: 'Quicklime', q: R`<p>What mass of calcium oxide (M = 56.08) is produced by fully decomposing 50.0 g of CaCO₃ (M = 100.09)?</p>`, answer: 50 / 100.09 * 56.08, tol: 0.005, unit: 'g', hints: [R`1 : 1.`], solution: R`<p>$0.4996 \times 56.08 = 28.0\ \mathrm g$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mystery metal', q: R`<p>0.400 g of a Group 2 metal reacts completely with water, giving 0.224 L of hydrogen at 0 °C and 1 atm (22.4 L/mol). What is the metal's molar mass?</p>`, answer: 40, tol: 0.01, unit: 'g/mol', hints: [R`One mole of H₂ per mole of metal.`], solution: R`<p>0.0100 mol H₂, so 0.0100 mol metal: M = 40.0 g/mol, calcium.</p>` },
      { level: 'olympiad', type: 'num', title: 'Smelting zinc', q: R`<p>Approximate Ellingham lines (kJ per mol O₂): 2Zn + O₂ → 2ZnO, ΔG° = −701 + 0.201T; 2C + O₂ → 2CO, ΔG° = −221 − 0.179T. Above what temperature can carbon reduce zinc oxide?</p>`, answer: 480 / 0.38, tol: 0.01, unit: 'K', hints: [R`Set the two lines equal.`], solution: R`<p>$-701 + 0.201T = -221 - 0.179T$ gives $T = 1263\ \mathrm K$. Zinc boils at 1180 K, so it distils out of the furnace as vapour.</p>` },
      { level: 'olympiad', type: 'num', title: 'A xenon fluoride', q: R`<p>A xenon fluoride is 63.3% xenon by mass (Xe = 131.29, F = 19.00). How many fluorine atoms are there per xenon atom?</p>`, answer: 4, tol: 0.02, unit: '', hints: [R`In 100 g: 63.3 g Xe and 36.7 g F.`], solution: R`<p>0.482 mol Xe and 1.93 mol F: ratio 4.0, so XeF₄.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-maingroup', [
    { title: 'Hydrogen from a metal', gen(r) { const m = r.pick([['Li', 6.94, 1], ['Na', 22.99, 1], ['K', 39.10, 1], ['Mg', 24.31, 2], ['Ca', 40.08, 2]]), g = r.step(0.1, 5, 0.05); const V = g / m[1] * m[2] / 2 * 24; return { q: R`<p>What volume of H₂ (L, at 24.0 L/mol) forms when ${g} g of ${m[0]} (M = ${m[1]}) reacts fully with water?</p>`, answer: V, unit: 'L', solution: R`<p>$n(\mathrm{H_2}) = ${m[2]}\times(${g}/${m[1]})/2$, $V = ${f(V)}\ \mathrm L$.</p>` }; } },
    { title: 'Oxidation states', gen(r) { const c = r.pick([['S in SO₄²⁻', 6], ['Cr in Cr₂O₇²⁻', 6], ['Cl in ClO₃⁻', 5], ['N in NO₂', 4], ['P in PO₄³⁻', 5], ['Xe in XeO₃', 6], ['I in IO₄⁻', 7], ['Cl in HClO', 1], ['N in NH₃', -3], ['S in H₂S', -2]]); return { q: R`<p>What is the oxidation state of ${c[0]}?</p>`, answer: c[1], tol: 0.001, unit: '', solution: R`<p>${c[1]}.</p>` }; } },
    { title: 'Electrolysis of a molten salt', gen(r) { const m = r.pick([['Al', 26.98, 3], ['Na', 22.99, 1], ['Mg', 24.31, 2], ['Li', 6.94, 1]]), kg = r.step(0.1, 10, 0.1); return { q: R`<p>How many coulombs are needed to produce ${kg} kg of ${m[0]} (M = ${m[1]}, charge +${m[2]})?</p>`, answer: kg * 1000 / m[1] * m[2] * 96485, unit: 'C', solution: R`<p>$Q = (m/M)zF = ${f(kg * 1000 / m[1] * m[2] * 96485)}\ \mathrm C$.</p>` }; } }
  ]);
})();
