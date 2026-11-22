(function () {
  const R = PB.R;
  PB.addChapter({
    id: 'bio-cellcycle', subject: 'biology', num: 7, part: 'Cells and Molecules',
    title: 'The Cell Cycle, Mitosis and Meiosis',
    subtitle: R`How cells copy themselves. The cell cycle and its checkpoints, the stages of mitosis, cancer, and how meiosis halves the chromosome number and shuffles genetic variation.`,
    goals: ['Describe the phases of the cell cycle and their checkpoints', 'Sequence the stages of mitosis', 'Calculate mitotic index and phase durations', 'Explain how meiosis creates variation', 'Count chromosomes, chromatids and DNA content at each stage'],
    sections: [
      {
        title: 'The cell cycle',
        html: R`
<p>A dividing eukaryotic cell alternates between <strong>interphase</strong> and division:</p>
<ul>
<li><strong>G₁</strong>: growth, organelle and protein synthesis.</li>
<li><strong>S</strong>: DNA replication; each chromosome becomes two identical <strong>sister chromatids</strong> joined at the centromere.</li>
<li><strong>G₂</strong>: more growth and checking of the copied DNA.</li>
<li><strong>M</strong>: mitosis (nuclear division) then cytokinesis (division of the cytoplasm).</li>
</ul>
<p>Cells that stop dividing (neurons, most muscle cells) leave into <strong>G₀</strong>. Progress is controlled by <strong>cyclins</strong> and <strong>cyclin-dependent kinases</strong> (CDKs) and by <strong>checkpoints</strong>: G₁/S (is the DNA undamaged?), G₂/M (is replication complete?) and the spindle checkpoint (are all chromosomes attached?).</p>
<p><strong>Cancer</strong> is uncontrolled division after mutations in <strong>proto-oncogenes</strong> (accelerators stuck on, becoming oncogenes) and <strong>tumour suppressor genes</strong> such as p53 and RB (brakes removed). Usually several mutations are needed, which is why risk rises steeply with age.</p>`
      },
      {
        title: 'Mitosis',
        html: R`
<ol>
<li><strong>Prophase</strong>: chromosomes condense and become visible; the spindle forms from centrosomes; the nuclear envelope breaks down.</li>
<li><strong>Metaphase</strong>: chromosomes line up on the equator, each attached by kinetochores to spindle fibres from both poles.</li>
<li><strong>Anaphase</strong>: centromeres split and sister chromatids are pulled to opposite poles.</li>
<li><strong>Telophase</strong>: chromatids arrive at the poles and decondense; nuclear envelopes reform.</li>
</ol>
<p>Cytokinesis follows: a cleavage furrow in animals, a cell plate in plants. The two daughter cells are genetically identical to the parent: mitosis serves growth, repair and asexual reproduction.</p>
<p>The <strong>mitotic index</strong> is the proportion of cells in a tissue that are dividing. Because the chance of catching a cell in a given phase is proportional to that phase's length,</p>
$$\text{duration of phase} \approx \frac{\text{cells in phase}}{\text{total cells}} \times \text{length of cycle}.$$
<details class="example"><summary><span class="lbl">Worked example</span> In a root tip, 30 of 600 cells are in metaphase. The cycle lasts 20 h. How long is metaphase?<span class="tog">Solution</span></summary><div class="sol"><p>$30/600\times20\ \text{h} = 1$ h.</p></div></details>`
      },
      {
        title: 'Meiosis',
        html: R`
<p>Meiosis makes gametes with half the chromosome number: diploid ($2n$) to haploid ($n$). Fertilisation restores $2n$. It has two divisions after one round of replication.</p>
<ul>
<li><strong>Meiosis I</strong> separates homologous chromosomes. In prophase I homologues pair as <strong>bivalents</strong> and exchange segments at <strong>chiasmata</strong> (<strong>crossing over</strong>). In metaphase I bivalents line up with random orientation (<strong>independent assortment</strong>).</li>
<li><strong>Meiosis II</strong> separates sister chromatids, like mitosis, giving four haploid cells.</li>
</ul>
<p>Independent assortment alone gives $2^n$ combinations per gamete, where $n$ is the haploid number: $2^{23} \approx 8.4$ million in humans. Random fertilisation squares this, and crossing over multiplies it further. This is why siblings differ.</p>
<p><strong>Non-disjunction</strong> (homologues or chromatids failing to separate) gives gametes with an extra or missing chromosome; trisomy 21 causes Down syndrome. Its frequency rises with maternal age.</p>`
      },
      {
        title: 'Counting chromosomes and DNA',
        html: R`
<p>Let the DNA content of a haploid set be $c$. A diploid cell in G₁ has $2n$ chromosomes and $2c$ DNA.</p>
<div class="table-wrap"><table><thead><tr><th>Stage</th><th>Chromosomes</th><th>Chromatids</th><th>DNA</th></tr></thead><tbody>
<tr><td>G₁</td><td>$2n$</td><td>$2n$</td><td>$2c$</td></tr>
<tr><td>G₂, prophase, metaphase</td><td>$2n$</td><td>$4n$</td><td>$4c$</td></tr>
<tr><td>Anaphase of mitosis</td><td>$4n$</td><td>(separated)</td><td>$4c$</td></tr>
<tr><td>After meiosis I</td><td>$n$</td><td>$2n$</td><td>$2c$</td></tr>
<tr><td>Gamete</td><td>$n$</td><td>$n$</td><td>$c$</td></tr>
</tbody></table></div>
<div class="key"><strong>Key idea.</strong> Count chromosomes by centromeres. Replication doubles DNA but not chromosome number; separation of chromatids doubles chromosome number but not DNA.</div>`
      }
    ],
    labs: [
      { sim: 'mitosis', title: 'Root tip squash', desc: 'A field of view of an onion root tip with cells in every phase. Count them to estimate how long each phase lasts.',
        tasks: ['What is the mitotic index? How close is the estimate of mitosis duration to the true value?', 'Take several fields of view. How much do the estimates scatter, and why?', 'Lengthen G₁ to 30 hours. What happens to the mitotic index?'] }
    ],
    formulas: [
      ['Mitotic index', R`\text{MI} = \dfrac{\text{cells in mitosis}}{\text{total cells}}`],
      ['Phase duration', R`t_{\text{phase}} = \dfrac{n_{\text{phase}}}{N}\,T_{\text{cycle}}`],
      ['Assortment combinations', R`2^n`],
      ['Exponential growth', R`N = N_0\,2^{t/T}`]
    ],
    problems: [
      { level: 'concept', type: 'mcq', title: 'Sister chromatids separate', q: R`<p>In which stage of mitosis do sister chromatids move to opposite poles?</p>`, options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], answer: 2, hints: [R`"Ana" means back, apart.`], solution: R`<p>Anaphase.</p>` },
      { level: 'concept', type: 'mcq', title: 'Homologues separate', q: R`<p>When do homologous chromosomes separate?</p>`, options: ['Anaphase of mitosis', 'Anaphase I of meiosis', 'Anaphase II of meiosis', 'S phase'], answer: 1, hints: [R`The reduction division.`], solution: R`<p>Anaphase I, which halves the chromosome number.</p>` },
      { level: 'concept', type: 'mcq', title: 'Tumour suppressors', q: R`<p>p53 stops the cell cycle when DNA is damaged. Mutations that inactivate it are dangerous because…</p>`, options: ['They make cells die', 'Cells with damaged DNA keep dividing', 'They speed up DNA repair', 'They prevent mitosis'], answer: 1, hints: [R`A brake is lost.`], solution: R`<p>The G₁/S checkpoint fails, so damaged cells divide and accumulate more mutations.</p>` },
      { level: 'core', type: 'num', title: 'Mitotic index', q: R`<p>A field shows 18 cells in prophase, 6 in metaphase, 4 in anaphase, 4 in telophase and 168 in interphase. What is the mitotic index, in %?</p>`, answer: 16, tol: 0.002, unit: '%', hints: [R`32 of 200.`], solution: R`<p>$32/200 = 16\%$.</p>` },
      { level: 'core', type: 'num', title: 'Phase duration', q: R`<p>For the same field, the cycle lasts 24 h. How long is prophase, in hours?</p>`, answer: 2.16, tol: 0.005, unit: 'h', hints: [R`$18/200\times24$.`], solution: R`<p>2.16 h.</p>` },
      { level: 'core', type: 'num', title: 'Gamete combinations', q: R`<p>A species has $2n = 16$. Ignoring crossing over, how many genetically different gametes can one individual make by independent assortment?</p>`, answer: 256, tol: 0.001, unit: '', hints: [R`$n = 8$.`], solution: R`<p>$2^8 = 256$.</p>` },
      { level: 'core', type: 'num', title: 'Chromatids in metaphase', q: R`<p>A human cell (2n = 46) is in metaphase of mitosis. How many chromatids does it contain?</p>`, answer: 92, tol: 0.001, unit: '', hints: [R`Each chromosome has two.`], solution: R`<p>92.</p>` },
      { level: 'core', type: 'num', title: 'Doubling', q: R`<p>A cell divides every 20 minutes with unlimited resources. How many cells descend from one after 4 hours?</p>`, answer: 4096, tol: 0.001, unit: '', hints: [R`12 doublings.`], solution: R`<p>$2^{12} = 4096$.</p>` },
      { level: 'olympiad', type: 'num', title: 'DNA content', q: R`<p>A human sperm contains 3.3 pg of DNA. How much DNA, in pg, is in a cell at metaphase of mitosis?</p>`, answer: 13.2, tol: 0.003, unit: 'pg', hints: [R`Gamete = c; metaphase = 4c.`], solution: R`<p>$4\times3.3 = 13.2$ pg.</p>` },
      { level: 'olympiad', type: 'num', title: 'Zygote combinations', q: R`<p>Ignoring crossing over, how many genetically different zygotes could two human parents produce (n = 23 for each)? Give log₁₀ of the number.</p>`, answer: 13.85, tol: 0.005, unit: '', hints: [R`$2^{23}\times2^{23} = 2^{46}$.`], solution: R`<p>$\log_{10}2^{46} = 46\times0.301 = 13.85$: about $7\times10^{13}$.</p>` },
      { level: 'olympiad', type: 'num', title: 'Non-disjunction', q: R`<p>Non-disjunction of one chromosome pair happens in meiosis I in a cell. Of the four gametes produced, how many have an abnormal chromosome number?</p>`, answer: 4, tol: 0.001, unit: '', hints: [R`Both cells after meiosis I are wrong.`], solution: R`<p>All four: two get $n + 1$, two get $n - 1$. Non-disjunction in meiosis II affects only two of the four.</p>` }
    ]
  });
  const f = (x) => +(+x).toPrecision(3);
  PB.addDrills('bio-cellcycle', [
    { title: 'Phase duration', gen(r) { const N = r.int(200, 1000), k = r.int(3, 60), T = r.int(12, 36); return { q: R`<p>${k} of ${N} cells are in metaphase. The cell cycle lasts ${T} h. Estimate the duration of metaphase, in minutes.</p>`, answer: k / N * T * 60, tol: 0.005, unit: 'min', solution: R`<p>$${k}/${N}\times${T}\times60 = ${f(k / N * T * 60)}$ min.</p>` }; } },
    { title: 'Chromosome counting', gen(r) { const n2 = r.pick([8, 14, 16, 20, 24, 38, 46, 48]), st = r.pick([['chromosomes in a cell in anaphase of mitosis', 2], ['chromatids in a cell in metaphase of mitosis', 2], ['chromosomes in a gamete', 0.5], ['chromosomes in a cell after meiosis I', 0.5], ['chromatids in a cell after meiosis I', 1]]); return { q: R`<p>A species has $2n = ${n2}$. How many ${st[0]}?</p>`, answer: n2 * st[1], tol: 0, atol: 0.01, unit: '', solution: R`<p>${n2 * st[1]}.</p>` }; } },
    { title: 'Assortment', gen(r) { const n = r.int(2, 23); return { q: R`<p>A species has a haploid number of ${n}. How many chromosome combinations can its gametes have by independent assortment alone?</p>`, answer: Math.pow(2, n), tol: 0.001, unit: '', solution: R`<p>$2^{${n}} = ${Math.pow(2, n)}$.</p>` }; } }
  ]);
})();
