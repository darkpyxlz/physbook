(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-periodic', subject: 'chemistry', num: 4, part: 'Foundations',
    title: 'The Periodic Table',
    subtitle: R`Why the table has the shape it does, and how radius, ionisation energy, electron affinity and electronegativity change across periods and down groups.`,
    goals: ['Read blocks, groups and periods', 'Explain trends in atomic and ionic radius', 'Interpret ionisation energies, including the anomalies', 'Use electronegativity to judge bond character', 'Spot diagonal relationships'],
    sections: [
      {
        title: 'Organising the elements',
        html: R`
<p>Mendeleev ordered elements by atomic mass and left gaps for undiscovered ones; the modern table orders them by atomic number. Its shape mirrors electron configurations:</p>
<ul>
<li><strong>Periods</strong> (rows) correspond to the principal quantum number of the outermost shell.</li>
<li><strong>Groups</strong> (columns) share outer-shell configurations, and so share chemistry.</li>
<li><strong>Blocks</strong> (s, p, d, f) are named after the subshell being filled.</li>
</ul>
<p>Metals lie to the left and bottom; non-metals to the top right; metalloids (B, Si, Ge, As, Sb, Te) form a staircase between them.</p>`
      },
      {
        title: 'Atomic and ionic radius',
        html: R`
<p>Across a period, $Z_{\text{eff}}$ increases and electrons are pulled closer: <strong>atoms shrink from left to right</strong>. Down a group, each new shell is farther out: <strong>atoms grow down a group</strong>.</p>
<p>Cations are smaller than their atoms (an entire shell is often lost); anions are larger (extra electron–electron repulsion). In an <strong>isoelectronic series</strong>, such as O²⁻, F⁻, Na⁺, Mg²⁺ (all 10 electrons), the radius falls as the nuclear charge rises.</p>`
      },
      {
        title: 'Ionisation energy and electron affinity',
        html: R`
<p>The first <strong>ionisation energy</strong> is the energy to remove the outermost electron from a gaseous atom: $\mathrm{X(g) \to X^+(g) + e^-}$. It generally rises across a period and falls down a group, with two famous dips:</p>
<ul>
<li><strong>Be → B</strong>: boron's electron is in a 2p orbital, higher in energy and better shielded than 2s.</li>
<li><strong>N → O</strong>: oxygen's fourth 2p electron must pair up, and the repulsion makes it easier to remove.</li>
</ul>
<p><strong>Successive ionisation energies</strong> rise steadily until an electron must be removed from a new, inner shell; then they jump. The position of the big jump reveals the group.</p>
<p><strong>Electron affinity</strong> is the energy released when a gaseous atom gains an electron. Halogens release the most; noble gases essentially none.</p>`
      },
      {
        title: 'Electronegativity and bond character',
        html: R`
<p><strong>Electronegativity</strong> $\chi$ is an atom's pull on the shared electrons of a bond. On the Pauling scale fluorine is 3.98 and caesium 0.79; it rises across a period and falls down a group.</p>
<p>The difference $\Delta\chi$ sets the bond type: about 0 for a non-polar covalent bond, up to about 1.7 for polar covalent, larger for mostly ionic. Pauling's estimate of ionic character is</p>
<div class="key">$$\text{ionic character} \approx 1 - e^{-(\Delta\chi)^2/4}.$$</div>
<p>Mulliken defined electronegativity from measurable energies, $\chi_M = \tfrac12(I + E_{ea})$, which correlates closely with Pauling's values.</p>
<div class="insight"><p>Diagonal relationships: Li resembles Mg, Be resembles Al, and B resembles Si, because moving right raises charge density as much as moving down lowers it. Be and Al both form amphoteric oxides and covalent chlorides.</p></div>`
      }
    ],
    labs: [
      { sim: 'trends', title: 'Periodic trends', desc: 'Ionisation energy, electronegativity and covalent radius for elements 1–36, coloured by block.',
        tasks: ['Find the dips in ionisation energy at B, O, Al and S. Explain each.', 'Switch to radius. Why does it barely change across the 3d metals?', 'Compare the electronegativity of the alkali metals and the halogens.'] }
    ],
    formulas: [
      ['Pauling ionic character', R`1 - e^{-(\Delta\chi)^2/4}`],
      ['Mulliken electronegativity', R`\chi_M = \tfrac12(I + E_{ea})`],
      ['Energy per mole', R`E_{\text{molar}} = N_AE_{\text{atom}}`],
      ['Moseley’s law (Kα)', R`E = \tfrac34(13.6\ \mathrm{eV})(Z - 1)^2`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Biggest atom', q: R`<p>Which atom has the largest radius?</p>`, options: ['Na', 'Mg', 'K', 'Ca'], answer: 2, hints: [R`Down a group: bigger. Across: smaller.`], solution: R`<p>K is in period 4 (one more shell than Na) and further left than Ca.</p>` },
      { level: 'concept', type: 'mcq', title: 'The oxygen dip', q: R`<p>Why is the first ionisation energy of oxygen lower than that of nitrogen?</p>`, options: ['Oxygen has a smaller nuclear charge', 'Oxygen’s outer electron is in a new shell', 'Oxygen has a paired 2p electron that is repelled by its partner', 'Oxygen is more electronegative'], answer: 2, hints: [R`Draw the 2p boxes for N and O.`], solution: R`<p>N has three unpaired 2p electrons; O's fourth must pair, and electron–electron repulsion makes it easier to remove.</p>` },
      { level: 'concept', type: 'mcq', title: 'Isoelectronic ions', q: R`<p>Which of these ions, all with 10 electrons, is largest?</p>`, options: ['O²⁻', 'F⁻', 'Na⁺', 'Mg²⁺'], answer: 0, hints: [R`Same electrons, fewer protons: weaker pull.`], solution: R`<p>O²⁻ has the fewest protons (8) holding 10 electrons.</p>` },
      { level: 'core', type: 'num', title: 'Reading the jump', q: R`<p>An element in period 3 has successive ionisation energies 578, 1817, 2745 and 11 577 kJ/mol. How many valence electrons does it have?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Look for the big jump.`], solution: R`<p>The jump comes after the third electron, so it has 3 valence electrons: aluminium.</p>` },
      { level: 'core', type: 'num', title: 'Ionising sodium vapour', q: R`<p>Sodium's first ionisation energy is 496 kJ/mol. How much energy ionises every atom in 1.00 g of sodium vapour ($M = 22.99$)?</p>`, answer: 496 / 22.99, tol: 0.01, unit: 'kJ', hints: [R`$n = 1.00/22.99$.`], solution: R`<p>$0.0435\ \mathrm{mol} \times 496 = 21.6\ \mathrm{kJ}$.</p>` },
      { level: 'core', type: 'num', title: 'How ionic is HF?', q: R`<p>Use Pauling's formula to estimate the percentage ionic character of the H–F bond ($\chi_H = 2.20$, $\chi_F = 3.98$).</p>`, answer: 100 * (1 - Math.exp(-Math.pow(1.78, 2) / 4)), tol: 0.01, unit: '%', hints: [R`$\Delta\chi = 1.78$.`], solution: R`<p>$1 - e^{-1.78^2/4} = 0.547$: about 55% ionic.</p>` },
      { level: 'core', type: 'num', title: 'Light to ionise potassium', q: R`<p>Potassium's first ionisation energy is 419 kJ/mol. What is the longest wavelength of light that can ionise a potassium atom, in nm?</p>`, answer: 6.626e-34 * 2.998e8 / (419000 / 6.022e23) * 1e9, tol: 0.01, unit: 'nm', hints: [R`Energy per atom $= 419\,000/N_A$.`], solution: R`<p>$E = 6.96\times10^{-19}\ \mathrm J$, so $\lambda = hc/E = 286\ \mathrm{nm}$ (ultraviolet).</p>` },
      { level: 'core', type: 'num', title: 'Identify the element', q: R`<p>A period-3 element's successive ionisation energies show a large jump between the 2nd and 3rd. What is its atomic number?</p>`, answer: 12, tol: 0.001, unit: '', hints: [R`Two valence electrons in period 3.`], solution: R`<p>Group 2, period 3: magnesium, Z = 12.</p>` },
      { level: 'olympiad', type: 'num', title: 'Mulliken electronegativity', q: R`<p>Chlorine has ionisation energy 12.97 eV and electron affinity 3.61 eV. What is its Mulliken electronegativity in eV?</p>`, answer: (12.97 + 3.61) / 2, tol: 0.01, unit: 'eV', hints: [R`Average the two.`], solution: R`<p>$(12.97 + 3.61)/2 = 8.29\ \mathrm{eV}$ (Pauling scale ≈ 3.16 after conversion).</p>` },
      { level: 'olympiad', type: 'num', title: 'Ionic radius from a crystal', q: R`<p>The cubic NaCl unit cell has edge 564 pm, with Na⁺ and Cl⁻ touching along the edge. If $r(\mathrm{Cl^-}) = 181\ \mathrm{pm}$, find $r(\mathrm{Na^+})$.</p>`, answer: 564 / 2 - 181, tol: 0.01, unit: 'pm', hints: [R`Along an edge: $a = 2r_+ + 2r_-$.`], solution: R`<p>$r_+ = 282 - 181 = 101\ \mathrm{pm}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Moseley and copper', q: R`<p>Moseley's law gives the Kα X-ray energy as $E = \tfrac34(13.6\ \mathrm{eV})(Z - 1)^2$. Estimate the Kα wavelength of copper (Z = 29), in nm.</p>`, answer: 1240 / (0.75 * 13.6 * 28 * 28), tol: 0.02, unit: 'nm', hints: [R`Screening by the remaining 1s electron reduces $Z$ by about 1.`], solution: R`<p>$E = 0.75 \times 13.6 \times 784 = 8.00\ \mathrm{keV}$, $\lambda = 1240/8000 = 0.155\ \mathrm{nm}$ (measured: 0.154 nm). Moseley used this to fix atomic numbers and predict missing elements.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-periodic', [
    { title: 'eV to kJ/mol', gen(r) { const e = r.step(3, 25, 0.01); return { q: R`<p>Convert an ionisation energy of $${e}\ \mathrm{eV}$ per atom to kJ/mol.</p>`, answer: e * 96.485, unit: 'kJ/mol', solution: R`<p>$${e}\times96.485 = ${f(e * 96.485)}\ \mathrm{kJ/mol}$.</p>` }; } },
    { title: 'Ionic character', gen(r) { const a = r.step(0.8, 2.6, 0.01), b = r.step(2.5, 4, 0.01); const d = Math.abs(b - a); return { q: R`<p>Estimate the percentage ionic character of a bond between atoms with $\chi = ${a}$ and $\chi = ${b}$.</p>`, answer: 100 * (1 - Math.exp(-d * d / 4)), unit: '%', solution: R`<p>$1 - e^{-(${f(d)})^2/4} = ${f(100 * (1 - Math.exp(-d * d / 4)))}\%$.</p>` }; } },
    { title: 'Ionisation wavelength', gen(r) { const z = r.int(1, 36), ie = PB.chemData.IE1[z - 1]; const lam = 6.626e-34 * 2.998e8 / (ie * 1000 / 6.022e23) * 1e9; return { q: R`<p>${PB.chemSymbols[z - 1]} has first ionisation energy ${ie} kJ/mol. What is the longest wavelength (nm) that can ionise one atom?</p>`, answer: lam, unit: 'nm', solution: R`<p>$\lambda = hcN_A/IE = ${f(lam)}\ \mathrm{nm}$.</p>` }; } }
  ]);
})();
