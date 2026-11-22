(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  const g = (x, m, s) => Math.exp(-Math.pow((x - m) / s, 2) / 2);
  PB.addChapter({
    id: 'bio-plantgrowth', subject: 'biology', num: 27, part: 'Physiology',
    title: 'Plant Growth, Reproduction and Responses',
    subtitle: R`How plants grow, flower and sense the world. Meristems and secondary growth, seeds and germination, hormones in detail, tropisms, photoperiodism and phytochrome, and plant defences.`,
    goals: ['Describe apical and lateral meristems and how wood forms', 'Explain seed dormancy and germination', 'Explain the acid-growth mechanism of auxin and the roles of other hormones', 'Explain photoperiodism with phytochrome', 'Describe plant responses to touch, gravity, pathogens and herbivores'],
    sections: [
      {
        title: 'Meristems and growth',
        html: R`
<p>Plants grow throughout life from <strong>meristems</strong>, regions of undifferentiated dividing cells. <strong>Apical meristems</strong> at shoot and root tips make primary growth (length); <strong>lateral meristems</strong> make secondary growth (girth). The <strong>vascular cambium</strong> adds secondary xylem (wood) inwards and secondary phloem outwards; the cork cambium makes bark. Wood laid down quickly in spring has wide vessels and in summer narrow ones, so each year leaves a visible <strong>annual ring</strong>: dendrochronology dates timbers and reconstructs past climates.</p>
<p>A cell grows by taking up water into its vacuole while its wall loosens. Growth is therefore driven by turgor and controlled by wall extensibility, which hormones regulate.</p>`
      },
      {
        title: 'Seeds and germination',
        html: R`
<p>A seed contains an embryo, a food store (cotyledons or endosperm) and a protective coat. Many seeds stay <strong>dormant</strong> until conditions are right, controlled by the balance of abscisic acid (maintains dormancy) and gibberellins (break it). Some need cold (stratification), light, fire or passage through an animal gut.</p>
<p>In germinating cereal grains, water uptake lets the embryo release <strong>gibberellin</strong>, which diffuses to the aleurone layer and switches on synthesis of <strong>α-amylase</strong>; the enzyme digests starch in the endosperm into sugars that feed the growing seedling. Maltsters exploit exactly this in brewing.</p>`
      },
      {
        title: 'Hormones and tropisms',
        html: R`
<p><strong>Auxin</strong> (IAA) is made in shoot tips and moved downwards cell to cell by polar PIN transporters. It promotes cell elongation by the <strong>acid-growth</strong> mechanism: it activates proton pumps that acidify the cell wall, activating expansins that loosen cellulose bonds, so turgor stretches the cell. Shoots and roots respond oppositely to the same auxin concentration: concentrations that make shoots grow inhibit roots.</p>
<ul>
<li><strong>Phototropism</strong>: light from one side moves auxin to the shaded side of the shoot tip, which elongates more, bending the shoot towards the light.</li>
<li><strong>Gravitropism</strong>: starch-filled statoliths settle in root-cap cells, redirecting auxin to the lower side; in roots this inhibits growth there, so the root bends down.</li>
<li><strong>Apical dominance</strong>: auxin from the tip suppresses side buds; pruning the tip makes plants bushy. Cytokinins from roots promote bud growth.</li>
</ul>
<p>Other hormones: <strong>gibberellins</strong> (stem elongation, bolting; dwarf "Green Revolution" wheat has altered gibberellin signalling), <strong>cytokinins</strong> (cell division, delay ageing), <strong>ethylene</strong> (fruit ripening, a gas that spreads between fruits; leaf fall), <strong>abscisic acid</strong> (stomatal closure in drought, dormancy) and <strong>brassinosteroids</strong>.</p>`
      },
      {
        title: 'Photoperiodism and phytochrome',
        html: R`
<p>Many plants flower in response to day length, actually measuring the length of the <strong>night</strong>. <strong>Short-day</strong> (long-night) plants such as chrysanthemum and poinsettia flower when the night exceeds a critical length; <strong>long-day</strong> plants such as spinach and wheat flower when the night is shorter than it. A brief flash of light in the middle of the night breaks the long night, and the effect is reversible by far-red light.</p>
<p>The photoreceptor is <strong>phytochrome</strong>, which switches between two forms: Pr absorbs red light (660 nm) and becomes Pfr; Pfr absorbs far-red (730 nm) and returns to Pr, and also reverts slowly in the dark. The last flash wins. Leaves in shade receive light rich in far-red (chlorophyll absorbs the red), so phytochrome also tells a seedling it is shaded, triggering rapid stem elongation. The leaves then produce a mobile flowering signal, <strong>florigen</strong> (the FT protein), that travels to the shoot apex.</p>`
      },
      {
        title: 'Defence and other responses',
        html: R`
<p>Plants cannot run, so they defend chemically and structurally: thorns, trichomes, waxy cuticles, toxins (nicotine, cyanogenic glycosides), and proteinase inhibitors that stop herbivores digesting the leaf. Attacked plants release volatile signals that attract the herbivores’ predators and prime neighbouring plants. Infection triggers the <strong>hypersensitive response</strong> (cells around the infection die, walling it off) and <strong>systemic acquired resistance</strong> via salicylic acid. <strong>Thigmotropism</strong> (touch) coils tendrils; the Venus flytrap and Mimosa move fast using changes in turgor driven by ion fluxes.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Auxin: shoots versus roots', desc: 'Growth response of shoots and roots to auxin concentration (log scale). Roots are about 10 000 times more sensitive, so a concentration that stimulates shoots inhibits roots.',
        tasks: ['At what auxin concentration is shoot growth fastest? Root growth?', 'Explain gravitropism in a horizontal root from these curves.', 'Why is synthetic auxin (2,4-D) a selective weedkiller at high doses?'],
        params: { controls: [S('lc', 'log₁₀ auxin concentration (M)', -12, -2, 0.1, -6), S('s', 'Root sensitivity shift (decades)', 2, 6, 0.1, 4)],
          plots: [{ x: [-12, -2], y: [-1.1, 1.1], xlabel: 'log₁₀ [auxin] (M)', ylabel: 'growth response', curves: (v) => [{ f: (l) => 1.6 * g(l, -5, 1.3) - (l > -4 ? (l + 4) * 0.5 : 0), label: 'shoot' }, { f: (l) => 1.6 * g(l, -5 - v.s, 1.3) - (l > -4 - v.s ? (l + 4 + v.s) * 0.5 : 0), color: 'rust', label: 'root' }], hlines: () => [{ y: 0, label: 'no effect' }], vlines: (v) => [{ x: v.lc }] }],
          readout: (v) => { const sh = 1.6 * g(v.lc, -5, 1.3) - (v.lc > -4 ? (v.lc + 4) * 0.5 : 0), rt = 1.6 * g(v.lc, -5 - v.s, 1.3) - (v.lc > -4 - v.s ? (v.lc + 4 + v.s) * 0.5 : 0); return [['shoot', sh > 0.05 ? 'stimulated' : sh < -0.05 ? 'inhibited' : 'little effect'], ['root', rt > 0.05 ? 'stimulated' : rt < -0.05 ? 'inhibited' : 'little effect']]; } } },
      { sim: 'explore', title: 'Measuring the night', desc: 'Whether a short-day or a long-day plant flowers, given the night length and an optional flash of red or far-red light in the middle of the night (phytochrome photoreversibility).',
        tasks: ['With a 9 h critical night, which plant flowers in a 10 h night?', 'Interrupt a 14 h night with a red flash. What happens to each plant?', 'Follow the red flash with far-red. Which flash determines the outcome?'],
        params: { controls: [S('night', 'Night length', 4, 20, 0.25, 14, 'h'), S('crit', 'Critical night length', 6, 14, 0.25, 9, 'h'), { type: 'select', id: 'flash', label: 'Mid-night flash', value: 'none', options: [['none', 'none'], ['R', 'red'], ['FR', 'far-red'], ['RFR', 'red then far-red'], ['FRR', 'far-red then red']] }],
          draw: (ctx, C, v, b, U) => { const x0 = b.x + 30, w = b.w - 60, y = b.y + 30, h = 34; const day = 24 - v.night; ctx.fillStyle = '#f6d365'; ctx.fillRect(x0, y, w * day / 24, h); ctx.fillStyle = '#1f2440'; ctx.fillRect(x0 + w * day / 24, y, w * v.night / 24, h); if (v.flash !== 'none') { const last = v.flash.endsWith('FR') ? 'FR' : 'R'; ctx.fillStyle = last === 'R' ? '#ff3b30' : '#8b1a1a'; ctx.fillRect(x0 + w * (day + v.night / 2) / 24 - 3, y - 6, 6, h + 12); } ctx.strokeStyle = C.rust; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x0 + w * (24 - v.crit) / 24, y - 10); ctx.lineTo(x0 + w * (24 - v.crit) / 24, y + h + 10); ctx.stroke(); ctx.setLineDash([]); U.text(ctx, 'critical night', x0 + w * (24 - v.crit) / 24, y + h + 24, C.rust, U.ui(10.5), 'center'); const eff = v.flash === 'R' || v.flash === 'FRR' ? v.night / 2 : v.night; const sd = eff >= v.crit, ld = !sd; [['short-day plant', sd], ['long-day plant', ld]].forEach((p, i) => { const cx = x0 + w * (0.25 + 0.5 * i), cy = y + h + 90; ctx.strokeStyle = C.good; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, cy + 40); ctx.lineTo(cx, cy - 10); ctx.stroke(); ctx.lineWidth = 1; U.dot(ctx, cx, cy - 18, p[1] ? 12 : 5, p[1] ? '#e0379b' : C.good); U.text(ctx, p[0] + (p[1] ? ': flowers' : ': vegetative'), cx, cy + 58, C.ink, U.ui(11, 700), 'center'); }); },
          picFrac: 1,
          readout: (v) => { const eff = v.flash === 'R' || v.flash === 'FRR' ? v.night / 2 : v.night; return [['effective uninterrupted night', f(eff) + ' h'], ['phytochrome at end of flash', v.flash === 'none' ? 'Pr (reverted in dark)' : v.flash.endsWith('FR') ? 'Pr' : 'Pfr']]; } } }
    ],
    formulas: [
      ['Phytochrome switch', R`\mathrm{P_r \xrightarrow{660\ nm} P_{fr} \xrightarrow{730\ nm} P_r}`],
      ['Short-day plants', R`\text{flower if night} > \text{critical}`],
      ['Acid growth', R`\text{auxin} \to \mathrm{H^+}\ \text{pumping} \to \text{expansins} \to \text{wall loosening}`],
      ['Annual rings', R`\text{age} = \text{number of rings}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Poinsettia', q: R`<p>Poinsettias are short-day plants. Growers make them flower for Christmas by…</p>`, options: ['Giving extra light at night', 'Giving long uninterrupted nights in autumn', 'Adding gibberellin', 'Cooling them'], answer: 1, hints: [R`They measure night length.`], solution: R`<p>Long, unbroken nights.</p>` },
      { level: 'concept', type: 'mcq', title: 'Ethylene', q: R`<p>Why does one ripe banana ripen the others in a bag?</p>`, options: ['It releases auxin', 'It releases ethylene gas', 'It absorbs oxygen', 'It warms the bag'], answer: 1, hints: [R`A gaseous hormone.`], solution: R`<p>Ethylene, which triggers ripening.</p>` },
      { level: 'concept', type: 'mcq', title: 'Barley germination', q: R`<p>In a germinating barley grain, gibberellin acts on the aleurone layer to make…</p>`, options: ['Cellulase', 'α-amylase', 'Lipase', 'Auxin'], answer: 1, hints: [R`Starch digestion.`], solution: R`<p>α-amylase.</p>` },
      { level: 'core', type: 'num', title: 'Tree rings', q: R`<p>A trunk of radius 30 cm has rings averaging 2.5 mm wide. About how old is the tree?</p>`, answer: 300 / 2.5, tol: 0.005, unit: 'years', hints: [R`Radius / ring width.`], solution: R`<p>120 years.</p>` },
      { level: 'core', type: 'num', title: 'Wall acidification', q: R`<p>Auxin lowers cell-wall pH from 6.0 to 4.5. By what factor does [H⁺] increase?</p>`, answer: Math.pow(10, 1.5), tol: 0.005, unit: '×', hints: [R`$10^{\Delta pH}$.`], solution: R`<p>${f(Math.pow(10, 1.5))}×.</p>` },
      { level: 'core', type: 'num', title: 'Red/far-red photons', q: R`<p>How much more energy does a 660 nm photon carry than a 730 nm photon, as a ratio?</p>`, answer: 730 / 660, tol: 0.005, unit: '×', hints: [R`$E \propto 1/\lambda$.`], solution: R`<p>${f(730 / 660)}.</p>` },
      { level: 'core', type: 'num', title: 'Auxin transport', q: R`<p>Polar auxin transport moves at about 10 mm/h. How long to travel 0.5 m down a stem, in hours?</p>`, answer: 50, tol: 0.005, unit: 'h', hints: [R`500 mm / 10 mm/h.`], solution: R`<p>50 h.</p>` },
      { level: 'core', type: 'num', title: 'Critical night', q: R`<p>A short-day plant has a critical night length of 10 h. On a 13 h day, is the night long enough? Give the night length in hours.</p>`, answer: 11, tol: 0.001, unit: 'h', hints: [R`24 − 13.`], solution: R`<p>11 h > 10 h: it flowers.</p>` },
      { level: 'core', type: 'num', title: 'Cell elongation', q: R`<p>A cell elongates from 20 μm to 120 μm while its diameter stays 15 μm. By what factor does its volume rise?</p>`, answer: 6, tol: 0.005, unit: '×', hints: [R`Cylinder volume ∝ length.`], solution: R`<p>6×, almost all as vacuole water.</p>` },
      { level: 'olympiad', type: 'num', title: 'Phytochrome photostationary state', q: R`<p>Under red light, Pr → Pfr at rate $k_1 = 0.8$ s⁻¹ and Pfr → Pr at $k_2 = 0.2$ s⁻¹ (Pfr also absorbs a little red). What fraction is Pfr at steady state?</p>`, answer: 0.8, tol: 0.005, unit: '', hints: [R`$k_1/(k_1 + k_2)$.`], solution: R`<p>0.8, close to the measured 0.8–0.85 in red light.</p>` },
      { level: 'olympiad', type: 'num', title: 'Gibberellin amplification', q: R`<p>One gibberellin molecule triggers 10³ mRNAs, each translated 10³ times; each α-amylase digests 10³ glucose units per second. How many glucose units per second per gibberellin molecule?</p>`, answer: 1e9, tol: 0.001, unit: '', hints: [R`Multiply.`], solution: R`<p>10⁹.</p>` },
      { level: 'olympiad', type: 'num', title: 'Venus flytrap', q: R`<p>A flytrap closes in 0.1 s. Its lobes swing through 2 cm. What average speed is that, in m/s?</p>`, answer: 0.2, tol: 0.005, unit: 'm/s', hints: [R`Distance / time.`], solution: R`<p>0.2 m/s: fast because the lobes snap through an unstable curvature (elastic energy release), not by growth.</p>` }
    ]
  });
  PB.addDrills('bio-plantgrowth', [
    { title: 'Night length', gen(r) { const day = r.step(8, 18, 0.25), crit = r.step(7, 14, 0.25), type = r.pick(['short-day', 'long-day']); const night = 24 - day, fl = type === 'short-day' ? night > crit : night < crit; return { q: R`<p>A ${type} plant has a critical night of ${f(crit)} h. Days are ${f(day)} h long. Enter 1 if it flowers, 0 if not.</p>`, answer: fl ? 1 : 0, tol: 0, atol: 0.01, unit: '', solution: R`<p>Night = ${f(night)} h: ${fl ? 'flowers' : 'stays vegetative'}.</p>` }; } },
    { title: 'Tree age from rings', gen(r) { const rad = r.int(5, 200), w = r.step(0.5, 6, 0.1); return { q: R`<p>A trunk of radius ${rad} cm has rings averaging ${f(w)} mm. Estimate its age, in years.</p>`, answer: rad * 10 / w, tol: 0.01, unit: 'years', solution: R`<p>${f(rad * 10 / w)} years.</p>` }; } },
    { title: 'pH and H⁺', gen(r) { const a = r.step(5, 7, 0.1), b = r.step(3.5, 5, 0.1); return { q: R`<p>The cell wall pH falls from ${f(a)} to ${f(b)}. By what factor does [H⁺] rise?</p>`, answer: Math.pow(10, a - b), tol: 0.01, unit: '×', solution: R`<p>$10^{${f(a - b)}} = ${f(Math.pow(10, a - b))}$.</p>` }; } }
  ]);
})();
