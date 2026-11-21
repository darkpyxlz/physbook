(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-synthesis', subject: 'chemistry', num: 19, part: 'Organic Chemistry',
    title: 'Carbonyls, Aromatics and Synthesis',
    subtitle: R`The workhorse reactions of organic synthesis: carbonyl chemistry, carboxylic acids and their derivatives, aromatic substitution, polymers, and planning a multi-step route.`,
    goals: ['Predict oxidation and reduction products', 'Use nucleophilic addition, including Grignard reagents', 'Interconvert acid derivatives', 'Apply directing effects in aromatic substitution', 'Plan routes and calculate overall yields'],
    sections: [
      {
        title: 'Carbonyl compounds',
        html: R`
<p>The C=O bond is polar: carbon is δ+ and attacked by nucleophiles. <strong>Nucleophilic addition</strong> to aldehydes and ketones includes HCN (giving cyanohydrins), hydride from NaBH₄ or LiAlH₄ (giving alcohols) and Grignard reagents R–MgBr (making new C–C bonds):</p>
<ul>
<li>Methanal + RMgBr → primary alcohol</li>
<li>Other aldehyde + RMgBr → secondary alcohol</li>
<li>Ketone + RMgBr → tertiary alcohol</li>
<li>CO₂ + RMgBr → carboxylic acid</li>
</ul>
<p>Oxidation with acidified dichromate: primary alcohol → aldehyde (distil it out as it forms) → carboxylic acid (heat under reflux); secondary → ketone; tertiary alcohols resist. Tollens' and Fehling's tests distinguish aldehydes (oxidised) from ketones.</p>`
      },
      {
        title: 'Carboxylic acids and derivatives',
        html: R`
<p>Derivatives R–CO–X react by <strong>nucleophilic addition–elimination</strong>. Their reactivity follows the leaving group: acyl chloride > acid anhydride > ester > amide. Each can be made from any more reactive one:</p>
<ul>
<li>Acid + alcohol ⇌ ester + water (Fischer esterification, acid catalyst, an equilibrium).</li>
<li>Acyl chloride + alcohol → ester + HCl (fast, complete).</li>
<li>Acyl chloride + amine → amide.</li>
<li>Esters hydrolyse in acid (reversible) or base (saponification, irreversible, used to make soap).</li>
</ul>
<p>Condensing two-ended monomers gives <strong>condensation polymers</strong>: polyesters (PET) and polyamides (nylon, proteins). Alkenes give <strong>addition polymers</strong> (poly(ethene), PVC) with no small molecule lost.</p>`
      },
      {
        title: 'Aromatic chemistry',
        html: R`
<p>Benzene's six π electrons are delocalised, giving 150 kJ/mol of extra stability. It therefore reacts by <strong>electrophilic aromatic substitution</strong>, which keeps the aromatic ring, rather than by addition: nitration (HNO₃/H₂SO₄ → NO₂⁺), halogenation (X₂ with FeX₃), Friedel–Crafts alkylation and acylation (with AlCl₃).</p>
<p>Substituents steer where the next group goes:</p>
<ul>
<li><strong>Activating, ortho/para directors</strong>: –OH, –NH₂, –OCH₃, alkyl groups (they donate electrons).</li>
<li><strong>Deactivating, meta directors</strong>: –NO₂, –CN, –COOH, –CHO.</li>
<li>Halogens deactivate but still direct ortho/para.</li>
</ul>
<p>Phenol is so activated it reacts with bromine water instantly, giving 2,4,6-tribromophenol.</p>`
      },
      {
        title: 'Planning a synthesis',
        html: R`
<p>Work backwards from the target (<strong>retrosynthesis</strong>): identify bonds that a known reaction can make, and disconnect them to simpler starting materials. Track functional-group changes and how many carbons each step adds (Grignard and cyanide steps add carbon; oxidations do not). Protect groups that would interfere, and remove the protection at the end.</p>
<p>Yields multiply. A ten-step linear synthesis at 80% per step gives only $0.8^{10} = 11\%$. A <strong>convergent</strong> synthesis makes two halves separately and joins them, so the longest sequence any material passes through is shorter and the overall yield higher.</p>
<p><strong>Atom economy</strong> (mass of desired product ÷ total mass of reactants) measures waste built into the chemistry itself; addition reactions score 100%, substitutions and eliminations less.</p>
<div class="insight"><p>Olympiad organic problems are often detective stories: a formula, a few reactions (decolourises bromine, gives a silver mirror, releases CO₂ with carbonate) and an NMR spectrum. Use the degree of unsaturation first, then each test to rule possibilities in or out.</p></div>`
      }
    ],
    labs: [
      { sim: 'synthesis', title: 'Yield over many steps', desc: 'How much material survives a multi-step synthesis. The solid line is a linear route; the dashed line is a convergent route of the same total length.',
        tasks: ['At 90% per step, how many steps until half the material is gone?', 'Compare linear and convergent routes for 12 steps at 80%.', 'What per-step yield do you need for a 20-step synthesis to give 10% overall?'] }
    ],
    formulas: [
      ['Overall yield (linear)', R`Y = y^n`],
      ['Atom economy', R`\frac{M_{\text{product}}}{\sum M_{\text{reactants}}}`],
      ['Degree of polymerisation', R`n = M_{\text{polymer}}/M_{\text{repeat unit}}`],
      ['Esterification', R`\mathrm{RCOOH + R'OH \rightleftharpoons RCOOR' + H_2O}`],
      ['Grignard + CO₂', R`\mathrm{RMgBr \xrightarrow{CO_2,\ H^+} RCOOH}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Full oxidation', q: R`<p>A primary alcohol is heated under reflux with excess acidified potassium dichromate. The product is:</p>`, options: ['An aldehyde', 'A ketone', 'A carboxylic acid', 'An ester'], answer: 2, hints: [R`Reflux keeps the aldehyde in the flask.`], solution: R`<p>The aldehyde is oxidised further to the carboxylic acid.</p>` },
      { level: 'concept', type: 'mcq', title: 'Reducing a ketone', q: R`<p>Propanone is treated with NaBH₄. What forms?</p>`, options: ['Propan-1-ol', 'Propan-2-ol', 'Propanoic acid', 'Propane'], answer: 1, hints: [R`Hydride adds to the carbonyl carbon.`], solution: R`<p>A ketone is reduced to a secondary alcohol, propan-2-ol.</p>` },
      { level: 'concept', type: 'mcq', title: 'Directing effect', q: R`<p>Methylbenzene is nitrated. Where does the nitro group mainly go?</p>`, options: ['Meta only', 'Ortho and para', 'It replaces the methyl group', 'Equally to every position'], answer: 1, hints: [R`Alkyl groups donate electrons.`], solution: R`<p>The methyl group is an activating ortho/para director.</p>` },
      { level: 'core', type: 'num', title: 'Five steps', q: R`<p>A five-step synthesis averages 80% yield per step. What is the overall yield, in %?</p>`, answer: 100 * Math.pow(0.8, 5), tol: 0.005, unit: '%', hints: [R`$0.8^5$.`], solution: R`<p>32.8%.</p>` },
      { level: 'core', type: 'num', title: 'Making an ester', q: R`<p>0.50 mol of ethanoic acid is esterified with excess ethanol, with 67% yield. What mass of ethyl ethanoate (M = 88.11) is obtained?</p>`, answer: 0.5 * 0.67 * 88.11, tol: 0.005, unit: 'g', hints: [R`1 : 1 ratio.`], solution: R`<p>$0.335 \times 88.11 = 29.5\ \mathrm g$.</p>` },
      { level: 'core', type: 'num', title: 'Polymer chain', q: R`<p>A sample of poly(ethene) has molar mass 28 000 g/mol. Roughly how many ethene units (M = 28.05) are in each chain?</p>`, answer: 28000 / 28.05, tol: 0.01, unit: '', hints: [R`Divide.`], solution: R`<p>About 998.</p>` },
      { level: 'core', type: 'num', title: 'Grignard to benzoic acid', q: R`<p>15.7 g of bromobenzene (M = 157.01) is converted to the Grignard reagent, then reacted with CO₂ and acidified. What mass of benzoic acid (M = 122.12) could form at 100% yield?</p>`, answer: 15.7 / 157.01 * 122.12, tol: 0.005, unit: 'g', hints: [R`1 : 1.`], solution: R`<p>$0.100 \times 122.12 = 12.2\ \mathrm g$.</p>` },
      { level: 'core', type: 'num', title: 'Atom economy', q: R`<p>Find the atom economy of making ethyl ethanoate (88.11) from ethanol (46.07) and ethanoic acid (60.05).</p>`, answer: 100 * 88.11 / (46.07 + 60.05), tol: 0.005, unit: '%', hints: [R`Water is the waste.`], solution: R`<p>$88.11/106.12 = 83.0\%$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Going convergent', q: R`<p>An 8-step synthesis at 85% per step is redesigned so that two 4-step branches are made separately and then joined in one coupling step (85%). What is the yield based on the longest branch, in %?</p>`, answer: 100 * Math.pow(0.85, 5), tol: 0.005, unit: '%', hints: [R`Material passes through at most 5 steps.`], solution: R`<p>$0.85^5 = 44.4\%$, against $0.85^8 = 27.2\%$ for the linear route.</p>` },
      { level: 'olympiad', type: 'num', title: 'Nylon chain length', q: R`<p>Nylon-6,6 has repeat unit C₁₂H₂₂N₂O₂ (M = 226.32). How many repeat units are in a chain of molar mass 20 000 g/mol?</p>`, answer: 20000 / 226.32, tol: 0.01, unit: '', hints: [R`Divide by the repeat unit mass.`], solution: R`<p>About 88 repeat units, each made from one diamine and one diacid with two waters lost.</p>` },
      { level: 'olympiad', type: 'num', title: 'Brominating m-xylene', q: R`<p>How many different ring-monobromination products can 1,3-dimethylbenzene give?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Positions 4 and 6 are equivalent.`], solution: R`<p>Positions 2, 4 (= 6) and 5: three products. Position 4 dominates, being ortho to one methyl and para to the other.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-synthesis', [
    { title: 'Overall yield', gen(r) { const y = r.int(60, 98), n = r.int(2, 15); return { q: R`<p>What is the overall yield (%) of a ${n}-step linear synthesis at ${y}% per step?</p>`, answer: 100 * Math.pow(y / 100, n), unit: '%', solution: R`<p>$${y / 100}^{${n}} = ${f(100 * Math.pow(y / 100, n))}\%$.</p>` }; } },
    { title: 'Product mass', gen(r) { const c = r.pick([['aspirin from salicylic acid', 138.12, 180.16], ['ethyl ethanoate from ethanoic acid', 60.05, 88.11], ['benzoic acid from bromobenzene', 157.01, 122.12], ['nitrobenzene from benzene', 78.11, 123.11]]), m = r.step(1, 50, 0.5), y = r.int(40, 95); return { q: R`<p>Making ${c[0]} (1 : 1, M = ${c[1]} → ${c[2]}) from ${m} g at ${y}% yield. What mass of product forms?</p>`, answer: m / c[1] * c[2] * y / 100, unit: 'g', solution: R`<p>$${m}/${c[1]}\times${c[2]}\times${y / 100} = ${f(m / c[1] * c[2] * y / 100)}\ \mathrm g$.</p>` }; } },
    { title: 'Grignard products', gen(r) { const c = r.pick([['methanal', 'primary', 1], ['ethanal', 'secondary', 2], ['propanone', 'tertiary', 3], ['butanone', 'tertiary', 4]]), R2 = r.pick([['CH₃MgBr', 1], ['CH₃CH₂MgBr', 2]]); return { q: R`<p>${R2[0]} reacts with ${c[0]}, then acid work-up. How many carbon atoms are in the alcohol formed?</p>`, answer: c[2] + R2[1], tol: 0, atol: 0.01, unit: '', solution: R`<p>A ${c[1]} alcohol with ${c[2] + R2[1]} carbons.</p>` }; } }
  ]);
})();
