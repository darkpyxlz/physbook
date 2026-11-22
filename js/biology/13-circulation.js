(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-circulation', subject: 'biology', num: 13, part: 'Physiology',
    title: 'Gas Exchange and Circulation',
    subtitle: R`How oxygen gets from air to mitochondria. Lungs and ventilation, haemoglobin and the Bohr effect, the heart and cardiac cycle, blood vessels, and the physics of flow.`,
    goals: ['Describe ventilation and alveolar gas exchange', 'Interpret oxygen dissociation curves and the Bohr shift', 'Explain the cardiac cycle and its control', 'Use cardiac output and Poiseuille\'s law', 'Explain tissue fluid formation'],
    sections: [
      {
        title: 'Lungs and ventilation',
        html: R`
<p>Air passes through the trachea, bronchi and bronchioles to about 300 million <strong>alveoli</strong>, with a total surface of about 70 m² and a barrier only 0.5 μm thick. Ventilation and blood flow keep the concentration gradients steep.</p>
<p><strong>Breathing in</strong>: the external intercostal muscles and diaphragm contract, the thorax expands, pressure falls below atmospheric and air flows in (Boyle's law). Quiet breathing out is mostly passive recoil.</p>
$$\text{pulmonary ventilation} = \text{tidal volume} \times \text{breathing rate}.$$
<p>At rest about 0.5 L × 12 per minute = 6 L/min, but about 0.15 L of each breath fills the airways (<strong>dead space</strong>) and never reaches alveoli. Alveolar ventilation is $(V_T - V_D)\times f$; this is why slow deep breathing is more efficient than fast shallow breathing.</p>
<p>Fish use <strong>countercurrent exchange</strong> in their gills: blood and water flow in opposite directions, so a gradient exists along the whole lamella and blood can reach over 80% of the water's oxygen level, far better than the 50% maximum of parallel flow.</p>`
      },
      {
        title: 'Haemoglobin and oxygen transport',
        html: R`
<p>Each haemoglobin molecule has four haem groups and carries up to four O₂. Binding is <strong>cooperative</strong>: once one O₂ binds, the shape change makes the others bind more easily. The result is a <strong>sigmoid</strong> dissociation curve, approximated by the Hill equation:</p>
$$S = \frac{p^n}{P_{50}^n + p^n},\qquad n \approx 2.7,\ \ P_{50} \approx 27\ \text{mmHg}.$$
<p>The steep middle means a small drop in pO₂ in active tissue releases a lot of O₂, while the flat top keeps blood almost saturated in the lungs even if pO₂ falls.</p>
<ul>
<li><strong>Bohr effect</strong>: CO₂ and acid shift the curve <strong>right</strong> (higher $P_{50}$), so active, acidic, warm tissues receive more O₂.</li>
<li><strong>Fetal haemoglobin</strong> and <strong>myoglobin</strong> lie to the <strong>left</strong>: they bind O₂ more tightly, taking it from maternal blood or storing it in muscle.</li>
<li><strong>Carbon monoxide</strong> binds haem about 240 times more strongly than O₂.</li>
</ul>
<p>Most CO₂ travels as hydrogencarbonate, made by <strong>carbonic anhydrase</strong> in red cells: $\mathrm{CO_2 + H_2O \rightleftharpoons H_2CO_3 \rightleftharpoons H^+ + HCO_3^-}$; HCO₃⁻ leaves the cell in exchange for Cl⁻ (the chloride shift), and H⁺ binds haemoglobin, helping it release O₂.</p>`
      },
      {
        title: 'The heart',
        html: R`
<p>Mammals have a <strong>double circulation</strong>: the right side pumps blood to the lungs, the left side to the body at higher pressure. The left ventricle wall is thickest.</p>
<p>The <strong>cardiac cycle</strong> (about 0.8 s at rest): atrial systole, ventricular systole (atrioventricular valves close, "lub"; semilunar valves open), then diastole (semilunar valves close, "dub"). Valves open and close purely from pressure differences.</p>
<p>The heart is <strong>myogenic</strong>: the <strong>sinoatrial node</strong> sets the rhythm; the wave of excitation spreads across the atria, is delayed about 0.1 s at the <strong>atrioventricular node</strong> so the atria finish emptying, then travels down the bundle of His and Purkinje fibres to contract the ventricles from the apex up. An ECG records this: P wave (atria), QRS (ventricles), T (ventricular recovery).</p>
$$\text{cardiac output} = \text{stroke volume} \times \text{heart rate} \approx 70\ \text{mL} \times 70\ \text{min}^{-1} \approx 5\ \text{L/min}.$$
<p>The medulla adjusts heart rate through sympathetic (faster) and vagus (slower) nerves, responding to CO₂ (chemoreceptors) and blood pressure (baroreceptors).</p>`
      },
      {
        title: 'Vessels and the physics of flow',
        html: R`
<p>Arteries have thick elastic and muscular walls that smooth pulsatile flow; capillaries are one cell thick for exchange; veins have thin walls, wide lumens and valves.</p>
<p>Flow through a tube obeys <strong>Poiseuille's law</strong>:</p>
$$Q = \frac{\pi r^4\,\Delta P}{8\eta L}.$$
<p>The $r^4$ makes arterioles powerful controllers: narrowing an arteriole by 16% halves its flow. By continuity, the speed in each vessel type is $v = Q/A_{\text{total}}$: blood slows to about 0.5 mm/s in capillaries because their combined cross-section is huge, giving time for exchange.</p>
<p><strong>Tissue fluid</strong>: at the arterial end of a capillary, hydrostatic pressure (about 35 mmHg) exceeds the oncotic pressure of plasma proteins (about 25 mmHg) and fluid is pushed out; at the venous end hydrostatic pressure has fallen to about 15 mmHg and fluid returns. The excess is collected by the lymphatic system.</p>`
      }
    ],
    labs: [
      { sim: 'oxygen', title: 'Oxygen dissociation', desc: 'Haemoglobin saturation against pO₂. The dashed curve is normal blood. Lower the pH or warm the blood to see the Bohr shift.',
        tasks: ['At normal pH, what fraction of oxygen is unloaded between the lungs (100 mmHg) and muscle at 25 mmHg?', 'Lower the pH to 7.2. How does unloading change? Is loading in the lungs affected?', 'Compare myoglobin with haemoglobin. Why is myoglobin useless for transport but good for storage?'] }
    ],
    formulas: [
      ['Pulmonary ventilation', R`\dot V = V_T \times f`],
      ['Hill equation', R`S = \dfrac{p^n}{P_{50}^n + p^n}`],
      ['Cardiac output', R`\text{CO} = \text{SV}\times\text{HR}`],
      ['Poiseuille\'s law', R`Q = \dfrac{\pi r^4\Delta P}{8\eta L}`],
      ['Continuity', R`v = Q/A`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Bohr effect', q: R`<p>During exercise, CO₂ in the muscles rises. What happens to the dissociation curve?</p>`, options: ['It shifts left, so more O₂ is held', 'It shifts right, so more O₂ is released', 'It becomes hyperbolic', 'No change'], answer: 1, hints: [R`Acid favours unloading.`], solution: R`<p>Right shift: haemoglobin's affinity falls where O₂ is needed.</p>` },
      { level: 'concept', type: 'mcq', title: 'AV node delay', q: R`<p>What is the purpose of the delay at the atrioventricular node?</p>`, options: ['To let the ventricles fill before they contract', 'To rest the heart muscle', 'To slow the heart rate', 'To close the semilunar valves'], answer: 0, hints: [R`The atria need to finish contracting.`], solution: R`<p>It lets atrial systole complete so the ventricles fill fully.</p>` },
      { level: 'concept', type: 'mcq', title: 'Fetal haemoglobin', q: R`<p>Why does fetal haemoglobin have a curve to the left of adult haemoglobin?</p>`, options: ['So the fetus can release O₂ to the mother', 'So it can take O₂ from maternal blood in the placenta', 'Because the fetus does not respire', 'Because fetal blood is acidic'], answer: 1, hints: [R`Higher affinity.`], solution: R`<p>Higher affinity lets it load O₂ at the placenta's lower pO₂.</p>` },
      { level: 'core', type: 'num', title: 'Cardiac output', q: R`<p>An athlete has a stroke volume of 160 mL and a heart rate of 180 min⁻¹. What is the cardiac output, in L/min?</p>`, answer: 28.8, tol: 0.002, unit: 'L/min', hints: [R`Multiply.`], solution: R`<p>28.8 L/min, nearly six times the resting value.</p>` },
      { level: 'core', type: 'num', title: 'Alveolar ventilation', q: R`<p>Tidal volume 0.5 L, dead space 0.15 L, 14 breaths per minute. What is the alveolar ventilation, in L/min?</p>`, answer: 4.9, tol: 0.002, unit: 'L/min', hints: [R`$(V_T - V_D)f$.`], solution: R`<p>$0.35\times14 = 4.9$ L/min.</p>` },
      { level: 'core', type: 'num', title: 'Saturation', q: R`<p>Using $n = 2.7$ and $P_{50} = 27$ mmHg, what is the saturation at pO₂ = 40 mmHg (mixed venous blood), in %?</p>`, answer: 74.3, tol: 0.01, unit: '%', hints: [R`$(40/27)^{2.7} = 2.89$.`], solution: R`<p>$2.89/3.89 = 0.744$: venous blood is still three-quarters saturated, a reserve for exercise.</p>` },
      { level: 'core', type: 'num', title: 'Narrowed artery', q: R`<p>An artery's radius is halved by plaque. With the same pressure difference, by what factor is flow reduced?</p>`, answer: 16, tol: 0.002, unit: '×', hints: [R`$r^4$.`], solution: R`<p>$2^4 = 16$.</p>` },
      { level: 'core', type: 'num', title: 'Heart rate from ECG', q: R`<p>The R–R interval on an ECG is 0.75 s. What is the heart rate, in beats per minute?</p>`, answer: 80, tol: 0.002, unit: 'min⁻¹', hints: [R`60/0.75.`], solution: R`<p>80 beats per minute.</p>` },
      { level: 'olympiad', type: 'num', title: 'Capillary speed', q: R`<p>Cardiac output is 5 L/min. The total cross-section of all systemic capillaries is 0.25 m². What is the mean speed of blood in capillaries, in mm/s?</p>`, answer: 0.333, tol: 0.01, unit: 'mm/s', hints: [R`Convert Q to m³/s.`], solution: R`<p>$Q = 8.33\times10^{-5}$ m³/s; $v = Q/A = 3.3\times10^{-4}$ m/s = 0.33 mm/s.</p>` },
      { level: 'olympiad', type: 'num', title: 'Oxygen delivered', q: R`<p>Blood carries 1.34 mL O₂ per g of haemoglobin, at 150 g/L. Saturation falls from 98% to 75% across the body, and cardiac output is 5 L/min. How much O₂ is delivered per minute, in mL?</p>`, answer: 231, tol: 0.01, unit: 'mL/min', hints: [R`Capacity 201 mL/L; use 23% of it.`], solution: R`<p>$1.34\times150\times0.23\times5 = 231$ mL/min, close to resting O₂ consumption of about 250 mL/min.</p>` },
      { level: 'olympiad', type: 'num', title: 'Arteriole control', q: R`<p>By what percentage must an arteriole's radius decrease to halve its blood flow?</p>`, answer: 15.9, tol: 0.01, unit: '%', hints: [R`$r'/r = 2^{-1/4}$.`], solution: R`<p>$2^{-1/4} = 0.841$, a 15.9% decrease.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-circulation', [
    { title: 'Cardiac output', gen(r) { const sv = r.int(50, 180), hr = r.int(45, 200); return { q: R`<p>Stroke volume ${sv} mL, heart rate ${hr} min⁻¹. What is the cardiac output, in L/min?</p>`, answer: sv * hr / 1000, tol: 0.005, unit: 'L/min', solution: R`<p>$${sv}\times${hr} = ${sv * hr}$ mL/min $= ${f(sv * hr / 1000)}$ L/min.</p>` }; } },
    { title: 'Hill saturation', gen(r) { const p = r.int(10, 110), P = r.step(20, 36, 0.5); const S = Math.pow(p, 2.7) / (Math.pow(P, 2.7) + Math.pow(p, 2.7)); return { q: R`<p>Haemoglobin has $P_{50} = ${P}$ mmHg and $n = 2.7$. What is its saturation at pO₂ = ${p} mmHg, in %?</p>`, answer: 100 * S, tol: 0.01, unit: '%', solution: R`<p>$S = \frac{${p}^{2.7}}{${P}^{2.7} + ${p}^{2.7}} = ${f(100 * S)}\%$.</p>` }; } },
    { title: 'Poiseuille scaling', gen(r) { const k = r.pick([0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.5, 2]); return { q: R`<p>A vessel's radius changes by a factor of ${k}, with everything else fixed. By what factor does the flow change?</p>`, answer: Math.pow(k, 4), tol: 0.005, unit: '×', solution: R`<p>$${k}^4 = ${f(Math.pow(k, 4))}$.</p>` }; } }
  ]);
})();
