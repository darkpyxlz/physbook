(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  PB.addChapter({
    id: 'bio-digestion', subject: 'biology', num: 25, part: 'Physiology',
    title: 'Animal Nutrition and Digestion',
    subtitle: R`From food to fuel. Nutrients and energy balance, the digestive tract and its enzymes, absorption across the gut wall, the liver, hormonal control of digestion, and adaptations of herbivores and carnivores.`,
    goals: ['List the main nutrient classes and their roles', 'Trace digestion of carbohydrate, protein and fat with the enzymes involved', 'Explain how the small intestine is adapted for absorption', 'Describe the hormonal control of digestion', 'Calculate energy balance and BMR', 'Compare digestive adaptations of carnivores, herbivores and ruminants'],
    sections: [
      {
        title: 'Nutrients and energy',
        html: R`
<p>Animals need energy (from carbohydrate, fat and protein: about 17, 38 and 17 kJ/g), building materials, and <strong>essential nutrients</strong> they cannot make: 9 essential amino acids (for humans), essential fatty acids (linoleic acid), vitamins (water-soluble B and C; fat-soluble A, D, E, K) and minerals (Ca, Fe, I…).</p>
<p>Daily energy use is the <strong>basal metabolic rate</strong> (BMR) times an activity factor. A common estimate (Mifflin–St Jeor) for adults is</p>
$$\text{BMR} = 10m + 6.25h - 5a + s\quad\text{kcal/day},$$
<p>with mass $m$ in kg, height $h$ in cm, age $a$ in years, and $s = +5$ for men or $-161$ for women (1 kcal = 4.184 kJ). Eating more than you use stores the excess, mostly as fat at about 32 MJ per kg of adipose tissue.</p>`
      },
      {
        title: 'Digestion',
        html: R`
<div class="table-wrap"><table><thead><tr><th>Region</th><th>Enzyme</th><th>Substrate → products</th><th>pH</th></tr></thead><tbody>
<tr><td>Mouth</td><td>salivary amylase</td><td>starch → maltose</td><td>~7</td></tr>
<tr><td>Stomach</td><td>pepsin (from pepsinogen, activated by HCl)</td><td>proteins → polypeptides</td><td>~2</td></tr>
<tr><td>Small intestine (pancreas)</td><td>pancreatic amylase, trypsin, chymotrypsin, lipase</td><td>starch → maltose; polypeptides → peptides; triglycerides → fatty acids + monoglycerides</td><td>~8</td></tr>
<tr><td>Small intestine (brush border)</td><td>maltase, sucrase, lactase, dipeptidases</td><td>disaccharides → monosaccharides; peptides → amino acids</td><td>~8</td></tr>
</tbody></table></div>
<p>Proteases are made as inactive precursors (pepsinogen, trypsinogen) so they do not digest the cells that make them; enteropeptidase activates trypsin, which activates the rest. <strong>Bile</strong> from the liver, stored in the gall bladder, emulsifies fat into small droplets, greatly increasing the surface for lipase. Lactose intolerance is the normal mammalian loss of lactase after weaning; lactase persistence evolved in dairying populations.</p>`
      },
      {
        title: 'Absorption',
        html: R`
<p>The small intestine has an enormous absorbing surface: circular folds (×3), finger-like <strong>villi</strong> (×10) and <strong>microvilli</strong> on each epithelial cell (×20) multiply the area of a simple tube about 600-fold, to around 30 m² in humans (older figures of 200–300 m² overestimated it).</p>
<p>Glucose and galactose enter cells by <strong>Na⁺–glucose co-transport</strong> (SGLT1), driven by the Na⁺ gradient that the Na⁺/K⁺ pump maintains; fructose enters by facilitated diffusion. Amino acids use similar co-transporters. Fatty acids and monoglycerides diffuse into cells, are rebuilt into triglycerides, packed into <strong>chylomicrons</strong> and released into the lymphatic lacteals. Sugars and amino acids go via the hepatic portal vein to the liver first.</p>
<p>Oral rehydration solution, which has saved millions of lives from cholera, works because glucose drives Na⁺ and therefore water uptake through SGLT1 even when other gut transport is disrupted.</p>`
      },
      {
        title: 'The liver and hormonal control',
        html: R`
<p>The <strong>liver</strong> stores glycogen, makes plasma proteins, deaminates excess amino acids (making urea via the ornithine cycle), detoxifies drugs and alcohol, makes bile and stores iron and vitamins A, D and B₁₂.</p>
<p>Digestion is coordinated by nerves and hormones:</p>
<ul>
<li><strong>Gastrin</strong> (stomach): stimulates acid secretion when food arrives.</li>
<li><strong>Secretin</strong> (duodenum): released when acid enters the duodenum; stimulates the pancreas to secrete hydrogencarbonate. Discovered by Bayliss and Starling in 1902, it was the first hormone identified.</li>
<li><strong>Cholecystokinin (CCK)</strong>: released by fat and protein; stimulates pancreatic enzymes and gall-bladder contraction, and signals satiety.</li>
<li><strong>Leptin</strong> from fat tissue and <strong>ghrelin</strong> from the empty stomach regulate appetite through the hypothalamus.</li>
</ul>`
      },
      {
        title: 'Diet and gut design',
        html: R`
<p>Carnivores have short guts, sharp teeth and strong acid. Herbivores face indigestible cellulose and rely on microbes: <strong>ruminants</strong> (cows, sheep) ferment plant material in a four-chambered stomach (rumen, reticulum, omasum, abomasum), chewing the cud again; microbes break cellulose into volatile fatty acids that the animal absorbs, and are themselves digested as protein. Hindgut fermenters (horses, rabbits) ferment in a large caecum; rabbits eat their own soft faeces to recover nutrients. Ruminants release methane, a significant greenhouse gas.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Energy balance', desc: 'Body mass over a year for a given daily intake and activity, using the Mifflin–St Jeor BMR, which itself falls as you lose weight (adaptive feedback).',
        tasks: ['Find the intake that keeps a 70 kg, 175 cm, 30-year-old man at constant mass with moderate activity.', 'Cut intake by 500 kcal/day. Why does weight loss slow over time?', 'Compare the effect of 30 minutes of running a day with a 300 kcal cut in intake.'],
        params: { controls: [S('m0', 'Starting mass', 40, 150, 1, 80, 'kg'), S('h', 'Height', 140, 210, 1, 175, 'cm'), S('a', 'Age', 15, 80, 1, 30, 'years'), { type: 'select', id: 'sex', label: 'Sex', value: '5', options: [['5', 'Male'], ['-161', 'Female']] }, S('act', 'Activity factor', 1.2, 1.9, 0.05, 1.5), S('kcal', 'Daily intake', 1200, 4000, 10, 2400, 'kcal')],
          init: (v) => { v.bmr = (m) => 10 * m + 6.25 * v.h - 5 * v.a + +v.sex; v.sim = () => { let m = v.m0; const out = [m]; for (let d = 1; d <= 365; d++) { m += (v.kcal - v.bmr(m) * v.act) * 4.184 / 32000; out.push(m); } return out; }; },
          plots: [{ x: [0, 365], y: 'auto', zero: false, xlabel: 'days', ylabel: 'body mass (kg)', curves: (v) => { const s = v.sim(); return [{ f: (d) => s[Math.round(d)] }]; } }],
          readout: (v) => { const s = v.sim(); return [['BMR now', f(v.bmr(v.m0)) + ' kcal/day'], ['energy needs now', f(v.bmr(v.m0) * v.act) + ' kcal/day'], ['mass after 1 year', f(s[365]) + ' kg'], ['equilibrium mass', f((v.kcal / v.act - 6.25 * v.h + 5 * v.a - +v.sex) / 10) + ' kg']]; } } },
      { sim: 'explore', title: 'Building an absorbing surface', desc: 'How folds, villi and microvilli multiply the absorbing area of a simple tube (small intestine 6 m long, 2.5 cm across).',
        tasks: ['What total area do the default factors give?', 'Coeliac disease flattens the villi. How much area is lost?', 'Why is a folded surface better than a longer gut?'],
        params: { controls: [S('fo', 'Circular folds factor', 1, 5, 0.1, 3), S('vi', 'Villi factor', 1, 15, 0.5, 10), S('mv', 'Microvilli factor', 1, 30, 1, 20)],
          draw: (ctx, C, v, b, U) => { const base = Math.PI * 0.025 * 6; const items = [['tube', base], ['+ folds', base * v.fo], ['+ villi', base * v.fo * v.vi], ['+ microvilli', base * v.fo * v.vi * v.mv]]; const pb = { x: b.x + 50, y: b.y + 18, w: b.w - 66, h: b.h - 50 }; const m = U.frame(ctx, C, pb, [0, 4], [-1, 3], { xticks: [], ylabel: 'log₁₀ area (m²)', ny: 4 }); items.forEach((it, i) => { const x = pb.x + (i + 0.18) * pb.w / 4, w = pb.w / 4 * 0.64, y = Math.log10(it[1]); ctx.fillStyle = [C.ink3, C.teal, C.accent, C.rust][i]; ctx.fillRect(x, m.Y(y), w, m.Y(-1) - m.Y(y)); U.text(ctx, it[0], x + w / 2, pb.y + pb.h + 14, C.ink, U.ui(11, 700), 'center'); U.text(ctx, PB.fmt(it[1], 3) + ' m²', x + w / 2, m.Y(y) - 5, C.ink2, U.mono(10), 'center'); }); },
          picFrac: 1,
          readout: (v) => [['tube area', f(Math.PI * 0.025 * 6) + ' m²'], ['total area', f(Math.PI * 0.025 * 6 * v.fo * v.vi * v.mv) + ' m²'], ['amplification', f(v.fo * v.vi * v.mv) + '×']] } }
    ],
    formulas: [
      ['Mifflin–St Jeor BMR', R`10m + 6.25h - 5a + s\ \ \text{kcal/day}`],
      ['Energy content', R`\text{fat}\ 38,\ \text{carbohydrate}\ 17,\ \text{protein}\ 17\ \text{kJ/g}`],
      ['Adipose tissue', R`\approx 32\ \text{MJ/kg}`],
      ['Surface amplification', R`A = A_0\times f_{\text{folds}}\times f_{\text{villi}}\times f_{\text{microvilli}}`],
      ['Kilocalorie', R`1\ \text{kcal} = 4.184\ \text{kJ}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Bile', q: R`<p>What does bile do?</p>`, options: ['Digests protein', 'Emulsifies fat, increasing the surface for lipase', 'Absorbs glucose', 'Produces acid'], answer: 1, hints: [R`It has no enzymes.`], solution: R`<p>Bile salts emulsify fats.</p>` },
      { level: 'concept', type: 'mcq', title: 'Secretin', q: R`<p>Secretin is released when…</p>`, options: ['Food enters the mouth', 'Acidic chyme enters the duodenum', 'Blood glucose rises', 'The stomach is empty'], answer: 1, hints: [R`It triggers bicarbonate release.`], solution: R`<p>Acid in the duodenum.</p>` },
      { level: 'concept', type: 'mcq', title: 'Fat absorption', q: R`<p>Absorbed fats first enter…</p>`, options: ['The hepatic portal vein', 'Lacteals (lymphatic vessels) as chylomicrons', 'The stomach wall', 'The kidneys'], answer: 1, hints: [R`Chylomicrons are too big for capillaries.`], solution: R`<p>Lacteals.</p>` },
      { level: 'core', type: 'num', title: 'BMR', q: R`<p>Find the BMR (kcal/day) of a 60 kg, 165 cm, 25-year-old woman using Mifflin–St Jeor.</p>`, answer: 10 * 60 + 6.25 * 165 - 5 * 25 - 161, tol: 0.005, unit: 'kcal/day', hints: [R`s = −161.`], solution: R`<p>${f(10 * 60 + 6.25 * 165 - 5 * 25 - 161)} kcal/day.</p>` },
      { level: 'core', type: 'num', title: 'Energy in food', q: R`<p>A snack has 12 g fat, 30 g carbohydrate and 5 g protein. How many kJ does it provide?</p>`, answer: 12 * 38 + 30 * 17 + 5 * 17, tol: 0.005, unit: 'kJ', hints: [R`38, 17, 17 kJ/g.`], solution: R`<p>${12 * 38 + 30 * 17 + 5 * 17} kJ.</p>` },
      { level: 'core', type: 'num', title: 'Weight loss', q: R`<p>A daily deficit of 500 kcal is maintained for 30 days. How many kg of adipose tissue (32 MJ/kg) are lost?</p>`, answer: 500 * 4.184 * 30 / 32000, tol: 0.01, unit: 'kg', hints: [R`Convert to kJ.`], solution: R`<p>${f(500 * 4.184 * 30 / 32000)} kg.</p>` },
      { level: 'core', type: 'num', title: 'Absorbing area', q: R`<p>A tube of 6 m length and 2.5 cm diameter is amplified ×3 by folds, ×10 by villi and ×20 by microvilli. What is the total area, in m²?</p>`, answer: Math.PI * 0.025 * 6 * 600, tol: 0.005, unit: 'm²', hints: [R`$\pi dL\times600$.`], solution: R`<p>${f(Math.PI * 0.025 * 6 * 600)} m².</p>` },
      { level: 'core', type: 'num', title: 'Pepsin pH', q: R`<p>Stomach acid is 0.10 mol/L HCl. What is its pH?</p>`, answer: 1, tol: 0.005, unit: '', hints: [R`Strong acid.`], solution: R`<p>pH 1.</p>` },
      { level: 'core', type: 'num', title: 'Urea from protein', q: R`<p>Protein is 16% nitrogen by mass. If 80 g of protein a day is fully deaminated, how many grams of urea (CO(NH₂)₂, 46.7% N) are excreted?</p>`, answer: 80 * 0.16 / 0.4665, tol: 0.01, unit: 'g', hints: [R`Mass of N / fraction of N in urea.`], solution: R`<p>12.8 g N → ${f(80 * 0.16 / 0.4665)} g urea.</p>` },
      { level: 'olympiad', type: 'num', title: 'Equilibrium weight', q: R`<p>A 40-year-old man, 180 cm tall, eats 2600 kcal/day with activity factor 1.4. Using Mifflin–St Jeor, at what mass does he reach energy balance?</p>`, answer: (2600 / 1.4 - 6.25 * 180 + 5 * 40 - 5) / 10, tol: 0.005, unit: 'kg', hints: [R`Solve $1.4\times\text{BMR}(m) = 2600$.`], solution: R`<p>BMR must be 1857 kcal: $m = ${f((2600 / 1.4 - 6.25 * 180 + 5 * 40 - 5) / 10)}$ kg.</p>` },
      { level: 'olympiad', type: 'num', title: 'Rumen methane', q: R`<p>A cow loses about 6% of its 250 MJ daily gross energy intake as methane (890 kJ/mol). How many kg of CH₄ per day?</p>`, answer: 250000 * 0.06 / 890 * 16 / 1000, tol: 0.01, unit: 'kg', hints: [R`Energy / molar enthalpy × 16 g/mol.`], solution: R`<p>${f(250000 * 0.06 / 890 * 16 / 1000)} kg/day.</p>` },
      { level: 'olympiad', type: 'num', title: 'ORS sodium', q: R`<p>SGLT1 moves 2 Na⁺ per glucose. If 90 g of glucose (180 g/mol) is absorbed, how many grams of Na⁺ (23 g/mol) are co-transported?</p>`, answer: 90 / 180 * 2 * 23, tol: 0.005, unit: 'g', hints: [R`Moles glucose × 2.`], solution: R`<p>${f(90 / 180 * 2 * 23)} g; water follows osmotically.</p>` }
    ]
  });
  PB.addDrills('bio-digestion', [
    { title: 'Food energy', gen(r) { const fa = r.int(1, 40), c = r.int(0, 80), p = r.int(0, 40); return { q: R`<p>How many kJ are in food with ${fa} g fat, ${c} g carbohydrate and ${p} g protein (38, 17, 17 kJ/g)?</p>`, answer: fa * 38 + c * 17 + p * 17, tol: 0.005, unit: 'kJ', solution: R`<p>${fa * 38 + c * 17 + p * 17} kJ.</p>` }; } },
    { title: 'BMR estimate', gen(r) { const m = r.int(45, 120), h = r.int(150, 200), a = r.int(18, 75), sx = r.pick([[5, 'man'], [-161, 'woman']]); return { q: R`<p>Estimate the BMR of a ${a}-year-old ${sx[1]} of ${m} kg and ${h} cm (Mifflin–St Jeor), in kcal/day.</p>`, answer: 10 * m + 6.25 * h - 5 * a + sx[0], tol: 0.005, unit: 'kcal/day', solution: R`<p>${f(10 * m + 6.25 * h - 5 * a + sx[0])} kcal/day.</p>` }; } },
    { title: 'Fat from surplus', gen(r) { const s = r.int(100, 800), d = r.int(7, 120); return { q: R`<p>A surplus of ${s} kcal/day for ${d} days is stored as adipose tissue (32 MJ/kg). How many kg is that?</p>`, answer: s * d * 4.184 / 32000, tol: 0.01, unit: 'kg', solution: R`<p>${f(s * d * 4.184 / 32000)} kg.</p>` }; } }
  ]);
})();
