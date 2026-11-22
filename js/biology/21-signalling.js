(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  PB.addChapter({
    id: 'bio-signalling', subject: 'biology', num: 21, part: 'Cells and Molecules',
    title: 'Cell Communication',
    subtitle: R`How cells talk. Signal types, receptors at the surface and inside the cell, second messengers and amplifying cascades, receptor binding curves, and programmed cell death.`,
    goals: ['Distinguish endocrine, paracrine, synaptic and contact signalling', 'Describe G-protein-coupled, receptor tyrosine kinase, ion-channel and intracellular receptors', 'Trace cAMP and IP₃/Ca²⁺ second-messenger pathways', 'Use binding curves, Kd and the Hill coefficient', 'Explain amplification, termination and apoptosis'],
    sections: [
      {
        title: 'Reception, transduction, response',
        html: R`
<p>Signalling has three stages (Sutherland): a signal molecule binds a <strong>receptor</strong> (reception), the receptor’s change in shape starts a chain of events (<strong>transduction</strong>), and the cell changes its activity (<strong>response</strong>): enzyme activity, gene expression, shape or division.</p>
<ul>
<li><strong>Endocrine</strong>: hormones travel in the blood to distant targets (insulin, adrenaline).</li>
<li><strong>Paracrine</strong>: local mediators act on nearby cells (growth factors, histamine).</li>
<li><strong>Synaptic</strong>: neurotransmitters cross a 20 nm gap.</li>
<li><strong>Contact-dependent</strong>: membrane-bound signals touch receptors on adjacent cells (Notch–Delta in development; plasmodesmata and gap junctions also connect cytoplasm directly).</li>
</ul>
<p>Bacteria signal too: in <strong>quorum sensing</strong> they release autoinducers and switch on genes (bioluminescence, biofilm formation, virulence) only when the population is dense enough.</p>`
      },
      {
        title: 'Receptors',
        html: R`
<ul>
<li><strong>G-protein-coupled receptors</strong> (GPCRs): seven transmembrane helices. Ligand binding makes the receptor swap GDP for GTP on a G protein, which then activates enzymes such as adenylyl cyclase. About a third of drugs target GPCRs.</li>
<li><strong>Receptor tyrosine kinases</strong> (RTKs): ligand binding brings two receptors together; they phosphorylate each other’s tyrosines, which recruit relay proteins (insulin receptor, growth-factor receptors). Mutant RTKs that are always on drive many cancers.</li>
<li><strong>Ligand-gated ion channels</strong>: binding opens a pore (the acetylcholine receptor at the neuromuscular junction).</li>
<li><strong>Intracellular receptors</strong>: lipid-soluble signals (steroids, thyroxine, NO) cross the membrane; steroid–receptor complexes act as transcription factors.</li>
</ul>`
      },
      {
        title: 'Second messengers and amplification',
        html: R`
<p>Many receptors act through small, diffusible <strong>second messengers</strong>:</p>
<ul>
<li><strong>cAMP</strong>: made from ATP by adenylyl cyclase; activates protein kinase A (PKA). Broken down by phosphodiesterase (caffeine inhibits it). Cholera toxin locks a G protein on, flooding gut cells with cAMP and causing massive water loss.</li>
<li><strong>IP₃ and DAG</strong>: phospholipase C cleaves a membrane lipid; IP₃ releases Ca²⁺ from the ER, DAG activates protein kinase C.</li>
<li><strong>Ca²⁺</strong>: kept 10 000 times lower in the cytosol than outside, so small releases are strong signals, often acting via calmodulin.</li>
</ul>
<p>A <strong>phosphorylation cascade</strong> of protein kinases amplifies the signal at each step. In the liver, one adrenaline molecule can lead to the release of about 10⁸ glucose molecules: receptor → G proteins → adenylyl cyclase (each making many cAMP) → PKA → phosphorylase kinase → glycogen phosphorylase. Phosphatases, GTP hydrolysis and phosphodiesterases switch the system off, so the response stops when the signal goes.</p>`
      },
      {
        title: 'Binding curves',
        html: R`
<p>For a receptor R and ligand L at equilibrium, $K_d = [R][L]/[RL]$, so the fraction of receptors occupied is</p>
$$\theta = \frac{[L]}{K_d + [L]}.$$
<p>$K_d$ is the ligand concentration that half-saturates the receptors: a small $K_d$ means high affinity. Cooperative binding (several subunits, as in haemoglobin) follows the Hill equation, $\theta = [L]^n/(K^n + [L]^n)$, making the response switch-like. Many cells have <strong>spare receptors</strong>: a full response needs only a fraction occupied, so the dose giving half the maximal effect (EC₅₀) can be well below $K_d$.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A hormone with $K_d = 2$ nM is present at 6 nM. What fraction of receptors is occupied?<span class="tog">Solution</span></summary><div class="sol"><p>$6/(2 + 6) = 0.75$.</p></div></details>`
      },
      {
        title: 'Apoptosis',
        html: R`
<p><strong>Apoptosis</strong> is programmed cell death: the cell shrinks, chromatin condenses, DNA is cut into fragments, and the cell is packaged into vesicles that are eaten by phagocytes, with no inflammation. Proteases called <strong>caspases</strong> execute it. Signals come from outside (death ligands such as Fas) or inside (DNA damage via p53; mitochondria releasing cytochrome c). Apoptosis sculpts development (separating fingers and toes, pruning neurons) and removes damaged cells; too little contributes to cancer, too much to neurodegeneration.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Receptor occupancy', desc: 'Fraction of receptors occupied against ligand concentration (log scale), with an optional Hill coefficient. The dashed curve shows a competitive antagonist present.',
        tasks: ['Read off the ligand concentration that occupies 50% and 90% of receptors.', 'Set n = 3. How does the range from 10% to 90% occupancy change?', 'Add an antagonist. How much more agonist is needed for the same occupancy?'],
        params: { controls: [S('lKd', 'log₁₀ K_d (M)', -12, -4, 0.1, -9), S('n', 'Hill coefficient n', 0.5, 4, 0.1, 1), S('lA', 'Antagonist [B]/K_B (log₁₀)', -2, 3, 0.1, 1)],
          plots: [{ x: [-13, -3], y: [0, 1.02], xlabel: 'log₁₀ [ligand] (M)', ylabel: 'fraction occupied', curves: (v) => [{ f: (lL) => 1 / (1 + Math.pow(10, v.n * (v.lKd - lL))), label: 'agonist alone' }, { f: (lL) => 1 / (1 + Math.pow(10, v.n * (v.lKd + Math.log10(1 + Math.pow(10, v.lA)) - lL))), color: 'rust', dash: [5, 4], label: 'with antagonist' }], vlines: (v) => [{ x: v.lKd, label: 'K_d' }] }],
          readout: (v) => [['K_d', PB.fmt(Math.pow(10, v.lKd), 3) + ' M'], ['10% → 90% span', f(Math.log10(81) / v.n) + ' log units'], ['dose ratio with antagonist', f(1 + Math.pow(10, v.lA)) + '×']] } },
      { sim: 'explore', title: 'Amplification in a cascade', desc: 'Number of activated molecules at each stage of a signalling cascade, with a gain per stage, and how quickly the response decays once the signal is removed.',
        tasks: ['With 4 stages at ×100 each, how many end-product molecules does one hormone molecule make?', 'Why do cells need fast "off" switches as well as amplification?', 'Halve the lifetime of the active state. How does the decay change?'],
        params: { controls: [S('g', 'Gain per stage', 2, 1000, 1, 100, '×'), S('n', 'Number of stages', 1, 6, 1, 4), S('tau', 'Lifetime of active state', 0.5, 60, 0.5, 5, 's')],
          plots: [{ x: [0, 6], xticks: [0, 1, 2, 3, 4, 5, 6], y: [0, 20], xlabel: 'stage', ylabel: 'log₁₀ molecules', title: 'Amplification', curves: () => [], pts: (v) => { const o = []; for (let k = 0; k <= v.n; k++) o.push({ x: k, y: k * Math.log10(v.g), r: 6 }); return o; } },
            { x: [0, 60], y: [0, 1.05], xlabel: 'time after signal removed (s)', ylabel: 'response', title: 'Switching off', curves: (v) => [{ f: (t) => Math.exp(-t / v.tau), color: 'rust' }] }],
          readout: (v) => [['total amplification', PB.fmt(Math.pow(v.g, v.n), 3) + '×'], ['half-life of response', f(v.tau * Math.LN2) + ' s']] } }
    ],
    formulas: [
      ['Fractional occupancy', R`\theta = [L]/(K_d + [L])`],
      ['Hill equation', R`\theta = [L]^n/(K^n + [L]^n)`],
      ['Competitive antagonist', R`\text{dose ratio} = 1 + [B]/K_B`],
      ['Cascade gain', R`G = g^n`],
      ['cAMP synthesis', R`\mathrm{ATP \xrightarrow{\text{adenylyl cyclase}} cAMP + PP_i}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Steroid receptor', q: R`<p>Where is the receptor for a steroid hormone such as cortisol?</p>`, options: ['In the plasma membrane', 'In the cytoplasm or nucleus', 'On the ribosome', 'In the extracellular fluid'], answer: 1, hints: [R`Lipid-soluble.`], solution: R`<p>Inside the cell; the complex regulates transcription.</p>` },
      { level: 'concept', type: 'mcq', title: 'Caffeine', q: R`<p>Caffeine inhibits phosphodiesterase. What happens to cAMP?</p>`, options: ['It falls', 'It stays high for longer', 'It is converted to ATP', 'No effect'], answer: 1, hints: [R`PDE breaks cAMP down.`], solution: R`<p>cAMP persists, prolonging the response.</p>` },
      { level: 'concept', type: 'mcq', title: 'Cholera', q: R`<p>Cholera toxin keeps a G protein permanently active in gut cells. The main effect is…</p>`, options: ['Low cAMP and constipation', 'High cAMP, chloride secretion and watery diarrhoea', 'Cell death by apoptosis', 'Inflammation only'], answer: 1, hints: [R`Adenylyl cyclase stays on.`], solution: R`<p>cAMP stays high, CFTR channels secrete Cl⁻, and water follows.</p>` },
      { level: 'core', type: 'num', title: 'Occupancy', q: R`<p>A receptor has $K_d = 5$ nM. What fraction is occupied at 1 nM ligand?</p>`, answer: 1 / 6, tol: 0.005, unit: '', hints: [R`$L/(K_d + L)$.`], solution: R`<p>${f(1 / 6)}.</p>` },
      { level: 'core', type: 'num', title: 'Concentration for 90%', q: R`<p>What ligand concentration gives 90% occupancy if $K_d$ = 10 nM?</p>`, answer: 90, tol: 0.005, unit: 'nM', hints: [R`$L = 9K_d$.`], solution: R`<p>90 nM.</p>` },
      { level: 'core', type: 'num', title: 'Cascade', q: R`<p>A cascade has 3 stages of amplification, ×50, ×20 and ×100. How many product molecules per signal molecule?</p>`, answer: 50 * 20 * 100, tol: 0.001, unit: '', hints: [R`Multiply.`], solution: R`<p>100 000.</p>` },
      { level: 'core', type: 'num', title: 'Antagonist', q: R`<p>A competitive antagonist is present at 4 times its $K_B$. By what factor must the agonist dose rise to restore the same response?</p>`, answer: 5, tol: 0.005, unit: '×', hints: [R`$1 + [B]/K_B$.`], solution: R`<p>5×.</p>` },
      { level: 'core', type: 'num', title: 'Calcium gradient', q: R`<p>Cytosolic Ca²⁺ is 100 nM; outside it is 1.5 mM. Find the Nernst potential for Ca²⁺ at 37 °C, in mV.</p>`, answer: 61.5 / 2 * Math.log10(1.5e-3 / 1e-7), tol: 0.005, unit: 'mV', hints: [R`$z = 2$.`], solution: R`<p>${f(61.5 / 2 * Math.log10(1.5e-3 / 1e-7))} mV: a huge driving force for Ca²⁺ entry.</p>` },
      { level: 'core', type: 'num', title: 'Hill steepness', q: R`<p>For a Hill coefficient of 4, by what factor must ligand rise to go from 10% to 90% response?</p>`, answer: Math.pow(81, 1 / 4), tol: 0.005, unit: '×', hints: [R`$81^{1/n}$.`], solution: R`<p>${f(Math.pow(81, 1 / 4))}× (81× for n = 1).</p>` },
      { level: 'olympiad', type: 'num', title: 'Spare receptors', q: R`<p>A tissue gives half its maximal response when 10% of receptors are occupied. If $K_d$ = 20 nM, what is the EC₅₀?</p>`, answer: 20 * 0.1 / 0.9, tol: 0.005, unit: 'nM', hints: [R`Solve $L/(K_d + L) = 0.1$.`], solution: R`<p>$L = K_d\theta/(1 - \theta) = ${f(20 * 0.1 / 0.9)}$ nM.</p>` },
      { level: 'olympiad', type: 'num', title: 'Signal lifetime', q: R`<p>Active G proteins hydrolyse GTP with a rate constant of 0.04 s⁻¹. What is the half-life of the active state, in s?</p>`, answer: Math.LN2 / 0.04, tol: 0.005, unit: 's', hints: [R`First-order decay.`], solution: R`<p>${f(Math.LN2 / 0.04)} s.</p>` },
      { level: 'olympiad', type: 'num', title: 'Quorum threshold', q: R`<p>Each bacterium releases autoinducer at $10^{-21}$ mol/h into a 1 mL culture, and it decays with a 1 h lifetime. The genes switch on at 50 nM. What cell density (cells/mL) is needed at steady state?</p>`, answer: 50e-9 * 1e-3 / 1e-21, tol: 0.01, unit: 'cells/mL', hints: [R`Steady state: concentration = production × lifetime / volume.`], solution: R`<p>Needed amount 5 × 10⁻¹¹ mol in 1 mL; per cell 10⁻²¹ mol: ${PB.fmt(50e-9 * 1e-3 / 1e-21, 3)} cells/mL.</p>` }
    ]
  });
  PB.addDrills('bio-signalling', [
    { title: 'Fractional occupancy', gen(r) { const Kd = r.step(0.1, 100, 0.1), L = r.step(0.1, 500, 0.1); return { q: R`<p>A receptor has $K_d$ = ${f(Kd)} nM. What fraction is occupied at ${f(L)} nM ligand?</p>`, answer: L / (Kd + L), tol: 0.005, unit: '', solution: R`<p>${f(L)}/(${f(Kd)} + ${f(L)}) = ${f(L / (Kd + L))}.</p>` }; } },
    { title: 'Cascade amplification', gen(r) { const n = r.int(2, 5), g = r.pick([5, 10, 20, 50, 100]); return { q: R`<p>A cascade has ${n} stages, each amplifying ×${g}. What is the overall amplification (log₁₀)?</p>`, answer: n * Math.log10(g), tol: 0.005, unit: '', solution: R`<p>${n} × log₁₀ ${g} = ${f(n * Math.log10(g))}.</p>` }; } },
    { title: 'Ligand for occupancy', gen(r) { const Kd = r.step(0.5, 50, 0.5), th = r.pick([0.25, 0.5, 0.75, 0.8, 0.9, 0.95, 0.99]); return { q: R`<p>What ligand concentration (nM) occupies ${th * 100}% of receptors with $K_d$ = ${f(Kd)} nM?</p>`, answer: Kd * th / (1 - th), tol: 0.005, unit: 'nM', solution: R`<p>$K_d\theta/(1 - \theta) = ${f(Kd * th / (1 - th))}$ nM.</p>` }; } }
  ]);
})();
