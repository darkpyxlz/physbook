(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-mendel', subject: 'biology', num: 10, part: 'Genetics',
    title: 'Mendelian Inheritance',
    subtitle: R`Mendel's laws, monohybrid and dihybrid crosses, dominance and its variations, probability rules for genetics, and the χ² test for judging whether data fit a ratio.`,
    goals: ['Use genetic vocabulary precisely', 'Predict monohybrid and dihybrid ratios', 'Handle codominance, multiple alleles and epistasis', 'Apply the product and sum rules', 'Carry out a χ² test'],
    sections: [
      {
        title: 'Genes, alleles and Mendel\'s first law',
        html: R`
<p>A <strong>gene</strong> is a length of DNA at a particular <strong>locus</strong>; <strong>alleles</strong> are its alternative versions. A diploid organism has two alleles per gene: <strong>homozygous</strong> if they are the same, <strong>heterozygous</strong> if different. The <strong>genotype</strong> is the allele combination; the <strong>phenotype</strong> is the observable trait. A <strong>dominant</strong> allele shows in the heterozygote; a <strong>recessive</strong> one only in the homozygote.</p>
<p>Mendel's <strong>law of segregation</strong>: the two alleles separate in meiosis, so each gamete carries one. Crossing two heterozygotes, Aa × Aa:</p>
<div class="table-wrap"><table><thead><tr><th></th><th>A</th><th>a</th></tr></thead><tbody><tr><th>A</th><td>AA</td><td>Aa</td></tr><tr><th>a</th><td>Aa</td><td>aa</td></tr></tbody></table></div>
<p>gives genotypes 1 AA : 2 Aa : 1 aa and phenotypes <strong>3 dominant : 1 recessive</strong>. A <strong>test cross</strong> with the homozygous recessive reveals an unknown genotype: AA × aa gives all dominant; Aa × aa gives 1 : 1.</p>`
      },
      {
        title: 'Dihybrid crosses and independent assortment',
        html: R`
<p>Mendel's <strong>law of independent assortment</strong>: alleles of genes on different chromosomes are sorted into gametes independently. AaBb makes four gamete types, AB, Ab, aB, ab, in equal numbers. AaBb × AaBb then gives</p>
$$9\ \mathrm{A\_B\_} : 3\ \mathrm{A\_bb} : 3\ \mathrm{aaB\_} : 1\ \mathrm{aabb}.$$
<p>You rarely need the 16-square grid: treat each gene separately and multiply. The <strong>product rule</strong>: the probability of independent events all happening is the product. The <strong>sum rule</strong>: the probability of either of two mutually exclusive events is the sum.</p>
<details class="example"><summary><span class="lbl">Worked example</span> AaBbCc × AaBbCc. What fraction of offspring are aabbcc? What fraction show all three dominant traits?<span class="tog">Solution</span></summary><div class="sol"><p>aabbcc: $(1/4)^3 = 1/64$. All dominant: $(3/4)^3 = 27/64$.</p></div></details>
<p>Among $n$ children, the number showing a trait with probability $p$ follows the <strong>binomial distribution</strong>: $P(k) = \binom{n}{k}p^k(1-p)^{n-k}$.</p>`
      },
      {
        title: 'Beyond simple dominance',
        html: R`
<ul>
<li><strong>Incomplete dominance</strong>: the heterozygote is intermediate (red × white snapdragons give pink; F₂ is 1 red : 2 pink : 1 white).</li>
<li><strong>Codominance</strong>: both alleles show (AB blood group; roan cattle).</li>
<li><strong>Multiple alleles</strong>: ABO has $I^A$, $I^B$ (codominant) and $i$ (recessive). Six genotypes give four blood groups.</li>
<li><strong>Lethal alleles</strong>: if the homozygote dies, a cross of heterozygotes gives 2 : 1 instead of 3 : 1 (yellow coat in mice).</li>
<li><strong>Epistasis</strong>: one gene masks another. Recessive epistasis gives 9 : 3 : 4 (labrador coat colour: ee dogs are yellow whatever the B gene); duplicate dominant epistasis gives 15 : 1; complementary genes give 9 : 7.</li>
<li><strong>Polygenic traits</strong> such as height depend on many genes plus environment and show continuous variation.</li>
</ul>`
      },
      {
        title: 'The χ² test',
        html: R`
<p>Real counts never match the ratio exactly. The <strong>chi-squared test</strong> asks whether the deviation is small enough to be chance:</p>
$$\chi^2 = \sum\frac{(O - E)^2}{E}, \qquad \text{degrees of freedom} = \text{number of classes} - 1.$$
<p>Compare $\chi^2$ with the critical value at $p = 0.05$: 3.84 for 1 df, 5.99 for 2, 7.81 for 3, 9.49 for 4. If $\chi^2$ is <em>below</em> the critical value, the data are consistent with the expected ratio (the null hypothesis is not rejected). If above, something else is going on: linkage, lethality, selection or misclassification.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A dihybrid cross gives 315, 108, 101 and 32 offspring. Do they fit 9 : 3 : 3 : 1?<span class="tog">Solution</span></summary><div class="sol"><p>Total 556; expected 312.75, 104.25, 104.25, 34.75. $\chi^2 = 0.016 + 0.135 + 0.101 + 0.218 = 0.47$, far below 7.81. They fit: these are Mendel's own pea data.</p></div></details>`
      }
    ],
    labs: [
      { sim: 'punnett', title: 'Breed and test', desc: 'Generate random offspring from a cross and compare them with Mendel\'s ratios using a χ² test.',
        tasks: ['Run the dihybrid cross with 160 offspring several times. How often does the test reject the 9:3:3:1 ratio?', 'Reduce to 16 offspring. Why are the results so unreliable?', 'Explain why getting p < 0.05 about 1 time in 20 is exactly what should happen.'] }
    ],
    formulas: [
      ['Monohybrid F₂', R`3:1\ \ (1:2:1)`],
      ['Dihybrid F₂', R`9:3:3:1`],
      ['Chi-squared', R`\chi^2 = \sum (O-E)^2/E`],
      ['Binomial', R`P(k) = \binom nk p^k(1-p)^{n-k}`],
      ['Critical χ² (p = 0.05)', R`3.84,\ 5.99,\ 7.81\ (1, 2, 3\ \text{df})`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Test cross', q: R`<p>A tall pea plant is crossed with a short (tt) plant. Half the offspring are short. What is the tall parent's genotype?</p>`, options: ['TT', 'Tt', 'tt', 'Cannot tell'], answer: 1, hints: [R`Where did the t come from?`], solution: R`<p>Tt: the 1 : 1 ratio of a heterozygote test cross.</p>` },
      { level: 'concept', type: 'mcq', title: 'Blood groups', q: R`<p>A group A mother and group B father have a group O child. What are the parents' genotypes?</p>`, options: ['IᴬIᴬ and IᴮIᴮ', 'Iᴬi and Iᴮi', 'IᴬIᴮ and ii', 'Iᴬi and IᴮIᴮ'], answer: 1, hints: [R`The child is ii.`], solution: R`<p>Each parent must carry i: Iᴬi and Iᴮi. Their children can be A, B, AB or O.</p>` },
      { level: 'concept', type: 'mcq', title: 'Reading χ²', q: R`<p>χ² = 9.2 with 3 degrees of freedom (critical value 7.81). What do you conclude?</p>`, options: ['The data fit the ratio', 'The deviation is significant: reject the expected ratio', 'More degrees of freedom are needed', 'The experiment proves linkage'], answer: 1, hints: [R`Above the critical value.`], solution: R`<p>Reject the null hypothesis at the 5% level; it does not by itself say why.</p>` },
      { level: 'core', type: 'num', title: 'Recessive fraction', q: R`<p>AaBb × AaBb. What fraction of offspring are aabb? Give a decimal.</p>`, answer: 0.0625, tol: 0.002, unit: '', hints: [R`$(1/4)^2$.`], solution: R`<p>$1/16 = 0.0625$.</p>` },
      { level: 'core', type: 'num', title: 'Three genes', q: R`<p>AaBbCc × aaBbCC. What fraction of offspring are aabbCc?</p>`, answer: 0.0625, tol: 0.002, unit: '', hints: [R`Aa × aa → aa 1/2; Bb × Bb → bb 1/4; Cc × CC → Cc 1/2.`], solution: R`<p>$\tfrac12\times\tfrac14\times\tfrac12 = \tfrac1{16}$.</p>` },
      { level: 'core', type: 'num', title: 'Two children', q: R`<p>Two carriers of cystic fibrosis (Ff × Ff) have two children. What is the probability that both are affected?</p>`, answer: 0.0625, tol: 0.002, unit: '', hints: [R`Independent: multiply.`], solution: R`<p>$(1/4)^2 = 1/16$.</p>` },
      { level: 'core', type: 'num', title: 'Exactly one affected', q: R`<p>The same couple have three children. What is the probability that exactly one is affected?</p>`, answer: 0.421875, tol: 0.003, unit: '', hints: [R`$3\times\tfrac14\times(\tfrac34)^2$.`], solution: R`<p>$27/64 = 0.42$.</p>` },
      { level: 'core', type: 'num', title: 'χ² for a monohybrid', q: R`<p>A cross gives 290 tall and 110 short plants. Calculate χ² for a 3 : 1 ratio.</p>`, answer: 1.333, tol: 0.005, unit: '', hints: [R`Expected 300 and 100.`], solution: R`<p>$100/300 + 100/100 = 1.33$, below 3.84: consistent with 3 : 1.</p>` },
      { level: 'olympiad', type: 'num', title: 'Epistasis', q: R`<p>Two white-flowered pea strains are crossed; the F₁ is all purple. The F₂ has 9 purple : 7 white. Out of 320 F₂ plants, how many are expected to be white?</p>`, answer: 140, tol: 0.002, unit: '', hints: [R`7/16 of the total.`], solution: R`<p>$320\times7/16 = 140$. Both dominant alleles (C_P_) are needed for colour: complementary genes.</p>` },
      { level: 'olympiad', type: 'num', title: 'Lethal allele', q: R`<p>Yellow mice (Yy) are crossed with each other; YY dies before birth. What fraction of the live pups are yellow?</p>`, answer: 0.6667, tol: 0.005, unit: '', hints: [R`Only 3 of 4 classes survive.`], solution: R`<p>2 Yy : 1 yy, so 2/3 yellow.</p>` },
      { level: 'olympiad', type: 'num', title: 'Genotype count', q: R`<p>A gene has 5 alleles in a population. How many different genotypes are possible in a diploid?</p>`, answer: 15, tol: 0.001, unit: '', hints: [R`5 homozygotes plus $\binom52$ heterozygotes.`], solution: R`<p>$5 + 10 = 15$; in general $n(n+1)/2$.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-mendel', [
    { title: 'Multi-gene probability', gen(r) { const n = r.int(2, 5), k = r.int(0, n); const p = Math.pow(0.25, k) * Math.pow(0.75, n - k); return { q: R`<p>Two individuals heterozygous at ${n} independent genes are crossed. What is the probability that an offspring shows the recessive phenotype for exactly the first ${k} gene${k === 1 ? '' : 's'} and the dominant phenotype for the other ${n - k}?</p>`, answer: p, tol: 0.005, unit: '', solution: R`<p>$(1/4)^{${k}}(3/4)^{${n - k}} = ${f(p)}$.</p>` }; } },
    { title: 'Binomial families', gen(r) { const n = r.int(2, 6), k = r.int(0, n), p = r.pick([[0.25, 'affected (carrier × carrier)'], [0.5, 'a boy'], [0.75, 'unaffected (carrier × carrier)']]); const c = (a, b) => { let x = 1; for (let i = 0; i < b; i++) x = x * (a - i) / (i + 1); return x; }; const P = c(n, k) * Math.pow(p[0], k) * Math.pow(1 - p[0], n - k); return { q: R`<p>A family has ${n} children. What is the probability that exactly ${k} are ${p[1]}?</p>`, answer: P, tol: 0.005, unit: '', solution: R`<p>$\binom{${n}}{${k}}(${p[0]})^{${k}}(${1 - p[0]})^{${n - k}} = ${f(P)}$.</p>` }; } },
    { title: 'χ² for 3:1', gen(r) { const N = r.int(10, 100) * 4, d = r.int(-20, 20); const O1 = 0.75 * N + d, O2 = 0.25 * N - d; if (O2 < 1) return this.gen(PB.rng(r.int(1, 1e9))); const chi = d * d / (0.75 * N) + d * d / (0.25 * N); return { q: R`<p>A monohybrid cross gives ${O1} dominant and ${O2} recessive offspring. Calculate χ² for a 3 : 1 ratio.</p>`, answer: chi, tol: 0.01, atol: 0.005, unit: '', solution: R`<p>Expected ${0.75 * N} and ${0.25 * N}: $\chi^2 = ${f(chi)}$, ${chi < 3.84 ? 'below' : 'above'} 3.84.</p>` }; } }
  ]);
})();
