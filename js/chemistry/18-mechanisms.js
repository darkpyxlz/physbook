(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-mechanisms', subject: 'chemistry', num: 18, part: 'Organic Chemistry',
    title: 'Organic Reaction Mechanisms',
    subtitle: R`How organic reactions really happen, one curly arrow at a time. Nucleophiles and electrophiles, substitution, elimination, addition to alkenes and radical reactions.`,
    goals: ['Draw mechanisms with curly arrows', 'Rank carbocation and radical stability', 'Choose between SN1, SN2, E1 and E2', 'Apply Markovnikov’s rule', 'Predict selectivity in radical halogenation'],
    sections: [
      {
        title: 'Curly arrows, nucleophiles and electrophiles',
        html: R`
<p>A curly arrow shows a pair of electrons moving, from a lone pair or bond to an atom or bond. A half-headed arrow moves a single electron (radical reactions).</p>
<p>A <strong>nucleophile</strong> ("nucleus-loving") has a lone pair or π electrons to donate: OH⁻, CN⁻, NH₃, H₂O, alkenes. An <strong>electrophile</strong> is electron-poor and accepts them: H⁺, carbocations, the δ+ carbon of a C–X or C=O bond, Br₂ polarised by an approaching alkene.</p>
<p><strong>Carbocation</strong> stability: tertiary > secondary > primary > methyl, because alkyl groups donate electron density (hyperconjugation). Resonance stabilises allylic and benzylic cations even more. Radicals follow the same order.</p>`
      },
      {
        title: 'Nucleophilic substitution',
        html: R`
<p>A nucleophile replaces a leaving group (halide, tosylate, protonated OH) on an sp³ carbon:</p>
<ul>
<li><strong>SN2</strong>: one step, backside attack. Rate $= k[\mathrm{RX}][\mathrm{Nu}]$. Fastest for methyl and primary substrates, needs a good nucleophile, favoured by polar aprotic solvents, and <strong>inverts</strong> a stereocentre (Walden inversion).</li>
<li><strong>SN1</strong>: two steps through a carbocation. Rate $= k[\mathrm{RX}]$, independent of the nucleophile. Favoured by tertiary substrates and polar protic solvents; a stereocentre <strong>racemises</strong>, and carbocations can rearrange.</li>
</ul>
<p>Leaving-group ability follows the stability of the departing anion: I⁻ > Br⁻ > Cl⁻ ≫ F⁻, and OH⁻ only leaves once protonated.</p>`
      },
      {
        title: 'Elimination',
        html: R`
<p>A base removes a proton next to the leaving group, forming an alkene:</p>
<ul>
<li><strong>E2</strong>: one step, needs a strong base and an anti-periplanar H and leaving group.</li>
<li><strong>E1</strong>: through a carbocation, with weak bases and heat.</li>
</ul>
<p>Elimination usually gives the more substituted, more stable alkene (<strong>Zaitsev's rule</strong>); bulky bases such as tert-butoxide give the less substituted (Hofmann) product. Substitution and elimination compete: strong bases, tertiary substrates and heat favour elimination.</p>`
      },
      {
        title: 'Addition and radical reactions',
        html: R`
<p>Alkenes are electron-rich and undergo <strong>electrophilic addition</strong>. With HBr, the proton adds first to give the more stable carbocation, so the hydrogen ends up on the carbon that already has more hydrogens (<strong>Markovnikov's rule</strong>): propene gives 2-bromopropane. Bromine adds anti through a bridged bromonium ion, which is how Br₂ decolourisation tests for C=C.</p>
<p>Alkanes react by <strong>radical substitution</strong> in light: initiation (Cl₂ → 2Cl•), propagation (Cl• + RH → HCl + R•; R• + Cl₂ → RCl + Cl•) and termination. Product ratios depend on how many hydrogens of each type there are and on their relative reactivity. Chlorine is unselective (tertiary : secondary : primary ≈ 5 : 3.9 : 1 at 25 °C); bromine is very selective (about 1600 : 80 : 1), because its rate-determining step is endothermic and the transition state resembles the radical (Hammond's postulate).</p>
<div class="insight"><p>Product-ratio problems: multiply the number of equivalent hydrogens of each kind by their relative reactivity, then normalise. This simple bookkeeping answers most radical-halogenation questions.</p></div>`
      }
    ],
    labs: [
      { sim: 'substitution', title: 'Substitution or elimination?', desc: 'A teaching model of how substrate, reagent, solvent and temperature steer an alkyl bromide between SN2, SN1, E2 and E1. It shows trends, not measured rates.',
        tasks: ['Start with a methyl substrate and OH⁻. Why is SN2 the only option?', 'Switch to a tertiary substrate in water. Which pathway wins, and why?', 'With a secondary substrate, compare OH⁻ and tert-butoxide.', 'Turn on strong heating. What grows?'] }
    ],
    formulas: [
      ['SN2 rate', R`k[\mathrm{RX}][\mathrm{Nu^-}]`],
      ['SN1 rate', R`k[\mathrm{RX}]`],
      ['E2 rate', R`k[\mathrm{RX}][\mathrm{B^-}]`],
      ['Carbocation stability', R`3^\circ \gt 2^\circ \gt 1^\circ \gt \mathrm{CH_3^+}`],
      ['Product share (radical)', R`\frac{n_iR_i}{\sum n_jR_j}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Stereochemistry of SN2', q: R`<p>An SN2 reaction at a chiral carbon gives:</p>`, options: ['Retention of configuration', 'Inversion of configuration', 'A racemic mixture', 'No product'], answer: 1, hints: [R`Backside attack.`], solution: R`<p>The nucleophile attacks opposite the leaving group, flipping the carbon like an umbrella in the wind.</p>` },
      { level: 'concept', type: 'mcq', title: 'Markovnikov', q: R`<p>What is the major product of HBr adding to propene?</p>`, options: ['1-Bromopropane', '2-Bromopropane', '1,2-Dibromopropane', 'Propane'], answer: 1, hints: [R`Which carbocation is more stable?`], solution: R`<p>Protonating C1 gives a secondary cation at C2, so Br bonds to C2.</p>` },
      { level: 'concept', type: 'mcq', title: 'Most stable cation', q: R`<p>Which carbocation is most stable?</p>`, options: ['CH₃⁺', 'CH₃CH₂⁺', '(CH₃)₂CH⁺', '(CH₃)₃C⁺'], answer: 3, hints: [R`More alkyl groups donate more electron density.`], solution: R`<p>The tertiary butyl cation.</p>` },
      { level: 'core', type: 'num', title: 'SN2 rate', q: R`<p>For an SN2 reaction, both [RX] and [Nu⁻] are doubled. By what factor does the rate change?</p>`, answer: 4, tol: 0.001, unit: '×', hints: [R`First order in each.`], solution: R`<p>$2 \times 2 = 4$.</p>` },
      { level: 'core', type: 'num', title: 'SN1 rate', q: R`<p>For an SN1 reaction, only [Nu⁻] is doubled. By what factor does the rate change?</p>`, answer: 1, tol: 0.001, unit: '×', hints: [R`The nucleophile is not in the rate law.`], solution: R`<p>Unchanged: the slow step is ionisation of RX.</p>` },
      { level: 'core', type: 'num', title: 'Chlorinating propane', q: R`<p>How many structurally different monochloro products can form from propane?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`End carbons are equivalent.`], solution: R`<p>1-chloropropane and 2-chloropropane.</p>` },
      { level: 'core', type: 'num', title: 'Chlorinating 2-methylbutane', q: R`<p>How many constitutionally different monochloro products can form from 2-methylbutane (ignoring stereoisomers)?</p>`, answer: 4, tol: 0.001, unit: '', hints: [R`Count the distinct carbon environments with hydrogens.`], solution: R`<p>Four: chlorination at C1 (two equivalent CH₃), C2, C3 or C4.</p>` },
      { level: 'core', type: 'num', title: 'Product ratio', q: R`<p>In radical chlorination, a secondary hydrogen is 3.9 times as reactive as a primary one. What percentage of the monochloropropane formed is 2-chloropropane?</p>`, answer: 100 * 2 * 3.9 / (6 + 2 * 3.9), tol: 0.01, unit: '%', hints: [R`Propane has 6 primary and 2 secondary hydrogens.`], solution: R`<p>$7.8/(6 + 7.8) = 56.5\%$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Selective bromine', q: R`<p>In radical bromination, a tertiary hydrogen is 1600 times as reactive as a primary one. What percentage of the monobromide from 2-methylpropane is 2-bromo-2-methylpropane?</p>`, answer: 100 * 1600 / (1600 + 9), tol: 0.002, unit: '%', hints: [R`One tertiary H, nine primary.`], solution: R`<p>$1600/1609 = 99.4\%$: bromination is highly selective, chlorination is not (it would give 36%).</p>` },
      { level: 'olympiad', type: 'num', title: 'Elimination products', q: R`<p>2-Bromobutane undergoes E2 elimination. How many different alkenes can form, counting E/Z isomers separately?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Hydrogens can be removed from C1 or C3.`], solution: R`<p>But-1-ene, (E)-but-2-ene and (Z)-but-2-ene. Zaitsev's rule makes but-2-ene the major product, mostly the E isomer.</p>` },
      { level: 'olympiad', type: 'num', title: 'Anti addition', q: R`<p>Br₂ adds anti to cis-but-2-ene. How many stereoisomers of 2,3-dibromobutane form?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`Anti addition to a cis alkene gives a pair of enantiomers.`], solution: R`<p>(2R,3R) and (2S,3S) as a racemic mixture. trans-But-2-ene would instead give the single meso compound.</p>` }
    ]
  });
  PB.addDrills('chem-mechanisms', [
    { title: 'Radical product share', gen(r) { const np = r.pick([3, 6, 9]), ns = r.pick([0, 2, 4]), nt = r.pick([0, 1]); const X = r.pick([['chlorination', 1, 3.9, 5], ['bromination', 1, 80, 1600]]); const tot = np * X[1] + ns * X[2] + nt * X[3]; const which = nt ? 'tertiary' : ns ? 'secondary' : 'primary'; const share = 100 * (nt ? nt * X[3] : ns ? ns * X[2] : np * X[1]) / tot; return { q: R`<p>An alkane has ${np} primary, ${ns} secondary and ${nt} tertiary hydrogens. In ${X[0]} (relative reactivity 1 : ${X[2]} : ${X[3]}), what percentage of product comes from the ${which} position(s)?</p>`, answer: share, unit: '%', solution: R`<p>Share $= ${+share.toFixed(1)}\%$.</p>` }; } },
    { title: 'Rate-law factors', gen(r) { const mech = r.pick(['SN1', 'SN2', 'E2', 'E1']), a = r.pick([0.5, 2, 3]), b = r.pick([0.5, 2, 3]); const fac = mech === 'SN1' || mech === 'E1' ? a : a * b; return { q: R`<p>In an ${mech} reaction, [substrate] is multiplied by ${a} and [nucleophile/base] by ${b}. By what factor does the rate change?</p>`, answer: fac, tol: 0.001, unit: '×', solution: R`<p>${mech === 'SN1' || mech === 'E1' ? 'Rate = k[RX], so only the substrate matters' : 'Rate = k[RX][Nu]'}: ×${fac}.</p>` }; } },
    { title: 'Monohalogenation products', gen(r) { const c = r.pick([['ethane', 1], ['propane', 2], ['butane', 2], ['2-methylpropane', 2], ['pentane', 3], ['2-methylbutane', 4], ['2,2-dimethylpropane', 1], ['cyclohexane', 1], ['hexane', 3]]); return { q: R`<p>How many constitutionally different monochloro products can ${c[0]} give?</p>`, answer: c[1], tol: 0, atol: 0.01, unit: '', solution: R`<p>${c[1]}, one per distinct carbon environment bearing hydrogen.</p>` }; } }
  ]);
})();
