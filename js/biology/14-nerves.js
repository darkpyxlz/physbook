(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-nerves', subject: 'biology', num: 14, part: 'Physiology',
    title: 'Nerves, Synapses and Muscle',
    subtitle: R`Electrical signalling in the body. The action potential and the Hodgkin–Huxley model, conduction speed and myelin, synaptic transmission, and how muscles contract.`,
    goals: ['Explain the ionic basis of the action potential', 'Describe refractory periods and the all-or-nothing principle', 'Compare conduction in myelinated and unmyelinated axons', 'Describe synaptic transmission and summation', 'Explain the sliding filament model'],
    sections: [
      {
        title: 'The action potential',
        html: R`
<p>A neuron at rest sits at about −70 mV (chapter 3). When a stimulus depolarises it past a <strong>threshold</strong> of about −55 mV, an <strong>action potential</strong> fires:</p>
<ol>
<li><strong>Depolarisation</strong>: voltage-gated Na⁺ channels open, Na⁺ rushes in, and the membrane swings to about +40 mV, towards $E_{Na}$. This is positive feedback: depolarisation opens more Na⁺ channels.</li>
<li><strong>Repolarisation</strong>: Na⁺ channels inactivate and slower voltage-gated K⁺ channels open; K⁺ leaves.</li>
<li><strong>Hyperpolarisation</strong>: K⁺ channels close slowly, so the membrane briefly overshoots below rest towards $E_K$.</li>
</ol>
<p>The whole spike lasts about 1–2 ms. It is <strong>all-or-nothing</strong>: a stronger stimulus does not give a bigger spike but more frequent spikes. Stimulus strength is coded by frequency.</p>
<p>During the <strong>absolute refractory period</strong> Na⁺ channels are inactivated and no new spike can fire; in the <strong>relative refractory period</strong> only a stronger stimulus works. This sets a maximum firing rate and makes spikes travel one way.</p>
<div class="insight"><strong>The Hodgkin–Huxley model (1952).</strong> Working on the squid giant axon, Hodgkin and Huxley described the membrane as a capacitor with three conductances. Gating variables $m$, $h$ and $n$ follow first-order kinetics and $g_{Na} = \bar g_{Na}m^3h$, $g_K = \bar g_Kn^4$. The lab runs their equations.</div>`
      },
      {
        title: 'Conduction speed',
        html: R`
<p>The spike spreads as local currents depolarise the next patch of membrane. Speed depends on two things:</p>
<ul>
<li><strong>Diameter</strong>: wider axons have lower internal resistance. In unmyelinated axons speed grows as $v \propto \sqrt{d}$; the squid uses a 0.5 mm axon to reach about 25 m/s.</li>
<li><strong>Myelination</strong>: Schwann cells wrap the axon in insulating myelin, and the spike jumps between the gaps, the <strong>nodes of Ranvier</strong>: <strong>saltatory conduction</strong>. In myelinated axons $v \approx 6\ \text{m/s per μm}$ of diameter, so a 20 μm motor axon conducts at about 120 m/s.</li>
</ul>
<p>Multiple sclerosis destroys myelin in the central nervous system and slows or blocks conduction.</p>
<details class="example"><summary><span class="lbl">Worked example</span> Stimulating a nerve at two points 0.25 m apart gives response delays of 5.0 ms and 9.2 ms. What is the conduction speed?<span class="tog">Solution</span></summary><div class="sol"><p>$v = 0.25/(4.2\times10^{-3}) = 60$ m/s. Using the difference cancels the synaptic and muscle delays.</p></div></details>`
      },
      {
        title: 'Synapses',
        html: R`
<p>At a chemical synapse the spike arrives at the presynaptic terminal and opens voltage-gated <strong>Ca²⁺ channels</strong>. Ca²⁺ triggers vesicles to fuse with the membrane and release <strong>neurotransmitter</strong> (acetylcholine, glutamate, GABA…) into the 20 nm cleft. It binds receptors on the postsynaptic membrane, opening ion channels. It is then broken down (acetylcholinesterase) or taken back up. The synaptic delay is about 0.5 ms.</p>
<ul>
<li><strong>Excitatory</strong> synapses let Na⁺ in, giving an EPSP; <strong>inhibitory</strong> ones let Cl⁻ in or K⁺ out, giving an IPSP.</li>
<li><strong>Summation</strong>: one EPSP is too small. Spikes fire only if EPSPs from many synapses (spatial) or one synapse in quick succession (temporal) add up past threshold.</li>
<li>Synapses make transmission one-way and allow integration, learning (changes in synaptic strength) and drug action. Curare blocks acetylcholine receptors; nerve agents block acetylcholinesterase; SSRIs block serotonin reuptake.</li>
</ul>`
      },
      {
        title: 'Muscle contraction',
        html: R`
<p>Skeletal muscle fibres contain myofibrils divided into <strong>sarcomeres</strong> of thick <strong>myosin</strong> and thin <strong>actin</strong> filaments. In the <strong>sliding filament model</strong>, filaments do not shorten: they slide past each other. The I band and H zone shrink; the A band (myosin length) stays the same.</p>
<ol>
<li>A motor neuron releases acetylcholine at the neuromuscular junction; the muscle fibre depolarises, and the signal runs into T-tubules.</li>
<li>The sarcoplasmic reticulum releases Ca²⁺, which binds <strong>troponin</strong>, shifting <strong>tropomyosin</strong> off actin's binding sites.</li>
<li>Myosin heads bind actin (cross-bridges), pivot (the power stroke, releasing ADP and phosphate), then bind ATP to detach and re-cock. Each cycle moves the filament about 10 nm.</li>
<li>Ca²⁺ is pumped back; contraction stops.</li>
</ol>
<p>Without ATP myosin cannot detach: rigor mortis. Muscle regenerates ATP from creatine phosphate for a few seconds, then from glycolysis and respiration. Slow-twitch fibres are rich in mitochondria and myoglobin; fast-twitch fibres rely on glycolysis and fatigue quickly.</p>`
      }
    ],
    labs: [
      { sim: 'hh', title: 'The Hodgkin–Huxley neuron', desc: 'A live simulation of a patch of squid axon. Press Stimulate to inject current. The lower trace shows the Na⁺ and K⁺ conductances.',
        tasks: ['Find the threshold: the smallest stimulus (1 ms) that fires a spike.', 'Stimulate twice in quick succession. How soon after a spike can a second one fire?', 'Turn on constant current. How does firing rate depend on current? What happens when you block Na⁺ channels?'] }
    ],
    formulas: [
      ['Conduction speed', R`v = \Delta x/\Delta t`],
      ['Myelinated axons', R`v \approx 6\,d\ \ (\text{m/s},\ d\ \text{in μm})`],
      ['Unmyelinated axons', R`v \propto \sqrt d`],
      ['HH conductances', R`g_{Na} = \bar g_{Na}m^3h,\ \ g_K = \bar g_Kn^4`],
      ['Membrane current', R`C\dfrac{dV}{dt} = I - \sum g_i(V - E_i)`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Depolarisation', q: R`<p>What causes the rising phase of an action potential?</p>`, options: ['K⁺ leaving the cell', 'Na⁺ entering through voltage-gated channels', 'The Na⁺/K⁺ pump', 'Cl⁻ entering'], answer: 1, hints: [R`Which channels open first?`], solution: R`<p>Voltage-gated Na⁺ channels open and Na⁺ flows in.</p>` },
      { level: 'concept', type: 'mcq', title: 'Stronger stimulus', q: R`<p>How does a neuron signal a stronger stimulus?</p>`, options: ['Larger action potentials', 'Faster conduction', 'Higher frequency of action potentials', 'Longer action potentials'], answer: 2, hints: [R`All-or-nothing.`], solution: R`<p>By firing more often.</p>` },
      { level: 'concept', type: 'mcq', title: 'Contraction', q: R`<p>During contraction, which part of the sarcomere stays the same length?</p>`, options: ['The I band', 'The H zone', 'The A band', 'The whole sarcomere'], answer: 2, hints: [R`The A band is the length of the myosin.`], solution: R`<p>The A band; filaments slide but do not shorten.</p>` },
      { level: 'core', type: 'num', title: 'Conduction speed', q: R`<p>Two electrodes 12 cm apart record a spike 2.0 ms apart. What is the conduction speed, in m/s?</p>`, answer: 60, tol: 0.002, unit: 'm/s', hints: [R`0.12/0.002.`], solution: R`<p>60 m/s, a myelinated axon.</p>` },
      { level: 'core', type: 'num', title: 'Myelinated speed', q: R`<p>Estimate the conduction speed of a myelinated axon 8 μm in diameter, in m/s.</p>`, answer: 48, tol: 0.002, unit: 'm/s', hints: [R`6 m/s per μm.`], solution: R`<p>48 m/s.</p>` },
      { level: 'core', type: 'num', title: 'Maximum firing rate', q: R`<p>A neuron's absolute refractory period is 2 ms. What is its maximum firing frequency, in Hz?</p>`, answer: 500, tol: 0.002, unit: 'Hz', hints: [R`1/0.002.`], solution: R`<p>500 Hz.</p>` },
      { level: 'core', type: 'num', title: 'Reflex time', q: R`<p>A reflex path is 1.6 m of axon at 80 m/s plus two synapses of 0.5 ms each. What is the total delay, in ms?</p>`, answer: 21, tol: 0.002, unit: 'ms', hints: [R`20 ms of conduction.`], solution: R`<p>$20 + 1 = 21$ ms.</p>` },
      { level: 'core', type: 'num', title: 'Sarcomere', q: R`<p>A sarcomere shortens from 2.6 μm to 2.0 μm. By how much does the I band shorten, in μm?</p>`, answer: 0.6, tol: 0.002, unit: 'μm', hints: [R`The whole change comes from the I band.`], solution: R`<p>The A band stays 1.6 μm, so the I band shrinks by the full 0.6 μm (from 1.0 to 0.4).</p>` },
      { level: 'olympiad', type: 'num', title: 'Squid versus myelin', q: R`<p>An unmyelinated axon conducts at 1 m/s at 1 μm diameter, with $v \propto \sqrt d$. What diameter, in μm, would give 60 m/s, the speed of a 10 μm myelinated axon?</p>`, answer: 3600, tol: 0.002, unit: 'μm', hints: [R`$60^2$.`], solution: R`<p>$d = 3600\ \mu$m = 3.6 mm: myelin saves a factor of 360 in diameter, which is why vertebrates can pack millions of fast axons into a nerve.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ions per spike', q: R`<p>A membrane has capacitance 1 μF/cm². How many Na⁺ ions must enter through 1 μm² to depolarise it by 100 mV? ($e = 1.6\times10^{-19}$ C.)</p>`, answer: 6250, tol: 0.005, unit: 'ions', hints: [R`$Q = CV$; 1 μm² = 10⁻⁸ cm².`], solution: R`<p>$Q = 10^{-6}\times10^{-8}\times0.1 = 10^{-15}$ C, which is 6250 ions: a tiny fraction of those present, so concentrations hardly change per spike.</p>` },
      { level: 'olympiad', type: 'num', title: 'Cross-bridge cycles', q: R`<p>A sarcomere shortens by 0.5 μm, so each half-sarcomere's thin filament slides 0.25 μm. With 10 nm per cross-bridge stroke, how many strokes must each myosin head make, at least?</p>`, answer: 25, tol: 0.002, unit: '', hints: [R`250 nm / 10 nm.`], solution: R`<p>25 strokes, each costing one ATP.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-nerves', [
    { title: 'Conduction speed', gen(r) { const d = r.int(2, 40), v = r.pick([0.8, 2, 15, 30, 60, 90, 120]); const t = d / 100 / v * 1000; return { q: R`<p>Two electrodes ${d} cm apart record the same spike ${f(t)} ms apart. What is the conduction speed, in m/s?</p>`, answer: v, tol: 0.01, unit: 'm/s', solution: R`<p>$${d / 100}\ \text{m}/${f(t / 1000)}\ \text{s} = ${v}$ m/s.</p>` }; } },
    { title: 'Reflex delay', gen(r) { const L = r.step(0.3, 2, 0.1), v = r.int(30, 120), s = r.int(1, 4); const t = L / v * 1000 + 0.5 * s; return { q: R`<p>A pathway has ${f(L)} m of axon conducting at ${v} m/s and ${s} synapse${s > 1 ? 's' : ''} of 0.5 ms each. What is the total delay, in ms?</p>`, answer: t, tol: 0.005, unit: 'ms', solution: R`<p>$${f(L)}/${v}\times1000 + ${0.5 * s} = ${f(t)}$ ms.</p>` }; } },
    { title: 'Maximum firing rate', gen(r) { const ref = r.step(0.8, 5, 0.1); return { q: R`<p>A neuron's absolute refractory period is ${f(ref)} ms. What is the highest possible firing rate, in Hz?</p>`, answer: 1000 / ref, tol: 0.005, unit: 'Hz', solution: R`<p>$1000/${f(ref)} = ${f(1000 / ref)}$ Hz.</p>` }; } }
  ]);
})();
