(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-respiration', subject: 'biology', num: 5, part: 'Cells and Molecules',
    title: 'Cellular Respiration',
    subtitle: R`How cells release energy from food. Glycolysis, the link reaction, the Krebs cycle, oxidative phosphorylation and chemiosmosis, fermentation, and the respiratory quotient.`,
    goals: ['Outline the four stages of aerobic respiration and where they happen', 'Explain chemiosmosis and the role of oxygen', 'Count the ATP yield from glucose and from fats', 'Compare aerobic respiration with fermentation', 'Calculate respiratory quotients'],
    sections: [
      {
        title: 'Overview',
        html: R`
$$\mathrm{C_6H_{12}O_6 + 6O_2 \longrightarrow 6CO_2 + 6H_2O}\qquad \Delta G^\circ = -2870\ \text{kJ/mol}$$
<p>Burning glucose in one step would waste the energy as heat. Cells instead strip electrons from it in small steps, pass them to the carriers <strong>NAD⁺</strong> and <strong>FAD</strong>, and use the electrons' fall to oxygen to make ATP.</p>
<div class="table-wrap"><table><thead><tr><th>Stage</th><th>Where</th><th>Products per glucose</th></tr></thead><tbody>
<tr><td>Glycolysis</td><td>cytoplasm</td><td>2 pyruvate, 2 ATP (net), 2 NADH</td></tr>
<tr><td>Link reaction</td><td>mitochondrial matrix</td><td>2 acetyl-CoA, 2 CO₂, 2 NADH</td></tr>
<tr><td>Krebs cycle (×2)</td><td>matrix</td><td>4 CO₂, 2 ATP (as GTP), 6 NADH, 2 FADH₂</td></tr>
<tr><td>Oxidative phosphorylation</td><td>inner membrane</td><td>about 26–28 ATP, water</td></tr>
</tbody></table></div>`
      },
      {
        title: 'Glycolysis, the link reaction and the Krebs cycle',
        html: R`
<p><strong>Glycolysis</strong> splits glucose (6C) into two pyruvate (3C). It first spends 2 ATP to phosphorylate glucose (the step controlled by phosphofructokinase), then splits the sugar and makes 4 ATP by <strong>substrate-level phosphorylation</strong>, plus 2 NADH. It needs no oxygen and runs in every living cell.</p>
<p>In the <strong>link reaction</strong> pyruvate enters the mitochondrion, loses CO₂ (decarboxylation) and electrons (dehydrogenation) and joins coenzyme A as acetyl-CoA (2C).</p>
<p>In the <strong>Krebs cycle</strong> acetyl-CoA joins oxaloacetate (4C) to form citrate (6C). Two decarboxylations and four dehydrogenations regenerate oxaloacetate. Per turn: 2 CO₂, 3 NADH, 1 FADH₂, 1 ATP. Every carbon of glucose has now left as CO₂; the energy sits in reduced carriers.</p>`
      },
      {
        title: 'Oxidative phosphorylation and chemiosmosis',
        html: R`
<p>NADH and FADH₂ hand their electrons to the <strong>electron transport chain</strong> in the inner mitochondrial membrane. As electrons pass along protein complexes, energy is used to pump H⁺ from the matrix into the intermembrane space. <strong>Oxygen is the final electron acceptor</strong>, combining with electrons and H⁺ to form water. Without O₂ the chain backs up and stops.</p>
<p>The H⁺ gradient (about 0.2 V of combined electrical and pH difference) drives protons back through <strong>ATP synthase</strong>, a rotary motor that makes ATP from ADP and phosphate. This coupling of a proton gradient to ATP synthesis is Peter Mitchell's <strong>chemiosmotic theory</strong>.</p>
<p>Measured yields (P/O ratios) are about 2.5 ATP per NADH and 1.5 per FADH₂, giving about 30–32 ATP per glucose, roughly 33% efficient. Older textbooks quote 36–38 using whole numbers 3 and 2.</p>
<div class="insight"><strong>Uncouplers.</strong> Brown fat contains thermogenin, a channel that lets protons leak back without making ATP, so the energy becomes heat. The poison 2,4-dinitrophenol does the same, which is why it was once (dangerously) sold for weight loss.</div>`
      },
      {
        title: 'Anaerobic respiration and other fuels',
        html: R`
<p>Without oxygen, glycolysis can continue only if NADH is reoxidised to NAD⁺. <strong>Lactate fermentation</strong> (muscle, bacteria) reduces pyruvate to lactate; <strong>alcoholic fermentation</strong> (yeast, plants) converts it to ethanol and CO₂. Either way the yield is just 2 ATP per glucose, about 15 times less than aerobic respiration. Lactate is later reconverted to glucose in the liver, and the extra oxygen needed afterwards is the "oxygen debt".</p>
<p>Fats are broken into glycerol and fatty acids; <strong>β-oxidation</strong> cuts fatty acids into 2C acetyl-CoA units that feed the Krebs cycle. Proteins are deaminated and their carbon skeletons enter the pathway at different points.</p>
<p>The <strong>respiratory quotient</strong> shows which fuel is used:</p>
$$\mathrm{RQ} = \frac{\text{CO}_2\ \text{produced}}{\text{O}_2\ \text{consumed}}:\quad 1.0\ \text{carbohydrate},\ \approx0.7\ \text{fat},\ \approx0.9\ \text{protein}.$$
<details class="example"><summary><span class="lbl">Worked example</span> Find the RQ for the oxidation of tripalmitin, C₅₁H₉₈O₆.<span class="tog">Solution</span></summary><div class="sol"><p>$\mathrm{C_{51}H_{98}O_6 + 72.5\,O_2 \to 51\,CO_2 + 49\,H_2O}$, so $\mathrm{RQ} = 51/72.5 = 0.70$.</p></div></details>`
      }
    ],
    labs: [
      { sim: 'atpbudget', title: 'ATP accounts', desc: 'Where the ATP comes from for different fuels and conditions, using modern P/O ratios.',
        tasks: ['How much of the aerobic yield from glucose comes from oxidative phosphorylation?', 'Change the shuttle. Why does the route of cytosolic NADH into the mitochondrion matter?', 'Compare ATP per carbon atom for glucose and palmitate. Why is fat a better store?'] }
    ],
    formulas: [
      ['Aerobic respiration', R`\mathrm{C_6H_{12}O_6 + 6O_2 \to 6CO_2 + 6H_2O}`],
      ['Respiratory quotient', R`\mathrm{RQ} = V_{\mathrm{CO_2}}/V_{\mathrm{O_2}}`],
      ['P/O ratios', R`\text{NADH} \to 2.5,\ \ \mathrm{FADH_2} \to 1.5\ \text{ATP}`],
      ['Efficiency', R`\eta = \dfrac{n_{\text{ATP}}\times30.5}{2870}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Role of oxygen', q: R`<p>What is the role of oxygen in aerobic respiration?</p>`, options: ['It oxidises glucose directly', 'It is the final electron acceptor of the transport chain', 'It is needed for glycolysis', 'It combines with carbon to form CO₂'], answer: 1, hints: [R`Where is water formed?`], solution: R`<p>O₂ accepts electrons at the end of the chain, forming water. The CO₂ comes from decarboxylation.</p>` },
      { level: 'concept', type: 'mcq', title: 'Location of glycolysis', q: R`<p>Where does glycolysis occur?</p>`, options: ['Mitochondrial matrix', 'Inner mitochondrial membrane', 'Cytoplasm', 'Intermembrane space'], answer: 2, hints: [R`It works in cells without mitochondria.`], solution: R`<p>In the cytoplasm.</p>` },
      { level: 'concept', type: 'mcq', title: 'Why ferment?', q: R`<p>Why do muscle cells convert pyruvate to lactate when oxygen is short?</p>`, options: ['To make extra ATP', 'To regenerate NAD⁺ so glycolysis can continue', 'To remove CO₂', 'To store energy as lactate'], answer: 1, hints: [R`Glycolysis needs NAD⁺.`], solution: R`<p>Lactate formation reoxidises NADH, keeping glycolysis (2 ATP) running.</p>` },
      { level: 'core', type: 'num', title: 'Krebs turns', q: R`<p>How many turns of the Krebs cycle does one glucose molecule supply?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`One acetyl-CoA per turn.`], solution: R`<p>Two acetyl-CoA, so two turns.</p>` },
      { level: 'core', type: 'num', title: 'Total NADH', q: R`<p>How many NADH are made per glucose in aerobic respiration?</p>`, answer: 10, tol: 0.001, unit: '', hints: [R`2 + 2 + 6.`], solution: R`<p>Glycolysis 2, link reaction 2, Krebs 6: 10.</p>` },
      { level: 'core', type: 'num', title: 'ATP yield', q: R`<p>Using 2.5 ATP per NADH and 1.5 per FADH₂, and the malate–aspartate shuttle, how many ATP does one glucose yield in total?</p>`, answer: 32, tol: 0.001, unit: '', hints: [R`10 NADH, 2 FADH₂, plus 4 substrate-level.`], solution: R`<p>$25 + 3 + 4 = 32$.</p>` },
      { level: 'core', type: 'num', title: 'RQ of glucose', q: R`<p>What is the RQ for the aerobic respiration of glucose?</p>`, answer: 1, tol: 0.001, unit: '', hints: [R`6 CO₂ per 6 O₂.`], solution: R`<p>1.0.</p>` },
      { level: 'core', type: 'num', title: 'Efficiency', q: R`<p>If 32 ATP are made and each stores 30.5 kJ/mol, what percentage of glucose's 2870 kJ/mol is captured?</p>`, answer: 34.0, tol: 0.01, unit: '%', hints: [R`$32\times30.5/2870$.`], solution: R`<p>$976/2870 = 34\%$; the rest is heat.</p>` },
      { level: 'olympiad', type: 'num', title: 'RQ of oleic acid', q: R`<p>Oleic acid is C₁₈H₃₄O₂. Find its RQ for complete oxidation.</p>`, answer: 0.706, tol: 0.01, unit: '', hints: [R`O₂ needed: $18 + 34/4 - 1$.`], solution: R`<p>$\mathrm{C_{18}H_{34}O_2 + 25.5\,O_2 \to 18\,CO_2 + 17\,H_2O}$; RQ $= 18/25.5 = 0.71$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Palmitate yield', q: R`<p>Palmitate (C16) is activated (cost 2 ATP), then β-oxidation gives 8 acetyl-CoA, 7 NADH and 7 FADH₂. Each acetyl-CoA gives 10 ATP in the Krebs cycle and electron transport. What is the net ATP yield?</p>`, answer: 106, tol: 0.001, unit: '', hints: [R`$80 + 7(2.5) + 7(1.5) - 2$.`], solution: R`<p>$80 + 17.5 + 10.5 - 2 = 106$ ATP: 6.6 per carbon, against 5.3 for glucose.</p>` },
      { level: 'olympiad', type: 'num', title: 'Glucose for a sprint', q: R`<p>A sprinter needs 0.10 mol of ATP from fermentation alone. How many grams of glucose (180 g/mol) are needed?</p>`, answer: 9, tol: 0.005, unit: 'g', hints: [R`2 ATP per glucose.`], solution: R`<p>0.05 mol of glucose, 9.0 g. Aerobically the same ATP would need about 0.56 g.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-respiration', [
    { title: 'Respiratory quotient', gen(r) { const C = r.int(4, 22), H = 2 * C - 2 * r.int(0, 3), O = r.pick([2, 2, 6]); const o2 = C + H / 4 - O / 2; return { q: R`<p>Find the RQ for complete oxidation of C<sub>${C}</sub>H<sub>${H}</sub>O<sub>${O}</sub>.</p>`, answer: C / o2, tol: 0.01, unit: '', solution: R`<p>O₂ needed $= ${C} + ${H}/4 - ${O}/2 = ${f(o2)}$; RQ $= ${C}/${f(o2)} = ${f(C / o2)}$.</p>` }; } },
    { title: 'Fermentation vs aerobic', gen(r) { const g = r.int(5, 200), aer = r.pick([true, false]); const atp = g / 180 * (aer ? 32 : 2); return { q: R`<p>How many moles of ATP does ${g} g of glucose (180 g/mol) yield by ${aer ? 'aerobic respiration (32 ATP per glucose)' : 'fermentation (2 ATP per glucose)'}?</p>`, answer: atp, tol: 0.005, unit: 'mol', solution: R`<p>$${g}/180\times${aer ? 32 : 2} = ${f(atp)}$ mol.</p>` }; } },
    { title: 'Respirometer', gen(r) { const o = r.step(0.5, 5, 0.1), q = r.pick([0.7, 0.8, 0.9, 1.0]); const co = o * q; return { q: R`<p>Seeds take up ${f(o)} cm³ of O₂ and give out ${f(co)} cm³ of CO₂ in an hour. What is their RQ?</p>`, answer: q, tol: 0.01, unit: '', solution: R`<p>$${f(co)}/${f(o)} = ${q}$${q < 0.8 ? ': probably respiring fat' : q === 1 ? ': carbohydrate' : ''}.</p>` }; } }
  ]);
})();
