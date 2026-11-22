(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-homeostasis', subject: 'biology', num: 15, part: 'Physiology',
    title: 'Homeostasis, Hormones and the Kidney',
    subtitle: R`Keeping the internal environment steady. Negative feedback, the endocrine system, blood glucose and diabetes, thermoregulation, and how the kidney filters blood and controls water balance.`,
    goals: ['Explain negative and positive feedback', 'Describe how insulin and glucagon control blood glucose', 'Explain thermoregulation in endotherms', 'Describe ultrafiltration, reabsorption and the loop of Henle', 'Calculate clearance and filtration rates'],
    sections: [
      {
        title: 'Feedback and hormones',
        html: R`
<p><strong>Homeostasis</strong> keeps conditions such as temperature, glucose, water potential and pH within narrow limits. Most control uses <strong>negative feedback</strong>: a receptor detects a change, a coordinator (often the hypothalamus) compares it with a set point, and effectors reverse the change. <strong>Positive feedback</strong> amplifies a change and is used for one-off events: oxytocin in childbirth, blood clotting, the rising phase of an action potential.</p>
<p><strong>Hormones</strong> are chemical messengers secreted into the blood by endocrine glands and acting on target cells with specific receptors.</p>
<ul>
<li><strong>Peptide hormones</strong> (insulin, glucagon, ADH) cannot cross membranes. They bind surface receptors and act through second messengers such as cAMP, triggering enzyme cascades that amplify the signal enormously.</li>
<li><strong>Steroid hormones</strong> (oestrogen, testosterone, cortisol) are lipid-soluble. They enter cells, bind receptors in the cytoplasm or nucleus and act directly as transcription factors.</li>
</ul>
<p>The hypothalamus controls the pituitary, the "master gland", which in turn controls the thyroid, adrenal cortex and gonads.</p>`
      },
      {
        title: 'Blood glucose',
        html: R`
<p>Blood glucose is held near 4–6 mmol/L (about 0.9 g/L). The <strong>islets of Langerhans</strong> in the pancreas sense it directly:</p>
<ul>
<li>Glucose high → <strong>β-cells</strong> secrete <strong>insulin</strong> → muscle and fat cells insert GLUT4 transporters and take up glucose; the liver converts glucose to glycogen (glycogenesis); respiration and fat synthesis increase.</li>
<li>Glucose low → <strong>α-cells</strong> secrete <strong>glucagon</strong> → the liver breaks down glycogen (glycogenolysis) and makes glucose from amino acids and glycerol (gluconeogenesis).</li>
<li><strong>Adrenaline</strong> also raises glucose for fight or flight, through cAMP in liver cells.</li>
</ul>
<p><strong>Type 1 diabetes</strong> is autoimmune destruction of β-cells: no insulin, treated with insulin injections. <strong>Type 2 diabetes</strong> is insulin resistance, often with obesity, later with failing β-cells; it is treated by diet, exercise and drugs such as metformin. An <strong>oral glucose tolerance test</strong> measures blood glucose 2 hours after a 75 g glucose drink: below 7.8 mmol/L is normal, 11.1 or more indicates diabetes.</p>`
      },
      {
        title: 'Temperature',
        html: R`
<p>Endotherms (mammals and birds) generate heat by metabolism and keep their core temperature steady; ectotherms rely mostly on behaviour. The hypothalamus compares blood temperature with a set point of about 37 °C.</p>
<div class="table-wrap"><table><thead><tr><th>Too hot</th><th>Too cold</th></tr></thead><tbody>
<tr><td>vasodilation of skin arterioles</td><td>vasoconstriction</td></tr>
<tr><td>sweating (evaporation removes 2.4 kJ/g)</td><td>shivering</td></tr>
<tr><td>hairs lie flat</td><td>hairs erect (trapped air insulates)</td></tr>
<tr><td>lower metabolic rate</td><td>thyroxine and adrenaline raise metabolism; brown fat</td></tr>
</tbody></table></div>
<p>Heat loss scales with surface area and heat production with mass, so small animals lose heat fast relative to their size: a shrew must eat about its own body mass in food each day. Metabolic rate across species scales roughly as $M^{3/4}$ (Kleiber's law).</p>`
      },
      {
        title: 'The kidney',
        html: R`
<p>Each kidney has about a million <strong>nephrons</strong>.</p>
<ol>
<li><strong>Ultrafiltration</strong> in the glomerulus: high blood pressure (the efferent arteriole is narrower than the afferent) forces water and small solutes through the capillary wall and basement membrane into Bowman's capsule. Cells and proteins stay in the blood. The <strong>glomerular filtration rate</strong> (GFR) is about 125 mL/min, 180 L per day.</li>
<li><strong>Selective reabsorption</strong> in the proximal convoluted tubule: all glucose and amino acids, most Na⁺ and about two-thirds of the water return to the blood, using microvilli, many mitochondria and co-transport with Na⁺. Glucose appears in urine only if its concentration exceeds the carriers' capacity, as in untreated diabetes.</li>
<li>The <strong>loop of Henle</strong> is a countercurrent multiplier: the ascending limb pumps Na⁺ and Cl⁻ out but is impermeable to water, making the medulla very salty. Desert rodents with long loops can make urine over 20 times as concentrated as blood plasma.</li>
<li>In the <strong>collecting duct</strong>, <strong>ADH</strong> from the posterior pituitary inserts aquaporins. When you are dehydrated, more ADH is released, water leaves the duct into the salty medulla, and urine is small and concentrated.</li>
</ol>
<p>The <strong>clearance</strong> of a substance is the volume of plasma cleared of it per minute:</p>
$$C = \frac{U \times V}{P},$$
<p>with $U$ the urine concentration, $V$ the urine flow rate and $P$ the plasma concentration. Inulin is filtered but neither reabsorbed nor secreted, so its clearance equals the GFR.</p>`
      }
    ],
    labs: [
      { sim: 'glucose', title: 'Glucose tolerance test', desc: 'A simplified model of blood glucose and insulin after a sugary drink. Reduce insulin sensitivity or secretion to model the two types of diabetes.',
        tasks: ['With normal settings, when does glucose peak and is it back to normal by 2 hours?', 'Reduce insulin secretion to 10% (type 1). What happens to the 2-hour value?', 'Reduce insulin sensitivity to 30% but keep secretion normal (early type 2). How does the insulin curve compare with normal?'] }
    ],
    formulas: [
      ['Clearance', R`C = \dfrac{U V}{P}`],
      ['GFR from inulin', R`\text{GFR} = C_{\text{inulin}}`],
      ['Filtered load', R`\text{GFR}\times P`],
      ['Kleiber\'s law', R`B \propto M^{3/4}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Positive feedback', q: R`<p>Which is an example of positive feedback?</p>`, options: ['Sweating when hot', 'Insulin release after a meal', 'Oxytocin release during childbirth', 'ADH release when dehydrated'], answer: 2, hints: [R`Which response amplifies the change?`], solution: R`<p>Contractions stimulate more oxytocin, which strengthens contractions until birth.</p>` },
      { level: 'concept', type: 'mcq', title: 'ADH', q: R`<p>A person is dehydrated. What happens?</p>`, options: ['Less ADH; dilute urine', 'More ADH; collecting ducts more permeable to water', 'More ADH; glomerular filtration stops', 'Less ADH; more aquaporins'], answer: 1, hints: [R`ADH saves water.`], solution: R`<p>More ADH inserts aquaporins, so more water is reabsorbed.</p>` },
      { level: 'concept', type: 'mcq', title: 'Steroid action', q: R`<p>How do steroid hormones act on their target cells?</p>`, options: ['Bind surface receptors and make cAMP', 'Enter the cell and act with receptors as transcription factors', 'Open ion channels', 'They do not need receptors'], answer: 1, hints: [R`They are lipid-soluble.`], solution: R`<p>They cross the membrane and regulate gene transcription.</p>` },
      { level: 'core', type: 'num', title: 'Daily filtrate', q: R`<p>GFR is 125 mL/min. How many litres of filtrate are formed per day?</p>`, answer: 180, tol: 0.002, unit: 'L', hints: [R`× 1440 minutes.`], solution: R`<p>180 L, of which about 1.5 L becomes urine: 99% is reabsorbed.</p>` },
      { level: 'core', type: 'num', title: 'Inulin clearance', q: R`<p>Inulin is 0.5 mg/mL in plasma and 60 mg/mL in urine; urine flow is 1.0 mL/min. What is the GFR, in mL/min?</p>`, answer: 120, tol: 0.002, unit: 'mL/min', hints: [R`$UV/P$.`], solution: R`<p>$60\times1/0.5 = 120$ mL/min.</p>` },
      { level: 'core', type: 'num', title: 'Urea clearance', q: R`<p>Urea: plasma 0.25 mg/mL, urine 9 mg/mL, flow 2 mL/min. What is its clearance, in mL/min?</p>`, answer: 72, tol: 0.002, unit: 'mL/min', hints: [R`$UV/P$.`], solution: R`<p>72 mL/min, less than GFR: some urea is reabsorbed.</p>` },
      { level: 'core', type: 'num', title: 'Fraction reabsorbed', q: R`<p>GFR is 125 mL/min and urine flow 1.25 mL/min. What percentage of filtered water is reabsorbed?</p>`, answer: 99, tol: 0.002, unit: '%', hints: [R`1 − 1.25/125.`], solution: R`<p>99%.</p>` },
      { level: 'core', type: 'num', title: 'Sweat cooling', q: R`<p>A 70 kg person (specific heat 3.5 kJ kg⁻¹ K⁻¹) produces 400 kJ of excess heat. How many grams of sweat must evaporate (2.4 kJ/g) to stop the body warming?</p>`, answer: 166.7, tol: 0.005, unit: 'g', hints: [R`400/2.4.`], solution: R`<p>167 g. Without it, the body would warm by $400/(70\times3.5) = 1.6$ K.</p>` },
      { level: 'olympiad', type: 'num', title: 'Glucose threshold', q: R`<p>The tubules can reabsorb at most 375 mg of glucose per minute. With GFR 125 mL/min, above what plasma glucose concentration (in mg/mL) does glucose appear in urine?</p>`, answer: 3, tol: 0.002, unit: 'mg/mL', hints: [R`Filtered load = GFR × P.`], solution: R`<p>$375/125 = 3$ mg/mL (about 17 mmol/L). In reality nephrons vary, so glucose starts to spill at about 10 mmol/L.</p>` },
      { level: 'olympiad', type: 'num', title: 'Kleiber scaling', q: R`<p>Metabolic rate scales as $M^{3/4}$. A 4 t elephant and a 40 g mouse: how many times greater is the mouse's metabolic rate per kilogram?</p>`, answer: 17.78, tol: 0.01, unit: '×', hints: [R`Per kg scales as $M^{-1/4}$; mass ratio $10^5$.`], solution: R`<p>$(10^5)^{1/4} = 17.8$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Secretion', q: R`<p>Penicillin has clearance 500 mL/min while GFR is 125 mL/min. How much penicillin per minute is secreted into the tubules if its plasma concentration is 0.01 mg/mL? Assume none is reabsorbed. Answer in mg/min.</p>`, answer: 3.75, tol: 0.005, unit: 'mg/min', hints: [R`Excreted − filtered.`], solution: R`<p>Excreted $= 500\times0.01 = 5$ mg/min; filtered $= 1.25$ mg/min; secreted 3.75 mg/min. Clearance above GFR always means secretion.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-homeostasis', [
    { title: 'Renal clearance', gen(r) { const P = r.step(0.05, 2, 0.05), U = r.int(2, 150), V = r.step(0.5, 5, 0.1); const C = U * V / P; return { q: R`<p>A substance is ${f(P)} mg/mL in plasma and ${U} mg/mL in urine, with urine flow ${f(V)} mL/min. What is its clearance, in mL/min?</p>`, answer: C, tol: 0.005, unit: 'mL/min', solution: R`<p>$${U}\times${f(V)}/${f(P)} = ${f(C)}$ mL/min.</p>` }; } },
    { title: 'Filtered load', gen(r) { const g = r.int(80, 160), P = r.step(0.5, 4, 0.1); return { q: R`<p>GFR is ${g} mL/min and plasma glucose ${f(P)} mg/mL. How much glucose is filtered per minute, in mg?</p>`, answer: g * P, tol: 0.005, unit: 'mg/min', solution: R`<p>$${g}\times${f(P)} = ${f(g * P)}$ mg/min.</p>` }; } },
    { title: 'Metabolic scaling', gen(r) { const a = r.pick([0.02, 0.3, 4, 70, 600]), b = r.pick([0.01, 1, 20, 500, 4000]); if (a === b) return this.gen(PB.rng(r.int(1, 1e9))); const v = Math.pow(b / a, 0.75); return { q: R`<p>With metabolic rate $\propto M^{3/4}$, how many times greater is the total metabolic rate of a ${b} kg animal than a ${a} kg animal?</p>`, answer: v, tol: 0.01, unit: '×', solution: R`<p>$(${b}/${a})^{0.75} = ${f(v)}$.</p>` }; } }
  ]);
})();
