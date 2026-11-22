(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-cells', subject: 'biology', num: 2, part: 'Cells and Molecules',
    title: 'Cells and Microscopy',
    subtitle: R`The cell is the unit of life. Prokaryotes and eukaryotes, the organelles and what they do, how microscopes reveal them, and why cells stay small.`,
    goals: ['State the cell theory', 'Compare prokaryotic and eukaryotic cells', 'Link each organelle to its function', 'Use magnification and resolution correctly', 'Explain why surface area to volume ratio limits cell size'],
    sections: [
      {
        title: 'Cell theory and the two kinds of cell',
        html: R`
<p>The <strong>cell theory</strong>: all living things are made of one or more cells, the cell is the smallest unit of life, and cells arise only from existing cells.</p>
<div class="table-wrap"><table><thead><tr><th></th><th>Prokaryotes (bacteria, archaea)</th><th>Eukaryotes (protists, fungi, plants, animals)</th></tr></thead><tbody>
<tr><td>Size</td><td>about 1–5 μm</td><td>about 10–100 μm</td></tr>
<tr><td>DNA</td><td>circular, in a nucleoid; plasmids</td><td>linear chromosomes in a nucleus, with histones</td></tr>
<tr><td>Ribosomes</td><td>70S</td><td>80S in cytoplasm (70S in mitochondria and chloroplasts)</td></tr>
<tr><td>Membrane-bound organelles</td><td>none</td><td>nucleus, mitochondria, ER, Golgi, lysosomes…</td></tr>
<tr><td>Cell wall</td><td>peptidoglycan (bacteria)</td><td>cellulose (plants), chitin (fungi), none (animals)</td></tr>
</tbody></table></div>
<p><strong>Viruses</strong> are not cells: a protein coat around DNA or RNA, with no metabolism of their own. They reproduce only inside a host cell.</p>`
      },
      {
        title: 'Organelles',
        html: R`
<ul>
<li><strong>Nucleus</strong>: holds the chromosomes, surrounded by a double membrane with pores; the nucleolus makes ribosomal RNA.</li>
<li><strong>Rough endoplasmic reticulum</strong>: studded with ribosomes, makes and folds proteins for export or for membranes.</li>
<li><strong>Smooth ER</strong>: makes lipids and steroids, detoxifies, stores Ca²⁺ in muscle.</li>
<li><strong>Golgi apparatus</strong>: modifies, sorts and packages proteins into vesicles.</li>
<li><strong>Mitochondria</strong>: aerobic respiration; the inner membrane is folded into cristae.</li>
<li><strong>Chloroplasts</strong>: photosynthesis, with stacks of thylakoids (grana) in a stroma.</li>
<li><strong>Lysosomes</strong>: vesicles of digestive enzymes.</li>
<li><strong>Cytoskeleton</strong>: microtubules, actin filaments and intermediate filaments for shape, transport and division.</li>
<li><strong>Vacuole</strong>: in plants, a large sap-filled sac that keeps the cell turgid.</li>
</ul>
<div class="insight"><strong>Endosymbiosis.</strong> Mitochondria and chloroplasts have their own circular DNA, 70S ribosomes and double membranes, and divide by fission. They descend from bacteria engulfed by an ancestral eukaryote over 1.5 billion years ago.</div>`
      },
      {
        title: 'Microscopy',
        html: R`
<p><strong>Magnification</strong> is how much bigger the image is than the object; <strong>resolution</strong> is the smallest separation at which two points can still be told apart. Magnification without resolution only gives a bigger blur.</p>
$$M = \frac{\text{image size}}{\text{actual size}}$$
<p>Resolution is limited by the wavelength used, about $d \approx \lambda / 2$ at best. Light microscopes ($\lambda \approx 500$ nm) resolve about 200 nm, enough for cells and large organelles. Electron microscopes use electron wavelengths far below 1 nm and resolve down to about 0.1–1 nm: <strong>TEM</strong> passes electrons through thin sections (internal detail), <strong>SEM</strong> scans the surface (3D images). Specimens for electron microscopy must be dead and in a vacuum.</p>
<p>Units: $1\ \text{mm} = 1000\ \mu\text{m}$, $1\ \mu\text{m} = 1000\ \text{nm}$. Measure with an eyepiece graticule calibrated against a stage micrometer.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A mitochondrion is 2 μm long. In a micrograph it measures 40 mm. What is the magnification?<span class="tog">Solution</span></summary><div class="sol"><p>$40\ \text{mm} = 40\,000\ \mu\text{m}$, so $M = 40\,000/2 = 20\,000\times$.</p></div></details>`
      },
      {
        title: 'Why cells are small',
        html: R`
<p>A cell exchanges oxygen, nutrients and waste through its surface, but its needs scale with its volume. For a cube of side $L$:</p>
$$\frac{\text{SA}}{V} = \frac{6L^2}{L^3} = \frac{6}{L}, \qquad \frac{\text{SA}}{V}\Big|_{\text{sphere}} = \frac{3}{r}.$$
<p>Double the size and each unit of volume has half the surface to serve it. Diffusion is also slow over distance: the time to diffuse a distance $x$ scales as $t \sim x^2 / 2D$. For a small molecule in water ($D \approx 10^{-9}$ m²/s) 10 μm takes about 0.05 s, but 1 cm takes about 14 hours.</p>
<p>Large organisms therefore need flattened shapes, folded surfaces (villi, alveoli, root hairs) and mass transport systems (blood, xylem) instead of relying on diffusion.</p>
<div class="key"><strong>Key idea.</strong> Surface scales as $L^2$ and volume as $L^3$. This one scaling law explains cell size, the shape of leaves, why elephants have big ears and why mice must eat constantly.</div>`
      }
    ],
    labs: [
      { sim: 'savol', title: 'Diffusion into agar cubes', desc: 'The classic practical: cubes of pink agar are dropped into acid, which bleaches them as it diffuses inwards. Compare how much of each cube the acid reaches.',
        tasks: ['For a 10 mm cube with 2 mm diffusion depth, what percentage of the volume is reached?', 'Halve the cube to 5 mm. What happens to SA:V and to the percentage reached?', 'Find the largest cube that is completely reached in 10 minutes.'] }
    ],
    formulas: [
      ['Magnification', R`M = \dfrac{\text{image}}{\text{actual}}`],
      ['Resolution limit', R`d \approx \lambda/2`],
      ['SA : V of a cube', R`6/L`],
      ['SA : V of a sphere', R`3/r`],
      ['Diffusion time', R`t \approx x^2/2D`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Prokaryote feature', q: R`<p>Which structure is found in prokaryotic cells?</p>`, options: ['Nucleus', 'Mitochondria', '70S ribosomes', 'Golgi apparatus'], answer: 2, hints: [R`Prokaryotes have no membrane-bound organelles.`], solution: R`<p>70S ribosomes. The others are membrane-bound eukaryotic organelles.</p>` },
      { level: 'concept', type: 'mcq', title: 'Protein export', q: R`<p>A cell secretes large amounts of digestive enzyme. Which organelles would be most abundant?</p>`, options: ['Chloroplasts and vacuoles', 'Rough ER and Golgi apparatus', 'Smooth ER and lysosomes', 'Centrioles and cilia'], answer: 1, hints: [R`Proteins are made on the rough ER and packaged by the Golgi.`], solution: R`<p>Rough ER (synthesis) and Golgi (packaging into secretory vesicles), with many mitochondria to supply ATP.</p>` },
      { level: 'concept', type: 'mcq', title: 'Evidence for endosymbiosis', q: R`<p>Which observation supports the endosymbiotic origin of mitochondria?</p>`, options: ['They contain enzymes', 'They have their own circular DNA and 70S ribosomes', 'They are found in all cells', 'They produce ATP'], answer: 1, hints: [R`What do they share with bacteria?`], solution: R`<p>Circular DNA and 70S ribosomes are bacterial features.</p>` },
      { level: 'core', type: 'num', title: 'Magnification', q: R`<p>A cell 25 μm across appears 50 mm across in a photograph. What is the magnification?</p>`, answer: 2000, tol: 0.002, unit: '×', hints: [R`Convert to the same units.`], solution: R`<p>$50\,000/25 = 2000\times$.</p>` },
      { level: 'core', type: 'num', title: 'Actual size', q: R`<p>A chloroplast is 12 mm long in an electron micrograph at ×3000. What is its actual length, in μm?</p>`, answer: 4, tol: 0.002, unit: 'μm', hints: [R`Actual = image / M.`], solution: R`<p>$12\,000\ \mu\text{m}/3000 = 4\ \mu$m.</p>` },
      { level: 'core', type: 'num', title: 'SA:V of a cell', q: R`<p>What is the surface-area-to-volume ratio of a spherical cell of radius 5 μm, in μm⁻¹?</p>`, answer: 0.6, tol: 0.002, unit: 'μm⁻¹', hints: [R`$3/r$.`], solution: R`<p>$3/5 = 0.6\ \mu\text{m}^{-1}$.</p>` },
      { level: 'core', type: 'num', title: 'Graticule', q: R`<p>At one magnification, 40 eyepiece divisions line up with 100 μm on the stage micrometer. A cell spans 14 divisions. How long is it, in μm?</p>`, answer: 35, tol: 0.002, unit: 'μm', hints: [R`Each division is 2.5 μm.`], solution: R`<p>$14\times2.5 = 35\ \mu$m.</p>` },
      { level: 'core', type: 'num', title: 'Light resolution', q: R`<p>Using $d = \lambda/2$, what is the resolution of a microscope using blue light of 450 nm, in nm?</p>`, answer: 225, tol: 0.002, unit: 'nm', hints: [R`Halve the wavelength.`], solution: R`<p>225 nm, so ribosomes (about 25 nm) are invisible.</p>` },
      { level: 'olympiad', type: 'num', title: 'Diffusion time', q: R`<p>Oxygen diffuses in tissue with $D = 2\times10^{-9}$ m²/s. Using $t = x^2/2D$, how long does it take to diffuse 1 mm, in seconds?</p>`, answer: 250, tol: 0.005, unit: 's', hints: [R`$x = 10^{-3}$ m.`], solution: R`<p>$10^{-6}/(4\times10^{-9}) = 250$ s, which is why no cell in a large animal is more than about 0.1 mm from a capillary.</p>` },
      { level: 'olympiad', type: 'num', title: 'Splitting a cube', q: R`<p>A 1 cm cube of tissue is cut into cubes of side 1 mm. By what factor does the total surface area increase?</p>`, answer: 10, tol: 0.002, unit: '×', hints: [R`SA:V scales as 1/L at fixed total volume.`], solution: R`<p>1000 cubes × 6 mm² = 6000 mm², against 600 mm²: a factor of 10.</p>` },
      { level: 'olympiad', type: 'num', title: 'Bacterial count', q: R`<p>A bacterium is a cylinder 2 μm long and 1 μm in diameter. Roughly how many fit in a volume of 1 mm³? Give your answer in units of 10⁸.</p>`, answer: 6.37, tol: 0.02, unit: '×10⁸', hints: [R`$V = \pi r^2 L$; 1 mm³ = 10⁹ μm³.`], solution: R`<p>$V = \pi(0.5)^2(2) = 1.571\ \mu\text{m}^3$; $10^9/1.571 = 6.4\times10^8$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-cells', [
    { title: 'Magnification', gen(r) { const act = r.int(2, 80), M = r.pick([400, 1000, 1500, 2000, 5000, 10000]); const img = act * M / 1000; return { q: R`<p>An object ${act} μm long appears ${f(img)} mm long in a micrograph. What is the magnification?</p>`, answer: M, tol: 0.005, unit: '×', solution: R`<p>$${f(img * 1000)}\ \mu\text{m}/${act}\ \mu\text{m} = ${M}\times$.</p>` }; } },
    { title: 'Actual size', gen(r) { const img = r.int(10, 120), M = r.pick([500, 2000, 8000, 20000, 50000]); return { q: R`<p>An organelle measures ${img} mm in an image at ×${M}. What is its actual size, in μm?</p>`, answer: img * 1000 / M, tol: 0.005, unit: 'μm', solution: R`<p>$${img * 1000}/${M} = ${f(img * 1000 / M)}\ \mu$m.</p>` }; } },
    { title: 'SA : V', gen(r) { const L = r.int(1, 30), shape = r.pick(['cube of side', 'sphere of radius']); const v = shape[0] === 'c' ? 6 / L : 3 / L; return { q: R`<p>What is the surface area to volume ratio of a ${shape} ${L} μm, in μm⁻¹?</p>`, answer: v, tol: 0.005, unit: 'μm⁻¹', solution: R`<p>${shape[0] === 'c' ? '$6/L$' : '$3/r$'} $= ${f(v)}$.</p>` }; } }
  ]);
})();
