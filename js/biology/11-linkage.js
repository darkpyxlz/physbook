(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-linkage', subject: 'biology', num: 11, part: 'Genetics',
    title: 'Linkage, Sex Linkage and Pedigrees',
    subtitle: R`When Mendel's second law fails. Linked genes and recombination frequency, gene mapping, sex determination and X-linked inheritance, and reading human pedigrees.`,
    goals: ['Explain how linkage changes dihybrid ratios', 'Calculate recombination frequencies and map distances', 'Order genes with a three-point cross', 'Predict X-linked inheritance', 'Deduce modes of inheritance from pedigrees'],
    sections: [
      {
        title: 'Linked genes',
        html: R`
<p>Genes on the same chromosome tend to be inherited together: they are <strong>linked</strong>. In a heterozygote AB/ab (A and B on one homologue, a and b on the other), gametes are mostly the <strong>parental</strong> types AB and ab. <strong>Recombinant</strong> gametes, Ab and aB, form only when a crossover happens between the loci in meiosis.</p>
$$\text{recombination frequency (RF)} = \frac{\text{recombinant offspring}}{\text{total offspring}}.$$
<p>The further apart two genes are, the more likely a crossover between them. Alfred Sturtevant (1913, as a student) used this to build the first genetic map: <strong>1% recombination = 1 map unit = 1 centimorgan (cM)</strong>. RF never exceeds 50%, which is what unlinked genes show; for distant genes, double crossovers hide some recombination, so RF underestimates distance. Haldane's mapping function corrects for this: $\mathrm{RF} = \tfrac12(1 - e^{-2d})$ with $d$ in morgans.</p>
<details class="example"><summary><span class="lbl">Worked example</span> A test cross of AaBb gives 420 AB, 410 ab, 85 Ab and 85 aB. Are the genes linked, and how far apart?<span class="tog">Solution</span></summary><div class="sol"><p>An unlinked test cross would give 1 : 1 : 1 : 1. Recombinants are $170/1000 = 17\%$, so the genes are linked, about 17 cM apart.</p></div></details>`
      },
      {
        title: 'Three-point crosses',
        html: R`
<p>A test cross with three linked genes gives eight classes. The two most common are parental; the two rarest are <strong>double crossovers</strong>. The gene that is "swapped" in the double crossovers compared with the parentals is the one <strong>in the middle</strong>.</p>
<p>Distances come from adding all recombinants between each pair, counting double crossovers in both intervals. The number of double crossovers is often lower than expected from the product of the two single RFs, because one crossover inhibits another nearby (<strong>interference</strong>):</p>
$$\text{coefficient of coincidence} = \frac{\text{observed double crossovers}}{\text{expected double crossovers}},\qquad I = 1 - \text{c.o.c.}$$`
      },
      {
        title: 'Sex determination and X-linkage',
        html: R`
<p>In mammals, females are XX and males XY; the Y carries <strong>SRY</strong>, which triggers testis development. (Birds are the reverse: ZW females, ZZ males. Many reptiles use incubation temperature.)</p>
<p>Genes on the X chromosome are <strong>sex-linked</strong>. A male has one X, so he is <strong>hemizygous</strong>: a single recessive allele shows. This is why red–green colour blindness, haemophilia A and Duchenne muscular dystrophy are far more common in males.</p>
<ul>
<li>An affected male passes the allele to all his daughters and none of his sons.</li>
<li>A carrier female ($\mathrm{X^{H}X^{h}}$) passes it to half her sons (affected) and half her daughters (carriers).</li>
<li>If a fraction $q$ of X chromosomes carry the allele, a fraction $q$ of males but only about $q^2$ of females are affected.</li>
</ul>
<p>In female mammals one X in each cell is inactivated at random early in development (a Barr body), which is why tortoiseshell cats, heterozygous for an X-linked coat gene, are patchy and almost always female.</p>`
      },
      {
        title: 'Pedigrees',
        html: R`
<p>Human geneticists cannot set up crosses, so they read family trees. Squares are males, circles females, filled symbols affected.</p>
<div class="table-wrap"><table><thead><tr><th>Mode</th><th>Clues</th></tr></thead><tbody>
<tr><td>Autosomal dominant</td><td>every affected person has an affected parent; both sexes equally; two affected parents can have an unaffected child (Huntington's)</td></tr>
<tr><td>Autosomal recessive</td><td>skips generations; unaffected parents can have an affected child; often with related parents (cystic fibrosis)</td></tr>
<tr><td>X-linked recessive</td><td>mostly males; passed from carrier mothers; never father to son</td></tr>
<tr><td>X-linked dominant</td><td>affected father → all daughters affected, no sons</td></tr>
<tr><td>Mitochondrial</td><td>passed only through the mother, to all her children</td></tr>
</tbody></table></div>
<details class="example"><summary><span class="lbl">Worked example</span> Two unaffected parents have a child with cystic fibrosis. What is the chance that their unaffected daughter is a carrier?<span class="tog">Solution</span></summary><div class="sol"><p>Both parents are Ff. Among unaffected children the ratio is 1 FF : 2 Ff, so the chance is 2/3, not 1/2.</p></div></details>`
      }
    ],
    labs: [
      { sim: 'linkage', title: 'Mapping by recombination', desc: 'Test-cross a double heterozygote with two genes a chosen distance apart, and see how the recombinant fraction tracks map distance.',
        tasks: ['At 10 cM, compare the observed recombinant fraction with 10%. At 80 cM?', 'Set the distance to 150 cM. Could you tell these genes from unlinked ones?', 'How many offspring do you need before the estimate at 20 cM is reliable to ±2%?'] }
    ],
    formulas: [
      ['Recombination frequency', R`\mathrm{RF} = \dfrac{\text{recombinants}}{\text{total}}`],
      ['Map units', R`1\% \ \mathrm{RF} = 1\ \text{cM}`],
      ['Haldane mapping', R`\mathrm{RF} = \tfrac12(1 - e^{-2d})`],
      ['Interference', R`I = 1 - \dfrac{\text{observed DCO}}{\text{expected DCO}}`],
      ['X-linked frequencies', R`\text{males } q,\ \text{females } q^2`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Father to son', q: R`<p>A trait is passed from an affected father to his son. Which mode of inheritance is ruled out?</p>`, options: ['Autosomal dominant', 'Autosomal recessive', 'X-linked recessive', 'None of them'], answer: 2, hints: [R`What does a father give his son?`], solution: R`<p>A son gets his father's Y, not his X, so X-linked inheritance is ruled out.</p>` },
      { level: 'concept', type: 'mcq', title: 'Maximum RF', q: R`<p>Why does the recombination frequency between two genes never exceed 50%?</p>`, options: ['Crossovers happen at most once per chromosome', 'Even with many crossovers, half the products are parental on average', 'Recombinants die', 'Genes over 50 cM apart are on different chromosomes'], answer: 1, hints: [R`Think of many random crossovers.`], solution: R`<p>With multiple crossovers the alleles are effectively shuffled, giving parental and recombinant products equally often.</p>` },
      { level: 'concept', type: 'mcq', title: 'Pedigree', q: R`<p>Two affected parents have an unaffected daughter. The trait must be…</p>`, options: ['Autosomal recessive', 'Autosomal dominant', 'X-linked recessive', 'Mitochondrial'], answer: 1, hints: [R`Affected parents must both be heterozygous for this to happen.`], solution: R`<p>Dominant: both parents are heterozygous and the daughter received two recessive (normal) alleles. Recessive would make all children affected.</p>` },
      { level: 'core', type: 'num', title: 'RF', q: R`<p>A test cross gives 186 + 190 parental and 62 + 62 recombinant offspring. What is the map distance, in cM?</p>`, answer: 24.8, tol: 0.005, unit: 'cM', hints: [R`124/500.`], solution: R`<p>$124/500 = 24.8\%$, so 24.8 cM.</p>` },
      { level: 'core', type: 'num', title: 'Gamete frequency', q: R`<p>Genes A and B are 12 cM apart. What percentage of gametes from AB/ab are Ab?</p>`, answer: 6, tol: 0.002, unit: '%', hints: [R`Recombinants are split between two types.`], solution: R`<p>12% recombinant, half Ab and half aB: 6%.</p>` },
      { level: 'core', type: 'num', title: 'Colour-blind sons', q: R`<p>A carrier woman and a man with normal vision have a son. What is the probability that he is colour-blind?</p>`, answer: 0.5, tol: 0.002, unit: '', hints: [R`His X comes from his mother.`], solution: R`<p>1/2.</p>` },
      { level: 'core', type: 'num', title: 'Female frequency', q: R`<p>8% of men have red–green colour blindness. What percentage of women are expected to?</p>`, answer: 0.64, tol: 0.005, unit: '%', hints: [R`$q = 0.08$, so $q^2$.`], solution: R`<p>$0.08^2 = 0.0064 = 0.64\%$.</p>` },
      { level: 'core', type: 'num', title: 'Carrier probability', q: R`<p>A woman's brother has haemophilia; her parents are unaffected. What is the probability that she is a carrier?</p>`, answer: 0.5, tol: 0.002, unit: '', hints: [R`Her mother must be a carrier.`], solution: R`<p>Mother $\mathrm{X^{H}X^{h}}$, father $\mathrm{X^HY}$: each daughter has a 1/2 chance of being a carrier.</p>` },
      { level: 'olympiad', type: 'num', title: 'Gene order', q: R`<p>Genes A–B are 10 cM apart, B–C 25 cM, and A–C 15 cM. Which distance in cM separates the two outer genes?</p>`, answer: 25, tol: 0.002, unit: 'cM', hints: [R`The largest distance spans the other two.`], solution: R`<p>The order is B–A–C, and $10 + 15 = 25$ cM is the outer distance.</p>` },
      { level: 'olympiad', type: 'num', title: 'Interference', q: R`<p>Two intervals are 10 cM and 20 cM. In 1000 test-cross offspring, 8 double crossovers are seen. What is the interference?</p>`, answer: 0.6, tol: 0.005, unit: '', hints: [R`Expected DCO $= 0.1\times0.2\times1000$.`], solution: R`<p>Expected 20, observed 8: c.o.c. = 0.4, $I = 0.6$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Haldane', q: R`<p>Two genes are 0.5 morgans apart. Using Haldane's function, what recombination frequency is expected, in %?</p>`, answer: 31.6, tol: 0.005, unit: '%', hints: [R`$\tfrac12(1 - e^{-1})$.`], solution: R`<p>$0.5(1 - 0.368) = 0.316$: 31.6%, not 50%.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-linkage', [
    { title: 'Recombination frequency', gen(r) { const N = r.int(200, 2000), rf = r.step(0.02, 0.45, 0.01); const rec = Math.round(N * rf), p1 = Math.round((N - rec) / 2), p2 = N - rec - p1, r1 = Math.round(rec / 2), r2 = rec - r1; return { q: R`<p>A test cross gives ${p1} AB, ${p2} ab, ${r1} Ab and ${r2} aB offspring (parentals AB and ab). What is the map distance, in cM?</p>`, answer: (100 * rec) / N, tol: 0.005, unit: 'cM', solution: R`<p>$${rec}/${N} = ${f((100 * rec) / N)}\%$.</p>` }; } },
    { title: 'X-linked frequencies', gen(r) { const q = r.step(0.005, 0.12, 0.001), sex = r.pick(['women', 'men']); const v = sex === 'men' ? q * 100 : q * q * 100; return { q: R`<p>An X-linked recessive allele has frequency ${q}. What percentage of ${sex} are affected?</p>`, answer: v, tol: 0.005, unit: '%', solution: R`<p>${sex === 'men' ? '$q$' : '$q^2$'} $= ${f(v)}\%$.</p>` }; } },
    { title: 'Linked gamete types', gen(r) { const d = r.int(1, 45), type = r.pick(['AB', 'Ab']); const v = type === 'AB' ? (100 - d) / 2 : d / 2; return { q: R`<p>Genes A and B are ${d} cM apart. What percentage of gametes from AB/ab are ${type}?</p>`, answer: v, tol: 0.005, unit: '%', solution: R`<p>${type === 'AB' ? 'Parental' : 'Recombinant'}: ${f(v)}%.</p>` }; } }
  ]);
})();
