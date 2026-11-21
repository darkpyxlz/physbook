(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'chem-shapes', subject: 'chemistry', num: 6, part: 'Foundations',
    title: 'Molecular Shape and Intermolecular Forces',
    subtitle: R`Shape decides function. VSEPR geometry, hybridisation and sigma and pi bonds, molecular polarity, and the intermolecular forces that set boiling points and solubility.`,
    goals: ['Predict shapes and bond angles with VSEPR', 'Assign hybridisation and count σ and π bonds', 'Decide whether a molecule is polar', 'Rank boiling points by intermolecular forces', 'Recognise hydrogen bonding'],
    sections: [
      {
        title: 'VSEPR theory',
        html: R`
<p>Electron pairs around a central atom repel and spread as far apart as possible. Count the <strong>electron domains</strong> (bonds count once whatever their order, plus lone pairs) to get the electron geometry; the molecular shape describes only the atoms.</p>
<div class="table-wrap"><table><thead><tr><th>Domains</th><th>Lone pairs</th><th>Shape</th><th>Example</th></tr></thead><tbody>
<tr><td>2</td><td>0</td><td>linear, 180°</td><td>CO₂</td></tr>
<tr><td>3</td><td>0 / 1</td><td>trigonal planar 120° / bent</td><td>BF₃ / SO₂</td></tr>
<tr><td>4</td><td>0 / 1 / 2</td><td>tetrahedral 109.5° / pyramidal / bent</td><td>CH₄ / NH₃ / H₂O</td></tr>
<tr><td>5</td><td>0 / 1 / 2 / 3</td><td>trigonal bipyramid / see-saw / T-shape / linear</td><td>PCl₅ / SF₄ / ClF₃ / XeF₂</td></tr>
<tr><td>6</td><td>0 / 1 / 2</td><td>octahedral / square pyramid / square planar</td><td>SF₆ / BrF₅ / XeF₄</td></tr>
</tbody></table></div>
<p>Lone pairs repel more strongly than bonding pairs, squeezing bond angles: 109.5° in CH₄, 107° in NH₃, 104.5° in H₂O. In a trigonal bipyramid, lone pairs go in the roomier equatorial positions.</p>`
      },
      {
        title: 'Hybridisation, σ and π bonds',
        html: R`
<p>Valence bond theory mixes atomic orbitals into <strong>hybrids</strong> that point along the bonds: sp (linear), sp² (trigonal), sp³ (tetrahedral), with sp³d and sp³d² as bookkeeping for five and six domains.</p>
<p>Head-on overlap gives a <strong>σ bond</strong>, with electron density along the axis. Side-on overlap of unhybridised p orbitals gives a <strong>π bond</strong> above and below it. A single bond is σ; a double bond is σ + π; a triple bond is σ + 2π. Because π overlap must be maintained, rotation about a double bond is blocked, which is the origin of cis–trans isomerism.</p>`
      },
      {
        title: 'Polarity',
        html: R`
<p>A bond between atoms of different electronegativity is polar. Whether the <em>molecule</em> is polar depends on shape: the bond dipoles add as vectors. CO₂ and CCl₄ have polar bonds but cancel by symmetry; H₂O and NH₃ do not cancel. A molecule is non-polar if its shape is one of the symmetric geometries with identical outer atoms and no lone pairs on the centre (or lone pairs arranged symmetrically, as in XeF₄).</p>`
      },
      {
        title: 'Intermolecular forces',
        html: R`
<p>Forces between molecules are much weaker than bonds, but they decide melting points, boiling points, viscosity and solubility.</p>
<ul>
<li><strong>London dispersion forces</strong> act between all molecules, from fleeting dipoles. They grow with the number of electrons and the contact area, so boiling points rise along a homologous series and fall with branching.</li>
<li><strong>Dipole–dipole forces</strong> act between polar molecules.</li>
<li><strong>Hydrogen bonds</strong> form when H bonded to N, O or F is attracted to a lone pair on another N, O or F. They are the strongest intermolecular force, about 10–40 kJ/mol.</li>
</ul>
<p>Hydrogen bonding explains water's anomalously high boiling point (compare H₂S at −60 °C), ice floating, the double helix of DNA and the shape of proteins. "Like dissolves like": polar solvents dissolve polar and ionic solutes; non-polar solvents dissolve non-polar ones.</p>
<div class="insight"><p>Trouton's rule: for many liquids without hydrogen bonding, $\Delta S_{\text{vap}} = \Delta H_{\text{vap}}/T_b \approx 85$–$88\ \mathrm{J\,mol^{-1}K^{-1}}$. Liquids that break the rule (water at 109) have extra order, usually from hydrogen bonds.</p></div>`
      }
    ],
    labs: [
      { sim: 'vsepr', title: 'Molecular shapes in 3D', desc: 'Rotating VSEPR models. Teal spheres are atoms; orange lobes are lone pairs.',
        tasks: ['Compare CH₄, NH₃ and H₂O. Where are the lone pairs, and what happens to the bond angle?', 'Why are the lone pairs of SF₄ and ClF₃ equatorial?', 'XeF₂ and XeF₄ both have lone pairs. Why are they non-polar?'] }
    ],
    formulas: [
      ['Tetrahedral angle', R`\arccos(-1/3) = 109.47^\circ`],
      ['Electron domains', R`\text{bonded atoms} + \text{lone pairs}`],
      ['Bond dipole sum', R`\vec\mu = \sum\vec\mu_i`],
      ['Trouton’s rule', R`\Delta H_{\text{vap}} \approx 88\ \mathrm{J\,mol^{-1}K^{-1}} \times T_b`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Shape of ammonia', q: R`<p>What is the molecular shape of NH₃?</p>`, options: ['Trigonal planar', 'Trigonal pyramidal', 'Tetrahedral', 'T-shaped'], answer: 1, hints: [R`Four domains, one of them a lone pair.`], solution: R`<p>The electron geometry is tetrahedral; with one lone pair, the atoms form a pyramid.</p>` },
      { level: 'concept', type: 'mcq', title: 'Non-polar molecule', q: R`<p>Which molecule is non-polar?</p>`, options: ['H₂O', 'NH₃', 'CHCl₃', 'CO₂'], answer: 3, hints: [R`Look for symmetric shapes where bond dipoles cancel.`], solution: R`<p>CO₂ is linear; its two C=O dipoles cancel.</p>` },
      { level: 'concept', type: 'mcq', title: 'Highest boiling point', q: R`<p>Which has the highest boiling point?</p>`, options: ['H₂O', 'H₂S', 'H₂Se', 'CH₄'], answer: 0, hints: [R`Which forms hydrogen bonds?`], solution: R`<p>Water's hydrogen bonds raise its boiling point to 100 °C, far above H₂S (−60 °C) and H₂Se (−41 °C).</p>` },
      { level: 'core', type: 'num', title: 'Xenon’s lone pairs', q: R`<p>How many lone pairs are on the xenon atom in XeF₄?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`Xe has 8 valence electrons; 4 are used in bonds.`], solution: R`<p>8 − 4 = 4 electrons = 2 lone pairs, giving 6 domains and a square planar shape.</p>` },
      { level: 'core', type: 'num', title: 'Pi bonds in ethyne', q: R`<p>How many π bonds are in ethyne, HC≡CH?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`A triple bond is one σ and two π.`], solution: R`<p>Two π bonds, from the two unhybridised p orbitals on each sp carbon.</p>` },
      { level: 'core', type: 'num', title: 'Sigma bonds in ethene', q: R`<p>How many σ bonds are in ethene, H₂C=CH₂?</p>`, answer: 5, tol: 0.001, unit: '', hints: [R`Four C–H plus the σ part of C=C.`], solution: R`<p>4 C–H σ bonds + 1 C–C σ bond = 5 (plus one π bond).</p>` },
      { level: 'core', type: 'num', title: 'Domains in SF₄', q: R`<p>How many electron domains surround sulfur in SF₄?</p>`, answer: 5, tol: 0.001, unit: '', hints: [R`Four bonds and one lone pair.`], solution: R`<p>5 domains: trigonal bipyramidal electron geometry, see-saw shape.</p>` },
      { level: 'core', type: 'num', title: 'The tetrahedral angle', q: R`<p>The angle between bonds to two vertices of a regular tetrahedron from its centre is $\arccos(-1/3)$. Evaluate it in degrees.</p>`, answer: Math.acos(-1 / 3) * 180 / Math.PI, tol: 0.001, unit: 'degrees', hints: [R`Use a calculator.`], solution: R`<p>$109.47^\circ$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Dipole of water', q: R`<p>Each O–H bond in water has a dipole moment of 1.50 D, and the H–O–H angle is 104.5°. Find the molecular dipole moment.</p>`, answer: 2 * 1.5 * Math.cos(52.25 * Math.PI / 180), tol: 0.01, unit: 'D', hints: [R`Add the two bond vectors; the result lies along the bisector.`], solution: R`<p>$\mu = 2(1.50)\cos52.25^\circ = 1.84\ \mathrm D$, matching the measured 1.85 D.</p>` },
      { level: 'olympiad', type: 'num', title: 'Lone pairs in ClF₃', q: R`<p>How many lone pairs are there in total in a ClF₃ molecule, counting every atom?</p>`, answer: 11, tol: 0.001, unit: '', hints: [R`Cl has 2 lone pairs; each F has 3.`], solution: R`<p>$2 + 3\times3 = 11$. (28 valence electrons: 3 bonding pairs and 11 lone pairs.)</p>` },
      { level: 'olympiad', type: 'num', title: 'Trouton’s rule', q: R`<p>Benzene boils at 353 K. Use Trouton's rule ($\Delta S_{\text{vap}} \approx 88\ \mathrm{J\,mol^{-1}K^{-1}}$) to estimate its enthalpy of vaporisation in kJ/mol.</p>`, answer: 88 * 353 / 1000, tol: 0.02, unit: 'kJ/mol', hints: [R`$\Delta H = T\Delta S$.`], solution: R`<p>$88 \times 353 = 31.1\ \mathrm{kJ/mol}$ (measured: 30.8).</p>` }
    ]
  });
  PB.addDrills('chem-shapes', [
    { title: 'Name the shape', gen(r) { const c = r.pick([['CH₄', 'tetrahedral', 109.5], ['BF₃', 'trigonal planar', 120], ['CO₂', 'linear', 180], ['SF₆', 'octahedral', 90], ['BeCl₂', 'linear', 180], ['CCl₄', 'tetrahedral', 109.5], ['XeF₄', 'square planar', 90], ['PF₅ (axial–equatorial)', 'trigonal bipyramidal', 90], ['SO₃', 'trigonal planar', 120]]); return { q: R`<p>${c[0]} is ${c[1]}. What is its ideal bond angle (degrees)?</p>`, answer: c[2], tol: 0.005, unit: '°', solution: R`<p>${c[2]}°.</p>` }; } },
    { title: 'Counting σ and π', gen(r) { const c = r.pick([['ethane C₂H₆', 7, 0], ['ethene C₂H₄', 5, 1], ['ethyne C₂H₂', 3, 2], ['CO₂', 2, 2], ['HCN', 2, 2], ['methanal H₂CO', 3, 1], ['propene CH₂=CHCH₃', 8, 1], ['N₂', 1, 2]]), pi = r.pick([true, false]); return { q: R`<p>How many ${pi ? 'π' : 'σ'} bonds are in ${c[0]}?</p>`, answer: pi ? c[2] : c[1], tol: 0.001, unit: '', solution: R`<p>${c[1]} σ and ${c[2]} π bonds.</p>` }; } },
    { title: 'Lone pairs on the centre', gen(r) { const c = r.pick([['NH₃', 1], ['H₂O', 2], ['XeF₂', 3], ['SF₄', 1], ['ClF₃', 2], ['BrF₅', 1], ['XeF₄', 2], ['CH₄', 0], ['PCl₃', 1], ['I₃⁻ (central I)', 3]]); return { q: R`<p>How many lone pairs are on the central atom of ${c[0]}?</p>`, answer: c[1], tol: 0.001, unit: '', solution: R`<p>${c[1]}.</p>` }; } }
  ]);
})();
