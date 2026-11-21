(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-transition', subject: 'chemistry', num: 16, part: 'Inorganic Chemistry',
    title: 'Transition Metals and Coordination Chemistry',
    subtitle: R`Coloured, magnetic and catalytic. Variable oxidation states, complexes and ligands, isomerism, crystal-field theory, and why copper sulfate is blue.`,
    goals: ['Describe typical transition-metal properties', 'Name ligands, coordination numbers and isomers', 'Apply crystal-field theory to high- and low-spin complexes', 'Calculate CFSE and spin-only magnetic moments', 'Relate Δo to colour'],
    sections: [
      {
        title: 'Transition-metal properties',
        html: R`
<p>A transition element forms at least one ion with a partly filled d subshell (so scandium and zinc are borderline). Their shared traits all come from those d electrons:</p>
<ul>
<li><strong>Variable oxidation states</strong>, because 4s and 3d electrons are close in energy: manganese runs from +2 to +7.</li>
<li><strong>Coloured compounds</strong>, from d–d electronic transitions.</li>
<li><strong>Paramagnetism</strong> from unpaired d electrons.</li>
<li><strong>Catalysis</strong>: Fe in the Haber process, V₂O₅ in the contact process, Ni in hydrogenation.</li>
</ul>`
      },
      {
        title: 'Complexes and isomerism',
        html: R`
<p>A <strong>complex</strong> has a central metal ion bonded to <strong>ligands</strong>, Lewis bases that donate electron pairs. Monodentate ligands (H₂O, NH₃, Cl⁻, CN⁻) donate one pair; bidentate ones such as ethylenediamine (en) and oxalate donate two; EDTA⁴⁻ donates six. The <strong>coordination number</strong> counts donor atoms: 6 (octahedral), 4 (tetrahedral or square planar) or 2 (linear).</p>
<p>The <strong>chelate effect</strong>: multidentate ligands bind far more strongly than the equivalent monodentate ones, mainly because replacing several ligands with one releases molecules and increases entropy.</p>
<p>Complexes show <strong>geometric isomerism</strong> (cis and trans [Pt(NH₃)₂Cl₂]; the cis form is the cancer drug cisplatin) and <strong>optical isomerism</strong> (octahedral complexes with two or three chelating ligands are chiral).</p>`
      },
      {
        title: 'Crystal-field theory',
        html: R`
<p>In an octahedral complex, ligands approach along the axes. The two d orbitals pointing at them (the <strong>e_g</strong> set) rise in energy; the three pointing between them (<strong>t₂g</strong>) fall. The gap is the crystal-field splitting $\Delta_o$.</p>
<p>The <strong>spectrochemical series</strong> ranks ligands by the splitting they cause:</p>
<p style="text-align:center">I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < NO₂⁻ < CN⁻ < CO</p>
<p>For d⁴–d⁷ there is a choice. If $\Delta_o$ is less than the pairing energy $P$, electrons spread out (<strong>high spin</strong>); if greater, they pair in t₂g (<strong>low spin</strong>). The <strong>crystal-field stabilisation energy</strong> is</p>
<div class="key">$$\mathrm{CFSE} = (-0.4\,n_{t_{2g}} + 0.6\,n_{e_g})\,\Delta_o\ (+\ \text{pairing energies}).$$</div>
<p>Tetrahedral splitting is smaller, $\Delta_t \approx \tfrac49\Delta_o$, so tetrahedral complexes are almost always high spin. d⁸ ions with strong-field ligands (Ni²⁺, Pd²⁺, Pt²⁺) prefer square planar geometry.</p>`
      },
      {
        title: 'Colour and magnetism',
        html: R`
<p>A complex absorbs light of energy $\Delta_o$ (for one-electron d¹ systems) and shows the complementary colour. [Ti(H₂O)₆]³⁺ absorbs at about 490 nm (blue-green) and looks purple. Stronger-field ligands shift the absorption to shorter wavelength: replacing water by ammonia turns pale blue Cu²⁺ deep blue-violet. d⁰ and d¹⁰ ions (Sc³⁺, Zn²⁺) have no d–d transitions and are colourless.</p>
<p>The <strong>spin-only magnetic moment</strong> counts unpaired electrons $n$:</p>
<div class="key">$$\mu_{\text{so}} = \sqrt{n(n+2)}\ \mu_B.$$</div>
<p>Measuring μ tells you whether a complex is high or low spin: [Fe(H₂O)₆]²⁺ (d⁶, high spin) has 4 unpaired electrons, while [Fe(CN)₆]⁴⁻ (d⁶, low spin) has none.</p>
<div class="insight"><p>Converting spectroscopic units: 1 cm⁻¹ corresponds to 11.96 J/mol, so a splitting of 20 000 cm⁻¹ is 239 kJ/mol, comparable to a bond energy. Also $\lambda(\mathrm{nm}) = 10^7/\tilde\nu(\mathrm{cm^{-1}})$.</p></div>`
      }
    ],
    labs: [
      { sim: 'crystalfield', title: 'Crystal-field splitting', desc: 'Octahedral d-orbital splitting. Choose the d count, the ligand and the pairing energy; the diagram fills high or low spin accordingly and shows the colour absorbed.',
        tasks: ['For d⁶, change the ligand from Cl⁻ to CN⁻. When does it switch to low spin, and what happens to the unpaired electrons?', 'Which d counts have the same filling whatever Δo?', 'How does the absorbed colour shift along the spectrochemical series?'] }
    ],
    formulas: [
      ['CFSE (octahedral)', R`(-0.4n_{t_{2g}} + 0.6n_{e_g})\Delta_o`],
      ['Tetrahedral splitting', R`\Delta_t \approx \tfrac49\Delta_o`],
      ['Spin-only moment', R`\mu = \sqrt{n(n+2)}\ \mu_B`],
      ['Wavelength from wavenumber', R`\lambda(\mathrm{nm}) = 10^7/\tilde\nu(\mathrm{cm^{-1}})`],
      ['Energy per mole', R`E = hc\tilde\nu N_A`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Coordination number', q: R`<p>What is the coordination number of cobalt in [Co(en)₃]³⁺?</p>`, options: ['3', '4', '6', '9'], answer: 2, hints: [R`en is bidentate.`], solution: R`<p>3 ligands × 2 donor atoms = 6 (octahedral).</p>` },
      { level: 'concept', type: 'mcq', title: 'Colourless zinc', q: R`<p>Why are zinc(II) compounds colourless?</p>`, options: ['Zn²⁺ has no d electrons', 'Zn²⁺ has a full d subshell, so no d–d transitions are possible', 'Zinc is not a metal', 'Zn²⁺ is too small'], answer: 1, hints: [R`Zn²⁺ is 3d¹⁰.`], solution: R`<p>With every d orbital full, no electron can be promoted from t₂g to e_g.</p>` },
      { level: 'concept', type: 'mcq', title: 'Strong-field ligand', q: R`<p>Which ligand causes the largest crystal-field splitting?</p>`, options: ['I⁻', 'H₂O', 'NH₃', 'CN⁻'], answer: 3, hints: [R`Spectrochemical series.`], solution: R`<p>CN⁻, a π-acceptor, is near the strong-field end.</p>` },
      { level: 'core', type: 'num', title: 'Iron in a cyanide', q: R`<p>What is the oxidation state of iron in K₄[Fe(CN)₆]?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`4(+1) + x + 6(−1) = 0.`], solution: R`<p>+2.</p>` },
      { level: 'core', type: 'num', title: 'Magnetic moment', q: R`<p>Find the spin-only magnetic moment of high-spin Fe³⁺ (d⁵), in μ_B.</p>`, answer: Math.sqrt(35), tol: 0.005, unit: 'μB', hints: [R`5 unpaired electrons.`], solution: R`<p>$\sqrt{5\times7} = 5.92\ \mu_B$.</p>` },
      { level: 'core', type: 'num', title: 'CFSE', q: R`<p>Find the CFSE of a low-spin d⁶ octahedral complex, in units of Δo (ignore pairing energy).</p>`, answer: -2.4, tol: 0.001, unit: 'Δo', hints: [R`All six electrons in t₂g.`], solution: R`<p>$6 \times (-0.4) = -2.4\Delta_o$, the largest possible, which is why low-spin d⁶ complexes are so inert.</p>` },
      { level: 'core', type: 'num', title: 'Titanium colour', q: R`<p>[Ti(H₂O)₆]³⁺ has Δo = 20 300 cm⁻¹. At what wavelength does it absorb, in nm?</p>`, answer: 1e7 / 20300, tol: 0.005, unit: 'nm', hints: [R`$\lambda = 10^7/\tilde\nu$.`], solution: R`<p>493 nm (blue-green), so it appears purple.</p>` },
      { level: 'core', type: 'num', title: 'Ferrocyanide', q: R`<p>How many unpaired electrons does [Fe(CN)₆]⁴⁻ have?</p>`, answer: 0, tol: 0, atol: 0.01, unit: '', hints: [R`Fe²⁺ is d⁶ and CN⁻ is strong-field.`], solution: R`<p>Low spin: t₂g⁶, all paired. It is diamagnetic.</p>` },
      { level: 'olympiad', type: 'num', title: 'Splitting in kJ/mol', q: R`<p>Convert Δo = 20 300 cm⁻¹ into kJ/mol.</p>`, answer: 6.626e-34 * 2.998e10 * 20300 * 6.022e23 / 1000, tol: 0.005, unit: 'kJ/mol', hints: [R`$E = hc\tilde\nu N_A$ with $c$ in cm/s.`], solution: R`<p>$E = 243\ \mathrm{kJ/mol}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Counting stereoisomers', q: R`<p>How many stereoisomers does octahedral [Co(en)₂Cl₂]⁺ have?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Trans is achiral; cis exists as a pair of mirror images.`], solution: R`<p>trans, plus Δ-cis and Λ-cis: 3. Werner's resolution of such complexes proved octahedral geometry in 1911.</p>` },
      { level: 'olympiad', type: 'num', title: 'From moment to electrons', q: R`<p>A complex has a measured magnetic moment of 3.87 μ_B. How many unpaired electrons does it have?</p>`, answer: 3, tol: 0.001, unit: '', hints: [R`Solve $n(n+2) = 3.87^2$.`], solution: R`<p>$n(n+2) = 15.0$, so $n = 3$ (for example Cr³⁺ or high-spin Co²⁺).</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('chem-transition', [
    { title: 'Spin-only moment', gen(r) { const n = r.int(0, 5); return { q: R`<p>Find the spin-only magnetic moment (μ_B) of an ion with ${n} unpaired electron${n === 1 ? '' : 's'}.</p>`, answer: Math.sqrt(n * (n + 2)), tol: 0.005, atol: 0.01, unit: 'μB', solution: R`<p>$\sqrt{${n}(${n + 2})} = ${f(Math.sqrt(n * (n + 2)))}$.</p>` }; } },
    { title: 'Absorption wavelength', gen(r) { const w = r.int(8000, 32000); return { q: R`<p>A d¹ complex has Δo = ${w} cm⁻¹. Find the absorbed wavelength (nm).</p>`, answer: 1e7 / w, unit: 'nm', solution: R`<p>$10^7/${w} = ${f(1e7 / w)}\ \mathrm{nm}$.</p>` }; } },
    { title: 'Oxidation state in a complex', gen(r) { const c = r.pick([['Co in [Co(NH₃)₆]³⁺', 3], ['Cu in [CuCl₄]²⁻', 2], ['Fe in [Fe(CN)₆]³⁻', 3], ['Cr in [Cr(H₂O)₆]³⁺', 3], ['Ni in Ni(CO)₄', 0], ['Pt in [PtCl₄]²⁻', 2], ['Mn in MnO₄⁻', 7], ['Ag in [Ag(NH₃)₂]⁺', 1]]); return { q: R`<p>What is the oxidation state of ${c[0]}?</p>`, answer: c[1], tol: 0, atol: 0.01, unit: '', solution: R`<p>${c[1]}.</p>` }; } }
  ]);
})();
