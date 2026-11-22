(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  const g = (x, m, s) => Math.exp(-Math.pow((x - m) / s, 2) / 2);
  PB.addChapter({
    id: 'bio-reproduction', subject: 'biology', num: 26, part: 'Physiology',
    title: 'Reproduction and Development',
    subtitle: R`Making a new animal. Asexual and sexual reproduction, gametogenesis, the menstrual cycle and its hormones, fertilisation, pregnancy, and the stages of embryonic development from cleavage to organs.`,
    goals: ['Compare asexual and sexual reproduction', 'Contrast spermatogenesis and oogenesis', 'Explain the hormonal control of the menstrual cycle with its feedback loops', 'Describe fertilisation and the blocks to polyspermy', 'Outline cleavage, gastrulation and neurulation', 'Explain how cells become different (induction, gene regulation, Hox genes)'],
    sections: [
      {
        title: 'Asexual and sexual reproduction',
        html: R`
<p><strong>Asexual reproduction</strong> (budding in Hydra, fragmentation in flatworms, parthenogenesis in aphids and some lizards) is fast and passes on a successful genotype whole, but all offspring share the same weaknesses. <strong>Sexual reproduction</strong> halves the number of offspring each individual passes genes to (the "twofold cost of males") but shuffles genes every generation, helping lineages keep up with fast-evolving parasites (the Red Queen hypothesis) and purge harmful mutations.</p>`
      },
      {
        title: 'Gametogenesis',
        html: R`
<p>In the testes, <strong>spermatogenesis</strong> runs continuously from puberty: spermatogonia divide by mitosis, primary spermatocytes undergo meiosis, and each gives four spermatids that mature into sperm, supported by Sertoli cells. It takes about 64–74 days and produces millions of sperm a day.</p>
<p>In the ovaries, <strong>oogenesis</strong> starts before birth: primary oocytes arrest in prophase I. From puberty, one oocyte each month completes meiosis I, giving a secondary oocyte and a small polar body; meiosis II finishes only if a sperm fertilises it. Each primary oocyte yields one egg, keeping almost all the cytoplasm and food reserves. Oocyte numbers fall from about 7 million in the fetus to about 400 000 at puberty, and only about 400 are ever ovulated.</p>`
      },
      {
        title: 'The menstrual cycle',
        html: R`
<p>The hypothalamus releases GnRH, which makes the anterior pituitary secrete <strong>FSH</strong> and <strong>LH</strong>.</p>
<ol>
<li><strong>Follicular phase</strong> (days 1–13): FSH grows follicles; the dominant follicle secretes rising <strong>oestrogen</strong>, which thickens the uterine lining. Low oestrogen inhibits FSH and LH (negative feedback).</li>
<li><strong>Ovulation</strong> (about day 14): once oestrogen is high for long enough it switches to <strong>positive feedback</strong>, causing a sharp LH surge that releases the secondary oocyte.</li>
<li><strong>Luteal phase</strong> (days 15–28): the empty follicle becomes the <strong>corpus luteum</strong>, secreting progesterone (and oestrogen), which maintains the lining and inhibits FSH and LH. Without pregnancy it degenerates, progesterone falls, the lining is shed (menstruation) and FSH rises again.</li>
</ol>
<p>If an embryo implants, it secretes <strong>hCG</strong>, which keeps the corpus luteum alive until the placenta takes over hormone production; pregnancy tests detect hCG with monoclonal antibodies. Hormonal contraceptives work by keeping oestrogen and progesterone high, which suppresses FSH and LH and prevents ovulation.</p>`
      },
      {
        title: 'Fertilisation and early development',
        html: R`
<p>In fertilisation, the sperm’s <strong>acrosome</strong> releases enzymes to penetrate the jelly coat or zona pellucida; the membranes fuse. A fast block (membrane depolarisation) and a slow block (the <strong>cortical reaction</strong>, hardening the coat) stop more sperm entering. The nuclei combine to form the diploid zygote.</p>
<ul>
<li><strong>Cleavage</strong>: rapid mitoses without growth divide the zygote into smaller and smaller cells (blastomeres), forming a hollow <strong>blastula</strong> (in mammals, a blastocyst with an inner cell mass, the source of embryonic stem cells).</li>
<li><strong>Gastrulation</strong>: cells move inward to form three germ layers: <strong>ectoderm</strong> (skin, nervous system), <strong>mesoderm</strong> (muscle, bone, blood, kidneys) and <strong>endoderm</strong> (gut lining, lungs, liver).</li>
<li><strong>Organogenesis</strong>: in <strong>neurulation</strong> the notochord induces the ectoderm above it to fold into the neural tube, the future brain and spinal cord. Somites form along the body.</li>
</ul>
<p>Cells become different through <strong>induction</strong> (signals from neighbours, such as Spemann’s organiser), <strong>morphogen gradients</strong> that set position (Bicoid in the fly egg), and cascades of transcription factors. <strong>Hox genes</strong>, arranged along the chromosome in the same order as the body regions they specify, pattern the head-to-tail axis in all bilaterian animals. Programmed cell death shapes structures such as fingers.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Hormones of the menstrual cycle', desc: 'Typical levels of FSH, LH, oestrogen and progesterone through a 28-day cycle (relative units). Move the day marker to read the phase.',
        tasks: ['What triggers the LH surge? Why is it an example of positive feedback?', 'Which hormone keeps the uterine lining thick after ovulation?', 'Switch on hormonal contraception. Why does ovulation not happen?'],
        params: { controls: [S('d', 'Day of cycle', 1, 28, 0.5, 14), { type: 'check', id: 'pill', label: 'Combined contraceptive pill', value: false }],
          init: (v) => { v.h = (d) => { if (v.pill) return { fsh: 0.15, lh: 0.12, oe: 0.45, pr: 0.6 }; return { fsh: 0.25 + 0.35 * g(d, 3, 3) + 0.35 * g(d, 13.5, 0.8), lh: 0.15 + 0.85 * g(d, 13.8, 0.8), oe: 0.12 + 0.75 * g(d, 12.5, 2.2) + 0.35 * g(d, 21, 3), pr: 0.05 + 0.8 * g(d, 21, 3.2) }; }; },
          plots: [{ x: [1, 28], y: [0, 1.1], xlabel: 'day', ylabel: 'relative level', curves: (v) => [['fsh', 'FSH', 'teal'], ['lh', 'LH', 'rust'], ['oe', 'oestrogen', 'accent'], ['pr', 'progesterone', 'points']].map((k) => ({ f: (d) => v.h(d)[k[0]], color: k[2], label: k[1] })), vlines: (v) => [{ x: v.d }] }],
          readout: (v) => [['phase', v.pill ? 'suppressed: no ovulation' : v.d <= 5 ? 'menstruation (early follicular)' : v.d < 13 ? 'follicular' : v.d <= 15 ? 'ovulation' : 'luteal'], ['main feedback', v.pill ? 'negative (oestrogen + progestogen)' : v.d >= 12 && v.d <= 14 ? 'positive (oestrogen → LH surge)' : 'negative']] } },
      { sim: 'explore', title: 'Cleavage', desc: 'During cleavage the zygote divides without growing: the number of cells doubles while each cell gets smaller and the surface-to-volume ratio of the cells rises.',
        tasks: ['After how many divisions are there more than 100 cells?', 'How does the diameter of each cell change per division?', 'Why is cleavage so fast compared with later cell cycles?'],
        params: { controls: [S('n', 'Divisions', 0, 12, 1, 5), S('D', 'Egg diameter', 0.05, 2, 0.01, 0.1, 'mm')],
          draw: (ctx, C, v, b, U) => { const cells = Math.pow(2, v.n), R0 = Math.min(b.w, b.h) * 0.35, cx = b.x + b.w / 2, cy = b.y + b.h / 2 - 8; ctx.strokeStyle = C.ink3; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 7); ctx.stroke(); const r = R0 * Math.pow(cells, -1 / 3); const show = Math.min(cells, 256); for (let i = 0; i < show; i++) { const a = i * 2.39996, rad = R0 * 0.92 * Math.sqrt((i + 0.5) / show); U.dot(ctx, cx + rad * Math.cos(a), cy + rad * Math.sin(a), Math.max(1.5, r * 0.9), U.alpha(C.accent, 0.5), C.accent); } U.text(ctx, cells + ' cells' + (cells > 256 ? ' (256 shown)' : ''), cx, b.y + b.h - 6, C.ink2, U.ui(11, 700), 'center'); },
          picFrac: 0.5,
          plots: [{ x: [0, 12], y: [0, 4], xlabel: 'divisions', ylabel: 'log₁₀', curves: () => [{ f: (n) => n * Math.log10(2), label: 'cells' }, { f: (n) => 3 + Math.log10(Math.pow(2, -n / 3)), color: 'rust', label: 'cell diameter (μm, rel.)' }], vlines: (v) => [{ x: v.n }] }],
          readout: (v) => [['cells', String(Math.pow(2, v.n))], ['cell diameter', f(v.D * 1000 * Math.pow(2, -v.n / 3)) + ' μm'], ['total volume', 'unchanged']] } }
    ],
    formulas: [
      ['Cells after cleavage', R`N = 2^n`],
      ['Cell diameter', R`d_n = d_0\,2^{-n/3}`],
      ['Gametes per meiosis', R`\text{sperm: 4;\ eggs: 1 (+ polar bodies)}`],
      ['Hormone axis', R`\text{GnRH} \to \text{FSH, LH} \to \text{oestrogen, progesterone}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'LH surge', q: R`<p>What causes the LH surge before ovulation?</p>`, options: ['Falling progesterone', 'Positive feedback from high oestrogen', 'hCG from the embryo', 'Negative feedback from FSH'], answer: 1, hints: [R`Oestrogen switches feedback sign.`], solution: R`<p>Sustained high oestrogen triggers a GnRH/LH surge.</p>` },
      { level: 'concept', type: 'mcq', title: 'Pregnancy test', q: R`<p>A pregnancy test detects…</p>`, options: ['Oestrogen', 'Progesterone', 'hCG', 'FSH'], answer: 2, hints: [R`Made by the embryo.`], solution: R`<p>hCG.</p>` },
      { level: 'concept', type: 'mcq', title: 'Germ layer', q: R`<p>The nervous system develops from…</p>`, options: ['Endoderm', 'Mesoderm', 'Ectoderm', 'Notochord'], answer: 2, hints: [R`Neural tube from folded ectoderm.`], solution: R`<p>Ectoderm.</p>` },
      { level: 'core', type: 'num', title: 'Sperm from spermatocytes', q: R`<p>How many sperm can 500 primary spermatocytes produce?</p>`, answer: 2000, tol: 0.001, unit: '', hints: [R`4 each.`], solution: R`<p>2000.</p>` },
      { level: 'core', type: 'num', title: 'Eggs from oocytes', q: R`<p>How many eggs can 500 primary oocytes produce?</p>`, answer: 500, tol: 0.001, unit: '', hints: [R`1 each (polar bodies degenerate).`], solution: R`<p>500.</p>` },
      { level: 'core', type: 'num', title: 'Cleavage', q: R`<p>A 100 μm zygote cleaves 6 times. What is the diameter of each cell, in μm?</p>`, answer: 100 * Math.pow(2, -2), tol: 0.005, unit: 'μm', hints: [R`$2^{-6/3}$.`], solution: R`<p>25 μm.</p>` },
      { level: 'core', type: 'num', title: 'Ovulations', q: R`<p>Over how many years does a woman ovulate about 400 times if cycles are 28 days and there are no pregnancies?</p>`, answer: 400 * 28 / 365.25, tol: 0.005, unit: 'years', hints: [R`Cycles × length.`], solution: R`<p>${f(400 * 28 / 365.25)} years.</p>` },
      { level: 'core', type: 'num', title: 'Sperm output', q: R`<p>A man produces about 1500 sperm per second. How many per day, in millions?</p>`, answer: 1500 * 86400 / 1e6, tol: 0.005, unit: 'million', hints: [R`× 86 400.`], solution: R`<p>${f(1500 * 86400 / 1e6)} million.</p>` },
      { level: 'core', type: 'num', title: 'Twofold cost', q: R`<p>An asexual female has 2 daughters; a sexual female has 1 son and 1 daughter. After 5 generations, how many times more females descend from the asexual lineage?</p>`, answer: 32, tol: 0.001, unit: '×', hints: [R`2⁵ versus 1⁵.`], solution: R`<p>32×: the twofold cost of sex.</p>` },
      { level: 'olympiad', type: 'num', title: 'Fertile window', q: R`<p>Sperm survive 5 days and the egg 1 day. If ovulation is on day 14, over how many days can intercourse lead to conception?</p>`, answer: 6, tol: 0.001, unit: 'days', hints: [R`Days 9 to 14 inclusive.`], solution: R`<p>About 6 days.</p>` },
      { level: 'olympiad', type: 'num', title: 'Hormone clearance', q: R`<p>hCG has a half-life of about 36 h. After a test level of 1000 IU/L, how many days until it falls below 5 IU/L?</p>`, answer: 36 * Math.log2(200) / 24, tol: 0.01, unit: 'days', hints: [R`$\log_2(1000/5)$ half-lives.`], solution: R`<p>${f(36 * Math.log2(200) / 24)} days.</p>` },
      { level: 'olympiad', type: 'num', title: 'Midblastula transition', q: R`<p>A frog egg 1.2 mm across cleaves until cells are about 30 μm across, when transcription starts. How many division rounds is that?</p>`, answer: 3 * Math.log2(1200 / 30), tol: 0.02, unit: '', hints: [R`$d_n = d_02^{-n/3}$.`], solution: R`<p>$n = 3\log_2 40 = ${f(3 * Math.log2(1200 / 30))}$, about 12 (4000 cells).</p>` }
    ]
  });
  PB.addDrills('bio-reproduction', [
    { title: 'Gametes from meiosis', gen(r) { const n = r.int(10, 5000), s = r.pick([['primary spermatocytes', 'sperm', 4], ['primary oocytes', 'eggs', 1], ['secondary spermatocytes', 'sperm', 2]]); return { q: R`<p>How many ${s[1]} can ${n} ${s[0]} produce?</p>`, answer: n * s[2], tol: 0, atol: 0.01, unit: '', solution: R`<p>${n} × ${s[2]} = ${n * s[2]}.</p>` }; } },
    { title: 'Cleavage cell size', gen(r) { const d = r.int(50, 1500), n = r.int(1, 12); return { q: R`<p>A ${d} μm egg cleaves ${n} times without growth. What is the diameter of each cell, in μm?</p>`, answer: d * Math.pow(2, -n / 3), tol: 0.01, unit: 'μm', solution: R`<p>$${d}\times2^{-${n}/3} = ${f(d * Math.pow(2, -n / 3))}\ \mu$m.</p>` }; } },
    { title: 'Hormone half-life', gen(r) { const t = r.int(1, 48), c0 = r.int(100, 5000), c = r.int(1, 50); return { q: R`<p>A hormone has a half-life of ${t} h. How long (h) does it take to fall from ${c0} to ${c} units?</p>`, answer: t * Math.log2(c0 / c), tol: 0.01, unit: 'h', solution: R`<p>$${t}\log_2(${c0}/${c}) = ${f(t * Math.log2(c0 / c))}$ h.</p>` }; } }
  ]);
})();
