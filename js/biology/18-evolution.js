(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-evolution', subject: 'biology', num: 18, part: 'Evolution and Ecology',
    title: 'Evolution, Speciation and Phylogeny',
    subtitle: R`Descent with modification. Darwin's natural selection and its evidence, types of selection, how new species form, molecular clocks, and reading and building evolutionary trees.`,
    goals: ['State the theory of evolution by natural selection', 'Describe the evidence for evolution', 'Distinguish directional, stabilising and disruptive selection', 'Explain allopatric and sympatric speciation', 'Build and interpret phylogenetic trees and molecular clocks'],
    sections: [
      {
        title: 'Natural selection',
        html: R`
<p>Darwin and Wallace (1858) argued from four observations: organisms produce more offspring than can survive; individuals vary; much variation is heritable; and survival and reproduction depend partly on that variation. So heritable traits that improve reproductive success become more common: <strong>natural selection</strong>. Mutation supplies the variation; selection is not random, but mutation is.</p>
<p>Selection acts on phenotypes, but evolution is a change in allele frequencies in a population (chapter 12). Individuals do not evolve; populations do.</p>
<ul>
<li><strong>Directional selection</strong> shifts the mean: antibiotic resistance, the peppered moth during industrial pollution.</li>
<li><strong>Stabilising selection</strong> favours the middle and narrows variation: human birth weight.</li>
<li><strong>Disruptive selection</strong> favours both extremes and can split a population: the large- and small-billed African seedcrackers.</li>
<li><strong>Sexual selection</strong>: traits that win mates, such as the peacock's tail, even at a cost to survival.</li>
</ul>
<p>The response to selection follows the <strong>breeder's equation</strong> $R = h^2S$, where $S$ is the selection differential (mean of the parents chosen minus the population mean) and $h^2$ the heritability.</p>`
      },
      {
        title: 'The evidence',
        html: R`
<ul>
<li><strong>Fossils</strong> show change over time and transitional forms: <em>Tiktaalik</em> (fish to tetrapod), <em>Archaeopteryx</em> (dinosaur to bird), the whale series from land mammals.</li>
<li><strong>Comparative anatomy</strong>: <strong>homologous structures</strong> such as the pentadactyl limb share a plan despite different uses; <strong>vestigial structures</strong> (whale pelvis, human appendix) are leftovers. <strong>Analogous structures</strong> (bird and insect wings) are similar by <strong>convergent evolution</strong>, not common descent.</li>
<li><strong>Molecular evidence</strong>: all life uses DNA and nearly the same genetic code; sequence similarity tracks relatedness; shared "mistakes" such as the broken vitamin C gene in primates point to common ancestry.</li>
<li><strong>Biogeography</strong>: island species resemble mainland neighbours (Darwin's finches).</li>
<li><strong>Observed evolution</strong>: antibiotic and pesticide resistance, Lenski's 75 000-generation E. coli experiment, finch beaks after droughts.</li>
</ul>`
      },
      {
        title: 'Species and speciation',
        html: R`
<p>The <strong>biological species concept</strong>: a species is a group of populations whose members can interbreed and produce fertile offspring, and are reproductively isolated from others. (A horse and a donkey make a sterile mule.) It cannot apply to asexual organisms or fossils, so morphological and phylogenetic concepts are also used.</p>
<p><strong>Reproductive isolation</strong> can be <strong>prezygotic</strong> (different habitats, breeding seasons, courtship, incompatible genitals or gametes) or <strong>postzygotic</strong> (hybrids that die or are sterile).</p>
<ul>
<li><strong>Allopatric speciation</strong>: a geographical barrier splits a population; the parts diverge by selection and drift until they can no longer interbreed.</li>
<li><strong>Sympatric speciation</strong>: in the same area, through behaviour, ecology or polyploidy. A <strong>polyploid</strong> plant with doubled chromosomes cannot breed with its parent species. Modern bread wheat is hexaploid.</li>
<li><strong>Adaptive radiation</strong>: one lineage diversifies quickly into many niches (cichlids in African lakes, mammals after the dinosaurs).</li>
</ul>`
      },
      {
        title: 'Phylogeny and molecular clocks',
        html: R`
<p>A <strong>phylogenetic tree</strong> shows inferred relationships. Branch points (nodes) are common ancestors; groups that include an ancestor and <em>all</em> its descendants are <strong>clades</strong>. <strong>Cladistics</strong> groups organisms by shared derived characters. Birds belong within the dinosaur clade; "reptiles" without birds is not a clade.</p>
<p>The simplest way to choose between trees is <strong>parsimony</strong>: prefer the tree needing the fewest changes. Life is classified into three <strong>domains</strong>: Bacteria, Archaea and Eukarya, based on ribosomal RNA (Woese, 1977).</p>
<p>If substitutions accumulate at a roughly constant rate $\mu$ per site per year, two lineages that split $t$ years ago differ at about</p>
$$d = 2\mu t$$
<p>substitutions per site (both lineages change). Observed differences $p$ saturate because sites change more than once; the <strong>Jukes–Cantor correction</strong> recovers the true distance:</p>
$$d = -\tfrac34\ln\!\left(1 - \tfrac43 p\right).$$
<details class="example"><summary><span class="lbl">Worked example</span> Two species' genes differ at 4% of sites; the rate is $10^{-9}$ per site per year. When did they diverge?<span class="tog">Solution</span></summary><div class="sol"><p>Small $p$, so $d \approx 0.04$: $t = d/2\mu = 0.04/(2\times10^{-9}) = 20$ million years.</p></div></details>`
      }
    ],
    labs: [
      { sim: 'molclock', title: 'Molecular clock', desc: 'How sequence differences build up after two lineages split. The dashed line is the true number of substitutions; the solid curve is what you can observe.',
        tasks: ['For a split 50 Myr ago, how close is the naive estimate from p to the true date?', 'Go to 800 Myr. Why does the naive date fail badly? How does the Jukes–Cantor correction help?', 'Fast-evolving genes are used for recent splits and slow ones for ancient splits. Explain why using the lab.'] }
    ],
    formulas: [
      ['Breeder\'s equation', R`R = h^2 S`],
      ['Divergence', R`d = 2\mu t`],
      ['Jukes–Cantor', R`d = -\tfrac34\ln(1 - \tfrac43 p)`],
      ['Rooted bifurcating trees', R`(2n-3)!!`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Homology', q: R`<p>The bones of a bat's wing and a human arm are…</p>`, options: ['Analogous', 'Homologous', 'Vestigial', 'Convergent'], answer: 1, hints: [R`Same plan, common ancestor.`], solution: R`<p>Homologous: both are pentadactyl limbs.</p>` },
      { level: 'concept', type: 'mcq', title: 'Resistance', q: R`<p>Which statement about antibiotic resistance is correct?</p>`, options: ['Antibiotics cause bacteria to mutate to resistance', 'Resistant mutants already present survive and multiply', 'Bacteria learn to resist', 'Resistance is acquired by individual bacteria that need it'], answer: 1, hints: [R`Mutation is random; selection is not.`], solution: R`<p>The antibiotic selects pre-existing resistant variants.</p>` },
      { level: 'concept', type: 'mcq', title: 'Polyploidy', q: R`<p>A tetraploid plant arises from a diploid species. Why is it a new species immediately?</p>`, options: ['It is larger', 'Crosses with the diploid give sterile triploids', 'It cannot photosynthesise', 'It reproduces only asexually'], answer: 1, hints: [R`Odd sets cannot pair in meiosis.`], solution: R`<p>Triploid hybrids cannot form balanced gametes, so the tetraploid is reproductively isolated.</p>` },
      { level: 'core', type: 'num', title: 'Breeder\'s equation', q: R`<p>Cows average 25 L of milk per day. The bulls' mothers selected for breeding average 31 L. With heritability 0.3, what is the expected mean of the daughters, in L/day?</p>`, answer: 26.8, tol: 0.002, unit: 'L/day', hints: [R`$R = 0.3\times6$.`], solution: R`<p>$25 + 1.8 = 26.8$ L/day.</p>` },
      { level: 'core', type: 'num', title: 'Divergence time', q: R`<p>Two genes differ at 2% of sites; the rate is $2\times10^{-9}$ per site per year. When did the lineages split, in Myr?</p>`, answer: 5, tol: 0.002, unit: 'Myr', hints: [R`$t = d/2\mu$.`], solution: R`<p>$0.02/(4\times10^{-9}) = 5$ Myr: about the human–chimpanzee split.</p>` },
      { level: 'core', type: 'num', title: 'Jukes–Cantor', q: R`<p>Two sequences differ at 30% of sites. What is the Jukes–Cantor distance, in substitutions per site?</p>`, answer: 0.3831, tol: 0.005, unit: '', hints: [R`$-0.75\ln(1 - 0.4)$.`], solution: R`<p>$-0.75\ln0.6 = 0.383$: 28% more than the raw 0.30.</p>` },
      { level: 'core', type: 'num', title: 'Unrooted trees', q: R`<p>How many different unrooted bifurcating trees are possible for 5 species? (The count is $(2n-5)!!$.)</p>`, answer: 15, tol: 0.001, unit: '', hints: [R`$5!! = 5\times3\times1$.`], solution: R`<p>15. For 20 species it is over $2\times10^{20}$, which is why tree-building needs clever algorithms.</p>` },
      { level: 'core', type: 'num', title: 'Rooted trees', q: R`<p>How many rooted bifurcating trees are possible for 4 species? Use $(2n-3)!!$.</p>`, answer: 15, tol: 0.001, unit: '', hints: [R`$5!!$.`], solution: R`<p>$5\times3\times1 = 15$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Response over generations', q: R`<p>Body mass in a mouse line has heritability 0.4. Each generation, breeders average 3 g above the population mean. After 10 generations, by how much has the mean risen, in g? (Assume constant $h^2$ and $S$.)</p>`, answer: 12, tol: 0.002, unit: 'g', hints: [R`1.2 g per generation.`], solution: R`<p>12 g. In practice heritability falls as variation is used up.</p>` },
      { level: 'olympiad', type: 'num', title: 'Saturated date', q: R`<p>Sequences differ at 45% of sites, with $\mu = 10^{-9}$ per site per year. Using Jukes–Cantor, when did they diverge, in Myr?</p>`, answer: 343.6, tol: 0.01, unit: 'Myr', hints: [R`$d = -0.75\ln(0.4)$, then $t = d/2\mu$.`], solution: R`<p>$d = 0.687$, $t = 344$ Myr. The naive estimate $0.45/2\times10^{-9} = 225$ Myr is far too young.</p>` },
      { level: 'olympiad', type: 'num', title: 'Parsimony score', q: R`<p>At one site, species A, B, C, D have bases A, A, G, G. On the tree ((A,B),(C,D)), what is the minimum number of changes needed? On ((A,C),(B,D))?</p><p>Give the second number.</p>`, answer: 2, tol: 0.001, unit: '', hints: [R`The first tree needs one change.`], solution: R`<p>((A,B),(C,D)) needs 1 change; ((A,C),(B,D)) needs 2. This site supports the first tree.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-evolution', [
    { title: 'Breeder\'s equation', gen(r) { const h = r.step(0.1, 0.8, 0.05), S = r.step(1, 20, 0.5), m = r.int(20, 200); return { q: R`<p>A trait has mean ${m} and heritability ${f(h)}. The selected parents average ${f(m + S)}. What is the expected mean of the offspring?</p>`, answer: m + h * S, tol: 0.002, unit: '', solution: R`<p>$R = ${f(h)}\times${f(S)} = ${f(h * S)}$, so the mean is ${f(m + h * S)}.</p>` }; } },
    { title: 'Molecular clock', gen(r) { const p = r.step(0.005, 0.08, 0.001), mu = r.pick([0.5, 1, 2, 3]); const t = p / (2 * mu * 1e-9) / 1e6; return { q: R`<p>Two lineages differ at ${f(p * 100)}% of sites. The substitution rate is ${mu} × 10⁻⁹ per site per year. Ignoring saturation, how long ago did they split, in Myr?</p>`, answer: t, tol: 0.005, unit: 'Myr', solution: R`<p>$t = p/2\mu = ${f(t)}$ Myr.</p>` }; } },
    { title: 'Jukes–Cantor', gen(r) { const p = r.step(0.05, 0.6, 0.01); const d = -0.75 * Math.log(1 - 4 * p / 3); return { q: R`<p>Two sequences differ at a fraction ${f(p)} of sites. What is the Jukes–Cantor distance?</p>`, answer: d, tol: 0.005, unit: '', solution: R`<p>$-\tfrac34\ln(1 - \tfrac43\times${f(p)}) = ${f(d)}$.</p>` }; } }
  ]);
})();
