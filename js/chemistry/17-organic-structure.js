(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-organic', subject: 'chemistry', num: 17, part: 'Organic Chemistry',
    title: 'Organic Structure and Isomerism',
    subtitle: R`The chemistry of carbon. Functional groups, systematic names, structural and stereoisomers, chirality, and how structure sets physical properties.`,
    goals: ['Recognise the main functional groups', 'Name simple compounds systematically', 'Count structural isomers and degrees of unsaturation', 'Identify E/Z isomers and chiral centres', 'Explain boiling-point trends'],
    sections: [
      {
        title: 'Functional groups',
        html: R`
<p>Carbon forms four bonds, chains and rings, so there are millions of organic compounds. They are sorted by <strong>functional group</strong>, the part of the molecule that reacts:</p>
<div class="table-wrap"><table><thead><tr><th>Group</th><th>Structure</th><th>Suffix / prefix</th><th>Example</th></tr></thead><tbody>
<tr><td>Alkene</td><td>C=C</td><td>-ene</td><td>propene</td></tr>
<tr><td>Haloalkane</td><td>C–X</td><td>chloro-, bromo-</td><td>bromoethane</td></tr>
<tr><td>Alcohol</td><td>C–OH</td><td>-ol</td><td>ethanol</td></tr>
<tr><td>Aldehyde</td><td>–CHO</td><td>-al</td><td>ethanal</td></tr>
<tr><td>Ketone</td><td>C–CO–C</td><td>-one</td><td>propanone</td></tr>
<tr><td>Carboxylic acid</td><td>–COOH</td><td>-oic acid</td><td>ethanoic acid</td></tr>
<tr><td>Ester</td><td>–COO–C</td><td>-yl -oate</td><td>ethyl ethanoate</td></tr>
<tr><td>Amine</td><td>C–NH₂</td><td>-amine</td><td>methylamine</td></tr>
<tr><td>Amide</td><td>–CONH₂</td><td>-amide</td><td>ethanamide</td></tr>
</tbody></table></div>`
      },
      {
        title: 'Naming organic compounds',
        html: R`
<p>IUPAC names are built from parts: find the longest carbon chain containing the main functional group (meth-, eth-, prop-, but-, pent-, hex-…), number it so the main group gets the lowest number, then list substituents alphabetically with their positions. So CH₃CH(OH)CH₂CH₃ is butan-2-ol, and (CH₃)₂CHCH₂Br is 1-bromo-2-methylpropane.</p>
<p>The <strong>degree of unsaturation</strong> (rings plus π bonds) of a formula CₓHᵧNᵢXₖOₘ is $\tfrac12(2x + 2 + i - y - k)$; oxygen does not count. Benzene, C₆H₆, has 4 (one ring and three double bonds). It is the first thing to compute when solving a structure from a formula.</p>`
      },
      {
        title: 'Isomerism',
        html: R`
<p><strong>Structural isomers</strong> have the same formula but different connectivity: chain isomers (pentane, 2-methylbutane, 2,2-dimethylpropane), position isomers (propan-1-ol and propan-2-ol) and functional-group isomers (ethanol and methoxymethane).</p>
<p><strong>Stereoisomers</strong> have the same connectivity but different 3D arrangement:</p>
<ul>
<li><strong>E/Z (cis–trans)</strong> isomers arise around a C=C when each carbon has two different groups. Rank the groups by atomic number (Cahn–Ingold–Prelog rules): Z if the higher-priority groups are on the same side, E if opposite.</li>
<li><strong>Optical isomers</strong> (enantiomers) are non-superimposable mirror images, usually caused by a <strong>chiral centre</strong>: a carbon with four different groups. They rotate plane-polarised light in opposite directions and often behave differently in the body (one enantiomer of a drug may be active, the other inactive or harmful).</li>
</ul>
<p>A molecule with $n$ chiral centres has at most $2^n$ stereoisomers; internal symmetry can reduce the count by creating achiral <strong>meso</strong> forms.</p>`
      },
      {
        title: 'Structure and physical properties',
        html: R`
<p>Boiling points rise along a homologous series as London forces grow with chain length, and fall with branching, which reduces contact area. At similar size, polar groups raise boiling points, and hydrogen-bonding groups (–OH, –COOH, –NH₂) raise them most. Carboxylic acids boil highest because they form hydrogen-bonded pairs.</p>
<p>Small alcohols, acids and amines dissolve in water by hydrogen bonding; solubility falls as the non-polar chain grows. A mixture of enantiomers is described by its <strong>enantiomeric excess</strong>: $\mathrm{ee} = \dfrac{\alpha_{\text{observed}}}{\alpha_{\text{pure}}}\times100\%$.</p>`
      }
    ],
    labs: [
      { sim: 'homologous', title: 'Boiling points of homologous series', desc: 'Measured boiling points of straight-chain alkanes, aldehydes, alcohols and carboxylic acids with 1 to 10 carbons.',
        tasks: ['How much does each extra CH₂ add to the boiling point, roughly? Does it shrink as chains grow?', 'Compare butane, butanal, butan-1-ol and butanoic acid. Rank the intermolecular forces.', 'Why do the series converge for long chains?'] }
    ],
    formulas: [
      ['Degree of unsaturation', R`\tfrac12(2C + 2 + N - H - X)`],
      ['Maximum stereoisomers', R`2^n`],
      ['Enantiomeric excess', R`\mathrm{ee} = \alpha_{\text{obs}}/\alpha_{\text{pure}}`],
      ['Alkane formula', R`\mathrm{C}_n\mathrm{H}_{2n+2}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Name the group', q: R`<p>What functional group is in CH₃COCH₃?</p>`, options: ['Aldehyde', 'Ketone', 'Carboxylic acid', 'Ester'], answer: 1, hints: [R`C=O with carbon on both sides.`], solution: R`<p>Propanone, a ketone.</p>` },
      { level: 'concept', type: 'mcq', title: 'Highest boiling point', q: R`<p>These compounds have similar molar masses. Which has the highest boiling point?</p>`, options: ['Pentane', 'Diethyl ether', 'Butanal', 'Butan-1-ol'], answer: 3, hints: [R`Which can hydrogen-bond to itself?`], solution: R`<p>Butan-1-ol (118 °C) hydrogen-bonds; butanal (75 °C) is polar; ether (35 °C) and pentane (36 °C) rely mainly on London forces.</p>` },
      { level: 'concept', type: 'mcq', title: 'Chirality', q: R`<p>Which compound is chiral?</p>`, options: ['Propan-2-ol', 'Butan-2-ol', '2-Methylpropan-2-ol', 'Ethanol'], answer: 1, hints: [R`Look for a carbon with four different groups.`], solution: R`<p>In butan-2-ol, C2 carries H, OH, CH₃ and CH₂CH₃.</p>` },
      { level: 'core', type: 'num', title: 'Isomers of pentane', q: R`<p>How many structural isomers have the formula C₅H₁₂?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Straight, one branch, two branches on one carbon.`], solution: R`<p>Pentane, 2-methylbutane, 2,2-dimethylpropane.</p>` },
      { level: 'core', type: 'num', title: 'Isomers of hexane', q: R`<p>How many structural isomers have the formula C₆H₁₄?</p>`, answer: 5, tol: 0.001, unit: '', hints: [R`Hexane; 2- and 3-methylpentane; 2,2- and 2,3-dimethylbutane.`], solution: R`<p>Five.</p>` },
      { level: 'core', type: 'num', title: 'Three chiral centres', q: R`<p>What is the maximum number of stereoisomers of a molecule with three different chiral centres and no other stereo elements?</p>`, answer: 8, tol: 0.001, unit: '', hints: [R`$2^n$.`], solution: R`<p>$2^3 = 8$.</p>` },
      { level: 'core', type: 'num', title: 'Benzene', q: R`<p>Calculate the degree of unsaturation of C₆H₆.</p>`, answer: 4, tol: 0.001, unit: '', hints: [R`$(2\times6 + 2 - 6)/2$.`], solution: R`<p>4: one ring and three C=C.</p>` },
      { level: 'core', type: 'num', title: 'Enantiomeric excess', q: R`<p>A sample rotates light by +6.0°; the pure enantiomer under the same conditions gives +12.0°. What is the enantiomeric excess, in %?</p>`, answer: 50, tol: 0.001, unit: '%', hints: [R`ee = observed/pure.`], solution: R`<p>50% ee: 75% of one enantiomer, 25% of the other.</p>` },
      { level: 'olympiad', type: 'num', title: 'Unsaturation from a formula', q: R`<p>A compound has formula C₈H₈O₂. What is its degree of unsaturation?</p>`, answer: 5, tol: 0.001, unit: '', hints: [R`Ignore the oxygens.`], solution: R`<p>$(18 - 8)/2 = 5$: a benzene ring (4) plus one C=O, as in methyl benzoate or phenylethanoic acid.</p>` },
      { level: 'olympiad', type: 'num', title: 'Meso form', q: R`<p>How many stereoisomers does 2,3-dibromobutane have?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Two identical chiral centres.`], solution: R`<p>(2R,3R) and (2S,3S) are enantiomers; (2R,3S) has a mirror plane and is meso. Total 3, not 4.</p>` },
      { level: 'olympiad', type: 'num', title: 'Butenes', q: R`<p>How many alkenes (counting E/Z isomers separately) have the formula C₄H₈?</p>`, answer: 4, tol: 0.001, unit: '', hints: [R`But-1-ene, but-2-ene (two forms), 2-methylpropene.`], solution: R`<p>But-1-ene, (E)-but-2-ene, (Z)-but-2-ene and 2-methylpropene: 4. (Cyclobutane and methylcyclopropane are not alkenes.)</p>` }
    ]
  });
  PB.addDrills('chem-organic', [
    { title: 'Degree of unsaturation', gen(r) { const C = r.int(2, 12), dou = r.int(0, Math.min(6, C - 1)), X = r.int(0, 2), N = r.int(0, 1), O = r.int(0, 3); const H = 2 * C + 2 + N - X - 2 * dou; if (H < 1) return this.gen(PB.rng(r.int(1, 1e9))); return { q: R`<p>What is the degree of unsaturation of C${C > 1 ? '<sub>' + C + '</sub>' : ''}H<sub>${H}</sub>${N ? 'N' : ''}${O ? 'O' + (O > 1 ? '<sub>' + O + '</sub>' : '') : ''}${X ? 'Cl' + (X > 1 ? '<sub>' + X + '</sub>' : '') : ''}?</p>`, answer: dou, tol: 0, atol: 0.01, unit: '', solution: R`<p>$\tfrac12(2C + 2 + N - H - X) = ${dou}$.</p>` }; } },
    { title: 'Homologous series', gen(r) { const n = r.int(1, 12), kind = r.pick([['alkane', 2, 2], ['alkene', 2, 0], ['alcohol', 2, 2]]); const C = kind[0] === 'alkene' ? Math.max(2, n) : n; const H = 2 * C + kind[2]; const M = 12.011 * C + 1.008 * H + (kind[0] === 'alcohol' ? 15.999 : 0); return { q: R`<p>Find the molar mass of the ${kind[0]} with ${C} carbon atoms.</p>`, answer: M, tol: 0.005, unit: 'g/mol', solution: R`<p>C${C}H${H}${kind[0] === 'alcohol' ? 'O' : ''}: ${+M.toFixed(2)} g/mol.</p>` }; } },
    { title: 'Stereoisomer count', gen(r) { const n = r.int(1, 5); return { q: R`<p>What is the maximum number of stereoisomers of a molecule with ${n} different chiral centres?</p>`, answer: Math.pow(2, n), tol: 0, atol: 0.01, unit: '', solution: R`<p>$2^${n} = ${Math.pow(2, n)}$.</p>` }; } }
  ]);
})();
