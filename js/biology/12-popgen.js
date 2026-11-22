(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-popgen', subject: 'biology', num: 12, part: 'Genetics',
    title: 'Population Genetics',
    subtitle: R`Evolution measured as changing allele frequencies. The Hardy–Weinberg principle, selection, genetic drift and effective population size, mutation, migration and inbreeding.`,
    goals: ['Apply the Hardy–Weinberg equations', 'Test whether a population is in equilibrium', 'Model selection against a recessive allele', 'Explain drift, bottlenecks and founder effects', 'Calculate effective population size and inbreeding effects'],
    sections: [
      {
        title: 'The Hardy–Weinberg principle',
        html: R`
<p>For a gene with two alleles at frequencies $p$ and $q$ ($p + q = 1$), random mating gives genotype frequencies in one generation:</p>
$$p^2 + 2pq + q^2 = 1 \qquad (\mathrm{AA},\ \mathrm{Aa},\ \mathrm{aa}).$$
<p>These stay constant from generation to generation if the population is large, mates randomly, and has no selection, mutation or migration. Real populations always break some of these assumptions; Hardy–Weinberg is the null model against which evolution is measured.</p>
<details class="example"><summary><span class="lbl">Worked example</span> 1 in 2500 Northern Europeans has cystic fibrosis (recessive). What fraction are carriers?<span class="tog">Solution</span></summary><div class="sol"><p>$q^2 = 1/2500$, so $q = 0.02$ and $p = 0.98$. Carriers: $2pq = 0.039$, about 1 in 25. Most copies of the allele hide in carriers.</p></div></details>
<p>To <strong>test</strong> for equilibrium, count genotypes, estimate $p$ by counting alleles ($p = (2N_{AA} + N_{Aa})/2N$), predict genotype numbers, and run a χ² test with 1 degree of freedom (3 classes − 1 − 1 estimated parameter).</p>`
      },
      {
        title: 'Natural selection',
        html: R`
<p>Give each genotype a <strong>relative fitness</strong> $w$ and the next generation's allele frequency follows. For selection against a recessive phenotype with fitnesses 1, 1, $1 - s$:</p>
$$q' = \frac{q(1 - sq)}{1 - sq^2}.$$
<p>When the allele is lethal ($s = 1$), $q' = q/(1 + q)$, so $1/q$ rises by exactly 1 per generation: $q_t = q_0/(1 + tq_0)$. Selection against rare recessives is very slow because they hide in heterozygotes; that is why harmful recessive alleles persist.</p>
<p><strong>Heterozygote advantage</strong> keeps both alleles in the population (balanced polymorphism). With fitnesses $1 - s$, 1, $1 - t$ for AA, Aa, aa, the equilibrium is $\hat q = s/(s + t)$. The sickle-cell allele persists where malaria is common because carriers resist malaria.</p>
<p><strong>Mutation–selection balance</strong>: a recessive lethal arising at mutation rate $\mu$ settles at $\hat q \approx \sqrt{\mu}$.</p>`
      },
      {
        title: 'Genetic drift',
        html: R`
<p>In a finite population, allele frequencies change by chance because only some individuals breed. This <strong>genetic drift</strong> is strongest in small populations. A new neutral allele eventually fixes with probability equal to its frequency, $1/2N$; heterozygosity decays as</p>
$$H_t = H_0\left(1 - \frac{1}{2N_e}\right)^t.$$
<ul>
<li><strong>Bottleneck</strong>: a crash in numbers (northern elephant seals fell to about 20 in the 1890s) loses variation that does not come back quickly.</li>
<li><strong>Founder effect</strong>: a few colonists carry an unrepresentative sample (high rates of Ellis–van Creveld syndrome among the Old Order Amish).</li>
</ul>
<p>The <strong>effective population size</strong> $N_e$ is usually much less than the census size. With unequal sexes, $N_e = \dfrac{4N_mN_f}{N_m + N_f}$; with fluctuating size, $N_e$ is the <em>harmonic</em> mean over generations, dominated by the smallest values.</p>
<p>For a new allele with selective advantage $s$, the fixation probability is about $2s$ (Haldane), not 1: most beneficial mutations are lost by drift while still rare.</p>`
      },
      {
        title: 'Migration and inbreeding',
        html: R`
<p><strong>Gene flow</strong> makes populations more alike. If a fraction $m$ of each generation migrates in from a source with frequency $q_m$: $q' = (1 - m)q + mq_m$.</p>
<p><strong>Inbreeding</strong> (mating between relatives) does not change allele frequencies but makes homozygotes more common. With inbreeding coefficient $F$:</p>
$$f(\mathrm{aa}) = q^2 + Fpq.$$
<p>$F = 1/16$ for first cousins and $1/4$ for full siblings. For a rare recessive this can multiply the risk many times. Inbreeding depression in small zoo or wild populations is one reason conservation programmes manage breeding.</p>`
      }
    ],
    labs: [
      { sim: 'drift', title: 'Drift and selection', desc: 'Twelve populations evolve side by side by Wright–Fisher sampling. Change the size and add selection.',
        tasks: ['With N = 20 and no selection, how many populations fix or lose A within 200 generations? Try N = 1000.', 'Start A at 0.05 with s = 0.02 in a population of 1000. Compare the fraction that fix with Kimura\'s prediction.', 'Find a population size where drift and weak selection (s = 0.01) are about equally important.'] }
    ],
    formulas: [
      ['Hardy–Weinberg', R`p^2 + 2pq + q^2 = 1`],
      ['Recessive lethal', R`q_t = \dfrac{q_0}{1 + tq_0}`],
      ['Heterozygote advantage', R`\hat q = \dfrac{s}{s+t}`],
      ['Heterozygosity loss', R`H_t = H_0(1 - 1/2N_e)^t`],
      ['Effective size (sexes)', R`N_e = \dfrac{4N_mN_f}{N_m+N_f}`],
      ['Inbreeding', R`f(\mathrm{aa}) = q^2 + Fpq`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'HW assumption', q: R`<p>Which is <em>not</em> an assumption of Hardy–Weinberg equilibrium?</p>`, options: ['Random mating', 'No selection', 'A large population', 'Equal numbers of each allele'], answer: 3, hints: [R`Equilibrium works at any p.`], solution: R`<p>Allele frequencies can be anything; they just stay constant.</p>` },
      { level: 'concept', type: 'mcq', title: 'Bottleneck effect', q: R`<p>After a population bottleneck, a population typically has…</p>`, options: ['More genetic variation', 'Less genetic variation and possibly unusual allele frequencies', 'The same variation', 'Only dominant alleles'], answer: 1, hints: [R`Few individuals sample few alleles.`], solution: R`<p>Reduced variation, with allele frequencies shifted by chance.</p>` },
      { level: 'concept', type: 'mcq', title: 'Why recessives persist', q: R`<p>Why does selection remove a harmful rare recessive allele so slowly?</p>`, options: ['It mutates back', 'Most copies are in heterozygotes, which selection cannot see', 'It is dominant in males', 'Drift protects it'], answer: 1, hints: [R`Compare $2pq$ with $q^2$ when $q$ is small.`], solution: R`<p>When $q$ is small, $2pq \gg q^2$: almost all copies are hidden in carriers.</p>` },
      { level: 'core', type: 'num', title: 'Carriers', q: R`<p>A recessive condition affects 1 in 10 000 people. What percentage are carriers?</p>`, answer: 1.98, tol: 0.005, unit: '%', hints: [R`$q = 0.01$.`], solution: R`<p>$2(0.99)(0.01) = 0.0198 = 1.98\%$.</p>` },
      { level: 'core', type: 'num', title: 'Allele counting', q: R`<p>A sample has 360 MM, 480 MN and 160 NN individuals. What is the frequency of M?</p>`, answer: 0.6, tol: 0.002, unit: '', hints: [R`$(2\times360 + 480)/2000$.`], solution: R`<p>$1200/2000 = 0.6$. (This sample fits HW exactly: 0.36, 0.48, 0.16.)</p>` },
      { level: 'core', type: 'num', title: 'Lethal recessive', q: R`<p>A recessive lethal has $q = 0.1$. What is $q$ after 10 generations?</p>`, answer: 0.05, tol: 0.002, unit: '', hints: [R`$q_0/(1 + tq_0)$.`], solution: R`<p>$0.1/2 = 0.05$. Halving again to 0.025 takes another 20 generations.</p>` },
      { level: 'core', type: 'num', title: 'Effective size', q: R`<p>A herd has 5 breeding males and 95 breeding females. What is $N_e$?</p>`, answer: 19, tol: 0.002, unit: '', hints: [R`$4\times5\times95/100$.`], solution: R`<p>19: the herd drifts like a population of 19, not 100.</p>` },
      { level: 'core', type: 'num', title: 'Harmonic mean', q: R`<p>A population is 1000, 10, then 1000 over three generations. What is $N_e$ over the period?</p>`, answer: 29.4, tol: 0.01, unit: '', hints: [R`$3/(1/1000 + 1/10 + 1/1000)$.`], solution: R`<p>$3/0.102 = 29.4$. One bad generation dominates.</p>` },
      { level: 'olympiad', type: 'num', title: 'Sickle-cell equilibrium', q: R`<p>In a malarial region, AA has fitness 0.88 (malaria), AS 1.0, and SS 0.20 (sickle-cell disease). What is the equilibrium frequency of S?</p>`, answer: 0.1304, tol: 0.005, unit: '', hints: [R`$s = 0.12$, $t = 0.80$.`], solution: R`<p>$0.12/0.92 = 0.13$, close to frequencies observed in parts of West Africa.</p>` },
      { level: 'olympiad', type: 'num', title: 'First cousins', q: R`<p>A recessive allele has $q = 0.01$. By what factor does a child of first cousins ($F = 1/16$) have a higher risk of being affected than a child of unrelated parents?</p>`, answer: 7.19, tol: 0.01, unit: '×', hints: [R`$(q^2 + Fpq)/q^2$.`], solution: R`<p>$(10^{-4} + 0.0625\times0.0099)/10^{-4} = (1 + 6.19) = 7.2$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Heterozygosity decay', q: R`<p>A captive population has $N_e = 25$. What fraction of its heterozygosity remains after 20 generations?</p>`, answer: 0.6676, tol: 0.005, unit: '', hints: [R`$(1 - 1/50)^{20}$.`], solution: R`<p>$0.98^{20} = 0.668$: a third lost in 20 generations.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-popgen', [
    { title: 'Hardy–Weinberg carriers', gen(r) { const n = r.pick([100, 400, 900, 1600, 2500, 3600, 10000, 40000]); const q = 1 / Math.sqrt(n); const c = 2 * q * (1 - q); return { q: R`<p>A recessive condition affects 1 in ${n} people. What fraction of the population are carriers?</p>`, answer: c, tol: 0.005, unit: '', solution: R`<p>$q = ${f(q)}$; $2pq = ${f(c)}$, about 1 in ${Math.round(1 / c)}.</p>` }; } },
    { title: 'Allele frequency from counts', gen(r) { const a = r.int(10, 500), b = r.int(10, 500), c = r.int(5, 300); const p = (2 * a + b) / (2 * (a + b + c)); return { q: R`<p>A sample has ${a} AA, ${b} Aa and ${c} aa. What is the frequency of A?</p>`, answer: p, tol: 0.005, unit: '', solution: R`<p>$(2\times${a} + ${b})/(2\times${a + b + c}) = ${f(p)}$.</p>` }; } },
    { title: 'Effective population size', gen(r) { const m = r.int(1, 60), fm = r.int(5, 300); const Ne = 4 * m * fm / (m + fm); return { q: R`<p>A population has ${m} breeding males and ${fm} breeding females. What is its effective size?</p>`, answer: Ne, tol: 0.005, unit: '', solution: R`<p>$4\times${m}\times${fm}/${m + fm} = ${f(Ne)}$.</p>` }; } }
  ]);
})();
