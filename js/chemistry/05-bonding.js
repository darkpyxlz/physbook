(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-bonding', subject: 'chemistry', num: 5, part: 'Foundations',
    title: 'Chemical Bonding',
    subtitle: R`Why atoms stick together. Ionic lattices and the Born–Haber cycle, covalent bonds and Lewis structures, formal charge and resonance, and metallic bonding.`,
    goals: ['Explain ionic, covalent and metallic bonding', 'Build Born–Haber cycles', 'Draw Lewis structures with formal charges', 'Use resonance and bond order', 'Estimate lattice energies'],
    sections: [
      {
        title: 'Ionic bonding and lattice energy',
        html: R`
<p>When a metal with low ionisation energy meets a non-metal with high electron affinity, electrons transfer and the resulting ions pack into a <strong>lattice</strong>. Making the gaseous ions actually costs energy (for NaCl, $496 - 349 = +147\ \mathrm{kJ/mol}$); the payoff is the huge electrostatic attraction in the lattice.</p>
<p>The <strong>lattice energy</strong> is the energy released when one mole of solid forms from its gaseous ions. Electrostatics shows it grows with charge and falls with size:</p>
<div class="key">$$U \propto \frac{z_+z_-}{r_+ + r_-}.$$</div>
<p>MgO (charges 2 and 2, small ions) has a lattice energy about five times that of NaCl, which is why it melts at 2852 °C.</p>
<p>A full calculation sums the attraction and repulsion between every pair of ions in the crystal. The result is the Born–Landé equation, $U = \dfrac{N_AMz_+z_-e^2}{4\pi\varepsilon_0r_0}\left(1 - \dfrac1n\right)$, where the <strong>Madelung constant</strong> $M$ depends only on the crystal structure (1.748 for rock salt) and $n$ (about 8) describes the short-range repulsion.</p>`
      },
      {
        title: 'The Born–Haber cycle',
        html: R`
<p>Lattice energies cannot be measured directly, but Hess's law lets us calculate them. The Born–Haber cycle breaks the formation of an ionic solid from its elements into steps:</p>
<ol>
<li>Atomise the metal: $\mathrm{Na(s) \to Na(g)}$.</li>
<li>Ionise it: $\mathrm{Na(g) \to Na^+(g) + e^-}$.</li>
<li>Atomise the non-metal: $\tfrac12\mathrm{Cl_2(g) \to Cl(g)}$.</li>
<li>Add the electron: $\mathrm{Cl(g) + e^- \to Cl^-(g)}$ (electron affinity).</li>
<li>Form the lattice: $\mathrm{Na^+(g) + Cl^-(g) \to NaCl(s)}$.</li>
</ol>
<p>The sum equals the measured enthalpy of formation, so the one unknown can be found. Comparing the Born–Haber lattice energy with the purely ionic model reveals covalent character: AgI's experimental value is well above the ionic estimate because the large, polarisable iodide shares electrons with silver.</p>`
      },
      {
        title: 'Covalent bonds and Lewis structures',
        html: R`
<p>Non-metals share electron pairs. Lewis structures show valence electrons as dots or lines. To draw one:</p>
<ol>
<li>Count all valence electrons (add one for each negative charge, subtract one for each positive charge).</li>
<li>Connect atoms with single bonds, usually with the least electronegative atom in the centre.</li>
<li>Complete octets on outer atoms, then put leftover electrons on the central atom.</li>
<li>If the central atom lacks an octet, turn lone pairs on neighbours into double bonds.</li>
</ol>
<p>The <strong>formal charge</strong> on an atom is</p>
<div class="key">$$\mathrm{FC} = (\text{valence electrons}) - (\text{lone-pair electrons}) - \tfrac12(\text{bonding electrons}).$$</div>
<p>The best structure has formal charges as close to zero as possible, with any negative charge on the more electronegative atom. Elements from period 3 down can exceed the octet (SF₆, PCl₅); boron and beryllium compounds often fall short of it.</p>`
      },
      {
        title: 'Resonance, bond order and metallic bonding',
        html: R`
<p>When several Lewis structures differ only in where electrons sit, the real molecule is a <strong>resonance hybrid</strong>. In ozone the two O–O bonds are identical, each with <strong>bond order</strong> 1.5, and benzene's six C–C bonds all have order 1.5. Higher bond order means shorter and stronger bonds.</p>
<p>In metals, valence electrons are delocalised over the whole crystal, a "sea of electrons" around cations. This explains electrical conductivity, malleability (layers can slide without breaking bonds) and lustre.</p>
<div class="insight"><p>Bonding is a continuum. Fajans' rules: covalent character in an ionic compound increases with a small, highly charged cation and a large, polarisable anion. That is why AlCl₃ is a volatile covalent molecule while NaCl is a typical ionic solid.</p></div>`
      }
    ],
    labs: [
      { sim: 'lattice', title: 'Lattice energy estimator', desc: 'Kapustinskii’s equation estimates lattice energies from ion charges and radii, compared here with NaCl and MgO.',
        tasks: ['Compare NaF, NaCl, NaBr and NaI. How does anion size matter?', 'Switch to MgO and Al₂O₃. Which matters more: charge or size?', 'Why do Group 2 oxides have such high melting points?'] }
    ],
    formulas: [
      ['Lattice energy trend', R`U \propto z_+z_-/(r_+ + r_-)`],
      ['Born–Landé equation', R`U = \frac{N_AMz_+z_-e^2}{4\pi\varepsilon_0r_0}\left(1 - \frac1n\right)`],
      ['Formal charge', R`\mathrm{FC} = V - L - \tfrac12B`],
      ['Bond order (resonance)', R`\frac{\text{total bonds between pair}}{\text{number of structures}}`],
      ['Dipole moment', R`\mu = qd\ (1\ \mathrm D = 3.336\times10^{-30}\ \mathrm{C\,m})`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Which is ionic?', q: R`<p>Which compound is held together mainly by ionic bonding?</p>`, options: ['CH₄', 'HCl', 'MgO', 'SiO₂'], answer: 2, hints: [R`A metal and a non-metal with a large electronegativity difference.`], solution: R`<p>MgO ($\Delta\chi = 2.1$) is ionic. CH₄ and HCl are molecular; SiO₂ is a covalent network.</p>` },
      { level: 'concept', type: 'mcq', title: 'Ammonium', q: R`<p>What is the formal charge on nitrogen in NH₄⁺?</p>`, options: ['−1', '0', '+1', '+2'], answer: 2, hints: [R`N: 5 valence electrons, no lone pairs, four bonds.`], solution: R`<p>$5 - 0 - \tfrac12(8) = +1$.</p>` },
      { level: 'concept', type: 'mcq', title: 'Stronger lattice', q: R`<p>Why does MgO have a much larger lattice energy than NaCl?</p>`, options: ['Mg is more electronegative than Na', 'Its ions are doubly charged and smaller', 'It has more covalent character', 'Oxygen is a gas'], answer: 1, hints: [R`$U \propto z_+z_-/(r_+ + r_-)$.`], solution: R`<p>Doubling both charges quadruples the attraction, and the ions are also smaller.</p>` },
      { level: 'core', type: 'num', title: 'Born–Haber for NaCl', q: R`<p>Use these data (kJ/mol) to find the lattice enthalpy of NaCl, i.e. ΔH for $\mathrm{Na^+(g) + Cl^-(g) \to NaCl(s)}$: ΔfH(NaCl) = −411; atomisation of Na = +107; first IE of Na = +496; ½ bond enthalpy of Cl₂ = +122; electron affinity of Cl = −349.</p>`, answer: -411 - (107 + 496 + 122 - 349), tol: 0.005, unit: 'kJ/mol', hints: [R`ΔfH = sum of the other steps + lattice enthalpy.`], solution: R`<p>$-411 = 107 + 496 + 122 - 349 + U$, so $U = -787\ \mathrm{kJ/mol}$.</p>` },
      { level: 'core', type: 'num', title: 'Sulfate formal charge', q: R`<p>In a Lewis structure of SO₄²⁻ with four S–O single bonds, what is the formal charge on sulfur?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`S has 6 valence electrons, no lone pairs and 4 bonds.`], solution: R`<p>$6 - 0 - 4 = +2$. Structures with two S=O double bonds reduce it to 0, which is why they are often drawn.</p>` },
      { level: 'core', type: 'num', title: 'Ozone', q: R`<p>What is the O–O bond order in ozone, O₃?</p>`, answer: 1.5, tol: 0.001, unit: '', hints: [R`Two equivalent resonance structures, each with one single and one double bond.`], solution: R`<p>(1 + 2)/2 = 1.5 for each bond.</p>` },
      { level: 'core', type: 'num', title: 'One ion pair', q: R`<p>Calculate the Coulomb energy of a single Na⁺Cl⁻ ion pair 283 pm apart, expressed per mole of pairs (kJ/mol). ($k = 8.988\times10^9$, $e = 1.602\times10^{-19}\ \mathrm C$)</p>`, answer: 8.988e9 * Math.pow(1.602e-19, 2) / 2.83e-10 * 6.022e23 / 1000, tol: 0.01, unit: 'kJ/mol', hints: [R`$E = ke^2/r$, then multiply by $N_A$.`], solution: R`<p>$E = 8.15\times10^{-19}\ \mathrm J$ per pair, or $491\ \mathrm{kJ/mol}$. The lattice adds more attraction (Madelung constant 1.748).</p>` },
      { level: 'core', type: 'num', title: 'Counting electrons', q: R`<p>How many valence electrons appear in the Lewis structure of the carbonate ion, CO₃²⁻?</p>`, answer: 24, tol: 0.001, unit: '', hints: [R`C: 4, O: 6 each, plus 2 for the charge.`], solution: R`<p>$4 + 18 + 2 = 24$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Born–Landé', q: R`<p>Estimate the lattice energy of NaCl using the Born–Landé equation with Madelung constant 1.748, $r_0 = 283\ \mathrm{pm}$ and Born exponent $n = 8$.</p>`, answer: 8.988e9 * Math.pow(1.602e-19, 2) / 2.83e-10 * 6.022e23 / 1000 * 1.748 * (7 / 8), tol: 0.01, unit: 'kJ/mol', hints: [R`Multiply the ion-pair energy by $M(1 - 1/n)$.`], solution: R`<p>$491 \times 1.748 \times 0.875 = 751\ \mathrm{kJ/mol}$, within 5% of the Born–Haber value of 787, confirming NaCl is almost purely ionic.</p>` },
      { level: 'olympiad', type: 'num', title: 'Oxide’s second electron', q: R`<p>Use a Born–Haber cycle for MgO to find the second electron affinity of oxygen, ΔH for $\mathrm{O^-(g) + e^- \to O^{2-}(g)}$. Data (kJ/mol): ΔfH(MgO) = −602; atomisation of Mg = +148; IE₁ + IE₂ of Mg = +2189; ½ bond enthalpy of O₂ = +249; first EA of O = −141; lattice enthalpy = −3791.</p>`, answer: -602 - 148 - 2189 - 249 + 141 + 3791, tol: 0.01, unit: 'kJ/mol', hints: [R`Everything sums to ΔfH.`], solution: R`<p>$EA_2 = -602 - 148 - 2189 - 249 + 141 + 3791 = +744\ \mathrm{kJ/mol}$. Adding a second electron to O⁻ costs energy; O²⁻ exists only because the lattice pays it back.</p>` },
      { level: 'olympiad', type: 'num', title: 'How ionic is HCl?', q: R`<p>HCl has dipole moment 1.08 D and bond length 127 pm. What percentage of a fully ionic dipole (charges ±e at that distance) is this? ($1\ \mathrm D = 3.336\times10^{-30}\ \mathrm{C\,m}$)</p>`, answer: 100 * 1.08 * 3.336e-30 / (1.602e-19 * 1.27e-10), tol: 0.01, unit: '%', hints: [R`Fully ionic: $\mu = ed$.`], solution: R`<p>$ed = 2.03\times10^{-29}\ \mathrm{C\,m} = 6.10\ \mathrm D$, so HCl is $1.08/6.10 = 17.7\%$ ionic.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-bonding', [
    { title: 'Born–Haber lattice enthalpy', gen(r) { const at = r.int(80, 180), ie = r.int(380, 520), half = r.int(80, 160), ea = -r.int(290, 360), dfh = -r.int(300, 600); const U = dfh - (at + ie + half + ea); return { q: R`<p>Find the lattice enthalpy (kJ/mol) of MX from: ΔfH = ${dfh}; atomisation of M = +${at}; IE(M) = +${ie}; ½ bond enthalpy of X₂ = +${half}; EA(X) = ${ea}.</p>`, answer: U, tol: 0.005, unit: 'kJ/mol', solution: R`<p>$U = ${dfh} - (${at} + ${ie} + ${half} ${ea}) = ${U}\ \mathrm{kJ/mol}$.</p>` }; } },
    { title: 'Formal charge', gen(r) { const c = r.pick([['N in NH₄⁺', 1], ['O in H₃O⁺', 1], ['C in CO (triple bond, one lone pair on C)', -1], ['N in NO₃⁻ (single-bonded O)', 1], ['B in BF₄⁻', -1], ['O in OH⁻', -1], ['S in SO₂ with two double bonds', 0]]); return { q: R`<p>What is the formal charge on ${c[0]}?</p>`, answer: c[1], tol: 0.001, unit: '', solution: R`<p>$\mathrm{FC} = V - L - B/2 = ${c[1]}$.</p>` }; } },
    { title: 'Coulomb energy of an ion pair', gen(r) { const zc = r.int(1, 3), za = r.int(1, 2), d = r.int(180, 350); const E = 8.988e9 * zc * za * Math.pow(1.602e-19, 2) / (d * 1e-12) * 6.022e23 / 1000; return { q: R`<p>Ions with charges +${zc} and −${za} sit ${d} pm apart. What is their Coulomb attraction energy per mole of pairs (kJ/mol)?</p>`, answer: E, unit: 'kJ/mol', solution: R`<p>$E = N_Akz_+z_-e^2/r = ${f(E)}\ \mathrm{kJ/mol}$.</p>` }; } }
  ]);
})();
