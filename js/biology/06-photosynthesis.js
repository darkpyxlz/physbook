(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-photosynthesis', subject: 'biology', num: 6, part: 'Cells and Molecules',
    title: 'Photosynthesis',
    subtitle: R`How light becomes sugar. Pigments and absorption, the light-dependent reactions, the Calvin cycle, limiting factors, and the C₄ and CAM adaptations to heat and drought.`,
    goals: ['Explain absorption and action spectra', 'Describe the light-dependent reactions and photophosphorylation', 'Outline the Calvin cycle and its ATP and NADPH costs', 'Apply the idea of limiting factors', 'Explain photorespiration and the C₄ and CAM solutions'],
    sections: [
      {
        title: 'Light and pigments',
        html: R`
$$\mathrm{6CO_2 + 6H_2O \xrightarrow{\text{light}} C_6H_{12}O_6 + 6O_2}$$
<p>Chloroplast pigments absorb visible light. <strong>Chlorophyll a</strong> and <strong>b</strong> absorb blue (about 430–450 nm) and red (about 640–680 nm) strongly and reflect green, so leaves look green; <strong>carotenoids</strong> absorb blue-green and protect against excess light. An <strong>absorption spectrum</strong> shows how strongly each wavelength is absorbed; an <strong>action spectrum</strong> shows how much photosynthesis each wavelength drives. Their close match shows the pigments drive photosynthesis.</p>
<p>A photon's energy is $E = hc/\lambda$: a 680 nm photon carries $2.9\times10^{-19}$ J, or 176 kJ per mole of photons. Pigments are arranged in <strong>photosystems</strong>: antenna complexes funnel energy to a reaction-centre chlorophyll (P680 in photosystem II, P700 in photosystem I).</p>
<p>Pigments can be separated by <strong>chromatography</strong>; each has a characteristic $R_f = \dfrac{\text{distance moved by spot}}{\text{distance moved by solvent}}$.</p>`
      },
      {
        title: 'The light-dependent reactions',
        html: R`
<p>On the <strong>thylakoid membranes</strong>:</p>
<ol>
<li>Light excites electrons in photosystem II. They are replaced by splitting water (<strong>photolysis</strong>): $\mathrm{2H_2O \to 4H^+ + 4e^- + O_2}$. All the oxygen released by plants comes from water, as shown with ¹⁸O labelling.</li>
<li>The excited electrons pass down an electron transport chain, which pumps H⁺ into the thylakoid space.</li>
<li>Photosystem I re-excites them, and they reduce NADP⁺ to <strong>NADPH</strong>.</li>
<li>H⁺ flows back out through ATP synthase: <strong>photophosphorylation</strong>, chemiosmosis again.</li>
</ol>
<p>This linear "Z-scheme" makes ATP, NADPH and O₂. <strong>Cyclic photophosphorylation</strong> sends electrons from PSI back to the chain, making extra ATP but no NADPH or O₂.</p>`
      },
      {
        title: 'The Calvin cycle',
        html: R`
<p>In the <strong>stroma</strong>, the light-independent reactions fix CO₂:</p>
<ol>
<li><strong>Fixation</strong>: the enzyme <strong>rubisco</strong> joins CO₂ to ribulose bisphosphate (RuBP, 5C), giving two molecules of glycerate 3-phosphate (GP, 3C).</li>
<li><strong>Reduction</strong>: ATP and NADPH reduce GP to triose phosphate (TP, 3C).</li>
<li><strong>Regeneration</strong>: five of every six TP are rearranged, using more ATP, to regenerate RuBP. The sixth leaves to make glucose, sucrose, starch, lipids and amino acids.</li>
</ol>
<p>Fixing one CO₂ costs 3 ATP and 2 NADPH, so one glucose costs 18 ATP and 12 NADPH. Rubisco is slow (about 3 reactions per second) and is probably the most abundant protein on Earth.</p>
<div class="insight"><strong>Darkness experiment.</strong> Switch off the light and GP accumulates while RuBP falls: fixation continues briefly but reduction stops without ATP and NADPH. Cut the CO₂ instead and RuBP piles up while GP falls.</div>`
      },
      {
        title: 'Limiting factors',
        html: R`
<p>The rate of photosynthesis is set by whichever factor is in shortest supply (Blackman's principle): light intensity, CO₂ concentration or temperature. Increasing a factor that is not limiting has no effect.</p>
<ul>
<li>At low light, rate rises with intensity. The <strong>compensation point</strong> is the intensity where photosynthesis just balances respiration and net gas exchange is zero.</li>
<li>At high light, CO₂ limits; commercial greenhouses raise CO₂ to about 1000 ppm.</li>
<li>Temperature affects the enzyme-driven Calvin cycle but hardly the photochemical steps.</li>
</ul>
<p>Light intensity from a small lamp falls with distance as $I \propto 1/d^2$, which is used in pondweed practicals.</p>`
      },
      {
        title: 'Photorespiration, C₄ and CAM',
        html: R`
<p>Rubisco also reacts with O₂, wasting energy and releasing CO₂: <strong>photorespiration</strong>. It gets worse in hot, dry conditions when stomata close and O₂ builds up inside the leaf.</p>
<ul>
<li><strong>C₄ plants</strong> (maize, sugarcane) fix CO₂ first with PEP carboxylase, which ignores O₂, into a 4C acid in mesophyll cells, then release it around rubisco in bundle-sheath cells. Spatial separation keeps CO₂ high around rubisco.</li>
<li><strong>CAM plants</strong> (cacti, pineapple) open stomata only at night, store CO₂ as malic acid, and release it to the Calvin cycle by day with stomata closed: separation in time, saving water.</li>
</ul>`
      }
    ],
    labs: [
      { sim: 'photosynth', title: 'Limiting factors', desc: 'Net CO₂ uptake against light intensity for a C₃ leaf. The dashed curves show the same leaf with more CO₂ or at a lower temperature.',
        tasks: ['At low light, does adding CO₂ help? Explain using the curves.', 'Find the light compensation point. How does it change at 15 °C?', 'At 2000 μmol m⁻² s⁻¹, which factor limits the rate? What would you raise first?'] }
    ],
    formulas: [
      ['Photosynthesis', R`\mathrm{6CO_2 + 6H_2O \to C_6H_{12}O_6 + 6O_2}`],
      ['Photon energy', R`E = hc/\lambda`],
      ['Calvin cycle cost per CO₂', R`3\,\text{ATP} + 2\,\text{NADPH}`],
      ['Rf value', R`R_f = d_{\text{spot}}/d_{\text{solvent}}`],
      ['Lamp intensity', R`I \propto 1/d^2`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Source of oxygen', q: R`<p>Where does the O₂ released in photosynthesis come from?</p>`, options: ['CO₂', 'Water', 'Glucose', 'RuBP'], answer: 1, hints: [R`Photolysis.`], solution: R`<p>Water, split at photosystem II.</p>` },
      { level: 'concept', type: 'mcq', title: 'Light switched off', q: R`<p>A plant is moved from light into darkness. What happens immediately in the Calvin cycle?</p>`, options: ['GP falls and RuBP rises', 'GP rises and RuBP falls', 'Both rise', 'Both stay constant'], answer: 1, hints: [R`Reduction of GP needs ATP and NADPH.`], solution: R`<p>GP accumulates (still made, no longer reduced) and RuBP is used up without regeneration.</p>` },
      { level: 'concept', type: 'mcq', title: 'C₄ advantage', q: R`<p>Why do C₄ plants grow well in hot, bright conditions?</p>`, options: ['They do not need light', 'They concentrate CO₂ around rubisco, reducing photorespiration', 'They have no stomata', 'They use a different rubisco that binds O₂'], answer: 1, hints: [R`PEP carboxylase and bundle sheath.`], solution: R`<p>CO₂ concentration around rubisco suppresses its oxygenase reaction.</p>` },
      { level: 'core', type: 'num', title: 'Rf value', q: R`<p>A pigment spot moves 3.4 cm while the solvent front moves 8.0 cm. What is its Rf?</p>`, answer: 0.425, tol: 0.005, unit: '', hints: [R`Divide.`], solution: R`<p>0.425.</p>` },
      { level: 'core', type: 'num', title: 'ATP for glucose', q: R`<p>How many ATP does the Calvin cycle use to make one glucose?</p>`, answer: 18, tol: 0.001, unit: '', hints: [R`3 per CO₂, 6 CO₂.`], solution: R`<p>18 ATP (and 12 NADPH).</p>` },
      { level: 'core', type: 'num', title: 'Turns for sucrose', q: R`<p>How many turns of the Calvin cycle (one CO₂ fixed per turn) are needed to make one sucrose, C₁₂H₂₂O₁₁?</p>`, answer: 12, tol: 0.001, unit: '', hints: [R`Count the carbons.`], solution: R`<p>12.</p>` },
      { level: 'core', type: 'num', title: 'Photon energy', q: R`<p>Find the energy of one mole of 680 nm photons, in kJ ($h = 6.63\times10^{-34}$ J s, $c = 3.00\times10^8$ m/s, $N_A = 6.02\times10^{23}$).</p>`, answer: 176, tol: 0.01, unit: 'kJ', hints: [R`$N_A hc/\lambda$.`], solution: R`<p>$2.92\times10^{-19}\times6.02\times10^{23} = 176$ kJ.</p>` },
      { level: 'core', type: 'num', title: 'Moving the lamp', q: R`<p>A lamp is moved from 10 cm to 25 cm from some pondweed. By what factor does the light intensity fall?</p>`, answer: 6.25, tol: 0.003, unit: '×', hints: [R`Inverse square.`], solution: R`<p>$(25/10)^2 = 6.25$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Quantum efficiency', q: R`<p>About 8 photons are absorbed per O₂ released. The Calvin cycle stores about 480 kJ per mole of CO₂ fixed. With 680 nm light (176 kJ/mol of photons), what percentage of the absorbed light energy is stored?</p>`, answer: 34.1, tol: 0.02, unit: '%', hints: [R`One O₂ per CO₂ fixed.`], solution: R`<p>$480/(8\times176) = 34\%$. Real field efficiency is 1–2% after losses to wavelengths not absorbed, reflection, photorespiration and saturation.</p>` },
      { level: 'olympiad', type: 'num', title: 'Carbon fixed', q: R`<p>A leaf of 50 cm² has a net uptake of 15 μmol CO₂ m⁻² s⁻¹. How many milligrams of glucose does it make in a 12-hour day?</p>`, answer: 97.2, tol: 0.01, unit: 'mg', hints: [R`Moles of CO₂, then divide by 6, then × 180 g/mol.`], solution: R`<p>$15\times10^{-6}\times0.005\times43\,200 = 3.24\times10^{-3}$ mol CO₂ → $5.4\times10^{-4}$ mol glucose → 97 mg.</p>` },
      { level: 'olympiad', type: 'num', title: 'Cyclic ATP', q: R`<p>Linear electron flow makes about 1.3 ATP per NADPH. The Calvin cycle needs 1.5 ATP per NADPH. What fraction of the cycle's ATP must come from cyclic photophosphorylation, in %?</p>`, answer: 13.3, tol: 0.03, unit: '%', hints: [R`The shortfall is 0.2 per NADPH.`], solution: R`<p>$0.2/1.5 = 13\%$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-photosynthesis', [
    { title: 'Rf values', gen(r) { const s = r.step(5, 12, 0.1), d = r.step(0.5, s - 0.3, 0.1); return { q: R`<p>The solvent front moves ${f(s)} cm and a pigment ${f(d)} cm. Find its Rf.</p>`, answer: d / s, tol: 0.01, unit: '', solution: R`<p>$${f(d)}/${f(s)} = ${f(d / s)}$.</p>` }; } },
    { title: 'Inverse square lamp', gen(r) { const d1 = r.int(5, 30), d2 = r.int(5, 60); return { q: R`<p>A lamp is moved from ${d1} cm to ${d2} cm. What is the new intensity as a fraction of the old?</p>`, answer: (d1 * d1) / (d2 * d2), tol: 0.01, unit: '', solution: R`<p>$(${d1}/${d2})^2 = ${f((d1 * d1) / (d2 * d2))}$.</p>` }; } },
    { title: 'Calvin cycle costs', gen(r) { const C = r.pick([[3, 'a triose phosphate'], [6, 'a glucose'], [12, 'a sucrose'], [5, 'a ribose']]), what = r.pick(['ATP', 'NADPH']); const n = C[0] * (what === 'ATP' ? 3 : 2); return { q: R`<p>How many ${what} does the Calvin cycle consume to make ${C[1]} (${C[0]} carbons)?</p>`, answer: n, tol: 0, atol: 0.01, unit: '', solution: R`<p>${what === 'ATP' ? 3 : 2} per CO₂ × ${C[0]} = ${n}.</p>` }; } }
  ]);
})();
