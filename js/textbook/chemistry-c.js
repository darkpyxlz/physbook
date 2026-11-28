/* Organic chemistry chapters following Clayden: ch. 34–35 (pericyclic), 37–38 (radicals and carbenes),
   12, 36, 39 (determining mechanisms), 27, 40–41 (organometallics and asymmetric synthesis), 42–43 (the
   organic chemistry of life). Original text. */
(function () {
  const { R, f, S, QN, QM, P, M } = PB.tbKit();
  const RT = 8.314 * 298 / 1000;

  /* ================= Clayden 34–35: pericyclic reactions ================= */
  const huckel = (N) => Array.from({ length: N }, (_, i) => 2 * Math.cos((i + 1) * Math.PI / (N + 1)));
  const gap = (N) => 4 * Math.sin(Math.PI / (2 * (N + 1)));
  const WH = (e, mode, kind) => { const fourN = e % 4 === 0; if (kind === 'elec') return (fourN === (mode === 'thermal')) ? 'conrotatory' : 'disrotatory'; const allowed = fourN ? mode !== 'thermal' : mode === 'thermal'; return allowed ? 'allowed (suprafacial on both components)' : 'forbidden suprafacially (needs an antarafacial component)'; };
  PB.tbChapter({
    id: 'chem-pericyclic', subject: 'chemistry', title: 'Pericyclic Reactions',
    subtitle: R`Reactions that happen in one concerted step around a ring of electrons. The Diels–Alder reaction and its stereochemistry, frontier molecular orbitals and the Woodward–Hoffmann rules, electrocyclic ring closures (conrotatory and disrotatory), and sigmatropic rearrangements such as the Cope and Claisen.`,
    big: 'In a pericyclic reaction, bonds break and form together as electrons flow around a ring, with no intermediates. Whether such a reaction can happen, and with what stereochemistry, follows from the symmetry of the molecular orbitals involved, a discovery by Woodward and Hoffmann that turned "no-mechanism" reactions into some of the most predictable in chemistry.',
    goals: ['Predict Diels–Alder products, including regiochemistry, stereospecificity and the endo rule', 'Construct Hückel π orbitals for linear polyenes and identify HOMO and LUMO', 'Apply frontier-orbital and Woodward–Hoffmann rules to cycloadditions', 'Predict conrotatory or disrotatory electrocyclic reactions under heat or light', 'Recognise [3,3]-sigmatropic Cope and Claisen rearrangements and [1,5]-hydrogen shifts', 'Relate conjugation length to HOMO–LUMO gap and colour'],
    prereqs: ['chem-stereo', 'chem-bonding'],
    sections: [
      { title: 'The Diels–Alder reaction', plain: 'A diene and an alkene join in one step to form a six-membered ring; the diene must be able to sit in an s-cis shape, the stereochemistry of both partners is kept, and the endo product usually forms fastest.', html: R`
<p>In the <strong>Diels–Alder reaction</strong> a conjugated <strong>diene</strong> and an alkene (the <strong>dienophile</strong>) combine in one step to make a cyclohexene: two new σ bonds form as three π bonds become one. It is a <strong>[4 + 2] cycloaddition</strong> (four π electrons from the diene, two from the dienophile). It works best with an electron-rich diene and an electron-poor dienophile (bearing C=O, CN or NO₂).</p>
<ul><li>The diene must adopt the <strong>s-cis</strong> conformation (both double bonds on the same side of the central single bond). Cyclopentadiene, locked s-cis, is extremely reactive; it even dimerises on standing.</li>
<li>The reaction is <strong>stereospecific</strong>: groups cis on the dienophile end up cis in the ring, because both new bonds form on the same face of each component (suprafacial).</li>
<li>With cyclic dienes, the <strong>endo</strong> product, with the dienophile's substituents tucked under the diene, usually forms faster than the more stable exo product, attributed to favourable secondary orbital interactions in the transition state: a kinetic preference.</li>
<li>Unsymmetrical partners give mainly "ortho" (1,2) and "para" (1,4) products.</li></ul>
<div class="worked"><p>Cyclopentadiene reacts with maleic anhydride. How many stereocentres does the endo adduct have?</p>
<p>Four: the two bridgehead carbons and the two carbons that carried the dienophile's double bond. Only one diastereomer (endo, cis) forms, as a racemate.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Why does (2Z,4Z)-hexa-2,4-diene react very slowly as a Diels–Alder diene?`, ['Its terminal methyl groups clash in the s-cis conformation it needs', 'It is not conjugated', 'It has too many electrons', 'It is aromatic'], 0, [R`Picture the s-cis shape.`], R`The two inward-pointing methyls collide when the diene turns s-cis.`)] },
      { title: 'Frontier orbitals and the Woodward–Hoffmann rules', plain: 'Pericyclic reactions are allowed when the highest filled orbital of one partner can overlap in phase with the lowest empty orbital of the other; this simple symmetry rule explains why [4+2] cycloadditions work with heat while [2+2] cycloadditions need light.', html: R`
<p>For a linear chain of $N$ conjugated p orbitals, simple Hückel theory gives π orbital energies</p>
<div class="key"><p>$E_k = \alpha + 2\beta\cos\dfrac{k\pi}{N + 1},\quad k = 1, \dots, N$</p></div>
<p>where α is the energy of an isolated p orbital and β (negative) measures the interaction between neighbours. Orbital $\psi_k$ has $k - 1$ nodes. For butadiene ($N = 4$): $\alpha + 1.618\beta$, $\alpha + 0.618\beta$ (filled, ψ₂ is the HOMO), $\alpha - 0.618\beta$ (LUMO), $\alpha - 1.618\beta$.</p>
<div class="worked"><p>Compare the HOMO–LUMO gaps of ethene, butadiene and hexatriene.</p>
<p>The gap for an even chain is $4|\beta|\sin\dfrac{\pi}{2(N + 1)}$: 2.00, 1.24 and 0.89 $|\beta|$. Longer conjugation, smaller gap, longer absorption wavelength, as in the colour of β-carotene.</p></div>
<div data-fig="0"></div>
<p>In a cycloaddition, the HOMO of one component must overlap with the LUMO of the other with the <em>same phase at both ends</em> where bonds form. For the Diels–Alder reaction (diene HOMO ψ₂ with alkene LUMO π*), both ends match: thermally <strong>allowed</strong>. For two alkenes joining in a [2 + 2] cycloaddition, the HOMO (π) and LUMO (π*) have opposite phases at one end: thermally <strong>forbidden</strong> suprafacially. Light promotes an electron so the excited HOMO is π*, and the [2 + 2] becomes allowed photochemically. The general rule (Woodward–Hoffmann, Nobel 1981 for Hoffmann with Fukui): a suprafacial cycloaddition of $4n + 2$ electrons is thermally allowed; of $4n$ electrons, photochemically allowed.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many nodes (excluding the molecular plane) does ψ₃ of butadiene have?`, 2, [R`$\psi_k$ has $k - 1$ nodes.`], R`2.`)] },
      { title: 'Electrocyclic reactions', plain: 'A conjugated polyene can close into a ring by joining its two ends; the ends twist either the same way (conrotatory) or opposite ways (disrotatory), decided by the number of electrons and whether heat or light drives the reaction.', html: R`
<p>In an <strong>electrocyclic</strong> reaction the ends of a conjugated polyene join into a ring (or a ring opens), converting a π bond into a σ bond. To form the bond, the terminal p orbitals must rotate. In the HOMO they rotate so that lobes of the same phase meet:</p>
<div class="table-wrap"><table class="data"><tr><th>π electrons</th><th>Heat</th><th>Light</th></tr><tr><td>4n (4, 8…)</td><td>conrotatory</td><td>disrotatory</td></tr><tr><td>4n + 2 (6, 10…)</td><td>disrotatory</td><td>conrotatory</td></tr></table></div>
<p>The rotation sense fixes the stereochemistry. Heating (2E,4Z,6E)-octa-2,4,6-triene (6π, disrotatory) gives <em>cis</em>-5,6-dimethylcyclohexa-1,3-diene; irradiation (conrotatory) gives the <em>trans</em> isomer. Heating (2E,4E)-hexa-2,4-diene's ring-closed partner, <em>trans</em>-3,4-dimethylcyclobutene, opens conrotatorily back to the E,E-diene.</p>
<div class="worked"><p>Your skin makes vitamin D this way. Sunlight opens a ring of 7-dehydrocholesterol (a 6π electrocyclic ring opening). Which rotation, and what follows?</p>
<p>Photochemical 6π: conrotatory. The product, previtamin D₃, then undergoes a thermal [1,7]-hydrogen shift at body temperature to give vitamin D₃. This is why sunlight prevents rickets.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A thermal 6π electrocyclic ring closure is…`, ['disrotatory', 'conrotatory', 'forbidden', 'either, at random'], 0, [R`4n + 2 electrons with heat.`], R`Six electrons, thermal: disrotatory.`)] },
      { title: 'Sigmatropic rearrangements', plain: 'In a sigmatropic rearrangement a σ bond moves along a π system in one step; the [3,3] Cope and Claisen rearrangements pass through a chair-shaped six-membered transition state, and hydrogens can hop five atoms around a ring.', html: R`
<p>In a <strong>sigmatropic rearrangement</strong>, a σ bond migrates across a π system. The numbers [i,j] count how far each end of the bond moves.</p>
<ul><li><strong>[3,3]-Cope</strong>: a hexa-1,5-diene rearranges to an isomeric 1,5-diene via a chair-like six-membered transition state, so stereochemistry is transferred predictably.</li>
<li><strong>[3,3]-Claisen</strong>: an allyl vinyl ether gives a γ,δ-unsaturated carbonyl compound, driven by forming C=O. Allyl phenyl ether rearranges on heating to 2-allylphenol (via a dienone that re-aromatises by tautomerism). Nature uses a Claisen rearrangement: the enzyme chorismate mutase converts chorismate to prephenate on the way to phenylalanine and tyrosine.</li>
<li><strong>[1,5]-hydrogen shifts</strong> are thermally allowed suprafacially: substituted cyclopentadienes scramble their substituents round the ring at room temperature.</li></ul>
<p>The Fischer indole synthesis and many biosynthetic steps contain [3,3] shifts; together with cycloadditions and electrocyclic reactions, they let chemists build complex rings with complete stereocontrol.</p>
<div class="worked"><p>What does allyl vinyl ether, CH₂=CH–O–CH₂–CH=CH₂, give on heating?</p>
<p>Number the six atoms C=C–O–C–C=C. The O–C(allyl) σ bond (between atoms 3 and 4) breaks and a new bond forms between atoms 1 and 6: pent-4-enal, CH₂=CH–CH₂–CH₂–CHO.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Allyl phenyl ether is heated to 200 °C. The main product is…`, ['2-allylphenol', '4-allylphenol', 'phenol and propene', 'allylbenzene'], 0, [R`[3,3] to the ortho carbon, then tautomerise.`], R`Claisen rearrangement to the ortho position.`)] }
    ],
    figures: [{ s: 1, title: 'Hückel orbitals of a polyene', caption: 'π orbital energies (in units of |β| relative to α; lower is more stable) for a chain of N conjugated carbons. Filled orbitals in blue, empty in red.', params: { aspect: 0.42, minH: 220, controls: [S('N', 'Conjugated carbons N', 2, 12, 2, 4)],
      plots: [{ x: [0, 13], y: [-2.2, 2.2], xlabel: 'orbital number k', ylabel: '(E − α)/|β|', zero: true, pts: (v) => huckel(v.N).map((e, i) => ({ x: i + 1, y: -e, color: i < v.N / 2 ? 'accent' : 'rust', r: 6 })) }],
      readout: (v) => [['HOMO', 'α + ' + f(huckel(v.N)[v.N / 2 - 1], 3) + 'β'], ['LUMO', 'α − ' + f(-huckel(v.N)[v.N / 2], 3) + 'β'], ['gap', f(gap(v.N), 3) + ' |β|']] } }],
    labs: [{ sim: 'explore', title: 'Conjugation and the HOMO–LUMO gap', desc: 'How the gap between the highest filled and lowest empty π orbitals shrinks as conjugation grows (simple Hückel theory), and the Woodward–Hoffmann verdict for a reaction you choose.',
      tasks: ['Compare the gaps for N = 2, 4, 6. Why do long polyenes look coloured?', 'Is a thermal 8π electrocyclic closure conrotatory or disrotatory?', 'Is a photochemical [2 + 2] cycloaddition allowed?'],
      params: { aspect: 0.42, controls: [S('N', 'Conjugated carbons N', 2, 22, 2, 6), { id: 'e', type: 'select', label: 'π electrons in the reaction', value: '6', options: [['4', '4'], ['6', '6'], ['8', '8']] }, { id: 'mode', type: 'select', label: 'Conditions', value: 'thermal', options: [['thermal', 'heat'], ['photo', 'light']] }],
        plots: [{ x: [2, 22], y: [0, 2.1], xlabel: 'conjugated carbons N', ylabel: 'HOMO–LUMO gap (|β|)', curves: () => [{ f: (n) => gap(n) }], pts: (v) => [{ x: v.N, y: gap(v.N) }] }],
        readout: (v) => [['gap', f(gap(v.N), 3) + ' |β|'], ['electrocyclic', WH(parseInt(v.e, 10), v.mode, 'elec')], ['cycloaddition', WH(parseInt(v.e, 10), v.mode, 'cyclo')]] } }],
    formulas: [['Hückel (linear chain)', 'E_k = \\alpha + 2\\beta\\cos\\dfrac{k\\pi}{N + 1}'], ['HOMO–LUMO gap', '\\Delta E = 4|\\beta|\\sin\\dfrac{\\pi}{2(N + 1)}'], ['Woodward–Hoffmann', '(4n + 2)\\ \\text{thermal supra}; \\ 4n\\ \\text{photochemical}'], ['Electrocyclic', '4n:\\ \\text{con (Δ)},\\ 4n + 2:\\ \\text{dis (Δ)}']],
    problems: [
      M('concept', 's-cis', R`For a Diels–Alder reaction the diene must be…`, ['able to adopt the s-cis conformation', 'locked s-trans', 'non-conjugated', 'aromatic'], 0, [R`The ends must reach the dienophile together.`], R`Only the s-cis conformation can react.`),
      M('concept', '[2 + 2]', R`Two ethene molecules forming cyclobutane in one concerted, suprafacial step is…`, ['thermally forbidden but photochemically allowed', 'thermally allowed', 'forbidden under all conditions', 'allowed only with a catalyst'], 0, [R`4n electrons.`], R`Four electrons: photochemically allowed.`),
      M('concept', 'Stereospecificity', R`Butadiene + dimethyl maleate (cis diester) gives a cyclohexene whose ester groups are…`, ['cis to each other', 'trans to each other', 'a mixture of cis and trans', 'on the same carbon'], 0, [R`Suprafacial on the dienophile.`], R`Cis geometry is retained.`),
      M('concept', '4π thermal', R`A thermal 4π electrocyclic ring opening of a cyclobutene is…`, ['conrotatory', 'disrotatory', 'forbidden', 'random'], 0, [R`4n electrons, heat.`], R`Conrotatory.`),
      P('core', 'num', 'Butadiene gap', R`Using simple Hückel theory, what is butadiene's HOMO–LUMO gap in units of $|\beta|$?`, gap(4), [R`$2(1.618) - $ … or $4\sin(\pi/10)$.`], R`$0.618 + 0.618 = 1.236$.`),
      P('core', 'num', 'Hexatriene gap', R`HOMO–LUMO gap of hexatriene ($N = 6$) in units of $|\beta|$?`, gap(6), [R`$4\sin(\pi/14)$.`], R`$0.890$.`),
      P('core', 'num', 'Stereocentres', R`How many stereocentres are in the Diels–Alder adduct of cyclopentadiene and maleic anhydride?`, 4, [R`Bridgeheads plus the two former alkene carbons.`], R`4.`),
      P('core', 'num', 'Counting nodes', R`How many nodes (excluding the molecular plane) does the LUMO of hexatriene have?`, 3, [R`The LUMO is ψ₄.`], R`$4 - 1 = 3$.`),
      M('core', 'Vitamin D', R`Formation of previtamin D₃ in the skin is…`, ['a photochemical 6π electrocyclic ring opening (conrotatory)', 'a thermal Diels–Alder reaction', 'a radical reaction', 'an enzyme-catalysed hydrolysis'], 0, [R`It needs sunlight.`], R`UV light opens the ring conrotatorily.`),
      M('core', 'Claisen product', R`Allyl vinyl ether rearranges on heating to…`, ['pent-4-enal', 'pent-2-enal', 'pentan-2-one', 'cyclopentanol'], 0, [R`New C–C bond between the ends; C=O forms.`], R`CH₂=CHCH₂CH₂CHO.`),
      P('olympiad', 'num', 'Delocalisation energy', R`Butadiene's total π energy is $4\alpha + 4.472\beta$; two isolated ethenes have $4\alpha + 4\beta$. What is the delocalisation energy in units of $|\beta|$?`, 0.472, [R`Difference of the β coefficients.`], R`$0.472|\beta|$.`),
      P('olympiad', 'num', 'Hexatriene HOMO', R`In Hückel theory, the HOMO of hexatriene lies at $\alpha + c\beta$. Find $c$.`, 2 * Math.cos(3 * Math.PI / 7), [R`$k = 3$, $N = 6$.`], R`$2\cos(3\pi/7) = 0.445$.`),
      M('olympiad', 'Hexadiene closure', R`Heating (2E,4Z)-hexa-2,4-diene would close (conrotatory) to give…`, ['cis-3,4-dimethylcyclobutene', 'trans-3,4-dimethylcyclobutene', 'cyclohexene', 'no product'], 0, [R`E,Z + conrotatory.`], R`Conrotatory closure of the E,Z isomer puts both methyls on the same face: cis.`),
      P('olympiad', 'num', 'Regioisomers', R`A 1-substituted diene reacts with a monosubstituted dienophile. Ignoring stereochemistry, how many regioisomeric cyclohexenes are possible?`, 2, [R`"ortho" or "meta".`], R`2; the "ortho" (1,2) product usually dominates.`)
    ],
    drills: [
      { title: 'Hückel gaps', gen: (r) => { const N = r.pick([2, 4, 6, 8, 10]); return { q: R`<p>HOMO–LUMO gap of a linear polyene with ${N} conjugated carbons (units of |β|)?</p>`, answer: gap(N), tol: 0.01, solution: R`<p>$4\sin(\pi/${2 * (N + 1)}) = ${f(gap(N), 4)}$.</p>` }; } }
    ],
    predict: { q: 'As a conjugated chain of alternating double bonds gets longer, its HOMO–LUMO gap…', o: ['shrinks', 'grows', 'stays the same'], a: 0, how: 'raise N in the conjugation lab.', why: 'More orbitals crowd into the same energy range, so the highest filled and lowest empty levels approach each other: long polyenes absorb visible light.' },
    wild: ['Vitamin D from sunlight', 'A light-driven electrocyclic ring opening in your skin, followed by a heat-driven hydrogen shift, makes vitamin D: a pericyclic sequence you run every sunny day.']
  });

  /* ================= Clayden 37–38: radicals and carbenes ================= */
  const ALK = { propane: ['propane', [6, 2, 0]], butane: ['butane', [6, 4, 0]], isobutane: ['2-methylpropane', [9, 0, 1]], isopentane: ['2-methylbutane', [9, 2, 1]] };
  const SEL = { Cl: [1, 3.8, 5], Br: [1, 82, 1600] };
  const prod = (alk, X) => { const n = ALK[alk][1], s = SEL[X], w = n.map((k, i) => k * s[i]), t = w[0] + w[1] + w[2]; return w.map((x) => 100 * x / t); };
  const clock = (c) => 2.3e5 / (2.3e5 + 2e6 * c);
  PB.tbChapter({
    id: 'chem-radicals', subject: 'chemistry', title: 'Radicals and Carbenes',
    subtitle: R`Chemistry with unpaired electrons. Radical stability and bond dissociation energies, chain reactions (halogenation, anti-Markovnikov addition, polymerisation, ozone destruction), selectivity and the Hammond postulate, radicals in synthesis (tin hydride, cyclisations, radical clocks), and carbenes: singlet and triplet, cyclopropanation and insertion.`,
    big: 'A radical has an unpaired electron and wants a partner. Radicals react fast and often in chains, one radical making the next thousands of times over. Their stability follows the same pattern as carbocations (tertiary best, allylic and benzylic better still), and their selectivity can be tuned: bromine atoms are choosy, chlorine atoms are not.',
    goals: ['Rank radical stabilities using bond dissociation energies', 'Write initiation, propagation and termination steps for chain reactions', 'Predict product ratios of radical halogenation from relative reactivities', 'Explain selectivity with the Hammond postulate', 'Use tin hydride reductions, radical cyclisations and radical clocks', 'Describe how carbenes form and react, and the stereochemistry of cyclopropanation'],
    prereqs: ['chem-mechanisms'],
    sections: [
      { title: 'Radical structure and stability', plain: 'Radicals form when bonds break evenly; the weaker the C–H bond, the more stable the radical left behind, so tertiary, allylic and benzylic radicals form most easily.', html: R`
<p>A <strong>radical</strong> has an unpaired electron. Radicals form by <strong>homolysis</strong>, a bond breaking with one electron going to each atom, driven by heat or light. <strong>Initiators</strong> have weak bonds: peroxides (O–O, about 150 kJ/mol), AIBN (which also releases very stable N₂) and halogens under light. Most carbon radicals are nearly planar, with the unpaired electron in a p orbital, and are detected by EPR spectroscopy.</p>
<p>Radical stability is read from <strong>bond dissociation energies</strong> (BDEs): the weaker the C–H bond, the more stable the radical formed.</p>
<div class="table-wrap"><table class="data"><tr><th>Bond</th><th>BDE (kJ/mol)</th></tr><tr><td>CH₃–H</td><td>439</td></tr><tr><td>primary, CH₃CH₂–H</td><td>423</td></tr><tr><td>secondary, (CH₃)₂CH–H</td><td>413</td></tr><tr><td>tertiary, (CH₃)₃C–H</td><td>404</td></tr><tr><td>benzylic, PhCH₂–H</td><td>377</td></tr><tr><td>allylic, CH₂=CHCH₂–H</td><td>372</td></tr></table></div>
<p>Alkyl groups stabilise radicals by hyperconjugation; allylic and benzylic radicals are stabilised much more by delocalisation. Bulky groups can make radicals <strong>persistent</strong>: the nitroxide TEMPO is stable enough to bottle.</p>
<div class="worked"><p>How much more stable is a tert-butyl radical than an ethyl radical, judged by BDEs?</p>
<p>$423 - 404 = 19$ kJ/mol. An allyl radical is 51 kJ/mol more stable than ethyl.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which radical is the most stable?`, ['allyl, CH₂=CH–CH₂•', 'methyl, CH₃•', 'ethyl, CH₃CH₂•', 'isopropyl, (CH₃)₂CH•'], 0, [R`Delocalisation beats hyperconjugation.`], R`The allyl radical is delocalised over two carbons.`)] },
      { title: 'Chain reactions and selectivity', plain: 'Radical reactions often run as chains in which each step makes a new radical; chlorine atoms attack almost any C–H, but bromine atoms strongly prefer weaker tertiary and secondary C–H bonds, because their reaction is uphill and its transition state resembles the radical.', html: R`
<p>Radical halogenation of alkanes is a <strong>chain reaction</strong>:</p>
<ul><li><strong>initiation</strong>: Cl₂ → 2 Cl• (light);</li>
<li><strong>propagation</strong>: Cl• + R–H → HCl + R•, then R• + Cl₂ → R–Cl + Cl• (the chain carrier is regenerated);</li>
<li><strong>termination</strong>: any two radicals combining.</li></ul>
<p>A single initiation can drive thousands of propagation cycles. Relative reactivities per hydrogen at room temperature:</p>
<div class="table-wrap"><table class="data"><tr><th></th><th>primary</th><th>secondary</th><th>tertiary</th></tr><tr><td>chlorination</td><td>1</td><td>3.8</td><td>5</td></tr><tr><td>bromination</td><td>1</td><td>82</td><td>1600</td></tr></table></div>
<div class="worked"><p>Predict the products of chlorination and of bromination of propane.</p>
<p>Six primary H and two secondary H. Chlorination: $6\cdot1 : 2\cdot3.8 = 6 : 7.6$, so 44% 1-chloropropane and 56% 2-chloropropane. Bromination: $6 : 164$, so 96% 2-bromopropane.</p></div>
<p>Why the difference? H-abstraction by Cl• is slightly exothermic (439 − 432 kJ/mol for methane), so its transition state comes early and resembles the reactants: it barely senses how stable the radical will be. Abstraction by Br• is endothermic (HBr is weaker, 366 kJ/mol), so its transition state comes late and resembles the radical: differences in radical stability show up strongly. This is the <strong>Hammond postulate</strong>.</p>
<p>Other chains: <strong>NBS</strong> brominates allylic positions; HBr with peroxides adds to alkenes <strong>anti-Markovnikov</strong> (Br• adds first, giving the more stable radical); radical <strong>polymerisation</strong> makes polystyrene and PVC; and chlorine atoms from CFCs destroy stratospheric ozone in a chain, Cl• + O₃ → ClO• + O₂, ClO• + O → Cl• + O₂.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Chlorination of 2-methylpropane (9 primary H, 1 tertiary H; reactivities 1 : 5). Percentage of tert-butyl chloride?`, 100 * 5 / 14, [R`Weight each by number × reactivity.`], R`$5/(9 + 5) = 36\%$.`)] },
      { title: 'Radicals in synthesis', plain: 'Chemists use tin hydride or silane chains to remove halogens, and to make radicals cyclise into five-membered rings; how fast a radical rearranges compared with being trapped acts as a clock for measuring other rates.', html: R`
<p><strong>Tributyltin hydride</strong> (Bu₃SnH) with AIBN replaces C–Br or C–I by C–H through a chain: Bu₃Sn• abstracts the halogen to give R•, and R• takes H from Bu₃SnH, regenerating Bu₃Sn•. (Less toxic silanes are now often used.)</p>
<p>If the radical R• has an alkene a few atoms away, it can <strong>cyclise</strong> before it is trapped. The 5-hexenyl radical closes mostly to a five-membered ring (cyclopentylmethyl radical), "5-exo", with rate constant about $2.3\times10^5\ \text{s}^{-1}$ at 25 °C, because the chain can reach the near end of the alkene easily. Radical cyclisations build rings in many natural-product syntheses.</p>
<h3 class="sub">Radical clocks</h3>
<p>A rearrangement of known rate competes with the reaction being studied, so product ratios measure the unknown rate. With tin hydride (trapping rate constant about $2\times10^6\ \text{M}^{-1}\text{s}^{-1}$):</p>
<div class="key"><p>$\dfrac{\text{cyclised}}{\text{uncyclised}} = \dfrac{k_c}{k_H[\text{Bu}_3\text{SnH}]}$</p></div>
<div class="worked"><p>With 0.10 M tin hydride, what fraction of 5-hexenyl radicals cyclise?</p>
<p>$k_H[\text{H}] = 2\times10^5\ \text{s}^{-1}$, so the ratio is $2.3/2 = 1.15$: 53% cyclised. Diluting the tin hydride favours cyclisation.</p></div>
<div data-fig="0"></div>
<p>Radicals also cause <strong>autoxidation</strong>: oxygen reacts with C–H bonds in fats and plastics in chains, turning butter rancid. <strong>Antioxidants</strong> such as vitamin E and BHT break the chains by donating a hydrogen atom to give a stabilised, unreactive radical.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`In a Bu₃SnH/AIBN reduction of an alkyl bromide, the chain-carrying radical that abstracts bromine is…`, ['Bu₃Sn•', 'R•', 'Br•', 'H•'], 0, [R`Which radical is regenerated?`], R`Bu₃Sn• takes Br; R• then takes H from Bu₃SnH, making Bu₃Sn• again.`)] },
      { title: 'Carbenes', plain: 'Carbenes are neutral carbon atoms with only two bonds and two non-bonding electrons; made from diazo compounds or chloroform and base, they add to alkenes to make three-membered rings and can insert into C–H bonds.', html: R`
<p>A <strong>carbene</strong> is a neutral species with a divalent carbon carrying two non-bonding electrons, R₂C:. In a <strong>singlet</strong> carbene the two electrons are paired in an sp² orbital, leaving an empty p orbital, so it is both nucleophilic and electrophilic. In a <strong>triplet</strong> carbene they are unpaired, and it behaves like a diradical.</p>
<p>Ways to make carbenes or carbene-like reagents:</p>
<ul><li>diazomethane, CH₂N₂, loses N₂ with light or heat;</li>
<li>chloroform with strong base loses H⁺ then Cl⁻ (α-elimination), giving <strong>dichlorocarbene</strong>, :CCl₂;</li>
<li>CH₂I₂ with a zinc–copper couple gives a zinc carbenoid (<strong>Simmons–Smith</strong>), a safe way to add CH₂.</li></ul>
<p>Singlet carbenes add to alkenes in one step, giving <strong>cyclopropanes</strong> stereospecifically (cis alkene → cis-disubstituted cyclopropane). Carbenes also <strong>insert</strong> into C–H bonds, and α-diazoketones lose N₂ and rearrange to ketenes (the <strong>Wolff rearrangement</strong>, used to add one CH₂ to a carboxylic acid). Stable <strong>N-heterocyclic carbenes</strong>, flanked by nitrogen atoms, are now everyday ligands for metal catalysts.</p>
<div class="worked"><p>Dichlorocarbene adds to cis-but-2-ene. Describe the product.</p>
<p>1,1-dichloro-2,3-dimethylcyclopropane with the two methyls cis. It has a mirror plane (through C1 and the midpoint of C2–C3), so although C2 and C3 are stereocentres, the molecule is achiral (meso).</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Singlet carbene additions to alkenes are stereospecific because…`, ['both new bonds form at the same time, so the alkene cannot rotate', 'carbenes are chiral', 'the reaction goes through a carbocation', 'triplet carbenes are involved'], 0, [R`Concerted.`], R`A one-step addition preserves the alkene geometry.`)] }
    ],
    figures: [{ s: 2, title: 'A radical clock', caption: 'Fraction of 5-hexenyl radicals that cyclise before tin hydride traps them, against tin hydride concentration.', params: { aspect: 0.4, minH: 210, controls: [S('c', '[Bu₃SnH]', 0.005, 1, 0.005, 0.1, 'M')],
      plots: [{ x: [0, 1], y: [0, 1.02], xlabel: '[Bu₃SnH] (M)', ylabel: 'fraction cyclised', curves: () => [{ f: (c) => clock(Math.max(c, 1e-4)) }], pts: (v) => [{ x: v.c, y: clock(v.c) }] }],
      readout: (v) => [['cyclised', f(100 * clock(v.c)) + '%'], ['ratio cyclised : straight', f(2.3e5 / (2e6 * v.c))]] } }],
    labs: [{ sim: 'explore', title: 'Halogenation selectivity', desc: 'Product distribution for radical chlorination or bromination of an alkane, from the number of each kind of hydrogen and the relative reactivity per hydrogen.',
      tasks: ['Compare chlorination and bromination of propane.', 'Which alkane and halogen give the most selective reaction?', 'Why is bromination used when one product is wanted?'],
      params: { aspect: 0.42, controls: [{ id: 'a', type: 'select', label: 'Alkane', value: 'propane', options: Object.keys(ALK).map((k) => [k, ALK[k][0]]) }, { id: 'X', type: 'select', label: 'Halogen', value: 'Cl', options: [['Cl', 'chlorine'], ['Br', 'bromine']] }],
        plots: [{ x: [0.5, 3.5], y: [0, 100], xlabel: 'primary (1), secondary (2), tertiary (3)', ylabel: '% of product', pts: (v) => prod(v.a, v.X).map((p, i) => ({ x: i + 1, y: p, r: 8, label: f(p, 3) + '%', color: ['accent', 'rust', 'teal'][i] })) }],
        readout: (v) => { const p = prod(v.a, v.X), n = ALK[v.a][1]; return [['hydrogens (1°/2°/3°)', n.join(' / ')], ['products (1°/2°/3°)', p.map((x) => f(x, 3)).join(' / ') + ' %']]; } } }],
    formulas: [['Radical stability', '\\text{lower BDE} \\Rightarrow \\text{more stable radical}'], ['Product ratio', '\\dfrac{n_i r_i}{\\sum n_j r_j}'], ['Radical clock', '\\dfrac{[\\text{cyclised}]}{[\\text{straight}]} = \\dfrac{k_c}{k_H[\\text{trap}]}'], ['Reaction enthalpy', '\\Delta H = \\text{BDE(broken)} - \\text{BDE(formed)}']],
    problems: [
      M('concept', 'Termination', R`Which is a termination step?`, ['CH₃• + Cl• → CH₃Cl', 'Cl• + CH₄ → HCl + CH₃•', 'CH₃• + Cl₂ → CH₃Cl + Cl•', 'Cl₂ → 2 Cl•'], 0, [R`Radicals are destroyed.`], R`Two radicals combine; no radical remains.`),
      M('concept', 'Peroxide effect', R`HBr adds to propene in the presence of peroxides to give mainly…`, ['1-bromopropane (anti-Markovnikov)', '2-bromopropane', 'propane', '1,2-dibromopropane'], 0, [R`Br• adds first to make the more stable radical.`], R`Br• adds to C1, giving the secondary radical, which takes H from HBr.`),
      M('concept', 'Initiators', R`AIBN is a good radical initiator because…`, ['it breaks easily on warming, releasing stable N₂', 'it is a strong acid', 'it contains a weak C–H bond', 'it is a carbene'], 0, [R`Loss of a very stable molecule.`], R`Formation of N₂ drives homolysis at about 70–80 °C.`),
      M('concept', 'Singlet carbenes', R`A singlet carbene has…`, ['two paired non-bonding electrons and an empty p orbital', 'two unpaired electrons', 'a positive charge', 'four bonds'], 0, [R`Paired electrons.`], R`Paired in an sp² orbital, empty p.`),
      P('core', 'num', 'Chlorinating propane', R`Percentage of 2-chloropropane from propane (6 primary H, 2 secondary H; reactivities 1 : 3.8)?`, prod('propane', 'Cl')[1], [R`$2\cdot3.8/(6 + 7.6)$.`], R`$56\%$.`),
      P('core', 'num', 'Brominating propane', R`Percentage of 2-bromopropane (reactivities 1 : 82)?`, prod('propane', 'Br')[1], [R`$164/(6 + 164)$.`], R`$96.5\%$.`),
      P('core', 'num', 'Radical stabilisation', R`Using BDEs (primary C–H 423, allylic C–H 372 kJ/mol), how much more stable is an allyl radical than a primary alkyl radical (kJ/mol)?`, 51, [R`Difference in BDE.`], R`51 kJ/mol.`),
      P('core', 'num', 'Bromination enthalpy', R`ΔH for Br• + CH₄ → HBr + CH₃• (BDEs: CH₃–H 439, H–Br 366 kJ/mol)?`, 73, [R`Broken minus formed.`], R`$+73$ kJ/mol: uphill, hence a late, selective transition state.`),
      P('core', 'num', 'Clock at 0.1 M', R`$k_c = 2.3\times10^5\ \text{s}^{-1}$, $k_H = 2\times10^6\ \text{M}^{-1}\text{s}^{-1}$, [Bu₃SnH] $= 0.10$ M. Percentage cyclised?`, 100 * clock(0.1), [R`Ratio $= k_c/k_H[\text{H}]$.`], R`Ratio 1.15: $53\%$.`),
      M('core', 'Cyclopropanation', R`Simmons–Smith reaction of trans-but-2-ene gives…`, ['trans-1,2-dimethylcyclopropane', 'cis-1,2-dimethylcyclopropane', 'methylcyclobutane', 'a mixture of cis and trans'], 0, [R`Stereospecific.`], R`Trans alkene → trans cyclopropane.`),
      P('olympiad', 'num', 'Tertiary bromide', R`Bromination of 2-methylpropane (9 primary H, 1 tertiary H; reactivities 1 : 1600). Percentage of tert-butyl bromide?`, prod('isobutane', 'Br')[2], [R`$1600/(9 + 1600)$.`], R`$99.4\%$.`),
      P('olympiad', 'num', 'Diluting the trap', R`At [Bu₃SnH] $= 0.05$ M, what fraction of 5-hexenyl radicals cyclise?`, clock(0.05), [R`$k_c/(k_c + k_H[\text{H}])$.`], R`$2.3/(2.3 + 1) = 0.70$.`),
      P('olympiad', 'num', 'Chain length', R`Each photon absorbed splits one Cl₂ into two Cl atoms, and each atom starts a chain of 5000 propagation cycles. How many molecules of HCl form per photon?`, 1e4, [R`Each cycle makes one HCl.`], R`$2\cdot5000 = 10^4$: the quantum yield of a chain reaction.`),
      P('olympiad', 'num', '2-Methylbutane', R`Chlorination of 2-methylbutane (9 primary, 2 secondary, 1 tertiary H; reactivities 1 : 3.8 : 5). Percentage of the tertiary chloride?`, prod('isopentane', 'Cl')[2], [R`$5/(9 + 7.6 + 5)$.`], R`$23\%$: chlorination gives messy mixtures.`)
    ],
    drills: [
      { title: 'Halogenation ratios', gen: (r) => { const a = r.pick(Object.keys(ALK)), X = r.pick(['Cl', 'Br']), p = prod(a, X), i = ALK[a][1][2] ? 2 : 1; return { q: R`<p>${X === 'Cl' ? 'Chlorination' : 'Bromination'} of ${ALK[a][0]}: percentage of the ${i === 2 ? 'tertiary' : 'secondary'} halide?</p>`, answer: p[i], tol: 0.01, solution: R`<p>Weight by number × reactivity: ${f(p[i], 4)}%.</p>` }; } }
    ],
    predict: { q: 'Bromination of propane gives 2-bromopropane as roughly what share of the monobromide product?', o: ['over 95%', 'about 56%', 'about 25%'], a: 0, how: 'choose propane and bromine in the selectivity lab.', why: 'A secondary C–H reacts 82 times faster than a primary one with Br•: 164 against 6.' },
    wild: ['Healing the ozone layer', 'Chlorine-atom chains from CFCs destroyed stratospheric ozone; banning CFCs under the Montreal Protocol is letting the Antarctic ozone hole slowly close.']
  });

  /* ================= Clayden 12, 36, 39: determining mechanisms ================= */
  const SIG = [['p-OCH₃', -0.27], ['p-CH₃', -0.17], ['H', 0], ['p-Cl', 0.23], ['m-Cl', 0.37], ['m-NO₂', 0.71], ['p-NO₂', 0.78]];
  const kie = (dz, T) => Math.exp(dz * 1000 / (8.314 * T));
  PB.tbChapter({
    id: 'chem-mechdet', subject: 'chemistry', title: 'Determining Reaction Mechanisms',
    subtitle: R`How chemists know what happens in a reaction. Equilibria, rates and energy profiles (the Hammond postulate, kinetic and thermodynamic control), kinetic evidence and rate laws, kinetic isotope effects and labelling, Hammett linear free-energy relationships, and neighbouring-group participation, rearrangements and fragmentations.`,
    big: 'A mechanism is a hypothesis about which bonds break and form, and in what order. It cannot be seen directly, so chemists test its predictions: the rate law, the effect of swapping H for D, where an isotope label ends up, how substituents change the rate, what stereochemistry results. A good mechanism survives all of these tests.',
    goals: ['Relate ΔG° to K and ΔG‡ to rate, and use the Hammond postulate', 'Distinguish kinetic and thermodynamic control', 'Deduce mechanisms from rate laws, isotope labels and crossover experiments', 'Estimate primary kinetic isotope effects from zero-point energies', 'Apply the Hammett equation and interpret the sign and size of ρ', 'Recognise neighbouring-group participation, carbocation, pinacol, Beckmann and Baeyer–Villiger rearrangements'],
    prereqs: ['chem-kinetics', 'chem-mechanisms'],
    sections: [
      { title: 'Rates, equilibria and energy profiles', plain: 'How far a reaction goes depends on the free-energy difference between reactants and products, and how fast it goes on the height of the barrier; transition states resemble whichever side they are closer to in energy, and conditions decide whether the fastest or the most stable product wins.', html: R`
<p>The position of equilibrium is set by $\Delta G^\circ = -RT\ln K$: every 5.7 kJ/mol at 298 K changes $K$ by a factor of 10. The rate is set by the barrier $\Delta G^\ddagger$ through the Eyring equation $k = \dfrac{k_BT}{h}e^{-\Delta G^\ddagger/RT}$; again 5.7 kJ/mol changes the rate tenfold.</p>
<div class="worked"><p>A reaction has $\Delta G^\circ = -10$ kJ/mol. Find $K$ at 298 K. And what barrier gives a rate constant of 1 s⁻¹?</p>
<p>$K = e^{10/2.478} = 56.6$. For $k = 1$: $\Delta G^\ddagger = RT\ln(k_BT/h) = 2.478\cdot\ln(6.2\times10^{12}) = 73$ kJ/mol: reactions with barriers much above about 90 kJ/mol need heating.</p></div>
<p>In a multistep reaction the <strong>rate-determining step</strong> is the one with the highest transition state. Intermediates sit in energy wells; transition states sit on peaks and cannot be isolated. The <strong>Hammond postulate</strong>: a transition state resembles the species (reactant or product) closest to it in energy, so endothermic steps have late, product-like transition states.</p>
<p><strong>Kinetic versus thermodynamic control.</strong> HBr adds to buta-1,3-diene via an allylic cation that can be attacked at either end. At −80 °C the 1,2-adduct dominates (formed faster, kinetic product); at 40 °C, when addition is reversible, the more stable 1,4-adduct dominates (thermodynamic product).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Lowering an activation barrier by 11.4 kJ/mol speeds a reaction at 298 K by about what factor?`, Math.exp(11.4 / RT), [R`$e^{\Delta\Delta G^\ddagger/RT}$; 5.7 kJ/mol gives 10.`], R`About 100.`, { tol: 0.03 })] },
      { title: 'Kinetics, isotopes and labels as evidence', plain: 'The rate law shows which molecules are in the transition state, swapping hydrogen for deuterium slows a reaction if that C–H bond breaks in the slow step, and tracking isotope labels shows which bonds actually break.', html: R`
<p><strong>Rate laws</strong> tell you the composition of the rate-determining transition state: SN2 reactions are first order in both substrate and nucleophile; SN1 reactions are first order in substrate only. Using one reagent in large excess makes the rate <strong>pseudo-first-order</strong>: $k_{\text{obs}} = k_2[\text{excess}]$.</p>
<h3 class="sub">Kinetic isotope effects</h3>
<p>A C–D bond has a lower zero-point vibrational energy than C–H (deuterium is heavier, so it vibrates more slowly). If the bond breaks in the rate-determining step, more energy is needed to break C–D, and the reaction slows: a <strong>primary kinetic isotope effect</strong>, $k_H/k_D$ typically 2–8 at room temperature.</p>
<div class="worked"><p>C–H stretches at about 2900 cm⁻¹ and C–D at 2100 cm⁻¹. Estimate the maximum KIE at 298 K, if the stretch is lost completely in the transition state.</p>
<p>$\Delta\text{ZPE} = \tfrac12hc\,\Delta\tilde\nu = \tfrac12\cdot800\ \text{cm}^{-1}\cdot11.96\ \text{J mol}^{-1}/\text{cm}^{-1} = 4.8$ kJ/mol. $k_H/k_D = e^{4.8/2.478} \approx 7$.</p></div>
<div data-fig="0"></div>
<p>E2 eliminations show large KIEs (the C–H breaks in the one step); E1 eliminations and SN1 reactions show almost none (the slow step is ionisation).</p>
<h3 class="sub">Labelling and crossover</h3>
<p>Hydrolysing an ester in H₂¹⁸O puts the ¹⁸O label in the carboxylic acid, not the alcohol: the acyl–oxygen bond breaks, as addition–elimination predicts. <strong>Crossover experiments</strong> mix two similar, differently labelled reactants: if fragments swap partners, the reaction is intermolecular. Trapping intermediates, and stereochemical outcomes (inversion versus racemisation), complete the toolkit.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`An elimination shows $k_H/k_D = 6.5$ when the β-hydrogens are replaced by deuterium. This suggests…`, ['the C–H bond breaks in the rate-determining step (E2-like)', 'the reaction is E1', 'no C–H bond breaks at all', 'the reaction is radical'], 0, [R`Large primary KIE.`], R`A large primary KIE means C–H cleavage in the slow step.`)] },
      { title: 'Hammett plots', plain: 'Changing substituents on a benzene ring changes reaction rates in a regular way: plotting the logarithm of the rate against each substituent’s σ value gives a straight line whose slope ρ reveals whether charge builds up in the transition state and how much.', html: R`
<p>Louis Hammett found that the effect of meta and para substituents on many reactions of benzene derivatives obeys</p>
<div class="key"><p>$\log_{10}\dfrac{k_X}{k_H} = \rho\sigma_X$</p></div>
<p>The <strong>substituent constant</strong> σ measures electron withdrawal, defined from the ionisation of substituted benzoic acids (σ > 0 withdrawing: p-NO₂ 0.78, m-NO₂ 0.71, p-Cl 0.23; σ &lt; 0 donating: p-CH₃ −0.17, p-OCH₃ −0.27). The <strong>reaction constant</strong> ρ measures the reaction's sensitivity:</p>
<ul><li>ρ > 0: negative charge builds up (or positive charge is lost) at the reacting centre in the transition state; electron-withdrawing groups speed it up. Hydroxide hydrolysis of ethyl benzoates has ρ ≈ +2.5.</li>
<li>ρ &lt; 0: positive charge builds up; donors speed it up. SN1 solvolysis of cumyl chlorides has ρ ≈ −4.5 (using σ⁺ values that allow for direct resonance).</li>
<li>A large |ρ| means a lot of charge develops close to the ring; a break in the plot often signals a change of mechanism.</li></ul>
<div class="worked"><p>How much faster is ethyl p-nitrobenzoate hydrolysed than ethyl benzoate (ρ = 2.5)?</p>
<p>$\log(k/k_0) = 2.5\cdot0.78 = 1.95$, so about 89 times faster.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`A Hammett plot for a reaction has ρ = −3. What develops at the reaction centre in the rate-determining transition state?`, ['positive charge', 'negative charge', 'no charge', 'a radical'], 0, [R`Donors speed it up.`], R`Negative ρ: positive charge builds up, stabilised by electron donors.`)] },
      { title: 'Participation, rearrangement and fragmentation', plain: 'Nearby groups can join in a reaction, speeding it and keeping stereochemistry; cations rearrange to more stable ones by shifting hydrogen or alkyl groups, and named rearrangements such as the pinacol, Beckmann and Baeyer–Villiger move groups predictably.', html: R`
<p><strong>Neighbouring-group participation</strong>: a lone pair or π bond within the molecule displaces a leaving group first, then is itself displaced. Two inversions give overall <em>retention</em> of configuration, and the rate can soar. Mustard gas, ClCH₂CH₂SCH₂CH₂Cl, reacts thousands of times faster than a simple alkyl chloride because sulfur displaces chloride to form a reactive three-membered sulfonium ion.</p>
<p><strong>Carbocation rearrangements</strong>: a hydride or alkyl group shifts to an adjacent cationic centre if that gives a more stable cation (Wagner–Meerwein shifts). Named rearrangements:</p>
<ul><li><strong>Pinacol</strong>: a 1,2-diol in acid loses water to form a cation, a neighbouring group migrates, and a ketone results. Pinacol, (CH₃)₂C(OH)C(OH)(CH₃)₂, gives pinacolone, (CH₃)₃CCOCH₃.</li>
<li><strong>Beckmann</strong>: an oxime in acid rearranges to an amide; the group <em>anti</em> to the leaving OH migrates. Cyclohexanone oxime gives caprolactam, made in millions of tonnes for nylon-6.</li>
<li><strong>Baeyer–Villiger</strong>: a peroxyacid inserts O next to a ketone's C=O, giving an ester; the group better able to carry positive charge migrates (tertiary > secondary ≈ phenyl > primary > methyl).</li></ul>
<p><strong>Fragmentations</strong> break a molecule into two when an electron push and a leaving group are aligned anti-periplanar, a stereoelectronic requirement like that of E2.</p>
<div class="worked"><p>What does the Baeyer–Villiger oxidation of acetophenone (PhCOCH₃) give?</p>
<p>Phenyl migrates in preference to methyl, so O is inserted between the C=O and the phenyl: phenyl acetate, CH₃COOPh.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Pinacol, (CH₃)₂C(OH)C(OH)(CH₃)₂, heated with acid gives…`, ['pinacolone, (CH₃)₃CCOCH₃', 'acetone', '2,3-dimethylbut-2-ene only', 'tert-butanol'], 0, [R`A methyl shifts to the cation; the other OH becomes C=O.`], R`Methyl migration then loss of H⁺ from the oxocarbenium ion.`)] }
    ],
    figures: [{ s: 1, title: 'Kinetic isotope effect', caption: 'Maximum primary isotope effect from the zero-point energy difference between C–H and C–D. It is larger at low temperature.', params: { aspect: 0.4, minH: 210, controls: [S('dz', 'ΔZPE', 1, 7, 0.1, 4.8, 'kJ/mol'), S('T', 'Temperature', 150, 600, 5, 298, 'K')],
      plots: [{ x: [150, 600], y: [1, 30], xlabel: 'temperature (K)', ylabel: 'k_H / k_D', curves: (v) => [{ f: (T) => kie(v.dz, T) }], pts: (v) => [{ x: v.T, y: kie(v.dz, v.T) }] }],
      readout: (v) => [['k_H/k_D', f(kie(v.dz, v.T))]] } }],
    labs: [{ sim: 'explore', title: 'A Hammett plot', desc: 'log(k_X/k_H) against σ for common substituents, for a reaction constant ρ you choose. Read off relative rates.',
      tasks: ['For ester hydrolysis (ρ = +2.5), how much faster is the p-NO₂ ester?', 'For an SN1 reaction (ρ = −4.5), which substituent is fastest?', 'What does ρ = 0 tell you?'],
      params: { aspect: 0.42, controls: [S('rho', 'Reaction constant ρ', -5, 5, 0.1, 2.5)],
        plots: [{ x: [-0.4, 0.9], y: [-4.5, 4.5], xlabel: 'σ', ylabel: 'log₁₀(k_X/k_H)', zero: true, curves: (v) => [{ f: (s) => v.rho * s }], pts: (v) => SIG.map((s) => ({ x: s[1], y: v.rho * s[1], label: s[0] })) }],
        readout: (v) => [['fastest', (v.rho >= 0 ? SIG[SIG.length - 1] : SIG[0])[0]], ['k(p-NO₂)/k(H)', f(Math.pow(10, v.rho * 0.78), 3)], ['k(p-OCH₃)/k(H)', f(Math.pow(10, v.rho * -0.27), 3)]] } }],
    formulas: [['Equilibrium', '\\Delta G^\\circ = -RT\\ln K'], ['Eyring', 'k = \\dfrac{k_BT}{h}e^{-\\Delta G^\\ddagger/RT}'], ['Hammett', '\\log\\dfrac{k_X}{k_H} = \\rho\\sigma'], ['Isotope effect', '\\dfrac{k_H}{k_D} \\approx e^{\\Delta\\text{ZPE}/RT}'], ['Pseudo-first order', 'k_{\\text{obs}} = k_2[\\text{B}]_0']],
    problems: [
      M('concept', 'SN1 kinetics', R`The rate of an SN1 reaction depends on…`, ['the substrate concentration only', 'the nucleophile concentration only', 'both substrate and nucleophile', 'neither'], 0, [R`Ionisation is rate-determining.`], R`Rate $= k[\text{RX}]$.`),
      M('concept', 'Labelled water', R`Ethyl acetate is hydrolysed in H₂¹⁸O with base. The ¹⁸O ends up in…`, ['the acetate (carboxylic acid)', 'the ethanol', 'both equally', 'neither'], 0, [R`Acyl–oxygen bond cleavage.`], R`Water/hydroxide attacks C=O; ethoxide leaves.`),
      M('concept', 'Positive ρ', R`A reaction with a large positive ρ is accelerated by…`, ['electron-withdrawing substituents', 'electron-donating substituents', 'bulky substituents', 'no substituents'], 0, [R`Negative charge builds up.`], R`Withdrawing groups stabilise the developing negative charge.`),
      M('concept', 'Kinetic product', R`At low temperature, HBr adds to buta-1,3-diene to give mainly the 1,2-adduct because…`, ['it forms faster (kinetic control)', 'it is more stable', 'it is the only possible product', 'the 1,4-adduct is unstable at low temperature'], 0, [R`Fast versus stable.`], R`Under irreversible conditions, the faster-formed product wins.`),
      P('core', 'num', 'K from ΔG°', R`$\Delta G^\circ = -10$ kJ/mol at 298 K. $K$?`, Math.exp(10 / RT), [R`$e^{-\Delta G/RT}$.`], R`$56.6$.`),
      P('core', 'num', 'Isotope effect', R`ΔZPE = 4.8 kJ/mol. Maximum $k_H/k_D$ at 298 K?`, kie(4.8, 298), [R`$e^{\Delta\text{ZPE}/RT}$.`], R`$6.9$.`),
      P('core', 'num', 'Hammett rate', R`ρ = 2.5; σ(p-NO₂) = 0.78. Relative rate $k_X/k_H$?`, Math.pow(10, 2.5 * 0.78), [R`$10^{\rho\sigma}$.`], R`$89$.`),
      P('core', 'num', 'Finding σ', R`A para substituent makes a reaction with ρ = 2.5 run at 0.40 times the rate of the unsubstituted compound. Find σ.`, Math.log10(0.4) / 2.5, [R`$\sigma = \log(k/k_0)/\rho$.`], R`$-0.16$, about the value for p-CH₃.`),
      M('core', 'Beckmann', R`Cyclohexanone oxime with acid gives…`, ['caprolactam (a seven-membered cyclic amide)', 'cyclohexylamine', 'cyclohexanone', 'adipic acid'], 0, [R`Ring expansion as carbon migrates to N.`], R`Caprolactam, the monomer of nylon-6.`),
      M('core', 'Baeyer–Villiger', R`Which group migrates preferentially in the Baeyer–Villiger oxidation of tert-butyl methyl ketone?`, ['tert-butyl', 'methyl', 'both equally', 'neither'], 0, [R`Best at carrying positive charge.`], R`Tertiary groups migrate best: the product is tert-butyl acetate.`),
      P('olympiad', 'num', 'Eyring barrier', R`What ΔG‡ (kJ/mol) gives $k = 1\ \text{s}^{-1}$ at 298 K? ($k_BT/h = 6.2\times10^{12}\ \text{s}^{-1}$)`, RT * Math.log(6.2e12), [R`$\Delta G^\ddagger = RT\ln(k_BT/hk)$.`], R`$73$ kJ/mol.`),
      P('olympiad', 'num', 'Second-order constant', R`Under pseudo-first-order conditions with [OH⁻] = 0.10 M, $k_{\text{obs}} = 0.020\ \text{s}^{-1}$. Find $k_2$ (M⁻¹ s⁻¹).`, 0.2, [R`$k_2 = k_{\text{obs}}/[\text{OH}^-]$.`], R`$0.20$.`),
      P('olympiad', 'num', 'Finding ρ', R`p-Chloro substitution (σ = 0.23) triples the rate. Find ρ.`, Math.log10(3) / 0.23, [R`$\rho = \log3/\sigma$.`], R`$2.07$.`),
      P('olympiad', 'num', 'Cold isotope effect', R`With ΔZPE = 4.8 kJ/mol, what is $k_H/k_D$ at 200 K?`, kie(4.8, 200), [R`Same formula, lower T.`], R`$e^{2.89} = 18$: isotope effects grow on cooling (and tunnelling can raise them further).`)
    ],
    drills: [
      { title: 'Hammett', gen: (r) => { const rho = r.pick([-4.5, -2, 1, 2.5]), s = r.pick(SIG.slice(0)); return { q: R`<p>ρ = ${rho}, substituent ${s[0]} (σ = ${s[1]}). $k_X/k_H$?</p>`, answer: Math.pow(10, rho * s[1]), tol: 0.02, solution: R`<p>$10^{${rho}\cdot${s[1]}} = ${f(Math.pow(10, rho * s[1]), 4)}$.</p>` }; } },
      { title: 'K from ΔG', gen: (r) => { const g = r.pick([-20, -10, -5.7, 0, 5.7, 10]); return { q: R`<p>$\Delta G^\circ = ${g}$ kJ/mol at 298 K. $K$?</p>`, answer: Math.exp(-g / RT), tol: 0.02, solution: R`<p>$e^{${-g}/2.478} = ${f(Math.exp(-g / RT), 4)}$.</p>` }; } }
    ],
    predict: { q: 'For a reaction with a positive Hammett ρ, putting an electron-withdrawing para-nitro group on the ring will…', o: ['speed it up', 'slow it down', 'have no effect'], a: 0, how: 'set ρ positive in the Hammett lab and look at p-NO₂.', why: 'Positive ρ means negative charge develops at the reacting centre; withdrawing groups stabilise it.' },
    wild: ['Kinetic isotope effects in drugs', 'Deutetrabenazine, approved in 2017, replaces key C–H bonds with C–D: the isotope effect slows its breakdown in the liver, so smaller doses last longer.']
  });

  /* ================= Clayden 27, 40–41: organometallics and asymmetric synthesis ================= */
  const eeOf = (dd, T) => { const er = Math.exp(dd * 1000 / (8.314 * T)); return 100 * (er - 1) / (er + 1); };
  PB.tbChapter({
    id: 'chem-organometallic', subject: 'chemistry', title: 'Organometallic Catalysis and Asymmetric Synthesis',
    subtitle: R`How metals make bonds that organic chemistry alone cannot. Counting electrons and the 18-electron rule, ligands and back-bonding, the elementary steps of organometallic reactions, catalytic cycles for cross-coupling (Suzuki, Heck) and metathesis, phosphorus, silicon and sulfur reagents, and making single enantiomers with chiral auxiliaries and catalysts.`,
    big: 'Transition metals can hold organic groups, swap them, and join them together, then let go and start again. A few hundredths of a per cent of palladium can stitch together two aromatic rings, a reaction behind countless medicines and screens. Make the metal’s surroundings chiral, and it can build just one mirror image of a product.',
    goals: ['Count electrons in organometallic complexes and apply the 18-electron rule', 'Explain σ-donation and π-back-donation by CO, alkenes and phosphines', 'Name the elementary steps: oxidative addition, reductive elimination, migratory insertion, β-hydride elimination, transmetallation', 'Draw the catalytic cycles of the Suzuki and Heck reactions and calculate turnover numbers', 'Describe chiral pool, auxiliary and catalytic approaches to asymmetric synthesis', 'Relate enantiomeric excess to the energy difference between competing transition states'],
    prereqs: ['chem-coord', 'chem-carbonyl'],
    sections: [
      { title: 'Counting electrons and bonding', plain: 'Stable organometallic complexes usually have 18 valence electrons around the metal, counted from the metal’s d electrons plus two from each ligand bond; ligands such as CO both donate electrons and accept them back from the metal.', html: R`
<p>A transition metal with its ligands is most stable, typically, with <strong>18 valence electrons</strong> (filling its s, p and d orbitals): the <strong>18-electron rule</strong>. Count it as the metal's d electrons (for its oxidation state) plus the electrons each ligand donates (2 for most neutral ligands such as CO, PR₃ and alkenes, and for anionic ones such as Cl⁻ and H⁻ in the ionic counting method; 6 for cyclopentadienyl, Cp⁻).</p>
<div class="worked"><p>Count the electrons in Fe(CO)₅, Ni(CO)₄, ferrocene Fe(C₅H₅)₂ and Pd(PPh₃)₄.</p>
<p>Fe(0) d⁸ + 5 × 2 = 18. Ni(0) d¹⁰ + 4 × 2 = 18. Fe(II) d⁶ + 2 × 6 = 18. Pd(0) d¹⁰ + 4 × 2 = 18. Square-planar d⁸ complexes such as Pd(II) and Pt(II) are often stable at 16 electrons.</p></div>
<p>Ligands bond in two directions. <strong>CO</strong> donates a lone pair from carbon (σ-donation) and accepts metal d electrons into its empty π* orbitals (<strong>π-back-donation</strong>), which strengthens the M–C bond but weakens C≡O: the C–O stretching frequency in the IR falls from 2143 cm⁻¹ in free CO to around 2000 cm⁻¹ or lower in electron-rich complexes. Alkenes bond the same way (Dewar–Chatt–Duncanson model). <strong>Phosphines</strong> are tunable: their bulk (cone angle) and electron donation control a catalyst's activity. <strong>Hapticity</strong> (η) counts how many atoms of a ligand bind: η⁵-Cp in ferrocene.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many valence electrons does Cr(CO)₆ have (Cr(0) is d⁶)?`, 18, [R`d electrons + 2 per CO.`], R`$6 + 12 = 18$.`)] },
      { title: 'Elementary steps', plain: 'Organometallic reactions are built from a few steps: a metal inserts into a bond (oxidative addition), joins two groups and releases them (reductive elimination), slots an alkene or CO into a metal bond (insertion), removes a hydrogen from the next carbon (β-hydride elimination), or swaps groups with another metal (transmetallation).', html: R`
<ul><li><strong>Oxidative addition</strong>: the metal inserts into a bond A–B, forming M–A and M–B. Oxidation state rises by 2 and electron count by 2: Pd(0)L₂ + PhBr → PhPd(II)BrL₂ (14 → 16 electrons). Aryl iodides and bromides react more readily than chlorides.</li>
<li><strong>Reductive elimination</strong>: the reverse; two ligands couple and leave as A–B; oxidation state falls by 2. This is usually the product-forming step.</li>
<li><strong>Migratory insertion</strong>: an alkene or CO inserts into a M–R or M–H bond (the basis of polymerisation and hydroformylation).</li>
<li><strong>β-Hydride elimination</strong>: a hydrogen on the carbon next to the metal moves to the metal, releasing an alkene. It is why alkyl groups with β-hydrogens are tricky partners.</li>
<li><strong>Transmetallation</strong>: an organic group moves from one metal (B, Sn, Zn, Mg) to another (Pd).</li>
<li><strong>Ligand dissociation and association</strong> open or fill coordination sites.</li></ul>
<div class="worked"><p>What happens to palladium's oxidation state and electron count when PdL₂ adds PhI?</p>
<p>Pd(0) → Pd(II); electron count 10 + 4 = 14 → (d⁸) 8 + 2 × 2 (L) + 2 (Ph⁻) + 2 (I⁻) = 16.</p></div>
<h3 class="sub">Phosphorus, silicon and sulfur</h3>
<p>Main-group elements also offer special reactivity: phosphorus ylides (Wittig) and phosphonates make alkenes driven by the strong P=O bond; silicon forms very strong Si–O and Si–F bonds, so silyl ethers are protecting groups removed by fluoride; sulfur ylides convert ketones into epoxides.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`In oxidative addition of an aryl bromide to Pd(0), the oxidation state of palladium…`, ['rises by 2', 'falls by 2', 'is unchanged', 'rises by 1'], 0, [R`Two new anionic ligands.`], R`Pd(0) → Pd(II).`)] },
      { title: 'Catalytic cycles: cross-coupling and metathesis', plain: 'Joining the elementary steps into a loop gives a catalytic cycle: in the Suzuki reaction palladium adds to an aryl halide, picks up a second aryl group from boron, and couples them; tiny amounts of catalyst can turn over thousands of times.', html: R`
<p>The <strong>Suzuki coupling</strong> joins an aryl or vinyl halide with an organoboron compound, using a palladium catalyst and a base:</p>
<ol><li>oxidative addition of Ar–X to Pd(0);</li>
<li>transmetallation: the Ar′ group moves from boron (activated by base) to palladium;</li>
<li>reductive elimination releases Ar–Ar′ and regenerates Pd(0).</li></ol>
<p>The <strong>Heck reaction</strong> couples an aryl halide with an alkene: oxidative addition, then migratory insertion of the alkene into the Pd–Ar bond, then β-hydride elimination releases the substituted alkene, and a base removes HX to regenerate Pd(0). Related reactions (Sonogashira for alkynes, Stille with tin, Buchwald–Hartwig for C–N bonds) are mainstays of medicinal chemistry; Heck, Negishi and Suzuki shared the 2010 Nobel prize.</p>
<p><strong>Olefin metathesis</strong> swaps the ends of two alkenes through metal carbenes and four-membered metallacyclobutanes (the Chauvin mechanism); Grubbs' ruthenium and Schrock's molybdenum catalysts (Nobel 2005) make large rings and polymers.</p>
<div class="worked"><p>A coupling uses 0.1 mol% palladium and gives 95% yield. What is the turnover number?</p>
<p>TON = moles of product per mole of catalyst $= 0.95/0.001 = 950$. Industrial processes aim for TONs of $10^5$ or more, so the expensive metal is barely used.</p></div>
<div data-fig="0"></div>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`In the Heck reaction, the product alkene is released by…`, ['β-hydride elimination', 'oxidative addition', 'transmetallation', 'reductive elimination of Ar–Ar'], 0, [R`An alkene forms when H moves to Pd.`], R`β-Hydride elimination gives the substituted alkene and H–Pd–X.`)] },
      { title: 'Asymmetric synthesis', plain: 'Single enantiomers are made by starting from natural chiral molecules, by attaching a removable chiral auxiliary, or best of all with chiral catalysts; the enantiomeric excess depends exponentially on the energy gap between the two competing transition states.', html: R`
<p>Reactions of achiral starting materials with achiral reagents always give racemates. To make one enantiomer, some source of chirality must be present:</p>
<ul><li>the <strong>chiral pool</strong>: start from cheap natural single enantiomers (amino acids, sugars, terpenes);</li>
<li>a <strong>chiral auxiliary</strong>, attached temporarily to steer a reaction and then removed (Evans oxazolidinones for alkylations and aldols);</li>
<li><strong>asymmetric catalysis</strong>: a chiral catalyst makes many product molecules. Noyori's ruthenium–BINAP hydrogenation catalysts and Sharpless's asymmetric epoxidation (Nobel 2001), and small organic catalysts such as proline (List and MacMillan, Nobel 2021).</li></ul>
<p>The two enantiomers form through diastereomeric transition states whose energies differ by $\Delta\Delta G^\ddagger$, so the enantiomer ratio is</p>
<div class="key"><p>$\text{er} = e^{\Delta\Delta G^\ddagger/RT},\qquad \text{ee} = \dfrac{\text{er} - 1}{\text{er} + 1}$</p></div>
<div class="worked"><p>What ee results from $\Delta\Delta G^\ddagger = 10$ kJ/mol at 298 K? And what gap is needed for 99% ee?</p>
<p>$\text{er} = e^{4.04} = 56.6$, ee $= 55.6/57.6 = 96.5\%$. For 99% ee, er $= 199$: $\Delta\Delta G^\ddagger = RT\ln199 = 13.1$ kJ/mol, less than the energy of a single hydrogen bond.</p></div>
<p>A <strong>kinetic resolution</strong> uses a chiral catalyst or enzyme that reacts with one enantiomer of a racemate faster: useful, but at most 50% of the material can become the wanted enantiomer (unless the other is racemised as it goes: dynamic kinetic resolution).</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`Two competing transition states differ by 7.3 kJ/mol at 298 K. What ee (%) results?`, eeOf(7.3, 298), [R`er $= e^{\Delta\Delta G/RT}$.`], R`er = 19: ee = 18/20 = 90%.`)] }
    ],
    figures: [{ s: 2, title: 'Turnover numbers', caption: 'Turnover number (moles of product per mole of catalyst) against catalyst loading, for a given yield.', params: { aspect: 0.4, minH: 210, controls: [S('y', 'Yield', 10, 100, 1, 95, '%'), S('l', 'Catalyst loading (log₁₀ mol%)', -4, 1, 0.1, -1)],
      plots: [{ x: [-4, 1], y: [0, 7], xlabel: 'log₁₀(catalyst mol%)', ylabel: 'log₁₀ TON', curves: (v) => [{ f: (l) => Math.log10(v.y / Math.pow(10, l)) }], pts: (v) => [{ x: v.l, y: Math.log10(v.y / Math.pow(10, v.l)) }] }],
      readout: (v) => [['loading', f(Math.pow(10, v.l), 3) + ' mol%'], ['TON', f(v.y / Math.pow(10, v.l), 3)]] } }],
    labs: [{ sim: 'explore', title: 'Selectivity from energy gaps', desc: 'Enantiomeric excess produced by a chiral catalyst, from the free-energy difference between the two competing transition states and the temperature.',
      tasks: ['What ΔΔG‡ gives 90% ee at room temperature?', 'Run the same catalyst at −78 °C (195 K). What happens to the ee?', 'Why is a 99% ee so much harder than 90%?'],
      params: { aspect: 0.42, controls: [S('dd', 'ΔΔG‡', 0, 20, 0.1, 7.3, 'kJ/mol'), S('T', 'Temperature', 150, 400, 1, 298, 'K')],
        plots: [{ x: [0, 20], y: [0, 101], xlabel: 'ΔΔG‡ (kJ/mol)', ylabel: 'ee (%)', curves: (v) => [{ f: (d) => eeOf(d, v.T), label: 'this T' }, { f: (d) => eeOf(d, 298), color: 'ink3', dash: [4, 4], label: '298 K' }], pts: (v) => [{ x: v.dd, y: eeOf(v.dd, v.T) }] }],
        readout: (v) => { const er = Math.exp(v.dd * 1000 / (8.314 * v.T)); return [['enantiomer ratio', f(er, 4) + ' : 1'], ['ee', f(eeOf(v.dd, v.T), 4) + '%']]; } } }],
    formulas: [['18-electron rule', 'd^n + \\sum(\\text{ligand electrons}) = 18'], ['Turnover number', '\\text{TON} = n_{\\text{product}}/n_{\\text{catalyst}}'], ['Enantiomer ratio', '\\text{er} = e^{\\Delta\\Delta G^\\ddagger/RT}'], ['ee', '\\text{ee} = \\dfrac{\\text{er} - 1}{\\text{er} + 1}']],
    problems: [
      M('concept', 'The 18-electron rule', R`Which complex obeys the 18-electron rule?`, ['Ni(CO)₄', 'Ni(CO)₃', 'Fe(CO)₄', 'Cr(CO)₅'], 0, [R`Count d electrons plus 2 per CO.`], R`Ni(0) d¹⁰ + 8 = 18.`),
      M('concept', 'Back-donation', R`Back-donation from the metal into CO π* orbitals makes the C≡O stretching frequency…`, ['lower than in free CO', 'higher than in free CO', 'unchanged', 'disappear'], 0, [R`Electrons enter an antibonding orbital.`], R`π* population weakens C≡O, lowering ν(CO).`),
      M('concept', 'Suzuki partners', R`A Suzuki coupling joins an aryl halide with…`, ['an organoboron compound', 'a Grignard reagent', 'an alkene', 'an amine'], 0, [R`Boronic acids.`], R`ArB(OH)₂ with Pd and base.`),
      M('concept', 'Kinetic resolution', R`What is the maximum yield of one enantiomer from a simple kinetic resolution of a racemate?`, ['50%', '100%', '25%', '75%'], 0, [R`Only half the material is that enantiomer.`], R`50%, unless the slow enantiomer is racemised in situ.`),
      P('core', 'num', 'Iron pentacarbonyl', R`Valence electron count of Fe(CO)₅?`, 18, [R`Fe(0) d⁸.`], R`$8 + 10 = 18$.`),
      P('core', 'num', 'Ferrocene', R`Electron count of ferrocene, Fe(Cp)₂ (ionic method, Cp⁻ gives 6)?`, 18, [R`Fe(II) d⁶.`], R`$6 + 12 = 18$.`),
      P('core', 'num', 'Turnover number', R`0.1 mol% catalyst gives 95% yield. TON?`, 950, [R`$0.95/0.001$.`], R`950.`),
      P('core', 'num', 'ee from an energy gap', R`ΔΔG‡ = 10 kJ/mol at 298 K. ee (%)?`, eeOf(10, 298), [R`er $= e^{10/2.478}$.`], R`$96.5\%$.`),
      P('core', 'num', 'Oxidation state', R`After oxidative addition of PhBr to Pd(PPh₃)₂, what is palladium's oxidation state?`, 2, [R`Ph⁻ and Br⁻ are anionic.`], R`+2.`),
      M('core', 'Heck product', R`Iodobenzene + methyl acrylate (CH₂=CHCO₂Me) under Heck conditions gives…`, ['methyl cinnamate, PhCH=CHCO₂Me', 'biphenyl', 'methyl 3-phenylpropanoate', 'styrene'], 0, [R`Ar adds to the less substituted alkene carbon; β-H elimination restores C=C.`], R`The trans-cinnamate ester.`),
      P('olympiad', 'num', 'Gap for 99% ee', R`What ΔΔG‡ (kJ/mol) gives 99% ee at 298 K?`, RT * Math.log(199), [R`er $= 199$.`], R`$13.1$ kJ/mol.`),
      P('olympiad', 'num', 'Cooling helps', R`A catalyst gives 90% ee at 298 K. Assuming ΔΔG‡ is temperature-independent, what ee (%) at 195 K?`, eeOf(RT * Math.log(19), 195), [R`Find ΔΔG‡ from er = 19, then recompute.`], R`ΔΔG‡ = 7.3 kJ/mol; er = 90; ee = 97.8%.`),
      P('olympiad', 'num', 'Catalyst cost', R`A drug synthesis makes 1000 kg of product (M = 300 g/mol) with a Pd catalyst at TON 50 000. How many moles of Pd are needed?`, 1e6 / 300 / 5e4, [R`mol product / TON.`], R`$3333/50\,000 = 0.067$ mol, about 7 g of palladium.`),
      P('olympiad', 'num', 'Square-planar Pd(II)', R`Electron count of trans-PdCl₂(PPh₃)₂ (ionic method)?`, 16, [R`Pd(II) d⁸ + 4 ligands × 2.`], R`$8 + 8 = 16$: stable square-planar d⁸.`)
    ],
    drills: [
      { title: 'ee from ΔΔG‡', gen: (r) => { const d = r.pick([2, 4, 5.7, 7.3, 10, 13]); return { q: R`<p>ΔΔG‡ = ${d} kJ/mol at 298 K. ee (%)?</p>`, answer: eeOf(d, 298), tol: 0.01, solution: R`<p>er $= e^{${d}/2.478}$: ee $= ${f(eeOf(d, 298), 4)}\%$.</p>` }; } },
      { title: 'Turnover number', gen: (r) => { const l = r.pick([0.01, 0.05, 0.1, 0.5, 1, 2]), y = r.pick([60, 80, 90, 95, 99]); return { q: R`<p>${l} mol% catalyst, ${y}% yield. TON?</p>`, answer: y / l, tol: 0.001, solution: R`<p>$${y}/${l} = ${f(y / l, 4)}$.</p>` }; } }
    ],
    predict: { q: 'To get 90% ee at room temperature, the two competing transition states must differ in free energy by about…', o: ['7 kJ/mol', '0.7 kJ/mol', '70 kJ/mol'], a: 0, how: 'find 90% ee on the curve in the selectivity lab.', why: '90% ee means a 19 : 1 ratio, and RT ln 19 ≈ 7.3 kJ/mol at 298 K.' },
    wild: ['Catalysis in medicine making', 'Asymmetric hydrogenation makes L-DOPA for Parkinson’s disease, and palladium cross-couplings build drugs such as the blood-pressure medicine losartan.']
  });

  /* ================= Clayden 42–43: the organic chemistry of life ================= */
  const mut = (x0, k, t) => { const xe = 0.364; return xe + (x0 - xe) * Math.exp(-k * t); };
  const rotOf = (x) => 112 * x + 18.7 * (1 - x);
  PB.tbChapter({
    id: 'chem-biomolecules', subject: 'chemistry', title: 'The Organic Chemistry of Life',
    subtitle: R`Biomolecules as organic molecules. Carbohydrates (Fischer projections, hemiacetal rings, anomers and mutarotation, glycosides), amino acids and peptide synthesis, nucleotides and DNA synthesis, lipids and terpenes, and the organic mechanisms enzymes use.`,
    big: 'Living things run on the same reactions as a chemistry lab: hemiacetals close sugar rings, amides link amino acids, phosphate esters link nucleotides, and enzymes perform aldol reactions, Claisen rearrangements and hydride transfers with perfect selectivity. Chemists now make peptides and DNA on machines, one protected building block at a time.',
    goals: ['Use Fischer projections and D/L notation; draw pyranose and furanose forms', 'Explain anomers, mutarotation and reducing versus non-reducing sugars', 'Describe amino acid stereochemistry and the strategy of peptide synthesis (protecting groups, coupling, solid phase)', 'Explain how DNA is assembled and why RNA is less stable', 'Classify terpenes by isoprene units and relate them to steroids', 'Recognise organic mechanisms (imines, aldol, hydride transfer) in enzymes'],
    prereqs: ['chem-carbonyl', 'chem-stereo'],
    sections: [
      { title: 'Carbohydrates', plain: 'Sugars are polyhydroxy aldehydes and ketones that close into rings by forming hemiacetals; the new stereocentre gives α and β anomers, which interconvert in water, and sugars link to each other through acetal (glycosidic) bonds.', html: R`
<p>Monosaccharides are <strong>aldoses</strong> (aldehydes) or <strong>ketoses</strong> (ketones) carrying several OH groups, drawn as <strong>Fischer projections</strong> (horizontal bonds towards you, vertical bonds away). A sugar is <strong>D</strong> if the OH on the stereocentre furthest from the carbonyl points right, as in D-glyceraldehyde; almost all natural sugars are D. An aldohexose has four stereocentres and so 16 stereoisomers.</p>
<p>In water, sugars exist mainly as cyclic <strong>hemiacetals</strong>: the C5 OH of glucose attacks the C1 aldehyde, forming a six-membered <strong>pyranose</strong> ring (five-membered rings are <strong>furanoses</strong>). C1 becomes a new stereocentre, the <strong>anomeric carbon</strong>, giving α (OH axial) and β (OH equatorial) <strong>anomers</strong>. They interconvert through the open chain: <strong>mutarotation</strong>.</p>
<div class="worked"><p>Pure α-glucose has $[\alpha] = +112$ and pure β-glucose $+18.7$. In water, both change to an equilibrium value of $+52.7$. What fraction is α at equilibrium?</p>
<p>$112x + 18.7(1 - x) = 52.7$ gives $x = 34/93.3 = 0.364$: 36% α, 64% β (the small open-chain fraction is ignored).</p></div>
<div data-fig="0"></div>
<p>Sugars join through <strong>glycosidic bonds</strong> (acetals): maltose (glucose α-1,4 glucose), lactose (galactose β-1,4 glucose), sucrose (glucose–fructose linked through both anomeric carbons). Sugars with a free hemiacetal can open to the aldehyde and reduce Tollens' or Benedict's reagent (<strong>reducing sugars</strong>); sucrose, with both anomeric carbons tied up, is non-reducing.</p>
<div data-quiz="0"></div>`,
        quizzes: [QM(R`Which sugar is non-reducing?`, ['sucrose', 'glucose', 'maltose', 'lactose'], 0, [R`Is there a free hemiacetal?`], R`In sucrose both anomeric carbons are in the glycosidic bond.`)] },
      { title: 'Amino acids and peptides', plain: 'Amino acids are joined by amide bonds into peptides; to make a peptide in the lab chemists protect the groups that should not react, activate the acid, couple, deprotect and repeat, often on a solid support.', html: R`
<p>The 20 common amino acids are α-amino acids, H₂N–CHR–COOH; all except glycine are chiral, and natural ones are L (by CIP, S, except cysteine, which is R because sulfur outranks the carboxyl group). In water they are zwitterions.</p>
<p>The <strong>peptide bond</strong> is an amide: its C–N bond has partial double-bond character (the nitrogen lone pair is delocalised into C=O), so it is planar and usually trans, which constrains protein shapes.</p>
<h3 class="sub">Making peptides</h3>
<p>Joining two amino acids directly would give a mixture (each can react at either end). The solution:</p>
<ol><li><strong>protect</strong> the amine of one (Boc, removed by acid; or Fmoc, removed by base) and the acid of the other;</li>
<li><strong>activate</strong> the free acid with a coupling agent (such as DCC) and couple;</li>
<li><strong>deprotect</strong> the new N-terminus and repeat.</li></ol>
<p>Bruce Merrifield's <strong>solid-phase synthesis</strong> (Nobel 1984) anchors the growing chain to a resin bead, so excess reagents simply wash away; machines now do it automatically. But every step must be nearly perfect.</p>
<div class="worked"><p>A 50-residue peptide is made with 99% yield per coupling. What is the overall yield?</p>
<p>49 couplings: $0.99^{49} = 0.61$. At 97% per step it would be only 22%.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many different tripeptides can be made from the 20 common amino acids?`, 8000, [R`20 choices at each position.`], R`$20^3 = 8000$.`)] },
      { title: 'Nucleotides and nucleic acids', plain: 'Nucleotides are a sugar, a phosphate and a base; DNA chains are linked by phosphate esters and made in the lab one protected building block at a time, while RNA’s extra hydroxyl group makes it easier to break.', html: R`
<p>A <strong>nucleotide</strong> is a base (adenine, guanine, cytosine, thymine or uracil) attached by a glycosidic bond to C1′ of ribose or 2′-deoxyribose, with a phosphate on C5′. Nucleic acids are chains linked by <strong>phosphodiester</strong> bonds from the 3′-OH of one sugar to the 5′-phosphate of the next. The bases pair by hydrogen bonds: A–T (two) and G–C (three), so GC-rich DNA melts at higher temperatures.</p>
<p><strong>RNA</strong> is much less stable than DNA in base: its 2′-OH, next to the phosphate, can attack phosphorus intramolecularly, cutting the chain. This is one reason DNA, not RNA, stores long-term genetic information.</p>
<p>Chemists build DNA by the <strong>phosphoramidite</strong> method on a solid support, adding protected nucleotides one at a time (from 3′ to 5′, the reverse of biology), with very high coupling yields.</p>
<div class="worked"><p>A 100-base oligonucleotide is made with 99.5% coupling yield per step. What fraction of chains is full length?</p>
<p>$0.995^{99} = 0.61$. At 98% it would fall to 13%, which is why long DNA is assembled from shorter pieces.</p></div>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`A 10-base-pair DNA duplex has 6 G–C pairs and 4 A–T pairs. How many hydrogen bonds hold it together?`, 26, [R`3 per GC, 2 per AT.`], R`$18 + 8 = 26$.`)] },
      { title: 'Lipids, terpenes and enzyme chemistry', plain: 'Fats are esters that soap-making breaks apart, terpenes and steroids are built from five-carbon isoprene units, and enzymes speed up the same reactions chemists use, such as imine formation, aldol reactions and hydride transfers, with perfect selectivity.', html: R`
<p><strong>Fats and oils</strong> are triesters of glycerol with fatty acids. Heating them with sodium hydroxide (<strong>saponification</strong>, using three moles of NaOH per mole of fat) gives glycerol and soap (fatty acid salts). Phospholipids, with one fatty acid replaced by a phosphate head, form membranes.</p>
<p><strong>Terpenes</strong> are built from five-carbon <strong>isoprene units</strong>, joined head to tail from the biological building blocks IPP and DMAPP: monoterpenes C₁₀ (menthol, limonene), sesquiterpenes C₁₅, diterpenes C₂₀ (vitamin A), triterpenes C₃₀ (squalene, which cyclises in one enzyme-controlled cascade to lanosterol and then cholesterol and all the steroids) and tetraterpenes C₄₀ (β-carotene).</p>
<div class="worked"><p>How many isoprene units make squalene (C₃₀) and β-carotene (C₄₀)?</p>
<p>$30/5 = 6$ and $40/5 = 8$.</p></div>
<h3 class="sub">Enzymes as organic chemists</h3>
<p>Enzymes use familiar mechanisms with exquisite control. Class I aldolases form an imine (then enamine) with a lysine side chain to run aldol reactions; pyridoxal phosphate (vitamin B₆) forms imines with amino acids to move amino groups; NAD⁺/NADH transfers a hydride ion to and from carbonyl groups, always to the same face; chorismate mutase accelerates a Claisen rearrangement about a million-fold. Modern chemistry increasingly borrows these tricks: engineered enzymes (directed evolution, Nobel 2018) now run industrial syntheses.</p>
<div data-quiz="0"></div>`,
        quizzes: [QN(R`How many moles of NaOH are needed to saponify one mole of a triglyceride completely?`, 3, [R`Three ester groups.`], R`3.`)] }
    ],
    figures: [{ s: 0, title: 'Mutarotation of glucose', caption: 'Optical rotation of a glucose solution starting from pure α or pure β, relaxing to the equilibrium mixture (36% α).', params: { aspect: 0.4, minH: 210, controls: [{ id: 'st', type: 'select', label: 'Start from', value: 'a', options: [['a', 'pure α (+112)'], ['b', 'pure β (+18.7)']] }, S('k', 'Rate constant', 0.005, 0.1, 0.005, 0.02, '/min'), S('t', 'Time', 0, 300, 1, 60, 'min')],
      plots: [{ x: [0, 300], y: [0, 120], xlabel: 'time (min)', ylabel: '[α] (degrees)', curves: (v) => [{ f: (t) => rotOf(mut(v.st === 'a' ? 1 : 0, v.k, t)) }], hlines: () => [{ y: 52.7, label: 'equilibrium' }], pts: (v) => [{ x: v.t, y: rotOf(mut(v.st === 'a' ? 1 : 0, v.k, v.t)) }] }],
      readout: (v) => { const x = mut(v.st === 'a' ? 1 : 0, v.k, v.t); return [['α fraction', f(100 * x) + '%'], ['[α]', f(rotOf(x))]]; } } }],
    labs: [{ sim: 'explore', title: 'Building long chains', desc: 'Fraction of full-length chains in a step-by-step synthesis (peptides or DNA) against chain length, for a given yield per coupling step.',
      tasks: ['How long a peptide can you make with 99% couplings and still get half full-length chains?', 'Compare 98% and 99.5% for a 100-mer.', 'Why are genes assembled from many short synthetic pieces?'],
      params: { aspect: 0.42, controls: [S('y', 'Yield per coupling', 90, 99.9, 0.1, 99, '%'), S('n', 'Chain length (units)', 2, 200, 1, 50)],
        plots: [{ x: [2, 200], y: [0, 1.02], xlabel: 'chain length', ylabel: 'fraction full length', curves: (v) => [{ f: (n) => Math.pow(v.y / 100, n - 1) }], pts: (v) => [{ x: v.n, y: Math.pow(v.y / 100, v.n - 1) }] }],
        readout: (v) => [['full-length fraction', f(100 * Math.pow(v.y / 100, v.n - 1), 3) + '%'], ['length for 50%', f(1 + Math.log(0.5) / Math.log(v.y / 100))]] } }],
    formulas: [['Mutarotation mixture', '[\\alpha]_{eq} = x_\\alpha[\\alpha]_\\alpha + (1 - x_\\alpha)[\\alpha]_\\beta'], ['Stepwise yield', 'Y = y^{\\,n - 1}'], ['Peptide mass', 'M = \\sum M_i - 18(n - 1)'], ['Isoprene rule', '\\text{C}_{5n}']],
    problems: [
      M('concept', 'D-sugars', R`A sugar is assigned D if…`, ['the OH on the stereocentre furthest from the carbonyl points right in the Fischer projection', 'it rotates light to the right', 'it is the natural form', 'all OH groups point right'], 0, [R`Compare with D-glyceraldehyde.`], R`D/L refers to configuration, not the sign of rotation.`),
      M('concept', 'Peptide bonds', R`The peptide bond is planar because…`, ['the nitrogen lone pair is delocalised into C=O, giving partial double-bond character', 'nitrogen is sp³', 'it is a single bond', 'hydrogen bonding'], 0, [R`Amide resonance.`], R`Partial C=N character prevents rotation.`),
      M('concept', 'Isoprene units', R`Terpenes are built from units containing how many carbons?`, ['5', '2', '6', '10'], 0, [R`Isoprene is C₅H₈.`], R`Five-carbon isoprene units.`),
      M('concept', 'Cysteine', R`Natural L-cysteine has which CIP configuration?`, ['R', 'S', 'neither, it is achiral', 'both'], 0, [R`Sulfur changes the priorities.`], R`The CH₂SH group outranks COOH, so L-cysteine is R.`),
      P('core', 'num', 'Mutarotation', R`$[\alpha]$ values: α 112, β 18.7, equilibrium 52.7. Percentage α at equilibrium?`, 100 * 34 / 93.3, [R`Solve the mixing equation.`], R`$36.4\%$.`),
      P('core', 'num', 'Peptide synthesis', R`Overall yield (%) of a 50-mer with 99% per coupling?`, 100 * Math.pow(0.99, 49), [R`49 couplings.`], R`$61\%$.`),
      P('core', 'num', 'Squalene', R`How many isoprene units are in squalene, C₃₀H₅₀?`, 6, [R`30/5.`], R`6.`),
      P('core', 'num', 'A tripeptide mass', R`Molar masses: glycine 75, alanine 89, serine 105 g/mol. Molar mass of the tripeptide Gly-Ala-Ser?`, 75 + 89 + 105 - 36, [R`Two waters are lost.`], R`$269 - 36 = 233$ g/mol.`),
      P('core', 'num', 'Aldopentoses', R`How many stereoisomers does an open-chain aldopentose have (3 stereocentres)?`, 8, [R`$2^3$.`], R`8.`),
      M('core', 'RNA instability', R`RNA is hydrolysed in base far faster than DNA because…`, ['its 2′-OH can attack the neighbouring phosphate', 'it is single-stranded', 'uracil is unstable', 'ribose is a ketose'], 0, [R`What does DNA lack?`], R`The 2′-OH acts as an internal nucleophile.`),
      P('olympiad', 'num', 'Oligonucleotides', R`Fraction of full-length chains for a 100-mer made at 99.5% per coupling?`, Math.pow(0.995, 99), [R`99 couplings.`], R`$0.61$.`),
      P('olympiad', 'num', 'Half-length limit', R`With 98% coupling yields, at what chain length (to the nearest whole number) are only half the chains full length?`, Math.round(1 + Math.log(0.5) / Math.log(0.98)), [R`Solve $0.98^{n-1} = 0.5$.`], R`$n - 1 = 34.3$: about 35.`),
      P('olympiad', 'num', 'Soap from fat', R`How many grams of NaOH (40 g/mol) saponify 1.00 kg of a triglyceride of molar mass 885 g/mol?`, 1000 / 885 * 3 * 40, [R`3 NaOH per triglyceride.`], R`$1.13\cdot3\cdot40 = 136$ g.`),
      P('olympiad', 'num', 'β fraction from rotation', R`A sample of glucose at equilibrium in a different solvent shows $[\alpha] = +60.0$ (α 112, β 18.7). What percentage is β?`, 100 * (112 - 60) / 93.3, [R`Solve for the β fraction.`], R`$52/93.3 = 55.7\%$.`)
    ],
    drills: [
      { title: 'Stepwise yields', gen: (r) => { const y = r.pick([95, 97, 98, 99, 99.5]), n = r.pick([10, 20, 30, 50, 100]); return { q: R`<p>${y}% per coupling, chain of ${n} units. Percentage full length?</p>`, answer: 100 * Math.pow(y / 100, n - 1), tol: 0.01, solution: R`<p>$${y / 100}^{${n - 1}} = ${f(Math.pow(y / 100, n - 1), 4)}$.</p>` }; } }
    ],
    predict: { q: 'Pure α-glucose ([α] = +112) is dissolved in water and left. Its optical rotation…', o: ['falls to about +53', 'rises above +112', 'stays at +112'], a: 0, how: 'start from pure α in the mutarotation figure and move the time slider.', why: 'α converts to β through the open chain until the 36 : 64 equilibrium mixture is reached.' },
    wild: ['mRNA vaccines', 'mRNA vaccines use RNA made enzymatically with a chemically modified base (N1-methylpseudouridine) and packed in lipid nanoparticles: organic chemistry of life, redesigned.']
  });
})();
