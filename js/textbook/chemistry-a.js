/* Organic chemistry chapters following Clayden: ch. 7–8 (delocalisation, acidity, pKa), ch. 14, 16, 32–33
   (stereochemistry and conformation), ch. 6, 9–11 (carbonyl chemistry). Original text. */
(function () {
  const { R, f, S, QN, QM, P, M } = PB.tbKit();
  const RT = 8.314 * 298 / 1000; // kJ/mol at 298 K

  /* ================= Clayden 7–8: delocalisation and pKa ================= */
  const frac = (pH, pKa) => 1 / (1 + Math.pow(10, pH - pKa)); // fraction protonated
  PB.tbChapter({
    id: 'chem-acidity', subject: 'chemistry', title: 'Delocalisation, Acidity and pKa',
    subtitle: R`Why some protons come off easily and others never do. Conjugation and delocalisation, aromaticity and Hückel's rule, the pKa scale and the factors that set it (electronegativity, resonance, induction, hybridisation, aromaticity), predicting acid–base equilibria, and the basicity of amines, anilines, pyridines, amides and guanidines.`,
    big: 'An acid is only as strong as its conjugate base is stable. Spread the negative charge over several atoms (delocalisation), pull it away with electronegative groups (induction), or hold it in an s-rich orbital, and the proton leaves more readily. The pKa scale turns all of this into numbers that predict which way any proton transfer will go.',
    goals: ['Describe delocalisation with resonance structures and molecular orbitals', 'Apply Hückel’s 4n + 2 rule and estimate aromatic stabilisation', 'Explain how electronegativity, resonance, induction, hybridisation and aromaticity affect pKa', 'Predict the position of an acid–base equilibrium from pKa values', 'Use the Henderson–Hasselbalch relation to find how much of a compound is ionised', 'Rank the basicity of nitrogen compounds using pKaH'],
    prereqs: ['chem-mechanisms', 'chem-acids'],
    sections: [
      { title: 'Delocalisation and conjugation', plain: 'When p orbitals on neighbouring atoms line up, electrons spread over several atoms; this delocalisation lowers the energy, makes benzene especially stable, and gives long chains of alternating double bonds their colour.', html: R`
<p>When p orbitals on three or more adjacent atoms are parallel, their electrons are not confined to one bond but spread over the whole system. In the allyl cation, CH₂=CH–CH₂⁺, the positive charge is shared by both end carbons. We draw this with <strong>resonance structures</strong>, joined by a double-headed arrow: they are not different molecules flipping back and forth, but two imperfect pictures of one structure that is a blend of both. Delocalisation lowers the energy: a conjugated diene is more stable than an isolated one, and the planarity needed for orbital overlap is enforced.</p>
<h3 class="sub">Aromaticity</h3>
<p>Benzene is the extreme case. A cyclic, planar ring of p orbitals holding <strong>4n + 2</strong> π electrons (n = 0, 1, 2…) is <strong>aromatic</strong> (Hückel's rule) and especially stable; 4n electrons in such a ring is antiaromatic and destabilising. Benzene (6), the cyclopentadienyl anion (6), the tropylium cation (6) and pyridine (6) are aromatic; cyclobutadiene (4) is antiaromatic and exists only at very low temperature.</p>
<div class="worked"><p>Hydrogenating cyclohexene releases 120 kJ/mol; hydrogenating benzene to cyclohexane releases 208 kJ/mol. Estimate benzene's aromatic stabilisation.</p>
<p>Three isolated C=C bonds would release $3\cdot120 = 360$ kJ/mol. Benzene releases 152 kJ/mol less, so it is stabilised by about 150 kJ/mol, which is why it resists addition reactions.</p></div>
<h3 class="sub">Conjugation and colour</h3>
<p>The longer a conjugated chain, the smaller the gap between its highest occupied and lowest unoccupied π orbitals, and the longer the wavelength of light it absorbs. Ethene absorbs in the far ultraviolet; β-carotene, with 11 conjugated C=C bonds, absorbs blue light and looks orange.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which species is aromatic?`, ['the cyclopentadienyl anion, C₅H₅⁻', 'cyclobutadiene', 'cyclooctatetraene (non-planar)', 'cyclohexene'], 0, [R`Count π electrons in a planar ring: 4n + 2?`], R`C₅H₅⁻ has 6 π electrons in a planar ring.`)] },
      { title: 'What sets pKa', plain: 'An acid is strong when its conjugate base is stable: electronegative atoms, spreading the charge by resonance, electron-withdrawing groups nearby, orbitals with more s character and aromaticity all stabilise the base and lower the pKa.', html: R`
<p>For HA ⇌ H⁺ + A⁻, $K_a = [\text{H}^+][\text{A}^-]/[\text{HA}]$ and $\text{p}K_a = -\log_{10}K_a$: each unit lower means ten times stronger. Organic pKa values run from about −10 (HI) to about 50 (alkanes). Everything that stabilises the conjugate base A⁻ lowers pKa:</p>
<ul><li><strong>The atom bearing the charge.</strong> Across a row, electronegativity: CH₄ (50) > NH₃ (35) > H₂O (15.7) > HF (3.2). Down a group, size wins: HF (3.2) > HCl (−7) > HI (−10), because the charge spreads over a bigger atom.</li>
<li><strong>Delocalisation.</strong> Ethanol (16) versus acetic acid (4.8): the carboxylate's charge is shared equally by two oxygens. Phenol (10) shares the charge into the ring.</li>
<li><strong>Induction.</strong> Electronegative groups pull electron density through σ bonds: acetic acid 4.76, chloroacetic 2.86, dichloroacetic 1.29, trichloroacetic 0.65. The effect fades quickly with distance.</li>
<li><strong>Hybridisation.</strong> More s character holds electrons closer to the nucleus: ethyne (25) is far more acidic than ethene (44) or ethane (50).</li>
<li><strong>Aromaticity.</strong> Cyclopentadiene (pKa 16) is unusually acidic for a hydrocarbon because its anion is aromatic.</li></ul>
<div class="worked"><p>How many times stronger is trichloroacetic acid (pKa 0.65) than acetic acid (pKa 4.76)?</p>
<p>$10^{4.76 - 0.65} = 10^{4.11} \approx 1.3\times10^4$ times.</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Acid A has pKa 3.2 and acid B pKa 7.2. How many times larger is $K_a$ for A?`, 1e4, [R`$10^{\Delta\text{p}K_a}$.`], R`$10^4 = 10\,000$.`)] },
      { title: 'Using pKa: which way does a reaction go?', plain: 'A proton moves from the stronger acid to the base of the weaker acid; the equilibrium constant is ten to the power of the difference in pKa, and the pH compared with pKa tells you how much of a molecule is ionised.', html: R`
<p>In an acid–base reaction, the proton ends up on the base whose conjugate acid has the <em>higher</em> pKa. For HA + B⁻ ⇌ A⁻ + HB:</p>
<div class="key"><p>$K = 10^{\,\text{p}K_a(\text{HB}) - \text{p}K_a(\text{HA})}$</p></div>
<div class="worked"><p>Will hydroxide deprotonate phenol (pKa 10)? Will sodium hydrogencarbonate (conjugate acid H₂CO₃, pKa 6.4)? Will hydrogencarbonate deprotonate ethanol (pKa 16)?</p>
<p>Hydroxide: water has pKa 15.7, so $K = 10^{5.7}$: complete. Hydrogencarbonate with phenol: $K = 10^{6.4 - 10} = 10^{-3.6}$: hardly at all. With ethanol, $10^{-9.6}$: no. This is the basis of <strong>acid–base extraction</strong>: shaking an ether solution with aqueous NaHCO₃ pulls out carboxylic acids (pKa ≈ 4–5) as salts but leaves phenols; NaOH pulls out both; dilute HCl pulls out amines.</p></div>
<h3 class="sub">How much is ionised?</h3>
<p>At a given pH, the ratio of the two forms follows the <strong>Henderson–Hasselbalch</strong> equation: $\text{pH} = \text{p}K_a + \log_{10}\dfrac{[\text{A}^-]}{[\text{HA}]}$. At pH = pKa, half is ionised; each pH unit further shifts the ratio tenfold. A drug that is a weak acid (aspirin, pKa 3.5) is mostly un-ionised in the stomach (pH 2) and so crosses membranes there; mostly ionised in blood (pH 7.4).</p>
<p>The strongest base that can exist in water is hydroxide and the strongest acid H₃O⁺: stronger ones react with water (<strong>levelling</strong>). To make carbanions or alkoxide-free enolates, chemists use non-aqueous solvents and bases such as sodium hydride, LDA (conjugate acid pKa 36) or butyllithium (about 50).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`What is the equilibrium constant for acetic acid (pKa 4.8) reacting with ammonia (pKaH 9.2)?`, Math.pow(10, 4.4), [R`$K = 10^{\text{p}K_a(\text{NH}_4^+) - \text{p}K_a(\text{AcOH})}$.`], R`$10^{9.2 - 4.8} = 10^{4.4} \approx 2.5\times10^4$.`, { tol: 0.03 })] },
      { title: 'Basicity of nitrogen compounds', plain: 'A base is strong when its lone pair is available and its protonated form is stable; amines are moderately basic, anilines and pyridines much less, amides and pyrrole hardly at all, while guanidines are very strong bases.', html: R`
<p>Basicity is quoted as the pKa of the conjugate acid, <strong>pKaH</strong>: the higher, the stronger the base.</p>
<div class="table-wrap"><table class="data"><tr><th>Base</th><th>pKaH</th><th>Why</th></tr>
<tr><td>Guanidine, (H₂N)₂C=NH</td><td>13.6</td><td>its cation is delocalised over three nitrogens</td></tr>
<tr><td>Triethylamine, Et₃N</td><td>10.7</td><td>sp³ lone pair; alkyl groups donate electrons</td></tr>
<tr><td>Ammonia</td><td>9.2</td><td>reference</td></tr>
<tr><td>Pyridine</td><td>5.2</td><td>lone pair in an sp² orbital, held more tightly</td></tr>
<tr><td>Aniline, PhNH₂</td><td>4.6</td><td>lone pair delocalised into the ring</td></tr>
<tr><td>Amides, RCONH₂</td><td>≈ −0.5</td><td>lone pair delocalised onto oxygen; protonate on O</td></tr>
<tr><td>Pyrrole</td><td>≈ −4</td><td>lone pair is part of the aromatic sextet</td></tr></table></div>
<div class="worked"><p>What fraction of aniline (pKaH 4.6) is protonated at pH 7?</p>
<p>$[\text{BH}^+]/[\text{B}] = 10^{4.6 - 7} = 0.004$: only 0.4% protonated. Triethylamine (10.7) at pH 7 is 99.98% protonated.</p></div>
<p>Amino acids show both behaviours at once: in water near neutral pH they exist as <strong>zwitterions</strong>, H₃N⁺–CHR–COO⁻. The <strong>isoelectric point</strong>, where the average charge is zero, is the mean of the two pKa values for a neutral amino acid.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which is the strongest base?`, ['ethylamine', 'aniline', 'pyridine', 'acetamide'], 0, [R`Which lone pair is localised on an sp³ nitrogen?`], R`Ethylamine (pKaH about 10.7); the others delocalise or hold their lone pair more tightly.`)] }
    ],
    figures: [{ s: 1, title: 'The inductive effect fades with distance', caption: 'pKa of chlorobutanoic acids as the chlorine moves away from the acid group (position 2, 3, 4), with butanoic acid for comparison.', params: { aspect: 0.4, minH: 210, controls: [S('k', 'Highlight chlorine position', 2, 5, 1, 2)],
      plots: [{ x: [1.5, 5.5], y: [2, 5.2], xlabel: 'Cl position (5 = no chlorine)', ylabel: 'pKa', pts: (v) => [[2, 2.86], [3, 4.05], [4, 4.52], [5, 4.82]].map((q) => ({ x: q[0], y: q[1], r: q[0] === v.k ? 8 : 5, color: q[0] === v.k ? 'rust' : 'accent' })) }],
      readout: (v) => { const d = { 2: 2.86, 3: 4.05, 4: 4.52, 5: 4.82 }[v.k]; return [['pKa', f(d)], ['Ka relative to butanoic acid', f(Math.pow(10, 4.82 - d)) + '×']]; } } }],
    labs: [{ sim: 'explore', title: 'Who holds the proton?', desc: 'Fraction of a compound in its protonated (acid) form against pH, from the Henderson–Hasselbalch equation. Compare two compounds, for example a carboxylic acid and a phenol.',
      tasks: ['At what pH is a carboxylic acid (pKa 4.5) 99% ionised?', 'Find a pH that separates benzoic acid (4.2) from phenol (10) in an extraction.', 'At pH 7.4, which is more ionised: aspirin (3.5) or an amine drug (pKaH 9.5)?'],
      params: { aspect: 0.42, controls: [S('a', 'pKa of compound 1', -2, 16, 0.1, 4.2), S('b', 'pKa of compound 2', -2, 16, 0.1, 10), S('pH', 'pH', 0, 14, 0.1, 7)],
        plots: [{ x: [0, 14], y: [0, 1.05], xlabel: 'pH', ylabel: 'fraction protonated', curves: (v) => [{ f: (x) => frac(x, v.a), label: 'compound 1' }, { f: (x) => frac(x, v.b), color: 'rust', label: 'compound 2' }], vlines: (v) => [{ x: v.pH }], pts: (v) => [{ x: v.pH, y: frac(v.pH, v.a) }, { x: v.pH, y: frac(v.pH, v.b), color: 'rust' }] }],
        readout: (v) => [['compound 1 protonated', f(100 * frac(v.pH, v.a), 3) + '%'], ['compound 2 protonated', f(100 * frac(v.pH, v.b), 3) + '%'], ['K for 1 giving its proton to the base of 2', '10^' + f(v.b - v.a)]] } }],
    formulas: [['pKa', '\\text{p}K_a = -\\log_{10}K_a'], ['Proton transfer', 'K = 10^{\\,\\text{p}K_a(\\text{HB}) - \\text{p}K_a(\\text{HA})}'], ['Henderson–Hasselbalch', '\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}'], ['Hückel’s rule', '4n + 2\\ \\pi\\ \\text{electrons}'], ['Isoelectric point', '\\text{pI} = \\tfrac12(\\text{p}K_{a1} + \\text{p}K_{a2})']],
    problems: [
      M('concept', 'Strongest acid', R`Which is the strongest acid?`, ['CF₃COOH', 'CH₃COOH', 'CH₃CH₂OH', 'C₆H₅OH'], 0, [R`Delocalisation plus strong induction.`], R`Trifluoroacetic acid (pKa ≈ 0.2).`),
      M('concept', 'Resonance structures', R`Resonance structures of the acetate ion represent…`, ['one real structure in which the charge is shared by both oxygens', 'two forms that interconvert rapidly', 'two different isomers', 'excited states of acetate'], 0, [R`The arrows describe one molecule.`], R`Both C–O bonds are identical; the charge is delocalised.`),
      M('concept', 'Hybridisation', R`Which C–H bond is most acidic?`, ['the C–H of ethyne', 'a C–H of ethene', 'a C–H of ethane', 'a C–H of methane'], 0, [R`More s character, more acidic.`], R`sp C–H (pKa ≈ 25).`),
      M('concept', 'Lone pairs and basicity', R`Pyrrole is a very weak base because…`, ['its nitrogen lone pair is part of the aromatic π system', 'nitrogen is not electronegative', 'it has no lone pair', 'it is a strong acid'], 0, [R`Count the π electrons.`], R`Protonating N would destroy the aromatic sextet.`),
      P('core', 'num', 'Aromatic stabilisation', R`Cyclohexene hydrogenates with ΔH = −120 kJ/mol and benzene with −208 kJ/mol. Estimate benzene's stabilisation (kJ/mol).`, 152, [R`Compare with three isolated C=C.`], R`$360 - 208 = 152$ kJ/mol.`),
      P('core', 'num', 'Chloroacetic acids', R`How many times stronger is chloroacetic acid (2.86) than acetic acid (4.76)?`, Math.pow(10, 1.9), [R`$10^{\Delta\text{p}K_a}$.`], R`$10^{1.9} = 79$.`),
      P('core', 'num', 'Deprotonating phenol', R`Equilibrium constant for phenol (pKa 10.0) + OH⁻ (water pKa 15.7)?`, Math.pow(10, 5.7), [R`$K = 10^{15.7 - 10}$.`], R`$5\times10^5$: complete.`, { tol: 0.03 }),
      P('core', 'num', 'Ionisation', R`What percentage of benzoic acid (pKa 4.2) is ionised at pH 6.2?`, 100 * (1 - frac(6.2, 4.2)), [R`Ratio $[\text{A}^-]/[\text{HA}] = 10^{2}$.`], R`$100/101 = 99.0\%$.`),
      M('core', 'Extraction', R`An ether solution contains benzoic acid, phenol and a neutral compound. Shaking with aqueous NaHCO₃ removes…`, ['benzoic acid only', 'phenol only', 'both acids', 'the neutral compound'], 0, [R`H₂CO₃ has pKa 6.4.`], R`Only the carboxylic acid (pKa 4.2) is deprotonated; phenol (10) stays.`),
      P('core', 'num', 'Protonated aniline', R`What percentage of aniline (pKaH 4.6) is protonated at pH 6.6?`, 100 / (1 + 100), [R`$[\text{BH}^+]/[\text{B}] = 10^{4.6 - 6.6}$.`], R`Ratio 0.01: $0.99\%$.`),
      P('olympiad', 'num', 'Isoelectric point', R`Glycine has pKa values 2.34 (COOH) and 9.60 (NH₃⁺). Find its isoelectric point.`, (2.34 + 9.6) / 2, [R`Average the two.`], R`$5.97$.`),
      P('olympiad', 'num', 'Making an aromatic anion', R`Potassium tert-butoxide (conjugate acid pKa 19) deprotonates cyclopentadiene (pKa 16). Find $K$.`, 1000, [R`$10^{19 - 16}$.`], R`$10^3$: mostly the aromatic anion.`),
      P('olympiad', 'num', 'Absorbed in the stomach', R`Aspirin has pKa 3.5. What fraction is un-ionised at stomach pH 1.5?`, frac(1.5, 3.5), [R`Ratio ionised/un-ionised $= 10^{-2}$.`], R`$1/1.01 = 0.99$: almost all neutral, so it crosses the stomach lining.`),
      P('olympiad', 'num', 'Buffer design', R`What ratio of sodium acetate to acetic acid (pKa 4.76) gives a pH 5.06 buffer?`, Math.pow(10, 0.3), [R`Henderson–Hasselbalch.`], R`$10^{0.3} = 2.0$.`)
    ],
    drills: [
      { title: 'K from pKa', gen: (r) => { const a = r.pick([4.8, 10, 16, 25, 35]), b = r.pick([9.2, 15.7, 19, 36, 50]); return { q: R`<p>Acid pKa ${a}; the base's conjugate acid has pKa ${b}. $\log_{10}K$ for the proton transfer?</p>`, answer: b - a, tol: 0.001, atol: 0.01, solution: R`<p>$${b} - ${a} = ${f(b - a, 4)}$.</p>` }; } },
      { title: 'Fraction ionised', gen: (r) => { const pk = r.pick([3, 4.2, 4.8, 7, 9.2, 10]), pH = r.pick([2, 4, 5, 7, 7.4, 9, 11]); return { q: R`<p>pKa ${pk}, pH ${pH}. Percentage in the deprotonated form?</p>`, answer: 100 * (1 - frac(pH, pk)), tol: 0.01, atol: 0.01, solution: R`<p>$100/(1 + 10^{${pk} - ${pH}}) = ${f(100 * (1 - frac(pH, pk)), 4)}\%$.</p>` }; } }
    ],
    predict: { q: 'At a pH two units above its pKa, what fraction of an acid is still protonated?', o: ['about 1%', 'about 50%', 'about 25%'], a: 0, how: 'set the pH to pKa + 2 in the proton lab.', why: 'Each pH unit shifts the ratio tenfold, so the ratio is 100 : 1.' },
    wild: ['Designing drugs', 'Medicinal chemists tune pKa so a drug is neutral enough to cross membranes yet charged enough to dissolve in blood; many drugs are sold as salts of amines.']
  });

  /* ================= Clayden 14, 16, 32–33: stereochemistry and conformation ================= */
  const butane = (phi) => { const p = phi * Math.PI / 180; return 9.7667 + 2.2667 * Math.cos(p) - 0.2667 * Math.cos(2 * p) + 7.2333 * Math.cos(3 * p); };
  const eqFrac = (dG, T) => { const K = Math.exp(dG * 1000 / (8.314 * T)); return K / (1 + K); };
  PB.tbChapter({
    id: 'chem-stereo', subject: 'chemistry', title: 'Stereochemistry and Conformation',
    subtitle: R`The third dimension of organic chemistry. Chirality, the CIP rules for R and S, optical rotation and enantiomeric excess, diastereomers and meso compounds, conformations of chains and of the cyclohexane chair (axial, equatorial and A-values), and stereoselective and stereospecific reactions.`,
    big: 'Molecules have shapes, and mirror-image shapes can behave completely differently in a living body: one enantiomer of a drug may heal while the other does nothing or harms. Chemists name configurations with R and S, count stereoisomers, and use the energies of different conformations to predict the stereochemistry reactions will produce.',
    goals: ['Identify stereogenic centres and assign R/S configurations using the CIP rules', 'Calculate specific rotation and enantiomeric excess', 'Distinguish enantiomers, diastereomers and meso compounds; count stereoisomers', 'Analyse conformations with Newman projections and energy profiles', 'Use A-values to predict the conformational equilibrium of substituted cyclohexanes', 'Predict the stereochemical outcome of SN2, E2 and bromine addition'],
    prereqs: ['chem-organic'],
    sections: [
      { title: 'Chirality and configuration', plain: 'A molecule is chiral if it cannot be superimposed on its mirror image, usually because a carbon has four different groups; R and S labels describe the arrangement, and chiral samples rotate polarised light.', html: R`
<p>An object is <strong>chiral</strong> if it cannot be superimposed on its mirror image, like your hands. The commonest cause in organic molecules is a <strong>stereogenic centre</strong>: a carbon bearing four different groups. The two mirror-image forms are <strong>enantiomers</strong>. They have identical physical properties (melting point, NMR spectrum) except how they interact with other chiral things: polarised light, enzymes, receptors. A molecule with a plane of symmetry is achiral.</p>
<h3 class="sub">R and S</h3>
<p>The Cahn–Ingold–Prelog (CIP) rules label each centre. (1) Rank the four groups by atomic number of the atom attached (higher first). (2) If tied, compare the atoms one bond further out, at the first point of difference. (3) Multiple bonds count as duplicated atoms (C=O counts as C with two O). Then point the lowest-priority group away from you: if 1 → 2 → 3 runs clockwise, the centre is <strong>R</strong>; anticlockwise, <strong>S</strong>. Swapping any two groups inverts the label.</p>
<h3 class="sub">Optical activity</h3>
<p>Enantiomers rotate plane-polarised light by equal and opposite angles. The <strong>specific rotation</strong> is $[\alpha] = \alpha/(lc)$, with $l$ in decimetres and $c$ in g/mL. An equal mixture (a <strong>racemate</strong>) shows no rotation. The <strong>enantiomeric excess</strong> is $\text{ee} = |\%\text{major} - \%\text{minor}|$, equal to $[\alpha]_{\text{obs}}/[\alpha]_{\text{pure}}$.</p>
<div class="worked"><p>A sample has $[\alpha] = +12$; the pure (+)-enantiomer has $+40$. What is the ee and the ratio of enantiomers?</p>
<p>$\text{ee} = 12/40 = 30\%$, so the mixture is 65 : 35. Note that R/S and (+)/(−) are unrelated: the sign of rotation must be measured.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which group has the HIGHEST CIP priority?`, ['–OH', '–CH₂OH', '–CHO', '–CH₃'], 0, [R`Compare the atom directly attached.`], R`Oxygen (atomic number 8) beats carbon.`)] },
      { title: 'Diastereomers and meso compounds', plain: 'With more than one stereocentre, stereoisomers that are not mirror images are diastereomers with different properties; symmetrical molecules can have stereocentres yet be achiral (meso), and racemates are separated through diastereomeric salts.', html: R`
<p>A molecule with $n$ stereogenic centres has at most $2^n$ stereoisomers. Stereoisomers that are not mirror images are <strong>diastereomers</strong>; unlike enantiomers they have different physical properties and can be separated by ordinary means. Alkene E/Z isomers are diastereomers too (E/Z assigned by CIP priorities: higher priorities on the same side is Z).</p>
<p>Symmetry can reduce the count. 2,3-Dibromobutane has two stereocentres but only three stereoisomers: the (R,R) and (S,S) enantiomers, and the <strong>meso</strong> (R,S) form, which has an internal mirror plane and is achiral. Tartaric acid behaves the same way.</p>
<div class="worked"><p>How many stereoisomers does the open-chain form of an aldohexose such as glucose have, with four stereocentres and no symmetry?</p>
<p>$2^4 = 16$: eight D-sugars (glucose, mannose, galactose…) and their eight L-enantiomers.</p></div>
<h3 class="sub">Resolution</h3>
<p>Enantiomers cannot be separated directly, but reacting a racemic acid with one enantiomer of a chiral base gives two <em>diastereomeric</em> salts, which differ in solubility and can be crystallised apart; acid is then regenerated from each. Chiral chromatography and enzymes, which work on only one enantiomer, are modern alternatives. The stakes are real: one enantiomer of thalidomide sedates, while the drug caused birth defects in the 1950s and 60s (and in the body each enantiomer slowly converts to the other).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A molecule has three stereogenic centres and no internal symmetry. How many stereoisomers?`, 8, [R`$2^n$.`], R`$2^3 = 8$.`)] },
      { title: 'Conformations of chains and rings', plain: 'Molecules twist about single bonds: staggered arrangements are lower in energy than eclipsed ones, cyclohexane takes a strain-free chair, and big substituents prefer the roomier equatorial positions by an amount measured by their A-values.', html: R`
<p>Rotation about single bonds gives <strong>conformations</strong>, viewed end-on in Newman projections. In ethane, staggered is 12 kJ/mol below eclipsed. In butane (looking along C2–C3): the <strong>anti</strong> conformation is lowest, <strong>gauche</strong> is 3.8 kJ/mol higher (the methyl groups touch), and the eclipsed forms are higher still, the fully eclipsed syn form about 19 kJ/mol.</p>
<div data-fig="0"></div>
<h3 class="sub">The chair</h3>
<p>Cyclohexane adopts a <strong>chair</strong> with perfect tetrahedral angles and all bonds staggered: it is strain-free. Each carbon has one <strong>axial</strong> bond (parallel to the ring's axis) and one <strong>equatorial</strong> bond (around the ring's equator). A <strong>ring flip</strong> (barrier about 45 kJ/mol, so it happens about $10^5$ times a second at room temperature) swaps them. Substituents prefer equatorial, avoiding 1,3-diaxial clashes; the free-energy difference is the <strong>A-value</strong>.</p>
<div class="worked"><p>Methyl has an A-value of 7.3 kJ/mol. What fraction of methylcyclohexane is equatorial at 298 K?</p>
<p>$K = e^{\Delta G/RT} = e^{7300/(8.314\cdot298)} = e^{2.95} = 19$, so $19/20 = 95\%$ equatorial. A tert-butyl group (about 20 kJ/mol) is over 99.9% equatorial and effectively locks the ring.</p></div>
<p>Small rings are strained: cyclopropane's 60° angles and eclipsed bonds give about 115 kJ/mol of strain, making it reactive.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A substituent has A-value 3.8 kJ/mol. What percentage is equatorial at 298 K?`, 100 * eqFrac(3.8, 298), [R`$K = e^{\Delta G/RT}$, fraction $= K/(1+K)$.`], R`$K = e^{1.53} = 4.6$: 82%.`)] },
      { title: 'Stereoselective and stereospecific reactions', plain: 'Many reactions control the shape of their products: SN2 inverts a stereocentre, E2 needs the leaving group and hydrogen anti to each other, bromine adds to the two faces of an alkene from opposite sides, and reagents attack the less hindered face of a ring.', html: R`
<p>A <strong>stereospecific</strong> reaction gives a different stereoisomer from each stereoisomer of the starting material, because its mechanism dictates geometry:</p>
<ul><li><strong>SN2</strong> attacks from the back, inverting the centre (Walden inversion): (R)-2-bromobutane with hydroxide gives (S)-butan-2-ol.</li>
<li><strong>E2</strong> needs the hydrogen and leaving group <strong>anti-periplanar</strong>. On a cyclohexane both must be axial: menthyl chloride, whose chlorine must flip into an axial position held by bulky groups, eliminates slowly and gives a single alkene; its isomer neomenthyl chloride, with chlorine already axial, reacts about 200 times faster.</li>
<li><strong>Bromine addition</strong> to alkenes is <em>anti</em> (via a bridged bromonium ion attacked from the back): <em>trans</em>-but-2-ene gives meso-2,3-dibromobutane; <em>cis</em>-but-2-ene gives the racemic (R,R)/(S,S) pair.</li></ul>
<p>A <strong>stereoselective</strong> reaction simply favours one product stereoisomer. Reagents approach the less hindered face of a ring or carbonyl. Small hydride reagents add to substituted cyclohexanones mainly from the axial direction, giving mostly the equatorial alcohol; bulky ones (L-Selectride) attack equatorially, giving the axial alcohol. Reactions creating a new stereocentre next to an existing one are diastereoselective, and models such as Felkin–Anh predict which face is attacked.</p>
<div class="worked"><p>Without any chiral influence, reducing butan-2-one with NaBH₄ gives what?</p>
<p>A racemic mixture of (R)- and (S)-butan-2-ol: the planar carbonyl is attacked equally from both faces. Making one enantiomer needs a chiral reagent or catalyst (asymmetric synthesis).</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Bromine adds to <em>cis</em>-but-2-ene. The product is…`, ['racemic (R,R)/(S,S)-2,3-dibromobutane', 'meso-2,3-dibromobutane', 'a single enantiomer', '1,2-dibromobutane'], 0, [R`Anti addition to a cis alkene.`], R`Anti addition to the cis isomer gives the chiral pair, formed equally.`)] }
    ],
    figures: [{ s: 2, title: 'Butane’s torsional energy', caption: 'Energy against the C1–C2–C3–C4 dihedral angle. Anti (180°) is lowest; the two gauche forms (±60°) sit 3.8 kJ/mol higher.', params: { aspect: 0.4, minH: 210, controls: [S('phi', 'Dihedral angle', 0, 360, 1, 60, '°')],
      plots: [{ x: [0, 360], y: [0, 21], xlabel: 'dihedral angle (°)', ylabel: 'energy (kJ/mol)', curves: () => [{ f: butane }], pts: (v) => [{ x: v.phi, y: butane(v.phi) }], vlines: () => [{ x: 60, label: 'gauche' }, { x: 180, label: 'anti' }, { x: 300, label: 'gauche' }] }],
      readout: (v) => [['energy', f(butane(v.phi)) + ' kJ/mol'], ['Boltzmann weight vs anti', f(Math.exp(-butane(v.phi) / RT), 3)]] } }],
    labs: [{ sim: 'explore', title: 'Axial or equatorial?', desc: 'The equilibrium between the two chairs of a monosubstituted cyclohexane, from the substituent’s A-value (ΔG) and the temperature.',
      tasks: ['Methyl (A = 7.3 kJ/mol) at 298 K: what fraction is equatorial?', 'Cooling to 200 K: does the preference grow or shrink?', 'What A-value would give 99% equatorial at room temperature?'],
      params: { aspect: 0.42, controls: [S('g', 'A-value ΔG', 0, 25, 0.1, 7.3, 'kJ/mol'), S('T', 'Temperature', 150, 500, 5, 298, 'K')],
        plots: [{ x: [0, 25], y: [50, 100.5], xlabel: 'A-value (kJ/mol)', ylabel: '% equatorial', curves: (v) => [{ f: (g) => 100 * eqFrac(g, v.T) }], pts: (v) => [{ x: v.g, y: 100 * eqFrac(v.g, v.T) }, { x: 7.3, y: 100 * eqFrac(7.3, v.T), label: 'Me', color: 'teal' }, { x: 9.2, y: 100 * eqFrac(9.2, v.T), label: 'iPr', color: 'teal' }, { x: 20, y: 100 * eqFrac(20, v.T), label: 'tBu', color: 'teal' }] }],
        readout: (v) => { const K = Math.exp(v.g * 1000 / (8.314 * v.T)); return [['K (eq/ax)', f(K)], ['equatorial', f(100 * eqFrac(v.g, v.T), 4) + '%']]; } } }],
    formulas: [['Specific rotation', '[\\alpha] = \\dfrac{\\alpha}{l\\,c}'], ['Enantiomeric excess', '\\text{ee} = \\dfrac{[\\alpha]_{\\text{obs}}}{[\\alpha]_{\\text{pure}}} = \\%R - \\%S'], ['Stereoisomers', '\\le 2^n'], ['Conformer ratio', 'K = e^{-\\Delta G/RT}']],
    problems: [
      M('concept', 'Chirality', R`Which molecule is chiral?`, ['butan-2-ol', 'propan-2-ol', 'ethanol', 'pentan-3-ol'], 0, [R`Look for a carbon with four different groups.`], R`C2 of butan-2-ol bears H, OH, CH₃ and C₂H₅.`),
      M('concept', 'Meso', R`A meso compound…`, ['has stereogenic centres but is achiral, because of internal symmetry', 'is a 50 : 50 mixture of enantiomers', 'has no stereocentres', 'rotates light strongly'], 0, [R`Think of meso-tartaric acid.`], R`An internal mirror plane makes it superimposable on its mirror image.`),
      M('concept', 'E2 geometry', R`For E2 elimination from a cyclohexane, the leaving group and the hydrogen must be…`, ['both axial (anti-periplanar)', 'both equatorial', 'cis to each other', 'on the same carbon'], 0, [R`Anti-periplanar in a chair.`], R`Only trans-diaxial pairs are anti-periplanar.`),
      M('concept', 'Diastereomers', R`Which pair are diastereomers?`, ['(2R,3R)- and (2R,3S)-2,3-dihydroxybutanoic acid', '(R)- and (S)-butan-2-ol', 'two identical molecules', 'butan-1-ol and butan-2-ol'], 0, [R`Same connectivity, not mirror images.`], R`They differ at one centre of two: diastereomers.`),
      P('core', 'num', 'Enantiomeric excess', R`Observed $[\alpha] = +12$; pure enantiomer $+40$. ee (%)?`, 30, [R`Ratio of rotations.`], R`30%.`),
      P('core', 'num', 'Major enantiomer', R`A sample has 80% ee. What percentage is the major enantiomer?`, 90, [R`$\%\text{major} = (100 + \text{ee})/2$.`], R`90%.`),
      P('core', 'num', 'Aldohexoses', R`How many stereoisomers does an open-chain aldohexose with 4 stereocentres have?`, 16, [R`$2^4$.`], R`16.`),
      P('core', 'num', 'Methylcyclohexane', R`A-value 7.3 kJ/mol, 298 K: percentage equatorial?`, 100 * eqFrac(7.3, 298), [R`$K = e^{\Delta G/RT}$.`], R`95%.`),
      P('core', 'num', 'Observed rotation', R`Sucrose has $[\alpha] = +66.5$. What rotation (degrees) does a 0.10 g/mL solution give in a 1 dm tube?`, 6.65, [R`$\alpha = [\alpha]lc$.`], R`$66.5\cdot1\cdot0.10 = 6.65^\circ$.`),
      M('core', 'SN2 stereochemistry', R`(R)-2-iodobutane reacts with cyanide by SN2. The product is…`, ['(S)-2-methylbutanenitrile', '(R)-2-methylbutanenitrile', 'a racemate', 'meso'], 0, [R`Backside attack inverts; check whether priorities change.`], R`Inversion; CN takes the place of I with the same priority rank (highest), so R becomes S.`),
      P('olympiad', 'num', 'Anti and gauche', R`Gauche butane is 3.8 kJ/mol above anti, and there are two gauche conformers. What fraction of butane is anti at 298 K?`, 1 / (1 + 2 * Math.exp(-3.8 / RT)), [R`Weights 1 : $2e^{-\Delta E/RT}$.`], R`$2e^{-1.53} = 0.43$; anti fraction $1/1.43 = 0.70$.`),
      P('olympiad', 'num', 'Ring-flip rate', R`Using the Eyring equation $k = (k_BT/h)e^{-\Delta G^\ddagger/RT}$ with $k_BT/h = 6.2\times10^{12}\ \text{s}^{-1}$ at 298 K, estimate the ring-flip rate of cyclohexane ($\Delta G^\ddagger = 45$ kJ/mol), in units of $10^4\ \text{s}^{-1}$.`, 6.2e12 * Math.exp(-45 / RT) / 1e4, [R`$e^{-45/2.478}$.`], R`$6.2\times10^{12}\cdot1.3\times10^{-8} = 8\times10^4\ \text{s}^{-1}$.`),
      P('olympiad', 'num', 'Locking groups', R`tert-Butyl has an A-value of 20 kJ/mol. What fraction of tert-butylcyclohexane has it axial at 298 K? (Answer in units of $10^{-4}$.)`, 1e4 / (1 + Math.exp(20 / RT)), [R`$1/(1 + e^{\Delta G/RT})$.`], R`$e^{-8.07} = 3.1\times10^{-4}$.`),
      P('olympiad', 'num', 'Resolving power', R`A racemic acid is resolved; the recovered acid has $[\alpha] = -28.0$ while the pure (−) enantiomer has $-35.0$. What is the ratio of major to minor enantiomer?`, 9, [R`ee = 80%.`], R`90 : 10, ratio 9.`)
    ],
    drills: [
      { title: 'ee from rotation', gen: (r) => { const p = r.pick([20, 40, 50, 66, 80]), o = r.int(1, 9) * p / 10; return { q: R`<p>Observed $[\alpha] = ${f(o, 3)}$; pure enantiomer ${p}. ee (%)?</p>`, answer: 100 * o / p, tol: 0.01, solution: R`<p>$100\cdot${f(o, 3)}/${p} = ${f(100 * o / p, 4)}\%$.</p>` }; } },
      { title: 'Conformer equilibrium', gen: (r) => { const g = r.pick([1, 2, 3.8, 5, 7.3, 9]); return { q: R`<p>A-value ${g} kJ/mol at 298 K: percentage equatorial?</p>`, answer: 100 * eqFrac(g, 298), tol: 0.01, solution: R`<p>$K = e^{${g}/2.478}$: ${f(100 * eqFrac(g, 298), 4)}%.</p>` }; } }
    ],
    predict: { q: 'A methyl group on cyclohexane (A-value 7.3 kJ/mol) at room temperature spends what fraction of its time equatorial?', o: ['about 95%', 'about 50%', 'about 75%'], a: 0, how: 'set ΔG to 7.3 kJ/mol at 298 K in the chair lab.', why: 'K = e^(7300/RT) ≈ 19, so 19 out of 20 molecules are equatorial at any moment.' },
    wild: ['Single-enantiomer drugs', 'Many modern drugs, such as esomeprazole (Nexium) and the antidepressant escitalopram, are sold as single enantiomers after the racemic versions were found to work mainly through one form.']
  });

  /* ================= Clayden 6, 9–11: carbonyl chemistry ================= */
  const HYD = { hcho: [2280, 'formaldehyde, HCHO'], mecho: [1.06, 'acetaldehyde, CH₃CHO'], acetone: [1.4e-3, 'acetone, (CH₃)₂CO'], chloral: [2.8e4, 'chloral, Cl₃CCHO'], hfa: [1.2e6, 'hexafluoroacetone, (CF₃)₂CO'] };
  const fischer = (K, r) => { if (Math.abs(K - 1) < 1e-9) return r / (1 + r); const a = K - 1, b = -K * (1 + r), c = K * r; return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a); };
  PB.tbChapter({
    id: 'chem-carbonyl', subject: 'chemistry', title: 'Carbonyl Chemistry',
    subtitle: R`The most important functional group in synthesis. Nucleophilic addition to aldehydes and ketones (hydrates, cyanohydrins, hemiacetals, hydride reduction), organometallic reagents that build C–C bonds, substitution at acyl derivatives through tetrahedral intermediates, and substitution with loss of oxygen: acetals, imines, enamines and the Wittig reaction.`,
    big: 'The C=O bond is polarised: its carbon is electron-poor and its π* orbital is empty and low-lying, so nucleophiles attack it. What happens next decides everything: aldehydes and ketones keep the new group (addition); acid derivatives with a leaving group kick it out (substitution); and with acid catalysis even the oxygen itself can be replaced (acetals, imines, alkenes).',
    goals: ['Explain the electrophilicity of C=O and the Bürgi–Dunitz trajectory', 'Predict how substituents affect hydrate and hemiacetal equilibria', 'Plan syntheses of alcohols and acids using Grignard and organolithium reagents', 'Rank acyl derivatives by reactivity and explain it with leaving-group pKaH', 'Drive equilibria such as Fischer esterification and acetal formation', 'Describe the mechanisms of imine, enamine and acetal formation and the Wittig reaction'],
    prereqs: ['chem-synthesis', 'chem-acidity'],
    sections: [
      { title: 'Nucleophilic addition to C=O', plain: 'Nucleophiles attack the electron-poor carbon of a carbonyl from an angle of about 107°; aldehydes react more readily than ketones, and electron-withdrawing groups push equilibria such as hydrate formation towards addition.', html: R`
<p>Oxygen pulls electron density from the C=O π bond, leaving the carbon partly positive, and the empty π* orbital lies low in energy, mostly on carbon. A nucleophile therefore attacks the carbon, not along the C=O axis but at about 107° to it (the <strong>Bürgi–Dunitz angle</strong>), where it overlaps best with π*. The carbon goes from trigonal (sp², 120°) to tetrahedral (sp³, 109.5°), and the oxygen becomes an alkoxide, usually protonated later.</p>
<ul><li><strong>Hydride</strong> (from NaBH₄ or the more reactive LiAlH₄) reduces aldehydes to primary alcohols and ketones to secondary alcohols.</li>
<li><strong>Cyanide</strong> (HCN with a little base) gives <strong>cyanohydrins</strong>, useful because CN can later become an acid or amine.</li>
<li><strong>Water</strong> gives <strong>hydrates</strong> (gem-diols), and <strong>alcohols</strong> give <strong>hemiacetals</strong>, both usually reversible.</li></ul>
<p>Aldehydes are more reactive than ketones: one fewer alkyl group to donate electron density and to crowd the more cramped tetrahedral product. Electron-withdrawing groups make addition more favourable; ring strain released on going from 120° to 109° helps too (cyclopropanone exists mainly as its hydrate).</p>
<div class="worked"><p>Hydration equilibrium constants ($K = [\text{hydrate}]/[\text{carbonyl}]$ in water) are about 2280 for formaldehyde, 1.06 for acetaldehyde and $1.4\times10^{-3}$ for acetone. What fraction of each is hydrated?</p>
<p>Fraction $= K/(1 + K)$: 99.96%, 51% and 0.14%. Chloral, Cl₃CCHO, is so electron-poor that its hydrate is a stable solid (chloral hydrate, an old sedative).</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A carbonyl compound has a hydration constant of 0.25. What percentage is hydrated at equilibrium?`, 20, [R`$K/(1 + K)$.`], R`$0.25/1.25 = 20\%$.`)] },
      { title: 'Organometallic reagents make C–C bonds', plain: 'Grignard and organolithium reagents act as carbon nucleophiles that add to carbonyl groups, making new carbon–carbon bonds and building primary, secondary or tertiary alcohols, but they are destroyed by water and acids.', html: R`
<p>Metals are less electronegative than carbon, so in RMgBr (a <strong>Grignard reagent</strong>, made from RBr and magnesium in dry ether) and RLi (an <strong>organolithium</strong>) the carbon carries a partial negative charge and behaves as a carbon nucleophile, and as a very strong base. Any water, alcohol or acid destroys it: RMgBr + H₂O → RH. Reagents must be made and used in dry ether or THF.</p>
<p>Adding to a carbonyl builds a C–C bond, and acid work-up gives an alcohol:</p>
<ul><li>formaldehyde → primary alcohol (one carbon added);</li>
<li>other aldehydes → secondary alcohols;</li>
<li>ketones → tertiary alcohols;</li>
<li>CO₂ (dry ice) → carboxylic acids;</li>
<li>esters → tertiary alcohols, because the ketone formed first is more reactive than the ester and adds a second equivalent.</li></ul>
<div class="worked"><p>Plan three syntheses of 2-phenylbutan-2-ol, PhC(OH)(CH₃)(CH₂CH₃), from a ketone and a Grignard reagent.</p>
<p>Disconnect any of the three bonds to the carbinol carbon: PhMgBr + butan-2-one; CH₃MgBr + propiophenone (PhCOEt); or EtMgBr + acetophenone (PhCOMe). The best choice uses the cheapest, most easily handled pieces.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Phenylmagnesium bromide is poured onto dry ice (solid CO₂), then acidified. The product is…`, ['benzoic acid', 'benzene', 'phenol', 'benzaldehyde'], 0, [R`The carbon nucleophile adds to CO₂.`], R`PhCOO⁻MgBr⁺, protonated to PhCOOH.`)] },
      { title: 'Substitution at the carbonyl group', plain: 'Acid derivatives react by addition then elimination through a tetrahedral intermediate; the better the leaving group, the more reactive the derivative, so acid chlorides react fastest and amides slowest, and equilibria like esterification are pushed by excess reagent or removing water.', html: R`
<p>When the carbonyl carbon carries a group that can leave, nucleophilic attack gives a <strong>tetrahedral intermediate</strong> that collapses, expelling the best leaving group and regenerating C=O: overall <strong>substitution</strong> (addition–elimination).</p>
<p>Reactivity follows leaving-group ability, which tracks the pKa of the leaving group's conjugate acid (lower is better), together with how much the group's lone pairs stabilise the carbonyl by donation:</p>
<div class="key"><p>acid chloride (Cl⁻; HCl pKa −7) > anhydride (RCOO⁻; 4.8) > ester (RO⁻; 16) ≈ acid > amide (R₂N⁻; 35) > carboxylate</p></div>
<p>So any derivative can be made from one higher up the ladder: acid chloride + alcohol → ester; ester + amine → amide; but not the reverse without special help. Amides are so stable (their nitrogen lone pair is strongly delocalised into C=O) that proteins survive for years in water.</p>
<h3 class="sub">Pushing equilibria</h3>
<p><strong>Fischer esterification</strong> (acid + alcohol with an acid catalyst) has $K \approx 4$ for simple cases. Acid catalysis protonates the carbonyl oxygen, making it more electrophilic. Yields are raised by using excess alcohol or by removing water as it forms. Base hydrolysis of esters (<strong>saponification</strong>) is irreversible, because the carboxylate formed cannot be attacked by alkoxide.</p>
<div class="worked"><p>With $K = 4$, what is the equilibrium yield of ester from 1 mol acid with 1 mol and with 10 mol alcohol?</p>
<p>1 : 1: $x^2/(1 - x)^2 = 4$ gives $x = 2/3$ (67%). 1 : 10: $x^2/[(1 - x)(10 - x)] = 4$ gives $3x^2 - 44x + 40 = 0$, $x = 0.97$ (97%).</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which acyl derivative reacts fastest with water?`, ['acetyl chloride', 'ethyl acetate', 'acetamide', 'acetic anhydride'], 0, [R`Best leaving group.`], R`Acetyl chloride fumes in moist air; Cl⁻ is an excellent leaving group.`)] },
      { title: 'Losing the oxygen: acetals, imines and the Wittig reaction', plain: 'With acid catalysis, a carbonyl oxygen can be replaced completely: two alcohols give an acetal (a protecting group), amines give imines or enamines, and phosphorus ylides swap the oxygen for a carbon to make alkenes.', html: R`
<p>After addition, a protonated OH can leave as water, giving a cation that a second nucleophile captures. The carbonyl oxygen is then lost entirely.</p>
<ul><li><strong>Acetals</strong>: an aldehyde or ketone + two alcohols (or one diol) with acid catalysis, removing water. Acetals are stable to base, nucleophiles and reducing agents, so they <strong>protect</strong> carbonyl groups during other reactions, and aqueous acid removes them. Sugars are cyclic hemiacetals; glycosidic bonds are acetals.</li>
<li><strong>Imines</strong> (C=N–R) form from primary amines; <strong>enamines</strong> (C=C–NR₂) from secondary amines. The rate is fastest at mildly acidic pH (about 4–6): acid is needed to make water leave, but too much acid protonates the amine nucleophile. <strong>Reductive amination</strong> (imine formation plus NaBH₃CN) makes amines.</li>
<li>Derivatives such as 2,4-dinitrophenylhydrazones were once used to identify aldehydes and ketones by their melting points.</li></ul>
<h3 class="sub">The Wittig reaction</h3>
<p>A phosphonium salt, Ph₃P⁺–CH₂R, deprotonated by a strong base gives a <strong>phosphorus ylide</strong>, Ph₃P=CHR. It attacks a carbonyl, forming a four-membered oxaphosphetane that breaks into an <strong>alkene</strong> and triphenylphosphine oxide; the very strong P=O bond drives the reaction. The C=C forms exactly where the C=O was.</p>
<div class="worked"><p>What forms from cyclohexanone and Ph₃P=CH₂?</p>
<p>Methylenecyclohexane, C₆H₁₀=CH₂, with the double bond outside the ring: hard to make cleanly by elimination, which tends to give the more substituted 1-methylcyclohexene.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`An acetal protecting group survives which conditions?`, ['aqueous base and Grignard reagents', 'aqueous acid', 'both acid and base', 'neither'], 0, [R`It is removed by acid.`], R`Acetals are stable to base and nucleophiles, cleaved by aqueous acid.`)] }
    ],
    figures: [{ s: 0, title: 'How much is hydrated?', caption: 'Fraction of a carbonyl compound present as its hydrate in water. Electron-withdrawing groups and less steric crowding favour the hydrate.', params: { aspect: 0.4, minH: 210, controls: [{ id: 'c', type: 'select', label: 'Carbonyl compound', value: 'mecho', options: Object.keys(HYD).map((k) => [k, HYD[k][1]]) }],
      plots: [{ x: [-4, 7], y: [0, 1.05], xlabel: 'log₁₀ K (hydration)', ylabel: 'fraction hydrated', curves: () => [{ f: (lk) => Math.pow(10, lk) / (1 + Math.pow(10, lk)) }], pts: (v) => [{ x: Math.log10(HYD[v.c][0]), y: HYD[v.c][0] / (1 + HYD[v.c][0]) }] }],
      readout: (v) => [['K', f(HYD[v.c][0], 3)], ['hydrated', f(100 * HYD[v.c][0] / (1 + HYD[v.c][0]), 4) + '%']] } }],
    labs: [{ sim: 'explore', title: 'Pushing an equilibrium: Fischer esterification', desc: 'Equilibrium yield of ester from 1 mol of carboxylic acid against the moles of alcohol used, for a given equilibrium constant K.',
      tasks: ['With K = 4 and a 1 : 1 ratio, what is the yield?', 'How much alcohol gives a 90% yield?', 'Why is removing water (Dean–Stark trap) even more effective?'],
      params: { aspect: 0.42, controls: [S('K', 'Equilibrium constant K', 0.5, 20, 0.1, 4), S('r', 'Alcohol : acid ratio', 0.2, 20, 0.1, 1)],
        plots: [{ x: [0, 20], y: [0, 1.02], xlabel: 'alcohol : acid', ylabel: 'equilibrium yield', curves: (v) => [{ f: (r) => r > 0 ? fischer(v.K, r) : 0 }], pts: (v) => [{ x: v.r, y: fischer(v.K, v.r) }] }],
        readout: (v) => [['yield', f(100 * fischer(v.K, v.r)) + '%'], ['ester formed', f(fischer(v.K, v.r)) + ' mol']] } }],
    formulas: [['Hydrate fraction', '\\dfrac{K}{1 + K}'], ['Esterification', 'K = \\dfrac{[\\text{ester}][\\text{H}_2\\text{O}]}{[\\text{acid}][\\text{alcohol}]}'], ['Reactivity ladder', '\\text{RCOCl} > (\\text{RCO})_2\\text{O} > \\text{RCOOR}′ > \\text{RCONR}′_2'], ['Grignard', '\\text{RMgBr} + \\text{R}′_2\\text{C=O} \\rightarrow \\text{R}′_2\\text{C(OH)R}']],
    problems: [
      M('concept', 'Aldehydes versus ketones', R`Aldehydes are more reactive towards nucleophiles than ketones mainly because…`, ['they have less steric hindrance and less electron donation to the carbonyl carbon', 'their C=O bond is weaker', 'they are more acidic', 'they have no α-hydrogens'], 0, [R`Count the alkyl groups.`], R`One H instead of an alkyl group: less crowded, more electrophilic.`),
      M('concept', 'Grignards and water', R`Ethylmagnesium bromide is accidentally exposed to water. It becomes…`, ['ethane', 'ethanol', 'ethene', 'bromoethane'], 0, [R`It is a strong base.`], R`Protonation gives the alkane.`),
      M('concept', 'Most reactive derivative', R`Which is the most reactive towards nucleophilic acyl substitution?`, ['an acid chloride', 'an ester', 'an amide', 'a carboxylate'], 0, [R`Best leaving group.`], R`Chloride leaves most easily.`),
      M('concept', 'Acetal formation', R`Acetal formation from a ketone and ethane-1,2-diol needs…`, ['an acid catalyst and removal of water', 'a strong base', 'a Grignard reagent', 'light'], 0, [R`The OH must leave as water.`], R`Acid catalysis; removing water drives the equilibrium.`),
      P('core', 'num', 'Acetaldehyde hydrate', R`Acetaldehyde has a hydration constant of 1.06. Percentage hydrated?`, 100 * 1.06 / 2.06, [R`$K/(1 + K)$.`], R`$51\%$.`),
      P('core', 'num', 'Acetone hydrate', R`Acetone's hydration constant is $1.4\times10^{-3}$. Percentage hydrated?`, 100 * 1.4e-3 / 1.0014, [R`$K/(1 + K) \approx K$.`], R`$0.14\%$.`),
      P('core', 'num', 'Esterification 1 : 1', R`$K = 4$, 1 mol acid and 1 mol alcohol: equilibrium yield of ester (%)?`, 100 * 2 / 3, [R`$x^2/(1 - x)^2 = 4$.`], R`$x = 2/3$: 67%.`),
      P('core', 'num', 'Esterification 1 : 3', R`$K = 4$, 1 mol acid and 3 mol alcohol: yield (%)?`, 100 * fischer(4, 3), [R`$x^2/[(1 - x)(3 - x)] = 4$.`], R`$3x^2 - 16x + 12 = 0$: $x = 0.90$.`),
      M('core', 'Esters and Grignards', R`Methyl benzoate is treated with excess CH₃MgBr, then acid. The product is…`, ['2-phenylpropan-2-ol', 'acetophenone', '1-phenylethanol', 'benzoic acid'], 0, [R`Two equivalents add.`], R`Addition, loss of methoxide to give acetophenone, then a second addition: PhC(OH)(CH₃)₂.`),
      M('core', 'Wittig', R`Benzaldehyde + Ph₃P=CHCH₃ gives…`, ['PhCH=CHCH₃ (1-phenylpropene)', 'PhCH₂CH₂CH₃', 'PhCOCH₂CH₃', 'PhCH(OH)CH₂CH₃'], 0, [R`C=O becomes C=C at the same place.`], R`The ylide carbon replaces the oxygen.`),
      P('olympiad', 'num', 'A large excess', R`$K = 4$, 1 mol acid with 10 mol alcohol: equilibrium yield (%)?`, 100 * fischer(4, 10), [R`$3x^2 - 44x + 40 = 0$.`], R`$97\%$.`),
      P('olympiad', 'num', 'Grignard yield', R`5.00 g bromobenzene (157 g/mol) is made into PhMgBr and poured onto dry ice; the overall yield of benzoic acid (122 g/mol) is 80%. Mass of benzoic acid (g)?`, 5 / 157 * 0.8 * 122, [R`mol PhBr → mol PhCOOH.`], R`$0.0318\cdot0.8\cdot122 = 3.11$ g.`),
      P('olympiad', 'num', 'Best pH for imines', R`Imine formation needs free amine (pKaH 10) and a protonated hemiaminal OH (pKa of that protonated form about 2). Taking the rate as proportional to the product of the two fractions, at what pH is it fastest?`, 6, [R`The product of $1/(1 + 10^{10 - \text{pH}})$ and $1/(1 + 10^{\text{pH} - 2})$ peaks midway.`], R`In this simple model the product peaks where $10^{10 - \text{pH}} = 10^{\text{pH} - 2}$: pH 6, mildly acidic. Too acidic, and the amine is protonated; too basic, and water cannot leave.`),
      P('olympiad', 'num', 'Removing water', R`An esterification with $K = 4$ starts from 1 mol acid and 1 mol alcohol. If 0.5 mol of water is removed after it forms (so the final water is $x - 0.5$), what is the yield? Solve $x(x - 0.5)/(1 - x)^2 = 4$.`, (7.5 - Math.sqrt(56.25 - 48)) / 6, [R`$3x^2 - 7.5x + 4 = 0$.`], R`$x = (7.5 - \sqrt{8.25})/6 = 0.77$: removing water pushes the yield up from 67%.`)
    ],
    drills: [
      { title: 'Hydrate fraction', gen: (r) => { const K = r.pick([0.001, 0.01, 0.1, 0.5, 1, 2, 10, 100]); return { q: R`<p>Hydration constant ${K}. Percentage hydrated?</p>`, answer: 100 * K / (1 + K), tol: 0.01, solution: R`<p>$100K/(1 + K) = ${f(100 * K / (1 + K), 4)}\%$.</p>` }; } },
      { title: 'Esterification yield', gen: (r) => { const K = r.pick([2, 4, 6]), n = r.pick([1, 2, 3, 5, 10]); return { q: R`<p>$K = ${K}$; 1 mol acid with ${n} mol alcohol. Equilibrium yield (%)?</p>`, answer: 100 * fischer(K, n), tol: 0.01, solution: R`<p>Solve $x^2 = ${K}(1 - x)(${n} - x)$: ${f(100 * fischer(K, n), 4)}%.</p>` }; } }
    ],
    predict: { q: 'With equal amounts of acid and alcohol and K = 4, the equilibrium yield of ester is about…', o: ['67%', '50%', '80%'], a: 0, how: 'set K = 4 and a 1 : 1 ratio in the esterification lab.', why: 'x²/(1 − x)² = 4 gives x/(1 − x) = 2, so x = 2/3.' },
    wild: ['Making medicines', 'Grignard additions, reductive aminations and amide couplings are among the most used reactions in the pharmaceutical industry; forming amide bonds is the single most common reaction in medicinal chemistry.']
  });
})();
