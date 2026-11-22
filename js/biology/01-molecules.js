(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-molecules', subject: 'biology', num: 1, part: 'Cells and Molecules',
    title: 'The Molecules of Life',
    subtitle: R`Water, carbohydrates, lipids, proteins and nucleic acids: the handful of building blocks every organism is made from, and the chemistry that joins them.`,
    goals: ['Explain the properties of water from hydrogen bonding', 'Describe condensation and hydrolysis', 'Compare the structures of carbohydrates, lipids, proteins and nucleic acids', 'Describe the four levels of protein structure', 'Work out the charge on an amino acid at a given pH'],
    sections: [
      {
        title: 'Water',
        html: R`
<p>Cells are about 70% water. A water molecule is bent and polar: oxygen pulls electrons away from the hydrogens, so the oxygen end is slightly negative and the hydrogen ends slightly positive. Neighbouring molecules attract through <strong>hydrogen bonds</strong>, and almost every biologically useful property of water follows from them.</p>
<ul>
<li><strong>High specific heat capacity</strong> (4.18 J g⁻¹ K⁻¹): bodies of water and organisms resist rapid temperature change.</li>
<li><strong>High latent heat of vaporisation</strong> (about 2.4 kJ/g at body temperature): sweating and transpiration remove a lot of heat for little water lost.</li>
<li><strong>Cohesion and surface tension</strong>: water columns hold together in xylem; pond skaters stand on the surface.</li>
<li><strong>Solvent</strong>: ions and polar molecules dissolve, so water is the medium for reactions and transport.</li>
<li><strong>Ice is less dense than liquid water</strong>: lakes freeze from the top and life survives underneath.</li>
</ul>
<div class="key"><strong>Key idea.</strong> Hydrophilic ("water-loving") substances are polar or charged and dissolve; hydrophobic ones are non-polar and are pushed together by water. This hydrophobic effect folds proteins and builds membranes.</div>`
      },
      {
        title: 'Monomers, polymers and carbohydrates',
        html: R`
<p>Large biological molecules are polymers built from small monomers. Joining two monomers releases water, a <strong>condensation</strong> reaction; splitting them uses water, <strong>hydrolysis</strong>. Joining $n$ monomers into a chain releases $n-1$ water molecules.</p>
<p><strong>Carbohydrates</strong> have the general formula $(\mathrm{CH_2O})_n$. Glucose, C₆H₁₂O₆, exists as α and β ring forms that differ only in the position of the –OH on carbon 1, and the difference matters enormously:</p>
<div class="table-wrap"><table><thead><tr><th>Polysaccharide</th><th>Monomer and bond</th><th>Shape</th><th>Role</th></tr></thead><tbody>
<tr><td>Amylose (starch)</td><td>α-glucose, 1,4</td><td>helix</td><td>compact energy store in plants</td></tr>
<tr><td>Amylopectin, glycogen</td><td>α-glucose, 1,4 and 1,6 branches</td><td>branched</td><td>many ends for fast release; glycogen in animals</td></tr>
<tr><td>Cellulose</td><td>β-glucose, 1,4, alternate units flipped</td><td>straight chains, H-bonded into microfibrils</td><td>plant cell walls, high tensile strength</td></tr>
</tbody></table></div>
<p>Disaccharides form from two monosaccharides: maltose (glucose + glucose), sucrose (glucose + fructose), lactose (glucose + galactose).</p>`
      },
      {
        title: 'Lipids',
        html: R`
<p>Lipids are defined by being insoluble in water rather than by one structure.</p>
<ul>
<li><strong>Triglycerides</strong>: glycerol joined to three fatty acids by <strong>ester bonds</strong> (three condensations). Saturated fatty acids have no C=C and pack tightly (solid fats); unsaturated ones have kinks and stay liquid (oils). Per gram, lipids store about twice the energy of carbohydrate, about 38 kJ/g against 17 kJ/g, because they are less oxidised.</li>
<li><strong>Phospholipids</strong>: one fatty acid is replaced by a phosphate group, giving a hydrophilic head and two hydrophobic tails. In water they form bilayers spontaneously: the basis of every membrane.</li>
<li><strong>Steroids</strong> such as cholesterol have four fused rings; cholesterol regulates membrane fluidity and is the starting point for steroid hormones.</li>
</ul>`
      },
      {
        title: 'Proteins',
        html: R`
<p>Proteins are chains of <strong>amino acids</strong> joined by <strong>peptide bonds</strong>. Each amino acid has an amino group, a carboxyl group and a side chain R; there are 20 different R groups, which may be non-polar, polar, acidic or basic.</p>
<ol>
<li><strong>Primary structure</strong>: the sequence of amino acids, set by the gene.</li>
<li><strong>Secondary structure</strong>: α-helices and β-pleated sheets held by hydrogen bonds between backbone C=O and N–H groups.</li>
<li><strong>Tertiary structure</strong>: the overall 3D fold, stabilised by hydrophobic interactions, hydrogen bonds, ionic bonds and disulfide bridges between R groups.</li>
<li><strong>Quaternary structure</strong>: several chains together, as in the four subunits of haemoglobin.</li>
</ol>
<p>Shape is function, so anything that disrupts the bonds (heat, extreme pH) <strong>denatures</strong> the protein. A protein of $n$ residues has about $n \times 110$ Da of mass, a handy rule: 110 Da is the average residue mass.</p>
<p>Amino acids are <strong>zwitterions</strong> in solution: at neutral pH the amino group is –NH₃⁺ and the carboxyl –COO⁻. The pH at which the net charge is zero is the <strong>isoelectric point</strong>, $\mathrm{pI} = \tfrac12(\mathrm{p}K_{a1} + \mathrm{p}K_{a2})$ for an amino acid with a neutral side chain. The lab plots the forms of glycine against pH.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Glycine has pKa values 2.34 and 9.60. What is its isoelectric point?<span class="tog">Solution</span></summary><div class="sol"><p>$\mathrm{pI} = (2.34 + 9.60)/2 = 5.97$. Below this pH glycine carries a net positive charge and moves to the cathode in electrophoresis; above it, the anode.</p></div></details>`
      },
      {
        title: 'Nucleic acids and ATP',
        html: R`
<p><strong>Nucleotides</strong> contain a pentose sugar, a phosphate and a nitrogenous base. They join by <strong>phosphodiester bonds</strong> into a sugar–phosphate backbone. DNA uses deoxyribose and the bases A, T, G, C; RNA uses ribose and U instead of T. Chapter 8 covers DNA structure in detail.</p>
<p><strong>ATP</strong>, adenosine triphosphate, is a nucleotide with three phosphates. Hydrolysis to ADP and phosphate releases about 30.5 kJ/mol under standard conditions, more inside the cell. ATP is the cell's energy currency: made in respiration and photosynthesis and spent on muscle contraction, active transport and synthesis.</p>
<div class="insight"><strong>Testing for molecules.</strong> Benedict's reagent turns brick-red with reducing sugars; iodine turns blue-black with starch; biuret turns lilac with peptide bonds; the emulsion test (ethanol, then water) goes cloudy with lipids.</div>`
      }
    ],
    labs: [
      { sim: 'speciation', params: { acid: 'glycine' }, title: 'Charge on an amino acid', desc: 'Glycine exists as a cation, a zwitterion and an anion. Change the pH to see which form dominates. The same chemistry sets the charge on every protein.',
        tasks: ['Find the pH where the zwitterion fraction is highest. Compare it with (2.34 + 9.60)/2.', 'At pH 7.4 (blood), which form dominates, and what is the net charge?', 'At what pH are the cation and the zwitterion present in equal amounts?'] }
    ],
    formulas: [
      ['Water released forming a polymer', R`n - 1`],
      ['Glucose', R`\mathrm{C_6H_{12}O_6}`],
      ['Isoelectric point (neutral R)', R`\mathrm{pI} = \tfrac12(\mathrm{p}K_{a1} + \mathrm{p}K_{a2})`],
      ['Protein mass estimate', R`M \approx 110\,n \ \text{Da}`],
      ['ATP hydrolysis', R`\Delta G^{\circ\prime} \approx -30.5\ \text{kJ/mol}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Bond in starch', q: R`<p>Which bond joins the glucose units in amylose?</p>`, options: ['Peptide bond', 'α-1,4-glycosidic bond', 'Ester bond', 'Phosphodiester bond'], answer: 1, hints: [R`Amylose is a chain of α-glucose.`], solution: R`<p>α-1,4-glycosidic bonds. Amylopectin and glycogen also have α-1,6 branches.</p>` },
      { level: 'concept', type: 'mcq', title: 'Why ice floats', q: R`<p>Why is ice less dense than liquid water?</p>`, options: ['Ice contains trapped air', 'Hydrogen bonds hold the molecules in an open lattice', 'Covalent bonds lengthen when water freezes', 'Ice molecules are lighter'], answer: 1, hints: [R`Think about the arrangement, not the molecules themselves.`], solution: R`<p>Each molecule hydrogen-bonds to four neighbours in a tetrahedral lattice with more empty space than the liquid.</p>` },
      { level: 'concept', type: 'mcq', title: 'Denaturation', q: R`<p>Heating a protein to 80 °C denatures it. Which level of structure is <em>not</em> changed?</p>`, options: ['Primary', 'Secondary', 'Tertiary', 'Quaternary'], answer: 0, hints: [R`Heat breaks weak bonds, not peptide bonds.`], solution: R`<p>The peptide bonds, and so the primary sequence, survive; hydrogen and ionic bonds holding the higher levels break.</p>` },
      { level: 'core', type: 'num', title: 'Water from a polymer', q: R`<p>How many water molecules are released when 500 glucose molecules join into one unbranched amylose chain?</p>`, answer: 499, tol: 0.0001, unit: '', hints: [R`One per bond.`], solution: R`<p>A chain of 500 has 499 glycosidic bonds, so 499 waters.</p>` },
      { level: 'core', type: 'num', title: 'Mass of a disaccharide', q: R`<p>Glucose has a molar mass of 180 g/mol. What is the molar mass of maltose?</p>`, answer: 342, tol: 0.003, unit: 'g/mol', hints: [R`Two glucoses minus one water.`], solution: R`<p>$2(180) - 18 = 342$ g/mol.</p>` },
      { level: 'core', type: 'num', title: 'Size of a protein', q: R`<p>A protein has a mass of 55 kDa. Using 110 Da per residue, about how many amino acids does it contain?</p>`, answer: 500, tol: 0.02, unit: '', hints: [R`Divide.`], solution: R`<p>$55\,000/110 = 500$ residues.</p>` },
      { level: 'core', type: 'num', title: 'Isoelectric point', q: R`<p>Alanine has pKa values 2.34 and 9.69. What is its isoelectric point?</p>`, answer: 6.015, tol: 0.005, unit: '', hints: [R`Average of the two.`], solution: R`<p>$(2.34 + 9.69)/2 = 6.02$.</p>` },
      { level: 'core', type: 'num', title: 'Cooling by sweat', q: R`<p>A runner evaporates 1.2 kg of sweat. With a latent heat of 2.4 kJ/g, how much heat is removed, in kJ?</p>`, answer: 2880, tol: 0.01, unit: 'kJ', hints: [R`1.2 kg = 1200 g.`], solution: R`<p>$1200 \times 2.4 = 2880$ kJ.</p>` },
      { level: 'olympiad', type: 'num', title: 'Triglyceride mass', q: R`<p>Glycerol (92 g/mol) condenses with three molecules of palmitic acid (256 g/mol). What is the molar mass of the triglyceride, in g/mol?</p>`, answer: 806, tol: 0.003, unit: 'g/mol', hints: [R`Three ester bonds, three waters lost.`], solution: R`<p>$92 + 3(256) - 3(18) = 806$ g/mol.</p>` },
      { level: 'olympiad', type: 'num', title: 'Peptide sequences', q: R`<p>How many different tripeptides can be made from the 20 standard amino acids, allowing repeats?</p>`, answer: 8000, tol: 0.0001, unit: '', hints: [R`20 choices at each of three positions.`], solution: R`<p>$20^3 = 8000$. Order matters: Gly-Ala and Ala-Gly are different peptides.</p>` },
      { level: 'olympiad', type: 'num', title: 'Net charge', q: R`<p>Glycine (pKa 2.34 and 9.60) is at pH 9.60. What is its average net charge, to 2 decimal places? Ignore the cation, which is negligible here.</p>`, answer: -0.5, tol: 0.02, unit: '', hints: [R`At pH = pKa₂ the zwitterion and the anion are equal.`], solution: R`<p>Half zwitterion (charge 0), half anion (charge −1): average −0.50.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-molecules', [
    { title: 'Polymer mass', gen(r) { const n = r.int(3, 40), M = r.pick([[180, 'glucose'], [89, 'alanine'], [75, 'glycine']]); const tot = n * M[0] - (n - 1) * 18; return { q: R`<p>${n} molecules of ${M[1]} (${M[0]} g/mol) are joined in a single unbranched chain by condensation. What is the molar mass of the chain?</p>`, answer: tot, tol: 0.002, unit: 'g/mol', solution: R`<p>$${n}\times${M[0]} - ${n - 1}\times18 = ${tot}$ g/mol.</p>` }; } },
    { title: 'Isoelectric point', gen(r) { const a = r.step(1.8, 2.6, 0.01), b = r.step(8.8, 10.6, 0.01); return { q: R`<p>An amino acid with a neutral side chain has pKa values ${a} and ${b}. What is its isoelectric point?</p>`, answer: (a + b) / 2, tol: 0.002, unit: '', solution: R`<p>$(${a} + ${b})/2 = ${f((a + b) / 2)}$.</p>` }; } },
    { title: 'Energy stores', gen(r) { const g = r.int(50, 900), kind = r.pick([['fat', 38], ['carbohydrate', 17], ['protein', 17]]); return { q: R`<p>How much energy, in kJ, is stored in ${g} g of ${kind[0]} at ${kind[1]} kJ/g?</p>`, answer: g * kind[1], tol: 0.002, unit: 'kJ', solution: R`<p>$${g}\times${kind[1]} = ${g * kind[1]}$ kJ.</p>` }; } }
  ]);
})();
