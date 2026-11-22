(function () {
  const R = PB.R, f = (x, s) => PB.fmt(x, s || 3);
  const S = (id, label, min, max, step, value, unit, format) => ({ id: id, label: label, min: min, max: max, step: step, value: value, unit: unit, format: format });
  const LIFE = { moss: ['Moss (bryophyte)', 0.85, 'Gametophyte dominant; sporophyte grows on it. Swimming sperm need water.'], fern: ['Fern', 0.25, 'Sporophyte dominant and free-living; small independent gametophyte (prothallus).'], pine: ['Pine (gymnosperm)', 0.04, 'Sporophyte dominant; gametophytes tiny, inside cones; naked seeds; pollen by wind.'], flower: ['Flowering plant (angiosperm)', 0.01, 'Embryo sac of 7 cells and 3-celled pollen grain; double fertilisation; seeds in fruits.'] };
  PB.addChapter({
    id: 'bio-plantdiv', subject: 'biology', num: 23, part: 'Diversity of Life',
    title: 'Plant and Fungal Diversity',
    subtitle: R`How plants colonised land and how fungi live. Alternation of generations, the evolution of vascular tissue, seeds and flowers, the structure of the flower, and the biology of fungi, lichens and mycorrhizae.`,
    goals: ['Describe alternation of generations and how it changed during plant evolution', 'Compare bryophytes, ferns, gymnosperms and angiosperms', 'Explain the advantages of vascular tissue, seeds, pollen and flowers', 'Label a flower and describe double fertilisation', 'Describe fungal structure, nutrition and reproduction, and their mutualisms'],
    sections: [
      {
        title: 'Alternation of generations',
        html: R`
<p>All land plants alternate between a haploid <strong>gametophyte</strong>, which makes gametes by mitosis, and a diploid <strong>sporophyte</strong>, which makes haploid spores by meiosis. The two generations look different, and their relative importance is the main thread of plant evolution: from gametophyte-dominant mosses to sporophyte-dominant flowering plants, whose gametophytes are reduced to a few cells.</p>
<p>Land plants evolved from charophyte green algae about 470 million years ago. Adaptations for land include a waxy <strong>cuticle</strong>, <strong>stomata</strong>, and embryos protected and fed by the parent (they are called embryophytes).</p>`
      },
      {
        title: 'From mosses to flowering plants',
        html: R`
<div class="table-wrap"><table><thead><tr><th>Group</th><th>Vascular tissue</th><th>Seeds</th><th>Dominant generation</th><th>Water for fertilisation</th></tr></thead><tbody>
<tr><td>Bryophytes (mosses, liverworts, hornworts)</td><td>no</td><td>no</td><td>gametophyte</td><td>yes</td></tr>
<tr><td>Seedless vascular plants (ferns, horsetails, club mosses)</td><td>yes</td><td>no</td><td>sporophyte</td><td>yes</td></tr>
<tr><td>Gymnosperms (conifers, cycads, ginkgo)</td><td>yes</td><td>naked</td><td>sporophyte</td><td>no (pollen)</td></tr>
<tr><td>Angiosperms (flowering plants)</td><td>yes</td><td>enclosed in fruit</td><td>sporophyte</td><td>no (pollen)</td></tr>
</tbody></table></div>
<p><strong>Vascular tissue</strong> (xylem strengthened with lignin, and phloem) let plants grow tall, and the first forests (Carboniferous) formed today’s coal. <strong>Seeds</strong> package an embryo with food and a tough coat, allowing dormancy and dispersal. <strong>Pollen</strong> carries the male gametophyte to the egg through air, freeing reproduction from water. Angiosperms add flowers and fruits, and with about 300 000 species dominate most land ecosystems. Monocots (one cotyledon, parallel veins, scattered vascular bundles, flower parts in threes: grasses, orchids) and eudicots (two cotyledons, net veins, bundles in a ring, parts in fours or fives) are the two main groups.</p>`
      },
      {
        title: 'Flowers and double fertilisation',
        html: R`
<p>A flower is a modified shoot: sepals, petals, <strong>stamens</strong> (anther and filament: male) and <strong>carpels</strong> (stigma, style and ovary containing ovules: female). Pollination may be by insects (bright petals, nectar, scent, sticky pollen), birds, wind (dull flowers, feathery stigmas, huge amounts of light pollen) or water. Many plants avoid self-fertilisation by separate timing, structure or self-incompatibility genes.</p>
<p>After pollination, a pollen tube grows down the style carrying two sperm cells. In <strong>double fertilisation</strong>, unique to angiosperms, one sperm fertilises the egg (forming the diploid zygote) and the other fuses with the two polar nuclei of the central cell (forming triploid <strong>endosperm</strong>, the food store). The ovule becomes the seed and the ovary the fruit.</p>`
      },
      {
        title: 'Fungi',
        html: R`
<p>Fungi are heterotrophs that digest food <strong>outside</strong> their bodies by secreting enzymes and absorbing the products. Most grow as networks of thin <strong>hyphae</strong> (a mycelium) with walls of <strong>chitin</strong>; yeasts are single cells. Their enormous surface area suits absorption: a cubic centimetre of soil can hold kilometres of hyphae. Fungi are more closely related to animals than to plants.</p>
<p>They reproduce with vast numbers of spores, both asexually and sexually; in many groups the sexual cycle has a long <strong>dikaryotic</strong> stage with two separate haploid nuclei per cell (n + n) before the nuclei fuse. Major groups include chytrids (with flagellated spores), zygomycetes (bread mould), ascomycetes (yeasts, Penicillium, truffles) and basidiomycetes (mushrooms, rusts).</p>
<p>Fungi are the main decomposers of wood (lignin), pathogens of plants and animals (chytrid fungi have devastated amphibians), and partners in mutualisms: <strong>mycorrhizae</strong> link the roots of about 90% of plants, trading phosphate and water for sugar; <strong>lichens</strong> are partnerships of a fungus with an alga or cyanobacterium that colonise bare rock.</p>`
      }
    ],
    labs: [
      { sim: 'explore', title: 'Who is in charge? Alternation of generations', desc: 'The relative size of the haploid gametophyte and the diploid sporophyte in four plant groups, with the steps of the life cycle.',
        tasks: ['In which group is the gametophyte the plant you normally see?', 'Why does reducing the gametophyte help a plant live in dry places?', 'Where does meiosis happen in a flowering plant?'],
        params: { controls: [{ type: 'select', id: 'g', label: 'Plant group', value: 'fern', options: Object.keys(LIFE).map((k) => [k, LIFE[k][0]]) }],
          draw: (ctx, C, v, b, U) => { const L = LIFE[v.g], gW = (b.w - 120) * L[1], sW = (b.w - 120) * (1 - L[1]); const y = b.y + 50, h = 46; ctx.fillStyle = C.teal; ctx.fillRect(b.x + 60, y, Math.max(4, gW), h); ctx.fillStyle = C.rust; ctx.fillRect(b.x + 60 + Math.max(4, gW), y, Math.max(4, sW), h); U.text(ctx, 'gametophyte (n)', b.x + 60, y - 8, C.teal, U.ui(11, 700)); U.text(ctx, 'sporophyte (2n)', b.x + b.w - 60, y - 8, C.rust, U.ui(11, 700), 'right'); const steps = ['spore (n)', '→ mitosis →', 'gametophyte (n)', '→ gametes by mitosis →', 'zygote (2n)', '→ mitosis →', 'sporophyte (2n)', '→ meiosis →', 'spores (n)']; steps.forEach((s, i) => U.text(ctx, s, b.x + 20 + (i % 3) * (b.w - 40) / 3, y + h + 40 + Math.floor(i / 3) * 22, i % 2 ? C.ink3 : C.ink, U.ui(11, i % 2 ? 500 : 700))); U.text(ctx, L[2], b.x + b.w / 2, b.y + b.h - 12, C.ink2, U.ui(11), 'center'); },
          picFrac: 1,
          readout: (v) => [['group', LIFE[v.g][0]], ['share of life as gametophyte (by size)', f(100 * LIFE[v.g][1]) + '%']] } },
      { sim: 'explore', title: 'A fungal colony', desc: 'A mycelium grows outward at a constant hyphal extension rate, so its radius rises linearly and its area quadratically, while the centre may die back as food runs out (fairy rings).',
        tasks: ['How does colony area grow if the radius grows linearly?', 'A fairy ring 20 m across grows 25 cm per year. How old is it?', 'Why does the grass at the edge of a fairy ring grow greener?'],
        params: { controls: [S('v', 'Extension rate', 0.1, 10, 0.1, 2, 'mm/day'), S('t', 'Age', 1, 60, 1, 14, 'days'), S('die', 'Centre dies back after', 2, 60, 1, 20, 'days')],
          draw: (ctx, C, v, b, U) => { const cx = b.x + b.w / 2, cy = b.y + b.h / 2 - 10, maxR = Math.min(b.w, b.h) * 0.42, scale = maxR / (10 * 60); const r = v.v * v.t * scale, ri = v.t > v.die ? v.v * (v.t - v.die) * scale : 0; ctx.fillStyle = '#e9dfc7'; ctx.beginPath(); ctx.arc(cx, cy, maxR, 0, 7); ctx.fill(); ctx.fillStyle = U.alpha('#7a5b2e', 0.55); ctx.beginPath(); ctx.arc(cx, cy, Math.max(1, r), 0, 7); ctx.fill(); if (ri > 0) { ctx.fillStyle = '#e9dfc7'; ctx.beginPath(); ctx.arc(cx, cy, ri, 0, 7); ctx.fill(); } U.text(ctx, 'Petri dish of radius 60 mm at max extension 10 mm/day', cx, b.y + b.h - 6, C.ink3, U.ui(10), 'center'); },
          picFrac: 0.5,
          plots: [{ x: [0, 60], y: 'auto', xlabel: 'age (days)', ylabel: 'colony area (cm²)', curves: (v) => [{ f: (t) => Math.PI * Math.pow(v.v * t / 10, 2) - (t > v.die ? Math.PI * Math.pow(v.v * (t - v.die) / 10, 2) : 0), label: 'living area' }, { f: (t) => Math.PI * Math.pow(v.v * t / 10, 2), color: 'ink3', dash: [4, 4], label: 'total' }], vlines: (v) => [{ x: v.t }] }],
          readout: (v) => [['radius', f(v.v * v.t) + ' mm'], ['area', f(Math.PI * Math.pow(v.v * v.t / 10, 2)) + ' cm²']] } }
    ],
    formulas: [
      ['Gametophyte', R`n\ \text{(haploid), makes gametes by mitosis}`],
      ['Sporophyte', R`2n\ \text{(diploid), makes spores by meiosis}`],
      ['Endosperm', R`3n = \text{sperm} + 2\ \text{polar nuclei}`],
      ['Colony radius', R`r = vt`],
      ['Colony area', R`A = \pi(vt)^2`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Moss plant', q: R`<p>The green, leafy moss plant you see is…</p>`, options: ['The sporophyte', 'The gametophyte', 'A protonema only', 'A spore'], answer: 1, hints: [R`Bryophytes are gametophyte dominant.`], solution: R`<p>The haploid gametophyte.</p>` },
      { level: 'concept', type: 'mcq', title: 'Fungal walls', q: R`<p>Fungal cell walls are made mainly of…</p>`, options: ['Cellulose', 'Peptidoglycan', 'Chitin', 'Lignin'], answer: 2, hints: [R`Also in insect exoskeletons.`], solution: R`<p>Chitin.</p>` },
      { level: 'concept', type: 'mcq', title: 'Monocot', q: R`<p>Which feature indicates a monocot?</p>`, options: ['Net-veined leaves', 'Flower parts in fives', 'Vascular bundles scattered in the stem', 'Two cotyledons'], answer: 2, hints: [R`Think of a maize stem.`], solution: R`<p>Scattered vascular bundles.</p>` },
      { level: 'core', type: 'num', title: 'Endosperm ploidy', q: R`<p>A plant has 2n = 24. How many chromosomes are in an endosperm cell?</p>`, answer: 36, tol: 0.001, unit: '', hints: [R`3n.`], solution: R`<p>36.</p>` },
      { level: 'core', type: 'num', title: 'Fern spores', q: R`<p>A fern frond has 200 sporangia, each with 16 spore mother cells. How many spores does it produce?</p>`, answer: 200 * 16 * 4, tol: 0.001, unit: '', hints: [R`Each mother cell undergoes meiosis.`], solution: R`<p>12 800.</p>` },
      { level: 'core', type: 'num', title: 'Fairy ring age', q: R`<p>A fairy ring is 18 m in diameter and expands at 20 cm per year (radius). How old is it, in years?</p>`, answer: 900 / 20, tol: 0.005, unit: 'years', hints: [R`Radius / rate.`], solution: R`<p>45 years.</p>` },
      { level: 'core', type: 'num', title: 'Pollen tube speed', q: R`<p>A maize style is 30 cm long; the pollen tube grows at 1 cm/h. How many hours until fertilisation?</p>`, answer: 30, tol: 0.005, unit: 'h', hints: [R`Divide.`], solution: R`<p>30 h.</p>` },
      { level: 'core', type: 'num', title: 'Hyphal length', q: R`<p>A hypha of 5 μm diameter: how many kilometres of hyphae occupy 1 cm³ of soil at a hyphal volume fraction of 1%?</p>`, answer: 0.01 * 1e-6 / (Math.PI * Math.pow(2.5e-6, 2)) / 1000, tol: 0.01, unit: 'km', hints: [R`Volume / cross-section.`], solution: R`<p>${f(0.01 * 1e-6 / (Math.PI * Math.pow(2.5e-6, 2)) / 1000)} km.</p>` },
      { level: 'core', type: 'num', title: 'Seed set', q: R`<p>A flower has an ovary with 40 ovules. If 75% are fertilised, how many pollen tubes reached the ovules?</p>`, answer: 30, tol: 0.001, unit: '', hints: [R`One tube per ovule (two sperm each).`], solution: R`<p>30.</p>` },
      { level: 'olympiad', type: 'num', title: 'Ploidy count', q: R`<p>A gymnosperm has 2n = 24. How many chromosomes are in a cell of its female gametophyte tissue (which nourishes the embryo in the seed)?</p>`, answer: 12, tol: 0.001, unit: '', hints: [R`Gymnosperm seed food is gametophyte, not endosperm.`], solution: R`<p>12 (haploid), unlike angiosperm endosperm (3n).</p>` },
      { level: 'olympiad', type: 'num', title: 'Mycorrhizal surface', q: R`<p>A root of radius 0.5 mm and length 1 m is colonised by 50 m of hyphae of radius 2.5 μm. By what factor do hyphae increase the absorbing surface?</p>`, answer: (2 * Math.PI * 0.5e-3 * 1 + 2 * Math.PI * 2.5e-6 * 50) / (2 * Math.PI * 0.5e-3 * 1), tol: 0.01, unit: '×', hints: [R`Compare $2\pi rL$ for both.`], solution: R`<p>Root 3.14 × 10⁻³ m²; hyphae 7.85 × 10⁻⁴ m²: total ${f((2 * Math.PI * 0.5e-3 * 1 + 2 * Math.PI * 2.5e-6 * 50) / (2 * Math.PI * 0.5e-3 * 1))}× (and hyphae reach far beyond the depletion zone).</p>` },
      { level: 'olympiad', type: 'num', title: 'Spore output', q: R`<p>A giant puffball releases about 7 × 10¹² spores. If each spore had a 10⁻¹² chance of producing a new puffball, how many offspring are expected?</p>`, answer: 7, tol: 0.005, unit: '', hints: [R`Multiply.`], solution: R`<p>About 7: enormous output compensates for tiny success rates.</p>` }
    ]
  });
  PB.addDrills('bio-plantdiv', [
    { title: 'Ploidy in plant tissues', gen(r) { const n = r.pick([6, 7, 10, 12, 14, 20, 21, 24]), t = r.pick([['a pollen grain nucleus', 1], ['a leaf cell', 2], ['an endosperm cell', 3], ['an egg cell', 1], ['a zygote', 2], ['a moss leaf cell', 1]]); return { q: R`<p>A plant has n = ${n}. How many chromosomes are in ${t[0]}?</p>`, answer: n * t[1], tol: 0, atol: 0.01, unit: '', solution: R`<p>${t[1]}n = ${n * t[1]}.</p>` }; } },
    { title: 'Spores from meiosis', gen(r) { const s = r.int(10, 1000), m = r.int(4, 64); return { q: R`<p>${s} sporangia each contain ${m} spore mother cells. How many spores form?</p>`, answer: s * m * 4, tol: 0, atol: 0.01, unit: '', solution: R`<p>${s} × ${m} × 4 = ${s * m * 4}.</p>` }; } },
    { title: 'Colony growth', gen(r) { const v = r.step(0.5, 10, 0.5), t = r.int(2, 30); return { q: R`<p>A fungal colony grows radially at ${f(v)} mm/day. What is its area after ${t} days, in cm²?</p>`, answer: Math.PI * Math.pow(v * t / 10, 2), tol: 0.01, unit: 'cm²', solution: R`<p>r = ${f(v * t)} mm; A = ${f(Math.PI * Math.pow(v * t / 10, 2))} cm².</p>` }; } }
  ]);
})();
