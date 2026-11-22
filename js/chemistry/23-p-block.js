(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  // Haber equilibrium: mole fraction of NH3 from a 1:3 N2:H2 feed at total pressure P (bar), Kp(T) from ΔH, ΔS.
  const haberX = (T, P) => { const Kp = Math.exp(-(-92200 - T * -198.7) / (8.314 * T)); let lo = 0, hi = 0.9999; for (let i = 0; i < 80; i++) { const x = (lo + hi) / 2, n = 4 - 2 * x, yN = (1 - x) / n, yH = (3 - 3 * x) / n, yA = 2 * x / n; const Q = (yA * yA) / (yN * Math.pow(yH, 3) * P * P); if (Q < Kp) lo = x; else hi = x; } const x = (lo + hi) / 2; return 2 * x / (4 - 2 * x); };
  PB.addChapter({
    id: 'chem-pblock', subject: 'chemistry', num: 23, part: 'Inorganic Chemistry',
    title: 'The p-Block: Groups 13 to 15',
    subtitle: R`Boron, aluminium, carbon, silicon, nitrogen and phosphorus. Electron deficiency and Lewis acidity, three-centre bonds, allotropes, silicates, the inert-pair effect, and the industrial chemistry of nitrogen.`,
    goals: ['Explain electron deficiency in boron compounds, including 3-centre 2-electron bonds', 'Describe the amphoteric chemistry of aluminium', 'Compare carbon and silicon, and classify silicate structures', 'Explain the inert-pair effect down groups 13–15', 'Describe the Haber and Ostwald processes and the oxides of nitrogen'],
    sections: [
      {
        title: 'Boron and aluminium',
        html: R`
<p>Group 13 atoms have three valence electrons, so compounds like BF₃ and BCl₃ have only six electrons around boron: they are <strong>electron deficient</strong>, planar and strong <strong>Lewis acids</strong> that accept a lone pair ($\mathrm{BF_3 + NH_3 \to F_3B{-}NH_3}$).</p>
<p>Boron hydrides cannot have ordinary two-electron bonds everywhere. Diborane, B₂H₆, has two bridging hydrogens, each held by a <strong>three-centre two-electron bond</strong> (B–H–B). Boron also forms boric acid, B(OH)₃, a weak Lewis acid that accepts OH⁻ rather than donating H⁺.</p>
<p>Aluminium is a reactive metal protected by a thin, tough oxide layer, thickened by anodising. Al₂O₃ and Al(OH)₃ are <strong>amphoteric</strong>: $\mathrm{Al(OH)_3 + 3H^+ \to Al^{3+} + 3H_2O}$ and $\mathrm{Al(OH)_3 + OH^- \to [Al(OH)_4]^-}$. Aluminium chloride is a covalent dimer, Al₂Cl₆, in the vapour, a Lewis acid used as a Friedel–Crafts catalyst. Aluminium is extracted by electrolysis of alumina dissolved in molten cryolite (Hall–Héroult), using about 13 kWh per kilogram.</p>`
      },
      {
        title: 'Carbon and silicon',
        html: R`
<p>Carbon forms strong C–C and C=C bonds and so catenates endlessly: this is why organic chemistry exists. Its allotropes include diamond (sp³, hardest natural material, insulator), graphite (sp² layers, conducts along the layers), fullerenes such as C₆₀ and graphene.</p>
<p>Silicon is larger and makes weak π bonds, so it forms no stable Si=O double bonds: SiO₂ is a giant network of SiO₄ tetrahedra, whereas CO₂ is a gas of O=C=O molecules. Silicon also has accessible empty orbitals, so SiCl₄ hydrolyses violently in water while CCl₄ does not.</p>
<p><strong>Silicates</strong>, the bulk of Earth's crust, are built from SiO₄⁴⁻ tetrahedra sharing corners. The more corners shared, the more condensed the structure and the lower the charge per silicon:</p>
<div class="table-wrap"><table><thead><tr><th>Corners shared</th><th>Unit</th><th>Structure</th><th>Example</th></tr></thead><tbody>
<tr><td>0</td><td>SiO₄⁴⁻</td><td>isolated tetrahedra</td><td>olivine</td></tr>
<tr><td>2</td><td>(SiO₃)ₙ²ⁿ⁻</td><td>chains or rings</td><td>pyroxenes, beryl</td></tr>
<tr><td>3</td><td>(Si₂O₅)ₙ²ⁿ⁻</td><td>sheets</td><td>mica, clays, talc</td></tr>
<tr><td>4</td><td>SiO₂</td><td>3D framework</td><td>quartz; with Al, feldspars and zeolites</td></tr>
</tbody></table></div>`
      },
      {
        title: 'The inert-pair effect',
        html: R`
<p>Down groups 13–15 the lower oxidation state, two below the group maximum, becomes more stable: thallium prefers Tl⁺ to Tl³⁺, lead Pb²⁺ to Pb⁴⁺, bismuth Bi³⁺ to Bi⁵⁺. The heavy atoms' ns² electrons are held tightly (poor shielding by d and f electrons and relativistic contraction), and the energy gained by forming two extra bonds no longer pays for removing them. So PbO₂ is a strong oxidising agent (used in lead–acid batteries), while CO₂ and SiO₂ are not.</p>`
      },
      {
        title: 'Nitrogen and phosphorus',
        html: R`
<p>The N≡N triple bond (945 kJ/mol) makes nitrogen gas very unreactive. The <strong>Haber process</strong> fixes it: $\mathrm{N_2 + 3H_2 \rightleftharpoons 2NH_3}$, ΔH° = −92 kJ/mol. Le Chatelier favours low temperature and high pressure, but low temperature is too slow, so the compromise is about 400–450 °C, 150–250 bar and an iron catalyst, with unreacted gas recycled. About half of the nitrogen in your body passed through a Haber plant.</p>
<p>The <strong>Ostwald process</strong> makes nitric acid: ammonia is oxidised over platinum to NO, then to NO₂, which is absorbed in water. Nitrogen shows every oxidation state from −3 (NH₃) to +5 (HNO₃); NO and NO₂ from engines form photochemical smog and acid rain.</p>
<p>Phosphorus forms white P₄ (tetrahedral, strained, catches fire in air) and polymeric red phosphorus. Burning gives P₄O₁₀, which reacts with water to give phosphoric acid H₃PO₄, a triprotic acid used in fertilisers and food.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'The Haber compromise', desc: 'Equilibrium mole fraction of NH₃ from a 1 : 3 N₂ : H₂ feed against temperature, at several pressures. Kp comes from ΔH° = −92.2 kJ/mol and ΔS° = −198.7 J/mol K.',
        tasks: ['What equilibrium yield would 300 K give? Why is it not used?', 'At 700 K, how much does going from 50 to 250 bar help?', 'Why do plants recycle unreacted gas instead of aiming for equilibrium?'],
        params: { controls: [S('T', 'Temperature', 400, 1000, 5, 700, 'K'), S('P', 'Pressure', 1, 400, 1, 200, 'bar')],
          plots: [{ x: [400, 1000], y: [0, 1], xlabel: 'T (K)', ylabel: 'mole fraction NH₃', curves: () => [[10, 'ink3'], [50, 'teal'], [200, 'accent'], [400, 'rust']].map((p) => ({ f: (T) => haberX(T, p[0]), color: p[1], label: p[0] + ' bar' })), pts: (v) => [{ x: v.T, y: haberX(v.T, v.P) }] }],
          readout: (v) => [['Kp', PB.fmt(Math.exp(-(-92200 - v.T * -198.7) / (8.314 * v.T)), 3) + ' bar⁻²'], ['equilibrium NH₃', f(100 * haberX(v.T, v.P)) + '%']] } },
      { sim: 'explore', title: 'Building silicates', desc: 'SiO₄ tetrahedra sharing more corners give more condensed silicates with a lower O : Si ratio and lower negative charge per silicon.',
        tasks: ['Find the formula for sheets (3 shared corners).', 'Replace a quarter of Si⁴⁺ by Al³⁺ in quartz. What cation is needed per Al?', 'Why do clays (sheets) split into flakes and quartz (framework) not?'],
        params: { controls: [S('n', 'Corners shared per tetrahedron', 0, 4, 1, 2)],
          draw: (ctx, C, v, b, U) => { const N = 5, s = Math.min(46, b.w / 8), y = b.y + b.h * 0.45; for (let i = 0; i < N; i++) { const cx = b.x + b.w / 2 + (i - (N - 1) / 2) * s * (v.n >= 2 ? 1.25 : 1.8); const pts = [[cx, y - s * 0.55], [cx - s * 0.5, y + s * 0.3], [cx + s * 0.5, y + s * 0.3]]; ctx.fillStyle = U.alpha(C.accent, 0.25); ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.beginPath(); pts.forEach((p, k) => (k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill(); ctx.stroke(); U.dot(ctx, cx, y, 4, C.ink2); pts.forEach((p) => U.dot(ctx, p[0], p[1], 5, '#d64545')); if (v.n >= 3) U.dot(ctx, cx, y + s * 0.9, 5, '#d64545'); } U.text(ctx, ['isolated tetrahedra', 'pairs (Si₂O₇)', 'chains / rings', 'sheets', '3D framework'][v.n], b.x + b.w / 2, b.y + b.h - 10, C.ink, U.ui(12, 700), 'center'); },
          picFrac: 1,
          readout: (v) => { const O = 4 - v.n / 2, q = 4 - 2 * O; return [['O per Si', f(O)], ['formula unit', ['SiO₄⁴⁻', 'Si₂O₇⁶⁻', '(SiO₃)ₙ²ⁿ⁻', '(Si₂O₅)ₙ²ⁿ⁻', 'SiO₂'][v.n]], ['charge per Si', String(q)], ['example', ['olivine (Mg,Fe)₂SiO₄', 'thortveitite Sc₂Si₂O₇', 'pyroxene MgSiO₃', 'talc, mica, kaolinite', 'quartz, feldspar'][v.n]]]; } } }
    ],
    formulas: [
      ['Haber process', R`\mathrm{N_2 + 3H_2 \rightleftharpoons 2NH_3},\ \Delta H^\circ = -92\ \text{kJ/mol}`],
      ['Amphoteric aluminium', R`\mathrm{Al(OH)_3 + OH^- \to [Al(OH)_4]^-}`],
      ['Silicate O : Si', R`4 - n/2\ \text{for}\ n\ \text{shared corners}`],
      ['Ostwald step 1', R`\mathrm{4NH_3 + 5O_2 \to 4NO + 6H_2O}`],
      ['Phosphoric acid', R`\mathrm{P_4O_{10} + 6H_2O \to 4H_3PO_4}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Lewis acid', q: R`<p>Why is BF₃ a Lewis acid?</p>`, options: ['It donates H⁺', 'Boron has an empty orbital and only six valence electrons', 'Fluorine has lone pairs', 'It is ionic'], answer: 1, hints: [R`Electron deficiency.`], solution: R`<p>Boron can accept a lone pair into its empty p orbital.</p>` },
      { level: 'concept', type: 'mcq', title: 'CO₂ versus SiO₂', q: R`<p>Why is SiO₂ a hard solid while CO₂ is a gas?</p>`, options: ['Si is heavier', 'Si forms weak π bonds, so it makes four single Si–O bonds in a giant network', 'SiO₂ is ionic', 'CO₂ has hydrogen bonds'], answer: 1, hints: [R`Double bonds versus networks.`], solution: R`<p>Silicon prefers four σ bonds to oxygen, linking into a 3D network.</p>` },
      { level: 'concept', type: 'mcq', title: 'Inert pair', q: R`<p>Which is the strongest oxidising agent?</p>`, options: ['CO₂', 'SiO₂', 'SnO₂', 'PbO₂'], answer: 3, hints: [R`+4 is least stable for lead.`], solution: R`<p>PbO₂, because Pb prefers +2.</p>` },
      { level: 'core', type: 'num', title: 'Aluminium electrolysis', q: R`<p>How many coulombs are needed to produce 1.00 kg of aluminium (26.98 g/mol), in units of 10⁷ C?</p>`, answer: 1000 / 26.98 * 3 * 96485 / 1e7, tol: 0.005, unit: '×10⁷ C', hints: [R`3 electrons per Al.`], solution: R`<p>${f(1000 / 26.98 * 3 * 96485 / 1e7)} × 10⁷ C.</p>` },
      { level: 'core', type: 'num', title: 'Energy for aluminium', q: R`<p>At a cell voltage of 4.3 V, how many kWh does that charge represent?</p>`, answer: 1000 / 26.98 * 3 * 96485 * 4.3 / 3.6e6, tol: 0.005, unit: 'kWh', hints: [R`$E = QV$; 1 kWh = 3.6 MJ.`], solution: R`<p>${f(1000 / 26.98 * 3 * 96485 * 4.3 / 3.6e6)} kWh, close to industrial figures.</p>` },
      { level: 'core', type: 'num', title: 'Haber Kp', q: R`<p>Using ΔH° = −92.2 kJ/mol and ΔS° = −198.7 J/mol K, find Kp at 700 K, in units of 10⁻⁵ bar⁻².</p>`, answer: Math.exp(-(-92200 + 700 * 198.7) / (8.314 * 700)) / 1e-5, tol: 0.03, unit: '×10⁻⁵', hints: [R`$\Delta G = \Delta H - T\Delta S$.`], solution: R`<p>ΔG° = ${f((-92200 + 700 * 198.7) / 1000)} kJ/mol; Kp = ${PB.fmt(Math.exp(-(-92200 + 700 * 198.7) / (8.314 * 700)), 3)} bar⁻².</p>` },
      { level: 'core', type: 'num', title: 'Silicate charge', q: R`<p>In a sheet silicate, each SiO₄ shares 3 corners. What is the negative charge per silicon?</p>`, answer: 1, tol: 0.001, unit: '', hints: [R`O : Si = 2.5.`], solution: R`<p>Si₂O₅²⁻: 1− per Si.</p>` },
      { level: 'core', type: 'num', title: 'Nitric acid yield', q: R`<p>Ammonia → nitric acid overall: NH₃ + 2O₂ → HNO₃ + H₂O. How many tonnes of HNO₃ come from 1.00 t of NH₃ at 95% yield?</p>`, answer: 1 / 17.03 * 63.01 * 0.95, tol: 0.005, unit: 't', hints: [R`1 : 1 molar.`], solution: R`<p>${f(1 / 17.03 * 63.01 * 0.95)} t.</p>` },
      { level: 'core', type: 'num', title: 'Phosphoric acid', q: R`<p>What mass of H₃PO₄ (98.00 g/mol) forms from 10.0 g of P₄O₁₀ (283.9 g/mol) with excess water?</p>`, answer: 10 / 283.9 * 4 * 98, tol: 0.005, unit: 'g', hints: [R`4 H₃PO₄ per P₄O₁₀.`], solution: R`<p>${f(10 / 283.9 * 4 * 98)} g.</p>` },
      { level: 'olympiad', type: 'num', title: 'Diborane bonding', q: R`<p>B₂H₆ has 12 valence electrons. Four terminal B–H bonds use 8. How many three-centre B–H–B bonds hold the rest, each with 2 electrons?</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`4 electrons remain.`], solution: R`<p>Two banana bonds.</p>` },
      { level: 'olympiad', type: 'num', title: 'Haber yield', q: R`<p>At 700 K and 200 bar, what equilibrium mole fraction of NH₃ (%) is reached from a 1 : 3 feed (use the lab model)?</p>`, answer: 100 * haberX(700, 200), tol: 0.03, unit: '%', hints: [R`Solve the equilibrium for the extent of reaction.`], solution: R`<p>About ${f(100 * haberX(700, 200))}%; real plants reach about 15–20% per pass and recycle the rest.</p>` },
      { level: 'olympiad', type: 'num', title: 'Zeolite cations', q: R`<p>A zeolite framework has Si : Al = 3 : 1. In a sample containing 1.00 mol of tetrahedra, how many moles of Na⁺ balance the charge?</p>`, answer: 0.25, tol: 0.005, unit: 'mol', hints: [R`Each Al³⁺ in place of Si⁴⁺ needs one +1.`], solution: R`<p>0.25 mol.</p>` }
    ]
  });
  PB.addDrills('chem-pblock', [
    { title: 'Electrolysis of alumina', gen(r) { const kg = r.step(0.1, 10, 0.1), I = r.int(50, 400); const h = kg * 1000 / 26.98 * 3 * 96485 / (I * 1000) / 3600; return { q: R`<p>How many hours does a ${I} kA cell take to produce ${f(kg)} kg of aluminium?</p>`, answer: h, tol: 0.01, unit: 'h', solution: R`<p>$t = nF z/I = ${f(h)}$ h.</p>` }; } },
    { title: 'Silicate formulas', gen(r) { const n = r.int(0, 4); return { q: R`<p>Each SiO₄ tetrahedron shares ${n} corner${n === 1 ? '' : 's'}. How many oxygens per silicon?</p>`, answer: 4 - n / 2, tol: 0.001, unit: '', solution: R`<p>$4 - ${n}/2 = ${4 - n / 2}$.</p>` }; } },
    { title: 'Haber stoichiometry', gen(r) { const t = r.int(1, 50); return { q: R`<p>What mass of H₂ (tonnes) is needed to make ${t} t of NH₃?</p>`, answer: t / 17.03 * 1.5 * 2.016, tol: 0.005, unit: 't', solution: R`<p>3 H₂ per 2 NH₃: ${f(t / 17.03 * 1.5 * 2.016)} t.</p>` }; } }
  ]);
})();
